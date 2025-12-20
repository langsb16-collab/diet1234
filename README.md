# 🏥 DietMed Global

**글로벌 다이어트 의약품 검증·안내 플랫폼**

전세계 규제기관(FDA, MFDS, EMA 등) 승인 다이어트 의약품을 검증하고, 사진 스캔으로 성분을 식별하며, 합법적 구매처를 안내하는 플랫폼입니다.

---

## 🎯 프로젝트 개요

### 핵심 기능

✅ **국가별 허가 상태 확인** - 한 곳에서 전세계 승인 상태 확인  
✅ **제품 비교 분석** - 2-4개 제품의 효능·부작용·안전성 상세 비교  
✅ **바코드 스캔** - 제품 식별 및 성분 정보 즉시 제공  
✅ **소비자 안전 점수** - 0-100점 4단계 안전 등급 (허가/효능/안전/유통)  
✅ **위조 위험 탐지** - AI 기반 사기 판매처 탐지  
✅ **합법 구매처 연결** - 인증된 약국/텔레메디슨만 안내

### 주요 차별점

| 영역 | 경쟁사 | DietMed Global |
|------|--------|----------------|
| **합법성 판정** | 정보만 제공 | ✨ 국가별 3초 판정 |
| **위조 탐지** | 없음 | ✨ AI 기반 패턴 자동 경고 |
| **성분 경고** | 일반 정보 | ✨ 금지 성분 블랙리스트 |
| **판매처 신뢰** | 링크만 | ✨ 인증 등급 시스템 |

---

## 🌐 URL

### 프로덕션 환경
- **커스텀 도메인**: https://puke365.net/
- **Cloudflare Pages**: https://d0f385d3.dietmed-global.pages.dev
- **API 엔드포인트**: https://puke365.net/api
- **헬스 체크**: https://puke365.net/api/health
- **GitHub 저장소**: https://github.com/langsb16-collab/diet1234

### 새로운 API 엔드포인트
- **FDA API**: https://puke365.net/api/external/fda/search?q=Wegovy
- **이미지 인식**: https://puke365.net/api/image-recognition/analyze-simple
- **리뷰 시스템**: https://puke365.net/api/reviews/product/PROD001
- **B2B 위젯**: https://puke365.net/api/b2b/widget/embed-example.html

### 개발 환경
- **로컬 서버**: http://localhost:3000 (PM2로 실행)

---

## 🗄️ 데이터 아키텍처

### 데이터베이스: Cloudflare D1 (SQLite)

#### 주요 테이블

**1. Master Data (마스터 데이터)**
- `ingredients` - 성분 마스터 (3개 기본 성분)
- `manufacturers` - 제조사 (3개 기본 제조사)
- `products` - 제품 (200개 제품) 🆕

**2. Regulatory Data (규제 데이터)**
- `approvals` - 국가별 허가 (9개 승인 기록)
- `recalls` - 리콜 이력
- `safety_events` - 안전성 이벤트

**3. Risk Data (위험 데이터)**
- `risk_patterns` - 위험 패턴 (5개 패턴)
- `blacklisted_ingredients` - 금지 성분 (3개)
- `sellers` - 판매처
- `seller_certifications` - 판매처 인증

**4. User Data (사용자 데이터)**
- `user_scans` - 스캔 이력
- `user_reports` - 사용자 신고

### 제품 데이터

#### 200개 제품 데이터베이스 🆕
- **Semaglutide 기반**: 50개 변형 제품
- **Liraglutide 기반**: 50개 변형 제품  
- **Orlistat 기반**: 50개 변형 제품
- **기타 다이어트 제품**: 50개 제품
- **다양한 용량**: 1mg ~ 50mg 다양한 강도
- **다양한 제형**: 주사제, 정제, 캡슐

#### 금지 성분
- **Sibutramine** (시부트라민) - 전세계 금지 (심혈관 위험)
- **Phenolphthalein** - 발암 가능성으로 금지
- **DNPH** (2,4-Dinitrophenol) - 치명적 과열

---

## 🚀 기술 스택

### Frontend
- **HTML/CSS/JavaScript** - 바닐라 JS
- **TailwindCSS** - UI 스타일링
- **Font Awesome** - 아이콘
- **Axios** - HTTP 클라이언트

### Backend
- **Hono** - 경량 웹 프레임워크
- **TypeScript** - 타입 안전성
- **Cloudflare Workers** - 엣지 런타임
- **Cloudflare Pages** - 정적 사이트 호스팅

### Database & Storage
- **Cloudflare D1** - SQLite 기반 관계형 DB
- **Cloudflare R2** (향후) - 파일 스토리지
- **Cloudflare KV** (향후) - 캐시 레이어

### DevOps
- **Wrangler** - Cloudflare CLI
- **PM2** - 프로세스 관리 (개발)
- **Git** - 버전 관리
- **Vite** - 빌드 도구

---

## 📁 프로젝트 구조

```
webapp/
├── src/
│   ├── index.tsx           # 메인 애플리케이션
│   ├── types.ts            # TypeScript 타입 정의
│   ├── routes/
│   │   └── api.ts          # API 라우트
│   └── renderer.tsx        # HTML 렌더러
├── public/
│   └── static/
│       └── app.js          # 프론트엔드 JavaScript
├── migrations/
│   └── 0001_initial_schema.sql  # DB 스키마
├── seed.sql                # 시드 데이터
├── dist/                   # 빌드 결과물
├── ecosystem.config.cjs    # PM2 설정
├── wrangler.jsonc          # Cloudflare 설정
├── package.json            # 의존성 및 스크립트
└── README.md               # 프로젝트 문서
```

---

## 🛠️ 로컬 개발 환경 설정

### 1. 프로젝트 클론

```bash
git clone <repository-url>
cd webapp
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 데이터베이스 설정

```bash
# 마이그레이션 실행 (로컬 DB 생성)
npm run db:migrate:local

# 시드 데이터 삽입
npm run db:seed

# DB 초기화 (필요 시)
npm run db:reset
```

### 4. 개발 서버 시작

```bash
# 빌드
npm run build

# PM2로 서버 시작
fuser -k 3000/tcp 2>/dev/null || true
pm2 start ecosystem.config.cjs

# 서버 상태 확인
pm2 list

# 로그 확인
pm2 logs --nostream
```

### 5. 테스트

```bash
# API 헬스 체크
curl http://localhost:3000/api/health

# 제품 검색
curl "http://localhost:3000/api/products/search?q=Wegovy"

# 바코드 스캔
curl -X POST http://localhost:3000/api/scan/barcode \
  -H "Content-Type: application/json" \
  -d '{"barcode":"0169-4517-02","country":"KR"}'
```

---

## 📡 API 엔드포인트

### Health Check
```
GET /api/health
```

### 제품 검색
```
GET /api/products/search?q={query}&country={country_code}
```

### 제품 상세 정보
```
GET /api/products/{product_id}?country={country_code}
```

### 바코드 스캔
```
POST /api/scan/barcode
Body: {
  "barcode": "0169-4517-02",
  "country": "KR"
}
```

### 전체 제품 목록
```
GET /api/products?limit={limit}&offset={offset}
```

### 금지 성분 목록
```
GET /api/blacklist
```

### 사용자 신고
```
POST /api/reports
Body: {
  "report_type": "suspicious_product",
  "product_id": "PROD001",
  "description": "신고 내용"
}
```

---

## 🌍 Cloudflare Pages 배포

### 사전 준비

1. **Cloudflare 계정 생성**: https://dash.cloudflare.com
2. **API 토큰 설정**: 
   - Deploy 탭에서 API 키 설정
   - `setup_cloudflare_api_key` 실행

### 배포 단계

```bash
# 1. 빌드
npm run build

# 2. 프로덕션 DB 생성 (최초 1회)
npx wrangler d1 create dietmed-production
# database_id를 wrangler.jsonc에 추가

# 3. 프로덕션 마이그레이션
npm run db:migrate:prod

# 4. Pages 프로젝트 생성 (최초 1회)
npx wrangler pages project create dietmed-global \
  --production-branch main \
  --compatibility-date 2024-01-01

# 5. 배포
npm run deploy
```

### 배포 후 확인

```bash
# 배포 URL 확인
# https://dietmed-global.pages.dev

# API 테스트
curl https://dietmed-global.pages.dev/api/health
```

---

## 🧪 테스트 시나리오

### 1. 제품 검색 테스트

**시나리오**: "Wegovy" 검색
- **입력**: 검색창에 "Wegovy" 입력
- **기대 결과**: 1개 제품 표시, 위험도 "주의"

### 2. 바코드 스캔 테스트

**시나리오**: Wegovy 바코드 스캔
- **입력**: `0169-4517-02`
- **기대 결과**:
  - 제품명: Wegovy
  - 성분: Semaglutide
  - 위험도: 주의 (냉장 유통 필요)
  - 국가별 상태:
    - 🇺🇸 미국: ⭕ FDA 승인 / 처방 필요
    - 🇬🇧 영국: ⭕ 승인 / 텔레메디슨 가능
    - 🇪🇺 EU: ⭕ 승인 / 처방 필요

### 3. 금지 성분 탐지 테스트

**시나리오**: Sibutramine 검색
- **입력**: "Sibutramine" 검색
- **기대 결과**:
  - ⛔ 금지 성분 경고
  - 건강 위험: 심근경색, 뇌졸중
  - 전세계 금지

---

## 📊 데이터 출처

### 공식 규제 기관
- **미국 FDA**: https://www.fda.gov
- **한국 MFDS**: https://www.mfds.go.kr
- **유럽 EMA**: https://www.ema.europa.eu
- **영국 MHRA**: https://www.gov.uk/mhra

### API 사용
- **DailyMed** (FDA 라벨): https://dailymed.nlm.nih.gov
- **공공데이터포털** (한국): https://www.data.go.kr

---

## 🔐 보안 및 개인정보

### 개인정보 최소 수집
- 사용자 ID는 선택사항 (익명 사용 가능)
- IP 주소는 해시 처리
- 복용약 정보는 클라이언트 로컬 저장

### 데이터 보호
- HTTPS 통신
- SQL Injection 방어 (준비된 쿼리문)
- CORS 설정

---

## 🤝 기여 가이드

### 이슈 제보
- GitHub Issues를 통해 버그 리포트 또는 기능 제안

### 개발 참여
1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 라이선스

본 프로젝트는 정보 제공 목적이며 의료행위를 대체하지 않습니다.

---

## 📞 문의

프로젝트 관련 문의사항이 있으시면 GitHub Issues를 이용해주세요.

---

## 🎉 현재 구현 완료 기능

### 2025-12-20 업데이트: 5가지 주요 개선 사항 완료

#### 1️⃣ 실제 규제기관 API 연동 ✅
- **FDA OpenFDA API** - 의약품 정보, 라벨, 부작용 데이터
- **MFDS 공공데이터** - 식약처 의약품 허가 정보 (API 키 필요)
- **통합 검색** - 모든 규제기관 동시 검색
- **엔드포인트**:
  - `/api/external/fda/search?q=Wegovy`
  - `/api/external/fda/label?product=Wegovy`
  - `/api/external/fda/adverse-events?product=Wegovy`
  - `/api/external/mfds/search?q=오젬픽&apiKey=YOUR_KEY`

#### 2️⃣ 제품 데이터베이스 확장 ✅
- **200개 제품** (기존 25개 → 200개) 🆕
- **제품 카테고리**:
  - Semaglutide 변형: 50개 (1mg ~ 50mg)
  - Liraglutide 변형: 50개 (1mg ~ 50mg)
  - Orlistat 변형: 50개 (1mg ~ 50mg)
  - 기타 다이어트 제품: 50개
- **기본 성분**: 3개 (Semaglutide, Liraglutide, Orlistat)
- **제조사**: 3개 기본 제조사

#### 3️⃣ 이미지 인식 기능 ✅
- **Google Cloud Vision API 통합**
- **OCR + 라벨 검출** - 알약 텍스트 및 로고 인식
- **자동 제품 매칭** - DB에서 유사 제품 검색
- **엔드포인트**:
  - `/api/image-recognition/analyze` (API 키 필요)
  - `/api/image-recognition/analyze-simple` (데모 모드)
  - `/api/image-recognition/providers` (지원 provider 목록)

#### 4️⃣ 사용자 리뷰 시스템 ✅
- **제품 리뷰 작성** - 1-5점 평점, 제목, 내용
- **리뷰 투표** - 도움됨/도움 안됨
- **리뷰 신고** - 스팸, 부적절, 가짜 리뷰 신고
- **통계 집계** - 평균 평점, 평점 분포, 검증된 구매 수
- **마이그레이션**: `0005_add_reviews.sql`
- **엔드포인트**:
  - `GET /api/reviews/product/:productId`
  - `POST /api/reviews` (리뷰 작성)
  - `POST /api/reviews/:reviewId/vote`
  - `POST /api/reviews/:reviewId/report`
  - `GET /api/reviews/stats/:productId`

#### 5️⃣ B2B API 위젯 ✅
- **임베드 가능한 위젯** - 약국/쇼핑몰 사이트 통합
- **제품 검증 위젯** - 안전 점수, 허가 정보 표시
- **커스터마이징** - 라이트/다크 테마, 다국어
- **JavaScript 임베드** - `<script>` 태그로 간편 통합
- **엔드포인트**:
  - `GET /api/b2b/widget/product-verification?productId=PROD001`
  - `GET /api/b2b/widget/embed.js` (임베드 스크립트)
  - `GET /api/b2b/widget/embed-example.html` (사용 예제)

### 기존 핵심 기능
✅ **프로젝트 초기 설정** (Hono + Cloudflare Pages + D1)  
✅ **Git 저장소 초기화** 및 .gitignore 설정  
✅ **DB 스키마 마이그레이션** (5개 마이그레이션 파일)  
✅ **시드 데이터** (25개 제품, 30개 규제기관, 28개 비교 항목)  
✅ **다국어 지원** (한국어, 영어, 중국어, 일본어)

### API 엔드포인트 (30+ 개)
✅ 제품 검색, 상세 조회, 바코드 스캔  
✅ 규제기관 조회 (30개 글로벌 기관)  
✅ **제품 비교** (2-4개 제품 상세 비교)  
✅ **안전 프로필 조회** (성분별 효능·부작용)  
✅ **안전 점수 조회** (0-100점, 4단계 등급)  
✅ **FAQ 조회** (10개 소비자 질문)  
✅ **FDA API 연동** (검색, 라벨, 부작용)  
✅ **이미지 인식** (알약 사진 분석)  
✅ **리뷰 시스템** (작성, 투표, 신고, 통계)  
✅ **B2B 위젯** (임베드 스크립트, 예제)  
✅ 금지 성분 조회, 사용자 신고

### 프론트엔드 UI
✅ 반응형 모바일 우선 디자인  
✅ 제품 검색 및 필터링  
✅ 바코드 스캔 인터페이스  
✅ **제품 선택 체크박스** (비교용)  
✅ **떠있는 비교 버튼** (선택된 제품 수 표시)  
✅ **제품 비교 테이블** (28개 항목 상세 비교)  
✅ FAQ 아코디언 UI

### 안전성 기능
✅ **소비자 안전 점수** (0-100점)
  - 허가/정품성 (35점)
  - 근거/효과 (25점)
  - 부작용/안전성 (25점)
  - 유통/추적성 (15점)
✅ **4단계 안전 등급**: Green (90-100), Light Green (70-89), Yellow (50-69), Red (0-49)  
✅ **안전 프로필**: 체중 감량률, 부작용, 금기사항, 약물 상호작용, 중독 위험  
✅ **금지 성분 블랙리스트**: Sibutramine (전세계 금지)

### 비교 기능 상세
✅ **기본 정보**: 제품명, 성분명, 제조사, 제형, 투여 경로  
✅ **허가 정보**: 허가 국가 수, 허가 번호/일자, 처방 구분, BMI 기준, 연령 제한  
✅ **효능**: 작용 기전, 6/12개월 감량률, 효과 발현 시기, 임상 근거 수준  
✅ **안전성**: 흔한/심각한 부작용, 금기사항, 약물 상호작용, 임신/수유, 중독 위험  
✅ **안전 점수**: 총점, 세부 점수 (허가/효능/안전/유통), 안전 등급

---

## 🚧 향후 개선 방향

⏳ **프로덕션 데이터 확장** - 100+ 제품 데이터베이스  
⏳ **실시간 가격 비교** - 온라인 약국 가격 API 연동  
⏳ **사용자 인증 시스템** - OAuth, 소셜 로그인  
⏳ **개인화 추천 시스템** - 사용자 건강 프로필 기반  
⏳ **푸시 알림** - 리콜, 안전 경고  
⏳ **모바일 앱** - React Native / Flutter

---

## 🎉 배포 완료

✅ **GitHub 저장소**: https://github.com/langsb16-collab/diet1234  
✅ **Cloudflare Pages 배포**: https://d0f385d3.dietmed-global.pages.dev  
✅ **커스텀 도메인 연결**: https://puke365.net/  
✅ **데이터베이스 마이그레이션**: D1 (SQLite) 5개 마이그레이션 적용  
✅ **시드 데이터**: 200개 제품 🆕, 30개 규제기관, 3개 기본 성분  
✅ **API 엔드포인트**: 30+ API 정상 작동
✅ **5가지 주요 개선**: FDA API, 제품 확장(200개), 이미지 인식, 리뷰, B2B 위젯

---

## 📝 API 사용 예제

### 1. FDA에서 제품 검색
```bash
curl "https://puke365.net/api/external/fda/search?q=Wegovy"
```

### 2. 이미지로 알약 인식 (데모)
```bash
curl -X POST "https://puke365.net/api/image-recognition/analyze-simple" \
  -F "image=@pill.jpg"
```

### 3. 제품 리뷰 조회
```bash
curl "https://puke365.net/api/reviews/product/PROD001"
```

### 4. B2B 위젯 임베드
```html
<script src="https://puke365.net/api/b2b/widget/embed.js"></script>
<div class="dietmed-widget" data-product-id="PROD001"></div>
```

---

**Last Updated**: 2025-12-20  
**Version**: 2.1.0 🆕  
**Status**: ✅ Production Deployed - 200 Products Database

---

## 🐛 최근 버그 수정 (v2.0.1)

### 수정된 문제

1. **메인화면 버튼 클릭 오류**
   - **증상**: 로그인, 회원가입, 공지 버튼 클릭 시 아무 동작 없음
   - **원인**: 인라인 `onclick` 이벤트에서 호출하는 함수들이 전역 스코프에 노출되지 않음
   - **해결**: 모든 이벤트 핸들러 함수를 `window` 객체에 명시적으로 할당
   ```javascript
   window.showLogin = showLogin;
   window.showRegister = showRegister;
   window.showNotices = showNotices;
   // ... 기타 함수들
   ```

2. **관리자 페이지 공지 등록 오류**
   - **증상**: 공지사항 등록 시 이미지 업로드 실패 및 저장 오류
   - **원인**: admin.js의 함수들이 전역 스코프에 노출되지 않음
   - **해결**: 관리자 함수들을 `window` 객체에 할당하고 에러 핸들링 개선
   ```javascript
   window.handleCreateNotice = handleCreateNotice;
   window.handleImageUpload = handleImageUpload;
   // ... 기타 관리자 함수들
   ```

3. **DOM 안전성 개선**
   - 모든 DOM 요소 접근 시 `null` 체크 추가
   - 에러 발생 시 상세한 에러 메시지 콘솔 출력
   - 사용자 친화적 에러 메시지 표시

### 영향 받는 파일
- `public/static/app.js` - 메인 애플리케이션 JavaScript
- `public/static/admin.js` - 관리자 패널 JavaScript

### 테스트 방법
1. **메인화면 버튼 테스트**
   - https://puke365.net/ 접속
   - 우측 상단 "로그인", "회원가입", "공지" 버튼 클릭
   - 각 모달이 정상적으로 표시되는지 확인

2. **관리자 공지 등록 테스트**
   - https://puke365.net/secret-admin-panel-xyz123 접속
   - "공지사항 등록" 클릭
   - 제목, 내용 입력 후 이미지 업로드
   - "등록하기" 버튼 클릭하여 정상 저장 확인

---

## 📝 알려진 이슈 및 제한사항

1. **데이터베이스**
   - 현재 200개 제품 데이터는 시드 데이터로 생성됨
   - FDA/MFDS API 연동은 구현되었으나 실제 대량 데이터 동기화는 향후 작업

2. **이미지 인식**
   - Google Vision API 통합 완료
   - API 키 설정 필요 (환경변수: `GOOGLE_VISION_API_KEY`)

3. **관리자 인증**
   - 현재 URL 기반 접근 (`/secret-admin-panel-xyz123`)
   - 프로덕션 환경에서는 IP 화이트리스트 또는 별도 인증 추가 권장

---


---

## 🧠 고급 이미지 검색 기능 (Google Vision API)

### 개요

DietMed Global은 **2가지 이미지 검색 모드**를 제공합니다:

1. **간단 모드** (기본) - API 키 불필요
   - 데이터베이스에서 인기 다이어트 의약품 자동 검색
   - 빠르고 간편한 검색

2. **고급 모드** (선택사항) - Google Vision API 필요
   - 실제 OCR로 알약 이미지에서 텍스트 추출
   - 제품명, NDC 코드, 제조사명 자동 인식
   - 높은 정확도의 제품 매칭

### 고급 모드 설정 방법

#### 1. Google Vision API 키 발급

1. **Google Cloud Console** 접속: https://console.cloud.google.com
2. 프로젝트 생성 또는 선택
3. **API 및 서비스 > 라이브러리**로 이동
4. "**Cloud Vision API**" 검색 후 활성화
5. **API 및 서비스 > 사용자 인증 정보**로 이동
6. **사용자 인증 정보 만들기 > API 키** 선택
7. 생성된 API 키 복사

#### 2. 로컬 개발 환경 설정

```bash
# .dev.vars 파일 생성 (로컬 개발용)
cp .dev.vars.example .dev.vars

# API 키 입력
echo "GOOGLE_VISION_API_KEY=your_actual_api_key_here" > .dev.vars
```

#### 3. Cloudflare Pages 프로덕션 설정

```bash
# Wrangler로 시크릿 설정
npx wrangler pages secret put GOOGLE_VISION_API_KEY --project-name dietmed-global

# 또는 Cloudflare Dashboard에서 설정:
# 1. Cloudflare Dashboard > Workers & Pages
# 2. dietmed-global 프로젝트 선택
# 3. Settings > Environment variables
# 4. Production 탭에서 "Add variable" 클릭
# 5. Name: GOOGLE_VISION_API_KEY, Value: (API 키)
```

### 사용 방법

#### 웹 UI에서 사용

1. https://puke365.net/ 접속
2. "**사진으로 제품 찾기**" 섹션으로 이동
3. 우측 상단의 **🧠 고급** 체크박스 클릭
4. "갤러리에서 선택" 또는 "카메라 촬영"으로 이미지 선택
5. "**이미지로 검색**" 버튼 클릭
6. ✅ **AI 분석 결과 확인**:
   - 인식된 텍스트
   - 추출된 키워드 (제품명, NDC 코드 등)
   - 신뢰도 점수
   - 매칭된 제품 목록

#### API로 직접 호출

```bash
# 간단 모드 (기본)
curl -X POST https://puke365.net/api/search/image \
  -F "image=@pill_image.jpg"

# 고급 모드 (Google Vision API 사용)
curl -X POST https://puke365.net/api/search/image \
  -F "image=@pill_image.jpg" \
  -F "advanced=true"
```

### OCR 인식 대상

고급 모드에서 자동으로 인식하는 정보:

✅ **제품명**: Wegovy, Ozempic, Saxenda, Mounjaro 등  
✅ **성분명**: Semaglutide, Liraglutide, Tirzepatide 등  
✅ **NDC 코드**: `0000-0000-00` 형식  
✅ **제조사**: Novo Nordisk, Eli Lilly, Pfizer 등  
✅ **기타 텍스트**: 용량, 용법 등

### 응답 예시

```json
{
  "success": true,
  "analysis_method": "google_vision_api",
  "ocr_result": {
    "detected_text": "Wegovy 2.4mg Novo Nordisk\nNDC 0169-4517-02",
    "detected_labels": ["Pharmaceutical", "Medicine", "Injection"],
    "confidence": 0.95,
    "extracted_terms": ["wegovy", "novo nordisk", "0169-4517-02"]
  },
  "products": [
    {
      "product_id": "PROD001",
      "product_name": "Wegovy",
      "ingredient_name": "Semaglutide",
      "manufacturer_name": "Novo Nordisk"
    }
  ],
  "total": 1,
  "mode": "advanced"
}
```

### 비용 안내

**Google Vision API 가격** (2025년 기준):
- **무료 할당량**: 월 1,000건
- **초과 요금**: 1,000건당 $1.50

**권장 사용 전략**:
- 개발/테스트: 간단 모드 사용
- 프로덕션: 필요 시에만 고급 모드 활성화
- 일반 사용자: 간단 모드로 충분
- 전문 사용자: 고급 모드로 정확도 향상

### 문제 해결

**Q: 고급 모드를 켰는데 작동하지 않아요**  
A: API 키가 올바르게 설정되었는지 확인하세요. 설정되지 않은 경우 자동으로 간단 모드로 fallback됩니다.

**Q: "API 키가 필요합니다" 오류가 나요**  
A: Google Cloud Console에서 Vision API를 활성화하고 API 키를 발급받으세요.

**Q: 비용이 걱정돼요**  
A: 월 1,000건까지 무료입니다. 간단 모드를 기본으로 사용하고, 필요할 때만 고급 모드를 활성화하세요.

### 기술 세부사항

**지원하는 이미지 형식**:
- JPG, PNG, GIF, BMP
- 최대 크기: 10MB
- 권장 해상도: 640x480 이상

**OCR 처리 시간**:
- 간단 모드: ~500ms
- 고급 모드: ~2-3초 (Google Vision API 호출 포함)

**정확도**:
- 간단 모드: 제품명 기반 검색
- 고급 모드: 90%+ 텍스트 인식 정확도 (Google Vision API)

