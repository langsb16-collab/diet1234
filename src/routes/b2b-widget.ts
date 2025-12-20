import { Hono } from 'hono';
import type { Env } from '../types';

export const b2bWidgetRoutes = new Hono<{ Bindings: Env }>();

// ============================================================================
// B2B Widget API
// ============================================================================

/**
 * GET /api/b2b/widget/product-verification
 * 
 * Embeddable widget for product verification
 * Can be embedded in pharmacy/ecommerce websites
 * 
 * Query Parameters:
 * - productId: Product ID to verify
 * - ndc: NDC code to verify
 * - theme: light | dark
 * - lang: en | ko | ja | zh
 */
b2bWidgetRoutes.get('/widget/product-verification', async (c) => {
  const productId = c.req.query('productId');
  const ndc = c.req.query('ndc');
  const theme = c.req.query('theme') || 'light';
  const lang = c.req.query('lang') || 'en';

  if (!productId && !ndc) {
    return c.json({ error: 'productId or ndc is required' }, 400);
  }

  try {
    const { env } = c;

    // Get product information
    let product;
    if (productId) {
      product = await env.DB.prepare(`
        SELECT 
          p.product_id,
          p.product_name,
          p.ndc_code,
          p.manufacturer_name,
          i.name_standard as ingredient_name,
          COUNT(DISTINCT a.approval_id) as approval_count,
          GROUP_CONCAT(DISTINCT a.country_code) as approved_countries
        FROM products p
        LEFT JOIN ingredients i ON p.ingredient_id = i.ingredient_id
        LEFT JOIN approvals a ON p.product_id = a.product_id AND a.status = 'active'
        WHERE p.product_id = ?
        GROUP BY p.product_id
      `).bind(productId).first();
    } else if (ndc) {
      product = await env.DB.prepare(`
        SELECT 
          p.product_id,
          p.product_name,
          p.ndc_code,
          p.manufacturer_name,
          i.name_standard as ingredient_name,
          COUNT(DISTINCT a.approval_id) as approval_count,
          GROUP_CONCAT(DISTINCT a.country_code) as approved_countries
        FROM products p
        LEFT JOIN ingredients i ON p.ingredient_id = i.ingredient_id
        LEFT JOIN approvals a ON p.product_id = a.product_id AND a.status = 'active'
        WHERE p.ndc_code = ?
        GROUP BY p.product_id
      `).bind(ndc).first();
    }

    if (!product) {
      return c.json({ error: 'Product not found' }, 404);
    }

    // Get safety score
    const safetyScore = await env.DB.prepare(`
      SELECT total_score, safety_grade
      FROM safety_scores
      WHERE product_id = ?
    `).bind(product.product_id).first();

    return c.json({
      success: true,
      product: {
        id: product.product_id,
        name: product.product_name,
        ndc: product.ndc_code,
        manufacturer: product.manufacturer_name,
        ingredient: product.ingredient_name,
        approval_count: product.approval_count,
        approved_countries: product.approved_countries?.split(',') || [],
        safety_score: safetyScore?.total_score || 0,
        safety_grade: safetyScore?.safety_grade || 'unknown'
      },
      widget_html: generateWidgetHTML(product, safetyScore, theme, lang)
    });

  } catch (error) {
    console.error('B2B Widget Error:', error);
    return c.json({ error: 'Widget generation failed' }, 500);
  }
});

/**
 * GET /api/b2b/widget/embed.js
 * 
 * JavaScript embed code for the widget
 */
b2bWidgetRoutes.get('/widget/embed.js', (c) => {
  const embedScript = `
(function() {
  const DIETMED_API = 'https://puke365.net/api/b2b';
  
  function loadWidget(container, options) {
    const productId = options.productId || container.dataset.productId;
    const ndc = options.ndc || container.dataset.ndc;
    const theme = options.theme || container.dataset.theme || 'light';
    const lang = options.lang || container.dataset.lang || 'en';
    
    if (!productId && !ndc) {
      console.error('DietMed Widget: productId or ndc is required');
      return;
    }
    
    const url = \`\${DIETMED_API}/widget/product-verification?productId=\${productId || ''}&ndc=\${ndc || ''}&theme=\${theme}&lang=\${lang}\`;
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          container.innerHTML = data.widget_html;
        } else {
          container.innerHTML = '<div class="dietmed-widget-error">Failed to load widget</div>';
        }
      })
      .catch(err => {
        console.error('DietMed Widget Error:', err);
        container.innerHTML = '<div class="dietmed-widget-error">Network error</div>';
      });
  }
  
  // Auto-load widgets
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.dietmed-widget').forEach(container => {
      loadWidget(container, {});
    });
  });
  
  // Export API
  window.DietMedWidget = { load: loadWidget };
})();
  `;

  return c.text(embedScript, 200, {
    'Content-Type': 'application/javascript',
    'Cache-Control': 'public, max-age=3600'
  });
});

/**
 * GET /api/b2b/widget/embed-example.html
 * 
 * Example HTML page showing how to use the widget
 */
b2bWidgetRoutes.get('/widget/embed-example.html', (c) => {
  const exampleHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DietMed Widget Example</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            color: #333;
        }
        .example-section {
            margin: 30px 0;
            padding: 20px;
            background: #f5f5f5;
            border-radius: 8px;
        }
        code {
            background: #fff;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
        pre {
            background: #fff;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
        }
    </style>
</head>
<body>
    <h1>DietMed B2B Widget Integration Example</h1>
    
    <div class="example-section">
        <h2>Example 1: Simple Product Widget</h2>
        <p>Add this code to your HTML:</p>
        <pre><code>&lt;!-- Load Widget Script --&gt;
&lt;script src="https://puke365.net/api/b2b/widget/embed.js"&gt;&lt;/script&gt;

&lt;!-- Widget Container --&gt;
&lt;div class="dietmed-widget" data-product-id="PROD001"&gt;&lt;/div&gt;</code></pre>
        
        <h3>Live Demo:</h3>
        <div class="dietmed-widget" data-product-id="PROD001" data-theme="light"></div>
    </div>
    
    <div class="example-section">
        <h2>Example 2: NDC Code Lookup</h2>
        <pre><code>&lt;div class="dietmed-widget" data-ndc="0169-4517-02"&gt;&lt;/div&gt;</code></pre>
        
        <h3>Live Demo:</h3>
        <div class="dietmed-widget" data-ndc="0169-4517-02" data-theme="light"></div>
    </div>
    
    <div class="example-section">
        <h2>Example 3: Dark Theme</h2>
        <pre><code>&lt;div class="dietmed-widget" 
     data-product-id="PROD002" 
     data-theme="dark"&gt;&lt;/div&gt;</code></pre>
        
        <h3>Live Demo:</h3>
        <div class="dietmed-widget" data-product-id="PROD002" data-theme="dark"></div>
    </div>
    
    <div class="example-section">
        <h2>Parameters</h2>
        <ul>
            <li><code>data-product-id</code>: Product ID (e.g., "PROD001")</li>
            <li><code>data-ndc</code>: NDC code (e.g., "0169-4517-02")</li>
            <li><code>data-theme</code>: Theme ("light" or "dark", default: "light")</li>
            <li><code>data-lang</code>: Language ("en", "ko", "ja", "zh", default: "en")</li>
        </ul>
    </div>
    
    <script src="https://puke365.net/api/b2b/widget/embed.js"></script>
</body>
</html>
  `;

  return c.html(exampleHTML);
});

// ============================================================================
// Helper Functions
// ============================================================================

function generateWidgetHTML(product: any, safetyScore: any, theme: string, lang: string): string {
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1a1a1a' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#333333';
  const borderColor = isDark ? '#333333' : '#e0e0e0';
  
  const gradeColors: Record<string, string> = {
    'green': '#10b981',
    'light_green': '#84cc16',
    'yellow': '#fbbf24',
    'red': '#ef4444',
    'unknown': '#6b7280'
  };

  const gradeColor = gradeColors[safetyScore?.safety_grade || 'unknown'];

  return `
<div style="
  background: ${bgColor};
  color: ${textColor};
  border: 1px solid ${borderColor};
  border-radius: 8px;
  padding: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
  max-width: 400px;
">
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
    <h3 style="margin: 0; font-size: 16px; font-weight: 600;">${product.product_name}</h3>
    <div style="
      background: ${gradeColor};
      color: white;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 600;
    ">${safetyScore?.total_score || 0}</div>
  </div>
  
  <div style="font-size: 14px; color: ${isDark ? '#a0a0a0' : '#666'}; margin-bottom: 8px;">
    <div><strong>Ingredient:</strong> ${product.ingredient_name}</div>
    <div><strong>Manufacturer:</strong> ${product.manufacturer_name}</div>
    <div><strong>NDC:</strong> ${product.ndc_code}</div>
  </div>
  
  <div style="font-size: 12px; color: ${isDark ? '#808080' : '#999'}; margin-top: 12px; padding-top: 12px; border-top: 1px solid ${borderColor};">
    ✓ Approved in ${product.approval_count} ${product.approval_count === 1 ? 'country' : 'countries'}
  </div>
  
  <div style="margin-top: 12px; text-align: center;">
    <a href="https://puke365.net/api/products/${product.product_id}" 
       target="_blank"
       style="
         color: #2563eb;
         text-decoration: none;
         font-size: 12px;
         font-weight: 500;
       ">
      View Full Details →
    </a>
  </div>
  
  <div style="
    margin-top: 12px;
    padding-top: 8px;
    border-top: 1px solid ${borderColor};
    font-size: 10px;
    color: ${isDark ? '#666' : '#999'};
    text-align: center;
  ">
    Powered by <a href="https://puke365.net" target="_blank" style="color: inherit;">DietMed Global</a>
  </div>
</div>
  `.trim();
}
