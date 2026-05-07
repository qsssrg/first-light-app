'use client';

import { BottomNav } from '@/components/common/BottomNav';
import { WritingPractice } from '@/components/writing-practice/WritingPractice';

export default function WritingPracticePage() {
  return (
    <div className="pb-20">
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto py-6">
        <WritingPractice />
      </div>
      <BottomNav />
    </div>
  );
}
