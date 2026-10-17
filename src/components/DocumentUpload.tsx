import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Camera, 
  FileText, 
  Receipt, 
  PenTool, 
  Sparkles,
  ArrowRight,
  Activity
} from 'lucide-react';
import { UILanguage, SampleDocPreset } from '../types';
import { translations } from '../i18n/translations';
import { sampleDocuments } from '../data/sampleDocuments';
import { CameraModal } from './CameraModal';

interface DocumentUploadProps {
  lang: UILanguage;
  onSelectImage: (imageDataUrl: string, sampleId?: string) => void;
  isLoading: boolean;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  lang,
  onSelectImage,
  isLoading
}) => {
  const t = translations[lang];
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const nativeCameraInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    readFile(file);
  };

  const readFile = (file: File) => {
    // If PDF, we can notify or read as data URL
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      onSelectImage(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      readFile(file);
    }
  };

  const handleSampleClick = (sample: SampleDocPreset) => {
    onSelectImage(sample.imageSvgDataUrl, sample.id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Hero Header */}
      <div className="text-center space-y-2 pt-2">
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-kannada">
          {t.uploadTitle}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-medium">
          {t.uploadSubtitle}
        </p>
      </div>

      {/* Primary Upload Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-10 transition-all duration-200 text-center cursor-pointer ${
          isDragging
            ? 'border-zinc-900 bg-zinc-100/70 scale-[1.005]'
            : 'border-zinc-300/80 bg-white hover:border-zinc-400 hover:bg-zinc-50/50 shadow-xs'
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,application/pdf"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Hidden native camera capture input for phones */}
        <input
          ref={nativeCameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="flex flex-col items-center justify-center space-y-3.5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-zinc-100 text-zinc-800 flex items-center justify-center border border-zinc-200/80 shadow-2xs group-hover:scale-105 transition-transform">
            <Upload className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2]" />
          </div>

          <div className="space-y-1">
            <p className="text-sm sm:text-base font-semibold text-zinc-900">
              {t.dragDropText}
            </p>
            <p className="text-xs text-zinc-400">
              JPG, PNG, WEBP, PDF (Max 15MB) • Phone snapshots supported
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs sm:text-sm font-medium shadow-xs flex items-center gap-2 active:scale-95 transition-all"
            >
              <Upload className="w-4 h-4 text-zinc-400" />
              <span>{t.browseFiles}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                // If mobile device, trigger native camera or open modal
                if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                  nativeCameraInputRef.current?.click();
                } else {
                  setIsCameraOpen(true);
                }
              }}
              className="px-4 py-2 rounded-lg bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-200 text-xs sm:text-sm font-medium shadow-2xs flex items-center gap-2 active:scale-95 transition-all"
            >
              <Camera className="w-4 h-4 text-zinc-500" />
              <span>{t.cameraCapture}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Built-in Sample Kannada Documents (Hackathon Judges & 1-Click Testing) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-zinc-500" />
            <h3 className="text-sm sm:text-base font-semibold text-zinc-900">
              {t.sampleDocsTitle}
            </h3>
          </div>
          <span className="text-xs font-medium text-zinc-400 hidden sm:inline">
            1-Click Test Demo
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {sampleDocuments.map((sample) => {
            const isNotice = sample.category === 'government_notice';
            const isInvoice = sample.category === 'financial_receipt';
            const isHandwritten = sample.category === 'handwritten_note';
            const Icon = isNotice ? FileText : isInvoice ? Receipt : isHandwritten ? PenTool : Activity;

            return (
              <div
                key={sample.id}
                onClick={() => handleSampleClick(sample)}
                className="group relative bg-white border border-zinc-200/80 hover:border-zinc-400 rounded-xl p-4 sm:p-4.5 shadow-xs hover:shadow-sm transition-all duration-150 cursor-pointer flex flex-col justify-between text-left"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-zinc-100 text-zinc-800 border border-zinc-200/70">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-md border bg-zinc-50 text-zinc-600 border-zinc-200/80">
                      {sample.category.replace('_', ' ')}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-zinc-900 group-hover:text-zinc-700 font-kannada transition-colors line-clamp-1">
                      {lang === 'kn' ? sample.titleKn : sample.titleEn}
                    </h4>
                    <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                      {lang === 'kn' ? sample.descriptionKn : sample.descriptionEn}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-2 border-t border-zinc-100 flex items-center justify-between text-xs font-medium text-zinc-900 group-hover:text-zinc-700">
                  <span className="font-kannada">{t.loadSample}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Camera Capture Modal */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={(img) => onSelectImage(img)}
        lang={lang}
      />
    </div>
  );
};
