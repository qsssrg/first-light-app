'use client';

import { useState, useCallback, useRef, useMemo } from 'react';
import { useDueCards, useVocabCards } from '@/lib/hooks';
import { calculateNextReview } from '@/lib/srs';
import { calculateXp, getLevelFromXp } from '@/lib/xp';
import { getAdaptiveCards, shuffle } from '@/lib/adaptive';
import { db } from '@/lib/db';
import { MEMBERS } from '@/lib/members';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Check, X, Sparkles, Home, RotateCcw, Star } from 'lucide-react';
import Link from 'next/link';
import { SpeakButton } from '@/components/common/SpeakButton';
import { ComboFlash, XpFloat, TokotonActivation } from '@/components/common/GameEffects';
import type { VocabCard } from '@/types';
import { EXAMPLE_TRANSLATIONS } from '@/lib/example-translations-data';
import { EXAMPLE_VARIANTS } from '@/lib/example-variants-data';
import { getPlayerName } from '@/lib/player-name';
import { getStudyGoal } from '@/lib/study-goals';
import { shouldExcludeWord } from '@/lib/vocab-source';
import { useProfile } from '@/lib/hooks';
import { ENGLISH_DEFINITIONS } from '@/lib/english-definitions-data';
import { addNewVocabCards } from '@/lib/vocab-add';
import { addAffinityPoints } from '@/lib/affinity';
import { AFFINITY_LABELS } from '@/lib/db';
import { getMember } from '@/lib/members';

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

type QuizStep = 'meaning' | 'meaning-result' | 'example' | 'example-result'
  | 'def-to-word' | 'def-to-word-result' | 'word-to-def' | 'word-to-def-result' | 'cloze' | 'cloze-result';
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

/** Pick a random example variant (or fall back to default) */
function pickExampleVariant(word: string): { example: string; correct: string; wrong: string[] } | null {
  const variants = EXAMPLE_VARIANTS[word];
  if (variants && variants.length > 0) {
    return variants[Math.floor(Math.random() * variants.length)];
  }
  const entry = EXAMPLE_TRANSLATIONS[word];
  if (entry) {
    return { example: '', correct: entry.correct, wrong: [...entry.wrong] };
  }
  return null;
}

/** Generate translation options for example sentence quiz */
function generateTranslationOptions(
  correctCard: VocabCard,
): { options: string[]; correctAnswer: string; exampleOverride?: string } {
  const variant = pickExampleVariant(correctCard.word);
  if (!variant) {
    return {
      options: shuffle([
        correctCard.meaning + 'に関する例文。',
        correctCard.meaning + 'とは異なる意味。',
        correctCard.meaning + 'の反対の意味。',
        correctCard.meaning + 'を含む別の文。',
      ]),
      correctAnswer: correctCard.meaning + 'に関する例文。',
    };
  }
  return {
    options: shuffle([variant.correct, ...variant.wrong.slice(0, 3)]),
    correctAnswer: variant.correct,
    exampleOverride: variant.example || undefined,
  };
}

/** English Speaker Mode: Definition → Word (4 choices) */
function generateDefToWordOptions(correctCard: VocabCard, allCards: VocabCard[]): string[] {
  const correct = correctCard.word;
  const others = allCards.filter(c => c.word !== correct);
  const sameCategory = others.filter(c => c.category === correctCard.category);
  const pool = sameCategory.length >= 3 ? sameCategory : others;
  const distractors = shuffle(pool).slice(0, 3).map(c => c.word);
  return shuffle([correct, ...distractors]);
}

/** English Speaker Mode: Word → Definition (4 choices) */
function generateWordToDefOptions(correctCard: VocabCard, allCards: VocabCard[]): { options: string[]; correctDef: string } {
  const correctDef = ENGLISH_DEFINITIONS[correctCard.word]?.definition ?? correctCard.meaning;
  const others = allCards.filter(c => c.word !== correctCard.word && ENGLISH_DEFINITIONS[c.word]);
  const pool = shuffle(others).slice(0, 3).map(c => ENGLISH_DEFINITIONS[c.word].definition);
  return { options: shuffle([correctDef, ...pool]), correctDef };
}

/** English Speaker Mode: Cloze (fill in the blank) */
function generateClozeOptions(correctCard: VocabCard, allCards: VocabCard[]): { sentence: string; options: string[] } {
  const sentence = correctCard.example.replace(new RegExp(`\\b${correctCard.word}\\b`, 'gi'), '______');
  const others = allCards.filter(c => c.word !== correctCard.word);
  const distractors = shuffle(others).slice(0, 3).map(c => c.word);
  return { sentence, options: shuffle([correctCard.word, ...distractors]) };
}

function NoCardsPrompt({ onAdded }: { onAdded: () => void }) {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(0);
  const [member] = useState(() => MEMBERS[Math.floor(Math.random() * MEMBERS.length)]);
  const name = getPlayerName() || 'マネージャー';

  const handleAdd = async () => {
    setLoading(true);
    const count = await addNewVocabCards(15);
    setAdded(count);
    setLoading(false);
    if (count > 0) {
      // Brief success message then immediately start quiz
      setTimeout(() => window.location.reload(), 800);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-6 px-4">
      <Card className="p-5 w-full max-w-sm md:max-w-lg">
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <MemberAvatar member={member} size="lg" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 mb-1">{member.nameJa}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {name}、学習する単語は全部やったね！ もっと単語勉強しちゃう？
            </p>
          </div>
        </div>
      </Card>

      {added > 0 ? (
        <p className="text-sm text-green-500 font-medium">{added}語の新しい単語を追加しました！</p>
      ) : (
        <div className="flex gap-3">
          <Button onClick={handleAdd} disabled={loading}>
            {loading ? '追加中…' : '新しい単語を追加する'}
          </Button>
          <Link href="/">
            <Button variant="outline">
              <Home className="w-4 h-4 mr-1" /> ホームに戻る
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export function VocabStudy() {
  const rawDueCards = useDueCards();
  const rawAllCards = useVocabCards();
  const profile = useProfile();
  const isEnglishMode = profile?.settings?.englishSpeakerMode ?? false;

  // Filter out excluded exam categories
  const goal = getStudyGoal();
  const eikenNone = goal.eiken === 'none';
  const toeflNone = goal.toeflTarget === 'none';

  const allCards = useMemo(() =>
    (eikenNone || toeflNone) ? rawAllCards.filter(c => !shouldExcludeWord(c.word, eikenNone, toeflNone)) : rawAllCards,
    [rawAllCards, eikenNone, toeflNone]
  );
  const filteredDue = useMemo(() =>
    (eikenNone || toeflNone) ? rawDueCards.filter(c => !shouldExcludeWord(c.word, eikenNone, toeflNone)) : rawDueCards,
    [rawDueCards, eikenNone, toeflNone]
  );
  const dueCards = useMemo(() => getAdaptiveCards(filteredDue, filteredDue.length), [filteredDue]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const initialStep: QuizStep = isEnglishMode ? 'def-to-word' : 'meaning';
  const [step, setStep] = useState<QuizStep>(initialStep);
  const [selected, setSelected] = useState<number | null>(null);
  const [meaningCorrect, setMeaningCorrect] = useState(false);
  const [exampleCorrect, setExampleCorrect] = useState(false);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [sessionXp, setSessionXp] = useState(0);
  const [studied, setStudied] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [newWordsEncountered, setNewWordsEncountered] = useState(0);
  const [isTokoton, setIsTokoton] = useState(false);
  const [tokotonJustActivated, setTokotonJustActivated] = useState(false);
  const [phase, setPhase] = useState<SessionPhase>('study');
  const [lastXp, setLastXp] = useState(0);
  const [xpTrigger, setXpTrigger] = useState(0);
  const [affinityLevelUp, setAffinityLevelUp] = useState<{ memberId: string; level: number } | null>(null);
  const [levelUpDisplay, setLevelUpDisplay] = useState<number | null>(null);
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

  const translationResult = useMemo(() => {
    const card = getCardForOptions();
    if (!card) return { options: [] as string[], correctAnswer: '', exampleOverride: undefined as string | undefined };
    return generateTranslationOptions(card);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, allCards, dueCards, isTokoton]);

  // English Speaker Mode options
  const engDefToWord = useMemo(() => {
    const card = getCardForOptions();
    if (!card || !isEnglishMode) return [] as string[];
    return generateDefToWordOptions(card, allCards);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, allCards, dueCards, isTokoton, isEnglishMode]);

  const engWordToDef = useMemo(() => {
    const card = getCardForOptions();
    if (!card || !isEnglishMode) return { options: [] as string[], correctDef: '' };
    return generateWordToDefOptions(card, allCards);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, allCards, dueCards, isTokoton, isEnglishMode]);

  const engCloze = useMemo(() => {
    const card = getCardForOptions();
    if (!card || !isEnglishMode) return { sentence: '', options: [] as string[] };
    return generateClozeOptions(card, allCards);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, allCards, dueCards, isTokoton, isEnglishMode]);

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
    if (step.endsWith('-result')) return;
    setSelected(index);
  }, [step]);

  const handleConfirm = useCallback(() => {
    if (selected === null) return;

    if (step === 'meaning') {
      const correct = meaningOptions[selected] === currentCard?.meaning;
      setMeaningCorrect(correct);
      setStep('meaning-result');
    } else if (step === 'example') {
      const correct = translationResult.options[selected] === translationResult.correctAnswer;
      setExampleCorrect(correct);
      setStep('example-result');
    } else if (step === 'def-to-word') {
      const correct = engDefToWord[selected] === currentCard?.word;
      setMeaningCorrect(correct);
      setStep('def-to-word-result');
    } else if (step === 'word-to-def') {
      const correct = engWordToDef.options[selected] === engWordToDef.correctDef;
      setExampleCorrect(correct);
      setStep('word-to-def-result');
    } else if (step === 'cloze') {
      const correct = engCloze.options[selected] === currentCard?.word;
      setExampleCorrect(correct);
      setStep('cloze-result');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, step, meaningOptions, translationResult, currentCard, engDefToWord, engWordToDef, engCloze]);

  const handleNext = useCallback(async () => {
    if (step === 'meaning-result') {
      setStep('example');
      setSelected(null);
      return;
    }

    if (step === 'def-to-word-result') {
      setStep('word-to-def');
      setSelected(null);
      return;
    }

    if (step === 'word-to-def-result') {
      setStep('cloze');
      setSelected(null);
      return;
    }

    if ((step === 'example-result' || step === 'cloze-result') && currentCard?.id) {
      // Both steps done — calculate SRS quality
      const bothCorrect = meaningCorrect && exampleCorrect;
      const quality = bothCorrect ? 5 :
                      (meaningCorrect || exampleCorrect) ? 3 : 1;
      const correct = quality >= 3;
      // Combo only increments when BOTH steps are correct
      const newCombo = bothCorrect ? combo + 1 : 0;
      const xp = bothCorrect ? calculateXp(true, newCombo) : (correct ? 1 : 0);
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
          const newTotalXp = profile.totalXp + xp;
          const oldLevel = getLevelFromXp(profile.totalXp);
          const newLevel = getLevelFromXp(newTotalXp);
          await db.userProfile.update(profile.id, {
            xp: profile.xp + xp,
            totalXp: newTotalXp,
            level: newLevel,
          });
          if (newLevel > oldLevel) {
            setLevelUpDisplay(newLevel);
            setTimeout(() => setLevelUpDisplay(null), 3000);
          }
        }
        // Record study session for XP history
        await db.studySessions.add({
          date: new Date(),
          axis: 'vocabulary',
          correctCount: correct ? 1 : 0,
          totalCount: 1,
          xpEarned: xp,
          comboMax: newCombo,
          duration: 0,
        } as any);

        // Add affinity points to Haruto (vocabulary)
        const aff = await addAffinityPoints('vocabulary', 5);
        if (aff.leveled) {
          setAffinityLevelUp({ memberId: aff.memberId, level: aff.newLevel });
          setTimeout(() => setAffinityLevelUp(null), 3000);
        }
      }

      if (currentCard.repetitions === 0) {
        setNewWordsEncountered(n => n + 1);
      }

      setCombo(newCombo);
      setMaxCombo(Math.max(maxCombo, newCombo));
      setSessionXp(sessionXp + xp);
      setStudied(studied + 1);
      if (bothCorrect) setSessionCorrect(prev => prev + 1);
      setStep(isEnglishMode ? 'def-to-word' : 'meaning');
      setSelected(null);
      setMeaningCorrect(false);
      setExampleCorrect(false);
      setCurrentIndex(currentIndex + 1);

      // Game effects triggers
      if (xp > 0) {
        setLastXp(xp);
        setXpTrigger(prev => prev + 1);
      }

      if (newCombo >= 10 && !isTokoton) {
        setIsTokoton(true);
        setTokotonJustActivated(true);
        setTimeout(() => setTokotonJustActivated(false), 2500);
      }
      if (!correct) setIsTokoton(false);
    }
  }, [step, currentCard, meaningCorrect, exampleCorrect, combo, maxCombo, sessionXp, studied, currentIndex, isTokoton]);

  const resetSession = () => {
    setPhase('study');
    setCurrentIndex(0);
    setStudied(0);
    setSessionCorrect(0);
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

  // ─── 完了画面（ゲーム風・共通） ───
  const renderCompletionScreen = (isNoCards = false) => {
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 60000);
    const correctRate = studied > 0 ? sessionCorrect / studied : 0;
    const rank = correctRate >= 0.9 ? 'S' : correctRate >= 0.7 ? 'A' : correctRate >= 0.5 ? 'B' : 'C';
    const rankColors: Record<string, string> = {
      S: 'from-yellow-400 via-amber-300 to-yellow-500 text-yellow-900',
      A: 'from-indigo-400 via-purple-400 to-fuchsia-400 text-white',
      B: 'from-emerald-400 via-green-400 to-teal-400 text-white',
      C: 'from-gray-400 via-gray-300 to-gray-400 text-gray-800',
    };
    const encouragement = studied > 0 ? getEncouragement(studied, correctRate) : null;

    return (
      <div className="min-h-[85vh] flex flex-col px-4 py-6">
        {/* Header */}
        <p className="text-center text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase mb-6">
          Session Complete
        </p>

        {isNoCards && studied === 0 ? (
          <NoCardsPrompt onAdded={resetSession} />
        ) : (
          <div className="flex-1 space-y-5">
            {/* Rank badge with explanation */}
            {studied > 0 && (
              <div className="flex flex-col items-center gap-2">
                <p className="text-[10px] text-gray-500 tracking-wider uppercase">ランク</p>
                <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${rankColors[rank]} flex items-center justify-center shadow-2xl`}>
                  <span className="text-5xl font-black">{rank}</span>
                </div>
                <p className="text-xs text-gray-500">
                  {rank === 'S' ? '正答率95%+' : rank === 'A' ? '正答率70%+' : rank === 'B' ? '正答率50%+' : '正答率50%未満'}
                </p>
              </div>
            )}

            {/* XP gauge animation */}
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
                <p className="text-2xl font-black text-indigo-400">{studied}</p>
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

            {newWordsEncountered > 0 && (
              <div className="text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-medium">
                  <Star className="w-3 h-3" /> 新しく{newWordsEncountered}語に出会いました
                </span>
              </div>
            )}

            {/* Member encouragement */}
            {encouragement && (
              <div className="rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex gap-3 items-start">
                  <div className="shrink-0">
                    <MemberAvatar member={encouragement.member} size="md" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{encouragement.member.nameJa}</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{encouragement.message}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

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
            <Link href="/vocabulary" className="flex-1">
              <button className="w-full py-3 rounded-xl text-sm font-medium border-2 border-blue-700/50 text-blue-300 hover:border-blue-500 hover:bg-blue-800/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                <Star className="w-4 h-4" /> 単語帳へ
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  // Tokoton End screen
  if (phase === 'tokoton-end') {
    return renderCompletionScreen();
  }

  // Session complete (non-tokoton)
  if (!isTokoton && (!currentCard || currentIndex >= totalCards)) {
    return renderCompletionScreen(totalCards === 0);
  }

  // Get current options based on step
  const options = (() => {
    if (step === 'meaning' || step === 'meaning-result') return meaningOptions;
    if (step === 'example' || step === 'example-result') return translationResult.options;
    if (step === 'def-to-word' || step === 'def-to-word-result') return engDefToWord;
    if (step === 'word-to-def' || step === 'word-to-def-result') return engWordToDef.options;
    if (step === 'cloze' || step === 'cloze-result') return engCloze.options;
    return [];
  })();
  const correctAnswer = (() => {
    if (step === 'meaning' || step === 'meaning-result') return currentCard?.meaning ?? '';
    if (step === 'example' || step === 'example-result') return translationResult.correctAnswer;
    if (step === 'def-to-word' || step === 'def-to-word-result') return currentCard?.word ?? '';
    if (step === 'word-to-def' || step === 'word-to-def-result') return engWordToDef.correctDef;
    if (step === 'cloze' || step === 'cloze-result') return currentCard?.word ?? '';
    return '';
  })();
  const displayExample = translationResult.exampleOverride || currentCard?.example || '';
  const isResultStep = step.endsWith('-result');
  const isCorrectThisStep = (step === 'meaning-result' || step === 'def-to-word-result') ? meaningCorrect : exampleCorrect;

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
              <p className="text-sm text-gray-800 dark:text-gray-100 italic font-medium">{displayExample}</p>
              {displayExample && <SpeakButton text={displayExample} className="shrink-0" />}
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
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
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

  // ─── 結果表示 (ゲーム風) ───
  if (isResultStep) {
    return (
      <div className="min-h-[85vh] flex flex-col px-4 py-3">
        {/* Progress */}
        {!isTokoton && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold tracking-wider text-gray-400">RESULT</span>
              <div className="flex items-center gap-3">
                {combo > 0 && <span className="text-xs font-black text-orange-400">🔥 {combo}</span>}
                <span className="text-xs font-medium text-gray-400">{currentIndex + 1} / {totalCards}</span>
              </div>
            </div>
            <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 transition-all duration-500" style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }} />
            </div>
          </div>
        )}
        {isTokoton && (
          <div className="text-center mb-4">
            <span className="text-sm font-black text-orange-400">🔥 {combo}</span>
          </div>
        )}

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

          {/* Word info */}
          <div className="flex items-center justify-center gap-2 mb-1">
            <h3 className="text-2xl font-black tracking-tight">{currentCard?.word}</h3>
            {currentCard?.word && <SpeakButton text={currentCard.word} />}
          </div>
          <p className="text-base text-indigo-300 font-medium mb-3">{currentCard?.meaning}</p>

          {(step === 'example-result' || step === 'cloze-result' || step === 'word-to-def-result') && (
            <div className="flex items-center justify-center gap-2 mb-3 px-2">
              <p className="text-sm text-gray-800 dark:text-gray-100 italic font-medium">{displayExample}</p>
              {displayExample && <SpeakButton text={displayExample} className="shrink-0" />}
            </div>
          )}

          {/* Selected vs correct */}
          {selected !== null && (
            <div className="mt-3 space-y-2 text-left px-2">
              {!isCorrectThisStep && (
                <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-red-500/10">
                  <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-red-300">{options[selected]}</span>
                </div>
              )}
              <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-emerald-500/10">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm text-emerald-300">{correctAnswer}</span>
              </div>
            </div>
          )}
        </div>

        {/* Next button */}
        <div className="mt-auto pt-4 pb-2">
          <button
            onClick={handleNext}
            className="w-full py-3.5 rounded-xl text-sm font-bold tracking-wide bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl active:scale-[0.98] transition-all"
          >
            {step === 'meaning-result' ? '例文クイズへ →'
              : step === 'def-to-word-result' ? 'Definition Quiz →'
              : step === 'word-to-def-result' ? 'Cloze Quiz →'
              : '次の問題 →'}
          </button>
        </div>
      </div>
    );
  }

  // ─── 通常モード: 4択クイズ UI（ゲーム風） ───
  const stepLabels: Record<string, string> = {
    meaning: 'STEP 1',
    example: 'STEP 2',
    'def-to-word': 'STEP 1',
    'word-to-def': 'STEP 2',
    cloze: 'STEP 3',
  };

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
          <span className="text-xs font-bold tracking-wider text-indigo-400">{stepLabels[step] ?? ''}</span>
          <div className="flex items-center gap-3">
            {combo > 0 && (
              <span className="text-xs font-black text-orange-400 animate-pulse">🔥 {combo}</span>
            )}
            <span className="text-xs font-medium text-gray-400">{currentIndex + 1} / {totalCards}</span>
          </div>
        </div>
        <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
          />
        </div>
      </div>

      {/* Question card — glassmorphism */}
      <div className="rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/10 p-6 text-center shadow-xl mb-4">
        {step === 'def-to-word' ? (
          <>
            <p className="text-[10px] font-bold tracking-widest text-purple-400 uppercase mb-3">Definition → Word</p>
            <p className="text-base leading-relaxed text-gray-800 dark:text-gray-100 italic font-medium px-2">
              {ENGLISH_DEFINITIONS[currentCard?.word ?? '']?.definition ?? currentCard?.meaning}
            </p>
            <p className="text-xs text-gray-500 mt-4">Which word matches this definition?</p>
          </>
        ) : step === 'word-to-def' ? (
          <>
            <p className="text-[10px] font-bold tracking-widest text-purple-400 uppercase mb-3">Word → Definition</p>
            <div className="flex items-center justify-center gap-2 mb-1">
              <h3 className="text-3xl font-black tracking-tight">{currentCard?.word}</h3>
              {currentCard?.word && <SpeakButton text={currentCard.word} />}
            </div>
            <p className="text-xs text-gray-500 mt-3">Choose the correct definition.</p>
          </>
        ) : step === 'cloze' ? (
          <>
            <p className="text-[10px] font-bold tracking-widest text-purple-400 uppercase mb-3">Fill in the blank</p>
            <p className="text-base leading-relaxed text-gray-800 dark:text-gray-100 italic font-medium px-2">{engCloze.sentence}</p>
            <p className="text-xs text-gray-500 mt-4">Which word completes the sentence?</p>
          </>
        ) : step === 'meaning' ? (
          <>
            <p className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase mb-3">{currentCard?.category}</p>
            <div className="flex items-center justify-center gap-2">
              <h3 className="text-3xl font-black tracking-tight">{currentCard?.word}</h3>
              {currentCard?.word && <SpeakButton text={currentCard.word} />}
            </div>
            <p className="text-xs text-gray-500 mt-4">この単語の意味は？</p>
          </>
        ) : (
          <>
            <p className="text-xs text-gray-400 mb-2">{currentCard?.word}（{currentCard?.meaning}）</p>
            <div className="flex items-center justify-center gap-2 mb-2 px-2">
              <p className="text-base leading-relaxed text-gray-800 dark:text-gray-100 italic font-medium">{displayExample}</p>
              {displayExample && <SpeakButton text={displayExample} className="shrink-0" />}
            </div>
            <p className="text-xs text-gray-500 mt-3">正しい和訳を選んでください</p>
          </>
        )}

        {/* Step dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {(isEnglishMode ? ['def-to-word', 'word-to-def', 'cloze'] : ['meaning', 'example']).map((s, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${step === s ? 'bg-indigo-400' : 'bg-gray-700'}`} />
          ))}
        </div>
      </div>

      {/* Options — game-style buttons */}
      <div className="space-y-2.5 flex-1">
        {options.map((opt, i) => (
          <button
            key={`${currentIndex}-${step}-${i}`}
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
          決定
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
