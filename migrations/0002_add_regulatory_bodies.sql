-- Migration: 0002_add_regulatory_bodies.sql
-- Add regulatory bodies table for global regulatory authorities

CREATE TABLE IF NOT EXISTS regulatory_bodies (
  reg_body_id TEXT PRIMARY KEY,
  short_name TEXT NOT NULL,
  full_name TEXT NOT NULL,
  country_code TEXT NOT NULL,
  website TEXT,
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(short_name, country_code)
);

CREATE INDEX idx_regulatory_bodies_country ON regulatory_bodies(country_code);
CREATE INDEX idx_regulatory_bodies_active ON regulatory_bodies(is_active);
