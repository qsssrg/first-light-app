'use client';

import { useState, useCallback, useRef, useMemo } from 'react';
import { useDueCards, useVocabCards } from '@/lib/hooks';
import { calculateNextReview } from '@/lib/srs';
import { calculateXp } from '@/lib/xp';
import { getAdaptiveCards, shuffle } from '@/lib/adaptive';
import { db } from '@/lib/db';
import { MEMBERS } from '@/lib/members';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Check, X, Sparkles } from 'lucide-react';
import { SpeakButton } from '@/components/common/SpeakButton';
import type { VocabCard } from '@/types';
import { EXAMPLE_TRANSLATIONS } from '@/lib/example-translations-data';
import { getPlayerName } from '@/lib/player-name';

type EncouragementLevel = 'great' | 'good' | 'struggle';

const ENCOURAGEMENT: Record<string, Record<EncouragementLevel, string[]>> = {
  kai: {
    great: [
      'すごいじゃん、{name}！ この調子なら…俺も負けてられないな。',
      '{name}、完璧だ。やっぱり見込んだ通りだったよ。',
      'さすがだな、{name}。メンバーにも報告しておくよ。',
    ],
    good: [
      'お疲れ、{name}。いい感じだ。この調子で続けていこう。',
      '{name}、着実に伸びてるよ。焦る必要はない。',
      '毎日少しずつ。{name}のペースでいい。俺たちはいつでもここにいる。',
    ],
    struggle: [
      '焦らなくていい、{name}。俺も最初は全然だったんだ。',
      '{name}、大丈夫。今日やったぶんは確実に力になってる。',
      '続けてるだけで{name}はすごいよ。一緒に頑張ろう。',
    ],
  },
  yuuki: {
    great: [
      '{name}〜！ すごすぎ！！ 天才かよ！',
      'やばい！ {name}、こんなにできるの！？ かっこいい！',
      '{name}さん完璧じゃん！ 今度俺にも教えてよ〜！',
    ],
    good: [
      '{name}、お疲れ〜！ 頑張ったね！ 明日もやろ！',
      'いいね{name}！ ちょっとずつ上手くなってるの分かるよ！',
      '{name}と一緒に勉強すると楽しいな〜！ また明日ね！',
    ],
    struggle: [
      '{name}〜、ドンマイドンマイ！ 俺なんかもっとひどかったよ！笑',
      '大丈夫！ {name}なら絶対できるようになるって！ 信じてる！',
      '{name}、やっただけ偉い！ 続けることが一番大事だから！',
    ],
  },
  ren: {
    great: [
      'ふっ…{name}、やるじゃん。ちょっと悔しいわ。',
      '{name}…お前、才能あるんじゃないか。マジで。',
      'いい音聴いた後みたいな爽快感だな。{name}、いい調子だ。',
    ],
    good: [
      '{name}、お疲れ。今日もちゃんとやったな。',
      '悪くない。{name}、このまま続けてくれ。',
      '地道にやってる{name}を見てると、俺もやる気出るんだよな。',
    ],
    struggle: [
      '{name}…まぁ、そういう日もある。気にすんな。',
      '俺も全然ダメな日あったよ。{name}、明日また来いよ。',
      '…{name}。帰る前にもう1問だけ、やってみないか？',
    ],
  },
  haruto: {
    great: [
      '{name}さん…すごいです。僕も見習わないと。',
      '言葉の意味を正確に捉えてる…{name}さん、本当に素敵です。',
      '{name}さんの成長、歌詞に書きたいくらいです。',
    ],
    good: [
      '{name}さん、今日もお疲れさまでした。着実に前に進んでますよ。',
      '一つひとつの単語に、{name}さんの努力が詰まってると思います。',
      '{name}さんと一緒に学べて…僕も頑張れます。',
    ],
    struggle: [
      '{name}さん、大丈夫です。僕も最初は何も分からなかった。',
      '言葉って不思議で…繰り返すうちに急に分かる瞬間が来るんです。{name}さんもきっと。',
      '{name}さん、今日来てくれたこと自体が、もう前進ですから。',
    ],
  },
  sora: {
    great: [
      '{name}さん…すごい正答率ですね。尊敬します。',
      '…{name}さんって、もしかして英語得意だったりします？',
      '{name}さんの集中力、見習いたいです。',
    ],
    good: [
      '{name}さん、お疲れさまです。今日も一歩前に進みましたね。',
      '…{name}さんと一緒に勉強できて、嬉しいです。',
      'コツコツ続ける{name}さん、かっこいいと思います。',
    ],
    struggle: [
      '{name}さん…僕も読解、最初は全然でした。大丈夫ですよ。',
      '間違えた問題って、実は一番覚えやすいんですよ。{name}さん、次は大丈夫です。',
      '{name}さん、無理しないでくださいね。明日もここで待ってます。',
    ],
  },
};

function getEncouragement(studied: number, correctRate: number): { member: typeof MEMBERS[0]; message: string } {
  const name = getPlayerName() || 'マネージャー';
  const level: EncouragementLevel = correctRate >= 0.8 ? 'great' : correctRate >= 0.5 ? 'good' : 'struggle';
  const memberKeys = Object.keys(ENCOURAGEMENT);
  const memberId = memberKeys[Math.floor(Math.random() * memberKeys.length)];
  const member = MEMBERS.find(m => m.id === memberId)!;
  const messages = ENCOURAGEMENT[memberId][level];
  const message = messages[Math.floor(Math.random() * messages.length)]
    .replace(/\{name\}/g, name);
  return { member, message };
}

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
    const correctRate = studied > 0 ? maxCombo / studied : 0;
    const encouragement = getEncouragement(studied, correctRate);

    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 space-y-6">
        <div className="w-full max-w-sm md:max-w-lg space-y-4">
          <p className="text-sm text-gray-500 text-center">今日の学習 ───</p>
          <div className="space-y-2 text-center">
            <p className="text-sm text-gray-700 dark:text-gray-300">{studied}問に取り組みました</p>
            {newWordsEncountered > 0 && (
              <p className="text-sm text-gray-700 dark:text-gray-300">新しく{newWordsEncountered}語に出会いました</p>
            )}
            <p className="text-sm text-gray-700 dark:text-gray-300">最大コンボ {maxCombo}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">{elapsed > 0 ? `${elapsed}分間` : '1分未満'}</p>
          </div>
          <Card className="p-4 mt-6">
            <div className="flex gap-3 items-start">
              <div className="shrink-0">
                <MemberAvatar member={encouragement.member} size="md" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">{encouragement.member.nameJa}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{encouragement.message}</p>
              </div>
            </div>
          </Card>
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
        {studied > 0 && (() => {
          const correctRate = studied > 0 ? maxCombo / studied : 0;
          const encouragement = getEncouragement(studied, correctRate);
          return (
            <div className="w-full max-w-sm md:max-w-lg space-y-4">
              <div className="text-center space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>{studied}問に取り組みました</p>
                {newWordsEncountered > 0 && <p>新しく{newWordsEncountered}語に出会いました</p>}
                <p>最大コンボ: {maxCombo}</p>
              </div>
              <Card className="p-4">
                <div className="flex gap-3 items-start">
                  <div className="shrink-0">
                    <MemberAvatar member={encouragement.member} size="md" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">{encouragement.member.nameJa}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{encouragement.message}</p>
                  </div>
                </div>
              </Card>
            </div>
          );
        })()}
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
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-3xl font-bold">{currentCard?.word}</h3>
              {currentCard?.word && <SpeakButton text={currentCard.word} />}
            </div>
          ) : (
            <div className="mb-2 flex items-center gap-2 px-4">
              <p className="text-sm text-gray-300 italic">{currentCard?.example}</p>
              {currentCard?.example && <SpeakButton text={currentCard.example} className="shrink-0" />}
            </div>
          )}

          <p className="text-xs text-gray-500 mb-4">
            {step === 'meaning' ? '意味を選んでください' : '正しい和訳を選んでください'}
          </p>

          <div className="w-full max-w-sm md:max-w-lg space-y-2">
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
          <div className="flex items-center justify-center gap-2 mb-1">
            <h3 className="text-2xl font-bold">{currentCard?.word}</h3>
            {currentCard?.word && <SpeakButton text={currentCard.word} />}
          </div>
          <p className="text-lg text-green-400 font-medium mb-2">{currentCard?.meaning}</p>

          {step === 'example-result' && (
            <div className="flex items-center justify-center gap-2 mb-2">
              <p className="text-sm text-gray-400 italic">{currentCard?.example}</p>
              {currentCard?.example && <SpeakButton text={currentCard.example} className="shrink-0" />}
            </div>
          )}

          {/* Show selected answer and correct answer */}
          {selected !== null && (
            <div className="mt-3 space-y-2 text-left">
              {!isCorrectThisStep && (
                <p className="text-sm text-red-400 flex items-start gap-2">
                  <X className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{options[selected]}</span>
                </p>
              )}
              <p className="text-sm text-green-400 flex items-start gap-2">
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{correctAnswer}</span>
              </p>
            </div>
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
            <div className="flex items-center justify-center gap-2 mb-1">
              <h3 className="text-2xl font-bold">{currentCard?.word}</h3>
              {currentCard?.word && <SpeakButton text={currentCard.word} />}
            </div>
            <p className="text-sm text-gray-500 mt-3">この単語の意味は？</p>
          </>
        ) : (
          <>
            <p className="text-xs text-gray-400 mb-2">{currentCard?.word}（{currentCard?.meaning}）</p>
            <div className="flex items-center justify-center gap-2 mb-2">
              <p className="text-base text-gray-700 dark:text-gray-300 italic">{currentCard?.example}</p>
              {currentCard?.example && <SpeakButton text={currentCard.example} className="shrink-0" />}
            </div>
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
