'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { BottomNav } from '@/components/common/BottomNav';
import { MemberDetail, MemberList } from '@/components/members/MemberDetail';

function MembersContent() {
  const searchParams = useSearchParams();
  const memberId = searchParams.get('id');

  return (
    <div className="pb-20">
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto py-6">
        {memberId ? <MemberDetail memberId={memberId} /> : <MemberList />}
      </div>
      <BottomNav />
    </div>
  );
}

export default function MembersPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">読み込み中...</div>}>
      <MembersContent />
    </Suspense>
  );
}
