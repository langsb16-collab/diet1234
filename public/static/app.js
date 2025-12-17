// DietMed Global - Frontend JavaScript

// ============================================================================
// Multi-language Support
// ============================================================================

const translations = {
  ko: {
    hero_title: '안전한 다이어트 의약품 선택',
    hero_subtitle: '바코드 스캔으로 즉시 확인하는<br>국가별 허가 상태 · 위조 위험 · 합법 구매처',
    btn_scan: '스캔',
    btn_list: '목록',
    search_title: '제품 검색',
    search_placeholder: '제품명 입력 (예: Wegovy)',
    btn_search: '검색',
    barcode_title: '바코드 스캔',
    barcode_placeholder: '바코드 번호 (예: 0169-4517-02)',
    btn_verify: '제품 확인',
    feature1_title: '허가 상태',
    feature1_desc: '전세계 규제기관 실시간 정보',
    feature2_title: '위조 탐지',
    feature2_desc: 'AI 기반 위험 패턴 분석',
    feature3_title: '합법 구매',
    feature3_desc: '인증 약국만 연결',
    stats_title: '플랫폼 통계',
    stats1: '제품',
    stats2: '국가',
    stats3: '차단',
    stats4: '정확도'
  },
  en: {
    hero_title: 'Safe Diet Medication Selection',
    hero_subtitle: 'Instant verification via barcode scan<br>Approval status · Counterfeit risk · Legal purchase',
    btn_scan: 'Scan',
    btn_list: 'List',
    search_title: 'Product Search',
    search_placeholder: 'Enter product name (e.g., Wegovy)',
    btn_search: 'Search',
    barcode_title: 'Barcode Scan',
    barcode_placeholder: 'Enter barcode (e.g., 0169-4517-02)',
    btn_verify: 'Verify Product',
    feature1_title: 'Approval Status',
    feature1_desc: 'Real-time global regulatory info',
    feature2_title: 'Counterfeit Detection',
    feature2_desc: 'AI-based risk pattern analysis',
    feature3_title: 'Legal Purchase',
    feature3_desc: 'Certified pharmacies only',
    stats_title: 'Platform Statistics',
    stats1: 'Products',
    stats2: 'Countries',
    stats3: 'Blocked',
    stats4: 'Accuracy'
  },
  zh: {
    hero_title: '安全的减肥药物选择',
    hero_subtitle: '通过条形码扫描即时验证<br>批准状态 · 假药风险 · 合法购买',
    btn_scan: '扫描',
    btn_list: '列表',
    search_title: '产品搜索',
    search_placeholder: '输入产品名称（例：Wegovy）',
    btn_search: '搜索',
    barcode_title: '条形码扫描',
    barcode_placeholder: '输入条形码（例：0169-4517-02）',
    btn_verify: '验证产品',
    feature1_title: '批准状态',
    feature1_desc: '全球监管机构实时信息',
    feature2_title: '假药检测',
    feature2_desc: '基于AI的风险模式分析',
    feature3_title: '合法购买',
    feature3_desc: '仅连接认证药店',
    stats_title: '平台统计',
    stats1: '产品',
    stats2: '国家',
    stats3: '拦截',
    stats4: '准确度'
  },
  ja: {
    hero_title: '安全なダイエット医薬品の選択',
    hero_subtitle: 'バーコードスキャンで即座に確認<br>承認状況 · 偽造リスク · 合法購入',
    btn_scan: 'スキャン',
    btn_list: 'リスト',
    search_title: '製品検索',
    search_placeholder: '製品名を入力（例：Wegovy）',
    btn_search: '検索',
    barcode_title: 'バーコードスキャン',
    barcode_placeholder: 'バーコードを入力（例：0169-4517-02）',
    btn_verify: '製品確認',
    feature1_title: '承認状況',
    feature1_desc: '世界の規制当局のリアルタイム情報',
    feature2_title: '偽造検出',
    feature2_desc: 'AIベースのリスクパターン分析',
    feature3_title: '合法購入',
    feature3_desc: '認定薬局のみ接続',
    stats_title: 'プラットフォーム統計',
    stats1: '製品',
    stats2: '国',
    stats3: 'ブロック',
    stats4: '精度'
  }
};

let currentLang = 'ko';

function changeLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];
  
  // Update document language
  document.documentElement.lang = lang;
  
  // Update all translatable elements
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (t[key]) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = t[key];
      } else {
        element.innerHTML = t[key];
      }
    }
  });
  
  console.log(`Language changed to: ${lang}`);
  
  // Store language preference
  localStorage.setItem('dietmed_lang', lang);
}

// Load saved language preference
window.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('dietmed_lang') || 'ko';
  const langDropdown = document.getElementById('langDropdown');
  if (langDropdown) {
    langDropdown.value = savedLang;
    changeLanguage(savedLang);
  }
});

// ============================================================================
// Toggle sections
// ============================================================================

document.getElementById('scanBtn')?.addEventListener('click', () => {
  document.getElementById('scanSection').classList.remove('hidden');
  document.getElementById('scanSection').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('searchBtn')?.addEventListener('click', () => {
  document.getElementById('searchSection').scrollIntoView({ behavior: 'smooth' });
});

// Enter key handlers
document.getElementById('searchInput')?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchProducts();
  }
});

document.getElementById('barcodeInput')?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    scanBarcode();
  }
});

// ============================================================================
// Product Search
// ============================================================================

async function searchProducts() {
  const query = document.getElementById('searchInput').value.trim();
  const resultsDiv = document.getElementById('searchResults');
  
  if (!query || query.length < 2) {
    resultsDiv.innerHTML = `
      <div class="text-center py-8 text-gray-500">
        <i class="fas fa-search text-4xl mb-4"></i>
        <p>검색어를 2자 이상 입력해주세요.</p>
      </div>
    `;
    return;
  }
  
  resultsDiv.innerHTML = `
    <div class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p class="text-gray-600">검색 중...</p>
    </div>
  `;
  
  try {
    const response = await axios.get(`/api/products/search?q=${encodeURIComponent(query)}`);
    const data = response.data;
    
    if (data.products.length === 0) {
      resultsDiv.innerHTML = `
        <div class="text-center py-8 text-gray-500">
          <i class="fas fa-info-circle text-4xl mb-4"></i>
          <p>검색 결과가 없습니다.</p>
          <p class="text-sm mt-2">다른 검색어로 시도해보세요.</p>
        </div>
      `;
      return;
    }
    
    let html = `
      <div class="mb-4">
        <p class="text-gray-700"><span class="font-bold">${data.total}</span>개의 제품을 찾았습니다.</p>
      </div>
      <div class="space-y-4">
    `;
    
    data.products.forEach(product => {
      const riskBadge = getRiskBadge(product.risk_level);
      html += `
        <div class="border border-gray-200 rounded p-2 hover:shadow-md transition cursor-pointer" 
             onclick="viewProduct('${product.product_id}')">
          <div class="flex justify-between items-start mb-1">
            <div class="flex-1">
              <h4 class="text-xs font-bold text-gray-900">${product.product_name}</h4>
              <p class="text-xs text-gray-600">${product.ingredient_name}</p>
            </div>
            <div>${riskBadge}</div>
          </div>
          <div class="text-xs text-gray-700 space-y-0.5">
            <p><i class="fas fa-industry text-gray-400 mr-1"></i>${product.manufacturer_name}</p>
            <p><i class="fas fa-pills text-gray-400 mr-1"></i>${product.dosage_form} | ${product.strength}</p>
            <p><i class="fas fa-globe text-gray-400 mr-1"></i>${product.approval_count}개 국가 승인</p>
          </div>
          <div class="mt-2 text-right">
            <button class="text-blue-600 hover:text-blue-700 text-xs font-semibold">
              상세보기 <i class="fas fa-arrow-right ml-1"></i>
            </button>
          </div>
        </div>
      `;
    });
    
    html += '</div>';
    resultsDiv.innerHTML = html;
    
  } catch (error) {
    console.error('Search error:', error);
    resultsDiv.innerHTML = `
      <div class="text-center py-8 text-red-500">
        <i class="fas fa-exclamation-circle text-4xl mb-4"></i>
        <p>검색 중 오류가 발생했습니다.</p>
        <p class="text-sm mt-2">${error.message}</p>
      </div>
    `;
  }
}

// ============================================================================
// Barcode Scan
// ============================================================================

async function scanBarcode() {
  const barcode = document.getElementById('barcodeInput').value.trim();
  const resultDiv = document.getElementById('scanResult');
  
  if (!barcode) {
    resultDiv.innerHTML = `
      <div class="text-center py-8 text-gray-500">
        <i class="fas fa-barcode text-4xl mb-4"></i>
        <p>바코드 번호를 입력해주세요.</p>
      </div>
    `;
    return;
  }
  
  resultDiv.innerHTML = `
    <div class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p class="text-gray-600">제품 확인 중...</p>
    </div>
  `;
  
  try {
    const response = await axios.post('/api/scan/barcode', { 
      barcode,
      country: 'KR'
    });
    const data = response.data;
    
    displayScanResult(data);
    
  } catch (error) {
    console.error('Scan error:', error);
    
    if (error.response?.status === 404) {
      resultDiv.innerHTML = `
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6">
          <div class="flex items-start">
            <i class="fas fa-exclamation-triangle text-yellow-400 text-2xl mr-4 mt-1"></i>
            <div class="flex-1">
              <h4 class="text-lg font-bold text-yellow-800 mb-2">제품을 찾을 수 없습니다</h4>
              <p class="text-yellow-700 mb-4">
                입력하신 바코드 번호에 해당하는 제품이 데이터베이스에 없습니다.
              </p>
              <div class="bg-white rounded p-4 text-sm">
                <p class="font-semibold text-gray-900 mb-2">확인사항:</p>
                <ul class="list-disc list-inside text-gray-700 space-y-1">
                  <li>바코드 번호를 정확히 입력했는지 확인해주세요</li>
                  <li>제품 포장에서 NDC 코드 또는 EAN 코드를 찾아보세요</li>
                  <li>의심스러운 제품은 구매를 중단하고 신고해주세요</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      resultDiv.innerHTML = `
        <div class="text-center py-8 text-red-500">
          <i class="fas fa-exclamation-circle text-4xl mb-4"></i>
          <p>스캔 중 오류가 발생했습니다.</p>
          <p class="text-sm mt-2">${error.message}</p>
        </div>
      `;
    }
  }
}

// ============================================================================
// Display Scan Result
// ============================================================================

function displayScanResult(data) {
  const resultDiv = document.getElementById('scanResult');
  const riskBadge = getRiskBadge(data.risk_assessment.risk_level);
  
  let html = `
    <!-- Risk Alert - 축소 -->
    ${data.blacklist_check ? `
      <div class="bg-red-50 border-l-4 border-red-600 p-2 mb-2">
        <div class="flex items-start">
          <i class="fas fa-ban text-red-600 text-lg mr-2"></i>
          <div class="flex-1">
            <h4 class="text-xs font-bold text-red-900 mb-1">⛔ 금지 성분 감지</h4>
            <p class="text-xs text-red-800 font-semibold mb-2">${data.blacklist_check.ingredient_name}</p>
            <div class="bg-white rounded p-2 text-xs">
              <p class="font-semibold text-gray-900 mb-1">금지 사유:</p>
              <p class="text-gray-700 mb-2">${data.blacklist_check.ban_reason}</p>
              <p class="font-semibold text-gray-900 mb-1">건강 위험:</p>
              <ul class="list-disc list-inside text-gray-700 space-y-0.5">
                ${data.blacklist_check.health_risks.map(risk => `<li>${risk}</li>`).join('')}
              </ul>
              <div class="mt-2 pt-2 border-t">
                <p class="font-semibold text-red-900">⚠️ 즉시 중단하고 의사와 상담하세요.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ` : ''}
    
    <!-- Product Info - 축소 -->
    <div class="bg-white border rounded p-2 mb-2">
      <div class="flex justify-between items-start mb-2">
        <div class="flex-1">
          <h3 class="text-sm font-bold text-gray-900 mb-1">${data.product.product_name}</h3>
          <p class="text-xs text-gray-700">${data.ingredient.name_standard}</p>
        </div>
        <div>${riskBadge}</div>
      </div>
      
      <div class="grid grid-cols-2 gap-2 mb-2">
        <div class="text-xs">
          <p class="text-gray-600"><i class="fas fa-industry mr-1"></i><strong>제조:</strong> ${data.product.manufacturer_name}</p>
          <p class="text-gray-600"><i class="fas fa-pills mr-1"></i><strong>제형:</strong> ${data.product.dosage_form}</p>
          <p class="text-gray-600"><i class="fas fa-weight mr-1"></i><strong>용량:</strong> ${data.product.strength}</p>
        </div>
        <div class="text-xs">
          <p class="text-gray-600"><i class="fas fa-barcode mr-1"></i><strong>NDC:</strong> ${data.product.ndc_code || 'N/A'}</p>
          <p class="text-gray-600"><i class="fas fa-snowflake mr-1"></i><strong>보관:</strong> ${data.product.storage_conditions || 'N/A'}</p>
        </div>
      </div>
      
      ${data.risk_assessment.risk_factors.length > 0 ? `
        <div class="mt-2 bg-gray-50 rounded p-2">
          <h4 class="text-xs font-bold text-gray-900 mb-1">⚠️ 주의사항</h4>
          <ul class="space-y-1">
            ${data.risk_assessment.risk_factors.map(factor => `
              <li class="text-xs text-gray-700">
                <span class="font-semibold">${getSeverityIcon(factor.severity)}</span>
                ${factor.description}
              </li>
            `).join('')}
          </ul>
        </div>
      ` : ''}
    </div>
    
    <!-- Country Approvals - 축소 -->
    <div class="bg-white border rounded p-2 mb-2">
      <h4 class="text-xs font-bold text-gray-900 mb-2">
        <i class="fas fa-globe text-blue-600 mr-1"></i>
        국가별 허가 상태
      </h4>
      <div class="space-y-2">
        ${data.approvals.map(approval => `
          <div class="border-l-4 ${approval.status === 'approved' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'} p-2 rounded">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <p class="text-xs font-semibold text-gray-900 mb-0.5">
                  ${approval.country_name} <span class="ml-1">${approval.icon}</span>
                </p>
                <p class="text-xs text-gray-700 mb-1">${approval.legality_summary}</p>
                ${approval.status === 'approved' ? `
                  <p class="text-xs text-gray-600">
                    <i class="fas fa-check-circle mr-1"></i>
                    ${approval.regulatory_body} | ${approval.prescription_status === 'rx' ? '처방약' : '일반약'}
                  </p>
                ` : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    
    <!-- Actions - 축소 -->
    <div class="flex space-x-2">
      <button 
        onclick="viewProduct('${data.product.product_id}')"
        class="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-xs font-semibold hover:bg-blue-700 transition"
      >
        <i class="fas fa-info-circle mr-1"></i>상세
      </button>
      <button 
        onclick="reportProduct('${data.product.product_id}')"
        class="flex-1 bg-gray-600 text-white px-3 py-2 rounded text-xs font-semibold hover:bg-gray-700 transition"
      >
        <i class="fas fa-flag mr-1"></i>신고
      </button>
    </div>
  `;
  
  resultDiv.innerHTML = html;
}

// ============================================================================
// View Product Detail
// ============================================================================

async function viewProduct(productId) {
  // In a real app, this would navigate to a detail page
  // For now, we'll show an alert
  try {
    const response = await axios.get(`/api/products/${productId}?country=KR`);
    const data = response.data;
    
    alert(`제품 상세 정보:\n\n제품명: ${data.product.product_name}\n성분: ${data.ingredient.name_standard}\n제조사: ${data.product.manufacturer_name}\n\n위험도: ${data.risk_assessment.risk_level}\n점수: ${data.risk_assessment.risk_score}/100`);
  } catch (error) {
    console.error('Error fetching product detail:', error);
    alert('제품 정보를 가져오는 중 오류가 발생했습니다.');
  }
}

// ============================================================================
// Report Product
// ============================================================================

function reportProduct(productId) {
  const description = prompt('신고 사유를 입력해주세요:');
  
  if (!description) return;
  
  axios.post('/api/reports', {
    report_type: 'suspicious_product',
    product_id: productId,
    description: description
  })
  .then(response => {
    alert('신고가 접수되었습니다. 감사합니다.');
  })
  .catch(error => {
    console.error('Report error:', error);
    alert('신고 접수 중 오류가 발생했습니다.');
  });
}

// ============================================================================
// Helper Functions
// ============================================================================

function getRiskBadge(riskLevel) {
  const badges = {
    safe: '<span class="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-semibold rounded-full"><i class="fas fa-check-circle mr-0.5"></i>안전</span>',
    caution: '<span class="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full"><i class="fas fa-exclamation-triangle mr-0.5"></i>주의</span>',
    high_risk: '<span class="px-2 py-0.5 bg-red-100 text-red-800 text-xs font-semibold rounded-full"><i class="fas fa-ban mr-0.5"></i>고위험</span>'
  };
  return badges[riskLevel] || badges.caution;
}

function getSeverityIcon(severity) {
  const icons = {
    low: '<i class="fas fa-info-circle text-blue-500"></i>',
    moderate: '<i class="fas fa-exclamation-circle text-yellow-500"></i>',
    high: '<i class="fas fa-exclamation-triangle text-orange-500"></i>',
    critical: '<i class="fas fa-ban text-red-600"></i>'
  };
  return icons[severity] || icons.moderate;
}
