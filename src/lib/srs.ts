import type { VocabCard } from '@/types';

// SM-2 Spaced Repetition Algorithm
export function calculateNextReview(
  card: VocabCard,
  quality: number // 0-5 (0=complete fail, 5=perfect)
): Pick<VocabCard, 'easeFactor' | 'interval' | 'repetitions' | 'nextReview'> {
  let { easeFactor, interval, repetitions } = card;

  if (quality >= 3) {
    // Correct response
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  } else {
    // Incorrect response - reset
    repetitions = 0;
    interval = 1;
  }

  // Update ease factor
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);

  return { easeFactor, interval, repetitions, nextReview };
}

// Get cards due for review
export function getDueCards(cards: VocabCard[], limit: number = 20): VocabCard[] {
  const now = new Date();
  return cards
    .filter(card => card.nextReview <= now)
    .sort((a, b) => a.nextReview.getTime() - b.nextReview.getTime())
    .slice(0, limit);
}
