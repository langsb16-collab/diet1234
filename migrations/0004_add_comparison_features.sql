-- Migration: 0004_add_comparison_features.sql
-- Add product comparison and enhanced approval tracking

-- Countries table (국가 정보)
CREATE TABLE IF NOT EXISTS countries (
  country_id TEXT PRIMARY KEY,
  iso2 TEXT NOT NULL,
  iso3 TEXT NOT NULL,
  name_ko TEXT NOT NULL,
  name_en TEXT NOT NULL,
  region TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(iso2),
  UNIQUE(iso3)
);

CREATE INDEX idx_countries_iso2 ON countries(iso2);
CREATE INDEX idx_countries_region ON countries(region);

-- Enhanced approvals table with more verification details
-- Note: We'll add columns to existing approvals table via ALTER
ALTER TABLE approvals ADD COLUMN verified_level TEXT DEFAULT 'B';
ALTER TABLE approvals ADD COLUMN source_type TEXT DEFAULT 'manual';
ALTER TABLE approvals ADD COLUMN bmi_criteria TEXT;
ALTER TABLE approvals ADD COLUMN age_min INTEGER;
ALTER TABLE approvals ADD COLUMN age_max INTEGER;
ALTER TABLE approvals ADD COLUMN dosing_summary TEXT;

-- Product comparisons (사용자가 선택한 비교 항목)
CREATE TABLE IF NOT EXISTS product_comparisons (
  comparison_id TEXT PRIMARY KEY,
  user_session TEXT,
  product_ids TEXT NOT NULL,
  country_code TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT
);

CREATE INDEX idx_comparisons_session ON product_comparisons(user_session);
CREATE INDEX idx_comparisons_created ON product_comparisons(created_at);

-- Comparison criteria (비교 항목 템플릿)
CREATE TABLE IF NOT EXISTS comparison_criteria (
  criteria_id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  name_ko TEXT NOT NULL,
  name_en TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1
);

CREATE INDEX idx_criteria_category ON comparison_criteria(category);
CREATE INDEX idx_criteria_order ON comparison_criteria(display_order);
