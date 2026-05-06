'use client';

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { getChapter } from '@/lib/chapters';
import { MEMBERS } from '@/lib/members';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Trophy } from 'lucide-react';
import Link from 'next/link';
import type { Stage } from '@/types';

interface Props {
  chapterId: string;
}

export function ChapterDetail({ chapterId }: Props) {
  const chapter = getChapter(chapterId);
  const progressData = useLiveQuery(() => db.stageProgress.toArray()) ?? [];

  if (!chapter) return <p className="text-center text-gray-500 p-8">チャプターが見つかりません</p>;

  const member = MEMBERS.find(m => m.id === chapter.memberId);

  return (
    <div className="space-y-6 px-4">
      {/* Chapter header */}
      <div className="text-center py-4">
        {member && <MemberAvatar member={member} size="xl" showName />}
        <h2 className="text-lg font-bold mt-3">Ch.{chapter.number} {chapter.titleJa}</h2>
        <p className="text-xs text-gray-500 mt-1">{chapter.description}</p>
      </div>

      {/* Stages */}
      <div className="space-y-3">
        {chapter.stages.map((stage, index) => {
          const progress = progressData.find(p => p.stageId === stage.id);
          const percent = progress ? (progress.completedWords / progress.totalWords) * 100 : 0;
          const isAvailable = index <= 1; // Only stages 1-1 and 1-2 available in Phase2

          return (
            <StageCard
              key={stage.id}
              stage={stage}
              percent={percent}
              isAvailable={isAvailable}
              passed={progress ? progress.bestScore >= 80 : false}
            />
          );
        })}
      </div>

      {/* Challenge test link */}
      <Card className="p-4 border-dashed">
        <Link href={`/challenge?chapterId=${chapterId}`} className="flex items-center gap-3">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
            <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <p className="text-sm font-medium">チャレンジテスト</p>
            <p className="text-xs text-gray-500">各ステージの実力を確認しよう</p>
          </div>
        </Link>
      </Card>
    </div>
  );
}

function StageCard({ stage, percent, isAvailable, passed }: {
  stage: Stage;
  percent: number;
  isAvailable: boolean;
  passed: boolean;
}) {
  const levelColor = {
    eiken2: 'bg-green-100 text-green-700',
    eiken_pre1: 'bg-blue-100 text-blue-700',
    eiken1: 'bg-purple-100 text-purple-700',
    toefl: 'bg-orange-100 text-orange-700',
  }[stage.level];

  const levelLabel = {
    eiken2: '2級',
    eiken_pre1: '準1級',
    eiken1: '1級',
    toefl: 'TOEFL',
  }[stage.level];

  return (
    <Link href={isAvailable ? `/vocabulary?stage=${stage.id}` : '#'} className={!isAvailable ? 'pointer-events-none' : ''}>
      <Card className={`p-4 transition-shadow ${isAvailable ? 'hover:shadow-md' : 'opacity-50'}`}>
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            {passed ? (
              <Trophy className="w-4 h-4 text-yellow-500" />
            ) : (
              <BookOpen className="w-4 h-4 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium">Stage {stage.number}</h4>
              <Badge className={`text-[10px] ${levelColor}`}>{levelLabel}</Badge>
            </div>
            <p className="text-xs text-gray-500">{stage.title}</p>
            {percent > 0 && (
              <Progress value={percent} className="h-1 mt-2" />
            )}
          </div>
          <span className="text-xs text-gray-400">{stage.wordCount}語</span>
        </div>
      </Card>
    </Link>
  );
}
