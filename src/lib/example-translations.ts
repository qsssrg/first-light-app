/**
 * Example sentence translations + wrong translation distractors
 * Used for Step 2 quiz: "Which is the correct translation?"
 */

export interface ExampleTranslation {
  /** Correct Japanese translation of the example sentence */
  correct: string;
  /** 3 wrong translations (same word/topic, different meaning) */
  wrong: [string, string, string];
}

/** Map of word -> translation data */
export type TranslationMap = Record<string, ExampleTranslation>;
