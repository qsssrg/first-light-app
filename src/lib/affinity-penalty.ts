/** Affinity penalty system — reduce affinity points for various triggers */

import { db, getAffinityLevel } from './db';
import { MEMBERS } from './members';

const LAST_ACCESS_KEY = 'firstlight_last_access';
const PENALTY_APPLIED_KEY = 'firstlight_penalty_applied';
const COURSE_LAST_STUDY_KEY = 'firstlight_course_last_study';

const AXIS_TO_MEMBER: Record<string, string> = {
  vocabulary: 'haruto',
  listening: 'ren',
  reading: 'sora',
  writing: 'yuuki',
  grammar: 'kai',
};

/** Reduce affinity for a specific member (floor at 0) */
export async function reduceAffinity(memberId: string, points: number): Promise<void> {
  let record = await db.memberAffinity.where('memberId').equals(memberId).first();
  if (!record) return;
  const newPoints = Math.max(0, record.points - points);
  await db.memberAffinity.update(record.id!, {
    points: newPoints,
    level: getAffinityLevel(newPoints),
  });
}

/** Reduce affinity for all members */
async function reduceAllAffinity(points: number): Promise<void> {
  for (const member of MEMBERS) {
    await reduceAffinity(member.id, points);
  }
}

/** Check #1: 3+ days without login → all members -5pt. Returns penalty message or null */
export async function checkInactivityPenalty(): Promise<string | null> {
  if (typeof window === 'undefined') return null;

  const today = new Date().toISOString().split('T')[0];
  const penaltyApplied = localStorage.getItem(PENALTY_APPLIED_KEY);
  if (penaltyApplied === today) return null;

  const lastAccess = localStorage.getItem(LAST_ACCESS_KEY);
  // Update last access
  localStorage.setItem(LAST_ACCESS_KEY, today);

  if (!lastAccess) return null;

  const diffDays = Math.floor((Date.now() - new Date(lastAccess).getTime()) / 86400000);
  if (diffDays >= 3) {
    await reduceAllAffinity(5);
    localStorage.setItem(PENALTY_APPLIED_KEY, today);
    return `${diffDays}日ぶりだね…メンバーが寂しがってたよ`;
  }

  return null;
}

/** Check #2: Course not studied for 7+ days → member -10pt */
export async function checkCoursePenalty(): Promise<string[]> {
  if (typeof window === 'undefined') return [];
  const messages: string[] = [];
  const raw = localStorage.getItem(COURSE_LAST_STUDY_KEY);
  const courseData: Record<string, string> = raw ? JSON.parse(raw) : {};
  const now = Date.now();

  for (const [axis, memberId] of Object.entries(AXIS_TO_MEMBER)) {
    const lastStudy = courseData[axis];
    if (!lastStudy) continue;
    const diffDays = Math.floor((now - new Date(lastStudy).getTime()) / 86400000);
    if (diffDays >= 7) {
      await reduceAffinity(memberId, 10);
      const member = MEMBERS.find(m => m.id === memberId);
      messages.push(`${member?.nameJa ?? memberId}のコースを${diffDays}日放置…親密度ダウン`);
      // Reset to prevent repeated penalties
      courseData[axis] = new Date().toISOString().split('T')[0];
    }
  }

  if (messages.length > 0) {
    localStorage.setItem(COURSE_LAST_STUDY_KEY, JSON.stringify(courseData));
  }

  return messages;
}

/** Mark a course as studied today */
export function markCourseStudied(axis: string): void {
  if (typeof window === 'undefined') return;
  const raw = localStorage.getItem(COURSE_LAST_STUDY_KEY);
  const data: Record<string, string> = raw ? JSON.parse(raw) : {};
  data[axis] = new Date().toISOString().split('T')[0];
  localStorage.setItem(COURSE_LAST_STUDY_KEY, JSON.stringify(data));
}

/** #3: Same card wrong twice → -2pt for axis member */
export async function penaltyConsecutiveWrong(axis: string): Promise<void> {
  const memberId = AXIS_TO_MEMBER[axis] ?? 'kai';
  await reduceAffinity(memberId, 2);
}

/** #7: Oshi change → old oshi -15pt */
export async function penaltyOshiChange(oldOshiId: string): Promise<void> {
  if (oldOshiId && oldOshiId !== 'hakoshi') {
    await reduceAffinity(oldOshiId, 15);
  }
}
