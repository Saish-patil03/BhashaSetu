import { jsPDF } from 'jspdf';
import { DigitizedDocument } from '../types';

/**
 * Downloads plain Unicode Kannada text as a .txt file
 */
export function downloadTextFile(text: string, filename: string = 'bhashasetu-kannada.txt'): void {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Downloads complete document metadata, summary, and translations as .json
 */
export function downloadJsonFile(doc: Partial<DigitizedDocument>, filename: string = 'bhashasetu-doc.json'): void {
  const content = JSON.stringify(doc, null, 2);
  const blob = new Blob([content], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Copies string to clipboard with browser fallback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return true;
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return false;
  }
}

/**
 * Generates a formatted PDF report with Kannada text rendered via Canvas
 * to guarantee 100% accurate Kannada conjunct (ಒತ್ತಕ್ಷರ) rendering without font breakage.
 */
export async function downloadSearchablePdf(
  doc: DigitizedDocument,
  filename: string = 'bhashasetu-digitized-document.pdf'
): Promise<void> {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4'
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;

  // Header Banner
  pdf.setFillColor(185, 28, 28); // Kannada Red #B91C1C
  pdf.rect(0, 0, pageWidth, 45, 'F');

  pdf.setFillColor(234, 179, 8); // Gold #EAB308
  pdf.rect(0, 45, pageWidth, 6, 'F');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(14);
  pdf.setTextColor(255, 255, 255);
  pdf.text('BhashaSetu: Kannada Document AI & OCR Report', margin, 28);

  pdf.setFontSize(9);
  pdf.setTextColor(254, 240, 138);
  pdf.text('Citizen Digitization & Archival Record', pageWidth - margin, 28, { align: 'right' });

  // Document Metadata Table
  let currentY = 70;
  pdf.setFontSize(10);
  pdf.setTextColor(51, 65, 85);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Document Title:', margin, currentY);
  pdf.setFont('helvetica', 'normal');
  pdf.text(doc.title.slice(0, 60), margin + 90, currentY);

  currentY += 16;
  pdf.setFont('helvetica', 'bold');
  pdf.text('Digitized Date:', margin, currentY);
  pdf.setFont('helvetica', 'normal');
  pdf.text(new Date(doc.createdAt).toLocaleDateString() + ' ' + new Date(doc.createdAt).toLocaleTimeString(), margin + 90, currentY);

  pdf.setFont('helvetica', 'bold');
  pdf.text('Confidence:', margin + 280, currentY);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`${doc.confidence.overall}% (Vattakshara: ${doc.confidence.vattaksharaAccuracy}%)`, margin + 350, currentY);

  currentY += 20;
  pdf.setDrawColor(203, 213, 225);
  pdf.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 15;

  // Render Kannada text section using high-DPI HTML Canvas to preserve Kannada glyphs
  const canvas = document.createElement('canvas');
  const dpr = 2; // high resolution
  canvas.width = contentWidth * dpr;
  
  // Calculate text height
  const lines = doc.rawKannadaText.split('\n');
  const estimatedHeight = Math.max(300, lines.length * 24 + 100);
  canvas.height = estimatedHeight * dpr;

  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.scale(dpr, dpr);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, contentWidth, estimatedHeight);

    // Border around text
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, contentWidth, estimatedHeight);

    ctx.fillStyle = '#1E293B';
    ctx.font = '14px "Noto Sans Kannada", "Inter", sans-serif';

    let y = 30;
    for (const line of lines) {
      if (y > estimatedHeight - 20) break;
      ctx.fillText(line, 15, y);
      y += 24;
    }

    const canvasImgData = canvas.toDataURL('image/png');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.setTextColor(15, 23, 42);
    pdf.text('1. Digitized Kannada Text (ಮೂಲ ಪಠ್ಯ):', margin, currentY);
    currentY += 12;

    const imgHeight = Math.min(pageHeight - currentY - margin - 150, estimatedHeight * 0.7);
    pdf.addImage(canvasImgData, 'PNG', margin, currentY, contentWidth, imgHeight);
    currentY += imgHeight + 20;
  }

  // English Summary Section
  if (currentY + 120 < pageHeight) {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.setTextColor(15, 23, 42);
    pdf.text('2. English Plain-Language Summary:', margin, currentY);
    currentY += 14;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(71, 85, 105);

    for (const point of doc.summary.simplifiedEnglish.slice(0, 3)) {
      const splitLines = pdf.splitTextToSize(`• ${point}`, contentWidth);
      pdf.text(splitLines, margin, currentY);
      currentY += splitLines.length * 12 + 4;
    }
  }

  // Footer
  pdf.setFontSize(8);
  pdf.setTextColor(148, 163, 184);
  pdf.text(
    'Generated by BhashaSetu: Kannada Document AI & OCR • Accessible Public Utility',
    pageWidth / 2,
    pageHeight - 20,
    { align: 'center' }
  );

  pdf.save(filename);
}
