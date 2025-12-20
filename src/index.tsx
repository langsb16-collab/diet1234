import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from 'hono/cloudflare-workers';
import type { Env } from './types';
import { apiRoutes } from './routes/api';
import { renderer } from './renderer';

const app = new Hono<{ Bindings: Env }>();

// Enable CORS for API routes
app.use('/api/*', cors());

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }));

// Use renderer for HTML pages
app.use(renderer);

// Mount API routes
app.route('/api', apiRoutes);

// Home page
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko" id="html">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>DietMed Global - 다이어트 의약품 검증 플랫폼</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            /* 오렌지 톤 커스텀 색상 */
            :root {
                --orange-50: #fff7ed;
                --orange-100: #ffedd5;
                --orange-200: #fed7aa;
                --orange-300: #fdba74;
                --orange-400: #fb923c;
                --orange-500: #f97316;
                --orange-600: #ea580c;
                --orange-700: #c2410c;
                --orange-800: #9a3412;
                --orange-900: #7c2d12;
            }
            
            /* 모바일 최적화 */
            * {
                -webkit-tap-highlight-color: transparent;
                -webkit-touch-callout: none;
            }
            
            body { 
                font-size: 14px;
                line-height: 1.5;
                background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
                overflow-x: hidden;
            }
            
            @media (min-width: 768px) {
                body { font-size: 15px; }
            }
            
            /* 부드러운 스크롤 */
            html {
                scroll-behavior: smooth;
                -webkit-overflow-scrolling: touch;
            }
            
            /* RTL 지원 (아랍어) */
            html[dir="rtl"] {
                direction: rtl;
            }
            
            html[dir="rtl"] .flex {
                flex-direction: row-reverse;
            }
            
            html[dir="rtl"] .text-left {
                text-align: right;
            }
            
            html[dir="rtl"] .text-right {
                text-align: left;
            }
            
            /* 헤더 */
            .compact-header {
                padding: 0.75rem 0;
                background: linear-gradient(135deg, #fff 0%, #fff7ed 100%);
            }
            
            /* 간격 최적화 */
            .compact-spacing {
                padding: 1rem;
                margin-bottom: 1rem;
            }
            
            /* 언어 드롭다운 */
            #langDropdown {
                background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
                box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
                color: white !important;
                border-radius: 8px;
            }
            
            #langDropdown option {
                background: white;
                color: #7c2d12;
                font-weight: bold;
                padding: 12px;
            }
            
            /* 카드 스타일 */
            .card {
                background: white;
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(249, 115, 22, 0.1);
                transition: all 0.3s ease;
            }
            
            .card:hover {
                box-shadow: 0 4px 16px rgba(249, 115, 22, 0.2);
                transform: translateY(-2px);
            }
            
            /* 버튼 스타일 */
            .btn-primary {
                background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
                color: white;
                transition: all 0.3s ease;
            }
            
            .btn-primary:hover {
                background: linear-gradient(135deg, #ea580c 0%, #f97316 100%);
                transform: scale(1.02);
            }
            
            /* 스크롤바 커스텀 */
            ::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }
            
            ::-webkit-scrollbar-track {
                background: #fff7ed;
                border-radius: 10px;
            }
            
            ::-webkit-scrollbar-thumb {
                background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
                border-radius: 10px;
            }
            
            ::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(135deg, #ea580c 0%, #f97316 100%);
            }
            
            /* 터치 영역 확대 */
            button, input, select, a {
                min-height: 44px;
                min-width: 44px;
            }
            
            /* 입력 필드 */
            input, select {
                border-radius: 8px;
                border: 2px solid #fed7aa;
                transition: all 0.3s ease;
            }
            
            input:focus, select:focus {
                border-color: #f97316;
                outline: none;
                box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
            }
        </style>
    </head>
    <body>
        <!-- Header -->
        <header class="compact-header sticky top-0 z-50 shadow-sm">
            <div class="max-w-7xl mx-auto px-3 sm:px-6">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <i class="fas fa-shield-alt text-orange-600 text-2xl"></i>
                        <div>
                            <h1 class="text-base font-bold text-orange-900">DietMed Global</h1>
                            <p class="text-xs text-orange-700 hidden sm:block">의약품 검증 플랫폼</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-3">
                        <!-- 언어 드롭다운 -->
                        <select id="langDropdown" class="text-white text-sm font-bold px-3 py-2 outline-none cursor-pointer" onchange="changeLanguage(this.value)">
                            <option value="ko">🇰🇷 한국어</option>
                            <option value="en">🇺🇸 English</option>
                            <option value="zh">🇨🇳 中文</option>
                            <option value="ja">🇯🇵 日本語</option>
                            <option value="vi">🇻🇳 Tiếng Việt</option>
                            <option value="mn">🇲🇳 Монгол</option>
                            <option value="ar">🇸🇦 العربية</option>
                            <option value="es">🇪🇸 Español</option>
                            <option value="de">🇩🇪 Deutsch</option>
                        </select>
                        <button id="searchBtn" class="px-3 py-2 text-sm text-orange-700 hover:bg-orange-100 rounded-lg transition">
                            <i class="fas fa-search mr-1"></i><span class="hidden sm:inline">검색</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-3 py-3 sm:px-6 pb-20">
            <!-- Hero Section -->
            <div class="card bg-gradient-to-r from-orange-500 to-orange-600 p-4 mb-3 text-white compact-spacing">
                <h2 class="text-base font-bold mb-2" data-i18n="hero_title">안전한 다이어트 의약품 선택</h2>
                <p class="text-sm mb-3 opacity-90" data-i18n="hero_subtitle">
                    바코드 스캔으로 즉시 확인하는<br>
                    국가별 허가 상태 · 위조 위험 · 합법 구매처
                </p>
                <div class="flex space-x-3">
                    <button id="scanBtn" class="btn-primary flex-1 px-4 py-3 rounded-lg font-semibold shadow-md">
                        <i class="fas fa-camera mr-2"></i><span data-i18n="btn_scan">스캔</span>
                    </button>
                    <button class="bg-white text-orange-600 flex-1 px-4 py-3 rounded-lg font-semibold hover:bg-orange-50 transition shadow-md">
                        <i class="fas fa-list mr-2"></i><span data-i18n="btn_list">목록</span>
                    </button>
                </div>
            </div>

            <!-- Quick Search -->
            <div id="searchSection" class="card compact-spacing">
                <div class="bg-orange-50 border-l-4 border-orange-500 p-3 mb-3 rounded">
                    <p class="text-sm text-orange-800 font-semibold" data-i18n="search_slogan">
                        <i class="fas fa-shield-check mr-2"></i>다이어트약, 먹기 전에 먼저 확인하세요
                    </p>
                </div>
                <h3 class="text-sm font-bold text-orange-900 mb-3">
                    <i class="fas fa-search text-orange-600 mr-2"></i>
                    <span data-i18n="search_title">제품 검색</span>
                </h3>
                <div class="flex space-x-2">
                    <input 
                        type="text" 
                        id="searchInput"
                        placeholder="제품명 입력 (예: Wegovy)"
                        data-i18n="search_placeholder"
                        class="flex-1 px-4 py-3 text-sm rounded-lg"
                    >
                    <button 
                        onclick="searchProducts()"
                        class="btn-primary px-5 py-3 rounded-lg font-semibold shadow-md"
                        data-i18n="btn_search"
                    >
                        검색
                    </button>
                </div>
                <div id="searchResults" class="mt-4"></div>
            </div>

            <!-- Barcode Scan Section -->
            <div id="scanSection" class="card compact-spacing hidden">
                <div class="bg-orange-50 border-l-4 border-orange-500 p-3 mb-3 rounded">
                    <p class="text-sm text-orange-800 font-semibold" data-i18n="scan_slogan">
                        <i class="fas fa-certificate mr-2"></i>SNS 후기 대신 국가 허가 기준으로
                    </p>
                </div>
                <h3 class="text-sm font-bold text-orange-900 mb-3">
                    <i class="fas fa-barcode text-orange-600 mr-2"></i>
                    <span data-i18n="barcode_title">바코드 스캔</span>
                </h3>
                <div class="space-y-3">
                    <input 
                        type="text" 
                        id="barcodeInput"
                        placeholder="바코드 번호 (예: 0169-4517-02)"
                        data-i18n="barcode_placeholder"
                        class="w-full px-4 py-3 text-sm rounded-lg"
                    >
                    <button 
                        onclick="scanBarcode()"
                        class="btn-primary w-full px-4 py-3 rounded-lg font-semibold shadow-md"
                    >
                        <i class="fas fa-search mr-2"></i><span data-i18n="btn_verify">제품 확인</span>
                    </button>
                </div>
                <div id="scanResult" class="mt-4"></div>
            </div>

            <!-- Features -->
            <div class="grid grid-cols-3 gap-3 mb-3">
                <div class="card p-3 compact-spacing">
                    <div class="text-orange-600 text-2xl mb-2">
                        <i class="fas fa-globe"></i>
                    </div>
                    <h3 class="text-sm font-bold text-gray-900 mb-1" data-i18n="feature1_title">허가 상태</h3>
                    <p class="text-xs text-gray-600 leading-tight" data-i18n="feature1_desc">
                        전세계 규제기관 실시간 정보
                    </p>
                </div>
                <div class="card p-3 compact-spacing">
                    <div class="text-orange-600 text-2xl mb-2">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <h3 class="text-sm font-bold text-gray-900 mb-1" data-i18n="feature2_title">위조 탐지</h3>
                    <p class="text-xs text-gray-600 leading-tight" data-i18n="feature2_desc">
                        AI 기반 위험 패턴 분석
                    </p>
                </div>
                <div class="card p-3 compact-spacing">
                    <div class="text-orange-600 text-2xl mb-2">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3 class="text-sm font-bold text-gray-900 mb-1" data-i18n="feature3_title">합법 구매</h3>
                    <p class="text-xs text-gray-600 leading-tight" data-i18n="feature3_desc">
                        인증 약국만 연결
                    </p>
                </div>
            </div>

            <!-- Stats -->
            <div class="card compact-spacing">
                <h3 class="text-sm font-bold text-orange-900 mb-3">
                    <i class="fas fa-chart-bar text-orange-600 mr-2"></i>
                    <span data-i18n="stats_title">플랫폼 통계</span>
                </h3>
                <div class="grid grid-cols-4 gap-3">
                    <div class="text-center">
                        <div class="text-base font-bold text-orange-600 mb-1">2,000+</div>
                        <div class="text-xs text-gray-600" data-i18n="stats1">제품</div>
                    </div>
                    <div class="text-center">
                        <div class="text-base font-bold text-orange-600 mb-1">50+</div>
                        <div class="text-xs text-gray-600" data-i18n="stats2">국가</div>
                    </div>
                    <div class="text-center">
                        <div class="text-base font-bold text-orange-600 mb-1">1,000+</div>
                        <div class="text-xs text-gray-600" data-i18n="stats3">차단</div>
                    </div>
                    <div class="text-center">
                        <div class="text-base font-bold text-orange-600 mb-1">99.9%</div>
                        <div class="text-xs text-gray-600" data-i18n="stats4">정확도</div>
                    </div>
                </div>
            </div>

            <!-- FAQ Section -->
            <div id="faqSection" class="card compact-spacing hidden">
                <h3 class="text-sm font-bold text-orange-900 mb-3">
                    <i class="fas fa-question-circle text-orange-600 mr-2"></i>
                    자주 묻는 질문 (FAQ)
                </h3>
                <div id="faqList" class="space-y-2"></div>
            </div>

            <!-- Comparison Button (Fixed) -->
            <div id="compareButtonContainer" class="fixed bottom-6 right-4 z-40 hidden">
                <button 
                    id="compareBtn" 
                    onclick="compareProducts()" 
                    disabled
                    class="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-4 rounded-xl shadow-2xl text-base font-bold opacity-50 cursor-not-allowed"
                >
                    <i class="fas fa-balance-scale mr-2"></i>제품 선택 (2-4개)
                </button>
            </div>

            <!-- Results Section -->
            <div id="results" class="hidden"></div>
        </main>

        <!-- Footer -->
        <footer class="bg-gradient-to-r from-orange-800 to-orange-900 text-white mt-6 py-6">
            <div class="max-w-7xl mx-auto px-4 text-center">
                <p class="text-lg font-bold text-white mb-2" data-i18n="footer_slogan">
                    <i class="fas fa-check-circle mr-2"></i>건강한 감량은 검증에서 시작됩니다
                </p>
                <p class="text-sm text-orange-100 mb-3">
                    © 2024 DietMed Global. 본 플랫폼은 정보 제공 목적이며 의료행위를 대체하지 않습니다.
                </p>
                <div class="flex justify-center space-x-6 text-sm">
                    <a href="#" class="text-orange-200 hover:text-white transition">개인정보</a>
                    <a href="#" class="text-orange-200 hover:text-white transition">이용약관</a>
                    <a href="#" class="text-orange-200 hover:text-white transition">문의</a>
                </div>
            </div>
        </footer>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/app.js"></script>
    </body>
    </html>
  `);
});

export default app;
