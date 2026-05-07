'use client';

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from './db';
import type { UserProfile } from '@/types';

const DEFAULT_PROFILE: Omit<UserProfile, 'id'> = {
  name: '',
  level: 1,
  xp: 0,
  totalXp: 0,
  learnerType: 'balanced',
  skills: { vocabulary: 0, reading: 0, listening: 0, writing: 0, grammar: 0 },
  streak: 0,
  longestStreak: 0,
  createdAt: new Date(),
  lastStudyAt: null,
  settings: {
    darkMode: false,
    gamificationEnabled: true,
    dailyChallengeEnabled: true,
    soundEnabled: true,
    englishSpeakerMode: false,
  },
};

export function useProfile() {
  const profile = useLiveQuery(() => db.userProfile.toCollection().first());
  return profile ?? null;
}

export function useVocabCards() {
  return useLiveQuery(() => db.vocabCards.toArray()) ?? [];
}

export function useDueCards(limit = 20) {
  return useLiveQuery(async () => {
    const now = new Date();
    return db.vocabCards
      .where('nextReview')
      .belowOrEqual(now)
      .limit(limit)
      .toArray();
  }) ?? [];
}

export function useMemberAffinities() {
  return useLiveQuery(() => db.memberAffinity.toArray()) ?? [];
}

export function useStudySessions() {
  return useLiveQuery(() => db.studySessions.orderBy('date').reverse().toArray()) ?? [];
}

export async function initProfile(name: string): Promise<void> {
  const existing = await db.userProfile.toCollection().first();
  if (!existing) {
    await db.userProfile.add({ ...DEFAULT_PROFILE, name, createdAt: new Date() });
  }
}

export async function updateProfile(updates: Partial<UserProfile>): Promise<void> {
  const profile = await db.userProfile.toCollection().first();
  if (profile?.id) {
    await db.userProfile.update(profile.id, updates);
  }
}
