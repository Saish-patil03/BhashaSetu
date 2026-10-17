import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  HelpCircle, 
  Quote, 
  Trash2, 
  Bot, 
  User 
} from 'lucide-react';
import { QAMessage, UILanguage, DigitizedDocument } from '../../types';
import { translations } from '../../i18n/translations';
import { askDocumentQuestion } from '../../services/ocrService';
import { sampleDocuments } from '../../data/sampleDocuments';
import { VoiceAssistantBar } from '../extensions/VoiceAssistantBar';
import { speechService } from '../../services/speechService';

interface TabAskDocumentProps {
  doc: DigitizedDocument;
  onUpdateChatHistory: (messages: QAMessage[]) => void;
  apiKey?: string;
  modelName: string;
  lang: UILanguage;
}

export const TabAskDocument: React.FC<TabAskDocumentProps> = ({
  doc,
  onUpdateChatHistory,
  apiKey,
  modelName,
  lang
}) => {
  const t = translations[lang];
  const [inputQuestion, setInputQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastQueryWasVoice, setLastQueryWasVoice] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Find sample preset's recommended questions if available
  const sampleMatch = sampleDocuments.find((s) => s.id === doc.id || doc.title.includes(s.titleKn));
  const suggestedQuestions = sampleMatch?.sampleQuestions || [
    { kn: 'ಈ ದಾಖಲೆಯ ಮುಖ್ಯ ಉದ್ದೇಶವೇನು?', en: 'What is the main purpose of this document?' },
    { kn: 'ಯಾವುದಾದರೂ ಗಡುವು ಅಥವಾ ಕೊನೆಯ ದಿನಾಂಕ ಉಲ್ಲೇಖಿಸಲಾಗಿದೆಯೇ?', en: 'Is there any deadline or final date mentioned?' },
    { kn: 'ಇದರಲ್ಲಿ ಉಲ್ಲೇಖಿಸಲಾದ ಶುಲ್ಕ ಅಥವಾ ಹಣ ಎಷ್ಟು?', en: 'What fee, subsidy or financial amount is mentioned?' },
    { kn: 'ನಾನು ಅನುಸರಿಸಬೇಕಾದ ಪ್ರಮುಖ ಕ್ರಮಗಳು ಯಾವುವು?', en: 'What key action steps do I need to follow?' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [doc.chatHistory, isSubmitting]);

  const handleVoiceQuestion = (spokenText: string) => {
    setLastQueryWasVoice(true);
    handleSend(spokenText, true);
  };

  const handleSend = async (questionText: string, isVoice: boolean = false) => {
    const text = questionText.trim();
    if (!text || isSubmitting) return;

    const userMsg: QAMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      timestamp: Date.now(),
      text,
      language: lang
    };

    const newHistory = [...doc.chatHistory, userMsg];
    onUpdateChatHistory(newHistory);
    setInputQuestion('');
    setIsSubmitting(true);

    try {
      const response = await askDocumentQuestion(
        doc.rawKannadaText,
        text,
        apiKey,
        modelName,
        newHistory
      );

      const aiMsg: QAMessage = {
        id: 'msg-ai-' + Date.now(),
        sender: 'assistant',
        timestamp: Date.now(),
        text: response.answer,
        groundedSnippet: response.groundedSnippet,
        language: lang
      };

      onUpdateChatHistory([...newHistory, aiMsg]);

      // If requested by voice, speak the answer aloud in natural Kannada
      if (isVoice || lastQueryWasVoice) {
        try {
          await speechService.speakKannada(response.answer);
        } catch {
          // ignore
        }
        setLastQueryWasVoice(false);
      }
    } catch (err) {
      console.error('Q&A error:', err);
      const errorMsg: QAMessage = {
        id: 'msg-err-' + Date.now(),
        sender: 'assistant',
        timestamp: Date.now(),
        text:
          lang === 'kn'
            ? 'ಕ್ಷಮಿಸಿ, ಪ್ರಶ್ನೆಗೆ ಉತ್ತರಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಪುನಃ ಪ್ರಯತ್ನಿಸಿ.'
            : 'Sorry, could not answer your question. Please try again.',
        language: lang
      };
      onUpdateChatHistory([...newHistory, errorMsg]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearHistory = () => {
    onUpdateChatHistory([]);
  };

  return (
    <div className="space-y-4">
      {/* Citizen Action Hub & Voice Assistant */}
      <VoiceAssistantBar
        doc={doc}
        lang={lang}
        onVoiceQuestion={handleVoiceQuestion}
        isAsking={isSubmitting}
      />

      {/* Main Q&A Interactive Panel */}
      <div className="flex flex-col h-[480px] sm:h-[520px] bg-zinc-50/50 border border-zinc-200/80 rounded-2xl overflow-hidden animate-fadeIn">
      {/* Header */}
      <div className="p-3 sm:p-4 bg-white border-b border-zinc-200/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-zinc-800" />
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-zinc-900 font-kannada">
              {t.askDocTitle}
            </h4>
            <p className="text-[11px] text-zinc-500 hidden sm:block">
              {t.askDocSubtitle}
            </p>
          </div>
        </div>

        {doc.chatHistory.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
            title={t.clearChat}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Suggested Quick Questions */}
      <div className="p-3 bg-zinc-50 border-b border-zinc-200/80 flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-800">
          <HelpCircle className="w-3.5 h-3.5 text-zinc-600" />
          <span>{t.suggestedQuestions}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {suggestedQuestions.map((q, idx) => {
            const questionStr = lang === 'kn' ? q.kn : q.en;
            return (
              <button
                key={idx}
                onClick={() => handleSend(questionStr)}
                disabled={isSubmitting}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-zinc-100 border border-zinc-200/80 text-zinc-800 text-xs font-kannada text-left transition-colors disabled:opacity-50 shadow-2xs cursor-pointer"
              >
                {questionStr}
              </button>
            );
          })}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {doc.chatHistory.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-400 space-y-2">
            <Bot className="w-10 h-10 text-zinc-300 stroke-[1.5]" />
            <p className="text-xs sm:text-sm font-medium text-zinc-500 font-kannada">
              {lang === 'kn'
                ? 'ಈ ದಾಖಲೆಯ ಗಡುವು, ನಿಬಂಧನೆಗಳು ಅಥವಾ ಹಣಕಾಸಿನ ವಿವರಗಳ ಬಗ್ಗೆ ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಿ.'
                : 'Ask any question about deadlines, eligibility, or monetary values mentioned in this document.'}
            </p>
          </div>
        ) : (
          doc.chatHistory.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 max-w-[88%] sm:max-w-[80%] ${
                  isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 ${
                    isUser
                      ? 'bg-zinc-900 text-white'
                      : 'bg-zinc-100 border border-zinc-200 text-zinc-800 shadow-2xs'
                  }`}
                >
                  {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                <div
                  className={`rounded-2xl p-3 sm:p-3.5 text-xs sm:text-sm font-kannada shadow-2xs ${
                    isUser
                      ? 'bg-zinc-900 text-white rounded-tr-none'
                      : 'bg-white border border-zinc-200/80 text-zinc-900 rounded-tl-none space-y-2'
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>

                  {/* Grounded Snippet Citation */}
                  {msg.groundedSnippet && (
                    <div className="pt-2 border-t border-zinc-100 flex items-start gap-1.5 text-[11px] text-zinc-500 bg-zinc-50 p-2 rounded-lg">
                      <Quote className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-zinc-700 block">
                          {t.groundedSnippetLabel}
                        </span>
                        <span className="italic text-zinc-600">
                          "{msg.groundedSnippet}"
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}

        {isSubmitting && (
          <div className="flex gap-2.5 max-w-[80%] mr-auto items-center">
            <div className="w-7 h-7 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="bg-white border border-zinc-200/80 rounded-2xl rounded-tl-none p-3 text-xs text-zinc-500 font-kannada flex items-center gap-2 shadow-2xs">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span>{t.aiThinking}</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-3 bg-white border-t border-zinc-200/80">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputQuestion);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            placeholder={t.askPlaceholder}
            disabled={isSubmitting}
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:border-zinc-400 focus:bg-white outline-none text-xs sm:text-sm font-kannada bg-zinc-50/60 text-zinc-900 disabled:opacity-50 transition-colors"
          />
          <button
            type="submit"
            disabled={!inputQuestion.trim() || isSubmitting}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs sm:text-sm shadow-xs flex items-center gap-1.5 active:scale-95 disabled:opacity-40 transition-all font-kannada shrink-0 cursor-pointer"
          >
            <span>{t.sendQuestion}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  </div>
);
};
