import React, { useState, useEffect } from 'react';
import { 
  Copy, 
  Check, 
  Download, 
  FileCode, 
  FileText, 
  Bookmark, 
  Sparkles,
  AlertCircle,
  Scan,
  Lock,
  ShieldCheck,
  Share2
} from 'lucide-react';
import { DigitizedDocument, UILanguage } from '../../types';
import { translations } from '../../i18n/translations';
import { 
  copyToClipboard, 
  downloadTextFile, 
  downloadJsonFile, 
  downloadSearchablePdf 
} from '../../services/exportService';
import { ConfidenceHeatmap } from '../extensions/ConfidenceHeatmap';
import { DocumentVerificationStrip } from '../extensions/DocumentVerificationStrip';
import { LayoutBlockId, parseDocumentIntoSyncBlocks } from '../../services/layoutSyncService';
import { redactPii as redactPiiHelper } from '../../services/piiRedactionService';
import { WhatsAppShareModal } from '../extensions/WhatsAppShareModal';

interface TabExtractedTextProps {
  doc: DigitizedDocument;
  onUpdateText: (newText: string) => void;
  onSaveToVault: () => void;
  isSavedInVault: boolean;
  lang: UILanguage;
  fontSize: 'normal' | 'large' | 'xlarge';
  syncLayout?: boolean;
  activeBlockId?: LayoutBlockId | null;
  onSelectBlock?: (id: LayoutBlockId | null) => void;
}

export const TabExtractedText: React.FC<TabExtractedTextProps> = ({
  doc,
  onUpdateText,
  onSaveToVault,
  isSavedInVault,
  lang,
  fontSize,
  syncLayout = true,
  activeBlockId = null,
  onSelectBlock
}) => {
  const t = translations[lang];
  const [copied, setCopied] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [viewMode, setViewMode] = useState<'blocks' | 'text' | 'heatmap'>('blocks');
  const [redactPii, setRedactPii] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  // If user clicks a bounding box on the image, ensure we switch to blocks view to highlight
  useEffect(() => {
    if (activeBlockId && viewMode === 'text') {
      setViewMode('blocks');
    }
  }, [activeBlockId]);

  const piiResult = redactPiiHelper(doc.rawKannadaText);
  const activeDisplayText = redactPii ? piiResult.redactedText : doc.rawKannadaText;

  const syncBlocks = (doc.syncBlocks && doc.syncBlocks.length > 0 && !redactPii)
    ? doc.syncBlocks
    : parseDocumentIntoSyncBlocks(activeDisplayText, doc.id);

  const handleCopy = async () => {
    const success = await copyToClipboard(activeDisplayText);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadTxt = () => {
    const safeTitle = (doc.title || 'kannada-document')
      .replace(/[^a-zA-Z0-9-]/g, '_')
      .slice(0, 30);
    downloadTextFile(activeDisplayText, `${safeTitle}.txt`);
  };

  const handleDownloadJson = () => {
    const safeTitle = (doc.title || 'kannada-document')
      .replace(/[^a-zA-Z0-9-]/g, '_')
      .slice(0, 30);
    downloadJsonFile({ ...doc, rawKannadaText: activeDisplayText, piiRedacted: redactPii }, `${safeTitle}.json`);
  };

  const handleDownloadPdf = async () => {
    setIsExportingPdf(true);
    try {
      const safeTitle = (doc.title || 'kannada-document')
        .replace(/[^a-zA-Z0-9-]/g, '_')
        .slice(0, 30);
      await downloadSearchablePdf({ ...doc, rawKannadaText: activeDisplayText }, `${safeTitle}.pdf`);
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const charCount = activeDisplayText.length;
  const wordCount = activeDisplayText.trim() ? activeDisplayText.trim().split(/\s+/).length : 0;
  const hasUncertainties = activeDisplayText.includes('[?');

  const textSizeClass =
    fontSize === 'xlarge'
      ? 'text-lg sm:text-xl leading-relaxed'
      : fontSize === 'large'
      ? 'text-base sm:text-lg leading-relaxed'
      : 'text-sm sm:text-base leading-relaxed';

  return (
    <div className="space-y-3.5">
      {/* Top Confidence & Quality Bar with View Mode Toggle */}
      <div className="bg-zinc-50/80 border border-zinc-200/80 rounded-xl p-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Overall Confidence Badge */}
          <div className="flex items-center gap-1.5 font-medium text-zinc-800">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
            <span>{t.confidenceScore}:</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50/70 text-emerald-700 border border-emerald-200/60 font-semibold text-[11px]">
              {doc.confidence.overall}%
            </span>
          </div>

          {/* Vattakshara Accuracy */}
          <div className="hidden sm:flex items-center gap-1 text-zinc-600 font-medium">
            <span>{t.vattaksharaAccuracy}:</span>
            <span className="font-semibold text-zinc-900">{doc.confidence.vattaksharaAccuracy}%</span>
          </div>

          {/* 3-Way View Mode Toggle Pill */}
          <div className="flex items-center bg-zinc-100 border border-zinc-200/70 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('blocks')}
              className={`px-2.5 py-1 rounded-md text-xs flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'blocks'
                  ? 'bg-zinc-900 text-white shadow-2xs font-medium'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Scan className="w-3 h-3" />
              <span>{lang === 'kn' ? 'ವಿನ್ಯಾಸ ಸಿಂಕ್ (Sync)' : 'Sync Blocks'}</span>
            </button>
            <button
              onClick={() => setViewMode('text')}
              className={`px-2.5 py-1 rounded-md text-xs transition-all cursor-pointer ${
                viewMode === 'text'
                  ? 'bg-white text-zinc-900 shadow-2xs font-medium'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              {lang === 'kn' ? 'ಸಂಪಾದನೆ (Edit)' : 'Plain Text'}
            </button>
            <button
              onClick={() => setViewMode('heatmap')}
              className={`px-2.5 py-1 rounded-md text-xs flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'heatmap'
                  ? 'bg-zinc-900 text-white shadow-2xs font-medium'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Sparkles className="w-3 h-3 text-zinc-400" />
              <span>{lang === 'kn' ? 'ಶಾಖ ನಕ್ಷೆ' : 'Heatmap'}</span>
            </button>
          </div>

          {/* Feature 3: Privacy / PII Redaction Toggle */}
          <button
            onClick={() => setRedactPii(!redactPii)}
            className={`px-2.5 py-1 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              redactPii
                ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-2xs font-medium ring-1 ring-emerald-600'
                : 'bg-zinc-100 hover:bg-zinc-200/80 text-zinc-700 border border-zinc-200/80'
            }`}
            title={lang === 'kn' ? 'ವೈಯಕ್ತಿಕ ಗುರುತು ಹಾಗೂ ಸೂಕ್ಷ್ಮ ವಿವರಗಳನ್ನು ಮರೆಮಾಡಿ (Mask Mobile, GSTIN, Bank IDs)' : 'Mask Mobile Numbers, GSTIN, License & Bank Account numbers'}
          >
            {redactPii ? <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> : <Lock className="w-3.5 h-3.5 text-zinc-500" />}
            <span className="font-medium">{lang === 'kn' ? '🔒 PII ರಕ್ಷಣೆ' : '🔒 Redact PII'}</span>
            {redactPii && piiResult.totalRedacted > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-900/60 text-[10px] font-semibold text-emerald-200">
                {piiResult.totalRedacted} {lang === 'kn' ? 'ರಕ್ಷಿತ' : 'protected'}
              </span>
            )}
          </button>
        </div>

        {/* Counts */}
        <div className="flex items-center gap-2.5 text-zinc-500 font-medium text-[11px]">
          <span>{wordCount} {t.wordCount}</span>
          <span>•</span>
          <span>{charCount} {t.characterCount}</span>
        </div>
      </div>

      {/* Feature 2: Automated Arithmetic & Document Authenticity Bar */}
      <DocumentVerificationStrip doc={doc} lang={lang} />

      {/* Uncertainty warning banner if cursive strokes were uncertain */}
      {hasUncertainties && viewMode === 'text' && (
        <div className="bg-amber-50/70 border border-amber-200/60 rounded-xl p-2.5 px-3 flex items-center gap-2 text-xs text-amber-800">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{t.uncertainWordsNote}</span>
        </div>
      )}

      {/* Main View Area: Either Sync Blocks, Plain Text, or Heatmap */}
      {viewMode === 'blocks' ? (
        <div className="space-y-2.5 animate-fadeIn">
          <div className="bg-zinc-100/70 border border-zinc-200/80 rounded-lg px-3 py-2 flex items-center justify-between text-xs text-zinc-600">
            <span className="font-kannada">
              {lang === 'kn'
                ? 'ವಿಭಾಗದ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿದರೆ ಮೂಲ ದಾಖಲೆಯ ಚಿತ್ರದಲ್ಲಿ ನೇರವಾಗಿ ಮುಖ್ಯಾಂಶವಾಗುತ್ತದೆ (2-Way Layout Sync).'
                : 'Hover or click any section to highlight its bounding box on the original document image.'}
            </span>
            <span className="font-mono text-[10px] text-zinc-500 font-bold">
              {syncBlocks.length} Sync Blocks
            </span>
          </div>

          <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
            {syncBlocks.map((block) => {
              const isSelected = activeBlockId === block.id;
              return (
                <div
                  key={block.id}
                  onClick={() => onSelectBlock?.(isSelected ? null : block.id)}
                  onMouseEnter={() => onSelectBlock?.(block.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                    isSelected
                      ? 'border-zinc-900 ring-2 ring-zinc-900/20 bg-zinc-50/90 shadow-xs'
                      : 'border-zinc-200/80 hover:border-zinc-400 bg-white shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      isSelected ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-800'
                    }`}>
                      {lang === 'kn' ? block.labelKn : block.labelEn}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      {block.extractedText.split(/\s+/).filter(Boolean).length} words
                    </span>
                  </div>

                  <p className={`font-kannada leading-relaxed whitespace-pre-line text-zinc-900 ${textSizeClass}`}>
                    {block.extractedText}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ) : viewMode === 'heatmap' ? (
        <ConfidenceHeatmap
          doc={doc}
          onUpdateText={onUpdateText}
          lang={lang}
          fontSize={fontSize}
        />
      ) : (
        <div className="relative">
          <textarea
            value={activeDisplayText}
            onChange={(e) => {
              if (!redactPii) onUpdateText(e.target.value);
            }}
            readOnly={redactPii}
            rows={16}
            className={`w-full min-h-[420px] sm:min-h-[460px] p-4 rounded-xl border border-zinc-200 focus:border-zinc-400 focus:ring-0 outline-none font-kannada bg-zinc-50/40 text-zinc-800 resize-y shadow-2xs transition-colors leading-relaxed ${textSizeClass} ${
              redactPii ? 'bg-emerald-50/20 selection:bg-emerald-100' : ''
            }`}
            placeholder={lang === 'kn' ? 'ಕನ್ನಡ ಪಠ್ಯ ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ...' : 'Extracted Kannada text will appear here...'}
            spellCheck={false}
          />
        </div>
      )}

      {/* Action Buttons Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium shadow-xs flex items-center gap-1.5 active:scale-95 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
            <span>{copied ? t.copiedText : t.copyText}</span>
          </button>

          {/* Save to Vault */}
          <button
            onClick={onSaveToVault}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all ${
              isSavedInVault
                ? 'bg-emerald-50/70 text-emerald-700 border-emerald-200/60'
                : 'bg-white hover:bg-zinc-50 text-zinc-700 border-zinc-200 shadow-2xs'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSavedInVault ? 'fill-emerald-600 text-emerald-600' : 'text-zinc-500'}`} />
            <span>{isSavedInVault ? t.savedToVault : t.saveToVault}</span>
          </button>
        </div>

        {/* Export Formats Group (Uniform Ghost Styling) */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={handleDownloadTxt}
            className="px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-medium flex items-center gap-1 transition-colors shadow-2xs"
            title="Download Plain UTF-8 Text"
          >
            <FileText className="w-3.5 h-3.5 text-zinc-500" />
            <span>.TXT</span>
          </button>

          <button
            onClick={handleDownloadJson}
            className="px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-medium flex items-center gap-1 transition-colors shadow-2xs"
            title="Download Full JSON Metadata"
          >
            <FileCode className="w-3.5 h-3.5 text-zinc-500" />
            <span>.JSON</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-medium flex items-center gap-1 transition-colors disabled:opacity-50 shadow-2xs"
            title="Download Searchable PDF"
          >
            <Download className="w-3.5 h-3.5 text-zinc-500" />
            <span>{isExportingPdf ? 'Exporting...' : '.PDF'}</span>
          </button>

          {/* Feature 4: One-Click WhatsApp Citizen Share */}
          <button
            onClick={() => setIsWhatsAppOpen(true)}
            className="px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-medium flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            title="Share Formatted Kannada Summary via WhatsApp"
          >
            <Share2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{lang === 'kn' ? 'ವಾಟ್ಸಾಪ್ ಹಂಚಿಕೆ' : 'Share Summary (WhatsApp)'}</span>
          </button>
        </div>
      </div>

      {/* WhatsApp Citizen Share Modal */}
      <WhatsAppShareModal
        doc={{ ...doc, rawKannadaText: activeDisplayText }}
        lang={lang}
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        redactPiiEnabled={redactPii}
      />
    </div>
  );
};
