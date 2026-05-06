'use client';

import { BottomNav } from '@/components/common/BottomNav';
import { Dashboard } from '@/components/dashboard/Dashboard';

export default function DashboardPage() {
  return (
    <div className="pb-20">
      <div className="max-w-lg mx-auto py-6">
        <Dashboard />
      </div>
      <BottomNav />
    </div>
  );
}
