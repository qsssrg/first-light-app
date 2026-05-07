/** Determine vocab source (eiken / toefl / common) by word name */

import { EIKEN_PRE1_VOCAB } from './eiken-pre1-vocab';
import { TOEFL_ACADEMIC_VOCAB } from './toefl-academic-vocab';
import { PRE1_EXPANSION } from './vocab-expansion';

// Build sets once at module load
const EIKEN_WORDS = new Set([
  ...EIKEN_PRE1_VOCAB.map(v => v.word),
  ...PRE1_EXPANSION.map(v => v.word),
]);

const TOEFL_WORDS = new Set(
  TOEFL_ACADEMIC_VOCAB.map(v => v.word)
);

export type VocabSource = 'eiken' | 'toefl' | 'common';

export function getVocabSource(word: string): VocabSource {
  if (TOEFL_WORDS.has(word)) return 'toefl';
  if (EIKEN_WORDS.has(word)) return 'eiken';
  return 'common'; // sample-vocab, stage-vocab
}

/** Get a display label for the word's level */
export function getVocabLevelLabel(word: string, difficulty: number): string {
  const source = getVocabSource(word);
  if (source === 'toefl') return 'TOEFL';
  if (source === 'eiken') {
    if (difficulty <= 3) return '英検2級';
    if (difficulty <= 4) return '英検準1級';
    return '英検1級';
  }
  // common (sample/stage)
  if (difficulty <= 1) return '英検5級';
  if (difficulty <= 2) return '英検3級';
  if (difficulty <= 3) return '英検2級';
  return '英検準1級';
}

/** Filter out words based on goal settings */
export function shouldExcludeWord(word: string, eikenNone: boolean, toeflNone: boolean): boolean {
  const source = getVocabSource(word);
  if (eikenNone && source === 'eiken') return true;
  if (toeflNone && source === 'toefl') return true;
  return false;
}
