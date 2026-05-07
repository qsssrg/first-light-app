'use client';

import { useState, useEffect } from 'react';
import { BottomNav } from '@/components/common/BottomNav';
import { VocabStudy } from '@/components/vocabulary/VocabStudy';
import { VocabList } from '@/components/vocabulary/VocabList';
import { VNModal } from '@/components/vn/VNModal';
import { getRandomVocabIntro } from '@/lib/scenarios/vocab-intro';
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
          単語帳
        </h1>
        <p className="text-lg md:text-xl text-indigo-300/70 font-medium mt-2 tracking-widest">
          VOCABULARY
        </p>
      </div>
    </div>
  );
}

export default function VocabularyPage() {
  const [introScene] = useState<Scenario>(() => getRandomVocabIntro());
  const [phase, setPhase] = useState<'title' | 'story' | 'study'>('title');
  const [view, setView] = useState<'study' | 'list'>('study');

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
        {view === 'study' ? (
          <>
            <VocabStudy />
            <div className="px-4 mt-6 text-center">
              <button
                onClick={() => setView('list')}
                className="text-sm text-indigo-500 hover:text-indigo-400 underline decoration-dotted"
              >
                単語一覧を見る
              </button>
            </div>
          </>
        ) : (
          <VocabList onBack={() => setView('study')} />
        )}
      </div>
      <BottomNav />
    </div>
  );
}
