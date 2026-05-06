'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { VNEngine } from '@/components/vn/VNEngine';
import { openingScenario, preAssessmentScenario, postAssessmentScenario } from '@/lib/scenarios/opening';
import type { Scenario } from '@/lib/scenarios/types';

const SCENARIO_MAP: Record<string, Scenario> = {
  opening: openingScenario,
  'pre-assessment': preAssessmentScenario,
  'post-assessment': postAssessmentScenario,
};

function StoryReplayContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id') || 'opening';
  const scenario = SCENARIO_MAP[id];

  if (!scenario) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">ストーリーが見つかりません</p>
      </div>
    );
  }

  // Remove navigation actions for replay (don't redirect to assessment/dashboard)
  const replayScenario: Scenario = {
    ...scenario,
    lines: scenario.lines.filter(line => line.type !== 'action'),
  };

  return (
    <VNEngine
      scenario={replayScenario}
      onComplete={() => router.push('/settings')}
      skippable
    />
  );
}

export default function StoryReplayPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">読み込み中...</div>}>
      <StoryReplayContent />
    </Suspense>
  );
}
