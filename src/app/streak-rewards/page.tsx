'use client';

import { useState } from 'react';
import { BottomNav } from '@/components/common/BottomNav';
import { Card } from '@/components/ui/card';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import { getMember } from '@/lib/members';
import { useProfile } from '@/lib/hooks';
import { getPlayerName } from '@/lib/player-name';
import { Lock, Flame } from 'lucide-react';

const ROTATION = ['kai', 'yuuki', 'haruto', 'ren', 'sora'] as const;

interface DailyContent {
  members: string[]; // member IDs
  title: string;
  emoji: string;
  message: string; // {name} placeholder, from first member
  gradient: string;
}

// Member-specific themes for solo days
const SOLO_THEMES: Record<string, { title: string; emoji: string; message: string; gradient: string }[]> = {
  kai: [
    { title: '朝のランニング', emoji: '🏃', message: '{name}、一緒に走り出そう。最初の一歩が一番大事だ。', gradient: 'from-red-600 to-orange-500' },
    { title: 'ジムトレーニング', emoji: '💪', message: '連続記録更新だな、{name}。俺もジムで鍛えてるぞ。', gradient: 'from-red-700 to-rose-500' },
    { title: '戦略会議', emoji: '🎯', message: '{name}、今日の作戦を立てよう。リーダーとして頼りにしてる。', gradient: 'from-blue-700 to-indigo-600' },
    { title: 'インタビュー準備', emoji: '🎙️', message: '{name}のおかげで英語のインタビューが怖くなくなった。', gradient: 'from-violet-600 to-purple-500' },
    { title: 'チームビルディング', emoji: '🤝', message: '{name}がいるとメンバー全員の士気が上がるんだ。', gradient: 'from-emerald-600 to-teal-500' },
    { title: '海外会議', emoji: '🌐', message: '{name}、海外のスタッフと英語で話せるようになってきた。', gradient: 'from-sky-600 to-blue-500' },
  ],
  yuuki: [
    { title: 'ダンスレッスン', emoji: '💃', message: '{name}〜！ 今日も新しい振り付け覚えたよ！', gradient: 'from-yellow-500 to-amber-400' },
    { title: 'SNS撮影', emoji: '📸', message: '{name}〜！ 一緒に写真撮ろうよ！', gradient: 'from-pink-500 to-rose-400' },
    { title: 'ファンレター返信', emoji: '💌', message: 'ファンレターの返事を英語で書いたよ！ {name}のおかげ！', gradient: 'from-red-400 to-pink-400' },
    { title: 'バラエティ収録', emoji: '🎬', message: 'バラエティで英語のボケ使ったら超ウケた！ {name}ありがと〜！', gradient: 'from-orange-500 to-amber-400' },
    { title: 'ムードメーカー', emoji: '😄', message: '{name}といると楽しいな〜！ 明日もやろうね！', gradient: 'from-yellow-400 to-orange-300' },
    { title: 'ダンスバトル', emoji: '🔥', message: '{name}、ダンスバトルで優勝したよ！ 応援のおかげ！', gradient: 'from-red-500 to-orange-400' },
  ],
  haruto: [
    { title: 'ギター練習', emoji: '🎸', message: '{name}さん、僕もギターの新しいコードを覚えました。', gradient: 'from-blue-600 to-indigo-500' },
    { title: '歌詞ノート', emoji: '📝', message: '英語の歌詞を書けました。{name}さんのおかげです。', gradient: 'from-indigo-600 to-violet-500' },
    { title: 'レコーディング', emoji: '🎤', message: '英語のフレーズ、自信を持って歌えました。{name}さん…。', gradient: 'from-purple-600 to-fuchsia-500' },
    { title: '作詞の夜', emoji: '🌙', message: '夜中に歌詞を書いてたら…{name}さんのことを思い出しました。', gradient: 'from-slate-700 to-indigo-600' },
    { title: 'メロディ制作', emoji: '🎵', message: '新しいメロディが浮かんだんです。{name}さんに聴いてほしい。', gradient: 'from-cyan-600 to-blue-500' },
    { title: '言葉集め', emoji: '✨', message: '{name}さんと出会ってから、集める言葉が変わりました。', gradient: 'from-amber-500 to-yellow-400' },
  ],
  ren: [
    { title: 'スタジオ作曲', emoji: '🎹', message: '{name}、やるな。俺も新曲に没頭してるよ。', gradient: 'from-red-700 to-rose-600' },
    { title: '洋楽リスニング', emoji: '🎧', message: '今日聴いた洋楽、歌詞が前より聴き取れた。{name}のおかげだな。', gradient: 'from-gray-700 to-slate-600' },
    { title: 'ギターチューニング', emoji: '🎸', message: '同じことを続けるのは珍しいんだ。{name}だからだな。', gradient: 'from-zinc-700 to-gray-600' },
    { title: 'レコード屋巡り', emoji: '💿', message: 'レコード屋で見つけた洋楽、{name}と聴きたいな。', gradient: 'from-amber-700 to-orange-600' },
    { title: 'ライブリハ', emoji: '🎤', message: 'MCを英語でやってみた。…まぁまぁだったよ。', gradient: 'from-red-600 to-rose-500' },
    { title: '深夜の音楽', emoji: '🌃', message: '…{name}、こんな時間まで付き合ってくれてありがとな。', gradient: 'from-indigo-800 to-slate-700' },
  ],
  sora: [
    { title: '洋書の時間', emoji: '📖', message: '{name}さん、僕も新しい洋書を読み始めました。', gradient: 'from-green-600 to-emerald-500' },
    { title: 'カフェ勉強', emoji: '☕', message: 'カフェで勉強してます。{name}さんも一緒にどうですか？', gradient: 'from-amber-600 to-yellow-500' },
    { title: '図書館', emoji: '📚', message: '面白い論文を見つけました。{name}さんに見せたいです。', gradient: 'from-teal-600 to-cyan-500' },
    { title: '翻訳チャレンジ', emoji: '🔤', message: '好きな本の一節を英語に翻訳してみました。', gradient: 'from-blue-600 to-sky-500' },
    { title: '読書感想', emoji: '💭', message: '{name}さんと一緒に読む本は、特別です。', gradient: 'from-violet-600 to-purple-500' },
    { title: '静かな午後', emoji: '🍃', message: '{name}さん、ずっと一緒に頑張りたいです。', gradient: 'from-emerald-500 to-green-400' },
  ],
};

const DUO_THEMES = [
  { title: 'カイ&ユウキ 筋トレ対決', emoji: '🏋️', message: '{name}、どっちが勝つか見届けてくれ！', gradient: 'from-red-500 to-yellow-400' },
  { title: 'ハルト&レン 作曲セッション', emoji: '🎶', message: '{name}さんのために曲を作りました。', gradient: 'from-blue-600 to-red-500' },
  { title: 'ソラ&カイ 戦略読書会', emoji: '📊', message: '{name}さん、一緒に分析しましょう。', gradient: 'from-green-600 to-blue-500' },
  { title: 'ユウキ&ハルト コラボダンス', emoji: '🎪', message: '{name}〜！ ハルトと新しいダンス作ったよ！', gradient: 'from-yellow-500 to-indigo-500' },
  { title: 'レン&ソラ 洋楽ディスカッション', emoji: '🎵', message: '{name}、この曲の歌詞一緒に訳さないか。', gradient: 'from-gray-600 to-green-500' },
];

const ALL_MEMBER_THEMES = [
  { title: 'チーム練習', emoji: '🤝', message: '{name}、全員揃ったぞ。今日は特別な日だ。', gradient: 'from-indigo-600 via-purple-500 to-pink-400' },
  { title: 'グループ写真撮影', emoji: '📸', message: '{name}も一緒に撮ろう！ みんなで！', gradient: 'from-amber-500 via-orange-400 to-red-400' },
  { title: 'ステージリハーサル', emoji: '🎤', message: '{name}のためのステージだ。全力で行く。', gradient: 'from-violet-600 via-blue-500 to-cyan-400' },
];

function getDailyContent(day: number): DailyContent {
  const dayNum = day + 1; // 1-indexed

  // Every 10th day: all members
  if (dayNum % 10 === 0) {
    const theme = ALL_MEMBER_THEMES[(Math.floor(day / 10)) % ALL_MEMBER_THEMES.length];
    return { members: [...ROTATION], ...theme };
  }

  // Every 6th day (not 10th): duo
  if (dayNum % 6 === 0) {
    const theme = DUO_THEMES[Math.floor(day / 6) % DUO_THEMES.length];
    const pair = [ROTATION[Math.floor(day / 6) % 5], ROTATION[(Math.floor(day / 6) + 1) % 5]];
    return { members: pair, ...theme };
  }

  // Normal: single member rotation
  const memberIdx = day % 5;
  const memberId = ROTATION[memberIdx];
  const themes = SOLO_THEMES[memberId];
  const themeIdx = Math.floor(day / 5) % themes.length;
  const theme = themes[themeIdx];
  return { members: [memberId], ...theme };
}

const TOTAL_DAYS = 35;

export default function StreakRewardsPage() {
  const profile = useProfile();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const totalStreak = profile?.streak ?? 0;
  const streak = totalStreak % TOTAL_DAYS || (totalStreak > 0 ? TOTAL_DAYS : 0); // Grid position (1-35 loop)
  const name = getPlayerName() || 'マネージャー';

  const selected = selectedDay !== null ? getDailyContent(selectedDay) : null;

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
              <p className="text-xs opacity-60">Daily Streak Rewards</p>
              <p className="text-2xl font-black mt-1">{totalStreak}日連続</p>
              {totalStreak > TOTAL_DAYS && <p className="text-[10px] opacity-60">ラウンド {Math.floor(totalStreak / TOTAL_DAYS) + 1}</p>}
            </div>
          </div>
        </div>

        {/* Selected day detail */}
        {selected && (() => {
          const unlocked = selectedDay !== null && selectedDay < streak;
          const mainMember = getMember(selected.members[0]);
          return (
            <Card className="p-5 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
              <div className="text-center mb-4">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${selected.gradient} text-3xl shadow-lg`}>
                  {unlocked ? selected.emoji : '🔒'}
                </div>
                <h3 className="text-lg font-black mt-3">Day {(selectedDay ?? 0) + 1}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{selected.title}</p>
                {selected.members.length > 1 && (
                  <div className="flex justify-center gap-1 mt-2">
                    {selected.members.map(id => {
                      const m = getMember(id);
                      return m ? <MemberAvatar key={id} member={m} size="sm" /> : null;
                    })}
                  </div>
                )}
              </div>
              {unlocked && mainMember && (
                <div className="flex items-start gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <MemberAvatar member={mainMember} size="md" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">{mainMember.nameJa}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {selected.message.replace(/\{name\}/g, name)}
                    </p>
                  </div>
                </div>
              )}
              {!unlocked && (
                <p className="text-sm text-gray-400 text-center">あと{(selectedDay ?? 0) + 1 - streak}日で解放！</p>
              )}
            </Card>
          );
        })()}

        {/* Daily grid */}
        <div className="grid grid-cols-5 md:grid-cols-7 gap-2">
          {Array.from({ length: TOTAL_DAYS }, (_, i) => {
            const content = getDailyContent(i);
            const unlocked = i < streak;
            const isToday = i === streak - 1;
            const isMulti = content.members.length > 1;
            return (
              <button
                key={i}
                onClick={() => setSelectedDay(selectedDay === i ? null : i)}
                className={`relative rounded-xl p-2 text-center transition-all ${
                  selectedDay === i ? 'ring-2 ring-amber-400 scale-105' : ''
                } ${isToday ? 'ring-2 ring-orange-400' : ''} ${!unlocked ? 'opacity-40' : 'hover:shadow-md'}`}
              >
                <div className={`w-10 h-10 mx-auto rounded-lg bg-gradient-to-br ${content.gradient} flex items-center justify-center text-lg shadow ${isMulti ? 'ring-1 ring-white/30' : ''}`}>
                  {unlocked ? content.emoji : <Lock className="w-3.5 h-3.5 text-white/60" />}
                </div>
                <p className="text-[9px] font-bold mt-1">{i + 1}</p>
                {isToday && <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full animate-pulse" />}
                {isMulti && unlocked && <span className="absolute -top-0.5 -left-0.5 text-[8px]">👥</span>}
              </button>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
