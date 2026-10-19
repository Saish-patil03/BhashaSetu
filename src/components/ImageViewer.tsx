import React, { useState, useRef, useEffect } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  Move,
  Scan,
  Upload
} from 'lucide-react';
import { UILanguage } from '../types';
import { translations } from '../i18n/translations';
import { LayoutBlockId, LayoutBlockItem, LAYOUT_BLOCK_DEFS } from '../services/layoutSyncService';

interface ImageViewerProps {
  imageUrl: string;
  lang: UILanguage;
  altText?: string;
  syncLayout?: boolean;
  onToggleSyncLayout?: () => void;
  activeBlockId?: LayoutBlockId | null;
  onSelectBlock?: (id: LayoutBlockId | null) => void;
  activeSampleId?: string;
  onSelectPreset?: (sampleId: string) => void;
  onUploadImage?: (dataUrl: string) => void;
  syncBlocks?: LayoutBlockItem[];
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  imageUrl,
  lang,
  altText = 'Kannada Source Document',
  syncLayout = true,
  onToggleSyncLayout,
  activeBlockId = null,
  onSelectBlock,
  activeSampleId,
  onSelectPreset,
  onUploadImage,
  syncBlocks
}) => {
  const t = translations[lang];
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      onUploadImage?.(result);
    };
    reader.readAsDataURL(file);
  };

  // Reset zoom on image change
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [imageUrl]);

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.25, 4.0));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  return (
    <div
      className={`relative flex flex-col bg-zinc-100/60 rounded-xl border border-zinc-200/80 overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50 bg-black/95 rounded-none border-none p-4' : 'h-[540px] sm:h-[680px]'
      }`}
    >
      {/* Top Floating Control Bar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-1.5 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1.5 flex-wrap">
          <div className="bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-zinc-200/80 shadow-xs flex items-center gap-1.5 text-xs font-medium text-zinc-800">
            <span className="font-kannada">{t.viewerTitle}</span>
            <span className="px-1.5 py-0.2 rounded bg-zinc-100 text-zinc-600 text-[10px] font-mono">
              {Math.round(scale * 100)}%
            </span>
          </div>

          {/* Quick Preset Selector Dropdown */}
          {onSelectPreset && (
            <div className="bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg border border-zinc-200/80 shadow-xs flex items-center gap-1 text-xs">
              <select
                value={activeSampleId || 'custom'}
                onChange={(e) => {
                  if (e.target.value !== 'custom') onSelectPreset(e.target.value);
                }}
                className="bg-transparent text-xs text-zinc-800 font-medium border-none outline-none cursor-pointer pr-1"
                title="Switch Preset Sample Document"
              >
                {!activeSampleId && (
                  <option value="custom">📄 Custom Document (ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ದಾಖಲೆ)</option>
                )}
                <option value="sample-apmc-invoice">Sample: APMC Mandi Receipt</option>
                <option value="sample-govt-notice">Sample: Village Panchayat Notice</option>
                <option value="sample-handwritten-note">Sample: Handwritten Kannada Note</option>
                <option value="sample-medical-article">Sample: Medical Article (ಮಧುಮೇಹ)</option>
                <option value="sample-study-certificate">Sample: Study Certificate (ಕನ್ನಡ ಮಾಧ್ಯಮ)</option>
              </select>
            </div>
          )}

          {/* Quick + Upload Trigger */}
          {onUploadImage && (
            <>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-zinc-200/80 hover:bg-zinc-50 text-zinc-700 text-xs font-medium flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                title="Upload new document image from computer"
              >
                <Upload className="w-3 h-3 text-zinc-500" />
                <span>+ Upload</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </>
          )}
        </div>

        <div className="pointer-events-auto bg-white/95 backdrop-blur-sm p-0.5 rounded-lg border border-zinc-200/80 shadow-xs flex items-center gap-0.5">
          {onToggleSyncLayout && (
            <>
              <button
                onClick={onToggleSyncLayout}
                className={`px-2 py-1 rounded-md text-[11px] font-mono flex items-center gap-1 transition-colors cursor-pointer ${
                  syncLayout
                    ? 'bg-zinc-900 text-white font-semibold shadow-2xs'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                }`}
                title="Toggle Document Layout Bounding Box Synchronization"
              >
                <Scan className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sync</span>
              </button>
              <div className="w-[1px] h-3.5 bg-zinc-200 mx-0.5" />
            </>
          )}
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded-md text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
            title={t.zoomIn}
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded-md text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
            title={t.zoomOut}
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1.5 rounded-md text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
            title={t.resetZoom}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-3.5 bg-zinc-200 mx-0.5" />
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-md text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
            title={t.fullScreen}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas Area */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`w-full h-full flex items-center justify-center overflow-hidden p-4 select-none ${
          scale > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
        }`}
      >
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.15s ease-out'
          }}
          className="relative max-w-full max-h-full flex items-center justify-center"
        >
          <div className="relative inline-block max-h-[500px] sm:max-h-[620px]">
            <img
              src={imageUrl}
              alt={altText}
              className="max-h-[500px] sm:max-h-[620px] w-auto object-contain rounded-lg shadow-lg border border-zinc-200/80 bg-white"
              draggable={false}
            />

            {/* Interactive Bounding Box Overlay for Source Document */}
            {syncLayout && (
              <div className="absolute inset-0 pointer-events-auto">
                {(syncBlocks && syncBlocks.length > 0 ? syncBlocks : LAYOUT_BLOCK_DEFS).map((block) => {
                  const isSelected = activeBlockId === block.id;
                  return (
                    <div
                      key={block.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectBlock?.(isSelected ? null : block.id);
                      }}
                      onMouseEnter={() => onSelectBlock?.(block.id)}
                      style={{
                        top: `${block.box.top}%`,
                        left: `${block.box.left}%`,
                        width: `${block.box.width}%`,
                        height: `${block.box.height}%`
                      }}
                      className={`absolute rounded-md cursor-pointer transition-all flex items-start p-1 ${
                        isSelected
                          ? 'border-2 border-zinc-900 bg-zinc-900/15 ring-2 ring-zinc-900/25 z-20 shadow-xs'
                          : 'border border-dashed border-zinc-400/80 hover:border-zinc-900 bg-zinc-900/5 hover:bg-zinc-900/15 z-10'
                      }`}
                      title={lang === 'kn' ? block.labelKn : block.labelEn}
                    >
                      <span
                        className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-zinc-900 text-white shadow-2xs'
                            : 'bg-white/95 text-zinc-800 border border-zinc-300'
                        }`}
                      >
                        {lang === 'kn' ? block.shortLabelKn : block.shortLabelEn}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Drag Helper Tip when zoomed */}
      {scale > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[11px] font-medium flex items-center gap-1.5 shadow-md">
          <Move className="w-3 h-3 text-yellow-300" />
          <span>{lang === 'kn' ? 'ಚಿತ್ರವನ್ನು ಚಲಿಸಲು ಎಳೆಯಿರಿ' : 'Click & drag to pan document'}</span>
        </div>
      )}
    </div>
  );
};
