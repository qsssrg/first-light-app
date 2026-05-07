/** Add new vocab cards from the word pools */

import { db } from './db';
import { EIKEN_PRE1_VOCAB } from './eiken-pre1-vocab';
import { TOEFL_ACADEMIC_VOCAB } from './toefl-academic-vocab';
import { PRE1_EXPANSION } from './vocab-expansion';
import { STAGE_1_1_VOCAB } from './stage-vocab';
import { getStudyGoal, isEikenGrade } from './study-goals';
import { shouldExcludeWord } from './vocab-source';
import type { VocabCard } from '@/types';

/** All available word seeds */
const ALL_SEEDS = [
  ...STAGE_1_1_VOCAB,
  ...EIKEN_PRE1_VOCAB,
  ...PRE1_EXPANSION,
  ...TOEFL_ACADEMIC_VOCAB,
];

/**
 * Add new vocab cards that haven't been added yet.
 * Prioritizes words matching the user's study goal level.
 * Returns the number of cards added.
 */
export async function addNewVocabCards(count: number = 15): Promise<number> {
  const existingCards = await db.vocabCards.toArray();
  const existingWords = new Set(existingCards.map(c => c.word));

  const goal = getStudyGoal();
  const eikenNone = goal.eiken === 'none';
  const toeflNone = goal.toeflTarget === 'none';

  // Filter: not yet added, not excluded by goal
  const available = ALL_SEEDS.filter(s =>
    !existingWords.has(s.word) &&
    !shouldExcludeWord(s.word, eikenNone, toeflNone)
  );

  if (available.length === 0) return 0;

  // Sort by difficulty (prefer matching goal level)
  let targetDifficulty = 3; // default
  if (isEikenGrade(goal.eiken)) {
    const diffMap: Record<string, number> = {
      '5': 1, '4': 1, '3': 2, 'pre2': 2, '2': 3, 'pre1': 4, '1': 5,
    };
    targetDifficulty = diffMap[goal.eiken] ?? 3;
  }

  // Score by closeness to target difficulty
  const scored = available.map(s => ({
    seed: s,
    score: -Math.abs(s.difficulty - targetDifficulty) + Math.random() * 0.5,
  }));
  scored.sort((a, b) => b.score - a.score);

  const toAdd = scored.slice(0, count).map(s => ({
    word: s.seed.word,
    meaning: s.seed.meaning,
    example: s.seed.example,
    category: s.seed.category,
    difficulty: s.seed.difficulty,
    repetitions: 0,
    easeFactor: 2.5,
    interval: 0,
    nextReview: new Date(),
    lastReview: null,
    correctCount: 0,
    incorrectCount: 0,
  } as Omit<VocabCard, 'id'>));

  if (toAdd.length === 0) return 0;

  await db.vocabCards.bulkAdd(toAdd as VocabCard[]);
  return toAdd.length;
}

/** Count how many new words are available to add */
export async function countAvailableNewWords(): Promise<number> {
  const existingCards = await db.vocabCards.toArray();
  const existingWords = new Set(existingCards.map(c => c.word));
  const goal = getStudyGoal();
  return ALL_SEEDS.filter(s =>
    !existingWords.has(s.word) &&
    !shouldExcludeWord(s.word, goal.eiken === 'none', goal.toeflTarget === 'none')
  ).length;
}
