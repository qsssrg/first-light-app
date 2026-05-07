'use client';

import { CHAPTERS } from '@/lib/chapters';
import { MEMBERS } from '@/lib/members';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock } from 'lucide-react';
import Link from 'next/link';

export function ChapterMap() {
  return (
    <div className="space-y-4 px-4">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-amber-600 via-orange-500 to-yellow-400 p-5 text-white shadow-lg mb-2">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
        <div className="relative">
          <h2 className="text-xl font-black tracking-wide">チャプター</h2>
          <p className="text-xs opacity-60 mt-0.5">Chapter Map</p>
        </div>
      </div>
      <div className="space-y-3">
        {CHAPTERS.map(chapter => {
          const member = MEMBERS.find(m => m.id === chapter.memberId);
          const hasStages = chapter.stages.length > 0;
          return (
            <Link
              key={chapter.id}
              href={hasStages ? `/chapters/${chapter.id}` : '#'}
              className={!hasStages ? 'pointer-events-none' : ''}
            >
              <Card className={`p-4 hover:shadow-md transition-shadow ${!hasStages ? 'opacity-50' : ''}`}>
                <div className="flex items-center gap-4">
                  {member && <MemberAvatar member={member} size="lg" />}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm">Ch.{chapter.number} {chapter.titleJa}</h3>
                      {!hasStages && <Lock className="w-3 h-3 text-gray-400" />}
                    </div>
                    <p className="text-xs text-gray-500">{chapter.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{chapter.description}</p>
                    {hasStages && (
                      <Badge variant="secondary" className="mt-2 text-[10px]">
                        {chapter.stages.length}ステージ
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
