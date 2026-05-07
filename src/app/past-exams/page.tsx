'use client';

import { BottomNav } from '@/components/common/BottomNav';
import { PastExams } from '@/components/past-exams/PastExams';

export default function PastExamsPage() {
  return (
    <div className="pb-20">
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto py-6">
        <PastExams />
      </div>
      <BottomNav />
    </div>
  );
}
