-- Fix notices table foreign key constraint
-- Drop existing notices table and recreate without FK constraint on author_id

DROP TABLE IF EXISTS notices;

CREATE TABLE notices (
  notice_id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  author_id TEXT,  -- Removed NOT NULL and FK constraint
  is_published INTEGER DEFAULT 1,
  view_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better performance
CREATE INDEX idx_notices_published ON notices(is_published, created_at DESC);
CREATE INDEX idx_notices_author ON notices(author_id);
