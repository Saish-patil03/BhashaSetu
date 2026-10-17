export interface SpeechStatus {
  isSpeaking: boolean;
  isPaused: boolean;
  isSupported: boolean;
  currentLang: string;
  voiceName: string;
}

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private currentAudio: HTMLAudioElement | null = null;
  private audioChunks: string[] = [];
  private currentChunkIndex: number = 0;
  private activeOptions: any = null;
  private isAudioPaused: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        this.synth = window.speechSynthesis;
        this.loadVoices();
        if (this.synth.onvoiceschanged !== undefined) {
          this.synth.onvoiceschanged = () => this.loadVoices();
        }
      }
    }
  }

  private loadVoices(): void {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && (!!this.synth || typeof Audio !== 'undefined');
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }

  public findBestVoice(langCode: 'kn-IN' | 'en-IN' | 'hi-IN'): SpeechSynthesisVoice | null {
    if (!this.voices || this.voices.length === 0) {
      this.loadVoices();
    }

    // Try exact match
    let voice = this.voices.find(
      (v) => v.lang.toLowerCase() === langCode.toLowerCase()
    );
    if (voice) return voice;

    // Try prefix match (e.g. 'kn' for 'kn-IN')
    const prefix = langCode.split('-')[0].toLowerCase();
    voice = this.voices.find((v) => v.lang.toLowerCase().startsWith(prefix));
    if (voice) return voice;

    // If looking for Hindi or Indian English
    if (langCode === 'hi-IN' || langCode === 'en-IN') {
      voice = this.voices.find((v) => v.lang.toLowerCase().includes('in'));
      if (voice) return voice;
    }

    // Never return an English voice for Kannada (kn-IN) as Safari will fail silently
    if (langCode === 'kn-IN') {
      return null;
    }

    return this.voices[0] || null;
  }

  /**
   * Chunks long Kannada text into short natural spoken sentences (<= 140 chars)
   */
  private chunkText(text: string, maxLen: number = 140): string[] {
    const clean = text
      .replace(/[#*`_~]/g, '')
      .replace(/\[\?\]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const rawParts = clean.split(/[.\n!?|;]+/);
    const chunks: string[] = [];
    let current = '';

    for (const part of rawParts) {
      const trimmed = part.trim();
      if (!trimmed) continue;

      if ((current + '. ' + trimmed).trim().length <= maxLen) {
        current = current ? (current + '. ' + trimmed) : trimmed;
      } else {
        if (current) chunks.push(current);
        if (trimmed.length > maxLen) {
          const words = trimmed.split(' ');
          let sub = '';
          for (const w of words) {
            if ((sub + ' ' + w).trim().length <= maxLen) {
              sub = sub ? (sub + ' ' + w) : w;
            } else {
              if (sub) chunks.push(sub);
              sub = w;
            }
          }
          if (sub) current = sub;
          else current = '';
        } else {
          current = trimmed;
        }
      }
    }
    if (current) chunks.push(current);
    return chunks.length > 0 ? chunks : [clean];
  }

  /**
   * Speaks text using Google's authentic Kannada TTS stream with automatic Web Speech fallback
   */
  public speak(
    text: string,
    options: {
      lang?: 'kn-IN' | 'en-IN' | 'hi-IN';
      rate?: number;
      pitch?: number;
      onStart?: () => void;
      onEnd?: () => void;
      onError?: (err: any) => void;
    } = {}
  ): void {
    this.stop(); // Stop any active playback

    const lang = options.lang || 'kn-IN';
    const rate = options.rate || 1.0;
    const clean = text
      .replace(/[#*`_~]/g, '')
      .replace(/\[\?\]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!clean) return;

    // 1. Primary Engine: High-fidelity natural Kannada TTS audio stream (Works on Mac Safari, iOS, Android, Chrome)
    const isKannada = lang.startsWith('kn') || /[\u0C80-\u0CFF]/.test(clean);
    if (isKannada && typeof Audio !== 'undefined') {
      const chunks = this.chunkText(clean, 130);
      if (chunks.length > 0) {
        this.audioChunks = chunks;
        this.currentChunkIndex = 0;
        this.activeOptions = options;
        this.isAudioPaused = false;
        options.onStart?.();
        this.playNextAudioChunk(rate);
        return;
      }
    }

    // 2. Secondary Engine: Web Speech Synthesis API
    if (this.synth) {
      try {
        const utterance = new SpeechSynthesisUtterance(clean);
        utterance.lang = lang;
        utterance.rate = rate;
        utterance.pitch = options.pitch || 1.0;

        const matchedVoice = this.findBestVoice(lang);
        if (matchedVoice) {
          utterance.voice = matchedVoice;
        }

        utterance.onstart = () => {
          options.onStart?.();
        };

        utterance.onend = () => {
          this.currentUtterance = null;
          options.onEnd?.();
        };

        utterance.onerror = (e) => {
          this.currentUtterance = null;
          options.onError?.(e);
        };

        this.currentUtterance = utterance;
        this.synth.speak(utterance);
      } catch (err) {
        console.warn('SpeechSynthesis error:', err);
        options.onError?.(err);
      }
    }
  }

  private playNextAudioChunk(rate: number): void {
    if (this.currentChunkIndex >= this.audioChunks.length) {
      this.currentAudio = null;
      this.activeOptions?.onEnd?.();
      return;
    }

    const chunk = this.audioChunks[this.currentChunkIndex];
    const encoded = encodeURIComponent(chunk);
    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=kn&client=tw-ob&q=${encoded}`;

    try {
      const audio = new Audio(audioUrl);
      audio.playbackRate = rate;

      audio.onended = () => {
        this.currentChunkIndex++;
        this.playNextAudioChunk(rate);
      };

      audio.onerror = (e) => {
        console.warn('Audio stream error, falling back to speech synthesis:', e);
        this.currentAudio = null;
        // Fallback to remaining text via SpeechSynthesis
        const remainingText = this.audioChunks.slice(this.currentChunkIndex).join('. ');
        if (this.synth && remainingText) {
          const u = new SpeechSynthesisUtterance(remainingText);
          u.lang = 'kn-IN';
          u.rate = rate;
          u.onend = () => this.activeOptions?.onEnd?.();
          this.synth.speak(u);
        } else {
          this.activeOptions?.onEnd?.();
        }
      };

      this.currentAudio = audio;
      audio.play().catch((playErr) => {
        console.warn('Audio play was prevented or failed:', playErr);
        this.activeOptions?.onError?.(playErr);
      });
    } catch (err) {
      console.warn('Could not initialize Audio:', err);
      this.activeOptions?.onError?.(err);
    }
  }

  public speakKannada(text: string): Promise<void> {
    return new Promise((resolve) => {
      this.speak(text, {
        lang: 'kn-IN',
        onEnd: () => resolve(),
        onError: () => resolve()
      });
    });
  }

  public pause(): void {
    if (this.currentAudio && !this.currentAudio.paused) {
      this.currentAudio.pause();
      this.isAudioPaused = true;
      return;
    }
    if (this.synth && this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
    }
  }

  public resume(): void {
    if (this.currentAudio && this.isAudioPaused) {
      this.currentAudio.play().catch(console.warn);
      this.isAudioPaused = false;
      return;
    }
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  public stop(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    this.audioChunks = [];
    this.currentChunkIndex = 0;
    this.isAudioPaused = false;

    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {
        // ignore
      }
      this.currentUtterance = null;
    }
  }

  public getStatus(): SpeechStatus {
    const isAudioPlaying = !!(this.currentAudio && !this.currentAudio.paused);
    const isAudioPaused = this.isAudioPaused;
    const isSynthSpeaking = !!(this.synth && this.synth.speaking && !this.synth.paused);
    const isSynthPaused = !!(this.synth && this.synth.paused);

    return {
      isSpeaking: isAudioPlaying || isSynthSpeaking,
      isPaused: isAudioPaused || isSynthPaused,
      isSupported: this.isSupported(),
      currentLang: 'kn-IN',
      voiceName: isAudioPlaying ? 'Kannada Natural Voice (kn-IN)' : 'Default'
    };
  }
}

export const speechService = new SpeechService();
