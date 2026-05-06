'use client';

import { useState, useEffect, useCallback } from 'react';
import { getMember } from '@/lib/members';
import type { CharacterId } from '@/lib/scenarios/types';

interface TextWindowProps {
  character: CharacterId;
  text: string;
  onComplete: () => void;
  isActive: boolean;
  isInner?: boolean;
}

export function TextWindow({ character, text, onComplete, isActive, isInner }: TextWindowProps) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  const isPlayer = character === 'player';
  const member = !isPlayer && character !== 'narrator' ? getMember(character) : null;
  const name = isPlayer ? 'あなた' : (member?.nameJa ?? '');
  const color = isPlayer ? '#6366f1' : (member?.color ?? '#888');

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i >= text.length) {
        setDisplayed(text);
        setDone(true);
        clearInterval(interval);
      } else {
        setDisplayed(text.slice(0, i));
      }
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  const handleClick = useCallback(() => {
    if (!isActive) return;
    if (!done) {
      setDisplayed(text);
      setDone(true);
    } else {
      onComplete();
    }
  }, [done, text, onComplete, isActive]);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 cursor-pointer select-none"
      onClick={handleClick}
    >
      <div className="mx-4 mb-4 rounded-xl bg-black/80 backdrop-blur-sm border border-white/10 p-4 pb-5">
        {name && !isInner && (
          <div
            className="absolute -top-3 left-8 px-3 py-0.5 rounded-full text-sm font-bold text-white"
            style={{ backgroundColor: color === '#f8f9fa' ? '#333' : color }}
          >
            {name}
          </div>
        )}
        {character === 'narrator' && !isInner && (
          <div className="absolute -top-3 left-8 px-3 py-0.5 rounded-full text-sm font-bold text-white bg-gray-600">
            ナレーション
          </div>
        )}
        {isInner && (
          <div className="absolute -top-3 left-8 px-3 py-0.5 rounded-full text-sm font-bold text-indigo-300 bg-indigo-900/80">
            心の声
          </div>
        )}
        <p className={`text-lg leading-relaxed mt-2 min-h-[3.5rem] ${isInner ? 'text-indigo-200 italic' : 'text-white'}`}>
          {displayed}
          {!done && <span className="animate-pulse">|</span>}
        </p>
        {done && (
          <div className="absolute bottom-2 right-4 text-white/40 text-xs animate-bounce">
            ▼
          </div>
        )}
      </div>
    </div>
  );
}
