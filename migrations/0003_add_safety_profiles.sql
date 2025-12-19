-- Migration: 0003_add_safety_profiles.sql
-- Add safety profiles, efficacy data, and FAQ tables

-- Safety profiles (부작용 및 안전성 정보)
CREATE TABLE IF NOT EXISTS safety_profiles (
  profile_id TEXT PRIMARY KEY,
  ingredient_id TEXT NOT NULL,
  
  -- 효능 정보
  avg_weight_loss_6m TEXT,
  avg_weight_loss_12m TEXT,
  mechanism_detail TEXT,
  onset_weeks INTEGER,
  
  -- 부작용 (JSON arrays)
  common_side_effects TEXT DEFAULT '[]',
  serious_side_effects TEXT DEFAULT '[]',
  contraindications TEXT DEFAULT '[]',
  drug_interactions TEXT DEFAULT '[]',
  
  -- 경고사항
  boxed_warning INTEGER DEFAULT 0,
  pregnancy_category TEXT,
  breastfeeding_safety TEXT,
  
  -- 중독/의존성
  addiction_risk TEXT DEFAULT 'low',
  withdrawal_symptoms TEXT DEFAULT '[]',
  tolerance_development TEXT DEFAULT 'low',
  
  -- 메타데이터
  clinical_evidence_level TEXT DEFAULT 'B',
  last_updated TEXT NOT NULL DEFAULT (datetime('now')),
  data_source TEXT,
  
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id)
);

CREATE INDEX idx_safety_profiles_ingredient ON safety_profiles(ingredient_id);
CREATE INDEX idx_safety_profiles_evidence ON safety_profiles(clinical_evidence_level);

-- Safety scores (0-100 안전 점수)
CREATE TABLE IF NOT EXISTS safety_scores (
  score_id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  ingredient_id TEXT NOT NULL,
  country_code TEXT NOT NULL,
  
  -- 점수 세부 항목
  score_regulatory INTEGER DEFAULT 0,      -- A. 규제/정품성 (0-35)
  score_efficacy INTEGER DEFAULT 0,        -- B. 근거/효과 (0-25)
  score_safety INTEGER DEFAULT 0,          -- C. 안전성/부작용 (0-25)
  score_distribution INTEGER DEFAULT 0,    -- D. 유통/추적 (0-15)
  
  score_total INTEGER DEFAULT 0,           -- 총점 (0-100)
  grade TEXT DEFAULT 'yellow',             -- green/light_green/yellow/red
  
  calculated_at TEXT NOT NULL DEFAULT (datetime('now')),
  version TEXT DEFAULT '1.0',
  
  FOREIGN KEY (product_id) REFERENCES products(product_id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id)
);

CREATE INDEX idx_safety_scores_product ON safety_scores(product_id);
CREATE INDEX idx_safety_scores_total ON safety_scores(score_total DESC);
CREATE INDEX idx_safety_scores_grade ON safety_scores(grade);

-- FAQ entries (자주 묻는 질문)
CREATE TABLE IF NOT EXISTS faqs (
  faq_id TEXT PRIMARY KEY,
  ingredient_id TEXT,
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id)
);

CREATE INDEX idx_faqs_ingredient ON faqs(ingredient_id);
CREATE INDEX idx_faqs_category ON faqs(category);
CREATE INDEX idx_faqs_order ON faqs(display_order);
