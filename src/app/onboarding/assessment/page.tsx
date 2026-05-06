'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { VNEngine } from '@/components/vn/VNEngine';
import { preAssessmentScenario, postAssessmentScenario } from '@/lib/scenarios/opening';
import { Onboarding } from '@/components/home/Onboarding';

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
      <Onboarding
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
