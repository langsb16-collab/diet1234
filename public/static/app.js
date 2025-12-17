// DietMed Global - Frontend JavaScript

// Toggle sections
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
        <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer" 
             onclick="viewProduct('${product.product_id}')">
          <div class="flex justify-between items-start mb-2">
            <div class="flex-1">
              <h4 class="text-lg font-bold text-gray-900">${product.product_name}</h4>
              <p class="text-sm text-gray-600">${product.ingredient_name}</p>
            </div>
            <div>${riskBadge}</div>
          </div>
          <div class="text-sm text-gray-700 space-y-1">
            <p><i class="fas fa-industry text-gray-400 mr-2"></i>${product.manufacturer_name}</p>
            <p><i class="fas fa-pills text-gray-400 mr-2"></i>${product.dosage_form} | ${product.strength}</p>
            <p><i class="fas fa-globe text-gray-400 mr-2"></i>${product.approval_count}개 국가 승인</p>
          </div>
          <div class="mt-3 text-right">
            <button class="text-blue-600 hover:text-blue-700 font-semibold">
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
    <!-- Risk Alert -->
    ${data.blacklist_check ? `
      <div class="bg-red-50 border-l-4 border-red-600 p-6 mb-6">
        <div class="flex items-start">
          <i class="fas fa-ban text-red-600 text-3xl mr-4"></i>
          <div class="flex-1">
            <h4 class="text-xl font-bold text-red-900 mb-2">⛔ 금지 성분 감지</h4>
            <p class="text-red-800 font-semibold mb-3">${data.blacklist_check.ingredient_name}</p>
            <div class="bg-white rounded p-4 text-sm">
              <p class="font-semibold text-gray-900 mb-2">금지 사유:</p>
              <p class="text-gray-700 mb-3">${data.blacklist_check.ban_reason}</p>
              <p class="font-semibold text-gray-900 mb-2">건강 위험:</p>
              <ul class="list-disc list-inside text-gray-700 space-y-1">
                ${data.blacklist_check.health_risks.map(risk => `<li>${risk}</li>`).join('')}
              </ul>
              <div class="mt-4 pt-4 border-t">
                <p class="font-semibold text-red-900">⚠️ 이 제품을 복용 중이라면 즉시 중단하고 의사와 상담하세요.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ` : ''}
    
    <!-- Product Info -->
    <div class="bg-white border rounded-lg p-6 mb-6">
      <div class="flex justify-between items-start mb-4">
        <div class="flex-1">
          <h3 class="text-2xl font-bold text-gray-900 mb-2">${data.product.product_name}</h3>
          <p class="text-lg text-gray-700">${data.ingredient.name_standard}</p>
        </div>
        <div>${riskBadge}</div>
      </div>
      
      <div class="grid md:grid-cols-2 gap-4 mb-4">
        <div class="text-sm">
          <p class="text-gray-600"><i class="fas fa-industry mr-2"></i><strong>제조사:</strong> ${data.product.manufacturer_name}</p>
          <p class="text-gray-600"><i class="fas fa-pills mr-2"></i><strong>제형:</strong> ${data.product.dosage_form}</p>
          <p class="text-gray-600"><i class="fas fa-weight mr-2"></i><strong>용량:</strong> ${data.product.strength}</p>
        </div>
        <div class="text-sm">
          <p class="text-gray-600"><i class="fas fa-barcode mr-2"></i><strong>NDC:</strong> ${data.product.ndc_code || 'N/A'}</p>
          <p class="text-gray-600"><i class="fas fa-snowflake mr-2"></i><strong>보관:</strong> ${data.product.storage_conditions || 'N/A'}</p>
        </div>
      </div>
      
      ${data.risk_assessment.risk_factors.length > 0 ? `
        <div class="mt-4 bg-gray-50 rounded p-4">
          <h4 class="font-bold text-gray-900 mb-2">⚠️ 주의사항</h4>
          <ul class="space-y-2">
            ${data.risk_assessment.risk_factors.map(factor => `
              <li class="text-sm text-gray-700">
                <span class="font-semibold">${getSeverityIcon(factor.severity)}</span>
                ${factor.description}
              </li>
            `).join('')}
          </ul>
        </div>
      ` : ''}
    </div>
    
    <!-- Country Approvals -->
    <div class="bg-white border rounded-lg p-6 mb-6">
      <h4 class="text-xl font-bold text-gray-900 mb-4">
        <i class="fas fa-globe text-blue-600 mr-2"></i>
        국가별 허가 상태
      </h4>
      <div class="space-y-3">
        ${data.approvals.map(approval => `
          <div class="border-l-4 ${approval.status === 'approved' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'} p-4 rounded">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <p class="font-semibold text-gray-900 mb-1">
                  ${approval.country_name} <span class="ml-2">${approval.icon}</span>
                </p>
                <p class="text-sm text-gray-700 mb-2">${approval.legality_summary}</p>
                ${approval.status === 'approved' ? `
                  <p class="text-xs text-gray-600">
                    <i class="fas fa-check-circle mr-1"></i>
                    ${approval.regulatory_body} | ${approval.prescription_status === 'rx' ? '전문의약품' : '일반의약품'}
                  </p>
                ` : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    
    <!-- Actions -->
    <div class="flex space-x-4">
      <button 
        onclick="viewProduct('${data.product.product_id}')"
        class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        <i class="fas fa-info-circle mr-2"></i>상세 정보 보기
      </button>
      <button 
        onclick="reportProduct('${data.product.product_id}')"
        class="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
      >
        <i class="fas fa-flag mr-2"></i>문제 신고
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
    safe: '<span class="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full"><i class="fas fa-check-circle mr-1"></i>안전</span>',
    caution: '<span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-semibold rounded-full"><i class="fas fa-exclamation-triangle mr-1"></i>주의</span>',
    high_risk: '<span class="px-3 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded-full"><i class="fas fa-ban mr-1"></i>고위험</span>'
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
