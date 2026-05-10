'use client';

import { useState } from 'react';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { useProfile } from '@/lib/hooks';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Send, Loader2, BookOpen, AlertCircle, Home, Star } from 'lucide-react';
import { hasApiKey } from '@/lib/api-key';
import { callClaude } from '@/lib/claude-client';
import type { WritingSubmission } from '@/types';
import Link from 'next/link';
import { getMember, MEMBERS } from '@/lib/members';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import { TypewriterText } from '@/components/common/TypewriterText';
import { getPlayerName } from '@/lib/player-name';
import { calculateXp, getLevelFromXp } from '@/lib/xp';
import { XpFloat } from '@/components/common/GameEffects';
import { addAffinityPoints } from '@/lib/affinity';
import { AFFINITY_LABELS } from '@/lib/db';

const PROMPTS = [
  { text: 'Describe your favorite place to relax and explain why you enjoy spending time there.', level: '英検2級' },
  { text: 'Do you think social media has a positive or negative impact on society? Explain your opinion.', level: '英検準1級' },
  { text: 'Write about a person who has influenced your life and explain how they changed you.', level: '英検2級' },
  { text: 'Should students be required to learn a second language? Give reasons for your answer.', level: '英検準1級' },
  { text: 'Describe a challenge you faced and how you overcame it.', level: '英検2級' },
  { text: 'What is one invention that you think has changed the world the most? Explain why.', level: 'TOEFL' },
];

const YUUKI_LINES = [
  'お願い！ この英文、なんて書けばいいか教えて！',
  '{name}〜！ 一緒に英語書こうよ！ オレ一人じゃ不安で…',
  'よし、今日こそ上手く書けるようになるぞ！ {name}、見ててね！',
  '{name}、さっきのストーリーの続き…一緒に練習しよ！',
  '英語で気持ちを伝えるの、難しいけど楽しいよね！ やろやろ！',
];

function YuukiGuideCard() {
  const yuuki = getMember('yuuki')!;
  const name = getPlayerName() || 'マネージャー';
  const [line] = useState(() => YUUKI_LINES[Math.floor(Math.random() * YUUKI_LINES.length)].replace(/\{name\}/g, name));

  return (
    <Card className="p-4 mb-4">
      <div className="flex items-start gap-3">
        <div className="shrink-0">
          <MemberAvatar member={yuuki} size="md" />
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <p className="text-xs text-gray-500 mb-1">{yuuki.nameJa}</p>
          <TypewriterText text={line} speed={35} className="text-sm text-gray-700 dark:text-gray-300" />
        </div>
      </div>
    </Card>
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
  const [earnedXp, setEarnedXp] = useState(0);
  const [xpTrigger, setXpTrigger] = useState(0);
  const [affinityLevelUp, setAffinityLevelUp] = useState<{ memberId: string; level: number } | null>(null);

  const submissions = useLiveQuery(() => db.writingSubmissions.orderBy('date').reverse().limit(5).toArray()) ?? [];

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
      // Update streak on study completion
      const { onStudyComplete } = await import('@/lib/streak');
      await onStudyComplete();

      // XP based on score
      const xp = data.score ? Math.max(10, Math.round(data.score / 5)) : 10;
      setEarnedXp(xp);
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
        // Affinity for Yuuki (writing)
        const aff = await addAffinityPoints('writing', 5);
        if (aff.leveled) {
          setAffinityLevelUp({ memberId: aff.memberId, level: aff.newLevel });
          setTimeout(() => setAffinityLevelUp(null), 3000);
        }
      } catch {}
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
    setPromptData(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
    setText('');
    setResult(null);
  };

  if (result) {
    const scoreRank = result.score !== null
      ? (result.score >= 90 ? 'S' : result.score >= 70 ? 'A' : result.score >= 50 ? 'B' : 'C')
      : null;
    const rankColors: Record<string, string> = {
      S: 'from-yellow-400 via-amber-300 to-yellow-500 text-yellow-900',
      A: 'from-indigo-400 via-purple-400 to-fuchsia-400 text-white',
      B: 'from-emerald-400 via-green-400 to-teal-400 text-white',
      C: 'from-gray-400 via-gray-300 to-gray-400 text-gray-800',
    };

    return (
      <div className="min-h-[85vh] flex flex-col px-4 py-6">
        <p className="text-center text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase mb-6">
          Writing Review
        </p>

        <div className="flex-1 space-y-5">
          {/* Rank badge */}
          {scoreRank && (
            <div className="flex flex-col items-center gap-2">
              <p className="text-[10px] text-gray-500 tracking-wider uppercase">{en ? 'Rank' : 'ランク'}</p>
              <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${rankColors[scoreRank]} flex items-center justify-center shadow-2xl`}>
                <span className="text-5xl font-black">{scoreRank}</span>
              </div>
              <p className="text-xs text-gray-500">{result.score}/100</p>
            </div>
          )}

          {/* XP earned */}
          {earnedXp > 0 && (
            <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{en ? 'XP Earned' : '獲得XP'}</p>
                <p className="text-lg font-black text-amber-400">+{earnedXp}</p>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min(100, (earnedXp / 30) * 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Feedback */}
          <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{en ? 'Feedback' : 'フィードバック'}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">{result.feedback}</p>
          </div>

          {/* Corrections */}
          {result.corrections.length > 0 && (
            <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{en ? 'Corrections' : '修正箇所'}</p>
              <div className="space-y-3">
                {result.corrections.map((c, i) => (
                  <div key={i} className="border-l-2 border-indigo-400 pl-3">
                    <p className="text-sm line-through text-red-400">{c.original}</p>
                    <p className="text-sm text-emerald-400">{c.corrected}</p>
                    <p className="text-xs text-gray-500 mt-1">{c.explanation}</p>
                    <Badge variant="secondary" className="text-[10px] mt-1">{c.type}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="space-y-2.5 pt-4 pb-2">
          <button
            onClick={newPrompt}
            className="w-full py-3.5 rounded-xl text-sm font-bold tracking-wide bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl active:scale-[0.98] transition-all"
          >
            {en ? 'Next Prompt' : '次のお題に挑戦'}
          </button>
          <Link href="/" className="block">
            <button className="w-full py-3 rounded-xl text-sm font-medium border-2 border-gray-700/50 text-gray-300 hover:border-gray-500 hover:bg-gray-800/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <Home className="w-4 h-4" /> {en ? 'Home' : 'ホームに戻る'}
            </button>
          </Link>
        </div>

        <XpFloat xp={earnedXp} trigger={xpTrigger} />
        {affinityLevelUp && (() => {
          const m = getMember(affinityLevelUp.memberId);
          const label = AFFINITY_LABELS[affinityLevelUp.level - 1] ?? '';
          return m ? (
            <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
              <div className="animate-combo-flash text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <MemberAvatar member={m} size="lg" />
                <p className="text-sm font-bold text-pink-400 mt-2">{m.nameJa}との絆が深まった！</p>
                <p className="text-xs text-gray-400 mt-1">親密度Lv.{affinityLevelUp.level} 「{label}」</p>
              </div>
            </div>
          ) : null;
        })()}
      </div>
    );
  }

  return (
    <div className="space-y-4 px-4">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-rose-600 via-pink-500 to-fuchsia-400 p-5 text-white shadow-lg mb-2">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
        <div className="relative">
          <h2 className="text-xl font-black tracking-wide">{en ? 'Writing Practice' : 'ライティング練習'}</h2>
          <p className="text-xs opacity-60 mt-0.5">Writing Practice</p>
        </div>
      </div>

      <YuukiGuideCard />

      <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-xs text-blue-600 dark:text-blue-400">{en ? 'Prompt' : 'お題'}</p>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 font-medium">{promptData.level}</span>
        </div>
        <p className="text-sm font-medium">{prompt}</p>
      </Card>

      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={en ? "Write in English (10+ words)" : "英語で書いてみよう（10語以上）"}
          rows={8}
          className="w-full rounded-xl border-2 border-gray-700/50 bg-gray-800/30 px-4 py-3 text-sm text-gray-200 placeholder-gray-500 resize-none focus:border-indigo-400 focus:outline-none focus:ring-0 transition-colors"
        />
        <span className="absolute bottom-2 right-2 text-xs text-gray-400">
          {text.trim().split(/\s+/).filter(Boolean).length} words
        </span>
      </div>

      {!hasApiKey() && (
        <Link href="/settings">
          <Card className="p-3 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/50 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
              <p className="text-xs text-amber-700 dark:text-amber-300">APIキーが未設定です。設定画面で入力してください。</p>
            </div>
          </Card>
        </Link>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading || text.trim().split(' ').length < 10 || !hasApiKey()}
        className={`w-full py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 ${
          !loading && text.trim().split(' ').length >= 10 && hasApiKey()
            ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 text-white shadow-lg shadow-pink-500/30 hover:shadow-xl active:scale-[0.98]'
            : 'bg-gray-800 text-gray-600 cursor-not-allowed'
        }`}
      >
        {loading ? <><Loader2 className="w-4 h-4 animate-spin" />{en ? 'Reviewing...' : '添削中...'}</> : <><Send className="w-4 h-4" />{en ? 'Submit for Review' : '添削を依頼'}</>}
      </button>

      <button onClick={newPrompt} className="w-full text-xs text-gray-500 hover:text-gray-700">
        別のお題にする
      </button>

      {/* Past submissions */}
      {submissions.length > 0 && (
        <div className="pt-4 border-t">
          <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />{en ? ' Past Reviews' : ' 過去の添削'}
          </h3>
          <div className="space-y-2">
            {submissions.map(s => (
              <Card key={s.id} className="p-3">
                <p className="text-xs text-gray-500">{new Date(s.date).toLocaleDateString('ja-JP')}</p>
                <p className="text-xs text-gray-700 dark:text-gray-300 truncate">{s.prompt}</p>
                {s.score !== null && <Badge variant="secondary" className="text-[10px] mt-1">{s.score}/100</Badge>}
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
