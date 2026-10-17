export type LayoutBlockId = string;

export interface LayoutBlockItem {
  id: LayoutBlockId;
  labelKn: string;
  labelEn: string;
  shortLabelKn: string;
  shortLabelEn: string;
  box: { top: number; left: number; width: number; height: number }; // Percentage coordinates
  extractedText: string;
}

// Preset definitions for the 3 demo sample documents
export const APMC_PRESET_BLOCKS: Omit<LayoutBlockItem, 'extractedText'>[] = [
  {
    id: 'header',
    labelKn: '೧. ಶೀರ್ಷಿಕೆ & ಕಾರ್ಯಾಲಯ (Header & Authority)',
    labelEn: '1. Header & Authority Emblem',
    shortLabelKn: 'ಶೀರ್ಷಿಕೆ (Header)',
    shortLabelEn: 'Header',
    box: { top: 3.5, left: 3.5, width: 93, height: 15 }
  },
  {
    id: 'metadata',
    labelKn: '೨. ರೈತರು & ದಾಖಲೆ ಸಂಖ್ಯೆ (Farmer & Ref Metadata)',
    labelEn: '2. Farmer & Reference Metadata',
    shortLabelKn: 'ರೈತರ ವಿವರ (Farmer)',
    shortLabelEn: 'Farmer Info',
    box: { top: 19.5, left: 3.5, width: 93, height: 8.5 }
  },
  {
    id: 'table',
    labelKn: '೩. ಉತ್ಪನ್ನಗಳ ಕೋಷ್ಟಕ & ದರ (Line-Item Table & Rates)',
    labelEn: '3. Line-Item Table & Crop Rates',
    shortLabelKn: 'ಕೋಷ್ಟಕ (Table)',
    shortLabelEn: 'Item Table',
    box: { top: 29, left: 3.5, width: 93, height: 25 }
  },
  {
    id: 'net_payable',
    labelKn: '೪. ನಿವ್ವಳ ಸಂದಾಯ ಮೊತ್ತ (Net Payable & Total)',
    labelEn: '4. Net Payable & Monetary Totals',
    shortLabelKn: 'ನಿವ್ವಳ ಮೊತ್ತ (Net Total)',
    shortLabelEn: 'Net Payable',
    box: { top: 55, left: 3.5, width: 93, height: 13 }
  },
  {
    id: 'stamp_signature',
    labelKn: '೫. ಅಧಿಕೃತ ಮುದ್ರೆ & ಸಹಿ (Stamp & Signature Block)',
    labelEn: '5. Official Stamp & Signature Block',
    shortLabelKn: 'ಮುದ್ರೆ & ಸಹಿ (Stamp)',
    shortLabelEn: 'Stamp & Sign',
    box: { top: 69.5, left: 3.5, width: 93, height: 20 }
  }
];

export const LAYOUT_BLOCK_DEFS = APMC_PRESET_BLOCKS;

/**
 * Infer a meaningful dynamic title and label for a paragraph chunk based on its content
 */
function inferParagraphTitle(text: string, index: number, total: number): {
  labelEn: string;
  labelKn: string;
  shortLabelEn: string;
  shortLabelKn: string;
} {
  const t = text.toLowerCase();

  // 1. Medical / Health Checks
  if (t.includes('ಸಂಪಾದಕ') || t.includes('ಓದುಗರಿಗೆ') || t.includes('ಲೇಖನಗಳನ್ನು ಪ್ರಕಟಿಸಲು') || t.includes('medical news')) {
    return {
      labelEn: `${index + 1}. Column Header & Editorial Note (ಸಂಪಾದಕೀಯ)`,
      labelKn: `${index + 1}. ಅಂಕಣ ಶೀರ್ಷಿಕೆ & ಸಂಪಾದಕೀಯ ಟಿಪ್ಪಣಿ`,
      shortLabelEn: 'Editorial Note',
      shortLabelKn: 'ಸಂಪಾದಕೀಯ'
    };
  }

  if (t.includes('ಡಯಾಬಿಟಿಸ್ ಅಥವಾ ಮಧುಮೇಹ') || t.includes('ಸಕ್ಕರೆ ರೋಗ') || t.includes('mellitus') || t.includes('ಪ್ರಾಚೀನ ದಾಖಲೆ')) {
    return {
      labelEn: `${index + 1}. Overview & Etymology of Diabetes (ಮಧುಮೇಹ ಪರಿಚಯ)`,
      labelKn: `${index + 1}. ಮಧುಮೇಹದ ಪರಿಚಯ & ಇತಿಹಾಸ`,
      shortLabelEn: 'Overview',
      shortLabelKn: 'ಪರಿಚಯ'
    };
  }

  if (t.includes('ಹೇಗೆ ಬರುತ್ತದೆ') || t.includes('ಇನ್ಸುಲಿನ್') || t.includes('ಪ್ಯಾಂಕ್ರಿಯಾಸ್') || t.includes('ಗ್ಲೂಕೋಸ್') || t.includes('ಹಾರ್ಮೋನ್')) {
    return {
      labelEn: `${index + 1}. Cause & Role of Insulin (ಡಯಾಬಿಟಿಸ್ ಹೇಗೆ ಬರುತ್ತದೆ?)`,
      labelKn: `${index + 1}. ಕಾರಣ & ಇನ್ಸುಲಿನ್ ಪಾತ್ರ`,
      shortLabelEn: 'Insulin Role',
      shortLabelKn: 'ಇನ್ಸುಲಿನ್'
    };
  }

  if (t.includes('ಚಿಕಿತ್ಸೆ') || t.includes('ಆಹಾರ') || t.includes('ಔಷಧ') || t.includes('ವ್ಯಾಯಾಮ')) {
    return {
      labelEn: `${index + 1}. Clinical Care & Advisory (ಚಿಕಿತ್ಸಾ ಮಾಹಿತಿ)`,
      labelKn: `${index + 1}. ಚಿಕಿತ್ಸೆ & ರಕ್ಷಣೆ`,
      shortLabelEn: 'Treatment',
      shortLabelKn: 'ಚಿಕಿತ್ಸೆ'
    };
  }

  // 2. Education / Study Certificate Checks
  if (t.includes('ಅಧಿಸೂಚನೆ') || t.includes('ಡಿಪಿಎಆರ್') || t.includes('ಸಿಆಸುಇ') || (t.includes('ಸರ್ಕಾರದ') && t.includes('ಆದೇಶ'))) {
    return {
      labelEn: `${index + 1}. Government Order Header (ಸರ್ಕಾರದ ಅಧಿಸೂಚನೆ ಮತ್ತು ಆದೇಶ)`,
      labelKn: `${index + 1}. ಸರ್ಕಾರದ ಅಧಿಸೂಚನೆ ಮತ್ತು ಆದೇಶ`,
      shortLabelEn: 'Govt Order',
      shortLabelKn: 'ಅಧಿಸೂಚನೆ'
    };
  }
  if (t.includes('ಕನ್ನಡ ಮಾಧ್ಯಮ') || t.includes('ವ್ಯಾಸಂಗ') || t.includes('ಪ್ರಮಾಣ ಪತ್ರ') || t.includes('ಕವಿತಾ') || t.includes('ಹೆಗಡೆ') || (t.includes('ತರಗತಿ') && t.includes('ಶೈಕ್ಷಣಿಕ'))) {
    return {
      labelEn: `${index + 1}. Certificate Title & Candidate Study Details (ಪ್ರಮಾಣ ಪತ್ರ ಮತ್ತು ಅಭ್ಯರ್ಥಿ ವಿವರ)`,
      labelKn: `${index + 1}. ಪ್ರಮಾಣ ಪತ್ರ ಮತ್ತು ಅಭ್ಯರ್ಥಿ ವಿವರ`,
      shortLabelEn: 'Study Details',
      shortLabelKn: 'ಅಭ್ಯರ್ಥಿ ವಿವರ'
    };
  }
  if (t.includes('ದಾಖಲಾತಿ ಸಂಖ್ಯೆ') || t.includes('ದಾಖಲಾತಿ ದಿನಾಂಕ') || t.includes('ಶಾಲೆ ಬಿಟ್ಟ') || t.includes('ಪ್ರವೇಶ ಸಂಖ್ಯೆ') || t.includes('ದಾಖಲಾತಿ ವಿವರ')) {
    return {
      labelEn: `${index + 1}. School Admission & Leaving Registry (ದಾಖಲಾತಿ ಸಂಖ್ಯೆ ಮತ್ತು ದಿನಾಂಕ)`,
      labelKn: `${index + 1}. ದಾಖಲಾತಿ ಸಂಖ್ಯೆ ಮತ್ತು ದಿನಾಂಕ`,
      shortLabelEn: 'Registry Dates',
      shortLabelKn: 'ದಾಖಲಾತಿ'
    };
  }
  if (t.includes('ಮೇಲುರುಜು') || t.includes('ಮೇಲ್ಸಹಿ') || t.includes('ಕ್ಷೇತ್ರ ಶಿಕ್ಷಣಾಧಿಕಾರಿ') || t.includes('beo') || t.includes('ಮುಖ್ಯಾಧ್ಯಾಪಕರು') || t.includes('ಮುಖ್ಯೋಪಾಧ್ಯಾಯ') || (t.includes('ಮೊಹರು') && t.includes('ಸಹಿ'))) {
    return {
      labelEn: `${index + 1}. Official Seals & Countersignatures (ಅಧಿಕೃತ ಮೊಹರು ಮತ್ತು ಸಹಿ)`,
      labelKn: `${index + 1}. ಅಧಿಕೃತ ಮೊಹರು ಮತ್ತು ಸಹಿ`,
      shortLabelEn: 'Seals & Sign',
      shortLabelKn: 'ಮೊಹರು & ಸಹಿ'
    };
  }

  // 3. APMC / Produce Receipt Checks
  if (t.includes('ಕೃಷಿ ಉತ್ಪನ್ನ') || t.includes('apmc') || t.includes('ಜಿಎಸ್‌ಟಿ')) {
    return {
      labelEn: `${index + 1}. Header & Authority Emblem`,
      labelKn: `${index + 1}. ಶೀರ್ಷಿಕೆ & ಕಾರ್ಯಾಲಯ`,
      shortLabelEn: 'Header',
      shortLabelKn: 'ಶೀರ್ಷಿಕೆ'
    };
  }
  if ((t.includes('ರೈತರ') && (t.includes('ಹೆಸರು') || t.includes('ವಿವರ') || t.includes('ಗೌಡ'))) || (t.includes('ರಶೀದಿ ಸಂ') && t.includes('ಮಾರಾಟ'))) {
    return {
      labelEn: `${index + 1}. Farmer & Reference Metadata`,
      labelKn: `${index + 1}. ರೈತರ ವಿವರ & ರಶೀದಿ ಸಂ`,
      shortLabelEn: 'Farmer Info',
      shortLabelKn: 'ರೈತರ ವಿವರ'
    };
  }
  if (t.includes('ಭತ್ತ') || t.includes('ರಾಗಿ') || t.includes('ಕ್ವಿಂಟಾಲ್') || (t.includes('ಕೋಷ್ಟಕ') && t.includes('ದರ'))) {
    return {
      labelEn: `${index + 1}. Line-Item Table & Rates`,
      labelKn: `${index + 1}. ಉತ್ಪನ್ನಗಳ ಕೋಷ್ಟಕ & ದರ`,
      shortLabelEn: 'Item Table',
      shortLabelKn: 'ಕೋಷ್ಟಕ'
    };
  }
  if (t.includes('ನಿವ್ವಳ') || t.includes('ಒಟ್ಟು ಮೊತ್ತ') || t.includes('ಕಳೆತ')) {
    return {
      labelEn: `${index + 1}. Net Payable & Monetary Totals`,
      labelKn: `${index + 1}. ನಿವ್ವಳ ಸಂದಾಯ ಮೊತ್ತ`,
      shortLabelEn: 'Net Payable',
      shortLabelKn: 'ನಿವ್ವಳ ಮೊತ್ತ'
    };
  }

  // 3. Government / Legal Checks
  if (t.includes('ಕರ್ನಾಟಕ ಸರ್ಕಾರ') || t.includes('ಗ್ರಾಮ ಪಂಚಾಯತಿ') || t.includes('ಪ್ರಕಟಣೆ')) {
    return {
      labelEn: `${index + 1}. Official Authority Header`,
      labelKn: `${index + 1}. ಸರ್ಕಾರಿ ಪ್ರಾಧಿಕಾರ & ಶೀರ್ಷಿಕೆ`,
      shortLabelEn: 'Header',
      shortLabelKn: 'ಶೀರ್ಷಿಕೆ'
    };
  }
  if (t.includes('ಷರತ್ತುಗಳು') || t.includes('ದಾಖಲೆಗಳು') || t.includes('ಅರ್ಜಿ')) {
    return {
      labelEn: `${index + 1}. Eligibility Criteria & Deadlines`,
      labelKn: `${index + 1}. ಅರ್ಹತೆ & ಷರತ್ತುಗಳು`,
      shortLabelEn: 'Criteria',
      shortLabelKn: 'ಷರತ್ತುಗಳು'
    };
  }
  if (t.includes('ಸಹಿ') || t.includes('ಮುಖ್ಯ ಕಾರ್ಯದರ್ಶಿ') || t.includes('pdo') || t.includes('ಮೊಹರು')) {
    return {
      labelEn: `${index + 1}. Official Stamp & Signature Block`,
      labelKn: `${index + 1}. ಅಧಿಕೃತ ಮುದ್ರೆ & ಸಹಿ`,
      shortLabelEn: 'Stamp & Sign',
      shortLabelKn: 'ಮುದ್ರೆ & ಸಹಿ'
    };
  }

  // 4. Clean General Inferred Titles from first line/heading
  const firstLine = text.split('\n')[0].trim().replace(/^[-*#\d.]+\s*/, '');
  if (firstLine && firstLine.length > 3 && firstLine.length < 40) {
    return {
      labelEn: `${index + 1}. ${firstLine}`,
      labelKn: `${index + 1}. ${firstLine}`,
      shortLabelEn: firstLine.slice(0, 15),
      shortLabelKn: firstLine.slice(0, 15)
    };
  }

  // Position-based fallback
  if (index === 0) {
    return {
      labelEn: `1. Document Header & Opening Section`,
      labelKn: `೧. ಆರಂಭಿಕ ವಿಭಾಗ (Header)`,
      shortLabelEn: 'Header',
      shortLabelKn: 'ಶೀರ್ಷಿಕೆ'
    };
  }

  if (index === total - 1 && total > 2) {
    return {
      labelEn: `${index + 1}. Closing & Authorization Block`,
      labelKn: `${index + 1}. ಮುಕ್ತಾಯ & ದೃಢೀಕರಣ`,
      shortLabelEn: 'Closing',
      shortLabelKn: 'ಮುಕ್ತಾಯ'
    };
  }

  return {
    labelEn: `${index + 1}. Section ${index + 1} Content`,
    labelKn: `${index + 1}. ವಿಭಾಗ ${index + 1} ವಿವರ`,
    shortLabelEn: `Section ${index + 1}`,
    shortLabelKn: `ವಿಭಾಗ ${index + 1}`
  };
}

/**
 * Splits extracted Kannada text into structured semantic sections.
 * 
 * CRITICAL RULES:
 * 1. NEVER slice Kannada text by arbitrary character indices (which breaks Unicode conjuncts / Vattaksharas).
 * 2. Split cleanly by natural paragraphs (\n\n) or non-empty line groups.
 * 3. Render as many Sync Blocks as the document actually has.
 * 4. Generate dynamic, domain-accurate titles for each block.
 */
export function parseDocumentIntoSyncBlocks(rawText: string = '', sampleId?: string): LayoutBlockItem[] {
  if (!rawText || !rawText.trim()) {
    return [];
  }

  const cleanText = rawText.trim();

  // If this is the APMC preset document and exact APMC text is loaded, use APMC layout
  if (sampleId === 'sample-apmc-invoice' && cleanText.includes('APMC') && cleanText.includes('ರೈತರ ಮಾರಾಟ')) {
    const lines = cleanText.split('\n').map((l) => l.trim()).filter(Boolean);
    const headerLines: string[] = [];
    const metaLines: string[] = [];
    const tableLines: string[] = [];
    const netLines: string[] = [];
    const stampLines: string[] = [];

    for (const line of lines) {
      const l = line.toLowerCase();
      if (l.includes('ಕೃಷಿ ಉತ್ಪನ್ನ') || l.includes('ಜಿಎಸ್‌ಟಿ') || l.includes('ಪರವಾನಗಿ')) {
        headerLines.push(line);
      } else if (l.includes('ರೈತರ') || l.includes('ರಶೀದಿ') || l.includes('ದಿನಾಂಕ') || l.includes('ಮಂಜುನಾಥ್') || l.includes('ವರ್ತಕರ')) {
        metaLines.push(line);
      } else if (l.includes('ಭತ್ತ') || l.includes('ರಾಗಿ') || l.includes('ಕ್ವಿಂಟಾಲ್') || l.includes('ತೂಕ')) {
        tableLines.push(line);
      } else if (l.includes('ಒಟ್ಟು ಮೌಲ್ಯ') || l.includes('ಕಳೆತ') || l.includes('ಹಮಾಲಿ') || l.includes('ನಿವ್ವಳ')) {
        netLines.push(line);
      } else {
        stampLines.push(line);
      }
    }

    return APMC_PRESET_BLOCKS.map((def) => {
      let txt = '';
      if (def.id === 'header') txt = headerLines.join('\n');
      else if (def.id === 'metadata') txt = metaLines.join('\n');
      else if (def.id === 'table') txt = tableLines.join('\n');
      else if (def.id === 'net_payable') txt = netLines.join('\n');
      else txt = stampLines.join('\n');

      return {
        ...def,
        extractedText: txt
      };
    });
  }

  // Split document by natural paragraph breaks (\n\s*\n+)
  let paragraphs = cleanText
    .split(/\n\s*\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  // If only 1 paragraph was found (e.g. text separated only by single line breaks)
  if (paragraphs.length === 1) {
    const lines = cleanText.split('\n').map((l) => l.trim()).filter(Boolean);
    if (lines.length >= 4) {
      // Chunk consecutive lines into 2 to 4 logical sections without slicing words
      const chunkSize = Math.ceil(lines.length / 3);
      paragraphs = [];
      for (let i = 0; i < lines.length; i += chunkSize) {
        paragraphs.push(lines.slice(i, i + chunkSize).join('\n'));
      }
    }
  }

  // Ensure between 1 and 6 clean blocks max
  const count = Math.min(Math.max(paragraphs.length, 1), 6);
  const selectedParagraphs = paragraphs.slice(0, count);

  // Compute clean vertical bounding box positions for each block
  const totalHeight = 92; // 92% available height
  const gap = count > 3 ? 1.5 : 2.5;
  const heightPerBlock = Math.max(8, (totalHeight - (count - 1) * gap) / count);

  return selectedParagraphs.map((para, idx) => {
    const titles = inferParagraphTitle(para, idx, count);
    const box = {
      top: 4 + idx * (heightPerBlock + gap),
      left: 4,
      width: 92,
      height: heightPerBlock
    };

    return {
      id: `block-${idx}`,
      labelEn: titles.labelEn,
      labelKn: titles.labelKn,
      shortLabelEn: titles.shortLabelEn,
      shortLabelKn: titles.shortLabelKn,
      box,
      extractedText: para
    };
  });
}
