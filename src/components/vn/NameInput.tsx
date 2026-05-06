'use client';

import { useState } from 'react';

interface NameInputProps {
  prompt: string;
  placeholder?: string;
  onSubmit: (value: string) => void;
}

export function NameInput({ prompt, placeholder = '名前を入力', onSubmit }: NameInputProps) {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (trimmed.length > 0) {
      onSubmit(trimmed);
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0">
      <div className="mx-4 mb-4 rounded-xl bg-black/80 backdrop-blur-sm border border-white/10 p-5">
        <p className="text-white text-lg leading-relaxed mb-4">{prompt}</p>
        <div className="flex gap-3">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder={placeholder}
            className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-lg focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
            autoFocus
            maxLength={20}
          />
          <button
            onClick={handleSubmit}
            disabled={value.trim().length === 0}
            className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium transition-colors"
          >
            決定
          </button>
        </div>
      </div>
    </div>
  );
}
