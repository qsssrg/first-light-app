'use client';

import { useState } from 'react';
import { BottomNav } from '@/components/common/BottomNav';
import { VocabStudy } from '@/components/vocabulary/VocabStudy';
import { VocabList } from '@/components/vocabulary/VocabList';
import { VNModal } from '@/components/vn/VNModal';
import { getRandomVocabIntro } from '@/lib/scenarios/vocab-intro';
import type { Scenario } from '@/lib/scenarios/types';

export default function VocabularyPage() {
  const [introScene] = useState<Scenario>(() => getRandomVocabIntro());
  const [introDone, setIntroDone] = useState(false);
  const [view, setView] = useState<'study' | 'list'>('study');

  if (!introDone) {
    return (
      <VNModal
        scenario={introScene}
        onComplete={() => setIntroDone(true)}
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
