'use client';

import { useState } from 'react';
import { BottomNav } from '@/components/common/BottomNav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import { getMember } from '@/lib/members';
import { EXPERIMENTS } from '@/data/psychology/experiments';
import { FlaskConical, Play, CheckCircle } from 'lucide-react';

const MEMBER_FOR_EXPERIMENT: Record<string, string> = {
  'asch-conformity': 'haruto',
  'milgram-obedience': 'kai',
  'bystander-effect': 'yuuki',
  'cognitive-dissonance': 'ren',
  'prisoners-dilemma': 'sora',
};

export default function ExperimentsPage() {
  const [activeExperiment, setActiveExperiment] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [choices, setChoices] = useState<string[]>([]);
  const [showReveal, setShowReveal] = useState(false);

  const experiment = activeExperiment ? EXPERIMENTS.find(e => e.id === activeExperiment) : null;

  if (experiment && activeExperiment) {
    const step = experiment.steps[currentStep];
    if (!step) {
      // Experiment complete
      return (
        <div className="pb-20">
          <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto py-6 px-4 space-y-6">
            <h2 className="text-lg font-bold">追体験完了</h2>
            <Card className="p-6 text-center">
              <FlaskConical className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{experiment.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{experiment.takeaway}</p>
              <Button onClick={() => { setActiveExperiment(null); setCurrentStep(0); setChoices([]); }}>
                実験一覧に戻る
              </Button>
            </Card>
          </div>
          <BottomNav />
        </div>
      );
    }

    return (
      <div className="pb-20">
        <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto py-6 px-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold">{experiment.title}</h2>
            <span className="text-xs text-gray-500">Step {currentStep + 1}/{experiment.steps.length}</span>
          </div>

          <Card className="p-5">
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{step.situation}</p>
            <h3 className="text-sm font-bold mb-3">{step.question}</h3>

            {!showReveal ? (
              <div className="space-y-2">
                {step.choices.map(choice => (
                  <button
                    key={choice.id}
                    onClick={() => { setChoices([...choices, choice.id]); setShowReveal(true); }}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950 transition-colors text-sm"
                  >
                    {choice.text}
                    <span className="text-xs text-gray-400 ml-2">({choice.percentage}%が選択)</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-purple-50 dark:bg-purple-950/30 rounded-lg p-4">
                  <h4 className="text-sm font-bold text-purple-700 dark:text-purple-300 mb-2">{step.reveal.title}</h4>
                  <p className="text-xs text-purple-600 dark:text-purple-400">{step.reveal.description}</p>
                </div>
                <Button onClick={() => { setShowReveal(false); setCurrentStep(currentStep + 1); }} className="w-full">
                  次へ
                </Button>
              </div>
            )}
          </Card>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Experiment list
  return (
    <div className="pb-20">
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto py-6 px-4 space-y-4">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-fuchsia-600 via-purple-500 to-violet-400 p-5 text-white shadow-lg mb-2">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
        <div className="relative">
          <h2 className="text-xl font-black tracking-wide">追体験モジュール</h2>
          <p className="text-xs opacity-60 mt-0.5">Experiments</p>
        </div>
      </div>
        <p className="text-xs text-gray-500">5つの有名な心理学実験を追体験しよう</p>

        <div className="space-y-3">
          {EXPERIMENTS.map(exp => {
            const memberId = MEMBER_FOR_EXPERIMENT[exp.id] || 'kai';
            const member = getMember(memberId);
            return (
              <Card key={exp.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  {member && <MemberAvatar member={member} size="md" />}
                  <div className="flex-1">
                    <h3 className="text-sm font-bold">{exp.title}</h3>
                    <p className="text-xs text-gray-500">{exp.intro}</p>
                    <p className="text-xs text-gray-400 mt-1">{exp.steps.length}ステップ</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => setActiveExperiment(exp.id)}>
                    <Play className="w-3 h-3 mr-1" /> 開始
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
