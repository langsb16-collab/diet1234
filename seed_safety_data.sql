-- ============================================================================
-- SAFETY PROFILES (안전성 프로필)
-- ============================================================================

-- Semaglutide (Wegovy) 안전성 프로필
INSERT OR IGNORE INTO safety_profiles VALUES
  ('SAFE001', 'ING001',
   '체중의 10-15%', '체중의 12-18%',
   'GLP-1 수용체 작용제로 인슐린 분비 증가, 식욕 억제, 위 배출 지연을 통해 체중 감량',
   2,
   '["메스꺼움 (44%)","설사 (30%)","구토 (24%)","변비 (24%)","복부 불편감 (20%)"]',
   '["췌장염 (<0.1%)","담낭질환 (1.5%)","저혈당 (당뇨병 약물 병용시)","급성 신손상","알레르기 반응"]',
   '["MEN2 또는 갑상선 수질암 가족력","중증 위장관 질환","임신 및 수유","18세 미만 (제품별 다름)"]',
   '["인슐린/설포닐우레아 (저혈당 위험)","경구 피임약 (흡수 지연)","와파린 (INR 변화)"]',
   0, 'X', '권장하지 않음',
   'low', '["식욕 증가","피로감","두통"]', 'low',
   'A', datetime('now'), 'FDA EPAR');

-- Liraglutide (Saxenda) 안전성 프로필
INSERT OR IGNORE INTO safety_profiles VALUES
  ('SAFE002', 'ING002',
   '체중의 5-10%', '체중의 8-12%',
   'GLP-1 수용체 작용제로 식욕 억제 및 포만감 증가',
   4,
   '["메스꺼움 (39%)","설사 (21%)","변비 (19%)","구토 (16%)","두통 (14%)"]',
   '["췌장염","담낭질환","저혈당","갑상선 C세포 종양 (동물실험)","급성 신손상"]',
   '["MEN2 또는 갑상선 수질암 가족력","중증 위장관 질환","임신 및 수유","18세 미만"]',
   '["인슐린/설포닐우레아","경구 피임약","와파린"]',
   1, 'X', '권장하지 않음',
   'low', '["식욕 증가","피로감"]', 'low',
   'A', datetime('now'), 'FDA EPAR');

-- Orlistat (Xenical) 안전성 프로필
INSERT OR IGNORE INTO safety_profiles VALUES
  ('SAFE003', 'ING003',
   '체중의 5-7%', '체중의 8-10%',
   '위장관 지방분해효소 억제로 지방 흡수 차단 (약 30%)',
   2,
   '["지방변 (20-30%)","복부 팽만감","방귀 증가","대변 실금","지용성 비타민 결핍"]',
   '["중증 간손상 (드물게)","옥살산염 신결석","지용성 비타민 결핍 (A,D,E,K)"]',
   '["만성 흡수불량증후군","담즙정체","임신","12세 미만"]',
   '["와파린 (INR 변화)","항경련제 (흡수 감소)","갑상선호르몬제","사이클로스포린"]',
   0, 'B', '주의 필요',
   'low', '[]', 'low',
   'A', datetime('now'), 'FDA');

-- Sibutramine (금지 성분) 안전성 프로필
INSERT OR IGNORE INTO safety_profiles VALUES
  ('SAFE007', 'ING007',
   '체중의 5-8% (퇴출 전 데이터)', 'N/A',
   'SNRI 작용으로 식욕 억제 - 심혈관 위험으로 전 세계 퇴출',
   2,
   '["두통","구강 건조","변비","불면증","심박수 증가","혈압 상승"]',
   '["심근경색","뇌졸중","부정맥","고혈압","정신과적 증상","사망"]',
   '["심혈관 질환","고혈압","뇌졸중 병력","정신과 질환","임신","수유","18세 미만","65세 이상"]',
   '["MAOI","SSRI","트립탄계","에르고타민","와파린"]',
   1, 'X', '금기',
   'high', '["우울","불안","두통","피로"]', 'moderate',
   'WITHDRAWN', datetime('now'), 'FDA 2010 Withdrawal');

-- ============================================================================
-- SAFETY SCORES (안전 점수)
-- ============================================================================

-- Wegovy (Semaglutide) - 미국/한국/유럽 점수
INSERT OR IGNORE INTO safety_scores VALUES
  ('SCO001', 'PROD001', 'ING001', 'US',
   35, 25, 22, 15, 97, 'green',
   datetime('now'), '1.0');

INSERT OR IGNORE INTO safety_scores VALUES
  ('SCO002', 'PROD001', 'ING001', 'KR',
   32, 25, 22, 15, 94, 'green',
   datetime('now'), '1.0');

INSERT OR IGNORE INTO safety_scores VALUES
  ('SCO003', 'PROD001', 'ING001', 'EU',
   35, 25, 22, 15, 97, 'green',
   datetime('now'), '1.0');

-- Saxenda (Liraglutide) 점수
INSERT OR IGNORE INTO safety_scores VALUES
  ('SCO004', 'PROD002', 'ING002', 'US',
   35, 23, 22, 15, 95, 'green',
   datetime('now'), '1.0');

INSERT OR IGNORE INTO safety_scores VALUES
  ('SCO005', 'PROD002', 'ING002', 'KR',
   32, 23, 22, 15, 92, 'green',
   datetime('now'), '1.0');

-- Xenical (Orlistat) 점수
INSERT OR IGNORE INTO safety_scores VALUES
  ('SCO006', 'PROD003', 'ING003', 'US',
   35, 18, 20, 15, 88, 'light_green',
   datetime('now'), '1.0');

-- ============================================================================
-- FAQs (자주 묻는 질문)
-- ============================================================================

-- 일반 FAQ
INSERT OR IGNORE INTO faqs VALUES
  ('FAQ001', NULL, 'general',
   'Q1. 다이어트약을 얼마나 먹어야 효과가 나오나요?',
   '대부분의 처방 다이어트약은 2-4주 후부터 체중 변화를 체감할 수 있으며, 최대 효과는 3-6개월 후에 나타납니다. 단, 개인차가 있으며 식단 및 운동 병행이 필수입니다.',
   1, 1, datetime('now'));

INSERT OR IGNORE INTO faqs VALUES
  ('FAQ002', NULL, 'general',
   'Q2. 약을 끊으면 바로 살이 찌나요?',
   '식습관과 운동을 유지하면 체중 유지가 가능하지만, 무조절 시 요요 현상이 발생할 수 있습니다. 약물은 체중 관리의 "보조 도구"이며, 생활습관 개선이 핵심입니다.',
   2, 1, datetime('now'));

INSERT OR IGNORE INTO faqs VALUES
  ('FAQ003', NULL, 'general',
   'Q3. 운동과 식단 조절을 꼭 해야 하나요?',
   '네. 약물 단독 효과보다 약물 + 식단 + 운동 병행 시 체중 감량 효과가 2-3배 높으며, 부작용도 감소하는 경향이 있습니다.',
   3, 1, datetime('now'));

INSERT OR IGNORE INTO faqs VALUES
  ('FAQ004', NULL, 'general',
   'Q4. 누구에게 위험한가요?',
   '임산부, 수유부, 심장질환 병력자, 정신과 질환자, 갑상선 질환자, 18세 미만 청소년에게는 위험할 수 있습니다. 반드시 의사와 상담 후 복용하세요.',
   4, 1, datetime('now'));

INSERT OR IGNORE INTO faqs VALUES
  ('FAQ005', NULL, 'general',
   'Q5. 해외 직구 다이어트약은 안전한가요?',
   '절대 안전하지 않습니다. 해외 직구 제품은 금지 성분(시부트라민, 페놀프탈레인 등)이 혼입되어 있을 수 있으며, 심장마비·뇌졸중 등 심각한 부작용이 보고되고 있습니다. 반드시 국내 허가된 제품만 구매하세요.',
   5, 1, datetime('now'));

-- Semaglutide 관련 FAQ
INSERT OR IGNORE INTO faqs VALUES
  ('FAQ006', 'ING001', 'efficacy',
   'Wegovy/Ozempic는 얼마나 효과가 있나요?',
   '임상시험 결과 12개월 복용 시 평균 체중의 12-18% 감량 효과가 있습니다. 단, 식단 조절과 운동을 병행해야 하며, 개인차가 있습니다.',
   1, 1, datetime('now'));

INSERT OR IGNORE INTO faqs VALUES
  ('FAQ007', 'ING001', 'safety',
   'GLP-1 약물의 주요 부작용은 무엇인가요?',
   '가장 흔한 부작용은 메스꺼움(44%), 설사(30%), 구토(24%)입니다. 대부분 초기 1-4주에 집중되며, 용량 적응 후 완화됩니다. 드물게 췌장염, 담낭질환이 발생할 수 있으므로 복통이 심하면 즉시 병원을 방문하세요.',
   2, 1, datetime('now'));

INSERT OR IGNORE INTO faqs VALUES
  ('FAQ008', 'ING001', 'usage',
   'Wegovy는 평생 맞아야 하나요?',
   '장기 체중 관리를 위해 지속적인 사용이 권장됩니다. 중단 시 체중이 다시 증가할 수 있으므로, 의사와 상담하여 유지 계획을 수립하세요.',
   3, 1, datetime('now'));

-- 블랙리스트 FAQ
INSERT OR IGNORE INTO faqs VALUES
  ('FAQ009', 'ING007', 'blacklist',
   '시부트라민이 왜 금지되었나요?',
   '2010년 FDA는 시부트라민이 심근경색, 뇌졸중 위험을 증가시킨다는 대규모 임상시험(SCOUT) 결과를 바탕으로 시장 퇴출을 결정했습니다. 전 세계 대부분의 국가에서 판매가 금지되었습니다.',
   1, 1, datetime('now'));

INSERT OR IGNORE INTO faqs VALUES
  ('FAQ010', NULL, 'blacklist',
   '불법 다이어트약에는 어떤 성분이 들어있나요?',
   '시부트라민, 페놀프탈레인, DNP, 클렌부테롤, 갑상선호르몬(T3/T4), 에페드린 등이 대표적입니다. 이러한 성분은 심각한 건강 위험을 초래할 수 있으므로 절대 복용하지 마세요.',
   2, 1, datetime('now'));
