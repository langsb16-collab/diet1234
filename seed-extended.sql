-- ============================================================================
-- Extended Product Database (25 Products Total)
-- ============================================================================

PRAGMA foreign_keys = OFF;

-- ============================================================================
-- Additional Ingredients
-- ============================================================================

INSERT OR IGNORE INTO ingredients (ingredient_id, name_standard, cas_number, drug_class, created_at) VALUES
('ING008', 'Phentermine', '122-09-8', 'anorectic', CURRENT_TIMESTAMP),
('ING009', 'Topiramate', '97240-79-4', 'anticonvulsant', CURRENT_TIMESTAMP),
('ING010', 'Naltrexone', '16590-41-3', 'opioid_antagonist', CURRENT_TIMESTAMP),
('ING011', 'Bupropion', '34911-55-2', 'antidepressant', CURRENT_TIMESTAMP),
('ING012', 'Lorcaserin', '616202-92-7', 'serotonin_agonist', CURRENT_TIMESTAMP),
('ING013', 'Setmelanotide', '920014-72-8', 'melanocortin_receptor_agonist', CURRENT_TIMESTAMP),
('ING014', 'Metformin', '657-24-9', 'biguanide', CURRENT_TIMESTAMP),
('ING015', 'Cetilistat', '282526-98-1', 'lipase_inhibitor', CURRENT_TIMESTAMP),
('ING016', 'Diethylpropion', '90-84-6', 'anorectic', CURRENT_TIMESTAMP),
('ING017', 'Benzphetamine', '156-08-1', 'anorectic', CURRENT_TIMESTAMP),
('ING018', 'Phendimetrazine', '634-03-7', 'anorectic', CURRENT_TIMESTAMP);

-- ============================================================================
-- Additional Manufacturers
-- ============================================================================

INSERT OR IGNORE INTO manufacturers (manufacturer_id, name, country, website, created_at) VALUES
('MFR005', 'Eisai Inc.', 'USA', 'https://www.eisai.com', CURRENT_TIMESTAMP),
('MFR006', 'Vivus Inc.', 'USA', 'https://www.vivus.com', CURRENT_TIMESTAMP),
('MFR007', 'Arena Pharmaceuticals', 'USA', 'https://www.arenapharm.com', CURRENT_TIMESTAMP),
('MFR008', 'Rhythm Pharmaceuticals', 'USA', 'https://www.rhythmtx.com', CURRENT_TIMESTAMP),
('MFR009', 'Teva Pharmaceuticals', 'Israel', 'https://www.tevapharm.com', CURRENT_TIMESTAMP),
('MFR010', 'Mylan Pharmaceuticals', 'USA', 'https://www.mylan.com', CURRENT_TIMESTAMP),
('MFR011', 'Hikma Pharmaceuticals', 'UK', 'https://www.hikma.com', CURRENT_TIMESTAMP),
('MFR012', 'Nalpropion Pharmaceuticals', 'USA', 'https://www.nalpropion.com', CURRENT_TIMESTAMP);

-- ============================================================================
-- Additional Products (15 new products = 22 total with existing 7)
-- ============================================================================

-- Phentermine-based products
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD008', 'Adipex-P', 'ING008', 'MFR009', 'Teva Pharmaceuticals', 'Israel', 'tablet', '37.5mg', '57844-019', 0, CURRENT_TIMESTAMP),
('PROD009', 'Lomaira', 'ING008', 'MFR010', 'Mylan Pharmaceuticals', 'USA', 'tablet', '8mg', '43547-404', 0, CURRENT_TIMESTAMP);

-- Combination products
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD010', 'Qsymia', 'ING008', 'MFR006', 'Vivus Inc.', 'USA', 'capsule', '3.75mg/23mg', '67877-200', 0, CURRENT_TIMESTAMP);

-- Lorcaserin products
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD011', 'Belviq', 'ING012', 'MFR007', 'Arena Pharmaceuticals', 'USA', 'tablet', '10mg', '47781-440', 0, CURRENT_TIMESTAMP),
('PROD012', 'Belviq XR', 'ING012', 'MFR007', 'Arena Pharmaceuticals', 'USA', 'tablet', '20mg', '47781-445', 0, CURRENT_TIMESTAMP);

-- Setmelanotide products
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD013', 'Imcivree', 'ING013', 'MFR008', 'Rhythm Pharmaceuticals', 'USA', 'injection', '10mg/ml', '71770-001', 1, CURRENT_TIMESTAMP);

-- Metformin products (off-label for weight loss)
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD014', 'Glucophage', 'ING014', 'MFR009', 'Teva Pharmaceuticals', 'Israel', 'tablet', '850mg', '16729-024', 0, CURRENT_TIMESTAMP),
('PROD015', 'Glucophage XR', 'ING014', 'MFR009', 'Teva Pharmaceuticals', 'Israel', 'tablet', '500mg', '16729-012', 0, CURRENT_TIMESTAMP);

-- Cetilistat products
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD016', 'Oblean', 'ING015', 'MFR011', 'Hikma Pharmaceuticals', 'UK', 'capsule', '60mg', 'JP-2013-0001', 0, CURRENT_TIMESTAMP);

-- Diethylpropion products
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD017', 'Tenuate', 'ING016', 'MFR009', 'Teva Pharmaceuticals', 'Israel', 'tablet', '25mg', '54569-2350', 0, CURRENT_TIMESTAMP),
('PROD018', 'Tenuate Dospan', 'ING016', 'MFR009', 'Teva Pharmaceuticals', 'Israel', 'tablet', '75mg', '54569-2351', 0, CURRENT_TIMESTAMP);

-- Benzphetamine products
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD019', 'Didrex', 'ING017', 'MFR010', 'Mylan Pharmaceuticals', 'USA', 'tablet', '50mg', '67877-300', 0, CURRENT_TIMESTAMP);

-- Phendimetrazine products
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD020', 'Bontril PDM', 'ING018', 'MFR010', 'Mylan Pharmaceuticals', 'USA', 'tablet', '35mg', '67877-350', 0, CURRENT_TIMESTAMP),
('PROD021', 'Bontril SR', 'ING018', 'MFR010', 'Mylan Pharmaceuticals', 'USA', 'capsule', '105mg', '67877-351', 0, CURRENT_TIMESTAMP);

-- GLP-1 additional products
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD022', 'Victoza', 'ING002', 'MFR001', 'Novo Nordisk', 'Denmark', 'injection', '6mg/ml', '0169-4060', 1, CURRENT_TIMESTAMP);

-- Tirzepatide additional products
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD023', 'Mounjaro 2.5mg', 'ING006', 'MFR002', 'Eli Lilly', 'USA', 'injection', '2.5mg', '0002-1430', 1, CURRENT_TIMESTAMP),
('PROD024', 'Mounjaro 7.5mg', 'ING006', 'MFR002', 'Eli Lilly', 'USA', 'injection', '7.5mg', '0002-1470', 1, CURRENT_TIMESTAMP),
('PROD025', 'Mounjaro 10mg', 'ING006', 'MFR002', 'Eli Lilly', 'USA', 'injection', '10mg', '0002-1480', 1, CURRENT_TIMESTAMP);

-- ============================================================================
-- Additional Approvals (Extended)
-- ============================================================================

-- USA FDA Approvals
INSERT OR IGNORE INTO approvals (approval_id, product_id, country_code, regulatory_body, approval_number, approval_date, status, prescription_required, notes, created_at) VALUES
('APV010', 'PROD008', 'US', 'FDA', 'NDA010187', '1959-02-01', 'active', 1, 'Short-term adjunct treatment', CURRENT_TIMESTAMP),
('APV011', 'PROD009', 'US', 'FDA', 'NDA208277', '2016-11-10', 'active', 1, 'Lower dose phentermine', CURRENT_TIMESTAMP),
('APV012', 'PROD010', 'US', 'FDA', 'NDA022580', '2012-07-17', 'active', 1, 'Phentermine + Topiramate combination', CURRENT_TIMESTAMP),
('APV013', 'PROD011', 'US', 'FDA', 'NDA022529', '2012-06-27', 'withdrawn', 1, 'Withdrawn 2020 due to cancer risk', CURRENT_TIMESTAMP),
('APV014', 'PROD012', 'US', 'FDA', 'NDA022529', '2016-07-14', 'withdrawn', 1, 'Extended release withdrawn 2020', CURRENT_TIMESTAMP),
('APV015', 'PROD013', 'US', 'FDA', 'NDA213793', '2020-11-27', 'active', 1, 'Rare genetic obesity only', CURRENT_TIMESTAMP),
('APV016', 'PROD014', 'US', 'FDA', 'NDA020357', '1995-03-03', 'active', 1, 'Diabetes treatment (off-label weight loss)', CURRENT_TIMESTAMP),
('APV017', 'PROD015', 'US', 'FDA', 'NDA021202', '2000-10-03', 'active', 1, 'Extended release metformin', CURRENT_TIMESTAMP),
('APV018', 'PROD017', 'US', 'FDA', 'NDA011230', '1959-12-23', 'active', 1, 'Short-term anorectic', CURRENT_TIMESTAMP),
('APV019', 'PROD018', 'US', 'FDA', 'NDA016379', '1973-08-17', 'active', 1, 'Extended release diethylpropion', CURRENT_TIMESTAMP),
('APV020', 'PROD019', 'US', 'FDA', 'NDA011820', '1960-02-19', 'active', 1, 'Schedule III controlled substance', CURRENT_TIMESTAMP),
('APV021', 'PROD020', 'US', 'FDA', 'NDA012722', '1982-09-24', 'active', 1, 'Immediate release', CURRENT_TIMESTAMP),
('APV022', 'PROD021', 'US', 'FDA', 'NDA012722', '1982-09-24', 'active', 1, 'Sustained release', CURRENT_TIMESTAMP),
('APV023', 'PROD022', 'US', 'FDA', 'NDA022341', '2010-01-25', 'active', 1, 'Type 2 diabetes treatment', CURRENT_TIMESTAMP),
('APV024', 'PROD023', 'US', 'FDA', 'NDA215866', '2022-05-13', 'active', 1, 'Tirzepatide 2.5mg', CURRENT_TIMESTAMP),
('APV025', 'PROD024', 'US', 'FDA', 'NDA215866', '2022-05-13', 'active', 1, 'Tirzepatide 7.5mg', CURRENT_TIMESTAMP),
('APV026', 'PROD025', 'US', 'FDA', 'NDA215866', '2022-05-13', 'active', 1, 'Tirzepatide 10mg', CURRENT_TIMESTAMP);

-- Japan Approvals
INSERT OR IGNORE INTO approvals (approval_id, product_id, country_code, regulatory_body, approval_number, approval_date, status, prescription_required, notes, created_at) VALUES
('APV027', 'PROD016', 'JP', 'PMDA', 'JP-2013-0001', '2013-09-17', 'active', 1, 'Lipase inhibitor for obesity', CURRENT_TIMESTAMP);

-- EU Approvals
INSERT OR IGNORE INTO approvals (approval_id, product_id, country_code, regulatory_body, approval_number, approval_date, status, prescription_required, notes, created_at) VALUES
('APV028', 'PROD008', 'EU', 'EMA', 'EU/1/23/001', '2023-04-12', 'active', 1, 'EU approval for phentermine', CURRENT_TIMESTAMP),
('APV029', 'PROD022', 'EU', 'EMA', 'EU/1/09/529', '2009-07-03', 'active', 1, 'Type 2 diabetes', CURRENT_TIMESTAMP);

-- South Korea Approvals
INSERT OR IGNORE INTO approvals (approval_id, product_id, country_code, regulatory_body, approval_number, approval_date, status, prescription_required, notes, created_at) VALUES
('APV030', 'PROD008', 'KR', 'MFDS', 'KR-199900456', '1999-08-20', 'active', 1, 'Phentermine approved in Korea', CURRENT_TIMESTAMP),
('APV031', 'PROD022', 'KR', 'MFDS', 'KR-201100123', '2011-02-10', 'active', 1, 'Victoza for diabetes', CURRENT_TIMESTAMP);

-- ============================================================================
-- Additional Product Comparisons
-- ============================================================================

INSERT OR IGNORE INTO product_comparisons (comparison_id, product_id, item_name, item_value, display_order, created_at) VALUES
-- PROD008 (Adipex-P)
('CMP250', 'PROD008', 'mechanism', 'CNS Stimulant - Sympathomimetic Amine', 10, CURRENT_TIMESTAMP),
('CMP251', 'PROD008', 'weight_loss_6mo', '5-8% body weight', 20, CURRENT_TIMESTAMP),
('CMP252', 'PROD008', 'weight_loss_12mo', 'N/A (short-term use only)', 30, CURRENT_TIMESTAMP),
('CMP253', 'PROD008', 'onset', '1-2 weeks', 40, CURRENT_TIMESTAMP),
('CMP254', 'PROD008', 'evidence_level', 'Moderate (decades of use)', 50, CURRENT_TIMESTAMP),
('CMP255', 'PROD008', 'common_side_effects', 'Dry mouth, insomnia, nervousness, increased heart rate', 60, CURRENT_TIMESTAMP),
('CMP256', 'PROD008', 'serious_side_effects', 'Pulmonary hypertension, valvular heart disease', 70, CURRENT_TIMESTAMP),
('CMP257', 'PROD008', 'contraindications', 'Cardiovascular disease, hyperthyroidism, glaucoma, MAO inhibitor use', 80, CURRENT_TIMESTAMP),
('CMP258', 'PROD008', 'drug_interactions', 'MAO inhibitors (contraindicated), SSRIs (serotonin syndrome risk)', 90, CURRENT_TIMESTAMP),
('CMP259', 'PROD008', 'pregnancy', 'Contraindicated', 100, CURRENT_TIMESTAMP),
('CMP260', 'PROD008', 'breastfeeding', 'Contraindicated', 110, CURRENT_TIMESTAMP),
('CMP261', 'PROD008', 'addiction_risk', 'Schedule IV - Low to moderate', 120, CURRENT_TIMESTAMP),

-- PROD010 (Qsymia)
('CMP262', 'PROD010', 'mechanism', 'Phentermine (appetite suppression) + Topiramate (satiety enhancement)', 10, CURRENT_TIMESTAMP),
('CMP263', 'PROD010', 'weight_loss_6mo', '7-10% body weight', 20, CURRENT_TIMESTAMP),
('CMP264', 'PROD010', 'weight_loss_12mo', '9-12% body weight', 30, CURRENT_TIMESTAMP),
('CMP265', 'PROD010', 'onset', '2-4 weeks', 40, CURRENT_TIMESTAMP),
('CMP266', 'PROD010', 'evidence_level', 'High (RCTs)', 50, CURRENT_TIMESTAMP),
('CMP267', 'PROD010', 'common_side_effects', 'Paresthesia, dizziness, altered taste, insomnia, constipation', 60, CURRENT_TIMESTAMP),
('CMP268', 'PROD010', 'serious_side_effects', 'Teratogenicity, acute myopia, metabolic acidosis', 70, CURRENT_TIMESTAMP),
('CMP269', 'PROD010', 'contraindications', 'Pregnancy, glaucoma, hyperthyroidism, cardiovascular disease', 80, CURRENT_TIMESTAMP),
('CMP270', 'PROD010', 'drug_interactions', 'MAO inhibitors, carbonic anhydrase inhibitors', 90, CURRENT_TIMESTAMP),
('CMP271', 'PROD010', 'pregnancy', 'Category X - Contraindicated', 100, CURRENT_TIMESTAMP),
('CMP272', 'PROD010', 'breastfeeding', 'Not recommended', 110, CURRENT_TIMESTAMP),
('CMP273', 'PROD010', 'addiction_risk', 'Schedule IV (phentermine component)', 120, CURRENT_TIMESTAMP),

-- PROD013 (Imcivree)
('CMP274', 'PROD013', 'mechanism', 'Melanocortin 4 receptor agonist - appetite regulation', 10, CURRENT_TIMESTAMP),
('CMP275', 'PROD013', 'weight_loss_6mo', '10-12% body weight', 20, CURRENT_TIMESTAMP),
('CMP276', 'PROD013', 'weight_loss_12mo', '12-15% body weight', 30, CURRENT_TIMESTAMP),
('CMP277', 'PROD013', 'onset', '4-12 weeks', 40, CURRENT_TIMESTAMP),
('CMP278', 'PROD013', 'evidence_level', 'High (specific genetic populations)', 50, CURRENT_TIMESTAMP),
('CMP279', 'PROD013', 'common_side_effects', 'Injection site reactions, hyperpigmentation, nausea, headache', 60, CURRENT_TIMESTAMP),
('CMP280', 'PROD013', 'serious_side_effects', 'Spontaneous penile erection, hyperpigmentation, depression', 70, CURRENT_TIMESTAMP),
('CMP281', 'PROD013', 'contraindications', 'None specific (genetic indication required)', 80, CURRENT_TIMESTAMP),
('CMP282', 'PROD013', 'drug_interactions', 'None significant', 90, CURRENT_TIMESTAMP),
('CMP283', 'PROD013', 'pregnancy', 'Limited data - use with caution', 100, CURRENT_TIMESTAMP),
('CMP284', 'PROD013', 'breastfeeding', 'Unknown if excreted in milk', 110, CURRENT_TIMESTAMP),
('CMP285', 'PROD013', 'addiction_risk', 'None', 120, CURRENT_TIMESTAMP),

-- PROD022 (Victoza)
('CMP286', 'PROD022', 'mechanism', 'GLP-1 Receptor Agonist - glucose-dependent insulin secretion', 10, CURRENT_TIMESTAMP),
('CMP287', 'PROD022', 'weight_loss_6mo', '4-5% body weight', 20, CURRENT_TIMESTAMP),
('CMP288', 'PROD022', 'weight_loss_12mo', '5-6% body weight', 30, CURRENT_TIMESTAMP),
('CMP289', 'PROD022', 'onset', '2-4 weeks', 40, CURRENT_TIMESTAMP),
('CMP290', 'PROD022', 'evidence_level', 'Very High (extensive RCTs)', 50, CURRENT_TIMESTAMP),
('CMP291', 'PROD022', 'common_side_effects', 'Nausea, diarrhea, vomiting, headache', 60, CURRENT_TIMESTAMP),
('CMP292', 'PROD022', 'serious_side_effects', 'Pancreatitis, thyroid C-cell tumors (animal studies), hypoglycemia', 70, CURRENT_TIMESTAMP),
('CMP293', 'PROD022', 'contraindications', 'Personal/family history of medullary thyroid carcinoma, MEN2', 80, CURRENT_TIMESTAMP),
('CMP294', 'PROD022', 'drug_interactions', 'Insulin, sulfonylureas (hypoglycemia risk)', 90, CURRENT_TIMESTAMP),
('CMP295', 'PROD022', 'pregnancy', 'Insufficient data - discontinue before pregnancy', 100, CURRENT_TIMESTAMP),
('CMP296', 'PROD022', 'breastfeeding', 'Unknown if excreted in milk', 110, CURRENT_TIMESTAMP),
('CMP297', 'PROD022', 'addiction_risk', 'None', 120, CURRENT_TIMESTAMP);

-- ============================================================================
-- Safety Profiles for New Products
-- ============================================================================

INSERT OR IGNORE INTO safety_profiles (profile_id, product_id, profile_category, profile_value, severity, created_at) VALUES
-- PROD008 (Adipex-P)
('SP100', 'PROD008', 'weight_loss_rate', '5-8% in 6 months', 'info', CURRENT_TIMESTAMP),
('SP101', 'PROD008', 'common_adverse_effects', 'Dry mouth, insomnia, nervousness', 'moderate', CURRENT_TIMESTAMP),
('SP102', 'PROD008', 'contraindications', 'Cardiovascular disease, hyperthyroidism', 'high', CURRENT_TIMESTAMP),
('SP103', 'PROD008', 'drug_interactions', 'MAO inhibitors (serious), SSRIs', 'high', CURRENT_TIMESTAMP),
('SP104', 'PROD008', 'pregnancy_category', 'Contraindicated', 'critical', CURRENT_TIMESTAMP),
('SP105', 'PROD008', 'addiction_potential', 'Schedule IV - Moderate', 'high', CURRENT_TIMESTAMP),

-- PROD010 (Qsymia)
('SP106', 'PROD010', 'weight_loss_rate', '9-12% in 12 months', 'info', CURRENT_TIMESTAMP),
('SP107', 'PROD010', 'common_adverse_effects', 'Paresthesia, dizziness, altered taste', 'moderate', CURRENT_TIMESTAMP),
('SP108', 'PROD010', 'contraindications', 'Pregnancy, glaucoma, hyperthyroidism', 'critical', CURRENT_TIMESTAMP),
('SP109', 'PROD010', 'drug_interactions', 'MAO inhibitors, carbonic anhydrase inhibitors', 'high', CURRENT_TIMESTAMP),
('SP110', 'PROD010', 'pregnancy_category', 'Category X - Teratogenic', 'critical', CURRENT_TIMESTAMP),
('SP111', 'PROD010', 'addiction_potential', 'Schedule IV (phentermine)', 'moderate', CURRENT_TIMESTAMP),

-- PROD013 (Imcivree)
('SP112', 'PROD013', 'weight_loss_rate', '12-15% in 12 months', 'info', CURRENT_TIMESTAMP),
('SP113', 'PROD013', 'common_adverse_effects', 'Injection site reactions, hyperpigmentation', 'moderate', CURRENT_TIMESTAMP),
('SP114', 'PROD013', 'contraindications', 'Requires genetic confirmation', 'high', CURRENT_TIMESTAMP),
('SP115', 'PROD013', 'drug_interactions', 'None significant', 'low', CURRENT_TIMESTAMP),
('SP116', 'PROD013', 'pregnancy_category', 'Limited data', 'moderate', CURRENT_TIMESTAMP),
('SP117', 'PROD013', 'addiction_potential', 'None', 'low', CURRENT_TIMESTAMP),

-- PROD022 (Victoza)
('SP118', 'PROD022', 'weight_loss_rate', '5-6% in 12 months', 'info', CURRENT_TIMESTAMP),
('SP119', 'PROD022', 'common_adverse_effects', 'Nausea, diarrhea, vomiting', 'moderate', CURRENT_TIMESTAMP),
('SP120', 'PROD022', 'contraindications', 'Personal/family history of MTC, MEN2', 'critical', CURRENT_TIMESTAMP),
('SP121', 'PROD022', 'drug_interactions', 'Insulin, sulfonylureas', 'moderate', CURRENT_TIMESTAMP),
('SP122', 'PROD022', 'pregnancy_category', 'Insufficient data', 'moderate', CURRENT_TIMESTAMP),
('SP123', 'PROD022', 'addiction_potential', 'None', 'low', CURRENT_TIMESTAMP);

-- ============================================================================
-- Safety Scores for New Products
-- ============================================================================

INSERT OR IGNORE INTO safety_scores (score_id, product_id, authorization_score, efficacy_score, safety_score, distribution_score, total_score, safety_grade, created_at) VALUES
('SCR008', 'PROD008', 32, 18, 19, 13, 82, 'light_green', CURRENT_TIMESTAMP), -- Adipex-P
('SCR009', 'PROD009', 30, 17, 19, 13, 79, 'light_green', CURRENT_TIMESTAMP), -- Lomaira
('SCR010', 'PROD010', 33, 22, 20, 14, 89, 'light_green', CURRENT_TIMESTAMP), -- Qsymia
('SCR011', 'PROD011', 25, 20, 15, 10, 70, 'yellow', CURRENT_TIMESTAMP), -- Belviq (withdrawn)
('SCR012', 'PROD012', 25, 20, 15, 10, 70, 'yellow', CURRENT_TIMESTAMP), -- Belviq XR (withdrawn)
('SCR013', 'PROD013', 34, 24, 22, 14, 94, 'green', CURRENT_TIMESTAMP), -- Imcivree
('SCR014', 'PROD014', 30, 17, 21, 14, 82, 'light_green', CURRENT_TIMESTAMP), -- Glucophage
('SCR015', 'PROD015', 30, 17, 21, 14, 82, 'light_green', CURRENT_TIMESTAMP), -- Glucophage XR
('SCR016', 'PROD016', 28, 18, 19, 12, 77, 'light_green', CURRENT_TIMESTAMP), -- Oblean
('SCR017', 'PROD017', 28, 16, 18, 12, 74, 'light_green', CURRENT_TIMESTAMP), -- Tenuate
('SCR018', 'PROD018', 28, 16, 18, 12, 74, 'light_green', CURRENT_TIMESTAMP), -- Tenuate Dospan
('SCR019', 'PROD019', 27, 16, 17, 11, 71, 'yellow', CURRENT_TIMESTAMP), -- Didrex
('SCR020', 'PROD020', 27, 16, 17, 11, 71, 'yellow', CURRENT_TIMESTAMP), -- Bontril PDM
('SCR021', 'PROD021', 27, 16, 17, 11, 71, 'yellow', CURRENT_TIMESTAMP), -- Bontril SR
('SCR022', 'PROD022', 34, 20, 22, 14, 90, 'green', CURRENT_TIMESTAMP), -- Victoza
('SCR023', 'PROD023', 34, 23, 21, 14, 92, 'green', CURRENT_TIMESTAMP), -- Mounjaro 2.5mg
('SCR024', 'PROD024', 34, 23, 21, 14, 92, 'green', CURRENT_TIMESTAMP), -- Mounjaro 7.5mg
('SCR025', 'PROD025', 34, 23, 21, 14, 92, 'green', CURRENT_TIMESTAMP); -- Mounjaro 10mg
PRAGMA foreign_keys = ON;
