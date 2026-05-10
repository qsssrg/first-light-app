/** Streak management — check and update daily streak */

import { db } from './db';

const LAST_STUDY_KEY = 'firstlight_last_study_date';

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function getYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

/** Get last study date from localStorage */
export function getLastStudyDate(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(LAST_STUDY_KEY);
}

/** Mark today as studied */
export function markStudiedToday(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LAST_STUDY_KEY, getToday());
}

/**
 * Check and update streak on home screen mount.
 * Returns { updated: boolean, wasReset: boolean, grandSlam: boolean }
 */
export async function checkAndUpdateStreak(): Promise<{
  updated: boolean;
  wasReset: boolean;
  grandSlam: boolean;
  streak: number;
}> {
  const profile = await db.userProfile.toCollection().first();
  if (!profile?.id) return { updated: false, wasReset: false, grandSlam: false, streak: 0 };

  const today = getToday();
  const yesterday = getYesterday();
  const lastStudy = getLastStudyDate();

  // Already checked today
  if (lastStudy === today) {
    return { updated: false, wasReset: false, grandSlam: false, streak: profile.streak };
  }

  let newStreak = profile.streak;
  let wasReset = false;
  let grandSlam = false;

  if (lastStudy === yesterday) {
    // Studied yesterday → streak is already correct from onStudyComplete.
    // Don't increment here (onStudyComplete handles incrementing).
    // Just check for grand slam milestone on current streak.
    if (newStreak > 0 && newStreak % 35 === 0) {
      grandSlam = true;
    }
    return { updated: false, wasReset: false, grandSlam, streak: newStreak };
  } else if (lastStudy && lastStudy !== today) {
    // 2+ days gap → reset streak
    newStreak = 0;
    wasReset = true;
    await db.userProfile.update(profile.id, {
      streak: 0,
    });
  }
  // If lastStudy is null (first time), streak stays at 0

  return { updated: wasReset, wasReset, grandSlam, streak: newStreak };
}

/**
 * Called after study completion — update lastStudyDate and increment streak if first study today.
 */
export async function onStudyComplete(): Promise<void> {
  const today = getToday();
  const lastStudy = getLastStudyDate();

  if (lastStudy === today) {
    // Already studied today, just ensure date is set
    return;
  }

  const profile = await db.userProfile.toCollection().first();
  if (!profile?.id) return;

  const yesterday = getYesterday();
  let newStreak = profile.streak;

  if (lastStudy === yesterday || !lastStudy) {
    // Continuing streak or first ever study
    newStreak = profile.streak + 1;
  } else {
    // Gap — this shouldn't happen if checkAndUpdateStreak ran on home,
    // but handle gracefully: start fresh streak
    newStreak = 1;
  }

  const longestStreak = Math.max(profile.longestStreak ?? 0, newStreak);
  await db.userProfile.update(profile.id, {
    streak: newStreak,
    longestStreak,
  });

  markStudiedToday();
}
