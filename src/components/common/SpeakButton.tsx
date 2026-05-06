'use client';

import { useState, useCallback } from 'react';
import { Volume2 } from 'lucide-react';

interface SpeakButtonProps {
  text: string;
  lang?: string;
  rate?: number;
  className?: string;
}

export function SpeakButton({ text, lang = 'en-US', rate = 0.9, className = '' }: SpeakButtonProps) {
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [text, lang, rate]);

  return (
    <button
      onClick={(e) => { e.stopPropagation(); handleSpeak(); }}
      className={`inline-flex items-center justify-center p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${className}`}
      aria-label="読み上げ"
    >
      <Volume2
        className={`w-4 h-4 ${speaking ? 'text-indigo-500 animate-pulse' : 'text-gray-400'}`}
      />
    </button>
  );
}
