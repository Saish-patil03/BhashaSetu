import React, { useState } from 'react';
import { 
  Phone, 
  PhoneCall, 
  X, 
  Search, 
  Check, 
  Copy, 
  Clock, 
  ShieldCheck, 
  Landmark, 
  Wheat, 
  HeartHandshake, 
  LifeBuoy, 
  ExternalLink 
} from 'lucide-react';
import { UILanguage } from '../../types';

interface HelplineItem {
  id: string;
  nameKn: string;
  nameEn: string;
  categoryKn: string;
  categoryEn: string;
  number: string;
  altNumber?: string;
  isTollFree: boolean;
  timingsKn: string;
  timingsEn: string;
  purposeKn: string;
  purposeEn: string;
  icon: 'wheat' | 'landmark' | 'health' | 'shield';
  accentColor: string;
}

const KARNATAKA_HELPLINES: HelplineItem[] = [
  {
    id: 'kisan',
    nameKn: 'ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್ (ರೈತ ಸಹಾಯವಾಣಿ)',
    nameEn: 'Kisan Call Centre (Farmer Advisory)',
    categoryKn: 'ಕೃಷಿ & ಮಾರುಕಟ್ಟೆ',
    categoryEn: 'Agriculture & APMC',
    number: '1551',
    altNumber: '1800-180-1551',
    isTollFree: true,
    timingsKn: 'ಪ್ರತಿದಿನ ಬೆಳಿಗ್ಗೆ 6:00 ರಿಂದ ರಾತ್ರಿ 10:00 (ಕನ್ನಡ)',
    timingsEn: 'Daily 6:00 AM - 10:00 PM (Kannada)',
    purposeKn: 'ಬೆಳೆ ಮಾಹಿತಿ, ಕೀಟಬಾಧೆ, ಮಾರುಕಟ್ಟೆ ದರ, ಕೃಷಿ ಸಬ್ಸಿಡಿ ಮತ್ತು ಬೀಜ-ಗೊಬ್ಬರ ನೆರವು.',
    purposeEn: 'Crop advisory, pest control, APMC market rates, and agricultural subsidies.',
    icon: 'wheat',
    accentColor: 'emerald'
  },
  {
    id: 'sevasindhu',
    nameKn: 'ಸೇವಾ ಸಿಂಧು ನಾಗರಿಕ ಸಹಾಯವಾಣಿ',
    nameEn: 'Seva Sindhu Citizen Services Helpline',
    categoryKn: 'ಸರ್ಕಾರಿ ಸೇವೆಗಳು',
    categoryEn: 'Public Services',
    number: '1902',
    altNumber: '080-22230282',
    isTollFree: false,
    timingsKn: 'ಬೆಳಿಗ್ಗೆ 9:00 ರಿಂದ ಸಂಜೆ 6:00 (ಕೆಲಸದ ದಿನಗಳಲ್ಲಿ)',
    timingsEn: '9:00 AM - 6:00 PM (Working days)',
    purposeKn: 'ಗೃಹಲಕ್ಷ್ಮಿ, ಯುವನಿಧಿ, ಪಡಿತರ ಚೀಟಿ (Ration Card), ಜಾತಿ/ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ ಅರ್ಜಿಗಳು.',
    purposeEn: 'Guarantee schemes, Ration card queries, Caste & Income certificates.',
    icon: 'landmark',
    accentColor: 'blue'
  },
  {
    id: 'bhoomi',
    nameKn: 'ಭೂಮಿ ಮತ್ತು ಪಹಣಿ (RTC) ಸಹಾಯವಾಣಿ',
    nameEn: 'Bhoomi Land Records & RTC Helpdesk',
    categoryKn: 'ಕಂದಾಯ & ಜಮೀನು',
    categoryEn: 'Revenue & Land',
    number: '080-22113255',
    isTollFree: false,
    timingsKn: 'ಬೆಳಿಗ್ಗೆ 10:00 ರಿಂದ ಸಂಜೆ 5:30 (ಸರ್ಕಾರಿ ದಿನಗಳಲ್ಲಿ)',
    timingsEn: '10:00 AM - 5:30 PM (Govt Working Days)',
    purposeKn: 'ಪಹಣಿ (RTC) ತಿದ್ದುಪಡಿ, ಮ್ಯುಟೇಶನ್ (ಪೋತಿ ಖಾತೆ), ಪರಿಹಾರ ಹಾಗೂ ಭೂ ದಾಖಲೆಗಳ ತಂತ್ರಾಂಶ ನೆರವು.',
    purposeEn: 'Pahani corrections, mutation status, land parcel queries, and Bhoomi software.',
    icon: 'landmark',
    accentColor: 'amber'
  },
  {
    id: 'arogya',
    nameKn: 'ಆರೋಗ್ಯ ಸಹಾಯವಾಣಿ (Arogya Sahayavani)',
    nameEn: 'Karnataka Health Helpline',
    categoryKn: 'ಆರೋಗ್ಯ & ತುರ್ತು',
    categoryEn: 'Health & Medical',
    number: '104',
    isTollFree: true,
    timingsKn: '24x7 ನಿರಂತರ ಉಚಿತ ಸೇವೆ',
    timingsEn: '24x7 Continuous Free Service',
    purposeKn: 'ಉಚಿತ ವೈದ್ಯಕೀಯ ಸಲಹೆ, ಆಯುಷ್ಮಾನ್ ಭಾರತ್ ಆರೋಗ್ಯ ಕರ್ನಾಟಕ ಕಾರ್ಡ್ ಮಾಹಿತಿ, ಮಾನಸಿಕ ನೆರವು.',
    purposeEn: 'Free tele-consultation, Ayushman Bharat card info, emergency health advice.',
    icon: 'health',
    accentColor: 'rose'
  },
  {
    id: 'emergency',
    nameKn: 'ಕರ್ನಾಟಕ ತುರ್ತು ಸ್ಪಂದನ (ERSS)',
    nameEn: 'Emergency Response Support System',
    categoryKn: 'ತುರ್ತು ಸೇವೆ',
    categoryEn: 'Emergency 112',
    number: '112',
    isTollFree: true,
    timingsKn: '24x7 ತುರ್ತು ಸೇವೆ',
    timingsEn: '24x7 Emergency Help',
    purposeKn: 'ಪೊಲೀಸ್, ಅಗ್ನಿಶಾಮಕ ಅಥವಾ ತುರ್ತು ರಕ್ಷಣಾ ವಾಹನ ನೆರವು.',
    purposeEn: 'Unified helpline for Police, Fire, and Ambulance emergency support.',
    icon: 'shield',
    accentColor: 'red'
  },
  {
    id: 'elderly',
    nameKn: 'ಹಿರಿಯ ನಾಗರಿಕರ ರಾಷ್ಟ್ರೀಯ ಸಹಾಯವಾಣಿ',
    nameEn: 'National Elderline (Karnataka)',
    categoryKn: 'ಹಿರಿಯ ನಾಗರಿಕರು',
    categoryEn: 'Senior Citizens',
    number: '14567',
    altNumber: '1090',
    isTollFree: true,
    timingsKn: 'ಬೆಳಿಗ್ಗೆ 8:00 ರಿಂದ ರಾತ್ರಿ 8:00',
    timingsEn: '8:00 AM - 8:00 PM',
    purposeKn: 'ಹಿರಿಯ ನಾಗರಿಕರ ಮಾಸಿಕ ಪಿಂಚಣಿ, ವೃದ್ಧಾಪ್ಯ ವೇತನ, ಸುರಕ್ಷತೆ ಮತ್ತು ಆಪ್ತ ಸಮಾಲೋಚನೆ.',
    purposeEn: 'Old age pension inquiries, healthcare support, elder welfare and safety.',
    icon: 'health',
    accentColor: 'purple'
  }
];

interface CitizenHelplineHubProps {
  lang: UILanguage;
  isOpen: boolean;
  onClose: () => void;
}

export const CitizenHelplineHub: React.FC<CitizenHelplineHubProps> = ({
  lang,
  isOpen,
  onClose
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  if (!isOpen) return null;

  const isKn = lang === 'kn';

  const categories = [
    { id: 'all', kn: 'ಎಲ್ಲಾ ಸಹಾಯವಾಣಿಗಳು', en: 'All Helplines' },
    { id: 'kisan', kn: '🌾 ಕೃಷಿ & ರೈತರು', en: '🌾 Agriculture' },
    { id: 'revenue', kn: '🏛️ ಕಂದಾಯ & ಜಮೀನು', en: '🏛️ Revenue & Land' },
    { id: 'health', kn: '🏥 ಆರೋಗ್ಯ & ತುರ್ತು', en: '🏥 Health & Emergency' },
    { id: 'public', kn: '📋 ಸೇವಾ ಸಿಂಧು', en: '📋 Public Services' }
  ];

  const filteredHelplines = KARNATAKA_HELPLINES.filter((item) => {
    const matchesSearch = 
      item.nameKn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.number.includes(searchQuery) ||
      item.purposeKn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.purposeEn.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedCategory === 'kisan') return item.id === 'kisan';
    if (selectedCategory === 'revenue') return item.id === 'bhoomi';
    if (selectedCategory === 'health') return item.id === 'arogya' || item.id === 'emergency' || item.id === 'elderly';
    if (selectedCategory === 'public') return item.id === 'sevasindhu';

    return true;
  });

  const handleCopy = async (num: string) => {
    try {
      await navigator.clipboard.writeText(num.replace(/[^0-9]/g, ''));
      setCopiedNumber(num);
      setTimeout(() => setCopiedNumber(null), 2000);
    } catch {
      // fallback
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
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-zinc-950 flex items-center justify-center shadow-xs font-bold">
              <PhoneCall className="w-5 h-5 text-zinc-900" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 text-base font-kannada flex items-center gap-2">
                {isKn ? 'ಕರ್ನಾಟಕ ಸರ್ಕಾರಿ & ರೈತ ಸಹಾಯವಾಣಿ ಡಯಲರ್' : 'Karnataka Civic & Farmer Helpline Hub'}
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                  1-Tap Call
                </span>
              </h3>
              <p className="text-xs text-zinc-500 font-kannada">
                {isKn 
                  ? 'ದಾಖಲೆ, ಪಹಣಿ, ರೇಷನ್ ಅಥವಾ ಬೆಳೆ ಸಮಸ್ಯೆಗಳಿದ್ದಲ್ಲಿ ತಕ್ಷಣವೇ ಸರ್ಕಾರಿ ಅಧಿಕಾರಿಗಳನ್ನು ಸಂಪರ್ಕಿಸಿ' 
                  : 'Direct, 1-tap call access to official Karnataka citizen and farmer helpdesks'}
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

        {/* Search and Filters Bar */}
        <div className="p-4 border-b border-zinc-100 bg-white space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={isKn ? 'ಸಹಾಯವಾಣಿ ಅಥವಾ ಸಮಸ್ಯೆಯನ್ನು ಹುಡುಕಿ (ಉದಾ: ಪಹಣಿ, ಕಿಸಾನ್, ರೇಷನ್, 1551)...' : 'Search helplines (e.g. Kisan, Pahani, Seva Sindhu, 1551)...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-zinc-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-400/50 focus:border-amber-500 font-kannada"
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

        {/* Helpline List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 flex-1 bg-zinc-50/50">
          {filteredHelplines.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <LifeBuoy className="w-8 h-8 text-zinc-300 mx-auto" />
              <p className="text-xs text-zinc-500 font-kannada">
                {isKn ? 'ಯಾವುದೇ ಸಹಾಯವಾಣಿ ಕಂಡುಬಂದಿಲ್ಲ.' : 'No helplines found matching your search.'}
              </p>
            </div>
          ) : (
            filteredHelplines.map((item) => (
              <div 
                key={item.id}
                className="bg-white border border-zinc-200/90 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition-shadow space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-zinc-900 text-sm font-kannada">
                        {isKn ? item.nameKn : item.nameEn}
                      </h4>
                      {item.isTollFree && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                          {isKn ? 'ಉಚಿತ ಕರೆ (Toll Free)' : 'Toll Free'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-600 font-kannada leading-relaxed">
                      {isKn ? item.purposeKn : item.purposeEn}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-lg font-bold font-mono text-zinc-900 tracking-tight">
                      {item.number}
                    </div>
                    {item.altNumber && (
                      <div className="text-[11px] text-zinc-400 font-mono">
                        ಅಥವಾ {item.altNumber}
                      </div>
                    )}
                  </div>
                </div>

                {/* Timings and Action Buttons */}
                <div className="pt-2 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-zinc-500 text-[11px] font-kannada">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{isKn ? item.timingsKn : item.timingsEn}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(item.number)}
                      className="px-2.5 py-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-zinc-600 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                      title="Copy Number"
                    >
                      {copiedNumber === item.number ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">{isKn ? 'ನಕಲಿಸಲಾಗಿದೆ' : 'Copied'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-zinc-400" />
                          <span>{isKn ? 'ನಕಲಿಸಿ' : 'Copy'}</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`tel:${item.number.replace(/[^0-9]/g, '')}`}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-all active:scale-95 cursor-pointer font-kannada"
                    >
                      <Phone className="w-3.5 h-3.5 fill-white" />
                      <span>{isKn ? 'ನೇರ ಕರೆ ಮಾಡಿ' : 'Call Now'}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-zinc-200 bg-white flex items-center justify-between text-xs text-zinc-500 font-kannada">
          <div className="flex items-center gap-1.5 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಅಧಿಕೃತ ಸಾರ್ವಜನಿಕ ಸಹಾಯವಾಣಿ ವಿವರಗಳು</span>
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
