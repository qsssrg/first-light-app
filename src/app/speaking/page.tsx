'use client';

import { BottomNav } from '@/components/common/BottomNav';
import { SpeakingPractice } from '@/components/speaking/SpeakingPractice';

export default function SpeakingPage() {
  return (
    <div className="pb-20">
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto py-6">
        <SpeakingPractice />
      </div>
      <BottomNav />
    </div>
  );
}
