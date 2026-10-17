import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Square, 
  RotateCcw, 
  X, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  Quote, 
  ArrowRight,
  Gauge
} from 'lucide-react';
import { DigitizedDocument, UILanguage, QAMessage } from '../../types';
import { askDocumentQuestion } from '../../services/ocrService';
import { speechService } from '../../services/speechService';

interface CitizenVoiceAssistantProps {
  doc: DigitizedDocument;
  lang: UILanguage;
  apiKey?: string;
  modelName: string;
  onUpdateChatHistory?: (messages: QAMessage[]) => void;
}

export const CitizenVoiceAssistant: React.FC<CitizenVoiceAssistantProps> = ({
  doc,
  lang,
  apiKey,
  modelName,
  onUpdateChatHistory
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [lastQuestion, setLastQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [groundedSnippet, setGroundedSnippet] = useState<string | undefined>(undefined);
  const [speechRate, setSpeechRate] = useState<number>(0.9); // Slightly slower (0.9x) for rural citizens
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const isKn = lang === 'kn';

  // 3 High-Impact Regional Quick Questions
  const quickQuestions = [
    {
      kn: 'ನನಗೆ ಈ ರಶೀದಿಯಲ್ಲಿ ಎಷ್ಟು ದುಡ್ಡು ಬರಬೇಕು?',
      en: 'How much money do I receive from this document?',
      icon: '💰'
    },
    {
      kn: 'ಅರ್ಜಿ ಸಲ್ಲಿಕೆಗೆ ಕೊನೆಯ ದಿನಾಂಕ ಅಥವಾ ಗಡುವು ಯಾವುದು?',
      en: 'What is the deadline or final date mentioned?',
      icon: '📅'
    },
    {
      kn: 'ಈ ದಾಖಲೆಯ ಮುಖ್ಯ ಉದ್ದೇಶ ಹಾಗೂ ನಾಗರಿಕರಿಗೆ ಸಿಗುವ ಸೌಲಭ್ಯಗಳೇನು?',
      en: 'What is the main purpose and benefits for citizens?',
      icon: '🏛️'
    }
  ];

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'kn-IN'; // Kannada - India

        recognition.onstart = () => {
          setIsListening(true);
          setErrorMessage(null);
          setSpokenTranscript('');
        };

        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join('');
          setSpokenTranscript(transcript);

          if (event.results[0].isFinal && transcript.trim()) {
            setIsListening(false);
            handleAskQuestion(transcript.trim());
          }
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition status:', event.error);
          setIsListening(false);
          if (event.error === 'not-allowed') {
            setErrorMessage(
              isKn
                ? 'ಮೈಕ್ರೊಫೋನ್ ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ. ದಯವಿಟ್ಟು ಬ್ರೌಸರ್ ಸೆಟ್ಟಿಂಗ್ಸ್‌ನಲ್ಲಿ ಮೈಕ್ ಸಕ್ರಿಯಗೊಳಿಸಿ.'
                : 'Microphone permission denied. Please allow microphone access in browser settings.'
            );
          } else if (event.error === 'no-speech') {
            setErrorMessage(
              isKn
                ? 'ಯಾವುದೇ ಧ್ವನಿ ಕೇಳಿಸಲಿಲ್ಲ. ಮೈಕ್ರೊಫೋನ್ ಒತ್ತಿ ಪುನಃ ಸ್ಪಷ್ಟವಾಗಿ ಮಾತನಾಡಿ.'
                : 'No voice heard. Please tap the mic and speak clearly.'
            );
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } catch (err) {
        console.warn('Could not initialize SpeechRecognition:', err);
      }
    }

    return () => {
      speechService.stop();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, [lang]);

  // Handle Voice Toggle
  const toggleListening = () => {
    if (isSpeaking) {
      speechService.stop();
      setIsSpeaking(false);
    }

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      setIsListening(false);
      return;
    }

    setErrorMessage(null);
    setSpokenTranscript('');

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.warn('Recognition start retry:', err);
        try {
          recognitionRef.current.abort();
          recognitionRef.current.start();
        } catch (e) {
          setErrorMessage(
            isKn
              ? 'ಮೈಕ್ರೊಫೋನ್ ಪ್ರಾರಂಭಿಸಲು ಸಾಧ್ಯವಾಗಿಲ್ಲ. ಕೆಳಗಿನ ಪ್ರಶ್ನೆಗಳನ್ನು ನೇರವಾಗಿ ಒತ್ತಿ.'
              : 'Could not start microphone. You can tap the questions below directly.'
          );
        }
      }
    } else {
      setErrorMessage(
        isKn
          ? 'ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ನೇರ ಧ್ವನಿ ಗ್ರಹಿಕೆ ಬೆಂಬಲವಿಲ್ಲ. ದಯವಿಟ್ಟು ಕೆಳಗಿನ ಪ್ರಶ್ನೆಗಳಲ್ಲಿ ಒಂದನ್ನು ಒತ್ತಿ.'
          : 'Voice input is not supported in this browser. Please tap one of the suggested questions below.'
      );
    }
  };

  // Submit Question & Speak Response Aloud
  const handleAskQuestion = async (queryText: string) => {
    const q = queryText.trim();
    if (!q) return;

    setLastQuestion(q);
    setIsProcessing(true);
    setAnswer(null);
    setGroundedSnippet(undefined);
    setErrorMessage(null);

    // Stop ongoing speech
    speechService.stop();
    setIsSpeaking(false);

    try {
      const result = await askDocumentQuestion(
        doc.rawKannadaText,
        q,
        apiKey,
        modelName,
        doc.chatHistory
      );

      setAnswer(result.answer);
      setGroundedSnippet(result.groundedSnippet);

      // Append to document chat history if callback available
      if (onUpdateChatHistory) {
        const userMsg: QAMessage = {
          id: 'voice-user-' + Date.now(),
          sender: 'user',
          timestamp: Date.now(),
          text: q,
          language: lang
        };
        const aiMsg: QAMessage = {
          id: 'voice-ai-' + Date.now(),
          sender: 'assistant',
          timestamp: Date.now() + 10,
          text: result.answer,
          groundedSnippet: result.groundedSnippet,
          language: lang
        };
        onUpdateChatHistory([...doc.chatHistory, userMsg, aiMsg]);
      }

      // Automatically Speak Answer Aloud in Warm Colloquial Kannada
      speakAnswerAloud(result.answer);
    } catch (err: any) {
      console.error('Voice QA error:', err);
      const fallbackAns = isKn
        ? 'ದಾಖಲೆಯಲ್ಲಿ ಈ ವಿವರ ಸ್ಪಷ್ಟವಾಗಿ ಲಭ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೊಂದು ಪ್ರಶ್ನೆ ಕೇಳಿ.'
        : 'This specific detail was not found in the document. Please ask another question.';
      setAnswer(fallbackAns);
      speakAnswerAloud(fallbackAns);
    } finally {
      setIsProcessing(false);
    }
  };

  // Text to Speech playback helper
  const speakAnswerAloud = (textToSpeak: string) => {
    if (!textToSpeak) return;

    speechService.stop();
    setIsSpeaking(true);

    speechService.speak(textToSpeak, {
      lang: 'kn-IN',
      rate: speechRate,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });
  };

  const handleStopSpeaking = () => {
    speechService.stop();
    setIsSpeaking(false);
  };

  const handleClose = () => {
    speechService.stop();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
    setIsSpeaking(false);
    setIsOpen(false);
  };

  return (
    <>
      {/* 1. Floating Action Pill Button (Always Accessible at Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 animate-bounce-subtle">
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            // If opening fresh, give a warm cue
            if (!answer) {
              setErrorMessage(null);
            }
          }}
          className="group relative flex items-center gap-2.5 bg-zinc-900 hover:bg-zinc-800 text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-xl border border-zinc-700/60 transition-all duration-200 cursor-pointer active:scale-95"
          title={isKn ? 'ಧ್ವನಿ ಮೂಲಕ ಪ್ರಶ್ನೆ ಕೇಳಿ (Spoken Kannada Q&A)' : 'Ask Document by Voice (Kannada Spoken Q&A)'}
        >
          {/* Pulsing Emerald Live Indicator */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </span>

          <Mic className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />

          <div className="text-left font-kannada">
            <div className="text-xs font-bold tracking-tight">
              {isKn ? 'ಮಾತನಾಡಿ ಕೇಳಿ' : 'Ask by Voice'}
            </div>
            <div className="text-[10px] text-zinc-400 leading-none">
              {isKn ? 'ಕನ್ನಡ ಧ್ವನಿ ಮಿತ್ರ' : 'Kannada Voice AI'}
            </div>
          </div>
        </button>
      </div>

      {/* 2. Interactive Voice Assistant Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="bg-zinc-50 border-b border-zinc-200/80 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center shadow-xs">
                  <Mic className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-zinc-900 font-kannada flex items-center gap-2">
                    {isKn ? 'ಭಾಷಾಸೇತು ಧ್ವನಿ ಮಿತ್ರ' : 'BhashaSetu Voice Companion'}
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                      ಕನ್ನಡ kn-IN
                    </span>
                  </h3>
                  <p className="text-[11px] text-zinc-500 font-kannada">
                    {isKn
                      ? 'ದಾಖಲೆಯ ಬಗ್ಗೆ ನೇರವಾಗಿ ಮಾತನಾಡಿ ಪ್ರಶ್ನೆ ಕೇಳಿ - ಧ್ವನಿಯಲ್ಲೇ ಉತ್ತರ ಪಡೆಯಿರಿ'
                      : 'Speak in Kannada about your document - AI responds aloud in natural speech'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="w-8 h-8 rounded-full hover:bg-zinc-200/70 flex items-center justify-center text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main Interactive Stage */}
            <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
              {/* Central Pulsing Microphone Trigger */}
              <div className="flex flex-col items-center justify-center py-2 space-y-3 text-center">
                <div className="relative">
                  {/* Outer Ripple effect when listening */}
                  {isListening && (
                    <>
                      <div className="absolute inset-0 rounded-full bg-rose-400 animate-ping opacity-30" />
                      <div className="absolute -inset-3 rounded-full bg-rose-300 animate-pulse opacity-40" />
                    </>
                  )}
                  {isSpeaking && (
                    <div className="absolute -inset-3 rounded-full bg-emerald-400 animate-pulse opacity-30" />
                  )}

                  <button
                    type="button"
                    onClick={toggleListening}
                    disabled={isProcessing}
                    className={`relative w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 cursor-pointer active:scale-95 ${
                      isListening
                        ? 'bg-rose-600 text-white scale-105 shadow-rose-200'
                        : isSpeaking
                        ? 'bg-emerald-600 text-white shadow-emerald-200'
                        : isProcessing
                        ? 'bg-zinc-800 text-amber-400'
                        : 'bg-zinc-900 text-white hover:bg-zinc-800 hover:scale-105'
                    }`}
                  >
                    {isProcessing ? (
                      <div className="w-8 h-8 rounded-full border-3 border-amber-300/30 border-t-amber-400 animate-spin" />
                    ) : isListening ? (
                      <MicOff className="w-8 h-8" />
                    ) : isSpeaking ? (
                      <Volume2 className="w-8 h-8 animate-pulse" />
                    ) : (
                      <Mic className="w-8 h-8 text-emerald-400" />
                    )}
                  </button>
                </div>

                {/* Status Guidance */}
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-zinc-800 font-kannada">
                    {isProcessing
                      ? (isKn ? 'ದಾಖಲೆಯನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...' : 'Analyzing document with Gemini AI...')
                      : isListening
                      ? (isKn ? 'ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇವೆ... ಮಾತನಾಡಿ' : 'Listening... Speak in Kannada now')
                      : isSpeaking
                      ? (isKn ? 'ಉತ್ತರವನ್ನು ಧ್ವನಿ ಮೂಲಕ ಓದಲಾಗುತ್ತಿದೆ...' : 'Reading answer aloud in Kannada...')
                      : (isKn ? 'ಮೈಕ್ರೊಫೋನ್ ಒತ್ತಿ ಮಾತನಾಡಿ' : 'Tap microphone & speak your question')}
                  </div>
                  <p className="text-xs text-zinc-400 font-kannada">
                    {isListening
                      ? (isKn ? 'ಮಾತನಾಡುವುದು ಮುಗಿದ ತಕ್ಷಣ ತಾನಾಗಿಯೇ ಹುಡುಕುತ್ತದೆ' : 'Auto-submits when you stop speaking')
                      : (isKn ? 'ಅಥವಾ ಕೆಳಗಿನ ಪ್ರಶ್ನೆಗಳ ಮೇಲೆ ನೇರವಾಗಿ ಕ್ಲಿಕ್ ಮಾಡಿ' : 'Or tap one of the common questions below')}
                  </p>
                </div>

                {/* Live Spoken Speech Preview */}
                {spokenTranscript && (
                  <div className="bg-zinc-100 border border-zinc-200 rounded-xl px-4 py-2.5 text-xs text-zinc-700 font-kannada max-w-sm animate-fadeIn">
                    <span className="text-zinc-400 block text-[10px] mb-0.5">
                      {isKn ? 'ನೀವು ಮಾತನಾಡಿದ್ದು:' : 'You said:'}
                    </span>
                    <span className="font-semibold text-zinc-900">"{spokenTranscript}"</span>
                  </div>
                )}

                {/* Error Banner if any */}
                {errorMessage && (
                  <div className="bg-rose-50 border border-rose-200 rounded-xl px-4 py-2.5 text-xs text-rose-800 font-kannada max-w-sm text-left">
                    {errorMessage}
                  </div>
                )}
              </div>

              {/* AI Answer Card (with Spoken Audio Controls) */}
              {answer && (
                <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-xl p-4 sm:p-5 space-y-3 animate-fadeIn shadow-2xs">
                  <div className="flex items-center justify-between border-b border-emerald-200/60 pb-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-700" />
                      <span className="text-xs font-bold text-emerald-900 font-kannada">
                        {isKn ? 'ದಾಖಲೆಯ ಉತ್ತರ (AI Spoken Answer):' : 'AI Verified Answer:'}
                      </span>
                    </div>

                    {/* Audio Controls */}
                    <div className="flex items-center gap-1.5">
                      {isSpeaking ? (
                        <button
                          type="button"
                          onClick={handleStopSpeaking}
                          className="px-2.5 py-1 rounded-md bg-white border border-emerald-300 text-xs text-emerald-800 font-medium flex items-center gap-1 hover:bg-emerald-100 transition-colors cursor-pointer"
                        >
                          <Square className="w-3 h-3 text-rose-600 fill-rose-600" />
                          <span className="font-kannada text-[11px]">{isKn ? 'ನಿಲ್ಲಿಸಿ' : 'Stop'}</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => speakAnswerAloud(answer)}
                          className="px-2.5 py-1 rounded-md bg-emerald-700 text-white text-xs font-medium flex items-center gap-1 hover:bg-emerald-800 transition-colors cursor-pointer shadow-2xs"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span className="font-kannada text-[11px]">{isKn ? 'ಪುನಃ ಆಲಿಸಿ' : 'Replay Voice'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Question Asked Tag */}
                  {lastQuestion && (
                    <div className="text-[11px] text-emerald-800/80 font-kannada italic">
                      Q: "{lastQuestion}"
                    </div>
                  )}

                  {/* Answer Text in large readable font for elders */}
                  <div className="text-sm sm:text-base font-kannada text-zinc-900 leading-relaxed font-normal">
                    {answer}
                  </div>

                  {/* Grounded Citation Snippet */}
                  {groundedSnippet && (
                    <div className="pt-2 border-t border-emerald-200/60 text-xs text-zinc-500 font-kannada flex items-start gap-1.5">
                      <Quote className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{groundedSnippet}</span>
                    </div>
                  )}
                </div>
              )}

              {/* 3 One-Tap Citizen Quick Questions */}
              <div className="space-y-2 pt-1 border-t border-zinc-100">
                <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider font-kannada">
                  {isKn ? 'ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು (1-ಕ್ಲಿಕ್‌ನಲ್ಲಿ ಕೇಳಿ):' : 'Suggested Questions (1-Click):'}
                </div>

                <div className="space-y-1.5">
                  {quickQuestions.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAskQuestion(item.kn)}
                      disabled={isProcessing}
                      className="w-full text-left p-2.5 rounded-xl border border-zinc-200/80 hover:border-zinc-300 hover:bg-zinc-50/80 bg-white transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{item.icon}</span>
                        <div>
                          <div className="text-xs font-medium text-zinc-800 font-kannada group-hover:text-zinc-900">
                            {item.kn}
                          </div>
                          <div className="text-[10px] text-zinc-400">
                            {item.en}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-300 group-hover:text-zinc-700 transition-colors shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Status Bar with Speed Pacing */}
            <div className="bg-zinc-50 border-t border-zinc-200/80 px-5 py-3 flex items-center justify-between text-xs text-zinc-500">
              <div className="flex items-center gap-1.5 font-kannada text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isKn ? 'ಕನ್ನಡ ಧ್ವನಿ ಎಂಜಿನ್ ಸಕ್ರಿಯವಾಗಿದೆ' : 'Kannada Voice Engine Active'}</span>
              </div>

              {/* Speech Speed Pacing Control */}
              <div className="flex items-center gap-1">
                <Gauge className="w-3 h-3 text-zinc-400" />
                <span className="text-[11px] text-zinc-400 mr-1">{isKn ? 'ವೇಗ:' : 'Speed:'}</span>
                {[0.8, 1.0].map((rateVal) => (
                  <button
                    key={rateVal}
                    type="button"
                    onClick={() => {
                      setSpeechRate(rateVal);
                      if (isSpeaking && answer) {
                        speechService.stop();
                        speechService.speak(answer, { lang: 'kn-IN', rate: rateVal });
                      }
                    }}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                      speechRate === rateVal
                        ? 'bg-zinc-900 text-white font-bold'
                        : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                    }`}
                  >
                    {rateVal === 0.8 ? '0.8x (ಸಾವಧಾನ)' : '1.0x (ಸಾಮಾನ್ಯ)'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
