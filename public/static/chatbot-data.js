// FAQ 데이터 - 25개 전체
const chatbotData = {
  ko: {
    title: "DietMed 케어봇",
    status: "온라인",
    welcome: "안녕하세요! 👋\nDietMed Global 케어봇입니다.\n자주 묻는 질문을 확인해보세요.",
    faqTitle: "자주 묻는 질문 (FAQ)",
    backText: "목록으로",
    qa: [
      {
        question: "플랫폼은 어떤 서비스인가요?",
        preview: "다이어트 의약품 검증 플랫폼",
        answer: "전 세계 다이어트 의약품 검색·비교 및 국가별 허가 상태와 안전성 확인을 제공하며, FDA·MFDS 등 규제기관 정보를 기반으로 안내합니다."
      },
      {
        question: "약 이름 모를 때 사진으로 검색 가능한가요?",
        preview: "사진 업로드로 제품 식별",
        answer: "가능하며, 알약 사진 업로드 또는 촬영 시 이미지 인식으로 식별을 시도합니다."
      },
      {
        question: "위험한 성분이 포함된 약도 표시되나요?",
        preview: "금지 성분 감지 및 경고",
        answer: "네. 시부트라민, 페놀프탈레인, DNPH 등 금지 성분이 감지되면 고위험 레벨로 분류하고 경고 문구를 표시합니다."
      },
      {
        question: "안전등급 기준이 어떻게 되나요?",
        preview: "0~100점, 4단계 색상 표시",
        answer: "안전 점수 0~100점, 4단계 색상 표시.\n🟢90~100 매우 안전 / 🟡70~89 비교적 안전 / 🟠50~69 주의 / 🔴0~49 고위험"
      },
      {
        question: "어떤 약들 검색이 잘 되나요?",
        preview: "주요 GLP-1 기반 의약품",
        answer: "Wegovy, Ozempic, Saxenda, Semaglutide, Liraglutide 등 주요 GLP-1 기반 의약품 매칭이 우선 동작합니다."
      },
      {
        question: "국가별 허가 여부도 나오나요?",
        preview: "50개 국가 승인 여부 조회",
        answer: "미국 FDA, 한국 MFDS, EU, 영국 등 50개 국가별 승인 여부를 조회할 수 있습니다."
      },
      {
        question: "바코드 스캔으로 확인이 되나요?",
        preview: "바코드/NDC 코드 입력",
        answer: "됩니다. 바코드나 NDC 코드 입력 시 해당 제품의 허가 상태와 성분 정보가 조회됩니다."
      },
      {
        question: "판매처가 안전한지 확인할 수 있나요?",
        preview: "B2B 인증 위젯으로 검증",
        answer: "플랫폼 내 B2B 인증 위젯으로 판매처 검증 여부를 확인 가능하며, 승인된 국가 판매처만 필터링 가능합니다."
      },
      {
        question: "비의료인이 약을 구입해도 되나요?",
        preview: "국가별 규제 상이, 정보 제공 목적",
        answer: "국가별 규제에 따라 상이합니다. 본 플랫폼은 정보 제공 목적이며 구매/복용 결정을 대신하지 않습니다. 의료 전문가 상담이 권장됩니다."
      },
      {
        question: "금지 성분이면 바로 위험 표시되나요?",
        preview: "즉시 위험 배지 및 경고 화면",
        answer: "네. 금지 성분 탐지 시 '위험(🔴)' 배지와 경고 화면이 우선 표시됩니다."
      },
      {
        question: "부작용이나 경고 정보도 나오나요?",
        preview: "제품별 부작용 경고 정보",
        answer: "플랫폼에 기록된 심혈관계, 신경계, 대사계 부작용 경고 등을 제품별로 확인할 수 있습니다."
      },
      {
        question: "사진 업로드는 제한이 있나요?",
        preview: "10MB 이하 이미지 파일만",
        answer: "10MB 이하 이미지 파일만 허용되며, 비이미지 파일은 자동 차단됩니다."
      },
      {
        question: "OCR 기능이 실제로 작동하나요?",
        preview: "내부 매칭 DB + Google Vision API",
        answer: "기본 모드는 내부 매칭 DB 기반이며, 고급 모드에서는 Google Vision API 사용으로 텍스트·코드 인식이 가능합니다(키 필요)."
      },
      {
        question: "여러 제품을 동시에 비교할 수 있나요?",
        preview: "최대 4개 제품 비교",
        answer: "최대 4개 제품까지 안전등급/성분/승인국가/위험배지 비교가 가능합니다."
      },
      {
        question: "다이어트 주사류(삭센다 등) 정보도 있나요?",
        preview: "Liraglutide 계열 제품 정보",
        answer: "네. Liraglutide 계열 제품은 승인 상태/보관 조건(냉장 여부) 등 정보를 확인할 수 있습니다."
      },
      {
        question: "냉장 유통 조건도 알려주나요?",
        preview: "유통 조건 주의 배지",
        answer: "해당 제품에 냉장·저장 조건이 있다면 주의 배지(🟠)로 표시하고 유통 조건을 안내합니다."
      },
      {
        question: "제품이 승인되지 않은 국가에서 유통되면 어떻게 표시되나요?",
        preview: "위험도 상승, 주의/고위험 배지",
        answer: "승인되지 않은 국가 판매는 위험도 상승으로 표시되며 '주의' 또는 '고위험' 배지가 부여됩니다."
      },
      {
        question: "사용자 리뷰나 평점도 볼 수 있나요?",
        preview: "제품 평가·후기·리뷰 점수",
        answer: "가능하며, 제품 평가·후기·리뷰 점수로 신뢰도를 참고할 수 있습니다."
      },
      {
        question: "언어는 몇 개 지원하나요?",
        preview: "9개 언어 + RTL(아랍어)",
        answer: "총 9개 언어를 지원하며 RTL(아랍어)도 제공합니다."
      },
      {
        question: "모바일에서도 카메라 촬영되나요?",
        preview: "모바일 즉시 카메라 실행",
        answer: "네. 모바일에서 '카메라 촬영'을 선택하면 즉시 카메라가 실행됩니다."
      },
      {
        question: "검색 기록은 저장되나요?",
        preview: "최근 10개 임시 저장",
        answer: "기본적으로 최근 10개 검색만 임시 저장되며, 계정 로그인 시 기록 보관이 가능합니다."
      },
      {
        question: "이 서비스가 약을 추천하는 건가요?",
        preview: "정보 확인 목적, 추천 아님",
        answer: "아니요. 약품 추천·처방·구매 권유가 아니라, 안전성 검증과 정보 확인 목적의 서비스입니다."
      },
      {
        question: "위조 약품도 판별되나요?",
        preview: "위조 가능성 경고",
        answer: "가능 범위 내에서 바코드·이미지·성분·승인국가 비교로 위조 가능성을 경고하지만, 법적 감정 결과를 대신하지 않습니다."
      },
      {
        question: "어르신·초보자도 쓸 수 있나요?",
        preview: "직관적 디자인",
        answer: "간편검색, 바코드 인식, 1~4단계 안전색으로 직관적으로 확인하도록 설계되었습니다."
      },
      {
        question: "최종 책임은 누가 지나요?",
        preview: "정보 제공 도구, 사용자 책임",
        answer: "본 플랫폼은 정보 제공 도구이며, 구매·복용·의학 판단·법적 책임은 사용자 및 의료전문가 결정에 따릅니다."
      }
    ]
  },
  en: {
    title: "DietMed CareBot",
    status: "Online",
    welcome: "Hello! 👋\nI'm DietMed Global CareBot.\nCheck out the frequently asked questions.",
    faqTitle: "Frequently Asked Questions (FAQ)",
    backText: "Back to list",
    qa: [
      {
        question: "What is this platform?",
        preview: "Diet medication verification platform",
        answer: "A verification platform to search and compare global diet medications, instantly check approval status and safety by country. Based on regulatory information from FDA, MFDS, etc."
      },
      {
        question: "Can I search by photo if I don't know the name?",
        preview: "Photo upload for product identification",
        answer: "Yes, when you upload or take a photo of a pill, image recognition attempts to identify it."
      },
      {
        question: "Are dangerous ingredients displayed?",
        preview: "Banned ingredient detection & warning",
        answer: "Yes. If banned ingredients like sibutramine, phenolphthalein, DNPH are detected, they are classified as high risk with warning messages."
      },
      {
        question: "What are the safety grade criteria?",
        preview: "0-100 score, 4 color levels",
        answer: "Safety scores 0-100, displayed in 4 color levels:\n🟢90-100 Very Safe / 🟡70-89 Relatively Safe / 🟠50-69 Caution / 🔴0-49 High Risk"
      },
      {
        question: "Which medications search well?",
        preview: "Major GLP-1 based medications",
        answer: "Major GLP-1 based medications such as Wegovy, Ozempic, Saxenda, Semaglutide, Liraglutide are prioritized."
      },
      {
        question: "Can I see approval by country?",
        preview: "50 countries approval status",
        answer: "You can check approval status in 50 countries including US FDA, Korea MFDS, EU, UK."
      },
      {
        question: "Can I scan barcodes?",
        preview: "Barcode/NDC code input",
        answer: "Yes. Enter barcode or NDC code to retrieve approval status and ingredient information."
      },
      {
        question: "Can I verify if sellers are safe?",
        preview: "B2B verification widget",
        answer: "You can verify seller authentication through the B2B verification widget and filter only approved country sellers."
      },
      {
        question: "Can non-medical people purchase medication?",
        preview: "Varies by country, informational purpose",
        answer: "It varies by country regulations. This platform is for informational purposes and does not replace purchase/consumption decisions. Medical professional consultation is recommended."
      },
      {
        question: "Are banned ingredients immediately marked as dangerous?",
        preview: "Immediate danger badge & warning screen",
        answer: "Yes. When banned ingredients are detected, a 'Danger(🔴)' badge and warning screen are displayed immediately."
      },
      {
        question: "Are side effects or warnings displayed?",
        preview: "Product-specific side effect warnings",
        answer: "You can check cardiovascular, neurological, metabolic side effect warnings recorded for each product."
      },
      {
        question: "Are there limits on photo uploads?",
        preview: "10MB or less image files only",
        answer: "Only image files 10MB or less are allowed, non-image files are automatically blocked."
      },
      {
        question: "Does OCR actually work?",
        preview: "Internal matching DB + Google Vision API",
        answer: "Basic mode uses internal matching DB, advanced mode uses Google Vision API for text·code recognition (key required)."
      },
      {
        question: "Can I compare multiple products at once?",
        preview: "Up to 4 products comparison",
        answer: "You can compare up to 4 products for safety grade/ingredients/approved countries/risk badges."
      },
      {
        question: "Is there information on diet injections (Saxenda, etc.)?",
        preview: "Liraglutide product information",
        answer: "Yes. Liraglutide products show approval status/storage conditions (refrigeration) information."
      },
      {
        question: "Do you show refrigeration distribution conditions?",
        preview: "Distribution condition caution badge",
        answer: "If the product has refrigeration/storage conditions, a caution badge(🟠) is displayed with distribution guidelines."
      },
      {
        question: "How is it displayed if sold in unapproved countries?",
        preview: "Increased risk, caution/high-risk badge",
        answer: "Sales in unapproved countries show increased risk with 'Caution' or 'High Risk' badges."
      },
      {
        question: "Can I see user reviews or ratings?",
        preview: "Product reviews & ratings",
        answer: "Yes, you can refer to product evaluations, reviews, and rating scores for reliability."
      },
      {
        question: "How many languages are supported?",
        preview: "9 languages + RTL(Arabic)",
        answer: "We support 9 languages including RTL (Arabic)."
      },
      {
        question: "Does camera work on mobile?",
        preview: "Instant mobile camera launch",
        answer: "Yes. On mobile, selecting 'Camera' immediately launches the camera."
      },
      {
        question: "Is search history saved?",
        preview: "Last 10 searches temporarily saved",
        answer: "By default, only the last 10 searches are temporarily saved, with account login history can be preserved."
      },
      {
        question: "Does this service recommend medications?",
        preview: "Information purpose, not recommendation",
        answer: "No. This is not medication recommendation, prescription, or purchase advice, but a service for safety verification and information."
      },
      {
        question: "Are counterfeit medications detected?",
        preview: "Counterfeit possibility warning",
        answer: "Within capability, barcode·image·ingredients·approved country comparison warns of counterfeit possibility, but does not replace legal forensic results."
      },
      {
        question: "Can elderly/beginners use it?",
        preview: "Intuitive design",
        answer: "Designed for intuitive checking with simple search, barcode recognition, and 1-4 stage safety colors."
      },
      {
        question: "Who bears final responsibility?",
        preview: "Information tool, user responsibility",
        answer: "This platform is an information tool; purchase, consumption, medical judgment, and legal responsibility are determined by users and medical professionals."
      }
    ]
  },
  zh: {
    title: "DietMed 智能助手",
    status: "在线",
    welcome: "您好！👋\n我是DietMed Global智能助手。\n查看常见问题。",
    faqTitle: "常见问题 (FAQ)",
    backText: "返回列表",
    qa: [
      {
        question: "这是什么平台？",
        preview: "减肥药验证平台",
        answer: "搜索和比较全球减肥药品，即时确认各国批准状态和安全性的验证平台。基于FDA、MFDS等监管机构信息。"
      },
      {
        question: "不知道药名时可以用照片搜索吗？",
        preview: "照片上传识别产品",
        answer: "可以，上传或拍摄药片照片时，图像识别会尝试识别。"
      },
      {
        question: "会显示危险成分吗？",
        preview: "禁用成分检测和警告",
        answer: "是的。如果检测到西布曲明、酚酞、DNPH等禁用成分，将分类为高风险并显示警告信息。"
      },
      {
        question: "安全等级标准是什么？",
        preview: "0-100分，4级颜色",
        answer: "安全分数0-100分，4级颜色显示：\n🟢90-100 非常安全 / 🟡70-89 相对安全 / 🟠50-69 注意 / 🔴0-49 高风险"
      },
      {
        question: "哪些药品搜索效果好？",
        preview: "主要GLP-1类药物",
        answer: "Wegovy、Ozempic、Saxenda、Semaglutide、Liraglutide等主要GLP-1类药物优先匹配。"
      },
      {
        question: "可以查看各国批准情况吗？",
        preview: "50个国家批准状态",
        answer: "可以查询美国FDA、韩国MFDS、欧盟、英国等50个国家的批准状态。"
      },
      {
        question: "可以扫描条形码吗？",
        preview: "条形码/NDC代码输入",
        answer: "可以。输入条形码或NDC代码即可查询批准状态和成分信息。"
      },
      {
        question: "可以确认销售商是否安全吗？",
        preview: "B2B认证小部件",
        answer: "可以通过B2B认证小部件验证销售商，仅筛选获批准的国家销售商。"
      },
      {
        question: "非医疗人员可以购买药品吗？",
        preview: "各国规定不同，信息提供目的",
        answer: "各国规定不同。本平台仅供信息提供，不代替购买/服用决定。建议咨询医疗专业人士。"
      },
      {
        question: "禁用成分会立即显示危险吗？",
        preview: "立即显示危险徽章和警告屏幕",
        answer: "是的。检测到禁用成分时会立即显示'危险(🔴)'徽章和警告屏幕。"
      },
      {
        question: "会显示副作用或警告信息吗？",
        preview: "产品特定副作用警告",
        answer: "可以查看平台记录的心血管、神经系统、代谢系统副作用警告等产品信息。"
      },
      {
        question: "照片上传有限制吗？",
        preview: "仅限10MB以下图像文件",
        answer: "仅允许10MB以下的图像文件，非图像文件会自动拦截。"
      },
      {
        question: "OCR功能真的有效吗？",
        preview: "内部匹配数据库 + Google Vision API",
        answer: "基本模式使用内部匹配数据库，高级模式使用Google Vision API进行文本·代码识别（需要密钥）。"
      },
      {
        question: "可以同时比较多个产品吗？",
        preview: "最多比较4个产品",
        answer: "可以比较最多4个产品的安全等级/成分/批准国家/风险徽章。"
      },
      {
        question: "有减肥注射剂（司美格鲁肽等）信息吗？",
        preview: "利拉鲁肽类产品信息",
        answer: "是的。利拉鲁肽类产品可以查看批准状态/储存条件（冷藏）等信息。"
      },
      {
        question: "会告知冷藏流通条件吗？",
        preview: "流通条件注意徽章",
        answer: "如果产品有冷藏·储存条件，会显示注意徽章(🟠)并告知流通条件。"
      },
      {
        question: "在未批准的国家销售会如何显示？",
        preview: "风险增加，注意/高风险徽章",
        answer: "在未批准国家销售会显示风险增加，授予'注意'或'高风险'徽章。"
      },
      {
        question: "可以查看用户评论或评分吗？",
        preview: "产品评价·评论·评分",
        answer: "可以，可以参考产品评价、评论、评分分数来判断可信度。"
      },
      {
        question: "支持多少种语言？",
        preview: "9种语言 + RTL(阿拉伯语)",
        answer: "支持9种语言，包括RTL（阿拉伯语）。"
      },
      {
        question: "移动设备上相机可用吗？",
        preview: "移动设备即时启动相机",
        answer: "是的。在移动设备上选择'相机'会立即启动相机。"
      },
      {
        question: "搜索记录会保存吗？",
        preview: "最近10次临时保存",
        answer: "默认仅临时保存最近10次搜索，账户登录后可以保存记录。"
      },
      {
        question: "这项服务推荐药品吗？",
        preview: "信息目的，非推荐",
        answer: "不。这不是药品推荐、处方或购买建议，而是安全验证和信息确认目的的服务。"
      },
      {
        question: "可以识别假药吗？",
        preview: "假药可能性警告",
        answer: "在可能范围内通过条形码·图像·成分·批准国家比较警告假药可能性，但不代替法律鉴定结果。"
      },
      {
        question: "老年人·初学者也能使用吗？",
        preview: "直观设计",
        answer: "设计为通过简单搜索、条形码识别、1-4级安全颜色直观确认。"
      },
      {
        question: "最终责任由谁承担？",
        preview: "信息工具，用户责任",
        answer: "本平台是信息工具，购买、服用、医学判断、法律责任由用户和医疗专业人士决定。"
      }
    ]
  },
  ja: {
    title: "DietMed ケアボット",
    status: "オンライン",
    welcome: "こんにちは！👋\nDietMed Globalケアボットです。\nよくある質問をご覧ください。",
    faqTitle: "よくある質問 (FAQ)",
    backText: "リストに戻る",
    qa: [
      {
        question: "このプラットフォームは何ですか？",
        preview: "ダイエット医薬品検証プラットフォーム",
        answer: "世界中のダイエット医薬品を検索・比較し、国別の承認状況と安全性を即座に確認できる検証プラットフォームです。FDA・MFDSなどの規制機関情報に基づいています。"
      },
      {
        question: "薬の名前が分からない時、写真で検索できますか？",
        preview: "写真アップロードで製品識別",
        answer: "可能です。錠剤の写真をアップロードまたは撮影すると、画像認識で識別を試みます。"
      },
      {
        question: "危険な成分も表示されますか？",
        preview: "禁止成分の検出と警告",
        answer: "はい。シブトラミン、フェノールフタレイン、DNPHなどの禁止成分が検出されると、高リスクレベルに分類され警告が表示されます。"
      },
      {
        question: "安全等級の基準は？",
        preview: "0-100点、4段階の色",
        answer: "安全スコア0-100点、4段階の色で表示されます。\n🟢90-100 非常に安全 / 🟡70-89 比較的安全 / 🟠50-69 注意 / 🔴0-49 高リスク"
      },
      {
        question: "どの薬が検索しやすいですか？",
        preview: "主要なGLP-1ベースの医薬品",
        answer: "Wegovy、Ozempic、Saxenda、Semaglutide、Liraglutideなど主要なGLP-1ベースの医薬品が優先的にマッチングされます。"
      },
      {
        question: "国別の承認状況も見られますか？",
        preview: "50カ国の承認状況",
        answer: "米国FDA、韓国MFDS、EU、英国など50カ国の承認状況を確認できます。"
      },
      {
        question: "バーコードスキャンで確認できますか？",
        preview: "バーコード/NDCコード入力",
        answer: "可能です。バーコードまたはNDCコードを入力すると、承認状況と成分情報が表示されます。"
      },
      {
        question: "販売店が安全か確認できますか？",
        preview: "B2B認証ウィジェット",
        answer: "B2B認証ウィジェットで販売店の検証が可能で、承認された国の販売店のみフィルタリングできます。"
      },
      {
        question: "医療従事者でない人が薬を購入してもいいですか？",
        preview: "国別規制により異なる、情報提供目的",
        answer: "国別規制により異なります。本プラットフォームは情報提供目的であり、購入・服用決定を代替するものではありません。医療専門家への相談が推奨されます。"
      },
      {
        question: "禁止成分ならすぐに危険表示されますか？",
        preview: "即座に危険バッジと警告画面",
        answer: "はい。禁止成分検出時は「危険(🔴)」バッジと警告画面が優先表示されます。"
      },
      {
        question: "副作用や警告情報も表示されますか？",
        preview: "製品別副作用警告情報",
        answer: "プラットフォームに記録された心血管系、神経系、代謝系副作用警告などを製品別に確認できます。"
      },
      {
        question: "写真アップロードに制限はありますか？",
        preview: "10MB以下の画像ファイルのみ",
        answer: "10MB以下の画像ファイルのみ許可され、非画像ファイルは自動ブロックされます。"
      },
      {
        question: "OCR機能は実際に動作しますか？",
        preview: "内部マッチングDB + Google Vision API",
        answer: "基本モードは内部マッチングDBベース、高度モードではGoogle Vision API使用でテキスト・コード認識が可能です（キー必要）。"
      },
      {
        question: "複数の製品を同時に比較できますか？",
        preview: "最大4製品比較",
        answer: "最大4製品まで安全等級/成分/承認国/危険バッジの比較が可能です。"
      },
      {
        question: "ダイエット注射薬（サクセンダなど）の情報もありますか？",
        preview: "リラグルチド系製品情報",
        answer: "はい。リラグルチド系製品は承認状況/保管条件（冷蔵）などの情報を確認できます。"
      },
      {
        question: "冷蔵流通条件も教えてくれますか？",
        preview: "流通条件注意バッジ",
        answer: "該当製品に冷蔵・保管条件がある場合、注意バッジ(🟠)で表示し流通条件を案内します。"
      },
      {
        question: "製品が承認されていない国で流通されている場合、どう表示されますか？",
        preview: "危険度上昇、注意/高リスクバッジ",
        answer: "承認されていない国での販売は危険度上昇として表示され、「注意」または「高リスク」バッジが付与されます。"
      },
      {
        question: "ユーザーレビューや評価も見られますか？",
        preview: "製品評価・レビュー・評点",
        answer: "可能です。製品評価・レビュー・評点スコアで信頼性を参考にできます。"
      },
      {
        question: "何言語対応していますか？",
        preview: "9言語 + RTL(アラビア語)",
        answer: "RTL（アラビア語）を含む9言語に対応しています。"
      },
      {
        question: "モバイルでカメラ撮影できますか？",
        preview: "モバイルで即座にカメラ起動",
        answer: "はい。モバイルで「カメラ撮影」を選択すると、すぐにカメラが起動します。"
      },
      {
        question: "検索履歴は保存されますか？",
        preview: "最近10件一時保存",
        answer: "基本的に最近10件の検索のみ一時保存され、アカウントログイン時に記録保管が可能です。"
      },
      {
        question: "このサービスは薬を推奨するものですか？",
        preview: "情報確認目的、推奨ではない",
        answer: "いいえ。薬品推奨・処方・購入勧誘ではなく、安全性検証と情報確認目的のサービスです。"
      },
      {
        question: "偽造薬品も判別されますか？",
        preview: "偽造可能性警告",
        answer: "可能な範囲でバーコード・画像・成分・承認国比較で偽造可能性を警告しますが、法的鑑定結果を代替するものではありません。"
      },
      {
        question: "高齢者・初心者でも使えますか？",
        preview: "直感的デザイン",
        answer: "簡単検索、バーコード認識、1-4段階安全色で直感的に確認できるよう設計されています。"
      },
      {
        question: "最終責任は誰が負いますか？",
        preview: "情報提供ツール、ユーザー責任",
        answer: "本プラットフォームは情報提供ツールであり、購入・服用・医学判断・法的責任はユーザーおよび医療専門家の決定に従います。"
      }
    ]
  },
  vi: {
    title: "DietMed CareBot",
    status: "Trực tuyến",
    welcome: "Xin chào! 👋\nTôi là DietMed Global CareBot.\nXem các câu hỏi thường gặp.",
    faqTitle: "Câu hỏi thường gặp (FAQ)",
    backText: "Quay lại danh sách",
    qa: [
      {
        question: "Nền tảng này là gì?",
        preview: "Nền tảng xác minh thuốc giảm cân",
        answer: "Nền tảng xác minh để tìm kiếm và so sánh thuốc giảm cân toàn cầu, kiểm tra ngay tình trạng phê duyệt và an toàn theo quốc gia. Dựa trên thông tin từ FDA, MFDS, v.v."
      },
      {
        question: "Có thể tìm kiếm bằng ảnh khi không biết tên thuốc?",
        preview: "Tải ảnh lên để nhận dạng sản phẩm",
        answer: "Có thể, khi bạn tải lên hoặc chụp ảnh viên thuốc, nhận dạng hình ảnh sẽ cố gắng xác định."
      },
      {
        question: "Có hiển thị thành phần nguy hiểm?",
        preview: "Phát hiện thành phần cấm & cảnh báo",
        answer: "Có. Nếu phát hiện thành phần cấm như sibutramine, phenolphthalein, DNPH, sẽ được phân loại là rủi ro cao với thông báo cảnh báo."
      },
      {
        question: "Tiêu chí cấp độ an toàn là gì?",
        preview: "Điểm 0-100, 4 mức màu",
        answer: "Điểm an toàn 0-100, hiển thị 4 mức màu:\n🟢90-100 Rất an toàn / 🟡70-89 Tương đối an toàn / 🟠50-69 Cẩn thận / 🔴0-49 Rủi ro cao"
      },
      {
        question: "Thuốc nào tìm kiếm tốt?",
        preview: "Thuốc dựa trên GLP-1 chính",
        answer: "Các thuốc dựa trên GLP-1 chính như Wegovy, Ozempic, Saxenda, Semaglutide, Liraglutide được ưu tiên khớp."
      },
      {
        question: "Có xem phê duyệt theo quốc gia?",
        preview: "Tình trạng phê duyệt 50 quốc gia",
        answer: "Bạn có thể kiểm tra tình trạng phê duyệt ở 50 quốc gia bao gồm FDA Mỹ, MFDS Hàn Quốc, EU, Anh."
      },
      {
        question: "Có thể quét mã vạch để xác nhận?",
        preview: "Nhập mã vạch/NDC",
        answer: "Có. Nhập mã vạch hoặc mã NDC để lấy thông tin phê duyệt và thành phần."
      },
      {
        question: "Có thể xác minh người bán an toàn không?",
        preview: "Widget xác thực B2B",
        answer: "Có thể xác minh người bán qua widget xác thực B2B và chỉ lọc người bán được phê duyệt theo quốc gia."
      },
      {
        question: "Người không phải y tế có thể mua thuốc không?",
        preview: "Khác nhau theo quốc gia, mục đích thông tin",
        answer: "Khác nhau theo quy định của từng quốc gia. Nền tảng này chỉ mang tính thông tin và không thay thế quyết định mua/sử dụng. Nên tham khảo ý kiến chuyên gia y tế."
      },
      {
        question: "Thành phần cấm có được đánh dấu nguy hiểm ngay không?",
        preview: "Huy hiệu nguy hiểm & màn hình cảnh báo ngay",
        answer: "Có. Khi phát hiện thành phần cấm, huy hiệu 'Nguy hiểm(🔴)' và màn hình cảnh báo được hiển thị ngay."
      },
      {
        question: "Có hiển thị tác dụng phụ hoặc thông tin cảnh báo?",
        preview: "Thông tin cảnh báo tác dụng phụ theo sản phẩm",
        answer: "Có thể kiểm tra cảnh báo tác dụng phụ về tim mạch, thần kinh, chuyển hóa được ghi lại cho từng sản phẩm."
      },
      {
        question: "Có giới hạn tải ảnh lên không?",
        preview: "Chỉ file ảnh dưới 10MB",
        answer: "Chỉ cho phép file ảnh dưới 10MB, file không phải ảnh sẽ bị chặn tự động."
      },
      {
        question: "Chức năng OCR có hoạt động thực sự không?",
        preview: "DB khớp nội bộ + Google Vision API",
        answer: "Chế độ cơ bản dựa trên DB khớp nội bộ, chế độ nâng cao sử dụng Google Vision API để nhận dạng văn bản·mã (cần key)."
      },
      {
        question: "Có thể so sánh nhiều sản phẩm cùng lúc không?",
        preview: "So sánh tối đa 4 sản phẩm",
        answer: "Có thể so sánh tối đa 4 sản phẩm về cấp độ an toàn/thành phần/quốc gia phê duyệt/huy hiệu rủi ro."
      },
      {
        question: "Có thông tin về thuốc tiêm giảm cân (Saxenda, v.v.)?",
        preview: "Thông tin sản phẩm Liraglutide",
        answer: "Có. Sản phẩm Liraglutide hiển thị thông tin về tình trạng phê duyệt/điều kiện bảo quản (làm lạnh)."
      },
      {
        question: "Có thông báo điều kiện lưu trữ lạnh không?",
        preview: "Huy hiệu cẩn thận về điều kiện lưu trữ",
        answer: "Nếu sản phẩm có điều kiện làm lạnh·bảo quản, huy hiệu cẩn thận(🟠) sẽ hiển thị và hướng dẫn điều kiện lưu trữ."
      },
      {
        question: "Sản phẩm bán ở quốc gia chưa phê duyệt hiển thị như thế nào?",
        preview: "Tăng rủi ro, huy hiệu cẩn thận/rủi ro cao",
        answer: "Bán hàng ở quốc gia chưa phê duyệt hiển thị tăng rủi ro với huy hiệu 'Cẩn thận' hoặc 'Rủi ro cao'."
      },
      {
        question: "Có thể xem đánh giá hoặc xếp hạng của người dùng?",
        preview: "Đánh giá·nhận xét·điểm sản phẩm",
        answer: "Có thể, có thể tham khảo đánh giá, nhận xét, điểm số sản phẩm để đánh giá độ tin cậy."
      },
      {
        question: "Hỗ trợ bao nhiêu ngôn ngữ?",
        preview: "9 ngôn ngữ + RTL(Ả Rập)",
        answer: "Chúng tôi hỗ trợ 9 ngôn ngữ bao gồm RTL (tiếng Ả Rập)."
      },
      {
        question: "Máy ảnh hoạt động trên mobile không?",
        preview: "Khởi động máy ảnh ngay trên mobile",
        answer: "Có. Trên di động, chọn 'Máy ảnh' sẽ khởi động máy ảnh ngay lập tức."
      },
      {
        question: "Lịch sử tìm kiếm có được lưu không?",
        preview: "10 tìm kiếm gần nhất lưu tạm",
        answer: "Mặc định chỉ lưu tạm 10 tìm kiếm gần nhất, khi đăng nhập tài khoản có thể lưu lịch sử."
      },
      {
        question: "Dịch vụ này có khuyến nghị thuốc không?",
        preview: "Mục đích thông tin, không khuyến nghị",
        answer: "Không. Không phải khuyến nghị thuốc, kê đơn, hay khuyến khích mua, mà là dịch vụ xác minh an toàn và thông tin."
      },
      {
        question: "Có phát hiện thuốc giả không?",
        preview: "Cảnh báo khả năng giả mạo",
        answer: "Trong phạm vi có thể, so sánh mã vạch·ảnh·thành phần·quốc gia phê duyệt để cảnh báo khả năng giả mạo, nhưng không thay thế kết quả giám định pháp lý."
      },
      {
        question: "Người cao tuổi·người mới có thể sử dụng không?",
        preview: "Thiết kế trực quan",
        answer: "Được thiết kế để kiểm tra trực quan với tìm kiếm đơn giản, nhận dạng mã vạch, màu an toàn 1-4 cấp."
      },
      {
        question: "Ai chịu trách nhiệm cuối cùng?",
        preview: "Công cụ thông tin, trách nhiệm người dùng",
        answer: "Nền tảng này là công cụ thông tin, trách nhiệm mua, sử dụng, đánh giá y tế, pháp lý do người dùng và chuyên gia y tế quyết định."
      }
    ]
  },
  ar: {
    title: "DietMed مساعد",
    status: "متصل",
    welcome: "مرحبا! 👋\nأنا مساعد DietMed Global.\nتحقق من الأسئلة الشائعة.",
    faqTitle: "الأسئلة الشائعة (FAQ)",
    backText: "العودة إلى القائمة",
    qa: [
      {
        question: "ما هي هذه المنصة؟",
        preview: "منصة التحقق من أدوية الحمية",
        answer: "منصة تحقق للبحث ومقارنة أدوية الحمية العالمية، والتحقق الفوري من حالة الموافقة والسلامة حسب البلد. بناءً على معلومات من FDA وMFDS وغيرها."
      },
      {
        question: "هل يمكن البحث بالصور عند عدم معرفة الاسم؟",
        preview: "تحميل الصورة لتحديد المنتج",
        answer: "نعم، عند تحميل أو التقاط صورة لحبة دواء، يحاول التعرف على الصورة تحديدها."
      },
      {
        question: "هل تظهر المكونات الخطرة؟",
        preview: "كشف المكونات المحظورة والتحذير",
        answer: "نعم. إذا تم اكتشاف مكونات محظورة مثل السيبوترامين والفينول فثالين وDNPH، يتم تصنيفها كمخاطر عالية مع رسائل تحذير."
      },
      {
        question: "ما هي معايير درجة الأمان؟",
        preview: "نقاط 0-100، 4 مستويات ألوان",
        answer: "درجات الأمان 0-100، معروضة في 4 مستويات ألوان:\n🟢90-100 آمن جدًا / 🟡70-89 آمن نسبيًا / 🟠50-69 تحذير / 🔴0-49 مخاطر عالية"
      },
      {
        question: "أي الأدوية تبحث جيدًا؟",
        preview: "الأدوية الرئيسية القائمة على GLP-1",
        answer: "الأدوية الرئيسية القائمة على GLP-1 مثل Wegovy وOzempic وSaxenda وSemaglutide وLiraglutide لها الأولوية في المطابقة."
      },
      {
        question: "هل يمكن رؤية الموافقة حسب البلد؟",
        preview: "حالة الموافقة في 50 دولة",
        answer: "يمكنك التحقق من حالة الموافقة في 50 دولة بما في ذلك FDA الأمريكية وMFDS الكورية والاتحاد الأوروبي والمملكة المتحدة."
      },
      {
        question: "هل يمكن مسح الباركود للتأكيد؟",
        preview: "إدخال الباركود/رمز NDC",
        answer: "نعم. أدخل الباركود أو رمز NDC للحصول على حالة الموافقة ومعلومات المكونات."
      },
      {
        question: "هل يمكن التحقق من أمان البائعين؟",
        preview: "أداة التحقق B2B",
        answer: "يمكنك التحقق من البائع من خلال أداة التحقق B2B وتصفية البائعين المعتمدين فقط حسب البلد."
      },
      {
        question: "هل يمكن لغير الطبيين شراء الأدوية؟",
        preview: "يختلف حسب البلد، غرض إعلامي",
        answer: "يختلف حسب اللوائح الخاصة بكل بلد. هذه المنصة للأغراض الإعلامية ولا تحل محل قرارات الشراء/الاستخدام. يُنصح بالتشاور مع أخصائي طبي."
      },
      {
        question: "هل يتم وضع علامة خطر فورًا للمكونات المحظورة؟",
        preview: "شارة خطر وشاشة تحذير فورية",
        answer: "نعم. عند اكتشاف مكونات محظورة، يتم عرض شارة 'خطر(🔴)' وشاشة تحذير فورًا."
      },
      {
        question: "هل تظهر الآثار الجانبية أو معلومات التحذير؟",
        preview: "معلومات تحذير الآثار الجانبية حسب المنتج",
        answer: "يمكن التحقق من تحذيرات الآثار الجانبية القلبية والعصبية والأيضية المسجلة لكل منتج."
      },
      {
        question: "هل هناك حدود لتحميل الصور؟",
        preview: "ملفات صور أقل من 10MB فقط",
        answer: "يُسمح فقط بملفات الصور أقل من 10MB، الملفات غير الصور يتم حجبها تلقائيًا."
      },
      {
        question: "هل تعمل ميزة OCR فعلاً؟",
        preview: "قاعدة مطابقة داخلية + Google Vision API",
        answer: "الوضع الأساسي يستخدم قاعدة المطابقة الداخلية، الوضع المتقدم يستخدم Google Vision API للتعرف على النص·الكود (يحتاج مفتاح)."
      },
      {
        question: "هل يمكن مقارنة منتجات متعددة في وقت واحد؟",
        preview: "مقارنة حتى 4 منتجات",
        answer: "يمكن مقارنة حتى 4 منتجات لدرجة الأمان/المكونات/البلدان الموافقة/شارات المخاطر."
      },
      {
        question: "هل هناك معلومات عن حقن الحمية (ساكسيندا، إلخ)؟",
        preview: "معلومات منتجات ليراجلوتايد",
        answer: "نعم. منتجات ليراجلوتايد تعرض معلومات حالة الموافقة/شروط التخزين (التبريد)."
      },
      {
        question: "هل تخبر عن شروط التوزيع المبردة؟",
        preview: "شارة تحذير شروط التوزيع",
        answer: "إذا كان للمنتج شروط تبريد·تخزين، يتم عرض شارة تحذير(🟠) وإرشادات التوزيع."
      },
      {
        question: "كيف يتم عرضه إذا تم البيع في بلدان غير معتمدة؟",
        preview: "زيادة المخاطر، شارة تحذير/مخاطر عالية",
        answer: "البيع في بلدان غير معتمدة يظهر زيادة في المخاطر مع شارات 'تحذير' أو 'مخاطر عالية'."
      },
      {
        question: "هل يمكن رؤية مراجعات أو تقييمات المستخدمين؟",
        preview: "تقييمات·مراجعات·درجات المنتج",
        answer: "نعم، يمكنك الرجوع إلى تقييمات المنتج ومراجعاته ودرجات التقييم لتقييم الموثوقية."
      },
      {
        question: "كم عدد اللغات المدعومة؟",
        preview: "9 لغات + RTL(العربية)",
        answer: "ندعم 9 لغات بما في ذلك RTL (العربية)."
      },
      {
        question: "هل تعمل الكاميرا على الهاتف المحمول؟",
        preview: "تشغيل الكاميرا فوري على الهاتف المحمول",
        answer: "نعم. على الهاتف المحمول، يؤدي تحديد 'الكاميرا' إلى تشغيل الكاميرا على الفور."
      },
      {
        question: "هل يتم حفظ سجل البحث؟",
        preview: "آخر 10 عمليات بحث محفوظة مؤقتًا",
        answer: "افتراضيًا، يتم حفظ آخر 10 عمليات بحث فقط مؤقتًا، مع تسجيل الدخول يمكن حفظ السجل."
      },
      {
        question: "هل تقدم هذه الخدمة توصيات للأدوية؟",
        preview: "غرض إعلامي، ليس توصية",
        answer: "لا. هذه ليست توصية أدوية أو وصفة طبية أو نصيحة شراء، بل خدمة للتحقق من الأمان والمعلومات."
      },
      {
        question: "هل يتم اكتشاف الأدوية المزيفة؟",
        preview: "تحذير احتمالية التزوير",
        answer: "ضمن النطاق الممكن، مقارنة الباركود·الصورة·المكونات·البلد الموافق للتحذير من احتمالية التزوير، لكن لا يحل محل نتائج الفحص القانوني."
      },
      {
        question: "هل يمكن لكبار السن·المبتدئين استخدامه؟",
        preview: "تصميم بديهي",
        answer: "مصمم للتحقق البديهي مع بحث بسيط، التعرف على الباركود، ألوان أمان من 1-4 مراحل."
      },
      {
        question: "من يتحمل المسؤولية النهائية؟",
        preview: "أداة معلومات، مسؤولية المستخدم",
        answer: "هذه المنصة أداة معلومات، الشراء والاستهلاك والحكم الطبي والمسؤولية القانونية يتم تحديدها من قبل المستخدمين والمهنيين الطبيين."
      }
    ]
  }
};

window.chatbotData = chatbotData;
