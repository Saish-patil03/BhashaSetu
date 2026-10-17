export type UILanguage = 'en' | 'kn';

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface OCRConfidence {
  overall: number; // 0 - 100
  characterAccuracy: number; // 0 - 100
  vattaksharaAccuracy: number; // 0 - 100
  handwritingComplexity?: 'low' | 'medium' | 'high';
}

export interface ExtractedParagraph {
  id: string;
  kannadaText: string;
  confidence: number;
  isTable?: boolean;
  uncertainWords?: string[];
}

export interface DocumentSummary {
  simplifiedKannada: string[];
  simplifiedEnglish: string[];
  keyActionItems: string[];
  importantDatesAndDeadlines: string[];
  monetaryAmounts?: string[];
  category: 'government_notice' | 'financial_receipt' | 'handwritten_note' | 'legal_document' | 'general';
}

export interface DocumentTranslations {
  english: string;
  hindi: string;
}

export interface QAMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: number;
  text: string;
  language: 'kn' | 'en';
  groundedSnippet?: string;
}

export interface DynamicVerificationInfo {
  domain: 'medical' | 'education_certificate' | 'agricultural' | 'government' | 'legal_partition' | 'general';
  badgeTitleKn: string;
  badgeTitleEn: string;
  domainLabelKn?: string;
  domainLabelEn?: string;
  terminologyBadgeKn: string;
  terminologyBadgeEn: string;
  stampBadgeKn: string;
  stampBadgeEn: string;
  signatureBadgeKn: string;
  signatureBadgeEn: string;
  auditDetailsKn: string;
  auditDetailsEn: string;
  discrepancyAlertKn: string;
  discrepancyAlertEn: string;
  verifiedAmount?: string;
  hasOfficialSeal?: boolean;
  hasOfficialSignature?: boolean;
}

export interface DigitizedDocument {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  imageUrl: string;
  imageThumbnailUrl?: string;
  rawKannadaText: string;
  formattedMarkdownText: string;
  confidence: OCRConfidence;
  summary: DocumentSummary;
  translations: DocumentTranslations;
  chatHistory: QAMessage[];
  category: string;
  tags: string[];
  isSample?: boolean;
  piiRedacted?: boolean;
  verification?: DynamicVerificationInfo;
  syncBlocks?: any[];
  dynamicEntities?: ExtractedEntityItem[];
  dynamicTables?: ExtractedTable[];
  dynamicSchemes?: any[];
}

export interface AppSettings {
  geminiApiKey: string;
  geminiModel: string; // e.g. 'gemini-1.5-flash' or 'gemini-2.0-flash'
  useMockFallback: boolean;
  highContrastMode: boolean;
  fontSize: 'normal' | 'large' | 'xlarge';
  speechRate: number; // 0.75, 1.0, 1.25
  preferredVoiceLang: 'kn-IN' | 'en-IN';
}

export interface SampleDocPreset {
  id: string;
  titleEn: string;
  titleKn: string;
  descriptionEn: string;
  descriptionKn: string;
  category: 'government_notice' | 'financial_receipt' | 'handwritten_note' | 'legal_document' | 'general';
  imageSvgDataUrl: string;
  rawKannadaText: string;
  formattedMarkdownText: string;
  confidence: OCRConfidence;
  summary: DocumentSummary;
  translations: DocumentTranslations;
  sampleQuestions: { kn: string; en: string }[];
}

export type OCREngineMode = 'printed' | 'handwritten' | 'halegannada';

export interface WordConfidenceToken {
  id: string;
  word: string;
  confidence: number; // 0 - 100
  alternatives: string[];
  isVattakshara: boolean;
  isAmbiguous?: boolean;
  correctedText?: string;
  verified?: boolean;
}

export interface ExtractedEntityItem {
  id: string;
  keyEn: string;
  keyKn: string;
  value: string;
  category: 'doc_type' | 'date' | 'name' | 'reference' | 'money' | 'authority';
  confidence: number;
}

export interface ExtractedTable {
  title?: string;
  headers: string[];
  rows: string[][];
}

export interface CivicChecklistItem {
  id: string;
  taskEn: string;
  taskKn: string;
  completed: boolean;
  requiredDocument?: string;
  deadline?: string;
}

export interface StructuredDocumentIntelligence {
  entities: ExtractedEntityItem[];
  tables: ExtractedTable[];
  civicChecklist: CivicChecklistItem[];
  modernKannadaAdaptation?: string; // For Halegannada mode
  archaicTermGlossary?: { archaic: string; modern: string; meaning: string }[];
}

export interface PipelineTelemetryData {
  latencyMs: number;
  aksharaCount: number;
  vattaksharaCount: number;
  readabilityScore: number; // out of 10
  currentStage: number; // 1 to 4
}

