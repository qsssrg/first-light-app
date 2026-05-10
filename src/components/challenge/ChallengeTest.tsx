'use client';

import { useState, useCallback } from 'react';
import { db } from '@/lib/db';
import { getStageVocab } from '@/lib/stage-vocab';
import { shuffle, shuffleOptions } from '@/lib/adaptive';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Check, X } from 'lucide-react';

interface Props {
  stageId: string;
  onTestComplete?: (passed: boolean) => void;
}

interface Question {
  word: string;
  correctMeaning: string;
  options: string[];
  correctIndex: number;
}

function generateQuestions(stageId: string, count = 10): Question[] {
  const vocab = getStageVocab(stageId);
  if (vocab.length === 0) return [];

  const shuffled = [...vocab].sort(() => Math.random() - 0.5).slice(0, count);
  return shuffled.map(v => {
    const others = shuffle(vocab.filter(o => o.word !== v.word)).slice(0, 3);
    const rawOptions = [...others.map(o => o.meaning), v.meaning];
    const { options, correctIndex } = shuffleOptions(rawOptions, rawOptions.length - 1);
    return {
      word: v.word,
      correctMeaning: v.meaning,
      options,
      correctIndex,
    };
  });
}

export function ChallengeTest({ stageId, onTestComplete }: Props) {
  const [questions] = useState(() => generateQuestions(stageId));
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [startTime] = useState(Date.now());

  const handleAnswer = useCallback((index: number) => {
    if (answered !== null) return;
    setAnswered(index);
    const correct = index === questions[current].correctIndex;
    if (correct) setScore(s => s + 1);

    setTimeout(() => {
      if (current + 1 >= questions.length) {
        setFinished(true);
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        const finalScore = correct ? score + 1 : score;
        const passed = (finalScore / questions.length) >= 0.8;
        onTestComplete?.(passed);
        db.challengeResults.add({
          stageId,
          date: new Date(),
          score: finalScore,
          totalQuestions: questions.length,
          timeSpent,
          passed: (finalScore / questions.length) >= 0.8,
        });
        // Update streak on study completion
        import('@/lib/streak').then(({ onStudyComplete }) => onStudyComplete());
      } else {
        setCurrent(c => c + 1);
        setAnswered(null);
      }
    }, 1000);
  }, [answered, current, questions, score, startTime, stageId]);

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">このステージの問題はまだ準備中です</p>
      </div>
    );
  }

  if (finished) {
    const percent = Math.round((score / questions.length) * 100);
    const passed = percent >= 80;
    return (
      <div className="text-center py-8 space-y-4 px-4">
        <Trophy className={`w-16 h-16 mx-auto ${passed ? 'text-yellow-500' : 'text-gray-400'}`} />
        <h2 className="text-xl font-bold">{passed ? 'クリア！' : 'もう少し！'}</h2>
        <p className="text-3xl font-bold">{score} / {questions.length}</p>
        <p className="text-sm text-gray-500">正答率 {percent}%</p>
        {passed ? (
          <p className="text-sm text-green-600">ステージクリアの基準（80%）を達成しました</p>
        ) : (
          <p className="text-sm text-gray-500">80%以上でクリアです。もう一度挑戦しよう</p>
        )}
        <Button onClick={() => { setCurrent(0); setScore(0); setAnswered(null); setFinished(false); }}>
          もう一度
        </Button>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="space-y-4 px-4">
      <div className="space-y-1">
        <Progress value={((current + 1) / questions.length) * 100} className="h-1.5" />
        <p className="text-xs text-gray-500 text-right">{current + 1} / {questions.length}</p>
      </div>

      <Card className="p-6 text-center">
        <p className="text-xs text-gray-400 mb-2">この単語の意味は？</p>
        <h3 className="text-2xl font-bold mb-6">{q.word}</h3>

        <div className="space-y-2">
          {q.options.map((opt, i) => {
            let btnClass = 'border-gray-200 dark:border-gray-700 hover:border-blue-400';
            if (answered !== null) {
              if (i === q.correctIndex) btnClass = 'border-green-500 bg-green-50 dark:bg-green-950';
              else if (i === answered) btnClass = 'border-red-500 bg-red-50 dark:bg-red-950';
            }
            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={answered !== null}
                className={`w-full text-left p-3 rounded-lg border transition-colors text-sm flex items-center gap-2 ${btnClass}`}
              >
                {answered !== null && i === q.correctIndex && <Check className="w-4 h-4 text-green-500 flex-shrink-0" />}
                {answered !== null && i === answered && i !== q.correctIndex && <X className="w-4 h-4 text-red-500 flex-shrink-0" />}
                {opt}
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
