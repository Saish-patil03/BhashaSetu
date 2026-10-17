import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Share2, 
  CheckSquare, 
  Square, 
  Calendar, 
  FileCheck2, 
  Volume2, 
  ExternalLink, 
  Sparkles,
  HelpCircle,
  Clock
} from 'lucide-react';
import { DigitizedDocument, UILanguage, CivicChecklistItem } from '../../types';
import { 
  generateCivicChecklist, 
  createWhatsAppShareUrl 
} from '../../services/intelligenceService';
import { speechService } from '../../services/speechService';

interface VoiceAssistantBarProps {
  doc: DigitizedDocument;
  lang: UILanguage;
  onVoiceQuestion: (question: string) => void;
  isAsking?: boolean;
}

export const VoiceAssistantBar: React.FC<VoiceAssistantBarProps> = ({
  doc,
  lang,
  onVoiceQuestion,
  isAsking = false
}) => {
  const [isListening, setIsListening] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<CivicChecklistItem[]>(() =>
    generateCivicChecklist(doc)
  );

  const recognitionRef = useRef<any>(null);

  // Initialize SpeechRecognition if available
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = lang === 'kn' ? 'kn-IN' : 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
        setSpokenTranscript('');
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setSpokenTranscript(transcript);

        if (event.results[0].isFinal) {
          setIsListening(false);
          if (transcript.trim()) {
            onVoiceQuestion(transcript.trim());
          }
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setSpeechError(
            lang === 'kn'
              ? 'ಮೈಕ್ರೊಫೋನ್ ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ. ಬ್ರೌಸರ್ ಸೆಟ್ಟಿಂಗ್ಸ್‌ನಲ್ಲಿ ಸಕ್ರಿಯಗೊಳಿಸಿ.'
              : 'Microphone permission denied. Please allow microphone access.'
          );
        } else {
          setSpeechError(
            lang === 'kn'
              ? 'ಧ್ವನಿ ಗ್ರಹಿಸಲು ಸಾಧ್ಯವಾಗಿಲ್ಲ. ಪುನಃ ಪ್ರಯತ್ನಿಸಿ.'
              : 'Could not hear voice input. Please try again.'
          );
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, [lang, onVoiceQuestion]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setSpeechError(
        lang === 'kn'
          ? 'ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಇನ್‌ಪುಟ್ (Speech Recognition) ಬೆಂಬಲಿತವಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು Chrome ಬಳಸಿ.'
          : 'Speech recognition is not supported in this browser. Please use Google Chrome.'
      );
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setSpeechError(null);
      setSpokenTranscript('');
      try {
        recognitionRef.current.lang = lang === 'kn' ? 'kn-IN' : 'en-IN';
        recognitionRef.current.start();
      } catch (e) {
        console.error('Failed to start speech recognition:', e);
      }
    }
  };

  const toggleChecklist = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const handleShareWhatsApp = () => {
    const url = createWhatsAppShareUrl(doc);
    window.open(url, '_blank');
  };

  const completedCount = checklist.filter((i) => i.completed).length;
  const progressPct = checklist.length > 0 ? Math.round((completedCount / checklist.length) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* 1. Voice-to-Voice Microphone Interaction Card */}
      <div className="bg-zinc-100/80 border border-zinc-200 rounded-xl p-4 sm:p-5 text-zinc-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleListening}
              disabled={isAsking}
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer ${
                isListening
                  ? 'bg-zinc-900 text-white ring-4 ring-zinc-300 animate-pulse'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-white'
              }`}
              title={isListening ? 'Stop Listening' : 'Speak your question in Kannada'}
            >
              {isListening ? <MicOff className="w-5 h-5 text-rose-400" /> : <Mic className="w-5 h-5 text-zinc-300" />}
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-sm sm:text-base text-zinc-900 font-kannada">
                  {lang === 'kn' ? 'ಧ್ವನಿ ಮೂಲಕ ಪ್ರಶ್ನೆ ಕೇಳಿ (Kannada Voice-to-Voice)' : 'Kannada Voice-to-Voice Q&A'}
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-zinc-200/80 text-zinc-700 text-[10px] font-medium uppercase">
                  {isListening ? 'ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದೆ...' : 'kn-IN / en-IN'}
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">
                {lang === 'kn'
                  ? 'ಟೈಪ್ ಮಾಡಲು ಬರದಿದ್ದರೆ ಮೈಕ್ ಒತ್ತಿ ಕನ್ನಡದಲ್ಲಿ ನೇರವಾಗಿ ಮಾತನಾಡಿ; AI ಉತ್ತರವನ್ನೂ ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿ'
                  : 'Speak your question in Kannada or English; AI will respond and speak the answer'}
              </p>
            </div>
          </div>

          {/* Quick WhatsApp Share Button */}
          <button
            onClick={handleShareWhatsApp}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center gap-1.5 shadow-2xs active:scale-95 transition-all"
            title="Share summary via WhatsApp"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{lang === 'kn' ? 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ' : 'Share on WhatsApp'}</span>
          </button>
        </div>

        {/* Live Speech Recognition Transcript Status */}
        {isListening && (
          <div className="bg-white rounded-lg p-2.5 border border-zinc-200 flex items-center gap-2.5 animate-fadeIn">
            <div className="flex gap-1 items-end h-3.5">
              <span className="w-1 bg-zinc-900 rounded-full animate-bounce h-2.5" />
              <span className="w-1 bg-zinc-900 rounded-full animate-bounce h-3.5 delay-100" />
              <span className="w-1 bg-zinc-900 rounded-full animate-bounce h-2 delay-200" />
            </div>
            <p className="text-xs sm:text-sm font-kannada font-medium text-zinc-800 flex-1">
              {spokenTranscript || (lang === 'kn' ? 'ಮಾತನಾಡಿ, ನಾವು ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇವೆ...' : 'Listening... speak clearly into your mic')}
            </p>
          </div>
        )}

        {speechError && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-lg p-2.5 text-xs">
            {speechError}
          </div>
        )}
      </div>

      {/* 2. Actionable Civic Checklist (ಮುಂದಿನ ಹೆಜ್ಜೆಗಳು) */}
      <div className="bg-white border border-zinc-200/80 rounded-xl p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-zinc-700" />
            <div>
              <h4 className="font-semibold text-sm text-zinc-900 font-kannada">
                {lang === 'kn' ? 'ನಾಗರಿಕ ಕರ್ತವ್ಯಗಳ ಚೆಕ್‌ಲಿಸ್ಟ್ (ಮುಂದಿನ ಹೆಜ್ಜೆಗಳು)' : 'Citizen Action Hub & Next Steps'}
              </h4>
              <span className="text-[11px] text-zinc-400">
                {lang === 'kn'
                  ? 'ದಾಖಲೆಯಲ್ಲಿ ಉಲ್ಲೇಖಿಸಲಾದ ಕಡ್ಡಾಯ ದಾಖಲೆಗಳು ಮತ್ತು ಗಡುವಿನ ಸೂಚನೆಗಳು'
                  : 'Actionable steps extracted from circular deadlines and eligibility requirements'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-zinc-700">
              {completedCount} / {checklist.length} {lang === 'kn' ? 'ಪೂರ್ಣ' : 'Done'} ({progressPct}%)
            </span>
            <div className="w-20 bg-zinc-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-zinc-900 h-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Checklist Items */}
        <div className="space-y-2">
          {checklist.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleChecklist(item.id)}
              className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-2.5 ${
                item.completed
                  ? 'bg-zinc-50/50 border-zinc-200/60 text-zinc-400'
                  : 'bg-white hover:bg-zinc-50/70 border-zinc-200/80 text-zinc-800 shadow-2xs'
              }`}
            >
              <button className="mt-0.5 text-zinc-500 focus:outline-none">
                {item.completed ? (
                  <CheckSquare className="w-4 h-4 text-zinc-900" />
                ) : (
                  <Square className="w-4 h-4 text-zinc-400" />
                )}
              </button>

              <div className="flex-1 space-y-1">
                <p
                  className={`text-xs sm:text-sm font-medium font-kannada leading-snug ${
                    item.completed ? 'line-through text-zinc-400' : 'text-zinc-900'
                  }`}
                >
                  {lang === 'kn' ? item.taskKn : item.taskEn}
                </p>

                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  {item.requiredDocument && (
                    <span className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 text-[10px] font-medium flex items-center gap-1">
                      <FileCheck2 className="w-3 h-3 text-zinc-500" />
                      <span>{item.requiredDocument}</span>
                    </span>
                  )}
                  {item.deadline && (
                    <span className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 text-[10px] font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-500" />
                      <span>{item.deadline}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
