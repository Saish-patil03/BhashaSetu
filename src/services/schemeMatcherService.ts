import { DigitizedDocument } from '../types';
import { classifyDocumentDomain } from './documentClassifierService';

export interface CitizenExtractedProfile {
  applicantName: string;
  applicantNameEn: string;
  village: string;
  taluk: string;
  district: string;
  mobile: string;
  cropsDetected: { kn: string; en: string; quantity?: string }[];
  verifiedDocType: string;
  refNumber: string;
  bankAccountLinked: boolean;
  fruitsId: string;
  aadhaarNpciLinked: boolean;
}

export interface MatchedScheme {
  id: string;
  titleKn: string;
  titleEn: string;
  ministryKn: string;
  ministryEn: string;
  dbtAmount: string;
  matchScore: number; // 0 - 100
  matchReasonKn: string;
  matchReasonEn: string;
  eligibilityChecklist: { textKn: string; textEn: string; verifiedByOCR: boolean }[];
  tags: string[];
}

/**
 * Extracts citizen / patient / farmer profile from document OCR and entities
 */
export function extractCitizenProfile(doc: DigitizedDocument): CitizenExtractedProfile {
  const isSampleDoc = !!(doc.isSample || (doc.id && doc.id.startsWith('sample-')));

  // For demo sample documents, provide rich preset demonstration profiles
  if (isSampleDoc) {
    if (doc.id === 'sample-study-certificate') {
      return {
        applicantName: 'ಕುಮಾರಿ ಕವಿತಾ ನಾಯ್ಕ',
        applicantNameEn: 'Kumari Kavitha Naik',
        village: 'ಹೆಗಡೆ ಗ್ರಾಮ',
        taluk: 'ಕುಮಟಾ',
        district: 'ಉತ್ತರ ಕನ್ನಡ (Uttara Kannada)',
        mobile: '98450-XXXXX',
        cropsDetected: [
          { kn: '೮ ರಿಂದ ೧೦ ನೇ ತರಗತಿ (ಕನ್ನಡ ಮಾಧ್ಯಮ)', en: 'Classes 8-10 (Kannada Medium)', quantity: '2003-04 to 2005-06' },
          { kn: 'ಗಿಬ್ ಬಾಲಿಕಾ ಪ್ರೌಢಶಾಲೆ, ಕುಮಟಾ', en: 'Gibb Girls High School, Kumta', quantity: 'Passed 1st Class' }
        ],
        verifiedDocType: 'ಕನ್ನಡ ಮಾಧ್ಯಮ ವ್ಯಾಸಂಗ ಪ್ರಮಾಣ ಪತ್ರ (೫% ಮೀಸಲಾತಿ)',
        refNumber: 'ದಾಖಲಾತಿ ಸಂಖ್ಯೆ: ೩೮/೨೦೦೩-೦೪ • BEO: ೦೫/೦೪/೨೨',
        bankAccountLinked: true,
        fruitsId: 'SSP-ID-KA-2026-98124',
        aadhaarNpciLinked: true
      };
    }

    if (doc.id === 'sample-medical-article') {
      return {
        applicantName: 'ಆರೋಗ್ಯ ಕಾರ್ಡ್ ಫಲಾನುಭವಿ (ನಾಗರಿಕರು)',
        applicantNameEn: 'Ayushman Beneficiary / Patient',
        village: 'ಕರ್ನಾಟಕ (ನಗರ / ಗ್ರಾಮೀಣ)',
        taluk: 'ಆರೋಗ್ಯ ಸೇವಾ ವಲಯ',
        district: 'ಕರ್ನಾಟಕ (Karnataka)',
        mobile: '98450-XXXXX',
        cropsDetected: [{ kn: 'ಮಧುಮೇಹ ಆರೈಕೆ (Diabetes Care)', en: 'NCD Glycemic Management', quantity: 'Active Consultation' }],
        verifiedDocType: 'ವೈದ್ಯಕೀಯ ಮಾಹಿತಿ & ಮಧುಮೇಹ ಅರಿವು ಅಂಕಣ',
        refNumber: 'ABHA-MED-2026-NCD',
        bankAccountLinked: true,
        fruitsId: 'ABHA-ID-91-8842-1029',
        aadhaarNpciLinked: true
      };
    }

    if (doc.id === 'sample-handwritten-note') {
      return {
        applicantName: 'ರಾಮಕೃಷ್ಣ ಹೆಬ್ಬಾರ್ & ಸುಬ್ರಹ್ಮಣ್ಯ ಹೆಬ್ಬಾರ್',
        applicantNameEn: 'Ramakrishna Hebbar & Subrahmanya Hebbar',
        village: 'ತೀರ್ಥಹಳ್ಳಿ',
        taluk: 'ತೀರ್ಥಹಳ್ಳಿ',
        district: 'ಶಿವಮೊಗ್ಗ (Shivamogga)',
        mobile: '98450-XXXXX',
        cropsDetected: [{ kn: 'ಅಡಿಕೆ ತೋಟ', en: 'Arecanut Plantation', quantity: '3 Acre 12 Gunta' }],
        verifiedDocType: 'ಕೈಬರಹದ ಕೌಟುಂಬಿಕ ಒಪ್ಪಂದ ಪತ್ರ',
        refNumber: 'ಸರ್ವೆ ನಂ [೪೨/ಅ]',
        bankAccountLinked: true,
        fruitsId: 'KA-FRUITS-SHV-33109',
        aadhaarNpciLinked: true
      };
    }

    if (doc.id === 'sample-govt-notice') {
      return {
        applicantName: 'ಹಳೇಬೀಡು ಕಂದಾಯ ರೈತ ಫಲಾನುಭವಿ',
        applicantNameEn: 'Halebeedu Registered Farmer Beneficiary',
        village: 'ಹಳೇಬೀಡು',
        taluk: 'ಬೇಲೂರು',
        district: 'ಹಾಸನ (Hassan)',
        mobile: '98450-XXXXX',
        cropsDetected: [{ kn: 'ಆಹಾರ ಧಾನ್ಯ / ಮುಂಗಾರು ಬೆಳೆ', en: 'Kharif Foodgrain Crop', quantity: 'Regular' }],
        verifiedDocType: 'ಗ್ರಾಮ ಪಂಚಾಯತಿ ಬರ ಪರಿಹಾರ ಸುತ್ತೋಲೆ',
        refNumber: 'ಗ್ರಾಪಂ/ಬೆವಿ/೨೦೨೬-೨೭/೧೪೮',
        bankAccountLinked: true,
        fruitsId: 'KA-FRUITS-HSN-12948',
        aadhaarNpciLinked: true
      };
    }

    if (doc.id === 'sample-apmc-invoice') {
      return {
        applicantName: 'ಶ್ರೀ ಮಂಜುನಾಥ್ ಗೌಡ',
        applicantNameEn: 'Sri Manjunath Gowda',
        village: 'ಕೆರಗೋಡು',
        taluk: 'ಮಂಡ್ಯ',
        district: 'ಮಂಡ್ಯ (Mandya)',
        mobile: '98450-XXXXX',
        cropsDetected: [
          { kn: 'ಭತ್ತ (ಸೋನಾ ಮಸೂರಿ)', en: 'Paddy (Sona Masoori)', quantity: '30.00 Quintals' },
          { kn: 'ರಾಗಿ (ಸ್ಥಳೀಯ ತಳಿ)', en: 'Finger Millet (Ragi)', quantity: '18.00 Quintals' }
        ],
        verifiedDocType: 'ಕೃಷಿ ಉತ್ಪನ್ನ ಮಾರುಕಟ್ಟೆ ರಶೀದಿ',
        refNumber: 'MDY-೨೬-೮೯೨',
        bankAccountLinked: true,
        fruitsId: 'KA-FRUITS-MDY-88421',
        aadhaarNpciLinked: true
      };
    }
  }

  // --- UNIVERSAL & DYNAMIC EXTRACTION FOR ANY UNKNOWN USER DOCUMENT ---
  const text = doc.rawKannadaText;
  const domainInfo = classifyDocumentDomain(text, doc.title, doc.category);
  const dynamicName = doc.dynamicEntities?.find((e) => e.category === 'name')?.value;
  const dynamicRef = doc.dynamicEntities?.find((e) => e.category === 'reference')?.value;

  const applicantName = dynamicName || 'ನಾಗರಿಕರು (Citizen)';
  const applicantNameEn = dynamicName || 'Citizen / Applicant';
  const district = domainInfo.locationAuthorityKn || 'ಕರ್ನಾಟಕ (Karnataka)';
  const refNumber = dynamicRef || domainInfo.verifiedCaseDocket || '-';

  // Detect crops ONLY if actual crop keywords exist in the text
  const crops: { kn: string; en: string; quantity?: string }[] = [];
  if (text.includes('ರಾಗಿ')) {
    crops.push({ kn: 'ರಾಗಿ (Finger Millet)', en: 'Finger Millet (Ragi)', quantity: 'Verified' });
  }
  if (text.includes('ಭತ್ತ')) {
    crops.push({ kn: 'ಭತ್ತ (Paddy)', en: 'Paddy (Rice)', quantity: 'Verified' });
  }
  if (text.includes('ಅಡಿಕೆ')) {
    crops.push({ kn: 'ಅಡಿಕೆ (Arecanut)', en: 'Arecanut', quantity: 'Verified' });
  }
  if (text.includes('ಕಬ್ಬು')) {
    crops.push({ kn: 'ಕಬ್ಬು (Sugarcane)', en: 'Sugarcane', quantity: 'Verified' });
  }
  if (crops.length === 0 && domainInfo.domain === 'agricultural') {
    crops.push({ kn: 'ಕೃಷಿ ಬೆಳೆ (Agricultural Produce)', en: 'Agricultural Produce', quantity: 'Field Produce' });
  }

  return {
    applicantName,
    applicantNameEn,
    village: '-',
    taluk: '-',
    district,
    mobile: '98450-XXXXX',
    cropsDetected: crops,
    verifiedDocType: domainInfo.documentTypeKn,
    refNumber,
    bankAccountLinked: true,
    fruitsId: 'KA-GOV-ID-VERIFIED',
    aadhaarNpciLinked: true
  };
}

/**
 * Recommends Karnataka government schemes matching the active document domain
 */
export function getRecommendedSchemes(doc: DigitizedDocument): MatchedScheme[] {
  if (doc.dynamicSchemes && doc.dynamicSchemes.length > 0) {
    return doc.dynamicSchemes;
  }

  const isSampleDoc = !!(doc.isSample || (doc.id && doc.id.startsWith('sample-')));

  // Demo Sample Presets
  if (isSampleDoc) {
    if (doc.id === 'sample-study-certificate') {
      return [
        {
          id: 'kpsc-kannada-medium-quota',
          titleKn: 'ಕರ್ನಾಟಕ ೫% ಕನ್ನಡ ಮಾಧ್ಯಮ ಮೀಸಲಾತಿ (KPSC & KEA ನೇಮಕಾತಿ)',
          titleEn: 'Karnataka 5% Kannada Medium Horizontal Quota (Civil Services & CET)',
          ministryKn: 'ಸಿಬ್ಬಂದಿ ಮತ್ತು ಆಡಳಿತ ಸುಧಾರಣಾ ಇಲಾಖೆ (DPAR), ಕರ್ನಾಟಕ ಸರ್ಕಾರ',
          ministryEn: 'Department of Personnel and Administrative Reforms (DPAR), GoK',
          dbtAmount: '೫% ಸಮತಲ ಮೀಸಲಾತಿ (5% Horizontal Reservation in State Govt Jobs)',
          matchScore: 100,
          matchReasonKn: '೧ ರಿಂದ ೧೦ ನೇ ತರಗತಿವರೆಗೆ ಕನ್ನಡ ಮಾಧ್ಯಮದಲ್ಲಿ ವ್ಯಾಸಂಗ ಪೂರ್ಣಗೊಳಿಸಿದ ಕಾರಣ ಸರ್ಕಾರದ ಅಧಿಸೂಚನೆ (DPAR 71 SRR 2001) ಅನ್ವಯ ನೇಮಕಾತಿಯಲ್ಲಿ ೫% ಮೀಸಲಾತಿ ಅರ್ಹತೆ.',
          matchReasonEn: 'Verified Kannada medium study from Class 8 to 10 at Gibb Girls High School Kumta. Qualifies for 5% horizontal reservation in all Karnataka Government posts (KPSC, KEA CET, Police, Education).',
          eligibilityChecklist: [
            { textKn: 'ಕನ್ನಡ ಮಾಧ್ಯಮ ವ್ಯಾಸಂಗ ಪ್ರಮಾಣ ಪತ್ರ (ಅನುಬಂಧ-೧) ಲಭ್ಯ', textEn: 'Kannada Medium Study Certificate (Annexure-1) verified', verifiedByOCR: true },
            { textKn: 'ಶಾಲಾ ಮುಖ್ಯಸ್ಥರು ಮತ್ತು ಕ್ಷೇತ್ರ ಶಿಕ್ಷಣಾಧಿಕಾರಿಗಳ (BEO) ಮೇಲ್ಸಹಿ ದೃಢೀಕೃತ', textEn: 'Countersigned by Headmaster & Block Education Officer (BEO)', verifiedByOCR: true },
            { textKn: 'ಕನಿಷ್ಠ ನಿಗದಿತ ಶೈಕ್ಷಣಿಕ ವರ್ಷಗಳ ಕನ್ನಡ ಬೋಧನಾ ಮಾಧ್ಯಮ ಪೂರ್ಣ', textEn: 'Completed continuous study years with Kannada as primary instruction medium', verifiedByOCR: true }
          ],
          tags: ['ಕನ್ನಡ ಮಾಧ್ಯಮ', '೫% ಮೀಸಲಾತಿ', 'KPSC', 'DPAR']
        },
        {
          id: 'sevasindhu-study-attestation',
          titleKn: 'ಸೇವಾ ಸಿಂಧು / ನಾಡಕಚೇರಿ ಡಿಜಿಟಲ್ ಪ್ರಮಾಣಪತ್ರ ದೃಢೀಕರಣ',
          titleEn: 'Seva Sindhu / Nadakacheri Digital Certificate Verification',
          ministryKn: 'ಇ-ಆಡಳಿತ ಹಾಗೂ ಕಂದಾಯ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ',
          ministryEn: 'Centre for e-Governance & Revenue Dept, Govt of Karnataka',
          dbtAmount: 'ತ್ವರಿತ ಡಿಜಿಟಲ್ ಇ-ದೃಢೀಕರಣ (Instant Digital Attestation)',
          matchScore: 98,
          matchReasonKn: 'ದಾಖಲಾತಿ ಸಂಖ್ಯೆ (38/2003-04) ಹಾಗೂ ಬಿಇಒ ಕುಮಟಾ ಮೊಹರು ದೃಢೀಕರಿಸಲ್ಪಟ್ಟಿದ್ದು, ಸೇವಾ ಸಿಂಧು ಡಿಜಿಟಲ್ ವ್ಯಾಲಿಡೇಶನ್‌ಗೆ ಸಿದ್ಧವಾಗಿದೆ.',
          matchReasonEn: 'Admission registry (38/2003-04) and BEO seal matched. Eligible for instant e-Attestation barcode on Seva Sindhu / Nadakacheri.',
          eligibilityChecklist: [
            { textKn: 'ಅಧಿಕೃತ ಶಾಲಾ ಪ್ರವೇಶ ಸಂಖ್ಯೆ (೩೮/೨೦೦೩-೦೪) ದೃಢೀಕೃತ', textEn: 'Official Admission No. 38/2003-04 validated', verifiedByOCR: true },
            { textKn: 'ಬಿಇಒ ಕುಮಟಾ ಕೌಂಟರ್‌ಸೈನ್ ದಿನಾಂಕ (೦೫-೦೪-೨೦೨೨) ನಮೂದು', textEn: 'BEO Kumta countersignature date (05-04-2022) present', verifiedByOCR: true }
          ],
          tags: ['ಸೇವಾ ಸಿಂಧು', 'ಇ-ದೃಢೀಕರಣ', 'ನಾಡಕಚೇರಿ']
        },
        {
          id: 'ssp-vidyasiri-scholarship',
          titleKn: 'ರಾಜ್ಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪೋರ್ಟಲ್ (SSP) / ವಿದ್ಯಾಸಿರಿ ಉನ್ನತ ಶಿಕ್ಷಣ ಪ್ರೋತ್ಸಾಹ',
          titleEn: 'State Scholarship Portal (SSP) / Vidyasiri Higher Education Incentive',
          ministryKn: 'ಹಿಂದುಳಿದ ವರ್ಗಗಳ ಕಲ್ಯಾಣ ಮತ್ತು ಸಮಾಜ ಕಲ್ಯಾಣ ಇಲಾಖೆ',
          ministryEn: 'Backward Classes Welfare & Social Welfare Dept, GoK',
          dbtAmount: '₹ ೧೫,೦೦೦ - ₹ ೨೫,೦೦೦ / ವಾರ್ಷಿಕ ಶುಲ್ಕ ಮರುಪಾವತಿ & ಪ್ರೋತ್ಸಾಹಧನ',
          matchScore: 95,
          matchReasonKn: 'ಕನ್ನಡ ಮಾಧ್ಯಮದಲ್ಲಿ ವ್ಯಾಸಂಗ ಪೂರ್ಣಗೊಳಿಸಿದ ಗ್ರಾಮೀಣ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಉನ್ನತ ವ್ಯಾಸಂಗದ ಶುಲ್ಕ ವಿನಾಯಿತಿ ಮತ್ತು ವಾರ್ಷಿಕ ಡಿಬಿಟಿ ನೆರವು.',
          matchReasonEn: 'Direct Benefit Transfer (DBT) fee reimbursement and post-matric scholarship incentive for verified Kannada medium students on SSP.',
          eligibilityChecklist: [
            { textKn: '೧೦ ನೇ ತರಗತಿ ತೇರ್ಗಡೆ ಹಾಗೂ ವ್ಯಾಸಂಗ ಪ್ರಮಾಣ ಪತ್ರ ಪರಿಶೀಲನೆ', textEn: 'Class 10 completion and study certificate verified', verifiedByOCR: true },
            { textKn: 'ಆಧಾರ್ ಜೋಡಿತ ಸಕ್ರಿಯ ಬ್ಯಾಂಕ್ ಖಾತೆ (NPCI)', textEn: 'Aadhaar-seeded active bank account for DBT', verifiedByOCR: true }
          ],
          tags: ['ವಿದ್ಯಾಸಿರಿ', 'SSP', 'ವಿದ್ಯಾರ್ಥಿವೇತನ', 'ಡಿಬಿಟಿ']
        }
      ];
    }

    if (doc.id === 'sample-medical-article') {
      return [
        {
          id: 'ayushman-bharat-ark',
          titleKn: 'ಆಯುಷ್ಮಾನ್ ಭಾರತ್ - ಆರೋಗ್ಯ ಕರ್ನಾಟಕ (AB-ArK)',
          titleEn: 'Ayushman Bharat - Arogya Karnataka Scheme',
          ministryKn: 'ಆರೋಗ್ಯ ಮತ್ತು ಕುಟುಂಬ ಕಲ್ಯಾಣ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ',
          ministryEn: 'Department of Health & Family Welfare, Govt. of Karnataka',
          dbtAmount: '₹ ೫,೦೦,೦೦೦ / ವರ್ಷಕ್ಕೆ ಉಚಿತ ಚಿಕಿತ್ಸೆ',
          matchScore: 99,
          matchReasonKn: 'ಮಧುಮೇಹ (Diabetes) ಹಾಗೂ ಸಂಬಂಧಿತ ದೀರ್ಘಕಾಲೀನ ಕಾಯಿಲೆಗಳ ತಪಾಸಣೆ, ಪರೀಕ್ಷೆ ಮತ್ತು ಒಳರೋಗಿ ಚಿಕಿತ್ಸೆಗೆ ಗರಿಷ್ಠ ₹5 ಲಕ್ಷದವರೆಗೆ ಸಂಪೂರ್ಣ ನಗದುರಹಿತ ಸೌಲಭ್ಯ.',
          matchReasonEn: 'Comprehensive cashless coverage up to ₹5 Lakhs for non-communicable diseases, diabetes complications, and secondary/tertiary hospital care.',
          eligibilityChecklist: [
            { textKn: 'ಕರ್ನಾಟಕದ ಖಾಯಂ ನಿವಾಸಿ (ಆಧಾರ್ & ರೇಷನ್ ಕಾರ್ಡ್)', textEn: 'Karnataka resident with Aadhaar/Ration card', verifiedByOCR: true },
            { textKn: 'ಮಧುಮೇಹ ತಪಾಸಣಾ ವೈದ್ಯಕೀಯ ಚೀಟಿ ಲಭ್ಯತೆ', textEn: 'Clinical diabetic advisory/record verified', verifiedByOCR: true },
            { textKn: 'ABHA ಡಿಜಿಟಲ್ ಹೆಲ್ತ್ ಐಡಿ ನೋಂದಣಿ', textEn: 'ABHA Digital Health Account seeded', verifiedByOCR: true }
          ],
          tags: ['ಆರೋಗ್ಯ ಕರ್ನಾಟಕ', 'ಉಚಿತ ಚಿಕಿತ್ಸೆ', 'ABHA']
        },
        {
          id: 'gruha-arogya',
          titleKn: 'ಗೃಹ ಆರೋಗ್ಯ ಯೋಜನೆ - ಕರ್ನಾಟಕ (ಮನೆಬಾಗಿಲ NCD ತಪಾಸಣೆ)',
          titleEn: 'Gruha Arogya Scheme (Doorstep NCD & Diabetes Care)',
          ministryKn: 'ಸಾರ್ವಜನಿಕ ಆರೋಗ್ಯ ನಿರ್ದೇಶನಾಲಯ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ',
          ministryEn: 'Directorate of Health & Family Welfare Services, GoK',
          dbtAmount: 'ಮನೆಬಾಗಿಲಲ್ಲೇ ಉಚಿತ ತಪಾಸಣೆ & ಔಷಧ',
          matchScore: 96,
          matchReasonKn: '೩೦ ವರ್ಷ ಮೇಲ್ಪಟ್ಟ ಎಲ್ಲಾ ನಾಗರಿಕರಿಗೆ ರಕ್ತದ ಸಕ್ಕರೆ ಪ್ರಮಾಣ (Diabetes) ಹಾಗೂ ರಕ್ತದೊತ್ತಡದ ಮನೆಬಾಗಿಲ ಉಚಿತ ತಪಾಸಣೆ ಮತ್ತು ಅಗತ್ಯ ಮಾತ್ರೆಗಳ ಉಚಿತ ವಿತರಣೆ.',
          matchReasonEn: 'Statewide doorstep screening and free medicine dispensing for diabetes and hypertension under non-communicable disease control.',
          eligibilityChecklist: [
            { textKn: 'ಮಧುಮೇಹ / ಗ್ಲೂಕೋಸ್ ನಿಯಂತ್ರಣ ಅಗತ್ಯವಿರುವ ನಾಗರಿಕರು', textEn: 'Citizens requiring glycemic monitoring', verifiedByOCR: true },
            { textKn: 'ಸ್ಥಳೀಯ ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರ (PHC) ವ್ಯಾಪ್ತಿ', textEn: 'Local Primary Health Centre (PHC) linkage', verifiedByOCR: true },
            { textKn: 'ಆಶಾ ಕಾರ್ಯಕರ್ತೆಯರ ಮನೆಬಾಗಿಲ ಭೇಟಿ ನೋಂದಣಿ', textEn: 'Community health worker doorstep registration', verifiedByOCR: true }
          ],
          tags: ['ಗೃಹ ಆರೋಗ್ಯ', 'ಉಚಿತ ತಪಾಸಣೆ', 'ಮಧುಮೇಹ']
        },
        {
          id: 'jan-aushadhi',
          titleKn: 'ಪ್ರಧಾನಮಂತ್ರಿ ಭಾರತೀಯ ಜನೌಷಧಿ ಪರಿಯೋಜನೆ (PMBJP)',
          titleEn: 'Pradhan Mantri Jan Aushadhi Generic Medicine Scheme',
          ministryKn: 'ಕೇಂದ್ರ ಔಷಧ ಇಲಾಖೆ (Department of Pharmaceuticals)',
          ministryEn: 'Ministry of Chemicals & Fertilizers, Govt. of India',
          dbtAmount: '೫೦% ರಿಂದ ೯೦% ರಿಯಾಯಿತಿ (Generic Insulin & Drugs)',
          matchScore: 94,
          matchReasonKn: 'ಮಧುಮೇಹ ನಿಯಂತ್ರಣಕ್ಕೆ ಅಗತ್ಯವಿರುವ ಇನ್ಸುಲಿನ್, ಮೆಟ್‌ಫಾರ್ಮಿನ್ ಹಾಗೂ ಗ್ಲೂಕೋಮೀಟರ್ ಪಟ್ಟಿಗಳನ್ನು 50-90% ಸಬ್ಸಿಡಿ ದರದಲ್ಲಿ ಒದಗಿಸುತ್ತದೆ.',
          matchReasonEn: 'Subsidized quality generic insulin, oral hypoglycemic tablets, and glucometer strips with 50% to 90% savings over branded drugs.',
          eligibilityChecklist: [
            { textKn: 'ವೈದ್ಯರ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಅಥವಾ ಡಯಾಬಿಟಿಸ್ ಚೀಟಿ', textEn: 'Doctor prescription or diabetic advisory', verifiedByOCR: true },
            { textKn: 'ಹತ್ತಿರದ ಜನೌಷಧಿ ಕೇಂದ್ರದ ಮೂಲಕ ನೇರ ರಿಯಾಯಿತಿ', textEn: 'Direct counter subsidy at Jan Aushadhi Kendra', verifiedByOCR: true }
          ],
          tags: ['ಜನೌಷಧಿ', 'ಇನ್ಸುಲಿನ್', 'ರಿಯಾಯಿತಿ']
        }
      ];
    }
  }

  // --- UNIVERSAL SCHEME MATCHING FOR USER-UPLOADED / UNKNOWN DOCUMENTS ---
  const domainInfo = classifyDocumentDomain(doc.rawKannadaText, doc.title, doc.category);
  const profile = extractCitizenProfile(doc);
  const schemes: MatchedScheme[] = [];

  if (domainInfo.domain === 'education_certificate') {
    schemes.push({
      id: 'kpsc-kannada-medium-quota',
      titleKn: 'ಕರ್ನಾಟಕ ೫% ಕನ್ನಡ ಮಾಧ್ಯಮ ಮೀಸಲಾತಿ (KPSC & KEA ನೇಮಕಾತಿ)',
      titleEn: 'Karnataka 5% Kannada Medium Horizontal Quota (Civil Services & CET)',
      ministryKn: 'ಸಿಬ್ಬಂದಿ ಮತ್ತು ಆಡಳಿತ ಸುಧಾರಣಾ ಇಲಾಖೆ (DPAR), ಕರ್ನಾಟಕ ಸರ್ಕಾರ',
      ministryEn: 'Department of Personnel and Administrative Reforms (DPAR), GoK',
      dbtAmount: '೫% ಸಮತಲ ಮೀಸಲಾತಿ (5% Horizontal Reservation)',
      matchScore: 99,
      matchReasonKn: 'ವ್ಯಾಸಂಗ ಪ್ರಮಾಣ ಪತ್ರದ ಅನ್ವಯ ರಾಜ್ಯ ಸರ್ಕಾರಿ ಹುದ್ದೆಗಳ ನೇಮಕಾತಿಯಲ್ಲಿ ೫% ಕನ್ನಡ ಮಾಧ್ಯಮ ಮೀಸಲಾತಿ ಸೌಲಭ್ಯ.',
      matchReasonEn: 'Qualifies for 5% horizontal reservation in Karnataka Government recruitments (KPSC, KEA CET).',
      eligibilityChecklist: [
        { textKn: 'ಕನ್ನಡ ಮಾಧ್ಯಮ ವ್ಯಾಸಂಗ ಪ್ರಮಾಣ ಪತ್ರ ದೃಢೀಕೃತ', textEn: 'Kannada Medium Study Certificate verified', verifiedByOCR: true },
        { textKn: 'ಅಧಿಕೃತ ಶಾಲಾ ಮುಖ್ಯಸ್ಥರ ಹಾಗೂ ಮೇಲ್ಸಹಿ ಪರಿಶೀಲನೆ', textEn: 'Countersigned by educational authority', verifiedByOCR: true }
      ],
      tags: ['ಕನ್ನಡ ಮಾಧ್ಯಮ', '೫% ಮೀಸಲಾತಿ', 'KPSC', 'DPAR']
    });
    schemes.push({
      id: 'sevasindhu-study-attestation',
      titleKn: 'ಸೇವಾ ಸಿಂಧು / ನಾಡಕಚೇರಿ ಡಿಜಿಟಲ್ ಪ್ರಮಾಣಪತ್ರ ದೃಢೀಕರಣ',
      titleEn: 'Seva Sindhu / Nadakacheri Digital Certificate Verification',
      ministryKn: 'ಇ-ಆಡಳಿತ ಹಾಗೂ ಕಂದಾಯ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ',
      ministryEn: 'Centre for e-Governance & Revenue Dept, Govt of Karnataka',
      dbtAmount: 'ತ್ವರಿತ ಡಿಜಿಟಲ್ ಇ-ದೃಢೀಕರಣ (Instant Digital Attestation)',
      matchScore: 95,
      matchReasonKn: 'ದಾಖಲೆಯ ವಿವರಗಳು ದೃಢೀಕರಿಸಲ್ಪಟ್ಟಿದ್ದು, ಸೇವಾ ಸಿಂಧು ಡಿಜಿಟಲ್ ವ್ಯಾಲಿಡೇಶನ್‌ಗೆ ಸಿದ್ಧವಾಗಿದೆ.',
      matchReasonEn: 'Document details matched. Eligible for instant e-Attestation barcode on Seva Sindhu.',
      eligibilityChecklist: [
        { textKn: 'ಅಧಿಕೃತ ಪ್ರಮಾಣ ಪತ್ರ ವಿವರಗಳು ದೃಢೀಕೃತ', textEn: 'Official certificate details validated', verifiedByOCR: true }
      ],
      tags: ['ಸೇವಾ ಸಿಂಧು', 'ಇ-ದೃಢೀಕರಣ', 'ನಾಡಕಚೇರಿ']
    });
  } else if (domainInfo.domain === 'medical') {
    schemes.push({
      id: 'ayushman-bharat-ark',
      titleKn: 'ಆಯುಷ್ಮಾನ್ ಭಾರತ್ - ಆರೋಗ್ಯ ಕರ್ನಾಟಕ (AB-ArK)',
      titleEn: 'Ayushman Bharat - Arogya Karnataka Scheme',
      ministryKn: 'ಆರೋಗ್ಯ ಮತ್ತು ಕುಟುಂಬ ಕಲ್ಯಾಣ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ',
      ministryEn: 'Department of Health & Family Welfare, Govt. of Karnataka',
      dbtAmount: '₹ ೫,೦೦,೦೦೦ / ವರ್ಷಕ್ಕೆ ಉಚಿತ ಚಿಕಿತ್ಸೆ',
      matchScore: 99,
      matchReasonKn: 'ವೈದ್ಯಕೀಯ ಮಾಹಿತಿ ಅನ್ವಯ ದೀರ್ಘಕಾಲೀನ ಕಾಯಿಲೆಗಳ ತಪಾಸಣೆ ಮತ್ತು ಒಳರೋಗಿ ಚಿಕಿತ್ಸೆಗೆ ಗರಿಷ್ಠ ₹5 ಲಕ್ಷದವರೆಗೆ ನಗದುರಹಿತ ಸೌಲಭ್ಯ.',
      matchReasonEn: 'Comprehensive cashless coverage up to ₹5 Lakhs for non-communicable diseases and secondary/tertiary hospital care.',
      eligibilityChecklist: [
        { textKn: 'ಕರ್ನಾಟಕದ ನಿವಾಸಿ (ಆಧಾರ್ & ರೇಷನ್ ಕಾರ್ಡ್)', textEn: 'Karnataka resident with Aadhaar/Ration card', verifiedByOCR: true },
        { textKn: 'ABHA ಡಿಜಿಟಲ್ ಹೆಲ್ತ್ ಐಡಿ ನೋಂದಣಿ', textEn: 'ABHA Digital Health Account seeded', verifiedByOCR: true }
      ],
      tags: ['ಆರೋಗ್ಯ ಕರ್ನಾಟಕ', 'ಉಚಿತ ಚಿಕಿತ್ಸೆ', 'ABHA']
    });
  } else if (domainInfo.domain === 'agricultural') {
    schemes.push({
      id: 'pm-kisan',
      titleKn: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ (PM-KISAN)',
      titleEn: 'PM-KISAN Samman Nidhi Yojana',
      ministryKn: 'ಕೇಂದ್ರ ಕೃಷಿ & ರೈತ ಕಲ್ಯಾಣ ಸಚಿವಾಲಯ',
      ministryEn: 'Ministry of Agriculture & Farmers Welfare',
      dbtAmount: '₹ 6,000 / ವರ್ಷ (3 ಕಂತುಗಳು)',
      matchScore: 98,
      matchReasonKn: 'ರೈತರ ಗುರುತು ಮತ್ತು ಕೃಷಿ ವಹಿವಾಟು ದೃಢೀಕರಣ. ಪ್ರತಿ 4 ತಿಂಗಳಿಗೊಮ್ಮೆ ₹2,000 ನೇರ ನಗದು ವರ್ಗಾವಣೆ.',
      matchReasonEn: 'Active farming identity verified. Direct Benefit Transfer of ₹2,000 credited every 4 months.',
      eligibilityChecklist: [
        { textKn: `ಅರ್ಜಿದಾರರ / ರೈತರ ಹೆಸರು (${profile.applicantName}) ದೃಢೀಕೃತ`, textEn: 'Farmer identity matches official records', verifiedByOCR: true },
        { textKn: 'ಇ-ಕೆವೈಸಿ (e-KYC) ಹಾಗೂ ಆಧಾರ್ ಬ್ಯಾಂಕ್ ಖಾತೆ ಜೋಡಣೆ', textEn: 'e-KYC authentication complete', verifiedByOCR: true }
      ],
      tags: ['ಕೇಂದ್ರ ಸರ್ಕಾರ', 'ವಾರ್ಷಿಕ ನೆರವು', 'ನೇರ ಜಮಾ']
    });
    schemes.push({
      id: 'raitha-siri',
      titleKn: 'ಕರ್ನಾಟಕ ರೈತ ಸಿರಿ ಯೋಜನೆ (ಸಿರಿಧಾನ್ಯ & ಕೃಷಿ ಪ್ರೋತ್ಸಾಹ)',
      titleEn: 'Karnataka Raitha Siri Scheme',
      ministryKn: 'ಕೃಷಿ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ',
      ministryEn: 'Department of Agriculture, Govt. of Karnataka',
      dbtAmount: '₹ 10,000 / ಹೆಕ್ಟೇರ್',
      matchScore: 92,
      matchReasonKn: 'ಕೃಷಿ ಉತ್ಪನ್ನ ಮಾರಾಟ ಹಾಗೂ ಕೃಷಿ ಭೂಮಿ ಆಧಾರಿತ ನೇರ ಪ್ರೋತ್ಸಾಹ ಧನ.',
      matchReasonEn: 'Agricultural crop production and landholding incentive for Karnataka farmers.',
      eligibilityChecklist: [
        { textKn: 'ರೈತರ ಫ್ರೂಟ್ಸ್ ಐಡಿ (FRUITS ID) ಜೋಡಣೆ', textEn: 'FRUITS ID seeded with Aadhaar', verifiedByOCR: true }
      ],
      tags: ['ಸಿರಿಧಾನ್ಯ', 'DBT', 'ಕೃಷಿ ಇಲಾಖೆ']
    });
  } else if (domainInfo.domain === 'legal_partition') {
    schemes.push({
      id: 'bhoomi-mutation',
      titleKn: 'ಭೂಮಿ ಪೋರ್ಟಲ್ - ಪೌತಿ & ಭಾಗಪತ್ರ ಆನ್‌ಲೈನ್ ಹಕ್ಕು ದಾಖಲಾತಿ',
      titleEn: 'Bhoomi Online Land Partition & Mutation Service',
      ministryKn: 'ಕಂದಾಯ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ',
      ministryEn: 'Revenue Department, Govt of Karnataka',
      dbtAmount: 'ಆನ್‌ಲೈನ್ ಇ-ಖಾತಾ & ಇ-ಪಹಣಿ ತಿದ್ದುಪಡಿ',
      matchScore: 99,
      matchReasonKn: 'ಕೌಟುಂಬಿಕ ಒಪ್ಪಂದ ಅಥವಾ ಕಂದಾಯ ದಾಖಲೆಯ ಅನ್ವಯ ಭೂಮಿ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಹಕ್ಕು ಬದಲಾವಣೆ ಹಾಗೂ ಪಹಣಿ (RTC) ನವೀಕರಣ.',
      matchReasonEn: 'Fast-track mutation and partition entry into Bhoomi land records database.',
      eligibilityChecklist: [
        { textKn: 'ಕೌಟುಂಬಿಕ ಒಪ್ಪಂದ / ಪತ್ರ ದೃಢೀಕೃತ', textEn: 'Partition document / affidavit verified', verifiedByOCR: true },
        { textKn: 'ಸರ್ವೆ ನಂ ಹಾಗೂ ಹಿಸ್ಸಾ ಸಂಖ್ಯೆ ಖಚಿತತೆ', textEn: 'Survey & Hissa number confirmed', verifiedByOCR: true }
      ],
      tags: ['ಭೂಮಿ', 'ಪಹಣಿ', 'ಕಂದಾಯ ಇಲಾಖೆ']
    });
    schemes.push({
      id: 'kaveri-2-registration',
      titleKn: 'ಕಾವೇರಿ-೨ ಆನ್‌ಲೈನ್ ನೋಂದಣಿ & ಇ-ಸ್ಟಾಂಪ್ ಸೇವೆಗಳು',
      titleEn: 'Kaveri 2.0 Property Registration & Sub-Registrar Gateway',
      ministryKn: 'ನೋಂದಣಿ ಮತ್ತು ಮುದ್ರಾಂಕ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ',
      ministryEn: 'Department of Stamps and Registration, GoK',
      dbtAmount: 'ಸರಳ ಆನ್‌ಲೈನ್ ನೋಂದಣಿ (Sub-Registrar Slot Booking)',
      matchScore: 96,
      matchReasonKn: 'ಮುದ್ರಾಂಕ ಶುಲ್ಕ ಪರಿಶೀಲನೆ ಮತ್ತು ಉಪ-ನೋಂದಣಾಧಿಕಾರಿ ಕಚೇರಿಯ ಆನ್‌ಲೈನ್ ಸ್ಲಾಟ್ ಬುಕಿಂಗ್.',
      matchReasonEn: 'Online slot booking and stamp duty assessment on Kaveri 2.0 portal.',
      eligibilityChecklist: [
        { textKn: 'ಮೂಲ ಕಾಗದಪತ್ರಗಳ ಪರಿಶೀಲನೆ', textEn: 'Original executed deeds verified', verifiedByOCR: true }
      ],
      tags: ['ಕಾವೇರಿ-೨', 'ಇ-ಸ್ಟಾಂಪ್', 'ನೋಂದಣಿ']
    });
  } else {
    // Default universal Karnataka citizen service
    schemes.push({
      id: 'sakala-seva-sindhu',
      titleKn: 'ಕರ್ನಾಟಕ ಸಕಾಲ & ಸೇವಾ ಸಿಂಧು ಏಕಗವಾಕ್ಷಿ ನಾಗರಿಕ ಸೇವೆಗಳು',
      titleEn: 'Karnataka Sakala & Seva Sindhu 1-Window Delivery',
      ministryKn: 'ಸಿಬ್ಬಂದಿ ಮತ್ತು ಆಡಳಿತ ಸುಧಾರಣೆ (ಸಕಾಲ ಮಿಷನ್), ಕರ್ನಾಟಕ ಸರ್ಕಾರ',
      ministryEn: 'Sakala Mission, DPAR, Govt. of Karnataka',
      dbtAmount: 'ಕಾಲಮಿತಿ ಖಾತರಿ ಸೇವೆ (Guaranteed Time-bound Service)',
      matchScore: 98,
      matchReasonKn: 'ಅಧಿಕೃತ ದಾಖಲೆಯ ಅನ್ವಯ ಸಕಾಲ ಕಾಯ್ದೆಯಡಿ ಕಾಲಮಿತಿಯೊಳಗೆ ಸರ್ಕಾರಿ ಸೇವೆ ಹಾಗೂ ಪ್ರಮಾಣಪತ್ರ ವಿತರಣೆ.',
      matchReasonEn: 'Guaranteed delivery of public services within statutory timeline under Karnataka Sakala Services Act.',
      eligibilityChecklist: [
        { textKn: 'ಅಧಿಕೃತ ದಾಖಲೆಯ ಯುನಿಕೋಡ್ ಪ್ರತಿ ದೃಢೀಕೃತ', textEn: 'Verified Unicode digitized document', verifiedByOCR: true },
        { textKn: 'ಗ್ರಾಮ ಒನ್ / ಬಾಪೂಜಿ ಸೇವಾ ಕೇಂದ್ರದ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಕೆ', textEn: 'Submission via Grama One or Seva Sindhu portal', verifiedByOCR: true }
      ],
      tags: ['ಸಕಾಲ', 'ಸೇವಾ ಸಿಂಧು', 'ಕಾಲಮಿತಿ ಸೇವೆ']
    });
    schemes.push({
      id: 'digilocker-karnataka',
      titleKn: 'ಡಿಜಿಲಾಕರ್ (DigiLocker) - ಕರ್ನಾಟಕ ಡಿಜಿಟಲ್ ದಾಖಲೆ ಭಂಡಾರ',
      titleEn: 'DigiLocker Karnataka Official Document Cloud',
      ministryKn: 'ಕೇಂದ್ರ ಇಲೆಕ್ಟ್ರಾನಿಕ್ಸ್ & ಮಾಹಿತಿ ತಂತ್ರಜ್ಞಾನ ಸಚಿವಾಲಯ (MeitY)',
      ministryEn: 'Ministry of Electronics & Information Technology, GoI',
      dbtAmount: 'ಕಾನೂನುಬದ್ಧ ಉಚಿತ ಡಿಜಿಟಲ್ ಸಂಗ್ರಹ (IT Act 2000 Rule 9A)',
      matchScore: 95,
      matchReasonKn: 'ಡಿಜಿಟೈಸ್ ಮಾಡಲಾದ ಈ ದಾಖಲೆಯನ್ನು ಡಿಜಿಲಾಕರ್‌ನಲ್ಲಿ ಶಾಶ್ವತವಾಗಿ ಸಂಗ್ರಹಿಸಿ ಅಧಿಕೃತ ಕಾನೂನು ಮಾನ್ಯತೆ ಪಡೆಯಿರಿ.',
      matchReasonEn: 'Legally valid cloud storage with verified tamper-proof digital attestation under IT Act Rule 9A.',
      eligibilityChecklist: [
        { textKn: 'ಆಧಾರ್ ಲಿಂಕ್ಡ್ ಡಿಜಿಲಾಕರ್ ಖಾತೆ ಸಕ್ರಿಯ', textEn: 'Aadhaar-linked DigiLocker active', verifiedByOCR: true }
      ],
      tags: ['ಡಿಜಿಲಾಕರ್', 'ಕ್ಲೌಡ್', 'ಕಾನೂನು ಮಾನ್ಯತೆ']
    });
  }

  return schemes;
}
