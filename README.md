# BhashaSetu (ಭಾಷಾಸೇತು): Kannada Document AI & OCR
> **Empowering Everyday Citizens:** Converting Kannada notices, agricultural invoices, handwritten family letters, and official circulars into searchable, accessible digital text.
## Have A Look 
https://bhasha-setu-three.vercel.app
---

## 🌟 Key Features & Accessibility UX ("For the People")

### 1. Bilingual Interface (English & ಕನ್ನಡ)
- Instant 1-click toggle between **English** and **Kannada (ಕನ್ನಡ)** across the entire user experience.
- Authentic regional terminology crafted for everyday people, farmers, village citizens, and administrators.
- Google Fonts **`Noto Sans Kannada`** and **`Inter`** with customized line-heights and breathing room to prevent conjunct character clipping (*Vattaksharas* / ಒತ್ತಕ್ಷರಗಳು).
- High-Contrast viewing mode and Font Scaling (A / A+ / A++) for low-vision and outdoor sunlight usage.

### 2. Smart Document Input & Client-Side Preprocessing
- **Drag-and-Drop & Multi-Format:** Support for JPG, PNG, WEBP, and PDF documents.
- **Direct Mobile Camera Capture:** Dedicated camera viewfinder modal with alignment frames and direct camera input fallback for mobile phones.
- **Client-Side Canvas Enhancements:**
  - **Rotate (90° Left / Right):** Fix orientations of mobile snapshots.
  - **High Contrast / Clean Shadows Filter:** Removes uneven shadow gradients common in phone photos of physical papers.
  - **Grayscale & Binarize Filters:** Sharpens ink strokes against paper for maximum OCR fidelity.
- **3 Built-in Sample Kannada Documents (1-Click Hackathon Testing):**
  1. **Government Public Notice (ಸರ್ಕಾರಿ ಸಾರ್ವಜನಿಕ ಪ್ರಕಟಣೆ):** Halebidu Gram Panchayat drought relief subsidy circular.
  2. **APMC Agricultural Market Invoice (ಕೃಷಿ ಮಾರುಕಟ್ಟೆ ರಶೀದಿ):** Itemized Mandya APMC receipt with Grade-A paddy & ragi weights and net payout.
  3. **Handwritten Family Agreement (ಕೈಬರಹದ ಒಪ್ಪಂದ ಪತ್ರ):** Traditional cursive agreement with well-water rotation and marked cursive uncertainties (`[?]`).

### 3. Split-Screen Digitization Workspace
- **Left Panel:** Interactive high-resolution viewer with Zoom In/Out, 1:1 Reset, Pan-dragging, and Fullscreen inspection mode.
- **Right Panel (Tabbed Output):**
  - **Tab 1: Extracted Text (ಮೂಲ ಪಠ್ಯ):** Directly editable Unicode Kannada text with confidence scores, character/word counters, uncertain cursive markers `[?]`, 1-click copy, and multi-format exports (`.txt`, `.json`, and searchable `.pdf`).
  - **Tab 2: Easy Summary & Simplification (ಸರಳ ಸಾರಾಂಶ):** Demystifies bureaucratic and legal Kannada into plain-language bullet points (in Kannada & English), actionable next steps, deadlines, and monetary amounts.
  - **Tab 3: Multi-Language Translation (ಅನುವಾದ):** Grounded translations into English and Hindi with side-by-side or stacked view.
  - **Tab 4: Ask the Document (Q&A) (ಪ್ರಶ್ನೋತ್ತರ):** Interactive chat grounded in the document with 4 suggested questions (e.g., "ಕೊನೆಯ ದಿನಾಂಕ ಯಾವುದು?", "ರೈತರಿಗೆ ಸಿಗುವ ಒಟ್ಟು ಹಣ ಎಷ್ಟು?") and document citation snippets.

### 4. Audio Accessibility (Text-to-Speech)
- Integrated Web Speech API (`kn-IN` Kannada voice engine, fallback to Indian English/Hindi).
- Play, Pause, Resume, Stop controls with speed settings (0.75x, 1.0x, 1.25x).
- Switch between listening to full original Kannada text or the citizen summary.

### 5. Searchable Document Vault (Local History)
- Offline-ready LocalStorage / IndexedDB persistence.
- **Global Search Bar:** Full-text instant search across all documents using either Kannada script or English terms with matched snippet previews.
- Category filtering, JSON backup export, and backup import.

---

## 🛠️ Multimodal AI Prompting Strategy (`ocrService.ts`)

BhashaSetu is configured with a specialized Multimodal Vision system prompt optimized for South Indian scripts:
- **Base vs Conjunct Accuracy:** Distinguishes base consonants (*Vyanjanagalu*), independent vowels (*Swaragalu*), and complex subscript conjuncts (*Vattaksharas*, e.g., ರ್ಕ, ಷ್ಟ, ತ್ತ್ವ, ಂದ್ಯ, ಣ್ಣ, ಶ್ಚ).
- **Layout Retention:** Emits structured Markdown retaining official headers, tabular columns, serial numbers, and signature blocks.
- **Cursive Uncertainty Notation:** Flags ambiguous cursive strokes in brackets with a question mark (e.g., `[ಸರ್ವೆ ನಂ?]`).
- **Live Gemini API or Offline Demo:** Accepts any Gemini API key via the in-app Settings modal; runs gracefully in offline mock mode without requiring an API key.

---

