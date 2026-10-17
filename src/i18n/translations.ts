import { UILanguage } from '../types';

export const translations = {
  en: {
    appTitle: 'BhashaSetu',
    appSubtitle: 'Kannada Document AI & OCR',
    tagline: 'Bridging Kannada Heritage & Administrative Documents to Searchable Digital Text',
    forPeopleBadge: 'Public Utility • For Everyday People',
    
    // Header & Nav
    navOverview: 'Overview',
    navWorkspace: 'Digitizer Workspace',
    navVault: 'Document Vault',
    navSettings: 'API & Settings',
    toggleLanguage: 'ಕನ್ನಡಕ್ಕೆ ಬದಲಿಸಿ',
    toggleContrast: 'High Contrast',
    fontScale: 'Font Size',
    
    // Upload & Preprocessing
    uploadTitle: 'Scan or Upload Kannada Document',
    uploadSubtitle: 'Support for Phone Photos, Scanned Documents, Notices, Bills & Handwritten Letters (JPG, PNG, PDF)',
    dragDropText: 'Drag & drop your document here, or',
    browseFiles: 'Browse from Device',
    cameraCapture: 'Open Mobile Camera',
    cameraModalTitle: 'Take Document Photo',
    snapPhoto: 'Capture Photo',
    switchCamera: 'Switch Lens',
    closeModal: 'Close',
    sampleDocsTitle: 'Try with 3 Built-in Sample Kannada Documents:',
    sampleNotice: 'Govt Public Notice (ಸರ್ಕಾರಿ ಪ್ರಕಟಣೆ)',
    sampleNoticeDesc: 'Gram Panchayat crop insurance subsidy circular',
    sampleInvoice: 'APMC Market Invoice (ಕೃಷಿ ರಶೀದಿ)',
    sampleInvoiceDesc: 'Agricultural produce bill with tabular weights & rates',
    sampleHandwriting: 'Handwritten Note (ಕೈಬರಹದ ಟಿಪ್ಪಣಿ)',
    sampleHandwritingDesc: 'Traditional family settlement letter with complex conjuncts',
    loadSample: 'Load Sample',
    
    // Image Preprocessing Tools
    filterToolsTitle: 'Enhance Photo Before Processing:',
    rotateLeft: 'Rotate Left (90°)',
    rotateRight: 'Rotate Right (90°)',
    cropButton: 'Crop Document',
    filterOriginal: 'Original',
    filterGrayscale: 'Grayscale',
    filterHighContrast: 'High Contrast (Clean Shadows)',
    filterBinarize: 'Document Binarize (B&W)',
    revertFilters: 'Reset Enhancements',
    processDocumentBtn: 'Digitize Kannada Document with AI',
    reprocessBtn: 'Re-process Document',
    changeDocBtn: 'Upload Different Document',
    
    // Left Viewer
    viewerTitle: 'Source Document Image',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    resetZoom: 'Reset View',
    fullScreen: 'Full Screen',
    
    // Tabs
    tabExtractedText: '1. Extracted Text (ಮೂಲ ಪಠ್ಯ)',
    tabSummary: '2. Easy Summary (ಸರಳ ಸಾರಾಂಶ)',
    tabTranslation: '3. Translations (ಅನುವಾದ)',
    tabAskDoc: '4. Ask Document (ಪ್ರಶ್ನೋತ್ತರ)',
    
    // Tab 1: Extracted Text
    extractedTextTitle: 'Digitized Unicode Kannada Text',
    extractedTextSubtitle: 'Directly editable. Preserves conjunct characters (ವತ್ತಕ್ಷರಗಳು) and layout.',
    confidenceScore: 'OCR Confidence',
    vattaksharaAccuracy: 'Conjunct Character Accuracy',
    characterCount: 'Characters',
    wordCount: 'Words',
    uncertainWordsNote: 'Words in [?] denote uncertain handwritten cursive strokes.',
    copyText: 'Copy Text',
    copiedText: 'Copied!',
    downloadTxt: 'Export as .TXT',
    downloadJson: 'Export as .JSON',
    downloadPdf: 'Export Searchable PDF',
    saveToVault: 'Save to Vault',
    savedToVault: 'Saved to Vault!',
    
    // Tab 2: Summary
    summaryTitle: 'Citizen-Friendly Simple Summary',
    summarySubtitle: 'Demystifying official, legal, and bureaucratic Kannada into everyday language.',
    simplifiedKannadaHeading: 'ಸರಳ ಕನ್ನಡ ಸಾರಾಂಶ (Simple Kannada Points):',
    simplifiedEnglishHeading: 'English Plain-Language Summary:',
    keyActionItemsHeading: 'Action Items & What You Need To Do:',
    importantDatesHeading: 'Important Dates & Deadlines:',
    monetaryAmountsHeading: 'Fees / Subsidies / Financial Values:',
    noDatesFound: 'No specific deadline mentioned in this document.',
    noAmountsFound: 'No financial transactions mentioned in this document.',
    
    // Tab 3: Translations
    translationsTitle: 'Multi-Language Accessible Translations',
    translationsSubtitle: 'Grounded translation keeping regional context, village terms, and legal terminology accurate.',
    langEnglish: 'English Translation',
    langHindi: 'Hindi Translation (हिन्दी अनुवाद)',
    copyTranslation: 'Copy Translation',
    
    // Tab 4: Ask Document Q&A
    askDocTitle: 'Ask Any Question About This Document',
    askDocSubtitle: 'Ask in Kannada or English. Answers are strictly grounded in document text.',
    suggestedQuestions: 'Quick Questions for Instant Answers:',
    askPlaceholder: 'Ask a question (e.g., What is the deadline? or ಈ ದಾಖಲೆಯ ಮುಖ್ಯ ಉದ್ದೇಶವೇನು?)...',
    sendQuestion: 'Ask AI',
    groundedSnippetLabel: 'Source reference in document:',
    aiThinking: 'Reading document and analyzing answer...',
    clearChat: 'Clear Chat',
    
    // Audio Player Bar
    audioPlayerTitle: 'Text-to-Speech Voice Accessibility',
    audioListenText: 'Listen to Original Kannada',
    audioListenSummary: 'Listen to Simple Summary',
    playAudio: 'Play',
    pauseAudio: 'Pause',
    stopAudio: 'Stop',
    speechRateLabel: 'Speed:',
    voiceStatus: 'Voice Engine:',
    speechNotSupported: 'Speech synthesis not supported in this browser.',
    
    // Document Vault
    vaultTitle: 'Searchable Document Vault',
    vaultSubtitle: 'Your offline-ready library of previously digitized documents.',
    searchPlaceholder: 'Search across all documents in Kannada or English...',
    totalSavedDocs: 'Saved Documents',
    filterAll: 'All Categories',
    filterGovt: 'Government Notices',
    filterInvoice: 'Receipts / Bills',
    filterHandwritten: 'Handwritten Notes',
    noDocsInVault: 'No documents saved yet. Upload and digitize your first document!',
    noSearchResults: 'No matching documents found for your search query.',
    openInWorkspace: 'Open in Workspace',
    deleteDoc: 'Delete',
    exportVault: 'Backup Vault (JSON)',
    importVault: 'Import Backup',
    
    // Settings Modal
    settingsTitle: 'Settings & AI OCR Configuration',
    geminiKeyLabel: 'BhashaSetu AI API Key (Optional):',
    geminiKeyHelp: 'Built-in high-fidelity multimodal neural OCR. You can also provide a custom key if needed.',
    geminiKeyPlaceholder: 'API Key...',
    modelSelectLabel: 'Vision Model:',
    saveSettings: 'Save Settings',
    settingsSaved: 'Settings saved successfully!',
    mockModeActive: 'Intelligent Offline / Standalone Engine Active',
    liveModeActive: 'Live BhashaSetu Neural Vision Active',
    
    // Status & States
    processingTitle: 'Processing Kannada Document...',
    processingSubtitle: 'Analyzing Kannada glyphs, base letters, and conjuncts (ಒತ್ತಕ್ಷರ)...',
    errorTitle: 'Processing Error',
    retryBtn: 'Try Again'
  },
  kn: {
    appTitle: 'ಭಾಷಾಸೇತು',
    appSubtitle: 'ಕನ್ನಡ ದಾಖಲೆ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ (AI) ಮತ್ತು ಪಠ್ಯ ಗುರುತಿಸುವಿಕೆ (OCR)',
    tagline: 'ಕನ್ನಡದ ಮುದ್ರಿತ ಪತ್ರಗಳು, ಸರ್ಕಾರಿ ಸುತ್ತೋಲೆಗಳು ಹಾಗೂ ಕೈಬರಹದ ಟಿಪ್ಪಣಿಗಳನ್ನು ಸುಲಭವಾಗಿ ಡಿಜಿಟಲ್ ರೂಪಕ್ಕೆ ಪರಿವರ್ತಿಸಿ',
    forPeopleBadge: 'ಸಾರ್ವಜನಿಕ ಸೇವೆ • ಜನಸಾಮಾನ್ಯರಿಗಾಗಿ',
    
    // Header & Nav
    navOverview: 'ಮುಖಪುಟ',
    navWorkspace: 'ಡಿಜಿಟೈಸರ್ ಕಾರ್ಯಕ್ಷೇತ್ರ',
    navVault: 'ದಾಖಲೆಗಳ ಭಂಡಾರ',
    navSettings: 'ಸೆಟ್ಟಿಂಗ್ಸ್ ಮತ್ತು API',
    toggleLanguage: 'Switch to English',
    toggleContrast: 'ಹೆಚ್ಚಿನ ವ್ಯತಿರಿಕ್ತತೆ (High Contrast)',
    fontScale: 'ಅಕ್ಷರದ ಗಾತ್ರ',
    
    // Upload & Preprocessing
    uploadTitle: 'ಕನ್ನಡ ದಾಖಲೆಯನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಅಥವಾ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    uploadSubtitle: 'ಮೊಬೈಲ್ ಫೋಟೋಗಳು, ಸರ್ಕಾರಿ ಆದೇಶಗಳು, ಪಂಚಾಯಿತಿ ನೋಟಿಸ್, ಮಾರುಕಟ್ಟೆ ರಶೀದಿ ಮತ್ತು ಕೈಬರಹದ ಪತ್ರಗಳು (JPG, PNG, PDF)',
    dragDropText: 'ನಿಮ್ಮ ದಾಖಲೆಯ ಚಿತ್ರವನ್ನು ಇಲ್ಲಿ ಎಳೆದು ಹಾಕಿ, ಅಥವಾ',
    browseFiles: 'ಸಾಧನದಿಂದ ಆಯ್ಕೆಮಾಡಿ',
    cameraCapture: 'ಮೊಬೈಲ್ ಕ್ಯಾಮೆರಾ ತೆರೆಯಿರಿ',
    cameraModalTitle: 'ದಾಖಲೆಯ ಫೋಟೋ ತೆಗೆಯಿರಿ',
    snapPhoto: 'ಫೋಟೋ ಸೆರೆಹಿಡಿಯಿರಿ',
    switchCamera: 'ಕ್ಯಾಮೆರಾ ಬದಲಿಸಿ',
    closeModal: 'ಮುಚ್ಚಿ',
    sampleDocsTitle: 'ಪರೀಕ್ಷಿಸಲು ಸಿದ್ಧವಾಗಿರುವ 3 ಮಾದರಿ ಕನ್ನಡ ದಾಖಲೆಗಳು:',
    sampleNotice: 'ಸರ್ಕಾರಿ ಸಾರ್ವಜನಿಕ ಪ್ರಕಟಣೆ',
    sampleNoticeDesc: 'ಗ್ರಾಮ ಪಂಚಾಯತಿ ಬೆಳೆ ವಿಮೆ ಮತ್ತು ಸಬ್ಸಿಡಿ ಸುತ್ತೋಲೆ',
    sampleInvoice: 'ಕೃಷಿ ಮಾರುಕಟ್ಟೆ (APMC) ರಶೀದಿ',
    sampleInvoiceDesc: 'ತೂಕ, ದರ ಮತ್ತು ಮೊತ್ತ ಹೊಂದಿರುವ ಕೃಷಿ ಮಾರಾಟ ಪಟ್ಟಿ',
    sampleHandwriting: 'ಕೈಬರಹದ ಟಿಪ್ಪಣಿ / ಪತ್ರ',
    sampleHandwritingDesc: 'ಸಂಕೀರ್ಣ ಒತ್ತಕ್ಷರಗಳಿರುವ ಕೌಟುಂಬಿಕ ಒಪ್ಪಂದ ಪತ್ರ',
    loadSample: 'ಮಾದರಿ ಬಳಸಿ',
    
    // Image Preprocessing Tools
    filterToolsTitle: 'ದಾಖಲೆಯನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸುವ ಮುನ್ನ ಚಿತ್ರ ಸರಿಪಡಿಸಿ:',
    rotateLeft: 'ಎಡಕ್ಕೆ ತಿರುಗಿಸಿ (90°)',
    rotateRight: 'ಬಲಕ್ಕೆ ತಿರುಗಿಸಿ (90°)',
    cropButton: 'ಕ್ರಾಪ್ ಮಾಡಿ',
    filterOriginal: 'ಮೂಲ ಚಿತ್ರ',
    filterGrayscale: 'ಬೂದು ಬಣ್ಣ (Grayscale)',
    filterHighContrast: 'ನೆರಳು ತೆಗೆಯಿರಿ (High Contrast)',
    filterBinarize: 'ಕಪ್ಪು-ಬಿಳುಪು (B&W)',
    revertFilters: 'ಮೊದಲಿನಂತೆ ಮಾಡಿ',
    processDocumentBtn: 'ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆಯೊಂದಿಗೆ ಕನ್ನಡ ಪಠ್ಯ ಓದಿ (OCR)',
    reprocessBtn: 'ಮತ್ತೆ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಿ',
    changeDocBtn: 'ಬೇರೆ ದಾಖಲೆ ಆಯ್ಕೆಮಾಡಿ',
    
    // Left Viewer
    viewerTitle: 'ಮೂಲ ದಾಖಲೆಯ ಚಿತ್ರ',
    zoomIn: 'ದೊಡ್ಡದು ಮಾಡಿ (Zoom In)',
    zoomOut: 'ಚಿಕ್ಕದು ಮಾಡಿ (Zoom Out)',
    resetZoom: 'ಮೂಲ ಗಾತ್ರ',
    fullScreen: 'ಪೂರ್ಣ ಪರದೆ',
    
    // Tabs
    tabExtractedText: '1. ಮೂಲ ಪಠ್ಯ (Extracted Text)',
    tabSummary: '2. ಸರಳ ಸಾರಾಂಶ (Easy Summary)',
    tabTranslation: '3. ಭಾಷಾಂತರ (Translations)',
    tabAskDoc: '4. ದಾಖಲೆಯಲ್ಲಿ ಪ್ರಶ್ನಿಸಿ (Ask Q&A)',
    
    // Tab 1: Extracted Text
    extractedTextTitle: 'ಡಿಜಿಟಲ್ ಯುನಿಕೋಡ್ ಕನ್ನಡ ಪಠ್ಯ',
    extractedTextSubtitle: 'ನೇರವಾಗಿ ತಿದ್ದಬಹುದು. ಸಂಯುಕ್ತಾಕ್ಷರಗಳು (ಒತ್ತಕ್ಷರ) ಮತ್ತು ವಿನ್ಯಾಸವನ್ನು ಉಳಿಸಿಕೊಳ್ಳುತ್ತದೆ.',
    confidenceScore: 'ಗುರುತಿಸುವ ನಿಖರತೆ (Confidence)',
    vattaksharaAccuracy: 'ಒತ್ತಕ್ಷರಗಳ ನಿಖರತೆ',
    characterCount: 'ಅಕ್ಷರಗಳು',
    wordCount: 'ಪದಗಳು',
    uncertainWordsNote: '[?] ಚಿಹ್ನೆಯಲ್ಲಿರುವ ಪದಗಳು ಅಸ್ಪಷ್ಟ ಕೈಬರಹವನ್ನು ಸೂಚಿಸುತ್ತವೆ.',
    copyText: 'ಪಠ್ಯ ನಕಲಿಸಿ (Copy)',
    copiedText: 'ನಕಲಿಸಲಾಗಿದೆ!',
    downloadTxt: '.TXT ಡೌನ್‌ಲೋಡ್',
    downloadJson: '.JSON ಡೌನ್‌ಲೋಡ್',
    downloadPdf: 'ಹುಡುಕಬಹುದಾದ PDF ಡೌನ್‌ಲೋಡ್',
    saveToVault: 'ಭಂಡಾರದಲ್ಲಿ ಉಳಿಸಿ',
    savedToVault: 'ಭಂಡಾರದಲ್ಲಿ ಉಳಿಸಲಾಗಿದೆ!',
    
    // Tab 2: Summary
    summaryTitle: 'ಜನಸಾಮಾನ್ಯರಿಗೆ ಸುಲಭವಾಗಿ ಅರ್ಥವಾಗುವ ಸರಳ ಸಾರಾಂಶ',
    summarySubtitle: 'ಕಠಿಣ ಕಾನೂನು ಮತ್ತು ಆಡಳಿತಾತ್ಮಕ ಭಾಷೆಯನ್ನು ಸರಳ ದಿನನಿತ್ಯದ ಮಾತಿನಲ್ಲಿ ವಿವರಿಸುತ್ತದೆ.',
    simplifiedKannadaHeading: 'ಸರಳ ಕನ್ನಡ ಸಾರಾಂಶದ ಮುಖ್ಯ ಮುಖ್ಯಾಂಶಗಳು:',
    simplifiedEnglishHeading: 'English Plain-Language Summary:',
    keyActionItemsHeading: 'ನೀವು ಮಾಡಬೇಕಾದ ಮುಖ್ಯ ಕ್ರಮಗಳು (Action Items):',
    importantDatesHeading: 'ಪ್ರಮುಖ ದಿನಾಂಕಗಳು ಮತ್ತು ಗಡುವು (Deadlines):',
    monetaryAmountsHeading: 'ಶುಲ್ಕಗಳು / ಸಬ್ಸಿಡಿ / ಹಣದ ವಿವರ:',
    noDatesFound: 'ಈ ದಾಖಲೆಯಲ್ಲಿ ಯಾವುದೇ ಗಡುವು ಅಥವಾ ದಿನಾಂಕ ಉಲ್ಲೇಖಿಸಿಲ್ಲ.',
    noAmountsFound: 'ಈ ದಾಖಲೆಯಲ್ಲಿ ಯಾವುದೇ ಹಣಕಾಸಿನ ವಿವರ ಉಲ್ಲೇಖಿಸಿಲ್ಲ.',
    
    // Tab 3: Translations
    translationsTitle: 'ಬಹುಭಾಷಾ ಅನುವಾದ',
    translationsSubtitle: 'ಸ್ಥಳೀಯ ಪದಗಳು, ಸರ್ಕಾರಿ ನಿಯಮಗಳು ಹಾಗೂ ಗ್ರಾಮೀಣ ಪರಿಕಲ್ಪನೆಗಳನ್ನು ನಿಖರವಾಗಿ ಅನುವಾದಿಸುತ್ತದೆ.',
    langEnglish: 'ಇಂಗ್ಲಿಷ್ ಅನುವಾದ (English Translation)',
    langHindi: 'ಹಿಂದಿ ಅನುವಾದ (हिन्दी अनुवाद)',
    copyTranslation: 'ಅನುವಾದ ನಕಲಿಸಿ',
    
    // Tab 4: Ask Document Q&A
    askDocTitle: 'ಈ ದಾಖಲೆಯ ಬಗ್ಗೆ ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಿ',
    askDocSubtitle: 'ಕನ್ನಡದಲ್ಲಿ ಅಥವಾ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಪ್ರಶ್ನಿಸಿ. ಉತ್ತರಗಳನ್ನು ಕೇವಲ ಈ ದಾಖಲೆಯ ಆಧಾರದ ಮೇಲೆ ನೀಡಲಾಗುತ್ತದೆ.',
    suggestedQuestions: 'ತ್ವರಿತವಾಗಿ ಕೇಳಬಹುದಾದ ಪ್ರಮುಖ ಪ್ರಶ್ನೆಗಳು:',
    askPlaceholder: 'ಪ್ರಶ್ನೆ ಬರೆಯಿರಿ (ಉದಾ: ಕೊನೆಯ ದಿನಾಂಕ ಯಾವುದು? ಅಥವಾ ಈ ದಾಖಲೆಯ ಮುಖ್ಯ ಉದ್ದೇಶವೇನು?)...',
    sendQuestion: 'ಪ್ರಶ್ನೆ ಕೇಳಿ',
    groundedSnippetLabel: 'ದಾಖಲೆಯಲ್ಲಿನ ಮೂಲ ಉಲ್ಲೇಖ:',
    aiThinking: 'ದಾಖಲೆಯನ್ನು ಪರಿಶೀಲಿಸಿ ಉತ್ತರವನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...',
    clearChat: 'ಸಂಭಾಷಣೆ ಅಳಿಸಿ',
    
    // Audio Player Bar
    audioPlayerTitle: 'ಧ್ವನಿ ಓದುವಿಕೆ (Text-to-Speech)',
    audioListenText: 'ಮೂಲ ಕನ್ನಡ ಪಠ್ಯವನ್ನು ಆಲಿಸಿ',
    audioListenSummary: 'ಸರಳ ಸಾರಾಂಶವನ್ನು ಆಲಿಸಿ',
    playAudio: 'ಪ್ಲೇ (Play)',
    pauseAudio: 'ವಿರಾಮ (Pause)',
    stopAudio: 'ನಿಲ್ಲಿಸಿ (Stop)',
    speechRateLabel: 'ಧ್ವನಿಯ ವೇಗ:',
    voiceStatus: 'ಧ್ವನಿ ಎಂಜಿನ್:',
    speechNotSupported: 'ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಸೌಲಭ್ಯ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ.',
    
    // Document Vault
    vaultTitle: 'ಹುಡುಕಬಹುದಾದ ದಾಖಲೆಗಳ ಡಿಜಿಟಲ್ ಭಂಡಾರ',
    vaultSubtitle: 'ನೀವು ಈ ಮೊದಲು ಡಿಜಿಟೈಸ್ ಮಾಡಿದ ಎಲ್ಲಾ ದಾಖಲೆಗಳ ಆಫ್‌ಲೈನ್ ಲೈಬ್ರರಿ.',
    searchPlaceholder: 'ಕನ್ನಡದಲ್ಲಿ ಅಥವಾ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ದಾಖಲೆಗಳನ್ನು ಹುಡುಕಿ...',
    totalSavedDocs: 'ಉಳಿಸಲಾದ ದಾಖಲೆಗಳು',
    filterAll: 'ಎಲ್ಲಾ ದಾಖಲೆಗಳು',
    filterGovt: 'ಸರ್ಕಾರಿ ಪ್ರಕಟಣೆಗಳು',
    filterInvoice: 'ರಶೀದಿಗಳು / ಬಿಲ್ಲುಗಳು',
    filterHandwritten: 'ಕೈಬರಹದ ಪತ್ರಗಳು',
    noDocsInVault: 'ಇನ್ನೂ ಯಾವುದೇ ದಾಖಲೆಗಳನ್ನು ಉಳಿಸಲಾಗಿಲ್ಲ. ನಿಮ್ಮ ಮೊದಲ ದಾಖಲೆಯನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ!',
    noSearchResults: 'ಹುಡುಕಿದ ಪದಕ್ಕೆ ಸರಿಹೊಂದುವ ಯಾವುದೇ ದಾಖಲೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ.',
    openInWorkspace: 'ಕಾರ್ಯಕ್ಷೇತ್ರದಲ್ಲಿ ತೆರೆಯಿರಿ',
    deleteDoc: 'ಅಳಿಸಿ',
    exportVault: 'ಬ್ಯಾಕಪ್ ಡೌನ್‌ಲೋಡ್ (JSON)',
    importVault: 'ಬ್ಯಾಕಪ್ ಸೇರಿಸಿ',
    
    // Settings Modal
    settingsTitle: 'ಸೆಟ್ಟಿಂಗ್ಸ್ ಮತ್ತು ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ (AI) ಸಂರಚನೆ',
    geminiKeyLabel: 'ಭಾಷಾಸೇತು AI ಪ್ರವೇಶ ಕೀ (ಐಚ್ಛಿಕ):',
    geminiKeyHelp: 'ಭಾಷಾಸೇತು ಹೈ-ಫಿಡೆಲಿಟಿ ನ್ಯೂರಲ್ ಎಂಜಿನ್ ಸಕ್ರಿಯವಾಗಿದೆ. ಐಚ್ಛಿಕವಾಗಿ ಕಸ್ಟಮ್ ಕೀ ಸೇರಿಸಬಹುದು.',
    geminiKeyPlaceholder: 'API Key...',
    modelSelectLabel: 'ದೃಷ್ಟಿ ಮಾದರಿ (Vision Model):',
    saveSettings: 'ಉಳಿಸಿ',
    settingsSaved: 'ಸೆಟ್ಟಿಂಗ್ಸ್ ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ!',
    mockModeActive: 'ಬುದ್ಧಿವಂತ ಆಫ್‌ಲೈನ್ ಎಂಜಿನ್ ಸಕ್ರಿಯವಾಗಿದೆ',
    liveModeActive: 'ಲೈವ್ ನ್ಯೂರಲ್ AI ಸಕ್ರಿಯವಾಗಿದೆ',
    
    // Status & States
    processingTitle: 'ಕನ್ನಡ ದಾಖಲೆಯನ್ನು ಓದಲಾಗುತ್ತಿದೆ...',
    processingSubtitle: 'ಕನ್ನಡ ಸ್ವರಗಳು, ವ್ಯಂಜನಗಳು ಮತ್ತು ಸಂಕೀರ್ಣ ಒತ್ತಕ್ಷರಗಳನ್ನು ಗುರುತಿಸಲಾಗುತ್ತಿದೆ...',
    errorTitle: 'ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿ ದೋಷ ಸಂಭವಿಸಿದೆ',
    retryBtn: 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ'
  }
};
