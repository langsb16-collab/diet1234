-- DietMed Global - Initial Database Schema
-- Migration: 0001_initial_schema.sql

-- Enable foreign keys
PRAGMA foreign_keys = ON;

-- ============================================================================
-- 1. MASTER DATA (마스터 데이터)
-- ============================================================================

-- 1.1 Ingredients (성분 마스터)
CREATE TABLE IF NOT EXISTS ingredients (
  ingredient_id TEXT PRIMARY KEY,
  name_standard TEXT NOT NULL,
  atc_code TEXT,
  cas_number TEXT,
  synonyms TEXT NOT NULL DEFAULT '{}',
  mechanism TEXT,
  drug_class TEXT,
  therapeutic_area TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  data_source TEXT,
  UNIQUE(name_standard),
  CHECK(length(ingredient_id) > 0)
);

CREATE INDEX idx_ingredients_atc ON ingredients(atc_code);
CREATE INDEX idx_ingredients_class ON ingredients(drug_class);

-- 1.2 Manufacturers (제조사)
CREATE TABLE IF NOT EXISTS manufacturers (
  manufacturer_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  website TEXT,
  headquarters TEXT,
  reputation_score INTEGER DEFAULT 100,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(name, country)
);

CREATE INDEX idx_manufacturers_country ON manufacturers(country);

-- 1.3 Products (제품)
CREATE TABLE IF NOT EXISTS products (
  product_id TEXT PRIMARY KEY,
  ingredient_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  dosage_form TEXT NOT NULL,
  strength TEXT NOT NULL,
  route_of_admin TEXT,
  manufacturer_id TEXT,
  manufacturer_name TEXT NOT NULL,
  manufacturer_country TEXT,
  barcodes TEXT DEFAULT '[]',
  ndc_code TEXT,
  ean_code TEXT,
  package_description TEXT,
  pill_characteristics TEXT,
  storage_conditions TEXT,
  requires_refrigeration INTEGER DEFAULT 0,
  image_urls TEXT DEFAULT '[]',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id),
  FOREIGN KEY (manufacturer_id) REFERENCES manufacturers(manufacturer_id)
);

CREATE INDEX idx_products_ingredient ON products(ingredient_id);
CREATE INDEX idx_products_manufacturer ON products(manufacturer_id);
CREATE INDEX idx_products_ndc ON products(ndc_code);
CREATE INDEX idx_products_ean ON products(ean_code);
CREATE INDEX idx_products_refrigeration ON products(requires_refrigeration);

-- ============================================================================
-- 2. REGULATORY DATA (규제 데이터)
-- ============================================================================

-- 2.1 Approvals (국가별 허가)
CREATE TABLE IF NOT EXISTS approvals (
  approval_id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  country_code TEXT NOT NULL,
  regulatory_body TEXT NOT NULL,
  approval_number TEXT NOT NULL,
  approval_type TEXT,
  approval_status TEXT NOT NULL,
  approval_date TEXT,
  withdrawal_date TEXT,
  expiry_date TEXT,
  prescription_status TEXT NOT NULL,
  label_url TEXT,
  label_pdf_path TEXT,
  spl_id TEXT,
  indications TEXT DEFAULT '[]',
  boxed_warning INTEGER DEFAULT 0,
  contraindications TEXT DEFAULT '[]',
  warnings TEXT DEFAULT '[]',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  last_verified TEXT,
  data_source_url TEXT,
  FOREIGN KEY (product_id) REFERENCES products(product_id),
  UNIQUE(product_id, country_code, approval_number)
);

CREATE INDEX idx_approvals_product ON approvals(product_id);
CREATE INDEX idx_approvals_country ON approvals(country_code);
CREATE INDEX idx_approvals_status ON approvals(approval_status);
CREATE INDEX idx_approvals_prescription ON approvals(prescription_status);
CREATE INDEX idx_approvals_date ON approvals(approval_date);
CREATE INDEX idx_approvals_country_status ON approvals(country_code, approval_status);

-- 2.2 Recalls (리콜 이력)
CREATE TABLE IF NOT EXISTS recalls (
  recall_id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  approval_id TEXT,
  country_code TEXT NOT NULL,
  recall_number TEXT,
  recall_type TEXT NOT NULL,
  recall_class TEXT,
  reason TEXT NOT NULL,
  reason_code TEXT,
  lot_numbers TEXT DEFAULT '[]',
  units_affected INTEGER,
  distribution_pattern TEXT,
  recall_initiation_date TEXT NOT NULL,
  recall_completion_date TEXT,
  health_hazard_evaluation TEXT,
  risk_level TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  data_source_url TEXT,
  FOREIGN KEY (product_id) REFERENCES products(product_id),
  FOREIGN KEY (approval_id) REFERENCES approvals(approval_id)
);

CREATE INDEX idx_recalls_product ON recalls(product_id);
CREATE INDEX idx_recalls_country ON recalls(country_code);
CREATE INDEX idx_recalls_date ON recalls(recall_initiation_date);
CREATE INDEX idx_recalls_risk ON recalls(risk_level);

-- 2.3 Safety Events (안전성 이벤트)
CREATE TABLE IF NOT EXISTS safety_events (
  event_id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  approval_id TEXT,
  event_type TEXT NOT NULL,
  event_date TEXT NOT NULL,
  event_title TEXT NOT NULL,
  event_description TEXT,
  severity TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  data_source_url TEXT,
  FOREIGN KEY (product_id) REFERENCES products(product_id),
  FOREIGN KEY (approval_id) REFERENCES approvals(approval_id)
);

CREATE INDEX idx_safety_events_product ON safety_events(product_id);
CREATE INDEX idx_safety_events_date ON safety_events(event_date);
CREATE INDEX idx_safety_events_type ON safety_events(event_type);

-- ============================================================================
-- 3. RISK DATA (위험 데이터)
-- ============================================================================

-- 3.1 Sellers (판매처)
CREATE TABLE IF NOT EXISTS sellers (
  seller_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  country_code TEXT NOT NULL,
  website TEXT,
  domain TEXT,
  business_registration TEXT,
  pharmacy_license TEXT,
  trust_score INTEGER DEFAULT 50,
  risk_level TEXT DEFAULT 'unknown',
  has_nabp_cert INTEGER DEFAULT 0,
  has_legitscript_cert INTEGER DEFAULT 0,
  has_govt_cert INTEGER DEFAULT 0,
  requires_prescription INTEGER DEFAULT 0,
  offers_telemedicine INTEGER DEFAULT 0,
  user_report_count INTEGER DEFAULT 0,
  verified_sale_count INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  last_verified TEXT,
  UNIQUE(domain)
);

CREATE INDEX idx_sellers_country ON sellers(country_code);
CREATE INDEX idx_sellers_trust ON sellers(trust_score);
CREATE INDEX idx_sellers_risk ON sellers(risk_level);
CREATE INDEX idx_sellers_domain ON sellers(domain);

-- 3.2 Seller Certifications (판매처 인증)
CREATE TABLE IF NOT EXISTS seller_certifications (
  cert_id TEXT PRIMARY KEY,
  seller_id TEXT NOT NULL,
  cert_type TEXT NOT NULL,
  cert_number TEXT,
  cert_issuer TEXT,
  issue_date TEXT,
  expiry_date TEXT,
  is_active INTEGER DEFAULT 1,
  verification_url TEXT,
  last_verified TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (seller_id) REFERENCES sellers(seller_id),
  UNIQUE(seller_id, cert_type, cert_number)
);

CREATE INDEX idx_seller_certs_seller ON seller_certifications(seller_id);
CREATE INDEX idx_seller_certs_type ON seller_certifications(cert_type);
CREATE INDEX idx_seller_certs_active ON seller_certifications(is_active);

-- 3.3 Risk Patterns (위험 패턴)
CREATE TABLE IF NOT EXISTS risk_patterns (
  pattern_id TEXT PRIMARY KEY,
  pattern_type TEXT NOT NULL,
  pattern_name TEXT NOT NULL,
  pattern_description TEXT,
  detection_rules TEXT NOT NULL,
  risk_score INTEGER NOT NULL,
  severity TEXT NOT NULL,
  detection_count INTEGER DEFAULT 0,
  false_positive_rate REAL DEFAULT 0.0,
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_risk_patterns_type ON risk_patterns(pattern_type);
CREATE INDEX idx_risk_patterns_severity ON risk_patterns(severity);
CREATE INDEX idx_risk_patterns_active ON risk_patterns(is_active);

-- 3.4 Blacklisted Ingredients (금지 성분)
CREATE TABLE IF NOT EXISTS blacklisted_ingredients (
  blacklist_id TEXT PRIMARY KEY,
  ingredient_id TEXT,
  ingredient_name TEXT NOT NULL,
  banned_countries TEXT NOT NULL,
  ban_reason TEXT NOT NULL,
  ban_date TEXT,
  health_risks TEXT NOT NULL,
  severity TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  data_source_url TEXT,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id)
);

CREATE INDEX idx_blacklist_ingredient ON blacklisted_ingredients(ingredient_id);
CREATE INDEX idx_blacklist_severity ON blacklisted_ingredients(severity);

-- ============================================================================
-- 4. USER DATA (사용자 데이터)
-- ============================================================================

-- 4.1 User Scans (스캔 이력)
CREATE TABLE IF NOT EXISTS user_scans (
  scan_id TEXT PRIMARY KEY,
  user_id TEXT,
  scan_type TEXT NOT NULL,
  scan_input TEXT,
  product_id TEXT,
  ingredient_id TEXT,
  confidence_score REAL,
  risk_score INTEGER,
  risk_level TEXT,
  country_code TEXT,
  ip_address_hash TEXT,
  scan_timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (product_id) REFERENCES products(product_id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id)
);

CREATE INDEX idx_scans_user ON user_scans(user_id);
CREATE INDEX idx_scans_product ON user_scans(product_id);
CREATE INDEX idx_scans_timestamp ON user_scans(scan_timestamp);
CREATE INDEX idx_scans_country ON user_scans(country_code);

-- 4.2 User Reports (사용자 신고)
CREATE TABLE IF NOT EXISTS user_reports (
  report_id TEXT PRIMARY KEY,
  user_id TEXT,
  report_type TEXT NOT NULL,
  product_id TEXT,
  seller_id TEXT,
  seller_url TEXT,
  description TEXT NOT NULL,
  evidence_urls TEXT DEFAULT '[]',
  violation_types TEXT DEFAULT '[]',
  status TEXT DEFAULT 'pending',
  priority TEXT DEFAULT 'normal',
  reviewed_by TEXT,
  review_notes TEXT,
  review_date TEXT,
  action_taken TEXT,
  report_timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  ip_address_hash TEXT,
  country_code TEXT,
  FOREIGN KEY (product_id) REFERENCES products(product_id),
  FOREIGN KEY (seller_id) REFERENCES sellers(seller_id)
);

CREATE INDEX idx_reports_status ON user_reports(status);
CREATE INDEX idx_reports_priority ON user_reports(priority);
CREATE INDEX idx_reports_type ON user_reports(report_type);
CREATE INDEX idx_reports_timestamp ON user_reports(report_timestamp);
CREATE INDEX idx_reports_seller ON user_reports(seller_id);

-- ============================================================================
-- 5. ANALYTICS (분석 데이터)
-- ============================================================================

-- 5.1 Scan Stats (스캔 통계)
CREATE TABLE IF NOT EXISTS scan_stats (
  stat_id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  country_code TEXT,
  product_id TEXT,
  ingredient_id TEXT,
  total_scans INTEGER DEFAULT 0,
  successful_scans INTEGER DEFAULT 0,
  failed_scans INTEGER DEFAULT 0,
  safe_results INTEGER DEFAULT 0,
  caution_results INTEGER DEFAULT 0,
  high_risk_results INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(date, country_code, product_id)
);

CREATE INDEX idx_scan_stats_date ON scan_stats(date);
CREATE INDEX idx_scan_stats_country ON scan_stats(country_code);
CREATE INDEX idx_scan_stats_product ON scan_stats(product_id);

-- 5.2 Risk Stats (위험 통계)
CREATE TABLE IF NOT EXISTS risk_stats (
  stat_id TEXT PRIMARY KEY,
  month TEXT NOT NULL,
  risk_type TEXT NOT NULL,
  detection_count INTEGER DEFAULT 0,
  country_code TEXT,
  channel_type TEXT,
  channel_count INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(month, risk_type, country_code, channel_type)
);

CREATE INDEX idx_risk_stats_month ON risk_stats(month);
CREATE INDEX idx_risk_stats_type ON risk_stats(risk_type);
CREATE INDEX idx_risk_stats_country ON risk_stats(country_code);

-- ============================================================================
-- Migration Complete
-- ============================================================================
