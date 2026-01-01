// DietMed Global - Frontend JavaScript

// ============================================================================
// Multi-language Support
// ============================================================================

const translations = {
  ko: {
    hero_title: '살 빼는 정보, 이제는 검증부터',
    hero_subtitle: '정부 허가·성분·부작용까지 한 번에<br>국가별 허가 상태 · 위조 위험 · 합법 구매처',
    search_slogan: '다이어트약, 먹기 전에 먼저 확인하세요',
    scan_slogan: 'SNS 후기 대신 국가 허가 기준으로',
    comparison_slogan: '광고가 아닌 허가로 비교합니다',
    detail_slogan: '다이어트약의 진짜 정보를 공개합니다',
    footer_slogan: '건강한 감량은 검증에서 시작됩니다',
    btn_scan: '스캔',
    btn_list: '목록',
    search_title: '제품 검색',
    search_placeholder: '제품명 입력 (예: Wegovy)',
    btn_search: '검색',
    barcode_title: '바코드 스캔',
    barcode_placeholder: '바코드 번호 (예: 0169-4517-02)',
    btn_verify: '제품 확인',
    feature1_title: '허가 상태',
    feature1_desc: 'FDA·MFDS·EMA 기준',
    feature2_title: '안전 검증',
    feature2_desc: '불법·혼입 성분 차단',
    feature3_title: '신뢰 정보',
    feature3_desc: '허가된 정보만 제공',
    stats_title: '플랫폼 통계',
    stats1: '제품',
    stats2: '국가',
    stats3: '차단',
    stats4: '정확도'
  },
  en: {
    hero_title: 'Verify Before You Buy',
    hero_subtitle: 'Government approvals, ingredients, side effects<br>Approval status · Counterfeit risk · Legal purchase',
    search_slogan: 'Check Diet Pills Before Taking Them',
    scan_slogan: 'Based on National Approval Standards, Not SNS Reviews',
    comparison_slogan: 'Compare by Approval, Not by Ads',
    detail_slogan: 'Real Information About Diet Pills',
    footer_slogan: 'Healthy Weight Loss Starts with Verification',
    btn_scan: 'Scan',
    btn_list: 'List',
    search_title: 'Product Search',
    search_placeholder: 'Enter product name (e.g., Wegovy)',
    btn_search: 'Search',
    barcode_title: 'Barcode Scan',
    barcode_placeholder: 'Enter barcode (e.g., 0169-4517-02)',
    btn_verify: 'Verify Product',
    feature1_title: 'Approval Status',
    feature1_desc: 'FDA·MFDS·EMA Standards',
    feature2_title: 'Safety Verification',
    feature2_desc: 'Block Illegal Ingredients',
    feature3_title: 'Trusted Info',
    feature3_desc: 'Only Approved Data',
    stats_title: 'Platform Statistics',
    stats1: 'Products',
    stats2: 'Countries',
    stats3: 'Blocked',
    stats4: 'Accuracy'
  },
  zh: {
    hero_title: '减肥信息，从验证开始',
    hero_subtitle: '政府批准·成分·副作用一次性确认<br>批准状态 · 假药风险 · 合法购买',
    search_slogan: '服用减肥药之前，请先确认',
    scan_slogan: '基于国家批准标准，而非社交媒体评论',
    comparison_slogan: '通过批准而非广告进行比较',
    detail_slogan: '公开减肥药的真实信息',
    footer_slogan: '健康减肥从验证开始',
    btn_scan: '扫描',
    btn_list: '列表',
    search_title: '产品搜索',
    search_placeholder: '输入产品名称（例：Wegovy）',
    btn_search: '搜索',
    barcode_title: '条形码扫描',
    barcode_placeholder: '输入条形码（例：0169-4517-02）',
    btn_verify: '验证产品',
    feature1_title: '批准状态',
    feature1_desc: 'FDA·MFDS·EMA标准',
    feature2_title: '安全验证',
    feature2_desc: '阻止非法成分',
    feature3_title: '可信信息',
    feature3_desc: '仅提供批准数据',
    stats_title: '平台统计',
    stats1: '产品',
    stats2: '国家',
    stats3: '拦截',
    stats4: '准确度'
  },
  ja: {
    hero_title: 'ダイエット情報、まず検証から',
    hero_subtitle: '政府承認·成分·副作用を一度に確認<br>承認状況 · 偽造リスク · 合法購入',
    search_slogan: 'ダイエット薬、服用前にまず確認',
    scan_slogan: 'SNSレビューではなく国の承認基準で',
    comparison_slogan: '広告ではなく承認で比較',
    detail_slogan: 'ダイエット薬の本当の情報を公開',
    footer_slogan: '健康的な減量は検証から始まります',
    btn_scan: 'スキャン',
    btn_list: 'リスト',
    search_title: '製品検索',
    search_placeholder: '製品名を入力（例：Wegovy）',
    btn_search: '検索',
    barcode_title: 'バーコードスキャン',
    barcode_placeholder: 'バーコードを入力（例：0169-4517-02）',
    btn_verify: '製品確認',
    feature1_title: '承認状況',
    feature1_desc: 'FDA·MFDS·EMA基準',
    feature2_title: '安全検証',
    feature2_desc: '違法成分をブロック',
    feature3_title: '信頼情報',
    feature3_desc: '承認データのみ提供',
    stats_title: 'プラットフォーム統計',
    stats1: '製品',
    stats2: '国',
    stats3: 'ブロック',
    stats4: '精度'
  },
  vi: {
    hero_title: 'Thông Tin Giảm Cân, Bắt Đầu Từ Xác Minh',
    hero_subtitle: 'Phê duyệt chính phủ·Thành phần·Tác dụng phụ tất cả trong một<br>Trạng thái phê duyệt · Rủi ro giả mạo · Mua hàng hợp pháp',
    search_slogan: 'Kiểm Tra Thuốc Giảm Cân Trước Khi Dùng',
    scan_slogan: 'Theo Tiêu Chuẩn Phê Duyệt Quốc Gia, Không Phải Đánh Giá SNS',
    comparison_slogan: 'So Sánh Theo Phê Duyệt, Không Phải Quảng Cáo',
    detail_slogan: 'Công Khai Thông Tin Thực Về Thuốc Giảm Cân',
    footer_slogan: 'Giảm Cân Lành Mạnh Bắt Đầu Từ Xác Minh',
    btn_scan: 'Quét',
    btn_list: 'Danh Sách',
    search_title: 'Tìm Kiếm Sản Phẩm',
    search_placeholder: 'Nhập tên sản phẩm (VD: Wegovy)',
    btn_search: 'Tìm Kiếm',
    barcode_title: 'Quét Mã Vạch',
    barcode_placeholder: 'Nhập mã vạch (VD: 0169-4517-02)',
    btn_verify: 'Xác Minh Sản Phẩm',
    feature1_title: 'Trạng Thái Phê Duyệt',
    feature1_desc: 'Tiêu Chuẩn FDA·MFDS·EMA',
    feature2_title: 'Xác Minh An Toàn',
    feature2_desc: 'Chặn Thành Phần Bất Hợp Pháp',
    feature3_title: 'Thông Tin Đáng Tin',
    feature3_desc: 'Chỉ Cung Cấp Dữ Liệu Được Phê Duyệt',
    stats_title: 'Thống Kê Nền Tảng',
    stats1: 'Sản Phẩm',
    stats2: 'Quốc Gia',
    stats3: 'Đã Chặn',
    stats4: 'Độ Chính Xác'
  },
  mn: {
    hero_title: 'Турааслах Мэдээлэл, Баталгаажуулалтаас Эхэлье',
    hero_subtitle: 'Засгийн газрын зөвшөөрөл·Найрлага·Гаж нөлөө нэг дор<br>Зөвшөөрлийн статус · Хуурамч эрсдэл · Хууль ёсны худалдан авалт',
    search_slogan: 'Турааслах Эмийг Хэрэглэхээс Өмнө Шалгаарай',
    scan_slogan: 'SNS Үнэлгээ Биш Үндэсний Зөвшөөрлийн Стандартаар',
    comparison_slogan: 'Зар Сурталчилгаа Биш Зөвшөөрлөөр Харьцуулаарай',
    detail_slogan: 'Турааслах Эмийн Бодит Мэдээллийг Нээлттэй',
    footer_slogan: 'Эрүүл Турааслах Баталгаажуулалтаас Эхэлнэ',
    btn_scan: 'Скан',
    btn_list: 'Жагсаалт',
    search_title: 'Бүтээгдэхүүн Хайх',
    search_placeholder: 'Бүтээгдэхүүний нэр оруулах (Жишээ: Wegovy)',
    btn_search: 'Хайх',
    barcode_title: 'Баркод Скан',
    barcode_placeholder: 'Баркод оруулах (Жишээ: 0169-4517-02)',
    btn_verify: 'Бүтээгдэхүүн Баталгаажуулах',
    feature1_title: 'Зөвшөөрлийн Статус',
    feature1_desc: 'FDA·MFDS·EMA Стандарт',
    feature2_title: 'Аюулгүй Байдлын Баталгаа',
    feature2_desc: 'Хууль Бус Найрлагыг Хаах',
    feature3_title: 'Найдвартай Мэдээлэл',
    feature3_desc: 'Зөвхөн Зөвшөөрөгдсөн Өгөгдөл',
    stats_title: 'Платформын Статистик',
    stats1: 'Бүтээгдэхүүн',
    stats2: 'Улс',
    stats3: 'Хаасан',
    stats4: 'Нарийвчлал'
  },
  ar: {
    hero_title: 'معلومات إنقاص الوزن، نبدأ من التحقق',
    hero_subtitle: 'موافقات الحكومة·المكونات·الآثار الجانبية دفعة واحدة<br>حالة الموافقة · مخاطر التزييف · الشراء القانوني',
    search_slogan: 'تحقق من حبوب الحمية قبل تناولها',
    scan_slogan: 'بناءً على معايير الموافقة الوطنية، وليس مراجعات وسائل التواصل',
    comparison_slogan: 'قارن بالموافقة، وليس بالإعلانات',
    detail_slogan: 'كشف المعلومات الحقيقية عن حبوب الحمية',
    footer_slogan: 'فقدان الوزن الصحي يبدأ من التحقق',
    btn_scan: 'مسح',
    btn_list: 'قائمة',
    search_title: 'البحث عن المنتج',
    search_placeholder: 'أدخل اسم المنتج (مثال: Wegovy)',
    btn_search: 'بحث',
    barcode_title: 'مسح الباركود',
    barcode_placeholder: 'أدخل الباركود (مثال: 0169-4517-02)',
    btn_verify: 'التحقق من المنتج',
    feature1_title: 'حالة الموافقة',
    feature1_desc: 'معايير FDA·MFDS·EMA',
    feature2_title: 'التحقق من السلامة',
    feature2_desc: 'حظر المكونات غير القانونية',
    feature3_title: 'معلومات موثوقة',
    feature3_desc: 'فقط البيانات المعتمدة',
    stats_title: 'إحصائيات المنصة',
    stats1: 'المنتجات',
    stats2: 'البلدان',
    stats3: 'المحظور',
    stats4: 'الدقة'
  },
  es: {
    hero_title: 'Información Para Adelgazar, Comienza Con La Verificación',
    hero_subtitle: 'Aprobaciones gubernamentales·Ingredientes·Efectos secundarios todo en uno<br>Estado de aprobación · Riesgo de falsificación · Compra legal',
    search_slogan: 'Verifique Las Pastillas Para Adelgazar Antes De Tomarlas',
    scan_slogan: 'Basado En Estándares De Aprobación Nacional, No En Reseñas De Redes Sociales',
    comparison_slogan: 'Compare Por Aprobación, No Por Anuncios',
    detail_slogan: 'Divulgar Información Real Sobre Pastillas Para Adelgazar',
    footer_slogan: 'La Pérdida De Peso Saludable Comienza Con La Verificación',
    btn_scan: 'Escanear',
    btn_list: 'Lista',
    search_title: 'Búsqueda De Productos',
    search_placeholder: 'Ingrese el nombre del producto (ej: Wegovy)',
    btn_search: 'Buscar',
    barcode_title: 'Escaneo De Código De Barras',
    barcode_placeholder: 'Ingrese el código de barras (ej: 0169-4517-02)',
    btn_verify: 'Verificar Producto',
    feature1_title: 'Estado De Aprobación',
    feature1_desc: 'Estándares FDA·MFDS·EMA',
    feature2_title: 'Verificación De Seguridad',
    feature2_desc: 'Bloquear Ingredientes Ilegales',
    feature3_title: 'Información Confiable',
    feature3_desc: 'Solo Datos Aprobados',
    stats_title: 'Estadísticas De La Plataforma',
    stats1: 'Productos',
    stats2: 'Países',
    stats3: 'Bloqueados',
    stats4: 'Precisión'
  },
  de: {
    hero_title: 'Diätinformationen, Beginnen Mit Der Überprüfung',
    hero_subtitle: 'Regierungsgenehmigungen·Inhaltsstoffe·Nebenwirkungen alles in einem<br>Genehmigungsstatus · Fälschungsrisiko · Legaler Kauf',
    search_slogan: 'Überprüfen Sie Diätpillen Vor Der Einnahme',
    scan_slogan: 'Basierend Auf Nationalen Genehmigungsstandards, Nicht Auf SNS-Bewertungen',
    comparison_slogan: 'Vergleichen Sie Nach Genehmigung, Nicht Nach Werbung',
    detail_slogan: 'Echte Informationen Über Diätpillen Offenlegen',
    footer_slogan: 'Gesunde Gewichtsabnahme Beginnt Mit Der Überprüfung',
    btn_scan: 'Scannen',
    btn_list: 'Liste',
    search_title: 'Produktsuche',
    search_placeholder: 'Produktnamen eingeben (z.B.: Wegovy)',
    btn_search: 'Suchen',
    barcode_title: 'Barcode-Scan',
    barcode_placeholder: 'Barcode eingeben (z.B.: 0169-4517-02)',
    btn_verify: 'Produkt Überprüfen',
    feature1_title: 'Genehmigungsstatus',
    feature1_desc: 'FDA·MFDS·EMA-Standards',
    feature2_title: 'Sicherheitsüberprüfung',
    feature2_desc: 'Illegale Inhaltsstoffe Blockieren',
    feature3_title: 'Vertrauenswürdige Informationen',
    feature3_desc: 'Nur Genehmigte Daten',
    stats_title: 'Plattformstatistiken',
    stats1: 'Produkte',
    stats2: 'Länder',
    stats3: 'Blockiert',
    stats4: 'Genauigkeit'
  }
};

let currentLang = 'ko';

function changeLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];
  
  if (!t) {
    console.error(`Translation not found for language: ${lang}`);
    return;
  }
  
  console.log(`🌍 Changing language to: ${lang}`);
  
  // Update document language
  document.documentElement.lang = lang;
  
  // Set RTL for Arabic
  if (lang === 'ar') {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
  }
  
  // Update all translatable elements
  let updatedCount = 0;
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (t[key]) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = t[key];
      } else {
        element.innerHTML = t[key];
      }
      updatedCount++;
    } else {
      console.warn(`Translation key not found: ${key}`);
    }
  });
  
  console.log(`✅ Language changed to ${lang}, updated ${updatedCount} elements`);
  
  // Store language preference
  localStorage.setItem('dietmed_lang', lang);
  
  // Update dropdown visual
  const dropdown = document.getElementById('langDropdown');
  if (dropdown) {
    dropdown.value = lang;
  }
}

// ============================================================================
// Toggle sections
// ============================================================================

// Load saved language preference and setup event listeners
window.addEventListener('DOMContentLoaded', () => {
  // Load language preference
  const savedLang = localStorage.getItem('dietmed_lang') || 'ko';
  const langDropdown = document.getElementById('langDropdown');
  if (langDropdown) {
    langDropdown.value = savedLang;
  }
  // Apply translation immediately on page load
  changeLanguage(savedLang);
  
  // 스캔 버튼 클릭 - 바코드 스캔 섹션 표시
  const scanBtn = document.getElementById('scanBtn');
  if (scanBtn) {
    scanBtn.addEventListener('click', () => {
      const scanSection = document.getElementById('scanSection');
      if (scanSection) {
        scanSection.classList.remove('hidden');
        scanSection.scrollIntoView({ behavior: 'smooth' });
        
        // 바코드 입력란에 포커스
        setTimeout(() => {
          document.getElementById('barcodeInput')?.focus();
        }, 300);
      }
    });
  }

  // 검색 버튼 클릭 - 검색 섹션으로 스크롤
  const searchBtn = document.getElementById('searchBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const searchSection = document.getElementById('searchSection');
      if (searchSection) {
        searchSection.scrollIntoView({ behavior: 'smooth' });
        
        // 검색 입력란에 포커스
        setTimeout(() => {
          document.getElementById('searchInput')?.focus();
        }, 300);
      }
    });
  }

  // 목록 버튼 클릭 - 전체 제품 목록 표시
  const listBtn = document.getElementById('listBtn');
  if (listBtn) {
    listBtn.addEventListener('click', async () => {
      const searchSection = document.getElementById('searchSection');
      if (searchSection) {
        searchSection.scrollIntoView({ behavior: 'smooth' });
        
        // 전체 제품 목록 로드
        await loadAllProducts();
      }
    });
  }

  // Enter key handlers
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        searchProducts();
      }
    });
  }

  const barcodeInput = document.getElementById('barcodeInput');
  if (barcodeInput) {
    barcodeInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        scanBarcode();
      }
    });
  }
});

// ============================================================================
// Product Search
// ============================================================================

// 전체 제품 목록 로드
async function loadAllProducts() {
  const resultsDiv = document.getElementById('searchResults');
  
  resultsDiv.innerHTML = `
    <div class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style="border-color: #0B1C2D;"></div>
      <p style="color: #6E6E73;">전체 제품을 불러오는 중...</p>
    </div>
  `;
  
  try {
    const response = await axios.get('/api/products?limit=50');
    const data = response.data;
    
    if (data.products.length === 0) {
      resultsDiv.innerHTML = `
        <div class="text-center py-8" style="color: #6E6E73;">
          <i class="fas fa-info-circle text-4xl mb-4"></i>
          <p>등록된 제품이 없습니다.</p>
        </div>
      `;
      return;
    }
    
    displaySearchResults(data);
  } catch (error) {
    console.error('Load all products error:', error);
    resultsDiv.innerHTML = `
      <div class="text-center py-8 text-red-600">
        <i class="fas fa-exclamation-triangle text-4xl mb-4"></i>
        <p>제품 목록을 불러오는데 실패했습니다.</p>
      </div>
    `;
  }
}

// 이미지 검색 전역 변수
let imageSearchFile = null;

// 이미지 파일 선택 처리
function handleImageSelect(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  // 파일 타입 체크
  if (!file.type.startsWith('image/')) {
    alert('이미지 파일만 선택 가능합니다.');
    event.target.value = '';
    return;
  }
  
  // 파일 크기 체크 (10MB)
  if (file.size > 10 * 1024 * 1024) {
    alert('이미지 크기는 10MB를 초과할 수 없습니다.');
    event.target.value = '';
    return;
  }
  
  imageSearchFile = file;
  
  // 미리보기 표시
  const reader = new FileReader();
  reader.onload = (e) => {
    const preview = document.getElementById('imageSearchPreview');
    preview.innerHTML = `
      <div class="relative">
        <img src="${e.target.result}" alt="검색 이미지" class="max-w-full h-32 rounded-lg mx-auto border" style="border-color: #E5E5EA;">
        <button onclick="clearImageSearch()" class="absolute top-2 right-2 text-white px-2 py-1 rounded-full text-xs" style="background: #0B1C2D;">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
  };
  reader.readAsDataURL(file);
}

// 이미지 검색 초기화
function clearImageSearch() {
  imageSearchFile = null;
  document.getElementById('imageSearchInput').value = '';
  document.getElementById('imageSearchPreview').innerHTML = '';
}

// 이미지로 제품 검색
async function searchByImage() {
  if (!imageSearchFile) {
    alert('이미지를 선택해주세요.');
    return;
  }
  
  // 고급 모드 체크
  const advancedMode = document.getElementById('advancedModeToggle')?.checked || false;
  
  const resultsDiv = document.getElementById('searchResults');
  resultsDiv.innerHTML = `
    <div class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style="border-color: #0B1C2D;"></div>
      <p style="color: #6E6E73;">
        ${advancedMode ? '🧠 AI 이미지 분석 중...' : '이미지 분석 중...'}
      </p>
      ${advancedMode ? '<p class="text-xs mt-2" style="color: #6E6E73;">Google Vision API로 텍스트를 추출하고 있습니다.</p>' : ''}
    </div>
  `;
  
  try {
    // FormData로 이미지 전송
    const formData = new FormData();
    formData.append('image', imageSearchFile);
    formData.append('advanced', advancedMode.toString());
    
    const response = await axios.post('/api/search/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    const data = response.data;
    
    // OCR 결과 표시 (고급 모드인 경우)
    let ocrResultHtml = '';
    if (advancedMode && data.ocr_result) {
      const ocr = data.ocr_result;
      ocrResultHtml = `
        <div class="mb-4 p-3 rounded-lg" style="background: rgba(11, 28, 45, 0.05); border-left: 3px solid #0B1C2D;">
          <p class="text-xs font-bold mb-2" style="color: #1C1C1E;">
            <i class="fas fa-brain mr-1" style="color: #0B1C2D;"></i>
            AI 분석 결과 (Google Vision API)
          </p>
          ${ocr.detected_text ? `
            <div class="mb-2">
              <p class="text-xs font-semibold" style="color: #6E6E73;">인식된 텍스트:</p>
              <p class="text-xs mt-1 p-2 rounded" style="background: white; color: #1C1C1E; font-family: monospace;">
                ${ocr.detected_text.substring(0, 200)}${ocr.detected_text.length > 200 ? '...' : ''}
              </p>
            </div>
          ` : ''}
          ${ocr.extracted_terms && ocr.extracted_terms.length > 0 ? `
            <div>
              <p class="text-xs font-semibold" style="color: #6E6E73;">추출된 키워드:</p>
              <div class="flex flex-wrap gap-1 mt-1">
                ${ocr.extracted_terms.map(term => `
                  <span class="text-xs px-2 py-1 rounded" style="background: #0B1C2D; color: white;">
                    ${term}
                  </span>
                `).join('')}
              </div>
            </div>
          ` : ''}
          ${ocr.confidence ? `
            <p class="text-xs mt-2" style="color: #6E6E73;">
              신뢰도: ${(ocr.confidence * 100).toFixed(1)}%
            </p>
          ` : ''}
        </div>
      `;
    }
    
    if (data.success && data.products && data.products.length > 0) {
      resultsDiv.innerHTML = ocrResultHtml;
      displaySearchResults({
        products: data.products,
        total: data.products.length
      });
    } else {
      resultsDiv.innerHTML = ocrResultHtml + `
        <div class="text-center py-8" style="color: #6E6E73;">
          <i class="fas fa-image text-4xl mb-4"></i>
          <p>이미지에서 제품을 찾을 수 없습니다.</p>
          <p class="text-sm mt-2">다른 이미지로 시도해보세요.</p>
          ${advancedMode ? '<p class="text-xs mt-2">고급 모드가 활성화되었지만 제품을 찾지 못했습니다.</p>' : ''}
        </div>
      `;
    }
    
    // 이미지 검색 후 초기화
    clearImageSearch();
  } catch (error) {
    console.error('Image search error:', error);
    resultsDiv.innerHTML = `
      <div class="text-center py-8 text-red-600">
        <i class="fas fa-exclamation-triangle text-4xl mb-4"></i>
        <p>이미지 검색에 실패했습니다.</p>
        <p class="text-sm mt-2">${error.response?.data?.error || '다시 시도해주세요.'}</p>
        ${advancedMode ? '<p class="text-xs mt-2">Google Vision API 연동 오류일 수 있습니다.</p>' : ''}
      </div>
    `;
  }
}

async function searchProducts() {
  const query = document.getElementById('searchInput').value.trim();
  const resultsDiv = document.getElementById('searchResults');
  
  if (!query || query.length < 2) {
    resultsDiv.innerHTML = `
      <div class="text-center py-8" style="color: #6E6E73;">
        <i class="fas fa-search text-4xl mb-4"></i>
        <p>검색어를 2자 이상 입력해주세요.</p>
      </div>
    `;
    return;
  }
  
  resultsDiv.innerHTML = `
    <div class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style="border-color: #0B1C2D;"></div>
      <p style="color: #6E6E73;">검색 중...</p>
    </div>
  `;
  
  try {
    const response = await axios.get(`/api/products/search?q=${encodeURIComponent(query)}`);
    const data = response.data;
    
    if (data.products.length === 0) {
      resultsDiv.innerHTML = `
        <div class="text-center py-8" style="color: #6E6E73;">
          <i class="fas fa-info-circle text-4xl mb-4"></i>
          <p>검색 결과가 없습니다.</p>
          <p class="text-sm mt-2">다른 검색어로 시도해보세요.</p>
        </div>
      `;
      return;
    }
    
    displaySearchResults(data);
  } catch (error) {
    console.error('Search error:', error);
    resultsDiv.innerHTML = `
      <div class="text-center py-8 text-red-600">
        <i class="fas fa-exclamation-triangle text-4xl mb-4"></i>
        <p>검색에 실패했습니다. 다시 시도해주세요.</p>
      </div>
    `;
  }
}

// 검색 결과 표시 함수 (공통)
function displaySearchResults(data) {
  const resultsDiv = document.getElementById('searchResults');
  
  let html = `
    <div class="mb-4 flex justify-between items-center">
      <p style="color: #1C1C1E;"><span class="font-bold">${data.total || data.products.length}</span>개의 제품을 찾았습니다.</p>
      <p class="text-xs" style="color: #6E6E73;">제품을 선택하여 비교하세요</p>
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
  
  // Get current language
  const currentLang = localStorage.getItem('language') || 'ko';
  const slogan = translations[currentLang].comparison_slogan;
  
  // Build comparison table
  let html = `
    <div class="card p-4">
      <div class="bg-orange-50 border-l-4 border-orange-500 p-3 mb-4 rounded">
        <p class="text-sm text-orange-800 font-semibold">
          <i class="fas fa-balance-scale mr-2"></i>${slogan}
        </p>
      </div>
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-bold text-orange-900">
          <i class="fas fa-chart-line mr-2 text-orange-600"></i>제품 비교 분석
        </h3>
        <button onclick="clearComparison()" class="text-sm text-orange-600 hover:text-orange-900">
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

// ============================================================================
// Authentication & Membership System
// ============================================================================

// 로컬 스토리지에서 토큰 저장/가져오기
function getAuthToken() {
  return localStorage.getItem('auth_token');
}

function setAuthToken(token) {
  localStorage.setItem('auth_token', token);
}

function removeAuthToken() {
  localStorage.removeItem('auth_token');
}

function getUser() {
  const userJson = localStorage.getItem('user');
  return userJson ? JSON.parse(userJson) : null;
}

function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

function removeUser() {
  localStorage.removeItem('user');
}

// UI 상태 업데이트
function updateAuthUI() {
  const user = getUser();
  const loginBtn = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');
  const userMenu = document.getElementById('userMenu');
  
  if (user) {
    // 로그인 상태
    loginBtn.classList.add('hidden');
    registerBtn.classList.add('hidden');
    userMenu.classList.remove('hidden');
    
    document.getElementById('userName').textContent = user.name;
    const membership = document.getElementById('userMembership');
    if (user.membership_type === 'premium') {
      membership.textContent = '프리미엄';
      membership.className = 'text-xs px-2 py-1 rounded-full bg-orange-500 text-white mr-2';
    } else {
      membership.textContent = '무료';
      membership.className = 'text-xs px-2 py-1 rounded-full bg-gray-300 text-gray-700 mr-2';
    }
  } else {
    // 로그아웃 상태
    loginBtn.classList.remove('hidden');
    registerBtn.classList.remove('hidden');
    userMenu.classList.add('hidden');
  }
}

// 로그인 모달 표시
function showLogin() {
  window.open('/login.html', '_blank', 'width=500,height=700,scrollbars=yes');
}

function closeLogin() {
  const loginModal = document.getElementById('loginModal');
  if (loginModal) {
    loginModal.style.display = 'none';
  }
}

// 회원가입 모달 표시
function showRegister() {
  window.open('/register.html', '_blank', 'width=500,height=800,scrollbars=yes');
}

function closeRegister() {
  const registerModal = document.getElementById('registerModal');
  if (registerModal) {
    registerModal.style.display = 'none';
  }
}

// 로그인 처리
async function handleLogin(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  try {
    const response = await axios.post('/api/auth/login', {
      email: formData.get('email'),
      password: formData.get('password')
    });
    
    if (response.data.success) {
      setAuthToken(response.data.token);
      setUser(response.data.user);
      updateAuthUI();
      closeLogin();
      alert('로그인되었습니다!');
    }
  } catch (error) {
    alert(error.response?.data?.error || '로그인에 실패했습니다.');
  }
}

// 회원가입 처리
async function handleRegister(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  try {
    const response = await axios.post('/api/auth/register', {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      password: formData.get('password')
    });
    
    if (response.data.success) {
      alert('회원가입이 완료되었습니다! 로그인해주세요.');
      closeRegister();
      showLogin();
    }
  } catch (error) {
    alert(error.response?.data?.error || '회원가입에 실패했습니다.');
  }
}

// 로그아웃
async function logout() {
  try {
    const token = getAuthToken();
    if (token) {
      await axios.post('/api/auth/logout', {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    removeAuthToken();
    removeUser();
    updateAuthUI();
    alert('로그아웃되었습니다.');
  }
}

// 전역 함수로 명시적 노출
window.logout = logout;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;

// 공지사항 표시
async function showNotices() {
  window.open('/notices.html', '_blank', 'width=600,height=700,scrollbars=yes');
  return;
  
  const noticeSection = document.getElementById('noticeSection');
  if (!noticeSection) {
    console.error('noticeSection element not found');
    return;
  }
  
  // Show modal
  noticeSection.style.display = 'flex';
  
  try {
    const response = await axios.get('/api/notices');
    const notices = response.data.notices || [];
    
    const noticeList = document.getElementById('noticeList');
    if (!noticeList) {
      console.error('noticeList element not found');
      return;
    }
    
    if (notices.length === 0) {
      noticeList.innerHTML = '<p class="text-center text-gray-500 py-4">등록된 공지사항이 없습니다.</p>';
    } else {
      noticeList.innerHTML = notices.map(notice => `
        <div class="border-b border-gray-200 pb-3 cursor-pointer hover:bg-orange-50 p-3 rounded-lg transition" onclick="showNoticeDetail('${notice.notice_id}')">
          <h4 class="text-sm font-bold text-gray-900 mb-1">${notice.title}</h4>
          <div class="flex justify-between items-center text-xs text-gray-500">
            <span><i class="fas fa-calendar mr-1"></i>${new Date(notice.created_at).toLocaleDateString('ko-KR')}</span>
            <span><i class="fas fa-eye mr-1"></i>${notice.view_count || 0}</span>
          </div>
        </div>
      `).join('');
    }
  } catch (error) {
    console.error('Notice error:', error);
    alert('공지사항을 불러오는데 실패했습니다: ' + (error.response?.data?.error || error.message));
  }
}

// 공지사항 상세
async function showNoticeDetail(noticeId) {
  try {
    const response = await axios.get(`/api/notices/${noticeId}`);
    const notice = response.data.notice;
    
    const noticeDetailTitle = document.getElementById('noticeDetailTitle');
    const noticeDetailDate = document.getElementById('noticeDetailDate');
    const noticeDetailContent = document.getElementById('noticeDetailContent');
    const noticeDetailImage = document.getElementById('noticeDetailImage');
    const noticeDetailModal = document.getElementById('noticeDetailModal');
    
    if (noticeDetailTitle) noticeDetailTitle.textContent = notice.title;
    if (noticeDetailDate) noticeDetailDate.textContent = new Date(notice.created_at).toLocaleString('ko-KR');
    if (noticeDetailContent) noticeDetailContent.innerHTML = notice.content.replace(/\n/g, '<br>');
    
    if (noticeDetailImage) {
      if (notice.image_url) {
        noticeDetailImage.innerHTML = `
          <img src="${notice.image_url}" alt="Notice Image" class="w-full rounded-lg">
        `;
      } else {
        noticeDetailImage.innerHTML = '';
      }
    }
    
    if (noticeDetailModal) {
      noticeDetailModal.classList.remove('hidden');
    }
  } catch (error) {
    console.error('Notice detail error:', error);
    alert('공지사항을 불러오는데 실패했습니다: ' + (error.response?.data?.error || error.message));
  }
}

function closeNoticeDetail() {
  const noticeDetailModal = document.getElementById('noticeDetailModal');
  if (noticeDetailModal) {
    noticeDetailModal.classList.add('hidden');
  }
}

// 전역 함수로 명시적 노출 (인라인 onclick/onchange 에서 호출 가능하도록)
window.changeLanguage = changeLanguage;
window.loadAllProducts = loadAllProducts;
window.handleImageSelect = handleImageSelect;
window.clearImageSearch = clearImageSearch;
window.searchByImage = searchByImage;
window.searchProducts = searchProducts;
window.scanBarcode = scanBarcode;
window.viewProduct = viewProduct;
window.reportProduct = reportProduct;
window.toggleFAQ = toggleFAQ;
window.toggleProductSelection = toggleProductSelection;
window.compareProducts = compareProducts;
window.clearComparison = clearComparison;
window.showLogin = showLogin;
window.closeLogin = closeLogin;
window.showRegister = showRegister;
window.closeRegister = closeRegister;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.logout = logout;
window.showNotices = showNotices;
window.closeNotices = closeNotices;
window.showNoticeDetail = showNoticeDetail;
window.closeNoticeDetail = closeNoticeDetail;

// API 요청 시 인증 토큰 자동 추가
axios.interceptors.request.use(config => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// API 응답 인터셉터 (401 에러 처리)
axios.interceptors.response.use(response => response, error => {
  if (error.response?.status === 401) {
    // 토큰 만료 또는 유효하지 않음
    removeAuthToken();
    removeUser();
    updateAuthUI();
    
    if (error.response.data?.error) {
      alert(error.response.data.error + ' 다시 로그인해주세요.');
    }
  } else if (error.response?.status === 403 && error.response.data?.upgrade_required) {
    // 프리미엄 전용 기능
    alert('프리미엄 회원 전용 기능입니다. 업그레이드를 원하시면 관리자에게 문의해주세요.');
  }
  return Promise.reject(error);
});

// 페이지 로드 시 인증 상태 확인
document.addEventListener('DOMContentLoaded', () => {
  updateAuthUI();
  
  // 고급 모드 토글 이벤트
  const advancedToggle = document.getElementById('advancedModeToggle');
  const advancedInfo = document.getElementById('advancedModeInfo');
  
  if (advancedToggle && advancedInfo) {
    advancedToggle.addEventListener('change', (e) => {
      if (e.target.checked) {
        advancedInfo.classList.remove('hidden');
      } else {
        advancedInfo.classList.add('hidden');
      }
    });
  }
});


// Close notices modal
function closeNotices() {
  const noticeSection = document.getElementById('noticeSection');
  if (noticeSection) {
    noticeSection.style.display = 'none';
  }
}
