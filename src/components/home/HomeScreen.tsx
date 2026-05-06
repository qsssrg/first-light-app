'use client';

import { useProfile, useDueCards } from '@/lib/hooks';
import { getLevelProgress, xpToNextLevel } from '@/lib/xp';
import { MEMBERS } from '@/lib/members';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { BookOpen, Flame, Target, Sparkles, ArrowRight, Lightbulb } from 'lucide-react';
import Link from 'next/link';

function NextActionGuide({ profile, dueCardCount }: { profile: any; dueCardCount: number }) {
  const getNextAction = () => {
    if (!profile.learnerType || profile.learnerType === 'balanced' && profile.totalXp === 0) {
      return { text: 'まずレベルを測ろう', desc: 'あなたの英語力を5つの軸で判定します', href: '/settings', icon: Target };
    }
    if (dueCardCount > 0) {
      return { text: `${dueCardCount}語の復習をしよう`, desc: '忘れる前に復習すると定着しやすい', href: '/vocabulary', icon: BookOpen };
    }
    if (profile.totalXp < 100) {
      return { text: '単語帳を始めよう', desc: '新しい単語を追加して学習スタート', href: '/vocabulary', icon: BookOpen };
    }
    if (!profile.lastStudyAt || Date.now() - new Date(profile.lastStudyAt).getTime() > 86400000) {
      return { text: '今日の学習をしよう', desc: '毎日の積み重ねが力になる', href: '/vocabulary', icon: Flame };
    }
    return { text: 'ライティングに挑戦しよう', desc: '英語で文を書いてみよう', href: '/writing', icon: Sparkles };
  };

  const action = getNextAction();
  const Icon = action.icon;

  return (
    <Link href={action.href}>
      <Card className="p-4 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/50 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
            <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">おすすめ: {action.text}</p>
            <p className="text-xs text-blue-600 dark:text-blue-400">{action.desc}</p>
          </div>
          <ArrowRight className="w-4 h-4 text-blue-400" />
        </div>
      </Card>
    </Link>
  );
}

export function HomeScreen() {
  const profile = useProfile();
  const dueCards = useDueCards();

  if (!profile) return null;

  const progress = getLevelProgress(profile.totalXp) * 100;
  const toNext = xpToNextLevel(profile.totalXp);

  return (
    <div className="space-y-6 pb-4">
      {/* Stage background - placeholder gradient */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 p-6 text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('/grid.svg')]" />
        <div className="relative">
          <p className="text-sm opacity-80">FIRST LIGHT</p>
          <h2 className="text-2xl font-bold mt-1">Lv.{profile.level}</h2>
          <div className="mt-3">
            <Progress value={progress} className="h-2 bg-white/30" />
            <p className="text-xs mt-1 opacity-80">次のレベルまで {toNext} XP</p>
          </div>
        </div>
      </div>

      {/* Members row */}
      <div className="flex justify-around px-2">
        {MEMBERS.map(member => (
          <Link key={member.id} href={`/members?id=${member.id}`}>
            <MemberAvatar member={member} size="md" showName />
          </Link>
        ))}
      </div>

      {/* Next action guide */}
      <NextActionGuide profile={profile} dueCardCount={dueCards.length} />

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/vocabulary">
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium">単語帳</p>
                <p className="text-xs text-gray-500">
                  {dueCards.length > 0 ? `${dueCards.length}語が復習待ち` : '全て復習済み'}
                </p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/dashboard">
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium">分析</p>
                <p className="text-xs text-gray-500">成長を確認</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {/* Streak & Daily */}
      <div className="flex gap-3">
        <Card className="flex-1 p-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-lg font-bold">{profile.streak}</p>
              <p className="text-xs text-gray-500">日連続</p>
            </div>
          </div>
        </Card>
        <Card className="flex-1 p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <div>
              <p className="text-lg font-bold">{profile.totalXp}</p>
              <p className="text-xs text-gray-500">Total XP</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
