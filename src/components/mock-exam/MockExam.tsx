'use client';

import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Clock, Check, X } from 'lucide-react';

type ExamType = 'eiken_pre1' | 'toefl';

interface MockQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  section: string;
}

const EIKEN_PRE1_MOCK: MockQuestion[] = [
  { section: '語彙', question: 'The professor\'s lecture was so ( ) that many students fell asleep.', options: ['compelling', 'monotonous', 'provocative', 'enlightening'], correctIndex: 1 },
  { section: '語彙', question: 'The company had to ( ) several employees due to budget cuts.', options: ['recruit', 'dismiss', 'promote', 'transfer'], correctIndex: 1 },
  { section: '語彙', question: 'The negotiations reached an ( ) when neither side would compromise.', options: ['agreement', 'impasse', 'alliance', 'outcome'], correctIndex: 1 },
  { section: '読解', question: 'According to the passage, what is the main advantage of renewable energy?', options: ['It is cheaper', 'It reduces carbon emissions', 'It is more reliable', 'It creates more jobs'], correctIndex: 1 },
  { section: '読解', question: 'The author\'s tone in this passage can best be described as:', options: ['Optimistic', 'Cautiously analytical', 'Dismissive', 'Enthusiastic'], correctIndex: 1 },
  { section: '文法', question: 'Had I known about the delay, I ( ) earlier.', options: ['would leave', 'would have left', 'will leave', 'had left'], correctIndex: 1 },
  { section: '文法', question: 'The proposal, ( ) was submitted last week, has been approved.', options: ['that', 'which', 'what', 'whom'], correctIndex: 1 },
  { section: 'リスニング', question: 'What does the speaker suggest about urban planning?', options: ['It should prioritize cars', 'It needs more public spaces', 'It is too expensive', 'It should be left to citizens'], correctIndex: 1 },
  { section: 'リスニング', question: 'Why does the professor mention ancient Rome?', options: ['To show how old cities are', 'To provide a historical comparison', 'To criticize modern architecture', 'To praise Roman engineers'], correctIndex: 1 },
  { section: 'ライティング', question: 'Which opening sentence best introduces an opinion essay?', options: ['I think...', 'In recent years, the debate over... has intensified.', 'Hello, today I will write about...', 'Many people say...'], correctIndex: 1 },
];

const TOEFL_MOCK: MockQuestion[] = [
  { section: 'Reading', question: 'The word "ubiquitous" in paragraph 2 is closest in meaning to:', options: ['Rare', 'Everywhere', 'Dangerous', 'Ancient'], correctIndex: 1 },
  { section: 'Reading', question: 'What can be inferred from the passage about photosynthesis?', options: ['It only occurs in sunlight', 'It is a simple process', 'It evolved over billions of years', 'It requires high temperatures'], correctIndex: 2 },
  { section: 'Reading', question: 'The author mentions coral reefs in order to:', options: ['Describe ocean beauty', 'Illustrate ecosystem fragility', 'Promote tourism', 'Compare to rainforests'], correctIndex: 1 },
  { section: 'Listening', question: 'What is the main topic of the lecture?', options: ['Medieval history', 'The impact of the printing press', 'Modern publishing', 'Digital literacy'], correctIndex: 1 },
  { section: 'Listening', question: 'According to the professor, what was unexpected about the study\'s results?', options: ['The sample size', 'The correlation was negative', 'Participants improved more than expected', 'The cost was lower'], correctIndex: 2 },
  { section: 'Listening', question: 'Why does the student visit the professor?', options: ['To ask about grades', 'To discuss a research topic', 'To request an extension', 'To complain about the class'], correctIndex: 1 },
  { section: 'Writing', question: 'In a TOEFL integrated essay, what should the first paragraph do?', options: ['State your personal opinion', 'Summarize the reading passage', 'Introduce the topic and preview the contrast', 'List all key vocabulary'], correctIndex: 2 },
  { section: 'Writing', question: 'Which transition best shows contrast?', options: ['Furthermore', 'However', 'In addition', 'Similarly'], correctIndex: 1 },
  { section: 'Speaking', question: 'For TOEFL Speaking Task 1, how long do you have to respond?', options: ['15 seconds', '30 seconds', '45 seconds', '60 seconds'], correctIndex: 2 },
  { section: 'Speaking', question: 'What is the best strategy for TOEFL Speaking Task 2?', options: ['Memorize responses', 'Summarize both the reading and lecture', 'Only discuss the lecture', 'Speak as fast as possible'], correctIndex: 1 },
];

export function MockExam() {
  const [examType, setExamType] = useState<ExamType | null>(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [startTime] = useState(Date.now());

  const questions = examType === 'eiken_pre1' ? EIKEN_PRE1_MOCK : TOEFL_MOCK;

  const startExam = (type: ExamType) => {
    setExamType(type);
    setCurrent(0);
    setAnswers(new Array(type === 'eiken_pre1' ? EIKEN_PRE1_MOCK.length : TOEFL_MOCK.length).fill(null));
    setShowResult(false);
  };

  const handleAnswer = useCallback((index: number) => {
    const newAnswers = [...answers];
    newAnswers[current] = index;
    setAnswers(newAnswers);
  }, [answers, current]);

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setShowResult(true);
    } else {
      setCurrent(current + 1);
    }
  };

  if (!examType) {
    return (
      <div className="space-y-4 px-4">
        <h2 className="text-lg font-bold">模擬試験</h2>
        <p className="text-xs text-gray-500">本番形式で実力を試そう。各10問、制限時間なし。</p>

        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => startExam('eiken_pre1')}>
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-blue-500" />
            <div>
              <h3 className="font-bold">英検準1級 模擬</h3>
              <p className="text-xs text-gray-500">語彙・読解・文法・リスニング・ライティング</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => startExam('toefl')}>
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-orange-500" />
            <div>
              <h3 className="font-bold">TOEFL iBT 模擬</h3>
              <p className="text-xs text-gray-500">Reading・Listening・Writing・Speaking</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (showResult) {
    const score = answers.filter((a, i) => a === questions[i].correctIndex).length;
    const percent = Math.round((score / questions.length) * 100);
    const elapsed = Math.floor((Date.now() - startTime) / 1000);

    return (
      <div className="text-center py-8 px-4 space-y-4">
        <Trophy className={`w-16 h-16 mx-auto ${percent >= 80 ? 'text-yellow-500' : 'text-gray-400'}`} />
        <h2 className="text-xl font-bold">
          {examType === 'eiken_pre1' ? '英検準1級' : 'TOEFL'} 模擬試験結果
        </h2>
        <p className="text-3xl font-bold">{score} / {questions.length}</p>
        <p className="text-sm text-gray-500">正答率 {percent}%</p>
        <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
          <Clock className="w-3 h-3" /> {Math.floor(elapsed / 60)}分{elapsed % 60}秒
        </p>

        {/* Section breakdown */}
        <Card className="p-4 text-left">
          <h3 className="text-sm font-medium mb-2">セクション別</h3>
          {Object.entries(
            questions.reduce((acc, q, i) => {
              if (!acc[q.section]) acc[q.section] = { correct: 0, total: 0 };
              acc[q.section].total++;
              if (answers[i] === q.correctIndex) acc[q.section].correct++;
              return acc;
            }, {} as Record<string, { correct: number; total: number }>)
          ).map(([section, data]) => (
            <div key={section} className="flex justify-between text-xs py-1">
              <span>{section}</span>
              <span className="font-mono">{data.correct}/{data.total}</span>
            </div>
          ))}
        </Card>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setExamType(null)}>戻る</Button>
          <Button onClick={() => startExam(examType)}>もう一度</Button>
        </div>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="space-y-4 px-4">
      <div className="flex items-center justify-between">
        <Badge variant="secondary">{q.section}</Badge>
        <span className="text-xs text-gray-500">{current + 1} / {questions.length}</span>
      </div>

      <Progress value={((current + 1) / questions.length) * 100} className="h-1.5" />

      <Card className="p-6">
        <p className="text-sm mb-4">{q.question}</p>
        <div className="space-y-2">
          {q.options.map((opt, i) => {
            const selected = answers[current] === i;
            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className={`w-full text-left p-3 rounded-lg border text-sm transition-colors ${
                  selected ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </Card>

      <Button onClick={handleNext} disabled={answers[current] === null} className="w-full">
        {current + 1 >= questions.length ? '結果を見る' : '次へ'}
      </Button>
    </div>
  );
}
