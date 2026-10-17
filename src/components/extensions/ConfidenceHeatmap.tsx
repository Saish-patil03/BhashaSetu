import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Download, 
  RotateCcw, 
  Check, 
  Layers, 
  Edit3,
  X
} from 'lucide-react';
import { DigitizedDocument, UILanguage, WordConfidenceToken } from '../../types';
import { 
  generateConfidenceTokens, 
  exportVerifiedDatasetJsonl 
} from '../../services/intelligenceService';

interface ConfidenceHeatmapProps {
  doc: DigitizedDocument;
  onUpdateText: (newText: string) => void;
  lang: UILanguage;
  fontSize: 'normal' | 'large' | 'xlarge';
}

// Virtual Kannada Keypad characters for quick Human-in-the-Loop corrections
const KEYPAD_VOWELS = ['ಅ', 'ಆ', 'ಇ', 'ಈ', 'ಉ', 'ಊ', 'ಋ', 'ಎ', 'ಏ', 'ಐ', 'ಒ', 'ಓ', 'ಔ', 'ಅಂ', 'ಅಃ'];
const KEYPAD_CONSONANTS = [
  'ಕ', 'ಖ', 'ಗ', 'ಘ', 'ಙ',
  'ಚ', 'ಛ', 'ಜ', 'ಝ', 'ಞ',
  'ಟ', 'ಠ', 'ಡ', 'ಢ', 'ಣ',
  'ತ', 'ಥ', 'ದ', 'ಧ', 'ನ',
  'ಪ', 'ಫ', 'ಬ', 'ಭ', 'ಮ',
  'ಯ', 'ರ', 'ಲ', 'ವ', 'ಶ', 'ಷ', 'ಸ', 'ಹ', 'ಳ'
];
const KEYPAD_MATRAS = ['್', 'ಾ', 'ಿ', 'ೀ', 'ು', 'ೂ', 'ೃ', 'ೆ', 'ೇ', 'ೈ', 'ೊ', 'ೋ', 'ೌ', 'ಂ', 'ಃ'];
const KEYPAD_COMMON_CONJUNCTS = ['ಕ್ಕ', 'ತ್ತ', 'ನ್ನ', 'ಮ್ಮ', 'ರ್', 'ಷ್ಟ', 'ಳ್ಳ', 'ತ್ವ', 'ಸ್ವ', 'ಕ್ರ'];

export const ConfidenceHeatmap: React.FC<ConfidenceHeatmapProps> = ({
  doc,
  onUpdateText,
  lang,
  fontSize
}) => {
  const [tokens, setTokens] = useState<WordConfidenceToken[]>(() =>
    generateConfidenceTokens(doc.rawKannadaText, doc.confidence.overall)
  );
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number | null>(null);
  const [editInput, setEditInput] = useState<string>('');
  const [filterMode, setFilterMode] = useState<'all' | 'amber_red' | 'verified'>('all');
  const [isExported, setIsExported] = useState(false);

  // Sync tokens when raw document text changes externally
  useEffect(() => {
    setTokens(generateConfidenceTokens(doc.rawKannadaText, doc.confidence.overall));
  }, [doc.id]);

  const selectedToken = selectedTokenIndex !== null ? tokens[selectedTokenIndex] : null;

  const handleSelectToken = (idx: number) => {
    setSelectedTokenIndex(idx);
    setEditInput(tokens[idx].correctedText || tokens[idx].word);
  };

  const handleApplyAlternative = (alt: string) => {
    setEditInput(alt);
  };

  const handleInsertKey = (char: string) => {
    setEditInput((prev) => prev + char);
  };

  const handleApproveCorrection = () => {
    if (selectedTokenIndex === null) return;

    const updatedTokens = [...tokens];
    const prevWord = updatedTokens[selectedTokenIndex].word;
    const newWord = editInput.trim() || prevWord;

    updatedTokens[selectedTokenIndex] = {
      ...updatedTokens[selectedTokenIndex],
      word: newWord,
      correctedText: newWord,
      confidence: 99.5, // verified by human
      verified: true,
      isAmbiguous: false
    };

    setTokens(updatedTokens);
    setSelectedTokenIndex(null);

    // Propagate updated text back to parent document
    const updatedFullText = updatedTokens.map((t) => t.word).join(' ');
    onUpdateText(updatedFullText);
  };

  const handleExportJsonl = () => {
    exportVerifiedDatasetJsonl(tokens, doc.id);
    setIsExported(true);
    setTimeout(() => setIsExported(false), 2500);
  };

  // Metrics
  const totalTokens = tokens.length;
  const highConfCount = tokens.filter((t) => t.confidence >= 90).length;
  const conjunctCount = tokens.filter((t) => t.confidence >= 70 && t.confidence < 90).length;
  const ambiguousCount = tokens.filter((t) => t.confidence < 70).length;
  const verifiedCount = tokens.filter((t) => t.verified).length;

  const filteredTokens = tokens.filter((t) => {
    if (filterMode === 'amber_red') return t.confidence < 90;
    if (filterMode === 'verified') return t.verified;
    return true;
  });

  const textSizeClass =
    fontSize === 'xlarge' ? 'text-lg leading-loose' : fontSize === 'large' ? 'text-base leading-relaxed' : 'text-sm leading-relaxed';

  return (
    <div className="space-y-4">
      {/* Heatmap Legend & Impact Banner */}
      <div className="bg-zinc-900 text-white rounded-xl p-3.5 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-zinc-400" />
            <h4 className="font-semibold text-xs sm:text-sm font-kannada">
              {lang === 'kn' ? 'ವತ್ತಕ್ಷರ ಶಾಖ ನಕ್ಷೆ ಮತ್ತು ಪರಿಶೀಲನೆ (HITL)' : 'Vattakshara Confidence Heatmap & HITL Inspector'}
            </h4>
            <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 text-[10px] font-medium">
              AI Inspector
            </span>
          </div>

          {/* Export Dataset Button */}
          <button
            onClick={handleExportJsonl}
            className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium flex items-center gap-1.5 shadow-2xs border border-zinc-700 active:scale-95 transition-all"
            title="Export verified tokens for low-resource Kannada OCR dataset"
          >
            {isExported ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5 text-zinc-400" />}
            <span>{isExported ? 'ಡೇಟಾಸೆಟ್ ಡೌನ್‌ಲೋಡ್ ಆಗಿದೆ' : 'Export Verified Dataset (.JSONL)'}</span>
          </button>
        </div>

        {/* Confidence Tier Legend */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs pt-1 border-t border-zinc-800">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
            <span className="text-zinc-300">
              <strong className="text-emerald-400">&gt;90%:</strong> {lang === 'kn' ? 'ಮೂಲ ಅಕ್ಷರಗಳು' : 'Base Aksharas'} ({highConfCount})
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
            <span className="text-zinc-300">
              <strong className="text-amber-400">70-90%:</strong> {lang === 'kn' ? 'ಸಂಯುಕ್ತ / ವತ್ತಕ್ಷರ' : 'Vattakshara Conjuncts'} ({conjunctCount})
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
            <span className="text-zinc-300">
              <strong className="text-rose-400">&lt;70%:</strong> {lang === 'kn' ? 'ಸಂದಿಗ್ಧ / ಕೈಬರಹ' : 'Ambiguous Strokes'} ({ambiguousCount})
            </span>
          </div>

          {verifiedCount > 0 && (
            <div className="flex items-center gap-1.5 text-emerald-300 ml-auto font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{verifiedCount} {lang === 'kn' ? 'ಮಾನವ ಪರಿಶೀಲಿತ' : 'Human Verified'}</span>
            </div>
          )}
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              filterMode === 'all'
                ? 'bg-zinc-900 text-white shadow-2xs'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80'
            }`}
          >
            {lang === 'kn' ? 'ಎಲ್ಲಾ ಪದಗಳು' : 'All Words'} ({totalTokens})
          </button>
          <button
            onClick={() => setFilterMode('amber_red')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              filterMode === 'amber_red'
                ? 'bg-amber-100 text-amber-900 border border-amber-300/80 shadow-2xs'
                : 'bg-amber-50/70 text-amber-700 hover:bg-amber-100/70 border border-amber-200/60'
            }`}
          >
            {lang === 'kn' ? 'ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿರುವವು' : 'Needs Review (<90%)'} ({conjunctCount + ambiguousCount})
          </button>
          {verifiedCount > 0 && (
            <button
              onClick={() => setFilterMode('verified')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                filterMode === 'verified'
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300/80 shadow-2xs'
                  : 'bg-emerald-50/70 text-emerald-700 hover:bg-emerald-100/70 border border-emerald-200/60'
              }`}
            >
              {lang === 'kn' ? 'ಪರಿಶೀಲಿತ' : 'Verified'} ({verifiedCount})
            </button>
          )}
        </div>

        <p className="text-[11px] text-zinc-400 italic hidden sm:block">
          {lang === 'kn' ? 'ಸರಿಪಡಿಸಲು ಯಾವುದೇ ಪದವನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ' : 'Click any word to review AI alternatives & edit'}
        </p>
      </div>

      {/* Interactive Word Tokens Canvas */}
      <div className="bg-zinc-50/40 border border-zinc-200/80 rounded-xl p-4 sm:p-5 shadow-inner min-h-[220px] max-h-[360px] overflow-y-auto">
        <div className={`flex flex-wrap gap-2 font-kannada ${textSizeClass}`}>
          {filteredTokens.map((token) => {
            const originalIndex = tokens.findIndex((t) => t.id === token.id);
            const isSelected = selectedTokenIndex === originalIndex;

            let badgeStyle = 'bg-emerald-50/70 text-emerald-700 border-emerald-200/60 hover:bg-emerald-100/70';
            if (token.confidence < 70) {
              badgeStyle = 'bg-rose-50/70 text-rose-700 border-rose-200/60 hover:bg-rose-100/70 border-dashed animate-pulse';
            } else if (token.confidence < 90) {
              badgeStyle = 'bg-amber-50/70 text-amber-700 border-amber-200/60 hover:bg-amber-100/70 shadow-2xs';
            }

            if (token.verified) {
              badgeStyle = 'bg-emerald-100 text-emerald-950 border-emerald-300 ring-1 ring-emerald-300/40';
            }

            if (isSelected) {
              badgeStyle = 'bg-zinc-900 text-white border-zinc-900 ring-2 ring-zinc-400/50 shadow-xs scale-105';
            }

            return (
              <button
                key={token.id}
                onClick={() => handleSelectToken(originalIndex)}
                className={`px-2 py-0.5 rounded-md border text-left transition-all flex items-center gap-1 active:scale-95 cursor-pointer font-medium ${badgeStyle}`}
                title={`Confidence: ${token.confidence}% ${token.isVattakshara ? '• Vattakshara Detected' : ''}`}
              >
                <span>{token.word}</span>
                {token.verified && <Check className="w-3 h-3 text-emerald-500 inline" />}
                {!token.verified && token.confidence < 70 && (
                  <HelpCircle className="w-3 h-3 text-rose-500 inline" />
                )}
                {!token.verified && token.confidence >= 70 && token.confidence < 90 && (
                  <span className="text-[10px] opacity-75 font-mono">{token.confidence}%</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Human-in-the-Loop (HITL) Inspector Popover */}
      {selectedToken && (
        <div className="bg-zinc-900 text-white rounded-xl p-4 shadow-xl border border-zinc-800 animate-fadeIn space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
            <div className="flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-zinc-400" />
              <h5 className="font-semibold text-xs sm:text-sm font-kannada">
                {lang === 'kn' ? 'ಪದ ಪರಿಶೀಲನೆ & ತಿದ್ದುಪಡಿ' : 'Human-in-the-Loop Word Inspector'}
              </h5>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                selectedToken.confidence >= 90
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : selectedToken.confidence >= 70
                  ? 'bg-amber-500/20 text-amber-300'
                  : 'bg-rose-500/20 text-rose-300'
              }`}>
                {selectedToken.confidence}% Conf.
              </span>
            </div>
            <button
              onClick={() => setSelectedTokenIndex(null)}
              className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
            {/* Left: Input & Top 3 Alternatives */}
            <div className="md:col-span-6 space-y-2.5">
              <div>
                <label className="text-[11px] text-zinc-400 block mb-1">
                  {lang === 'kn' ? 'ಪ್ರಸ್ತುತ ಗುರುತಿಸಲಾದ ಪದ:' : 'Current Extracted Word:'}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                    className="flex-1 bg-zinc-800 border border-zinc-700 focus:border-zinc-500 rounded-lg px-3 py-1.5 text-base font-kannada font-bold text-white outline-none"
                    placeholder="ಕನ್ನಡ ಅಕ್ಷರಗಳನ್ನು ಟೈಪ್ ಮಾಡಿ..."
                  />
                  <button
                    onClick={handleApproveCorrection}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center gap-1 shadow-2xs active:scale-95 transition-all"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{lang === 'kn' ? 'ದೃಢೀಕರಿಸಿ' : 'Approve'}</span>
                  </button>
                </div>
              </div>

              {/* Top 3 AI Alternatives */}
              <div>
                <span className="text-[11px] text-zinc-400 block mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-zinc-400" />
                  <span>{lang === 'kn' ? 'AI ಸೂಚಿಸಿದ ಪರ್ಯಾಯಗಳು:' : 'Top 3 AI Character Alternatives:'}</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedToken.alternatives.map((alt, i) => (
                    <button
                      key={i}
                      onClick={() => handleApplyAlternative(alt)}
                      className="px-2.5 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-500 text-zinc-200 font-kannada text-xs transition-all active:scale-95"
                    >
                      {alt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Virtual Kannada Akshara & Vattakshara Keypad */}
            <div className="md:col-span-6 bg-zinc-850/80 rounded-lg p-2.5 border border-zinc-800 space-y-2">
              <span className="text-[10px] font-medium text-zinc-400 tracking-wider uppercase block">
                {lang === 'kn' ? 'ವರ್ಚುವಲ್ ಕನ್ನಡ ವತ್ತಕ್ಷರ ಕೀಲಿಮಣೆ:' : 'Virtual Kannada Akshara Keypad:'}
              </span>

              {/* Common Conjuncts & Halant */}
              <div className="space-y-1">
                <span className="text-[9px] text-zinc-400 block font-medium">ವತ್ತಕ್ಷರಗಳು / Halant:</span>
                <div className="flex flex-wrap gap-1">
                  {KEYPAD_COMMON_CONJUNCTS.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => handleInsertKey(c)}
                      className="px-1.5 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-kannada text-xs transition-colors border border-zinc-700/60"
                    >
                      {c}
                    </button>
                  ))}
                  {KEYPAD_MATRAS.slice(0, 5).map((m, i) => (
                    <button
                      key={'m-' + i}
                      onClick={() => handleInsertKey(m)}
                      className="px-1.5 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-kannada text-xs transition-colors border border-zinc-700/60"
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Consonants */}
              <div className="space-y-1">
                <span className="text-[9px] text-zinc-400 block font-medium">ವ್ಯಂಜನಗಳು:</span>
                <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto no-scrollbar">
                  {KEYPAD_CONSONANTS.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => handleInsertKey(c)}
                      className="px-1.5 py-0.5 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 font-kannada text-xs transition-colors border border-zinc-750"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
