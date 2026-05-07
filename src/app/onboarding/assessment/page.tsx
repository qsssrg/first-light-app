'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { VNEngine } from '@/components/vn/VNEngine';
import { preAssessmentScenario, postAssessmentScenario } from '@/lib/scenarios/opening';
import { AdaptiveAssessment } from '@/components/home/AdaptiveAssessment';

export default function AssessmentPage() {
  const [phase, setPhase] = useState<'pre-story' | 'assessment' | 'result'>('pre-story');
  const router = useRouter();

  if (phase === 'pre-story') {
    return (
      <VNEngine
        scenario={preAssessmentScenario}
        onComplete={() => setPhase('assessment')}
        skippable
      />
    );
  }

  if (phase === 'assessment') {
    return (
      <AdaptiveAssessment
        onComplete={() => setPhase('result')}
      />
    );
  }

  return (
    <VNEngine
      scenario={postAssessmentScenario}
      onComplete={() => router.push('/dashboard')}
    />
  );
}
