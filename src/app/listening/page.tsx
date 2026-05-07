'use client';

import { useState } from 'react';
import { BottomNav } from '@/components/common/BottomNav';
import { ListeningPractice } from '@/components/listening/ListeningPractice';
import { VNModal } from '@/components/vn/VNModal';
import { getRandomLearningStart } from '@/lib/scenarios/adapter';
import type { Scenario } from '@/lib/scenarios/types';

export default function ListeningPage() {
  const [introScene] = useState<Scenario | undefined>(() => getRandomLearningStart('listening'));
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
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto py-6">
        <ListeningPractice />
      </div>
      <BottomNav />
    </div>
  );
}
