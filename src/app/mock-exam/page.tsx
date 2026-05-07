'use client';

import { BottomNav } from '@/components/common/BottomNav';
import { MockExam } from '@/components/mock-exam/MockExam';

export default function MockExamPage() {
  return (
    <div className="pb-20">
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto py-6">
        <MockExam />
      </div>
      <BottomNav />
    </div>
  );
}
