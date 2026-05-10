'use client';

import { useState, useMemo, useCallback, useRef } from 'react';
import { GRAMMAR_QUESTIONS } from '@/lib/grammar-data';
import { Button } from '@/components/ui/button';
import { Check, X, Home, RotateCcw, Star } from 'lucide-react';
import { useProfile } from '@/lib/hooks';
import { getMember, MEMBERS } from '@/lib/members';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import { TypewriterText } from '@/components/common/TypewriterText';
import { getPlayerName } from '@/lib/player-name';
import { ComboFlash, XpFloat, TokotonActivation } from '@/components/common/GameEffects';
import { calculateXp, getLevelFromXp } from '@/lib/xp';
import { addAffinityPoints } from '@/lib/affinity';
import { AFFINITY_LABELS, db } from '@/lib/db';
import Link from 'next/link';

type EncouragementLevel = 'great' | 'good' | 'struggle';

const ENCOURAGEMENT: Record<string, Record<EncouragementLevel, string[]>> = {
  kai: {
    great: [
      '{name}、完璧だ。文法を極めし者の実力を見せつけたな。',
      'すごいじゃん、{name}！ この正確さ…俺も負けてられない。',
      '{name}、お前の構文理解は本物だ。メンバーにも自慢しておくよ。',
    ],
    good: [
      'お疲れ、{name}。着実に力がついてる。この調子だ。',
      '{name}、悪くない。文法は積み重ねが大事だ。また明日やろう。',
      '構造を理解するのは時間がかかる。{name}、焦らず行こう。',
    ],
    struggle: [
      '焦るな、{name}。文法は一番地道な分野だ。でも一番確実に伸びる。',
      '{name}、大丈夫。今日間違えた分は次に活きる。保証する。',
      '続けてるだけですごいよ、{name}。俺がついてるから。',
    ],
  },
};

function getEncouragement(studied: number, correctRate: number): { member: typeof MEMBERS[0]; message: string } {
  const name = getPlayerName() || 'マネージャー';
  const level: EncouragementLevel = correctRate >= 0.8 ? 'great' : correctRate >= 0.5 ? 'good' : 'struggle';
  const messages = ENCOURAGEMENT.kai[level];
  const member = MEMBERS.find(m => m.id === 'kai')!;
  const message = messages[Math.floor(Math.random() * messages.length)]
    .replace(/\{name\}/g, name);
  return { member, message };
}

export function GrammarPractice() {
  const profile = useProfile();
  const en = profile?.settings?.englishSpeakerMode ?? false;

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrectThisStep, setIsCorrectThisStep] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [sessionXp, setSessionXp] = useState(0);
  const [lastXp, setLastXp] = useState(0);
  const [xpTrigger, setXpTrigger] = useState(0);
  const [isTokoton, setIsTokoton] = useState(false);
  const [tokotonJustActivated, setTokotonJustActivated] = useState(false);
  const [levelUpDisplay, setLevelUpDisplay] = useState<number | null>(null);
  const [affinityLevelUp, setAffinityLevelUp] = useState<{ memberId: string; level: number } | null>(null);
  const startTimeRef = useRef(Date.now());

  const questions = useMemo(() => {
    const shuffled = [...GRAMMAR_QUESTIONS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  }, []);

  const totalCards = questions.length;

  const handleSelect = useCallback((index: number) => {
    if (showResult) return;
    setSelected(index);
  }, [showResult]);

  const handleConfirm = useCallback(async () => {
    if (selected === null || showResult) return;
    const correct = selected === questions[current].correctIndex;
    setIsCorrectThisStep(correct);
    setShowResult(true);

    const newCombo = correct ? combo + 1 : 0;
    const xp = correct ? calculateXp(true, newCombo) : 0;

    if (correct) setScore(s => s + 1);
    setCombo(newCombo);
    setMaxCombo(Math.max(maxCombo, newCombo));
    setSessionXp(prev => prev + xp);

    if (xp > 0) {
      setLastXp(xp);
      setXpTrigger(prev => prev + 1);

      // Update XP in profile
      const prof = await db.userProfile.toCollection().first();
      if (prof?.id) {
        const newTotalXp = prof.totalXp + xp;
        const oldLevel = getLevelFromXp(prof.totalXp);
        const newLevel = getLevelFromXp(newTotalXp);
        await db.userProfile.update(prof.id, {
          xp: prof.xp + xp,
          totalXp: newTotalXp,
          level: newLevel,
        });
        if (newLevel > oldLevel) {
          setLevelUpDisplay(newLevel);
          setTimeout(() => setLevelUpDisplay(null), 3000);
        }
      }

      // Record study session
      await db.studySessions.add({
        date: new Date(),
        axis: 'grammar',
        correctCount: correct ? 1 : 0,
        totalCount: 1,
        xpEarned: xp,
        comboMax: newCombo,
        duration: 0,
      } as any);

      // Update streak
      const { onStudyComplete } = await import('@/lib/streak');
      await onStudyComplete();

      // Add affinity points to Kai (grammar)
      const aff = await addAffinityPoints('grammar', 5);
      if (aff.leveled) {
        setAffinityLevelUp({ memberId: aff.memberId, level: aff.newLevel });
        setTimeout(() => setAffinityLevelUp(null), 3000);
      }
    }

    // Tokoton activation at 10 combo
    if (newCombo >= 10 && !isTokoton) {
      setIsTokoton(true);
      setTokotonJustActivated(true);
      setTimeout(() => setTokotonJustActivated(false), 2500);
    }
    if (!correct) setIsTokoton(false);
  }, [selected, showResult, questions, current, combo, maxCombo, isTokoton]);

  const nextQuestion = useCallback(() => {
    setCurrent(c => c + 1);
    setSelected(null);
    setShowResult(false);
    setIsCorrectThisStep(false);
  }, []);

  const resetSession = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setIsCorrectThisStep(false);
    setCombo(0);
    setMaxCombo(0);
    setSessionXp(0);
    setIsTokoton(false);
    startTimeRef.current = Date.now();
  };

  // ─── 完了画面（ゲーム風・VocabStudy統一） ───
  if (current >= questions.length) {
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 60000);
    const correctRate = totalCards > 0 ? score / totalCards : 0;
    const rank = correctRate >= 0.9 ? 'S' : correctRate >= 0.7 ? 'A' : correctRate >= 0.5 ? 'B' : 'C';
    const rankColors: Record<string, string> = {
      S: 'from-yellow-400 via-amber-300 to-yellow-500 text-yellow-900',
      A: 'from-indigo-400 via-purple-400 to-fuchsia-400 text-white',
      B: 'from-emerald-400 via-green-400 to-teal-400 text-white',
      C: 'from-gray-400 via-gray-300 to-gray-400 text-gray-800',
    };
    const encouragement = score > 0 ? getEncouragement(totalCards, correctRate) : null;

    return (
      <div className="min-h-[85vh] flex flex-col px-4 py-6">
        {/* Header */}
        <p className="text-center text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase mb-6">
          Session Complete
        </p>

        <div className="flex-1 space-y-5">
          {/* Rank badge */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-[10px] text-gray-500 tracking-wider uppercase">{en ? 'Rank' : 'ランク'}</p>
            <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${rankColors[rank]} flex items-center justify-center shadow-2xl`}>
              <span className="text-5xl font-black">{rank}</span>
            </div>
            <p className="text-xs text-gray-500">
              {rank === 'S' ? (en ? '90%+ accuracy' : '正答率90%+') : rank === 'A' ? (en ? '70%+ accuracy' : '正答率70%+') : rank === 'B' ? (en ? '50%+ accuracy' : '正答率50%+') : (en ? 'Under 50%' : '正答率50%未満')}
            </p>
          </div>

          {/* XP gauge */}
          {sessionXp > 0 && (
            <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">獲得XP</p>
                <p className="text-lg font-black text-amber-400">+{sessionXp}</p>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min(100, (sessionXp / 200) * 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-4 text-center">
              <p className="text-2xl font-black text-indigo-400">{totalCards}</p>
              <p className="text-[10px] text-gray-500 tracking-wider uppercase mt-1">Questions</p>
            </div>
            <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-4 text-center">
              <p className="text-2xl font-black text-purple-400">{sessionXp}</p>
              <p className="text-[10px] text-gray-500 tracking-wider uppercase mt-1">XP Earned</p>
            </div>
            <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-4 text-center">
              <p className="text-2xl font-black text-orange-400">🔥 {maxCombo}</p>
              <p className="text-[10px] text-gray-500 tracking-wider uppercase mt-1">Max Combo</p>
            </div>
            <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-4 text-center">
              <p className="text-2xl font-black text-fuchsia-400">{elapsed > 0 ? `${elapsed}m` : '<1m'}</p>
              <p className="text-[10px] text-gray-500 tracking-wider uppercase mt-1">Time</p>
            </div>
          </div>

          {/* Member encouragement */}
          {encouragement && (
            <div className="rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex gap-3 items-start">
                <div className="shrink-0">
                  <MemberAvatar member={encouragement.member} size="md" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{encouragement.member.nameJa}</p>
                  <TypewriterText text={encouragement.message} speed={40} className="text-sm font-medium text-gray-800 dark:text-gray-100" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="space-y-2.5 pt-4 pb-2">
          <Link href="/" className="block">
            <button className="w-full py-3.5 rounded-xl text-sm font-bold tracking-wide bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <Home className="w-4 h-4" /> ホームに戻る
            </button>
          </Link>
          <div className="flex gap-2.5">
            <button
              onClick={resetSession}
              className="flex-1 py-3 rounded-xl text-sm font-medium border-2 border-gray-700/50 text-gray-300 hover:border-gray-500 hover:bg-gray-800/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> もう一度
            </button>
            <Link href="/grammar" className="flex-1">
              <button className="w-full py-3 rounded-xl text-sm font-medium border-2 border-blue-700/50 text-blue-300 hover:border-blue-500 hover:bg-blue-800/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                <Star className="w-4 h-4" /> 文法一覧へ
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];

  // ─── 結果表示 (ゲーム風・VocabStudy統一) ───
  if (showResult) {
    return (
      <div className="min-h-[85vh] flex flex-col px-4 py-3">
        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold tracking-wider text-gray-400">RESULT</span>
            <div className="flex items-center gap-3">
              {combo > 0 && <span className="text-xs font-black text-orange-400">🔥 {combo}</span>}
              <span className="text-xs font-medium text-gray-400">{current + 1} / {totalCards}</span>
            </div>
          </div>
          <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 transition-all duration-500" style={{ width: `${((current + 1) / totalCards) * 100}%` }} />
          </div>
        </div>

        {/* Result card */}
        <div className={`rounded-2xl p-6 text-center border-2 backdrop-blur-md shadow-xl ${
          isCorrectThisStep
            ? 'border-emerald-400/50 bg-emerald-500/5 shadow-emerald-500/10'
            : 'border-red-400/50 bg-red-500/5 shadow-red-500/10'
        }`}>
          {/* Big result icon */}
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            isCorrectThisStep
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'bg-red-500/20 text-red-400'
          }`}>
            {isCorrectThisStep ? <Check className="w-8 h-8" /> : <X className="w-8 h-8" />}
          </div>
          <p className={`text-lg font-black mb-4 ${isCorrectThisStep ? 'text-emerald-400' : 'text-red-400'}`}>
            {isCorrectThisStep ? 'Correct!' : 'Incorrect'}
          </p>

          {/* Question info */}
          <p className="text-sm text-gray-800 dark:text-gray-100 italic font-medium mb-3 px-2 font-mono">{q.question}</p>

          {/* Selected vs correct */}
          {selected !== null && (
            <div className="mt-3 space-y-2 text-left px-2">
              {!isCorrectThisStep && (
                <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-red-500/10">
                  <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-red-300">{q.options[selected]}</span>
                </div>
              )}
              <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-emerald-500/10">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm text-emerald-300">{q.options[q.correctIndex]}</span>
              </div>
            </div>
          )}

          {/* Explanation */}
          <div className="mt-4 pt-3 border-t border-white/10">
            <p className="text-[10px] text-gray-500 font-medium mb-1">{en ? 'Explanation' : '解説'}</p>
            <p className="text-xs text-gray-400">{q.explanation}</p>
          </div>
        </div>

        {/* Next button */}
        <div className="mt-auto pt-4 pb-2">
          <button
            onClick={nextQuestion}
            className="w-full py-3.5 rounded-xl text-sm font-bold tracking-wide bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl active:scale-[0.98] transition-all"
          >
            {current + 1 >= questions.length ? (en ? 'See Results →' : '結果を見る →') : (en ? 'Next →' : '次の問題 →')}
          </button>
        </div>
      </div>
    );
  }

  // ─── 通常モード: 4択クイズ UI（ゲーム風・VocabStudy統一） ───
  return (
    <div className="min-h-[85vh] flex flex-col px-4 py-3">
      {/* Game effects overlay */}
      <ComboFlash combo={combo} />
      <XpFloat xp={lastXp} trigger={xpTrigger} />
      <TokotonActivation active={tokotonJustActivated} />

      {/* Level-up notification */}
      {levelUpDisplay && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="animate-combo-flash text-center">
            <div className="w-28 h-28 mx-auto rounded-2xl bg-gradient-to-br from-yellow-400 via-amber-300 to-yellow-500 flex items-center justify-center shadow-2xl shadow-yellow-500/50 mb-3">
              <span className="text-4xl font-black text-yellow-900">Lv.{levelUpDisplay}</span>
            </div>
            <p className="text-2xl font-black bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent drop-shadow-lg">
              LEVEL UP!
            </p>
            <p className="text-sm text-yellow-200/80 mt-1">新しいレベルに到達しました</p>
          </div>
        </div>
      )}

      {/* Affinity level-up notification */}
      {affinityLevelUp && (() => {
        const m = getMember(affinityLevelUp.memberId);
        const label = AFFINITY_LABELS[affinityLevelUp.level - 1] ?? '';
        return (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            <div className="animate-combo-flash text-center">
              {m && <div className="flex justify-center mb-2"><MemberAvatar member={m} size="lg" /></div>}
              <p className="text-xl font-black text-pink-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
                ♡ 親密度UP ♡
              </p>
              <p className="text-sm text-pink-300 mt-1">{m?.nameJa}との関係: {label}</p>
            </div>
          </div>
        );
      })()}

      {/* Progress header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold tracking-wider text-indigo-400">GRAMMAR</span>
          <div className="flex items-center gap-3">
            {combo > 0 && (
              <span className="text-xs font-black text-orange-400 animate-pulse">🔥 {combo}</span>
            )}
            <span className="text-xs font-medium text-gray-400">{current + 1} / {totalCards}</span>
          </div>
        </div>
        <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 transition-all duration-500"
            style={{ width: `${((current + 1) / totalCards) * 100}%` }}
          />
        </div>
      </div>

      {/* Question card — glassmorphism */}
      <div className="rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/10 p-6 text-center shadow-xl mb-4">
        <div className="flex items-center justify-center gap-2 mb-3">
          <p className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">
            {q.level === 'toefl' ? 'TOEFL' : q.level === 'eiken_pre1' ? '準1級' : '2級'}
          </p>
        </div>
        <p className="text-base leading-relaxed text-gray-800 dark:text-gray-100 font-medium px-2 font-mono">{q.question}</p>
        <p className="text-xs text-gray-500 mt-4">{en ? 'Choose the correct answer' : '正しい答えを選んでください'}</p>

        {/* Step dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {questions.map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === current ? 'bg-indigo-400' : i < current ? 'bg-indigo-700' : 'bg-gray-700'}`} />
          ))}
        </div>
      </div>

      {/* Options — game-style buttons */}
      <div className="space-y-2.5 flex-1">
        {q.options.map((opt, i) => (
          <button
            key={`${current}-${i}`}
            onClick={() => handleSelect(i)}
            className={`w-full text-left px-5 py-3.5 rounded-xl border-2 transition-all duration-200 text-sm font-medium ${
              selected === i
                ? 'border-indigo-400 bg-indigo-500/20 text-white shadow-lg shadow-indigo-500/20 scale-[1.02]'
                : 'border-gray-700/50 bg-gray-800/30 hover:border-gray-500 hover:bg-gray-800/50 text-gray-200 active:scale-[0.98]'
            }`}
          >
            <span className="inline-flex items-center gap-2.5">
              <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 ${
                selected === i ? 'border-indigo-400 bg-indigo-500 text-white' : 'border-gray-600 text-gray-500'
              }`}>
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </span>
          </button>
        ))}
      </div>

      {/* Confirm button — gradient */}
      <div className="mt-4 pb-2">
        <button
          onClick={handleConfirm}
          disabled={selected === null}
          className={`w-full py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 ${
            selected !== null
              ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 active:scale-[0.98]'
              : 'bg-gray-800 text-gray-600 cursor-not-allowed'
          }`}
        >
          {en ? 'Confirm' : '決定'}
        </button>

        {/* XP indicator */}
        {sessionXp > 0 && (
          <p className="text-center text-xs text-indigo-400/70 font-medium mt-2">
            +{sessionXp} XP
          </p>
        )}
      </div>
    </div>
  );
}
