import type { Scenario, ScenarioLine, CharacterId } from './types';

interface RawScene {
  character: string;
  expression?: string;
  text: string;
  background?: string;
}

interface RawScenarioEntry {
  id: string;
  scenes: RawScene[];
}

function convertToScenario(entry: RawScenarioEntry): Scenario {
  const lines: ScenarioLine[] = entry.scenes.map((scene) => ({
    type: 'dialog' as const,
    character: scene.character as CharacterId,
    text: scene.text,
    expression: scene.expression,
  }));

  return {
    id: entry.id,
    background: entry.scenes[0]?.background,
    lines,
  };
}

// Levelup scenes (25)
import levelupData from '@/data/scenarios/levelup-scenes.json';
export const levelupScenarios: Map<string, Scenario> = new Map(
  (levelupData as RawScenarioEntry[]).map((e) => [e.id, convertToScenario(e)])
);

// Chapter scenes (5)
import chapterData from '@/data/scenarios/chapter-scenes.json';
export const chapterScenarios: Map<string, Scenario> = new Map(
  (chapterData as RawScenarioEntry[]).map((e) => [e.id, convertToScenario(e)])
);

// Test scenes (pre/pass/fail)
import testData from '@/data/scenarios/test-scenes.json';
export const testScenarios: Map<string, Scenario> = new Map(
  (testData as RawScenarioEntry[]).map((e) => [e.id, convertToScenario(e)])
);

export function getLevelupScenario(level: number): Scenario | undefined {
  return levelupScenarios.get(`levelup-${String(level).padStart(2, '0')}`);
}

export function getChapterScenario(chapter: number): Scenario | undefined {
  return chapterScenarios.get(`chapter-${String(chapter).padStart(2, '0')}`);
}

export function getTestScenario(type: 'pre' | 'pass' | 'fail', chapter: number): Scenario | undefined {
  return testScenarios.get(`test-${type}-${String(chapter).padStart(2, '0')}`);
}

// Learning scenes (29)
import learningData from '@/data/scenarios/learning-scenes.json';
export const learningScenarios: Map<string, Scenario> = new Map(
  (learningData as RawScenarioEntry[]).map((e) => [e.id, convertToScenario(e)])
);

export function getLearningScenario(id: string): Scenario | undefined {
  return learningScenarios.get(id);
}

export function getRandomVocabStart(): Scenario | undefined {
  const starts = Array.from(learningScenarios.entries())
    .filter(([id]) => id.startsWith('vocab-start-'))
    .map(([, s]) => s);
  return starts[Math.floor(Math.random() * starts.length)];
}

export function getVocabComboScenario(combo: number): Scenario | undefined {
  if (combo >= 50) return learningScenarios.get('vocab-combo-50');
  if (combo >= 20) return learningScenarios.get('vocab-combo-20');
  if (combo >= 10) return learningScenarios.get('vocab-combo-10');
  if (combo >= 5) return learningScenarios.get('vocab-combo-05');
  return undefined;
}

export function getVocabEndScenario(accuracy: number): Scenario | undefined {
  if (accuracy >= 0.8) return learningScenarios.get('vocab-end-high');
  if (accuracy >= 0.5) return learningScenarios.get('vocab-end-mid');
  return learningScenarios.get('vocab-end-low');
}

export function getRandomLearningStart(axis: string): Scenario | undefined {
  const prefix = `${axis}-start-`;
  const starts = Array.from(learningScenarios.entries())
    .filter(([id]) => id.startsWith(prefix))
    .map(([, s]) => s);
  if (starts.length === 0) return undefined;
  return starts[Math.floor(Math.random() * starts.length)];
}

export function getLearningReaction(axis: string, correct: boolean): Scenario | undefined {
  const id = `${axis}-${correct ? 'correct' : 'wrong'}`;
  return learningScenarios.get(id);
}

export function getSideStoryScenario(topic: string): Scenario | undefined {
  return learningScenarios.get(`side-${topic}`);
}
