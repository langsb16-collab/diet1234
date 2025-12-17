// DietMed Global - Type Definitions

export type Env = {
  DB: D1Database;
};

// ============================================================================
// Database Models
// ============================================================================

export interface Ingredient {
  ingredient_id: string;
  name_standard: string;
  atc_code: string | null;
  cas_number: string | null;
  synonyms: string; // JSON string
  mechanism: string | null;
  drug_class: string | null;
  therapeutic_area: string | null;
  created_at: string;
  updated_at: string;
  data_source: string | null;
}

export interface Product {
  product_id: string;
  ingredient_id: string;
  product_name: string;
  dosage_form: string;
  strength: string;
  route_of_admin: string | null;
  manufacturer_id: string | null;
  manufacturer_name: string;
  manufacturer_country: string | null;
  barcodes: string; // JSON string
  ndc_code: string | null;
  ean_code: string | null;
  package_description: string | null;
  pill_characteristics: string | null; // JSON string
  storage_conditions: string | null;
  requires_refrigeration: number;
  image_urls: string; // JSON string
  created_at: string;
  updated_at: string;
}

export interface Approval {
  approval_id: string;
  product_id: string;
  country_code: string;
  regulatory_body: string;
  approval_number: string;
  approval_type: string | null;
  approval_status: string;
  approval_date: string | null;
  withdrawal_date: string | null;
  expiry_date: string | null;
  prescription_status: string;
  label_url: string | null;
  label_pdf_path: string | null;
  spl_id: string | null;
  indications: string; // JSON string
  boxed_warning: number;
  contraindications: string; // JSON string
  warnings: string; // JSON string;
  created_at: string;
  updated_at: string;
  last_verified: string | null;
  data_source_url: string | null;
}

export interface RiskPattern {
  pattern_id: string;
  pattern_type: string;
  pattern_name: string;
  pattern_description: string | null;
  detection_rules: string; // JSON string
  risk_score: number;
  severity: string;
  detection_count: number;
  false_positive_rate: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface BlacklistedIngredient {
  blacklist_id: string;
  ingredient_id: string | null;
  ingredient_name: string;
  banned_countries: string; // JSON string
  ban_reason: string;
  ban_date: string | null;
  health_risks: string; // JSON string
  severity: string;
  created_at: string;
  data_source_url: string | null;
}

export interface Seller {
  seller_id: string;
  name: string;
  country_code: string;
  website: string | null;
  domain: string | null;
  business_registration: string | null;
  pharmacy_license: string | null;
  trust_score: number;
  risk_level: string;
  has_nabp_cert: number;
  has_legitscript_cert: number;
  has_govt_cert: number;
  requires_prescription: number;
  offers_telemedicine: number;
  user_report_count: number;
  verified_sale_count: number;
  created_at: string;
  updated_at: string;
  last_verified: string | null;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ProductDetailResponse {
  product: Product;
  ingredient: Ingredient;
  approvals: ApprovalSummary[];
  risk_assessment: RiskAssessment;
  blacklist_check: BlacklistCheck | null;
}

export interface ApprovalSummary {
  country_code: string;
  country_name: string;
  regulatory_body: string;
  status: string;
  prescription_status: string;
  approval_date: string | null;
  legality_summary: string;
  icon: string;
}

export interface RiskAssessment {
  risk_score: number;
  risk_level: 'safe' | 'caution' | 'high_risk';
  risk_factors: RiskFactor[];
  warnings: string[];
}

export interface RiskFactor {
  type: string;
  description: string;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  score: number;
}

export interface BlacklistCheck {
  is_blacklisted: boolean;
  ingredient_name: string;
  banned_countries: string[];
  ban_reason: string;
  health_risks: string[];
  severity: string;
}

export interface SearchResult {
  products: ProductSearchResult[];
  total: number;
}

export interface ProductSearchResult {
  product_id: string;
  product_name: string;
  ingredient_name: string;
  manufacturer_name: string;
  dosage_form: string;
  strength: string;
  approval_count: number;
  risk_level: string;
}

export interface ScanResult {
  scan_id: string;
  scan_type: 'barcode' | 'package' | 'pill';
  confidence_score: number;
  product: Product | null;
  ingredient: Ingredient | null;
  approvals: ApprovalSummary[];
  risk_assessment: RiskAssessment;
  blacklist_check: BlacklistCheck | null;
  timestamp: string;
}

// ============================================================================
// Helper Functions
// ============================================================================

export function generateId(prefix: string): string {
  return `${prefix}${Date.now()}${Math.random().toString(36).substring(2, 9)}`;
}

export function calculateRiskScore(factors: {
  isBlacklisted: boolean;
  requiresRefrigeration: boolean;
  isPrescriptionOnly: boolean;
  hasRecalls: boolean;
  sellerTrustScore?: number;
}): number {
  let score = 0;
  
  if (factors.isBlacklisted) score += 100;
  if (factors.requiresRefrigeration) score += 15;
  if (factors.isPrescriptionOnly) score += 20;
  if (factors.hasRecalls) score += 30;
  if (factors.sellerTrustScore !== undefined) {
    score += (100 - factors.sellerTrustScore) * 0.3;
  }
  
  return Math.min(Math.round(score), 100);
}

export function getRiskLevel(score: number): 'safe' | 'caution' | 'high_risk' {
  if (score >= 60) return 'high_risk';
  if (score >= 30) return 'caution';
  return 'safe';
}

export function getLegalitySummary(
  countryCode: string,
  status: string,
  prescriptionStatus: string
): string {
  const countryNames: Record<string, string> = {
    'US': '미국',
    'KR': '한국',
    'GB': '영국',
    'EU': '유럽',
    'JP': '일본',
    'CN': '중국',
  };
  
  const country = countryNames[countryCode] || countryCode;
  
  if (status === 'withdrawn') {
    return `❌ ${country}: 허가 취소됨 (구매 불가)`;
  }
  
  if (status !== 'approved') {
    return `❌ ${country}: 미승인 (구매 불가)`;
  }
  
  if (prescriptionStatus === 'rx') {
    if (countryCode === 'KR') {
      return `❌ ${country}: 의사 처방 없이는 구매·반입 불가 (전문의약품)`;
    } else if (countryCode === 'US') {
      return `⭕ ${country}: FDA 승인 / 처방 필요 / 온라인 약국 구매 가능`;
    } else if (countryCode === 'GB') {
      return `⭕ ${country}: 승인 / 온라인 텔레메디슨 처방 후 구매 가능`;
    } else {
      return `⚠️ ${country}: 승인 / 처방 필요`;
    }
  }
  
  if (prescriptionStatus === 'otc') {
    return `⭕ ${country}: 승인 / 일반의약품 (처방 불필요)`;
  }
  
  return `⚠️ ${country}: 승인 (상세 확인 필요)`;
}
