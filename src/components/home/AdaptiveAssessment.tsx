'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import { getMember } from '@/lib/members';
import { db } from '@/lib/db';
import { initProfile } from '@/lib/hooks';
import { generateInitialCards } from '@/lib/sample-vocab';
import { getPlayerName } from '@/lib/player-name';
import { setStudyGoal } from '@/lib/study-goals';
import {
  ASSESSMENT_QUESTIONS, GRADE_ORDER, GRADE_LABELS, TOEFL_SCORE_MAP,
  determineGrade, type AssessmentQuestion
} from '@/lib/assessment-questions';
import { CheckCircle, Trophy } from 'lucide-react';

interface AdaptiveAssessmentProps {
  onComplete: () => void;
}

export function AdaptiveAssessment({ onComplete }: AdaptiveAssessmentProps) {
  const [phase, setPhase] = useState<'test' | 'result'>('test');
  const [currentGradeIdx, setCurrentGradeIdx] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [results, setResults] = useState<Record<string, { correct: number; total: number }>>({});
  const [consecutiveFails, setConsecutiveFails] = useState(0);

  // Get questions for current grade
  const currentGrade = GRADE_ORDER[currentGradeIdx];
  const gradeQuestions = useMemo(() =>
    ASSESSMENT_QUESTIONS.filter(q => q.grade === currentGrade),
    [currentGrade]
  );
  const currentQuestion = gradeQuestions[questionIdx];

  const totalAnswered = Object.values(results).reduce((sum, r) => sum + r.total, 0);
  const totalQuestions = ASSESSMENT_QUESTIONS.length;

  const handleAnswer = () => {
    if (selected === null || !currentQuestion) return;

    const isCorrect = selected === currentQuestion.correctIndex;
    const gradeResults = results[currentGrade] || { correct: 0, total: 0 };
    const newResults = {
      ...results,
      [currentGrade]: {
        correct: gradeResults.correct + (isCorrect ? 1 : 0),
        total: gradeResults.total + 1,
      },
    };
    setResults(newResults);
    setShowAnswer(true);

    const newFails = isCorrect ? 0 : consecutiveFails + 1;
    setConsecutiveFails(newFails);

    // After showing answer, advance
    setTimeout(() => {
      setShowAnswer(false);
      setSelected(null);

      const nextQIdx = questionIdx + 1;
      if (nextQIdx < gradeQuestions.length) {
        // More questions in this grade
        setQuestionIdx(nextQIdx);
      } else {
        // Grade complete — check if we should advance or stop
        const gradeRate = newResults[currentGrade]!.correct / newResults[currentGrade]!.total;

        if (gradeRate < 0.67 || currentGradeIdx >= GRADE_ORDER.length - 1) {
          // Failed this grade or completed all grades
          setPhase('result');
        } else {
          // Passed — advance to next grade
          setCurrentGradeIdx(currentGradeIdx + 1);
          setQuestionIdx(0);
        }
      }
    }, 1500);
  };

  // === RESULT SCREEN ===
  if (phase === 'result') {
    const { grade, toeflScore, details } = determineGrade(results);
    const kai = getMember('kai')!;
    const name = getPlayerName() || 'マネージャー';

    const handleFinish = async () => {
      // Save profile
      await initProfile(getPlayerName() || '');
      const profile = await db.userProfile.toCollection().first();
      if (profile?.id) {
        const skillMap: Record<string, number> = {};
        for (const [g, rate] of Object.entries(details)) {
          const idx = GRADE_ORDER.indexOf(g as any);
          const baseSkill = Math.min(100, (idx + 1) * 12 + Math.round(rate * 0.3));
          skillMap[g] = baseSkill;
        }
        const avgSkill = Math.round(Object.values(skillMap).reduce((a, b) => a + b, 0) / Math.max(1, Object.keys(skillMap).length));
        await db.userProfile.update(profile.id, {
          skills: {
            vocabulary: avgSkill,
            reading: Math.max(avgSkill - 5, 0),
            listening: Math.max(avgSkill - 10, 0),
            writing: Math.max(avgSkill - 10, 0),
            grammar: avgSkill,
          },
          learnerType: 'balanced',
        });
      }

      // Auto-set study goal based on result
      const gradeIdx = GRADE_ORDER.indexOf(grade as any);
      const targetGradeIdx = Math.min(gradeIdx + 1, GRADE_ORDER.length - 1);
      const targetGrade = GRADE_ORDER[targetGradeIdx];
      if (targetGrade === 'toefl') {
        setStudyGoal({ eiken: 'pre1', toeflTarget: toeflScore + 10 });
      } else {
        setStudyGoal({ eiken: targetGrade as any, toeflTarget: 'auto' });
      }

      // Add initial vocab cards
      const cards = generateInitialCards();
      await db.vocabCards.bulkAdd(cards as any[]);
      onComplete();
    };

    return (
      <div className="px-4 py-8 space-y-6 max-w-md md:max-w-xl lg:max-w-2xl mx-auto text-center">
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto" />
        <h2 className="text-2xl font-black">レベル判定完了！</h2>

        <Card className="p-6">
          <p className="text-lg font-bold text-indigo-500 mb-2">あなたの現在のレベル</p>
          <p className="text-3xl font-black">{GRADE_LABELS[grade]}相当</p>
          <p className="text-sm text-gray-500 mt-2">TOEFL予想スコア: {toeflScore}点</p>
        </Card>

        {/* Grade breakdown */}
        <Card className="p-4 text-left">
          <h3 className="text-sm font-bold mb-3">各級の正答率</h3>
          <div className="space-y-2">
            {GRADE_ORDER.map(g => {
              const r = details[g];
              if (r === undefined) return null;
              return (
                <div key={g} className="flex items-center gap-2">
                  <span className="text-xs w-16 shrink-0">{GRADE_LABELS[g]}</span>
                  <Progress value={r} className="h-2 flex-1" />
                  <span className="text-xs text-gray-500 w-10 text-right">{r}%</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Kai's comment */}
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <MemberAvatar member={kai} size="md" />
            <div className="flex-1 text-left">
              <p className="text-xs text-gray-500 mb-1">{kai.nameJa}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {name}のレベルが分かった。{GRADE_LABELS[grade]}相当だ。
                次は{GRADE_LABELS[GRADE_ORDER[Math.min(GRADE_ORDER.indexOf(grade as any) + 1, GRADE_ORDER.length - 1)]]}を目指そう。
                俺たちも一緒に頑張るから。
              </p>
            </div>
          </div>
        </Card>

        <Button onClick={handleFinish} className="w-full max-w-xs">
          学習を始める
        </Button>
      </div>
    );
  }

  // === TEST SCREEN ===
  if (!currentQuestion) return null;

  return (
    <div className="px-4 py-8 space-y-6 max-w-md md:max-w-xl lg:max-w-2xl mx-auto">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{GRADE_LABELS[currentGrade]}</Badge>
          <span className="text-xs text-gray-500">
            {totalAnswered + 1} / ~{totalQuestions}
          </span>
        </div>
        <Progress value={(totalAnswered / totalQuestions) * 100} className="h-1.5" />
      </div>

      <Card className="p-6 md:p-8">
        <p className="text-xs text-gray-400 mb-2">
          {currentQuestion.type === 'vocab' ? '語彙' : currentQuestion.type === 'grammar' ? '文法' : '読解'}
        </p>
        <h3 className="text-sm md:text-base font-medium mb-4">{currentQuestion.question}</h3>
        <div className="space-y-3">
          {currentQuestion.options.map((opt, i) => {
            let extraClass = '';
            if (showAnswer) {
              if (i === currentQuestion.correctIndex) extraClass = 'border-green-500 bg-green-50 dark:bg-green-950';
              else if (i === selected) extraClass = 'border-red-500 bg-red-50 dark:bg-red-950';
            }
            return (
              <button
                key={i}
                onClick={() => !showAnswer && setSelected(i)}
                disabled={showAnswer}
                className={`w-full text-left p-3 md:p-4 rounded-lg border transition-colors text-sm md:text-base ${
                  showAnswer ? extraClass :
                  selected === i
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
                }`}
              >
                {opt}
                {showAnswer && i === currentQuestion.correctIndex && (
                  <CheckCircle className="w-4 h-4 text-green-500 inline ml-2" />
                )}
              </button>
            );
          })}
        </div>
      </Card>

      {!showAnswer && (
        <Button onClick={handleAnswer} disabled={selected === null} className="w-full">
          決定
        </Button>
      )}
    </div>
  );
}
