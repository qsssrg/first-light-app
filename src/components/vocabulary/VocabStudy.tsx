'use client';

import { useState, useCallback, useRef, useMemo } from 'react';
import { useDueCards, useVocabCards } from '@/lib/hooks';
import { calculateNextReview } from '@/lib/srs';
import { calculateXp } from '@/lib/xp';
import { getAdaptiveCards, shuffle } from '@/lib/adaptive';
import { db } from '@/lib/db';
import { getMemberByAxis } from '@/lib/members';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Check, X, Sparkles } from 'lucide-react';
import type { VocabCard } from '@/types';
import { EXAMPLE_TRANSLATIONS } from '@/lib/example-translations-data';

type QuizStep = 'meaning' | 'meaning-result' | 'example' | 'example-result';
type SessionPhase = 'study' | 'tokoton-end';

function generateMeaningOptions(
  correctCard: VocabCard,
  allCards: VocabCard[],
): string[] {
  const correct = correctCard.meaning;
  const sameCategory = allCards.filter(
    c => c.meaning !== correct && c.category === correctCard.category
  );
  const sameDifficulty = allCards.filter(
    c => c.meaning !== correct && Math.abs(c.difficulty - correctCard.difficulty) <= 1
  );
  const others = allCards.filter(c => c.meaning !== correct);

  const pool = sameCategory.length >= 3 ? sameCategory :
               sameDifficulty.length >= 3 ? sameDifficulty : others;
  const shuffled = shuffle(pool);
  const distractors = shuffled.slice(0, 3).map(c => c.meaning);

  const unique = [...new Set(distractors)];
  let i = 0;
  while (unique.length < 3 && i < others.length) {
    const val = others[i].meaning;
    if (val !== correct && !unique.includes(val)) {
      unique.push(val);
    }
    i++;
  }

  return shuffle([correct, ...unique.slice(0, 3)]);
}

/** Generate translation options for example sentence quiz */
function generateTranslationOptions(
  correctCard: VocabCard,
): string[] {
  const entry = EXAMPLE_TRANSLATIONS[correctCard.word];
  if (!entry) {
    // Fallback: just show the correct answer with generic wrongs
    return shuffle([
      correctCard.meaning + 'に関する例文。',
      correctCard.meaning + 'とは異なる意味。',
      correctCard.meaning + 'の反対の意味。',
      correctCard.meaning + 'を含む別の文。',
    ]);
  }
  return shuffle([entry.correct, ...entry.wrong]);
}

export function VocabStudy() {
  const rawDueCards = useDueCards();
  const allCards = useVocabCards();
  const dueCards = useMemo(() => getAdaptiveCards(rawDueCards, rawDueCards.length), [rawDueCards]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [step, setStep] = useState<QuizStep>('meaning');
  const [selected, setSelected] = useState<number | null>(null);
  const [meaningCorrect, setMeaningCorrect] = useState(false);
  const [exampleCorrect, setExampleCorrect] = useState(false);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [sessionXp, setSessionXp] = useState(0);
  const [studied, setStudied] = useState(0);
  const [newWordsEncountered, setNewWordsEncountered] = useState(0);
  const [isTokoton, setIsTokoton] = useState(false);
  const [phase, setPhase] = useState<SessionPhase>('study');
  const startTimeRef = useRef(Date.now());

  // Generate options once per card (memoized by index)
  const getCardForOptions = () => {
    if (isTokoton) {
      const pool = allCards.length > 0 ? allCards : dueCards;
      return pool[currentIndex % Math.max(1, pool.length)] as VocabCard | undefined;
    }
    return dueCards[currentIndex] as VocabCard | undefined;
  };

  const meaningOptions = useMemo(() => {
    const card = getCardForOptions();
    if (!card) return [];
    return generateMeaningOptions(card, allCards);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, allCards, dueCards, isTokoton]);

  const translationOptions = useMemo(() => {
    const card = getCardForOptions();
    if (!card) return [];
    return generateTranslationOptions(card);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, allCards, dueCards, isTokoton]);

  const getCard = (): VocabCard | undefined => {
    if (isTokoton) {
      const pool = allCards.length > 0 ? allCards : dueCards;
      if (pool.length === 0) return undefined;
      return pool[currentIndex % pool.length] as VocabCard;
    }
    return dueCards[currentIndex] as VocabCard | undefined;
  };

  const currentCard = getCard();
  const totalCards = dueCards.length;

  const handleSelect = useCallback((index: number) => {
    if (step === 'meaning-result' || step === 'example-result') return;
    setSelected(index);
  }, [step]);

  const handleConfirm = useCallback(() => {
    if (selected === null) return;

    if (step === 'meaning') {
      const correct = meaningOptions[selected] === currentCard?.meaning;
      setMeaningCorrect(correct);
      setStep('meaning-result');
    } else if (step === 'example') {
      const entry = EXAMPLE_TRANSLATIONS[currentCard?.word ?? ''];
      const correct = entry ? translationOptions[selected] === entry.correct : false;
      setExampleCorrect(correct);
      setStep('example-result');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, step, meaningOptions, translationOptions, currentCard]);

  const handleNext = useCallback(async () => {
    if (step === 'meaning-result') {
      // Move to example step
      setStep('example');
      setSelected(null);
      return;
    }

    if (step === 'example-result' && currentCard?.id) {
      // Both steps done — calculate SRS quality
      const quality = (meaningCorrect && exampleCorrect) ? 5 :
                      (meaningCorrect || exampleCorrect) ? 3 : 1;
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

      if (currentCard.repetitions === 0) {
        setNewWordsEncountered(n => n + 1);
      }

      setCombo(newCombo);
      setMaxCombo(Math.max(maxCombo, newCombo));
      setSessionXp(sessionXp + xp);
      setStudied(studied + 1);
      setStep('meaning');
      setSelected(null);
      setMeaningCorrect(false);
      setExampleCorrect(false);
      setCurrentIndex(currentIndex + 1);

      if (newCombo >= 10 && !isTokoton) setIsTokoton(true);
      if (!correct) setIsTokoton(false);
    }
  }, [step, currentCard, meaningCorrect, exampleCorrect, combo, maxCombo, sessionXp, studied, currentIndex, isTokoton]);

  const resetSession = () => {
    setPhase('study');
    setCurrentIndex(0);
    setStudied(0);
    setSessionXp(0);
    setCombo(0);
    setMaxCombo(0);
    setNewWordsEncountered(0);
    setIsTokoton(false);
    setStep('meaning');
    setSelected(null);
    setMeaningCorrect(false);
    setExampleCorrect(false);
    startTimeRef.current = Date.now();
  };

  // Tokoton End screen
  if (phase === 'tokoton-end') {
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 60000);
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
        <Button variant="outline" onClick={resetSession} className="mt-4">
          もう一度
        </Button>
      </div>
    );
  }

  // Session complete (non-tokoton)
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
        <Button onClick={resetSession}>もう一度</Button>
      </div>
    );
  }

  // Get current options based on step
  const options = (step === 'meaning' || step === 'meaning-result') ? meaningOptions : translationOptions;
  const correctAnswer = (step === 'meaning' || step === 'meaning-result')
    ? (currentCard?.meaning ?? '')
    : (EXAMPLE_TRANSLATIONS[currentCard?.word ?? '']?.correct ?? '');
  const isResultStep = step === 'meaning-result' || step === 'example-result';
  const isCorrectThisStep = step === 'meaning-result' ? meaningCorrect : exampleCorrect;

  // ─── トコトンモード UI ───
  if (isTokoton && !isResultStep) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center px-3">
        <div className="text-center mb-2">
          <span className="text-xs text-orange-400 font-mono">🔥 {combo}</span>
        </div>

        <div className="flex flex-col justify-center items-center text-center py-4">
          {step === 'meaning' ? (
            <h3 className="text-3xl font-bold mb-2">{currentCard?.word}</h3>
          ) : (
            <div className="mb-2">
              <p className="text-sm text-gray-300 italic px-4">{currentCard?.example}</p>
            </div>
          )}

          <p className="text-xs text-gray-500 mb-4">
            {step === 'meaning' ? '意味を選んでください' : '正しい和訳を選んでください'}
          </p>

          <div className="w-full max-w-sm space-y-2">
            {options.map((opt, i) => (
              <button
                key={`${currentIndex}-${step}-${i}`}
                onClick={() => handleSelect(i)}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-colors text-sm ${
                  selected === i
                    ? 'border-indigo-500 bg-indigo-500/10 text-white'
                    : 'border-gray-700 hover:border-gray-500 text-gray-300'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <Button
            onClick={handleConfirm}
            disabled={selected === null}
            className="mt-4 w-full max-w-sm"
          >
            決定
          </Button>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={() => setPhase('tokoton-end')}
            className="text-xs text-gray-400 hover:text-gray-600 underline decoration-dotted"
          >
            今日はここまで
          </button>
        </div>
      </div>
    );
  }

  // ─── 結果表示 (トコトンモード含む) ───
  if (isResultStep) {
    return (
      <div className="space-y-4 px-4">
        {/* Progress */}
        {!isTokoton && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-500">
              <span>{currentIndex + 1} / {totalCards}</span>
              {combo > 0 && <span className="text-orange-500 font-medium">🔥 {combo} combo</span>}
            </div>
            <Progress value={((currentIndex + 1) / totalCards) * 100} className="h-1.5" />
          </div>
        )}
        {isTokoton && (
          <div className="text-center">
            <span className="text-xs text-orange-400 font-mono">🔥 {combo}</span>
          </div>
        )}

        <Card className={`p-6 text-center ${isCorrectThisStep ? 'border-green-500/50' : 'border-red-500/50'}`}>
          {/* Result header */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${
            isCorrectThisStep
              ? 'bg-green-500/10 text-green-400'
              : 'bg-red-500/10 text-red-400'
          }`}>
            {isCorrectThisStep ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
            <span className="font-bold">{isCorrectThisStep ? '正解！' : '不正解'}</span>
          </div>

          {/* Word info */}
          <h3 className="text-2xl font-bold mb-1">{currentCard?.word}</h3>
          <p className="text-lg text-green-400 font-medium mb-2">{currentCard?.meaning}</p>

          {step === 'example-result' && (
            <p className="text-sm text-gray-400 italic mb-2">{currentCard?.example}</p>
          )}

          {/* Show what they selected if wrong */}
          {!isCorrectThisStep && selected !== null && (
            <p className="text-sm text-red-400 mt-2">
              選んだ回答: {options[selected]}
            </p>
          )}

          {/* Step indicator */}
          <div className="flex justify-center gap-2 mt-4">
            <div className={`w-2 h-2 rounded-full ${step === 'meaning-result' ? 'bg-white' : 'bg-gray-600'}`} />
            <div className={`w-2 h-2 rounded-full ${step === 'example-result' ? 'bg-white' : 'bg-gray-600'}`} />
          </div>
        </Card>

        <Button onClick={handleNext} className="w-full">
          {step === 'meaning-result' ? '例文クイズへ' : '次の問題'}
        </Button>
      </div>
    );
  }

  // ─── 通常モード: 4択クイズ UI ───
  return (
    <div className="space-y-4 px-4">
      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-gray-500">
          <span>{currentIndex + 1} / {totalCards}</span>
          {combo > 0 && <span className="text-orange-500 font-medium">🔥 {combo} combo</span>}
        </div>
        <Progress value={((currentIndex + 1) / totalCards) * 100} className="h-1.5" />
      </div>

      {/* Question */}
      <Card className="p-6 text-center">
        {step === 'meaning' ? (
          <>
            <p className="text-xs text-gray-400 mb-2">{currentCard?.category}</p>
            <h3 className="text-2xl font-bold mb-1">{currentCard?.word}</h3>
            <p className="text-sm text-gray-500 mt-3">この単語の意味は？</p>
          </>
        ) : (
          <>
            <p className="text-xs text-gray-400 mb-2">{currentCard?.word}（{currentCard?.meaning}）</p>
            <p className="text-base text-gray-700 dark:text-gray-300 italic mb-2">{currentCard?.example}</p>
            <p className="text-sm text-gray-500 mt-2">正しい和訳を選んでください</p>
          </>
        )}

        {/* Step indicator */}
        <div className="flex justify-center gap-2 mt-3">
          <div className={`w-2 h-2 rounded-full ${step === 'meaning' ? 'bg-white' : 'bg-gray-600'}`} />
          <div className={`w-2 h-2 rounded-full ${step === 'example' ? 'bg-white' : 'bg-gray-600'}`} />
        </div>
      </Card>

      {/* Options */}
      <div className="space-y-2">
        {options.map((opt, i) => (
          <button
            key={`${currentIndex}-${step}-${i}`}
            onClick={() => handleSelect(i)}
            className={`w-full text-left px-4 py-3 rounded-lg border transition-colors text-sm ${
              selected === i
                ? 'border-indigo-500 bg-indigo-500/10'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Confirm button */}
      <Button
        onClick={handleConfirm}
        disabled={selected === null}
        className="w-full"
      >
        決定
      </Button>

      {/* XP indicator */}
      {sessionXp > 0 && (
        <p className="text-center text-sm text-gray-500">
          +{sessionXp} XP
        </p>
      )}
    </div>
  );
}
