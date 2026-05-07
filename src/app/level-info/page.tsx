'use client';

import { BottomNav } from '@/components/common/BottomNav';
import { Card } from '@/components/ui/card';
import { useProfile } from '@/lib/hooks';
import { LEVEL_THRESHOLDS } from '@/types';
import { Lock, Star, BookOpen, Sparkles } from 'lucide-react';

interface LevelReward {
  level: number;
  title: string;
  description: string;
  emoji: string;
}

const LEVEL_REWARDS: LevelReward[] = [
  { level: 1, title: '冒険の始まり', description: 'ストーリーカード5枚解放', emoji: '📖' },
  { level: 2, title: '一歩前進', description: 'レベルアップVNシーン', emoji: '🎬' },
  { level: 3, title: '継続の力', description: 'レベルアップVNシーン', emoji: '💪' },
  { level: 4, title: '語彙の芽', description: 'レベルアップVNシーン', emoji: '🌱' },
  { level: 5, title: 'メンバーとの絆', description: 'ストーリーカード5枚解放', emoji: '💫' },
  { level: 6, title: '挑戦者', description: 'レベルアップVNシーン', emoji: '⚔️' },
  { level: 7, title: '読解の扉', description: 'レベルアップVNシーン', emoji: '📚' },
  { level: 8, title: '音楽と言葉', description: 'レベルアップVNシーン', emoji: '🎵' },
  { level: 9, title: '表現力', description: 'レベルアップVNシーン', emoji: '✍️' },
  { level: 10, title: '信頼の証', description: 'ストーリーカード1枚解放', emoji: '🏅' },
  { level: 11, title: '飛躍', description: 'レベルアップVNシーン', emoji: '🚀' },
  { level: 12, title: '多角的理解', description: 'レベルアップVNシーン', emoji: '🔮' },
  { level: 13, title: '国際感覚', description: 'レベルアップVNシーン', emoji: '🌍' },
  { level: 14, title: '深い理解', description: 'レベルアップVNシーン', emoji: '🧠' },
  { level: 15, title: '特別な存在', description: 'ストーリーカード1枚解放', emoji: '👑' },
  { level: 16, title: '熟練', description: 'レベルアップVNシーン', emoji: '🎯' },
  { level: 17, title: '創造力', description: 'レベルアップVNシーン', emoji: '🎨' },
  { level: 18, title: '対話力', description: 'レベルアップVNシーン', emoji: '💬' },
  { level: 19, title: '洞察', description: 'レベルアップVNシーン', emoji: '👁️' },
  { level: 20, title: '世界への扉', description: 'レベルアップVNシーン', emoji: '🚪' },
  { level: 21, title: '知恵の結晶', description: 'レベルアップVNシーン', emoji: '💎' },
  { level: 22, title: '自在な表現', description: 'レベルアップVNシーン', emoji: '🌊' },
  { level: 23, title: '達人の域', description: 'レベルアップVNシーン', emoji: '⭐' },
  { level: 24, title: '伝説へ', description: 'レベルアップVNシーン', emoji: '🌟' },
  { level: 25, title: 'FIRST LIGHT マスター', description: '最高レベル到達！', emoji: '🏆' },
];

export default function LevelInfoPage() {
  const profile = useProfile();
  const currentLevel = profile?.level ?? 1;

  return (
    <div className="pb-20">
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto py-6 px-4 space-y-6">
        {/* Header */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-500 p-5 text-white shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
          <div className="relative">
            <h2 className="text-xl font-black tracking-wide">レベル報酬</h2>
            <p className="text-xs opacity-60 mt-0.5">Level Rewards</p>
            <p className="text-2xl font-black mt-2">現在 Lv.{currentLevel}</p>
          </div>
        </div>

        {/* Level list */}
        <div className="space-y-2">
          {LEVEL_REWARDS.map(reward => {
            const unlocked = currentLevel >= reward.level;
            const isCurrent = currentLevel === reward.level;
            const xpNeeded = LEVEL_THRESHOLDS[reward.level - 1] ?? 0;

            return (
              <Card
                key={reward.level}
                className={`p-3 transition-all ${isCurrent ? 'ring-2 ring-indigo-400 shadow-lg shadow-indigo-500/20' : ''} ${!unlocked ? 'opacity-40' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 ${
                    unlocked ? 'bg-gradient-to-br from-indigo-500 to-purple-500 shadow' : 'bg-gray-200 dark:bg-gray-800'
                  }`}>
                    {unlocked ? reward.emoji : <Lock className="w-4 h-4 text-gray-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-400">Lv.{reward.level}</span>
                      <span className="text-sm font-bold">{reward.title}</span>
                      {isCurrent && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-500 text-white font-bold">NOW</span>}
                    </div>
                    <p className="text-xs text-gray-500">{reward.description}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 shrink-0">{xpNeeded} XP</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
