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
  }
  // Apply translation immediately on page load
  changeLanguage(savedLang);
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
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
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
      <div class="mb-4 flex justify-between items-center">
        <p class="text-gray-700"><span class="font-bold">${data.total}</span>개의 제품을 찾았습니다.</p>
        <p class="text-xs text-gray-600">제품을 선택하여 비교하세요</p>
      </div>
      <div class="space-y-4">
    `;
    
    data.products.forEach(product => {
      const riskBadge = getRiskBadge(product.risk_level);
      const isSelected = selectedProducts.includes(product.product_id);
      html += `
        <div class="border border-gray-200 rounded p-2 hover:shadow-md transition ${isSelected ? 'bg-orange-50 border-orange-400' : ''}">
          <div class="flex items-start space-x-2">
            <input 
              type="checkbox" 
              value="${product.product_id}"
              ${isSelected ? 'checked' : ''}
              onclick="event.stopPropagation(); toggleProductSelection('${product.product_id}')"
              class="mt-1 w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
            />
            <div class="flex-1 cursor-pointer" onclick="viewProduct('${product.product_id}')">
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
                <button class="text-orange-600 hover:text-orange-700 text-xs font-semibold">
                  상세보기 <i class="fas fa-arrow-right ml-1"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    });
    
    html += '</div>';
    resultsDiv.innerHTML = html;
    
    // Show comparison button if products found
    document.getElementById('compareButtonContainer').classList.remove('hidden');
    updateCompareButton();
    
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
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
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
        <i class="fas fa-globe text-orange-600 mr-1"></i>
        국가별 허가 상태 (총 ${data.approvals.length}개국)
      </h4>
      
      <!-- 허가 요약 -->
      <div class="grid grid-cols-3 gap-2 mb-2">
        <div class="text-center p-2 bg-green-50 rounded">
          <div class="text-sm font-bold text-green-600">${data.approvals.filter(a => a.status === 'approved').length}</div>
          <div class="text-xs text-gray-600">승인</div>
        </div>
        <div class="text-center p-2 bg-yellow-50 rounded">
          <div class="text-sm font-bold text-yellow-600">${data.approvals.filter(a => a.status === 'under_review').length}</div>
          <div class="text-xs text-gray-600">심사중</div>
        </div>
        <div class="text-center p-2 bg-red-50 rounded">
          <div class="text-sm font-bold text-red-600">${data.approvals.filter(a => a.status === 'not_approved' || a.status === 'withdrawn').length}</div>
          <div class="text-xs text-gray-600">미승인</div>
        </div>
      </div>
      
      <div class="space-y-2">
        ${data.approvals.map(approval => {
          const statusColor = approval.status === 'approved' ? 'green' : 
                             approval.status === 'under_review' ? 'yellow' : 'red';
          const statusIcon = approval.status === 'approved' ? 'fa-check-circle' : 
                            approval.status === 'under_review' ? 'fa-clock' : 'fa-times-circle';
          const statusText = approval.status === 'approved' ? '✅ 승인됨' : 
                            approval.status === 'under_review' ? '⏳ 심사중' : '❌ 미승인';
          
          return `
            <div class="border-l-4 border-${statusColor}-500 bg-${statusColor}-50 p-2 rounded">
              <div class="flex items-start justify-between mb-1">
                <div class="flex-1">
                  <div class="flex items-center gap-1 mb-0.5">
                    <span class="text-xs font-bold text-gray-900">${approval.country_name}</span>
                    <span>${approval.icon}</span>
                    <span class="px-1.5 py-0.5 bg-white rounded text-xs font-semibold text-${statusColor}-700">
                      ${statusText}
                    </span>
                  </div>
                  <p class="text-xs text-gray-700 mb-1">${approval.legality_summary}</p>
                  ${approval.status === 'approved' ? `
                    <div class="flex items-center gap-2 text-xs text-gray-600">
                      <span><i class="fas fa-building mr-1"></i>${approval.regulatory_body}</span>
                      <span><i class="fas ${approval.prescription_status === 'rx' ? 'fa-prescription' : 'fa-pills'} mr-1"></i>${approval.prescription_status === 'rx' ? '처방약' : '일반약'}</span>
                      ${approval.approval_date ? `<span><i class="fas fa-calendar mr-1"></i>${approval.approval_date}</span>` : ''}
                    </div>
                  ` : ''}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
    
    <!-- Actions - 축소 -->
    <div class="flex space-x-2">
      <button 
        onclick="viewProduct('${data.product.product_id}')"
        class="flex-1 bg-orange-600 text-white px-3 py-2 rounded text-xs font-semibold hover:bg-orange-700 transition"
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
    low: '<i class="fas fa-info-circle text-orange-500"></i>',
    moderate: '<i class="fas fa-exclamation-circle text-yellow-500"></i>',
    high: '<i class="fas fa-exclamation-triangle text-orange-500"></i>',
    critical: '<i class="fas fa-ban text-red-600"></i>'
  };
  return icons[severity] || icons.moderate;
}

// ============================================================================
// Safety Score Display
// ============================================================================

function getSafetyScoreBadge(score, grade) {
  const gradeConfig = {
    green: { bg: 'bg-green-100', text: 'text-green-800', label: '매우 안전', icon: 'fa-shield-check' },
    light_green: { bg: 'bg-green-50', text: 'text-green-700', label: '비교적 안전', icon: 'fa-shield-alt' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: '주의 필요', icon: 'fa-exclamation-triangle' },
    red: { bg: 'bg-red-100', text: 'text-red-800', label: '위험', icon: 'fa-ban' }
  };
  
  const config = gradeConfig[grade] || gradeConfig.yellow;
  
  return `
    <div class="${config.bg} ${config.text} rounded-lg p-3 text-center">
      <div class="flex items-center justify-center gap-2 mb-1">
        <i class="fas ${config.icon} text-lg"></i>
        <span class="text-2xl font-bold">${score}</span>
        <span class="text-xs">/ 100</span>
      </div>
      <div class="text-xs font-semibold">${config.label}</div>
    </div>
  `;
}

function displaySafetyScoreDetails(score) {
  return `
    <div class="bg-white border rounded p-3 space-y-2">
      <h4 class="text-xs font-bold text-gray-900 mb-2">
        <i class="fas fa-chart-pie text-orange-600 mr-1"></i>
        안전 점수 세부사항
      </h4>
      
      <div class="space-y-1">
        <div class="flex justify-between items-center">
          <span class="text-xs text-gray-600">🔒 허가·정품성</span>
          <div class="flex items-center gap-1">
            <div class="w-20 bg-gray-200 rounded-full h-2">
              <div class="bg-orange-600 h-2 rounded-full" style="width: ${(score.score_regulatory/35)*100}%"></div>
            </div>
            <span class="text-xs font-semibold text-gray-900">${score.score_regulatory}/35</span>
          </div>
        </div>
        
        <div class="flex justify-between items-center">
          <span class="text-xs text-gray-600">📊 근거·효과</span>
          <div class="flex items-center gap-1">
            <div class="w-20 bg-gray-200 rounded-full h-2">
              <div class="bg-green-600 h-2 rounded-full" style="width: ${(score.score_efficacy/25)*100}%"></div>
            </div>
            <span class="text-xs font-semibold text-gray-900">${score.score_efficacy}/25</span>
          </div>
        </div>
        
        <div class="flex justify-between items-center">
          <span class="text-xs text-gray-600">⚕️ 안전성</span>
          <div class="flex items-center gap-1">
            <div class="w-20 bg-gray-200 rounded-full h-2">
              <div class="bg-yellow-600 h-2 rounded-full" style="width: ${(score.score_safety/25)*100}%"></div>
            </div>
            <span class="text-xs font-semibold text-gray-900">${score.score_safety}/25</span>
          </div>
        </div>
        
        <div class="flex justify-between items-center">
          <span class="text-xs text-gray-600">🚚 유통·추적</span>
          <div class="flex items-center gap-1">
            <div class="w-20 bg-gray-200 rounded-full h-2">
              <div class="bg-purple-600 h-2 rounded-full" style="width: ${(score.score_distribution/15)*100}%"></div>
            </div>
            <span class="text-xs font-semibold text-gray-900">${score.score_distribution}/15</span>
          </div>
        </div>
      </div>
      
      <div class="mt-3 pt-3 border-t text-xs text-gray-600">
        <p><strong>💡 소비자 체크포인트:</strong></p>
        <ul class="list-disc list-inside space-y-0.5 mt-1">
          ${score.score_regulatory >= 30 ? '<li class="text-green-700">✓ 정부 허가 확인됨</li>' : '<li class="text-red-700">✗ 허가 상태 불명확</li>'}
          ${score.score_efficacy >= 20 ? '<li class="text-green-700">✓ 임상 근거 충분</li>' : '<li class="text-yellow-700">△ 임상 근거 제한적</li>'}
          ${score.score_safety >= 20 ? '<li class="text-green-700">✓ 부작용 정보 투명</li>' : '<li class="text-red-700">✗ 안전성 정보 부족</li>'}
        </ul>
      </div>
    </div>
  `;
}

// ============================================================================
// Load and Display FAQs
// ============================================================================

async function loadFAQs(ingredientId = null) {
  try {
    let url = '/api/faqs';
    if (ingredientId) {
      url += `?ingredient=${ingredientId}`;
    }
    
    const response = await axios.get(url);
    const faqs = response.data.faqs;
    
    if (faqs.length === 0) {
      return;
    }
    
    const faqSection = document.getElementById('faqSection');
    const faqList = document.getElementById('faqList');
    
    let html = '';
    faqs.forEach((faq, index) => {
      const categoryColors = {
        general: 'blue',
        efficacy: 'green',
        safety: 'yellow',
        usage: 'purple',
        blacklist: 'red'
      };
      const color = categoryColors[faq.category] || 'gray';
      
      html += `
        <div class="border rounded p-2 hover:shadow-sm transition cursor-pointer" onclick="toggleFAQ('faq-${index}')">
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <p class="text-xs font-semibold text-gray-900">${faq.question}</p>
            </div>
            <i class="fas fa-chevron-down text-gray-400 text-xs" id="faq-icon-${index}"></i>
          </div>
          <div id="faq-${index}" class="hidden mt-2 pt-2 border-t">
            <p class="text-xs text-gray-700">${faq.answer}</p>
          </div>
        </div>
      `;
    });
    
    faqList.innerHTML = html;
    faqSection.classList.remove('hidden');
  } catch (error) {
    console.error('Error loading FAQs:', error);
  }
}

function toggleFAQ(faqId) {
  const faqContent = document.getElementById(faqId);
  const icon = document.getElementById(`${faqId}-icon`);
  
  if (faqContent.classList.contains('hidden')) {
    faqContent.classList.remove('hidden');
    icon.classList.remove('fa-chevron-down');
    icon.classList.add('fa-chevron-up');
  } else {
    faqContent.classList.add('hidden');
    icon.classList.remove('fa-chevron-up');
    icon.classList.add('fa-chevron-down');
  }
}

// Load general FAQs on page load
window.addEventListener('DOMContentLoaded', () => {
  loadFAQs();
});

// ============================================================================
// Product Comparison
// ============================================================================

let selectedProducts = [];

function toggleProductSelection(productId) {
  const index = selectedProducts.indexOf(productId);
  
  if (index > -1) {
    // Remove from selection
    selectedProducts.splice(index, 1);
  } else {
    // Add to selection (max 4)
    if (selectedProducts.length >= 4) {
      alert('최대 4개 제품까지 비교할 수 있습니다.');
      return;
    }
    selectedProducts.push(productId);
  }
  
  updateCompareButton();
  updateProductCheckboxes();
}

function updateCompareButton() {
  const compareBtn = document.getElementById('compareBtn');
  if (!compareBtn) return;
  
  if (selectedProducts.length >= 2) {
    compareBtn.disabled = false;
    compareBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    compareBtn.classList.add('hover:bg-orange-700');
    compareBtn.innerHTML = `<i class="fas fa-balance-scale mr-2"></i>비교하기 (${selectedProducts.length}개)`;
  } else {
    compareBtn.disabled = true;
    compareBtn.classList.add('opacity-50', 'cursor-not-allowed');
    compareBtn.classList.remove('hover:bg-orange-700');
    compareBtn.innerHTML = '<i class="fas fa-balance-scale mr-2"></i>제품 선택 (2-4개)';
  }
}

function updateProductCheckboxes() {
  selectedProducts.forEach(productId => {
    const checkbox = document.querySelector(`input[value="${productId}"]`);
    if (checkbox) {
      checkbox.checked = true;
    }
  });
}

async function compareProducts() {
  if (selectedProducts.length < 2) {
    alert('비교하려면 최소 2개의 제품을 선택하세요.');
    return;
  }
  
  try {
    const country = document.getElementById('countrySelect')?.value || 'KR';
    const response = await axios.get(`/api/compare?products=${selectedProducts.join(',')}&country=${country}`);
    
    displayComparison(response.data);
  } catch (error) {
    console.error('Comparison error:', error);
    alert('제품 비교 중 오류가 발생했습니다.');
  }
}

function displayComparison(data) {
  const resultsDiv = document.getElementById('results');
  
  // Build comparison table
  let html = `
    <div class="bg-white rounded-lg shadow-sm p-4">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-bold text-gray-900">
          <i class="fas fa-balance-scale mr-2 text-orange-600"></i>제품 비교
        </h3>
        <button onclick="clearComparison()" class="text-sm text-gray-600 hover:text-gray-900">
          <i class="fas fa-times mr-1"></i>닫기
        </button>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 text-xs">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-3 py-2 text-left font-semibold text-gray-700 sticky left-0 bg-gray-50">항목</th>
  `;
  
  // Product headers
  data.products.forEach(product => {
    html += `
      <th class="px-3 py-2 text-left font-semibold text-gray-700">
        ${product.product_name}
      </th>
    `;
  });
  
  html += `</tr></thead><tbody class="bg-white divide-y divide-gray-200">`;
  
  // Basic information
  html += createComparisonSection('기본 정보', [
    { label: '제품명', key: 'product_name' },
    { label: '성분명', key: 'generic_name' },
    { label: '제조사', key: 'manufacturer' },
    { label: '제형', key: 'dosage_form' },
    { label: '투여 경로', key: 'route' }
  ], data.products);
  
  // Approval information
  html += createComparisonSection('허가 정보', [
    { label: '허가 국가 수', key: 'approved_countries_count' }
  ], data.products);
  
  // Efficacy
  html += createComparisonSection('효능', [
    { label: '작용 기전', key: 'safety_profile.mechanism_detail' },
    { label: '6개월 감량률', key: 'safety_profile.weight_loss_6mo' },
    { label: '12개월 감량률', key: 'safety_profile.weight_loss_12mo' }
  ], data.products);
  
  // Safety
  html += createComparisonSection('안전성', [
    { label: '흔한 부작용', key: 'safety_profile.common_side_effects', isArray: true, limit: 3 },
    { label: '심각한 부작용', key: 'safety_profile.serious_side_effects', isArray: true, limit: 2 },
    { label: '금기사항', key: 'safety_profile.contraindications', isArray: true, limit: 3 },
    { label: '임신 등급', key: 'safety_profile.pregnancy_category' },
    { label: '수유 안전성', key: 'safety_profile.breastfeeding_safety' },
    { label: '중독 위험도', key: 'safety_profile.addiction_risk' }
  ], data.products);
  
  // Safety scores
  html += `
    <tr class="bg-orange-50">
      <td class="px-3 py-2 font-semibold text-gray-700 sticky left-0 bg-orange-50" colspan="${data.products.length + 1}">
        안전 점수
      </td>
    </tr>
  `;
  
  data.products.forEach((product, index) => {
    if (product.safety_score) {
      const gradeColors = {
        green: 'bg-green-100 text-green-800',
        light_green: 'bg-green-50 text-green-700',
        yellow: 'bg-yellow-100 text-yellow-800',
        red: 'bg-red-100 text-red-800'
      };
      
      const gradeClass = gradeColors[product.safety_score.grade] || 'bg-gray-100 text-gray-800';
      
      if (index === 0) {
        html += `<tr><td class="px-3 py-2 text-gray-700 sticky left-0 bg-white">총점</td>`;
      }
      
      html += `
        <td class="px-3 py-2">
          <div class="flex items-center space-x-2">
            <span class="text-lg font-bold text-gray-900">${product.safety_score.total}</span>
            <span class="px-2 py-1 rounded text-xs font-semibold ${gradeClass}">
              ${product.safety_score.grade.toUpperCase()}
            </span>
          </div>
          <div class="mt-1 text-xs text-gray-500">
            허가: ${product.safety_score.regulatory} | 
            효능: ${product.safety_score.efficacy} | 
            안전: ${product.safety_score.safety} | 
            유통: ${product.safety_score.distribution}
          </div>
        </td>
      `;
      
      if (index === data.products.length - 1) {
        html += '</tr>';
      }
    }
  });
  
  html += `
        </tbody>
      </table>
      </div>
    </div>
  `;
  
  resultsDiv.innerHTML = html;
  resultsDiv.classList.remove('hidden');
}

function createComparisonSection(title, fields, products) {
  let html = `
    <tr class="bg-orange-50">
      <td class="px-3 py-2 font-semibold text-gray-700 sticky left-0 bg-orange-50" colspan="${products.length + 1}">
        ${title}
      </td>
    </tr>
  `;
  
  fields.forEach(field => {
    html += '<tr>';
    html += `<td class="px-3 py-2 text-gray-700 sticky left-0 bg-white">${field.label}</td>`;
    
    products.forEach(product => {
      let value = getNestedValue(product, field.key);
      
      if (field.isArray && Array.isArray(value)) {
        value = value.slice(0, field.limit || 3).join(', ');
      }
      
      if (value === null || value === undefined || value === '') {
        value = '-';
      }
      
      html += `<td class="px-3 py-2 text-gray-600">${value}</td>`;
    });
    
    html += '</tr>';
  });
  
  return html;
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

function clearComparison() {
  selectedProducts = [];
  updateCompareButton();
  document.getElementById('results').innerHTML = '';
  document.getElementById('results').classList.add('hidden');
  
  // Uncheck all checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.checked = false;
  });
}
