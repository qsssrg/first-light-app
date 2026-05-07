'use client';

import { useState } from 'react';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Send, Loader2, BookOpen, AlertCircle } from 'lucide-react';
import { hasApiKey } from '@/lib/api-key';
import { callClaude } from '@/lib/claude-client';
import type { WritingSubmission } from '@/types';
import Link from 'next/link';
import { getMember } from '@/lib/members';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import { TypewriterText } from '@/components/common/TypewriterText';
import { getPlayerName } from '@/lib/player-name';

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
  const [promptData, setPromptData] = useState(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
  const prompt = promptData.text;
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WritingSubmission | null>(null);

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
    return (
      <div className="space-y-4 px-4">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-rose-600 via-pink-500 to-fuchsia-400 p-5 text-white shadow-lg mb-2">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
        <div className="relative">
          <h2 className="text-xl font-black tracking-wide">添削結果</h2>
          <p className="text-xs opacity-60 mt-0.5">Writing Result</p>
        </div>
      </div>
        {result.score !== null && (
          <div className="text-center">
            <p className="text-3xl font-bold">{result.score}<span className="text-sm text-gray-500">/100</span></p>
          </div>
        )}
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-2">フィードバック</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">{result.feedback}</p>
        </Card>
        {result.corrections.length > 0 && (
          <Card className="p-4">
            <h3 className="text-sm font-medium mb-2">修正箇所</h3>
            <div className="space-y-2">
              {result.corrections.map((c, i) => (
                <div key={i} className="text-xs border-l-2 border-blue-400 pl-2">
                  <p className="line-through text-red-400">{c.original}</p>
                  <p className="text-green-400">{c.corrected}</p>
                  <p className="text-gray-500 mt-0.5">{c.explanation}</p>
                  <Badge variant="secondary" className="text-[10px] mt-1">{c.type}</Badge>
                </div>
              ))}
            </div>
          </Card>
        )}
        <Button onClick={newPrompt} className="w-full">次のお題に挑戦</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 px-4">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-rose-600 via-pink-500 to-fuchsia-400 p-5 text-white shadow-lg mb-2">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
        <div className="relative">
          <h2 className="text-xl font-black tracking-wide">ライティング練習</h2>
          <p className="text-xs opacity-60 mt-0.5">Writing Practice</p>
        </div>
      </div>

      <YuukiGuideCard />

      <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-xs text-blue-600 dark:text-blue-400">お題</p>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 font-medium">{promptData.level}</span>
        </div>
        <p className="text-sm font-medium">{prompt}</p>
      </Card>

      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="英語で書いてみよう（10語以上）"
          rows={8}
          className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-900 resize-none"
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

      <Button
        onClick={handleSubmit}
        disabled={loading || text.trim().split(' ').length < 10 || !hasApiKey()}
        className="w-full"
      >
        {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> 添削中...</> : <><Send className="w-4 h-4 mr-2" /> 添削を依頼</>}
      </Button>

      <button onClick={newPrompt} className="w-full text-xs text-gray-500 hover:text-gray-700">
        別のお題にする
      </button>

      {/* Past submissions */}
      {submissions.length > 0 && (
        <div className="pt-4 border-t">
          <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> 過去の添削
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
