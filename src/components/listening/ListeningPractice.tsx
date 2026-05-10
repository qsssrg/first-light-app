'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useProfile } from '@/lib/hooks';
import { LISTENING_QUESTIONS, DICTATION_EXERCISES, type ListeningQuestion } from '@/lib/listening-data';
import { MEMBERS } from '@/lib/members';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, Volume2, Check, X, Headphones, Home, RotateCcw, Star } from 'lucide-react';
import { SpeakButton } from '@/components/common/SpeakButton';
import { calculateXp, getLevelFromXp } from '@/lib/xp';
import { db } from '@/lib/db';
import { ComboFlash, XpFloat } from '@/components/common/GameEffects';
import { TypewriterText } from '@/components/common/TypewriterText';
import { getPlayerName } from '@/lib/player-name';
import Link from 'next/link';

type Mode = 'select' | 'quiz' | 'quiz-result' | 'dictation' | 'result';
type Speed = 0.8 | 1.0 | 1.2;

type EncouragementLevel = 'great' | 'good' | 'struggle';

const LISTENING_ENCOURAGEMENT: Record<string, Record<EncouragementLevel, string[]>> = {
  kai: {
    great: [
      'すごいじゃん、{name}！ リスニング完璧だ。',
      '{name}、聞き取り力バッチリだな。この調子で行こう。',
    ],
    good: [
      'お疲れ、{name}。いい感じだ。耳が慣れてきてるよ。',
      '{name}、着実に聞き取れるようになってる。この調子で。',
    ],
    struggle: [
      '焦らなくていい、{name}。リスニングは慣れだから。',
      '{name}、大丈夫。毎日聞いてれば必ず聞こえるようになる。',
    ],
  },
  ren: {
    great: [
      'ふっ…{name}、耳いいな。ちょっと悔しいわ。',
      '{name}…リスニング得意なんだな。やるじゃん。',
    ],
    good: [
      '{name}、お疲れ。今日もちゃんと聞けてたよ。',
      '悪くない。{name}、この調子で続けてくれ。',
    ],
    struggle: [
      '{name}…まぁ、そういう日もある。気にすんな。',
      '俺も最初は全然聞き取れなかったよ。{name}、明日また来いよ。',
    ],
  },
  yuuki: {
    great: [
      '{name}〜！ リスニングすごすぎ！！',
      'やばい！ {name}、耳良すぎない！？',
    ],
    good: [
      '{name}、お疲れ〜！ 頑張ったね！',
      'いいね{name}！ どんどん聞き取れるようになってるよ！',
    ],
    struggle: [
      '{name}〜、ドンマイ！ 俺なんかもっとひどかったよ！笑',
      '大丈夫！ {name}なら絶対聞き取れるようになるって！',
    ],
  },
  haruto: {
    great: [
      '{name}さん…すごいです。リスニング力、尊敬します。',
      '音の一つひとつを正確に捉えてる…{name}さん、素敵です。',
    ],
    good: [
      '{name}さん、今日もお疲れさまでした。確実に耳が育ってます。',
      '{name}さんの努力、ちゃんと実を結んでると思います。',
    ],
    struggle: [
      '{name}さん、大丈夫です。音って繰り返すうちに急に聞こえる瞬間が来るんです。',
      '{name}さん、今日聞いた分だけ、確実に前に進んでますから。',
    ],
  },
  sora: {
    great: [
      '{name}さん…すごい正答率ですね。リスニング力、尊敬します。',
      '…{name}さんの集中力、見習いたいです。',
    ],
    good: [
      '{name}さん、お疲れさまです。今日も一歩前に進みましたね。',
      'コツコツ続ける{name}さん、かっこいいと思います。',
    ],
    struggle: [
      '{name}さん…僕もリスニング、最初は全然でした。大丈夫ですよ。',
      '{name}さん、無理しないでくださいね。明日もここで待ってます。',
    ],
  },
};

function getListeningEncouragement(correctRate: number): { member: typeof MEMBERS[0]; message: string } {
  const name = getPlayerName() || 'マネージャー';
  const level: EncouragementLevel = correctRate >= 0.8 ? 'great' : correctRate >= 0.5 ? 'good' : 'struggle';
  const memberKeys = Object.keys(LISTENING_ENCOURAGEMENT);
  const memberId = memberKeys[Math.floor(Math.random() * memberKeys.length)];
  const member = MEMBERS.find(m => m.id === memberId)!;
  const messages = LISTENING_ENCOURAGEMENT[memberId][level];
  const message = messages[Math.floor(Math.random() * messages.length)]
    .replace(/\{name\}/g, name);
  return { member, message };
}

// Ren member data for explanation speech card
const REN_MEMBER = MEMBERS.find(m => m.id === 'ren')!;

export function ListeningPractice() {
  const profile = useProfile();
  const en = profile?.settings?.englishSpeakerMode ?? false;
  const [mode, setMode] = useState<Mode>('select');
  const [filter, setFilter] = useState<'all' | 'eiken2' | 'eiken_pre1' | 'toefl'>('all');
  const [questions, setQuestions] = useState<ListeningQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState<Speed>(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // XP & Combo
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [sessionXp, setSessionXp] = useState(0);
  const [xpTrigger, setXpTrigger] = useState(0);
  const [lastXp, setLastXp] = useState(0);
  const startTimeRef = useRef(Date.now());

  // Pre-cache voices to ensure they are available on first playback
  const voicesRef = useRef<{ female: SpeechSynthesisVoice | null; male: SpeechSynthesisVoice | null }>({ female: null, male: null });
  const [voicesReady, setVoicesReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices().filter(v => v.lang.startsWith('en'));
      const femaleVoice = voices.find(v => v.name.toLowerCase().includes('female') || v.name.includes('Samantha') || v.name.includes('Karen') || v.name.includes('Victoria')) || null;
      const maleVoice = voices.find(v => v.name.toLowerCase().includes('male') || v.name.includes('Daniel') || v.name.includes('Alex') || v.name.includes('Fred')) || null;
      voicesRef.current = { female: femaleVoice, male: maleVoice };
      if (voices.length > 0) setVoicesReady(true);
    };

    // Try immediately (some browsers have voices ready synchronously)
    loadVoices();

    // Also listen for async voice loading
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Dictation state
  const [dictIndex, setDictIndex] = useState(0);
  const [dictInput, setDictInput] = useState('');
  const [dictRevealed, setDictRevealed] = useState(false);

  const startQuiz = () => {
    const filtered = filter === 'all'
      ? LISTENING_QUESTIONS
      : LISTENING_QUESTIONS.filter(q => q.level === filter);
    setQuestions(filtered);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setAnswered(null);
    setCombo(0);
    setSessionXp(0);
    setMode('quiz');
  };

  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    // Use pre-cached voices for immediate availability on first play
    const femaleVoice = voicesRef.current.female;
    const maleVoice = voicesRef.current.male;

    // Split by speaker labels — Woman before Man to avoid substring match
    const parts = text.split(/((?:Woman|Man|Professor|Speaker \d):\s*)/i).filter(Boolean);

    let currentGender: 'male' | 'female' = 'male';
    const utterances: SpeechSynthesisUtterance[] = [];

    for (const part of parts) {
      if (/^woman:/i.test(part) || /^speaker 2:/i.test(part)) { currentGender = 'female'; continue; }
      if (/^(man|professor):/i.test(part) || /^speaker 1:/i.test(part)) { currentGender = 'male'; continue; }
      if (!part.trim()) continue;

      const utt = new SpeechSynthesisUtterance(part.trim());
      utt.lang = 'en-US';
      utt.rate = speed;
      if (currentGender === 'female' && femaleVoice) utt.voice = femaleVoice;
      else if (currentGender === 'male' && maleVoice) utt.voice = maleVoice;
      utterances.push(utt);
    }

    if (utterances.length === 0) {
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = 'en-US';
      utt.rate = speed;
      utterances.push(utt);
    }

    setIsPlaying(true);
    utterances.forEach((utt, i) => {
      if (i === utterances.length - 1) {
        utt.onend = () => setIsPlaying(false);
        utt.onerror = () => setIsPlaying(false);
      }
      window.speechSynthesis.speak(utt);
    });
    utteranceRef.current = utterances[utterances.length - 1];
  }, [speed]);

  const stopSpeech = () => {
    if (typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  const handleSelect = (index: number) => {
    if (answered !== null) return;
    setSelected(index);
  };

  const handleConfirm = async () => {
    if (selected === null || answered !== null) return;
    setAnswered(selected);
    const isCorrect = selected === questions[current].correctIndex;
    if (isCorrect) setScore(s => s + 1);

    // XP & Combo
    const newCombo = isCorrect ? combo + 1 : 0;
    const xp = isCorrect ? calculateXp(true, newCombo) : 0;
    setCombo(newCombo);
    setMaxCombo(prev => Math.max(prev, newCombo));

    if (xp > 0) {
      setSessionXp(prev => prev + xp);
      setLastXp(xp);
      setXpTrigger(prev => prev + 1);
      try {
        const profile = await db.userProfile.toCollection().first();
        if (profile?.id) {
          const newTotalXp = profile.totalXp + xp;
          const newLevel = getLevelFromXp(newTotalXp);
          await db.userProfile.update(profile.id, {
            xp: profile.xp + xp,
            totalXp: newTotalXp,
            level: newLevel,
          });
        }
        // Record study session for XP history
        await db.studySessions.add({
          date: new Date(),
          axis: 'listening',
          correctCount: isCorrect ? 1 : 0,
          totalCount: 1,
          xpEarned: xp,
          comboMax: newCombo,
          duration: 0,
        } as any);
      } catch {}
    }

    setMode('quiz-result');
  };

  const nextQuestion = () => {
    if (current + 1 >= questions.length) {
      setMode('result');
      // Update streak on study completion
      import('@/lib/streak').then(({ onStudyComplete }) => onStudyComplete());
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(null);
      setMode('quiz');
      stopSpeech();
    }
  };

  // Select mode
  if (mode === 'select') {
    return (
      <div className="space-y-4 px-4">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-sky-600 via-blue-500 to-indigo-400 p-5 text-white shadow-lg mb-2">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
        <div className="relative">
          <h2 className="text-xl font-black tracking-wide">{en ? 'Listening Study' : 'リスニング学習'}</h2>
          <p className="text-xs opacity-60 mt-0.5">Listening</p>
        </div>
      </div>
        <p className="text-xs text-gray-500">{en ? 'English audio via Web Speech API. Headphones recommended.' : 'Web Speech APIで英語音声を再生します。イヤホン推奨。'}</p>

        {/* Level filter */}
        <div className="flex gap-1.5">
          {([['all', 'すべて'], ['eiken2', '2級'], ['eiken_pre1', '準1級'], ['toefl', 'TOEFL']] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1.5 rounded-full text-xs ${filter === key ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}
            >
              {label}
            </button>
          ))}
        </div>

        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{en ? 'Choose Mode' : '学習モードを選択'}</p>
        <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow border-blue-200 dark:border-blue-800" onClick={startQuiz}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Headphones className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">{en ? '4-Choice Quiz' : '4択クイズ'}</p>
              <p className="text-xs text-gray-500">{en ? 'Listen and choose the correct answer' : '聞いて正しい答えを選ぶ'}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow border-indigo-200 dark:border-indigo-800" onClick={() => { setMode('dictation'); setDictIndex(0); setDictInput(''); setDictRevealed(false); }}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-100 dark:bg-indigo-900 rounded-full">
              <Volume2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">{en ? 'Dictation' : 'ディクテーション'}</p>
              <p className="text-xs text-gray-500">{en ? 'Listen and write what you hear' : '聞いて書き取る'}</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Final result
  if (mode === 'result') {
    const correctRate = questions.length > 0 ? score / questions.length : 0;
    const rank = correctRate >= 0.9 ? 'S' : correctRate >= 0.7 ? 'A' : correctRate >= 0.5 ? 'B' : 'C';
    const rankColors: Record<string, string> = {
      S: 'from-yellow-400 via-amber-300 to-yellow-500 text-yellow-900',
      A: 'from-indigo-400 via-purple-400 to-fuchsia-400 text-white',
      B: 'from-emerald-400 via-green-400 to-teal-400 text-white',
      C: 'from-gray-400 via-gray-300 to-gray-400 text-gray-800',
    };
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 60000);
    const encouragement = questions.length > 0 ? getListeningEncouragement(correctRate) : null;

    return (
      <div className="min-h-[85vh] flex flex-col px-4 py-6">
        {/* Header */}
        <p className="text-center text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase mb-6">
          Session Complete
        </p>

        <div className="flex-1 space-y-5">
          {/* Rank badge */}
          {questions.length > 0 && (
            <div className="flex flex-col items-center gap-2">
              <p className="text-[10px] text-gray-500 tracking-wider uppercase">{en ? 'Rank' : 'ランク'}</p>
              <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${rankColors[rank]} flex items-center justify-center shadow-2xl`}>
                <span className="text-5xl font-black">{rank}</span>
              </div>
              <p className="text-xs text-gray-500">
                {rank === 'S' ? (en ? '90%+ accuracy' : '正答率90%+') : rank === 'A' ? (en ? '70%+ accuracy' : '正答率70%+') : rank === 'B' ? (en ? '50%+ accuracy' : '正答率50%+') : (en ? 'Under 50%' : '正答率50%未満')}
              </p>
            </div>
          )}

          {/* XP gauge */}
          {sessionXp > 0 && (
            <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{en ? 'XP Earned' : '獲得XP'}</p>
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
              <p className="text-2xl font-black text-indigo-400">{score}/{questions.length}</p>
              <p className="text-[10px] text-gray-500 tracking-wider uppercase mt-1">Correct</p>
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
              <Home className="w-4 h-4" /> {en ? 'Home' : 'ホームに戻る'}
            </button>
          </Link>
          <div className="flex gap-2.5">
            <button
              onClick={() => { setMode('select'); setCombo(0); setMaxCombo(0); setSessionXp(0); startTimeRef.current = Date.now(); }}
              className="flex-1 py-3 rounded-xl text-sm font-medium border-2 border-gray-700/50 text-gray-300 hover:border-gray-500 hover:bg-gray-800/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> {en ? 'Retry' : 'もう一度'}
            </button>
            <Link href="/listening" className="flex-1">
              <button className="w-full py-3 rounded-xl text-sm font-medium border-2 border-blue-700/50 text-blue-300 hover:border-blue-500 hover:bg-blue-800/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                <Headphones className="w-4 h-4" /> {en ? 'Listening' : 'リスニングへ'}
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Dictation mode
  if (mode === 'dictation') {
    const exercise = DICTATION_EXERCISES[dictIndex];
    if (!exercise) {
      return (
        <div className="min-h-[85vh] flex flex-col px-4 py-6">
          <p className="text-center text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase mb-6">
            Dictation Complete
          </p>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-400 via-purple-400 to-fuchsia-400 flex items-center justify-center shadow-2xl mb-4">
              <Check className="w-10 h-10 text-white" />
            </div>
            <p className="text-lg font-black text-gray-200 mb-2">{en ? 'All Done!' : 'ディクテーション完了！'}</p>
          </div>
          <div className="space-y-2.5 pt-4 pb-2">
            <Link href="/" className="block">
              <button className="w-full py-3.5 rounded-xl text-sm font-bold tracking-wide bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                <Home className="w-4 h-4" /> {en ? 'Home' : 'ホームに戻る'}
              </button>
            </Link>
            <button
              onClick={() => { setMode('select'); setDictIndex(0); setDictInput(''); setDictRevealed(false); }}
              className="w-full py-3 rounded-xl text-sm font-medium border-2 border-gray-700/50 text-gray-300 hover:border-gray-500 hover:bg-gray-800/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> {en ? 'Retry' : 'もう一度'}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-[85vh] flex flex-col px-4 py-3">
        {/* Progress header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold tracking-wider text-indigo-400">DICTATION</span>
            <span className="text-xs font-medium text-gray-400">{dictIndex + 1} / {DICTATION_EXERCISES.length}</span>
          </div>
          <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 transition-all duration-500"
              style={{ width: `${((dictIndex + 1) / DICTATION_EXERCISES.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Audio card — glassmorphism */}
        <div className="rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/10 p-6 text-center shadow-xl mb-4">
          <p className="text-[10px] font-bold tracking-widest text-purple-400 uppercase mb-3">{exercise.hint}</p>
          <button
            onClick={() => isPlaying ? stopSpeech() : speak(exercise.text)}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 shadow-lg shadow-orange-200 dark:shadow-orange-900/30 flex items-center justify-center transition-all active:scale-95 mx-auto"
          >
            {isPlaying ? <Pause className="w-7 h-7 text-white" /> : <Play className="w-7 h-7 text-white ml-1" />}
          </button>
          <p className="text-xs text-gray-500 mt-3">{en ? 'Tap to play audio' : 'タップして音声を再生'}</p>
        </div>

        {/* Input area */}
        <div className="flex-1">
          <textarea
            value={dictInput}
            onChange={(e) => setDictInput(e.target.value)}
            placeholder={en ? 'Write what you hear...' : '聞こえた英文を入力...'}
            rows={3}
            className="w-full rounded-xl border-2 border-gray-700/50 bg-gray-800/30 px-4 py-3 text-sm text-gray-200 placeholder-gray-500 resize-none focus:border-indigo-400 focus:outline-none focus:ring-0 transition-colors"
          />

          {dictRevealed && (
            <div className="mt-3 rounded-xl border-2 border-emerald-400/50 bg-emerald-500/5 backdrop-blur-md p-4 shadow-xl shadow-emerald-500/10">
              <div className="flex items-center gap-2 mb-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">{en ? 'Answer' : '正解'}</p>
              </div>
              <p className="text-sm text-gray-200 leading-relaxed">{exercise.text}</p>
            </div>
          )}
        </div>

        {/* Action buttons — gradient style */}
        <div className="mt-4 pb-2 space-y-2.5">
          {!dictRevealed ? (
            <button
              onClick={() => setDictRevealed(true)}
              className="w-full py-3.5 rounded-xl text-sm font-bold tracking-wide bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl active:scale-[0.98] transition-all"
            >
              {en ? 'Show Answer' : '答えを見る'}
            </button>
          ) : (
            <button
              onClick={() => { setDictIndex(dictIndex + 1); setDictInput(''); setDictRevealed(false); stopSpeech(); }}
              className="w-full py-3.5 rounded-xl text-sm font-bold tracking-wide bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl active:scale-[0.98] transition-all"
            >
              {en ? 'Next' : '次の問題'} →
            </button>
          )}
          <button
            onClick={() => { stopSpeech(); setMode('select'); }}
            className="w-full py-3 rounded-xl text-sm font-medium border-2 border-gray-700/50 text-gray-300 hover:border-gray-500 hover:bg-gray-800/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {en ? 'End Session' : '今日はここまで'}
          </button>
        </div>
      </div>
    );
  }

  // Game effects (rendered in quiz-result)
  const gameEffects = (
    <>
      <ComboFlash combo={combo} />
      <XpFloat xp={lastXp} trigger={xpTrigger} />
    </>
  );

  // Quiz-result mode (after pressing 決定)
  if (mode === 'quiz-result') {
    const q = questions[current];
    const isCorrect = answered === q.correctIndex;

    // Split text into paragraphs by speaker change
    const splitBySpeaker = (text: string) => {
      // Split before speaker labels (Woman before Man to prevent "Wo"+"man:" split)
      const segments = text.split(/(?=(?:Woman|Man|Professor|Speaker \d+|女性|男性|教授):\s*)/g).filter(s => s.trim());
      return segments;
    };

    const scriptParagraphs = splitBySpeaker(q.audioText);
    const translationParagraphs = q.audioTextJa ? splitBySpeaker(q.audioTextJa) : [];

    return (
      <div className="space-y-4 px-4">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{q.type === 'eiken' ? '英検型' : 'TOEFL型'}</Badge>
          <span className="text-xs text-gray-500">{current + 1} / {questions.length}</span>
        </div>

        <Progress value={((current + 1) / questions.length) * 100} className="h-1.5" />

        {/* Result indicator */}
        <div className={`p-4 rounded-xl text-center font-bold text-lg ${isCorrect ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'}`}>
          {isCorrect ? (en ? 'Correct!' : '正解！') : (en ? 'Incorrect' : '不正解')}
          {isCorrect && combo > 0 && (
            <span className="ml-2 text-sm font-black text-orange-400">🔥 {combo}</span>
          )}
        </div>

        {/* English script */}
        <Card className="p-4 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/50">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-blue-500 font-bold">{en ? 'Script' : '英文'}</p>
            <button
              onClick={() => isPlaying ? stopSpeech() : speak(q.audioText)}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              {isPlaying ? (en ? 'Stop' : '停止') : (en ? 'Play' : '再生')}
            </button>
          </div>
          <div className="space-y-2">
            {scriptParagraphs.map((para, i) => (
              <div key={i} className="flex items-start gap-2">
                <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed flex-1">{para.trim()}</p>
                <SpeakButton text={para.replace(/^(Woman|Man|Professor|Speaker \d+):\s*/i, '').trim()} className="shrink-0 mt-0.5" />
              </div>
            ))}
          </div>
        </Card>

        {/* Japanese translation */}
        {q.audioTextJa && (
          <Card className="p-4 border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
            <p className="text-xs text-gray-500 font-bold mb-2">和訳</p>
            <div className="space-y-2">
              {translationParagraphs.map((para, i) => (
                <p key={i} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{para.trim()}</p>
              ))}
            </div>
          </Card>
        )}

        {/* Question & Choices */}
        <Card className="p-4 border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 font-bold mb-2">{en ? 'Question' : '質問'}</p>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">{q.question}</p>
          <div className="space-y-1.5">
            {q.options.map((opt, i) => {
              const isUserAnswer = i === answered;
              const isCorrectAnswer = i === q.correctIndex;
              let optClass = 'text-gray-500 dark:text-gray-400';
              if (isCorrectAnswer) optClass = 'text-green-700 dark:text-green-300 font-medium';
              if (isUserAnswer && !isCorrect) optClass = 'text-red-600 dark:text-red-400 font-medium';
              return (
                <div key={i} className={`flex items-center gap-2 text-sm ${optClass}`}>
                  <span className="w-4 shrink-0">
                    {isCorrectAnswer && <Check className="w-4 h-4 text-green-600 dark:text-green-400" />}
                    {isUserAnswer && !isCorrect && <X className="w-4 h-4 text-red-500 dark:text-red-400" />}
                  </span>
                  <span>{String.fromCharCode(65 + i)}. {opt}</span>
                  {isUserAnswer && !isCorrectAnswer && <span className="text-xs text-red-500 ml-1">({en ? 'Your answer' : 'あなたの回答'})</span>}
                  {isCorrectAnswer && <span className="text-xs text-green-600 ml-1">({en ? 'Correct' : '正解'})</span>}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Explanation - Ren's member speech card */}
        <Card className="p-3">
          <div className="flex items-start gap-3">
            <div className="shrink-0 pt-0.5">
              <MemberAvatar member={REN_MEMBER} size="sm" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 mb-0.5">{REN_MEMBER.nameJa}</p>
              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{q.explanation}</p>
            </div>
          </div>
        </Card>

        {/* Next button */}
        <Button onClick={nextQuestion} className="w-full" size="lg">
          {current + 1 >= questions.length ? (en ? 'View Results' : '結果を見る') : (en ? 'Next Question' : '次の問題へ')}
        </Button>
        {gameEffects}
      </div>
    );
  }

  // Quiz mode
  const q = questions[current];

  return (
    <div className="space-y-4 px-4">
      <div className="flex items-center justify-between">
        <Badge variant="secondary">{q.type === 'eiken' ? '英検型' : 'TOEFL型'}</Badge>
        <div className="flex items-center gap-2">
          {combo > 0 && <span className="text-xs font-black text-orange-400">🔥 {combo}</span>}
          {sessionXp > 0 && <span className="text-xs font-bold text-amber-500">+{sessionXp} XP</span>}
          <span className="text-xs text-gray-500">{current + 1} / {questions.length}</span>
        </div>
      </div>

      <Progress value={((current + 1) / questions.length) * 100} className="h-1.5" />

      {/* Audio player - big prominent play button */}
      <Card className="p-6">
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => isPlaying ? stopSpeech() : speak(q.audioText)}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 shadow-lg shadow-orange-200 dark:shadow-orange-900/30 flex items-center justify-center transition-all active:scale-95"
          >
            {isPlaying ? <Pause className="w-7 h-7 text-white" /> : <Play className="w-7 h-7 text-white ml-1" />}
          </button>
          <p className="text-xs text-gray-400">{en ? 'Tap to play audio' : 'タップして音声を再生'}</p>

          {/* Speed control */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-400">{en ? 'Speed' : '速度'}:</span>
            {([0.8, 1.0, 1.2] as Speed[]).map(s => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${speed === s ? 'bg-amber-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Question */}
      <Card className="p-4">
        <p className="text-sm font-medium mb-3">{q.question}</p>
        <div className="space-y-2">
          {q.options.map((opt, i) => {
            const colorSchemes = [
              { border: 'border-blue-200 dark:border-blue-700', hover: 'hover:border-blue-400', selected: 'border-blue-500 bg-blue-50 dark:bg-blue-950 ring-2 ring-blue-300 dark:ring-blue-700', badge: 'border-blue-400 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300', badgeSelected: 'border-blue-500 bg-blue-500 text-white' },
              { border: 'border-emerald-200 dark:border-emerald-700', hover: 'hover:border-emerald-400', selected: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950 ring-2 ring-emerald-300 dark:ring-emerald-700', badge: 'border-emerald-400 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300', badgeSelected: 'border-emerald-500 bg-emerald-500 text-white' },
              { border: 'border-orange-200 dark:border-orange-700', hover: 'hover:border-orange-400', selected: 'border-orange-500 bg-orange-50 dark:bg-orange-950 ring-2 ring-orange-300 dark:ring-orange-700', badge: 'border-orange-400 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300', badgeSelected: 'border-orange-500 bg-orange-500 text-white' },
              { border: 'border-purple-200 dark:border-purple-700', hover: 'hover:border-purple-400', selected: 'border-purple-500 bg-purple-50 dark:bg-purple-950 ring-2 ring-purple-300 dark:ring-purple-700', badge: 'border-purple-400 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300', badgeSelected: 'border-purple-500 bg-purple-500 text-white' },
            ];
            const scheme = colorSchemes[i] || colorSchemes[0];
            let cls = `${scheme.border} ${scheme.hover}`;
            if (selected === i) cls = scheme.selected;
            const badgeCls = selected === i ? scheme.badgeSelected : scheme.badge;
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`w-full text-left px-5 py-3.5 rounded-xl border-2 text-sm font-medium flex items-center gap-2.5 transition-all duration-200 ${cls}`}
              >
                <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold ${badgeCls}`}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Confirm button */}
        <div className="mt-4">
          <button
            onClick={handleConfirm}
            disabled={selected === null}
            className={`w-full py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 ${
              selected !== null
                ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl active:scale-[0.98]'
                : 'bg-gray-800 text-gray-600 cursor-not-allowed'
            }`}
          >
            {en ? 'Confirm' : '決定'}
          </button>
          {sessionXp > 0 && (
            <p className="text-center text-xs text-indigo-400/70 font-medium mt-2">
              +{sessionXp} XP
            </p>
          )}
        </div>
      </Card>
      {gameEffects}
    </div>
  );
}
