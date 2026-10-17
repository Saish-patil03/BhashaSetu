import React from 'react';
import { 
  CheckCircle2, 
  Calendar, 
  IndianRupee
} from 'lucide-react';
import { DocumentSummary, UILanguage } from '../../types';
import { translations } from '../../i18n/translations';

interface TabSummaryProps {
  summary: DocumentSummary;
  lang: UILanguage;
  fontSize: 'normal' | 'large' | 'xlarge';
}

export const TabSummary: React.FC<TabSummaryProps> = ({
  summary,
  lang,
  fontSize
}) => {
  const t = translations[lang];

  const textSize =
    fontSize === 'xlarge'
      ? 'text-base sm:text-lg'
      : fontSize === 'large'
      ? 'text-sm sm:text-base'
      : 'text-xs sm:text-sm';

  return (
    <div className="space-y-4 animate-fadeIn">
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
    </div>
  );
};
