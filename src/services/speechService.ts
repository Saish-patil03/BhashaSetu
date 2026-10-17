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

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices(): void {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  public isSupported(): boolean {
    return !!this.synth;
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

    // If Kannada not found, try Hindi or Indian English which pronounces Indian terms well
    if (langCode === 'kn-IN') {
      voice = this.voices.find((v) => v.lang.toLowerCase().includes('in'));
      if (voice) return voice;
    }

    return this.voices[0] || null;
  }

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
    if (!this.synth) return;

    this.stop(); // Stop any active speech

    const lang = options.lang || 'kn-IN';
    const rate = options.rate || 1.0;
    const pitch = options.pitch || 1.0;

    // Clean markdown symbols, asterisks, brackets for clean speech
    const cleanText = text
      .replace(/[#*`_~]/g, '')
      .replace(/\[\?\]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = pitch;

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
    if (this.synth && this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
    }
  }

  public resume(): void {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  public getStatus(): SpeechStatus {
    return {
      isSpeaking: !!(this.synth && this.synth.speaking && !this.synth.paused),
      isPaused: !!(this.synth && this.synth.paused),
      isSupported: !!this.synth,
      currentLang: this.currentUtterance?.lang || 'kn-IN',
      voiceName: this.currentUtterance?.voice?.name || 'Default'
    };
  }
}

export const speechService = new SpeechService();
