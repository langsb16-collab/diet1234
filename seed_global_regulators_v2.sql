-- ============================================================================
-- GLOBAL REGULATORY BODIES (전 세계 규제기관)
-- ============================================================================

INSERT OR IGNORE INTO regulatory_bodies (reg_body_id, short_name, full_name, country_code, website, is_active) VALUES
  -- 북미
  ('REG_US_FDA', 'FDA', 'Food and Drug Administration', 'US', 'https://www.fda.gov', 1),
  ('REG_CA_HC', 'Health Canada', 'Health Products and Food Branch', 'CA', 'https://www.canada.ca/en/health-canada.html', 1),
  -- 유럽 / EU
  ('REG_EU_EMA', 'EMA', 'European Medicines Agency', 'EU', 'https://www.ema.europa.eu', 1),
  ('REG_UK_MHRA', 'MHRA', 'Medicines and Healthcare products Regulatory Agency', 'UK', 'https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency', 1),
  ('REG_DE_BfArM', 'BfArM', 'Federal Institute for Drugs and Medical Devices', 'DE', 'https://www.bfarm.de', 1),
  ('REG_FR_ANSM', 'ANSM', 'National Agency for the Safety of Medicines and Health Products', 'FR', 'https://ansm.sante.fr', 1),
  ('REG_ES_AEMPS', 'AEMPS', 'Spanish Agency of Medicines and Medical Devices', 'ES', 'https://www.aemps.gob.es', 1),
  -- 아시아
  ('REG_CN_NMPA', 'NMPA', 'National Medical Products Administration', 'CN', 'https://www.nmpa.gov.cn', 1),
  ('REG_KR_MFDS', 'MFDS', 'Ministry of Food and Drug Safety', 'KR', 'https://www.mfds.go.kr', 1),
  ('REG_JP_PMDA', 'PMDA', 'Pharmaceuticals and Medical Devices Agency', 'JP', 'https://www.pmda.go.jp', 1),
  ('REG_IN_CDSCO', 'CDSCO', 'Central Drugs Standard Control Organisation', 'IN', 'https://cdsco.gov.in', 1),
  ('REG_TH_FDA', 'Thai FDA', 'Food and Drug Administration of Thailand', 'TH', 'http://www.fda.moph.go.th', 1),
  ('REG_TW_TFDA', 'TFDA', 'Taiwan Food and Drug Administration', 'TW', 'https://www.fda.gov.tw', 1),
  ('REG_PH_DOH', 'DOH', 'Department of Health - Philippines', 'PH', 'https://www.doh.gov.ph', 1),
  ('REG_MY_NPRA', 'NPRA', 'National Pharmaceutical Regulatory Agency', 'MY', 'https://www.npra.gov.my', 1),
  ('REG_SG_HSA', 'HSA', 'Health Sciences Authority', 'SG', 'https://www.hsa.gov.sg', 1),
  -- 중남미
  ('REG_BR_ANVISA', 'Anvisa', 'Agência Nacional de Vigilância Sanitária', 'BR', 'https://www.gov.br/anvisa', 1),
  ('REG_MX_COFEPRIS', 'COFEPRIS', 'Federal Commission for Protection against Health Risks', 'MX', 'https://www.gob.mx/cofepris', 1),
  ('REG_CO_INVIMA', 'INVIMA', 'National Institute for Drug and Food Surveillance', 'CO', 'https://www.invima.gov.co', 1),
  ('REG_AR_ANMAT', 'ANMAT', 'National Administration of Drugs, Food and Medical Technology', 'AR', 'http://www.anmat.gov.ar', 1),
  ('REG_CL_ISP', 'ISP', 'Instituto de Salud Pública', 'CL', 'http://www.ispch.cl', 1),
  -- 아프리카
  ('REG_ZA_SAHPRA', 'SAHPRA', 'South African Health Products Regulatory Authority', 'ZA', 'https://www.sahpra.org.za', 1),
  ('REG_NG_NAFDAC', 'NAFDAC', 'National Agency for Food and Drug Administration and Control', 'NG', 'https://www.nafdac.gov.ng', 1),
  ('REG_GH_FDA', 'Ghana FDA', 'Food and Drugs Authority', 'GH', 'https://www.fdaghana.gov.gh', 1),
  ('REG_TZ_TFDA', 'TFDA', 'Tanzania Food and Drug Authority', 'TZ', 'https://www.tfda.go.tz', 1),
  ('REG_UG_NDA', 'NDA', 'National Drug Authority', 'UG', 'https://www.nda.or.ug', 1),
  -- 기타 지역
  ('REG_AU_TGA', 'TGA', 'Therapeutic Goods Administration', 'AU', 'https://www.tga.gov.au', 1),
  ('REG_NZ_MEDSAFE', 'Medsafe', 'Medicines and Medical Devices Safety Authority', 'NZ', 'https://www.medsafe.govt.nz', 1),
  ('REG_RU_SCEEMP', 'Roszdravnadzor', 'Scientific Centre for Expert Evaluation of Medicinal Products', 'RU', 'https://roszdravnadzor.gov.ru', 1),
  ('REG_TR_TMMDA', 'TMMDA', 'Turkish Medicines and Medical Devices Agency', 'TR', 'https://www.titck.gov.tr', 1);
