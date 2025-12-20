import { Hono } from 'hono';
import type { Env } from '../types';

export const reviewRoutes = new Hono<{ Bindings: Env }>();

// ============================================================================
// Helper Functions
// ============================================================================

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(7)}`;
}

function hashIP(ip: string): string {
  // Simple hash function (in production, use crypto.subtle.digest)
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

// ============================================================================
// Review Endpoints
// ============================================================================

/**
 * GET /api/reviews/product/:productId
 * Get all reviews for a specific product
 */
reviewRoutes.get('/product/:productId', async (c) => {
  const productId = c.req.param('productId');
  const sort = c.req.query('sort') || 'recent'; // recent, helpful, rating_high, rating_low
  const page = parseInt(c.req.query('page') || '1');
  const limit = parseInt(c.req.query('limit') || '10');
  const offset = (page - 1) * limit;

  try {
    const { env } = c;

    // Build order clause based on sort parameter
    let orderClause = '';
    switch (sort) {
      case 'helpful':
        orderClause = 'ORDER BY r.helpful_count DESC, r.created_at DESC';
        break;
      case 'rating_high':
        orderClause = 'ORDER BY r.rating DESC, r.created_at DESC';
        break;
      case 'rating_low':
        orderClause = 'ORDER BY r.rating ASC, r.created_at DESC';
        break;
      case 'recent':
      default:
        orderClause = 'ORDER BY r.created_at DESC';
    }

    // Get reviews
    const reviews = await env.DB.prepare(`
      SELECT 
        r.review_id,
        r.user_name,
        r.rating,
        r.title,
        r.content,
        r.verified_purchase,
        r.helpful_count,
        r.not_helpful_count,
        r.created_at
      FROM product_reviews r
      WHERE r.product_id = ? AND r.status = 'active'
      ${orderClause}
      LIMIT ? OFFSET ?
    `).bind(productId, limit, offset).all();

    // Get review statistics
    const stats = await env.DB.prepare(`
      SELECT 
        total_reviews,
        average_rating,
        rating_1_count,
        rating_2_count,
        rating_3_count,
        rating_4_count,
        rating_5_count,
        verified_purchase_count
      FROM product_review_stats
      WHERE product_id = ?
    `).bind(productId).first();

    return c.json({
      success: true,
      product_id: productId,
      reviews: reviews.results,
      statistics: stats || {
        total_reviews: 0,
        average_rating: 0,
        rating_1_count: 0,
        rating_2_count: 0,
        rating_3_count: 0,
        rating_4_count: 0,
        rating_5_count: 0,
        verified_purchase_count: 0
      },
      pagination: {
        page,
        limit,
        total: stats?.total_reviews || 0
      }
    });

  } catch (error) {
    console.error('Get Reviews Error:', error);
    return c.json({ error: '리뷰 조회에 실패했습니다.' }, 500);
  }
});

/**
 * POST /api/reviews
 * Create a new review
 */
reviewRoutes.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const { product_id, user_name, rating, title, content, verified_purchase } = body;

    // Validation
    if (!product_id || !user_name || !rating || !title || !content) {
      return c.json({ error: '필수 필드가 누락되었습니다.' }, 400);
    }

    if (rating < 1 || rating > 5) {
      return c.json({ error: '평점은 1-5 사이여야 합니다.' }, 400);
    }

    const { env } = c;
    const reviewId = generateId('REV');

    // Insert review
    await env.DB.prepare(`
      INSERT INTO product_reviews (
        review_id, product_id, user_name, rating, title, content, verified_purchase
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      reviewId,
      product_id,
      user_name,
      rating,
      title,
      content,
      verified_purchase ? 1 : 0
    ).run();

    // Update statistics
    await updateReviewStatistics(env.DB, product_id);

    return c.json({
      success: true,
      review_id: reviewId,
      message: '리뷰가 등록되었습니다.'
    }, 201);

  } catch (error) {
    console.error('Create Review Error:', error);
    return c.json({ error: '리뷰 등록에 실패했습니다.' }, 500);
  }
});

/**
 * POST /api/reviews/:reviewId/vote
 * Vote on review helpfulness
 */
reviewRoutes.post('/:reviewId/vote', async (c) => {
  const reviewId = c.req.param('reviewId');
  
  try {
    const body = await c.req.json();
    const { vote_type } = body; // 'helpful' or 'not_helpful'

    if (!['helpful', 'not_helpful'].includes(vote_type)) {
      return c.json({ error: '유효하지 않은 투표 유형입니다.' }, 400);
    }

    const { env } = c;
    const clientIP = c.req.header('CF-Connecting-IP') || 'unknown';
    const ipHash = hashIP(clientIP);
    const voteId = generateId('VOTE');

    // Check if user already voted
    const existingVote = await env.DB.prepare(`
      SELECT vote_id FROM review_votes
      WHERE review_id = ? AND ip_hash = ?
    `).bind(reviewId, ipHash).first();

    if (existingVote) {
      return c.json({ error: '이미 투표하셨습니다.' }, 400);
    }

    // Insert vote
    await env.DB.prepare(`
      INSERT INTO review_votes (vote_id, review_id, ip_hash, vote_type)
      VALUES (?, ?, ?, ?)
    `).bind(voteId, reviewId, ipHash, vote_type).run();

    // Update review counts
    const countField = vote_type === 'helpful' ? 'helpful_count' : 'not_helpful_count';
    await env.DB.prepare(`
      UPDATE product_reviews
      SET ${countField} = ${countField} + 1
      WHERE review_id = ?
    `).bind(reviewId).run();

    return c.json({
      success: true,
      message: '투표가 등록되었습니다.'
    });

  } catch (error) {
    console.error('Vote Review Error:', error);
    return c.json({ error: '투표 등록에 실패했습니다.' }, 500);
  }
});

/**
 * POST /api/reviews/:reviewId/report
 * Report a review
 */
reviewRoutes.post('/:reviewId/report', async (c) => {
  const reviewId = c.req.param('reviewId');
  
  try {
    const body = await c.req.json();
    const { reason, details } = body;

    if (!reason || !['spam', 'offensive', 'fake', 'other'].includes(reason)) {
      return c.json({ error: '유효하지 않은 신고 사유입니다.' }, 400);
    }

    const { env } = c;
    const clientIP = c.req.header('CF-Connecting-IP') || 'unknown';
    const ipHash = hashIP(clientIP);
    const reportId = generateId('REPORT');

    // Insert report
    await env.DB.prepare(`
      INSERT INTO review_reports (report_id, review_id, ip_hash, reason, details)
      VALUES (?, ?, ?, ?, ?)
    `).bind(reportId, reviewId, ipHash, reason, details || null).run();

    // Increment report count
    await env.DB.prepare(`
      UPDATE product_reviews
      SET reported_count = reported_count + 1
      WHERE review_id = ?
    `).bind(reviewId).run();

    return c.json({
      success: true,
      message: '신고가 접수되었습니다.'
    });

  } catch (error) {
    console.error('Report Review Error:', error);
    return c.json({ error: '신고 접수에 실패했습니다.' }, 500);
  }
});

/**
 * GET /api/reviews/stats/:productId
 * Get review statistics for a product
 */
reviewRoutes.get('/stats/:productId', async (c) => {
  const productId = c.req.param('productId');

  try {
    const { env } = c;

    const stats = await env.DB.prepare(`
      SELECT 
        total_reviews,
        average_rating,
        rating_1_count,
        rating_2_count,
        rating_3_count,
        rating_4_count,
        rating_5_count,
        verified_purchase_count,
        last_review_at
      FROM product_review_stats
      WHERE product_id = ?
    `).bind(productId).first();

    if (!stats) {
      return c.json({
        product_id: productId,
        total_reviews: 0,
        average_rating: 0,
        rating_distribution: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0
        },
        verified_purchase_count: 0,
        last_review_at: null
      });
    }

    return c.json({
      product_id: productId,
      total_reviews: stats.total_reviews,
      average_rating: Number(stats.average_rating?.toFixed(1)),
      rating_distribution: {
        1: stats.rating_1_count,
        2: stats.rating_2_count,
        3: stats.rating_3_count,
        4: stats.rating_4_count,
        5: stats.rating_5_count
      },
      verified_purchase_count: stats.verified_purchase_count,
      last_review_at: stats.last_review_at
    });

  } catch (error) {
    console.error('Get Review Stats Error:', error);
    return c.json({ error: '통계 조회에 실패했습니다.' }, 500);
  }
});

// ============================================================================
// Helper Function: Update Review Statistics
// ============================================================================

async function updateReviewStatistics(db: D1Database, productId: string): Promise<void> {
  try {
    // Calculate statistics
    const stats = await db.prepare(`
      SELECT 
        COUNT(*) as total_reviews,
        AVG(rating) as average_rating,
        SUM(CASE WHEN rating = 1 THEN 1 ELSE 0 END) as rating_1_count,
        SUM(CASE WHEN rating = 2 THEN 1 ELSE 0 END) as rating_2_count,
        SUM(CASE WHEN rating = 3 THEN 1 ELSE 0 END) as rating_3_count,
        SUM(CASE WHEN rating = 4 THEN 1 ELSE 0 END) as rating_4_count,
        SUM(CASE WHEN rating = 5 THEN 1 ELSE 0 END) as rating_5_count,
        SUM(verified_purchase) as verified_purchase_count,
        MAX(created_at) as last_review_at
      FROM product_reviews
      WHERE product_id = ? AND status = 'active'
    `).bind(productId).first();

    // Upsert statistics
    await db.prepare(`
      INSERT OR REPLACE INTO product_review_stats (
        product_id, total_reviews, average_rating,
        rating_1_count, rating_2_count, rating_3_count, rating_4_count, rating_5_count,
        verified_purchase_count, last_review_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `).bind(
      productId,
      stats?.total_reviews || 0,
      stats?.average_rating || 0,
      stats?.rating_1_count || 0,
      stats?.rating_2_count || 0,
      stats?.rating_3_count || 0,
      stats?.rating_4_count || 0,
      stats?.rating_5_count || 0,
      stats?.verified_purchase_count || 0,
      stats?.last_review_at || null
    ).run();

  } catch (error) {
    console.error('Update Statistics Error:', error);
    throw error;
  }
}
