'use client';

import { useState, useMemo } from 'react';
import { READING_QUESTIONS } from '@/lib/reading-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Check, X, BookOpen } from 'lucide-react';
import { useProfile } from '@/lib/hooks';

export function ReadingPractice() {
  const profile = useProfile();
  const en = profile?.settings?.englishSpeakerMode ?? false;
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);

  const questions = useMemo(() => {
    const shuffled = [...READING_QUESTIONS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  }, []);

  const handleConfirm = () => {
    if (selected === null) return;
    setConfirmed(true);
    if (selected === questions[current].correctIndex) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      import('@/lib/streak').then(({ onStudyComplete }) => onStudyComplete());
    }
    setCurrent(c => c + 1);
    setSelected(null);
    setConfirmed(false);
  };

  // Finished
  if (current >= questions.length) {
    const percent = Math.round((score / questions.length) * 100);
    return (
      <div className="text-center py-8 px-4 space-y-4">
        <BookOpen className="w-12 h-12 text-green-500 mx-auto" />
        <h2 className="text-xl font-bold">{en ? 'Reading Complete' : 'リーディング完了'}</h2>
        <p className="text-3xl font-bold">{score} / {questions.length}</p>
        <p className="text-sm text-gray-500">{en ? `Accuracy: ${percent}%` : `正答率 ${percent}%`}</p>
        <Button onClick={() => { setCurrent(0); setScore(0); setSelected(null); setConfirmed(false); }}>{en ? 'Try Again' : 'もう一度'}</Button>
      </div>
    );
  }

  const q = questions[current];
  const isCorrect = selected === q.correctIndex;

  // Result screen (after confirming)
  if (confirmed) {
    return (
      <div className="space-y-4 px-4">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{q.level === 'toefl' ? 'TOEFL' : q.level === 'eiken_pre1' ? '準1級' : '2級'}</Badge>
          <span className="text-xs text-gray-500">{current + 1} / {questions.length}</span>
        </div>
        <Progress value={((current + 1) / questions.length) * 100} className="h-1.5" />

        {/* Result */}
        <div className={`p-4 rounded-xl text-center ${isCorrect ? 'bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800'}`}>
          {isCorrect
            ? <Check className="w-10 h-10 text-green-500 mx-auto mb-2" />
            : <X className="w-10 h-10 text-red-500 mx-auto mb-2" />}
          <p className={`text-lg font-bold ${isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
            {isCorrect ? (en ? 'Correct!' : '正解！') : (en ? 'Incorrect' : '不正解')}
          </p>
          {!isCorrect && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {en ? 'Answer' : '正解'}: {q.options[q.correctIndex]}
            </p>
          )}
        </div>

        {/* Passage (English) */}
        <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <p className="text-[10px] text-blue-500 font-medium mb-1">{en ? 'Passage' : '英文'}</p>
          <p className="text-sm leading-relaxed">{q.passage}</p>
        </Card>

        {/* Explanation (Japanese) */}
        <Card className="p-4 bg-gray-50 dark:bg-gray-900">
          <p className="text-[10px] text-gray-500 font-medium mb-1">{en ? 'Explanation' : '解説'}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{q.explanation}</p>
        </Card>

        <Button onClick={handleNext} className="w-full">
          {current + 1 >= questions.length ? (en ? 'See Results' : '結果を見る') : (en ? 'Next Question' : '次の問題へ')}
        </Button>
      </div>
    );
  }

  // Question screen (before confirming)
  return (
    <div className="space-y-4 px-4">
      <div className="flex items-center justify-between">
        <Badge variant="secondary">{q.level === 'toefl' ? 'TOEFL' : q.level === 'eiken_pre1' ? '準1級' : '2級'}</Badge>
        <span className="text-xs text-gray-500">{current + 1} / {questions.length}</span>
      </div>
      <Progress value={((current + 1) / questions.length) * 100} className="h-1.5" />

      {/* Passage */}
      <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <p className="text-sm leading-relaxed">{q.passage}</p>
      </Card>

      {/* Question + Options */}
      <Card className="p-4">
        <p className="text-sm font-medium mb-3">{q.question}</p>
        <div className="space-y-2">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-full text-left p-3 rounded-lg border text-sm transition-colors ${
                selected === i
                  ? 'border-green-500 bg-green-50 dark:bg-green-950'
                  : 'border-gray-200 dark:border-gray-700 hover:border-green-400'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </Card>

      <Button
        onClick={handleConfirm}
        disabled={selected === null}
        className="w-full"
      >
        {en ? 'Confirm' : '決定'}
      </Button>
    </div>
  );
}
