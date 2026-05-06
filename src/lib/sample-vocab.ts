import type { ContentCategory, VocabCard } from '@/types';

interface VocabSeed {
  word: string;
  meaning: string;
  example: string;
  category: ContentCategory;
  difficulty: number;
}

const SAMPLE_VOCAB: VocabSeed[] = [
  // Science (25%)
  { word: 'hypothesis', meaning: '仮説', example: 'Scientists tested the hypothesis through experiments.', category: 'science', difficulty: 3 },
  { word: 'photosynthesis', meaning: '光合成', example: 'Plants convert sunlight into energy through photosynthesis.', category: 'science', difficulty: 4 },
  { word: 'catalyst', meaning: '触媒', example: 'The enzyme acts as a catalyst in the reaction.', category: 'science', difficulty: 3 },
  { word: 'organism', meaning: '生物、有機体', example: 'Every organism adapts to its environment.', category: 'science', difficulty: 2 },
  { word: 'molecule', meaning: '分子', example: 'Water is made up of hydrogen and oxygen molecules.', category: 'science', difficulty: 2 },
  // Society (20%)
  { word: 'democracy', meaning: '民主主義', example: 'Democracy requires active citizen participation.', category: 'society', difficulty: 2 },
  { word: 'inequality', meaning: '不平等', example: 'Economic inequality has been a growing concern.', category: 'society', difficulty: 2 },
  { word: 'legislation', meaning: '法律、立法', example: 'New legislation was passed to protect the environment.', category: 'society', difficulty: 3 },
  { word: 'census', meaning: '国勢調査', example: 'The census is conducted every ten years.', category: 'society', difficulty: 3 },
  // History (15%)
  { word: 'civilization', meaning: '文明', example: 'Ancient civilizations developed along major rivers.', category: 'history', difficulty: 2 },
  { word: 'revolution', meaning: '革命', example: 'The industrial revolution transformed society.', category: 'history', difficulty: 2 },
  { word: 'archaeology', meaning: '考古学', example: 'Archaeology helps us understand past cultures.', category: 'history', difficulty: 3 },
  // Technology (15%)
  { word: 'algorithm', meaning: 'アルゴリズム', example: 'Search engines use complex algorithms to rank pages.', category: 'technology', difficulty: 3 },
  { word: 'bandwidth', meaning: '帯域幅', example: 'Streaming video requires high bandwidth.', category: 'technology', difficulty: 3 },
  { word: 'encryption', meaning: '暗号化', example: 'Encryption protects sensitive data from hackers.', category: 'technology', difficulty: 3 },
  // Current (15%)
  { word: 'sustainability', meaning: '持続可能性', example: 'Companies are focusing on sustainability goals.', category: 'current', difficulty: 3 },
  { word: 'pandemic', meaning: 'パンデミック', example: 'The pandemic changed how people work.', category: 'current', difficulty: 2 },
  { word: 'inflation', meaning: 'インフレーション', example: 'Rising inflation affects everyday purchases.', category: 'current', difficulty: 2 },
  // Culture (10%)
  { word: 'aesthetic', meaning: '美的な、美学', example: 'The building has a minimalist aesthetic.', category: 'culture', difficulty: 3 },
  { word: 'narrative', meaning: '物語、語り', example: 'The film presents a compelling narrative.', category: 'culture', difficulty: 2 },
];

export function generateInitialCards(): Omit<VocabCard, 'id'>[] {
  return SAMPLE_VOCAB.map(v => ({
    ...v,
    repetitions: 0,
    easeFactor: 2.5,
    interval: 0,
    nextReview: new Date(),
    lastReview: null,
    correctCount: 0,
    incorrectCount: 0,
  }));
}
