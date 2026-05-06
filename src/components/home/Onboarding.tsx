'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { db } from '@/lib/db';
import { initProfile } from '@/lib/hooks';
import { generateInitialCards } from '@/lib/sample-vocab';
import { getPlayerName } from '@/lib/player-name';
import { MEMBERS } from '@/lib/members';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import type { SkillAxis, LearnerType } from '@/types';

interface Question {
  axis: SkillAxis;
  question: string;
  options: { text: string; score: number }[];
}

export const ASSESSMENT_QUESTIONS: Question[] = [
  {
    axis: 'vocabulary',
    question: '英単語を見たとき、どのくらい意味がわかりますか？',
    options: [
      { text: '基本的な単語（dog, run等）ならわかる', score: 20 },
      { text: '日常会話レベル（appointment, significant等）はOK', score: 50 },
      { text: '学術的な単語（hypothesis, paradigm等）もわかる', score: 80 },
    ],
  },
  {
    axis: 'reading',
    question: '英語の文章をどのくらい読めますか？',
    options: [
      { text: '短い文（SNSの投稿等）なら読める', score: 20 },
      { text: 'ニュース記事をだいたい理解できる', score: 50 },
      { text: '学術論文や小説を原文で読める', score: 80 },
    ],
  },
  {
    axis: 'listening',
    question: '英語を聞いたとき、どのくらい理解できますか？',
    options: [
      { text: 'ゆっくり話してもらえればなんとか', score: 20 },
      { text: '映画やドラマを字幕なしで半分くらい', score: 50 },
      { text: 'ネイティブ同士の会話も問題ない', score: 80 },
    ],
  },
  {
    axis: 'writing',
    question: '英語でどのくらい書けますか？',
    options: [
      { text: '簡単な自己紹介くらい', score: 20 },
      { text: 'メールやSNSで自分の考えを伝えられる', score: 50 },
      { text: 'エッセイやレポートを論理的に書ける', score: 80 },
    ],
  },
  {
    axis: 'grammar',
    question: '英文法についてどう感じますか？',
    options: [
      { text: '主語+動詞くらいはわかるが不安', score: 20 },
      { text: '基本的な時制や受動態は使える', score: 50 },
      { text: '仮定法や分詞構文も理解している', score: 80 },
    ],
  },
];

export function determineLearnerType(skills: Record<SkillAxis, number>): LearnerType {
  const entries = Object.entries(skills) as [SkillAxis, number][];
  const max = entries.reduce((a, b) => b[1] > a[1] ? b : a);
  const min = entries.reduce((a, b) => b[1] < a[1] ? b : a);
  const range = max[1] - min[1];

  if (range <= 20) return 'balanced';

  const typeMap: Record<SkillAxis, LearnerType> = {
    vocabulary: 'word-master',
    reading: 'reader',
    listening: 'listener',
    writing: 'writer',
    grammar: 'analyst',
  };
  return typeMap[max[0]];
}

export function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<'intro' | 'assessment' | 'result'>('intro');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<SkillAxis, number>>({
    vocabulary: 0, reading: 0, listening: 0, writing: 0, grammar: 0,
  });

  const handleAnswer = (axis: SkillAxis, score: number) => {
    setScores(prev => ({ ...prev, [axis]: score }));
    if (questionIndex < ASSESSMENT_QUESTIONS.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setStep('result');
    }
  };

  const handleFinish = async () => {
    const learnerType = determineLearnerType(scores);
    await initProfile(getPlayerName() || '');
    const profile = await db.userProfile.toCollection().first();
    if (profile?.id) {
      await db.userProfile.update(profile.id, {
        skills: scores,
        learnerType,
      });
    }
    // Add initial vocab cards
    const cards = generateInitialCards();
    await db.vocabCards.bulkAdd(cards as any[]);
    onComplete();
  };

  if (step === 'intro') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">FIRST LIGHT</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            5人のメンバーと一緒に、英語力を伸ばそう
          </p>
        </div>
        <div className="flex gap-2">
          {MEMBERS.map(m => (
            <MemberAvatar key={m.id} member={m} size="sm" />
          ))}
        </div>
        <Button onClick={() => setStep('assessment')} className="w-full max-w-xs">
          はじめる
        </Button>
      </div>
    );
  }

  if (step === 'assessment') {
    const q = ASSESSMENT_QUESTIONS[questionIndex];
    return (
      <div className="px-4 py-8 space-y-6 max-w-md mx-auto">
        <div className="space-y-2">
          <Progress value={((questionIndex + 1) / ASSESSMENT_QUESTIONS.length) * 100} className="h-1.5" />
          <p className="text-xs text-gray-500 text-right">{questionIndex + 1} / {ASSESSMENT_QUESTIONS.length}</p>
        </div>
        <Card className="p-6">
          <h3 className="text-sm font-medium mb-4">{q.question}</h3>
          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(q.axis, opt.score)}
                className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors text-sm"
              >
                {opt.text}
              </button>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  // Result
  const learnerType = determineLearnerType(scores);
  const strongAxis = (Object.entries(scores) as [SkillAxis, number][])
    .reduce((a, b) => b[1] > a[1] ? b : a)[0];
  const strongMember = MEMBERS.find(m => m.axis === strongAxis)!;

  return (
    <div className="px-4 py-8 space-y-6 max-w-md mx-auto text-center">
      <h2 className="text-xl font-bold">レベル判定完了！</h2>
      <MemberAvatar member={strongMember} size="xl" showName />
      <p className="text-sm text-gray-600 dark:text-gray-400">
        あなたのタイプは <span className="font-bold">{learnerType}</span>
      </p>
      <Card className="p-4 text-left">
        <div className="space-y-2">
          {(Object.entries(scores) as [SkillAxis, number][]).map(([axis, score]) => {
            const member = MEMBERS.find(m => m.axis === axis);
            return (
              <div key={axis} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: member?.color }} />
                <span className="text-xs flex-1">{member?.role}</span>
                <span className="text-xs font-medium">{score}</span>
              </div>
            );
          })}
        </div>
      </Card>
      <p className="text-xs text-gray-500">
        {strongMember.nameJa}があなたの得意分野をサポートします。苦手な分野は他のメンバーが一緒に頑張ります。
      </p>
      <Button onClick={handleFinish} className="w-full max-w-xs">
        学習を始める
      </Button>
    </div>
  );
}
