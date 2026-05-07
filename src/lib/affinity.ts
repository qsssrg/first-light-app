/** Add affinity points to a member */

import { db, getAffinityLevel, type MemberAffinity } from './db';

const AXIS_TO_MEMBER: Record<string, string> = {
  vocabulary: 'haruto',
  listening: 'ren',
  reading: 'sora',
  writing: 'yuuki',
  grammar: 'kai',
};

/**
 * Add affinity points to the member associated with a skill axis.
 * Returns { leveled: boolean, newLevel: number } if a level-up occurred.
 */
export async function addAffinityPoints(
  axis: string,
  points: number = 5
): Promise<{ leveled: boolean; newLevel: number; memberId: string }> {
  const memberId = AXIS_TO_MEMBER[axis] ?? 'kai';

  // 推しメンバーなら2倍
  const profile = await db.userProfile.toCollection().first();
  const oshiId = profile?.settings?.oshiMemberId;
  const finalPoints = oshiId === memberId ? points * 2 : points;

  let record = await db.memberAffinity.where('memberId').equals(memberId).first();

  if (!record) {
    // Initialize
    const id = await db.memberAffinity.add({ memberId, level: 1, points: 0 });
    record = { id, memberId, level: 1, points: 0 };
  }

  const oldLevel = getAffinityLevel(record.points);
  const newPoints = record.points + finalPoints;
  const newLevel = getAffinityLevel(newPoints);

  await db.memberAffinity.update(record.id!, {
    points: newPoints,
    level: newLevel,
  });

  return {
    leveled: newLevel > oldLevel,
    newLevel,
    memberId,
  };
}

const DAILY_BONUS_KEY = 'firstlight_daily_affinity';
const ALL_MEMBERS = ['haruto', 'sora', 'ren', 'yuuki', 'kai'];

/**
 * Grant daily affinity bonus to all members (once per day).
 * Returns true if bonus was granted, false if already granted today.
 */
export async function grantDailyAffinityBonus(pointsPerMember: number = 2): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  const today = new Date().toISOString().split('T')[0];
  const lastGranted = localStorage.getItem(DAILY_BONUS_KEY);
  if (lastGranted === today) return false;

  for (const memberId of ALL_MEMBERS) {
    const randomPts = Math.floor(Math.random() * 3) + 1; // 1-3pt
    let record = await db.memberAffinity.where('memberId').equals(memberId).first();
    if (!record) {
      const id = await db.memberAffinity.add({ memberId, level: 1, points: 0 });
      record = { id, memberId, level: 1, points: 0 };
    }
    const newPoints = record.points + randomPts;
    await db.memberAffinity.update(record.id!, {
      points: newPoints,
      level: getAffinityLevel(newPoints),
    });
  }

  localStorage.setItem(DAILY_BONUS_KEY, today);
  return true;
}
