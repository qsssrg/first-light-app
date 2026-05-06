import Dexie, { type Table } from 'dexie';
import type { UserProfile, VocabCard, StudySession, DailyChallenge, StageProgress, ChallengeResult, WritingSubmission } from '@/types';

export class FirstLightDB extends Dexie {
  userProfile!: Table<UserProfile, number>;
  vocabCards!: Table<VocabCard, number>;
  studySessions!: Table<StudySession, number>;
  dailyChallenges!: Table<DailyChallenge, number>;
  stageProgress!: Table<StageProgress, number>;
  challengeResults!: Table<ChallengeResult, number>;
  writingSubmissions!: Table<WritingSubmission, number>;

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
  }
}

export const db = new FirstLightDB();
