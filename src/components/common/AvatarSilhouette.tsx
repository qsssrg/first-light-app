'use client';

import type { AvatarStyle } from '@/lib/user-avatar';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const AVATAR_FILES: Record<AvatarStyle, string> = {
  default: 'avatar-medium.png',
  short: 'avatar-short.png',
  bob: 'avatar-bob.png',
  twin: 'avatar-twintail.png',
  ponytail: 'avatar-ponytail.png',
  long: 'avatar-long.png',
  bun: 'avatar-bun.png',
};

export function AvatarSilhouette({ style, size = 40, className = '' }: { style: AvatarStyle; size?: number; className?: string }) {
  const file = AVATAR_FILES[style] ?? AVATAR_FILES.default;
  return (
    <img
      src={`${basePath}/avatars/${file}`}
      alt={style}
      width={size}
      height={size}
      className={`rounded-full object-cover ${className}`}
    />
  );
}
