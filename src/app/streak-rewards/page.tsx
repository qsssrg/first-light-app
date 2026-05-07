'use client';

import { useState } from 'react';
import { BottomNav } from '@/components/common/BottomNav';
import { Card } from '@/components/ui/card';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import { getMember } from '@/lib/members';
import { useProfile } from '@/lib/hooks';
import { getPlayerName } from '@/lib/player-name';
import { Lock, Flame } from 'lucide-react';

interface DailyContent {
  memberId: string;
  title: string;
  emoji: string;
  message: string; // {name} placeholder
  gradient: string;
}

// 30+ daily contents (5 members × 6 themes each)
const DAILY_CONTENTS: DailyContent[] = [
  // Day 1-6: カイ
  { memberId: 'kai', title: '朝のランニング', emoji: '🏃', message: '{name}、一緒に走り出そう。最初の一歩が一番大事だ。', gradient: 'from-red-600 to-orange-500' },
  { memberId: 'kai', title: 'ジムトレーニング', emoji: '💪', message: '{name}、2日連続だな。俺もジムで体幹を鍛えてるところだ。', gradient: 'from-red-700 to-rose-500' },
  { memberId: 'kai', title: 'ミーティング', emoji: '📋', message: '{name}、3日連続か。リーダーとして言わせてくれ。お前はすごいよ。', gradient: 'from-slate-600 to-gray-500' },
  { memberId: 'kai', title: '戦略会議', emoji: '🎯', message: '{name}、4日連続だ。俺たちの戦略を一緒に考えてくれないか。', gradient: 'from-blue-700 to-indigo-600' },
  { memberId: 'kai', title: 'インタビュー準備', emoji: '🎙️', message: '{name}のおかげで5日連続だ。海外インタビュー、英語で答えられそうだ。', gradient: 'from-violet-600 to-purple-500' },
  { memberId: 'kai', title: 'チームビルディング', emoji: '🤝', message: '6日。{name}がいるとメンバー全員の士気が上がるんだ。知ってたか？', gradient: 'from-emerald-600 to-teal-500' },
  // Day 7-12: ユウキ
  { memberId: 'yuuki', title: 'ダンスレッスン', emoji: '💃', message: '{name}〜！ 1週間連続だよ！ 俺もダンスの新しい振り付け覚えたよ！', gradient: 'from-yellow-500 to-amber-400' },
  { memberId: 'yuuki', title: 'SNS撮影', emoji: '📸', message: '{name}〜！ 今日はSNS用の写真撮ったよ！ 一緒に撮らない？', gradient: 'from-pink-500 to-rose-400' },
  { memberId: 'yuuki', title: 'ファンレター返信', emoji: '💌', message: '9日連続！ 今日はファンレターの返事を英語で書いてみたよ！ {name}のおかげ！', gradient: 'from-red-400 to-pink-400' },
  { memberId: 'yuuki', title: 'バラエティ収録', emoji: '🎬', message: '{name}〜、10日だよ！ 今日バラエティの収録があってさ、英語のボケ使ったら超ウケた！', gradient: 'from-orange-500 to-amber-400' },
  { memberId: 'yuuki', title: 'ダンスバトル', emoji: '🔥', message: '11日！ ダンスバトルイベントがあってね。{name}も応援してくれると嬉しいな！', gradient: 'from-red-500 to-orange-400' },
  { memberId: 'yuuki', title: 'ムードメーカー', emoji: '😄', message: '12日連続！ {name}といると楽しいな〜！ 明日も一緒にやろうね！', gradient: 'from-yellow-400 to-orange-300' },
  // Day 13-18: ハルト
  { memberId: 'haruto', title: 'ギター練習', emoji: '🎸', message: '{name}さん、13日連続…すごいです。僕もギターの新しいコードを覚えました。', gradient: 'from-blue-600 to-indigo-500' },
  { memberId: 'haruto', title: '歌詞ノート', emoji: '📝', message: '14日…2週間ですね。今日は英語の歌詞を3行書けました。{name}さんのおかげです。', gradient: 'from-indigo-600 to-violet-500' },
  { memberId: 'haruto', title: 'レコーディング', emoji: '🎤', message: '15日。レコーディングがあって…英語のフレーズ、自信を持って歌えました。', gradient: 'from-purple-600 to-fuchsia-500' },
  { memberId: 'haruto', title: '作詞の夜', emoji: '🌙', message: '16日。夜中に歌詞を書いてたら…{name}さんのことを思い出しました。', gradient: 'from-slate-700 to-indigo-600' },
  { memberId: 'haruto', title: 'メロディ制作', emoji: '🎵', message: '17日。新しいメロディが浮かんだんです。{name}さんに一番に聴いてほしい。', gradient: 'from-cyan-600 to-blue-500' },
  { memberId: 'haruto', title: '言葉集め', emoji: '✨', message: '18日連続…{name}さんと出会ってから、集める言葉が変わった気がします。', gradient: 'from-amber-500 to-yellow-400' },
  // Day 19-24: レン
  { memberId: 'ren', title: 'スタジオ作曲', emoji: '🎹', message: '19日か…{name}、やるな。俺も新曲のアレンジに没頭してるよ。', gradient: 'from-red-700 to-rose-600' },
  { memberId: 'ren', title: '洋楽リスニング', emoji: '🎧', message: '20日。今日聴いた洋楽、歌詞が前より聴き取れた。{name}のおかげだな。', gradient: 'from-gray-700 to-slate-600' },
  { memberId: 'ren', title: 'ギターチューニング', emoji: '🎸', message: '21日…3週間か。俺にとって3週間同じことを続けるのは珍しいんだ。{name}だからだな。', gradient: 'from-zinc-700 to-gray-600' },
  { memberId: 'ren', title: 'レコード屋巡り', emoji: '💿', message: '22日。レコード屋で見つけた洋楽、{name}と一緒に聴きたいな。…なんでもない。', gradient: 'from-amber-700 to-orange-600' },
  { memberId: 'ren', title: 'ライブリハ', emoji: '🎤', message: '23日。ライブのリハでMCを英語でやってみた。…まぁまぁだったよ。', gradient: 'from-red-600 to-crimson-500' },
  { memberId: 'ren', title: '深夜の音楽', emoji: '🌃', message: '24日。…{name}、こんな時間まで付き合ってくれてありがとな。', gradient: 'from-indigo-800 to-slate-700' },
  // Day 25-30: ソラ
  { memberId: 'sora', title: '洋書の時間', emoji: '📖', message: '{name}さん、25日連続ですね。僕も新しい洋書を読み始めました。', gradient: 'from-green-600 to-emerald-500' },
  { memberId: 'sora', title: 'カフェ勉強', emoji: '☕', message: '26日。カフェで英語の本を読んでます。{name}さんも一緒にどうですか？', gradient: 'from-amber-600 to-yellow-500' },
  { memberId: 'sora', title: '図書館', emoji: '📚', message: '27日。図書館で面白い論文を見つけました。{name}さんに見せたいです。', gradient: 'from-teal-600 to-cyan-500' },
  { memberId: 'sora', title: '翻訳チャレンジ', emoji: '🔤', message: '28日。好きな本の一節を英語に翻訳してみました。{name}さん、チェックしてくれますか？', gradient: 'from-blue-600 to-sky-500' },
  { memberId: 'sora', title: '読書感想', emoji: '💭', message: '29日…あと1日で1ヶ月ですね。{name}さんと一緒に読む本は、特別です。', gradient: 'from-violet-600 to-purple-500' },
  { memberId: 'sora', title: '1ヶ月の達成', emoji: '🏆', message: '30日。1ヶ月連続…{name}さん、本当にすごいです。僕も…ずっと一緒に頑張りたいです。', gradient: 'from-amber-400 via-yellow-300 to-orange-400' },
];

export default function StreakRewardsPage() {
  const profile = useProfile();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const streak = profile?.streak ?? 0;
  const name = getPlayerName() || 'マネージャー';

  const selected = selectedDay !== null && selectedDay < DAILY_CONTENTS.length ? DAILY_CONTENTS[selectedDay] : null;

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
              <p className="text-2xl font-black mt-1">{streak}日連続</p>
            </div>
          </div>
        </div>

        {/* Selected day detail */}
        {selected && (() => {
          const member = getMember(selected.memberId);
          const unlocked = selectedDay !== null && selectedDay < streak;
          return (
            <Card className="p-5 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
              <div className="text-center mb-4">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${selected.gradient} text-3xl shadow-lg`}>
                  {unlocked ? selected.emoji : '🔒'}
                </div>
                <h3 className="text-lg font-black mt-3">Day {(selectedDay ?? 0) + 1}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{selected.title}</p>
              </div>
              {unlocked && member && (
                <div className="flex items-start gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
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
                <p className="text-sm text-gray-400 text-center">
                  あと{(selectedDay ?? 0) + 1 - streak}日で解放！
                </p>
              )}
            </Card>
          );
        })()}

        {/* Daily grid */}
        <div className="grid grid-cols-5 md:grid-cols-6 gap-2">
          {DAILY_CONTENTS.map((content, i) => {
            const unlocked = i < streak;
            const isToday = i === streak - 1;
            return (
              <button
                key={i}
                onClick={() => setSelectedDay(selectedDay === i ? null : i)}
                className={`relative rounded-xl p-2 text-center transition-all ${
                  selectedDay === i ? 'ring-2 ring-amber-400 scale-105' : ''
                } ${isToday ? 'ring-2 ring-orange-400' : ''} ${!unlocked ? 'opacity-40' : 'hover:shadow-md'}`}
              >
                <div className={`w-10 h-10 mx-auto rounded-lg bg-gradient-to-br ${content.gradient} flex items-center justify-center text-lg shadow`}>
                  {unlocked ? content.emoji : <Lock className="w-3.5 h-3.5 text-white/60" />}
                </div>
                <p className="text-[9px] font-bold mt-1">Day {i + 1}</p>
                {isToday && <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full animate-pulse" />}
              </button>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
