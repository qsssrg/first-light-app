'use client';

import { useState, useEffect } from 'react';
import { BottomNav } from '@/components/common/BottomNav';
import { ChapterDetail } from '@/components/chapters/ChapterDetail';
import { VNModal } from '@/components/vn/VNModal';
import { getChapterScenario } from '@/lib/scenarios/adapter';
import type { Scenario } from '@/lib/scenarios/types';

export function ChapterPageClient({ id }: { id: string }) {
  const [vnScene, setVnScene] = useState<Scenario | null>(null);
  const [vnShown, setVnShown] = useState(false);

  useEffect(() => {
    const chapterNum = parseInt(id, 10);
    if (isNaN(chapterNum)) return;
    const seen = sessionStorage.getItem(`chapter-vn-${id}`);
    if (seen) return;
    const scenario = getChapterScenario(chapterNum);
    if (scenario) {
      setVnScene(scenario);
    }
  }, [id]);

  if (vnScene && !vnShown) {
    return (
      <VNModal
        scenario={vnScene}
        onComplete={() => {
          setVnShown(true);
          sessionStorage.setItem(`chapter-vn-${id}`, '1');
        }}
      />
    );
  }

  return (
    <div className="pb-20">
      <div className="max-w-lg mx-auto py-6">
        <ChapterDetail chapterId={id} />
      </div>
      <BottomNav />
    </div>
  );
}
