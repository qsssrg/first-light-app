'use client';

import { useState, useCallback, useRef, useMemo } from 'react';
import { useDueCards, useVocabCards } from '@/lib/hooks';
import { calculateNextReview } from '@/lib/srs';
import { calculateXp } from '@/lib/xp';
import { getAdaptiveCards } from '@/lib/adaptive';
import { db } from '@/lib/db';
import { getMemberByAxis } from '@/lib/members';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Check, X, Eye, Sparkles } from 'lucide-react';
import type { VocabCard } from '@/types';

type StudyState = 'front' | 'back';
type SessionPhase = 'study' | 'tokoton-end';

export function VocabStudy() {
  const rawDueCards = useDueCards();
  const allCards = useVocabCards();
  // Apply adaptive ordering: prioritize weak/overdue cards, shuffle for variety
  const dueCards = useMemo(() => getAdaptiveCards(rawDueCards, rawDueCards.length), [rawDueCards]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [state, setState] = useState<StudyState>('front');
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [sessionXp, setSessionXp] = useState(0);
  const [studied, setStudied] = useState(0);
  const [newWordsEncountered, setNewWordsEncountered] = useState(0);
  const [isTokoton, setIsTokoton] = useState(false);
  const [phase, setPhase] = useState<SessionPhase>('study');
  const startTimeRef = useRef(Date.now());

  // In tokoton mode, cycle through all cards infinitely
  const getCard = (): VocabCard | undefined => {
    if (isTokoton) {
      // Infinite mode: cycle through all available cards
      const pool = allCards.length > 0 ? allCards : dueCards;
      if (pool.length === 0) return undefined;
      return pool[currentIndex % pool.length] as VocabCard;
    }
    return dueCards[currentIndex] as VocabCard | undefined;
  };

  const currentCard = getCard();
  const totalCards = dueCards.length;

  const handleAnswer = useCallback(async (quality: number) => {
    if (!currentCard?.id) return;

    const correct = quality >= 3;
    const newCombo = correct ? combo + 1 : 0;
    const xp = calculateXp(correct, newCombo);
    const srsUpdate = calculateNextReview(currentCard, quality);

    await db.vocabCards.update(currentCard.id, {
      ...srsUpdate,
      lastReview: new Date(),
      correctCount: currentCard.correctCount + (correct ? 1 : 0),
      incorrectCount: currentCard.incorrectCount + (correct ? 0 : 1),
    });

    if (xp > 0) {
      const profile = await db.userProfile.toCollection().first();
      if (profile?.id) {
        await db.userProfile.update(profile.id, {
          xp: profile.xp + xp,
          totalXp: profile.totalXp + xp,
        });
      }
    }

    // Track new words
    if (currentCard.repetitions === 0) {
      setNewWordsEncountered(n => n + 1);
    }

    setCombo(newCombo);
    setMaxCombo(Math.max(maxCombo, newCombo));
    setSessionXp(sessionXp + xp);
    setStudied(studied + 1);
    setState('front');
    setCurrentIndex(currentIndex + 1);

    // トコトンモード: 10問連続正答で自動発動
    if (newCombo >= 10 && !isTokoton) setIsTokoton(true);
    if (!correct) setIsTokoton(false);
  }, [currentCard, combo, maxCombo, sessionXp, studied, currentIndex, isTokoton]);

  const handleTokotonEnd = () => {
    setPhase('tokoton-end');
  };

  // Tokoton End - 承認メッセージ
  if (phase === 'tokoton-end') {
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 60000);
    const accuracy = studied > 0 ? Math.round(((studied - (studied - maxCombo > 0 ? studied - maxCombo : 0)) / studied) * 100) : 0;
    const vocabMember = getMemberByAxis('vocabulary');

    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 space-y-6">
        <div className="w-full max-w-sm space-y-4">
          <p className="text-sm text-gray-500 text-center">今日の学習 ───</p>

          <div className="space-y-2 text-center">
            <p className="text-sm text-gray-700 dark:text-gray-300">{studied}問に取り組みました</p>
            {newWordsEncountered > 0 && (
              <p className="text-sm text-gray-700 dark:text-gray-300">新しく{newWordsEncountered}語に出会いました</p>
            )}
            <p className="text-sm text-gray-700 dark:text-gray-300">最大コンボ {maxCombo}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">{elapsed > 0 ? `${elapsed}分間` : '1分未満'}</p>
          </div>

          {vocabMember && (
            <Card className="p-4 mt-6" style={{ borderColor: `${vocabMember.color}40` }}>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: vocabMember.color }}
                >
                  {vocabMember.name[0]}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {vocabMember.nameJa}の語彙力が着実に伸びています。
                </p>
              </div>
            </Card>
          )}
        </div>

        <Button
          variant="outline"
          onClick={() => {
            setPhase('study');
            setCurrentIndex(0);
            setStudied(0);
            setSessionXp(0);
            setCombo(0);
            setMaxCombo(0);
            setNewWordsEncountered(0);
            setIsTokoton(false);
            startTimeRef.current = Date.now();
          }}
          className="mt-4"
        >
          もう一度
        </Button>
      </div>
    );
  }

  // Normal session complete (non-tokoton)
  if (!isTokoton && (!currentCard || currentIndex >= totalCards)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 px-4">
        <Sparkles className="w-12 h-12 text-yellow-500" />
        <h2 className="text-xl font-bold">
          {totalCards === 0 ? '復習する単語がありません' : ''}
        </h2>
        {studied > 0 && (
          <div className="text-center space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>{studied}問に取り組みました</p>
            {newWordsEncountered > 0 && <p>新しく{newWordsEncountered}語に出会いました</p>}
            <p>最大コンボ: {maxCombo}</p>
          </div>
        )}
        <Button onClick={() => { setCurrentIndex(0); setStudied(0); setSessionXp(0); setCombo(0); setMaxCombo(0); setNewWordsEncountered(0); }}>
          もう一度
        </Button>
      </div>
    );
  }

  // ─── トコトンモード UI ───
  if (isTokoton) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center px-3">
        {/* Minimal combo indicator */}
        <div className="text-center mb-2">
          <span className="text-xs text-orange-400 font-mono">🔥 {combo}</span>
        </div>

        {/* Card - minimal */}
        <div className="flex flex-col justify-center items-center text-center py-8">
          {state === 'front' ? (
            <>
              <h3 className="text-3xl font-bold mb-6">{currentCard?.word}</h3>
              <button
                onClick={() => setState('back')}
                className="text-gray-400 text-sm underline"
              >
                見る
              </button>
            </>
          ) : (
            <>
              <p className="text-xs text-gray-500 mb-1">{currentCard?.word}</p>
              <h3 className="text-xl font-bold mb-6">{currentCard?.meaning}</h3>
              <div className="flex gap-4">
                <button
                  onClick={() => handleAnswer(1)}
                  className="w-14 h-14 rounded-full border-2 border-red-400 flex items-center justify-center active:bg-red-50 dark:active:bg-red-950"
                >
                  <X className="w-6 h-6 text-red-400" />
                </button>
                <button
                  onClick={() => handleAnswer(5)}
                  className="w-14 h-14 rounded-full border-2 border-green-400 flex items-center justify-center active:bg-green-50 dark:active:bg-green-950"
                >
                  <Check className="w-6 h-6 text-green-400" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* End button - small and subtle */}
        <div className="text-center mt-8">
          <button
            onClick={handleTokotonEnd}
            className="text-xs text-gray-400 hover:text-gray-600 underline decoration-dotted"
          >
            今日はここまで
          </button>
        </div>
      </div>
    );
  }

  // ─── 通常モード UI ───
  return (
    <div className="space-y-4 px-4">
      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-gray-500">
          <span>{currentIndex + 1} / {totalCards}</span>
          {combo > 0 && (
            <span className="text-orange-500 font-medium">🔥 {combo} combo</span>
          )}
        </div>
        <Progress value={((currentIndex + 1) / totalCards) * 100} className="h-1.5" />
      </div>

      {/* Card */}
      <Card className="p-6 min-h-[240px] flex flex-col justify-center items-center text-center">
        {state === 'front' ? (
          <>
            <p className="text-xs text-gray-400 mb-2">{currentCard?.category}</p>
            <h3 className="text-2xl font-bold mb-4">{currentCard?.word}</h3>
            <Button variant="outline" size="sm" onClick={() => setState('back')}>
              <Eye className="w-4 h-4 mr-1" /> 意味を見る
            </Button>
          </>
        ) : (
          <>
            <p className="text-xs text-gray-400 mb-2">{currentCard?.word}</p>
            <h3 className="text-xl font-bold mb-2">{currentCard?.meaning}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-6">
              {currentCard?.example}
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
                onClick={() => handleAnswer(1)}
              >
                <X className="w-4 h-4 mr-1" /> わからない
              </Button>
              <Button
                variant="outline"
                className="border-yellow-300 text-yellow-600 hover:bg-yellow-50"
                onClick={() => handleAnswer(3)}
              >
                まあまあ
              </Button>
              <Button
                variant="outline"
                className="border-green-300 text-green-600 hover:bg-green-50"
                onClick={() => handleAnswer(5)}
              >
                <Check className="w-4 h-4 mr-1" /> 完璧
              </Button>
            </div>
          </>
        )}
      </Card>

      {/* XP indicator */}
      {sessionXp > 0 && (
        <p className="text-center text-sm text-gray-500">
          +{sessionXp} XP
        </p>
      )}
    </div>
  );
}
