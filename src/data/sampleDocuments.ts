import { SampleDocPreset } from '../types';

// Helper to encode SVG string to Data URL
function svgToDataUrl(svgString: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString.trim())}`;
}

// 1. Government Public Notice SVG (Notice on aged official paper with emblem and seal)
const govtNoticeSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1050" width="800" height="1050">
  <!-- Paper Background with subtle grain -->
  <rect width="800" height="1050" fill="#FCFAF2"/>
  <rect x="25" y="25" width="750" height="1000" fill="none" stroke="#64748B" stroke-width="1.5" stroke-dasharray="8 4"/>
  <rect x="35" y="35" width="730" height="980" fill="none" stroke="#94A3B8" stroke-width="0.75"/>

  <!-- Official Emblem & Header -->
  <circle cx="400" cy="85" r="32" fill="#FEF08A" stroke="#B45309" stroke-width="2"/>
  <text x="400" y="80" font-family="'Noto Sans Kannada', sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#991B1B">ಕರ್ನಾಟಕ ಸರ್ಕಾರ</text>
  <text x="400" y="98" font-family="'Noto Sans Kannada', sans-serif" font-size="11" text-anchor="middle" fill="#1E293B">ಕಂದಾಯ ಇಲಾಖೆ</text>

  <text x="400" y="145" font-family="'Noto Sans Kannada', sans-serif" font-size="20" font-weight="bold" text-anchor="middle" fill="#1E293B">ಗ್ರಾಮ ಪಂಚಾಯತಿ ಕಾರ್ಯಾಲಯ, ಹಳೇಬೀಡು</text>
  <text x="400" y="170" font-family="'Noto Sans Kannada', sans-serif" font-size="13" text-anchor="middle" fill="#475569">ಬೇಲೂರು ತಾಲ್ಲೂಕು, ಹಾಸನ ಜಿಲ್ಲೆ - ೫೭೩೧೧೫</text>

  <line x1="80" y1="185" x2="720" y2="185" stroke="#1E293B" stroke-width="2"/>
  <line x1="80" y1="189" x2="720" y2="189" stroke="#94A3B8" stroke-width="1"/>

  <!-- Reference & Date -->
  <text x="80" y="220" font-family="'Noto Sans Kannada', sans-serif" font-size="13" font-weight="600" fill="#1E293B">ಸಂಖ್ಯೆ: ಗ್ರಾಪಂ/ಬೆವಿ/೨೦೨೬-೨೭/೧೪೮</text>
  <text x="720" y="220" font-family="'Noto Sans Kannada', sans-serif" font-size="13" font-weight="600" text-anchor="end" fill="#1E293B">ದಿನಾಂಕ: ೧೨-೧೦-೨೦೨೬</text>

  <!-- Title -->
  <rect x="180" y="245" width="440" height="34" rx="4" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1"/>
  <text x="400" y="268" font-family="'Noto Sans Kannada', sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="#92400E">ಸಾರ್ವಜನಿಕ ಪ್ರಕಟಣೆ: ಮುಂಗಾರು ಬೆಳೆ ನಷ್ಟ ಪರಿಹಾರ</text>

  <!-- Notice Body -->
  <text x="80" y="320" font-family="'Noto Sans Kannada', sans-serif" font-size="14" fill="#334155" line-height="1.6">
    <tspan x="80" dy="0">ಹಳೇಬೀಡು ಗ್ರಾಮ ಪಂಚಾಯತಿ ವ್ಯಾಪ್ತಿಯ ಸಮಸ್ತ ರೈತ ಬಾಂಧವರಲ್ಲಿ ವಿನಂತಿ ಮಾಡುವುದೇನೆಂದರೆ:</tspan>
    <tspan x="80" dy="28">ಪ್ರಸಕ್ತ ಸಾಲಿನ ಮುಂಗಾರು ಹಂಗಾಮಿನಲ್ಲಿ ತೀವ್ರ ಮಳೆಯ ಕೊರತೆಯಿಂದ ಹಾನಿಗೊಳಗಾದ ಬೆಳೆಗಳಿಗೆ ಕರ್ನಾಟಕ ಸರ್ಕಾರದ</tspan>
    <tspan x="80" dy="26">ಬರ ಪರಿಹಾರ ನಿಯಮಾವಳಿ ಅನ್ವಯ ಹೆಕ್ಟೇರ್‌ಗೆ ₹೧೫,೦೦೦/- (ಹದಿನೈದು ಸಾವಿರ ರೂಪಾಯಿ) ವರೆಗೆ ಪರಿಹಾರ ಧನ</tspan>
    <tspan x="80" dy="26">ಬಿಡುಗಡೆ ಮಾಡಲು ಆದೇಶಿಸಲಾಗಿದೆ. ಅರ್ಹ ರೈತರು ನಿಗದಿತ ನಮೂನೆಯಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಕೋರಲಾಗಿದೆ.</tspan>
  </text>

  <!-- Criteria Box -->
  <rect x="80" y="440" width="640" height="180" rx="6" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1"/>
  <text x="100" y="470" font-family="'Noto Sans Kannada', sans-serif" font-size="14" font-weight="bold" fill="#0F172A">ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಅಗತ್ಯ ದಾಖಲೆಗಳು ಹಾಗೂ ಷರತ್ತುಗಳು:</text>
  
  <text x="110" y="505" font-family="'Noto Sans Kannada', sans-serif" font-size="13" fill="#334155">೧. ರೈತರ ಚಾಲ್ತಿ ಸಾಲಿನ ಪಹಣಿ (RTC) ನಕಲು ಪ್ರತಿ ಮತ್ತು ಆಧಾರ್ ಕಾರ್ಡ್.</text>
  <text x="110" y="535" font-family="'Noto Sans Kannada', sans-serif" font-size="13" fill="#334155">೨. ಆಧಾರ್ ಜೋಡಣೆಗೊಂಡ ಬ್ಯಾಂಕ್ ಖಾತೆ ವಿವರ (NPCI ಸಕ್ರಿಯವಾಗಿರಬೇಕು).</text>
  <text x="110" y="565" font-family="'Noto Sans Kannada', sans-serif" font-size="13" fill="#334155">೩. ಕಂದಾಯ ಇಲಾಖೆಯ 'ಫ್ರೂಟ್ಸ್' (FRUITS ID) ತಂತ್ರಾಂಶದಲ್ಲಿ ನೋಂದಾಯಿತ ಸಂಖ್ಯೆ.</text>
  <text x="110" y="595" font-family="'Noto Sans Kannada', sans-serif" font-size="13" font-weight="bold" fill="#B91C1C">೪. ಅರ್ಜಿ ಸಲ್ಲಿಕೆಗೆ ಕೊನೆಯ ದಿನಾಂಕ: ೩೦-೧೧-೨೦೨೬ ಸಂಜೆ ೫:೩೦ ಗಂಟೆವರೆಗೆ.</text>

  <text x="80" y="660" font-family="'Noto Sans Kannada', sans-serif" font-size="13.5" fill="#334155">
    <tspan x="80" dy="0">ಗ್ರಾಮ ಒನ್ ಕೇಂದ್ರದಲ್ಲಿ ಅಥವಾ ಬಾಪೂಜಿ ಸೇವಾ ಕೇಂದ್ರದಲ್ಲಿ ಅರ್ಜಿಗಳನ್ನು ಉಚಿತವಾಗಿ ನೋಂದಾಯಿಸಿಕೊಳ್ಳಬಹುದು.</tspan>
    <tspan x="80" dy="26">ಯಾವುದೇ ಮಧ್ಯವರ್ತಿಗಳಿಗೆ ಹಣ ನೀಡಬಾರದೆಂದು ಈ ಮೂಲಕ ಎಚ್ಚರಿಸಲಾಗಿದೆ.</tspan>
  </text>

  <!-- Official Seal Stamp -->
  <g transform="translate(180, 780) rotate(-8)">
    <circle cx="0" cy="0" r="55" fill="none" stroke="#2563EB" stroke-width="3" stroke-dasharray="6 3"/>
    <circle cx="0" cy="0" r="46" fill="none" stroke="#2563EB" stroke-width="1.5"/>
    <text x="0" y="-20" font-family="'Noto Sans Kannada', sans-serif" font-size="10" font-weight="bold" text-anchor="middle" fill="#2563EB">ಗ್ರಾಮ ಪಂಚಾಯತಿ ಕಾರ್ಯಾಲಯ</text>
    <text x="0" y="5" font-family="'Noto Sans Kannada', sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#2563EB">ಹಾಸನ ಜಿಲ್ಲೆ</text>
    <text x="0" y="26" font-family="'Noto Sans Kannada', sans-serif" font-size="9" text-anchor="middle" fill="#2563EB">ಅಧಿಕೃತ ಮೊಹರು</text>
  </g>

  <!-- Signature Section -->
  <text x="640" y="780" font-family="'Noto Sans Kannada', sans-serif" font-size="13" font-style="italic" text-anchor="middle" fill="#64748B">[ಸಹಿ/Signed]</text>
  <path d="M570,800 Q620,775 660,805 T710,795" fill="none" stroke="#1E293B" stroke-width="2.2"/>
  <text x="640" y="830" font-family="'Noto Sans Kannada', sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#0F172A">ಪಂಚಾಯತಿ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿ (PDO)</text>
  <text x="640" y="852" font-family="'Noto Sans Kannada', sans-serif" font-size="12" text-anchor="middle" fill="#475569">ಗ್ರಾಮ ಪಂಚಾಯತಿ, ಹಳೇಬೀಡು</text>

  <!-- Footer Watermark -->
  <rect x="0" y="1025" width="800" height="25" fill="#E2E8F0"/>
  <text x="400" y="1042" font-family="'Noto Sans Kannada', sans-serif" font-size="11" text-anchor="middle" fill="#64748B">ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಮಹಿತಿ ಹಕ್ಕು ಕಾಯಿದೆ (RTI) ಅಡಿಯಲ್ಲಿ ಪ್ರಕಟಿಸಲಾಗಿದೆ</text>
</svg>
`;

// 2. APMC Agricultural Invoice SVG (Tabular Bill)
const apmcInvoiceSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1050" width="800" height="1050">
  <!-- Bill Paper Background -->
  <rect width="800" height="1050" fill="#FFFDF8"/>
  <rect x="20" y="20" width="760" height="1010" fill="none" stroke="#047857" stroke-width="2"/>
  <rect x="26" y="26" width="748" height="998" fill="none" stroke="#A7F3D0" stroke-width="1"/>

  <!-- APMC Header -->
  <text x="400" y="65" font-family="'Noto Sans Kannada', sans-serif" font-size="22" font-weight="bold" text-anchor="middle" fill="#065F46">ಕೃಷಿ ಉತ್ಪನ್ನ ಮಾರುಕಟ್ಟೆ ಸಮಿತಿ (APMC)</text>
  <text x="400" y="92" font-family="'Noto Sans Kannada', sans-serif" font-size="14" text-anchor="middle" fill="#047857">ಮುಖ್ಯ ಮಾರುಕಟ್ಟೆ ಪ್ರಾಂಗಣ, ಮಂಡ್ಯ - ೫೭೧೪೦೧</text>
  <text x="400" y="114" font-family="'Noto Sans Kannada', sans-serif" font-size="12" text-anchor="middle" fill="#6B7280">ಜಿಎಸ್‌ಟಿ ಸಂಖ್ಯೆ (GSTIN): 29AAAGC1023K1ZM • ಪರವಾನಗಿ ಸಂ: APMC/MDY/4492</text>

  <rect x="300" y="130" width="200" height="26" rx="13" fill="#D1FAE5"/>
  <text x="400" y="148" font-family="'Noto Sans Kannada', sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#065F46">ರೈತರ ಮಾರಾಟ ಪಟ್ಟಿ / ರಶೀದಿ</text>

  <line x1="40" y1="170" x2="760" y2="170" stroke="#047857" stroke-width="1.5"/>

  <!-- Farmer & Transaction Details Grid -->
  <text x="50" y="200" font-family="'Noto Sans Kannada', sans-serif" font-size="13" fill="#374151">ರೈತರ ಹೆಸರು: <tspan font-weight="bold" fill="#111827">ಶ್ರೀ ಮಂಜುನಾಥ್ ಗೌಡ</tspan></text>
  <text x="50" y="225" font-family="'Noto Sans Kannada', sans-serif" font-size="13" fill="#374151">ಗ್ರಾಮ: ಕೆರಗೋಡು, ಮಂಡ್ಯ ತಾಲ್ಲೂಕು</text>
  <text x="50" y="250" font-family="'Noto Sans Kannada', sans-serif" font-size="13" fill="#374151">ರೈತರ ಮೊಬೈಲ್: ೯೮೪೫೦-XXXXX</text>

  <text x="520" y="200" font-family="'Noto Sans Kannada', sans-serif" font-size="13" fill="#374151">ರಶೀದಿ ಸಂಖ್ಯೆ: <tspan font-weight="bold" fill="#B91C1C">MDY-೨೬-೮೯೨</tspan></text>
  <text x="520" y="225" font-family="'Noto Sans Kannada', sans-serif" font-size="13" fill="#374151">ದಿನಾಂಕ: <tspan font-weight="bold">೧೫-೧೦-೨೦೨೬</tspan></text>
  <text x="520" y="250" font-family="'Noto Sans Kannada', sans-serif" font-size="13" fill="#374151">ವರ್ತಕರ ಕೋಡ್: MANDYA-COMM-08</text>

  <!-- Table Header -->
  <rect x="45" y="280" width="710" height="38" fill="#ECFDF5" stroke="#059669" stroke-width="1"/>
  <line x1="95" y1="280" x2="95" y2="580" stroke="#CBD5E1" stroke-width="1"/>
  <line x1="280" y1="280" x2="280" y2="580" stroke="#CBD5E1" stroke-width="1"/>
  <line x1="390" y1="280" x2="390" y2="580" stroke="#CBD5E1" stroke-width="1"/>
  <line x1="510" y1="280" x2="510" y2="580" stroke="#CBD5E1" stroke-width="1"/>
  <line x1="620" y1="280" x2="620" y2="580" stroke="#CBD5E1" stroke-width="1"/>

  <text x="70" y="304" font-family="'Noto Sans Kannada', sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#065F46">ಕ್ರ.ಸಂ</text>
  <text x="187" y="304" font-family="'Noto Sans Kannada', sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#065F46">ಉತ್ಪನ್ನ ವಿವರ</text>
  <text x="335" y="304" font-family="'Noto Sans Kannada', sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#065F46">ಚೀಲಗಳ ಸಂಖ್ಯೆ</text>
  <text x="450" y="304" font-family="'Noto Sans Kannada', sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#065F46">ತೂಕ (ಕ್ವಿಂಟಾಲ್)</text>
  <text x="565" y="304" font-family="'Noto Sans Kannada', sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#065F46">ದರ (ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್)</text>
  <text x="685" y="304" font-family="'Noto Sans Kannada', sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#065F46">ಒಟ್ಟು ಮೊತ್ತ (₹)</text>

  <!-- Row 1 -->
  <line x1="45" y1="360" x2="755" y2="360" stroke="#E2E8F0" stroke-width="1"/>
  <text x="70" y="340" font-family="'Noto Sans Kannada', sans-serif" font-size="13" text-anchor="middle" fill="#1F2937">೧</text>
  <text x="110" y="340" font-family="'Noto Sans Kannada', sans-serif" font-size="13" font-weight="600" fill="#111827">ಭತ್ತ (ಸೋನಾ ಮಸೂರಿ - ಗ್ರೇಡ್ ಎ)</text>
  <text x="335" y="340" font-family="'Noto Sans Kannada', sans-serif" font-size="13" text-anchor="middle" fill="#1F2937">೪೦ ಚೀಲ</text>
  <text x="450" y="340" font-family="'Noto Sans Kannada', sans-serif" font-size="13" text-anchor="middle" fill="#1F2937">೩೦.೦೦ ಕ್ವಿಂ</text>
  <text x="565" y="340" font-family="'Noto Sans Kannada', sans-serif" font-size="13" text-anchor="middle" fill="#1F2937">₹ ೨,೪೫೦</text>
  <text x="735" y="340" font-family="'Noto Sans Kannada', sans-serif" font-size="13" font-weight="bold" text-anchor="end" fill="#111827">₹ ೭೩,೫೦೦.೦೦</text>

  <!-- Row 2 -->
  <line x1="45" y1="430" x2="755" y2="430" stroke="#E2E8F0" stroke-width="1"/>
  <text x="70" y="405" font-family="'Noto Sans Kannada', sans-serif" font-size="13" text-anchor="middle" fill="#1F2937">೨</text>
  <text x="110" y="405" font-family="'Noto Sans Kannada', sans-serif" font-size="13" font-weight="600" fill="#111827">ರಾಗಿ (ಸ್ಥಳೀಯ ತಳಿ - ಶುದ್ಧೀಕರಿಸಿದ)</text>
  <text x="335" y="405" font-family="'Noto Sans Kannada', sans-serif" font-size="13" text-anchor="middle" fill="#1F2937">೨೫ ಚೀಲ</text>
  <text x="450" y="405" font-family="'Noto Sans Kannada', sans-serif" font-size="13" text-anchor="middle" fill="#1F2937">೧೮.೦೦ ಕ್ವಿಂ</text>
  <text x="565" y="405" font-family="'Noto Sans Kannada', sans-serif" font-size="13" text-anchor="middle" fill="#1F2937">₹ ೩,೨೦೦</text>
  <text x="735" y="405" font-family="'Noto Sans Kannada', sans-serif" font-size="13" font-weight="bold" text-anchor="end" fill="#111827">₹ ೫೭,೬೦೦.೦೦</text>

  <!-- Row 3: Subtotal & Deductions -->
  <line x1="45" y1="490" x2="755" y2="490" stroke="#E2E8F0" stroke-width="1"/>
  <text x="450" y="465" font-family="'Noto Sans Kannada', sans-serif" font-size="13" font-weight="bold" text-anchor="end" fill="#374151">ಒಟ್ಟು ಒಟ್ಟು ಉತ್ಪನ್ನ ಮೌಲ್ಯ:</text>
  <text x="735" y="465" font-family="'Noto Sans Kannada', sans-serif" font-size="13" font-weight="bold" text-anchor="end" fill="#111827">₹ ೧,೩೧,೧೦೦.೦೦</text>

  <line x1="45" y1="535" x2="755" y2="535" stroke="#E2E8F0" stroke-width="1"/>
  <text x="450" y="515" font-family="'Noto Sans Kannada', sans-serif" font-size="12" text-anchor="end" fill="#DC2626">ಕಳೆತ: ಮಾರುಕಟ್ಟೆ ಹಮಾಲಿ ಮತ್ತು ತೂಕ ಶುಲ್ಕ:</text>
  <text x="735" y="515" font-family="'Noto Sans Kannada', sans-serif" font-size="12" text-anchor="end" fill="#DC2626">(-) ₹ ೯೫೦.೦೦</text>

  <!-- Final Net Total Box -->
  <rect x="45" y="540" width="710" height="50" fill="#DCFCE7" stroke="#16A34A" stroke-width="1.5"/>
  <text x="65" y="572" font-family="'Noto Sans Kannada', sans-serif" font-size="15" font-weight="bold" fill="#166534">ರೈತರಿಗೆ ನೀಡಬೇಕಾದ ನಿವ್ವಳ ಸಂದಾಯ ಮೊತ್ತ (Net Payable):</text>
  <text x="735" y="573" font-family="'Noto Sans Kannada', sans-serif" font-size="18" font-weight="bold" text-anchor="end" fill="#14532D">₹ ೧,೩೦,೧೫೦.೦೦</text>

  <!-- In Words -->
  <text x="50" y="625" font-family="'Noto Sans Kannada', sans-serif" font-size="13" font-weight="600" fill="#374151">ಅಕ್ಷರಗಳಲ್ಲಿ: ಒಂದು ಲಕ್ಷದ ಮೂವತ್ತು ಸಾವಿರದ ಒಂದು ನೂರ ಐವತ್ತು ರೂಪಾಯಿಗಳು ಮಾತ್ರ.</text>
  <text x="50" y="650" font-family="'Noto Sans Kannada', sans-serif" font-size="12" fill="#6B7280">ಪಾವತಿ ವಿಧಾನ: RTGS/NEFT ಮೂಲಕ ನೇರವಾಗಿ ರೈತರ ಕೆನರಾ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮಾ ಮಾಡಲಾಗುತ್ತದೆ.</text>

  <!-- Signatures & Stamp -->
  <g transform="translate(180, 760) rotate(5)">
    <rect x="-80" y="-30" width="160" height="60" rx="8" fill="none" stroke="#059669" stroke-width="2"/>
    <text x="0" y="-5" font-family="'Noto Sans Kannada', sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#059669">APMC ಮಂಡ್ಯ</text>
    <text x="0" y="16" font-family="'Noto Sans Kannada', sans-serif" font-size="10" text-anchor="middle" fill="#059669">ಪರಿಶೀಲಿಸಿ ಅಂಗೀಕರಿಸಿದೆ</text>
  </g>

  <text x="620" y="770" font-family="'Noto Sans Kannada', sans-serif" font-size="13" text-anchor="middle" fill="#6B7280">[ಅಧಿಕೃತ ಸಹಿ]</text>
  <path d="M550,795 Q600,760 650,800 T700,780" fill="none" stroke="#065F46" stroke-width="2.2"/>
  <text x="620" y="825" font-family="'Noto Sans Kannada', sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#111827">ಮುಖ್ಯ ಕಾರ್ಯದರ್ಶಿ / ತೂಕಗಾರ</text>
  <text x="620" y="845" font-family="'Noto Sans Kannada', sans-serif" font-size="11" text-anchor="middle" fill="#6B7280">ಕೃಷಿ ಉತ್ಪನ್ನ ಮಾರುಕಟ್ಟೆ ಸಮಿತಿ, ಮಂಡ್ಯ</text>
</svg>
`;

// 3. Traditional Handwritten Kannada Note SVG (cursive script with notebook lines)
const handwrittenNoteSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1050" width="800" height="1050">
  <!-- Ruled Notebook Page Background -->
  <rect width="800" height="1050" fill="#FFFBEB"/>
  
  <!-- Left Red Margin -->
  <line x1="110" y1="0" x2="110" y2="1050" stroke="#F87171" stroke-width="1.8"/>
  <line x1="114" y1="0" x2="114" y2="1050" stroke="#FCA5A5" stroke-width="0.8"/>

  <!-- Horizontal Blue Notebook Lines -->
  ${Array.from({ length: 22 }, (_, i) => {
    const y = 140 + i * 38;
    return `<line x1="0" y1="${y}" x2="800" y2="${y}" stroke="#93C5FD" stroke-width="0.9" stroke-opacity="0.7"/>`;
  }).join('\n')}

  <!-- Top Inscription -->
  <text x="400" y="70" font-family="'Noto Sans Kannada', serif" font-size="18" font-style="italic" font-weight="bold" text-anchor="middle" fill="#1E3A8A">॥ ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ ॥</text>
  <text x="700" y="105" font-family="'Noto Sans Kannada', serif" font-size="14" font-style="italic" text-anchor="end" fill="#1E293B">ದಿನಾಂಕ: ೧೦-೦೮-೨೦೨೬</text>
  <text x="130" y="105" font-family="'Noto Sans Kannada', serif" font-size="14" font-style="italic" fill="#1E293B">ಸ್ಥಳ: ತೀರ್ಥಹಳ್ಳಿ</text>

  <!-- Handwritten Heading -->
  <text x="400" y="132" font-family="'Noto Sans Kannada', cursive, sans-serif" font-size="17" font-weight="bold" text-anchor="middle" fill="#0F172A">ಕೌಟುಂಬಿಕ ಆಸ್ತಿ ಮತ್ತು ಬಾವಿ ನೀರಿನ ಹಕ್ಕು ಒಪ್ಪಂದ ಪತ್ರ</text>

  <!-- Handwritten Cursive Content (Ink effect) -->
  <g fill="#0F172A" font-family="'Noto Sans Kannada', cursive, sans-serif" font-size="15" font-style="italic" letter-spacing="0.5">
    <text x="130" y="170">ನಮ್ಮ ಹಿರಿಯರಾದ ದಿವಂಗತ ಶ್ರೀ ವೆಂಕಟೇಶ ಹೆಬ್ಬಾರ್ ಅವರ ಮಕ್ಕಳಾದ ರಾಮಕೃಷ್ಣ ಹೆಬ್ಬಾರ್</text>
    <text x="130" y="208">ಮತ್ತು ಸುಬ್ರಹ್ಮಣ್ಯ ಹೆಬ್ಬಾರ್ ನಾವುಗಳು ಪರಸ್ಪರ ಪ್ರೀತಿ ವಿಶ್ವಾಸದಿಂದ ಮಾಡಿಕೊಂಡ ಒಪ್ಪಂದ:</text>
    
    <text x="130" y="246">೧. ಸರ್ವೆ ನಂ [೪೨/ಅ] ರಲ್ಲಿರುವ ೩ ಎಕರೆ ೧೨ ಗುಂಟೆ ಅಡಿಕೆ ತೋಟವನ್ನು ಸಮನಾಗಿ ಹಂಚಿಕೊಳ್ಳಲಾಗಿದೆ.</text>
    <text x="130" y="284">ಪೂರ್ವ ದಿಕ್ಕಿನ ೧ ಎಕರೆ ೨೬ ಗುಂಟೆ ರಾಮಕೃಷ್ಣನಿಗೂ, ಪಶ್ಚಿಮ ದಿಕ್ಕಿನ ಭಾಗ ಸುಬ್ರಹ್ಮಣ್ಯನಿಗೂ ಸಲ್ಲತಕ್ಕದ್ದು.</text>
    
    <text x="130" y="322">೨. ತೋಟದ ಮಧ್ಯದಲ್ಲಿರುವ [ಬೋರ್‌ವೆಲ್ / ಕಪಿಲೆ ಬಾವಿಯ] ನೀರನ್ನು ವಾರದಲ್ಲಿ ಮೂರು ದಿನ</text>
    <text x="130" y="360">(ಸೋಮವಾರ, ಬುಧವಾರ, ಶುಕ್ರವಾರ) ರಾಮಕೃಷ್ಣನ ತೋಟಕ್ಕೆ, ಹಾಗೂ ಉಳಿದ ಮೂರು ದಿನ ಸುಬ್ರಹ್ಮಣ್ಯನ</text>
    <text x="130" y="398">ಭಾಗಕ್ಕೆ ಹಾಯಿಸಲು ಒಪ್ಪಿರುತ್ತೇವೆ. ಭಾನುವಾರದಂದು ಮೋಟರ್ ರಿಪೇರಿ ಮತ್ತು ಶುಚಿಗೊಳಿಸಲು ಮೀಸಲು.</text>
    
    <text x="130" y="436">೩. ವಿದ್ಯುತ್ ಬಿಲ್ ಹಾಗೂ ಮೋಟರ್ ದುರಸ್ತಿ ವೆಚ್ಚವನ್ನು ಇಬ್ಬರೂ [ಅರ್ಧರ್ಧ / ಸಮನಾಗಿ] ಭರಿಸತಕ್ಕದ್ದು.</text>
    <text x="130" y="474">ಯಾವುದೇ ಕಾರಣಕ್ಕೂ ಮೂರನೆಯ ವ್ಯಕ್ತಿಗಳಿಗೆ ನೀರಿನ ಹಕ್ಕನ್ನು ಪರಭಾರೆ ಮಾಡುವಂತಿಲ್ಲ.</text>

    <text x="130" y="512">೪. ಗ್ರಾಮದ ಮುಖ್ಯ ರಸ್ತೆಗೆ ಹೋಗುವ ದಾರಿಯನ್ನು ಯಾರೊಬ್ಬರೂ [ತಡೆಗಟ್ಟುವಂತಿಲ್ಲ].</text>
    <text x="130" y="550">ಈ ಒಪ್ಪಂದವು ನಮ್ಮಿಬ್ಬರ ಹಾಗೂ ನಮ್ಮ ವಾರಸುದಾರರ ಪೂರ್ಣ ಸಮ್ಮತಿಯಿಂದ ಬರೆಯಲ್ಪಟ್ಟಿದೆ.</text>
  </g>

  <!-- Ink Smudge & Natural artifacts -->
  <ellipse cx="680" cy="310" rx="6" ry="4" fill="#0F172A" fill-opacity="0.15"/>
  <ellipse cx="210" cy="465" rx="5" ry="3" fill="#0F172A" fill-opacity="0.12"/>

  <!-- Handwritten Signatures and Witness Box -->
  <text x="160" y="660" font-family="'Noto Sans Kannada', cursive, sans-serif" font-size="14" font-weight="bold" fill="#1E293B">ಒಪ್ಪಿದವರ ಸಹಿ: (೧)</text>
  <path d="M220,680 C240,650 270,700 300,670 T330,690" fill="none" stroke="#0F172A" stroke-width="2.5"/>
  <text x="260" y="715" font-family="'Noto Sans Kannada', sans-serif" font-size="12" fill="#475569">ರಾಮಕೃಷ್ಣ ಹೆಬ್ಬಾರ್</text>

  <text x="500" y="660" font-family="'Noto Sans Kannada', cursive, sans-serif" font-size="14" font-weight="bold" fill="#1E293B">ಒಪ್ಪಿದವರ ಸಹಿ: (೨)</text>
  <path d="M560,680 C580,645 610,695 640,665 T680,685" fill="none" stroke="#0F172A" stroke-width="2.5"/>
  <text x="610" y="715" font-family="'Noto Sans Kannada', sans-serif" font-size="12" fill="#475569">ಸುಬ್ರಹ್ಮಣ್ಯ ಹೆಬ್ಬಾರ್</text>

  <rect x="130" y="750" width="600" height="150" rx="4" fill="#F1F5F9" stroke="#94A3B8" stroke-width="1"/>
  <text x="150" y="780" font-family="'Noto Sans Kannada', sans-serif" font-size="13" font-weight="bold" fill="#0F172A">ಪಂಚಾಯಿತಿದಾರರ / ಸಾಕ್ಷಿದಾರರ ರುಜುಗಳು:</text>
  <text x="160" y="815" font-family="'Noto Sans Kannada', cursive, sans-serif" font-size="13" fill="#334155">೧. ಶ್ರೀ ಕೃಷ್ಣಮೂರ್ತಿ ಭಟ್, ತೀರ್ಥಹಳ್ಳಿ (ಸಹಿ)</text>
  <text x="160" y="850" font-family="'Noto Sans Kannada', cursive, sans-serif" font-size="13" fill="#334155">೨. ಶ್ರೀ ಮಹಾಬಲೇಶ್ವರ ರಾವ್, ಕೆಳದಿ (ಸಹಿ)</text>
  <text x="160" y="880" font-family="'Noto Sans Kannada', sans-serif" font-size="11" fill="#64748B">[ಗ್ರಾಮದ ಹಿರಿಯರ ಸಮ್ಮುಖದಲ್ಲಿ ಬರೆಯಲಾದ ಅಧಿಕೃತ ಕೌಟುಂಬಿಕ ಒಡಂಬಡಿಕೆ]</text>
</svg>
`;

export const sampleDocuments: SampleDocPreset[] = [
  {
    id: 'sample-govt-notice',
    category: 'government_notice',
    titleEn: 'Karnataka Gram Panchayat Public Notice',
    titleKn: 'ಕರ್ನಾಟಕ ಗ್ರಾಮ ಪಂಚಾಯತಿ ಸಾರ್ವಜನಿಕ ಪ್ರಕಟಣೆ',
    descriptionEn: 'Halebidu Gram Panchayat circular on Kharif crop loss relief subsidy of ₹15,000/hectare.',
    descriptionKn: 'ಹಳೇಬೀಡು ಗ್ರಾಮ ಪಂಚಾಯತಿಯ ಮುಂಗಾರು ಬೆಳೆ ಹಾನಿ ಪರಿಹಾರ ಧನ ₹೧೫,೦೦೦/- ಸುತ್ತೋಲೆ.',
    imageSvgDataUrl: svgToDataUrl(govtNoticeSvg),
    rawKannadaText: `ಕರ್ನಾಟಕ ಸರ್ಕಾರ
ಕಂದಾಯ ಇಲಾಖೆ
ಗ್ರಾಮ ಪಂಚಾಯತಿ ಕಾರ್ಯಾಲಯ, ಹಳೇಬೀಡು
ಬೇಲೂರು ತಾಲ್ಲೂಕು, ಹಾಸನ ಜಿಲ್ಲೆ - ೫೭೩೧೧೫

ಸಂಖ್ಯೆ: ಗ್ರಾಪಂ/ಬೆವಿ/೨೦೨೬-೨೭/೧೪೮
ದಿನಾಂಕ: ೧೨-೧೦-೨೦೨೬

ಸಾರ್ವಜನಿಕ ಪ್ರಕಟಣೆ: ಮುಂಗಾರು ಬೆಳೆ ನಷ್ಟ ಪರಿಹಾರ

ಹಳೇಬೀಡು ಗ್ರಾಮ ಪಂಚಾಯತಿ ವ್ಯಾಪ್ತಿಯ ಸಮಸ್ತ ರೈತ ಬಾಂಧವರಲ್ಲಿ ವಿನಂತಿ ಮಾಡುವುದೇನೆಂದರೆ:
ಪ್ರಸಕ್ತ ಸಾಲಿನ ಮುಂಗಾರು ಹಂಗಾಮಿನಲ್ಲಿ ತೀವ್ರ ಮಳೆಯ ಕೊರತೆಯಿಂದ ಹಾನಿಗೊಳಗಾದ ಬೆಳೆಗಳಿಗೆ ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಬರ ಪರಿಹಾರ ನಿಯಮಾವಳಿ ಅನ್ವಯ ಹೆಕ್ಟೇರ್‌ಗೆ ₹೧೫,೦೦೦/- (ಹದಿನೈದು ಸಾವಿರ ರೂಪಾಯಿ) ವರೆಗೆ ಪರಿಹಾರ ಧನ ಬಿಡುಗಡೆ ಮಾಡಲು ಆದೇಶಿಸಲಾಗಿದೆ. ಅರ್ಹ ರೈತರು ನಿಗದಿತ ನಮೂನೆಯಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಕೋರಲಾಗಿದೆ.

ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಅಗತ್ಯ ದಾಖಲೆಗಳು ಹಾಗೂ ಷರತ್ತುಗಳು:
೧. ರೈತರ ಚಾಲ್ತಿ ಸಾಲಿನ ಪಹಣಿ (RTC) ನಕಲು ಪ್ರತಿ ಮತ್ತು ಆಧಾರ್ ಕಾರ್ಡ್.
೨. ಆಧಾರ್ ಜೋಡಣೆಗೊಂಡ ಬ್ಯಾಂಕ್ ಖಾತೆ ವಿವರ (NPCI ಸಕ್ರಿಯವಾಗಿರಬೇಕು).
೩. ಕಂದಾಯ ಇಲಾಖೆಯ 'ಫ್ರೂಟ್ಸ್' (FRUITS ID) ತಂತ್ರಾಂಶದಲ್ಲಿ ನೋಂದಾಯಿತ ಸಂಖ್ಯೆ.
೪. ಅರ್ಜಿ ಸಲ್ಲಿಕೆಗೆ ಕೊನೆಯ ದಿನಾಂಕ: ೩೦-೧೧-೨೦೨೬ ಸಂಜೆ ೫:೩೦ ಗಂಟೆವರೆಗೆ.

ಗ್ರಾಮ ಒನ್ ಕೇಂದ್ರದಲ್ಲಿ ಅಥವಾ ಬಾಪೂಜಿ ಸೇವಾ ಕೇಂದ್ರದಲ್ಲಿ ಅರ್ಜಿಗಳನ್ನು ಉಚಿತವಾಗಿ ನೋಂದಾಯಿಸಿಕೊಳ್ಳಬಹುದು. ಯಾವುದೇ ಮಧ್ಯವರ್ತಿಗಳಿಗೆ ಹಣ ನೀಡಬಾರದೆಂದು ಈ ಮೂಲಕ ಎಚ್ಚರಿಸಲಾಗಿದೆ.

[ಸಹಿ/Signed]
ಪಂಚಾಯತಿ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿ (PDO)
ಗ್ರಾಮ ಪಂಚಾಯತಿ, ಹಳೇಬೀಡು`,
    formattedMarkdownText: `### ಕರ್ನಾಟಕ ಸರ್ಕಾರ - ಕಂದಾಯ ಇಲಾಖೆ
**ಗ್ರಾಮ ಪಂಚಾಯತಿ ಕಾರ್ಯಾಲಯ, ಹಳೇಬೀಡು, ಹಾಸನ ಜಿಲ್ಲೆ**
*ಸಂಖ್ಯೆ: ಗ್ರಾಪಂ/ಬೆವಿ/೨೦೨೬-೨೭/೧೪೮ | ದಿನಾಂಕ: ೧೨-೧೦-೨೦೨೬*

---

#### ವಿಷಯ: ಸಾರ್ವಜನಿಕ ಪ್ರಕಟಣೆ - ಮುಂಗಾರು ಬೆಳೆ ನಷ್ಟ ಪರಿಹಾರ ಧನ

ಪ್ರಸಕ್ತ ಸಾಲಿನ ಮುಂಗಾರು ಹಂಗಾಮಿನಲ್ಲಿ ಮಳೆ ಕೊರತೆಯಿಂದ ಬೆಳೆ ಹಾನಿಗೊಳಗಾದ ರೈತರಿಗೆ ಹೆಕ್ಟೇರ್‌ಗೆ **₹೧೫,೦೦೦/-** ವರೆಗೆ ಬರ ಪರಿಹಾರ ಧನ ಬಿಡುಗಡೆ ಮಾಡಲಾಗುತ್ತಿದೆ.

##### ಅಗತ್ಯ ದಾಖಲೆಗಳು:
1. ಚಾಲ್ತಿ ಸಾಲಿನ ಪಹಣಿ (RTC) ಮತ್ತು ಆಧಾರ್ ಕಾರ್ಡ್
2. ಆಧಾರ್ ಲಿಂಕ್ ಆದ ಬ್ಯಾಂಕ್ ಖಾತೆ (NPCI Active)
3. FRUITS ID ನೋಂದಣಿ ಸಂಖ್ಯೆ

> **ಮುಖ್ಯ ಗಡುವು (Deadline):** ೩೦-೧೧-೨೦೨೬ ಸಂಜೆ ೫:೩೦ ರವರೆಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಅವಕಾಶ.
> **ಸಲ್ಲಿಕೆ ಸ್ಥಳ:** ಗ್ರಾಮ ಒನ್ ಕೇಂದ್ರ / ಬಾಪೂಜಿ ಸೇವಾ ಕೇಂದ್ರ (ಉಚಿತ ಸೇವೆ).`,
    confidence: {
      overall: 98.4,
      characterAccuracy: 99.2,
      vattaksharaAccuracy: 97.6,
      handwritingComplexity: 'low'
    },
    summary: {
      category: 'government_notice',
      simplifiedKannada: [
        'ಹಳೇಬೀಡು ಗ್ರಾಮ ಪಂಚಾಯತಿ ವ್ಯಾಪ್ತಿಯ ರೈತರಿಗೆ ಬರಗಾಲದ ಬೆಳೆ ಹಾನಿಗೆ ₹೧೫,೦೦೦ ವರೆಗೆ ಪರಿಹಾರ ಸಿಗಲಿದೆ.',
        'ಅರ್ಜಿ ಹಾಕಲು ಪಹಣಿ (RTC), ಆಧಾರ್ ಕಾರ್ಡ್, ಆಧಾರ್ ಲಿಂಕ್ ಇರುವ ಬ್ಯಾಂಕ್ ಖಾತೆ ಮತ್ತು FRUITS ID ಬೇಕು.',
        'ಅರ್ಜಿಗಳನ್ನು ಗ್ರಾಮ ಒನ್ ಅಥವಾ ಬಾಪೂಜಿ ಸೇವಾ ಕೇಂದ್ರದಲ್ಲಿ ಉಚಿತವಾಗಿ ಸಲ್ಲಿಸಬಹುದು.',
        'ಕೊನೆಯ ದಿನಾಂಕ: ೩೦ ನವೆಂಬರ್ ೨೦೨೬, ಸಂಜೆ ೫:೩೦ ರೊಳಗೆ. ಮಧ್ಯವರ್ತಿಗಳಿಗೆ ಯಾವುದೇ ಹಣ ನೀಡಬೇಡಿ.'
      ],
      simplifiedEnglish: [
        'Drought relief subsidy of up to ₹15,000 per hectare announced for farmers in Halebidu Gram Panchayat.',
        'Required documents: Current RTC (Pahani), Aadhaar card, Aadhaar-linked bank account (NPCI active), and FRUITS ID.',
        'Free application submission available at Grama One or Bapuji Seva Kendra.',
        'Crucial deadline: 30th November 2026, 5:30 PM. Warning against paying any intermediaries or middlemen.'
      ],
      keyActionItems: [
        'FRUITS ID ಪರಿಶೀಲಿಸಿಕೊಳ್ಳಿ ಮತ್ತು ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಆಧಾರ್ NPCI ಮ್ಯಾಪಿಂಗ್ ಆಗಿರುವುದನ್ನು ಖಾತರಿಪಡಿಸಿ.',
        'ಚಾಲ್ತಿ ಸಾಲಿನ ಪಹಣಿ (RTC) ಪ್ರಿಂಟ್ ತೆಗೆದುಕೊಂಡು ಸಮೀಪದ ಗ್ರಾಮ ಒನ್ ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ.',
        '೩೦-೧೧-೨೦೨೬ ರೊಳಗೆ ಸ್ವೀಕೃತಿ ರಶೀದಿ (Acknowledgement) ಪಡೆದುಕೊಳ್ಳಿ.'
      ],
      importantDatesAndDeadlines: [
        'ಪ್ರಕಟಣೆ ದಿನಾಂಕ: ೧೨-೧೦-೨೦೨೬ (12 October 2026)',
        'ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಕೊನೆಯ ದಿನಾಂಕ: ೩೦-೧೧-೨೦೨೬ (30 November 2026, 5:30 PM)'
      ],
      monetaryAmounts: [
        'ಬೆಳೆ ನಷ್ಟ ಪರಿಹಾರ ಧನ: ₹೧೫,೦೦೦/- ಪ್ರತಿ ಹೆಕ್ಟೇರ್‌ಗೆ (Up to ₹15,000/hectare)',
        'ಅರ್ಜಿ ಸಲ್ಲಿಕೆ ಶುಲ್ಕ: ಉಚಿತ (₹0 - No Fee)'
      ]
    },
    translations: {
      english: `GOVERNMENT OF KARNATAKA - REVENUE DEPARTMENT
Office of the Gram Panchayat, Halebidu
Belur Taluk, Hassan District - 573115

Ref No: GP/CropIns/2026-27/148
Date: 12-10-2026

PUBLIC NOTICE: KHARIF CROP LOSS RELIEF ASSISTANCE

It is hereby requested of all farmer brethren within the jurisdiction of Halebidu Gram Panchayat:
In view of severe rainfall deficit during the current Kharif season, the Government of Karnataka has ordered the release of drought relief financial aid up to ₹15,000/- per hectare. Eligible farmers are requested to submit applications in the prescribed format.

Mandatory Documents and Conditions:
1. Copy of the current year RTC (Pahani) and Aadhaar card.
2. Aadhaar-linked bank account details (NPCI must be active).
3. Registration number under Revenue Department's FRUITS software.
4. Final Deadline for Submission: 30-11-2026 up to 5:30 PM.

Applications can be registered free of cost at Grama One Centres or Bapuji Seva Kendras. Notice is hereby given not to pay any money to intermediaries.

[Signed]
Panchayat Development Officer (PDO)
Gram Panchayat, Halebidu`,
      hindi: `कर्नाटक सरकार - राजस्व विभाग
ग्राम पंचायत कार्यालय, हलेबीडु, हासन जिला - 573115

क्रमांक: ग्रापं/फबी/2026-27/148
दिनांक: 12-10-2026

सार्वजनिक सूचना: खरीफ फसल क्षति राहत सहायता

हलेबीडु ग्राम पंचायत क्षेत्र के सभी किसान भाइयों से अनुरोध है कि चालू खरीफ मौसम में सूखे से प्रभावित फसलों के लिए कर्नाटक सरकार द्वारा ₹15,000 प्रति हेक्टेयर तक राहत राशि जारी करने का आदेश दिया गया है।

आवश्यक दस्तावेज:
1. चालू वर्ष की आरटीसी (पहाणी) और आधार कार्ड।
2. आधार से जुड़ा बैंक खाता (NPCI सक्रिय)।
3. फ्रूट्स (FRUITS ID) पंजीकरण संख्या।
4. आवेदन की अंतिम तिथि: 30-11-2026 शाम 5:30 बजे तक।

ग्राम वन केंद्र पर आवेदन निःशुल्क भरा जा सकता है। बिचौलियों को पैसे न दें।`
    },
    sampleQuestions: [
      { kn: 'ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಕೊನೆಯ ದಿನಾಂಕ ಯಾವುದು?', en: 'What is the last date to submit the application?' },
      { kn: 'ಬೆಳೆ ಪರಿಹಾರ ಎಷ್ಟು ಹಣ ಸಿಗುತ್ತದೆ?', en: 'What is the compensation amount offered?' },
      { kn: 'ಯಾವ ಯಾವ ದಾಖಲೆಗಳು ಬೇಕು?', en: 'What documents are required to apply?' },
      { kn: 'ಅರ್ಜಿ ಎಲ್ಲಿ ಸಲ್ಲಿಸಬೇಕು ಮತ್ತು ಶುಲ್ಕ ಎಷ್ಟು?', en: 'Where to submit the application and is there any fee?' }
    ]
  },
  {
    id: 'sample-apmc-invoice',
    category: 'financial_receipt',
    titleEn: 'APMC Mandya Agricultural Market Bill',
    titleKn: 'ಕೃಷಿ ಉತ್ಪನ್ನ ಮಾರುಕಟ್ಟೆ ಸಮಿತಿ (APMC) ಮಂಡ್ಯ ರಶೀದಿ',
    descriptionEn: 'Itemized sale receipt for Grade-A Sona Masoori paddy and local Ragi with tare deductions.',
    descriptionKn: 'ಸೋನಾ ಮಸೂರಿ ಭತ್ತ ಮತ್ತು ಸ್ಥಳೀಯ ರಾಗಿ ಮಾರಾಟದ ತೂಕ ಹಾಗೂ ದರದ ಅಧಿಕೃತ ಮಾರುಕಟ್ಟೆ ಬಿಲ್.',
    imageSvgDataUrl: svgToDataUrl(apmcInvoiceSvg),
    rawKannadaText: `ಕೃಷಿ ಉತ್ಪನ್ನ ಮಾರುಕಟ್ಟೆ ಸಮಿತಿ (APMC)
ಮುಖ್ಯ ಮಾರುಕಟ್ಟೆ ಪ್ರಾಂಗಣ, ಮಂಡ್ಯ - ೫೭೧೪೦೧
ಜಿಎಸ್‌ಟಿ ಸಂಖ್ಯೆ (GSTIN): 29AAAGC1023K1ZM • ಪರವಾನಗಿ ಸಂ: APMC/MDY/4492

ರೈತರ ಮಾರಾಟ ಪಟ್ಟಿ / ರಶೀದಿ
ರಶೀದಿ ಸಂಖ್ಯೆ: MDY-೨೬-೮೯೨ | ದಿನಾಂಕ: ೧೫-೧೦-೨೦೨೬

ರೈತರ ಹೆಸರು: ಶ್ರೀ ಮಂಜುನಾಥ್ ಗೌಡ
ಗ್ರಾಮ: ಕೆರಗೋಡು, ಮಂಡ್ಯ ತಾಲ್ಲೂಕು
ರೈತರ ಮೊಬೈಲ್: ೯೮೪೫೦-XXXXX
ವರ್ತಕರ ಕೋಡ್: MANDYA-COMM-08

ಕ್ರ.ಸಂ | ಉತ್ಪನ್ನ ವಿವರ | ಚೀಲಗಳ ಸಂಖ್ಯೆ | ತೂಕ (ಕ್ವಿಂಟಾಲ್) | ದರ (ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್) | ಒಟ್ಟು ಮೊತ್ತ (₹)
೧ | ಭತ್ತ (ಸೋನಾ ಮಸೂರಿ - ಗ್ರೇಡ್ ಎ) | ೪೦ ಚೀಲ | ೩೦.೦೦ ಕ್ವಿಂ | ₹ ೨,೪೫೦ | ₹ ೭೩,೫೦೦.೦೦
೨ | ರಾಗಿ (ಸ್ಥಳೀಯ ತಳಿ - ಶುದ್ಧೀಕರಿಸಿದ) | ೨೫ ಚೀಲ | ೧೮.೦೦ ಕ್ವಿಂ | ₹ ೩,೨೦೦ | ₹ ೫೭,೬೦೦.೦೦

ಒಟ್ಟು ಒಟ್ಟು ಉತ್ಪನ್ನ ಮೌಲ್ಯ: ₹ ೧,೩೧,೧೦೦.೦೦
ಕಳೆತ: ಮಾರುಕಟ್ಟೆ ಹಮಾಲಿ ಮತ್ತು ತೂಕ ಶುಲ್ಕ: (-) ₹ ೯೫೦.೦೦
ರೈತರಿಗೆ ನೀಡಬೇಕಾದ ನಿವ್ವಳ ಸಂದಾಯ ಮೊತ್ತ (Net Payable): ₹ ೧,೩೦,೧೫೦.೦೦

ಅಕ್ಷರಗಳಲ್ಲಿ: ಒಂದು ಲಕ್ಷದ ಮೂವತ್ತು ಸಾವಿರದ ಒಂದು ನೂರ ಐವತ್ತು ರೂಪಾಯಿಗಳು ಮಾತ್ರ.
ಪಾವತಿ ವಿಧಾನ: RTGS/NEFT ಮೂಲಕ ನೇರವಾಗಿ ರೈತರ ಕೆನರಾ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮಾ ಮಾಡಲಾಗುತ್ತದೆ.

[ಅಧಿಕೃತ ಸಹಿ & ಮೊಹರು]
ಮುಖ್ಯ ಕಾರ್ಯದರ್ಶಿ / ತೂಕಗಾರ, APMC ಮಂಡ್ಯ`,
    formattedMarkdownText: `### ಕೃಷಿ ಉತ್ಪನ್ನ ಮಾರುಕಟ್ಟೆ ಸಮಿತಿ (APMC) ಮಂಡ್ಯ
**ರೈತರ ಮಾರಾಟ ರಶೀದಿ: MDY-೨೬-೮೯೨** | ದಿನಾಂಕ: ೧೫-೧೦-೨೦೨೬
*ರೈತರು: ಶ್ರೀ ಮಂಜುನಾಥ್ ಗೌಡ, ಕೆರಗೋಡು ಗ್ರಾಮ*

| ಕ್ರ.ಸಂ | ಉತ್ಪನ್ನ ವಿವರ | ಚೀಲ | ತೂಕ (ಕ್ವಿಂ) | ದರ / ಕ್ವಿಂ | ಒಟ್ಟು ಮೊತ್ತ (₹) |
|---|---|---|---|---|---|
| ೧ | ಭತ್ತ (ಸೋನಾ ಮಸೂರಿ - ಗ್ರೇಡ್ ಎ) | ೪೦ | ೩೦.೦೦ | ₹ ೨,೪೫೦ | ₹ ೭೩,೫೦೦ |
| ೨ | ರಾಗಿ (ಸ್ಥಳೀಯ ತಳಿ) | ೨೫ | ೧೮.೦೦ | ₹ ೩,೨೦೦ | ₹ ೫೭,೬೦೦ |

- **ಒಟ್ಟು ಮೌಲ್ಯ:** ₹ ೧,೩೧,೧೦೦.೦೦
- **ಹಮಾಲಿ & ತೂಕ ವೆಚ್ಚ:** (-) ₹ ೯೫೦.೦೦
- **ನಿವ್ವಳ ಸಂದಾಯ ಮೊತ್ತ (Net Amount):** **₹ ೧,೩೦,೧೫೦.೦೦** (RTGS ಮೂಲಕ ಖಾತೆಗೆ ಜಮಾ)`,
    confidence: {
      overall: 99.1,
      characterAccuracy: 99.4,
      vattaksharaAccuracy: 98.8,
      handwritingComplexity: 'low'
    },
    summary: {
      category: 'financial_receipt',
      simplifiedKannada: [
        'ರೈತ ಮಂಜುನಾಥ್ ಗೌಡ ಅವರು ಮಂಡ್ಯ ಎಪಿಎಂಸಿಯಲ್ಲಿ ೩೦ ಕ್ವಿಂಟಾಲ್ ಭತ್ತ ಮತ್ತು ೧೮ ಕ್ವಿಂಟಾಲ್ ರಾಗಿ ಮಾರಾಟ ಮಾಡಿದ್ದಾರೆ.',
        'ಭತ್ತಕ್ಕೆ ಕ್ವಿಂಟಾಲ್‌ಗೆ ₹೨,೪೫೦ ರಂತೆ ₹೭೩,೫೦೦ ಮತ್ತು ರಾಗಿಗೆ ₹೩,೨೦೦ ರಂತೆ ₹೫೭,೬೦೦ ಬಂದಿದೆ.',
        'ಒಟ್ಟು ₹೧,೩೧,೧೦೦ ದಲ್ಲಿ ಹಮಾಲಿ ಮತ್ತು ತೂಕದ ಖರ್ಚು ₹೯೫೦ ಕಳೆದು, ರೈತರಿಗೆ ₹೧,೩೦,೧೫೦ ಸಿಗಲಿದೆ.',
        'ಈ ಹಣವನ್ನು RTGS ಮೂಲಕ ನೇರವಾಗಿ ಕೆನರಾ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮೆ ಮಾಡಲಾಗುತ್ತದೆ.'
      ],
      simplifiedEnglish: [
        'Farmer Manjunath Gowda sold 30 quintals of paddy and 18 quintals of ragi at Mandya APMC market.',
        'Paddy fetched ₹73,500 (@ ₹2,450/quintal) and Ragi fetched ₹57,600 (@ ₹3,200/quintal).',
        'Gross sales amounted to ₹1,31,100, less ₹950 hamali/weighing charges, leaving a net payout of ₹1,30,150.',
        'Funds are transferred directly to the farmer\'s Canara Bank account via RTGS/NEFT.'
      ],
      keyActionItems: [
        'ಕೆನರಾ ಬ್ಯಾಂಕ್ ಖಾತೆಯ RTGS ಜಮಾ ಸಂದೇಶವನ್ನು ಮೊಬೈಲ್‌ನಲ್ಲಿ ತಾಳೆ ನೋಡಿ.',
        'ರಶೀದಿ ಸಂಖ್ಯೆ MDY-೨೬-೮೯೨ ಪ್ರತಿಯನ್ನು ಆದಾಯ ತೆರಿಗೆ ಅಥವಾ ಕೃಷಿ ಸಾಲ ನವೀಕರಣಕ್ಕೆ ಜೋಪಾನವಾಗಿಡಿ.'
      ],
      importantDatesAndDeadlines: [
        'ವಹಿವಾಟು ನಡೆದ ದಿನಾಂಕ: ೧೫-೧೦-೨೦೨೬ (15 October 2026)'
      ],
      monetaryAmounts: [
        'ಒಟ್ಟು ಮಾರಾಟ ಮೊತ್ತ (Gross): ₹ ೧,೩೧,೧೦೦.೦೦',
        'ಹಮಾಲಿ ಶುಲ್ಕ (Deduction): ₹ ೯೫೦.೦೦',
        'ನಿವ್ವಳ ಜಮಾ ಮೊತ್ತ (Net Payable): ₹ ೧,೩೦,೧೫೦.೦೦'
      ]
    },
    translations: {
      english: `AGRICULTURAL PRODUCE MARKET COMMITTEE (APMC)
Main Market Yard, Mandya - 571401
GSTIN: 29AAAGC1023K1ZM • License No: APMC/MDY/4492

FARMER SALE INVOICE / RECEIPT
Invoice No: MDY-26-892 | Date: 15-10-2026

Farmer Name: Sri Manjunath Gowda
Village: Keragodu, Mandya Taluk
Farmer Mobile: 98450-XXXXX
Trader Code: MANDYA-COMM-08

Item 1: Paddy (Sona Masoori - Grade A) | 40 Bags | 30.00 Quintals | Rate: ₹ 2,450/Qtl | Total: ₹ 73,500.00
Item 2: Ragi (Local Variety - Cleaned) | 25 Bags | 18.00 Quintals | Rate: ₹ 3,200/Qtl | Total: ₹ 57,600.00

Total Produce Value: ₹ 1,31,100.00
Less: Market Hamali & Weighing Charges: (-) ₹ 950.00
Net Payable Amount to Farmer: ₹ 1,30,150.00

In Words: Rupees One Lakh Thirty Thousand One Hundred Fifty Only.
Payment Mode: Directly credited to the farmer's Canara Bank account via RTGS/NEFT.

[Official Signature & Seal]
Chief Secretary / Weighman, APMC Mandya`,
      hindi: `कृषि उपज मंडी समिति (APMC)
मुख्य मंडी प्रांगण, मांड्या - 571401
रसीद संख्या: MDY-26-892 | दिनांक: 15-10-2026

किसान का नाम: श्री मंजुनाथ गौड़ा
गांव: केरागोडु, मांड्या

1. धान (सोना मसूरी - ग्रेड ए): 30 क्विंटल @ ₹ 2,450 = ₹ 73,500
2. रागी (स्थानीय किस्म): 18 क्विंटल @ ₹ 3,200 = ₹ 57,600

कुल मूल्य: ₹ 1,31,100.00
घटाएं: हमाली और तुलाई शुल्क: (-) ₹ 950.00
किसान को शुद्ध देय राशि: ₹ 1,30,150.00 (सीधे बैंक खाते में आरटीजीएस द्वारा जमा)`
    },
    sampleQuestions: [
      { kn: 'ರೈತರಿಗೆ ಸಿಗುವ ಒಟ್ಟು ನಿವ್ವಳ ಹಣ ಎಷ್ಟು?', en: 'What is the net amount payable to the farmer?' },
      { kn: 'ಭತ್ತ ಮತ್ತು ರಾಗಿಗೆ ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್‌ಗೆ ಸಿಕ್ಕ ದರ ಎಷ್ಟು?', en: 'What were the per-quintal rates for paddy and ragi?' },
      { kn: 'ಹಮಾಲಿ ಶುಲ್ಕ ಎಷ್ಟು ಕಡಿತ ಮಾಡಲಾಗಿದೆ?', en: 'How much was deducted for hamali/handling?' },
      { kn: 'ಹಣವನ್ನು ಯಾವ ಬ್ಯಾಂಕ್ ಮೂಲಕ ಪಾವತಿಸಲಾಗುತ್ತಿದೆ?', en: 'Through which payment mode and bank is payment credited?' }
    ]
  },
  {
    id: 'sample-handwritten-note',
    category: 'handwritten_note',
    titleEn: 'Handwritten Family Land & Well Agreement',
    titleKn: 'ಕೈಬರಹದ ಕೌಟುಂಬಿಕ ಆಸ್ತಿ ಮತ್ತು ಬಾವಿ ನೀರಿನ ಒಪ್ಪಂದ',
    descriptionEn: 'Traditional handwritten Kannada note showing complex conjuncts (ವತ್ತಕ್ಷರಗಳು) and cursive uncertainties.',
    descriptionKn: 'ಅಡಿಕೆ ತೋಟದ ಪಾಲು ಮತ್ತು ಬಾವಿ ನೀರಿನ ಸರದಿ ಕುರಿತಾದ ಸಾಂಪ್ರದಾಯಿಕ ಕೈಬರಹದ ಒಡಂಬಡಿಕೆ ಪತ್ರ.',
    imageSvgDataUrl: svgToDataUrl(handwrittenNoteSvg),
    rawKannadaText: `॥ ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ ॥
ದಿನಾಂಕ: ೧೦-೦೮-೨೦೨೬ | ಸ್ಥಳ: ತೀರ್ಥಹಳ್ಳಿ

ಕೌಟುಂಬಿಕ ಆಸ್ತಿ ಮತ್ತು ಬಾವಿ ನೀರಿನ ಹಕ್ಕು ಒಪ್ಪಂದ ಪತ್ರ

ನಮ್ಮ ಹಿರಿಯರಾದ ದಿವಂಗತ ಶ್ರೀ ವೆಂಕಟೇಶ ಹೆಬ್ಬಾರ್ ಅವರ ಮಕ್ಕಳಾದ ರಾಮಕೃಷ್ಣ ಹೆಬ್ಬಾರ್ ಮತ್ತು ಸುಬ್ರಹ್ಮಣ್ಯ ಹೆಬ್ಬಾರ್ ನಾವುಗಳು ಪರಸ್ಪರ ಪ್ರೀತಿ ವಿಶ್ವಾಸದಿಂದ ಮಾಡಿಕೊಂಡ ಒಪ್ಪಂದ:

೧. ಸರ್ವೆ ನಂ [೪೨/ಅ] ರಲ್ಲಿರುವ ೩ ಎಕರೆ ೧೨ ಗುಂಟೆ ಅಡಿಕೆ ತೋಟವನ್ನು ಸಮನಾಗಿ ಹಂಚಿಕೊಳ್ಳಲಾಗಿದೆ. ಪೂರ್ವ ದಿಕ್ಕಿನ ೧ ಎಕರೆ ೨೬ ಗುಂಟೆ ರಾಮಕೃಷ್ಣನಿಗೂ, ಪಶ್ಚಿಮ ದಿಕ್ಕಿನ ಭಾಗ ಸುಬ್ರಹ್ಮಣ್ಯನಿಗೂ ಸಲ್ಲತಕ್ಕದ್ದು.
೨. ತೋಟದ ಮಧ್ಯದಲ್ಲಿರುವ [ಬೋರ್‌ವೆಲ್ / ಕಪಿಲೆ ಬಾವಿಯ] ನೀರನ್ನು ವಾರದಲ್ಲಿ ಮೂರು ದಿನ (ಸೋಮವಾರ, ಬುಧವಾರ, ಶುಕ್ರವಾರ) ರಾಮಕೃಷ್ಣನ ತೋಟಕ್ಕೆ, ಹಾಗೂ ಉಳಿದ ಮೂರು ದಿನ ಸುಬ್ರಹ್ಮಣ್ಯನ ಭಾಗಕ್ಕೆ ಹಾಯಿಸಲು ಒಪ್ಪಿರುತ್ತೇವೆ. ಭಾನುವಾರದಂದು ಮೋಟರ್ ರಿಪೇರಿ ಮತ್ತು ಶುಚಿಗೊಳಿಸಲು ಮೀಸಲು.
೩. ವಿದ್ಯುತ್ ಬಿಲ್ ಹಾಗೂ ಮೋಟರ್ ದುರಸ್ತಿ ವೆಚ್ಚವನ್ನು ಇಬ್ಬರೂ [ಅರ್ಧರ್ಧ / ಸಮನಾಗಿ] ಭರಿಸತಕ್ಕದ್ದು. ಯಾವುದೇ ಕಾರಣಕ್ಕೂ ಮೂರನೆಯ ವ್ಯಕ್ತಿಗಳಿಗೆ ನೀರಿನ ಹಕ್ಕನ್ನು ಪರಭಾರೆ ಮಾಡುವಂತಿಲ್ಲ.
೪. ಗ್ರಾಮದ ಮುಖ್ಯ ರಸ್ತೆಗೆ ಹೋಗುವ ದಾರಿಯನ್ನು ಯಾರೊಬ್ಬರೂ [ತಡೆಗಟ್ಟುವಂತಿಲ್ಲ]. ಈ ಒಪ್ಪಂದವು ನಮ್ಮಿಬ್ಬರ ಹಾಗೂ ನಮ್ಮ ವಾರಸುದಾರರ ಪೂರ್ಣ ಸಮ್ಮತಿಯಿಂದ ಬರೆಯಲ್ಪಟ್ಟಿದೆ.

ಒಪ್ಪಿದವರ ಸಹಿ:
(೧) ರಾಮಕೃಷ್ಣ ಹೆಬ್ಬಾರ್
(೨) ಸುಬ್ರಹ್ಮಣ್ಯ ಹೆಬ್ಬಾರ್

ಪಂಚಾಯಿತಿದಾರರ / ಸಾಕ್ಷಿದಾರರ ರುಜುಗಳು:
೧. ಶ್ರೀ ಕೃಷ್ಣಮೂರ್ತಿ ಭಟ್, ತೀರ್ಥಹಳ್ಳಿ
೨. ಶ್ರೀ ಮಹಾಬಲೇಶ್ವರ ರಾವ್, ಕೆಳದಿ`,
    formattedMarkdownText: `### ॥ ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ ॥
**ಕೌಟುಂಬಿಕ ಆಸ್ತಿ ಮತ್ತು ಬಾವಿ ನೀರಿನ ಹಕ್ಕು ಒಪ್ಪಂದ ಪತ್ರ**
*ದಿನಾಂಕ: ೧೦-೦೮-೨೦೨೬ • ಸ್ಥಳ: ತೀರ್ಥಹಳ್ಳಿ*

**ಪಾಲುದಾರರು:** ದಿವಂಗತ ವೆಂಕಟೇಶ ಹೆಬ್ಬಾರ್ ಅವರ ಮಕ್ಕಳಾದ ರಾಮಕೃಷ್ಣ ಹೆಬ್ಬಾರ್ ಮತ್ತು ಸುಬ್ರಹ್ಮಣ್ಯ ಹೆಬ್ಬಾರ್.

1. **ತೋಟದ ವಿಭಜನೆ:** ಸರ್ವೆ ನಂ [೪೨/ಅ] ರ ೩ ಎಕರೆ ೧೨ ಗುಂಟೆ ತೋಟ.
   - ಪೂರ್ವ ಭಾಗ (೧ ಎಕರೆ ೨೬ ಗುಂಟೆ) ➔ ರಾಮಕೃಷ್ಣ
   - ಪಶ್ಚಿಮ ಭಾಗ ➔ ಸುಬ್ರಹ್ಮಣ್ಯ
2. **ಬಾವಿ ನೀರಿನ ಸರದಿ (Water Rotation):**
   - ಸೋಮವಾರ, ಬುಧವಾರ, ಶುಕ್ರವಾರ ➔ ರಾಮಕೃಷ್ಣ
   - ಮಂಗಳವಾರ, ಗುರುವಾರ, ಶನಿವಾರ ➔ ಸುಬ್ರಹ್ಮಣ್ಯ
   - ಭಾನುವಾರ ➔ ಮೋಟರ್ ನಿರ್ವಹಣೆ/ವಿಶ್ರಾಂತಿ
3. **ವೆಚ್ಚ ಹಂಚಿಕೆ:** ವಿದ್ಯುತ್ ಬಿಲ್ ಹಾಗೂ ದುರಸ್ತಿ ವೆಚ್ಚ ಅರ್ಧರ್ಧ [ಸಮನಾಗಿ].
4. **ದಾರಿ ಹಕ್ಕು:** ಮುಖ್ಯ ರಸ್ತೆಯ ಹಕ್ಕುದಾರಿಯನ್ನು ಯಾರೂ ಮುಚ್ಚುವಂತಿಲ್ಲ.`,
    confidence: {
      overall: 93.8,
      characterAccuracy: 95.1,
      vattaksharaAccuracy: 92.4,
      handwritingComplexity: 'high'
    },
    summary: {
      category: 'handwritten_note',
      simplifiedKannada: [
        'ತೀರ್ಥಹಳ್ಳಿಯ ರಾಮಕೃಷ್ಣ ಮತ್ತು ಸುಬ್ರಹ್ಮಣ್ಯ ಹೆಬ್ಬಾರ್ ಅಣ್ಣ-ತಮ್ಮಂದಿರು ತಮ್ಮ ೩ ಎಕರೆ ೧೨ ಗುಂಟೆ ಅಡಿಕೆ ತೋಟವನ್ನು ಸಮನಾಗಿ ಹಂಚಿಕೊಂಡಿದ್ದಾರೆ.',
        'ಪೂರ್ವ ಭಾಗ ರಾಮಕೃಷ್ಣನಿಗೆ, ಪಶ್ಚಿಮ ಭಾಗ ಸುಬ್ರಹ್ಮಣ್ಯನಿಗೆ ಸೇರಿದೆ.',
        'ಬಾವಿಯ ನೀರನ್ನು ವಾರದಲ್ಲಿ ಮೂರು-ಮೂರು ದಿನ ಪಾಳಿಯಂತೆ ಹಾಯಿಸಿಕೊಳ್ಳಲು ನಿರ್ಧರಿಸಲಾಗಿದೆ (ಭಾನುವಾರ ಮೋಟರ್ ಸರ್ವಿಸ್).',
        'ಕರೆಂಟ್ ಬಿಲ್ ಹಾಗೂ ರಿಪೇರಿ ಖರ್ಚನ್ನು ಇಬ್ಬರೂ ಸಮನಾಗಿ ಭರಿಸಬೇಕು. ದಾರಿಯನ್ನು ಯಾರೂ ಅಡ್ಡಗಟ್ಟುವಂತಿಲ್ಲ.'
      ],
      simplifiedEnglish: [
        'Family settlement between brothers Ramakrishna Hebbar and Subrahmanya Hebbar for their 3 acre 12 gunta areca nut garden in Thirthahalli.',
        'Land is equally divided: Eastern 1 acre 26 guntas to Ramakrishna, Western side to Subrahmanya.',
        'Well water rotation: Mon/Wed/Fri for Ramakrishna; Tue/Thu/Sat for Subrahmanya; Sunday reserved for motor maintenance.',
        'Electricity bills and repairs to be split equally 50-50. Main road path cannot be blocked or altered.'
      ],
      keyActionItems: [
        'ವಾರದ ನೀರಿನ ಸರದಿ ದಿನಗಳನ್ನು (ಸೋಮ-ಬುಧ-ಶುಕ್ರ vs ಮಂಗಳ-ಗುರು-ಶನಿ) ಚಾಚೂ ತಪ್ಪದೆ ಪಾಲಿಸುವುದು.',
        'ಪ್ರತಿ ತಿಂಗಳ ವಿದ್ಯುತ್ ಬಿಲ್ ಬಂದಾಗ ಅರ್ಧ ಮೊತ್ತವನ್ನು ಸಮನ್ವಯಗೊಳಿಸುವುದು.'
      ],
      importantDatesAndDeadlines: [
        'ಒಪ್ಪಂದ ಬರೆದ ದಿನಾಂಕ: ೧೦-೦೮-೨೦೨೬ (10 August 2026)'
      ],
      monetaryAmounts: [
        'ವಿದ್ಯುತ್ & ದುರಸ್ತಿ ವೆಚ್ಚ: ೫೦-೫೦ ಪಾಲು (Equal 50-50 share)'
      ]
    },
    translations: {
      english: `|| Salutations to Lord Ganesha ||
Date: 10-08-2026 | Place: Thirthahalli

FAMILY PROPERTY AND WELL WATER RIGHTS AGREEMENT

Agreement entered into with mutual affection and trust between Ramakrishna Hebbar and Subrahmanya Hebbar, sons of our late elder Sri Venkatesha Hebbar:

1. The 3 acres and 12 guntas areca nut farm in Survey No [42/A] is divided equally. The eastern side measuring 1 acre 26 guntas belongs to Ramakrishna, and the western side belongs to Subrahmanya.
2. The water from the [borewell / dug well] in the center of the plantation shall be pumped 3 days a week (Monday, Wednesday, Friday) to Ramakrishna's farm, and the remaining 3 days to Subrahmanya's portion. Sunday is reserved for motor servicing and cleaning.
3. Electricity charges and motor repair expenses shall be borne [equally in half] by both parties. Water rights shall under no circumstances be transferred to third parties.
4. The pathway leading to the village main road [shall not be obstructed] by anyone. This agreement is executed with the complete consent of both parties and their heirs.

Signatures of consenting parties:
(1) Ramakrishna Hebbar
(2) Subrahmanya Hebbar

Witness Signatures:
1. Sri Krishnamurthy Bhat, Thirthahalli
2. Sri Mahabaleshwara Rao, Keladi`,
      hindi: `॥ श्री गणेशाय नमः ॥
दिनांक: 10-08-2026 | स्थान: तीर्थहल्ली

पारिवारिक संपत्ति एवं कुएं के पानी के अधिकार का समझौता पत्र

स्वर्गीय श्री वेंकटेश हेब्बार के सुपुत्र रामकृष्ण हेब्बार एवं सुब्रह्मण्य हेब्बार के बीच आपसी सहमति से हुआ समझौता:

1. सर्वे नं [42/अ] के 3 एकड़ 12 गुंठे सुपारी बागान का बराबर बंटवारा किया गया है। पूर्वी भाग रामकृष्ण को और पश्चिमी भाग सुब्रह्मण्य को दिया गया।
2. कुएं का पानी सप्ताह में 3 दिन (सोम, बुध, शुक्र) रामकृष्ण तथा 3 दिन सुब्रह्मण्य के बागान में लगाया जाएगा। रविवार रखरखाव के लिए रहेगा।
3. बिजली बिल और मरम्मत खर्च दोनों आधा-आधा वहन करेंगे। रास्ते को कोई नहीं रोकेगा।`
    },
    sampleQuestions: [
      { kn: 'ತೋಟವನ್ನು ಇಬ್ಬರು ಅಣ್ಣ-ತಮ್ಮಂದಿರು ಹೇಗೆ ಹಂಚಿಕೊಂಡಿದ್ದಾರೆ?', en: 'How is the farm divided between the two brothers?' },
      { kn: 'ಬಾವಿ ನೀರಿನ ಸರದಿ ದಿನಗಳು ಯಾವುವು?', en: 'What are the well water rotation days?' },
      { kn: 'ವಿದ್ಯುತ್ ಬಿಲ್ ಯಾರು ಎಷ್ಟು ಕಟ್ಟಬೇಕು?', en: 'Who pays the electricity and maintenance bill?' },
      { kn: 'ಯಾವ ಸರ್ವೆ ನಂಬರ್ ಭೂಮಿ ಬಗ್ಗೆ ಒಪ್ಪಂದವಾಗಿದೆ?', en: 'Which survey number land is mentioned in the agreement?' }
    ]
  },
  {
    id: 'sample-medical-article',
    titleEn: 'Medical News: Diabetes & Insulin Advisory',
    titleKn: 'ವೈದ್ಯಕೀಯ ಅಂಕಣ: ಮಧುಮೇಹ & ಇನ್ಸುಲಿನ್',
    descriptionEn: 'Published medical editorial on Diabetes Mellitus etymology, pancreatic insulin secretion, and glucose cellular metabolism.',
    descriptionKn: 'ಮಧುಮೇಹ (ಡಯಾಬಿಟಿಸ್ ಮೆಲಿಟಸ್) ಪದದ ಮೂಲ, ಪ್ಯಾಂಕ್ರಿಯಾಸ್ ಗ್ರಂಥಿ ಮತ್ತು ಇನ್ಸುಲಿನ್ ಹಾರ್ಮೋನ್ ಕಾರ್ಯವೈಖರಿ ಕುರಿತ ವೈದ್ಯಕೀಯ ಲೇಖನ.',
    category: 'general',
    imageSvgDataUrl: svgToDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1050" width="800" height="1050">
  <rect width="800" height="1050" fill="#FBF9F3"/>
  <rect x="25" y="25" width="750" height="1000" fill="none" stroke="#CBD5E1" stroke-width="1.5"/>
  <rect x="35" y="35" width="730" height="980" fill="none" stroke="#E2E8F0" stroke-width="1"/>
  <rect x="40" y="45" width="720" height="60" fill="#18181B"/>
  <text x="400" y="82" font-family="'Noto Sans Kannada', sans-serif" font-size="20" font-weight="bold" text-anchor="middle" fill="#FFFFFF">ಆರೋಗ್ಯ ವಾರ್ತೆ - ವೈದ್ಯಕೀಯ ಅಂಕಣ (Health &amp; Medical News)</text>
  <line x1="40" y1="120" x2="760" y2="120" stroke="#18181B" stroke-width="2"/>
  <text x="50" y="140" font-family="'Noto Sans Kannada', sans-serif" font-size="13" font-weight="bold" fill="#09090B">ಸಂಪಾದಕೀಯ ವಿಭಾಗ: ಸಾರ್ವಜನಿಕ ಆರೋಗ್ಯ ಜಾಗೃತಿ</text>
  <text x="750" y="140" font-family="'Noto Sans Kannada', sans-serif" font-size="12" text-anchor="end" fill="#52525B">ವಿಶೇಷ ವರದಿ • ದಿನಾಂಕ: ೧೭-೧೦-೨೦೨೬</text>
  <line x1="40" y1="155" x2="760" y2="155" stroke="#71717A" stroke-width="1"/>
  <rect x="50" y="175" width="700" height="70" rx="6" fill="#F4F4F5" stroke="#E4E4E7"/>
  <text x="70" y="202" font-family="'Noto Sans Kannada', sans-serif" font-size="14" font-weight="bold" fill="#18181B">ಸಂಪಾದಕ</text>
  <text x="70" y="226" font-family="'Noto Sans Kannada', sans-serif" font-size="12" fill="#52525B">ಪ್ರಸ್ತುತ ಸರಣಿ ಲೇಖನದಲ್ಲಿ ಮಧುಮೇಹ ಮತ್ತು ಇನ್ಸುಲಿನ್ ಹಾರ್ಮೋನ್ ಕಾರ್ಯವೈಖರಿ ಕುರಿತು ವೈದ್ಯಕೀಯ ವಿವರಣೆ ನೀಡಲಾಗಿದೆ.</text>
  <text x="50" y="285" font-family="'Noto Sans Kannada', sans-serif" font-size="18" font-weight="bold" fill="#09090B">ಮಧುಮೇಹ ಅಥವಾ ಡಯಾಬಿಟಿಸ್ ಪರಿಚಯ (Overview &amp; Etymology)</text>
  <line x1="50" y1="298" x2="520" y2="298" stroke="#18181B" stroke-width="2"/>
  <text x="50" y="335" font-family="'Noto Sans Kannada', sans-serif" font-size="14" fill="#27272A">
    <tspan x="50" dy="0">ಮೆಲಿಟಸ್ (Mellitus) ಎಂದರೆ ಸಿಹಿ. ಡಯಾಬಿಟಿಸ್ ಎನ್ನುವುದು ಗ್ರೀಕ್ ಭಾಷೆಯ ಪದ.</tspan>
    <tspan x="50" dy="28">ಇದರರ್ಥ ಇಳಿಗೊಳವೆ (Siphon) ಎಂದಾಗಿದೆ. ಪ್ರಾಚೀನ ಕಾಲದಲ್ಲಿ ಮಧುಮೇಹ ರೋಗಿಗಳು</tspan>
    <tspan x="50" dy="28">ಅತಿಯಾಗಿ ಮೂತ್ರ ವಿಸರ್ಜನೆ ಮಾಡುತ್ತಿದ್ದ ಕಾರಣದಿಂದ ಡಯಾಬಿಟಿಸ್ ಎಂದೂ, ಆ ಮೂತ್ರದಲ್ಲಿ</tspan>
    <tspan x="50" dy="28">ಇರುವೆಗಳು ಮುತ್ತಿಕೊಳ್ಳುತ್ತಿದ್ದ ಕಾರಣ ಮೆಲಿಟಸ್ ಎಂದೂ ಕರೆಯಲಾಯಿತು.</tspan>
  </text>
  <rect x="50" y="475" width="700" height="34" rx="4" fill="#E4E4E7"/>
  <text x="70" y="498" font-family="'Noto Sans Kannada', sans-serif" font-size="15" font-weight="bold" fill="#18181B">ಡಯಾಬಿಟಿಸ್ ಹೇಗೆ ಬರುತ್ತದೆ? (How Diabetes Occurs)</text>
  <text x="50" y="545" font-family="'Noto Sans Kannada', sans-serif" font-size="14" fill="#27272A">
    <tspan x="50" dy="0">ನಾವು ಸೇವಿಸಿದ ಆಹಾರ ಜೀರ್ಣಗೊಂಡು ಗ್ಲೂಕೋಸ್ ಆಗಿ ಪರಿವರ್ತನೆಗೊಳ್ಳುತ್ತದೆ. ಈ ಗ್ಲೂಕೋಸ್</tspan>
    <tspan x="50" dy="28">ರಕ್ತದ ಮೂಲಕ ದೇಹದ ಜೀವಕೋಶಗಳನ್ನು ತಲುಪಲು ಇನ್ಸುಲಿನ್ ಎಂಬ ಹಾರ್ಮೋನ್ ಅಗತ್ಯ.</tspan>
    <tspan x="50" dy="28">ನಮ್ಮ ಹೊಟ್ಟೆಯ ಹಿಂಭಾಗದಲ್ಲಿರುವ ಪ್ಯಾಂಕ್ರಿಯಾಸ್ ಗ್ರಂಥಿಯು (ಮೇದೋಜೀರಕ ಗ್ರಂಥಿ)</tspan>
    <tspan x="50" dy="28">ಉತ್ಪತ್ತಿ ಮಾಡುವ ಇನ್ಸುಲಿನ್ ರಕ್ತದಲ್ಲಿನ ಗ್ಲೂಕೋಸ್ ಮಟ್ಟವನ್ನು ನಿಯಂತ್ರಿಸುತ್ತದೆ.</tspan>
    <tspan x="50" dy="28">ಆಹಾರ ಸೇವಿಸಿದಾಗ ರಕ್ತದಲ್ಲಿ ಗ್ಲೂಕೋಸ್ ಪ್ರಮಾಣ ಹೆಚ್ಚುತ್ತದೆ. ಆಗ ಪ್ಯಾಂಕ್ರಿಯಾಸ್ ಗ್ರಂಥಿಯು</tspan>
    <tspan x="50" dy="28">ಇನ್ಸುಲಿನ್ ಅನ್ನು ರಕ್ತಕ್ಕೆ ಬಿಡುಗಡೆ ಮಾಡುತ್ತದೆ. ಈ ಇನ್ಸುಲಿನ್ ಗ್ಲೂಕೋಸ್ ಜೀವಕೋಶಗಳ ಒಳಗೆ</tspan>
    <tspan x="50" dy="28">ಪ್ರವೇಶಿಸಲು ಅನುವು ಮಾಡಿಕೊಡುತ್ತದೆ.</tspan>
  </text>
  <rect x="50" y="775" width="700" height="150" rx="8" fill="#F8FAFC" stroke="#94A3B8" stroke-dasharray="4 4"/>
  <text x="70" y="810" font-family="'Noto Sans Kannada', sans-serif" font-size="13" font-weight="bold" fill="#0F172A">ಕ್ಲಿನಿಕಲ್ ಪರಿಭಾಷೆ &amp; ಜೈವಿಕ ನಿಯಂತ್ರಣ (Biological Cycle):</text>
  <text x="80" y="845" font-family="'Noto Sans Kannada', sans-serif" font-size="12.5" fill="#334155">೧. ಆಹಾರ ಸೇವನೆ ➔ ಜೀರ್ಣಕ್ರಿಯೆ ➔ ರಕ್ತದಲ್ಲಿ ಗ್ಲೂಕೋಸ್ ಹೆಚ್ಚಳ</text>
  <text x="80" y="875" font-family="'Noto Sans Kannada', sans-serif" font-size="12.5" fill="#334155">೨. ಪ್ಯಾಂಕ್ರಿಯಾಸ್ (ಮೇದೋಜೀರಕ ಗ್ರಂಥಿ) ➔ ಇನ್ಸುಲಿನ್ ಹಾರ್ಮೋನ್ ಸ್ರವಿಕೆ</text>
  <text x="80" y="905" font-family="'Noto Sans Kannada', sans-serif" font-size="12.5" fill="#334155">೩. ಜೀವಕೋಶಗಳಿಗೆ ಗ್ಲೂಕೋಸ್ ಪ್ರವೇಶ ➔ ದೇಹಕ್ಕೆ ಶಕ್ತಿ &amp; ಸಮತೋಲನ</text>
  <line x1="50" y1="960" x2="750" y2="960" stroke="#CBD5E1" stroke-width="1"/>
  <text x="400" y="990" font-family="'Noto Sans Kannada', sans-serif" font-size="11" text-anchor="middle" fill="#64748B">ಸಾರ್ವಜನಿಕ ಆರೋಗ್ಯ ಅರಿವು ಅಭಿಯಾನ • ಕರ್ನಾಟಕ ರಾಜ್ಯ ಆರೋಗ್ಯ &amp; ಕುಟುಂಬ ಕಲ್ಯಾಣ ಇಲಾಖೆ</text>
</svg>
`),
    rawKannadaText: `ಸಂಪಾದಕ

ಮೆಲಿಟಸ್ (Mellitus) ಎಂದರೆ ಸಿಹಿ. ಡಯಾಬಿಟಿಸ್ ಎನ್ನುವುದು ಗ್ರೀಕ್ ಭಾಷೆಯ ಪದ. ಇದರರ್ಥ ಇಳಿಗೊಳವೆ (Siphon) ಎಂದಾಗಿದೆ. ಪ್ರಾಚೀನ ಕಾಲದಲ್ಲಿ ಮಧುಮೇಹ ರೋಗಿಗಳು ಅತಿಯಾಗಿ ಮೂತ್ರ ವಿಸರ್ಜನೆ ಮಾಡುತ್ತಿದ್ದ ಕಾರಣದಿಂದ ಡಯಾಬಿಟಿಸ್ ಎಂದೂ, ಆ ಮೂತ್ರದಲ್ಲಿ ಇರುವೆಗಳು ಮುತ್ತಿಕೊಳ್ಳುತ್ತಿದ್ದ ಕಾರಣ ಮೆಲಿಟಸ್ ಎಂದೂ ಕರೆಯಲಾಯಿತು.

ಡಯಾಬಿಟಿಸ್ ಹೇಗೆ ಬರುತ್ತದೆ?
ನಾವು ಸೇವಿಸಿದ ಆಹಾರ ಜೀರ್ಣಗೊಂಡು ಗ್ಲೂಕೋಸ್ ಆಗಿ ಪರಿವರ್ತನೆಗೊಳ್ಳುತ್ತದೆ. ಈ ಗ್ಲೂಕೋಸ್ ರಕ್ತದ ಮೂಲಕ ದೇಹದ ಜೀವಕೋಶಗಳನ್ನು ತಲುಪಲು ಇನ್ಸುಲಿನ್ ಎಂಬ ಹಾರ್ಮೋನ್ ಅಗತ್ಯ. ನಮ್ಮ ಹೊಟ್ಟೆಯ ಹಿಂಭಾಗದಲ್ಲಿರುವ ಪ್ಯಾಂಕ್ರಿಯಾಸ್ ಗ್ರಂಥಿಯು (ಮೇದೋಜೀರಕ ಗ್ರಂಥಿ) ಉತ್ಪತ್ತಿ ಮಾಡುವ ಇನ್ಸುಲಿನ್ ರಕ್ತದಲ್ಲಿನ ಗ್ಲೂಕೋಸ್ ಮಟ್ಟವನ್ನು ನಿಯಂತ್ರಿಸುತ್ತದೆ. ಆಹಾರ ಸೇವಿಸಿದಾಗ ರಕ್ತದಲ್ಲಿ ಗ್ಲೂಕೋಸ್ ಪ್ರಮಾಣ ಹೆಚ್ಚುತ್ತದೆ. ಆಗ ಪ್ಯಾಂಕ್ರಿಯಾಸ್ ಗ್ರಂಥಿಯು ಇನ್ಸುಲಿನ್ ಅನ್ನು ರಕ್ತಕ್ಕೆ ಬಿಡುಗಡೆ ಮಾಡುತ್ತದೆ. ಈ ಇನ್ಸುಲಿನ್ ಗ್ಲೂಕೋಸ್ ಜೀವಕೋಶಗಳ ಒಳಗೆ ಪ್ರವೇಶಿಸಲು ಅನುವು ಮಾಡಿಕೊಡುತ್ತದೆ.`,
    formattedMarkdownText: `### ಆರೋಗ್ಯ ವಾರ್ತೆ: ವೈದ್ಯಕೀಯ ಅಂಕಣ (Medical Health News)
**ವಿಭಾಗ:** ಸಂಪಾದಕೀಯ (Editorial) | **ದಿನಾಂಕ:** ೧೭-೧೦-೨೦೨೬

---

#### ಸಂಪಾದಕ
ಪ್ರಸ್ತುತ ಸರಣಿ ಲೇಖನದಲ್ಲಿ ಮಧುಮೇಹ ಮತ್ತು ಇನ್ಸುಲಿನ್ ಹಾರ್ಮೋನ್ ಕಾರ್ಯವೈಖರಿ ಕುರಿತು ವೈದ್ಯಕೀಯ ವಿವರಣೆ ನೀಡಲಾಗಿದೆ.

#### ಮಧುಮೇಹ ಅಥವಾ ಡಯಾಬಿಟಿಸ್ ಪರಿಚಯ (Overview & Etymology)
ಮೆಲಿಟಸ್ (Mellitus) ಎಂದರೆ ಸಿಹಿ. ಡಯಾಬಿಟಿಸ್ ಎನ್ನುವುದು ಗ್ರೀಕ್ ಭಾಷೆಯ ಪದ. ಇದರರ್ಥ **ಇಳಿಗೊಳವೆ (Siphon)** ಎಂದಾಗಿದೆ. ಪ್ರಾಚೀನ ಕಾಲದಲ್ಲಿ ಮಧುಮೇಹ ರೋಗಿಗಳು ಅತಿಯಾಗಿ ಮೂತ್ರ ವಿಸರ್ಜನೆ ಮಾಡುತ್ತಿದ್ದ ಕಾರಣದಿಂದ ಡಯಾಬಿಟಿಸ್ ಎಂದೂ, ಆ ಮೂತ್ರದಲ್ಲಿ ಇರುವೆಗಳು ಮುತ್ತಿಕೊಳ್ಳುತ್ತಿದ್ದ ಕಾರಣ ಮೆಲಿಟಸ್ ಎಂದೂ ಕರೆಯಲಾಯಿತು.

#### ಡಯಾಬಿಟಿಸ್ ಹೇಗೆ ಬರುತ್ತದೆ? (Pathophysiology of Diabetes)
ನಾವು ಸೇವಿಸಿದ ಆಹಾರ ಜೀರ್ಣಗೊಂಡು **ಗ್ಲೂಕೋಸ್** ಆಗಿ ಪರಿವರ್ತನೆಗೊಳ್ಳುತ್ತದೆ. ಈ ಗ್ಲೂಕೋಸ್ ರಕ್ತದ ಮೂಲಕ ದೇಹದ ಜೀವಕೋಶಗಳನ್ನು ತಲುಪಲು **ಇನ್ಸುಲಿನ್** ಎಂಬ ಹಾರ್ಮೋನ್ ಅಗತ್ಯ. ನಮ್ಮ ಹೊಟ್ಟೆಯ ಹಿಂಭಾಗದಲ್ಲಿರುವ **ಪ್ಯಾಂಕ್ರಿಯಾಸ್ ಗ್ರಂಥಿಯು (ಮೇದೋಜೀರಕ ಗ್ರಂಥಿ)** ಉತ್ಪತ್ತಿ ಮಾಡುವ ಇನ್ಸುಲಿನ್ ರಕ್ತದಲ್ಲಿನ ಗ್ಲೂಕೋಸ್ ಮಟ್ಟವನ್ನು ನಿಯಂತ್ರಿಸುತ್ತದೆ. ಆಹಾರ ಸೇವಿಸಿದಾಗ ರಕ್ತದಲ್ಲಿ ಗ್ಲೂಕೋಸ್ ಪ್ರಮಾಣ ಹೆಚ್ಚುತ್ತದೆ. ಆಗ ಪ್ಯಾಂಕ್ರಿಯಾಸ್ ಗ್ರಂಥಿಯು ಇನ್ಸುಲಿನ್ ಅನ್ನು ರಕ್ತಕ್ಕೆ ಬಿಡುಗಡೆ ಮಾಡುತ್ತದೆ. ಈ ಇನ್ಸುಲಿನ್ ಗ್ಲೂಕೋಸ್ ಜೀವಕೋಶಗಳ ಒಳಗೆ ಪ್ರವೇಶಿಸಲು ಅನುವು ಮಾಡಿಕೊಡುತ್ತದೆ.`,
    confidence: {
      overall: 96.8,
      characterAccuracy: 98.4,
      vattaksharaAccuracy: 96.0,
      handwritingComplexity: 'low'
    },
    summary: {
      category: 'general',
      simplifiedKannada: [
        'ಮಧುಮೇಹ ಅಥವಾ ಡಯಾಬಿಟಿಸ್ ಎನ್ನುವುದು ಗ್ರೀಕ್ ಪದ "ಇಳಿಗೊಳವೆ" (Siphon) ಮತ್ತು ಲ್ಯಾಟಿನ್ "ಮೆಲಿಟಸ್" (ಸಿಹಿ) ಪದಗಳಿಂದ ಬಂದಿದೆ.',
        'ನಾವು ಸೇವಿಸುವ ಆಹಾರ ಜೀರ್ಣವಾಗಿ ಗ್ಲೂಕೋಸ್ ಆಗಿ ಪರಿವರ್ತಿತವಾಗುತ್ತದೆ; ಇದು ಜೀವಕೋಶಗಳಿಗೆ ಶಕ್ತಿ ಒದಗಿಸಲು ಇನ್ಸುಲಿನ್ ಹಾರ್ಮೋನ್ ಅತ್ಯಗತ್ಯ.',
        'ಹೊಟ್ಟೆಯ ಹಿಂಭಾಗದಲ್ಲಿರುವ ಪ್ಯಾಂಕ್ರಿಯಾಸ್ (ಮೇದೋಜೀರಕ) ಗ್ರಂಥಿಯು ಸರಿಯಾಗಿ ಇನ್ಸುಲಿನ್ ಉತ್ಪತ್ತಿ ಮಾಡದಿದ್ದಾಗ ರಕ್ತದಲ್ಲಿ ಗ್ಲೂಕೋಸ್ ಹೆಚ್ಚಾಗಿ ಮಧುಮೇಹ ಉಂಟಾಗುತ್ತದೆ.'
      ],
      simplifiedEnglish: [
        'The term Diabetes originates from the Greek word for "Siphon", and Mellitus means "Sweet" (honeyed urine).',
        'Food is digested and converted into glucose, which requires the hormone Insulin to reach and energize bodily cells.',
        'When the Pancreas gland behind the stomach produces insufficient insulin, glucose accumulates in the blood causing Diabetes.'
      ],
      keyActionItems: [
        'ಹತ್ತಿರದ ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರದಲ್ಲಿ (PHC) ರಕ್ತದಲ್ಲಿನ ಸಕ್ಕರೆ ಪ್ರಮಾಣ (Fasting & PPBS) ತಪಾಸಣೆ ಮಾಡಿಸಿಕೊಳ್ಳಿ.',
        'ದಿನನಿತ್ಯ ಕನಿಷ್ಠ ೩೦ ನಿಮಿಷಗಳ ನಡಿಗೆ ಹಾಗೂ ಸಮತೋಲಿತ ನಾರಿನಂಶವುಳ್ಳ ಆಹಾರ ಪಾಲಿಸಿ.',
        'ವೈದ್ಯರ ಅಧಿಕೃತ ಚೀಟಿ ಇಲ್ಲದೆ ಇನ್ಸುಲಿನ್ ಅಥವಾ ಔಷಧದ ಪ್ರಮಾಣವನ್ನು ಸ್ವಯಂ ಬದಲಾಯಿಸಬೇಡಿ.'
      ],
      importantDatesAndDeadlines: [
        'ನಿಯಮಿತ ಮಾಸಿಕ ರಕ್ತ ಸಕ್ಕರೆ ತಪಾಸಣೆ ಶಿಫಾರಸು (Monthly Glucose Screening)'
      ],
      monetaryAmounts: [
        'ಜನೌಷಧಿ ಕೇಂದ್ರಗಳಲ್ಲಿ ₹೫೦-₹೧೨೦ ರಿಯಾಯಿತಿ ದರದಲ್ಲಿ ಇನ್ಸುಲಿನ್ & ಜನರಿಕ್ ಔಷಧ ಲಭ್ಯ'
      ]
    },
    translations: {
      english: `Editorial Note:

"Mellitus" means sweet. "Diabetes" is a Greek word meaning "Siphon" (flowing tube). In ancient times, because diabetes patients excreted excessive urine it was called Diabetes, and because ants gathered around the sweet urine it was named Mellitus.

How does Diabetes occur?
The food we consume is digested and converted into glucose. To transport this glucose via bloodstream into body cells, a hormone called Insulin is essential. The Pancreas gland located behind the stomach produces insulin which regulates blood glucose levels. When food is eaten, blood glucose increases, triggering the pancreas to release insulin, allowing glucose to enter the cells.`,
      hindi: `संपादकीय टिप्पणी:

"मेलिटस" (Mellitus) का अर्थ मीठा होता है। "डायबिटीज" ग्रीक भाषा का शब्द है जिसका अर्थ साइफन (उतरती नली) है। प्राचीन काल में मधुमेह के रोगी अत्यधिक मूत्र त्याग करते थे इसलिए इसे डायबिटीज और चींटियां आने के कारण मेलिटस कहा गया।

डायबिटीज कैसे होता है?
हमारा खाया गया भोजन पचकर ग्लूकोज में परिवर्तित होता है। इस ग्लूकोज को कोशिकाओं तक पहुँचाने के लिए इंसुलिन हार्मोन आवश्यक है। पेट के पीछे स्थित अग्न्याशय (पैंक्रियाज) ग्रंथि इंसुलिन का उत्पादन करती है जो रक्त शर्करा को नियंत्रित करती है...`
    },
    sampleQuestions: [
      { kn: 'ಡಯಾಬಿಟಿಸ್ ಮತ್ತು ಮೆಲಿಟಸ್ ಪದಗಳ ಅರ್ಥವೇನು?', en: 'What is the etymology and meaning of Diabetes and Mellitus?' },
      { kn: 'ಇನ್ಸುಲಿನ್ ಅನ್ನು ದೇಹದ ಯಾವ ಗ್ರಂಥಿ ಉತ್ಪತ್ತಿ ಮಾಡುತ್ತದೆ?', en: 'Which organ produces insulin in the body?' },
      { kn: 'ಆಹಾರದಿಂದ ಗ್ಲೂಕೋಸ್ ಜೀವಕೋಶಗಳನ್ನು ತಲುಪಲು ಏನು ಬೇಕು?', en: 'What is required for dietary glucose to reach body cells?' },
      { kn: 'ಮಧುಮೇಹ ನಿಯಂತ್ರಣಕ್ಕೆ ಯಾವ ಕ್ರಮಗಳನ್ನು ಸೂಚಿಸಲಾಗಿದೆ?', en: 'What steps are recommended for diabetes management?' }
    ]
  },
  {
    id: 'sample-study-certificate',
    titleEn: 'Kannada Medium Study Certificate (5% Quota)',
    titleKn: 'ಕನ್ನಡ ಮಾಧ್ಯಮ ವ್ಯಾಸಂಗ ಪ್ರಮಾಣ ಪತ್ರ',
    descriptionEn: 'Official study certificate for candidate Kumari Kavitha Naik from Gibb Girls High School Kumta, countersigned by BEO for 5% horizontal reservation.',
    descriptionKn: 'ಕುಮಾರಿ ಕವಿತಾ ನಾಯ್ಕ (ಗಿಬ್ ಬಾಲಿಕಾ ಪ್ರೌಢಶಾಲೆ, ಕುಮಟಾ) ಅವರ ಅಧಿಕೃತ ಕನ್ನಡ ಮಾಧ್ಯಮ ವ್ಯಾಸಂಗ ಪ್ರಮಾಣ ಪತ್ರ (ಬಿಇಒ ಮೇಲ್ಸಹಿ ಸಹಿತ).',
    category: 'legal_document',
    imageSvgDataUrl: svgToDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1050" width="800" height="1050">
  <rect width="800" height="1050" fill="#FCFAF2"/>
  <rect x="25" y="25" width="750" height="1000" fill="none" stroke="#475569" stroke-width="2"/>
  <rect x="32" y="32" width="736" height="986" fill="none" stroke="#94A3B8" stroke-width="1"/>

  <circle cx="400" cy="80" r="30" fill="#FEF3C7" stroke="#B45309" stroke-width="1.8"/>
  <text x="400" y="76" font-family="'Noto Sans Kannada', sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#991B1B">ಕರ್ನಾಟಕ ಸರ್ಕಾರ</text>
  <text x="400" y="92" font-family="'Noto Sans Kannada', sans-serif" font-size="10" text-anchor="middle" fill="#1E293B">ಸಾರ್ವಜನಿಕ ಶಿಕ್ಷಣ ಇಲಾಖೆ</text>

  <text x="400" y="132" font-family="'Noto Sans Kannada', sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#1E293B">ಸರ್ಕಾರದ ಅಧಿಸೂಚನೆ ಸಂಖ್ಯೆ: ಸಿಆಸುಇ ೭೧ ಸೇನೆನಿ ೨೦೦೧, ದಿನಾಂಕ: ೨೪-೧೦-೨೦೦೨</text>
  <text x="400" y="152" font-family="'Noto Sans Kannada', sans-serif" font-size="11" text-anchor="middle" fill="#475569">ಮತ್ತು ತಿದ್ದುಪಡಿ ಅಧಿಸೂಚನೆ ಸಂಖ್ಯೆ: ಸಿಆಸುಇ ೯೭ ಸಹಿಮ ೨೦೦೨ &amp; ಸಿಆಸುಇ ೫೩ ಸಹಿಮ ೨೦೦೭</text>

  <rect x="260" y="170" width="280" height="28" rx="4" fill="#FEF3C7" stroke="#D97706" stroke-width="1"/>
  <text x="400" y="189" font-family="'Noto Sans Kannada', sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#92400E">ಅನುಬಂಧ - ೧ (Annexure-1)</text>

  <text x="400" y="230" font-family="'Noto Sans Kannada', sans-serif" font-size="20" font-weight="bold" text-anchor="middle" fill="#0F172A">ಕನ್ನಡ ಮಾಧ್ಯಮದಲ್ಲಿ ವ್ಯಾಸಂಗ ಮಾಡಿದ ಪ್ರಮಾಣ ಪತ್ರ</text>
  <line x1="120" y1="245" x2="680" y2="245" stroke="#0F172A" stroke-width="1.5"/>

  <text x="70" y="295" font-family="'Noto Sans Kannada', sans-serif" font-size="14.5" fill="#1E293B">
    <tspan x="70" dy="0">ಕುಮಾರಿ </tspan>
    <tspan font-weight="bold" fill="#0F172A">ಕವಿತಾ ನಾಯ್ಕ</tspan>
    <tspan> (ಹೆಗಡೆ ಗ್ರಾಮ, ಕುಮಟಾ ತಾಲ್ಲೂಕು, ಉತ್ತರ ಕನ್ನಡ ಜಿಲ್ಲೆ)</tspan>
    <tspan x="70" dy="32">ಇವರು </tspan>
    <tspan font-weight="bold" fill="#0F172A">ಗಿಬ್ ಬಾಲಿಕಾ ಪ್ರೌಢಶಾಲೆ, ಕುಮಟಾ</tspan>
    <tspan> ಶಾಲೆಯಲ್ಲಿ ೮ ನೇ ತರಗತಿಯಿಂದ ೧೦ ನೇ ತರಗತಿಯವರೆಗೆ</tspan>
    <tspan x="70" dy="32">(ಶೈಕ್ಷಣಿಕ ವರ್ಷ ೨೦೦೩-೦೪ ರಿಂದ ೨೦೦೫-೦೬) ವ್ಯಾಸಂಗ ಮಾಡಿರುತ್ತಾರೆಂದು ಹಾಗೂ ಈ ಅವಧಿಯಲ್ಲಿ</tspan>
    <tspan x="70" dy="32">ಅಭ್ಯರ್ಥಿಯ ವ್ಯಾಸಂಗದ ಬೋಧನಾ ಮಾಧ್ಯಮವು </tspan>
    <tspan font-weight="bold" fill="#991B1B">ಕನ್ನಡವಾಗಿರುತ್ತದೆ</tspan>
    <tspan> ಎಂದು ಈ ಮೂಲಕ ಪ್ರಮಾಣೀಕರಿಸಲಾಗಿದೆ.</tspan>
    <tspan x="70" dy="32">ಸದರಿ ಶಾಲೆಯು ಕರ್ನಾಟಕ ರಾಜ್ಯ ಸರ್ಕಾರದ ಶಿಕ್ಷಣ ಇಲಾಖೆಯ ಮಾನ್ಯತೆ ಪಡೆದ ಸಂಸ್ಥೆಯಾಗಿರುತ್ತದೆ.</tspan>
  </text>

  <rect x="70" y="490" width="660" height="150" rx="6" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1"/>
  <text x="90" y="520" font-family="'Noto Sans Kannada', sans-serif" font-size="14" font-weight="bold" fill="#0F172A">ಶಾಲಾ ಪ್ರವೇಶ &amp; ದಾಖಲಾತಿ ವಿವರಗಳು (Admission Registry):</text>
  <text x="95" y="555" font-family="'Noto Sans Kannada', sans-serif" font-size="13" fill="#334155">೧. ಶಾಲಾ ಪ್ರವೇಶ ಸಂಖ್ಯೆ (Admission No): <tspan font-weight="bold" fill="#0F172A">೩೮/೨೦೦೩-೦೪</tspan></text>
  <text x="95" y="585" font-family="'Noto Sans Kannada', sans-serif" font-size="13" fill="#334155">೨. ಶಾಲೆಗೆ ಸೇರಿದ ದಿನಾಂಕ: <tspan font-weight="bold" fill="#0F172A">೦೪-೦೬-೨೦೦೩</tspan> | ಶಾಲೆ ಬಿಟ್ಟ ದಿನಾಂಕ: <tspan font-weight="bold" fill="#0F172A">೧೦-೦೪-೨೦೦೬</tspan></text>
  <text x="95" y="615" font-family="'Noto Sans Kannada', sans-serif" font-size="13" fill="#334155">೩. ಪರೀಕ್ಷಾ ಫಲಿತಾಂಶ: <tspan font-weight="bold" fill="#065F46">ಎಸ್.ಎಸ್.ಎಲ್.ಸಿ. ಪ್ರಥಮ ದರ್ಜೆಯಲ್ಲಿ ಉತ್ತೀರ್ಣ (First Class)</tspan></text>

  <g transform="translate(200, 780) rotate(-6)">
    <circle cx="0" cy="0" r="54" fill="none" stroke="#1D4ED8" stroke-width="2.5" stroke-dasharray="6 3"/>
    <circle cx="0" cy="0" r="45" fill="none" stroke="#1D4ED8" stroke-width="1.2"/>
    <text x="0" y="-18" font-family="'Noto Sans Kannada', sans-serif" font-size="10" font-weight="bold" text-anchor="middle" fill="#1D4ED8">ಗಿಬ್ ಬಾಲಿಕಾ ಪ್ರೌಢಶಾಲೆ</text>
    <text x="0" y="4" font-family="'Noto Sans Kannada', sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#1D4ED8">ಕುಮಟಾ (ಉ.ಕ)</text>
    <text x="0" y="24" font-family="'Noto Sans Kannada', sans-serif" font-size="9" text-anchor="middle" fill="#1D4ED8">ಅಧಿಕೃತ ಮೊಹರು</text>
  </g>

  <text x="200" y="865" font-family="'Noto Sans Kannada', sans-serif" font-size="12" font-style="italic" text-anchor="middle" fill="#64748B">[ಸಹಿ / Headmaster]</text>
  <text x="200" y="885" font-family="'Noto Sans Kannada', sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#0F172A">ಮುಖ್ಯೋಪಾಧ್ಯಾಯರು</text>
  <text x="200" y="902" font-family="'Noto Sans Kannada', sans-serif" font-size="11" text-anchor="middle" fill="#475569">ಗಿಬ್ ಬಾಲಿಕಾ ಪ್ರೌಢಶಾಲೆ, ಕುಮಟಾ</text>

  <g transform="translate(600, 780) rotate(4)">
    <circle cx="0" cy="0" r="54" fill="none" stroke="#991B1B" stroke-width="2.5"/>
    <circle cx="0" cy="0" r="45" fill="none" stroke="#991B1B" stroke-width="1"/>
    <text x="0" y="-18" font-family="'Noto Sans Kannada', sans-serif" font-size="10" font-weight="bold" text-anchor="middle" fill="#991B1B">ಕ್ಷೇತ್ರ ಶಿಕ್ಷಣಾಧಿಕಾರಿಗಳ ಕಛೇರಿ</text>
    <text x="0" y="4" font-family="'Noto Sans Kannada', sans-serif" font-size="11" font-weight="bold" text-anchor="middle" fill="#991B1B">ಕುಮಟಾ ವಲಯ</text>
    <text x="0" y="24" font-family="'Noto Sans Kannada', sans-serif" font-size="9" text-anchor="middle" fill="#991B1B">ಉತ್ತರ ಕನ್ನಡ</text>
  </g>

  <text x="600" y="865" font-family="'Noto Sans Kannada', sans-serif" font-size="12" font-style="italic" text-anchor="middle" fill="#64748B">[ಮೇಲ್ಸಹಿ / Countersigned: 05/04/22]</text>
  <text x="600" y="885" font-family="'Noto Sans Kannada', sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#0F172A">ಕ್ಷೇತ್ರ ಶಿಕ್ಷಣಾಧಿಕಾರಿಗಳು (BEO)</text>
  <text x="600" y="902" font-family="'Noto Sans Kannada', sans-serif" font-size="11" text-anchor="middle" fill="#475569">ಕುಮಟಾ ತಾಲ್ಲೂಕು, ಉತ್ತರ ಕನ್ನಡ</text>

  <line x1="70" y1="940" x2="730" y2="940" stroke="#CBD5E1" stroke-width="1"/>
  <text x="400" y="965" font-family="'Noto Sans Kannada', sans-serif" font-size="11" text-anchor="middle" fill="#64748B">ದಿನಾಂಕ: ೦೫-೦೪-೨೦೨೨ • ಸ್ಥಳ: ಕುಮಟಾ | KPSC / KEA ೫% ಸಮತಲ ಮೀಸಲಾತಿಗೆ ಮಾನ್ಯವಾಗಿದೆ</text>
</svg>
`),
    rawKannadaText: `ಸರ್ಕಾರದ ಅಧಿಸೂಚನೆ ಸಂಖ್ಯೆ: ಸಿಆಸುಇ ೭೧ ಸೇನೆನಿ ೨೦೦೧, ದಿನಾಂಕ: ೨೪-೧೦-೨೦೦೨
ಮತ್ತು ತಿದ್ದುಪಡಿ ಅಧಿಸೂಚನೆ ಸಂಖ್ಯೆ: ಸಿಆಸುಇ ೯೭ ಸಹಿಮ ೨೦೦೨, ದಿನಾಂಕ: ೨೬-೦೨-೨೦೦೩
ಹಾಗೂ ಸಿಆಸುಇ ೫೩ ಸಹಿಮ ೨೦೦೭, ದಿನಾಂಕ: ೦೨-೦೧-೨೦೦೮
ಅನುಬಂಧ - ೧
ಕನ್ನಡ ಮಾಧ್ಯಮದಲ್ಲಿ ವ್ಯಾಸಂಗ ಮಾಡಿದ ಪ್ರಮಾಣ ಪತ್ರ

ಕುಮಾರಿ ಕವಿತಾ ನಾಯ್ಕ (ಹೆಗಡೆ ಗ್ರಾಮ, ಕುಮಟಾ ತಾಲ್ಲೂಕು, ಉತ್ತರ ಕನ್ನಡ ಜಿಲ್ಲೆ)
ಇವರು ಗಿಬ್ ಬಾಲಿಕಾ ಪ್ರೌಢಶಾಲೆ, ಕುಮಟಾ ಶಾಲೆಯಲ್ಲಿ ೮ ನೇ ತರಗತಿಯಿಂದ ೧೦ ನೇ ತರಗತಿಯವರೆಗೆ (ಶೈಕ್ಷಣಿಕ ವರ್ಷ ೨೦೦೩-೦೪ ರಿಂದ ೨೦೦೫-೦೬) ವ್ಯಾಸಂಗ ಮಾಡಿರುತ್ತಾರೆಂದು ಹಾಗೂ ಈ ಅವಧಿಯಲ್ಲಿ ಅಭ್ಯರ್ಥಿಯ ವ್ಯಾಸಂಗದ ಬೋಧನಾ ಮಾಧ್ಯಮವು ಕನ್ನಡವಾಗಿರುತ್ತದೆ ಎಂದು ಪ್ರಮಾಣೀಕರಿಸಲಾಗಿದೆ.
ಸದರಿ ಶಾಲೆಯು ರಾಜ್ಯ ಸರ್ಕಾರದ ಮಾನ್ಯತೆ ಪಡೆದ ಶಿಕ್ಷಣ ಸಂಸ್ಥೆಯಾಗಿರುತ್ತದೆ.

ಶಾಲಾ ದಾಖಲಾತಿ ವಿವರಗಳು:
೧. ಶಾಲಾ ಪ್ರವೇಶ ಸಂಖ್ಯೆ (Admission No): ೩೮/೨೦೦೩-೦೪
೨. ಶಾಲೆಗೆ ಸೇರಿದ ದಿನಾಂಕ: ೦೪-೦೬-೨೦೦೩
೩. ಶಾಲೆ ಬಿಟ್ಟ ದಿನಾಂಕ: ೧೦-೦೪-೨೦೦೬
೪. ಪರೀಕ್ಷಾ ಫಲಿತಾಂಶ: ಎಸ್.ಎಸ್.ಎಲ್.ಸಿ. ಪ್ರಥಮ ದರ್ಜೆಯಲ್ಲಿ ಉತ್ತೀರ್ಣ

ದಿನಾಂಕ: ೦೫-೦೪-೨೦೨೨ | ಸ್ಥಳ: ಕುಮಟಾ
[ಮುಖ್ಯೋಪಾಧ್ಯಾಯರ ಸಹಿ ಹಾಗೂ ಶಾಲಾ ಮೊಹರು]
ಮುಖ್ಯೋಪಾಧ್ಯಾಯರು, ಗಿಬ್ ಬಾಲಿಕಾ ಪ್ರೌಢಶಾಲೆ, ಕುಮಟಾ

ಮೇಲ್ಸಹಿ (Countersigned):
[ಕ್ಷೇತ್ರ ಶಿಕ್ಷಣಾಧಿಕಾರಿಗಳ ಮೊಹರು ಮತ್ತು ಸಹಿ]
ಕ್ಷೇತ್ರ ಶಿಕ್ಷಣಾಧಿಕಾರಿಗಳು (BEO), ಕುಮಟಾ ತಾಲೂಕು, ಉತ್ತರ ಕನ್ನಡ
ದಿನಾಂಕ: ೦೫-೦೪-೨೦೨೨`,
    formattedMarkdownText: `### ಸರ್ಕಾರದ ಅಧಿಸೂಚನೆ ಸಂಖ್ಯೆ: ಸಿಆಸುಇ ೭೧ ಸೇನೆನಿ ೨೦೦೧
**ಅನುಬಂಧ - ೧:** ಕನ್ನಡ ಮಾಧ್ಯಮದಲ್ಲಿ ವ್ಯಾಸಂಗ ಮಾಡಿದ ಪ್ರಮಾಣ ಪತ್ರ
*(DPAR 71 SRR 2001 & C&ASR 53 SAHIMA 2007 ನಿಯಮಾವಳಿಗಳ ಅನ್ವಯ)*

---

#### ಅಭ್ಯರ್ಥಿ ವಿವರ:
**ಕುಮಾರಿ ಕವಿತಾ ನಾಯ್ಕ** (ಹೆಗಡೆ ಗ್ರಾಮ, ಕುಮಟಾ ತಾಲ್ಲೂಕು, ಉತ್ತರ ಕನ್ನಡ ಜಿಲ್ಲೆ)
ಇವರು **ಗಿಬ್ ಬಾಲಿಕಾ ಪ್ರೌಢಶಾಲೆ, ಕುಮಟಾ** ಶಾಲೆಯಲ್ಲಿ ೮ ನೇ ತರಗತಿಯಿಂದ ೧೦ ನೇ ತರಗತಿಯವರೆಗೆ (ಶೈಕ್ಷಣಿಕ ವರ್ಷ ೨೦೦೩-೦೪ ರಿಂದ ೨೦೦೫-೦೬) ವ್ಯಾಸಂಗ ಮಾಡಿರುತ್ತಾರೆಂದು ಹಾಗೂ ಈ ಅವಧಿಯಲ್ಲಿ ಅಭ್ಯರ್ಥಿಯ ವ್ಯಾಸಂಗದ ಬೋಧನಾ ಮಾಧ್ಯಮವು **ಕನ್ನಡವಾಗಿರುತ್ತದೆ** ಎಂದು ಪ್ರಮಾಣೀಕರಿಸಲಾಗಿದೆ.

#### ಶಾಲಾ ದಾಖಲಾತಿ ವಿವರಗಳು:
- **ಶಾಲಾ ಪ್ರವೇಶ ಸಂಖ್ಯೆ (Admission No):** ೩೮/೨೦೦೩-೦೪
- **ಶಾಲೆಗೆ ಸೇರಿದ ದಿನಾಂಕ:** ೦೪-೦೬-೨೦೦೩
- **ಶಾಲೆ ಬಿಟ್ಟ ದಿನಾಂಕ:** ೧೦-೦೪-೨೦೦೬
- **ಪರೀಕ್ಷಾ ಫಲಿತಾಂಶ:** ಎಸ್.ಎಸ್.ಎಲ್.ಸಿ. ಪ್ರಥಮ ದರ್ಜೆಯಲ್ಲಿ ಉತ್ತೀರ್ಣ

#### ಅಧಿಕೃತ ಮೊಹರು ಮತ್ತು ಮೇಲ್ಸಹಿ:
- **ಮುಖ್ಯೋಪಾಧ್ಯಾಯರು:** ಗಿಬ್ ಬಾಲಿಕಾ ಪ್ರೌಢಶಾಲೆ, ಕುಮಟಾ
- **ಮೇಲ್ಸಹಿ (Countersigned):** ಕ್ಷೇತ್ರ ಶಿಕ್ಷಣಾಧಿಕಾರಿಗಳು (BEO), ಕುಮಟಾ ತಾಲೂಕು
- **ದಿನಾಂಕ:** ೦೫-೦೪-೨೦೨೨ | **ಸ್ಥಳ:** ಕುಮಟಾ`,
    confidence: {
      overall: 98.4,
      characterAccuracy: 99.2,
      vattaksharaAccuracy: 97.5,
      handwritingComplexity: 'medium'
    },
    summary: {
      category: 'legal_document',
      simplifiedKannada: [
        'ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಅಧಿಸೂಚನೆ (DPAR 71 SRR 2001) ನಿಯಮಾವಳಿಗಳ ಅನ್ವಯ ನೀಡಲಾದ ಅಧಿಕೃತ ಕನ್ನಡ ಮಾಧ್ಯಮ ವ್ಯಾಸಂಗ ಪ್ರಮಾಣ ಪತ್ರ.',
        'ಅಭ್ಯರ್ಥಿ ಕುಮಾರಿ ಕವಿತಾ ನಾಯ್ಕ (ಹೆಗಡೆ, ಕುಮಟಾ) ಗಿಬ್ ಬಾಲಿಕಾ ಪ್ರೌಢಶಾಲೆಯಲ್ಲಿ ೮ ರಿಂದ ೧೦ ನೇ ತರಗತಿವರೆಗೆ ಕನ್ನಡ ಮಾಧ್ಯಮದಲ್ಲಿ ವ್ಯಾಸಂಗ ಪೂರ್ಣಗೊಳಿಸಿದ್ದಾರೆ.',
        'ದಾಖಲಾತಿ ಸಂಖ್ಯೆ 38/2003-04 ಮತ್ತು ಕ್ಷೇತ್ರ ಶಿಕ್ಷಣಾಧಿಕಾರಿಗಳು (BEO) ಕುಮಟಾ ಅವರ ಅಧಿಕೃತ ಸಹಿ ಹಾಗೂ ಮೊಹರು ಹೊಂದಿದ್ದು, ಸರ್ಕಾರಿ ಹುದ್ದೆಗಳ ೫% ಮೀಸಲಾತಿಗೆ ಅರ್ಹತೆ ಹೊಂದಿದೆ.'
      ],
      simplifiedEnglish: [
        'Official Kannada Medium Study Certificate issued under Karnataka Govt Notification (DPAR 71 SRR 2001).',
        'Candidate Kumari Kavitha Naik (Hegde, Kumta) completed Classes 8 to 10 in Kannada Medium at Gibb Girls High School, Kumta.',
        'Admission No: 38/2003-04; countersigned and sealed by Block Education Officer (BEO), Kumta, eligible for 5% horizontal quota in State recruitment.'
      ],
      keyActionItems: [
        'KPSC, KEA CET ಹಾಗೂ ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ನೇಮಕಾತಿಗಳಲ್ಲಿ 5% ಕನ್ನಡ ಮಾಧ್ಯಮ ಮೀಸಲಾತಿಗೆ ಈ ಪ್ರಮಾಣ ಪತ್ರವನ್ನು ಸಲ್ಲಿಸಿ.',
        'ಸೇವಾ ಸಿಂಧು / ನಾಡಕಚೇರಿ ತಂತ್ರಾಂಶದಲ್ಲಿ ಡಿಜಿಟಲ್ ದೃಢೀಕರಣಕ್ಕಾಗಿ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.',
        'ಶಾಲಾ ಮುಖ್ಯೋಪಾಧ್ಯಾಯರು ಹಾಗೂ ಬಿಇಒ ಕುಮಟಾ ಕೌಂಟರ್‌ಸೈನ್ ಇರುವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.'
      ],
      importantDatesAndDeadlines: [
        'ದಾಖಲಾತಿ ದಿನಾಂಕ: ೦೪-೦೬-೨೦೦೩ (Admission Date: 04-06-2003)',
        'ಶಾಲಾ ಬಿಟ್ಟ ದಿನಾಂಕ: ೧೦-೦೪-೨೦೦೬ (Leaving Date: 10-04-2006)',
        'ಬಿಇಒ ಕೌಂಟರ್‌ಸೈನ್ ದಿನಾಂಕ: ೦೫-೦೪-೨೦೨೨ (BEO Signed: 05-04-2022)'
      ],
      monetaryAmounts: [
        '೫% ಸರ್ಕಾರಿ ಉದ್ಯೋಗ ಮೀಸಲಾತಿ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿವೇತನ (5% Quota & SSP Scholarship Eligible)'
      ]
    },
    translations: {
      english: `GOVERNMENT OF KARNATAKA - EDUCATION DEPARTMENT\nKANNADA MEDIUM STUDY CERTIFICATE\n(Issued in pursuance of Govt Notification No. DPAR 71 SRR 2001 & C&ASR 53 SAHIMA 2007)\n\nThis is to certify that Kumari Kavitha Naik, residing at Hegde village, Kumta taluk, Uttara Kannada, has studied from Class 8 to Class 10 (2003-04 to 2005-06) in Kannada Medium at Gibb Girls High School, Kumta.\n\nAdmission No: 38/2003-04 | Admission Date: 04-06-2003 | Leaving Date: 10-04-2006\n\nOfficial Seals:\n1. Headmaster, Gibb Girls High School, Kumta\n2. Countersigned by Block Education Officer (BEO), Kumta on 05-04-2022\nEligible for 5% Kannada Medium Reservation in Karnataka Civil Services.`,
      hindi: `कर्नाटक सरकार - शिक्षा विभाग\nकन्नड़ माध्यम अध्ययन प्रमाण पत्र\n(सरकारी अधिसूचना संख्या DPAR 71 SRR 2001 के तहत)\n\nप्रमाणित किया जाता है कि कुमारी कविता नायक (हेगड़े गांव, कुमटा) ने गिब गर्ल्स हाई स्कूल कुमटा में कक्षा 8 से 10 तक (2003-04 से 2005-06) कन्नड़ माध्यम में अध्ययन किया है।\n\nप्रवेश संख्या: 38/2003-04 | बीईओ कुमटा द्वारा प्रतिहस्ताक्षरित (05-04-2022)`
    },
    sampleQuestions: [
      { kn: 'ಅಭ್ಯರ್ಥಿ ಯಾವ ಶಾಲೆಯಲ್ಲಿ ಓದಿದ್ದಾರೆ?', en: 'Which school did the candidate attend?' },
      { kn: 'ಯಾವ ತರಗತಿಗಳಿಂದ ಯಾವ ತರಗತಿವರೆಗೆ ವ್ಯಾಸಂಗ ಮಾಡಿದ್ದಾರೆ?', en: 'Which classes were completed in Kannada Medium?' },
      { kn: 'ಶಾಲಾ ಪ್ರವೇಶ ಸಂಖ್ಯೆ (Admission No) ಏನು?', en: 'What is the candidate admission number?' },
      { kn: 'ಬಿಇಒ ಮೇಲ್ಸಹಿ ಮಾಡಿದ ದಿನಾಂಕ ಯಾವುದು?', en: 'When was the certificate countersigned by BEO?' }
    ]
  }
];

