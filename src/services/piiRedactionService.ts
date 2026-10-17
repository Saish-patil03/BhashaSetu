// Service to detect and redact Personally Identifiable Information (PII)
// Supports Kannada numerals (೦ ೧ ೨ ೩ ೪ ೫ ೬ ೭ ೮ ೯) and standard Indian document identifiers

export interface PiiRedactionResult {
  redactedText: string;
  totalRedacted: number;
  detections: {
    type: 'phone' | 'gstin' | 'license' | 'aadhaar_bank' | 'ref_no';
    original: string;
    masked: string;
  }[];
}

export function redactPii(rawText: string): PiiRedactionResult {
  if (!rawText) {
    return { redactedText: '', totalRedacted: 0, detections: [] };
  }

  const detections: PiiRedactionResult['detections'] = [];
  let text = rawText;

  // 1. GSTIN masking (e.g. 29AAAGC1023K1ZM -> 29AAAGC****K1ZM)
  const gstinRegex = /\b(\d{2}[A-Z]{5})(\d{4})([A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1})\b/g;
  text = text.replace(gstinRegex, (match, prefix, mid, suffix) => {
    const masked = `${prefix}****${suffix}`;
    detections.push({ type: 'gstin', original: match, masked });
    return masked;
  });

  // 2. License / Registration IDs (e.g. APMC/MDY/4492 -> APMC/MDY/••••)
  const licenseRegex = /\b(APMC\/[A-Z]{3}\/)(\d{3,5})\b/gi;
  text = text.replace(licenseRegex, (match, prefix, num) => {
    const masked = `${prefix}••••`;
    detections.push({ type: 'license', original: match, masked });
    return masked;
  });

  // Reference IDs with Kannada numerals (e.g. MDY-೨೬-೮೯೨ -> MDY-••-•••)
  const refNumRegex = /\b(MDY-[೦-೯\d]{2}-)([೦-೯\d]{3,5})\b/g;
  text = text.replace(refNumRegex, (match, prefix, num) => {
    const masked = `${prefix}••••`;
    detections.push({ type: 'ref_no', original: match, masked });
    return masked;
  });

  // 3. Phone Numbers (English 10-digit mobile & Kannada numerals ೯೮೪೫೦...)
  // English format: 98450-12345, 9845012345, +91 98450 12345
  const phoneEnRegex = /(?:\+91[-.\s]?)?([6-9]\d{4})[-.\s]?(\d{5})\b/g;
  text = text.replace(phoneEnRegex, (match, first5, last5) => {
    const masked = `${first5}-XXXXX`;
    detections.push({ type: 'phone', original: match, masked });
    return masked;
  });

  // Kannada 10-digit phone format (using Kannada numerals ೦-೯)
  const phoneKnRegex = /([೬-೯][೦-೯]{4})[-.\s]?([೦-೯]{5})/g;
  text = text.replace(phoneKnRegex, (match, first5, last5) => {
    const masked = `${first5}-XXXXX`;
    detections.push({ type: 'phone', original: match, masked });
    return masked;
  });

  // 4. Aadhaar / Bank Account / Survey sensitive numbers (e.g., 12-digit patterns or account numbers)
  const bankAccRegex = /(ಖಾತೆ\s*ಸಂಖ್ಯೆ|A\/C\s*(?:No)?|Account\s*(?:No)?)\s*[:=]?\s*([೦-೯\d]{6,16})/gi;
  text = text.replace(bankAccRegex, (match, label, accNum) => {
    const visibleLen = Math.min(3, accNum.length);
    const maskedNum = '••••••••' + accNum.slice(-visibleLen);
    const masked = `${label}: ${maskedNum} (ಮರೆಮಾಡಲಾಗಿದೆ)`;
    detections.push({ type: 'aadhaar_bank', original: match, masked });
    return masked;
  });

  // Aadhaar numbers (e.g. 12 digits separated by spaces or hyphens)
  const aadhaarRegex = /\b(\d{4}[-\s]\d{4})[-\s](\d{4})\b/g;
  text = text.replace(aadhaarRegex, (match, first8, last4) => {
    const masked = `XXXX-XXXX-${last4}`;
    detections.push({ type: 'aadhaar_bank', original: match, masked });
    return masked;
  });

  return {
    redactedText: text,
    totalRedacted: detections.length,
    detections
  };
}
