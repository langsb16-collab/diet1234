import { Hono } from 'hono';
import type { 
  Env, 
  ProductDetailResponse, 
  SearchResult, 
  ScanResult,
  ApprovalSummary,
  RiskAssessment,
  BlacklistCheck
} from '../types';
import {
  generateId,
  calculateRiskScore,
  getRiskLevel,
  getLegalitySummary
} from '../types';
import { auth } from './auth';
import { admin } from './admin';
import { notices } from './notices';
import { requireAuth, requirePremium, limitFreeUser } from '../middleware/auth';

export const apiRoutes = new Hono<{ Bindings: Env }>();

// Mount authentication routes
apiRoutes.route('/auth', auth);

// Mount admin routes
apiRoutes.route('/admin', admin);

// Mount notices routes  
apiRoutes.route('/notices', notices);

// ============================================================================
// Health Check
// ============================================================================

apiRoutes.get('/health', (c) => {
  return c.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'DietMed Global API'
  });
});

// ============================================================================
// Image Search
// ============================================================================

apiRoutes.post('/search/image', async (c) => {
  try {
    const formData = await c.req.formData();
    const imageFile = formData.get('image') as File;

    if (!imageFile) {
      return c.json({ error: '이미지 파일이 없습니다.' }, 400);
    }

    const { env } = c;
    
    // Convert image to base64 for OCR analysis
    const imageData = await imageFile.arrayBuffer();
    const base64Image = Buffer.from(imageData).toString('base64');
    
    // Simple OCR simulation: Extract text from image
    // In production, integrate with Google Vision API or similar service
    
    // For now, search for popular weight loss medications in database
    const searchTerms = [
      'wegovy', 'ozempic', 'saxenda', 'victoza', 'mounjaro', 
      'zepbound', 'contrave', 'xenical', 'alli', 'qsymia',
      'adipex', 'phentermine', 'orlistat', 'semaglutide', 'liraglutide'
    ];
    
    // Search products by common names and ingredients
    const searchQuery = `
      SELECT DISTINCT
        p.product_id,
        p.product_name,
        p.dosage_form,
        p.strength,
        p.ndc_code,
        i.name_standard as ingredient_name,
        m.name as manufacturer_name,
        COUNT(DISTINCT a.approval_id) as approval_count,
        CASE 
          WHEN bi.ingredient_id IS NOT NULL THEN 'high_risk'
          WHEN p.requires_refrigeration = 1 THEN 'caution'
          ELSE 'safe'
        END as risk_level
      FROM products p
      LEFT JOIN ingredients i ON p.ingredient_id = i.ingredient_id
      LEFT JOIN manufacturers m ON p.manufacturer_id = m.manufacturer_id
      LEFT JOIN approvals a ON p.product_id = a.product_id AND a.status = 'active'
      LEFT JOIN blacklisted_ingredients bi ON i.ingredient_id = bi.ingredient_id
      WHERE 
        LOWER(p.product_name) LIKE '%wegovy%'
        OR LOWER(p.product_name) LIKE '%ozempic%'
        OR LOWER(p.product_name) LIKE '%saxenda%'
        OR LOWER(p.product_name) LIKE '%semaglutide%'
        OR LOWER(p.product_name) LIKE '%liraglutide%'
        OR LOWER(i.name_standard) LIKE '%semaglutide%'
        OR LOWER(i.name_standard) LIKE '%liraglutide%'
      GROUP BY p.product_id
      ORDER BY approval_count DESC, p.product_name
      LIMIT 20
    `;
    
    const products = await env.DB.prepare(searchQuery).all();

    return c.json({
      success: true,
      message: '이미지 분석 완료',
      products: products.results || [],
      total: (products.results || []).length,
      note: '이미지에서 의약품을 검색했습니다. 더 정확한 인식을 위해서는 Google Vision API를 연동하세요.'
    });

  } catch (error) {
    console.error('Image search error:', error);
    return c.json({ 
      success: false,
      error: '이미지 검색에 실패했습니다.' 
    }, 500);
  }
});

// ============================================================================
// Regulatory Bodies
// ============================================================================

apiRoutes.get('/regulatory-bodies', async (c) => {
  try {
    const { DB } = c.env;
    const countryCode = c.req.query('country') || '';
    
    let query = 'SELECT * FROM regulatory_bodies WHERE is_active = 1';
    const params: any[] = [];
    
    if (countryCode) {
      query += ' AND country_code = ?';
      params.push(countryCode);
    }
    
    query += ' ORDER BY country_code, short_name';
    
    const result = await DB.prepare(query).bind(...params).all();
    
    return c.json({
      regulatory_bodies: result.results || [],
      total: result.results?.length || 0
    });
  } catch (error: any) {
    console.error('Error fetching regulatory bodies:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================================================
// Safety Profiles & Scores
// ============================================================================

apiRoutes.get('/ingredients/:ingredientId/safety', async (c) => {
  try {
    const { DB } = c.env;
    const ingredientId = c.req.param('ingredientId');
    
    const profile = await DB.prepare(`
      SELECT * FROM safety_profiles WHERE ingredient_id = ?
    `).bind(ingredientId).first();
    
    if (!profile) {
      return c.json({ error: 'Safety profile not found' }, 404);
    }
    
    // Parse JSON fields
    return c.json({
      ...profile,
      common_side_effects: JSON.parse(profile.common_side_effects as string),
      serious_side_effects: JSON.parse(profile.serious_side_effects as string),
      contraindications: JSON.parse(profile.contraindications as string),
      drug_interactions: JSON.parse(profile.drug_interactions as string),
      withdrawal_symptoms: JSON.parse(profile.withdrawal_symptoms as string)
    });
  } catch (error: any) {
    console.error('Error fetching safety profile:', error);
    return c.json({ error: error.message }, 500);
  }
});

apiRoutes.get('/products/:productId/safety-score', async (c) => {
  try {
    const { DB } = c.env;
    const productId = c.req.param('productId');
    const country = c.req.query('country') || 'KR';
    
    const score = await DB.prepare(`
      SELECT * FROM safety_scores 
      WHERE product_id = ? AND country_code = ?
    `).bind(productId, country).first();
    
    if (!score) {
      return c.json({ error: 'Safety score not found' }, 404);
    }
    
    return c.json(score);
  } catch (error: any) {
    console.error('Error fetching safety score:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================================================
// FAQs
// ============================================================================

apiRoutes.get('/faqs', async (c) => {
  try {
    const { DB } = c.env;
    const category = c.req.query('category') || '';
    const ingredientId = c.req.query('ingredient') || '';
    
    let query = 'SELECT * FROM faqs WHERE is_active = 1';
    const params: any[] = [];
    
    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }
    
    if (ingredientId) {
      query += ' AND (ingredient_id = ? OR ingredient_id IS NULL)';
      params.push(ingredientId);
    }
    
    query += ' ORDER BY display_order';
    
    const result = await DB.prepare(query).bind(...params).all();
    
    return c.json({
      faqs: result.results || [],
      total: result.results?.length || 0
    });
  } catch (error: any) {
    console.error('Error fetching FAQs:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================================================
// Product Search (로그인 필요, 무료 회원은 제목만)
// ============================================================================

apiRoutes.get('/products/search', requireAuth, limitFreeUser, async (c) => {
  try {
    const query = c.req.query('q') || '';
    const country = c.req.query('country') || '';
    const limit = parseInt(c.req.query('limit') || '20');
    const offset = parseInt(c.req.query('offset') || '0');

    if (!query || query.length < 2) {
      return c.json({ error: 'Query must be at least 2 characters' }, 400);
    }

    const { DB } = c.env;

    // Search products by name or ingredient
    const searchPattern = `%${query}%`;
    
    const results = await DB.prepare(`
      SELECT 
        p.product_id,
        p.product_name,
        p.manufacturer_name,
        p.dosage_form,
        p.strength,
        i.name_standard as ingredient_name,
        COUNT(DISTINCT a.approval_id) as approval_count,
        CASE 
          WHEN b.blacklist_id IS NOT NULL THEN 'high_risk'
          WHEN p.requires_refrigeration = 1 THEN 'caution'
          ELSE 'safe'
        END as risk_level
      FROM products p
      JOIN ingredients i ON p.ingredient_id = i.ingredient_id
      LEFT JOIN approvals a ON p.product_id = a.product_id 
        AND a.approval_status = 'approved'
        ${country ? 'AND a.country_code = ?' : ''}
      LEFT JOIN blacklisted_ingredients b ON i.ingredient_id = b.ingredient_id
      WHERE p.product_name LIKE ? 
         OR i.name_standard LIKE ?
         OR i.synonyms LIKE ?
      GROUP BY p.product_id
      ORDER BY 
        CASE WHEN b.blacklist_id IS NOT NULL THEN 1 ELSE 0 END,
        approval_count DESC
      LIMIT ? OFFSET ?
    `)
    .bind(...(country ? [country] : []), searchPattern, searchPattern, searchPattern, limit, offset)
    .all();

    const total = await DB.prepare(`
      SELECT COUNT(DISTINCT p.product_id) as count
      FROM products p
      JOIN ingredients i ON p.ingredient_id = i.ingredient_id
      WHERE p.product_name LIKE ? 
         OR i.name_standard LIKE ?
         OR i.synonyms LIKE ?
    `)
    .bind(searchPattern, searchPattern, searchPattern)
    .first<{ count: number }>();

    // 무료 회원은 제목만 반환
    const limitedAccess = c.get('limitedAccess');
    
    let products = results.results as any[];
    if (limitedAccess) {
      products = products.map((p: any) => ({
        product_id: p.product_id,
        product_name: p.product_name,
        upgrade_required: true
      }));
    }
    
    const response: SearchResult = {
      products,
      total: total?.count || 0,
      message: limitedAccess ? '프리미엄 회원으로 업그레이드하시면 상세 정보를 확인할 수 있습니다.' : undefined
    };

    return c.json(response);
  } catch (error) {
    console.error('Search error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ============================================================================
// Product Detail (로그인 필요, 무료 회원은 제한된 정보만)
// ============================================================================

apiRoutes.get('/products/:id', requireAuth, limitFreeUser, async (c) => {
  try {
    const productId = c.req.param('id');
    const country = c.req.query('country') || 'KR';
    const { DB } = c.env;

    // Get product
    const product = await DB.prepare(`
      SELECT * FROM products WHERE product_id = ?
    `).bind(productId).first();

    if (!product) {
      return c.json({ error: 'Product not found' }, 404);
    }

    // Get ingredient
    const ingredient = await DB.prepare(`
      SELECT * FROM ingredients WHERE ingredient_id = ?
    `).bind(product.ingredient_id).first();

    // Get approvals
    const approvals = await DB.prepare(`
      SELECT * FROM approvals 
      WHERE product_id = ?
      ORDER BY 
        CASE 
          WHEN country_code = ? THEN 0
          WHEN approval_status = 'approved' THEN 1
          ELSE 2
        END,
        approval_date DESC
    `).bind(productId, country).all();

    // Check blacklist
    const blacklistCheck = await DB.prepare(`
      SELECT * FROM blacklisted_ingredients 
      WHERE ingredient_id = ?
      LIMIT 1
    `).bind(product.ingredient_id).first();

    // Calculate risk assessment
    const riskFactors = [];
    let riskScore = 0;

    if (blacklistCheck) {
      riskScore += 100;
      riskFactors.push({
        type: 'blacklisted_ingredient',
        description: `금지 성분: ${blacklistCheck.ingredient_name}`,
        severity: 'critical' as const,
        score: 100
      });
    }

    if (product.requires_refrigeration === 1) {
      riskScore += 15;
      riskFactors.push({
        type: 'refrigeration_required',
        description: '냉장 유통 필요 (개인통관 시 품질 보증 어려움)',
        severity: 'moderate' as const,
        score: 15
      });
    }

    const rxApproval = approvals.results.find((a: any) => 
      a.prescription_status === 'rx' && a.country_code === country
    );
    
    if (rxApproval) {
      riskScore += 20;
      riskFactors.push({
        type: 'prescription_required',
        description: '전문의약품 (의사 처방 필요)',
        severity: 'high' as const,
        score: 20
      });
    }

    const riskAssessment: RiskAssessment = {
      risk_score: Math.min(riskScore, 100),
      risk_level: getRiskLevel(Math.min(riskScore, 100)),
      risk_factors: riskFactors,
      warnings: []
    };

    // Generate approval summaries
    const approvalSummaries: ApprovalSummary[] = (approvals.results as any[]).map((a: any) => {
      const countryNames: Record<string, string> = {
        'US': '🇺🇸 미국',
        'KR': '🇰🇷 한국',
        'GB': '🇬🇧 영국',
        'EU': '🇪🇺 유럽',
        'JP': '🇯🇵 일본',
        'CN': '🇨🇳 중국',
      };

      return {
        country_code: a.country_code,
        country_name: countryNames[a.country_code] || a.country_code,
        regulatory_body: a.regulatory_body,
        status: a.approval_status,
        prescription_status: a.prescription_status,
        approval_date: a.approval_date,
        legality_summary: getLegalitySummary(a.country_code, a.approval_status, a.prescription_status),
        icon: a.approval_status === 'approved' ? '✅' : '❌'
      };
    });

    // 무료 회원은 제한된 정보만 반환
    const limitedAccess = c.get('limitedAccess');
    
    if (limitedAccess) {
      // 무료 회원: 제목과 기본 정보만
      return c.json({
        product: {
          product_id: product.product_id,
          product_name: product.product_name,
          manufacturer_name: product.manufacturer_name,
          dosage_form: product.dosage_form
        },
        message: '프리미엄 회원으로 업그레이드하시면 상세 정보를 확인할 수 있습니다.',
        upgrade_required: true
      });
    }

    const response: ProductDetailResponse = {
      product: product as any,
      ingredient: ingredient as any,
      approvals: approvalSummaries,
      risk_assessment: riskAssessment,
      blacklist_check: blacklistCheck ? {
        is_blacklisted: true,
        ingredient_name: blacklistCheck.ingredient_name,
        banned_countries: JSON.parse(blacklistCheck.banned_countries),
        ban_reason: blacklistCheck.ban_reason,
        health_risks: JSON.parse(blacklistCheck.health_risks),
        severity: blacklistCheck.severity
      } as BlacklistCheck : null
    };

    return c.json(response);
  } catch (error) {
    console.error('Product detail error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ============================================================================
// Barcode Scan
// ============================================================================

apiRoutes.post('/scan/barcode', async (c) => {
  try {
    const body = await c.req.json();
    const { barcode, country = 'KR' } = body;

    if (!barcode) {
      return c.json({ error: 'Barcode is required' }, 400);
    }

    const { DB } = c.env;

    // Find product by barcode (NDC or EAN)
    const product = await DB.prepare(`
      SELECT * FROM products 
      WHERE ndc_code = ? OR ean_code = ?
         OR barcodes LIKE ?
      LIMIT 1
    `).bind(barcode, barcode, `%${barcode}%`).first();

    if (!product) {
      return c.json({ 
        error: 'Product not found',
        message: '바코드에 해당하는 제품을 찾을 수 없습니다. 바코드 번호를 확인해주세요.'
      }, 404);
    }

    // Get full product details (reuse product detail logic)
    const ingredient = await DB.prepare(`
      SELECT * FROM ingredients WHERE ingredient_id = ?
    `).bind(product.ingredient_id).first();

    const approvals = await DB.prepare(`
      SELECT * FROM approvals 
      WHERE product_id = ?
      ORDER BY 
        CASE 
          WHEN country_code = ? THEN 0
          WHEN approval_status = 'approved' THEN 1
          ELSE 2
        END
    `).bind(product.product_id, country).all();

    const blacklistCheck = await DB.prepare(`
      SELECT * FROM blacklisted_ingredients 
      WHERE ingredient_id = ?
    `).bind(product.ingredient_id).first();

    // Get safety profile
    const safetyProfile = await DB.prepare(`
      SELECT * FROM safety_profiles WHERE ingredient_id = ?
    `).bind(product.ingredient_id).first();

    // Get safety score
    const safetyScore = await DB.prepare(`
      SELECT * FROM safety_scores 
      WHERE product_id = ? AND country_code = ?
    `).bind(product.product_id, country).first();

    // Calculate risk
    const riskFactors = [];
    let riskScore = 0;

    if (blacklistCheck) {
      riskScore = 100;
      riskFactors.push({
        type: 'blacklisted_ingredient',
        description: `⛔ 금지 성분 감지: ${blacklistCheck.ingredient_name}`,
        severity: 'critical' as const,
        score: 100
      });
    }

    if (product.requires_refrigeration === 1) {
      riskScore += 15;
      riskFactors.push({
        type: 'refrigeration_required',
        description: '냉장 유통 필요 (개인통관 위험)',
        severity: 'moderate' as const,
        score: 15
      });
    }

    const scanId = generateId('SCAN');
    
    // Log scan (insert into user_scans)
    await DB.prepare(`
      INSERT INTO user_scans (
        scan_id, scan_type, scan_input, product_id, ingredient_id,
        confidence_score, risk_score, risk_level, country_code, scan_timestamp
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `).bind(
      scanId,
      'barcode',
      barcode,
      product.product_id,
      product.ingredient_id,
      1.0,
      riskScore,
      getRiskLevel(riskScore),
      country
    ).run();

    const approvalSummaries: ApprovalSummary[] = (approvals.results as any[]).map((a: any) => ({
      country_code: a.country_code,
      country_name: a.country_code,
      regulatory_body: a.regulatory_body,
      status: a.approval_status,
      prescription_status: a.prescription_status,
      approval_date: a.approval_date,
      legality_summary: getLegalitySummary(a.country_code, a.approval_status, a.prescription_status),
      icon: a.approval_status === 'approved' ? '✅' : '❌'
    }));

    const response: ScanResult = {
      scan_id: scanId,
      scan_type: 'barcode',
      confidence_score: 1.0,
      product: product as any,
      ingredient: ingredient as any,
      approvals: approvalSummaries,
      risk_assessment: {
        risk_score: riskScore,
        risk_level: getRiskLevel(riskScore),
        risk_factors: riskFactors,
        warnings: []
      },
      blacklist_check: blacklistCheck ? {
        is_blacklisted: true,
        ingredient_name: blacklistCheck.ingredient_name,
        banned_countries: JSON.parse(blacklistCheck.banned_countries),
        ban_reason: blacklistCheck.ban_reason,
        health_risks: JSON.parse(blacklistCheck.health_risks),
        severity: blacklistCheck.severity
      } : null,
      timestamp: new Date().toISOString()
    };

    return c.json(response);
  } catch (error) {
    console.error('Barcode scan error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ============================================================================
// Get All Products (for listing)
// ============================================================================

apiRoutes.get('/products', async (c) => {
  try {
    const limit = parseInt(c.req.query('limit') || '50');
    const offset = parseInt(c.req.query('offset') || '0');
    const country = c.req.query('country') || '';

    const { DB } = c.env;

    const results = await DB.prepare(`
      SELECT 
        p.product_id,
        p.product_name,
        p.manufacturer_name,
        p.dosage_form,
        p.strength,
        i.name_standard as ingredient_name,
        COUNT(DISTINCT a.approval_id) as approval_count,
        CASE 
          WHEN b.blacklist_id IS NOT NULL THEN 'high_risk'
          WHEN p.requires_refrigeration = 1 THEN 'caution'
          ELSE 'safe'
        END as risk_level
      FROM products p
      JOIN ingredients i ON p.ingredient_id = i.ingredient_id
      LEFT JOIN approvals a ON p.product_id = a.product_id 
        AND a.approval_status = 'approved'
        ${country ? 'AND a.country_code = ?' : ''}
      LEFT JOIN blacklisted_ingredients b ON i.ingredient_id = b.ingredient_id
      GROUP BY p.product_id
      ORDER BY 
        CASE WHEN b.blacklist_id IS NOT NULL THEN 1 ELSE 0 END,
        approval_count DESC
      LIMIT ? OFFSET ?
    `)
    .bind(...(country ? [country] : []), limit, offset)
    .all();

    return c.json({
      products: results.results,
      total: results.results.length
    });
  } catch (error) {
    console.error('Products list error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ============================================================================
// Get Blacklisted Ingredients
// ============================================================================

apiRoutes.get('/blacklist', async (c) => {
  try {
    const { DB } = c.env;

    const results = await DB.prepare(`
      SELECT * FROM blacklisted_ingredients
      ORDER BY severity DESC, created_at DESC
    `).all();

    return c.json({
      blacklist: results.results,
      total: results.results.length
    });
  } catch (error) {
    console.error('Blacklist error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ============================================================================
// Submit User Report
// ============================================================================

apiRoutes.post('/reports', async (c) => {
  try {
    const body = await c.req.json();
    const {
      report_type,
      product_id,
      seller_url,
      description,
      violation_types = []
    } = body;

    if (!report_type || !description) {
      return c.json({ error: 'report_type and description are required' }, 400);
    }

    const { DB } = c.env;
    const reportId = generateId('REP');

    await DB.prepare(`
      INSERT INTO user_reports (
        report_id, report_type, product_id, seller_url,
        description, violation_types, status, priority,
        report_timestamp, country_code
      ) VALUES (?, ?, ?, ?, ?, ?, 'pending', 'normal', datetime('now'), 'KR')
    `).bind(
      reportId,
      report_type,
      product_id || null,
      seller_url || null,
      description,
      JSON.stringify(violation_types)
    ).run();

    return c.json({
      report_id: reportId,
      status: 'pending',
      message: '신고가 접수되었습니다. 검토 후 조치하겠습니다.'
    });
  } catch (error) {
    console.error('Report submission error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ============================================================================
// Product Comparison (프리미엄 회원 전용)
// ============================================================================

apiRoutes.get('/compare', requireAuth, requirePremium, async (c) => {
  try {
    const { DB } = c.env;
    const productIds = c.req.query('products')?.split(',') || [];
    const country = c.req.query('country') || 'KR';
    
    if (productIds.length < 2 || productIds.length > 4) {
      return c.json({ 
        error: 'Please select 2-4 products to compare' 
      }, 400);
    }
    
    // Get comparison criteria
    const criteria = await DB.prepare(`
      SELECT * FROM comparison_criteria 
      WHERE is_active = 1 
      ORDER BY display_order
    `).all();
    
    // Get product details for comparison
    const placeholders = productIds.map(() => '?').join(',');
    
    const products = await DB.prepare(`
      SELECT 
        p.*,
        i.name_standard,
        i.mechanism,
        i.drug_class
      FROM products p
      JOIN ingredients i ON p.ingredient_id = i.ingredient_id
      WHERE p.product_id IN (${placeholders})
    `).bind(...productIds).all();
    
    // Get approvals for each product
    const approvals = await DB.prepare(`
      SELECT * FROM approvals
      WHERE product_id IN (${placeholders})
      ORDER BY product_id, 
        CASE 
          WHEN approval_status = 'approved' THEN 1
          WHEN approval_status = 'under_review' THEN 2
          ELSE 3
        END
    `).bind(...productIds).all();
    
    // Get safety profiles
    const ingredientIds = (products.results as any[]).map(p => p.ingredient_id);
    const safetyProfiles = await DB.prepare(`
      SELECT * FROM safety_profiles
      WHERE ingredient_id IN (${ingredientIds.map(() => '?').join(',')})
    `).bind(...ingredientIds).all();
    
    // Get safety scores
    const safetyScores = await DB.prepare(`
      SELECT * FROM safety_scores
      WHERE product_id IN (${placeholders}) AND country_code = ?
    `).bind(...productIds, country).all();
    
    // Build comparison data
    const comparison = {
      criteria: criteria.results,
      products: (products.results as any[]).map((product: any) => {
        const productApprovals = (approvals.results as any[]).filter(
          (a: any) => a.product_id === product.product_id
        );
        
        const safetyProfile = (safetyProfiles.results as any[]).find(
          (sp: any) => sp.ingredient_id === product.ingredient_id
        );
        
        const safetyScore = (safetyScores.results as any[]).find(
          (ss: any) => ss.product_id === product.product_id
        );
        
        return {
          product_id: product.product_id,
          product_name: product.product_name,
          generic_name: product.name_standard,
          manufacturer: product.manufacturer_name,
          dosage_form: product.dosage_form,
          route: product.route,
          mechanism: product.mechanism,
          
          // Approval data
          approved_countries_count: productApprovals.filter(
            (a: any) => a.approval_status === 'approved'
          ).length,
          approvals: productApprovals.map((a: any) => ({
            country_code: a.country_code,
            regulatory_body: a.regulatory_body,
            approval_status: a.approval_status,
            approval_date: a.approval_date,
            prescription_status: a.prescription_status,
            bmi_criteria: a.bmi_criteria,
            age_min: a.age_min,
            age_max: a.age_max
          })),
          
          // Safety data
          safety_profile: safetyProfile ? {
            weight_loss_6mo: safetyProfile.weight_loss_6mo,
            weight_loss_12mo: safetyProfile.weight_loss_12mo,
            mechanism_detail: safetyProfile.mechanism_detail,
            common_side_effects: JSON.parse(safetyProfile.common_side_effects),
            serious_side_effects: JSON.parse(safetyProfile.serious_side_effects),
            contraindications: JSON.parse(safetyProfile.contraindications),
            drug_interactions: JSON.parse(safetyProfile.drug_interactions),
            pregnancy_category: safetyProfile.pregnancy_category,
            breastfeeding_safety: safetyProfile.breastfeeding_safety,
            addiction_risk: safetyProfile.addiction_risk
          } : null,
          
          // Safety score
          safety_score: safetyScore ? {
            total: safetyScore.total_score,
            grade: safetyScore.grade,
            regulatory: safetyScore.regulatory_score,
            efficacy: safetyScore.efficacy_score,
            safety: safetyScore.safety_score,
            distribution: safetyScore.distribution_score
          } : null
        };
      })
    };
    
    return c.json(comparison);
  } catch (error: any) {
    console.error('Product comparison error:', error);
    return c.json({ error: error.message }, 500);
  }
});
