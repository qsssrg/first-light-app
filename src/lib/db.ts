import Dexie, { type Table } from 'dexie';
import type { UserProfile, VocabCard, StudySession, DailyChallenge, StageProgress, ChallengeResult, WritingSubmission } from '@/types';

export interface MemberAffinity {
  id?: number;
  memberId: string;
  level: number;   // 1-5
  points: number;  // cumulative
}

export class FirstLightDB extends Dexie {
  userProfile!: Table<UserProfile, number>;
  vocabCards!: Table<VocabCard, number>;
  studySessions!: Table<StudySession, number>;
  dailyChallenges!: Table<DailyChallenge, number>;
  stageProgress!: Table<StageProgress, number>;
  challengeResults!: Table<ChallengeResult, number>;
  writingSubmissions!: Table<WritingSubmission, number>;
  memberAffinity!: Table<MemberAffinity, number>;

  constructor() {
    super('FirstLightDB');
    this.version(2).stores({
      userProfile: '++id',
      vocabCards: '++id, word, category, nextReview, [category+difficulty]',
      studySessions: '++id, date, axis',
      dailyChallenges: '++id, date, axis',
      stageProgress: '++id, stageId',
      challengeResults: '++id, stageId, date',
      writingSubmissions: '++id, date',
    });
    this.version(3).stores({
      userProfile: '++id',
      vocabCards: '++id, word, category, nextReview, [category+difficulty]',
      studySessions: '++id, date, axis',
      dailyChallenges: '++id, date, axis',
      stageProgress: '++id, stageId',
      challengeResults: '++id, stageId, date',
      writingSubmissions: '++id, date',
      memberAffinity: '++id, memberId',
    });
  }
}

// Affinity level thresholds
export const AFFINITY_THRESHOLDS = [0, 100, 300, 600, 1000];
export const AFFINITY_LABELS = ['知り合い', '友人', '親友', '特別な存在', '運命の絆'];

export function getAffinityLevel(points: number): number {
  for (let i = AFFINITY_THRESHOLDS.length - 1; i >= 0; i--) {
    if (points >= AFFINITY_THRESHOLDS[i]) return i + 1;
  }
  return 1;
}

export const db = new FirstLightDB();
