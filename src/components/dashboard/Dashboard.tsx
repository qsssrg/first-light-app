'use client';

import { useProfile, useStudySessions, useVocabCards } from '@/lib/hooks';
import { Card } from '@/components/ui/card';
import { MEMBERS } from '@/lib/members';
import type { SkillAxis } from '@/types';

const AXIS_LABELS: Record<SkillAxis, string> = {
  vocabulary: '語彙',
  reading: '読解',
  listening: 'リスニング',
  writing: 'ライティング',
  grammar: '文法',
};

export function Dashboard() {
  const profile = useProfile();
  const sessions = useStudySessions();
  const vocabCards = useVocabCards();

  if (!profile) return null;

  // Calculate study calendar (last 30 days)
  const today = new Date();
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().split('T')[0];
  });

  const sessionsByDate = sessions.reduce((acc, s) => {
    const date = new Date(s.date).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Vocab stats
  const masteredCards = vocabCards.filter(c => c.repetitions >= 5).length;
  const learningCards = vocabCards.filter(c => c.repetitions > 0 && c.repetitions < 5).length;
  const newCards = vocabCards.filter(c => c.repetitions === 0).length;

  return (
    <div className="space-y-6 px-4">
      <h2 className="text-lg font-bold">学習分析</h2>

      {/* Radar chart placeholder - simple bar representation */}
      <Card className="p-4">
        <h3 className="text-sm font-medium mb-3">スキルバランス</h3>
        <div className="space-y-3">
          {(Object.keys(profile.skills) as SkillAxis[]).map(axis => {
            const member = MEMBERS.find(m => m.axis === axis);
            const value = profile.skills[axis];
            return (
              <div key={axis} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="flex items-center gap-1">
                    <span
                      className="w-2 h-2 rounded-full inline-block"
                      style={{ backgroundColor: member?.color }}
                    />
                    {AXIS_LABELS[axis]}
                  </span>
                  <span className="text-gray-500">{value}</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${value}%`, backgroundColor: member?.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Study calendar */}
      <Card className="p-4">
        <h3 className="text-sm font-medium mb-3">学習カレンダー（30日間）</h3>
        <div className="grid grid-cols-10 gap-1">
          {last30Days.map(date => {
            const count = sessionsByDate[date] || 0;
            const intensity = count === 0 ? 'bg-gray-100 dark:bg-gray-800' :
              count === 1 ? 'bg-green-200' :
              count === 2 ? 'bg-green-400' : 'bg-green-600';
            return (
              <div
                key={date}
                className={`w-full aspect-square rounded-sm ${intensity}`}
                title={`${date}: ${count}セッション`}
              />
            );
          })}
        </div>
      </Card>

      {/* Vocab stats */}
      <Card className="p-4">
        <h3 className="text-sm font-medium mb-3">単語帳の状況</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-green-600">{masteredCards}</p>
            <p className="text-xs text-gray-500">習得済み</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-600">{learningCards}</p>
            <p className="text-xs text-gray-500">学習中</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-400">{newCards}</p>
            <p className="text-xs text-gray-500">未学習</p>
          </div>
        </div>
      </Card>

      {/* Weakness analysis */}
      {(() => {
        const axes = Object.entries(profile.skills) as [SkillAxis, number][];
        const sorted = [...axes].sort((a, b) => a[1] - b[1]);
        const weakest = sorted[0];
        const strongest = sorted[sorted.length - 1];
        if (!weakest || weakest[1] >= 80) return null;
        const weakMember = MEMBERS.find(m => m.axis === weakest[0]);
        return (
          <Card className="p-4 border-amber-800/30 bg-amber-950/10">
            <h3 className="text-sm font-medium mb-2 flex items-center gap-1.5">
              <span className="text-amber-400">🎯</span> 弱点分析
            </h3>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium" style={{ color: weakMember?.color }}>
                  {AXIS_LABELS[weakest[0]]}
                </span>
                <span className="text-gray-400">（{weakest[1]}点）が伸びしろがあります</span>
              </p>
              <p className="text-xs text-gray-500">
                最も得意な{AXIS_LABELS[strongest[0]]}（{strongest[1]}点）との差: {strongest[1] - weakest[1]}ポイント
              </p>
              <div className="bg-gray-800/50 rounded-lg p-2.5 mt-2">
                <p className="text-xs text-amber-300">
                  {AXIS_LABELS[weakest[0]]}の問題をあと{Math.ceil((weakest[1] + 10 - weakest[1]) / 2)}問解くとスキルが上がります
                </p>
              </div>
            </div>
          </Card>
        );
      })()}

      {/* Most missed words */}
      {vocabCards.length > 0 && (() => {
        const missedWords = vocabCards
          .filter(c => c.incorrectCount > 0)
          .sort((a, b) => b.incorrectCount - a.incorrectCount)
          .slice(0, 10);
        if (missedWords.length === 0) return null;
        return (
          <Card className="p-4">
            <h3 className="text-sm font-medium mb-3">よく間違える単語 トップ{Math.min(10, missedWords.length)}</h3>
            <div className="space-y-1.5">
              {missedWords.map((card, i) => (
                <div key={card.id ?? i} className="flex items-center justify-between text-xs py-1 border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 w-4">{i + 1}.</span>
                    <span className="font-medium">{card.word}</span>
                    <span className="text-gray-500">{card.meaning}</span>
                  </div>
                  <span className="text-red-400">×{card.incorrectCount}</span>
                </div>
              ))}
            </div>
          </Card>
        );
      })()}

      {/* Growth curve */}
      {sessions.length > 0 && (() => {
        // Group sessions by week
        const weekMap = new Map<string, { correct: number; total: number; xp: number }>();
        sessions.forEach(s => {
          const d = new Date(s.date);
          const weekStart = new Date(d);
          weekStart.setDate(d.getDate() - d.getDay());
          const key = weekStart.toISOString().split('T')[0];
          const existing = weekMap.get(key) || { correct: 0, total: 0, xp: 0 };
          weekMap.set(key, {
            correct: existing.correct + s.correctCount,
            total: existing.total + s.totalCount,
            xp: existing.xp + s.xpEarned,
          });
        });

        const weeks = [...weekMap.entries()].sort((a, b) => a[0].localeCompare(b[0]));
        const maxXp = Math.max(1, ...weeks.map(w => w[1].xp));

        return (
          <Card className="p-4">
            <h3 className="text-sm font-medium mb-3">成長曲線（週次XP）</h3>
            <div className="flex items-end gap-1 h-24">
              {weeks.map(([week, data]) => {
                const height = (data.xp / maxXp) * 100;
                const accuracy = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
                return (
                  <div key={week} className="flex-1 flex flex-col items-center gap-0.5">
                    <span className="text-[9px] text-gray-500">{data.xp}</span>
                    <div
                      className="w-full bg-blue-500 rounded-t transition-all min-h-[2px]"
                      style={{ height: `${height}%` }}
                      title={`${week}: ${data.xp}XP, 正答率${accuracy}%`}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-[9px] text-gray-600 mt-1">
              {weeks.length > 0 && <span>{weeks[0][0].slice(5)}</span>}
              {weeks.length > 1 && <span>{weeks[weeks.length - 1][0].slice(5)}</span>}
            </div>
            {/* Growth message */}
            <div className="mt-3 bg-gray-800/50 rounded-lg p-2">
              <p className="text-xs text-gray-400">
                学習セッション: {sessions.length}回 / 習得単語: {masteredCards}語 / 累計XP: {profile.totalXp.toLocaleString()}
              </p>
            </div>
          </Card>
        );
      })()}

      {/* Session history */}
      <Card className="p-4">
        <h3 className="text-sm font-medium mb-3">最近のセッション</h3>
        {sessions.length === 0 ? (
          <p className="text-xs text-gray-500 text-center py-4">まだセッションがありません</p>
        ) : (
          <div className="space-y-2">
            {sessions.slice(0, 10).map((session, i) => (
              <div key={i} className="flex justify-between items-center text-xs py-1 border-b border-gray-100 dark:border-gray-800 last:border-0">
                <span className="text-gray-600 dark:text-gray-400">
                  {new Date(session.date).toLocaleDateString('ja-JP')}
                </span>
                <span>{AXIS_LABELS[session.axis]}</span>
                <span className="text-green-600">+{session.xpEarned} XP</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
