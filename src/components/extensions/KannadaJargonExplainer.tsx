import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  X, 
  HelpCircle, 
  Check, 
  Copy, 
  FileCheck2, 
  Sparkles, 
  Landmark 
} from 'lucide-react';
import { UILanguage } from '../../types';

export interface JargonTerm {
  termKn: string;
  termEn: string;
  categoryKn: string;
  categoryEn: string;
  meaningKn: string;
  meaningEn: string;
  exampleKn: string;
  exampleEn: string;
}

export const KANNADA_GOVT_JARGON: JargonTerm[] = [
  {
    termKn: 'ಪಹಣಿ (ಆರ್‌ಟಿಸಿ / RTC)',
    termEn: 'Pahani (Record of Rights, Tenancy and Crops)',
    categoryKn: 'ಕಂದಾಯ & ಜಮೀನು',
    categoryEn: 'Land & Revenue',
    meaningKn: 'ಜಮೀನಿನ ಮಾಲೀಕರು ಯಾರು, ಎಷ್ಟು ಎಕರೆ-ಗುಂಟೆ ಜಮೀನಿದೆ, ಯಾವ ಬೆಳೆ ಬೆಳೆಯಲಾಗಿದೆ ಮತ್ತು ಬ್ಯಾಂಕ್ ಸಾಲಗಳಿವೆಯೇ ಎಂಬುದನ್ನು ದಾಖಲಿಸುವ ಸರ್ಕಾರದ ಪ್ರಮುಖ ಅಧಿಕೃತ ಪತ್ರ.',
    meaningEn: 'Official government land record stating ownership, land area in acres-guntas, soil class, crops grown, and active bank mortgages.',
    exampleKn: 'ರೈತರು ಬೆಳೆ ಪರಿಹಾರ ಅಥವಾ ಕೆಸಿಸಿ (KCC) ಬ್ಯಾಂಕ್ ಸಾಲ ಪಡೆಯಲು ಪಹಣಿ ಕಡ್ಡಾಯ.',
    exampleEn: 'Pahani is mandatory for Kisan Credit Card (KCC) loans and disaster relief.'
  },
  {
    termKn: 'ಮ್ಯುಟೇಶನ್ (ಪೋತಿ ಖಾತೆ / ಹಕ್ಕು ಬದಲಾವಣೆ)',
    termEn: 'Mutation (Pothi Khata / Succession)',
    categoryKn: 'ಕಂದಾಯ & ಜಮೀನು',
    categoryEn: 'Land & Revenue',
    meaningKn: 'ಮೂಲ ಭೂ ಮಾಲೀಕರು ಮರಣ ಹೊಂದಿದಾಗ ವಾರಸುದಾರರ ಹೆಸರು ಸೇರಿಸುವುದು (ಪೋತಿ ಖಾತೆ), ಅಥವಾ ಜಮೀನು ಮಾರಾಟವಾದಾಗ ಹೊಸ ಮಾಲೀಕರ ಹೆಸರನ್ನು ಪಹಣಿಯಲ್ಲಿ ಅಧಿಕೃತವಾಗಿ ದಾಖಲಿಸುವ ಪ್ರಕ್ರಿಯೆ.',
    meaningEn: 'Legal process of updating title ownership in the revenue register after property purchase or upon the original owner’s passing (succession).',
    exampleKn: 'ಜಮೀನು ಖರೀದಿಸಿದ ತಕ್ಷಣ ಕಂದಾಯ ಇಲಾಖೆಯಲ್ಲಿ ಮ್ಯುಟೇಶನ್ ಮಾಡಿಸಬೇಕು.',
    exampleEn: 'Mutation must be completed immediately after registering a sale deed.'
  },
  {
    termKn: 'ಖಾತೆ (Khata)',
    termEn: 'Property Khata (Account)',
    categoryKn: 'ನಗರ & ಪಂಚಾಯತ್',
    categoryEn: 'Municipal & Panchayat',
    meaningKn: 'ಗ್ರಾಮ ಪಂಚಾಯತ್ ಅಥವಾ ಪಾಲಿಕೆಯ ಪುಸ್ತಕದಲ್ಲಿ ನಿಮ್ಮ ಮನೆ ಅಥವಾ ಜಮೀನಿನ ತೆರಿಗೆ ಪಾವತಿಸಲು ನೀಡಲಾಗಿರುವ ಅಧಿಕೃತ ಖಾತಾ ಸಂಖ್ಯೆ ಮತ್ತು ದಾಖಲೆ.',
    meaningEn: 'Official legal ledger entry in Panchayat/Municipal records enabling local property tax assessment and ownership validation.',
    exampleKn: 'ಮನೆ ಕಟ್ಟಲು ಅನುಮತಿ ಅಥವಾ ವಿದ್ಯುತ್ ಸಂಪರ್ಕ ಪಡೆಯಲು ಖಾತೆ ಬೇಕು.',
    exampleEn: 'Khata certificate is required for building licenses and electricity meters.'
  },
  {
    termKn: 'ಸರ್ವೆ ನಂಬರ್ (Survey Number)',
    termEn: 'Survey Number',
    categoryKn: 'ಕಂದಾಯ & ಜಮೀನು',
    categoryEn: 'Land & Revenue',
    meaningKn: 'ಕಂದಾಯ ಇಲಾಖೆಯು ಗ್ರಾಮದ ನಕ್ಷೆಯಲ್ಲಿ ನಿಮ್ಮ ಜಮೀನಿನ ನಿರ್ದಿಷ್ಟ ಗಡಿಯನ್ನು ಗುರುತಿಸಲು ನೀಡಿರುವ ಅನನ್ಯ ಸಂಖ್ಯೆ (ಉದಾ: ಸರ್ವೆ ನಂ. 84).',
    meaningEn: 'Unique cadastral identification number assigned to a specific parcel of land by the Karnataka Revenue Survey department.',
    exampleKn: 'ನಿಮ್ಮ ಜಮೀನಿನ ಎಲ್ಲ ಗಡಿ ವಿವಾದ ಬಗೆಹರಿಸಲು ಸರ್ವೆ ನಂಬರ್ ಆಧಾರ.',
    exampleEn: 'Used to track boundaries, survey sketches, and village maps.'
  },
  {
    termKn: 'ಹಿಸ್ಸಾ (Hissa / ಉಪ-ವಿಭಾಗ)',
    termEn: 'Hissa (Sub-division number)',
    categoryKn: 'ಕಂದಾಯ & ಜಮೀನು',
    categoryEn: 'Land & Revenue',
    meaningKn: 'ಒಂದೇ ಸರ್ವೆ ನಂಬರಿನ ಜಮೀನನ್ನು ಕುಟುಂಬದ ಪಾಲುದಾರರ ನಡುವೆ ಹಂಚಿಕೊಂಡಾಗ ಪ್ರತಿಯೊಬ್ಬರ ಪಾಲಿಗೆ ನೀಡಲಾಗುವ ಉಪ ಸಂಖ್ಯೆ (ಉದಾ: 84/1, 84/2).',
    meaningEn: 'Sub-division portion assigned within a parent survey number following family partition or sale.',
    exampleKn: 'ಹಿಸ್ಸಾ ನಕ್ಷೆ ಮಾಡಿಸಿದರೆ ನಿಮ್ಮ ಪಾಲಿನ ಜಮೀನಿಗೆ ಪ್ರತ್ಯೇಕ ಪಹಣಿ ಬರುತ್ತದೆ.',
    exampleEn: 'Getting a separate Hissa number generates an independent RTC for your share.'
  },
  {
    termKn: 'ಋಣಭಾರ ಪ್ರಮಾಣಪತ್ರ (ಇಸಿ / EC)',
    termEn: 'Encumbrance Certificate (EC)',
    categoryKn: 'ಖರೀದಿ & ನೋಂದಣಿ',
    categoryEn: 'Registration & Loans',
    meaningKn: 'ಕಳೆದ 15 ರಿಂದ 30 ವರ್ಷಗಳಲ್ಲಿ ಆ ಜಮೀನಿನ ಮೇಲೆ ಯಾವುದೇ ಬ್ಯಾಂಕ್ ಸಾಲ, ಅಡಮಾನ ಅಥವಾ ಕೋರ್ಟ್ ಕೇಸ್ ಇಲ್ಲವೆಂದು ಸಬ್-ರಿಜಿಸ್ಟ್ರಾರ್ ಕಚೇರಿಯು ನೀಡುವ ಋಣಭಾರ ರಹಿತ ದೃಢೀಕರಣ ಪತ್ರ.',
    meaningEn: 'Official certificate from the Sub-Registrar confirming whether a property is free from mortgages, court attachments, or prior registered sales.',
    exampleKn: "ಯಾವುದೇ ಜಮೀನು ಖರೀದಿಸುವ ಮುನ್ನ 'ನಿಲ್-ಇಸಿ' (Nil EC) ಪರಿಶೀಲಿಸುವುದು ಕ್ಷೇಮ.",
    exampleEn: "Checking a Nil-EC ensures you do not inherit someone else's unpaid bank loans."
  },
  {
    termKn: 'ಖರಾಬು ಜಮೀನು (Kharab Land)',
    termEn: 'Kharab (Uncultivable Land)',
    categoryKn: 'ಕಂದಾಯ & ಜಮೀನು',
    categoryEn: 'Land & Revenue',
    meaningKn: "ಕೃಷಿ ಮಾಡಲು ಬಾರದ ಜಮೀನು. 'ಎ' ಖರಾಬು ಎಂದರೆ ರೈತನಿಗೆ ಸೇರಿದ್ದು ಆದರೆ ಬೆಳೆ ಬಾರದ್ದು (ಹಳ್ಳ/ಕಲ್ಲು). 'ಬಿ' ಖರಾಬು ಎಂದರೆ ರಸ್ತೆ, ಕಾಲುದಾರಿ, ಕೆರೆಗಾಗಿ ಮೀಸಲಾದ ಸರ್ಕಾರಿ ಜಾಗ.",
    meaningEn: 'Land not fit for farming. Class A belongs to owner but uncultivated; Class B is reserved for public utility (roads, water bodies) and cannot be private.',
    exampleKn: "'ಬಿ' ಖರಾಬು ಜಮೀನನ್ನು ಮಾರಾಟ ಮಾಡಲು ಅಥವಾ ಒತ್ತುವರಿ ಮಾಡಲು ಬರುವುದಿಲ್ಲ.",
    exampleEn: 'Class B Kharab land cannot be purchased or mutated into private names.'
  },
  {
    termKn: 'ಆಕಾರ್‌ಬಂದ್ (Akarband)',
    termEn: 'Akarband (Survey Register)',
    categoryKn: 'ಕಂದಾಯ & ಜಮೀನು',
    categoryEn: 'Land & Revenue',
    meaningKn: 'ಸರ್ವೆ ಇಲಾಖೆಯು ಜಮೀನಿನ ಒಟ್ಟು ವಿಸ್ತೀರ್ಣ, ಕೃಷಿ ಯೋಗ್ಯ ಭೂಮಿ, ಖರಾಬು ಮತ್ತು ಅದಕ್ಕೆ ನಿಗದಿಪಡಿಸಲಾದ ಕಂದಾಯ ದರವನ್ನು ನಮೂದಿಸಿ ತಯಾರಿಸಿದ ಮೂಲ ಭೂ ದಾಖಲೆ.',
    meaningEn: 'Foundational cadastral record establishing the total area, assessment rate, and kharab deductions for a survey number.',
    exampleKn: 'ಪಹಣಿಯಲ್ಲಿ ವಿಸ್ತೀರ್ಣ ವ್ಯತ್ಯಾಸವಿದ್ದಾಗ ಆಕಾರ್‌ಬಂದ್ ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ.',
    exampleEn: 'Consulted to resolve discrepancy between registered extent and physical land.'
  },
  {
    termKn: 'ಕ್ರಯಪತ್ರ (Sale Deed)',
    termEn: 'Sale Deed (Registered Conveyance)',
    categoryKn: 'ಖರೀದಿ & ನೋಂದಣಿ',
    categoryEn: 'Registration & Conveyance',
    meaningKn: 'ಜಮೀನು ಅಥವಾ ನಿವೇಶನವನ್ನು ಕಾನೂನುಬದ್ಧವಾಗಿ ಕೊಂಡಾಗ ಮುದ್ರಾಂಕ ಶುಲ್ಕ (Stamp Duty) ಪಾವತಿಸಿ ಸಬ್-ರಿಜಿಸ್ಟ್ರಾರ್ ಕಚೇರಿಯಲ್ಲಿ ನೋಂದಾಯಿಸಿಕೊಳ್ಳುವ ಅಧಿಕೃತ ಖರೀದಿ ಪತ್ರ.',
    meaningEn: 'Legally registered document executed in the Sub-Registrar office proving ownership transfer from seller to buyer.',
    exampleKn: 'ಕ್ರಯಪತ್ರ ನೋಂದಣಿಯಾದ ನಂತರವೇ ಪಹಣಿಯಲ್ಲಿ ಹೆಸರು ಬದಲಾವಣೆ ಸಾಧ್ಯ.',
    exampleEn: 'Registration of the sale deed is the legal prerequisite for land mutation.'
  },
  {
    termKn: 'ಕಂದಾಯ / ಸೆಸ್ (Cess / Land Revenue)',
    termEn: 'Land Revenue & Cess',
    categoryKn: 'ತೆರಿಗೆ & ಪಾವತಿ',
    categoryEn: 'Tax & Payment',
    meaningKn: 'ಭೂಮಿಯ ಮಾಲೀಕತ್ವ ಚಾಲ್ತಿಯಲ್ಲಿಡಲು ರಾಜ್ಯ ಕಂದಾಯ ಇಲಾಖೆಗೆ ಪ್ರತಿ ವರ್ಷ ಗ್ರಾಮ ಲೆಕ್ಕಿಗರ (VAO) ಮೂಲಕ ಪಾವತಿಸಬೇಕಾದ ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಶುಲ್ಕ.',
    meaningEn: 'Statutory annual tax payable by landholders to the Karnataka state government via the Village Administrative Officer.',
    exampleKn: 'ಪ್ರತಿ ವರ್ಷ ಕಂದಾಯ ಪಾವತಿಸಿ ರಶೀದಿಯನ್ನು ಭದ್ರವಾಗಿ ಇಟ್ಟುಕೊಳ್ಳಬೇಕು.',
    exampleEn: 'Paying annual revenue receipts proves continuous cultivation and possession.'
  }
];

interface KannadaJargonExplainerProps {
  lang: UILanguage;
  isOpen: boolean;
  onClose: () => void;
  initialSearch?: string;
}

export const KannadaJargonExplainer: React.FC<KannadaJargonExplainerProps> = ({
  lang,
  isOpen,
  onClose,
  initialSearch = ''
}) => {
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);

  if (!isOpen) return null;

  const isKn = lang === 'kn';

  const categories = [
    { id: 'all', kn: 'ಎಲ್ಲಾ ಪದಗಳು', en: 'All Terms' },
    { id: 'land', kn: '🌾 ಕಂದಾಯ & ಜಮೀನು', en: '🌾 Land & Revenue' },
    { id: 'reg', kn: '📜 ಖರೀದಿ & ನೋಂದಣಿ', en: '📜 Registration' },
    { id: 'tax', kn: '💰 ತೆರಿಗೆ & ಪಾವತಿ', en: '💰 Tax & Payment' }
  ];

  const filtered = KANNADA_GOVT_JARGON.filter((item) => {
    const matchesSearch =
      item.termKn.toLowerCase().includes(search.toLowerCase()) ||
      item.termEn.toLowerCase().includes(search.toLowerCase()) ||
      item.meaningKn.toLowerCase().includes(search.toLowerCase()) ||
      item.meaningEn.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedCategory === 'land') return item.categoryKn.includes('ಕಂದಾಯ') || item.categoryKn.includes('ಪಂಚಾಯತ್');
    if (selectedCategory === 'reg') return item.categoryKn.includes('ನೋಂದಣಿ');
    if (selectedCategory === 'tax') return item.categoryKn.includes('ತೆರಿಗೆ');

    return true;
  });

  const handleCopy = async (term: JargonTerm) => {
    const text = `${term.termKn} (${term.termEn}):\n${term.meaningKn}\nಉದಾಹರಣೆ: ${term.exampleKn}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTerm(term.termKn);
      setTimeout(() => setCopiedTerm(null), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-2xl border border-zinc-200 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-200/80 flex items-center justify-between bg-zinc-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 text-base font-kannada flex items-center gap-2">
                {isKn ? 'ಸರಳ ಕನ್ನಡ ಸರ್ಕಾರಿ ಪದಕೋಶ' : 'Citizen Kannada Government Jargon Simplifier'}
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                  ಸರಳ ವಿವರಣೆ
                </span>
              </h3>
              <p className="text-xs text-zinc-500 font-kannada">
                {isKn 
                  ? 'ಪಹಣಿ, ಖಾತೆ, ಮ್ಯುಟೇಶನ್, ಸರ್ವೆ ನಂಬರ್ ಹಾಗೂ ಕಂದಾಯ ಪದಗಳ ಸುಲಭ ಅರ್ಥ' 
                  : 'Plain language explanations of complex Kannada revenue and government terms'}
              </p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Pills */}
        <div className="p-4 border-b border-zinc-100 bg-white space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={isKn ? 'ಪದ ಹುಡುಕಿ (ಉದಾ: ಪಹಣಿ, ಖಾತೆ, ಮ್ಯುಟೇಶನ್, ಖರಾಬು, ಇಸಿ)...' : 'Search term (e.g. Pahani, Mutation, Khata, EC)...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-zinc-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 font-kannada"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-xs font-kannada transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-zinc-900 text-white font-semibold'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                {isKn ? cat.kn : cat.en}
              </button>
            ))}
          </div>
        </div>

        {/* Term Cards List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 flex-1 bg-zinc-50/40">
          {filtered.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <HelpCircle className="w-8 h-8 text-zinc-300 mx-auto" />
              <p className="text-xs text-zinc-500 font-kannada">
                {isKn ? 'ಯಾವುದೇ ಪದ ಕಂಡುಬಂದಿಲ್ಲ.' : 'No terms found matching your search.'}
              </p>
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white border border-zinc-200/90 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition-shadow space-y-2.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-zinc-900 text-sm sm:text-base font-kannada">
                        {item.termKn}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 font-medium font-kannada">
                        {isKn ? item.categoryKn : item.categoryEn}
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-400 font-mono">
                      {item.termEn}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(item)}
                    className="p-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-zinc-500 transition-colors cursor-pointer shrink-0"
                    title={isKn ? 'ವಿವರಣೆ ನಕಲಿಸಿ' : 'Copy explanation'}
                  >
                    {copiedTerm === item.termKn ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    )}
                  </button>
                </div>

                {/* Meaning */}
                <div className="text-xs sm:text-sm text-zinc-800 font-kannada leading-relaxed bg-emerald-50/40 border border-emerald-100 rounded-xl p-3">
                  <span className="font-bold text-emerald-950 mr-1.5">{isKn ? '💡 ಅರ್ಥ:' : '💡 Meaning:'}</span>
                  {isKn ? item.meaningKn : item.meaningEn}
                </div>

                {/* Real-world Practical Tip */}
                <div className="text-[11px] text-zinc-500 font-kannada flex items-start gap-1.5 pt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-zinc-700">{isKn ? 'ವ್ಯವಹಾರಿಕ ಬಳಕೆ: ' : 'Practical tip: '}</strong>
                    {isKn ? item.exampleKn : item.exampleEn}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-zinc-200 bg-white flex items-center justify-between text-xs text-zinc-500 font-kannada">
          <div className="flex items-center gap-1.5 text-[11px]">
            <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>ಕರ್ನಾಟಕ ಕಂದಾಯ ಮತ್ತು ಆಡಳಿತ ಪದಗಳ ಸರಳೀಕರಣ</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-zinc-700 font-medium cursor-pointer"
          >
            {isKn ? 'ಮುಚ್ಚಿ' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
