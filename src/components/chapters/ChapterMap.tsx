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
      <h2 className="text-lg font-bold">チャプター</h2>
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
