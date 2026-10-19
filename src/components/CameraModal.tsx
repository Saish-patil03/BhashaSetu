import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, AlertCircle } from 'lucide-react';
import { UILanguage } from '../types';
import { translations } from '../i18n/translations';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageDataUrl: string) => void;
  lang: UILanguage;
}

export const CameraModal: React.FC<CameraModalProps> = ({
  isOpen,
  onClose,
  onCapture,
  lang
}) => {
  const t = translations[lang];
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      return;
    }

    startCamera();

    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    stopCamera();
    setErrorMsg(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported by your browser.');
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 2560, min: 1920 },
          height: { ideal: 1920, min: 1080 }
        },
        audio: false
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.warn('Camera start error:', err);
      setErrorMsg(
        lang === 'kn'
          ? 'ಕ್ಯಾಮೆರಾ ತೆರೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಕ್ಯಾಮೆರಾ ಅನುಮತಿ (Permission) ಪರಿಶೀಲಿಸಿ.'
          : 'Could not access camera. Please check camera permissions in your browser.'
      );
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleCapture = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1920;
    canvas.height = video.videoHeight || 1080;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');

    stopCamera();
    onCapture(dataUrl);
    onClose();
  };

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 bg-zinc-950 flex items-center justify-between border-b border-zinc-800 text-white">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-white" />
            <h3 className="font-bold text-sm sm:text-base">{t.cameraModalTitle}</h3>
          </div>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder */}
        <div className="relative aspect-[4/3] bg-black flex items-center justify-center overflow-hidden">
          {errorMsg ? (
            <div className="p-6 text-center text-rose-400 max-w-sm">
              <AlertCircle className="w-10 h-10 mx-auto mb-2 text-rose-400" />
              <p className="text-xs sm:text-sm font-medium">{errorMsg}</p>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {/* Document Alignment Frame Overlay */}
              <div className="absolute inset-8 border-2 border-dashed border-white/60 rounded-xl pointer-events-none flex flex-col justify-between p-3">
                <div className="flex justify-between text-[11px] font-mono text-zinc-200 bg-zinc-900/80 border border-zinc-700/80 px-2 py-0.5 rounded self-start">
                  {lang === 'kn' ? 'ದಾಖಲೆಯನ್ನು ಇಲ್ಲಿ ಕೇಂದ್ರೀಕರಿಸಿ' : 'Align Kannada Document Inside'}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="p-4 bg-zinc-950 flex items-center justify-between gap-4 border-t border-zinc-800">
          <button
            onClick={toggleFacingMode}
            className="p-3 rounded-xl bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors flex items-center gap-2 text-xs font-semibold cursor-pointer"
            title={t.switchCamera}
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">{t.switchCamera}</span>
          </button>

          <button
            onClick={handleCapture}
            disabled={!!errorMsg}
            className="flex-1 py-3 px-6 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
          >
            <Camera className="w-5 h-5 text-zinc-950" />
            <span>{t.snapPhoto}</span>
          </button>

          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="px-4 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            {t.closeModal}
          </button>
        </div>
      </div>
    </div>
  );
};
