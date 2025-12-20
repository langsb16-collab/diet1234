-- ============================================================================
-- COUNTRIES DATA (국가 정보)
-- ============================================================================

INSERT OR IGNORE INTO countries VALUES
  ('C_US', 'US', 'USA', '미국', 'United States', 'NA', datetime('now')),
  ('C_KR', 'KR', 'KOR', '대한민국', 'Korea, Republic of', 'APAC', datetime('now')),
  ('C_EU', 'EU', 'EUR', '유럽연합', 'European Union', 'EU', datetime('now')),
  ('C_JP', 'JP', 'JPN', '일본', 'Japan', 'APAC', datetime('now')),
  ('C_CN', 'CN', 'CHN', '중국', 'China', 'APAC', datetime('now')),
  ('C_AU', 'AU', 'AUS', '호주', 'Australia', 'APAC', datetime('now')),
  ('C_GB', 'GB', 'GBR', '영국', 'United Kingdom', 'EU', datetime('now')),
  ('C_CA', 'CA', 'CAN', '캐나다', 'Canada', 'NA', datetime('now')),
  ('C_BR', 'BR', 'BRA', '브라질', 'Brazil', 'LATAM', datetime('now'));

-- ============================================================================
-- COMPARISON CRITERIA (비교 항목 템플릿)
-- ============================================================================

INSERT OR IGNORE INTO comparison_criteria VALUES
  -- 기본 정보
  ('CRT001', 'basic', '제품명', 'Product Name', 1, 1),
  ('CRT002', 'basic', '성분명', 'Generic Name', 2, 1),
  ('CRT003', 'basic', '제조사', 'Manufacturer', 3, 1),
  ('CRT004', 'basic', '제형', 'Dosage Form', 4, 1),
  ('CRT005', 'basic', '투여 경로', 'Route', 5, 1),
  
  -- 허가 정보
  ('CRT006', 'approval', '허가 국가 수', 'Approved Countries', 11, 1),
  ('CRT007', 'approval', '허가 번호', 'Approval Number', 12, 1),
  ('CRT008', 'approval', '허가 일자', 'Approval Date', 13, 1),
  ('CRT009', 'approval', '처방 구분', 'Prescription Status', 14, 1),
  ('CRT010', 'approval', 'BMI 기준', 'BMI Criteria', 15, 1),
  ('CRT011', 'approval', '연령 제한', 'Age Restrictions', 16, 1),
  
  -- 효능
  ('CRT012', 'efficacy', '작용 기전', 'Mechanism', 21, 1),
  ('CRT013', 'efficacy', '6개월 감량률', '6-Month Weight Loss', 22, 1),
  ('CRT014', 'efficacy', '12개월 감량률', '12-Month Weight Loss', 23, 1),
  ('CRT015', 'efficacy', '효과 발현 시기', 'Onset', 24, 1),
  ('CRT016', 'efficacy', '임상 근거 수준', 'Evidence Level', 25, 1),
  
  -- 안전성
  ('CRT017', 'safety', '흔한 부작용', 'Common Side Effects', 31, 1),
  ('CRT018', 'safety', '심각한 부작용', 'Serious Side Effects', 32, 1),
  ('CRT019', 'safety', '금기사항', 'Contraindications', 33, 1),
  ('CRT020', 'safety', '약물 상호작용', 'Drug Interactions', 34, 1),
  ('CRT021', 'safety', '임신/수유', 'Pregnancy/Breastfeeding', 35, 1),
  ('CRT022', 'safety', '중독 위험도', 'Addiction Risk', 36, 1),
  
  -- 안전 점수
  ('CRT023', 'score', '총점', 'Total Score', 41, 1),
  ('CRT024', 'score', '허가/정품성 점수', 'Regulatory Score', 42, 1),
  ('CRT025', 'score', '근거/효과 점수', 'Efficacy Score', 43, 1),
  ('CRT026', 'score', '안전성 점수', 'Safety Score', 44, 1),
  ('CRT027', 'score', '유통 점수', 'Distribution Score', 45, 1),
  ('CRT028', 'score', '안전 등급', 'Safety Grade', 46, 1);

-- ============================================================================
-- ADDITIONAL PRODUCTS FOR COMPARISON (추가 제품)
-- ============================================================================

-- Contrave/Mysimba (Naltrexone/Bupropion) - ING005 already exists, just add product
INSERT OR IGNORE INTO products VALUES
  ('PROD008', 'ING005', 'Contrave', 'Extended-release tablet', 'Naltrexone 8mg/Bupropion 90mg',
   'oral', NULL, 'Nalpropion Pharmaceuticals', 'US',
   '[]', NULL, NULL, 'Extended-release tablet', NULL, NULL, 0, '[]',
   datetime('now'), datetime('now'));

-- Qsymia (Phentermine/Topiramate) - new ingredient
INSERT OR IGNORE INTO ingredients VALUES
  ('ING009', 'Phentermine/Topiramate', 'N06BA12', NULL,
   '{"ko":["펜터민/토피라메이트","큐시미아"],"en":["Phentermine/Topiramate","Qsymia"],"zh":["芬特明/托吡酯"],"ja":["フェンテルミン/トピラマート"]}',
   'Sympathomimetic amine + anticonvulsant combination',
   'Combination', 'Chronic weight management',
   datetime('now'), datetime('now'), 'FDA');

INSERT OR IGNORE INTO products VALUES
  ('PROD009', 'ING009', 'Qsymia', 'Extended-release capsule', 'Various strengths',
   'oral', NULL, 'VIVUS Inc', 'US',
   '[]', NULL, NULL, 'Extended-release capsule', NULL, NULL, 0, '[]',
   datetime('now'), datetime('now'));

-- Safety profiles for new products
INSERT OR IGNORE INTO safety_profiles VALUES
  ('SAFE008', 'ING008',
   '체중의 5-9%', '체중의 8-12%',
   '오피오이드 길항제 + 항우울제 복합작용으로 식욕 조절 및 보상회로 억제',
   4,
   '["오심 (32%)","변비 (19%)","두통 (18%)","구토 (10%)","어지러움 (10%)"]',
   '["자살충동/우울 증상 악화","발작","혈압 상승","간독성 (드물게)"]',
   '["조절되지 않는 고혈압","발작 병력","신경성 식욕부진/폭식증","아편유사제 의존","MAOI 병용","임신/수유"]',
   '["MAOI (금기)","아편유사제 (효과 감소)","리네졸리드","메틸렌 블루"]',
   1, 'X', '금기',
   'low', '["식욕 증가","기분 변화","피로"]', 'low',
   'A', datetime('now'), 'FDA Label');

INSERT OR IGNORE INTO safety_profiles VALUES
  ('SAFE009', 'ING009',
   '체중의 7-10%', '체중의 10-14%',
   '교감신경 자극 + 항경련제 복합작용으로 식욕 억제 및 포만감 증가',
   2,
   '["구강 건조 (21%)","변비 (17%)","미각 이상 (13%)","불면 (11%)","어지러움 (10%)"]',
   '["심혈관 사건 (심박수/혈압 증가)","녹내장","대사성 산증","인지장애","기형 위험 (임신 중)"]',
   '["녹내장","갑상선 기능항진증","MAOI 병용 중/최근 14일 이내","임신 (기형 위험)","수유"]',
   '["MAOI (금기)","경구 피임약 (효과 감소 가능)","알코올"]',
   1, 'X', '금기',
   'moderate', '["피로","식욕 증가","기분 변화"]', 'moderate',
   'A', datetime('now'), 'FDA Label');

-- Safety scores for new products
INSERT OR IGNORE INTO safety_scores VALUES
  ('SCO008', 'PROD008', 'ING005', 'US',
   33, 21, 18, 13, 85, 'light_green',
   datetime('now'), '1.0');

INSERT OR IGNORE INTO safety_scores VALUES
  ('SCO009', 'PROD009', 'ING009', 'US',
   32, 22, 17, 12, 83, 'light_green',
   datetime('now'), '1.0');
