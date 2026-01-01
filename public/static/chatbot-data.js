// 다국어 Q&A 데이터
const chatbotData = {
  ko: {
    title: "DietMed 케어봇",
    status: "온라인",
    placeholder: "메시지를 입력하세요...",
    welcome: "안녕하세요! 👋\nDietMed Global 케어봇입니다.\n무엇을 도와드릴까요?",
    defaultResponse: "죄송합니다. 잘 이해하지 못했습니다. 다른 질문을 해주세요.",
    quickReplies: ["서비스 안내", "검색 방법", "안전등급", "언어 지원"],
    qa: [
      {
        keywords: ["서비스", "플랫폼", "무엇", "뭐"],
        answer: "전 세계 다이어트 의약품을 검색·비교하고, 국가별 허가 상태와 안전성을 즉시 확인하는 검증 플랫폼입니다. FDA·MFDS 등 규제기관 정보를 기반으로 안내합니다."
      },
      {
        keywords: ["사진", "이미지", "촬영", "카메라"],
        answer: "가능합니다. 알약 사진 업로드 또는 촬영 시 이미지 인식으로 제품 식별을 시도합니다."
      },
      {
        keywords: ["위험", "성분", "금지", "시부트라민"],
        answer: "네. 시부트라민, 페놀프탈레인, DNPH 등 금지 성분이 감지되면 고위험 레벨로 분류하고 경고 문구가 표시됩니다."
      },
      {
        keywords: ["안전등급", "등급", "점수", "색상"],
        answer: "안전 점수 0~100점, 4단계 색상으로 표시합니다.\n🟢90~100 매우 안전 / 🟡70~89 비교적 안전 / 🟠50~69 주의 / 🔴0~49 고위험"
      },
      {
        keywords: ["검색", "약", "제품", "찾기"],
        answer: "Wegovy, Ozempic, Saxenda, Semaglutide, Liraglutide 등 주요 GLP-1 기반 의약품 매칭이 우선 동작합니다."
      },
      {
        keywords: ["국가", "허가", "승인", "FDA", "MFDS"],
        answer: "네. 미국 FDA, 한국 MFDS, EU, 영국 등 50개 국가별 승인 여부를 조회할 수 있습니다."
      },
      {
        keywords: ["바코드", "스캔", "NDC", "코드"],
        answer: "됩니다. 바코드나 NDC 코드 입력 시 해당 제품의 허가 상태와 성분 정보가 조회됩니다."
      },
      {
        keywords: ["판매처", "구매", "안전", "인증"],
        answer: "플랫폼 내 B2B 인증 위젯으로 판매처 검증 가능 여부를 확인할 수 있으며, 승인된 국가 판매처만 필터링 가능합니다."
      },
      {
        keywords: ["언어", "다국어", "지원"],
        answer: "총 9개 언어를 지원하며 RTL(아랍어)도 제공됩니다."
      },
      {
        keywords: ["모바일", "휴대폰", "스마트폰"],
        answer: "네. 모바일에서 '카메라 촬영'을 선택하면 즉시 카메라가 실행됩니다."
      }
    ]
  },
  en: {
    title: "DietMed CareBot",
    status: "Online",
    placeholder: "Type a message...",
    welcome: "Hello! 👋\nI'm DietMed Global CareBot.\nHow can I help you?",
    defaultResponse: "Sorry, I didn't understand. Please ask another question.",
    quickReplies: ["Service Info", "Search Method", "Safety Grade", "Language"],
    qa: [
      {
        keywords: ["service", "platform", "what", "about"],
        answer: "A verification platform to search and compare global diet medications, instantly check approval status and safety by country. Based on regulatory information from FDA, MFDS, etc."
      },
      {
        keywords: ["photo", "image", "camera", "picture"],
        answer: "Yes. When you upload or take a photo of a pill, image recognition attempts to identify the product."
      },
      {
        keywords: ["dangerous", "banned", "ingredient", "sibutramine"],
        answer: "Yes. If banned ingredients like sibutramine, phenolphthalein, DNPH are detected, they are classified as high risk with warning messages."
      },
      {
        keywords: ["safety", "grade", "score", "rating"],
        answer: "Safety scores 0-100, displayed in 4 color levels:\n🟢90-100 Very Safe / 🟡70-89 Relatively Safe / 🟠50-69 Caution / 🔴0-49 High Risk"
      },
      {
        keywords: ["search", "medicine", "product", "find"],
        answer: "Major GLP-1 based medications such as Wegovy, Ozempic, Saxenda, Semaglutide, Liraglutide are prioritized for matching."
      },
      {
        keywords: ["country", "approval", "authorized", "FDA", "MFDS"],
        answer: "Yes. You can check approval status in 50 countries including US FDA, Korea MFDS, EU, UK."
      },
      {
        keywords: ["barcode", "scan", "NDC", "code"],
        answer: "Yes. Enter barcode or NDC code to retrieve approval status and ingredient information."
      },
      {
        keywords: ["seller", "purchase", "safe", "verified"],
        answer: "You can verify seller authentication through the B2B verification widget and filter only approved country sellers."
      },
      {
        keywords: ["language", "multilingual", "support"],
        answer: "We support 9 languages including RTL (Arabic)."
      },
      {
        keywords: ["mobile", "phone", "smartphone"],
        answer: "Yes. On mobile, selecting 'Camera' immediately launches the camera."
      }
    ]
  },
  zh: {
    title: "DietMed 智能助手",
    status: "在线",
    placeholder: "输入消息...",
    welcome: "您好！👋\n我是DietMed Global智能助手。\n有什么可以帮您？",
    defaultResponse: "抱歉，我没理解。请问其他问题。",
    quickReplies: ["服务介绍", "搜索方法", "安全等级", "语言支持"],
    qa: [
      {
        keywords: ["服务", "平台", "什么", "介绍"],
        answer: "搜索和比较全球减肥药品，即时确认各国批准状态和安全性的验证平台。基于FDA、MFDS等监管机构信息。"
      },
      {
        keywords: ["照片", "图片", "拍照", "相机"],
        answer: "可以。上传或拍摄药片照片时，图像识别会尝试识别产品。"
      },
      {
        keywords: ["危险", "成分", "禁止", "西布曲明"],
        answer: "是的。如果检测到西布曲明、酚酞、DNPH等禁用成分，将分类为高风险并显示警告信息。"
      },
      {
        keywords: ["安全等级", "等级", "分数", "评分"],
        answer: "安全分数0-100分，4级颜色显示：\n🟢90-100 非常安全 / 🟡70-89 相对安全 / 🟠50-69 注意 / 🔴0-49 高风险"
      },
      {
        keywords: ["搜索", "药品", "产品", "查找"],
        answer: "Wegovy、Ozempic、Saxenda、Semaglutide、Liraglutide等主要GLP-1类药物优先匹配。"
      },
      {
        keywords: ["国家", "批准", "授权", "FDA", "MFDS"],
        answer: "是的。可以查询美国FDA、韩国MFDS、欧盟、英国等50个国家的批准状态。"
      },
      {
        keywords: ["条形码", "扫描", "NDC", "代码"],
        answer: "可以。输入条形码或NDC代码即可查询批准状态和成分信息。"
      },
      {
        keywords: ["销售商", "购买", "安全", "认证"],
        answer: "可以通过B2B认证小部件验证销售商，仅筛选获批准的国家销售商。"
      },
      {
        keywords: ["语言", "多语言", "支持"],
        answer: "支持9种语言，包括RTL（阿拉伯语）。"
      },
      {
        keywords: ["手机", "移动", "智能手机"],
        answer: "是的。在移动设备上选择"相机"会立即启动相机。"
      }
    ]
  },
  ja: {
    title: "DietMed ケアボット",
    status: "オンライン",
    placeholder: "メッセージを入力...",
    welcome: "こんにちは！👋\nDietMed Globalケアボットです。\nどのようなご用件でしょうか？",
    defaultResponse: "申し訳ございません。理解できませんでした。別の質問をお願いします。",
    quickReplies: ["サービス案内", "検索方法", "安全等級", "言語対応"],
    qa: [
      {
        keywords: ["サービス", "プラットフォーム", "何", "について"],
        answer: "世界中のダイエット医薬品を検索・比較し、国別の承認状況と安全性を即座に確認できる検証プラットフォームです。FDA・MFDSなどの規制機関情報に基づいています。"
      },
      {
        keywords: ["写真", "画像", "撮影", "カメラ"],
        answer: "可能です。錠剤の写真をアップロードまたは撮影すると、画像認識で製品を識別します。"
      },
      {
        keywords: ["危険", "成分", "禁止", "シブトラミン"],
        answer: "はい。シブトラミン、フェノールフタレイン、DNPHなどの禁止成分が検出されると、高リスクレベルに分類され警告が表示されます。"
      },
      {
        keywords: ["安全等級", "等級", "点数", "評価"],
        answer: "安全スコア0-100点、4段階の色で表示されます。\n🟢90-100 非常に安全 / 🟡70-89 比較的安全 / 🟠50-69 注意 / 🔴0-49 高リスク"
      },
      {
        keywords: ["検索", "薬", "製品", "探す"],
        answer: "Wegovy、Ozempic、Saxenda、Semaglutide、Liraglutideなど主要なGLP-1ベースの医薬品が優先的にマッチングされます。"
      },
      {
        keywords: ["国", "承認", "認可", "FDA", "MFDS"],
        answer: "はい。米国FDA、韓国MFDS、EU、英国など50カ国の承認状況を確認できます。"
      },
      {
        keywords: ["バーコード", "スキャン", "NDC", "コード"],
        answer: "可能です。バーコードまたはNDCコードを入力すると、承認状況と成分情報が表示されます。"
      },
      {
        keywords: ["販売店", "購入", "安全", "認証"],
        answer: "B2B認証ウィジェットで販売店の検証が可能で、承認された国の販売店のみフィルタリングできます。"
      },
      {
        keywords: ["言語", "多言語", "対応"],
        answer: "RTL（アラビア語）を含む9言語に対応しています。"
      },
      {
        keywords: ["モバイル", "携帯", "スマートフォン"],
        answer: "はい。モバイルで「カメラ」を選択すると、すぐにカメラが起動します。"
      }
    ]
  },
  vi: {
    title: "DietMed CareBot",
    status: "Trực tuyến",
    placeholder: "Nhập tin nhắn...",
    welcome: "Xin chào! 👋\nTôi là DietMed Global CareBot.\nTôi có thể giúp gì cho bạn?",
    defaultResponse: "Xin lỗi, tôi không hiểu. Vui lòng hỏi câu hỏi khác.",
    quickReplies: ["Giới thiệu", "Tìm kiếm", "An toàn", "Ngôn ngữ"],
    qa: [
      {
        keywords: ["dịch vụ", "nền tảng", "gì", "về"],
        answer: "Nền tảng xác minh để tìm kiếm và so sánh thuốc giảm cân toàn cầu, kiểm tra ngay tình trạng phê duyệt và an toàn theo quốc gia. Dựa trên thông tin từ FDA, MFDS, v.v."
      },
      {
        keywords: ["ảnh", "hình", "chụp", "máy ảnh"],
        answer: "Có thể. Khi bạn tải lên hoặc chụp ảnh viên thuốc, nhận dạng hình ảnh sẽ cố gắng xác định sản phẩm."
      },
      {
        keywords: ["nguy hiểm", "thành phần", "cấm", "sibutramine"],
        answer: "Có. Nếu phát hiện thành phần cấm như sibutramine, phenolphthalein, DNPH, sẽ được phân loại là rủi ro cao với thông báo cảnh báo."
      },
      {
        keywords: ["an toàn", "cấp độ", "điểm", "đánh giá"],
        answer: "Điểm an toàn 0-100, hiển thị 4 mức màu:\n🟢90-100 Rất an toàn / 🟡70-89 Tương đối an toàn / 🟠50-69 Cẩn thận / 🔴0-49 Rủi ro cao"
      },
      {
        keywords: ["tìm kiếm", "thuốc", "sản phẩm", "tìm"],
        answer: "Các thuốc dựa trên GLP-1 chính như Wegovy, Ozempic, Saxenda, Semaglutide, Liraglutide được ưu tiên khớp."
      },
      {
        keywords: ["quốc gia", "phê duyệt", "chấp thuận", "FDA", "MFDS"],
        answer: "Có. Bạn có thể kiểm tra tình trạng phê duyệt ở 50 quốc gia bao gồm FDA Mỹ, MFDS Hàn Quốc, EU, Anh."
      },
      {
        keywords: ["mã vạch", "quét", "NDC", "mã"],
        answer: "Có. Nhập mã vạch hoặc mã NDC để lấy thông tin phê duyệt và thành phần."
      },
      {
        keywords: ["người bán", "mua", "an toàn", "xác minh"],
        answer: "Bạn có thể xác minh người bán qua widget xác thực B2B và chỉ lọc người bán được phê duyệt theo quốc gia."
      },
      {
        keywords: ["ngôn ngữ", "đa ngôn ngữ", "hỗ trợ"],
        answer: "Chúng tôi hỗ trợ 9 ngôn ngữ bao gồm RTL (tiếng Ả Rập)."
      },
      {
        keywords: ["di động", "điện thoại", "smartphone"],
        answer: "Có. Trên di động, chọn 'Máy ảnh' sẽ khởi động máy ảnh ngay lập tức."
      }
    ]
  },
  ar: {
    title: "DietMed مساعد",
    status: "متصل",
    placeholder: "اكتب رسالة...",
    welcome: "مرحبا! 👋\nأنا مساعد DietMed Global.\nكيف يمكنني مساعدتك؟",
    defaultResponse: "آسف، لم أفهم. يرجى طرح سؤال آخر.",
    quickReplies: ["معلومات الخدمة", "طريقة البحث", "درجة الأمان", "اللغة"],
    qa: [
      {
        keywords: ["خدمة", "منصة", "ماذا", "عن"],
        answer: "منصة تحقق للبحث ومقارنة أدوية الحمية العالمية، والتحقق الفوري من حالة الموافقة والسلامة حسب البلد. بناءً على معلومات من FDA وMFDS وغيرها."
      },
      {
        keywords: ["صورة", "صورة فوتوغرافية", "كاميرا", "تصوير"],
        answer: "نعم. عند تحميل أو التقاط صورة لحبة دواء، يحاول التعرف على الصورة تحديد المنتج."
      },
      {
        keywords: ["خطير", "محظور", "مكون", "سيبوترامين"],
        answer: "نعم. إذا تم اكتشاف مكونات محظورة مثل السيبوترامين والفينول فثالين وDNPH، يتم تصنيفها كمخاطر عالية مع رسائل تحذير."
      },
      {
        keywords: ["أمان", "درجة", "نقاط", "تقييم"],
        answer: "درجات الأمان 0-100، معروضة في 4 مستويات ألوان:\n🟢90-100 آمن جدًا / 🟡70-89 آمن نسبيًا / 🟠50-69 تحذير / 🔴0-49 مخاطر عالية"
      },
      {
        keywords: ["بحث", "دواء", "منتج", "ابحث"],
        answer: "الأدوية الرئيسية القائمة على GLP-1 مثل Wegovy وOzempic وSaxenda وSemaglutide وLiraglutide لها الأولوية في المطابقة."
      },
      {
        keywords: ["دولة", "موافقة", "معتمد", "FDA", "MFDS"],
        answer: "نعم. يمكنك التحقق من حالة الموافقة في 50 دولة بما في ذلك FDA الأمريكية وMFDS الكورية والاتحاد الأوروبي والمملكة المتحدة."
      },
      {
        keywords: ["باركود", "مسح", "NDC", "رمز"],
        answer: "نعم. أدخل الباركود أو رمز NDC للحصول على حالة الموافقة ومعلومات المكونات."
      },
      {
        keywords: ["بائع", "شراء", "آمن", "موثق"],
        answer: "يمكنك التحقق من البائع من خلال أداة التحقق B2B وتصفية البائعين المعتمدين فقط حسب البلد."
      },
      {
        keywords: ["لغة", "متعدد اللغات", "دعم"],
        answer: "ندعم 9 لغات بما في ذلك RTL (العربية)."
      },
      {
        keywords: ["محمول", "هاتف", "ذكي"],
        answer: "نعم. على الهاتف المحمول، يؤدي تحديد 'الكاميرا' إلى تشغيل الكاميرا على الفور."
      }
    ]
  }
};

window.chatbotData = chatbotData;
