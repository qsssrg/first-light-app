'use client';

import { BASIC_CHAPTERS, ADVANCED_CHAPTERS } from '@/lib/chapters';
import { MEMBERS } from '@/lib/members';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import { Card } from '@/components/ui/card';
import { Lock, Crown } from 'lucide-react';
import Link from 'next/link';

export function ChapterMap() {
  // TODO: check stageProgress to determine if all basic chapters are cleared
  // For now, advanced chapters are always visible but show a "clear all basic" hint
  const allBasicCleared = false; // placeholder

  return (
    <div className="space-y-4 px-4">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-amber-600 via-orange-500 to-yellow-400 p-5 text-white shadow-lg mb-2">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
        <div className="relative">
          <h2 className="text-xl font-black tracking-wide">チャプター</h2>
          <p className="text-xs opacity-60 mt-0.5">Chapter Map</p>
        </div>
      </div>

      {/* Basic chapters — all unlocked */}
      <div className="space-y-3">
        {BASIC_CHAPTERS.map(chapter => {
          const member = MEMBERS.find(m => m.id === chapter.memberId);
          return (
            <Link key={chapter.id} href={`/chapters/${chapter.id}`}>
              <Card className="p-4 hover:shadow-md transition-shadow active:scale-[0.98]">
                <div className="flex items-center gap-4">
                  {member && <MemberAvatar member={member} size="lg" />}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm">Ch.{chapter.number} {chapter.titleJa}</h3>
                    </div>
                    <p className="text-xs text-gray-500">{chapter.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{chapter.description}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{chapter.stages.length}ステージ</p>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Advanced chapters */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-3">
          <Crown className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-black tracking-wide">上級チャプター</h3>
        </div>
        {!allBasicCleared && (
          <p className="text-xs text-gray-500 mb-3">基本5チャプターをクリアすると解放されます</p>
        )}
        <div className="space-y-3">
          {ADVANCED_CHAPTERS.map(chapter => {
            const member = MEMBERS.find(m => m.id === chapter.memberId);
            return (
              <Link
                key={chapter.id}
                href={allBasicCleared ? `/chapters/${chapter.id}` : '#'}
                className={!allBasicCleared ? 'pointer-events-none' : ''}
              >
                <Card className={`p-4 transition-shadow ${!allBasicCleared ? 'opacity-40' : 'hover:shadow-md active:scale-[0.98]'}`}>
                  <div className="flex items-center gap-4">
                    {member && <MemberAvatar member={member} size="lg" />}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm">Ch.{chapter.number} {chapter.titleJa}</h3>
                        {!allBasicCleared && <Lock className="w-3 h-3 text-gray-400" />}
                      </div>
                      <p className="text-xs text-gray-500">{chapter.title}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{chapter.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
