'use client';

import { BottomNav } from '@/components/common/BottomNav';
import { Settings } from '@/components/settings/Settings';

export default function SettingsPage() {
  return (
    <div className="pb-20">
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto py-6">
        <Settings />
      </div>
      <BottomNav />
    </div>
  );
}
