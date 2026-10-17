import { AppSettings, DigitizedDocument } from '../types';
import { sampleDocuments } from '../data/sampleDocuments';
import { searchVaultPhonetically } from './phoneticSearchService';

const STORAGE_KEY_DOCS = 'bhashasetu_vault_v1';
const STORAGE_KEY_SETTINGS = 'bhashasetu_settings_v1';

export const DEFAULT_SETTINGS: AppSettings = {
  geminiApiKey: (import.meta.env.VITE_GEMINI_API_KEY as string) || '',
  geminiModel: 'gemini-3.8-flash',
  useMockFallback: true,
  highContrastMode: false,
  fontSize: 'normal',
  speechRate: 1.0,
  preferredVoiceLang: 'kn-IN'
};

/**
 * Initializes vault with default seed documents if first run
 */
function getInitialVaultDocuments(): DigitizedDocument[] {
  return sampleDocuments.map((s, index) => ({
    id: s.id,
    title: `${s.titleKn} (${s.titleEn})`,
    createdAt: Date.now() - (3 - index) * 86400000,
    updatedAt: Date.now() - (3 - index) * 86400000,
    imageUrl: s.imageSvgDataUrl,
    imageThumbnailUrl: s.imageSvgDataUrl,
    rawKannadaText: s.rawKannadaText,
    formattedMarkdownText: s.formattedMarkdownText,
    confidence: s.confidence,
    summary: s.summary,
    translations: s.translations,
    chatHistory: [],
    category: s.category,
    tags: ['ಮಾದರಿ', 'ಕನ್ನಡ', s.category],
    isSample: true
  }));
}

export const storageService = {
  getDocuments(): DigitizedDocument[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_DOCS);
      if (!raw) {
        const initial = getInitialVaultDocuments();
        this.saveDocuments(initial);
        return initial;
      }
      return JSON.parse(raw);
    } catch (e) {
      console.error('Failed reading documents from localStorage:', e);
      return getInitialVaultDocuments();
    }
  },

  saveDocuments(docs: DigitizedDocument[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_DOCS, JSON.stringify(docs));
    } catch (e) {
      console.warn('Failed saving documents to localStorage (quota exceeded?):', e);
    }
  },

  addDocument(doc: DigitizedDocument): void {
    const docs = this.getDocuments();
    const existingIndex = docs.findIndex((d) => d.id === doc.id);
    if (existingIndex >= 0) {
      docs[existingIndex] = { ...doc, updatedAt: Date.now() };
    } else {
      docs.unshift(doc);
    }
    this.saveDocuments(docs);
  },

  updateDocument(doc: DigitizedDocument): void {
    const docs = this.getDocuments();
    const index = docs.findIndex((d) => d.id === doc.id);
    if (index >= 0) {
      docs[index] = { ...doc, updatedAt: Date.now() };
      this.saveDocuments(docs);
    }
  },

  deleteDocument(id: string): void {
    const docs = this.getDocuments().filter((d) => d.id !== id);
    this.saveDocuments(docs);
  },

  searchDocuments(query: string, categoryFilter: string = 'all'): {
    doc: DigitizedDocument;
    matchSnippets: string[];
    matchedKanglishTerm?: string;
    matchedKannadaTarget?: string;
    isPhoneticMatch?: boolean;
  }[] {
    const docs = this.getDocuments();
    return searchVaultPhonetically(docs, query, categoryFilter);
  },

  getSettings(): AppSettings {
    const envKey = (import.meta.env.VITE_GEMINI_API_KEY as string) || '';
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (!raw) return { ...DEFAULT_SETTINGS, geminiApiKey: envKey };
      const parsed = JSON.parse(raw);
      const model =
        !parsed.geminiModel || parsed.geminiModel.includes('1.5') || parsed.geminiModel.includes('2.0')
          ? 'gemini-3.8-flash'
          : parsed.geminiModel;
      return {
        ...DEFAULT_SETTINGS,
        ...parsed,
        geminiApiKey: parsed.geminiApiKey || envKey,
        geminiModel: model
      };
    } catch {
      return { ...DEFAULT_SETTINGS, geminiApiKey: envKey };
    }
  },

  saveSettings(settings: AppSettings): void {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed saving settings:', e);
    }
  },

  exportVaultBackup(): string {
    const docs = this.getDocuments();
    return JSON.stringify(docs, null, 2);
  },

  importVaultBackup(jsonString: string): boolean {
    try {
      const docs = JSON.parse(jsonString);
      if (Array.isArray(docs)) {
        this.saveDocuments(docs);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }
};
