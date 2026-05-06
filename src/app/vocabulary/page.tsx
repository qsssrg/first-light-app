'use client';

import { useState } from 'react';
import { BottomNav } from '@/components/common/BottomNav';
import { VocabStudy } from '@/components/vocabulary/VocabStudy';
import { VNModal } from '@/components/vn/VNModal';
import { getRandomVocabStart } from '@/lib/scenarios/adapter';
import type { Scenario } from '@/lib/scenarios/types';

export default function VocabularyPage() {
  const [introScene] = useState<Scenario | undefined>(() => getRandomVocabStart());
  const [introDone, setIntroDone] = useState(false);

  if (introScene && !introDone) {
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
      <div className="max-w-lg mx-auto py-6">
        <VocabStudy />
      </div>
      <BottomNav />
    </div>
  );
}
