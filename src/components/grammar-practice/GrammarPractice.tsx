'use client';

import { useState, useMemo } from 'react';
import { GRAMMAR_QUESTIONS } from '@/lib/grammar-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Check, X, GraduationCap } from 'lucide-react';
import { useProfile } from '@/lib/hooks';
import { getMember } from '@/lib/members';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import { TypewriterText } from '@/components/common/TypewriterText';
import { getPlayerName } from '@/lib/player-name';

const KAI_LINES = [
  '{name}、文法を制する者が英語を制す。一緒に鍛えよう。',
  '構造が分かると、英語の見え方が変わる。{name}、やるぞ。',
  '基礎を固めれば怖いものはない。{name}、付き合ってくれ。',
];

export function GrammarPractice() {
  const profile = useProfile();
  const en = profile?.settings?.englishSpeakerMode ?? false;
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const questions = useMemo(() => {
    const shuffled = [...GRAMMAR_QUESTIONS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  }, []);

  const kai = getMember('kai')!;
  const name = getPlayerName() || 'マネージャー';
  const [kaiLine] = useState(() => KAI_LINES[Math.floor(Math.random() * KAI_LINES.length)].replace(/\{name\}/g, name));

  if (!started) {
    return (
      <div className="space-y-4 px-4">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-700 via-slate-600 to-zinc-500 p-5 text-white shadow-lg mb-2">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
          <div className="relative">
            <h2 className="text-xl font-black tracking-wide">{en ? 'Grammar Practice' : '文法学習'}</h2>
            <p className="text-xs opacity-60 mt-0.5">Grammar</p>
          </div>
        </div>
        <Card className="p-3">
          <div className="flex items-start gap-3">
            <MemberAvatar member={kai} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 mb-0.5">{kai.nameJa}</p>
              <TypewriterText text={kaiLine} className="text-xs text-gray-700 dark:text-gray-300" speed={30} />
            </div>
          </div>
        </Card>
        <Button onClick={() => setStarted(true)} className="w-full">
          <GraduationCap className="w-4 h-4 mr-2" /> {en ? 'Start Grammar' : '文法問題を始める'}
        </Button>
      </div>
    );
  }

  // Finished
  if (current >= questions.length) {
    const percent = Math.round((score / questions.length) * 100);
    return (
      <div className="text-center py-8 px-4 space-y-4">
        <GraduationCap className="w-12 h-12 text-gray-500 mx-auto" />
        <h2 className="text-xl font-bold">{en ? 'Grammar Complete' : '文法学習完了'}</h2>
        <p className="text-3xl font-bold">{score} / {questions.length}</p>
        <p className="text-sm text-gray-500">{en ? `Accuracy: ${percent}%` : `正答率 ${percent}%`}</p>
        <Button onClick={() => { setCurrent(0); setScore(0); setAnswered(null); }}>{en ? 'Try Again' : 'もう一度'}</Button>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="space-y-4 px-4">
      <div className="flex items-center justify-between">
        <Badge variant="secondary">{q.level === 'toefl' ? 'TOEFL' : q.level === 'eiken_pre1' ? '準1級' : '2級'}</Badge>
        <span className="text-xs text-gray-500">{current + 1} / {questions.length}</span>
      </div>
      <Progress value={((current + 1) / questions.length) * 100} className="h-1.5" />

      <Card className="p-4">
        <p className="text-sm font-medium mb-4 font-mono">{q.question}</p>
        <div className="space-y-2">
          {q.options.map((opt, i) => {
            let cls = 'border-gray-200 dark:border-gray-700 hover:border-gray-400';
            if (answered !== null) {
              if (i === q.correctIndex) cls = 'border-green-500 bg-green-50 dark:bg-green-950';
              else if (i === answered) cls = 'border-red-500 bg-red-50 dark:bg-red-950';
            }
            return (
              <button
                key={i}
                onClick={() => { if (answered !== null) return; setAnswered(i); if (i === q.correctIndex) setScore(s => s + 1); }}
                disabled={answered !== null}
                className={`w-full text-left p-3 rounded-lg border text-sm flex items-center gap-2 transition-colors ${cls}`}
              >
                {answered !== null && i === q.correctIndex && <Check className="w-4 h-4 text-green-500 shrink-0" />}
                {answered !== null && i === answered && i !== q.correctIndex && <X className="w-4 h-4 text-red-500 shrink-0" />}
                {opt}
              </button>
            );
          })}
        </div>
        {answered !== null && (
          <div className="mt-3 space-y-2">
            <div className={`p-3 rounded-lg text-sm font-medium ${answered === q.correctIndex ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300' : 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300'}`}>
              {answered === q.correctIndex ? '✓ 正解！' : '✗ 不正解'}
            </div>
            <div className="p-2 rounded bg-gray-50 dark:bg-gray-900 text-xs text-gray-600 dark:text-gray-400">
              {q.explanation}
            </div>
          </div>
        )}
      </Card>

      {answered !== null && (
        <Button onClick={() => { setCurrent(c => c + 1); setAnswered(null); }} className="w-full">
          {current + 1 >= questions.length ? (en ? 'See Results' : '結果を見る') : (en ? 'Next' : '次の問題')}
        </Button>
      )}
    </div>
  );
}
