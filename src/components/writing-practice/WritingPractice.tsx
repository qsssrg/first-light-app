'use client';

import { useState, useRef } from 'react';
import { db, AFFINITY_LABELS } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { useProfile } from '@/lib/hooks';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, Loader2, BookOpen, AlertCircle, Home, RotateCcw, Star, Check, X, Puzzle } from 'lucide-react';
import { hasApiKey } from '@/lib/api-key';
import { callClaude } from '@/lib/claude-client';
import type { WritingSubmission } from '@/types';
import Link from 'next/link';
import { getMember, MEMBERS } from '@/lib/members';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import { TypewriterText } from '@/components/common/TypewriterText';
import { getPlayerName } from '@/lib/player-name';
import { calculateXp, getLevelFromXp } from '@/lib/xp';
import { addAffinityPoints } from '@/lib/affinity';
import { XpFloat, ComboFlash } from '@/components/common/GameEffects';

const PROMPTS = [
  { text: 'Describe your favorite place to relax and explain why you enjoy spending time there.', level: '英検2級', sampleAnswer: 'My favorite place to relax is the park near my house because I enjoy walking and reading there' },
  { text: 'Do you think social media has a positive or negative impact on society? Explain your opinion.', level: '英検準1級', sampleAnswer: 'I think social media has a negative impact on society because it reduces face-to-face communication' },
  { text: 'Write about a person who has influenced your life and explain how they changed you.', level: '英検2級', sampleAnswer: 'My mother has influenced my life the most because she always encouraged me to work hard' },
  { text: 'Should students be required to learn a second language? Give reasons for your answer.', level: '英検準1級', sampleAnswer: 'Students should be required to learn a second language because it helps them understand different cultures' },
  { text: 'Describe a challenge you faced and how you overcame it.', level: '英検2級', sampleAnswer: 'I faced a challenge when I moved to a new school but I overcame it by making new friends' },
  { text: 'What is one invention that you think has changed the world the most? Explain why.', level: 'TOEFL', sampleAnswer: 'The internet has changed the world the most because it connects people across different countries instantly' },
];

// Dummy words for puzzle mode (common English words not in answers)
const DUMMY_WORDS = ['always', 'never', 'very', 'much', 'often', 'really', 'just', 'also', 'only', 'still', 'even', 'already', 'perhaps', 'quite', 'rather', 'almost', 'between', 'without', 'through', 'during'];

type PuzzleChip = { word: string; id: number; isDummy: boolean };

function tokenize(answer: string): string[] {
  // Split by space, separate commas as independent tokens, remove periods
  return answer
    .replace(/\./g, '')
    .split(/\s+/)
    .flatMap(w => {
      if (w.endsWith(',')) return [w.slice(0, -1), ','];
      if (w.startsWith(',')) return [',', w.slice(1)];
      return [w];
    })
    .filter(Boolean);
}

function buildPuzzleChips(answer: string): PuzzleChip[] {
  const tokens = tokenize(answer);
  const chips: PuzzleChip[] = tokens.map((w, i) => ({ word: w, id: i, isDummy: false }));
  // Add ~30% dummy words
  const dummyCount = Math.max(2, Math.round(tokens.length * 0.3));
  const usedWords = new Set(tokens.map(w => w.toLowerCase()));
  const available = DUMMY_WORDS.filter(w => !usedWords.has(w));
  const shuffledDummies = [...available].sort(() => Math.random() - 0.5).slice(0, dummyCount);
  shuffledDummies.forEach((w, i) => chips.push({ word: w, id: tokens.length + i, isDummy: true }));
  // Shuffle all
  return chips.sort(() => Math.random() - 0.5);
}

const YUUKI_LINES = [
  'お願い！ この英文、なんて書けばいいか教えて！',
  '{name}〜！ 一緒に英語書こうよ！ オレ一人じゃ不安で…',
  'よし、今日こそ上手く書けるようになるぞ！ {name}、見ててね！',
  '{name}、さっきのストーリーの続き…一緒に練習しよ！',
  '英語で気持ちを伝えるの、難しいけど楽しいよね！ やろやろ！',
];

type EncouragementLevel = 'great' | 'good' | 'struggle';

const ENCOURAGEMENT: Record<string, Record<EncouragementLevel, string[]>> = {
  yuuki: {
    great: [
      '{name}〜！ すごい！！ めっちゃ良い英文書けてるじゃん！',
      'やばい！ {name}、ライティング上手くなりすぎ！ 天才！？',
      '{name}さんの文章、ネイティブみたいだよ！ マジですごい！',
    ],
    good: [
      '{name}、お疲れ〜！ いい感じに書けてたよ！ また明日もやろ！',
      'いいね{name}！ ちょっとずつ上手くなってるの分かるよ！',
      '{name}と一緒にライティング練習するの楽しいな〜！',
    ],
    struggle: [
      '{name}〜、ドンマイ！ 書くこと自体が大事なんだよ！',
      '大丈夫！ {name}なら絶対書けるようになるって！ 信じてる！',
      '{name}、書いただけ偉い！ 続けることが一番大事だから！',
    ],
  },
};

function getWritingEncouragement(score: number | null): { member: typeof MEMBERS[0]; message: string } {
  const name = getPlayerName() || 'マネージャー';
  const level: EncouragementLevel = (score !== null && score >= 80) ? 'great' : (score !== null && score >= 50) ? 'good' : 'struggle';
  const yuuki = MEMBERS.find(m => m.id === 'yuuki')!;
  const messages = ENCOURAGEMENT.yuuki[level];
  const message = messages[Math.floor(Math.random() * messages.length)].replace(/\{name\}/g, name);
  return { member: yuuki, message };
}

function YuukiGuideCard() {
  const yuuki = getMember('yuuki')!;
  const name = getPlayerName() || 'マネージャー';
  const [line] = useState(() => YUUKI_LINES[Math.floor(Math.random() * YUUKI_LINES.length)].replace(/\{name\}/g, name));

  return (
    <div className="rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/10 p-4 shadow-xl mb-4">
      <div className="flex items-start gap-3">
        <div className="shrink-0">
          <MemberAvatar member={yuuki} size="md" />
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <p className="text-xs text-gray-500 mb-1">{yuuki.nameJa}</p>
          <TypewriterText text={line} speed={35} className="text-sm text-gray-700 dark:text-gray-300" />
        </div>
      </div>
    </div>
  );
}

export function WritingPractice() {
  const profile = useProfile();
  const en = profile?.settings?.englishSpeakerMode ?? false;
  const [promptData, setPromptData] = useState(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
  const prompt = promptData.text;
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WritingSubmission | null>(null);
  const [sessionXp, setSessionXp] = useState(0);
  const [lastXp, setLastXp] = useState(0);
  const [xpTrigger, setXpTrigger] = useState(0);
  const [affinityLevelUp, setAffinityLevelUp] = useState<{ memberId: string; level: number } | null>(null);
  const [levelUpDisplay, setLevelUpDisplay] = useState<number | null>(null);
  const [submissionCount, setSubmissionCount] = useState(0);
  const startTimeRef = useRef(Date.now());

  // Puzzle mode
  const [mode, setMode] = useState<'freewrite' | 'puzzle'>('freewrite');
  const [puzzleChips, setPuzzleChips] = useState<PuzzleChip[]>([]);
  const [selectedChips, setSelectedChips] = useState<PuzzleChip[]>([]);
  const [puzzleResult, setPuzzleResult] = useState<'correct' | 'incorrect' | null>(null);
  const [combo, setCombo] = useState(0);

  const submissions = useLiveQuery(() => db.writingSubmissions.orderBy('date').reverse().limit(5).toArray()) ?? [];

  // Progress phases: 1=writing, 2=submitting, 3=result
  const progressPhase = result ? 3 : loading ? 2 : 1;
  const progressPercent = progressPhase === 1 ? 33 : progressPhase === 2 ? 66 : 100;

  const handleSubmit = async () => {
    if (!text.trim() || text.trim().split(' ').length < 10) return;
    if (!hasApiKey()) return;
    setLoading(true);

    try {
      const responseText = await callClaude([{
        role: 'user',
        content: `You are an English writing tutor for a Japanese learner preparing for EIKEN and TOEFL exams.

The student was given this prompt: "${prompt}"

They wrote:
"""
${text}
"""

Please provide:
1. A score from 0-100
2. Brief feedback (2-3 sentences in Japanese) acknowledging what they did well and suggesting improvement
3. Up to 3 specific corrections

Respond in this exact JSON format:
{
  "score": <number>,
  "feedback": "<Japanese feedback string>",
  "corrections": [
    {"original": "<original phrase>", "corrected": "<corrected phrase>", "explanation": "<explanation in Japanese>", "type": "<grammar|vocabulary|style|spelling>"}
  ]
}

Remember the Montessori principle: acknowledge growth rather than just praise.`,
      }]);

      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      const data = jsonMatch ? JSON.parse(jsonMatch[0]) : { feedback: responseText, score: null, corrections: [] };

      const submission: Omit<WritingSubmission, 'id'> = {
        date: new Date(),
        prompt,
        userText: text,
        feedback: data.feedback,
        score: data.score,
        corrections: data.corrections || [],
      };

      const id = await db.writingSubmissions.add(submission as WritingSubmission);
      setResult({ ...submission, id } as WritingSubmission);
      setSubmissionCount(prev => prev + 1);

      // Award XP only when score >= 50 (correct threshold)
      const isCorrect = data.score !== null && data.score >= 50;
      const xpEarned = isCorrect ? Math.max(5, Math.floor(data.score / 10) * 2) : 0;

      if (xpEarned > 0) {
        setSessionXp(prev => prev + xpEarned);
        setLastXp(xpEarned);
        setXpTrigger(prev => prev + 1);

        // Update profile XP
        const profileData = await db.userProfile.toCollection().first();
        if (profileData?.id) {
          const newTotalXp = profileData.totalXp + xpEarned;
          const oldLevel = getLevelFromXp(profileData.totalXp);
          const newLevel = getLevelFromXp(newTotalXp);
          await db.userProfile.update(profileData.id, {
            xp: profileData.xp + xpEarned,
            totalXp: newTotalXp,
            level: newLevel,
          });
          if (newLevel > oldLevel) {
            setLevelUpDisplay(newLevel);
            setTimeout(() => setLevelUpDisplay(null), 3000);
          }
        }
      }

      // Record study session
      await db.studySessions.add({
        date: new Date(),
        axis: 'writing',
        correctCount: isCorrect ? 1 : 0,
        totalCount: 1,
        xpEarned,
        comboMax: 0,
        duration: Math.floor((Date.now() - startTimeRef.current) / 1000),
      } as any);

      // Update streak
      const { onStudyComplete } = await import('@/lib/streak');
      await onStudyComplete();

      // Add affinity points to Yuuki (writing) only on correct
      if (isCorrect) {
        const aff = await addAffinityPoints('writing', 5);
        if (aff.leveled) {
          setAffinityLevelUp({ memberId: aff.memberId, level: aff.newLevel });
          setTimeout(() => setAffinityLevelUp(null), 3000);
        }
      }
    } catch (err) {
      const message = err instanceof Error && err.message === 'API_KEY_NOT_SET'
        ? 'APIキーが設定されていません。設定画面で入力してください。'
        : 'API接続エラー。APIキーを確認してください。';
      const submission: Omit<WritingSubmission, 'id'> = {
        date: new Date(),
        prompt,
        userText: text,
        feedback: message,
        score: null,
        corrections: [],
      };
      const id = await db.writingSubmissions.add(submission as WritingSubmission);
      setResult({ ...submission, id } as WritingSubmission);
    } finally {
      setLoading(false);
    }
  };

  const newPrompt = () => {
    const p = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
    setPromptData(p);
    setText('');
    setResult(null);
    setPuzzleResult(null);
    setSelectedChips([]);
    setPuzzleChips(buildPuzzleChips(p.sampleAnswer));
    startTimeRef.current = Date.now();
  };

  // Initialize puzzle chips on mount/mode change
  const initPuzzle = () => {
    setPuzzleChips(buildPuzzleChips(promptData.sampleAnswer));
    setSelectedChips([]);
    setPuzzleResult(null);
  };

  const handlePuzzleConfirm = async () => {
    const userAnswer = selectedChips.map(c => c.word).join(' ');
    const correctAnswer = tokenize(promptData.sampleAnswer).join(' ');
    const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
    setPuzzleResult(isCorrect ? 'correct' : 'incorrect');

    // XP at 50% of freewrite
    const xpEarned = isCorrect ? 5 : 0;
    const newCombo = isCorrect ? combo + 1 : 0;
    setCombo(newCombo);

    if (xpEarned > 0) {
      setSessionXp(prev => prev + xpEarned);
      setLastXp(xpEarned);
      setXpTrigger(prev => prev + 1);

      try {
        const profileData = await db.userProfile.toCollection().first();
        if (profileData?.id) {
          const newTotalXp = profileData.totalXp + xpEarned;
          const oldLevel = getLevelFromXp(profileData.totalXp);
          const newLevel = getLevelFromXp(newTotalXp);
          await db.userProfile.update(profileData.id, {
            xp: profileData.xp + xpEarned,
            totalXp: newTotalXp,
            level: newLevel,
          });
          if (newLevel > oldLevel) {
            setLevelUpDisplay(newLevel);
            setTimeout(() => setLevelUpDisplay(null), 3000);
          }
        }

        await db.studySessions.add({
          date: new Date(),
          axis: 'writing',
          correctCount: isCorrect ? 1 : 0,
          totalCount: 1,
          xpEarned,
          comboMax: newCombo,
          duration: 0,
        } as any);

        const { onStudyComplete } = await import('@/lib/streak');
        await onStudyComplete();

        if (isCorrect) {
          const aff = await addAffinityPoints('writing', 3);
          if (aff.leveled) {
            setAffinityLevelUp({ memberId: aff.memberId, level: aff.newLevel });
            setTimeout(() => setAffinityLevelUp(null), 3000);
          }
        }
      } catch {}
    }
    setSubmissionCount(prev => prev + 1);
  };

  // ─── 結果画面（VocabStudy風） ───
  if (result) {
    const score = result.score;
    const rank = score !== null ? (score >= 90 ? 'S' : score >= 70 ? 'A' : score >= 50 ? 'B' : 'C') : 'B';
    const rankColors: Record<string, string> = {
      S: 'from-yellow-400 via-amber-300 to-yellow-500 text-yellow-900',
      A: 'from-indigo-400 via-purple-400 to-fuchsia-400 text-white',
      B: 'from-emerald-400 via-green-400 to-teal-400 text-white',
      C: 'from-gray-400 via-gray-300 to-gray-400 text-gray-800',
    };
    const encouragement = getWritingEncouragement(score);
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 60000);

    return (
      <div className="min-h-[85vh] flex flex-col px-4 py-6">
        {/* Game effects */}
        <XpFloat xp={lastXp} trigger={xpTrigger} />

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

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold tracking-wider text-indigo-400">RESULT</span>
            <span className="text-xs font-medium text-gray-400">{submissionCount} {en ? 'submitted' : '提出済'}</span>
          </div>
          <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Header */}
        <p className="text-center text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase mb-6">
          Writing Complete
        </p>

        <div className="flex-1 space-y-5">
          {/* Rank badge */}
          {score !== null && (
            <div className="flex flex-col items-center gap-2">
              <p className="text-[10px] text-gray-500 tracking-wider uppercase">{en ? 'Rank' : 'ランク'}</p>
              <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${rankColors[rank]} flex items-center justify-center shadow-2xl`}>
                <span className="text-5xl font-black">{rank}</span>
              </div>
              <p className="text-xs text-gray-500">
                {rank === 'S' ? (en ? 'Score 90+' : 'スコア90+') : rank === 'A' ? (en ? 'Score 70+' : 'スコア70+') : rank === 'B' ? (en ? 'Score 50+' : 'スコア50+') : (en ? 'Under 50' : 'スコア50未満')}
              </p>
            </div>
          )}

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
              <p className="text-2xl font-black text-indigo-400">{score !== null ? score : '—'}</p>
              <p className="text-[10px] text-gray-500 tracking-wider uppercase mt-1">Score</p>
            </div>
            <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-4 text-center">
              <p className="text-2xl font-black text-purple-400">{sessionXp}</p>
              <p className="text-[10px] text-gray-500 tracking-wider uppercase mt-1">XP Earned</p>
            </div>
            <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-4 text-center">
              <p className="text-2xl font-black text-orange-400">{result.corrections.length}</p>
              <p className="text-[10px] text-gray-500 tracking-wider uppercase mt-1">Corrections</p>
            </div>
            <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-4 text-center">
              <p className="text-2xl font-black text-fuchsia-400">{elapsed > 0 ? `${elapsed}m` : '<1m'}</p>
              <p className="text-[10px] text-gray-500 tracking-wider uppercase mt-1">Time</p>
            </div>
          </div>

          {/* Feedback card (glassmorphism) */}
          <div className="rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/10 p-5 shadow-xl">
            <h3 className="text-xs font-bold tracking-wider text-indigo-400 uppercase mb-3">{en ? 'Feedback' : 'フィードバック'}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">{result.feedback}</p>
          </div>

          {/* Corrections */}
          {result.corrections.length > 0 && (
            <div className="rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/10 p-5 shadow-xl">
              <h3 className="text-xs font-bold tracking-wider text-indigo-400 uppercase mb-3">{en ? 'Corrections' : '修正箇所'}</h3>
              <div className="space-y-3">
                {result.corrections.map((c, i) => (
                  <div key={i} className="border-l-2 border-indigo-400 pl-3">
                    <p className="text-sm line-through text-red-400">{c.original}</p>
                    <p className="text-sm text-emerald-400">{c.corrected}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{c.explanation}</p>
                    <Badge variant="secondary" className="text-[10px] mt-1">{c.type}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Member encouragement */}
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
        </div>

        {/* Action buttons (VocabStudy style) */}
        <div className="space-y-2.5 pt-4 pb-2">
          <Link href="/" className="block">
            <button className="w-full py-3.5 rounded-xl text-sm font-bold tracking-wide bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <Home className="w-4 h-4" /> ホームに戻る
            </button>
          </Link>
          <div className="flex gap-2.5">
            <button
              onClick={newPrompt}
              className="flex-1 py-3 rounded-xl text-sm font-medium border-2 border-gray-700/50 text-gray-300 hover:border-gray-500 hover:bg-gray-800/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> 次のお題
            </button>
            <Link href="/writing-practice" className="flex-1">
              <button className="w-full py-3 rounded-xl text-sm font-medium border-2 border-blue-700/50 text-blue-300 hover:border-blue-500 hover:bg-blue-800/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                <BookOpen className="w-4 h-4" /> 履歴
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─── 入力画面（VocabStudy風ゲームUI） ───
  return (
    <div className="min-h-[85vh] flex flex-col px-4 py-3">
      {/* Game effects overlay */}
      <XpFloat xp={lastXp} trigger={xpTrigger} />

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
          <span className="text-xs font-bold tracking-wider text-indigo-400">WRITING</span>
          <div className="flex items-center gap-3">
            {sessionXp > 0 && (
              <span className="text-xs font-black text-amber-400">+{sessionXp} XP</span>
            )}
            <span className="text-xs font-medium text-gray-400">{submissionCount} {en ? 'done' : '提出'}</span>
          </div>
        </div>
        <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Mode toggle */}
      <div className="flex rounded-xl overflow-hidden border-2 border-gray-700/50 mb-4">
        <button
          onClick={() => { setMode('freewrite'); setPuzzleResult(null); }}
          className={`flex-1 py-2 text-xs font-bold tracking-wide transition-colors ${mode === 'freewrite' ? 'bg-indigo-500 text-white' : 'bg-gray-800/30 text-gray-400'}`}
        >
          <Send className="w-3 h-3 inline mr-1" />{en ? 'Free Write' : '手入力'}
        </button>
        <button
          onClick={() => { setMode('puzzle'); initPuzzle(); }}
          className={`flex-1 py-2 text-xs font-bold tracking-wide transition-colors ${mode === 'puzzle' ? 'bg-indigo-500 text-white' : 'bg-gray-800/30 text-gray-400'}`}
        >
          <Puzzle className="w-3 h-3 inline mr-1" />{en ? 'Puzzle' : 'パズル'}
        </button>
      </div>

      {mode === 'puzzle' ? (
        // ─── パズルモード ───
        <>
          {/* Prompt */}
          <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-5 text-center shadow-xl mb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <p className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">{en ? 'Prompt' : 'お題'}</p>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium">{promptData.level}</span>
            </div>
            <p className="text-base leading-relaxed text-gray-800 dark:text-gray-100 italic font-medium px-2">{prompt}</p>
            <p className="text-xs text-gray-500 mt-3">{en ? 'Arrange words to form the answer' : '単語を並べて回答を完成させてください'}</p>
          </div>

          {/* Selected area */}
          <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-4 min-h-[60px] mb-3">
            <p className="text-[10px] text-gray-500 mb-2">{en ? 'Your Answer' : '回答'}</p>
            <div className="flex flex-wrap gap-1.5">
              {selectedChips.length === 0 ? (
                <span className="text-xs text-gray-500 italic">{en ? 'Tap words below to build your answer' : '下の単語をタップして文を作ろう'}</span>
              ) : (
                selectedChips.map((chip, i) => (
                  <button
                    key={`sel-${chip.id}`}
                    onClick={() => {
                      if (puzzleResult) return;
                      setSelectedChips(prev => prev.filter(c => c.id !== chip.id));
                    }}
                    className="px-3 py-1.5 rounded-lg bg-indigo-500/20 border border-indigo-400/50 text-sm font-medium text-indigo-300 hover:bg-indigo-500/30 active:scale-95 transition-all"
                  >
                    {chip.word}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Available chips */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {puzzleChips
              .filter(c => !selectedChips.find(s => s.id === c.id))
              .map(chip => (
                <button
                  key={`avail-${chip.id}`}
                  onClick={() => {
                    if (puzzleResult) return;
                    setSelectedChips(prev => [...prev, chip]);
                  }}
                  className="px-3 py-1.5 rounded-lg border-2 border-gray-700/50 bg-gray-800/30 text-sm font-medium text-gray-200 hover:border-gray-500 hover:bg-gray-800/50 active:scale-95 transition-all"
                >
                  {chip.word}
                </button>
              ))}
          </div>

          {/* Puzzle result */}
          {puzzleResult && (
            <div className={`rounded-xl p-4 text-center mb-4 ${puzzleResult === 'correct' ? 'bg-green-500/10 border border-green-400/30' : 'bg-red-500/10 border border-red-400/30'}`}>
              {puzzleResult === 'correct'
                ? <Check className="w-8 h-8 text-green-400 mx-auto mb-1" />
                : <X className="w-8 h-8 text-red-400 mx-auto mb-1" />}
              <p className={`text-lg font-black ${puzzleResult === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
                {puzzleResult === 'correct' ? (en ? 'Correct!' : '正解！') : (en ? 'Incorrect' : '不正解')}
              </p>
              {puzzleResult === 'incorrect' && (
                <div className="mt-3 text-left rounded-lg bg-white/5 p-3">
                  <p className="text-[10px] text-gray-500 mb-1">{en ? 'Correct answer' : '模範解答'}</p>
                  <p className="text-sm text-gray-300">{tokenize(promptData.sampleAnswer).join(' ')}</p>
                </div>
              )}
              {combo > 1 && puzzleResult === 'correct' && (
                <span className="text-sm font-black text-orange-400 mt-1 block">🔥 {combo} COMBO</span>
              )}
            </div>
          )}

          {/* Puzzle buttons */}
          <div className="space-y-2.5 pb-2">
            {!puzzleResult ? (
              <>
                <button
                  onClick={handlePuzzleConfirm}
                  disabled={selectedChips.length === 0}
                  className={`w-full py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 ${
                    selectedChips.length > 0
                      ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl active:scale-[0.98]'
                      : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  {en ? 'Confirm' : '決定'}
                </button>
                <button
                  onClick={() => setSelectedChips([])}
                  className="w-full py-2.5 rounded-xl text-xs font-medium text-gray-400 hover:text-gray-200 transition-colors"
                >
                  <RotateCcw className="w-3 h-3 inline mr-1" />{en ? 'Reset' : 'リセット'}
                </button>
              </>
            ) : (
              <button
                onClick={newPrompt}
                className="w-full py-3.5 rounded-xl text-sm font-bold tracking-wide bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl active:scale-[0.98] transition-all"
              >
                {en ? 'Next Question' : '次の問題へ'}
              </button>
            )}
          </div>

          <ComboFlash combo={combo} />
        </>
      ) : (
      <>
      {/* Yuuki guide card */}
      <YuukiGuideCard />

      {/* Prompt card — glassmorphism */}
      <div className="rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/10 p-6 text-center shadow-xl mb-4">
        <div className="flex items-center justify-center gap-2 mb-3">
          <p className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">{en ? 'Prompt' : 'お題'}</p>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium">
            {promptData.level}
          </span>
        </div>
        <p className="text-base leading-relaxed text-gray-800 dark:text-gray-100 italic font-medium px-2">
          {prompt}
        </p>
        <p className="text-xs text-gray-500 mt-4">{en ? 'Write 10+ words in English' : '10語以上の英文を書いてください'}</p>
      </div>

      {/* Text area */}
      <div className="flex-1 mb-4">
        <div className="relative rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/10 shadow-xl overflow-hidden">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={en ? "Write in English (10+ words)" : "英語で書いてみよう（10語以上）"}
            rows={8}
            className="w-full px-5 py-4 text-sm bg-transparent resize-none focus:outline-none text-gray-800 dark:text-gray-100 placeholder-gray-500"
          />
          <div className="flex items-center justify-between px-5 py-2 border-t border-white/10">
            <span className="text-xs text-gray-500">
              {text.trim().split(/\s+/).filter(Boolean).length} words
            </span>
            {text.trim().split(/\s+/).filter(Boolean).length >= 10 && (
              <span className="text-xs text-emerald-400 font-medium">Ready!</span>
            )}
          </div>
        </div>
      </div>

      {/* API key warning */}
      {!hasApiKey() && (
        <Link href="/settings">
          <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-3 mb-4 cursor-pointer hover:bg-amber-500/20 transition-colors">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
              <p className="text-xs text-amber-300">APIキーが未設定です。設定画面で入力してください。</p>
            </div>
          </div>
        </Link>
      )}

      {/* Submit button — gradient (matching VocabStudy confirm button) */}
      <div className="pb-2">
        <button
          onClick={handleSubmit}
          disabled={loading || text.trim().split(' ').length < 10 || !hasApiKey()}
          className={`w-full py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 ${
            !loading && text.trim().split(' ').length >= 10 && hasApiKey()
              ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 active:scale-[0.98]'
              : 'bg-gray-800 text-gray-600 cursor-not-allowed'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              {en ? 'Reviewing...' : '添削中...'}
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              {en ? 'Submit for Review' : '添削を依頼'}
            </span>
          )}
        </button>

        <button onClick={newPrompt} className="w-full mt-2 text-xs text-gray-400 hover:text-gray-600 underline decoration-dotted">
          {en ? 'Different prompt' : '別のお題にする'}
        </button>

        {/* XP indicator */}
        {sessionXp > 0 && (
          <p className="text-center text-xs text-indigo-400/70 font-medium mt-2">
            +{sessionXp} XP
          </p>
        )}
      </div>

      {/* Past submissions */}
      {submissions.length > 0 && (
        <div className="pt-4 border-t border-white/10">
          <h3 className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-3 flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5" />{en ? ' Past Reviews' : ' 過去の添削'}
          </h3>
          <div className="space-y-2">
            {submissions.map(s => (
              <div key={s.id} className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-3">
                <p className="text-xs text-gray-500">{new Date(s.date).toLocaleDateString('ja-JP')}</p>
                <p className="text-xs text-gray-700 dark:text-gray-300 truncate">{s.prompt}</p>
                {s.score !== null && <Badge variant="secondary" className="text-[10px] mt-1">{s.score}/100</Badge>}
              </div>
            ))}
          </div>
        </div>
      )}
      </>
      )}
    </div>
  );
}
