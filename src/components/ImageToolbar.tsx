import React from 'react';
import { 
  RotateCcw, 
  RotateCw, 
  Sparkles, 
  RefreshCcw,
  ArrowLeft,
  Scan,
  Upload
} from 'lucide-react';
import { UILanguage } from '../types';
import { translations } from '../i18n/translations';
import { ImageFilterType } from '../services/imageProcessingService';

interface ImageToolbarProps {
  lang: UILanguage;
  activeFilter: ImageFilterType;
  onApplyFilter: (filter: ImageFilterType) => void;
  onRotate: (direction: 'left' | 'right') => void;
  onReset: () => void;
  onProcess: () => void;
  onChangeDoc: () => void;
  isProcessing: boolean;
  hasExtractedText: boolean;
  syncLayout?: boolean;
  onToggleSyncLayout?: () => void;
  activeSampleId?: string;
  onSelectPreset?: (sampleId: string) => void;
  onUploadImage?: (dataUrl: string) => void;
}

export const ImageToolbar: React.FC<ImageToolbarProps> = ({
  lang,
  activeFilter,
  onApplyFilter,
  onRotate,
  onReset,
  onProcess,
  onChangeDoc,
  isProcessing,
  hasExtractedText,
  syncLayout = true,
  onToggleSyncLayout,
  activeSampleId,
  onSelectPreset,
  onUploadImage
}) => {
  const t = translations[lang];
  const toolbarFileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleToolbarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      onUploadImage?.(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white border border-zinc-200/80 rounded-xl p-2.5 sm:p-3 shadow-xs flex flex-wrap items-center justify-between gap-3 mb-4">
      {/* Back / Change document button & Preset Switcher */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onChangeDoc}
          className="px-3 py-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-xs font-medium flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-zinc-500" />
          <span>{t.changeDocBtn}</span>
        </button>

        {onSelectPreset && (
          <div className="flex items-center bg-zinc-100 rounded-lg p-0.5 border border-zinc-200/80 text-xs">
            <select
              value={activeSampleId || 'sample-apmc-invoice'}
              onChange={(e) => onSelectPreset(e.target.value)}
              className="bg-transparent text-xs text-zinc-800 font-medium border-none outline-none cursor-pointer px-2 py-1"
              title="Switch Preset Sample"
            >
              <option value="sample-apmc-invoice">APMC Mandi Receipt (Printed & Tabular)</option>
              <option value="sample-govt-notice">Village Panchayat Notice (Official Record)</option>
              <option value="sample-handwritten-note">Handwritten Kannada Note (ಕೈಬರಹ)</option>
              <option value="sample-medical-article">Medical News Clipping (ಮಧುಮೇಹ ಅಂಕಣ)</option>
            </select>
          </div>
        )}

        {onUploadImage && (
          <>
            <button
              type="button"
              onClick={() => toolbarFileInputRef.current?.click()}
              className="px-2.5 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-medium flex items-center gap-1 transition-colors shadow-2xs cursor-pointer"
              title="Upload new document image from computer"
            >
              <Upload className="w-3.5 h-3.5 text-zinc-500" />
              <span>+ Upload</span>
            </button>
            <input
              ref={toolbarFileInputRef}
              type="file"
              accept="image/*"
              onChange={handleToolbarFileChange}
              className="hidden"
            />
          </>
        )}
      </div>

      {/* Enhancement Tools Group */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Rotate Left / Right */}
        <div className="flex items-center bg-zinc-100 rounded-lg p-0.5 border border-zinc-200/80">
          <button
            onClick={() => onRotate('left')}
            className="p-1.5 rounded-md hover:bg-white text-zinc-700 hover:shadow-2xs transition-all"
            title={t.rotateLeft}
            disabled={isProcessing}
          >
            <RotateCcw className="w-4 h-4 text-zinc-600" />
          </button>
          <button
            onClick={() => onRotate('right')}
            className="p-1.5 rounded-md hover:bg-white text-zinc-700 hover:shadow-2xs transition-all"
            title={t.rotateRight}
            disabled={isProcessing}
          >
            <RotateCw className="w-4 h-4 text-zinc-600" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center bg-zinc-100 rounded-lg p-0.5 border border-zinc-200/80 text-xs">
          <button
            onClick={() => onApplyFilter('original')}
            className={`px-2.5 py-1.5 rounded-md font-medium transition-all ${
              activeFilter === 'original'
                ? 'bg-white text-zinc-900 shadow-2xs font-semibold'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            {t.filterOriginal}
          </button>
          <button
            onClick={() => onApplyFilter('grayscale')}
            className={`px-2.5 py-1.5 rounded-md font-medium transition-all ${
              activeFilter === 'grayscale'
                ? 'bg-white text-zinc-900 shadow-2xs font-semibold'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            {t.filterGrayscale}
          </button>
          <button
            onClick={() => onApplyFilter('binarize')}
            className={`px-2.5 py-1.5 rounded-md font-medium flex items-center gap-1 transition-all ${
              activeFilter === 'binarize'
                ? 'bg-white text-zinc-900 shadow-2xs font-semibold'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
            <span>{t.filterBinarize}</span>
          </button>
        </div>

        {/* Reset button */}
        <button
          onClick={onReset}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
          title={t.revertFilters}
        >
          <RefreshCcw className="w-3.5 h-3.5" />
        </button>

        {/* Sync Layout Toggle Pill */}
        {onToggleSyncLayout && (
          <button
            type="button"
            onClick={onToggleSyncLayout}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
              syncLayout
                ? 'bg-zinc-900 text-white border-zinc-900 font-semibold'
                : 'bg-white hover:bg-zinc-50 text-zinc-700 border-zinc-200'
            }`}
            title="Toggle interactive bounding box synchronization between image and text"
          >
            <Scan className={`w-3.5 h-3.5 ${syncLayout ? 'text-white' : 'text-zinc-500'}`} />
            <span>{lang === 'kn' ? 'ವಿನ್ಯಾಸ ಸಿಂಕ್' : 'Sync Layout'}</span>
          </button>
        )}
      </div>

      {/* Primary Digitize Action Button */}
      <button
        onClick={onProcess}
        disabled={isProcessing}
        className="w-full sm:w-auto px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 transition-all font-kannada"
      >
        <Sparkles className={`w-4 h-4 text-zinc-400 ${isProcessing ? 'animate-spin' : ''}`} />
        <span>
          {isProcessing
            ? t.processingTitle
            : hasExtractedText
            ? t.reprocessBtn
            : t.processDocumentBtn}
        </span>
      </button>
    </div>
  );
};
