# BhashaSetu (ಭಾಷಾಸೇತು): Universal Kannada Document AI & Vision Intelligence

> **Empowering Everyday Citizens & Bridging the Digital Divide:** Transforming complex Kannada administrative circulars, land records (RTC/Pahani), court petitions, APMC mandi receipts, handwritten family deeds, and study certificates into 100% orthographically accurate, searchable, and voice-accessible digital knowledge.

[![Live Web Application](https://img.shields.io/badge/Live%20Demo-Vercel-success?style=for-the-badge&logo=vercel)](https://bhasha-setu-three.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Saish--patil03%2FBhashaSetu-blue?style=for-the-badge&logo=github)](https://github.com/Saish-patil03/BhashaSetu)
[![Kannada Orthography](https://img.shields.io/badge/Kannada%20Accuracy-Near--100%25%20NFC-orange?style=for-the-badge)](https://bhasha-setu-three.vercel.app)

---

## 🎯 The Problem & Civic Impact

Over 50 million Kannada speakers interact daily with government, judicial, educational, and agricultural paperwork. However:
1. **Low OCR Quality on Indic Scripts:** Standard OCR engines frequently hallucinate stray Latin letters (`L`, `I`, `Z`, `on`), misread the Kannada numeral `೧` (one) as `0` (zero), and chop minute subscript conjuncts (*Vattaksharas* / ಒತ್ತಕ್ಷರಗಳು) and vowel signs (*Gunithaksharas*).
2. **Bureaucratic Inaccessibility:** Citizens struggle to decode complex administrative jargon, understand critical deadlines, and identify matching welfare schemes.
3. **Privacy & Security Concerns:** Sensitive paper documents contain Aadhaar numbers, phone numbers, and land survey figures that need redaction before public submission.

**BhashaSetu** solves this end-to-end with a multimodal Vision LLM pipeline, deterministic post-processing sanitizers, and citizen-first accessibility tools.

---

## 🌟 Core Architecture & Hackathon Highlights

```
                                  +-----------------------------------------+
                                  |    Uploaded Kannada Document (Image)    |
                                  +-----------------------------------------+
                                                       |
                       +-------------------------------+-------------------------------+
                       |                                                               |
                       v                                                               v
      [Adaptive Contrast Pre-Processing]                               [Tile-Grid Luminance Analyzer]
       • Min 1500px-2048px Resolution                                   • Removes Stamp Tint & Grain
       • Lossless PNG WebP Pipeline                                     • Zero Blotting on Conjuncts
                       |                                                               |
                       +-------------------------------+-------------------------------+
                                                       |
                                                       v
                                  [Universal Vision LLM Extraction Engine]
                                   • Zero Stray Latin Noise & Numeral Precision
                                   • Preserves Blank Underlines (______ /2010)
                                   • Stamp & Signature Tagging ([Seal], [Sign])
                                   • Two-Pass Verification & Sync Blocks Schema
                                                       |
                                                       v
                                  [Deterministic Kannada Sanitizer Pipeline]
                                   • Canonical NFC Unicode Normalization
                                   • Numeral Recovery (e.g., 02,50,000 -> ೧೨,50,000)
                                   • List Marker Auto-Alignment (1., 2., 3.)
                                   • Watermark & Guilloche Noise Stripping
                                                       |
                       +-------------------------------+-------------------------------+
                       |                               |                               |
                       v                               v                               v
            [Interactive Split Viewer]      [Structured Intelligence]        [Citizen Welfare Bridge]
             • Bounding Box Sync             • Dynamic Key-Value Pairs        • Karnataka DBT Matcher
             • HITL Confidence Heatmap       • Markdown Table Extractor       • KPSC 5% Quota, PM-KISAN
             • 1-Click PII Redaction         • Civic Action Checklist         • Seva Sindhu / Kaveri 2.0
             • Multi-Format Export (.pdf)    • Plain Kannada Summary          • NudiMitra Voice AI Assistant
```

---

## 🚀 Key Features

### 1. Completely Document-Agnostic & Universal
Unlike rigid demo templates, BhashaSetu dynamically classifies and analyzes **ANY unknown Kannada document** uploaded via drag-and-drop or mobile phone camera:
- **Court Petitions & Legal Dockets:** Extracts plaintiffs (*ವಾದಿಗಳು*), defendants (*ಪ್ರತಿವಾದಿಗಳು*), case dockets, and suit numbers (*ಮೂಲ.ದಾ.ಸಂ.*).
- **Revenue Land Records (RTC / Pahani):** Extracts survey numbers, land extents in Acre & Gunta, and mutation references.
- **Commercial & APMC Mandi Invoices:** Extracts produce itemization (Paddy, Ragi), bags, rates, and net payouts.
- **Government Orders & Circulars:** Detects issuing departments, eligibility criteria, and submission deadlines.
- **Academic & Study Certificates:** Verifies school enrollment, years, instruction medium, and BEO counter-signatures.
- **Handwritten Notes:** Transcribes cursive Kannada with uncertainty markers (`[?]`).

### 2. Interactive Split-Screen Layout Synchronization
- Clicking any extracted section in the workspace smoothly highlights and outlines the corresponding visual region on the physical document image, and vice-versa.
- Real-time zoom, pan, rotation, and high-contrast filters for inspection.

### 3. Human-in-the-Loop (HITL) Interactive Confidence Heatmap
- Visualizes word-by-word OCR confidence: **Green (>90%)**, **Amber (70-90%)**, and **Red (<70% / Uncertain)**.
- Clicking any word opens an instant popover with 3 context-aware Kannada AI character alternatives for 1-click correction.

### 4. Direct Welfare Scheme Matcher (Karnataka DBT)
- Automatically evaluates extracted citizen profiles against official Karnataka government welfare programs:
  - **KPSC & KEA 5% Kannada Medium Horizontal Quota** (DPAR 71 SRR 2001)
  - **PM-KISAN Samman Nidhi & Raitha Siri** (₹6,000 - ₹10,000/ha DBT)
  - **Karnataka Kharif Monsoon Drought Relief**
  - **Ayushman Bharat - Arogya Karnataka (AB-ArK)**
  - **Bhoomi Portal Land Partition & Mutation Service**
  - **Seva Sindhu & Sakala Time-Bound Citizen Delivery**

### 5. NudiMitra Voice AI Assistant (Speech-to-Speech)
- Built-in regional voice assistant enabling illiterate citizens or rural farmers to speak their questions in Kannada and listen to grounded answers.
- Text-to-Speech (TTS) audio playback bar with speed controls (0.75x, 1.0x, 1.25x).

### 6. PII Privacy Redaction & Multi-Format Export
- **1-Click PII Redaction:** Automatically masks Aadhaar numbers, phone numbers, and financial details for privacy compliance.
- **Multi-Format Exports:**
  - Plain Text (`.txt`)
  - Structured Metadata Schema (`.json`)
  - **Searchable PDF:** Generates a dual-layer PDF embedding the digitized Kannada text underneath the original document image.
  - CSV Export for tabular records.

### 7. Encrypted Local Document Vault
- Offline-capable IndexedDB/LocalStorage storage with instant bilingual full-text search across past documents.

---

## 💻 Tech Stack

- **Frontend & UI:** React 18, TypeScript, Tailwind CSS, Lucide Icons, Canvas Confetti
- **Vision Intelligence:** Google Gemini Multimodal Vision API (`gemini-2.5-flash` / `gemini-1.5-flash`)
- **Offline OCR Fallback:** Tesseract.js client-side Indic Kannada engine
- **Image Processing:** HTML5 Canvas adaptive contrast binarization & high-resolution upscaling
- **Speech & Audio:** Web Speech API (SpeechSynthesis & SpeechRecognition for `kn-IN`)
- **Build & Deployment:** Vite 5, Vercel Edge Hosting, PWA Service Worker

---

## 🏃 Quick Start (Local Setup)

```bash
# Clone the repository
git clone https://github.com/Saish-patil03/BhashaSetu.git

# Navigate into project directory
cd BhashaSetu

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Environment Configuration (Optional)
To use live Vision API calls, configure your API key in `.env.local` or directly within the in-app **Settings (⚙️) modal**:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_GEMINI_MODEL=gemini-2.5-flash
```
*Note: If no API key is provided, BhashaSetu seamlessly operates in intelligent offline demonstration mode with the 5 pre-loaded realistic official documents.*

---

## 🏆 Hackathon Demonstration Flow

1. **Preset Document Showcase:**
   - Click any of the 5 built-in demo cards (e.g. *Study Certificate* or *APMC Invoice*).
   - Watch the interactive split-screen viewer highlight synced bounding boxes.
   - Switch to **Confidence Heatmap** to demonstrate HITL correction.
   - Switch to **Scheme Matcher** to showcase 100% matched Karnataka welfare entitlements.
2. **Universal Live Upload Test:**
   - Upload any unknown Kannada document (court filing, RTC, receipt, or handwritten note).
   - Observe the dynamic classification, auto-extracted authority/district, and verified dates/amounts.
   - Test **PII Redaction** and download the **Searchable PDF**.
   - Trigger **NudiMitra Voice Assistant** and ask a question in Kannada.

---

## 📄 License & Attribution

Built with ❤️ for Karnataka citizens. Open-source under the MIT License.
