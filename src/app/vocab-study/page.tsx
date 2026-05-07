'use client';

import { useState, useEffect } from 'react';
import { BottomNav } from '@/components/common/BottomNav';
import { VocabStudy } from '@/components/vocabulary/VocabStudy';
import { VNModal } from '@/components/vn/VNModal';
import { getRandomVocabIntro } from '@/lib/scenarios/vocab-intro';
import Link from 'next/link';
import type { Scenario } from '@/lib/scenarios/types';

function TitleSlide({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900">
      <div className="animate-title-slide text-center">
        <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-[0_4px_20px_rgba(129,140,248,0.5)]">
          単語学習
        </h1>
        <p className="text-lg md:text-xl text-indigo-300/70 font-medium mt-2 tracking-widest">
          VOCABULARY QUIZ
        </p>
      </div>
    </div>
  );
}

export default function VocabStudyPage() {
  const [introScene] = useState<Scenario>(() => getRandomVocabIntro());
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
        <VocabStudy />
      </div>
      <BottomNav />
    </div>
  );
}
