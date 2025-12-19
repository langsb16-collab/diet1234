-- ============================================================================
-- GLOBAL REGULATORY BODIES (전 세계 규제기관)
-- ============================================================================

INSERT OR IGNORE INTO regulatory_bodies VALUES
  -- 북미
  ('REG_US_FDA', 'FDA', 'Food and Drug Administration', 'US', 'https://www.fda.gov', 1),
  ('REG_CA_HC', 'Health Canada', 'Health Products and Food Branch', 'CA', 'https://www.canada.ca/en/health-canada.html', 1),
  
  -- 유럽 / EU
  ('REG_EU_EMA', 'EMA', 'European Medicines Agency', 'EU', 'https://www.ema.europa.eu', 1),
  ('REG_UK_MHRA', 'MHRA', 'Medicines and Healthcare products Regulatory Agency', 'UK', 'https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency', 1),
  ('REG_DE_BfArM', 'BfArM', 'Federal Institute for Drugs and Medical Devices', 'DE', 'https://www.bfarm.de', 1),
  ('REG_FR_ANSM', 'ANSM', 'National Agency for the Safety of Medicines and Health Products', 'FR', 'https://ansm.sante.fr', 1),
  ('REG_ES_AEMPS', 'AEMPS', 'Spanish Agency of Medicines and Medical Devices', 'ES', 'https://www.aemps.gob.es', 1),
  
  -- 아시아
  ('REG_CN_NMPA', 'NMPA', 'National Medical Products Administration', 'CN', 'https://www.nmpa.gov.cn', 1),
  ('REG_KR_MFDS', 'MFDS', 'Ministry of Food and Drug Safety', 'KR', 'https://www.mfds.go.kr', 1),
  ('REG_JP_PMDA', 'PMDA', 'Pharmaceuticals and Medical Devices Agency', 'JP', 'https://www.pmda.go.jp', 1),
  ('REG_IN_CDSCO', 'CDSCO', 'Central Drugs Standard Control Organisation', 'IN', 'https://cdsco.gov.in', 1),
  ('REG_TH_FDA', 'Thai FDA', 'Food and Drug Administration of Thailand', 'TH', 'http://www.fda.moph.go.th', 1),
  ('REG_TW_TFDA', 'TFDA', 'Taiwan Food and Drug Administration', 'TW', 'https://www.fda.gov.tw', 1),
  ('REG_PH_DOH', 'DOH', 'Department of Health - Philippines', 'PH', 'https://www.doh.gov.ph', 1),
  ('REG_MY_NPRA', 'NPRA', 'National Pharmaceutical Regulatory Agency', 'MY', 'https://www.npra.gov.my', 1),
  ('REG_SG_HSA', 'HSA', 'Health Sciences Authority', 'SG', 'https://www.hsa.gov.sg', 1),
  
  -- 중남미
  ('REG_BR_ANVISA', 'Anvisa', 'Agência Nacional de Vigilância Sanitária', 'BR', 'https://www.gov.br/anvisa', 1),
  ('REG_MX_COFEPRIS', 'COFEPRIS', 'Federal Commission for Protection against Health Risks', 'MX', 'https://www.gob.mx/cofepris', 1),
  ('REG_CO_INVIMA', 'INVIMA', 'National Institute for Drug and Food Surveillance', 'CO', 'https://www.invima.gov.co', 1),
  ('REG_AR_ANMAT', 'ANMAT', 'National Administration of Drugs, Food and Medical Technology', 'AR', 'http://www.anmat.gov.ar', 1),
  ('REG_CL_ISP', 'ISP', 'Instituto de Salud Pública', 'CL', 'http://www.ispch.cl', 1),
  
  -- 아프리카
  ('REG_ZA_SAHPRA', 'SAHPRA', 'South African Health Products Regulatory Authority', 'ZA', 'https://www.sahpra.org.za', 1),
  ('REG_NG_NAFDAC', 'NAFDAC', 'National Agency for Food and Drug Administration and Control', 'NG', 'https://www.nafdac.gov.ng', 1),
  ('REG_GH_FDA', 'Ghana FDA', 'Food and Drugs Authority', 'GH', 'https://www.fdaghana.gov.gh', 1),
  ('REG_TZ_TFDA', 'TFDA', 'Tanzania Food and Drug Authority', 'TZ', 'https://www.tfda.go.tz', 1),
  ('REG_UG_NDA', 'NDA', 'National Drug Authority', 'UG', 'https://www.nda.or.ug', 1),
  
  -- 기타 지역
  ('REG_AU_TGA', 'TGA', 'Therapeutic Goods Administration', 'AU', 'https://www.tga.gov.au', 1),
  ('REG_NZ_MEDSAFE', 'Medsafe', 'Medicines and Medical Devices Safety Authority', 'NZ', 'https://www.medsafe.govt.nz', 1),
  ('REG_RU_SCEEMP', 'Roszdravnadzor', 'Scientific Centre for Expert Evaluation of Medicinal Products', 'RU', 'https://roszdravnadzor.gov.ru', 1),
  ('REG_TR_TMMDA', 'TMMDA', 'Turkish Medicines and Medical Devices Agency', 'TR', 'https://www.titck.gov.tr', 1);

-- ============================================================================
-- ADDITIONAL APPROVALS (추가 허가 정보 - 더 많은 국가)
-- ============================================================================

-- Wegovy (Semaglutide) - 추가 국가 허가
INSERT OR IGNORE INTO approvals VALUES
  ('APR001', 'PROD001', 'ING001', 'REG_CA_HC', 'CA', 'approved', '2021-10-04', NULL, 'rx', 
   'yes', '{"ko":"캐나다: 처방약 필요 ❌ 개인통관 불가능","en":"Canada: Rx required ❌ Personal import not allowed","zh":"加拿大：需要处方 ❌ 不允许个人进口","ja":"カナダ：処方箋必要 ❌ 個人輸入不可"}',
   'Approved for chronic weight management in adults with obesity or overweight with weight-related comorbidities',
   datetime('now'), datetime('now')),
   
  ('APR002', 'PROD001', 'ING001', 'REG_AU_TGA', 'AU', 'approved', '2022-05-20', NULL, 'rx',
   'yes', '{"ko":"호주: 처방약 필요 ⭕ 온라인 처방 가능","en":"Australia: Rx required ⭕ Online prescription available","zh":"澳大利亚：需要处方 ⭕ 可在线处方","ja":"オーストラリア：処方箋必要 ⭕ オンライン処方可能"}',
   'Approved via TGA for chronic weight management',
   datetime('now'), datetime('now')),
   
  ('APR003', 'PROD001', 'ING001', 'REG_JP_PMDA', 'JP', 'under_review', NULL, NULL, 'rx',
   'no', '{"ko":"일본: 심사중 ❌ 아직 승인 안됨","en":"Japan: Under review ❌ Not yet approved","zh":"日本：审查中 ❌ 尚未批准","ja":"日本：審査中 ❌ 未承認"}',
   'Currently under regulatory review by PMDA',
   datetime('now'), datetime('now')),
   
  ('APR004', 'PROD001', 'ING001', 'REG_CN_NMPA', 'CN', 'not_approved', NULL, NULL, NULL,
   'no', '{"ko":"중국: 미승인 ❌ 불법","en":"China: Not approved ❌ Illegal","zh":"中国：未批准 ❌ 非法","ja":"中国：未承認 ❌ 違法"}',
   'Not approved for use in China',
   datetime('now'), datetime('now')),
   
  ('APR005', 'PROD001', 'ING001', 'REG_BR_ANVISA', 'BR', 'approved', '2023-01-15', NULL, 'rx',
   'yes', '{"ko":"브라질: 처방약 필요 ⭕ 공식 약국에서 구매","en":"Brazil: Rx required ⭕ Purchase from official pharmacies","zh":"巴西：需要处方 ⭕ 从官方药店购买","ja":"ブラジル：処方箋必要 ⭕ 公式薬局で購入"}',
   'Approved by Anvisa for obesity treatment',
   datetime('now'), datetime('now'));

-- Saxenda (Liraglutide) - 추가 국가 허가
INSERT OR IGNORE INTO approvals VALUES
  ('APR006', 'PROD002', 'ING002', 'REG_CA_HC', 'CA', 'approved', '2015-02-14', NULL, 'rx',
   'yes', '{"ko":"캐나다: 처방약 필요","en":"Canada: Rx required","zh":"加拿大：需要处方","ja":"カナダ：処方箋必要"}',
   'Approved for weight management',
   datetime('now'), datetime('now')),
   
  ('APR007', 'PROD002', 'ING002', 'REG_AU_TGA', 'AU', 'approved', '2016-03-10', NULL, 'rx',
   'yes', '{"ko":"호주: 처방약 필요","en":"Australia: Rx required","zh":"澳大利亚：需要处方","ja":"オーストラリア：処方箋必要"}',
   'TGA approved for obesity treatment',
   datetime('now'), datetime('now')),
   
  ('APR008', 'PROD002', 'ING002', 'REG_JP_PMDA', 'JP', 'approved', '2019-03-25', NULL, 'rx',
   'yes', '{"ko":"일본: 처방약 필요 ⭕ 승인됨","en":"Japan: Rx required ⭕ Approved","zh":"日本：需要处方 ⭕ 已批准","ja":"日本：処方箋必要 ⭕ 承認済み"}',
   'PMDA approved for obesity treatment',
   datetime('now'), datetime('now'));

-- Mounjaro (Tirzepatide) - 추가 국가
INSERT OR IGNORE INTO approvals VALUES
  ('APR009', 'PROD006', 'ING006', 'REG_CA_HC', 'CA', 'approved', '2023-04-01', NULL, 'rx',
   'yes', '{"ko":"캐나다: 당뇨병 치료 승인","en":"Canada: Approved for diabetes","zh":"加拿大：糖尿病治疗批准","ja":"カナダ：糖尿病治療承認"}',
   'Approved for type 2 diabetes management',
   datetime('now'), datetime('now')),
   
  ('APR010', 'PROD006', 'ING006', 'REG_JP_PMDA', 'JP', 'approved', '2023-09-15', NULL, 'rx',
   'yes', '{"ko":"일본: 당뇨병 치료 승인","en":"Japan: Approved for diabetes","zh":"日本：糖尿病治疗批准","ja":"日本：糖尿病治療承認"}',
   'PMDA approved for type 2 diabetes',
   datetime('now'), datetime('now'));

-- ============================================================================
-- BLACKLISTED INGREDIENTS - 더 많은 국가 정보
-- ============================================================================

-- Sibutramine - 전 세계 금지 확대
INSERT OR IGNORE INTO blacklisted_ingredients VALUES
  ('BAN002', 'ING007', 'Sibutramine', 
   'EU,US,CA,UK,AU,NZ,KR,JP,CN,IN,BR,MX,ZA', 
   'Withdrawn globally due to increased cardiovascular risks including heart attack and stroke',
   'Cardiovascular toxicity, Increased blood pressure, Tachycardia, Risk of heart attack and stroke',
   'high', 
   '2010-01-01', NULL,
   '{"FDA":"2010-10-08","EMA":"2010-01-21","MHRA":"2010-01-22","MFDS":"2010-10-01","TGA":"2010-10-08","NMPA":"2010-10-30"}',
   datetime('now'), datetime('now'));
