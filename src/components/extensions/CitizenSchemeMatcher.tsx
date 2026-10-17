import React, { useState } from 'react';
import { 
  Landmark, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  User, 
  MapPin, 
  Sprout, 
  CreditCard,
  FileCheck2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { DigitizedDocument, UILanguage } from '../../types';
import { 
  MatchedScheme, 
  getRecommendedSchemes, 
  extractCitizenProfile 
} from '../../services/schemeMatcherService';
import { CitizenApplicationModal } from './CitizenApplicationModal';

interface CitizenSchemeMatcherProps {
  doc: DigitizedDocument;
  lang: UILanguage;
  fontSize: 'normal' | 'large' | 'xlarge';
}

export const CitizenSchemeMatcher: React.FC<CitizenSchemeMatcherProps> = ({
  doc,
  lang,
  fontSize
}) => {
  const [selectedScheme, setSelectedScheme] = useState<MatchedScheme | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const profile = extractCitizenProfile(doc);
  const schemes = getRecommendedSchemes(doc);

  const handleOpenAutoFill = (scheme: MatchedScheme) => {
    setSelectedScheme(scheme);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Top Banner Callout */}
      <div className="bg-zinc-100/80 border border-zinc-200 text-zinc-800 rounded-xl p-3.5 sm:p-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-zinc-900 text-white flex items-center justify-center shrink-0">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-xs sm:text-sm text-zinc-900 font-kannada">
                  {lang === 'kn'
                    ? 'ಸ್ಮಾರ್ಟ್ ಸರ್ಕಾರಿ ಯೋಜನೆ ಹೊಂದಾಣಿಕೆ & ಸ್ವಯಂ-ಭರ್ತಿ (Smart Scheme Matcher)'
                    : 'Smart Citizen Scheme Matcher & Auto-Fill Drawer'}
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[10px] font-mono font-bold">
                  {schemes.length} Schemes Matched
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 font-kannada mt-0.5">
                {lang === 'kn'
                  ? 'ದಾಖಲೆಯಿಂದ ರೈತರ ಹೆಸರು, ಜಿಲ್ಲೆ ಮತ್ತು ಬೆಳೆಗಳನ್ನು ಓದಿ ಸಂಬಂಧಿಸಿದ ಕರ್ನಾಟಕ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಹೊಂದಿಸುತ್ತದೆ.'
                  : 'Reads farmer name, district, and crop items from the scanned document to match high-value Karnataka DBT welfare schemes.'}
              </p>
            </div>
          </div>
        </div>

        {/* Extracted Profile Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 mt-3 border-t border-zinc-200/80 text-xs">
          <div className="bg-white p-2.5 rounded-lg border border-zinc-200/80 shadow-2xs space-y-0.5">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block flex items-center gap-1">
              <User className="w-3 h-3 text-zinc-500" />
              <span>{lang === 'kn' ? 'ಫಲಾನುಭವಿ' : 'Beneficiary'}</span>
            </span>
            <div className="font-bold text-zinc-900 font-kannada truncate">
              {profile.applicantName}
            </div>
          </div>

          <div className="bg-white p-2.5 rounded-lg border border-zinc-200/80 shadow-2xs space-y-0.5">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block flex items-center gap-1">
              <MapPin className="w-3 h-3 text-zinc-500" />
              <span>{lang === 'kn' ? 'ವ್ಯಾಪ್ತಿ' : 'Location'}</span>
            </span>
            <div className="font-bold text-zinc-900 font-kannada truncate">
              {profile.village}, {profile.taluk}
            </div>
          </div>

          <div className="bg-white p-2.5 rounded-lg border border-zinc-200/80 shadow-2xs space-y-0.5">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block flex items-center gap-1">
              <Sprout className="w-3 h-3 text-zinc-500" />
              <span>{lang === 'kn' ? 'ಪತ್ತೆಯಾದ ಬೆಳೆ' : 'Crops Found'}</span>
            </span>
            <div className="font-bold text-zinc-900 font-kannada truncate">
              {profile.cropsDetected.map((c) => c.kn.split(' ')[0]).join(', ')}
            </div>
          </div>

          <div className="bg-white p-2.5 rounded-lg border border-zinc-200/80 shadow-2xs space-y-0.5">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block flex items-center gap-1">
              <CreditCard className="w-3 h-3 text-zinc-500" />
              <span>{lang === 'kn' ? 'ಬ್ಯಾಂಕ್ ಲಿಂಕ್' : 'DBT Status'}</span>
            </span>
            <div className="font-bold text-emerald-700 font-mono text-[11px] flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Aadhaar NPCI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {schemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white border border-zinc-200/80 hover:border-zinc-400 rounded-xl p-4 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between space-y-3.5 group"
          >
            {/* Header and Match Badges */}
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-medium text-zinc-500 font-kannada block">
                    {scheme.ministryKn}
                  </span>
                  <h5 className="font-bold text-sm text-zinc-900 font-kannada group-hover:text-zinc-800 transition-colors">
                    {scheme.titleKn}
                  </h5>
                  <span className="text-[11px] text-zinc-500 font-medium block">
                    {scheme.titleEn}
                  </span>
                </div>

                <div className="text-right shrink-0">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[10px] font-mono font-bold block mb-1">
                    {scheme.matchScore}% Match
                  </span>
                  <span className="text-xs font-bold font-mono text-zinc-900 block">
                    {scheme.dbtAmount}
                  </span>
                </div>
              </div>

              {/* Match Reason */}
              <div className="p-2 rounded-lg bg-zinc-50 border border-zinc-200/70 text-xs font-kannada text-zinc-700">
                <span className="font-bold text-zinc-900">ಹೊಂದಾಣಿಕೆ ಕಾರಣ: </span>
                <span>{lang === 'kn' ? scheme.matchReasonKn : scheme.matchReasonEn}</span>
              </div>

              {/* Eligibility Checklist */}
              <div className="space-y-1 pt-1">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                  {lang === 'kn' ? 'ಸ್ವಯಂ ಪರಿಶೀಲಿಸಿದ ಅರ್ಹತಾ ಷರತ್ತುಗಳು:' : 'Auto-Verified Eligibility:'}
                </span>
                {scheme.eligibilityChecklist.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs text-zinc-700 font-kannada">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{lang === 'kn' ? item.textKn : item.textEn}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Auto-Fill Action Button */}
            <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
              <span className="text-[11px] text-zinc-500 font-mono">
                {scheme.tags.join(' • ')}
              </span>

              <button
                type="button"
                onClick={() => handleOpenAutoFill(scheme)}
                className="px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs shadow-xs flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer font-kannada"
              >
                <FileCheck2 className="w-3.5 h-3.5 text-zinc-400" />
                <span>{lang === 'kn' ? '1-ಕ್ಲಿಕ್ ಸ್ವಯಂ-ಭರ್ತಿ ಅರ್ಜಿ' : '1-Click Auto-Fill'}</span>
                <ChevronRight className="w-3 h-3 text-zinc-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Auto-Fill Preview & Submit Modal */}
      <CitizenApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        scheme={selectedScheme}
        doc={doc}
        lang={lang}
      />
    </div>
  );
};
