import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  UILanguage, 
  DigitizedDocument, 
  AppSettings, 
  QAMessage 
} from './types';
import { translations } from './i18n/translations';
import { storageService, DEFAULT_SETTINGS } from './services/storageService';
import { 
  digitizeKannadaDocument 
} from './services/ocrService';
import { 
  applyImageFilter, 
  rotateImage, 
  ImageFilterType 
} from './services/imageProcessingService';
import { Header } from './components/Header';
import { DocumentUpload } from './components/DocumentUpload';
import { SplitWorkspace } from './components/SplitWorkspace';
import { DocumentVault } from './components/DocumentVault';
import { LandingPage } from './components/LandingPage';
import { Toast, ToastMessage } from './components/Toast';
import { OutputTabId } from './components/TabbedOutput';
import { sampleDocuments } from './data/sampleDocuments';

export const App: React.FC = () => {
  // Application State
  const [lang, setLang] = useState<UILanguage>(() => {
    return (localStorage.getItem('bhashasetu_lang') as UILanguage) || 'kn';
  });

  const [settings, setSettings] = useState<AppSettings>(() => storageService.getSettings());
  const [activeView, setActiveView] = useState<'overview' | 'workspace' | 'vault'>('overview');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Workspace Document State
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [sampleIdHint, setSampleIdHint] = useState<string | undefined>(undefined);
  const [activeFilter, setActiveFilter] = useState<ImageFilterType>('original');
  const [currentDoc, setCurrentDoc] = useState<DigitizedDocument | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<OutputTabId>('text');

  // Vault count
  const [savedDocsCount, setSavedDocsCount] = useState<number>(
    () => storageService.getDocuments().length
  );

  // Sync language preference
  const toggleLanguage = () => {
    const nextLang: UILanguage = lang === 'en' ? 'kn' : 'en';
    setLang(nextLang);
    localStorage.setItem('bhashasetu_lang', nextLang);
  };

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = 'toast-' + Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdateSettings = (newPartial: Partial<AppSettings>) => {
    const updated = { ...settings, ...newPartial };
    setSettings(updated);
    storageService.saveSettings(updated);
  };

  // Image Selection Handler (from File Upload, Camera, or Sample Presets)
  const handleSelectImage = async (imageDataUrl: string, sampleId?: string) => {
    setCurrentImage(imageDataUrl);
    setOriginalImage(imageDataUrl);
    setSampleIdHint(sampleId);
    setActiveFilter('original');
    setActiveTab('text');

    // Automatically process immediately for smooth 1-click UX
    await triggerOCR(imageDataUrl, sampleId);
  };

  // OCR Processing Execution
  const triggerOCR = async (imgData: string, sampleHint?: string) => {
    setIsProcessing(true);
    try {
      const result = await digitizeKannadaDocument(
        imgData,
        settings.geminiApiKey,
        settings.geminiModel,
        sampleHint
      );

      const newDoc: DigitizedDocument = {
        id: sampleHint || 'doc-' + Date.now(),
        title: result.title,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        imageUrl: imgData,
        rawKannadaText: result.rawKannadaText,
        formattedMarkdownText: result.formattedMarkdownText,
        confidence: result.confidence,
        summary: result.summary,
        translations: result.translations,
        chatHistory: [],
        category: result.category,
        tags: result.tags,
        isSample: !!sampleHint,
        verification: result.verification,
        syncBlocks: result.syncBlocks,
        dynamicEntities: result.dynamicEntities,
        dynamicTables: result.dynamicTables,
        dynamicSchemes: result.dynamicSchemes
      };

      setCurrentDoc(newDoc);
      setActiveTab('text');

      // Celebration Confetti
      try {
        confetti({
          particleCount: 40,
          spread: 55,
          origin: { y: 0.8 },
          colors: ['#18181b', '#52525b', '#10b981']
        });
      } catch {
        // Safe fallback if confetti canvas fails
      }

      addToast(
        lang === 'kn' ? 'ಕನ್ನಡ ದಾಖಲೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಓದಲಾಗಿದೆ!' : 'Kannada document digitized successfully!',
        'success'
      );
    } catch (err: any) {
      console.error('OCR processing error:', err);
      addToast(
        lang === 'kn' ? 'ದಾಖಲೆ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿ ದೋಷ ಸಂಭವಿಸಿದೆ. ಪುನಃ ಪ್ರಯತ್ನಿಸಿ.' : 'Failed to process document. Please try again.',
        'error'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Image Preprocessing Filters
  const handleApplyFilter = async (filter: ImageFilterType) => {
    if (!originalImage) return;
    try {
      setActiveFilter(filter);
      const processed = await applyImageFilter(originalImage, filter);
      setCurrentImage(processed);
      addToast(
        lang === 'kn' ? `ಚಿತ್ರ ಫಿಲ್ಟರ್ ಅನ್ವಯಿಸಲಾಗಿದೆ: ${filter}` : `Filter applied: ${filter}`,
        'info'
      );
    } catch (err) {
      console.error('Filter application error:', err);
    }
  };

  const handleRotate = async (direction: 'left' | 'right') => {
    if (!currentImage) return;
    const deg = direction === 'left' ? -90 : 90;
    try {
      const rotated = await rotateImage(currentImage, deg);
      setCurrentImage(rotated);
      setOriginalImage(rotated);
    } catch (err) {
      console.error('Rotate error:', err);
    }
  };

  const handleResetFilters = () => {
    if (originalImage) {
      setCurrentImage(originalImage);
      setActiveFilter('original');
    }
  };

  // Update text from user edits in Tab 1
  const handleUpdateText = (newText: string) => {
    if (!currentDoc) return;
    setCurrentDoc({
      ...currentDoc,
      rawKannadaText: newText,
      updatedAt: Date.now()
    });
  };

  // Update Q&A messages
  const handleUpdateChatHistory = (messages: QAMessage[]) => {
    if (!currentDoc) return;
    setCurrentDoc({
      ...currentDoc,
      chatHistory: messages,
      updatedAt: Date.now()
    });
  };

  // Save to Vault
  const handleSaveToVault = () => {
    if (!currentDoc) return;
    storageService.addDocument(currentDoc);
    setSavedDocsCount(storageService.getDocuments().length);
    addToast(
      lang === 'kn' ? 'ದಾಖಲೆಯನ್ನು ಭಂಡಾರದಲ್ಲಿ (Vault) ಉಳಿಸಲಾಗಿದೆ!' : 'Document saved to Vault!',
      'success'
    );
  };

  // Check if current doc is saved in vault
  const isSavedInVault = Boolean(
    currentDoc && storageService.getDocuments().some((d) => d.id === currentDoc.id)
  );

  // Open doc from Vault into Workspace
  const handleOpenDocFromVault = (doc: DigitizedDocument) => {
    setCurrentDoc(doc);
    setCurrentImage(doc.imageUrl);
    setOriginalImage(doc.imageUrl);
    setSampleIdHint(doc.id);
    setActiveView('workspace');
    setActiveTab('text');
  };

  const handleChangeDoc = () => {
    setCurrentImage(null);
    setCurrentDoc(null);
    setOriginalImage(null);
    setSampleIdHint(undefined);
  };

  const handleSelectPreset = (sampleId: string) => {
    const preset = sampleDocuments.find((d) => d.id === sampleId);
    if (preset) {
      handleSelectImage(preset.imageSvgDataUrl, preset.id);
    }
  };

  const handleOpenWorkspaceFromLanding = () => {
    setActiveView('workspace');
  };

  const handleTriggerUploadFromLanding = () => {
    setCurrentImage(null);
    setCurrentDoc(null);
    setActiveView('workspace');
  };

  const handleSelectSampleFromLanding = (sampleId: string) => {
    handleSelectPreset(sampleId);
    setActiveView('workspace');
  };

  const handleOpenVaultFromLanding = () => {
    setActiveView('vault');
  };

  const t = translations[lang];

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        settings.highContrastMode
          ? 'bg-black text-yellow-300'
          : 'bg-zinc-50 text-zinc-900 font-sans'
      }`}
    >
      {/* Top Header */}
      <Header
        lang={lang}
        onToggleLang={toggleLanguage}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        activeView={activeView}
        setActiveView={setActiveView}
        savedDocsCount={savedDocsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeView === 'overview' ? (
          <LandingPage
            lang={lang}
            onOpenWorkspace={handleOpenWorkspaceFromLanding}
            onTriggerUpload={handleTriggerUploadFromLanding}
            onSelectSample={handleSelectSampleFromLanding}
            onOpenVault={handleOpenVaultFromLanding}
            savedDocsCount={savedDocsCount}
          />
        ) : activeView === 'vault' ? (
          <DocumentVault
            lang={lang}
            onOpenDoc={handleOpenDocFromVault}
            onDocListChange={() => setSavedDocsCount(storageService.getDocuments().length)}
          />
        ) : currentImage ? (
          <SplitWorkspace
            currentImage={currentImage}
            doc={currentDoc}
            lang={lang}
            fontSize={settings.fontSize}
            activeFilter={activeFilter}
            onApplyFilter={handleApplyFilter}
            onRotate={handleRotate}
            onResetFilters={handleResetFilters}
            onProcess={() => currentImage && triggerOCR(currentImage, sampleIdHint)}
            onChangeDoc={handleChangeDoc}
            isProcessing={isProcessing}
            onUpdateText={handleUpdateText}
            onUpdateChatHistory={handleUpdateChatHistory}
            onSaveToVault={handleSaveToVault}
            isSavedInVault={isSavedInVault}
            apiKey={settings.geminiApiKey}
            modelName={settings.geminiModel}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            activeSampleId={sampleIdHint || (currentDoc?.id?.startsWith('sample-') ? currentDoc.id : undefined)}
            onSelectPreset={handleSelectPreset}
            onUploadImage={(dataUrl) => handleSelectImage(dataUrl, undefined)}
          />
        ) : (
          <DocumentUpload
            lang={lang}
            onSelectImage={handleSelectImage}
            isLoading={isProcessing}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200/70 bg-white/50 py-4 text-center text-xs text-zinc-400 font-medium">
        <p className="font-kannada">
          {lang === 'kn'
            ? 'ಭಾಷಾಸೇತು (BhashaSetu) • ಕನ್ನಡ ದಾಖಲೆ AI ಮತ್ತು OCR'
            : 'BhashaSetu • Kannada Document AI & OCR'}
        </p>
      </footer>

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
};
