'use client';

import { useState, useEffect } from 'react';
import { BottomNav } from '@/components/common/BottomNav';
import { WritingPractice } from '@/components/writing-practice/WritingPractice';
import { VNModal } from '@/components/vn/VNModal';
import { getRandomWritingIntro } from '@/lib/scenarios/writing-intro';
import type { Scenario } from '@/lib/scenarios/types';

function TitleSlide({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-rose-900 via-pink-900 to-fuchsia-900">
      <div className="animate-title-slide text-center">
        <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-[0_4px_20px_rgba(244,114,182,0.5)]">
          ライティング学習
        </h1>
        <p className="text-lg md:text-xl text-pink-300/70 font-medium mt-2 tracking-widest">
          WRITING
        </p>
      </div>
    </div>
  );
}

export default function WritingStudyPage() {
  const [introScene] = useState<Scenario>(() => getRandomWritingIntro());
  const [phase, setPhase] = useState<'title' | 'story' | 'practice'>('title');

  if (phase === 'title') {
    return <TitleSlide onDone={() => setPhase('story')} />;
  }

  if (phase === 'story') {
    return (
      <VNModal
        scenario={introScene}
        onComplete={() => setPhase('practice')}
        skippable
      />
    );
  }

  return (
    <div className="pb-20">
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto py-6 px-4">
        <WritingPractice />
      </div>
      <BottomNav />
    </div>
  );
}
