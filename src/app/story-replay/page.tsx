'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { VNEngine } from '@/components/vn/VNEngine';
import { openingScenario, preAssessmentScenario, postAssessmentScenario } from '@/lib/scenarios/opening';
import { getRandomVocabIntro } from '@/lib/scenarios/vocab-intro';
import { psychologyOfferScenario } from '@/lib/scenarios/psychology-intro';
// Member memories are now shown inline on member detail pages
import { isPsychologyUnlocked } from '@/lib/psychology-settings';
import { BottomNav } from '@/components/common/BottomNav';
import { Card } from '@/components/ui/card';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import { getMember } from '@/lib/members';
import type { Scenario } from '@/lib/scenarios/types';

interface StoryEntry {
  id: string;
  title: string;
  line1: string;
  line2: string;
  memberId?: string;
  condition?: () => boolean;
}

const STORY_LIST: StoryEntry[] = [
  // Main stories
  { id: 'opening', title: 'オープニング', line1: '夜の繁華街、リムジンとの遭遇。', line2: 'FIRST LIGHTとの運命の出会い。' },
  { id: 'pre-assessment', title: 'アセスメント前', line1: '翌日、芸能オフィスに呼ばれて。', line2: 'メンバー全員が待つ会議室へ。' },
  { id: 'post-assessment', title: 'アセスメント後', line1: '英語力チェックの結果を受けて。', line2: 'FIRST LIGHT、活動開始。' },
  { id: 'vocab-intro', title: 'ハルトと単語練習', line1: '練習スタジオでハルトと二人。', line2: '言葉の意味を一緒に探る時間。', memberId: 'haruto' },
  { id: 'psychology-offer', title: '心理学番組オファー', line1: 'YouTube番組から出演依頼が。', line2: 'メンバーと心理学を学ぶ新たな挑戦。', condition: isPsychologyUnlocked },
];

const SCENARIO_MAP: Record<string, Scenario | (() => Scenario)> = {
  opening: openingScenario,
  'pre-assessment': preAssessmentScenario,
  'post-assessment': postAssessmentScenario,
  'vocab-intro': getRandomVocabIntro,
  'psychology-offer': psychologyOfferScenario,
};

function StoryReplayContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');

  // If no ID, show the list
  if (!id) {
    return <StoryList />;
  }

  const entry = SCENARIO_MAP[id];
  if (!entry) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">ストーリーが見つかりません</p>
      </div>
    );
  }

  const scenario = typeof entry === 'function' ? entry() : entry;
  const replayScenario: Scenario = {
    ...scenario,
    lines: scenario.lines.filter(line => line.type !== 'action'),
  };

  return (
    <VNEngine
      scenario={replayScenario}
      onComplete={() => router.push('/story-replay')}
      skippable
    />
  );
}

function StoryList() {
  const router = useRouter();
  const [visibleStories, setVisibleStories] = useState<StoryEntry[]>([]);

  useEffect(() => {
    setVisibleStories(STORY_LIST.filter(s => !s.condition || s.condition()));
  }, []);

  return (
    <div className="pb-20">
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto py-6 px-4 space-y-4">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500 p-5 text-white shadow-lg mb-2">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
        <div className="relative">
          <h2 className="text-xl font-black tracking-wide">ストーリー回想</h2>
          <p className="text-xs opacity-60 mt-0.5">Story Replay</p>
        </div>
      </div>
        <p className="text-xs text-gray-500">過去に見たストーリーをもう一度再生できます</p>

        <div className="space-y-3">
          {visibleStories.map(story => {
            const member = story.memberId ? getMember(story.memberId) : null;
            return (
              <Card
                key={story.id}
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => router.push(`/story-replay?id=${story.id}`)}
              >
                <div className="flex items-center gap-3">
                  {member && <MemberAvatar member={member} size="sm" />}
                  <div className="flex-1">
                    <h3 className="text-sm font-bold">{story.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{story.line1}</p>
                    <p className="text-xs text-gray-500">{story.line2}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default function StoryReplayPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">読み込み中...</div>}>
      <StoryReplayContent />
    </Suspense>
  );
}
