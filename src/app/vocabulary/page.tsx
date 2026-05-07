'use client';

import { BottomNav } from '@/components/common/BottomNav';
import { VocabList } from '@/components/vocabulary/VocabList';

export default function VocabularyPage() {
  return (
    <div className="pb-20">
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto py-6">
        <VocabList />
      </div>
      <BottomNav />
    </div>
  );
}
