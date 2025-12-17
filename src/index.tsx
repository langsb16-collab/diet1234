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
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DietMed Global - 다이어트 의약품 검증 플랫폼</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        <!-- Header -->
        <header class="bg-white shadow-sm">
            <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <i class="fas fa-shield-alt text-blue-600 text-3xl"></i>
                        <div>
                            <h1 class="text-2xl font-bold text-gray-900">DietMed Global</h1>
                            <p class="text-sm text-gray-600">글로벌 다이어트 의약품 검증 플랫폼</p>
                        </div>
                    </div>
                    <div class="flex space-x-4">
                        <button id="searchBtn" class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">
                            <i class="fas fa-search mr-2"></i>검색
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <!-- Hero Section -->
            <div class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 mb-8 text-white">
                <h2 class="text-3xl font-bold mb-4">안전한 다이어트 의약품 선택</h2>
                <p class="text-xl mb-6 opacity-90">
                    바코드 스캔으로 즉시 확인하는<br>
                    국가별 허가 상태 · 위조 위험 · 합법 구매처
                </p>
                <div class="flex space-x-4">
                    <button id="scanBtn" class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
                        <i class="fas fa-camera mr-2"></i>바코드 스캔
                    </button>
                    <button class="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition">
                        <i class="fas fa-list mr-2"></i>제품 목록
                    </button>
                </div>
            </div>

            <!-- Quick Search -->
            <div id="searchSection" class="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h3 class="text-xl font-bold text-gray-900 mb-4">
                    <i class="fas fa-search text-blue-600 mr-2"></i>
                    제품 검색
                </h3>
                <div class="flex space-x-4">
                    <input 
                        type="text" 
                        id="searchInput"
                        placeholder="제품명 또는 성분명 입력 (예: Wegovy, Semaglutide)"
                        class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                    <button 
                        onclick="searchProducts()"
                        class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        검색
                    </button>
                </div>
                <div id="searchResults" class="mt-6"></div>
            </div>

            <!-- Barcode Scan Section -->
            <div id="scanSection" class="bg-white rounded-xl shadow-sm p-6 mb-8 hidden">
                <h3 class="text-xl font-bold text-gray-900 mb-4">
                    <i class="fas fa-barcode text-blue-600 mr-2"></i>
                    바코드 스캔
                </h3>
                <div class="space-y-4">
                    <input 
                        type="text" 
                        id="barcodeInput"
                        placeholder="바코드 번호 입력 (예: 0169-4517-02)"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                    <button 
                        onclick="scanBarcode()"
                        class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        <i class="fas fa-search mr-2"></i>제품 확인
                    </button>
                </div>
                <div id="scanResult" class="mt-6"></div>
            </div>

            <!-- Features -->
            <div class="grid md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white rounded-xl shadow-sm p-6">
                    <div class="text-blue-600 text-3xl mb-4">
                        <i class="fas fa-globe"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">국가별 허가 상태</h3>
                    <p class="text-gray-600">
                        FDA, MFDS, EMA 등 전세계 규제기관의 실시간 허가 정보 확인
                    </p>
                </div>
                <div class="bg-white rounded-xl shadow-sm p-6">
                    <div class="text-red-600 text-3xl mb-4">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">위조 위험 탐지</h3>
                    <p class="text-gray-600">
                        AI 기반 위험 패턴 분석으로 불법·위조 의약품 사전 차단
                    </p>
                </div>
                <div class="bg-white rounded-xl shadow-sm p-6">
                    <div class="text-green-600 text-3xl mb-4">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">합법 구매처 안내</h3>
                    <p class="text-gray-600">
                        인증된 약국과 텔레메디슨 서비스만 연결하여 안전한 구매 지원
                    </p>
                </div>
            </div>

            <!-- Stats -->
            <div class="bg-white rounded-xl shadow-sm p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-6">
                    <i class="fas fa-chart-bar text-blue-600 mr-2"></i>
                    플랫폼 통계
                </h3>
                <div class="grid md:grid-cols-4 gap-6">
                    <div class="text-center">
                        <div class="text-3xl font-bold text-blue-600 mb-2">2,000+</div>
                        <div class="text-gray-600">검증된 제품</div>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-green-600 mb-2">50+</div>
                        <div class="text-gray-600">국가 데이터</div>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-red-600 mb-2">1,000+</div>
                        <div class="text-gray-600">위험 패턴 차단</div>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
                        <div class="text-gray-600">데이터 정확도</div>
                    </div>
                </div>
            </div>
        </main>

        <!-- Footer -->
        <footer class="bg-gray-900 text-white mt-16 py-8">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p class="text-gray-400">
                    © 2024 DietMed Global. 본 플랫폼은 정보 제공 목적이며 의료행위를 대체하지 않습니다.
                </p>
                <div class="mt-4 space-x-6">
                    <a href="#" class="text-gray-400 hover:text-white transition">개인정보처리방침</a>
                    <a href="#" class="text-gray-400 hover:text-white transition">이용약관</a>
                    <a href="#" class="text-gray-400 hover:text-white transition">문의하기</a>
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
