'use client';

import { useState, useEffect } from 'react';
import { BottomNav } from '@/components/common/BottomNav';
import { ReadingPractice } from '@/components/reading/ReadingPractice';
import { VNModal } from '@/components/vn/VNModal';
import { getRandomReadingIntro } from '@/lib/scenarios/reading-intro';
import type { Scenario } from '@/lib/scenarios/types';

function TitleSlide({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900">
      <div className="animate-title-slide text-center">
        <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-[0_4px_20px_rgba(34,197,94,0.5)]">
          リーディング学習
        </h1>
        <p className="text-lg md:text-xl text-green-300/70 font-medium mt-2 tracking-widest">
          READING
        </p>
      </div>
    </div>
  );
}

export default function ReadingStudyPage() {
  const [introScene] = useState<Scenario>(() => getRandomReadingIntro());
  const [phase, setPhase] = useState<'title' | 'story' | 'study'>('title');

  if (phase === 'title') {
    return <TitleSlide onDone={() => setPhase('story')} />;
  }

  if (phase === 'story') {
    return (
      <VNModal
        scenario={introScene}
        onComplete={() => setPhase('study')}
        skippable
      />
    );
  }

  return (
    <div className="pb-20">
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto py-6">
        <ReadingPractice />
      </div>
      <BottomNav />
    </div>
  );
}
