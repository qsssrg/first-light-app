'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Play } from 'lucide-react';
import { VNEngine } from '@/components/vn/VNEngine';
import { CHAPTER_STORIES } from '@/lib/scenarios/chapter-stories';
import { BASIC_CHAPTERS, ADVANCED_CHAPTERS } from '@/lib/chapters';
import type { Scenario } from '@/lib/scenarios/types';

const ALL_CHAPTERS = [...BASIC_CHAPTERS, ...ADVANCED_CHAPTERS];

export default function StoryPreviewPage() {
  const [playing, setPlaying] = useState<Scenario | null>(null);

  if (playing) {
    return <VNEngine scenario={playing} onComplete={() => setPlaying(null)} skippable />;
  }

  return (
    <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto py-6 px-4 space-y-6">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-500 p-5 text-white shadow-lg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
        <div className="relative">
          <h2 className="text-xl font-black tracking-wide">ストーリー確認</h2>
          <p className="text-xs opacity-60 mt-0.5">Story Preview (Debug)</p>
        </div>
      </div>

      {ALL_CHAPTERS.map(chapter => {
        const stories = CHAPTER_STORIES[chapter.id];
        return (
          <Card key={chapter.id} className="p-4">
            <h3 className="text-sm font-bold mb-2">Ch.{chapter.number} {chapter.titleJa}</h3>
            <p className="text-xs text-gray-500 mb-3">{chapter.title} — {chapter.description}</p>
            {stories ? (
              <div className="flex gap-2">
                <button
                  onClick={() => setPlaying(stories.intro)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
                >
                  <Play className="w-3.5 h-3.5" /> 導入
                </button>
                <button
                  onClick={() => setPlaying(stories.outro)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 text-xs font-medium hover:bg-amber-200 dark:hover:bg-amber-800 transition-colors"
                >
                  <Play className="w-3.5 h-3.5" /> 完了
                </button>
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">ストーリー未実装</p>
            )}
          </Card>
        );
      })}
    </div>
  );
}
