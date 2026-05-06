'use client';

import type { Member } from '@/types';

interface MemberAvatarProps {
  member: Member;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showName?: boolean;
}

const SIZES = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-16 h-16 text-base',
  xl: 'w-24 h-24 text-xl',
};

export function MemberAvatar({ member, size = 'md', showName = false }: MemberAvatarProps) {
  const initial = member.name[0];
  const isLight = member.id === 'kai'; // White color needs dark text

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`${SIZES[size]} rounded-full flex items-center justify-center font-bold shadow-md`}
        style={{
          backgroundColor: member.color,
          color: isLight ? '#374151' : '#ffffff',
          border: isLight ? '2px solid #e5e7eb' : 'none',
        }}
      >
        {initial}
      </div>
      {showName && (
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
          {member.nameJa}
        </span>
      )}
    </div>
  );
}
