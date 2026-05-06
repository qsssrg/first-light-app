'use client';

import { useState, useCallback } from 'react';
import type { Scenario } from '@/lib/scenarios/types';

export function useVNScene() {
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [onDone, setOnDone] = useState<(() => void) | null>(null);

  const play = useCallback((scenario: Scenario, callback?: () => void) => {
    setActiveScenario(scenario);
    if (callback) {
      setOnDone(() => callback);
    }
  }, []);

  const complete = useCallback(() => {
    setActiveScenario(null);
    onDone?.();
    setOnDone(null);
  }, [onDone]);

  return { activeScenario, play, complete };
}
