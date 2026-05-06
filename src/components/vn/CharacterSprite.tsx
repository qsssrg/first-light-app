'use client';

import type { CharacterId } from '@/lib/scenarios/types';

interface CharacterSpriteProps {
  character: CharacterId;
  active: boolean;
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const CHARACTERS = ['haruto', 'sora', 'ren', 'yuuki', 'kai'];

export function CharacterSprite({ character, active }: CharacterSpriteProps) {
  if (!CHARACTERS.includes(character)) return null;

  const src = `${basePath}/members/${character}.png`;

  return (
    <div
      className="absolute bottom-32 left-1/2 -translate-x-1/2 transition-all duration-500 ease-out"
      style={{
        opacity: active ? 1 : 0,
        transform: `translateX(-50%) scale(${active ? 1 : 0.95}) translateY(${active ? 0 : 20}px)`,
      }}
    >
      <div className="relative w-64 h-64 sm:w-80 sm:h-80">
        <img
          src={src}
          alt={character}
          className="w-full h-full object-contain drop-shadow-2xl rounded-full"
        />
      </div>
    </div>
  );
}
