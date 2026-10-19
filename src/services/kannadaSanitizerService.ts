/**
 * Universal Kannada Document Intelligence & Orthographic Sanitizer
 * Deterministic post-processing for any unknown Kannada document
 * (legal dockets, revenue RTCs, government circulars, bills, certificates, handwritten notes).
 * Eliminates Vision LLM hallucinations, repairs list markers, corrects numeral slips,
 * normalizes Unicode NFC, strips stamp/watermark noise, and standardizes section headers.
 */

const KANNADA_CHAR_REGEX = /[\u0C80-\u0CFF]/;

/**
 * Checks whether text contains Kannada Unicode characters
 */
export function containsKannada(text: string): boolean {
  return KANNADA_CHAR_REGEX.test(text);
}

/**
 * 1. UNICODE NORMALIZATION (NFC):
 * Enforces canonical Unicode composition so Kannada vowels, viramas,
 * and subscript consonant conjuncts (vattaksharas) do not decompose or clip.
 */
export function normalizeUnicodeNfc(text: string): string {
  if (!text) return '';
  return text.normalize('NFC');
}

/**
 * 2. NOISE & SECURITY WATERMARK STRIPPING:
 * Automatically filters out isolated lines of random garbage characters
 * caused by stamp paper guilloche patterns, security watermarks, or background textures.
 */
export function stripWatermarkNoise(text: string): string {
  if (!text) return '';

  const lines = text.split('\n');
  const cleanLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      cleanLines.push(line);
      continue;
    }

    // Skip legitimate table divider lines (|---|---|)
    if (/^\|?\s*[-:]+[-| :]*\|?$/.test(trimmed)) {
      cleanLines.push(line);
      continue;
    }

    // Detect isolated repetitive symbol patterns (e.g. ~~~~, * * * *, | | | |, ::...::, _~_~_)
    const isRepetitiveSymbols = /^([~`!@#$%^&*_\-+=\\|:;<>?./]{1,4}\s*){3,}$/.test(trimmed);

    // Calculate symbol density vs alphanumeric/Kannada characters
    const totalChars = trimmed.length;
    const alphanumericCount = (trimmed.match(/[\u0C80-\u0CFFa-zA-Z0-9]/g) || []).length;
    const symbolCount = (trimmed.match(/[~`!@#$%^&*_\-+=\\|:;<>?]/g) || []).length;

    // High symbol noise: >65% symbols and fewer than 3 actual letters/digits
    const isHighNoiseDensity = totalChars >= 4 && (symbolCount / totalChars > 0.65) && alphanumericCount < 3;

    if (isRepetitiveSymbols || isHighNoiseDensity) {
      // Discard the watermark/stamp texture noise line
      continue;
    }

    cleanLines.push(line);
  }

  return cleanLines.join('\n');
}

/**
 * 3. LIST MARKER REPAIR & ALIGNMENT:
 * - Detects lines starting with hallucinated Latin letters (L, I, |, l) before Kannada text and converts to sequential numbers.
 * - PREVENTS injection of duplicate English list numbers (1., 2.) in front of lines that already start with
 *   Kannada numerals (೧., ೨.) or directional markers (ಪೂರ್ವ:, ಪಶ್ಚಿಮ:, ಉತ್ತರ:, ದಕ್ಷಿಣ:).
 * - Strips accidental double markers like "1. ೧." -> "೧." or "1. ಪೂರ್ವ:" -> "ಪೂರ್ವ:".
 */
export function repairListMarkers(text: string): string {
  if (!text) return text;

  const lines = text.split('\n');
  let currentExpectedIndex = 1;
  let inNumberedList = false;

  const repairedLines = lines.map((line) => {
    let currentLine = line;
    const trimmed = currentLine.trim();
    if (!trimmed) {
      return currentLine;
    }

    // Clean duplicate list markers: e.g. "1. ೧." -> "೧.", "1. 1." -> "1.", "1. (೧)" -> "(೧)"
    currentLine = currentLine.replace(/^(\s*)[0-9]+[.)]\s+([0-9೧-೯]+[.)]|\(?[೧-೯೦-೯]+\)?|[0-9]+[-.)])/g, '$1$2');

    // Clean duplicate English numbers before directional boundaries: "1. ಪೂರ್ವ:" -> "ಪೂರ್ವ:"
    currentLine = currentLine.replace(/^(\s*)[0-9]+[.)]\s+(ಪೂರ್ವ|ಪಶ್ಚಿಮ|ಉತ್ತರ|ದಕ್ಷಿಣ|ಚಕ್ಕುಬಂದಿ|ಷರಾ)[:\-–]/g, '$1$2:');

    // Check if line contains Kannada
    if (!containsKannada(currentLine)) {
      return currentLine;
    }

    const cleanTrimmed = currentLine.trim();

    // Pattern A: Line explicitly starts with a valid Kannada numeral e.g. "೧.", "೨.", "೩."
    const kannadaNumMatch = cleanTrimmed.match(/^([೧-೯][೦-೯]*)[.)-]\s+(.*)$/);
    if (kannadaNumMatch) {
      inNumberedList = true;
      return currentLine; // Preserve authentic Kannada numerals exactly without Latin prepending!
    }

    // Pattern B: Line explicitly starts with an Arabic numeral e.g. "1.", "2."
    const existingNumMatch = cleanTrimmed.match(/^([0-9]+)[.)-]\s+(.*)$/);
    if (existingNumMatch) {
      const numVal = parseInt(existingNumMatch[1], 10);
      if (!isNaN(numVal)) {
        currentExpectedIndex = numVal + 1;
        inNumberedList = true;
      }
      return currentLine;
    }

    // Pattern C: Directional or boundary label (e.g. "ಪೂರ್ವ:", "ಪಶ್ಚಿಮ:") -> reset list tracking
    if (/^(ಪೂರ್ವ|ಪಶ್ಚಿಮ|ಉತ್ತರ|ದಕ್ಷಿಣ|ಚಕ್ಕುಬಂದಿ|ವಿಷಯ|ಉಲ್ಲೇಖ|ಆದೇಶ|ಷರಾ)[:\-–]/.test(cleanTrimmed)) {
      inNumberedList = false;
      currentExpectedIndex = 1;
      return currentLine;
    }

    // Pattern D: Line starts with hallucinated Latin glyphs: 'L', 'I', '|', 'l', '!'
    // followed by Kannada script (e.g., "L ಹೆಚ್.ಎನ್.", "I ಮಂಜುನಾಥ್", "| ಶ್ರೀಮತಿ")
    const leadingLatinMatch = currentLine.match(/^(\s*)([LI|l!][.)]?|[Zz][.)]?)\s+([\u0C80-\u0CFF].*)$/);
    if (leadingLatinMatch) {
      const indent = leadingLatinMatch[1];
      const restOfLine = leadingLatinMatch[3];
      
      const assignedIndex = inNumberedList ? currentExpectedIndex : 1;
      currentExpectedIndex = assignedIndex + 1;
      inNumberedList = true;

      return `${indent}${assignedIndex}. ${restOfLine}`;
    }

    // Pattern E: Line starts with pipe artifact before a number or text: "| 1." or "| ೧."
    const pipeNumberedMatch = currentLine.match(/^(\s*)[|]\s*([0-9೧-೯]+[.)]\s+[\u0C80-\u0CFF].*)$/);
    if (pipeNumberedMatch) {
      return `${pipeNumberedMatch[1]}${pipeNumberedMatch[2]}`;
    }

    // Reset list state on section header
    if (cleanTrimmed.includes(':-') || cleanTrimmed.endsWith(':')) {
      inNumberedList = false;
      currentExpectedIndex = 1;
    }

    return currentLine;
  });

  return repairedLines.join('\n');
}

/**
 * 4. KANNADA NUMERAL CORRECTIONS:
 * Automatically corrects common OCR slips where the Kannada digit '೧' (one) is misread
 * as '0' (zero), especially in multi-lakh financial figures (e.g. converting erroneous
 * "02,50,000" or "0೪" to "೧೨,50,000" or "೧೪" based on context).
 */
export function correctKannadaNumerals(text: string): string {
  if (!text) return text;

  let cleaned = text;

  // A. Correct leading zero in Indian currency figures:
  // e.g., "₹ 02,50,000" or "Rs. 01,00,000" -> "₹ ೧೨,50,000" / "Rs. 1,00,000"
  cleaned = cleaned.replace(/(₹|Rs\.?|ರೂ\.?)\s*0([1-9][0-9]?,[0-9]{2},[0-9]{3})/g, '$1 ೧$2');
  cleaned = cleaned.replace(/(₹|Rs\.?|ರೂ\.?)\s*0([0-9]{2,3},[0-9]{3})/g, '$1 ೧$2');

  // B. Correct mixed digit slip "0೪" -> "೧೪" when surrounded by Kannada words or date separators
  cleaned = cleaned.replace(/([\u0C80-\u0CFF\s])0([೨-೯])([\u0C80-\u0CFF\s.,])/g, '$1೧$2$3');

  // C. Correct "0" before slashes in docket references: e.g. "0/2010" when preceded by case number labels
  cleaned = cleaned.replace(/(ದಾವಾ ಸಂ\.?|ಮೂಲ\.ದಾ\.ಸಂ\.?|O\.?S\.?\s*No\.?)\s*0\/(\d{4})/gi, '$1 ______ /$2');

  // D. Distinguish Kannada numeral '೧' from Latin 'l' or 'I' inside Kannada sentences
  cleaned = cleaned.replace(/([\u0C80-\u0CFF])\s+[lI]\s+([\u0C80-\u0CFF])/g, '$1 ೧ $2');

  return cleaned;
}

/**
 * 5. STRAY LATIN LINE REMOVAL:
 * Vision models occasionally hallucinate isolated short Latin words (e.g. 'on', 'in', 'to', 'L', 'I')
 * on their own line between Kannada paragraphs or lines.
 * This filter eliminates isolated 1-to-2 letter stray Latin words that sit on their own line.
 */
export function removeStrayLatinLines(text: string): string {
  if (!text) return text;

  const lines = text.split('\n');
  const filtered: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim().toLowerCase();

    // Isolated 1-2 letter Latin noise (e.g. 'on', 'in', 'to', 'or', 'as', 'at', 'is', 'it', 'an', 'by', 'of', 'if', 'l', 'i', 'o')
    const isStrayLatinWord = /^(on|in|to|or|as|at|is|it|an|by|of|if|l|i|o|z|x|no|so|do|up)$/i.test(trimmed);
    const isIsolatedSingleChar = /^[a-z0-9!|#^~_+=<>;*]$/i.test(trimmed);

    if (isStrayLatinWord || isIsolatedSingleChar) {
      // Check surrounding lines: if either previous or next line is Kannada, this is stray OCR noise
      const prevIsKannada = i > 0 && containsKannada(lines[i - 1]);
      const nextIsKannada = i < lines.length - 1 && containsKannada(lines[i + 1]);

      if (prevIsKannada || nextIsKannada) {
        // Drop the hallucinated Latin artifact line
        continue;
      }
    }

    filtered.push(line);
  }

  return filtered.join('\n');
}

/**
 * 6. COMMON LEGAL & ADMINISTRATIVE TERM NORMALIZATION:
 * Fixes single-character OCR slips in Kannada legal/administrative context:
 * - 'ಬನ್' or 'ಬನ್.' between proper nouns -> 'ಬಿನ್' (son of / daughter of)
 * - 'ಕೋಂ.' -> 'ಕೋಂ' (wife of)
 * - 'ವಾಸ.' -> 'ವಾಸ' (residence)
 * - 'ವಾದಿಗಳು : -' or 'ಪ್ರತಿವಾದಿಗಳು : -' -> 'ವಾದಿಗಳು:-' and 'ಪ್ರತಿವಾದಿಗಳು:-'
 * - Preserves fillable underlines before slashes/years: 'ಮೂಲ.ದಾ.ಸಂ. ______ /2010'
 * - Normalizes spacing around Kannada initialisms (e.g. 'ಹೆಚ್ . ಎನ್ .' -> 'ಹೆಚ್.ಎನ್.')
 */
export function normalizeKannadaLegalTerms(text: string): string {
  if (!text) return text;

  let cleaned = text;

  // A. Normalize legal relationship: "ಬನ್" / "ಬನ್." between names -> "ಬಿನ್"
  cleaned = cleaned.replace(/([\u0C80-\u0CFF]+)\s+ಬನ್\.?\s+([\u0C80-\u0CFF]+)/g, '$1 ಬಿನ್ $2');
  cleaned = cleaned.replace(/(\s+)ಬನ್\.(\s+)/g, '$1ಬಿನ್$2');

  // B. Normalize "ಕೋಂ" (wife of)
  cleaned = cleaned.replace(/([\u0C80-\u0CFF]+)\s+ಕೋಂ\.?\s+([\u0C80-\u0CFF]+)/g, '$1 ಕೋಂ $2');

  // C. Normalize "ವಾಸ" (residence)
  cleaned = cleaned.replace(/([\u0C80-\u0CFF]+)\s+ವಾಸ\.?\s+([\u0C80-\u0CFF]+)/g, '$1 ವಾಸ $2');

  // D. Broken Colons & Dashes in Legal / Official Headings:
  cleaned = cleaned.replace(/(ವಾದಿಗಳು|ಪ್ರತಿವಾದಿಗಳು|ವಾದಿ|ಪ್ರತಿವಾದಿ|ವಿಷಯ|ಉಲ್ಲೇಖ|ಮನವಿ|ಆದೇಶ|ಕಾರಣ|ಅರ್ಜಿದಾರರು|ಚಕ್ಕುಬಂದಿ)\s*[:\-–—]+\s*[:\-–—]*/g, '$1:-');

  // E. Underlines & Blank Fields in Case Numbers (e.g., "ಮೂಲ.ದಾ.ಸಂ. ______ /2010")
  cleaned = cleaned.replace(/([_—–-]{2,})\s*\/(\s*)(\d{2,4})/g, '$1 /$2$3');

  // F. Kannada Initialisms with Periods:
  cleaned = cleaned.replace(/([\u0C85-\u0CB9])\s*\.\s*([\u0C85-\u0CB9])\s*\./g, '$1.$2.');
  cleaned = cleaned.replace(/([\u0C85-\u0CB9]\.[\u0C85-\u0CB9]\.)\s*([\u0C85-\u0CB9])\s*\./g, '$1$2.');

  return cleaned;
}

/**
 * 7. COMPLETE UNIVERSAL SANITIZATION PIPELINE:
 * Applies all deterministic Kannada filters in optimal order:
 * NFC Normalization -> Watermark Noise Stripping -> Stray Latin Removal ->
 * List Marker Alignment -> Numeral Corrections -> Legal Normalization -> Whitespace Formatting.
 */
export function sanitizeKannadaDocumentText(text: string): string {
  if (!text) return '';

  // Step 1: Enforce Unicode NFC Canonical Composition
  let result = normalizeUnicodeNfc(text);

  // Step 2: Strip guilloche stamp paper and security watermark noise
  result = stripWatermarkNoise(result);

  // Step 3: Remove isolated stray Latin words (e.g. 'on', 'in', 'L')
  result = removeStrayLatinLines(result);

  // Step 4: Repair sequential list markers & prevent duplicate English markers before Kannada numerals
  result = repairListMarkers(result);

  // Step 5: Correct Kannada numeral OCR slips (e.g. leading 0 in lakh figures)
  result = correctKannadaNumerals(result);

  // Step 6: Normalize legal terms, relationships, colons, and initialisms
  result = normalizeKannadaLegalTerms(result);

  // Step 7: Clean up excess blank lines while preserving document layout
  result = result.replace(/\n{3,}/g, '\n\n').trim();

  return result;
}

/**
 * 8. SYNC BLOCK HEADING RE-ATTACHMENT & SANITIZATION:
 * In OCR layouts, a heading like "ಪ್ರತಿವಾದಿಗಳು:-" sometimes ends up at the
 * bottom of the previous section instead of at the start of the section it introduces.
 * This helper ensures headings attach to their respective content blocks.
 */
export function sanitizeSyncBlocks<T extends { extractedText: string; labelKn?: string; labelEn?: string }>(blocks: T[]): T[] {
  if (!blocks || blocks.length === 0) return blocks;

  const sanitized = blocks.map((b) => ({
    ...b,
    extractedText: sanitizeKannadaDocumentText(b.extractedText)
  }));

  // Re-attach trailing section headers (like "ಪ್ರತಿವಾದಿಗಳು:-" or "ವಾದಿಗಳು:-")
  const headingKeywords = ['ಪ್ರತಿವಾದಿಗಳು:-', 'ವಾದಿಗಳು:-', 'ಪ್ರತಿವಾದಿ:-', 'ವಾದಿ:-', 'ಆದೇಶ:-', 'ಷರಾ:-', 'ಚಕ್ಕುಬಂದಿ:-'];

  for (let i = 0; i < sanitized.length - 1; i++) {
    const currentLines = sanitized[i].extractedText.split('\n');
    const lastLine = currentLines[currentLines.length - 1]?.trim() || '';

    if (headingKeywords.some((kw) => lastLine === kw || lastLine.endsWith(kw))) {
      // The last line is a heading for the next section! Move it to the start of the next block.
      currentLines.pop();
      sanitized[i].extractedText = currentLines.join('\n').trim();
      sanitized[i + 1].extractedText = `${lastLine}\n${sanitized[i + 1].extractedText}`.trim();
    }
  }

  return sanitized;
}
