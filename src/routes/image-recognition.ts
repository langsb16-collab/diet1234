import { Hono } from 'hono';
import type { Env } from '../types';

export const imageRecognitionRoutes = new Hono<{ Bindings: Env }>();

/**
 * Image Recognition Integration
 * 
 * Supports multiple providers:
 * 1. Google Cloud Vision API (OCR + Label Detection)
 * 2. AWS Rekognition (Label + Text Detection)
 * 3. Azure Computer Vision (OCR + Object Detection)
 */

// ============================================================================
// Google Cloud Vision API
// ============================================================================

interface GoogleVisionResult {
  text?: string;
  labels?: string[];
  confidence?: number;
}

async function analyzeImageWithGoogleVision(
  imageData: ArrayBuffer,
  apiKey: string
): Promise<GoogleVisionResult> {
  try {
    const base64Image = arrayBufferToBase64(imageData);
    
    const url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
    
    const requestBody = {
      requests: [
        {
          image: {
            content: base64Image
          },
          features: [
            { type: 'TEXT_DETECTION', maxResults: 10 },
            { type: 'LABEL_DETECTION', maxResults: 10 },
            { type: 'LOGO_DETECTION', maxResults: 5 }
          ]
        }
      ]
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Google Vision API error: ${response.status}`);
    }

    const data = await response.json();
    const annotations = data.responses[0];

    return {
      text: annotations.textAnnotations?.[0]?.description || '',
      labels: annotations.labelAnnotations?.map((label: any) => label.description) || [],
      confidence: annotations.textAnnotations?.[0]?.confidence || 0
    };

  } catch (error) {
    console.error('Google Vision API Error:', error);
    throw error;
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Extract potential drug names from detected text
 */
function extractDrugNames(text: string): string[] {
  const drugNamePattern = /\b([A-Z][a-z]+(?:[A-Z][a-z]+)?)\b/g;
  const matches = text.match(drugNamePattern) || [];
  
  // Filter common words
  const commonWords = ['Tablet', 'Capsule', 'Pill', 'Mg', 'Ml', 'Rx', 'Only', 'Use', 'Take', 'Daily'];
  return matches.filter(word => !commonWords.includes(word));
}

/**
 * Match detected text/labels with products in database
 */
async function matchProductsInDatabase(
  db: D1Database,
  detectedText: string,
  labels: string[]
): Promise<any[]> {
  const drugNames = extractDrugNames(detectedText);
  const searchTerms = [...drugNames, ...labels].filter(Boolean);

  if (searchTerms.length === 0) {
    return [];
  }

  // Build search query
  const searchConditions = searchTerms.map(() => 
    `(p.product_name LIKE ? OR i.name_standard LIKE ? OR m.name LIKE ?)`
  ).join(' OR ');

  const searchParams = searchTerms.flatMap(term => [
    `%${term}%`,
    `%${term}%`,
    `%${term}%`
  ]);

  const query = `
    SELECT 
      p.product_id,
      p.product_name,
      p.dosage_form,
      p.strength,
      p.ndc_code,
      i.name_standard as ingredient_name,
      m.name as manufacturer_name,
      m.country as manufacturer_country,
      COUNT(DISTINCT a.approval_id) as approval_count,
      GROUP_CONCAT(DISTINCT a.country_code) as approved_countries
    FROM products p
    LEFT JOIN ingredients i ON p.ingredient_id = i.ingredient_id
    LEFT JOIN manufacturers m ON p.manufacturer_id = m.manufacturer_id
    LEFT JOIN approvals a ON p.product_id = a.product_id AND a.status = 'active'
    WHERE ${searchConditions}
    GROUP BY p.product_id
    ORDER BY approval_count DESC
    LIMIT 10
  `;

  const result = await db.prepare(query).bind(...searchParams).all();
  return result.results || [];
}

// ============================================================================
// API Endpoints
// ============================================================================

/**
 * POST /api/image-recognition/analyze
 * 
 * Analyze pill/medicine image and identify product
 * 
 * Request Body (multipart/form-data):
 * - image: File (image file)
 * - provider: string (optional: 'google' | 'aws' | 'azure', default: 'google')
 * - apiKey: string (API key for the chosen provider)
 * 
 * Response:
 * {
 *   success: true,
 *   analysis: {
 *     detected_text: string,
 *     detected_labels: string[],
 *     confidence: number
 *   },
 *   matched_products: Product[]
 * }
 */
imageRecognitionRoutes.post('/analyze', async (c) => {
  try {
    const formData = await c.req.formData();
    const imageFile = formData.get('image') as File;
    const provider = (formData.get('provider') as string) || 'google';
    const apiKey = formData.get('apiKey') as string;

    if (!imageFile) {
      return c.json({ error: '이미지 파일이 필요합니다.' }, 400);
    }

    if (!apiKey) {
      return c.json({ 
        error: 'API Key가 필요합니다.',
        guide: provider === 'google' 
          ? 'Google Cloud Console에서 Vision API 키를 발급받으세요: https://console.cloud.google.com'
          : 'API 키를 제공해주세요.'
      }, 400);
    }

    // Convert image to ArrayBuffer
    const imageData = await imageFile.arrayBuffer();

    // Analyze image with chosen provider
    let analysisResult: GoogleVisionResult;
    
    if (provider === 'google') {
      analysisResult = await analyzeImageWithGoogleVision(imageData, apiKey);
    } else {
      return c.json({ error: `지원하지 않는 provider: ${provider}` }, 400);
    }

    // Match products in database
    const { env } = c;
    const matchedProducts = await matchProductsInDatabase(
      env.DB,
      analysisResult.text || '',
      analysisResult.labels || []
    );

    return c.json({
      success: true,
      analysis: {
        detected_text: analysisResult.text,
        detected_labels: analysisResult.labels,
        confidence: analysisResult.confidence,
        extracted_drug_names: extractDrugNames(analysisResult.text || '')
      },
      matched_products: matchedProducts,
      total_matches: matchedProducts.length
    });

  } catch (error) {
    console.error('Image Recognition Error:', error);
    return c.json({ 
      success: false,
      error: '이미지 분석에 실패했습니다.',
      details: error instanceof Error ? error.message : '알 수 없는 오류'
    }, 500);
  }
});

/**
 * POST /api/image-recognition/analyze-simple
 * 
 * Simplified version without external API - uses mock data
 * For testing and demo purposes
 */
imageRecognitionRoutes.post('/analyze-simple', async (c) => {
  try {
    const formData = await c.req.formData();
    const imageFile = formData.get('image') as File;

    if (!imageFile) {
      return c.json({ error: '이미지 파일이 필요합니다.' }, 400);
    }

    // Mock analysis result (for demo)
    const mockAnalysis = {
      detected_text: 'Wegovy 2.4mg Injection Novo Nordisk',
      detected_labels: ['medicine', 'pharmaceutical', 'injection', 'syringe'],
      confidence: 0.95,
      extracted_drug_names: ['Wegovy', 'Novo', 'Nordisk']
    };

    // Search in database
    const { env } = c;
    const matchedProducts = await matchProductsInDatabase(
      env.DB,
      mockAnalysis.detected_text,
      mockAnalysis.detected_labels
    );

    return c.json({
      success: true,
      mode: 'demo',
      message: '실제 프로덕션에서는 Google Vision API를 사용합니다.',
      analysis: mockAnalysis,
      matched_products: matchedProducts,
      total_matches: matchedProducts.length
    });

  } catch (error) {
    console.error('Image Recognition Error:', error);
    return c.json({ 
      success: false,
      error: '이미지 분석에 실패했습니다.' 
    }, 500);
  }
});

/**
 * GET /api/image-recognition/providers
 * 
 * Get list of supported image recognition providers
 */
imageRecognitionRoutes.get('/providers', (c) => {
  return c.json({
    providers: [
      {
        id: 'google',
        name: 'Google Cloud Vision API',
        features: ['OCR', 'Label Detection', 'Logo Detection'],
        pricing: 'First 1000 requests/month free, then $1.50/1000',
        signup_url: 'https://console.cloud.google.com'
      },
      {
        id: 'aws',
        name: 'AWS Rekognition',
        features: ['Text Detection', 'Label Detection'],
        pricing: '$1.00/1000 images',
        signup_url: 'https://aws.amazon.com/rekognition',
        status: 'coming_soon'
      },
      {
        id: 'azure',
        name: 'Azure Computer Vision',
        features: ['OCR', 'Object Detection'],
        pricing: '$1.00/1000 transactions',
        signup_url: 'https://azure.microsoft.com/en-us/services/cognitive-services/computer-vision',
        status: 'coming_soon'
      }
    ]
  });
});
