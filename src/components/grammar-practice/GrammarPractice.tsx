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
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const questions = useMemo(() => {
    const shuffled = [...GRAMMAR_QUESTIONS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  }, []);

  const handleConfirm = () => {
    if (selected === null || answered !== null) return;
    setAnswered(selected);
    if (selected === questions[current].correctIndex) setScore(s => s + 1);
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (current + 1 >= questions.length) {
      import('@/lib/streak').then(({ onStudyComplete }) => onStudyComplete());
    }
    setCurrent(c => c + 1);
    setSelected(null);
    setAnswered(null);
    setShowResult(false);
  };

  // Finished
  if (current >= questions.length) {
    const percent = Math.round((score / questions.length) * 100);
    return (
      <div className="text-center py-8 px-4 space-y-4">
        <GraduationCap className="w-12 h-12 text-gray-500 mx-auto" />
        <h2 className="text-xl font-bold">{en ? 'Grammar Complete' : '文法学習完了'}</h2>
        <p className="text-3xl font-bold">{score} / {questions.length}</p>
        <p className="text-sm text-gray-500">{en ? `Accuracy: ${percent}%` : `正答率 ${percent}%`}</p>
        <Button onClick={() => { setCurrent(0); setScore(0); setSelected(null); setAnswered(null); setShowResult(false); }}>{en ? 'Try Again' : 'もう一度'}</Button>
      </div>
    );
  }

  const q = questions[current];

  // Result screen
  if (showResult && answered !== null) {
    const isCorrect = answered === q.correctIndex;
    return (
      <div className="space-y-4 px-4">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{q.level === 'toefl' ? 'TOEFL' : q.level === 'eiken_pre1' ? '準1級' : '2級'}</Badge>
          <span className="text-xs text-gray-500">{current + 1} / {questions.length}</span>
        </div>
        <Progress value={((current + 1) / questions.length) * 100} className="h-1.5" />

        <div className={`p-4 rounded-xl text-center text-lg font-bold ${isCorrect ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300' : 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300'}`}>
          {isCorrect ? '✓ 正解！' : '✗ 不正解'}
        </div>

        <Card className="p-4 space-y-3">
          <div>
            <p className="text-[10px] text-gray-500 font-medium mb-1">{en ? 'Question' : '問題文'}</p>
            <p className="text-sm font-mono">{q.question}</p>
          </div>
          <div>
            <p className="text-[10px] text-green-500 font-medium mb-1">{en ? 'Correct Answer' : '正解'}</p>
            <p className="text-sm font-bold text-green-700 dark:text-green-300">{q.options[q.correctIndex]}</p>
          </div>
          {!isCorrect && (
            <div>
              <p className="text-[10px] text-red-500 font-medium mb-1">{en ? 'Your Answer' : 'あなたの回答'}</p>
              <p className="text-sm text-red-700 dark:text-red-300 line-through">{q.options[answered]}</p>
            </div>
          )}
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
            <p className="text-[10px] text-gray-500 font-medium mb-1">{en ? 'Explanation' : '解説'}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{q.explanation}</p>
          </div>
        </Card>

        <Button onClick={nextQuestion} className="w-full">
          {current + 1 >= questions.length ? (en ? 'See Results' : '結果を見る') : (en ? 'Next Question' : '次の問題へ')}
        </Button>
      </div>
    );
  }

  // Question screen (select + confirm)
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
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-full text-left p-3 rounded-lg border text-sm transition-colors ${
                selected === i
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </Card>

      <Button onClick={handleConfirm} disabled={selected === null} className="w-full">
        {en ? 'Confirm' : '決定'}
      </Button>
    </div>
  );
}
