'use client';

import { useState } from 'react';
import { BottomNav } from '@/components/common/BottomNav';
import { Card } from '@/components/ui/card';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import { getMember } from '@/lib/members';
import { useProfile } from '@/lib/hooks';
import { getPlayerName } from '@/lib/player-name';
import { Lock, Flame } from 'lucide-react';

interface StreakReward {
  days: number;
  memberId: string;
  title: string;
  description: string;
  message: string; // {name} placeholder
  gradient: string;
  emoji: string;
}

const STREAK_REWARDS: StreakReward[] = [
  { days: 1, memberId: 'kai', title: '最初の一歩', description: '学習を始めた', message: '{name}、始めてくれたんだな。ここからだ。', gradient: 'from-gray-600 to-gray-500', emoji: '👣' },
  { days: 3, memberId: 'kai', title: 'カイのトレーニング', description: 'ジムでの体幹トレーニング', message: '{name}、3日連続だ。俺もジムで鍛えてるぞ。お互い継続していこう。', gradient: 'from-red-600 to-orange-500', emoji: '💪' },
  { days: 5, memberId: 'yuuki', title: 'ユウキのダンスレッスン', description: '振付師と新曲の練習中', message: '{name}、5日連続すごい！ 俺もダンスの新しい振り付け覚えたよ！', gradient: 'from-yellow-500 to-amber-400', emoji: '💃' },
  { days: 7, memberId: 'haruto', title: 'ハルトのギター練習', description: 'スタジオで新曲のコード練習', message: '{name}さん、1週間連続…感動です。僕もギター練習頑張ってます。', gradient: 'from-blue-600 to-indigo-500', emoji: '🎸' },
  { days: 10, memberId: 'ren', title: 'レンの作曲タイム', description: 'スタジオで新曲を制作中', message: '10日か…{name}、やるな。俺も新曲のアレンジに没頭してるよ。', gradient: 'from-red-700 to-rose-600', emoji: '🎵' },
  { days: 14, memberId: 'sora', title: 'ソラの読書タイム', description: '窓際で洋書を読む午後', message: '{name}さん、2週間連続ですね。僕も新しい本に没頭してます…一緒に頑張りましょう。', gradient: 'from-green-600 to-emerald-500', emoji: '📖' },
  { days: 21, memberId: 'kai', title: 'チーム練習', description: '全員揃ってのリハーサル', message: '{name}、3週間連続だ。お前のおかげでメンバー全員のモチベーションが上がってる。', gradient: 'from-purple-600 to-violet-500', emoji: '🤝' },
  { days: 30, memberId: 'kai', title: 'ステージ本番', description: '満員の会場でパフォーマンス', message: '1ヶ月連続…{name}、お前は本物だ。俺たちのステージを見てくれ。', gradient: 'from-amber-500 to-yellow-400', emoji: '🎤' },
  { days: 50, memberId: 'yuuki', title: '海外ファンミ', description: '海外ファンとの交流イベント', message: '{name}〜！ 50日！ 俺も英語で海外ファンに話せるようになってきたよ！ 全部{name}のおかげ！', gradient: 'from-cyan-500 to-blue-400', emoji: '🌎' },
  { days: 75, memberId: 'haruto', title: '歌詞コンペ', description: '英語歌詞のコンペに挑戦', message: '{name}さん、75日間…言葉が見つかりません。{name}さんのおかげで英語の歌詞が書けるようになりました。', gradient: 'from-pink-500 to-rose-400', emoji: '✍️' },
  { days: 100, memberId: 'kai', title: '世界デビュー', description: '海外フェスのメインステージ', message: '{name}。100日だ。俺たちは{name}と出会って変わった。これが始まりだ。世界を目指そう。', gradient: 'from-amber-400 via-yellow-300 to-orange-400', emoji: '🏆' },
];

export default function StreakRewardsPage() {
  const profile = useProfile();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const streak = profile?.longestStreak ?? profile?.streak ?? 0;
  const name = getPlayerName() || 'マネージャー';

  const selected = selectedIdx !== null ? STREAK_REWARDS[selectedIdx] : null;

  return (
    <div className="pb-20">
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto py-6 px-4 space-y-6">
        {/* Header */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-orange-500 via-red-500 to-rose-500 p-5 text-white shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
          <div className="relative flex items-center gap-4">
            <Flame className="w-10 h-10" />
            <div>
              <h2 className="text-xl font-black tracking-wide">ストリーク報酬</h2>
              <p className="text-xs opacity-60">Streak Rewards</p>
              <p className="text-2xl font-black mt-1">{streak}日連続</p>
            </div>
          </div>
        </div>

        {/* Selected reward detail */}
        {selected && (() => {
          const member = getMember(selected.memberId);
          const unlocked = streak >= selected.days;
          return (
            <Card className="p-5 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
              <div className="text-center mb-4">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${selected.gradient} text-4xl shadow-lg`}>
                  {unlocked ? selected.emoji : '🔒'}
                </div>
                <h3 className="text-lg font-black mt-3">{selected.title}</h3>
                <p className="text-xs text-gray-500">{selected.days}日連続で解放</p>
              </div>
              {unlocked && member && (
                <div className="flex items-start gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <MemberAvatar member={member} size="md" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">{member.nameJa}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {selected.message.replace(/\{name\}/g, name)}
                    </p>
                  </div>
                </div>
              )}
              {!unlocked && (
                <p className="text-sm text-gray-400 text-center mt-2">
                  あと{selected.days - streak}日で解放！
                </p>
              )}
            </Card>
          );
        })()}

        {/* Rewards grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {STREAK_REWARDS.map((reward, i) => {
            const unlocked = streak >= reward.days;
            return (
              <button
                key={reward.days}
                onClick={() => setSelectedIdx(selectedIdx === i ? null : i)}
                className={`relative rounded-xl p-3 text-center transition-all ${
                  selectedIdx === i ? 'ring-2 ring-amber-400 scale-105' : ''
                } ${unlocked ? 'hover:shadow-md' : 'opacity-50'}`}
              >
                <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${reward.gradient} flex items-center justify-center text-2xl shadow-md`}>
                  {unlocked ? reward.emoji : <Lock className="w-5 h-5 text-white/60" />}
                </div>
                <p className="text-[10px] font-bold mt-1.5">{reward.days}日</p>
                <p className="text-[9px] text-gray-500 line-clamp-1">{reward.title}</p>
              </button>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
