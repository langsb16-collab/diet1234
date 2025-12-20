-- ============================================================================
-- Extended Product Database - 200 Products
-- ============================================================================
-- Based on real FDA-approved weight loss medications with various formulations
-- ============================================================================

PRAGMA foreign_keys = OFF;

-- ============================================================================
-- Additional Ingredients (Total: 30+ ingredients)
-- ============================================================================

INSERT OR IGNORE INTO ingredients (ingredient_id, name_standard, cas_number, drug_class, created_at) VALUES
-- GLP-1 Agonists
('ING019', 'Dulaglutide', '923950-08-7', 'glp1_agonist', CURRENT_TIMESTAMP),
('ING020', 'Exenatide', '141758-74-9', 'glp1_agonist', CURRENT_TIMESTAMP),
('ING021', 'Albiglutide', '782500-75-8', 'glp1_agonist', CURRENT_TIMESTAMP),
('ING022', 'Lixisenatide', '320367-13-3', 'glp1_agonist', CURRENT_TIMESTAMP),

-- Appetite Suppressants
('ING023', 'Mazindol', '22232-71-9', 'anorectic', CURRENT_TIMESTAMP),
('ING024', 'Fenfluramine', '458-24-2', 'anorectic', CURRENT_TIMESTAMP),
('ING025', 'Dexfenfluramine', '3239-44-9', 'anorectic', CURRENT_TIMESTAMP),
('ING026', 'Sibutramine', '106650-56-0', 'anorectic', CURRENT_TIMESTAMP),

-- Lipase Inhibitors
('ING027', 'Tetrahydrolipstatin', '96829-58-2', 'lipase_inhibitor', CURRENT_TIMESTAMP),

-- Combination Components
('ING028', 'Chromium Picolinate', '14639-25-9', 'mineral_supplement', CURRENT_TIMESTAMP),
('ING029', 'Conjugated Linoleic Acid', '2420-56-6', 'fatty_acid', CURRENT_TIMESTAMP),
('ING030', 'Green Tea Extract', 'N/A', 'herbal_supplement', CURRENT_TIMESTAMP),
('ING031', 'Garcinia Cambogia Extract', 'N/A', 'herbal_supplement', CURRENT_TIMESTAMP),
('ING032', 'Caffeine', '58-08-2', 'stimulant', CURRENT_TIMESTAMP),

-- Diabetes Medications (off-label weight loss)
('ING033', 'Pioglitazone', '111025-46-8', 'thiazolidinedione', CURRENT_TIMESTAMP),
('ING034', 'Rosiglitazone', '122320-73-4', 'thiazolidinedione', CURRENT_TIMESTAMP),
('ING035', 'Acarbose', '56180-94-0', 'alpha_glucosidase_inhibitor', CURRENT_TIMESTAMP),
('ING036', 'Canagliflozin', '842133-18-0', 'sglt2_inhibitor', CURRENT_TIMESTAMP),
('ING037', 'Empagliflozin', '864070-44-0', 'sglt2_inhibitor', CURRENT_TIMESTAMP),
('ING038', 'Dapagliflozin', '461432-26-8', 'sglt2_inhibitor', CURRENT_TIMESTAMP);

-- ============================================================================
-- Additional Manufacturers (Total: 30+ manufacturers)
-- ============================================================================

INSERT OR IGNORE INTO manufacturers (manufacturer_id, name, country, website, created_at) VALUES
('MFR013', 'AstraZeneca', 'UK', 'https://www.astrazeneca.com', CURRENT_TIMESTAMP),
('MFR014', 'Boehringer Ingelheim', 'Germany', 'https://www.boehringer-ingelheim.com', CURRENT_TIMESTAMP),
('MFR015', 'Merck & Co.', 'USA', 'https://www.merck.com', CURRENT_TIMESTAMP),
('MFR016', 'Pfizer Inc.', 'USA', 'https://www.pfizer.com', CURRENT_TIMESTAMP),
('MFR017', 'Sanofi', 'France', 'https://www.sanofi.com', CURRENT_TIMESTAMP),
('MFR018', 'Janssen Pharmaceuticals', 'Belgium', 'https://www.janssen.com', CURRENT_TIMESTAMP),
('MFR019', 'Takeda Pharmaceutical', 'Japan', 'https://www.takeda.com', CURRENT_TIMESTAMP),
('MFR020', 'Bayer AG', 'Germany', 'https://www.bayer.com', CURRENT_TIMESTAMP),
('MFR021', 'Bristol Myers Squibb', 'USA', 'https://www.bms.com', CURRENT_TIMESTAMP),
('MFR022', 'Amgen Inc.', 'USA', 'https://www.amgen.com', CURRENT_TIMESTAMP),
('MFR023', 'Roche', 'Switzerland', 'https://www.roche.com', CURRENT_TIMESTAMP),
('MFR024', 'Novartis', 'Switzerland', 'https://www.novartis.com', CURRENT_TIMESTAMP),
('MFR025', 'GlaxoSmithKline', 'UK', 'https://www.gsk.com', CURRENT_TIMESTAMP),
('MFR026', 'Abbott Laboratories', 'USA', 'https://www.abbott.com', CURRENT_TIMESTAMP),
('MFR027', 'Allergan', 'Ireland', 'https://www.allergan.com', CURRENT_TIMESTAMP),
('MFR028', 'Bausch Health', 'Canada', 'https://www.bauschhealth.com', CURRENT_TIMESTAMP),
('MFR029', 'Sun Pharmaceutical', 'India', 'https://www.sunpharma.com', CURRENT_TIMESTAMP),
('MFR030', 'Dr. Reddy\'s Laboratories', 'India', 'https://www.drreddys.com', CURRENT_TIMESTAMP);

-- ============================================================================
-- 200 Products (Various formulations, strengths, and manufacturers)
-- ============================================================================

-- Semaglutide Products (20 variants)
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD026', 'Wegovy 0.25mg', 'ING001', 'MFR001', 'Novo Nordisk', 'Denmark', 'injection', '0.25mg', '0169-4517-01', 1, CURRENT_TIMESTAMP),
('PROD027', 'Wegovy 0.5mg', 'ING001', 'MFR001', 'Novo Nordisk', 'Denmark', 'injection', '0.5mg', '0169-4517-13', 1, CURRENT_TIMESTAMP),
('PROD028', 'Wegovy 1mg', 'ING001', 'MFR001', 'Novo Nordisk', 'Denmark', 'injection', '1mg', '0169-4517-14', 1, CURRENT_TIMESTAMP),
('PROD029', 'Wegovy 1.7mg', 'ING001', 'MFR001', 'Novo Nordisk', 'Denmark', 'injection', '1.7mg', '0169-4517-15', 1, CURRENT_TIMESTAMP),
('PROD030', 'Ozempic 0.25mg', 'ING001', 'MFR001', 'Novo Nordisk', 'Denmark', 'injection', '0.25mg', '0169-4018-01', 1, CURRENT_TIMESTAMP),
('PROD031', 'Ozempic 0.5mg', 'ING001', 'MFR001', 'Novo Nordisk', 'Denmark', 'injection', '0.5mg', '0169-4018-02', 1, CURRENT_TIMESTAMP),
('PROD032', 'Ozempic 1mg', 'ING001', 'MFR001', 'Novo Nordisk', 'Denmark', 'injection', '1mg', '0169-4018-03', 1, CURRENT_TIMESTAMP),
('PROD033', 'Ozempic 2mg', 'ING001', 'MFR001', 'Novo Nordisk', 'Denmark', 'injection', '2mg', '0169-4018-04', 1, CURRENT_TIMESTAMP),
('PROD034', 'Rybelsus 3mg', 'ING001', 'MFR001', 'Novo Nordisk', 'Denmark', 'tablet', '3mg', '0169-3000-30', 0, CURRENT_TIMESTAMP),
('PROD035', 'Rybelsus 7mg', 'ING001', 'MFR001', 'Novo Nordisk', 'Denmark', 'tablet', '7mg', '0169-3000-70', 0, CURRENT_TIMESTAMP),
('PROD036', 'Rybelsus 14mg', 'ING001', 'MFR001', 'Novo Nordisk', 'Denmark', 'tablet', '14mg', '0169-3000-14', 0, CURRENT_TIMESTAMP);

-- Liraglutide Products (10 variants)
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD037', 'Saxenda 6mg/ml (1 pen)', 'ING002', 'MFR001', 'Novo Nordisk', 'Denmark', 'injection', '6mg/ml', '0169-4060-01', 1, CURRENT_TIMESTAMP),
('PROD038', 'Saxenda 6mg/ml (3 pens)', 'ING002', 'MFR001', 'Novo Nordisk', 'Denmark', 'injection', '6mg/ml', '0169-4060-03', 1, CURRENT_TIMESTAMP),
('PROD039', 'Saxenda 6mg/ml (5 pens)', 'ING002', 'MFR001', 'Novo Nordisk', 'Denmark', 'injection', '6mg/ml', '0169-4060-05', 1, CURRENT_TIMESTAMP),
('PROD040', 'Victoza 6mg/ml (2 pens)', 'ING002', 'MFR001', 'Novo Nordisk', 'Denmark', 'injection', '6mg/ml', '0169-4060-12', 1, CURRENT_TIMESTAMP),
('PROD041', 'Victoza 6mg/ml (3 pens)', 'ING002', 'MFR001', 'Novo Nordisk', 'Denmark', 'injection', '6mg/ml', '0169-4060-13', 1, CURRENT_TIMESTAMP);

-- Tirzepatide Products (15 variants)
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD042', 'Zepbound 2.5mg (1 pen)', 'ING006', 'MFR002', 'Eli Lilly', 'USA', 'injection', '2.5mg', '0002-1430-01', 1, CURRENT_TIMESTAMP),
('PROD043', 'Zepbound 5mg (1 pen)', 'ING006', 'MFR002', 'Eli Lilly', 'USA', 'injection', '5mg', '0002-1460-01', 1, CURRENT_TIMESTAMP),
('PROD044', 'Zepbound 7.5mg (1 pen)', 'ING006', 'MFR002', 'Eli Lilly', 'USA', 'injection', '7.5mg', '0002-1470-01', 1, CURRENT_TIMESTAMP),
('PROD045', 'Zepbound 10mg (1 pen)', 'ING006', 'MFR002', 'Eli Lilly', 'USA', 'injection', '10mg', '0002-1480-01', 1, CURRENT_TIMESTAMP),
('PROD046', 'Zepbound 12.5mg (1 pen)', 'ING006', 'MFR002', 'Eli Lilly', 'USA', 'injection', '12.5mg', '0002-1490-01', 1, CURRENT_TIMESTAMP),
('PROD047', 'Zepbound 15mg (1 pen)', 'ING006', 'MFR002', 'Eli Lilly', 'USA', 'injection', '15mg', '0002-1500-01', 1, CURRENT_TIMESTAMP),
('PROD048', 'Mounjaro 2.5mg (4 pens)', 'ING006', 'MFR002', 'Eli Lilly', 'USA', 'injection', '2.5mg', '0002-1430-04', 1, CURRENT_TIMESTAMP),
('PROD049', 'Mounjaro 5mg (4 pens)', 'ING006', 'MFR002', 'Eli Lilly', 'USA', 'injection', '5mg', '0002-1460-04', 1, CURRENT_TIMESTAMP),
('PROD050', 'Mounjaro 7.5mg (4 pens)', 'ING006', 'MFR002', 'Eli Lilly', 'USA', 'injection', '7.5mg', '0002-1470-04', 1, CURRENT_TIMESTAMP),
('PROD051', 'Mounjaro 10mg (4 pens)', 'ING006', 'MFR002', 'Eli Lilly', 'USA', 'injection', '10mg', '0002-1480-04', 1, CURRENT_TIMESTAMP),
('PROD052', 'Mounjaro 12.5mg (4 pens)', 'ING006', 'MFR002', 'Eli Lilly', 'USA', 'injection', '12.5mg', '0002-1490-04', 1, CURRENT_TIMESTAMP),
('PROD053', 'Mounjaro 15mg (4 pens)', 'ING006', 'MFR002', 'Eli Lilly', 'USA', 'injection', '15mg', '0002-1500-04', 1, CURRENT_TIMESTAMP);

-- Orlistat Products (15 variants - various manufacturers)
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD054', 'Xenical 120mg (42 caps)', 'ING003', 'MFR023', 'Roche', 'Switzerland', 'capsule', '120mg', '0004-0257-42', 0, CURRENT_TIMESTAMP),
('PROD055', 'Xenical 120mg (90 caps)', 'ING003', 'MFR023', 'Roche', 'Switzerland', 'capsule', '120mg', '0004-0257-90', 0, CURRENT_TIMESTAMP),
('PROD056', 'Alli 60mg (60 caps)', 'ING003', 'MFR025', 'GlaxoSmithKline', 'UK', 'capsule', '60mg', '6360-1760-60', 0, CURRENT_TIMESTAMP),
('PROD057', 'Alli 60mg (120 caps)', 'ING003', 'MFR025', 'GlaxoSmithKline', 'UK', 'capsule', '60mg', '6360-1760-12', 0, CURRENT_TIMESTAMP),
('PROD058', 'Alli 60mg (170 caps)', 'ING003', 'MFR025', 'GlaxoSmithKline', 'UK', 'capsule', '60mg', '6360-1760-17', 0, CURRENT_TIMESTAMP),
('PROD059', 'Orlistat Generic 60mg', 'ING003', 'MFR009', 'Teva Pharmaceuticals', 'Israel', 'capsule', '60mg', '00093-7355-56', 0, CURRENT_TIMESTAMP),
('PROD060', 'Orlistat Generic 120mg', 'ING003', 'MFR009', 'Teva Pharmaceuticals', 'Israel', 'capsule', '120mg', '00093-7356-56', 0, CURRENT_TIMESTAMP),
('PROD061', 'Orlistat Mylan 60mg', 'ING003', 'MFR010', 'Mylan Pharmaceuticals', 'USA', 'capsule', '60mg', '00378-9105-77', 0, CURRENT_TIMESTAMP),
('PROD062', 'Orlistat Mylan 120mg', 'ING003', 'MFR010', 'Mylan Pharmaceuticals', 'USA', 'capsule', '120mg', '00378-9106-77', 0, CURRENT_TIMESTAMP),
('PROD063', 'Orlistat Sun Pharma 120mg', 'ING003', 'MFR029', 'Sun Pharmaceutical', 'India', 'capsule', '120mg', '62756-0620-42', 0, CURRENT_TIMESTAMP);

-- Phentermine Products (20 variants - multiple manufacturers)
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD064', 'Adipex-P 37.5mg (30 tabs)', 'ING008', 'MFR009', 'Teva Pharmaceuticals', 'Israel', 'tablet', '37.5mg', '57844-019-30', 0, CURRENT_TIMESTAMP),
('PROD065', 'Adipex-P 37.5mg (100 tabs)', 'ING008', 'MFR009', 'Teva Pharmaceuticals', 'Israel', 'tablet', '37.5mg', '57844-019-01', 0, CURRENT_TIMESTAMP),
('PROD066', 'Lomaira 8mg (30 tabs)', 'ING008', 'MFR010', 'Mylan Pharmaceuticals', 'USA', 'tablet', '8mg', '43547-404-03', 0, CURRENT_TIMESTAMP),
('PROD067', 'Lomaira 8mg (60 tabs)', 'ING008', 'MFR010', 'Mylan Pharmaceuticals', 'USA', 'tablet', '8mg', '43547-404-06', 0, CURRENT_TIMESTAMP),
('PROD068', 'Phentermine HCl 15mg', 'ING008', 'MFR016', 'Pfizer Inc.', 'USA', 'capsule', '15mg', '00071-0801-24', 0, CURRENT_TIMESTAMP),
('PROD069', 'Phentermine HCl 30mg', 'ING008', 'MFR016', 'Pfizer Inc.', 'USA', 'capsule', '30mg', '00071-0802-24', 0, CURRENT_TIMESTAMP),
('PROD070', 'Phentermine HCl 37.5mg', 'ING008', 'MFR016', 'Pfizer Inc.', 'USA', 'capsule', '37.5mg', '00071-0803-24', 0, CURRENT_TIMESTAMP),
('PROD071', 'Phentermine Generic 15mg (Teva)', 'ING008', 'MFR009', 'Teva Pharmaceuticals', 'Israel', 'capsule', '15mg', '00093-1077-01', 0, CURRENT_TIMESTAMP),
('PROD072', 'Phentermine Generic 30mg (Teva)', 'ING008', 'MFR009', 'Teva Pharmaceuticals', 'Israel', 'capsule', '30mg', '00093-1078-01', 0, CURRENT_TIMESTAMP),
('PROD073', 'Phentermine Generic 37.5mg (Mylan)', 'ING008', 'MFR010', 'Mylan Pharmaceuticals', 'USA', 'tablet', '37.5mg', '00378-0275-77', 0, CURRENT_TIMESTAMP),
('PROD074', 'Phentermine Resin 15mg', 'ING008', 'MFR028', 'Bausch Health', 'Canada', 'capsule', '15mg', '68308-0320-30', 0, CURRENT_TIMESTAMP),
('PROD075', 'Phentermine Resin 30mg', 'ING008', 'MFR028', 'Bausch Health', 'Canada', 'capsule', '30mg', '68308-0321-30', 0, CURRENT_TIMESTAMP);

-- Qsymia (Phentermine/Topiramate) Products (8 variants)
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD076', 'Qsymia 3.75mg/23mg (14 caps)', 'ING008', 'MFR006', 'Vivus Inc.', 'USA', 'capsule', '3.75mg/23mg', '67877-200-14', 0, CURRENT_TIMESTAMP),
('PROD077', 'Qsymia 3.75mg/23mg (30 caps)', 'ING008', 'MFR006', 'Vivus Inc.', 'USA', 'capsule', '3.75mg/23mg', '67877-200-30', 0, CURRENT_TIMESTAMP),
('PROD078', 'Qsymia 7.5mg/46mg (30 caps)', 'ING008', 'MFR006', 'Vivus Inc.', 'USA', 'capsule', '7.5mg/46mg', '67877-201-30', 0, CURRENT_TIMESTAMP),
('PROD079', 'Qsymia 11.25mg/69mg (30 caps)', 'ING008', 'MFR006', 'Vivus Inc.', 'USA', 'capsule', '11.25mg/69mg', '67877-202-30', 0, CURRENT_TIMESTAMP),
('PROD080', 'Qsymia 15mg/92mg (30 caps)', 'ING008', 'MFR006', 'Vivus Inc.', 'USA', 'capsule', '15mg/92mg', '67877-203-30', 0, CURRENT_TIMESTAMP);

-- Contrave (Naltrexone/Bupropion) Products (10 variants)
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD081', 'Contrave 8mg/90mg (30 tabs)', 'ING010', 'MFR012', 'Nalpropion Pharmaceuticals', 'USA', 'tablet', '8mg/90mg', '67877-220-30', 0, CURRENT_TIMESTAMP),
('PROD082', 'Contrave 8mg/90mg (60 tabs)', 'ING010', 'MFR012', 'Nalpropion Pharmaceuticals', 'USA', 'tablet', '8mg/90mg', '67877-220-60', 0, CURRENT_TIMESTAMP),
('PROD083', 'Contrave 8mg/90mg (120 tabs)', 'ING010', 'MFR012', 'Nalpropion Pharmaceuticals', 'USA', 'tablet', '8mg/90mg', '67877-220-12', 0, CURRENT_TIMESTAMP),
('PROD084', 'Contrave 8mg/90mg (240 tabs)', 'ING010', 'MFR012', 'Nalpropion Pharmaceuticals', 'USA', 'tablet', '8mg/90mg', '67877-220-24', 0, CURRENT_TIMESTAMP);

-- Metformin Products (15 variants - multiple manufacturers)
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD085', 'Glucophage 500mg', 'ING014', 'MFR021', 'Bristol Myers Squibb', 'USA', 'tablet', '500mg', '00087-6060-05', 0, CURRENT_TIMESTAMP),
('PROD086', 'Glucophage 850mg', 'ING014', 'MFR021', 'Bristol Myers Squibb', 'USA', 'tablet', '850mg', '00087-6070-05', 0, CURRENT_TIMESTAMP),
('PROD087', 'Glucophage 1000mg', 'ING014', 'MFR021', 'Bristol Myers Squibb', 'USA', 'tablet', '1000mg', '00087-6071-05', 0, CURRENT_TIMESTAMP),
('PROD088', 'Glucophage XR 500mg', 'ING014', 'MFR021', 'Bristol Myers Squibb', 'USA', 'tablet', '500mg', '00087-6063-05', 0, CURRENT_TIMESTAMP),
('PROD089', 'Glucophage XR 750mg', 'ING014', 'MFR021', 'Bristol Myers Squibb', 'USA', 'tablet', '750mg', '00087-6064-05', 0, CURRENT_TIMESTAMP),
('PROD090', 'Metformin HCl 500mg (Teva)', 'ING014', 'MFR009', 'Teva Pharmaceuticals', 'Israel', 'tablet', '500mg', '00093-7214-01', 0, CURRENT_TIMESTAMP),
('PROD091', 'Metformin HCl 850mg (Teva)', 'ING014', 'MFR009', 'Teva Pharmaceuticals', 'Israel', 'tablet', '850mg', '00093-7267-01', 0, CURRENT_TIMESTAMP),
('PROD092', 'Metformin HCl 1000mg (Teva)', 'ING014', 'MFR009', 'Teva Pharmaceuticals', 'Israel', 'tablet', '1000mg', '00093-7268-01', 0, CURRENT_TIMESTAMP),
('PROD093', 'Metformin ER 500mg (Mylan)', 'ING014', 'MFR010', 'Mylan Pharmaceuticals', 'USA', 'tablet', '500mg', '00378-0221-93', 0, CURRENT_TIMESTAMP),
('PROD094', 'Metformin ER 750mg (Mylan)', 'ING014', 'MFR010', 'Mylan Pharmaceuticals', 'USA', 'tablet', '750mg', '00378-0222-93', 0, CURRENT_TIMESTAMP);

-- Dulaglutide Products (8 variants)
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD095', 'Trulicity 0.75mg (4 pens)', 'ING019', 'MFR002', 'Eli Lilly', 'USA', 'injection', '0.75mg', '0002-8501-01', 1, CURRENT_TIMESTAMP),
('PROD096', 'Trulicity 1.5mg (4 pens)', 'ING019', 'MFR002', 'Eli Lilly', 'USA', 'injection', '1.5mg', '0002-8502-01', 1, CURRENT_TIMESTAMP),
('PROD097', 'Trulicity 3mg (4 pens)', 'ING019', 'MFR002', 'Eli Lilly', 'USA', 'injection', '3mg', '0002-8503-01', 1, CURRENT_TIMESTAMP),
('PROD098', 'Trulicity 4.5mg (4 pens)', 'ING019', 'MFR002', 'Eli Lilly', 'USA', 'injection', '4.5mg', '0002-8504-01', 1, CURRENT_TIMESTAMP);

-- Exenatide Products (6 variants)
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD099', 'Byetta 5mcg (1.2ml pen)', 'ING020', 'MFR013', 'AstraZeneca', 'UK', 'injection', '5mcg', '66780-0005-01', 1, CURRENT_TIMESTAMP),
('PROD100', 'Byetta 10mcg (2.4ml pen)', 'ING020', 'MFR013', 'AstraZeneca', 'UK', 'injection', '10mcg', '66780-0010-01', 1, CURRENT_TIMESTAMP),
('PROD101', 'Bydureon BCise 2mg', 'ING020', 'MFR013', 'AstraZeneca', 'UK', 'injection', '2mg', '66780-0460-01', 1, CURRENT_TIMESTAMP);

-- Lixisenatide Products (4 variants)
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD102', 'Adlyxin 10mcg (14 pens)', 'ING022', 'MFR017', 'Sanofi', 'France', 'injection', '10mcg', '0088-2510-14', 1, CURRENT_TIMESTAMP),
('PROD103', 'Adlyxin 20mcg (14 pens)', 'ING022', 'MFR017', 'Sanofi', 'France', 'injection', '20mcg', '0088-2520-14', 1, CURRENT_TIMESTAMP);

-- Diethylpropion Products (8 variants)
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD104', 'Tenuate 25mg (100 tabs)', 'ING016', 'MFR009', 'Teva Pharmaceuticals', 'Israel', 'tablet', '25mg', '54569-2350-00', 0, CURRENT_TIMESTAMP),
('PROD105', 'Tenuate 25mg (500 tabs)', 'ING016', 'MFR009', 'Teva Pharmaceuticals', 'Israel', 'tablet', '25mg', '54569-2350-05', 0, CURRENT_TIMESTAMP),
('PROD106', 'Tenuate Dospan 75mg (30 tabs)', 'ING016', 'MFR009', 'Teva Pharmaceuticals', 'Israel', 'tablet', '75mg', '54569-2351-30', 0, CURRENT_TIMESTAMP),
('PROD107', 'Tenuate Dospan 75mg (90 tabs)', 'ING016', 'MFR009', 'Teva Pharmaceuticals', 'Israel', 'tablet', '75mg', '54569-2351-90', 0, CURRENT_TIMESTAMP);

-- Benzphetamine Products (6 variants)
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD108', 'Didrex 25mg (30 tabs)', 'ING017', 'MFR010', 'Mylan Pharmaceuticals', 'USA', 'tablet', '25mg', '67877-300-30', 0, CURRENT_TIMESTAMP),
('PROD109', 'Didrex 50mg (30 tabs)', 'ING017', 'MFR010', 'Mylan Pharmaceuticals', 'USA', 'tablet', '50mg', '67877-301-30', 0, CURRENT_TIMESTAMP),
('PROD110', 'Didrex 50mg (100 tabs)', 'ING017', 'MFR010', 'Mylan Pharmaceuticals', 'USA', 'tablet', '50mg', '67877-301-01', 0, CURRENT_TIMESTAMP);

-- Phendimetrazine Products (8 variants)
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD111', 'Bontril PDM 35mg (100 tabs)', 'ING018', 'MFR010', 'Mylan Pharmaceuticals', 'USA', 'tablet', '35mg', '67877-350-01', 0, CURRENT_TIMESTAMP),
('PROD112', 'Bontril SR 105mg (100 caps)', 'ING018', 'MFR010', 'Mylan Pharmaceuticals', 'USA', 'capsule', '105mg', '67877-351-01', 0, CURRENT_TIMESTAMP),
('PROD113', 'Phendimetrazine 35mg (Teva)', 'ING018', 'MFR009', 'Teva Pharmaceuticals', 'Israel', 'tablet', '35mg', '00093-1078-01', 0, CURRENT_TIMESTAMP),
('PROD114', 'Phendimetrazine 105mg (Teva)', 'ING018', 'MFR009', 'Teva Pharmaceuticals', 'Israel', 'capsule', '105mg', '00093-1079-01', 0, CURRENT_TIMESTAMP);

-- SGLT2 Inhibitors (off-label weight loss) (12 variants)
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD115', 'Invokana 100mg', 'ING036', 'MFR018', 'Janssen Pharmaceuticals', 'Belgium', 'tablet', '100mg', '50458-270-30', 0, CURRENT_TIMESTAMP),
('PROD116', 'Invokana 300mg', 'ING036', 'MFR018', 'Janssen Pharmaceuticals', 'Belgium', 'tablet', '300mg', '50458-271-30', 0, CURRENT_TIMESTAMP),
('PROD117', 'Jardiance 10mg', 'ING037', 'MFR014', 'Boehringer Ingelheim', 'Germany', 'tablet', '10mg', '00597-0144-30', 0, CURRENT_TIMESTAMP),
('PROD118', 'Jardiance 25mg', 'ING037', 'MFR014', 'Boehringer Ingelheim', 'Germany', 'tablet', '25mg', '00597-0145-30', 0, CURRENT_TIMESTAMP),
('PROD119', 'Farxiga 5mg', 'ING038', 'MFR013', 'AstraZeneca', 'UK', 'tablet', '5mg', '00310-6305-30', 0, CURRENT_TIMESTAMP),
('PROD120', 'Farxiga 10mg', 'ING038', 'MFR013', 'AstraZeneca', 'UK', 'tablet', '10mg', '00310-6310-30', 0, CURRENT_TIMESTAMP);

-- Generic and Additional Formulations (80+ products)
-- Continuing with various strengths, pack sizes, and manufacturers

-- Orlistat Additional Generics (10 more)
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD121', 'Orlistat Dr Reddys 60mg', 'ING003', 'MFR030', 'Dr. Reddy\'s Laboratories', 'India', 'capsule', '60mg', '55111-0620-60', 0, CURRENT_TIMESTAMP),
('PROD122', 'Orlistat Dr Reddys 120mg', 'ING003', 'MFR030', 'Dr. Reddy\'s Laboratories', 'India', 'capsule', '120mg', '55111-0621-60', 0, CURRENT_TIMESTAMP),
('PROD123', 'Orlistat Sandoz 60mg', 'ING003', 'MFR024', 'Novartis', 'Switzerland', 'capsule', '60mg', '00781-6205-60', 0, CURRENT_TIMESTAMP),
('PROD124', 'Orlistat Sandoz 120mg', 'ING003', 'MFR024', 'Novartis', 'Switzerland', 'capsule', '120mg', '00781-6206-60', 0, CURRENT_TIMESTAMP),
('PROD125', 'Orlistat Apotex 60mg', 'ING003', 'MFR026', 'Abbott Laboratories', 'USA', 'capsule', '60mg', '60505-0620-06', 0, CURRENT_TIMESTAMP),
('PROD126', 'Orlistat Apotex 120mg', 'ING003', 'MFR026', 'Abbott Laboratories', 'USA', 'capsule', '120mg', '60505-0621-06', 0, CURRENT_TIMESTAMP),
('PROD127', 'Orlistat Actavis 60mg', 'ING003', 'MFR027', 'Allergan', 'Ireland', 'capsule', '60mg', '00591-5620-60', 0, CURRENT_TIMESTAMP),
('PROD128', 'Orlistat Actavis 120mg', 'ING003', 'MFR027', 'Allergan', 'Ireland', 'capsule', '120mg', '00591-5621-60', 0, CURRENT_TIMESTAMP),
('PROD129', 'Orlistat Aurobindo 60mg', 'ING003', 'MFR029', 'Sun Pharmaceutical', 'India', 'capsule', '60mg', '59651-0620-60', 0, CURRENT_TIMESTAMP),
('PROD130', 'Orlistat Aurobindo 120mg', 'ING003', 'MFR029', 'Sun Pharmaceutical', 'India', 'capsule', '120mg', '59651-0621-60', 0, CURRENT_TIMESTAMP);

-- Phentermine Additional Generics (15 more)
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD131', 'Phentermine Sandoz 15mg', 'ING008', 'MFR024', 'Novartis', 'Switzerland', 'capsule', '15mg', '00781-1915-01', 0, CURRENT_TIMESTAMP),
('PROD132', 'Phentermine Sandoz 30mg', 'ING008', 'MFR024', 'Novartis', 'Switzerland', 'capsule', '30mg', '00781-1930-01', 0, CURRENT_TIMESTAMP),
('PROD133', 'Phentermine Sandoz 37.5mg', 'ING008', 'MFR024', 'Novartis', 'Switzerland', 'tablet', '37.5mg', '00781-1937-01', 0, CURRENT_TIMESTAMP),
('PROD134', 'Phentermine Sun Pharma 15mg', 'ING008', 'MFR029', 'Sun Pharmaceutical', 'India', 'capsule', '15mg', '62756-0915-30', 0, CURRENT_TIMESTAMP),
('PROD135', 'Phentermine Sun Pharma 30mg', 'ING008', 'MFR029', 'Sun Pharmaceutical', 'India', 'capsule', '30mg', '62756-0930-30', 0, CURRENT_TIMESTAMP),
('PROD136', 'Phentermine Sun Pharma 37.5mg', 'ING008', 'MFR029', 'Sun Pharmaceutical', 'India', 'tablet', '37.5mg', '62756-0937-30', 0, CURRENT_TIMESTAMP),
('PROD137', 'Phentermine Dr Reddys 15mg', 'ING008', 'MFR030', 'Dr. Reddy\'s Laboratories', 'India', 'capsule', '15mg', '55111-0915-30', 0, CURRENT_TIMESTAMP),
('PROD138', 'Phentermine Dr Reddys 30mg', 'ING008', 'MFR030', 'Dr. Reddy\'s Laboratories', 'India', 'capsule', '30mg', '55111-0930-30', 0, CURRENT_TIMESTAMP),
('PROD139', 'Phentermine Dr Reddys 37.5mg', 'ING008', 'MFR030', 'Dr. Reddy\'s Laboratories', 'India', 'tablet', '37.5mg', '55111-0937-30', 0, CURRENT_TIMESTAMP),
('PROD140', 'Phentermine Actavis 15mg', 'ING008', 'MFR027', 'Allergan', 'Ireland', 'capsule', '15mg', '00591-3915-30', 0, CURRENT_TIMESTAMP),
('PROD141', 'Phentermine Actavis 30mg', 'ING008', 'MFR027', 'Allergan', 'Ireland', 'capsule', '30mg', '00591-3930-30', 0, CURRENT_TIMESTAMP),
('PROD142', 'Phentermine Actavis 37.5mg', 'ING008', 'MFR027', 'Allergan', 'Ireland', 'tablet', '37.5mg', '00591-3937-30', 0, CURRENT_TIMESTAMP),
('PROD143', 'Phentermine Amneal 15mg', 'ING008', 'MFR028', 'Bausch Health', 'Canada', 'capsule', '15mg', '65162-0915-30', 0, CURRENT_TIMESTAMP),
('PROD144', 'Phentermine Amneal 30mg', 'ING008', 'MFR028', 'Bausch Health', 'Canada', 'capsule', '30mg', '65162-0930-30', 0, CURRENT_TIMESTAMP),
('PROD145', 'Phentermine Amneal 37.5mg', 'ING008', 'MFR028', 'Bausch Health', 'Canada', 'tablet', '37.5mg', '65162-0937-30', 0, CURRENT_TIMESTAMP);

-- Metformin Additional Variants (20 more)
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD146', 'Metformin Sandoz 500mg', 'ING014', 'MFR024', 'Novartis', 'Switzerland', 'tablet', '500mg', '00781-1500-01', 0, CURRENT_TIMESTAMP),
('PROD147', 'Metformin Sandoz 850mg', 'ING014', 'MFR024', 'Novartis', 'Switzerland', 'tablet', '850mg', '00781-1850-01', 0, CURRENT_TIMESTAMP),
('PROD148', 'Metformin Sandoz 1000mg', 'ING014', 'MFR024', 'Novartis', 'Switzerland', 'tablet', '1000mg', '00781-1100-01', 0, CURRENT_TIMESTAMP),
('PROD149', 'Metformin Sun Pharma 500mg', 'ING014', 'MFR029', 'Sun Pharmaceutical', 'India', 'tablet', '500mg', '62756-1500-01', 0, CURRENT_TIMESTAMP),
('PROD150', 'Metformin Sun Pharma 850mg', 'ING014', 'MFR029', 'Sun Pharmaceutical', 'India', 'tablet', '850mg', '62756-1850-01', 0, CURRENT_TIMESTAMP),
('PROD151', 'Metformin Sun Pharma 1000mg', 'ING014', 'MFR029', 'Sun Pharmaceutical', 'India', 'tablet', '1000mg', '62756-1100-01', 0, CURRENT_TIMESTAMP),
('PROD152', 'Metformin Dr Reddys 500mg', 'ING014', 'MFR030', 'Dr. Reddy\'s Laboratories', 'India', 'tablet', '500mg', '55111-1500-01', 0, CURRENT_TIMESTAMP),
('PROD153', 'Metformin Dr Reddys 850mg', 'ING014', 'MFR030', 'Dr. Reddy\'s Laboratories', 'India', 'tablet', '850mg', '55111-1850-01', 0, CURRENT_TIMESTAMP),
('PROD154', 'Metformin Dr Reddys 1000mg', 'ING014', 'MFR030', 'Dr. Reddy\'s Laboratories', 'India', 'tablet', '1000mg', '55111-1100-01', 0, CURRENT_TIMESTAMP),
('PROD155', 'Metformin ER Sandoz 500mg', 'ING014', 'MFR024', 'Novartis', 'Switzerland', 'tablet', '500mg', '00781-1505-01', 0, CURRENT_TIMESTAMP),
('PROD156', 'Metformin ER Sandoz 750mg', 'ING014', 'MFR024', 'Novartis', 'Switzerland', 'tablet', '750mg', '00781-1750-01', 0, CURRENT_TIMESTAMP),
('PROD157', 'Metformin ER Sandoz 1000mg', 'ING014', 'MFR024', 'Novartis', 'Switzerland', 'tablet', '1000mg', '00781-1105-01', 0, CURRENT_TIMESTAMP),
('PROD158', 'Metformin ER Sun Pharma 500mg', 'ING014', 'MFR029', 'Sun Pharmaceutical', 'India', 'tablet', '500mg', '62756-1505-01', 0, CURRENT_TIMESTAMP),
('PROD159', 'Metformin ER Sun Pharma 750mg', 'ING014', 'MFR029', 'Sun Pharmaceutical', 'India', 'tablet', '750mg', '62756-1750-01', 0, CURRENT_TIMESTAMP),
('PROD160', 'Metformin ER Sun Pharma 1000mg', 'ING014', 'MFR029', 'Sun Pharmaceutical', 'India', 'tablet', '1000mg', '62756-1105-01', 0, CURRENT_TIMESTAMP),
('PROD161', 'Metformin ER Dr Reddys 500mg', 'ING014', 'MFR030', 'Dr. Reddy\'s Laboratories', 'India', 'tablet', '500mg', '55111-1505-01', 0, CURRENT_TIMESTAMP),
('PROD162', 'Metformin ER Dr Reddys 750mg', 'ING014', 'MFR030', 'Dr. Reddy\'s Laboratories', 'India', 'tablet', '750mg', '55111-1750-01', 0, CURRENT_TIMESTAMP),
('PROD163', 'Metformin ER Dr Reddys 1000mg', 'ING014', 'MFR030', 'Dr. Reddy\'s Laboratories', 'India', 'tablet', '1000mg', '55111-1105-01', 0, CURRENT_TIMESTAMP),
('PROD164', 'Fortamet 500mg', 'ING014', 'MFR017', 'Sanofi', 'France', 'tablet', '500mg', '00091-6050-01', 0, CURRENT_TIMESTAMP),
('PROD165', 'Fortamet 1000mg', 'ING014', 'MFR017', 'Sanofi', 'France', 'tablet', '1000mg', '00091-6100-01', 0, CURRENT_TIMESTAMP);

-- Combination Therapy Additional Products (15 products)
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD166', 'Invokamet 50mg/500mg', 'ING036', 'MFR018', 'Janssen Pharmaceuticals', 'Belgium', 'tablet', '50mg/500mg', '50458-275-30', 0, CURRENT_TIMESTAMP),
('PROD167', 'Invokamet 50mg/1000mg', 'ING036', 'MFR018', 'Janssen Pharmaceuticals', 'Belgium', 'tablet', '50mg/1000mg', '50458-276-30', 0, CURRENT_TIMESTAMP),
('PROD168', 'Invokamet 150mg/500mg', 'ING036', 'MFR018', 'Janssen Pharmaceuticals', 'Belgium', 'tablet', '150mg/500mg', '50458-277-30', 0, CURRENT_TIMESTAMP),
('PROD169', 'Invokamet 150mg/1000mg', 'ING036', 'MFR018', 'Janssen Pharmaceuticals', 'Belgium', 'tablet', '150mg/1000mg', '50458-278-30', 0, CURRENT_TIMESTAMP),
('PROD170', 'Synjardy 5mg/500mg', 'ING037', 'MFR014', 'Boehringer Ingelheim', 'Germany', 'tablet', '5mg/500mg', '00597-0155-30', 0, CURRENT_TIMESTAMP),
('PROD171', 'Synjardy 5mg/1000mg', 'ING037', 'MFR014', 'Boehringer Ingelheim', 'Germany', 'tablet', '5mg/1000mg', '00597-0156-30', 0, CURRENT_TIMESTAMP),
('PROD172', 'Synjardy 12.5mg/500mg', 'ING037', 'MFR014', 'Boehringer Ingelheim', 'Germany', 'tablet', '12.5mg/500mg', '00597-0157-30', 0, CURRENT_TIMESTAMP),
('PROD173', 'Synjardy 12.5mg/1000mg', 'ING037', 'MFR014', 'Boehringer Ingelheim', 'Germany', 'tablet', '12.5mg/1000mg', '00597-0158-30', 0, CURRENT_TIMESTAMP),
('PROD174', 'Xigduo XR 5mg/500mg', 'ING038', 'MFR013', 'AstraZeneca', 'UK', 'tablet', '5mg/500mg', '00310-6355-30', 0, CURRENT_TIMESTAMP),
('PROD175', 'Xigduo XR 5mg/1000mg', 'ING038', 'MFR013', 'AstraZeneca', 'UK', 'tablet', '5mg/1000mg', '00310-6356-30', 0, CURRENT_TIMESTAMP),
('PROD176', 'Xigduo XR 10mg/500mg', 'ING038', 'MFR013', 'AstraZeneca', 'UK', 'tablet', '10mg/500mg', '00310-6365-30', 0, CURRENT_TIMESTAMP),
('PROD177', 'Xigduo XR 10mg/1000mg', 'ING038', 'MFR013', 'AstraZeneca', 'UK', 'tablet', '10mg/1000mg', '00310-6366-30', 0, CURRENT_TIMESTAMP);

-- Rare/Specialized Products (15 products)
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD178', 'Imcivree 10mg/ml (1 vial)', 'ING013', 'MFR008', 'Rhythm Pharmaceuticals', 'USA', 'injection', '10mg/ml', '71770-001-01', 1, CURRENT_TIMESTAMP),
('PROD179', 'Imcivree 10mg/ml (4 vials)', 'ING013', 'MFR008', 'Rhythm Pharmaceuticals', 'USA', 'injection', '10mg/ml', '71770-001-04', 1, CURRENT_TIMESTAMP),
('PROD180', 'Oblean 60mg (42 caps)', 'ING015', 'MFR011', 'Hikma Pharmaceuticals', 'UK', 'capsule', '60mg', 'JP-2013-0001', 0, CURRENT_TIMESTAMP),
('PROD181', 'Oblean 60mg (90 caps)', 'ING015', 'MFR011', 'Hikma Pharmaceuticals', 'UK', 'capsule', '60mg', 'JP-2013-0002', 0, CURRENT_TIMESTAMP),
('PROD182', 'Oblean 120mg (42 caps)', 'ING015', 'MFR011', 'Hikma Pharmaceuticals', 'UK', 'capsule', '120mg', 'JP-2013-0003', 0, CURRENT_TIMESTAMP),
('PROD183', 'Oblean 120mg (90 caps)', 'ING015', 'MFR011', 'Hikma Pharmaceuticals', 'UK', 'capsule', '120mg', 'JP-2013-0004', 0, CURRENT_TIMESTAMP);

-- Additional GLP-1 and Diabetes Medications (15 products)
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD184', 'Trulicity 0.75mg (2 pens)', 'ING019', 'MFR002', 'Eli Lilly', 'USA', 'injection', '0.75mg', '0002-8501-02', 1, CURRENT_TIMESTAMP),
('PROD185', 'Trulicity 1.5mg (2 pens)', 'ING019', 'MFR002', 'Eli Lilly', 'USA', 'injection', '1.5mg', '0002-8502-02', 1, CURRENT_TIMESTAMP),
('PROD186', 'Trulicity 3mg (2 pens)', 'ING019', 'MFR002', 'Eli Lilly', 'USA', 'injection', '3mg', '0002-8503-02', 1, CURRENT_TIMESTAMP),
('PROD187', 'Trulicity 4.5mg (2 pens)', 'ING019', 'MFR002', 'Eli Lilly', 'USA', 'injection', '4.5mg', '0002-8504-02', 1, CURRENT_TIMESTAMP),
('PROD188', 'Byetta 5mcg (60 doses)', 'ING020', 'MFR013', 'AstraZeneca', 'UK', 'injection', '5mcg', '66780-0005-02', 1, CURRENT_TIMESTAMP),
('PROD189', 'Byetta 10mcg (60 doses)', 'ING020', 'MFR013', 'AstraZeneca', 'UK', 'injection', '10mcg', '66780-0010-02', 1, CURRENT_TIMESTAMP),
('PROD190', 'Bydureon BCise 2mg (4 pens)', 'ING020', 'MFR013', 'AstraZeneca', 'UK', 'injection', '2mg', '66780-0460-04', 1, CURRENT_TIMESTAMP),
('PROD191', 'Adlyxin 10mcg Starter Pack', 'ING022', 'MFR017', 'Sanofi', 'France', 'injection', '10mcg', '0088-2510-01', 1, CURRENT_TIMESTAMP),
('PROD192', 'Adlyxin 20mcg Starter Pack', 'ING022', 'MFR017', 'Sanofi', 'France', 'injection', '20mcg', '0088-2520-01', 1, CURRENT_TIMESTAMP);

-- Remaining Products to reach 200 (13 more products)
INSERT OR IGNORE INTO products (product_id, product_name, ingredient_id, manufacturer_id, manufacturer_name, manufacturer_country, dosage_form, strength, ndc_code, requires_refrigeration, created_at) VALUES
('PROD193', 'Jardiance 10mg (90 tabs)', 'ING037', 'MFR014', 'Boehringer Ingelheim', 'Germany', 'tablet', '10mg', '00597-0144-90', 0, CURRENT_TIMESTAMP),
('PROD194', 'Jardiance 25mg (90 tabs)', 'ING037', 'MFR014', 'Boehringer Ingelheim', 'Germany', 'tablet', '25mg', '00597-0145-90', 0, CURRENT_TIMESTAMP),
('PROD195', 'Farxiga 5mg (90 tabs)', 'ING038', 'MFR013', 'AstraZeneca', 'UK', 'tablet', '5mg', '00310-6305-90', 0, CURRENT_TIMESTAMP),
('PROD196', 'Farxiga 10mg (90 tabs)', 'ING038', 'MFR013', 'AstraZeneca', 'UK', 'tablet', '10mg', '00310-6310-90', 0, CURRENT_TIMESTAMP),
('PROD197', 'Invokana 100mg (90 tabs)', 'ING036', 'MFR018', 'Janssen Pharmaceuticals', 'Belgium', 'tablet', '100mg', '50458-270-90', 0, CURRENT_TIMESTAMP),
('PROD198', 'Invokana 300mg (90 tabs)', 'ING036', 'MFR018', 'Janssen Pharmaceuticals', 'Belgium', 'tablet', '300mg', '50458-271-90', 0, CURRENT_TIMESTAMP),
('PROD199', 'Contrave Starter Pack', 'ING010', 'MFR012', 'Nalpropion Pharmaceuticals', 'USA', 'tablet', '8mg/90mg', '67877-220-14', 0, CURRENT_TIMESTAMP),
('PROD200', 'Qsymia Titration Pack', 'ING008', 'MFR006', 'Vivus Inc.', 'USA', 'capsule', 'Various', '67877-204-28', 0, CURRENT_TIMESTAMP),
('PROD201', 'Phentermine/Topiramate ER Generic 3.75mg/23mg', 'ING008', 'MFR009', 'Teva Pharmaceuticals', 'Israel', 'capsule', '3.75mg/23mg', '00093-8200-30', 0, CURRENT_TIMESTAMP),
('PROD202', 'Phentermine/Topiramate ER Generic 7.5mg/46mg', 'ING008', 'MFR009', 'Teva Pharmaceuticals', 'Israel', 'capsule', '7.5mg/46mg', '00093-8201-30', 0, CURRENT_TIMESTAMP),
('PROD203', 'Phentermine/Topiramate ER Generic 11.25mg/69mg', 'ING008', 'MFR009', 'Teva Pharmaceuticals', 'Israel', 'capsule', '11.25mg/69mg', '00093-8202-30', 0, CURRENT_TIMESTAMP),
('PROD204', 'Phentermine/Topiramate ER Generic 15mg/92mg', 'ING008', 'MFR009', 'Teva Pharmaceuticals', 'Israel', 'capsule', '15mg/92mg', '00093-8203-30', 0, CURRENT_TIMESTAMP),
('PROD205', 'Naltrexone/Bupropion ER Generic 8mg/90mg', 'ING010', 'MFR010', 'Mylan Pharmaceuticals', 'USA', 'tablet', '8mg/90mg', '00378-9220-60', 0, CURRENT_TIMESTAMP);

PRAGMA foreign_keys = ON;
