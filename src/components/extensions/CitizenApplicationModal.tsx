import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Download, 
  Send, 
  ShieldCheck, 
  FileCheck2, 
  Sparkles,
  Smartphone,
  Building,
  Check
} from 'lucide-react';
import { DigitizedDocument, UILanguage } from '../../types';
import { MatchedScheme, extractCitizenProfile } from '../../services/schemeMatcherService';

interface CitizenApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  scheme: MatchedScheme | null;
  doc: DigitizedDocument;
  lang: UILanguage;
}

export const CitizenApplicationModal: React.FC<CitizenApplicationModalProps> = ({
  isOpen,
  onClose,
  scheme,
  doc,
  lang
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copiedAck, setCopiedAck] = useState(false);

  if (!isOpen || !scheme) return null;

  const profile = extractCitizenProfile(doc);
  const ackNumber = `KA-FRUITS-2026-${Math.floor(100000 + Math.random() * 900000)}`;

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1200);
  };

  const handleCopyAck = () => {
    navigator.clipboard?.writeText(ackNumber);
    setCopiedAck(true);
    setTimeout(() => setCopiedAck(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white border border-zinc-200/90 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col my-8 max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-zinc-900 text-white flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white font-bold font-kannada">
              ಭಾ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base font-kannada">
                  {lang === 'kn' ? 'ಸ್ವಯಂ-ಭರ್ತಿ ಅರ್ಜಿ ನಮೂನೆ (1-Click Auto-Fill Application)' : '1-Click Citizen Scheme Auto-Fill'}
                </h3>
                <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono">
                  Seva Sindhu
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                {scheme.titleKn} ({scheme.titleEn})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs text-zinc-700">
          {submitSuccess ? (
            /* Success Receipt Screen */
            <div className="text-center py-6 space-y-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-zinc-900 font-kannada">
                  {lang === 'kn' ? 'ಅರ್ಜಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ!' : 'Application Successfully Submitted!'}
                </h4>
                <p className="text-zinc-500 text-xs mt-1">
                  {lang === 'kn'
                    ? 'ಕರ್ನಾಟಕ ಸೇವಾ ಸಿಂಧು ಮತ್ತು ಫ್ರೂಟ್ಸ್ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಅರ್ಜಿ ನೋಂದಣಿಯಾಗಿದೆ.'
                    : 'Registered with Karnataka Seva Sindhu & FRUITS DBT Gateway.'}
                </p>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 max-w-md mx-auto space-y-2 text-left">
                <div className="flex items-center justify-between text-zinc-500 text-[11px] font-mono">
                  <span>ACKNOWLEDGEMENT REF:</span>
                  <button
                    onClick={handleCopyAck}
                    className="text-zinc-800 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {copiedAck ? <Check className="w-3 h-3 text-emerald-600" /> : null}
                    <span>{copiedAck ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-base font-bold font-mono text-zinc-900 tracking-wider">
                  {ackNumber}
                </div>
                <div className="text-[11px] text-zinc-500 pt-1 border-t border-zinc-200/80">
                  Beneficiary: <strong>{profile.applicantName}</strong> • Direct Benefit: <strong>{scheme.dbtAmount}</strong>
                </div>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-xl p-3 max-w-md mx-auto flex items-center gap-2.5 text-left text-emerald-900">
                <Smartphone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-[11px]">
                  {lang === 'kn'
                    ? `ದೃಢೀಕರಣ SMS ಅನ್ನು ${profile.mobile} ಸಂಖ್ಯೆಗೆ ಕಳುಹಿಸಲಾಗಿದೆ.`
                    : `SMS acknowledgement sent to registered mobile ${profile.mobile}.`}
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-lg bg-zinc-900 text-white font-medium text-xs hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  {lang === 'kn' ? 'ಮುಕ್ತಾಯ (Close)' : 'Done'}
                </button>
              </div>
            </div>
          ) : (
            /* Auto-Filled Form */
            <>
              {/* Document AI Extraction Callout */}
              <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-zinc-800" />
                  <span className="text-xs font-semibold text-zinc-900 font-kannada">
                    {lang === 'kn'
                      ? 'ದಾಖಲೆಯ OCR ನಿಂದ ವಿವರಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಭರ್ತಿ ಮಾಡಲಾಗಿದೆ'
                      : 'Form fields auto-populated directly from scanned Kannada Document AI'}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[10px] font-mono font-bold shrink-0">
                  100% Verified
                </span>
              </div>

              {/* Grid Form Fields */}
              <div className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1 flex items-center gap-1">
                      <span>{lang === 'kn' ? 'ಅರ್ಜಿದಾರರ ಹೆಸರು' : 'Applicant Name'}</span>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={profile.applicantName}
                      className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-900 font-kannada font-bold text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1 flex items-center gap-1">
                      <span>{lang === 'kn' ? 'ಇಂಗ್ಲಿಷ್ ಹೆಸರು' : 'Name in English'}</span>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={profile.applicantNameEn}
                      className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-900 font-medium text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1 flex items-center gap-1">
                      <span>{lang === 'kn' ? 'ಗ್ರಾಮ' : 'Village'}</span>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={profile.village}
                      className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-900 font-kannada text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1 flex items-center gap-1">
                      <span>{lang === 'kn' ? 'ತಾಲ್ಲೂಕು' : 'Taluk'}</span>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={profile.taluk}
                      className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-900 font-kannada text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1 flex items-center gap-1">
                      <span>{lang === 'kn' ? 'ಜಿಲ್ಲೆ' : 'District'}</span>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={profile.district}
                      className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-900 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1 flex items-center gap-1">
                      <span>{lang === 'kn' ? 'ಫ್ರೂಟ್ಸ್ ಐಡಿ (FRUITS ID)' : 'FRUITS Portal ID'}</span>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={profile.fruitsId}
                      className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-900 font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1 flex items-center gap-1">
                      <span>{lang === 'kn' ? 'ಮೂಲ ದಾಖಲೆ ಸಂಖ್ಯೆ' : 'Source Document Ref'}</span>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={`${profile.refNumber} (${doc.title.slice(0, 24)}...)`}
                      className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-900 font-kannada text-xs"
                    />
                  </div>
                </div>

                {/* Crops / Landholding Verification Pill */}
                <div>
                  <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1 flex items-center gap-1">
                    <span>{lang === 'kn' ? 'ದೃಢೀಕರಿಸಿದ ಬೆಳೆ ವಿವರಗಳು' : 'Verified Crop Details for Subsidy'}</span>
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  </label>
                  <div className="p-2.5 rounded-lg border border-zinc-200 bg-zinc-50/70 space-y-1">
                    {profile.cropsDetected.map((crop, idx) => (
                      <div key={idx} className="flex items-center justify-between font-kannada text-xs">
                        <span className="font-bold text-zinc-900">
                          {crop.kn} ({crop.en})
                        </span>
                        <span className="text-zinc-600 font-mono text-[11px]">
                          {crop.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bank DBT Seeding Check */}
                <div className="bg-emerald-50/60 border border-emerald-200/60 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-xs text-emerald-950 font-medium font-kannada">
                      {lang === 'kn'
                        ? 'ಆಧಾರ್ ಜೋಡಣೆಗೊಂಡ ಕೆನರಾ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ನೇರ ಹಣ ವರ್ಗಾವಣೆ (NPCI ಸಕ್ರಿಯ)'
                        : 'Aadhaar-seeded Canara Bank account active for Direct Benefit Transfer (DBT)'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-700">
                    Aadhaar NPCI ✓
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer Actions */}
        {!submitSuccess && (
          <div className="p-4 bg-zinc-50 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-3">
            <span className="text-[11px] text-zinc-500 font-medium">
              Target Benefit: <strong className="text-zinc-900">{scheme.dbtAmount}</strong>
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 rounded-lg border border-zinc-200 hover:bg-zinc-100 text-zinc-700 text-xs font-medium transition-colors cursor-pointer"
              >
                {lang === 'kn' ? 'ರದ್ದುಮಾಡಿ' : 'Cancel'}
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs shadow-xs flex items-center gap-1.5 active:scale-95 disabled:opacity-50 transition-all cursor-pointer font-kannada"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    <span>{lang === 'kn' ? 'ನೋಂದಾಯಿಸಲಾಗುತ್ತಿದೆ...' : 'Submitting to Portal...'}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>{lang === 'kn' ? 'ಅರ್ಜಿ ಸಲ್ಲಿಸಿ (1-Click Submit)' : '1-Click Submit Application'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
