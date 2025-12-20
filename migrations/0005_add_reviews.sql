-- ============================================================================
-- User Reviews System
-- ============================================================================

-- User reviews table
CREATE TABLE IF NOT EXISTS product_reviews (
  review_id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  user_id TEXT,  -- Optional: can be anonymous
  user_name TEXT NOT NULL,  -- Display name or "Anonymous"
  rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  verified_purchase INTEGER DEFAULT 0,  -- 1 if verified purchase
  helpful_count INTEGER DEFAULT 0,
  not_helpful_count INTEGER DEFAULT 0,
  reported_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK(status IN ('active', 'hidden', 'deleted')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Review helpfulness votes
CREATE TABLE IF NOT EXISTS review_votes (
  vote_id TEXT PRIMARY KEY,
  review_id TEXT NOT NULL,
  user_id TEXT,  -- Optional
  ip_hash TEXT NOT NULL,  -- Hash of IP address for anonymous users
  vote_type TEXT NOT NULL CHECK(vote_type IN ('helpful', 'not_helpful')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (review_id) REFERENCES product_reviews(review_id),
  UNIQUE(review_id, ip_hash)  -- One vote per IP per review
);

-- Review reports (for moderation)
CREATE TABLE IF NOT EXISTS review_reports (
  report_id TEXT PRIMARY KEY,
  review_id TEXT NOT NULL,
  user_id TEXT,
  ip_hash TEXT NOT NULL,
  reason TEXT NOT NULL CHECK(reason IN ('spam', 'offensive', 'fake', 'other')),
  details TEXT,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'reviewed', 'resolved')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (review_id) REFERENCES product_reviews(review_id)
);

-- Review statistics (aggregated data)
CREATE TABLE IF NOT EXISTS product_review_stats (
  product_id TEXT PRIMARY KEY,
  total_reviews INTEGER DEFAULT 0,
  average_rating REAL DEFAULT 0,
  rating_1_count INTEGER DEFAULT 0,
  rating_2_count INTEGER DEFAULT 0,
  rating_3_count INTEGER DEFAULT 0,
  rating_4_count INTEGER DEFAULT 0,
  rating_5_count INTEGER DEFAULT 0,
  verified_purchase_count INTEGER DEFAULT 0,
  last_review_at TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_product_reviews_product_id ON product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_rating ON product_reviews(rating);
CREATE INDEX IF NOT EXISTS idx_product_reviews_status ON product_reviews(status);
CREATE INDEX IF NOT EXISTS idx_product_reviews_created_at ON product_reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_review_votes_review_id ON review_votes(review_id);
CREATE INDEX IF NOT EXISTS idx_review_reports_review_id ON review_reports(review_id);
CREATE INDEX IF NOT EXISTS idx_review_reports_status ON review_reports(status);
