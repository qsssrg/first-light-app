'use client';

import { useState, useMemo } from 'react';
import { BottomNav } from '@/components/common/BottomNav';
import { Card } from '@/components/ui/card';
import { useStudySessions } from '@/lib/hooks';

const TIME_SLOTS = [
  { label: '0-6時', color: 'bg-indigo-800', key: 'night' },
  { label: '6-12時', color: 'bg-amber-500', key: 'morning' },
  { label: '12-18時', color: 'bg-emerald-500', key: 'afternoon' },
  { label: '18-24時', color: 'bg-purple-600', key: 'evening' },
] as const;

type SlotKey = typeof TIME_SLOTS[number]['key'];

function getSlotKey(date: Date): SlotKey {
  const h = date.getHours();
  if (h < 6) return 'night';
  if (h < 12) return 'morning';
  if (h < 18) return 'afternoon';
  return 'evening';
}

export default function XpHistoryPage() {
  const sessions = useStudySessions();
  const [range, setRange] = useState<7 | 14 | 30>(7);

  const { dailyData, maxXp } = useMemo(() => {
    const now = new Date();
    const days: { date: string; label: string; slots: Record<SlotKey, number> }[] = [];

    for (let i = range - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const label = `${d.getMonth() + 1}/${d.getDate()}`;
      days.push({ date: dateStr, label, slots: { night: 0, morning: 0, afternoon: 0, evening: 0 } });
    }

    for (const s of sessions) {
      const sd = new Date(s.date);
      const dateStr = sd.toISOString().split('T')[0];
      const day = days.find(d => d.date === dateStr);
      if (day) {
        const slot = getSlotKey(sd);
        day.slots[slot] += s.xpEarned;
      }
    }

    let max = 0;
    for (const d of days) {
      const total = Object.values(d.slots).reduce((a, b) => a + b, 0);
      if (total > max) max = total;
    }

    return { dailyData: days, maxXp: Math.max(max, 1) };
  }, [sessions, range]);

  const totalXp = dailyData.reduce((sum, d) => sum + Object.values(d.slots).reduce((a, b) => a + b, 0), 0);

  return (
    <div className="pb-20">
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto py-6 px-4 space-y-6">
        {/* Header */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500 p-5 text-white shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
          <div className="relative">
            <h2 className="text-xl font-black tracking-wide">XP履歴</h2>
            <p className="text-xs opacity-60 mt-0.5">XP History</p>
            <p className="text-3xl font-black mt-2">{totalXp.toLocaleString()} XP</p>
            <p className="text-xs opacity-60">直近{range}日間</p>
          </div>
        </div>

        {/* Range selector */}
        <div className="flex gap-2 justify-center">
          {([7, 14, 30] as const).map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                range === r ? 'bg-amber-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              {r}日
            </button>
          ))}
        </div>

        {/* Bar chart */}
        <Card className="p-4 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
          <div className="overflow-x-auto">
          <div className="flex gap-1" style={{ height: '256px', minWidth: range > 14 ? `${range * 34}px` : undefined }}>
            {dailyData.map((day, i) => {
              const total = Object.values(day.slots).reduce((a, b) => a + b, 0);
              // 最大日を80%高さにし、他の日は比例計算
              const heightPct = maxXp > 0 ? (total / maxXp) * 80 : 0;

              return (
                <div key={day.date} className="flex-1 flex flex-col justify-end items-center" style={{ height: '256px' }}>
                  {/* Stacked bar - px計算で確実に描画 */}
                  <div className="w-full flex flex-col-reverse" style={{ height: `${Math.round(Math.max((256 * heightPct) / 100, total > 0 ? 8 : 0))}px` }}>
                    {TIME_SLOTS.map(slot => {
                      const slotXp = day.slots[slot.key];
                      if (slotXp === 0 || total === 0) return null;
                      const slotPct = (slotXp / total) * 100;
                      return (
                        <div
                          key={slot.key}
                          className={`${slot.color} w-full first:rounded-t`}
                          style={{ height: `${slotPct}%`, minHeight: '2px' }}
                          title={`${slot.label}: ${slotXp}XP`}
                        />
                      );
                    })}
                  </div>
                  {/* Label */}
                  <span className="text-[8px] text-gray-400 mt-1 whitespace-nowrap">{day.label}</span>
                </div>
              );
            })}
          </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-3 mt-4">
            {TIME_SLOTS.map(slot => (
              <div key={slot.key} className="flex items-center gap-1">
                <div className={`w-2.5 h-2.5 rounded-sm ${slot.color}`} />
                <span className="text-[10px] text-gray-500">{slot.label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Daily totals */}
        <Card className="p-4 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
          <h3 className="text-sm font-bold mb-3">日別詳細</h3>
          <div className="space-y-1.5 max-h-60 overflow-y-auto">
            {[...dailyData].reverse().map(day => {
              const total = Object.values(day.slots).reduce((a, b) => a + b, 0);
              if (total === 0) return null;
              return (
                <div key={day.date} className="flex items-center justify-between text-xs py-1 border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <span className="text-gray-600 dark:text-gray-400">{day.label}</span>
                  <div className="flex gap-3">
                    {TIME_SLOTS.map(slot => {
                      const xp = day.slots[slot.key];
                      return xp > 0 ? (
                        <span key={slot.key} className="text-gray-500">{slot.label}: {xp}</span>
                      ) : null;
                    })}
                    <span className="font-bold text-amber-600">{total} XP</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
      <BottomNav />
    </div>
  );
}
