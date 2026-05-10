'use client';

import { useState, useMemo } from 'react';
import { READING_QUESTIONS } from '@/lib/reading-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen } from 'lucide-react';
import { useProfile } from '@/lib/hooks';

type Mode = 'quiz' | 'quiz-result' | 'result';

export function ReadingPractice() {
  const profile = useProfile();
  const en = profile?.settings?.englishSpeakerMode ?? false;
  const [mode, setMode] = useState<Mode>('quiz');
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const questions = useMemo(() => {
    const shuffled = [...READING_QUESTIONS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  }, []);

  const handleSelect = (index: number) => {
    if (answered !== null) return;
    setSelected(index);
  };

  const handleConfirm = () => {
    if (selected === null || answered !== null) return;
    setAnswered(selected);
    if (selected === questions[current].correctIndex) setScore(s => s + 1);
    setMode('quiz-result');
  };

  const nextQuestion = () => {
    if (current + 1 >= questions.length) {
      setMode('result');
      import('@/lib/streak').then(({ onStudyComplete }) => onStudyComplete());
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(null);
      setMode('quiz');
    }
  };

  // Final result
  if (mode === 'result') {
    const percent = Math.round((score / questions.length) * 100);
    return (
      <div className="text-center py-8 px-4 space-y-4">
        <BookOpen className="w-12 h-12 text-green-500 mx-auto" />
        <h2 className="text-xl font-bold">{en ? 'Reading Complete' : 'リーディング完了'}</h2>
        <p className="text-3xl font-bold">{score} / {questions.length}</p>
        <p className="text-sm text-gray-500">{en ? `Accuracy: ${percent}%` : `正答率 ${percent}%`}</p>
        <Button onClick={() => { setCurrent(0); setScore(0); setSelected(null); setAnswered(null); setMode('quiz'); }}>{en ? 'Try Again' : 'もう一度'}</Button>
      </div>
    );
  }

  // Quiz-result mode (after pressing 決定)
  if (mode === 'quiz-result') {
    const q = questions[current];
    const isCorrect = answered === q.correctIndex;

    return (
      <div className="space-y-4 px-4">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{q.level === 'toefl' ? 'TOEFL' : q.level === 'eiken_pre1' ? '準1級' : '2級'}</Badge>
          <span className="text-xs text-gray-500">{current + 1} / {questions.length}</span>
        </div>

        <Progress value={((current + 1) / questions.length) * 100} className="h-1.5" />

        {/* Result indicator */}
        <div className={`p-4 rounded-xl text-center font-bold text-lg ${isCorrect ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'}`}>
          {isCorrect ? (en ? 'Correct!' : '正解！') : (en ? 'Incorrect' : '不正解')}
        </div>

        {/* English passage */}
        <Card className="p-4 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/50">
          <p className="text-xs text-blue-500 font-bold mb-2">{en ? 'Passage' : '英文'}</p>
          <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{q.passage}</p>
        </Card>

        {/* Explanation (Japanese translation / context) */}
        <Card className="p-4 border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
          <p className="text-xs text-gray-500 font-bold mb-2">{en ? 'Explanation' : '解説'}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{q.explanation}</p>
        </Card>

        {/* Next button */}
        <Button onClick={nextQuestion} className="w-full" size="lg">
          {current + 1 >= questions.length ? (en ? 'View Results' : '結果を見る') : (en ? 'Next Question' : '次の問題へ')}
        </Button>
      </div>
    );
  }

  // Quiz mode
  const q = questions[current];

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
          {q.options.map((opt, i) => {
            let cls = 'border-gray-200 dark:border-gray-700 hover:border-green-400';
            if (selected === i) cls = 'border-green-500 bg-green-50 dark:bg-green-950 ring-2 ring-green-300 dark:ring-green-700';
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`w-full text-left p-3 rounded-lg border text-sm flex items-center gap-2 transition-colors ${cls}`}
              >
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold ${selected === i ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300 text-gray-400'}`}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Confirm button */}
        <Button
          onClick={handleConfirm}
          disabled={selected === null}
          className="w-full mt-4 bg-green-600 hover:bg-green-700 disabled:opacity-40"
          size="lg"
        >
          {en ? 'Confirm' : '決定'}
        </Button>
      </Card>
    </div>
  );
}
