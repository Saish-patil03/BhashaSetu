import React from 'react';
import { 
  FileText, 
  PenTool, 
  ScrollText, 
  Sparkles, 
  BookOpen, 
  Check, 
  Layers,
  ChevronRight
} from 'lucide-react';
import { OCREngineMode, UILanguage } from '../../types';
import { getModernKannadaAdaptation } from '../../services/intelligenceService';

interface OCREngineModeSelectorProps {
  mode: OCREngineMode;
  onChangeMode: (mode: OCREngineMode) => void;
  lang: UILanguage;
  showModernAdaptation: boolean;
  onToggleModernAdaptation: (val: boolean) => void;
  rawText?: string;
}

export const OCREngineModeSelector: React.FC<OCREngineModeSelectorProps> = ({
  mode,
  onChangeMode,
  lang,
  showModernAdaptation,
  onToggleModernAdaptation,
  rawText = ''
}) => {
  const modes = [
    {
      id: 'printed' as OCREngineMode,
      titleKn: 'ಸ್ಟ್ಯಾಂಡರ್ಡ್ ಮುದ್ರಿತ ದಾಖಲೆ',
      titleEn: 'Standard Printed Kannada',
      descKn: 'ಸರ್ಕಾರಿ ಸುತ್ತೋಲೆಗಳು, ಪಹಣಿ (RTC) & ಪತ್ರಿಕಾ ಪ್ರಕಟಣೆಗಳು',
      descEn: 'Govt circulars, RTC land records & printed forms',
      icon: FileText,
      badge: 'Binarized OCR'
    },
    {
      id: 'handwritten' as OCREngineMode,
      titleKn: 'ಕೈಬರಹದ ದಾಖಲೆಗಳು (ಕೈಬರಹ)',
      titleEn: 'Handwritten Notes & Deeds',
      descKn: 'ಕೌಟುಂಬಿಕ ಒಪ್ಪಂದಗಳು, ಹಳೆಯ ಪತ್ರಗಳು & ಕೈಬರಹದ ರಸೀದಿಗಳು',
      descEn: 'Family agreements, cursive notes & manual receipts',
      icon: PenTool,
      badge: 'Stroke Adaptive'
    },
    {
      id: 'halegannada' as OCREngineMode,
      titleKn: 'ಹಳೆಗನ್ನಡ / ತಾಳೆಗರಿ ಹಸ್ತಪ್ರತಿ',
      titleEn: 'Halegannada & Archival',
      descKn: 'ಹಳೆಯ ಶಾಸನಗಳು, ತಾಳೆಗರಿ ಗ್ರಂಥಗಳು & ಪುರಾತನ ಸಾಹಿತ್ಯ',
      descEn: 'Ancient manuscripts, palm leaf & archaic Kannada',
      icon: ScrollText,
      badge: 'Archaic Adapter'
    }
  ];

  const adaptationData = getModernKannadaAdaptation(rawText);

  return (
    <div className="space-y-3">
      {/* Engine Mode Selection Bar */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-2.5 sm:p-3 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 px-1 pb-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-zinc-900" />
            <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
              {lang === 'kn' ? 'OCR ಎಂಜಿನ್ ಪ್ರೊಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ:' : 'Specialized OCR Engine Profile:'}
            </span>
          </div>

          <span className="text-[11px] text-zinc-500 font-medium">
            {lang === 'kn' ? 'ದಾಖಲೆಯ ಮಾದರಿಗೆ ತಕ್ಕಂತೆ ನಿಖರತೆ ಹೆಚ್ಚಿಸಲು ಆಯ್ಕೆಮಾಡಿ' : 'Select mode for domain-adapted tokenization'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {modes.map((m) => {
            const Icon = m.icon;
            const isSelected = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => onChangeMode(m.id)}
                className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between group active:scale-[0.99] cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-100/90 border-zinc-900 ring-1 ring-zinc-900/20 text-zinc-900 shadow-2xs'
                    : 'bg-white hover:bg-zinc-50 border-zinc-200/80 hover:border-zinc-300 text-zinc-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-2 rounded-lg transition-colors ${
                        isSelected ? 'bg-zinc-900 text-white shadow-xs' : 'bg-zinc-100 text-zinc-600 group-hover:bg-zinc-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h5
                        className={`text-xs sm:text-sm font-bold font-kannada leading-tight text-zinc-900`}
                      >
                        {lang === 'kn' ? m.titleKn : m.titleEn}
                      </h5>
                      <span className="text-[10px] text-zinc-500 block">
                        {lang === 'kn' ? m.titleEn : m.titleKn}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold shrink-0 ${
                      isSelected ? 'bg-zinc-200/90 text-zinc-900' : 'bg-zinc-100 text-zinc-500'
                    }`}
                  >
                    {m.badge}
                  </span>
                </div>

                <p className="text-[11px] text-zinc-500 font-kannada mt-2 leading-relaxed">
                  {lang === 'kn' ? m.descKn : m.descEn}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modern Kannada Transliteration/Adaptation toggle for Halegannada Mode */}
      {mode === 'halegannada' && (
        <div className="bg-zinc-50/70 border border-zinc-200/80 rounded-2xl p-4 shadow-xs space-y-3 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-5 h-5 text-zinc-800" />
              <div>
                <h5 className="font-bold text-xs sm:text-sm text-zinc-900 font-kannada">
                  {lang === 'kn'
                    ? 'ಹಳೆಗನ್ನಡದಿಂದ ಹೊಸಗನ್ನಡ ಸರಳ ರೂಪಾಂತರ (Modern Adaptation)'
                    : 'Archaic to Modern Kannada Adaptation Engine'}
                </h5>
                <p className="text-[11px] text-zinc-500">
                  {lang === 'kn'
                    ? 'ಪುರಾತನ ಶೈಲಿಯ ಪದಗಳನ್ನು ಇಂದಿನ ಸರಳ ಕನ್ನಡಕ್ಕೆ ಪರಿವರ್ತಿಸುತ್ತದೆ'
                    : 'Automatically translates archaic phrases and vocabulary into contemporary Kannada'}
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showModernAdaptation}
                onChange={(e) => onToggleModernAdaptation(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-zinc-900" />
              <span className="ml-2 text-xs font-bold text-zinc-900">
                {showModernAdaptation ? (lang === 'kn' ? 'ಸಕ್ರಿಯವಾಗಿದೆ' : 'Enabled') : (lang === 'kn' ? 'ನಿಷ್ಕ್ರಿಯ' : 'Disabled')}
              </span>
            </label>
          </div>

          {/* Expanded Modern Kannada & Glossary View */}
          {showModernAdaptation && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2 border-t border-zinc-200/80">
              {/* Left: Modern Plain Kannada */}
              <div className="md:col-span-7 bg-white rounded-xl p-3.5 border border-zinc-200/80 shadow-2xs">
                <span className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider block mb-1">
                  {lang === 'kn' ? 'ಹೊಸಗನ್ನಡ ಸರಳ ರೂಪಾಂತರ:' : 'Contemporary Modern Kannada Output:'}
                </span>
                <p className="text-xs sm:text-sm font-kannada leading-relaxed text-zinc-800 whitespace-pre-line font-medium">
                  {adaptationData.modernText}
                </p>
              </div>

              {/* Right: Archaic Term Glossary */}
              <div className="md:col-span-5 bg-white rounded-xl p-3.5 border border-zinc-200/80 space-y-2 shadow-2xs">
                <span className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider block">
                  {lang === 'kn' ? 'ಪುರಾತನ ಶಬ್ದಕೋಶ (Glossary):' : 'Archaic Terminology Glossary:'}
                </span>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {adaptationData.glossary.map((item, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-zinc-50 border border-zinc-200/70 text-xs">
                      <div className="flex items-center justify-between font-kannada font-bold">
                        <span className="text-zinc-900">{item.archaic}</span>
                        <ChevronRight className="w-3 h-3 text-zinc-400" />
                        <span className="text-emerald-700">{item.modern}</span>
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-0.5 font-kannada">{item.meaning}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
