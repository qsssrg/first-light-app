import type { VocabCard } from '@/types';

// Fisher-Yates shuffle
export function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Shuffle options while tracking correct index
export function shuffleOptions(options: string[], correctIndex: number): { options: string[]; correctIndex: number } {
  const correct = options[correctIndex];
  const shuffled = shuffle(options);
  return {
    options: shuffled,
    correctIndex: shuffled.indexOf(correct),
  };
}

// Adaptive card selection: prioritize weak cards
export function getAdaptiveCards(cards: VocabCard[], limit: number = 20): VocabCard[] {
  const now = new Date();

  // Split into due and not-yet-due
  const due = cards.filter(c => c.nextReview <= now);
  const notDue = cards.filter(c => c.nextReview > now);

  // Score each due card: higher = more urgent
  const scored = due.map(card => {
    let priority = 0;

    // Overdue bonus: more overdue = higher priority
    const overdueDays = (now.getTime() - card.nextReview.getTime()) / (1000 * 60 * 60 * 24);
    priority += Math.min(overdueDays * 2, 20);

    // Error rate bonus: more errors = higher priority
    const totalAttempts = card.correctCount + card.incorrectCount;
    if (totalAttempts > 0) {
      const errorRate = card.incorrectCount / totalAttempts;
      priority += errorRate * 15;
    }

    // Low repetition bonus: newer cards need more practice
    if (card.repetitions < 3) {
      priority += (3 - card.repetitions) * 5;
    }

    // Low ease factor bonus: struggling cards
    if (card.easeFactor < 2.0) {
      priority += (2.5 - card.easeFactor) * 10;
    }

    return { card, priority };
  });

  // Sort by priority (highest first), then shuffle within same-priority groups
  scored.sort((a, b) => b.priority - a.priority);

  // Take top cards, then shuffle their order for variety
  const selected = scored.slice(0, limit).map(s => s.card);
  return shuffle(selected);
}

// Get weakness-weighted cards for challenge tests
export function getWeaknessWeightedQuestions<T extends { id?: string }>(
  questions: T[],
  answeredHistory: Record<string, { correct: number; incorrect: number }>,
  count: number
): T[] {
  const scored = questions.map(q => {
    const id = (q as any).id || '';
    const history = answeredHistory[id];
    let weight = 1;

    if (history) {
      const total = history.correct + history.incorrect;
      if (total > 0) {
        const errorRate = history.incorrect / total;
        weight = 1 + errorRate * 3; // Weak questions 4x more likely
      }
      // Reduce weight for consistently correct answers
      if (history.correct >= 3 && history.incorrect === 0) {
        weight = 0.3;
      }
    } else {
      // Never seen = medium priority
      weight = 1.5;
    }

    return { item: q, weight };
  });

  // Weighted random selection
  return weightedSample(scored, count);
}

function weightedSample<T>(items: { item: T; weight: number }[], count: number): T[] {
  const result: T[] = [];
  const pool = [...items];

  for (let i = 0; i < count && pool.length > 0; i++) {
    const totalWeight = pool.reduce((sum, p) => sum + p.weight, 0);
    let random = Math.random() * totalWeight;

    for (let j = 0; j < pool.length; j++) {
      random -= pool[j].weight;
      if (random <= 0) {
        result.push(pool[j].item);
        pool.splice(j, 1);
        break;
      }
    }
  }

  return result;
}
