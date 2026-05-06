'use client';

import { BottomNav } from '@/components/common/BottomNav';
import { MockExam } from '@/components/mock-exam/MockExam';

export default function MockExamPage() {
  return (
    <div className="pb-20">
      <div className="max-w-lg mx-auto py-6">
        <MockExam />
      </div>
      <BottomNav />
    </div>
  );
}
