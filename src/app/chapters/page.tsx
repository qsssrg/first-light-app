'use client';

import { BottomNav } from '@/components/common/BottomNav';
import { ChapterMap } from '@/components/chapters/ChapterMap';

export default function ChaptersPage() {
  return (
    <div className="pb-20">
      <div className="max-w-lg mx-auto py-6">
        <ChapterMap />
      </div>
      <BottomNav />
    </div>
  );
}
