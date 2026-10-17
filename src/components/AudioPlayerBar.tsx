import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  Volume2, 
  VolumeX, 
  Gauge, 
  Headphones,
  CheckCircle,
  FileText,
  Sparkles
} from 'lucide-react';
import { DigitizedDocument, UILanguage } from '../types';
import { translations } from '../i18n/translations';
import { speechService } from '../services/speechService';

interface AudioPlayerBarProps {
  doc: DigitizedDocument;
  lang: UILanguage;
  defaultRate?: number;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  doc,
  lang,
  defaultRate = 1.0
}) => {
  const t = translations[lang];
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState<number>(defaultRate);
  const [audioSource, setAudioSource] = useState<'kannada_raw' | 'kannada_summary'>('kannada_raw');
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    setIsSupported(speechService.isSupported());
    return () => {
      speechService.stop();
    };
  }, []);

  // Stop speech if document changes
  useEffect(() => {
    speechService.stop();
    setIsPlaying(false);
    setIsPaused(false);
  }, [doc.id]);

  const getTextToRead = (): { text: string; langCode: 'kn-IN' | 'en-IN' } => {
    if (audioSource === 'kannada_summary') {
      const summaryText = doc.summary.simplifiedKannada.join('. ');
      return { text: summaryText, langCode: 'kn-IN' };
    }
    return { text: doc.rawKannadaText, langCode: 'kn-IN' };
  };

  const handlePlay = () => {
    if (isPaused) {
      speechService.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    const { text, langCode } = getTextToRead();

    speechService.speak(text, {
      lang: langCode,
      rate,
      onStart: () => {
        setIsPlaying(true);
        setIsPaused(false);
      },
      onEnd: () => {
        setIsPlaying(false);
        setIsPaused(false);
      },
      onError: (err) => {
        console.warn('Speech error:', err);
        setIsPlaying(false);
        setIsPaused(false);
      }
    });
  };

  const handlePause = () => {
    speechService.pause();
    setIsPaused(true);
  };

  const handleStop = () => {
    speechService.stop();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const cycleRate = () => {
    const nextRate = rate === 0.75 ? 1.0 : rate === 1.0 ? 1.25 : 0.75;
    setRate(nextRate);
    if (isPlaying && !isPaused) {
      // Re-trigger with new rate
      handlePlay();
    }
  };

  if (!isSupported) {
    return (
      <div className="bg-slate-100 rounded-2xl p-3 text-xs text-slate-500 text-center">
        {t.speechNotSupported}
      </div>
    );
  }

  return (
    <div className="bg-white border border-zinc-200/80 text-zinc-900 rounded-xl p-3 sm:p-3.5 shadow-xs flex flex-wrap items-center justify-between gap-4">
      {/* Title & Mode Switcher */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200/80 flex items-center justify-center text-zinc-800">
            <Headphones className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm font-kannada leading-tight text-zinc-900">
              {t.audioPlayerTitle}
            </h4>
          </div>
        </div>

        {/* Source Switcher: Full Text vs Simple Summary */}
        <div className="bg-zinc-100 rounded-lg p-0.5 flex items-center text-xs border border-zinc-200/70">
          <button
            onClick={() => {
              if (audioSource !== 'kannada_raw') {
                speechService.stop();
                setIsPlaying(false);
                setAudioSource('kannada_raw');
              }
            }}
            className={`px-3 py-1.5 rounded-md font-medium font-kannada flex items-center gap-1.5 transition-all cursor-pointer ${
              audioSource === 'kannada_raw'
                ? 'bg-white text-zinc-900 shadow-2xs font-semibold'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="text-[11px] sm:text-xs">{t.audioListenText}</span>
          </button>

          <button
            onClick={() => {
              if (audioSource !== 'kannada_summary') {
                speechService.stop();
                setIsPlaying(false);
                setAudioSource('kannada_summary');
              }
            }}
            className={`px-3 py-1.5 rounded-md font-medium font-kannada flex items-center gap-1.5 transition-all cursor-pointer ${
              audioSource === 'kannada_summary'
                ? 'bg-white text-zinc-900 shadow-2xs font-semibold'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-[11px] sm:text-xs">{t.audioListenSummary}</span>
          </button>
        </div>
      </div>

      {/* Control Buttons Group */}
      <div className="flex items-center gap-2">
        {/* Play / Pause Toggle Button */}
        {!isPlaying || isPaused ? (
          <button
            onClick={handlePlay}
            className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs sm:text-sm shadow-xs flex items-center gap-2 active:scale-95 transition-all font-kannada cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white text-white" />
            <span>{t.playAudio}</span>
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs sm:text-sm shadow-xs flex items-center gap-2 active:scale-95 transition-all font-kannada cursor-pointer"
          >
            <Pause className="w-4 h-4 fill-white text-white" />
            <span>{t.pauseAudio}</span>
          </button>
        )}

        {/* Stop Button */}
        <button
          onClick={handleStop}
          disabled={!isPlaying && !isPaused}
          className="p-2.5 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-zinc-700 disabled:opacity-30 transition-colors cursor-pointer"
          title={t.stopAudio}
        >
          <Square className="w-4 h-4 fill-zinc-700 text-zinc-700" />
        </button>

        {/* Speed Multiplier Button (0.75x, 1x, 1.25x) */}
        <button
          onClick={cycleRate}
          className="px-3 py-2 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-xs font-semibold flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
          title="Playback Speed"
        >
          <Gauge className="w-3.5 h-3.5 text-zinc-600" />
          <span>{rate}x</span>
        </button>

        {/* Real-time speaking animation wave */}
        {isPlaying && !isPaused && (
          <div className="flex items-center gap-0.5 ml-1">
            <span className="w-1 h-3 bg-zinc-800 rounded-full animate-pulse" />
            <span className="w-1 h-5 bg-zinc-600 rounded-full animate-bounce" />
            <span className="w-1 h-2 bg-zinc-800 rounded-full animate-pulse" />
            <span className="w-1 h-4 bg-zinc-700 rounded-full animate-bounce" />
          </div>
        )}
      </div>
    </div>
  );
};
