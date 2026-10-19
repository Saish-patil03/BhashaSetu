import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Stamp, 
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  FileText,
  MapPin,
  Sparkles
} from 'lucide-react';
import { DigitizedDocument, UILanguage } from '../../types';
import { classifyDocumentDomain } from '../../services/documentClassifierService';

interface DocumentVerificationStripProps {
  doc: DigitizedDocument;
  lang: UILanguage;
}

export const DocumentVerificationStrip: React.FC<DocumentVerificationStripProps> = ({
  doc,
  lang
}) => {
  const [simulateDiscrepancy, setSimulateDiscrepancy] = useState(false);
  const [showMathDetails, setShowMathDetails] = useState(false);

  const isKn = lang === 'kn';
  const fallbackDomainInfo = classifyDocumentDomain(doc.rawKannadaText, doc.title, doc.category);
  const domainInfo = doc.verification ? {
    domain: doc.verification.domain || fallbackDomainInfo.domain,
    badgeTitleEn: doc.verification.badgeTitleEn || fallbackDomainInfo.badgeTitleEn,
    badgeTitleKn: doc.verification.badgeTitleKn || fallbackDomainInfo.badgeTitleKn,
    domainLabelEn: doc.verification.domainLabelEn || fallbackDomainInfo.domainLabelEn,
    domainLabelKn: doc.verification.domainLabelKn || fallbackDomainInfo.domainLabelKn,
    terminologyBadgeEn: doc.verification.terminologyBadgeEn || fallbackDomainInfo.terminologyBadgeEn,
    terminologyBadgeKn: doc.verification.terminologyBadgeKn || fallbackDomainInfo.terminologyBadgeKn,
    stampBadgeEn: doc.verification.stampBadgeEn || fallbackDomainInfo.stampBadgeEn,
    stampBadgeKn: doc.verification.stampBadgeKn || fallbackDomainInfo.stampBadgeKn,
    signatureBadgeEn: doc.verification.signatureBadgeEn || fallbackDomainInfo.signatureBadgeEn,
    signatureBadgeKn: doc.verification.signatureBadgeKn || fallbackDomainInfo.signatureBadgeKn,
    auditDetailsEn: doc.verification.auditDetailsEn || fallbackDomainInfo.auditDetailsEn,
    auditDetailsKn: doc.verification.auditDetailsKn || fallbackDomainInfo.auditDetailsKn,
    discrepancyAlertEn: doc.verification.discrepancyAlertEn || fallbackDomainInfo.discrepancyAlertEn,
    discrepancyAlertKn: doc.verification.discrepancyAlertKn || fallbackDomainInfo.discrepancyAlertKn,
    verifiedAmount: doc.verification.verifiedAmount || fallbackDomainInfo.verifiedAmount,
    hasOfficialSeal: doc.verification.hasOfficialSeal ?? fallbackDomainInfo.hasOfficialSeal,
    hasOfficialSignature: doc.verification.hasOfficialSignature ?? fallbackDomainInfo.hasOfficialSignature,
    documentTypeKn: fallbackDomainInfo.documentTypeKn,
    documentTypeEn: fallbackDomainInfo.documentTypeEn,
    locationAuthorityKn: fallbackDomainInfo.locationAuthorityKn,
    locationAuthorityEn: fallbackDomainInfo.locationAuthorityEn,
    keyDetailsKn: fallbackDomainInfo.keyDetailsKn,
    keyDetailsEn: fallbackDomainInfo.keyDetailsEn
  } : fallbackDomainInfo;

  const locAuthText = isKn ? domainInfo.locationAuthorityKn : domainInfo.locationAuthorityEn;
  const keyDetailsText = isKn ? domainInfo.keyDetailsKn : domainInfo.keyDetailsEn;

  return (
    <div className="bg-zinc-50/70 border border-zinc-200/80 rounded-xl p-2.5 sm:p-3 text-xs space-y-2 animate-fadeIn shadow-2xs">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Dynamic Context-Aware Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {/* 1. Dynamic Document Type Badge */}
          <div className="relative">
            {!simulateDiscrepancy ? (
              <button
                type="button"
                onClick={() => setShowMathDetails(!showMathDetails)}
                className="bg-emerald-50/80 text-emerald-800 border border-emerald-200/60 rounded-lg px-2.5 py-1 font-medium flex items-center gap-1.5 hover:bg-emerald-100/70 transition-colors cursor-pointer text-left shadow-2xs"
                title="Click to view domain verification & semantic audit breakdown"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-semibold">
                  ✓ {isKn ? domainInfo.documentTypeKn : domainInfo.documentTypeEn}
                </span>
                <ChevronRight className={`w-3 h-3 text-emerald-600 transition-transform ${showMathDetails ? 'rotate-90' : ''}`} />
              </button>
            ) : (
              <div className="bg-rose-50 border border-rose-300 rounded-lg px-2.5 py-1 text-rose-900 font-semibold flex items-center gap-1.5 animate-pulse shadow-2xs">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>
                  {isKn ? domainInfo.discrepancyAlertKn : domainInfo.discrepancyAlertEn}
                </span>
              </div>
            )}
          </div>

          {/* 2. Dynamic Location / Issuing Authority Badge (Only displayed if extracted) */}
          {locAuthText && (
            <div className="bg-zinc-100/80 text-zinc-800 border border-zinc-200/80 rounded-lg px-2.5 py-1 font-medium flex items-center gap-1.5 shadow-2xs">
              <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span>{locAuthText}</span>
            </div>
          )}

          {/* 3. Dynamic Key Details Badge (Date, Amount, Land Area, or Docket No) */}
          {keyDetailsText && (
            <div className="bg-zinc-100/80 text-zinc-800 border border-zinc-200/80 rounded-lg px-2.5 py-1 font-medium flex items-center gap-1.5 shadow-2xs font-mono text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{keyDetailsText}</span>
            </div>
          )}

          {/* 4. Official Seal Badge (Only displayed if official stamp is detected) */}
          {domainInfo.hasOfficialSeal && (
            <div className="bg-emerald-50/70 text-emerald-800 border border-emerald-200/60 rounded-lg px-2.5 py-1 font-medium flex items-center gap-1.5 shadow-2xs">
              <Stamp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>✓ {isKn ? domainInfo.stampBadgeKn : domainInfo.stampBadgeEn}</span>
            </div>
          )}

          {/* 5. Official Signature Badge (Only displayed if signature is detected) */}
          {domainInfo.hasOfficialSignature && (
            <div className="bg-emerald-50/70 text-emerald-800 border border-emerald-200/60 rounded-lg px-2.5 py-1 font-medium flex items-center gap-1.5 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>✓ {isKn ? domainInfo.signatureBadgeKn : domainInfo.signatureBadgeEn}</span>
            </div>
          )}
        </div>

        {/* Right: Discrepancy Simulator */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setSimulateDiscrepancy(!simulateDiscrepancy);
              if (!simulateDiscrepancy) setShowMathDetails(false);
            }}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono border transition-all cursor-pointer shadow-2xs ${
              simulateDiscrepancy
                ? 'bg-rose-100 text-rose-900 border-rose-300 font-bold'
                : 'bg-white hover:bg-zinc-100 text-zinc-700 border-zinc-200 font-medium'
            }`}
            title="Demonstrate AI fraud detection & discrepancy alert"
          >
            {simulateDiscrepancy ? (
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3 h-3 text-rose-600" />
                {isKn ? 'ಮರುಹೊಂದಿಸಿ (Reset)' : 'Reset Audit'}
              </span>
            ) : (
              isKn ? 'ವ್ಯತ್ಯಾಸ ಡೆಮೊ (Simulate Discrepancy)' : 'Simulate Discrepancy'
            )}
          </button>
        </div>
      </div>

      {/* Expanded Verification Breakdown */}
      {showMathDetails && !simulateDiscrepancy && (
        <div className="bg-white border border-emerald-200/80 rounded-lg p-2.5 text-zinc-700 font-mono text-[11px] leading-relaxed shadow-2xs space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-800 font-bold font-sans">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {isKn
                ? 'ಪರಿಶೀಲನಾ ಸೂತ್ರ & ದೃಢೀಕರಣ ವಿವರ (Domain Verification Breakdown):'
                : 'Domain Verification & Logic Breakdown:'}
            </span>
          </div>
          <p className="text-zinc-600 font-sans">
            {isKn ? domainInfo.auditDetailsKn : domainInfo.auditDetailsEn}
          </p>
        </div>
      )}
    </div>
  );
};
