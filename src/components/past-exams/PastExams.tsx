'use client';

import { useState } from 'react';
import { PAST_EXAM_QUESTIONS } from '@/lib/past-exams';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { useProfile } from '@/lib/hooks';
import type { PastExamQuestion } from '@/types';

type Filter = 'all' | 'eiken2' | 'eiken_pre1' | 'toefl';

const FILTER_LABELS: Record<Filter, string> = {
  all: 'すべて', eiken2: '英検2級', eiken_pre1: '英検準1級', toefl: 'TOEFL',
};
const FILTER_LABELS_EN: Record<Filter, string> = {
  all: 'All', eiken2: 'Eiken Grade 2', eiken_pre1: 'Eiken Pre-1', toefl: 'TOEFL',
};

export function PastExams() {
  const profile = useProfile();
  const en = profile?.settings?.englishSpeakerMode ?? false;
  const [filter, setFilter] = useState<Filter>('all');
  const [answeredMap, setAnsweredMap] = useState<Record<string, number>>({});

  const questions = filter === 'all'
    ? PAST_EXAM_QUESTIONS
    : PAST_EXAM_QUESTIONS.filter(q => q.source === filter);

  const handleAnswer = (questionId: string, index: number) => {
    if (answeredMap[questionId] !== undefined) return;
    setAnsweredMap(prev => ({ ...prev, [questionId]: index }));
  };

  return (
    <div className="space-y-4 px-4">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-600 via-gray-500 to-zinc-400 p-5 text-white shadow-lg mb-2">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
        <div className="relative">
          <h2 className="text-xl font-black tracking-wide">{en ? 'Past Exams' : '過去問ライブラリ'}</h2>
          <p className="text-xs opacity-60 mt-0.5">Past Exams</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {(Object.entries(en ? FILTER_LABELS_EN : FILTER_LABELS) as [Filter, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors ${
              filter === key ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Questions */}
      <div className="space-y-3">
        {questions.map(q => (
          <QuestionCard
            key={q.id}
            question={q}
            answered={answeredMap[q.id]}
            onAnswer={(i) => handleAnswer(q.id, i)}
          />
        ))}
      </div>

      <p className="text-xs text-gray-400 text-center py-4">
        出典: 英検®・TOEFL® 過去問題より（学習目的で引用）
      </p>
    </div>
  );
}

function QuestionCard({ question, answered, onAnswer }: {
  question: PastExamQuestion;
  answered: number | undefined;
  onAnswer: (i: number) => void;
}) {
  const sourceLabel = { eiken2: '英検2級', eiken_pre1: '準1級', toefl: 'TOEFL' }[question.source];
  const isAnswered = answered !== undefined;
  const isCorrect = answered === question.correctIndex;

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="secondary" className="text-[10px]">{sourceLabel}</Badge>
        <span className="text-[10px] text-gray-400">{question.year} - {question.section}</span>
      </div>

      <p className="text-sm mb-3">{question.question}</p>

      <div className="space-y-1.5">
        {question.options.map((opt, i) => {
          let className = 'border-gray-200 dark:border-gray-700';
          if (isAnswered) {
            if (i === question.correctIndex) className = 'border-green-500 bg-green-50 dark:bg-green-950';
            else if (i === answered) className = 'border-red-500 bg-red-50 dark:bg-red-950';
          }
          return (
            <button
              key={i}
              onClick={() => onAnswer(i)}
              disabled={isAnswered}
              className={`w-full text-left p-2 rounded border transition-colors text-xs flex items-center gap-2 ${className}`}
            >
              {isAnswered && i === question.correctIndex && <Check className="w-3 h-3 text-green-500 flex-shrink-0" />}
              {isAnswered && i === answered && i !== question.correctIndex && <X className="w-3 h-3 text-red-500 flex-shrink-0" />}
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className={`mt-3 p-2 rounded text-xs ${isCorrect ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300' : 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300'}`}>
          {question.explanation}
        </div>
      )}
    </Card>
  );
}
