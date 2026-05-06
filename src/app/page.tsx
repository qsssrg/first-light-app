'use client';

import { useState, useEffect } from 'react';
import { BottomNav } from '@/components/common/BottomNav';
import { HomeScreen } from '@/components/home/HomeScreen';
import { VNEngine } from '@/components/vn/VNEngine';
import { openingScenario } from '@/lib/scenarios/opening';
import type { UserProfile } from '@/types';

export default function Page() {
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null | undefined>(undefined);
  const [dbError, setDbError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function init() {
      try {
        const { db } = await import('@/lib/db');
        // Delete and recreate if version upgrade fails
        try {
          await db.open();
        } catch {
          // Version conflict — delete and retry
          await db.delete();
          await db.open();
        }
        const p = await db.userProfile.toCollection().first();
        if (!cancelled) {
          setProfile(p ?? null);
          setReady(true);
        }
        // Subscribe to changes
        const onChange = () => {
          db.userProfile.toCollection().first().then(p => {
            if (!cancelled) setProfile(p ?? null);
          });
        };
        db.userProfile.hook('creating', onChange);
        db.userProfile.hook('updating', onChange);
      } catch (e) {
        console.error('DB init failed:', e);
        if (!cancelled) {
          setDbError(true);
          setProfile(null);
          setReady(true);
        }
      }
    }
    init();
    return () => { cancelled = true; };
  }, []);

  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-gray-400">読み込み中...</div>
      </div>
    );
  }

  if (dbError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-red-500">データベースの初期化に失敗しました</p>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
          onClick={() => window.location.reload()}
        >
          再読み込み
        </button>
      </div>
    );
  }

  if (!profile) {
    return <VNEngine scenario={openingScenario} />;
  }

  return (
    <div className="pb-20">
      <div className="max-w-lg mx-auto px-4 py-6">
        <HomeScreen />
      </div>
      <BottomNav />
    </div>
  );
}
