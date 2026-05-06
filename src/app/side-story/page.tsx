'use client';

import { BottomNav } from '@/components/common/BottomNav';
import { SideStoryList } from '@/components/side-story/SideStoryView';

export default function SideStoryPage() {
  return (
    <div className="pb-20">
      <div className="max-w-lg mx-auto py-6">
        <SideStoryList />
      </div>
      <BottomNav />
    </div>
  );
}
