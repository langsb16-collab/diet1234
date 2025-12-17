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

export const apiRoutes = new Hono<{ Bindings: Env }>();

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
// Product Search
// ============================================================================

apiRoutes.get('/products/search', async (c) => {
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

    const response: SearchResult = {
      products: results.results as any[],
      total: total?.count || 0
    };

    return c.json(response);
  } catch (error) {
    console.error('Search error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ============================================================================
// Product Detail
// ============================================================================

apiRoutes.get('/products/:id', async (c) => {
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
