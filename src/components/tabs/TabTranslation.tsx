import React, { useState } from 'react';
import { Copy, Check, Globe2, Languages } from 'lucide-react';
import { DocumentTranslations, UILanguage } from '../../types';
import { translations } from '../../i18n/translations';
import { copyToClipboard } from '../../services/exportService';

interface TabTranslationProps {
  docTranslations: DocumentTranslations;
  lang: UILanguage;
  fontSize: 'normal' | 'large' | 'xlarge';
}

export const TabTranslation: React.FC<TabTranslationProps> = ({
  docTranslations,
  lang,
  fontSize
}) => {
  const t = translations[lang];
  const [activeLang, setActiveLang] = useState<'both' | 'english' | 'hindi'>('both');
  const [copiedEn, setCopiedEn] = useState(false);
  const [copiedHi, setCopiedHi] = useState(false);

  const handleCopyEn = async () => {
    const success = await copyToClipboard(docTranslations.english);
    if (success) {
      setCopiedEn(true);
      setTimeout(() => setCopiedEn(false), 2000);
    }
  };

  const handleCopyHi = async () => {
    const success = await copyToClipboard(docTranslations.hindi);
    if (success) {
      setCopiedHi(true);
      setTimeout(() => setCopiedHi(false), 2000);
    }
  };

  const textSize =
    fontSize === 'xlarge'
      ? 'text-base sm:text-lg leading-relaxed'
      : fontSize === 'large'
      ? 'text-sm sm:text-base leading-relaxed'
      : 'text-xs sm:text-sm leading-relaxed';

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Top Banner and Filter Pill */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-50/70 border border-zinc-200/80 rounded-xl p-3">
        <div className="flex items-center gap-2">
          <Globe2 className="w-4 h-4 text-zinc-800" />
          <span className="text-xs font-bold text-zinc-900">
            {t.translationsTitle}
          </span>
        </div>

        {/* View Switcher */}
        <div className="flex items-center bg-zinc-100 rounded-lg p-0.5 border border-zinc-200/70 text-xs">
          <button
            onClick={() => setActiveLang('both')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              activeLang === 'both' ? 'bg-white text-zinc-900 font-semibold shadow-2xs' : 'text-zinc-500 hover:text-zinc-900 font-medium'
            }`}
          >
            {lang === 'kn' ? 'ಎರಡೂ (Both)' : 'Side by Side'}
          </button>
          <button
            onClick={() => setActiveLang('english')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              activeLang === 'english' ? 'bg-white text-zinc-900 font-semibold shadow-2xs' : 'text-zinc-500 hover:text-zinc-900 font-medium'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setActiveLang('hindi')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              activeLang === 'hindi' ? 'bg-white text-zinc-900 font-semibold shadow-2xs' : 'text-zinc-500 hover:text-zinc-900 font-medium'
            }`}
          >
            हिन्दी (Hindi)
          </button>
        </div>
      </div>

      {/* Translations Grid */}
      <div className={`grid gap-4 ${activeLang === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        
        {/* English Box */}
        {(activeLang === 'both' || activeLang === 'english') && (
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between space-y-3">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-900" />
                  <h4 className="font-bold text-zinc-900 text-sm">
                    {t.langEnglish}
                  </h4>
                </div>
                <button
                  onClick={handleCopyEn}
                  className="px-2.5 py-1 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedEn ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEn ? t.copiedText : t.copyText}</span>
                </button>
              </div>

              <div className={`text-zinc-800 whitespace-pre-line font-sans ${textSize}`}>
                {docTranslations.english || (
                  <span className="text-zinc-400 italic">No English translation available.</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Hindi Box */}
        {(activeLang === 'both' || activeLang === 'hindi') && (
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between space-y-3">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
                  <h4 className="font-bold text-zinc-900 text-sm">
                    {t.langHindi}
                  </h4>
                </div>
                <button
                  onClick={handleCopyHi}
                  className="px-2.5 py-1 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedHi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedHi ? t.copiedText : t.copyText}</span>
                </button>
              </div>

              <div className={`text-zinc-800 whitespace-pre-line font-sans ${textSize}`}>
                {docTranslations.hindi || (
                  <span className="text-zinc-400 italic">हिन्दी अनुवाद उपलब्ध नहीं है।</span>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
