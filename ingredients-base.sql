-- Base ingredients needed for products
INSERT OR IGNORE INTO ingredients (ingredient_id, name_standard, cas_number, drug_class, created_at) VALUES
('ING001', 'Semaglutide', '910463-68-2', 'glp1_agonist', CURRENT_TIMESTAMP),
('ING002', 'Liraglutide', '204656-20-2', 'glp1_agonist', CURRENT_TIMESTAMP),
('ING003', 'Orlistat', '96829-58-2', 'lipase_inhibitor', CURRENT_TIMESTAMP);

-- Base manufacturers
INSERT OR IGNORE INTO manufacturers (manufacturer_id, name, country, website, created_at) VALUES
('MFR001', 'Novo Nordisk', 'Denmark', 'https://www.novonordisk.com', CURRENT_TIMESTAMP),
('MFR002', 'Eli Lilly', 'USA', 'https://www.lilly.com', CURRENT_TIMESTAMP),
('MFR003', 'Roche', 'Switzerland', 'https://www.roche.com', CURRENT_TIMESTAMP);
