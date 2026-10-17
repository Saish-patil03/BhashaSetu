import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Trash2, 
  ExternalLink, 
  FileText, 
  Receipt, 
  PenTool, 
  Sparkles, 
  Calendar, 
  ArrowRight
} from 'lucide-react';
import { DigitizedDocument, UILanguage } from '../types';
import { translations } from '../i18n/translations';
import { storageService } from '../services/storageService';

interface DocumentVaultProps {
  lang: UILanguage;
  onOpenDoc: (doc: DigitizedDocument) => void;
  onClose?: () => void;
  onDocListChange?: () => void;
}

export const DocumentVault: React.FC<DocumentVaultProps> = ({
  lang,
  onOpenDoc,
  onClose,
  onDocListChange
}) => {
  const t = translations[lang];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [docs, setDocs] = useState<DigitizedDocument[]>(() => storageService.getDocuments());

  const searchResults = useMemo(() => {
    return storageService.searchDocuments(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory, docs]);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(lang === 'kn' ? 'ಈ ದಾಖಲೆಯನ್ನು ಅಳಿಸಬೇಕೆ?' : 'Are you sure you want to delete this document?')) {
      storageService.deleteDocument(id);
      setDocs(storageService.getDocuments());
      onDocListChange?.();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Vault Title and Top Meta */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 font-kannada">
          {t.vaultTitle}
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 font-medium mt-1">
          {t.vaultSubtitle}
        </p>
      </div>

      {/* Global Search Bar (Kannada + English + Kanglish Phonetic) */}
      <div className="bg-white rounded-2xl border border-zinc-200/80 p-3 sm:p-4 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-zinc-900" />
            <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider font-mono">
              {lang === 'kn' ? 'ಫೋನೆಟಿಕ್ ಕಂಗ್ಲಿಷ್ ಸರ್ಚ್ (Kanglish Search):' : 'Phonetic Cross-Script Engine (Kanglish + Kannada):'}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[10px] font-mono font-medium">
            Active: English ↔ ಕನ್ನಡ Transliteration
          </span>
        </div>

        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-zinc-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'kn' ? 'ಕನ್ನಡದಲ್ಲಿ ಅಥವಾ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ (ಉದಾ: Manjunath, Mandya, Ragi) ಹುಡುಕಿ...' : 'Search in Kannada, English, or Kanglish (e.g. Manjunath, Mandya, Ragi, 130150)...'}
            className="w-full pl-11 pr-20 py-3 rounded-xl border border-zinc-200 bg-zinc-50/60 focus:bg-white focus:border-zinc-400 text-xs sm:text-sm font-kannada text-zinc-900 placeholder-zinc-400 outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-xs text-zinc-400 hover:text-zinc-700 font-bold px-2 py-1 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Demo Search Chips for Judges */}
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          <span className="text-[11px] text-zinc-500 font-medium mr-1">
            {lang === 'kn' ? 'ತ್ವರಿತ ಪರೀಕ್ಷೆ (Try):' : 'Quick Test Pills:'}
          </span>
          {[
            { label: 'Manjunath (ಮಂಜುನಾಥ್)', query: 'Manjunath' },
            { label: 'Mandya (ಮಂಡ್ಯ)', query: 'Mandya' },
            { label: 'Ragi (ರಾಗಿ)', query: 'Ragi' },
            { label: 'Paddy (ಭತ್ತ)', query: 'Paddy' },
            { label: '130150 (₹ ೧,೩೦,೧೫೦)', query: '130150' },
            { label: 'Halebeedu (ಹಳೇಬೀಡು)', query: 'Halebeedu' }
          ].map((chip) => (
            <button
              key={chip.query}
              onClick={() => setSearchQuery(chip.query)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono border transition-all cursor-pointer ${
                searchQuery.toLowerCase() === chip.query.toLowerCase()
                  ? 'bg-zinc-900 text-white border-zinc-900 shadow-2xs font-semibold'
                  : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border-zinc-200/80'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs pt-1 border-t border-zinc-100">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-zinc-900 text-white shadow-2xs font-semibold'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-900'
            }`}
          >
            {t.filterAll} ({docs.length})
          </button>
          <button
            onClick={() => setSelectedCategory('government_notice')}
            className={`px-3 py-1.5 rounded-lg font-medium font-kannada transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'government_notice'
                ? 'bg-zinc-900 text-white shadow-2xs font-semibold'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-900'
            }`}
          >
            {t.filterGovt}
          </button>
          <button
            onClick={() => setSelectedCategory('financial_receipt')}
            className={`px-3 py-1.5 rounded-lg font-medium font-kannada transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'financial_receipt'
                ? 'bg-zinc-900 text-white shadow-2xs font-semibold'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-900'
            }`}
          >
            {t.filterInvoice}
          </button>
          <button
            onClick={() => setSelectedCategory('handwritten_note')}
            className={`px-3 py-1.5 rounded-lg font-medium font-kannada transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'handwritten_note'
                ? 'bg-zinc-900 text-white shadow-2xs font-semibold'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-900'
            }`}
          >
            {t.filterHandwritten}
          </button>
        </div>
      </div>

      {/* Documents Results Grid */}
      {searchResults.length === 0 ? (
        <div className="bg-white rounded-2xl border border-zinc-200/80 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-zinc-100 text-zinc-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6 stroke-[1.5]" />
          </div>
          <h4 className="font-bold text-zinc-800 text-base">
            {searchQuery ? t.noSearchResults : t.noDocsInVault}
          </h4>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            {searchQuery
              ? 'Try searching with alternate Kannada keywords or English terms.'
              : 'Scan or upload a Kannada document from the workspace to begin building your vault.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResults.map(({ doc, matchSnippets, matchedKannadaTarget, isPhoneticMatch }) => {
            const isNotice = doc.category === 'government_notice';
            const isInvoice = doc.category === 'financial_receipt';
            const Icon = isNotice ? FileText : isInvoice ? Receipt : PenTool;

            return (
              <div
                key={doc.id}
                onClick={() => onOpenDoc(doc)}
                className="group bg-white border border-zinc-200/80 hover:border-zinc-400 rounded-2xl p-4 shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 hover:-translate-y-0.5"
              >
                {/* Top Thumbnail & Badges */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-20 rounded-lg overflow-hidden bg-zinc-100 border border-zinc-200/80 shrink-0 flex items-center justify-center">
                      {doc.imageUrl ? (
                        <img
                          src={doc.imageUrl}
                          alt={doc.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <Icon className="w-6 h-6 text-zinc-400" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200/70">
                          {doc.category.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                          {doc.confidence.overall}%
                        </span>
                      </div>

                      <h4 className="font-bold text-zinc-900 group-hover:text-zinc-800 text-sm font-kannada transition-colors line-clamp-2">
                        {doc.title}
                      </h4>

                      <div className="flex items-center gap-1 text-[11px] text-zinc-400 font-medium">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Phonetic Kanglish Cross-Script Match Badge */}
                  {isPhoneticMatch && matchedKannadaTarget && (
                    <div className="p-2 rounded-lg bg-emerald-50/80 border border-emerald-200/60 text-[11px] text-emerald-900 font-kannada flex items-center gap-1.5">
                      <span className="font-mono font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded text-[10px]">
                        Kanglish ↔ ಕನ್ನಡ
                      </span>
                      <span>
                        "{searchQuery}" matched with <strong>"{matchedKannadaTarget}"</strong>
                      </span>
                    </div>
                  )}

                  {/* Matching Snippets Highlight (if query active) */}
                  {matchSnippets.length > 0 && (
                    <div className="p-2 rounded-lg bg-zinc-100 border border-zinc-200 text-[11px] text-zinc-900 font-kannada">
                      <span className="font-bold text-zinc-700">Match: </span>
                      <span>{matchSnippets[0]}</span>
                    </div>
                  )}

                  {/* Summary Preview Snippet */}
                  <p className="text-xs text-zinc-600 font-kannada line-clamp-2">
                    {doc.summary.simplifiedKannada[0] || doc.rawKannadaText.slice(0, 80)}
                  </p>
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-800 group-hover:text-zinc-900 font-kannada flex items-center gap-1">
                    <span>{t.openInWorkspace}</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </span>

                  <button
                    onClick={(e) => handleDelete(doc.id, e)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
                    title={t.deleteDoc}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
