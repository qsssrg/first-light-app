'use client';

import { useState, useMemo, useRef } from 'react';
import { READING_QUESTIONS } from '@/lib/reading-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Check, X, BookOpen, Home, RotateCcw } from 'lucide-react';
import { useProfile } from '@/lib/hooks';
import { calculateXp, getLevelFromXp } from '@/lib/xp';
import { db } from '@/lib/db';
import { ComboFlash, XpFloat } from '@/components/common/GameEffects';
import { addAffinityPoints } from '@/lib/affinity';
import { SpeakButton } from '@/components/common/SpeakButton';
import { MEMBERS } from '@/lib/members';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import { getPlayerName } from '@/lib/player-name';
import Link from 'next/link';

const SORA = MEMBERS.find(m => m.id === 'sora')!;

const ENCOURAGEMENTS = {
  great: [
    '{name}さん…すごい正答率ですね。尊敬します。',
    '{name}さんの読解力、本当に素晴らしいです。',
    '…{name}さんって、もしかして読書家ですか？',
  ],
  good: [
    '{name}さん、お疲れさまです。着実に力がついてますね。',
    '…{name}さんと一緒に読めて、嬉しいです。',
    'コツコツ続ける{name}さん、かっこいいと思います。',
  ],
  struggle: [
    '{name}さん…僕も最初は全然でした。大丈夫ですよ。',
    '間違えた問題って、実は一番覚えやすいんですよ。',
    '{name}さん、無理しないでくださいね。',
  ],
};

export function ReadingPractice() {
  const profile = useProfile();
  const en = profile?.settings?.englishSpeakerMode ?? false;
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [sessionXp, setSessionXp] = useState(0);
  const [lastXp, setLastXp] = useState(0);
  const [xpTrigger, setXpTrigger] = useState(0);
  const startTimeRef = useRef(Date.now());

  const questions = useMemo(() => {
    const shuffled = [...READING_QUESTIONS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  }, []);

  const handleConfirm = async () => {
    if (selected === null) return;
    setConfirmed(true);
    const isCorrect = selected === questions[current].correctIndex;
    if (isCorrect) setScore(s => s + 1);

    const newCombo = isCorrect ? combo + 1 : 0;
    const xp = isCorrect ? calculateXp(true, newCombo) : 0;
    setCombo(newCombo);
    setMaxCombo(Math.max(maxCombo, newCombo));

    if (xp > 0) {
      setSessionXp(prev => prev + xp);
      setLastXp(xp);
      setXpTrigger(prev => prev + 1);
      try {
        const p = await db.userProfile.toCollection().first();
        if (p?.id) {
          const newTotalXp = p.totalXp + xp;
          await db.userProfile.update(p.id, {
            xp: p.xp + xp,
            totalXp: newTotalXp,
            level: getLevelFromXp(newTotalXp),
          });
        }
        await db.studySessions.add({
          date: new Date(), axis: 'reading',
          correctCount: isCorrect ? 1 : 0, totalCount: 1,
          xpEarned: xp, comboMax: newCombo, duration: 0,
        } as any);
        await addAffinityPoints('reading', 5);
      } catch {}
    }
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      import('@/lib/streak').then(({ onStudyComplete }) => onStudyComplete());
    }
    setCurrent(c => c + 1);
    setSelected(null);
    setConfirmed(false);
  };

  const resetSession = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setConfirmed(false);
    setCombo(0);
    setMaxCombo(0);
    setSessionXp(0);
    startTimeRef.current = Date.now();
  };

  const gameEffects = (
    <>
      <ComboFlash combo={combo} />
      <XpFloat xp={lastXp} trigger={xpTrigger} />
    </>
  );

  // ── Completion screen ──
  if (current >= questions.length) {
    const correctRate = questions.length > 0 ? score / questions.length : 0;
    const rank = correctRate >= 0.9 ? 'S' : correctRate >= 0.7 ? 'A' : correctRate >= 0.5 ? 'B' : 'C';
    const rankColors: Record<string, string> = {
      S: 'from-yellow-400 via-amber-300 to-yellow-500 text-yellow-900',
      A: 'from-indigo-400 via-purple-400 to-fuchsia-400 text-white',
      B: 'from-emerald-400 via-green-400 to-teal-400 text-white',
      C: 'from-gray-400 via-gray-300 to-gray-400 text-gray-800',
    };
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 60000);
    const name = getPlayerName() || 'マネージャー';
    const level = correctRate >= 0.8 ? 'great' : correctRate >= 0.5 ? 'good' : 'struggle';
    const msgs = ENCOURAGEMENTS[level];
    const msg = msgs[Math.floor(Math.random() * msgs.length)].replace(/\{name\}/g, name);

    return (
      <div className="min-h-[85vh] flex flex-col px-4 py-6">
        <p className="text-center text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase mb-6">
          Session Complete
        </p>

        <div className="flex-1 space-y-5">
          <div className="flex flex-col items-center gap-2">
            <p className="text-[10px] text-gray-500 tracking-wider uppercase">{en ? 'Rank' : 'ランク'}</p>
            <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${rankColors[rank]} flex items-center justify-center shadow-2xl`}>
              <span className="text-5xl font-black">{rank}</span>
            </div>
          </div>

          {sessionXp > 0 && (
            <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{en ? 'XP Earned' : '獲得XP'}</p>
                <p className="text-lg font-black text-amber-400">+{sessionXp}</p>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, (sessionXp / 200) * 100)}%` }} />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-4 text-center">
              <p className="text-2xl font-black text-indigo-400">{score}/{questions.length}</p>
              <p className="text-[10px] text-gray-500 tracking-wider uppercase mt-1">Correct</p>
            </div>
            <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-4 text-center">
              <p className="text-2xl font-black text-purple-400">{sessionXp}</p>
              <p className="text-[10px] text-gray-500 tracking-wider uppercase mt-1">XP Earned</p>
            </div>
            <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-4 text-center">
              <p className="text-2xl font-black text-orange-400">{maxCombo}</p>
              <p className="text-[10px] text-gray-500 tracking-wider uppercase mt-1">Max Combo</p>
            </div>
            <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-4 text-center">
              <p className="text-2xl font-black text-cyan-400">{elapsed > 0 ? `${elapsed}m` : '<1m'}</p>
              <p className="text-[10px] text-gray-500 tracking-wider uppercase mt-1">Time</p>
            </div>
          </div>

          {/* Sora encouragement */}
          <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-4">
            <div className="flex items-start gap-3">
              <MemberAvatar member={SORA} size="md" />
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">{SORA.nameJa}</p>
                <p className="text-sm text-gray-300">{msg}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2.5 pt-4 pb-2">
          <Link href="/" className="block">
            <button className="w-full py-3.5 rounded-xl text-sm font-bold tracking-wide bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <Home className="w-4 h-4" /> {en ? 'Home' : 'ホームに戻る'}
            </button>
          </Link>
          <button
            onClick={resetSession}
            className="w-full py-3 rounded-xl text-sm font-medium border-2 border-gray-700/50 text-gray-300 hover:border-gray-500 hover:bg-gray-800/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> {en ? 'Retry' : 'もう一度'}
          </button>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const isCorrect = selected === q.correctIndex;

  const colorSchemes = [
    { border: 'border-blue-200 dark:border-blue-700', hover: 'hover:border-blue-400', selected: 'border-blue-500 bg-blue-50 dark:bg-blue-950 ring-2 ring-blue-300 dark:ring-blue-700', badge: 'border-blue-400 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300', badgeSelected: 'border-blue-500 bg-blue-500 text-white', correct: 'border-blue-500 bg-blue-100 dark:bg-blue-900', wrong: 'border-red-500 bg-red-50 dark:bg-red-950' },
    { border: 'border-emerald-200 dark:border-emerald-700', hover: 'hover:border-emerald-400', selected: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950 ring-2 ring-emerald-300 dark:ring-emerald-700', badge: 'border-emerald-400 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300', badgeSelected: 'border-emerald-500 bg-emerald-500 text-white', correct: 'border-emerald-500 bg-emerald-100 dark:bg-emerald-900', wrong: 'border-red-500 bg-red-50 dark:bg-red-950' },
    { border: 'border-orange-200 dark:border-orange-700', hover: 'hover:border-orange-400', selected: 'border-orange-500 bg-orange-50 dark:bg-orange-950 ring-2 ring-orange-300 dark:ring-orange-700', badge: 'border-orange-400 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300', badgeSelected: 'border-orange-500 bg-orange-500 text-white', correct: 'border-orange-500 bg-orange-100 dark:bg-orange-900', wrong: 'border-red-500 bg-red-50 dark:bg-red-950' },
    { border: 'border-purple-200 dark:border-purple-700', hover: 'hover:border-purple-400', selected: 'border-purple-500 bg-purple-50 dark:bg-purple-950 ring-2 ring-purple-300 dark:ring-purple-700', badge: 'border-purple-400 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300', badgeSelected: 'border-purple-500 bg-purple-500 text-white', correct: 'border-purple-500 bg-purple-100 dark:bg-purple-900', wrong: 'border-red-500 bg-red-50 dark:bg-red-950' },
  ];

  // ── Result screen ──
  if (confirmed) {
    return (
      <div className="space-y-4 px-4">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{q.level === 'toefl' ? 'TOEFL' : q.level === 'eiken_pre1' ? '準1級' : '2級'}</Badge>
          <div className="flex items-center gap-2">
            {combo > 0 && <span className="text-xs font-black text-orange-400">🔥 {combo}</span>}
            {sessionXp > 0 && <span className="text-xs font-bold text-amber-500">+{sessionXp} XP</span>}
            <span className="text-xs text-gray-500">{current + 1} / {questions.length}</span>
          </div>
        </div>
        <Progress value={((current + 1) / questions.length) * 100} className="h-1.5" />

        <div className={`p-4 rounded-xl text-center font-bold text-lg ${isCorrect ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'}`}>
          {isCorrect ? (en ? 'Correct!' : '正解！') : (en ? 'Incorrect' : '不正解')}
          {isCorrect && combo > 0 && <span className="ml-2 text-sm font-black text-orange-400">🔥 {combo}</span>}
        </div>

        {!isCorrect && (
          <p className="text-sm text-center text-gray-500">
            {en ? 'Answer' : '正解'}: {q.options[q.correctIndex]}
          </p>
        )}

        <Card className="p-4 bg-blue-50/50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-blue-500 font-bold">{en ? 'Passage' : '英文'}</p>
            <SpeakButton text={q.passage} />
          </div>
          <p className="text-sm leading-relaxed">{q.passage}</p>
        </Card>

        <Card className="p-4 bg-gray-50/50 dark:bg-gray-900/50">
          <p className="text-xs text-gray-500 font-bold mb-2">{en ? 'Explanation' : '解説'}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{q.explanation}</p>
        </Card>

        <Button onClick={handleNext} className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
          {current + 1 >= questions.length ? (en ? 'See Results' : '結果を見る') : (en ? 'Next Question' : '次の問題へ')}
        </Button>
        {gameEffects}
      </div>
    );
  }

  // ── Question screen ──
  return (
    <div className="space-y-4 px-4">
      <div className="flex items-center justify-between">
        <Badge variant="secondary">{q.level === 'toefl' ? 'TOEFL' : q.level === 'eiken_pre1' ? '準1級' : '2級'}</Badge>
        <div className="flex items-center gap-2">
          {combo > 0 && <span className="text-xs font-black text-orange-400">🔥 {combo}</span>}
          {sessionXp > 0 && <span className="text-xs font-bold text-amber-500">+{sessionXp} XP</span>}
          <span className="text-xs text-gray-500">{current + 1} / {questions.length}</span>
        </div>
      </div>
      <Progress value={((current + 1) / questions.length) * 100} className="h-1.5" />

      <Card className="p-4 bg-blue-50/50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800">
        <p className="text-sm leading-relaxed">{q.passage}</p>
      </Card>

      <Card className="p-4">
        <p className="text-sm font-medium mb-3">{q.question}</p>
        <div className="space-y-2">
          {q.options.map((opt, i) => {
            const scheme = colorSchemes[i] || colorSchemes[0];
            let cls = `${scheme.border} ${scheme.hover}`;
            if (selected === i) cls = scheme.selected;
            const badgeCls = selected === i ? scheme.badgeSelected : scheme.badge;
            return (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`w-full text-left p-3 rounded-lg border text-sm flex items-center gap-2 transition-colors ${cls}`}
              >
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold ${badgeCls}`}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      </Card>

      <Button
        onClick={handleConfirm}
        disabled={selected === null}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40"
        size="lg"
      >
        {en ? 'Confirm' : '決定'}
      </Button>
      {gameEffects}
    </div>
  );
}
