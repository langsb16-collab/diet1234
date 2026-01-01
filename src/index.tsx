import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from 'hono/cloudflare-workers';
import type { Env } from './types';
import { apiRoutes } from './routes/api';
import { externalApiRoutes } from './routes/external-api';
import { imageRecognitionRoutes } from './routes/image-recognition';
import { reviewRoutes } from './routes/reviews';
import { b2bWidgetRoutes } from './routes/b2b-widget';
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

// Mount external API routes (FDA, MFDS, etc.)
app.route('/api/external', externalApiRoutes);

// Mount image recognition routes
app.route('/api/image-recognition', imageRecognitionRoutes);

// Mount review routes
app.route('/api/reviews', reviewRoutes);

// Mount B2B widget routes
app.route('/api/b2b', b2bWidgetRoutes);

// Admin page (URL only access - No login required)
// **Security Warning**: Anyone with this URL can access admin panel!
// Access URL: https://puke365.net/secret-admin-panel-xyz123
app.get('/secret-admin-panel-xyz123', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DietMed Global - 관리자 페이지</title>
        <link rel="icon" type="image/svg+xml" href="/static/favicon.svg">
        <link href="/static/styles.css" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-100">
        <div class="max-w-7xl mx-auto p-6">
            <h1 class="text-3xl font-bold text-gray-900 mb-6">
                <i class="fas fa-shield-alt text-orange-600 mr-2"></i>
                DietMed Global - 관리자 페이지
            </h1>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-xl font-bold text-gray-900 mb-4">
                        <i class="fas fa-users text-blue-600 mr-2"></i>회원 관리
                    </h2>
                    <div class="space-y-2">
                        <button onclick="loadUsers('free')" class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                            무료 회원 목록
                        </button>
                        <button onclick="loadUsers('premium')" class="w-full bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition">
                            프리미엄 회원 목록
                        </button>
                        <button onclick="loadUsers()" class="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
                            전체 회원 목록
                        </button>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-xl font-bold text-gray-900 mb-4">
                        <i class="fas fa-bullhorn text-green-600 mr-2"></i>공지사항 관리
                    </h2>
                    <div class="space-y-2">
                        <button onclick="showCreateNotice()" class="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                            공지사항 등록
                        </button>
                        <button onclick="loadNotices()" class="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
                            공지사항 목록
                        </button>
                    </div>
                </div>
            </div>
            
            <div id="adminContent" class="bg-white rounded-lg shadow p-6"></div>
        </div>
        
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/admin.js"></script>
    </body>
    </html>
  `);
});

// Home page
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko" id="html">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>DietMed Global - 다이어트 의약품 검증 플랫폼</title>
        <link rel="icon" type="image/svg+xml" href="/static/favicon.svg">
        <link href="/static/styles.css?v=fix2" rel="stylesheet">
        <link href="/static/chatbot.css?v=fix2" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            /* 명품 라이프스타일 커스텀 색상 */
            :root {
                --ivory-white: #FAFAF7;
                --charcoal-black: #1C1C1E;
                --warm-gray: #6E6E73;
                --deep-navy: #0B1C2D;
                --accent-navy: #1A3A52;
                --light-gray: #E5E5EA;
                --bg-primary: #FAFAF7;
                --text-primary: #1C1C1E;
                --text-secondary: #6E6E73;
                --border-color: #E5E5EA;
            }
            
            * {
                -webkit-tap-highlight-color: transparent;
                -webkit-touch-callout: none;
            }
            
            body { 
                font-size: 15px;
                line-height: 1.6;
                background: #FAFAF7;
                color: #1C1C1E;
                overflow-x: hidden;
                font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', system-ui, sans-serif;
                min-height: 100vh;
            }
            
            @media (max-width: 640px) {
                body { 
                    font-size: 14px; 
                }
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
            
            /* 상단 흰색 여백 줄이기 */
            header, .top-area, .nav-wrap {
                margin-top: 0 !important;
                padding-top: 8px !important;
                padding-bottom: 4px !important;
            }
            
            /* 페이지 전체 상단 여백 축소 */
            body {
                padding-top: 0 !important;
            }
            
            /* 헤더 */
            .compact-header {
                padding: 8px 0 4px 0;
                background: rgba(250, 250, 247, 0.95);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border-bottom: 1px solid rgba(229, 229, 234, 0.5);
            }
            
            /* 간격 최적화 */
            .compact-spacing {
                padding: 1rem;
                margin-bottom: 1rem;
            }
            
            /* 언어 드롭박스 스타일 */
            #langDropdown, .lang-select {
                background: #00223a !important;
                color: #ffffff;
                border: none;
                border-radius: 8px;
                padding: 10px 14px;
                font-weight: 600;
                transition: all 0.3s ease;
                cursor: pointer;
            }
            
            @media (max-width: 768px) {
                .nav-wrap {
                    justify-content: center;
                    margin-top: 0;
                    padding-top: 5px;
                }
                
                #langDropdown, .lang-select {
                    width: 48%;
                    text-align: center;
                }
            }
            
            #langDropdown:hover, .lang-select:hover {
                background: #003355 !important;
            }
            
            #langDropdown:focus {
                outline: none;
                border-color: #0B1C2D;
                box-shadow: 0 0 0 3px rgba(11, 28, 45, 0.1);
            }
            
            #langDropdown option {
                background: white;
                color: #1C1C1E;
                font-weight: 500;
                padding: 12px;
            }
            
            #langDropdown option:checked {
                background: #0B1C2D;
                color: white;
            }
            
            /* 카드 스타일 - 명품 감성 */
            .card {
                background: #FFFFFF;
                border-radius: 16px;
                border: 1px solid #E5E5EA;
                box-shadow: 0 1px 3px rgba(28, 28, 30, 0.05);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .card:hover {
                box-shadow: 0 8px 24px rgba(28, 28, 30, 0.12);
                transform: translateY(-4px);
                border-color: #0B1C2D;
            }
            
            /* 버튼 스타일 - 디프 네이비 */
            .btn-primary {
                background: #0B1C2D;
                color: white;
                font-weight: 600;
                letter-spacing: -0.02em;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .btn-primary:hover {
                background: #1A3A52;
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(11, 28, 45, 0.3);
            }
            
            /* 스크롤바 커스텀 - 미니멀 */
            ::-webkit-scrollbar {
                width: 6px;
                height: 6px;
            }
            
            ::-webkit-scrollbar-track {
                background: transparent;
            }
            
            ::-webkit-scrollbar-thumb {
                background: #E5E5EA;
                border-radius: 10px;
            }
            
            ::-webkit-scrollbar-thumb:hover {
                background: #6E6E73;
            }
            
            /* 터치 영역 확대 */
            button, input, select, a {
                min-height: 44px;
                min-width: 44px;
            }
            
            /* 입력 필드 - 애플 스타일 */
            input, select {
                border-radius: 10px;
                border: 1px solid #E5E5EA;
                background: #FFFFFF;
                color: #1C1C1E;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            input:focus, select:focus {
                border-color: #0B1C2D;
                outline: none;
                box-shadow: 0 0 0 4px rgba(11, 28, 45, 0.08);
                background: #FAFAF7;
            }
        </style>
    </head>
    <body>
        <!-- Header -->
        <header class="compact-header sticky top-0 z-50 shadow-sm">
            <div class="max-w-7xl mx-auto px-3 sm:px-6">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <i class="fas fa-shield-alt text-2xl" style="color: #0B1C2D;"></i>
                        <div>
                            <h1 class="text-base font-bold" style="color: #1C1C1E; letter-spacing: -0.02em;">DietMed Global</h1>
                            <p class="text-xs hidden sm:block" style="color: #6E6E73; font-weight: 500;">의약품 검증 플랫폼</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2" style="flex-wrap: nowrap;">
                        <!-- 공지 버튼 -->
                        <button id="noticeBtn" style="background: #FF6B35; color: white; padding: 8px 16px; border-radius: 8px; font-weight: 600; font-size: 14px; border: none; cursor: pointer; box-shadow: 0 2px 8px rgba(255,107,53,0.2); transition: all 0.2s ease; white-space: nowrap;" onmouseover="this.style.background='#FF8C5A'; this.style.transform='translateY(-1px)'" onmouseout="this.style.background='#FF6B35'; this.style.transform='translateY(0)'" onclick="showNotices()">
                            <i class="fas fa-bullhorn" style="margin-right: 4px;"></i><span class="hidden sm:inline">공지</span>
                        </button>
                        
                        <!-- 로그인 버튼 -->
                        <button id="loginBtn" style="background: #FF6B35; color: white; padding: 8px 16px; border-radius: 8px; font-weight: 600; font-size: 14px; border: none; cursor: pointer; box-shadow: 0 2px 8px rgba(255,107,53,0.2); transition: all 0.2s ease; white-space: nowrap;" onmouseover="this.style.background='#FF8C5A'; this.style.transform='translateY(-1px)'" onmouseout="this.style.background='#FF6B35'; this.style.transform='translateY(0)'" onclick="showLogin()">
                            <i class="fas fa-sign-in-alt" style="margin-right: 4px;"></i><span class="hidden sm:inline">로그인</span>
                        </button>
                        
                        <!-- 회원가입 버튼 -->
                        <button id="registerBtn" style="background: #FF6B35; color: white; padding: 8px 16px; border-radius: 8px; font-weight: 600; font-size: 14px; border: none; cursor: pointer; box-shadow: 0 2px 8px rgba(255,107,53,0.2); transition: all 0.2s ease; white-space: nowrap;" onmouseover="this.style.background='#FF8C5A'; this.style.transform='translateY(-1px)'" onmouseout="this.style.background='#FF6B35'; this.style.transform='translateY(0)'" onclick="showRegister()">
                            <i class="fas fa-user-plus" style="margin-right: 4px;"></i><span class="hidden sm:inline">회원가입</span>
                        </button>
                        

                        
                        <!-- 언어 드롭다운 -->
                        <select id="langDropdown" style="background: #FF6B35; color: white; font-size: 14px; font-weight: 600; padding: 8px 12px; border-radius: 8px; border: none; outline: none; cursor: pointer; box-shadow: 0 2px 8px rgba(255,107,53,0.2); white-space: nowrap;" onchange="changeLanguage(this.value)">
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
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main style="max-width: 900px; margin: 0 auto; padding: 8px 24px 80px 24px;">
            <!-- Hero Section -->
            <div style="background: linear-gradient(135deg, #0B1C2D 0%, #1A3A52 100%); color: white; border-radius: 20px; padding: 48px; margin-bottom: 24px; box-shadow: 0 10px 40px rgba(11, 28, 45, 0.2);">
                <div style="text-align: center; max-width: 700px; margin: 0 auto;">
                    <h2 data-i18n="hero_title" style="font-size: 36px; font-weight: 700; margin-bottom: 16px; letter-spacing: -0.02em; line-height: 1.2;">안전한 다이어트 의약품 선택</h2>
                    <p data-i18n="hero_subtitle" style="font-size: 18px; opacity: 0.95; margin-bottom: 32px; line-height: 1.6;">
                        바코드 스캔으로 즉시 확인하는<br>
                        국가별 허가 상태 · 위조 위험 · 합법 구매처
                    </p>
                    <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: nowrap;">
                        <button id="scanBtn" style="background: #FF6B35; color: #FFFFFF; padding: 18px 48px; border-radius: 12px; font-weight: 700; font-size: 18px; border: none; cursor: pointer; box-shadow: 0 4px 16px rgba(255,107,53,0.3); transition: all 0.2s ease; min-width: 180px;" onmouseover="this.style.background='#FF8C5A'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 24px rgba(255,107,53,0.4)'" onmouseout="this.style.background='#FF6B35'; this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 16px rgba(255,107,53,0.3)'">
                            <i class="fas fa-camera" style="margin-right: 8px;"></i><span data-i18n="btn_scan">스캔</span>
                        </button>
                        <button id="listBtn" style="background: #FFFFFF; color: #0B1C2D; padding: 18px 48px; border-radius: 12px; font-weight: 700; font-size: 18px; border: 2px solid #E5E5EA; cursor: pointer; transition: all 0.2s ease; min-width: 180px;" onmouseover="this.style.background='#F0F0F0'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 24px rgba(0,0,0,0.1)'" onmouseout="this.style.background='#FFFFFF'; this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                            <i class="fas fa-list" style="margin-right: 8px;"></i><span data-i18n="btn_list">목록</span>
                        </button>
                    </div>
                </div>
            </div>
            
            <style>
                @media (max-width: 768px) {
                    main { padding: 16px !important; }
                    main > div:first-child { padding: 32px 24px !important; }
                    main > div:first-child h2 { font-size: 24px !important; }
                    main > div:first-child p { font-size: 16px !important; margin-bottom: 24px !important; }
                    main > div:first-child button { min-width: 140px !important; padding: 16px 32px !important; font-size: 16px !important; }
                }
            </style>

            <!-- Quick Search - PC 중앙 정렬 -->
            <div id="searchSection" class="card" style="background: white; border-radius: 20px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); margin-bottom: 24px;">
                <div style="background: rgba(11, 28, 45, 0.05); padding: 16px; margin-bottom: 24px; border-radius: 12px; border-left: 4px solid #0B1C2D;">
                    <p style="font-size: 16px; font-weight: 600; color: #1C1C1E;" data-i18n="search_slogan">
                        <i class="fas fa-shield-check" style="color: #0B1C2D; margin-right: 8px;"></i>다이어트약, 먹기 전에 먼저 확인하세요
                    </p>
                </div>
                <h3 style="font-size: 20px; font-weight: 700; color: #1C1C1E; margin-bottom: 24px;">
                    <i class="fas fa-search" style="color: #0B1C2D; margin-right: 8px;"></i>
                    <span data-i18n="search_title">제품 검색</span>
                </h3>
                
                <!-- 텍스트 검색 -->
                <div style="display: flex; gap: 12px; margin-bottom: 24px;">
                    <input 
                        type="text" 
                        id="searchInput"
                        placeholder="제품명 입력 (예: Wegovy)"
                        data-i18n="search_placeholder"
                        style="flex: 1; padding: 16px 20px; font-size: 16px; border-radius: 12px; border: 2px solid #E5E5EA; transition: all 0.3s ease;"
                        onfocus="this.style.borderColor='#0B1C2D'; this.style.boxShadow='0 0 0 4px rgba(11,28,45,0.1)'"
                        onblur="this.style.borderColor='#E5E5EA'; this.style.boxShadow='none'"
                    >
                    <button 
                        id="searchBtn"
                        onclick="searchProducts()"
                        data-i18n="btn_search"
                        style="background: #0B1C2D; color: white; padding: 16px 40px; border-radius: 12px; font-weight: 700; font-size: 16px; border: none; cursor: pointer; box-shadow: 0 4px 12px rgba(11,28,45,0.25); transition: all 0.3s ease; white-space: nowrap;"
                        onmouseover="this.style.background='#1A3A52'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(11,28,45,0.35)'"
                        onmouseout="this.style.background='#0B1C2D'; this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(11,28,45,0.25)'"
                    >
                        <i class="fas fa-search" style="margin-right: 8px;"></i>검색
                    </button>
                </div>
                
                <!-- 모바일 전용 스타일 -->
                <style>
                    @media (max-width: 640px) {
                        #searchSection { padding: 24px 20px !important; }
                        #searchSection h3 { font-size: 18px !important; }
                        #searchSection > div:first-child { padding: 12px !important; }
                        #searchSection > div:first-child p { font-size: 14px !important; }
                        #searchSection > div:nth-child(4) { 
                            flex-direction: column !important; 
                        }
                        #searchInput { font-size: 15px !important; padding: 14px 16px !important; }
                        #searchBtn { padding: 14px 24px !important; font-size: 15px !important; width: 100%; }
                    }
                </style>
                
                <!-- 이미지 검색 -->
                <div class="p-3 rounded-lg mb-3" style="background: rgba(11, 28, 45, 0.03); border: 1px dashed #E5E5EA;">
                    <div class="flex items-center justify-between mb-2">
                        <p class="text-xs font-semibold" style="color: #1C1C1E;">
                            <i class="fas fa-camera mr-1" style="color: #0B1C2D;"></i>
                            사진으로 제품 찾기
                        </p>
                        <label class="flex items-center cursor-pointer">
                            <input type="checkbox" id="advancedModeToggle" class="mr-1" style="width: 14px; height: 14px;">
                            <span class="text-xs" style="color: #6E6E73;" title="Google Vision API로 정확한 OCR 수행">
                                <i class="fas fa-brain mr-1" style="color: #0B1C2D;"></i>고급
                            </span>
                        </label>
                    </div>
                    <div class="flex space-x-2">
                        <label class="flex-1 cursor-pointer">
                            <div class="flex items-center justify-center px-3 py-2 rounded-lg text-xs font-medium transition" style="background: #FFFFFF; border: 1px solid #E5E5EA; color: #1C1C1E;">
                                <i class="fas fa-image mr-2" style="color: #0B1C2D;"></i>
                                갤러리에서 선택
                            </div>
                            <input type="file" id="imageSearchInput" accept="image/*" onchange="handleImageSelect(event)" class="hidden">
                        </label>
                        <label class="flex-1 cursor-pointer">
                            <div class="flex items-center justify-center px-3 py-2 rounded-lg text-xs font-medium transition" style="background: #FFFFFF; border: 1px solid #E5E5EA; color: #1C1C1E;">
                                <i class="fas fa-camera mr-2" style="color: #0B1C2D;"></i>
                                카메라 촬영
                            </div>
                            <input type="file" accept="image/*" capture="environment" onchange="handleImageSelect(event)" class="hidden">
                        </label>
                    </div>
                    <div id="imageSearchPreview" class="mt-2"></div>
                    <button 
                        onclick="searchByImage()"
                        class="w-full mt-2 px-3 py-2 rounded-lg text-xs font-semibold transition"
                        style="background: #0B1C2D; color: white;"
                    >
                        <i class="fas fa-search mr-1"></i>이미지로 검색
                    </button>
                    <div id="advancedModeInfo" class="hidden mt-2 p-2 rounded text-xs" style="background: rgba(11, 28, 45, 0.05); color: #6E6E73;">
                        <i class="fas fa-info-circle mr-1"></i>
                        고급 모드: Google Vision API로 알약 이미지에서 텍스트, NDC 코드, 제조사명을 자동 인식합니다.
                    </div>
                </div>
                
                <div id="searchResults" class="mt-4"></div>
            </div>

            <!-- Barcode Scan Section - PC 중앙 정렬 -->
            <div id="scanSection" class="card hidden" style="background: white; border-radius: 20px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); margin-bottom: 24px;">
                <div style="background: rgba(11, 28, 45, 0.05); padding: 16px; margin-bottom: 24px; border-radius: 12px; border-left: 4px solid #0B1C2D;">
                    <p style="font-size: 16px; font-weight: 600; color: #1C1C1E;" data-i18n="scan_slogan">
                        <i class="fas fa-certificate" style="color: #0B1C2D; margin-right: 8px;"></i>SNS 후기 대신 국가 허가 기준으로
                    </p>
                </div>
                <h3 style="font-size: 20px; font-weight: 700; color: #1C1C1E; margin-bottom: 24px;">
                    <i class="fas fa-barcode" style="color: #0B1C2D; margin-right: 8px;"></i>
                    <span data-i18n="barcode_title">바코드 스캔</span>
                </h3>
                <div style="display: flex; flex-direction: column; gap: 16px;">
                    <input 
                        type="text" 
                        id="barcodeInput"
                        placeholder="바코드 번호 (예: 0169-4517-02)"
                        data-i18n="barcode_placeholder"
                        style="width: 100%; padding: 16px 20px; font-size: 16px; border-radius: 12px; border: 2px solid #E5E5EA; transition: all 0.3s ease;"
                        onfocus="this.style.borderColor='#0B1C2D'; this.style.boxShadow='0 0 0 4px rgba(11,28,45,0.1)'"
                        onblur="this.style.borderColor='#E5E5EA'; this.style.boxShadow='none'"
                    >
                    <button 
                        onclick="scanBarcode()"
                        data-i18n="btn_verify"
                        style="width: 100%; background: #0B1C2D; color: white; padding: 18px 32px; border-radius: 12px; font-weight: 700; font-size: 16px; border: none; cursor: pointer; box-shadow: 0 4px 12px rgba(11,28,45,0.25); transition: all 0.3s ease;"
                        onmouseover="this.style.background='#1A3A52'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(11,28,45,0.35)'"
                        onmouseout="this.style.background='#0B1C2D'; this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(11,28,45,0.25)'"
                    >
                        <i class="fas fa-search" style="font-size: 18px; margin-right: 8px;"></i><span class="font-bold">제품 확인</span>
                    </button>
                </div>
                <div id="scanResult" style="margin-top: 24px;"></div>
                
                <!-- 모바일 전용 스타일 -->
                <style>
                    @media (max-width: 640px) {
                        #scanSection { padding: 24px 20px !important; }
                        #scanSection h3 { font-size: 18px !important; }
                        #scanSection > div:first-child { padding: 12px !important; }
                        #scanSection > div:first-child p { font-size: 14px !important; }
                        #barcodeInput { font-size: 15px !important; padding: 14px 16px !important; }
                        #scanSection button { padding: 14px 24px !important; font-size: 15px !important; }
                    }
                </style>
            </div>

            <!-- Features - 애플 스타일 -->
            <div id="featuresSection" class="grid grid-cols-3 gap-3 mb-3">
                <div class="card p-4 compact-spacing">
                    <div class="text-2xl mb-2" style="color: #0B1C2D;">
                        <i class="fas fa-globe"></i>
                    </div>
                    <h3 class="text-sm font-bold mb-1" data-i18n="feature1_title" style="color: #1C1C1E;">허가 상태</h3>
                    <p class="text-xs leading-tight" data-i18n="feature1_desc" style="color: #6E6E73;">
                        전세계 규제기관 실시간 정보
                    </p>
                </div>
                <div class="card p-4 compact-spacing">
                    <div class="text-2xl mb-2" style="color: #0B1C2D;">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <h3 class="text-sm font-bold mb-1" data-i18n="feature2_title" style="color: #1C1C1E;">위조 탐지</h3>
                    <p class="text-xs leading-tight" data-i18n="feature2_desc" style="color: #6E6E73;">
                        AI 기반 위험 패턴 분석
                    </p>
                </div>
                <div class="card p-4 compact-spacing">
                    <div class="text-2xl mb-2" style="color: #0B1C2D;">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3 class="text-sm font-bold mb-1" data-i18n="feature3_title" style="color: #1C1C1E;">합법 구매</h3>
                    <p class="text-xs leading-tight" data-i18n="feature3_desc" style="color: #6E6E73;">
                        인증 약국만 연결
                    </p>
                </div>
            </div>

            <!-- Stats -->
            <div id="statsSection" class="card compact-spacing">
                <h3 class="text-sm font-bold mb-3" style="color: #1C1C1E;">
                    <i class="fas fa-chart-bar mr-2" style="color: #0B1C2D;"></i>
                    <span data-i18n="stats_title">플랫폼 통계</span>
                </h3>
                <div class="grid grid-cols-4 gap-3">
                    <div class="text-center">
                        <div class="text-base font-bold mb-1" style="color: #0B1C2D;">2,000+</div>
                        <div class="text-xs" data-i18n="stats1" style="color: #6E6E73;">제품</div>
                    </div>
                    <div class="text-center">
                        <div class="text-base font-bold mb-1" style="color: #0B1C2D;">50+</div>
                        <div class="text-xs" data-i18n="stats2" style="color: #6E6E73;">국가</div>
                    </div>
                    <div class="text-center">
                        <div class="text-base font-bold mb-1" style="color: #0B1C2D;">1,000+</div>
                        <div class="text-xs" data-i18n="stats3" style="color: #6E6E73;">차단</div>
                    </div>
                    <div class="text-center">
                        <div class="text-base font-bold mb-1" style="color: #0B1C2D;">99.9%</div>
                        <div class="text-xs" data-i18n="stats4" style="color: #6E6E73;">정확도</div>
                    </div>
                </div>
            </div>

            <!-- FAQ Section -->
            <div id="faqSection" class="card compact-spacing hidden">
                <h3 class="text-sm font-bold mb-3" style="color: #1C1C1E;">
                    <i class="fas fa-question-circle mr-2" style="color: #0B1C2D;"></i>
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
                    class="text-white px-6 py-4 rounded-2xl shadow-2xl text-base font-semibold opacity-50 cursor-not-allowed"
                    style="background: #0B1C2D;"
                >
                    <i class="fas fa-balance-scale mr-2"></i>제품 선택 (2-4개)
                </button>
            </div>

            <!-- Results Section -->
            <div id="results" class="hidden"></div>
            
            <!-- Notice Modal -->
            <div id="noticeSection" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-center justify-center p-4">
                <div class="rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6" style="background: #FAFAF7;">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-xl font-bold" style="color: #1C1C1E;">
                            <i class="fas fa-bullhorn mr-2" style="color: #0B1C2D;"></i>공지사항
                        </h3>
                        <button onclick="closeNotices()" style="color: #6E6E73;" onmouseover="this.style.color='#1C1C1E'" onmouseout="this.style.color='#6E6E73'">
                            <i class="fas fa-times text-2xl"></i>
                        </button>
                    </div>
                    <div id="noticeList" class="space-y-3"></div>
                </div>
            </div>
            
            <!-- Notice Detail Modal -->
            <div id="noticeDetailModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-center justify-center p-4">
                <div class="rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" style="background: #FAFAF7;">
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-4">
                            <h3 id="noticeDetailTitle" class="text-xl font-bold" style="color: #1C1C1E;"></h3>
                            <button onclick="closeNoticeDetail()" style="color: #6E6E73;" onmouseover="this.style.color='#1C1C1E'" onmouseout="this.style.color='#6E6E73'">
                                <i class="fas fa-times text-2xl"></i>
                            </button>
                        </div>
                        <div id="noticeDetailDate" class="text-sm mb-4" style="color: #6E6E73;"></div>
                        <div id="noticeDetailImage" class="mb-4"></div>
                        <div id="noticeDetailContent" class="prose max-w-none"></div>
                    </div>
                </div>
            </div>
            
            <!-- Login Modal -->
            <div id="loginModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden" style="display: none; align-items: center; justify-content: center; padding: 16px;">
                <div class="rounded-2xl max-w-md w-full p-6" style="background: #FAFAF7;">
                    <h3 class="text-xl font-bold mb-4" style="color: #1C1C1E;">
                        <i class="fas fa-sign-in-alt mr-2" style="color: #0B1C2D;"></i>로그인
                    </h3>
                    <form id="loginForm" onsubmit="handleLogin(event)">
                        <div class="mb-4">
                            <label class="block text-sm font-bold text-gray-700 mb-2">이메일</label>
                            <input type="email" name="email" required class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none">
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-bold text-gray-700 mb-2">비밀번호</label>
                            <input type="password" name="password" required class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none">
                        </div>
                        <div class="flex space-x-3">
                            <button type="submit" class="flex-1 bg-orange-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-orange-700 transition">
                                로그인
                            </button>
                            <button type="button" onclick="closeLogin()" class="flex-1 bg-gray-300 text-gray-700 px-4 py-3 rounded-lg font-bold hover:bg-gray-400 transition">
                                취소
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
            <!-- Register Modal -->
            <div id="registerModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden" style="display: none; align-items: center; justify-content: center; padding: 16px;">
                <div class="bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
                    <h3 class="text-xl font-bold text-gray-900 mb-4">
                        <i class="fas fa-user-plus text-orange-600 mr-2"></i>회원가입
                    </h3>
                    <form id="registerForm" onsubmit="handleRegister(event)">
                        <div class="mb-4">
                            <label class="block text-sm font-bold text-gray-700 mb-2">이름 <span class="text-red-500">*</span></label>
                            <input type="text" name="name" required class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none">
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-bold text-gray-700 mb-2">이메일 <span class="text-red-500">*</span></label>
                            <input type="email" name="email" required class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none">
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-bold text-gray-700 mb-2">휴대폰 <span class="text-red-500">*</span></label>
                            <input type="tel" name="phone" required pattern="[0-9]{10,11}" placeholder="01012345678" class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none">
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-bold text-gray-700 mb-2">비밀번호 <span class="text-red-500">*</span></label>
                            <input type="password" name="password" required minlength="8" class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none">
                            <p class="text-xs text-gray-500 mt-1">8자 이상 입력해주세요</p>
                        </div>
                        <div class="mb-6">
                            <label class="flex items-center">
                                <input type="checkbox" required class="mr-2">
                                <span class="text-sm text-gray-700">이용약관 및 개인정보처리방침에 동의합니다 <span class="text-red-500">*</span></span>
                            </label>
                        </div>
                        <div class="flex space-x-3">
                            <button type="submit" class="flex-1 bg-orange-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-orange-700 transition">
                                가입하기
                            </button>
                            <button type="button" onclick="closeRegister()" class="flex-1 bg-gray-300 text-gray-700 px-4 py-3 rounded-lg font-bold hover:bg-gray-400 transition">
                                취소
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>

        <!-- 챗봇 아이콘 -->
        <div id="chatbotIcon" class="chatbot-icon">
            <i class="fas fa-comments"></i>
        </div>

        <!-- 챗봇 윈도우 -->
        <div id="chatbotWindow" class="chatbot-window hidden">
            <!-- 헤더 -->
            <div class="chatbot-header">
                <div class="header-left">
                    <div class="bot-avatar-small">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="header-info">
                        <h3 id="chatbotTitle">DietMed 케어봇</h3>
                        <span class="status-online">
                            <i class="fas fa-circle"></i>
                            <span id="statusText">온라인</span>
                        </span>
                    </div>
                </div>
                <div class="header-right">
                    <!-- 언어 선택 -->
                    <div class="language-selector">
                        <button class="lang-btn active" data-lang="ko" title="한국어">🇰🇷</button>
                        <button class="lang-btn" data-lang="en" title="English">🇺🇸</button>
                        <button class="lang-btn" data-lang="zh" title="中文">🇨🇳</button>
                        <button class="lang-btn" data-lang="ja" title="日本語">🇯🇵</button>
                        <button class="lang-btn" data-lang="vi" title="Tiếng Việt">🇻🇳</button>
                        <button class="lang-btn" data-lang="ar" title="العربية">🇸🇦</button>
                    </div>
                    <!-- X 닫기 버튼 -->
                    <button id="closeChatbot" class="btn-close" style="margin-left: 12px; width: 40px; height: 40px; background: white !important; color: #FF6B35 !important; font-size: 28px; font-weight: bold; border: 2px solid rgba(255,255,255,0.5);">
                        ✖
                    </button>
                </div>
            </div>

            <!-- 메시지 영역 -->
            <div id="chatMessages" class="chat-messages">
                <!-- 웰컴 메시지 -->
                <div class="message bot-message">
                    <div class="bot-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="message-content">
                        <div class="message-text" id="welcomeMessage">
                            안녕하세요! 👋<br>
                            DietMed Global 케어봇입니다.<br>
                            무엇을 도와드릴까요?
                        </div>
                        <div class="message-time">방금 전</div>
                    </div>
                </div>
            </div>

            <!-- 빠른 답변 버튼 -->
            <div id="quickReplies" class="quick-replies"></div>

            <!-- 타이핑 인디케이터 -->
            <div id="typingIndicator" class="typing-indicator hidden">
                <div class="bot-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <!-- 입력 영역 -->
            <div class="chat-input-container">
                <textarea 
                    id="userInput" 
                    class="chat-input" 
                    placeholder="메시지를 입력하세요..."
                    rows="1"></textarea>
                <button id="sendBtn" class="btn-send">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>

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
        <script src="/static/app.js?v=fix2"></script>
        <script src="/static/chatbot-data.js?v=fix2"></script>
        <script src="/static/chatbot.js?v=fix2"></script>
    </body>
    </html>
  `);
});

export default app;
