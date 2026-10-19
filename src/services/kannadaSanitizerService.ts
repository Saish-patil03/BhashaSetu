/**
 * Kannada Document Intelligence & Orthographic Sanitizer
 * Deterministic post-processing for Kannada legal, revenue, administrative,
 * and official documents. Eliminates Vision LLM hallucinations, repairs list
 * markers, normalizes legal relationships, and standardizes section headers.
 */

const KANNADA_CHAR_REGEX = /[\u0C80-\u0CFF]/;

/**
 * Checks whether text contains Kannada Unicode characters
 */
export function containsKannada(text: string): boolean {
  return KANNADA_CHAR_REGEX.test(text);
}

/**
 * 1. LIST MARKER REPAIR:
 * In OCR and Vision LLM output, sequential numbers (1., 2., 3.) are often
 * misread as Latin glyphs: 'L', 'I', '|', 'l', 'Z'.
 * If a line inside a Kannada section starts with 'L ', 'I ', or '| '
 * followed by Kannada text (e.g. "L ಹೆಚ್.ಎನ್."), repair it to "1. ".
 * Also tracks sequential list context (1., 2., 3...).
 */
export function repairListMarkers(text: string): string {
  if (!text) return text;

  const lines = text.split('\n');
  let currentExpectedIndex = 1;
  let inNumberedList = false;

  const repairedLines = lines.map((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      return line;
    }

    // Check if line contains Kannada
    if (!containsKannada(line)) {
      return line;
    }

    // Pattern A: Line explicitly starts with an existing valid number like "1.", "2.", "೧.", "೨."
    const existingNumMatch = trimmed.match(/^([0-9೧-೯]+)[.)-]\s+(.*)$/);
    if (existingNumMatch) {
      const numVal = parseInt(
        existingNumMatch[1]
          .replace(/೧/g, '1')
          .replace(/೨/g, '2')
          .replace(/೩/g, '3')
          .replace(/೪/g, '4')
          .replace(/೫/g, '5')
          .replace(/೬/g, '6')
          .replace(/೭/g, '7')
          .replace(/೮/g, '8')
          .replace(/೯/g, '9'),
        10
      );
      if (!isNaN(numVal)) {
        currentExpectedIndex = numVal + 1;
        inNumberedList = true;
      }
      return line;
    }

    // Pattern B: Line starts with hallucinated Latin list glyphs: 'L', 'I', '|', 'l', '!'
    // followed by Kannada script (e.g., "L ಹೆಚ್.ಎನ್.", "I ಮಂಜುನಾಥ್", "| ಶ್ರೀಮತಿ")
    const leadingLatinMatch = line.match(/^(\s*)([LI|l!][.)]?|[Zz][.)]?)\s+([\u0C80-\u0CFF].*)$/);
    if (leadingLatinMatch) {
      const indent = leadingLatinMatch[1];
      const restOfLine = leadingLatinMatch[3];
      
      const assignedIndex = inNumberedList ? currentExpectedIndex : 1;
      currentExpectedIndex = assignedIndex + 1;
      inNumberedList = true;

      return `${indent}${assignedIndex}. ${restOfLine}`;
    }

    // Pattern C: Line starts with pipe or bracket artifact before a number or text: "| 1." or "[1]"
    const pipeNumberedMatch = line.match(/^(\s*)[|]\s*([0-9೧-೯]+[.)]\s+[\u0C80-\u0CFF].*)$/);
    if (pipeNumberedMatch) {
      return `${pipeNumberedMatch[1]}${pipeNumberedMatch[2]}`;
    }

    // If it's a section heading, reset list expectation
    if (trimmed.includes(':-') || trimmed.endsWith(':')) {
      inNumberedList = false;
      currentExpectedIndex = 1;
    }

    return line;
  });

  return repairedLines.join('\n');
}

/**
 * 2. STRAY LATIN LINE REMOVAL:
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
 * 3. COMMON LEGAL & REVENUE TERM NORMALIZATION:
 * Fixes single-character OCR slips in Kannada legal/administrative context:
 * - 'ಬನ್' or 'ಬನ್.' between proper nouns -> 'ಬಿನ್' (son of / daughter of)
 * - 'ಕೋಂ.' -> 'ಕೋಂ' (wife of)
 * - 'ವಾದಿಗಳು : -' or 'ಪ್ರತಿವಾದಿಗಳು : -' -> 'ವಾದಿಗಳು:-' and 'ಪ್ರತಿವಾದಿಗಳು:-'
 * - Preserves fillable underlines before slashes/years: 'ಮೂಲ.ದಾ.ಸಂ. ______ /2010'
 * - Normalizes spacing around Kannada initialisms (e.g. 'ಹೆಚ್ . ಎನ್ .' -> 'ಹೆಚ್.ಎನ್.')
 */
export function normalizeKannadaLegalTerms(text: string): string {
  if (!text) return text;

  let cleaned = text;

  // A. Normalize legal relationship: "ಬನ್" / "ಬನ್." between names -> "ಬಿನ್"
  // Example: "ರಾಮಯ್ಯ ಬನ್ ಕೃಷ್ಣಪ್ಪ" -> "ರಾಮಯ್ಯ ಬಿನ್ ಕೃಷ್ಣಪ್ಪ"
  cleaned = cleaned.replace(/([\u0C80-\u0CFF]+)\s+ಬನ್\.?\s+([\u0C80-\u0CFF]+)/g, '$1 ಬಿನ್ $2');

  // Also catch standalone "ಬನ್." at start of lineage clause
  cleaned = cleaned.replace(/(\s+)ಬನ್\.(\s+)/g, '$1ಬಿನ್$2');

  // B. Normalize "ಕೋಂ" (wife of)
  cleaned = cleaned.replace(/([\u0C80-\u0CFF]+)\s+ಕೋಂ\.?\s+([\u0C80-\u0CFF]+)/g, '$1 ಕೋಂ $2');

  // C. Normalize "ವಾಸ" (residence)
  cleaned = cleaned.replace(/([\u0C80-\u0CFF]+)\s+ವಾಸ\.?\s+([\u0C80-\u0CFF]+)/g, '$1 ವಾಸ $2');

  // D. Broken Colons & Dashes in Legal / Official Headings:
  // e.g. "ವಾದಿಗಳು : -", "ಪ್ರತಿವಾದಿಗಳು - :", "ವಿಷಯ : -"
  cleaned = cleaned.replace(/(ವಾದಿಗಳು|ಪ್ರತಿವಾದಿಗಳು|ವಾದಿ|ಪ್ರತಿವಾದಿ|ವಿಷಯ|ಉಲ್ಲೇಖ|ಮನವಿ|ಆದೇಶ|ಕಾರಣ|ಅರ್ಜಿದಾರರು)\s*[:\-–—]+\s*[:\-–—]*/g, '$1:-');

  // E. Underlines & Blank Fields in Case Numbers (e.g., "ಮೂಲ.ದಾ.ಸಂ. ______ /2010")
  // Prevent underlines from merging into numbers like "_2010"
  cleaned = cleaned.replace(/([_—–-]{2,})\s*\/(\s*)(\d{2,4})/g, '$1 /$2$3');

  // F. Kannada Initialisms with Periods:
  // e.g. "ಹೆಚ್ . ಎನ್ . " -> "ಹೆಚ್.ಎನ್. "
  cleaned = cleaned.replace(/([\u0C85-\u0CB9])\s*\.\s*([\u0C85-\u0CB9])\s*\./g, '$1.$2.');
  cleaned = cleaned.replace(/([\u0C85-\u0CB9]\.[\u0C85-\u0CB9]\.)\s*([\u0C85-\u0CB9])\s*\./g, '$1$2.');

  return cleaned;
}

/**
 * 4. COMPLETE SANITIZATION PIPELINE:
 * Applies all deterministic Kannada filters in optimal order.
 */
export function sanitizeKannadaDocumentText(text: string): string {
  if (!text) return '';

  let result = text;

  // Step 1: Remove isolated stray Latin words (e.g. 'on', 'in', 'L')
  result = removeStrayLatinLines(result);

  // Step 2: Repair sequential list markers (e.g. "L ಹೆಚ್.ಎನ್." -> "1. ಹೆಚ್.ಎನ್.")
  result = repairListMarkers(result);

  // Step 3: Normalize legal terms, relationships, colons, and initialisms
  result = normalizeKannadaLegalTerms(result);

  // Step 4: Clean up excess blank lines while preserving document layout
  result = result.replace(/\n{3,}/g, '\n\n').trim();

  return result;
}

/**
 * 5. SYNC BLOCK HEADING RE-ATTACHMENT & SANITIZATION:
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
  const headingKeywords = ['ಪ್ರತಿವಾದಿಗಳು:-', 'ವಾದಿಗಳು:-', 'ಪ್ರತಿವಾದಿ:-', 'ವಾದಿ:-', 'ಆದೇಶ:-'];

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
