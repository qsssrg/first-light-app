'use client';

import { useState } from 'react';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Send, Loader2, BookOpen } from 'lucide-react';
import type { WritingSubmission } from '@/types';

const PROMPTS = [
  'Describe your favorite place to relax and explain why you enjoy spending time there.',
  'Do you think social media has a positive or negative impact on society? Explain your opinion.',
  'Write about a person who has influenced your life and explain how they changed you.',
  'Should students be required to learn a second language? Give reasons for your answer.',
  'Describe a challenge you faced and how you overcame it.',
  'What is one invention that you think has changed the world the most? Explain why.',
];

export function WritingPractice() {
  const [prompt, setPrompt] = useState(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WritingSubmission | null>(null);

  const submissions = useLiveQuery(() => db.writingSubmissions.orderBy('date').reverse().limit(5).toArray()) ?? [];

  const handleSubmit = async () => {
    if (!text.trim() || text.trim().split(' ').length < 10) return;
    setLoading(true);

    try {
      const res = await fetch('/api/writing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, text }),
      });

      if (!res.ok) throw new Error('API error');

      const data = await res.json();
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
    } catch {
      // If API fails, save without feedback
      const submission: Omit<WritingSubmission, 'id'> = {
        date: new Date(),
        prompt,
        userText: text,
        feedback: 'API接続エラー。後で再添削できます。',
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
    setPrompt(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
    setText('');
    setResult(null);
  };

  if (result) {
    return (
      <div className="space-y-4 px-4">
        <h2 className="text-lg font-bold">添削結果</h2>
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
      <h2 className="text-lg font-bold">ライティング練習</h2>

      <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">お題</p>
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

      <Button
        onClick={handleSubmit}
        disabled={loading || text.trim().split(' ').length < 10}
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
