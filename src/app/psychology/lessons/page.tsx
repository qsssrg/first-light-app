'use client';

import { useState } from 'react';
import { BottomNav } from '@/components/common/BottomNav';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import { getMember } from '@/lib/members';
import { ChevronDown } from 'lucide-react';
import lessonsData from '@/data/psychology/weekly-lessons.json';

const MEMBER_FOR_WEEK: Record<number, string> = {
  1: 'kai', 2: 'haruto', 3: 'yuuki', 4: 'ren', 5: 'sora',
  6: 'kai', 7: 'haruto', 8: 'yuuki', 9: 'ren', 10: 'sora',
  11: 'kai', 12: 'haruto', 13: 'kai',
};

export default function LessonsPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="pb-20">
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto py-6 px-4 space-y-4">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-teal-600 via-emerald-500 to-green-400 p-5 text-white shadow-lg mb-2">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
        <div className="relative">
          <h2 className="text-xl font-black tracking-wide">週次レッスン</h2>
          <p className="text-xs opacity-60 mt-0.5">Weekly Lessons</p>
        </div>
      </div>
        <p className="text-xs text-gray-500">13週間の構造化学習プログラム</p>

        <div className="space-y-3">
          {(lessonsData as any[]).map((lesson, i) => {
            const member = getMember(MEMBER_FOR_WEEK[lesson.week] || 'kai');
            const isExpanded = expanded === lesson.week;

            return (
              <Card
                key={lesson.week}
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setExpanded(isExpanded ? null : lesson.week)}
              >
                <div className="flex items-center gap-3">
                  {member && <MemberAvatar member={member} size="sm" />}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Week {lesson.week}</span>
                      <Badge variant="secondary" className="text-[10px]">{lesson.category}</Badge>
                    </div>
                    <h3 className="text-sm font-bold">{lesson.title}</h3>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>

                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 space-y-3">
                    {lesson.objectives && (
                      <div>
                        <p className="text-xs font-medium mb-1">学習目標</p>
                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                          {lesson.objectives.map((o: string, j: number) => (
                            <li key={j}>・{o}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {lesson.content && (
                      <p className="text-xs text-gray-700 dark:text-gray-300">{lesson.content}</p>
                    )}

                    {lesson.oshikatsu_exercise && (
                      <div className="bg-purple-50 dark:bg-purple-950/30 rounded-lg p-3">
                        <p className="text-xs font-medium text-purple-700 dark:text-purple-300 mb-1">推し活エクササイズ</p>
                        <p className="text-xs text-purple-600 dark:text-purple-400">{lesson.oshikatsu_exercise}</p>
                      </div>
                    )}

                    {lesson.discussion_question && (
                      <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3">
                        <p className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-1">議論問題</p>
                        <p className="text-xs text-blue-600 dark:text-blue-400">{lesson.discussion_question}</p>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
