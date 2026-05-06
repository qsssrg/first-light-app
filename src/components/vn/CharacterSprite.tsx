'use client';

import Image from 'next/image';
import type { CharacterId } from '@/lib/scenarios/types';

interface CharacterSpriteProps {
  character: CharacterId;
  active: boolean;
}

const SPRITE_MAP: Record<string, string> = {
  haruto: '/members/haruto.png',
  sora: '/members/sora.png',
  ren: '/members/ren.png',
  yuuki: '/members/yuuki.png',
  kai: '/members/kai.png',
};

export function CharacterSprite({ character, active }: CharacterSpriteProps) {
  const src = SPRITE_MAP[character];
  if (!src) return null;

  return (
    <div
      className="absolute bottom-32 left-1/2 -translate-x-1/2 transition-all duration-500 ease-out"
      style={{
        opacity: active ? 1 : 0,
        transform: `translateX(-50%) scale(${active ? 1 : 0.95}) translateY(${active ? 0 : 20}px)`,
      }}
    >
      <div className="relative w-64 h-64 sm:w-80 sm:h-80">
        <Image
          src={src}
          alt={character}
          fill
          className="object-contain drop-shadow-2xl rounded-full"
          priority
        />
      </div>
    </div>
  );
}
