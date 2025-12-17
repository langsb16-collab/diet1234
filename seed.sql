-- DietMed Global - Seed Data
-- Sample data for development and testing

-- ============================================================================
-- 1. INGREDIENTS (성분)
-- ============================================================================

INSERT OR IGNORE INTO ingredients VALUES
  ('ING001', 'Semaglutide', 'A10BJ06', '910463-68-2', 
   '{"ko":["세마글루타이드"],"ja":["セマグルチド"],"zh":["司美格鲁肽"],"en":["Semaglutide"]}',
   'GLP-1 receptor agonist that enhances insulin secretion and reduces appetite',
   'GLP-1 agonist', 'Weight management, Type 2 diabetes',
   datetime('now'), datetime('now'), 'FDA'),
   
  ('ING002', 'Liraglutide', 'A10BJ02', '204656-20-2',
   '{"ko":["리라글루타이드"],"ja":["リラグルチド"],"zh":["利拉鲁肽"],"en":["Liraglutide"]}',
   'GLP-1 receptor agonist',
   'GLP-1 agonist', 'Weight management, Type 2 diabetes',
   datetime('now'), datetime('now'), 'FDA'),
   
  ('ING003', 'Orlistat', 'A08AB01', '96829-58-2',
   '{"ko":["오를리스타트"],"ja":["オルリスタット"],"zh":["奥利司他"],"en":["Orlistat"]}',
   'Lipase inhibitor that prevents absorption of dietary fats',
   'Lipase inhibitor', 'Weight management',
   datetime('now'), datetime('now'), 'FDA'),
   
  ('ING004', 'Phentermine', 'A08AA01', '122-09-8',
   '{"ko":["펜터민"],"ja":["フェンテルミン"],"zh":["芬特明"],"en":["Phentermine"]}',
   'Sympathomimetic amine that suppresses appetite',
   'Appetite suppressant', 'Short-term weight management',
   datetime('now'), datetime('now'), 'FDA'),
   
  ('ING005', 'Naltrexone/Bupropion', 'N07BB', '16590-41-3',
   '{"ko":["날트렉손/부프로피온"],"ja":["ナルトレキソン/ブプロピオン"],"zh":["纳曲酮/安非他酮"],"en":["Naltrexone/Bupropion"]}',
   'Combination opioid antagonist and aminoketone antidepressant',
   'Combination therapy', 'Chronic weight management',
   datetime('now'), datetime('now'), 'FDA'),
   
  ('ING006', 'Tirzepatide', 'A10BJ08', '2023788-19-2',
   '{"ko":["티르제파타이드"],"ja":["チルゼパチド"],"zh":["替尔泊肽"],"en":["Tirzepatide"]}',
   'Dual GIP/GLP-1 receptor agonist',
   'GIP/GLP-1 agonist', 'Type 2 diabetes, Weight management',
   datetime('now'), datetime('now'), 'FDA'),
   
  ('ING007', 'Sibutramine', 'A08AA10', '106650-56-0',
   '{"ko":["시부트라민"],"ja":["シブトラミン"],"zh":["西布曲明"],"en":["Sibutramine"]}',
   'BANNED: Serotonin-norepinephrine reuptake inhibitor',
   'BANNED', 'BANNED - Cardiovascular risks',
   datetime('now'), datetime('now'), 'WITHDRAWN');

-- ============================================================================
-- 2. MANUFACTURERS (제조사)
-- ============================================================================

INSERT OR IGNORE INTO manufacturers VALUES
  ('MFR001', 'Novo Nordisk A/S', 'Denmark', 'https://www.novonordisk.com', 
   'Bagsværd, Denmark', 100, datetime('now'), datetime('now')),
   
  ('MFR002', 'Eli Lilly and Company', 'United States', 'https://www.lilly.com',
   'Indianapolis, Indiana, USA', 100, datetime('now'), datetime('now')),
   
  ('MFR003', 'Roche', 'Switzerland', 'https://www.roche.com',
   'Basel, Switzerland', 100, datetime('now'), datetime('now')),
   
  ('MFR004', 'Takeda Pharmaceutical', 'Japan', 'https://www.takeda.com',
   'Tokyo, Japan', 95, datetime('now'), datetime('now'));

-- ============================================================================
-- 3. PRODUCTS (제품)
-- ============================================================================

INSERT OR IGNORE INTO products VALUES
  ('PROD001', 'ING001', 'Wegovy', 'injection', '2.4mg/0.75mL', 'subcutaneous',
   'MFR001', 'Novo Nordisk A/S', 'Denmark',
   '["0169-4517-02"]', '0169-4517-02', '5060123456789',
   'Pre-filled pen, 4 pens per pack',
   '{"shape":"pen","color":"blue","type":"injection"}',
   'Refrigerate 2-8°C', 1,
   '[]',
   datetime('now'), datetime('now')),
   
  ('PROD002', 'ING002', 'Saxenda', 'injection', '6mg/mL', 'subcutaneous',
   'MFR001', 'Novo Nordisk A/S', 'Denmark',
   '["0169-4060-13"]', '0169-4060-13', '5060123456790',
   'Pre-filled pen, 3 pens per pack',
   '{"shape":"pen","color":"green","type":"injection"}',
   'Refrigerate 2-8°C', 1,
   '[]',
   datetime('now'), datetime('now')),
   
  ('PROD003', 'ING003', 'Xenical', 'capsule', '120mg', 'oral',
   'MFR003', 'Roche', 'Switzerland',
   '["0004-0257-49"]', '0004-0257-49', '5060123456791',
   'Capsule, 90 capsules per bottle',
   '{"shape":"capsule","color":"blue","imprint":"ROCHE XENICAL 120"}',
   'Store at 25°C', 0,
   '[]',
   datetime('now'), datetime('now')),
   
  ('PROD004', 'ING003', 'Alli', 'capsule', '60mg', 'oral',
   'MFR003', 'Roche', 'Switzerland',
   '["0004-0259-60"]', '0004-0259-60', '5060123456792',
   'Capsule, 60 capsules per pack',
   '{"shape":"capsule","color":"turquoise","imprint":"alli 60"}',
   'Store at 25°C', 0,
   '[]',
   datetime('now'), datetime('now')),
   
  ('PROD005', 'ING006', 'Mounjaro', 'injection', '5mg/0.5mL', 'subcutaneous',
   'MFR002', 'Eli Lilly and Company', 'United States',
   '["0002-4471-01"]', '0002-4471-01', '5060123456793',
   'Pre-filled pen, 4 pens per pack',
   '{"shape":"pen","color":"purple","type":"injection"}',
   'Refrigerate 2-8°C', 1,
   '[]',
   datetime('now'), datetime('now')),
   
  ('PROD006', 'ING006', 'Zepbound', 'injection', '5mg/0.5mL', 'subcutaneous',
   'MFR002', 'Eli Lilly and Company', 'United States',
   '["0002-4472-01"]', '0002-4472-01', '5060123456794',
   'Pre-filled pen, 4 pens per pack',
   '{"shape":"pen","color":"teal","type":"injection"}',
   'Refrigerate 2-8°C', 1,
   '[]',
   datetime('now'), datetime('now')),
   
  ('PROD007', 'ING005', 'Contrave', 'tablet', '8mg/90mg', 'oral',
   'MFR004', 'Takeda Pharmaceutical', 'Japan',
   '["0378-1350-93"]', '0378-1350-93', '5060123456795',
   'Extended-release tablet, 120 tablets per bottle',
   '{"shape":"oval","color":"blue","imprint":"NB 890"}',
   'Store at 25°C', 0,
   '[]',
   datetime('now'), datetime('now'));

-- ============================================================================
-- 4. APPROVALS (국가별 허가)
-- ============================================================================

-- Wegovy (Semaglutide) - US
INSERT OR IGNORE INTO approvals VALUES
  ('APV_US_001', 'PROD001', 'US', 'FDA', 'NDA 212554', 'NDA', 'approved',
   '2021-06-04', NULL, '2026-06-04', 'rx',
   'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=xxx', NULL, 'xxx',
   '["Chronic weight management in adults with BMI ≥30 or BMI ≥27 with comorbidities"]',
   0,
   '["Pregnancy","Personal or family history of medullary thyroid carcinoma","Multiple Endocrine Neoplasia syndrome type 2"]',
   '["Risk of thyroid C-cell tumors","Acute pancreatitis","Gallbladder disease","Hypoglycemia with concomitant insulin","Acute kidney injury","Hypersensitivity reactions","Suicidal behavior"]',
   datetime('now'), datetime('now'), '2024-12-01',
   'https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=212554');

-- Wegovy - UK
INSERT OR IGNORE INTO approvals VALUES
  ('APV_UK_001', 'PROD001', 'GB', 'MHRA', 'PLGB 00101/0537', 'Marketing Authorization', 'approved',
   '2022-03-25', NULL, NULL, 'rx',
   NULL, NULL, NULL,
   '["Weight management in adults with BMI ≥30 or BMI ≥27 with comorbidities"]',
   0, '["Pregnancy","MTC history","MEN 2"]', '["Thyroid tumors","Pancreatitis"]',
   datetime('now'), datetime('now'), '2024-12-01',
   'https://www.gov.uk/mhra');

-- Wegovy - EU
INSERT OR IGNORE INTO approvals VALUES
  ('APV_EU_001', 'PROD001', 'EU', 'EMA', 'EMEA/H/C/005422', 'Centralized', 'approved',
   '2022-01-13', NULL, NULL, 'rx',
   'https://www.ema.europa.eu/en/medicines/human/EPAR/wegovy', NULL, NULL,
   '["Weight management in adults with BMI ≥30 or BMI ≥27 with comorbidities"]',
   0, '["Pregnancy","MTC","MEN 2"]', '["Thyroid tumors","Pancreatitis"]',
   datetime('now'), datetime('now'), '2024-12-01',
   'https://www.ema.europa.eu/en/medicines/human/EPAR/wegovy');

-- Saxenda (Liraglutide) - US
INSERT OR IGNORE INTO approvals VALUES
  ('APV_US_002', 'PROD002', 'US', 'FDA', 'NDA 206321', 'NDA', 'approved',
   '2014-12-23', NULL, '2025-12-23', 'rx',
   'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=yyy', NULL, 'yyy',
   '["Chronic weight management in adults with BMI ≥30 or BMI ≥27 with comorbidities"]',
   0,
   '["Pregnancy","MTC history","MEN 2"]',
   '["Thyroid tumors","Pancreatitis","Gallbladder disease"]',
   datetime('now'), datetime('now'), '2024-12-01',
   'https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=206321');

-- Saxenda - KR
INSERT OR IGNORE INTO approvals VALUES
  ('APV_KR_001', 'PROD002', 'KR', 'MFDS', '202000001', '품목허가', 'approved',
   '2020-01-15', NULL, '2025-01-15', 'rx',
   NULL, NULL, NULL,
   '["비만 치료"]',
   0,
   '["임신","갑상선 수질암 병력","MEN 2"]',
   '["갑상선 종양","췌장염","담낭 질환"]',
   datetime('now'), datetime('now'), '2024-12-01',
   'https://nedrug.mfds.go.kr');

-- Xenical (Orlistat 120mg) - US
INSERT OR IGNORE INTO approvals VALUES
  ('APV_US_003', 'PROD003', 'US', 'FDA', 'NDA 020766', 'NDA', 'approved',
   '1999-04-23', NULL, NULL, 'rx',
   'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=zzz', NULL, 'zzz',
   '["Weight management in adults with BMI ≥30 or BMI ≥27 with comorbidities"]',
   0,
   '["Chronic malabsorption syndrome","Cholestasis"]',
   '["Liver injury","Kidney stones","Vitamin deficiency"]',
   datetime('now'), datetime('now'), '2024-12-01',
   'https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=020766');

-- Alli (Orlistat 60mg OTC) - US
INSERT OR IGNORE INTO approvals VALUES
  ('APV_US_004', 'PROD004', 'US', 'FDA', 'NDA 021887', 'NDA', 'approved',
   '2007-02-07', NULL, NULL, 'otc',
   'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=www', NULL, 'www',
   '["Weight loss in overweight adults 18 years and older"]',
   0,
   '["Chronic malabsorption","Cholestasis","Pregnancy"]',
   '["GI effects","Vitamin deficiency"]',
   datetime('now'), datetime('now'), '2024-12-01',
   'https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=021887');

-- Mounjaro (Tirzepatide) - US
INSERT OR IGNORE INTO approvals VALUES
  ('APV_US_005', 'PROD005', 'US', 'FDA', 'NDA 215866', 'NDA', 'approved',
   '2022-05-13', NULL, '2027-05-13', 'rx',
   'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=aaa', NULL, 'aaa',
   '["Type 2 diabetes mellitus"]',
   0,
   '["Pregnancy","MTC history","MEN 2"]',
   '["Thyroid tumors","Pancreatitis","Diabetic retinopathy","Hypoglycemia"]',
   datetime('now'), datetime('now'), '2024-12-01',
   'https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=215866');

-- Zepbound (Tirzepatide for weight loss) - US
INSERT OR IGNORE INTO approvals VALUES
  ('APV_US_006', 'PROD006', 'US', 'FDA', 'NDA 217806', 'NDA', 'approved',
   '2023-11-08', NULL, '2028-11-08', 'rx',
   'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=bbb', NULL, 'bbb',
   '["Chronic weight management in adults with BMI ≥30 or BMI ≥27 with comorbidities"]',
   0,
   '["Pregnancy","MTC history","MEN 2"]',
   '["Thyroid tumors","Pancreatitis","Gallbladder disease","Hypoglycemia","Acute kidney injury"]',
   datetime('now'), datetime('now'), '2024-12-01',
   'https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=217806');

-- ============================================================================
-- 5. BLACKLISTED INGREDIENTS (금지 성분)
-- ============================================================================

INSERT OR IGNORE INTO blacklisted_ingredients VALUES
  ('BL001', 'ING007', 'Sibutramine', 
   '["US","KR","EU","GB","JP","CN","AU"]',
   'Withdrawn due to increased risk of serious cardiovascular events including heart attack and stroke',
   '2010-10-08',
   '["심근경색 위험 2배 증가","뇌졸중 위험 증가","사망 사례 다수 보고","심혈관계 부작용"]',
   'critical',
   datetime('now'),
   'https://www.fda.gov/drugs/drug-safety-and-availability/fda-drug-safety-communication-fda-recommends-against-continued-use-meridia-sibutramine');

INSERT OR IGNORE INTO blacklisted_ingredients VALUES
  ('BL002', NULL, 'Phenolphthalein',
   '["US","KR","EU","GB","JP"]',
   'Banned due to potential carcinogenic effects',
   '1999-09-01',
   '["발암 가능성","장기 사용 시 암 위험"]',
   'high',
   datetime('now'),
   'https://www.fda.gov/');

INSERT OR IGNORE INTO blacklisted_ingredients VALUES
  ('BL003', NULL, 'DNPH (2,4-Dinitrophenol)',
   '["US","KR","EU","GB","JP","CN","AU"]',
   'Life-threatening hyperthermia, banned worldwide',
   '1938-01-01',
   '["치명적 과열","체온 조절 불가","사망 위험 매우 높음","해독제 없음"]',
   'critical',
   datetime('now'),
   'https://www.fda.gov/');

-- ============================================================================
-- 6. RISK PATTERNS (위험 패턴)
-- ============================================================================

INSERT OR IGNORE INTO risk_patterns VALUES
  ('PAT001', 'no_prescription_rx', '전문의약품 무처방 판매',
   '처방이 필요한 전문의약품을 처방 절차 없이 판매하는 패턴',
   '{"keywords":["처방 없이","no prescription","without prescription","prescription not required"],"applies_to":"rx_only"}',
   85, 'critical', 0, 0.03, 1,
   datetime('now'), datetime('now'));

INSERT OR IGNORE INTO risk_patterns VALUES
  ('PAT002', 'abnormal_low_price', '비정상 저가 판매',
   '시장 평균가 대비 40% 이상 저렴한 가격으로 판매',
   '{"price_threshold_percent":-40,"comparison_basis":"market_average"}',
   70, 'high', 0, 0.15, 1,
   datetime('now'), datetime('now'));

INSERT OR IGNORE INTO risk_patterns VALUES
  ('PAT003', 'sns_personal_sale', 'SNS 개인 판매',
   '인스타그램, 카카오톡 등 SNS를 통한 개인 간 거래',
   '{"platforms":["instagram","kakao","telegram","whatsapp"],"indicators":["DM","개인톡","연락주세요"]}',
   80, 'critical', 0, 0.05, 1,
   datetime('now'), datetime('now'));

INSERT OR IGNORE INTO risk_patterns VALUES
  ('PAT004', 'customs_guarantee', '세관 통과 보장 문구',
   '세관 문제 없음, 통관 보장 등의 문구 사용',
   '{"keywords":["세관 문제 없음","customs guarantee","통관 보장","100% delivery"]}',
   75, 'high', 0, 0.08, 1,
   datetime('now'), datetime('now'));

INSERT OR IGNORE INTO risk_patterns VALUES
  ('PAT005', 'personal_account_payment', '개인 계좌 입금',
   '개인 계좌로 직접 입금 유도',
   '{"payment_methods":["personal_account","bank_transfer_personal","무통장입금"],"red_flags":["개인명의","개인계좌"]}',
   70, 'high', 0, 0.10, 1,
   datetime('now'), datetime('now'));

-- ============================================================================
-- 7. SELLERS (판매처 샘플)
-- ============================================================================

-- 검증된 약국
INSERT OR IGNORE INTO sellers VALUES
  ('SEL001', 'HealthWarehouse', 'US', 'https://www.healthwarehouse.com',
   'healthwarehouse.com', 'US-12345', 'NABP-12345',
   95, 'verified', 1, 1, 1, 1, 1, 0, 1500,
   datetime('now'), datetime('now'), '2024-12-01');

-- 위험 판매처 (예시)
INSERT OR IGNORE INTO sellers VALUES
  ('SEL002', 'Unknown Seller', 'Unknown', 'https://fake-pharmacy-site.com',
   'fake-pharmacy-site.com', NULL, NULL,
   15, 'high_risk', 0, 0, 0, 0, 0, 25, 0,
   datetime('now'), datetime('now'), NULL);

-- ============================================================================
-- Seed Data Complete
-- ============================================================================
