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
  ('SAFE008', 'ING005',
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
