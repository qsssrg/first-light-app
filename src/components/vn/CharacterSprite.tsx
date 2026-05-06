'use client';

import { useState } from 'react';
import type { CharacterId } from '@/lib/scenarios/types';

interface CharacterSpriteProps {
  character: CharacterId;
  expression?: string;
  active: boolean;
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const CHARACTERS = ['haruto', 'sora', 'ren', 'yuuki', 'kai'];

export function CharacterSprite({ character, expression, active }: CharacterSpriteProps) {
  const [imgError, setImgError] = useState(false);
  const [exprError, setExprError] = useState<string | null>(null);

  if (!CHARACTERS.includes(character)) return null;

  // Try expression variant first, fall back to default
  const hasExpression = expression && expression !== 'default' && exprError !== expression;
  const src = hasExpression
    ? `${basePath}/members/${character}_${expression}.png`
    : `${basePath}/members/${character}.png`;

  return (
    <div
      className="absolute bottom-32 left-1/2 -translate-x-1/2 transition-all duration-500 ease-out"
      style={{
        opacity: active ? 1 : 0,
        transform: `translateX(-50%) scale(${active ? 1 : 0.95}) translateY(${active ? 0 : 20}px)`,
      }}
    >
      <div className="relative w-64 h-64 sm:w-80 sm:h-80">
        {!imgError ? (
          <img
            src={src}
            alt={`${character}${expression ? ` (${expression})` : ''}`}
            className="w-full h-full object-contain drop-shadow-2xl rounded-full"
            onError={() => {
              if (hasExpression) {
                setExprError(expression);
              } else {
                setImgError(true);
              }
            }}
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gray-700/50 flex items-center justify-center text-4xl text-white/60 font-bold">
            {character[0].toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
}
