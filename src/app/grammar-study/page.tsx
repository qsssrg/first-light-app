'use client';

import { useState, useEffect } from 'react';
import { BottomNav } from '@/components/common/BottomNav';
import { GrammarPractice } from '@/components/grammar-practice/GrammarPractice';
import { VNModal } from '@/components/vn/VNModal';
import { getRandomGrammarIntro } from '@/lib/scenarios/grammar-intro';
import type { Scenario } from '@/lib/scenarios/types';

function TitleSlide({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-800 via-slate-800 to-zinc-900">
      <div className="animate-title-slide text-center">
        <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-[0_4px_20px_rgba(148,163,184,0.5)]">
          文法学習
        </h1>
        <p className="text-lg md:text-xl text-slate-300/70 font-medium mt-2 tracking-widest">
          GRAMMAR
        </p>
      </div>
    </div>
  );
}

export default function GrammarStudyPage() {
  const [introScene] = useState<Scenario>(() => getRandomGrammarIntro());
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
        <GrammarPractice />
      </div>
      <BottomNav />
    </div>
  );
}
