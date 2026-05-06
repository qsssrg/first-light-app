'use client';

import { VNEngine } from './VNEngine';
import type { Scenario } from '@/lib/scenarios/types';

interface VNModalProps {
  scenario: Scenario;
  onComplete: () => void;
  skippable?: boolean;
}

export function VNModal({ scenario, onComplete, skippable = true }: VNModalProps) {
  return (
    <div className="fixed inset-0 z-50">
      <VNEngine scenario={scenario} onComplete={onComplete} skippable={skippable} />
    </div>
  );
}
