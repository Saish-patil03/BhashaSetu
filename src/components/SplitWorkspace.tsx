import React, { useState } from 'react';
import { DigitizedDocument, UILanguage, QAMessage, OCREngineMode } from '../types';
import { translations } from '../i18n/translations';
import { ImageViewer } from './ImageViewer';
import { TabbedOutput, OutputTabId } from './TabbedOutput';
import { ImageToolbar } from './ImageToolbar';
import { AudioPlayerBar } from './AudioPlayerBar';
import { ImageFilterType } from '../services/imageProcessingService';
import { OCREngineModeSelector } from './extensions/OCREngineModeSelector';
import { PipelineTelemetryDashboard } from './extensions/PipelineTelemetryDashboard';
import { CitizenVoiceAssistant } from './extensions/CitizenVoiceAssistant';
import { LayoutBlockId, parseDocumentIntoSyncBlocks } from '../services/layoutSyncService';

interface SplitWorkspaceProps {
  currentImage: string;
  doc: DigitizedDocument | null;
  lang: UILanguage;
  fontSize: 'normal' | 'large' | 'xlarge';
  activeFilter: ImageFilterType;
  onApplyFilter: (filter: ImageFilterType) => void;
  onRotate: (direction: 'left' | 'right') => void;
  onResetFilters: () => void;
  onProcess: () => void;
  onChangeDoc: () => void;
  isProcessing: boolean;
  onUpdateText: (text: string) => void;
  onUpdateChatHistory: (messages: QAMessage[]) => void;
  onSaveToVault: () => void;
  isSavedInVault: boolean;
  apiKey?: string;
  modelName: string;
  activeTab?: OutputTabId;
  onTabChange?: (tab: OutputTabId) => void;
  activeSampleId?: string;
  onSelectPreset?: (sampleId: string) => void;
  onUploadImage?: (dataUrl: string) => void;
}

export const SplitWorkspace: React.FC<SplitWorkspaceProps> = ({
  currentImage,
  doc,
  lang,
  fontSize,
  activeFilter,
  onApplyFilter,
  onRotate,
  onResetFilters,
  onProcess,
  onChangeDoc,
  isProcessing,
  onUpdateText,
  onUpdateChatHistory,
  onSaveToVault,
  isSavedInVault,
  apiKey,
  modelName,
  activeTab,
  onTabChange,
  activeSampleId,
  onSelectPreset,
  onUploadImage
}) => {
  const t = translations[lang];
  const [engineMode, setEngineMode] = useState<OCREngineMode>(() => {
    if (doc?.category === 'handwritten_note') return 'handwritten';
    return 'printed';
  });
  const [showModernAdaptation, setShowModernAdaptation] = useState(false);
  const [syncLayout, setSyncLayout] = useState(true);
  const [activeBlockId, setActiveBlockId] = useState<LayoutBlockId | null>(null);

  const syncBlocks = (doc?.syncBlocks && doc.syncBlocks.length > 0)
    ? doc.syncBlocks
    : (doc ? parseDocumentIntoSyncBlocks(doc.rawKannadaText, activeSampleId || doc.id) : []);

  return (
    <div className="space-y-5 max-w-7xl mx-auto animate-fadeIn pb-12">
      {/* Specialized OCR Engine Mode Selector (Printed / Handwritten / Halegannada) */}
      <OCREngineModeSelector
        mode={engineMode}
        onChangeMode={setEngineMode}
        lang={lang}
        showModernAdaptation={showModernAdaptation}
        onToggleModernAdaptation={setShowModernAdaptation}
        rawText={doc?.rawKannadaText}
      />

      {/* Preprocessing Toolbar */}
      <ImageToolbar
        lang={lang}
        activeFilter={activeFilter}
        onApplyFilter={onApplyFilter}
        onRotate={onRotate}
        onReset={onResetFilters}
        onProcess={onProcess}
        onChangeDoc={onChangeDoc}
        isProcessing={isProcessing}
        hasExtractedText={!!doc}
        syncLayout={syncLayout}
        onToggleSyncLayout={() => setSyncLayout(!syncLayout)}
        activeSampleId={activeSampleId}
        onSelectPreset={onSelectPreset}
        onUploadImage={onUploadImage}
      />

      {/* Split-Screen Workspace Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Panel: Interactive Image Viewer (Col 1 to 5 or 6) */}
        <div className="lg:col-span-5 space-y-4">
          <ImageViewer
            imageUrl={currentImage}
            lang={lang}
            altText={doc?.title || 'Kannada Document'}
            syncLayout={syncLayout}
            onToggleSyncLayout={() => setSyncLayout(!syncLayout)}
            activeBlockId={activeBlockId}
            onSelectBlock={setActiveBlockId}
            activeSampleId={activeSampleId}
            onSelectPreset={onSelectPreset}
            onUploadImage={onUploadImage}
            syncBlocks={syncBlocks}
          />
        </div>

        {/* Right Panel: Tabbed Output (Col 6 to 12) */}
        <div className="lg:col-span-7 space-y-4">
          {isProcessing ? (
            <div className="bg-white rounded-2xl border border-zinc-200/80 p-12 text-center space-y-4 shadow-xs h-[540px] flex flex-col items-center justify-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-zinc-200 border-t-zinc-900 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center font-kannada font-bold text-zinc-900 text-lg">
                  ಭಾ
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-zinc-900 font-kannada">
                  {t.processingTitle}
                </h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  {t.processingSubtitle}
                </p>
              </div>
            </div>
          ) : doc ? (
            <div className="space-y-4">
              <TabbedOutput
                key={doc.id}
                doc={doc}
                onUpdateText={onUpdateText}
                onUpdateChatHistory={onUpdateChatHistory}
                onSaveToVault={onSaveToVault}
                isSavedInVault={isSavedInVault}
                apiKey={apiKey}
                modelName={modelName}
                lang={lang}
                fontSize={fontSize}
                activeTab={activeTab}
                onTabChange={onTabChange}
                syncLayout={syncLayout}
                activeBlockId={activeBlockId}
                onSelectBlock={setActiveBlockId}
              />

              {/* Accessible Text-to-Speech Player Bar */}
              <AudioPlayerBar
                doc={doc}
                lang={lang}
              />
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-zinc-300 p-12 text-center space-y-3 h-[540px] flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-2xl bg-zinc-100 text-zinc-800 flex items-center justify-center mx-auto border border-zinc-200">
                <span className="font-kannada font-bold text-2xl">ಅ</span>
              </div>
              <h3 className="font-bold text-base text-zinc-900 font-kannada">
                {lang === 'kn' ? 'ದಾಖಲೆಯನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲು ಸಿದ್ಧವಾಗಿದೆ' : 'Ready to Digitize Document'}
              </h3>
              <p className="text-xs text-zinc-500 max-w-sm">
                {lang === 'kn'
                  ? 'ಚಿತ್ರವನ್ನು ಸರಿಪಡಿಸಿದ ನಂತರ ಮೇಲೆ ನೀಡಿರುವ "ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆಯೊಂದಿಗೆ ಕನ್ನಡ ಪಠ್ಯ ಓದಿ (OCR)" ಬಟನ್ ಒತ್ತಿ.'
                  : 'Click the "Digitize Kannada Document with AI" button above to transcribe text, generate summary, and enable audio.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Live Pipeline Telemetry & Impact Benchmarks (Section below workspace) */}
      {doc && !isProcessing && (
        <PipelineTelemetryDashboard
          doc={doc}
          lang={lang}
          isProcessing={isProcessing}
        />
      )}

      {/* Floating Spoken Kannada Voice Assistant ("ಧ್ವನಿ ಮಿತ್ರ") */}
      {doc && !isProcessing && (
        <CitizenVoiceAssistant
          doc={doc}
          lang={lang}
          apiKey={apiKey}
          modelName={modelName}
          onUpdateChatHistory={onUpdateChatHistory}
        />
      )}
    </div>
  );
};
