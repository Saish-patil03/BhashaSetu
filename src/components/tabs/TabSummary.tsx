import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Calendar, 
  IndianRupee,
  Share2,
  BookOpen
} from 'lucide-react';
import { DocumentSummary, UILanguage, DigitizedDocument } from '../../types';
import { translations } from '../../i18n/translations';
import { WhatsAppShareModal } from '../extensions/WhatsAppShareModal';
import { KannadaJargonExplainer } from '../extensions/KannadaJargonExplainer';

interface TabSummaryProps {
  summary: DocumentSummary;
  doc?: DigitizedDocument;
  lang: UILanguage;
  fontSize: 'normal' | 'large' | 'xlarge';
}

export const TabSummary: React.FC<TabSummaryProps> = ({
  summary,
  doc,
  lang,
  fontSize
}) => {
  const t = translations[lang];
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isJargonOpen, setIsJargonOpen] = useState(false);

  const textSize =
    fontSize === 'xlarge'
      ? 'text-base sm:text-lg'
      : fontSize === 'large'
      ? 'text-sm sm:text-base'
      : 'text-xs sm:text-sm';

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* 1-Click WhatsApp Citizen Share Bar */}
      {doc && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-emerald-950 font-kannada">
                {lang === 'kn' ? 'ಕುಟುಂಬ / ಪಂಚಾಯತ್ ಜೊತೆ ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ' : 'Share Summary to Family / Gram Panchayat'}
              </h4>
              <p className="text-[11px] text-emerald-700 font-kannada">
                {lang === 'kn' ? 'ಈ ಸರಳ ಸಾರಾಂಶವನ್ನು 1-ಕ್ಲಿಕ್‌ನಲ್ಲಿ ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಕಳುಹಿಸಬಹುದು' : 'Send key takeaways, amount, and dates via WhatsApp with 1 tap'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsJargonOpen(true)}
              className="px-3 py-2 rounded-xl border border-emerald-300/80 bg-white hover:bg-emerald-50 text-emerald-900 text-xs font-semibold font-kannada flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
              title={lang === 'kn' ? 'ಸರಳ ಕನ್ನಡ ಸರ್ಕಾರಿ ಪದಕೋಶ' : 'Government Jargon Simplifier'}
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
              <span>{lang === 'kn' ? 'ಸರ್ಕಾರಿ ಪದಕೋಶ' : 'Govt Glossary'}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsWhatsAppOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold font-kannada flex items-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-95"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{lang === 'kn' ? 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಕಳುಹಿಸಿ' : 'Send to WhatsApp'}</span>
            </button>
          </div>
        </div>
      )}
      {/* Grid: Kannada Simple Points & English Plain-Language */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Simplified Kannada Points */}
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 border-b border-zinc-100 pb-2 text-zinc-900 font-bold text-sm font-kannada">
            <span className="w-2 h-2 rounded-full bg-zinc-900" />
            <span>{t.simplifiedKannadaHeading}</span>
          </div>

          <ul className="space-y-2.5 font-kannada text-zinc-800">
            {summary.simplifiedKannada.map((item, idx) => (
              <li key={idx} className={`flex items-start gap-2.5 ${textSize}`}>
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-zinc-100 text-zinc-800 font-bold text-xs flex items-center justify-center mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Simplified English Points */}
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 border-b border-zinc-100 pb-2 text-zinc-900 font-bold text-sm">
            <span className="w-2 h-2 rounded-full bg-zinc-600" />
            <span>{t.simplifiedEnglishHeading}</span>
          </div>

          <ul className="space-y-2.5 text-zinc-700">
            {summary.simplifiedEnglish.map((item, idx) => (
              <li key={idx} className={`flex items-start gap-2.5 ${textSize}`}>
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-zinc-100 text-zinc-700 font-bold text-xs flex items-center justify-center mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Items Box */}
      {summary.keyActionItems && summary.keyActionItems.length > 0 && (
        <div className="bg-emerald-50/50 border border-emerald-200/60 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm font-kannada">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{t.keyActionItemsHeading}</span>
          </div>

          <ul className="space-y-2 font-kannada text-emerald-900">
            {summary.keyActionItems.map((action, idx) => (
              <li key={idx} className={`flex items-start gap-2 ${textSize}`}>
                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                <span className="leading-relaxed">{action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Deadlines and Monetary Values Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Dates and Deadlines Card */}
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-zinc-900 font-bold text-xs sm:text-sm">
            <Calendar className="w-4 h-4 text-zinc-800" />
            <span className="font-kannada">{t.importantDatesHeading}</span>
          </div>
          {summary.importantDatesAndDeadlines && summary.importantDatesAndDeadlines.length > 0 ? (
            <div className="space-y-1.5 pt-1">
              {summary.importantDatesAndDeadlines.map((date, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200/80 text-zinc-900 font-medium text-xs font-kannada"
                >
                  {date}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-zinc-500 italic pt-1">{t.noDatesFound}</p>
          )}
        </div>

        {/* Monetary Values Card */}
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-zinc-900 font-bold text-xs sm:text-sm">
            <IndianRupee className="w-4 h-4 text-emerald-600" />
            <span className="font-kannada">{t.monetaryAmountsHeading}</span>
          </div>
          {summary.monetaryAmounts && summary.monetaryAmounts.length > 0 ? (
            <div className="space-y-1.5 pt-1">
              {summary.monetaryAmounts.map((amt, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 rounded-xl bg-emerald-50/50 border border-emerald-200/60 text-emerald-900 font-bold text-xs font-kannada"
                >
                  {amt}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-zinc-500 italic pt-1">{t.noAmountsFound}</p>
          )}
        </div>
      </div>

      {/* WhatsApp Share Modal */}
      {doc && (
        <WhatsAppShareModal
          doc={doc}
          lang={lang}
          isOpen={isWhatsAppOpen}
          onClose={() => setIsWhatsAppOpen(false)}
        />
      )}

      {/* Citizen Jargon Explainer Modal */}
      <KannadaJargonExplainer
        lang={lang}
        isOpen={isJargonOpen}
        onClose={() => setIsJargonOpen(false)}
      />
    </div>
  );
};
