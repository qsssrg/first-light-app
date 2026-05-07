// FIRST LIGHT App - Core Types

export type SkillAxis = 'vocabulary' | 'reading' | 'listening' | 'writing' | 'grammar';

export type LearnerType =
  | 'balanced'       // バランス型
  | 'word-master'    // 語彙特化
  | 'reader'         // 読解派
  | 'listener'       // リスニング派
  | 'writer'         // 表現派
  | 'analyst';       // 文法分析派

export type ContentCategory = 'science' | 'society' | 'history' | 'technology' | 'current' | 'culture';

export interface UserProfile {
  id?: number;
  name: string;
  level: number;           // 1-25
  xp: number;
  totalXp: number;
  learnerType: LearnerType;
  skills: Record<SkillAxis, number>; // 0-100 per axis
  streak: number;
  longestStreak: number;
  createdAt: Date;
  lastStudyAt: Date | null;
  settings: UserSettings;
}

export interface UserSettings {
  darkMode: boolean;
  gamificationEnabled: boolean;
  dailyChallengeEnabled: boolean;
  soundEnabled: boolean;
  englishSpeakerMode: boolean;
  oshiMemberId?: string;
}

// SRS SM-2 Algorithm
export interface VocabCard {
  id?: number;
  word: string;
  meaning: string;
  example: string;
  category: ContentCategory;
  difficulty: number;       // 0-5
  repetitions: number;
  easeFactor: number;       // >= 1.3
  interval: number;         // days
  nextReview: Date;
  lastReview: Date | null;
  correctCount: number;
  incorrectCount: number;
}

export interface StudySession {
  id?: number;
  date: Date;
  axis: SkillAxis;
  correctCount: number;
  totalCount: number;
  xpEarned: number;
  comboMax: number;
  duration: number; // seconds
}

export interface StoryCard {
  id: string;
  memberId: string;
  title: string;
  content: string;
  unlockedAt: number; // level required
  imageUrl?: string;  // placeholder for now
}

export interface Member {
  id: string;
  name: string;
  nameJa: string;
  role: string;
  axis: SkillAxis;
  color: string;
  description: string;
  personality: string;
}

export interface DailyChallenge {
  id?: number;
  date: string; // YYYY-MM-DD
  axis: SkillAxis;
  completed: boolean;
  xpReward: number;
}

// Phase 2: Chapters & Stages
export interface Chapter {
  id: string;
  number: number;
  title: string;
  titleJa: string;
  description: string;
  axis: SkillAxis;
  memberId: string;
  stages: Stage[];
}

export interface Stage {
  id: string;
  chapterId: string;
  number: number;
  title: string;
  description: string;
  wordCount: number;
  level: 'eiken2' | 'eiken_pre1' | 'eiken1' | 'toefl';
}

export interface StageProgress {
  id?: number;
  stageId: string;
  completedWords: number;
  totalWords: number;
  bestScore: number;
  attempts: number;
  lastAttempt: Date | null;
}

// Phase 2: Challenge Test
export interface ChallengeResult {
  id?: number;
  stageId: string;
  date: Date;
  score: number;
  totalQuestions: number;
  timeSpent: number; // seconds
  passed: boolean;
}

// Phase 2: Writing Practice
export interface WritingSubmission {
  id?: number;
  date: Date;
  prompt: string;
  userText: string;
  feedback: string | null;
  score: number | null; // 0-100
  corrections: WritingCorrection[];
}

export interface WritingCorrection {
  original: string;
  corrected: string;
  explanation: string;
  type: 'grammar' | 'vocabulary' | 'style' | 'spelling';
}

// Phase 2: Past Exams
export interface PastExamQuestion {
  id: string;
  source: 'eiken2' | 'eiken_pre1' | 'toefl';
  year: number;
  section: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// Level thresholds (XP needed for each level)
export const LEVEL_THRESHOLDS: number[] = Array.from({ length: 25 }, (_, i) => {
  if (i === 0) return 0;
  return Math.floor(100 * Math.pow(1.3, i - 1));
});

// Content category distribution
export const CONTENT_DISTRIBUTION: Record<ContentCategory, number> = {
  science: 0.25,
  society: 0.20,
  history: 0.15,
  technology: 0.15,
  current: 0.15,
  culture: 0.10,
};
