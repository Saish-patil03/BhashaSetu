import { DigitizedDocument } from '../types';

/**
 * Phonetic "Kanglish" dictionary mapping English terms/names to Kannada script variations.
 * Supports colloquial Latin spelling variations for Karnataka agricultural, governmental, and civic terms.
 */
const KANGLISH_DICTIONARY: Record<string, string[]> = {
  // Names
  manjunath: ['ಮಂಜುನಾಥ್', 'ಮಂಜುನಾಥ', 'ಶ್ರೀ ಮಂಜುನಾಥ್ ಗೌಡ'],
  manjunatha: ['ಮಂಜುನಾಥ', 'ಮಂಜುನಾಥ್', 'ಶ್ರೀ ಮಂಜುನಾಥ್ ಗೌಡ'],
  gowda: ['ಗೌಡ', 'ಗೌಡ್ರು', 'ಶ್ರೀ ಮಂಜುನಾಥ್ ಗೌಡ'],
  ramakrishna: ['ರಾಮಕೃಷ್ಣ', 'ರಾಮಕೃಷ್ಣ ಹೆಬ್ಬಾರ್'],
  subramanya: ['ಸುಬ್ರಹ್ಮಣ್ಯ', 'ಸುಬ್ರಮಣ್ಯ', 'ಸುಬ್ರಹ್ಮಣ್ಯ ಹೆಬ್ಬಾರ್'],
  subrahmanya: ['ಸುಬ್ರಹ್ಮಣ್ಯ', 'ಸುಬ್ರಹ್ಮಣ್ಯ ಹೆಬ್ಬಾರ್'],
  hebbar: ['ಹೆಬ್ಬಾರ್', 'ಹೆಬ್ಬಾರ'],
  venkatesh: ['ವೆಂಕಟೇಶ', 'ವೆಂಕಟೇಶ್'],

  // Places / Districts
  mandya: ['ಮಂಡ್ಯ', 'ಮಂಡ್ಯ ತಾಲ್ಲೂಕು', 'ಮಂಡ್ಯ ಜಿಲ್ಲೆ'],
  keregodu: ['ಕೆರಗೋಡು'],
  halebeedu: ['ಹಳೇಬೀಡು', 'ಹಳೆಬೀಡು'],
  halebidu: ['ಹಳೇಬೀಡು', 'ಹಳೆಬೀಡು'],
  belur: ['ಬೇಲೂರು'],
  hassan: ['ಹಾಸನ', 'ಹಾಸನ ಜಿಲ್ಲೆ'],
  tirthahalli: ['ತೀರ್ಥಹಳ್ಳಿ'],
  thirthahalli: ['ತೀರ್ಥಹಳ್ಳಿ'],
  bengaluru: ['ಬೆಂಗಳೂರು'],
  bangalore: ['ಬೆಂಗಳೂರು'],
  mysuru: ['ಮೈಸೂರು'],
  mysore: ['ಮೈಸೂರು'],

  // Crops & Produce
  ragi: ['ರಾಗಿ'],
  paddy: ['ಭತ್ತ'],
  bhatta: ['ಭತ್ತ'],
  bhattha: ['ಭತ್ತ'],
  sona: ['ಸೋನಾ', 'ಸೋನಾ ಮಸೂರಿ'],
  masoori: ['ಮಸೂರಿ', 'ಸೋನಾ ಮಸೂರಿ'],
  adike: ['ಅಡಿಕೆ', 'ಅಡಕೆ'],
  arecanut: ['ಅಡಿಕೆ'],
  betelnut: ['ಅಡಿಕೆ'],
  totad: ['ತೋಟ'],
  bele: ['ಬೆಳೆ'],

  // Civic / Govt Terms
  apmc: ['ಕೃಷಿ ಉತ್ಪನ್ನ ಮಾರುಕಟ್ಟೆ ಸಮಿತಿ', 'APMC', 'ಮಾರುಕಟ್ಟೆ'],
  fruits: ['ಫ್ರೂಟ್ಸ್', 'FRUITS'],
  rtc: ['ಪಹಣಿ', 'RTC'],
  pahani: ['ಪಹಣಿ'],
  aadhar: ['ಆಧಾರ್', 'Aadhaar'],
  aadhaar: ['ಆಧಾರ್'],
  npci: ['NPCI'],
  panchayat: ['ಪಂಚಾಯತಿ', 'ಗ್ರಾಮ ಪಂಚಾಯತಿ', 'ಪಂಚಾಯತ್'],
  panchayati: ['ಪಂಚಾಯತಿ', 'ಗ್ರಾಮ ಪಂಚಾಯತಿ'],
  grama: ['ಗ್ರಾಮ', 'ಗ್ರಾಮ ಪಂಚಾಯತಿ'],
  pdo: ['ಪಂಚಾಯತಿ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿ', 'PDO'],
  patti: ['ಮಾರಾಟ ಪಟ್ಟಿ', 'ರಶೀದಿ'],
  rasidi: ['ರಶೀದಿ'],
  receipt: ['ರಶೀದಿ', 'ಮಾರಾಟ ಪಟ್ಟಿ'],
  kist: ['ಕಂತು'],
  parihara: ['ಪರಿಹಾರ'],
  drought: ['ಬರ ಪರಿಹಾರ', 'ಬರ'],
  survey: ['ಸರ್ವೆ', 'ಸರ್ವೆ ನಂ']
};

/**
 * Maps English digits to Kannada numerals and vice versa
 */
const EN_TO_KN_NUMERALS: Record<string, string> = {
  '0': '೦',
  '1': '೧',
  '2': '೨',
  '3': '೩',
  '4': '೪',
  '5': '೫',
  '6': '೬',
  '7': '೭',
  '8': '೮',
  '9': '೯'
};

const KN_TO_EN_NUMERALS: Record<string, string> = {
  '೦': '0',
  '೧': '1',
  '೨': '2',
  '೩': '3',
  '೪': '4',
  '೫': '5',
  '೬': '6',
  '೭': '7',
  '೮': '8',
  '೯': '9'
};

/**
 * Converts English number string to Kannada numerals
 * e.g. "82050" -> "೮೨೦೫೦"
 */
export function convertEnToKnNumerals(numStr: string): string {
  return numStr
    .split('')
    .map((ch) => EN_TO_KN_NUMERALS[ch] || ch)
    .join('');
}

/**
 * Converts Kannada numerals to English digits
 * e.g. "೭೩೫೦೦" -> "73500"
 */
export function convertKnToEnNumerals(numStr: string): string {
  return numStr
    .split('')
    .map((ch) => KN_TO_EN_NUMERALS[ch] || ch)
    .join('');
}

/**
 * Generates all search query variants including:
 * 1. Normalized Latin lower query
 * 2. Phonetic Kannada translations from Kanglish dictionary
 * 3. Kannada numeral representations if digits are present
 * 4. English numeral representations if Kannada digits are present
 */
export function generatePhoneticQueryVariants(rawQuery: string): {
  variants: string[];
  isKanglish: boolean;
  detectedTerms: string[];
} {
  const trimmed = rawQuery.trim().toLowerCase();
  if (!trimmed) {
    return { variants: [], isKanglish: false, detectedTerms: [] };
  }

  const variants = new Set<string>();
  const detectedTerms = new Set<string>();
  variants.add(trimmed);

  // Split multi-word query
  const words = trimmed.split(/[\s,.-]+/).filter(Boolean);

  for (const word of words) {
    // Check Kanglish dictionary
    if (KANGLISH_DICTIONARY[word]) {
      detectedTerms.add(word);
      KANGLISH_DICTIONARY[word].forEach((k) => {
        variants.add(k.toLowerCase());
        variants.add(k);
      });
    }

    // Number conversion (English to Kannada digits)
    if (/\d+/.test(word)) {
      const cleanDigits = word.replace(/[^\d]/g, '');
      const knDigits = convertEnToKnNumerals(cleanDigits);
      variants.add(knDigits);
      detectedTerms.add(word);
    }

    // Number conversion (Kannada to English digits)
    if (/[೦-೯]+/.test(word)) {
      const enDigits = convertKnToEnNumerals(word);
      variants.add(enDigits);
      detectedTerms.add(word);
    }
  }

  // Also check if the full phrase itself is in the dictionary
  if (KANGLISH_DICTIONARY[trimmed]) {
    detectedTerms.add(trimmed);
    KANGLISH_DICTIONARY[trimmed].forEach((k) => variants.add(k.toLowerCase()));
  }

  return {
    variants: Array.from(variants),
    isKanglish: detectedTerms.size > 0,
    detectedTerms: Array.from(detectedTerms)
  };
}

export interface PhoneticSearchResult {
  doc: DigitizedDocument;
  matchSnippets: string[];
  matchedKanglishTerm?: string;
  matchedKannadaTarget?: string;
  isPhoneticMatch: boolean;
}

/**
 * Searches a document list using cross-script Kanglish + Kannada + English phonetic matching.
 */
export function searchVaultPhonetically(
  docs: DigitizedDocument[],
  query: string,
  categoryFilter: string = 'all'
): PhoneticSearchResult[] {
  const q = query.trim();
  if (!q) {
    return docs
      .filter((d) => categoryFilter === 'all' || d.category === categoryFilter)
      .map((doc) => ({
        doc,
        matchSnippets: [],
        isPhoneticMatch: false
      }));
  }

  const { variants, isKanglish, detectedTerms } = generatePhoneticQueryVariants(q);

  const results: PhoneticSearchResult[] = [];

  for (const doc of docs) {
    if (categoryFilter !== 'all' && doc.category !== categoryFilter) {
      continue;
    }

    const titleLower = doc.title.toLowerCase();
    const textLower = doc.rawKannadaText.toLowerCase();
    const normalizedKnDigitsText = convertKnToEnNumerals(doc.rawKannadaText);
    const enTransLower = doc.translations.english.toLowerCase();
    const hiTransLower = doc.translations.hindi.toLowerCase();
    const summaryKnLower = doc.summary.simplifiedKannada.join(' ').toLowerCase();
    const summaryEnLower = doc.summary.simplifiedEnglish.join(' ').toLowerCase();

    let isMatch = false;
    let matchedVariant = '';
    let matchedInKannada = false;
    const snippets: string[] = [];

    for (const v of variants) {
      const vLower = v.toLowerCase();

      // Check text in native script
      if (textLower.includes(vLower)) {
        isMatch = true;
        matchedVariant = v;
        matchedInKannada = true;

        // Build snippet
        const idx = textLower.indexOf(vLower);
        const start = Math.max(0, idx - 45);
        const end = Math.min(doc.rawKannadaText.length, idx + vLower.length + 65);
        const snippet = '...' + doc.rawKannadaText.slice(start, end).replace(/\n+/g, ' ') + '...';
        if (!snippets.includes(snippet)) snippets.push(snippet);
        break;
      }

      // Check normalized Kannada digits (e.g. searching "82050" or "73500" in Kannada numeral text)
      if (normalizedKnDigitsText.includes(vLower)) {
        isMatch = true;
        matchedVariant = v;
        matchedInKannada = true;
        const idx = normalizedKnDigitsText.indexOf(vLower);
        const start = Math.max(0, idx - 45);
        const end = Math.min(doc.rawKannadaText.length, idx + vLower.length + 65);
        const snippet = '...' + doc.rawKannadaText.slice(start, end).replace(/\n+/g, ' ') + '...';
        if (!snippets.includes(snippet)) snippets.push(snippet);
        break;
      }

      // Check Title
      if (titleLower.includes(vLower)) {
        isMatch = true;
        matchedVariant = v;
        if (!snippets.includes(doc.title)) snippets.push(doc.title);
        break;
      }

      // Check Summary
      if (summaryKnLower.includes(vLower)) {
        isMatch = true;
        matchedVariant = v;
        matchedInKannada = true;
        const matchPoint = doc.summary.simplifiedKannada.find((s) => s.toLowerCase().includes(vLower));
        if (matchPoint && !snippets.includes(matchPoint)) snippets.push(matchPoint);
        break;
      }

      // Check English Translation
      if (enTransLower.includes(vLower)) {
        isMatch = true;
        matchedVariant = v;
        const idx = enTransLower.indexOf(vLower);
        const start = Math.max(0, idx - 40);
        const end = Math.min(doc.translations.english.length, idx + vLower.length + 60);
        const snippet = '...' + doc.translations.english.slice(start, end).replace(/\n+/g, ' ') + '...';
        if (!snippets.includes(snippet)) snippets.push(snippet);
        break;
      }

      // Check Hindi Translation
      if (hiTransLower.includes(vLower)) {
        isMatch = true;
        matchedVariant = v;
        break;
      }

      // Check English Summary
      if (summaryEnLower.includes(vLower)) {
        isMatch = true;
        matchedVariant = v;
        const matchPoint = doc.summary.simplifiedEnglish.find((s) => s.toLowerCase().includes(vLower));
        if (matchPoint && !snippets.includes(matchPoint)) snippets.push(matchPoint);
        break;
      }
    }

    if (isMatch) {
      const isCrossScript = isKanglish && matchedInKannada;
      results.push({
        doc,
        matchSnippets: snippets.slice(0, 2),
        matchedKanglishTerm: detectedTerms[0],
        matchedKannadaTarget: matchedVariant,
        isPhoneticMatch: isCrossScript
      });
    }
  }

  return results;
}
