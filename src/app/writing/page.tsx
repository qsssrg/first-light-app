'use client';

import { useState } from 'react';
import { BottomNav } from '@/components/common/BottomNav';
import { Card } from '@/components/ui/card';
import { PenTool } from 'lucide-react';
import { VNModal } from '@/components/vn/VNModal';
import { getRandomLearningStart } from '@/lib/scenarios/adapter';
import type { Scenario } from '@/lib/scenarios/types';

export default function WritingPage() {
  const [introScene] = useState<Scenario | undefined>(() => getRandomLearningStart('writing'));
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
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto py-6 px-4 space-y-4">
        <h2 className="text-lg font-bold">ライティング</h2>
        <Card className="p-8 text-center">
          <PenTool className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-sm text-gray-500">
            ライティング添削機能はPhase 2で追加予定です。
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Claude API (Haiku 4.5) を使った添削を予定しています。
          </p>
        </Card>
      </div>
      <BottomNav />
    </div>
  );
}
