'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { VNEngine } from '@/components/vn/VNEngine';
import { postAssessmentScenario } from '@/lib/scenarios/opening';
import { Onboarding } from '@/components/home/Onboarding';

export default function AssessmentPage() {
  const [phase, setPhase] = useState<'assessment' | 'result'>('assessment');
  const router = useRouter();

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
