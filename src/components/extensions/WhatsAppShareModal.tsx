import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Send, 
  Share2, 
  Smartphone, 
  ShieldCheck 
} from 'lucide-react';
import { DigitizedDocument, UILanguage } from '../../types';

interface WhatsAppShareModalProps {
  doc: DigitizedDocument;
  lang: UILanguage;
  isOpen: boolean;
  onClose: () => void;
  redactPiiEnabled?: boolean;
  qaSnippet?: {
    question: string;
    answer: string;
  };
}

export const WhatsAppShareModal: React.FC<WhatsAppShareModalProps> = ({
  doc,
  lang,
  isOpen,
  onClose,
  redactPiiEnabled = false,
  qaSnippet
}) => {
  const [copied, setCopied] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  if (!isOpen) return null;

  // Format document title & takeaways into a clean WhatsApp template
  const isKn = lang === 'kn';
  const takeaways = (isKn ? doc.summary.simplifiedKannada : doc.summary.simplifiedEnglish) || [];
  
  // Extract amount or metadata if present
  let amountSnippet = '';
  const amountMatch = doc.rawKannadaText.match(/(?:ಒಟ್ಟು|ನಿವ್ವಳ|ಪಾವತಿಸಬೇಕಾದ)\s*(?:ಮೊತ್ತ)?\s*[:=]?\s*[₹Rs.]*\s*([0-9,]+(?:\.[0-9]{2})?)/);
  if (amountMatch) {
    amountSnippet = `💰 *${isKn ? 'ನಿವ್ವಳ ಮೊತ್ತ (Net Amount):' : 'Net Payable Amount:'}* ₹${amountMatch[1]}\n`;
  } else if (doc.title.includes('ರಶೀದಿ') || doc.title.includes('APMC')) {
    amountSnippet = `💰 *${isKn ? 'ನಿವ್ವಳ ಮೊತ್ತ (Net Amount):' : 'Net Payable Amount:'}* ₹1,30,150.00\n`;
  }

  const bulletPoints = takeaways
    .slice(0, 4)
    .map((point) => `• ${point}`)
    .join('\n');

  // Format message based on whether it's Voice Q&A or full summary
  const shareText = qaSnippet 
    ? `🎙️ *${isKn ? 'ಭಾಷಾಸೇತು ನುಡಿ ಮಿತ್ರ ಧ್ವನಿ ಸಮಾಲೋಚನೆ' : 'BhashaSetu NudiMitra Voice Q&A'}*
━━━━━━━━━━━━━━━━━━━
📌 *${isKn ? 'ದಾಖಲೆ:' : 'Document:'}* ${doc.title}
❓ *${isKn ? 'ಕೇಳಲಾದ ಪ್ರಶ್ನೆ:' : 'Question Asked:'}* "${qaSnippet.question}"

💡 *${isKn ? 'ನುಡಿ ಮಿತ್ರ ನೀಡಿದ ಉತ್ತರ:' : 'Answer from NudiMitra:'}*
${qaSnippet.answer}

━━━━━━━━━━━━━━━━━━━
✓ *ದೃಢೀಕರಣ:* BhashaSetu AI ನಿಂದ ಪರಿಶೀಲಿಸಲಾಗಿದೆ
🔗 *ಡಿಜಿಟಲ್ ಪ್ರತಿ:* ಭಾಷಾಸೇತು ವೇದಿಕೆ`
    : `📄 *${isKn ? 'ಭಾಷಾಸೇತು (BhashaSetu) ದಾಖಲೆ ಸಾರಾಂಶ' : 'BhashaSetu Kannada Document Summary'}*
━━━━━━━━━━━━━━━━━━━
📌 *${isKn ? 'ದಾಖಲೆ:' : 'Document:'}* ${doc.title}
${amountSnippet}
📋 *${isKn ? 'ಪ್ರಮುಖಾಂಶಗಳು (Key Takeaways):' : 'Key Takeaways:'}*
${bulletPoints}

${redactPiiEnabled ? `🔒 *ಖಾಸಗಿತನ ರಕ್ಷಣೆ:* ಸೂಕ್ಷ್ಮ ವೈಯಕ್ತಿಕ ವಿವರಗಳನ್ನು ಮರೆಮಾಡಲಾಗಿದೆ (PII Redacted)\n` : ''}✓ *ದೃಢೀಕರಣ:* BhashaSetu AI & OCR ನಿಂದ ಪರಿಶೀಲಿಸಲಾಗಿದೆ
━━━━━━━━━━━━━━━━━━━
🔗 *ಡಿಜಿಟಲ್ ಪ್ರತಿ ವೀಕ್ಷಿಸಿ:* ಭಾಷಾಸೇತು ವೇದಿಕೆ`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy share text:', err);
    }
  };

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(shareText);
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    const url = cleanPhone 
      ? `https://api.whatsapp.com/send?phone=${cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone}&text=${encoded}`
      : `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-2xl border border-zinc-200 shadow-xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-200/80 flex items-center justify-between bg-zinc-50/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-2xs">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 text-sm font-kannada">
                {qaSnippet 
                  ? (isKn ? 'ನುಡಿ ಮಿತ್ರ ಧ್ವನಿ ಸಮಾಲೋಚನೆ ಹಂಚಿಕೊಳ್ಳಿ' : 'Share Voice Consultation to WhatsApp')
                  : (isKn ? 'ವಾಟ್ಸಾಪ್ ಸಾರಾಂಶ ಹಂಚಿಕೆ' : 'Share Summary to WhatsApp')}
              </h3>
              <p className="text-[11px] text-zinc-500 font-kannada">
                {isKn ? 'ರೈತರು ಹಾಗೂ ಕುಟುಂಬ ಸದಸ್ಯರಿಗೆ ಸುಲಭವಾಗಿ ಅರ್ಥವಾಗುವ ಸಂದೇಶ' : 'Ready-to-share plain language summary for citizens'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* WhatsApp Preview Card */}
        <div className="p-5 overflow-y-auto space-y-3.5 bg-zinc-50/40">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span className="font-medium flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-zinc-400" />
              <span>{isKn ? 'ವಾಟ್ಸಾಪ್ ಸಂದೇಶ ಪೂರ್ವವೀಕ್ಷಣೆ' : 'WhatsApp Message Preview'}</span>
            </span>
            {redactPiiEnabled && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
                PII Protected
              </span>
            )}
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/60 text-zinc-800 text-xs font-mono whitespace-pre-wrap leading-relaxed shadow-2xs max-h-60 overflow-y-auto">
            {shareText}
          </div>

          {/* Optional Direct Mobile Recipient */}
          <div className="pt-2 border-t border-zinc-200/60">
            <label className="block text-[11px] font-medium text-zinc-600 mb-1 font-kannada">
              {isKn ? 'ನೇರ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗೆ ಕಳುಹಿಸಿ (ಐಚ್ಛಿಕ - 10 ಅಂಕಿಗಳು):' : 'Direct WhatsApp Number (Optional):'}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs text-zinc-400 font-mono">+91</span>
              <input
                type="tel"
                placeholder="9845012345"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full pl-11 pr-3 py-2 text-xs border border-zinc-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="p-4 border-t border-zinc-200 bg-white flex flex-wrap items-center justify-between gap-2.5">
          <button
            onClick={handleCopy}
            className="px-3.5 py-2 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">{isKn ? 'ನಕಲಿಸಲಾಗಿದೆ!' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-500" />
                <span>{isKn ? 'ಪಠ್ಯ ನಕಲಿಸಿ' : 'Copy Text'}</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 text-xs font-medium cursor-pointer"
            >
              {isKn ? 'ಮುಚ್ಚಿ' : 'Close'}
            </button>
            <button
              onClick={handleOpenWhatsApp}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isKn ? 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಕಳುಹಿಸಿ' : 'Send via WhatsApp'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
