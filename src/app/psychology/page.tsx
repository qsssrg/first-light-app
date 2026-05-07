'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BottomNav } from '@/components/common/BottomNav';
import { Card } from '@/components/ui/card';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import { getMember, MEMBERS } from '@/lib/members';
import { isPsychologyUnlocked, setPsychologyUnlocked } from '@/lib/psychology-settings';
import { VNEngine } from '@/components/vn/VNEngine';
import { psychologyOfferScenario } from '@/lib/scenarios/psychology-intro';
import { getPlayerName } from '@/lib/player-name';
import { BookOpen, FlaskConical, Brain, ClipboardList, Lightbulb } from 'lucide-react';

const MEMBER_THEMES = [
  { member: 'kai', theme: '権威と服従（ミルグラム）', icon: '👑' },
  { member: 'haruto', theme: 'パラソーシャル関係', icon: '💌' },
  { member: 'ren', theme: '認知的不協和', icon: '🎸' },
  { member: 'yuuki', theme: 'バイスタンダー効果', icon: '🙋' },
  { member: 'sora', theme: '精緻化見込みモデル', icon: '📖' },
];

const QUICK_LINKS = [
  { href: '/psychology/theory', label: '理論ライブラリ', desc: '23の心理学理論', icon: Brain },
  { href: '/psychology/lessons', label: 'レッスン', desc: '13週の構造化学習', icon: BookOpen },
  { href: '/psychology/experiments', label: '追体験', desc: '5つの心理学実験', icon: FlaskConical },
  { href: '/psychology/tips', label: '今日のTip', desc: '毎日の心理学豆知識', icon: Lightbulb },
];

export default function PsychologyPage() {
  const router = useRouter();
  const [unlocked, setUnlocked] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    setUnlocked(isPsychologyUnlocked());
  }, []);

  if (!unlocked || showIntro) {
    return (
      <VNEngine
        scenario={psychologyOfferScenario}
        onComplete={() => {
          setPsychologyUnlocked(true);
          setUnlocked(true);
          setShowIntro(false);
        }}
        skippable
      />
    );
  }

  const name = getPlayerName() || 'マネージャー';
  const kai = getMember('kai')!;

  return (
    <div className="pb-20">
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto py-6 px-4 space-y-6">
        <h2 className="text-lg font-bold">心理学バラエティ番組</h2>

        {/* Kai greeting */}
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <MemberAvatar member={kai} size="lg" />
            <div className="flex-1 pt-1">
              <p className="text-xs text-gray-500 mb-1">{kai.nameJa}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {name}、番組の準備を進めよう。まずは理論を学んで、追体験で実感するのが一番だ。
              </p>
            </div>
          </div>
        </Card>

        {/* Member themes */}
        <div>
          <h3 className="text-sm font-bold mb-3">メンバーの担当テーマ</h3>
          <div className="space-y-2">
            {MEMBER_THEMES.map(({ member: id, theme, icon }) => {
              const m = getMember(id);
              if (!m) return null;
              return (
                <Card key={id} className="p-3">
                  <div className="flex items-center gap-3">
                    <MemberAvatar member={m} size="sm" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{m.nameJa}</p>
                      <p className="text-xs text-gray-500">{icon} {theme}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-3">
          {QUICK_LINKS.map(({ href, label, desc, icon: Icon }) => (
            <Card
              key={href}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => router.push(href)}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
