'use client';

import type { AvatarStyle } from '@/lib/user-avatar';

const PATHS: Record<AvatarStyle, string> = {
  default: 'M32 20a10 10 0 1 0 0-0.01ZM16 52c0-8.8 7.2-16 16-16s16 7.2 16 16',
  short: 'M22 12c0-3 3-6 10-6s10 3 10 6v6c0 5-4 10-10 10S22 23 22 18ZM16 52c0-8.8 7.2-16 16-16s16 7.2 16 16',
  bob: 'M20 10c0-3 4-6 12-6s12 3 12 6v12c0 4-3 8-6 9v3c3 0 6-5 6-9V10M20 10v12c0 4 3 8 6 9v3c-3 0-6-5-6-9M32 34a10 10 0 0 0 0-0.01ZM16 52c0-8.8 7.2-16 16-16s16 7.2 16 16',
  twin: 'M32 20a10 10 0 1 0 0-0.01ZM18 8c-2 0-4 2-4 6v8l4-2V8ZM46 8c2 0 4 2 4 6v8l-4-2V8ZM16 52c0-8.8 7.2-16 16-16s16 7.2 16 16',
  ponytail: 'M32 20a10 10 0 1 0 0-0.01ZM42 12c4 0 6 4 6 8s-2 6-4 8l-2 14h-2l1-12c-2 1-4 2-6 2M16 52c0-8.8 7.2-16 16-16s16 7.2 16 16',
  long: 'M32 20a10 10 0 1 0 0-0.01ZM20 14v22c0 2 2 4 4 4h0M44 14v22c0 2-2 4-4 4h0M16 52c0-8.8 7.2-16 16-16s16 7.2 16 16',
  bun: 'M32 20a10 10 0 1 0 0-0.01ZM28 4a6 6 0 0 1 8 0 6 6 0 0 1-8 0ZM16 52c0-8.8 7.2-16 16-16s16 7.2 16 16',
};

export function AvatarSilhouette({ style, size = 40, className = '' }: { style: AvatarStyle; size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 64 56" width={size} height={size * 0.875} className={className} fill="currentColor">
      <path d={PATHS[style] ?? PATHS.default} />
    </svg>
  );
}
