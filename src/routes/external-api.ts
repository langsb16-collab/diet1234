import { Hono } from 'hono';
import type { Env } from '../types';

export const externalApiRoutes = new Hono<{ Bindings: Env }>();

// ============================================================================
// FDA OpenFDA API Integration
// ============================================================================

/**
 * FDA OpenFDA API를 통해 의약품 정보를 조회합니다.
 * API Documentation: https://open.fda.gov/apis/drug/drugsfda/
 * No API Key Required
 */
async function searchFDADrug(query: string): Promise<any> {
  try {
    const url = `https://api.fda.gov/drug/drugsfda.json?search=openfda.brand_name:"${encodeURIComponent(query)}"&limit=10`;
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.error('FDA API Error:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('FDA API Error:', error);
    return null;
  }
}

/**
 * FDA Drug Label 정보 조회
 */
async function searchFDALabel(productName: string): Promise<any> {
  try {
    const url = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${encodeURIComponent(productName)}"&limit=5`;
    
    const response = await fetch(url);
    if (!response.ok) return null;

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('FDA Label API Error:', error);
    return null;
  }
}

/**
 * FDA Adverse Events 조회
 */
async function searchFDAAdverseEvents(productName: string): Promise<any> {
  try {
    const url = `https://api.fda.gov/drug/event.json?search=patient.drug.openfda.brand_name:"${encodeURIComponent(productName)}"&count=patient.reaction.reactionmeddrapt.exact&limit=10`;
    
    const response = await fetch(url);
    if (!response.ok) return null;

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('FDA Adverse Events API Error:', error);
    return null;
  }
}

// ============================================================================
// MFDS (식약처) Open API Integration
// ============================================================================

/**
 * MFDS 의약품 정보 조회 (공공데이터포털)
 * API Key Required: 사용자가 https://www.data.go.kr 에서 발급받아야 함
 */
async function searchMFDSDrug(query: string, apiKey?: string): Promise<any> {
  if (!apiKey) {
    console.warn('MFDS API Key not provided');
    return null;
  }

  try {
    // 의약품개요정보(e약은요) API
    const url = `http://apis.data.go.kr/1471000/DrugPrdtPrmsnInfoService05/getDrugPrdtPrmsnInq05?serviceKey=${apiKey}&pageNo=1&numOfRows=10&type=json&item_name=${encodeURIComponent(query)}`;
    
    const response = await fetch(url);
    if (!response.ok) return null;

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('MFDS API Error:', error);
    return null;
  }
}

// ============================================================================
// API Endpoints
// ============================================================================

/**
 * GET /api/external/fda/search?q=Wegovy
 * FDA에서 의약품 검색
 */
externalApiRoutes.get('/fda/search', async (c) => {
  const query = c.req.query('q');

  if (!query) {
    return c.json({ error: '검색어를 입력해주세요.' }, 400);
  }

  try {
    const fdaData = await searchFDADrug(query);

    if (!fdaData || !fdaData.results || fdaData.results.length === 0) {
      return c.json({
        success: false,
        message: 'FDA에서 검색 결과를 찾을 수 없습니다.',
        query
      });
    }

    // FDA 데이터를 우리 형식으로 변환
    const products = fdaData.results.map((item: any) => ({
      source: 'FDA',
      brand_name: item.openfda?.brand_name?.[0] || item.products?.[0]?.brand_name || 'Unknown',
      generic_name: item.openfda?.generic_name?.[0] || 'Unknown',
      manufacturer: item.openfda?.manufacturer_name?.[0] || item.sponsor_name || 'Unknown',
      application_number: item.application_number,
      approval_date: item.submissions?.[0]?.submission_status_date,
      marketing_status: item.products?.[0]?.marketing_status,
      dosage_form: item.products?.[0]?.dosage_form,
      route: item.products?.[0]?.route,
      active_ingredients: item.products?.[0]?.active_ingredients || [],
      product_number: item.products?.[0]?.product_number
    }));

    return c.json({
      success: true,
      source: 'FDA OpenFDA API',
      query,
      total: fdaData.meta?.results?.total || products.length,
      products
    });

  } catch (error) {
    console.error('FDA Search Error:', error);
    return c.json({ 
      success: false,
      error: 'FDA API 조회 중 오류가 발생했습니다.' 
    }, 500);
  }
});

/**
 * GET /api/external/fda/label?product=Wegovy
 * FDA Drug Label 정보 조회
 */
externalApiRoutes.get('/fda/label', async (c) => {
  const product = c.req.query('product');

  if (!product) {
    return c.json({ error: '제품명을 입력해주세요.' }, 400);
  }

  try {
    const labelData = await searchFDALabel(product);

    if (!labelData || !labelData.results || labelData.results.length === 0) {
      return c.json({
        success: false,
        message: 'FDA Label 정보를 찾을 수 없습니다.',
        product
      });
    }

    const label = labelData.results[0];

    return c.json({
      success: true,
      source: 'FDA Drug Label API',
      product,
      label: {
        brand_name: label.openfda?.brand_name?.[0],
        generic_name: label.openfda?.generic_name?.[0],
        manufacturer: label.openfda?.manufacturer_name?.[0],
        purpose: label.purpose?.[0],
        indications_and_usage: label.indications_and_usage?.[0],
        dosage_and_administration: label.dosage_and_administration?.[0],
        warnings: label.warnings?.[0],
        adverse_reactions: label.adverse_reactions?.[0],
        contraindications: label.contraindications?.[0],
        drug_interactions: label.drug_interactions?.[0],
        pregnancy: label.pregnancy?.[0],
        pediatric_use: label.pediatric_use?.[0]
      }
    });

  } catch (error) {
    console.error('FDA Label Error:', error);
    return c.json({ 
      success: false,
      error: 'FDA Label API 조회 중 오류가 발생했습니다.' 
    }, 500);
  }
});

/**
 * GET /api/external/fda/adverse-events?product=Wegovy
 * FDA Adverse Events 조회 (부작용 통계)
 */
externalApiRoutes.get('/fda/adverse-events', async (c) => {
  const product = c.req.query('product');

  if (!product) {
    return c.json({ error: '제품명을 입력해주세요.' }, 400);
  }

  try {
    const eventsData = await searchFDAAdverseEvents(product);

    if (!eventsData || !eventsData.results || eventsData.results.length === 0) {
      return c.json({
        success: false,
        message: 'FDA Adverse Events 정보를 찾을 수 없습니다.',
        product
      });
    }

    // 부작용 통계를 빈도순으로 정렬
    const adverseEvents = eventsData.results
      .sort((a: any, b: any) => b.count - a.count)
      .slice(0, 20)
      .map((item: any) => ({
        reaction: item.term,
        count: item.count,
        percentage: ((item.count / eventsData.results.reduce((sum: number, r: any) => sum + r.count, 0)) * 100).toFixed(2) + '%'
      }));

    return c.json({
      success: true,
      source: 'FDA Adverse Event Reporting System (FAERS)',
      product,
      total_reports: eventsData.results.reduce((sum: number, r: any) => sum + r.count, 0),
      top_adverse_events: adverseEvents
    });

  } catch (error) {
    console.error('FDA Adverse Events Error:', error);
    return c.json({ 
      success: false,
      error: 'FDA Adverse Events API 조회 중 오류가 발생했습니다.' 
    }, 500);
  }
});

/**
 * GET /api/external/mfds/search?q=오젬픽&apiKey=YOUR_API_KEY
 * MFDS에서 의약품 검색
 * 
 * Note: API Key는 https://www.data.go.kr 에서 발급받아야 합니다.
 */
externalApiRoutes.get('/mfds/search', async (c) => {
  const query = c.req.query('q');
  const apiKey = c.req.query('apiKey');

  if (!query) {
    return c.json({ error: '검색어를 입력해주세요.' }, 400);
  }

  if (!apiKey) {
    return c.json({ 
      error: 'MFDS API Key가 필요합니다.',
      guide: 'https://www.data.go.kr 에서 API 키를 발급받으세요.'
    }, 400);
  }

  try {
    const mfdsData = await searchMFDSDrug(query, apiKey);

    if (!mfdsData || !mfdsData.body || !mfdsData.body.items) {
      return c.json({
        success: false,
        message: 'MFDS에서 검색 결과를 찾을 수 없습니다.',
        query
      });
    }

    return c.json({
      success: true,
      source: 'MFDS (식품의약품안전처)',
      query,
      products: mfdsData.body.items
    });

  } catch (error) {
    console.error('MFDS Search Error:', error);
    return c.json({ 
      success: false,
      error: 'MFDS API 조회 중 오류가 발생했습니다.' 
    }, 500);
  }
});

/**
 * GET /api/external/search-all?q=Wegovy
 * 모든 규제기관에서 동시 검색 (FDA + MFDS)
 */
externalApiRoutes.get('/search-all', async (c) => {
  const query = c.req.query('q');
  const mfdsApiKey = c.req.query('mfdsApiKey');

  if (!query) {
    return c.json({ error: '검색어를 입력해주세요.' }, 400);
  }

  try {
    // 병렬로 여러 API 호출
    const [fdaData, fdaLabel, fdaAdverse, mfdsData] = await Promise.all([
      searchFDADrug(query),
      searchFDALabel(query),
      searchFDAAdverseEvents(query),
      mfdsApiKey ? searchMFDSDrug(query, mfdsApiKey) : Promise.resolve(null)
    ]);

    return c.json({
      success: true,
      query,
      sources: {
        fda: {
          available: !!fdaData,
          drugs: fdaData?.results || [],
          labels: fdaLabel?.results || [],
          adverse_events: fdaAdverse?.results || []
        },
        mfds: {
          available: !!mfdsData,
          drugs: mfdsData?.body?.items || [],
          note: !mfdsApiKey ? 'MFDS API Key가 제공되지 않았습니다.' : undefined
        }
      }
    });

  } catch (error) {
    console.error('Search All Error:', error);
    return c.json({ 
      success: false,
      error: '통합 검색 중 오류가 발생했습니다.' 
    }, 500);
  }
});
