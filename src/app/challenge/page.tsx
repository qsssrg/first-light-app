'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { BottomNav } from '@/components/common/BottomNav';
import { ChallengeTest } from '@/components/challenge/ChallengeTest';
import { VNModal } from '@/components/vn/VNModal';
import { getTestScenario } from '@/lib/scenarios/adapter';
import type { Scenario } from '@/lib/scenarios/types';

function ChallengeContent() {
  const searchParams = useSearchParams();
  const stageId = searchParams.get('stageId') || 'ch1-s1';
  const [phase, setPhase] = useState<'pre' | 'test' | 'post'>('pre');
  const [preScene, setPreScene] = useState<Scenario | null>(null);
  const [postScene, setPostScene] = useState<Scenario | null>(null);

  useEffect(() => {
    const chapterMatch = stageId.match(/ch(\d+)/);
    const chapterNum = chapterMatch ? parseInt(chapterMatch[1], 10) : 1;
    const pre = getTestScenario('pre', chapterNum);
    if (pre) {
      setPreScene(pre);
    } else {
      setPhase('test');
    }
  }, [stageId]);

  if (phase === 'pre' && preScene) {
    return (
      <VNModal
        scenario={preScene}
        onComplete={() => setPhase('test')}
      />
    );
  }

  if (phase === 'post' && postScene) {
    return (
      <VNModal
        scenario={postScene}
        onComplete={() => {
          setPostScene(null);
          setPhase('test');
        }}
      />
    );
  }

  return (
    <div className="pb-20">
      <div className="max-w-lg mx-auto py-6">
        <ChallengeTest
          stageId={stageId}
          onTestComplete={(passed: boolean) => {
            const chapterMatch = stageId.match(/ch(\d+)/);
            const chapterNum = chapterMatch ? parseInt(chapterMatch[1], 10) : 1;
            const scene = getTestScenario(passed ? 'pass' : 'fail', chapterNum);
            if (scene) {
              setPostScene(scene);
              setPhase('post');
            }
          }}
        />
      </div>
      <BottomNav />
    </div>
  );
}

export default function ChallengePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">読み込み中...</div>}>
      <ChallengeContent />
    </Suspense>
  );
}
