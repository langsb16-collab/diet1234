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
            /* 모바일 최적화: 기본 글자 크기 축소 */
            body { 
                font-size: 11px; 
                line-height: 1.4;
            }
            @media (min-width: 768px) {
                body { font-size: 12px; }
            }
            /* 헤더 축소 */
            .compact-header {
                padding: 0.5rem 0;
            }
            /* 빈 공간 축소 */
            .compact-spacing {
                padding: 0.75rem;
                margin-bottom: 0.75rem;
            }
            /* 언어 드롭다운 강조 */
            #langDropdown {
                background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
                box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);
            }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Header - 40% 축소 -->
        <header class="bg-white shadow-sm compact-header sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-2 sm:px-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-shield-alt text-blue-600 text-lg"></i>
                        <div>
                            <h1 class="text-sm font-bold text-gray-900">DietMed Global</h1>
                            <p class="text-xs text-gray-600 hidden sm:block">의약품 검증 플랫폼</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <!-- 언어 드롭다운 (오렌지색 강조) -->
                        <select id="langDropdown" class="text-white text-xs font-bold px-2 py-1 rounded border-0 outline-none cursor-pointer" onchange="changeLanguage(this.value)">
                            <option value="ko">🇰🇷 한국어</option>
                            <option value="en">🇺🇸 English</option>
                            <option value="zh">🇨🇳 中文</option>
                            <option value="ja">🇯🇵 日本語</option>
                        </select>
                        <button id="searchBtn" class="px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 rounded transition">
                            <i class="fas fa-search mr-1"></i><span class="hidden sm:inline">검색</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content - 빈 공간 축소 -->
        <main class="max-w-7xl mx-auto px-2 py-2 sm:px-4">
            <!-- Hero Section - 축소 -->
            <div class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-3 mb-2 text-white compact-spacing">
                <h2 class="text-sm font-bold mb-2" data-i18n="hero_title">안전한 다이어트 의약품 선택</h2>
                <p class="text-xs mb-3 opacity-90" data-i18n="hero_subtitle">
                    바코드 스캔으로 즉시 확인하는<br>
                    국가별 허가 상태 · 위조 위험 · 합법 구매처
                </p>
                <div class="flex space-x-2">
                    <button id="scanBtn" class="bg-white text-blue-600 px-3 py-2 rounded text-xs font-semibold hover:bg-blue-50 transition flex-1">
                        <i class="fas fa-camera mr-1"></i><span data-i18n="btn_scan">스캔</span>
                    </button>
                    <button class="bg-blue-700 text-white px-3 py-2 rounded text-xs font-semibold hover:bg-blue-800 transition flex-1">
                        <i class="fas fa-list mr-1"></i><span data-i18n="btn_list">목록</span>
                    </button>
                </div>
            </div>

            <!-- Quick Search - 축소 -->
            <div id="searchSection" class="bg-white rounded-lg shadow-sm compact-spacing">
                <h3 class="text-xs font-bold text-gray-900 mb-2">
                    <i class="fas fa-search text-blue-600 mr-1"></i>
                    <span data-i18n="search_title">제품 검색</span>
                </h3>
                <div class="flex space-x-2">
                    <input 
                        type="text" 
                        id="searchInput"
                        placeholder="제품명 입력 (예: Wegovy)"
                        data-i18n="search_placeholder"
                        class="flex-1 px-2 py-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    >
                    <button 
                        onclick="searchProducts()"
                        class="bg-blue-600 text-white px-4 py-2 rounded text-xs font-semibold hover:bg-blue-700 transition"
                        data-i18n="btn_search"
                    >
                        검색
                    </button>
                </div>
                <div id="searchResults" class="mt-3"></div>
            </div>

            <!-- Barcode Scan Section - 축소 -->
            <div id="scanSection" class="bg-white rounded-lg shadow-sm compact-spacing hidden">
                <h3 class="text-xs font-bold text-gray-900 mb-2">
                    <i class="fas fa-barcode text-blue-600 mr-1"></i>
                    <span data-i18n="barcode_title">바코드 스캔</span>
                </h3>
                <div class="space-y-2">
                    <input 
                        type="text" 
                        id="barcodeInput"
                        placeholder="바코드 번호 (예: 0169-4517-02)"
                        data-i18n="barcode_placeholder"
                        class="w-full px-2 py-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    >
                    <button 
                        onclick="scanBarcode()"
                        class="w-full bg-blue-600 text-white px-3 py-2 rounded text-xs font-semibold hover:bg-blue-700 transition"
                    >
                        <i class="fas fa-search mr-1"></i><span data-i18n="btn_verify">제품 확인</span>
                    </button>
                </div>
                <div id="scanResult" class="mt-3"></div>
            </div>

            <!-- Features - 축소 -->
            <div class="grid grid-cols-3 gap-2 mb-2">
                <div class="bg-white rounded-lg shadow-sm p-2 compact-spacing">
                    <div class="text-blue-600 text-lg mb-1">
                        <i class="fas fa-globe"></i>
                    </div>
                    <h3 class="text-xs font-bold text-gray-900 mb-1" data-i18n="feature1_title">허가 상태</h3>
                    <p class="text-xs text-gray-600 leading-tight" data-i18n="feature1_desc">
                        전세계 규제기관 실시간 정보
                    </p>
                </div>
                <div class="bg-white rounded-lg shadow-sm p-2 compact-spacing">
                    <div class="text-red-600 text-lg mb-1">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <h3 class="text-xs font-bold text-gray-900 mb-1" data-i18n="feature2_title">위조 탐지</h3>
                    <p class="text-xs text-gray-600 leading-tight" data-i18n="feature2_desc">
                        AI 기반 위험 패턴 분석
                    </p>
                </div>
                <div class="bg-white rounded-lg shadow-sm p-2 compact-spacing">
                    <div class="text-green-600 text-lg mb-1">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3 class="text-xs font-bold text-gray-900 mb-1" data-i18n="feature3_title">합법 구매</h3>
                    <p class="text-xs text-gray-600 leading-tight" data-i18n="feature3_desc">
                        인증 약국만 연결
                    </p>
                </div>
            </div>

            <!-- Stats - 축소 -->
            <div class="bg-white rounded-lg shadow-sm compact-spacing">
                <h3 class="text-xs font-bold text-gray-900 mb-2">
                    <i class="fas fa-chart-bar text-blue-600 mr-1"></i>
                    <span data-i18n="stats_title">플랫폼 통계</span>
                </h3>
                <div class="grid grid-cols-4 gap-2">
                    <div class="text-center">
                        <div class="text-sm font-bold text-blue-600 mb-1">2,000+</div>
                        <div class="text-xs text-gray-600" data-i18n="stats1">제품</div>
                    </div>
                    <div class="text-center">
                        <div class="text-sm font-bold text-green-600 mb-1">50+</div>
                        <div class="text-xs text-gray-600" data-i18n="stats2">국가</div>
                    </div>
                    <div class="text-center">
                        <div class="text-sm font-bold text-red-600 mb-1">1,000+</div>
                        <div class="text-xs text-gray-600" data-i18n="stats3">차단</div>
                    </div>
                    <div class="text-center">
                        <div class="text-sm font-bold text-purple-600 mb-1">99.9%</div>
                        <div class="text-xs text-gray-600" data-i18n="stats4">정확도</div>
                    </div>
                </div>
            </div>
        </main>

        <!-- Footer - 축소 -->
        <footer class="bg-gray-900 text-white mt-4 py-3">
            <div class="max-w-7xl mx-auto px-2 text-center">
                <p class="text-xs text-gray-400">
                    © 2024 DietMed Global. 본 플랫폼은 정보 제공 목적이며 의료행위를 대체하지 않습니다.
                </p>
                <div class="mt-2 space-x-3 text-xs">
                    <a href="#" class="text-gray-400 hover:text-white transition">개인정보</a>
                    <a href="#" class="text-gray-400 hover:text-white transition">이용약관</a>
                    <a href="#" class="text-gray-400 hover:text-white transition">문의</a>
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
