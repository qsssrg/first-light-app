'use client';

import { useState, useMemo } from 'react';
import { BottomNav } from '@/components/common/BottomNav';
import { Card } from '@/components/ui/card';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import { getMember } from '@/lib/members';
import { Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';
import tipsData from '@/data/psychology/daily-tips.json';

const MEMBER_FOR_WEEK: Record<number, string> = {
  1: 'kai', 2: 'haruto', 3: 'yuuki', 4: 'ren', 5: 'sora',
  6: 'kai', 7: 'haruto', 8: 'yuuki', 9: 'ren', 10: 'sora',
  11: 'kai', 12: 'haruto', 13: 'kai',
};

export default function TipsPage() {
  const tips = tipsData as any[];

  // Today's tip based on day of year
  const todayIndex = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    return dayOfYear % tips.length;
  }, [tips.length]);

  const [currentIndex, setCurrentIndex] = useState(todayIndex);
  const tip = tips[currentIndex];
  const member = getMember(MEMBER_FOR_WEEK[tip?.week] || 'kai');

  const prev = () => setCurrentIndex((currentIndex - 1 + tips.length) % tips.length);
  const next = () => setCurrentIndex((currentIndex + 1) % tips.length);

  return (
    <div className="pb-20">
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto py-6 px-4 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">心理学Tips</h2>
          <span className="text-xs text-gray-500">{currentIndex + 1} / {tips.length}</span>
        </div>

        {/* Today's tip */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            <h3 className="text-sm font-bold">{tip?.title}</h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
            <span>Week {tip?.week} Day {tip?.day}</span>
          </div>

          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{tip?.content}</p>

          {tip?.oshikatsu_connection && (
            <div className="bg-purple-50 dark:bg-purple-950/30 rounded-lg p-3 mb-3">
              <p className="text-xs font-medium text-purple-700 dark:text-purple-300 mb-1">推し活コネクション</p>
              <p className="text-xs text-purple-600 dark:text-purple-400">{tip.oshikatsu_connection}</p>
            </div>
          )}

          {tip?.first_light_comment && member && (
            <div className="flex items-start gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
              <MemberAvatar member={member} size="sm" />
              <p className="text-xs italic text-gray-600 dark:text-gray-400">「{tip.first_light_comment}」</p>
            </div>
          )}
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button onClick={prev} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentIndex(todayIndex)}
            className="px-3 py-1.5 text-xs rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 font-medium"
          >
            今日のTip
          </button>
          <button onClick={next} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Week overview */}
        <div>
          <h3 className="text-sm font-bold mb-2">一覧（Week {tip?.week}）</h3>
          <div className="space-y-1.5">
            {tips.filter((t: any) => t.week === tip?.week).map((t: any, i: number) => {
              const idx = tips.indexOf(t);
              return (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                    idx === currentIndex
                      ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Day {t.day}: {t.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
