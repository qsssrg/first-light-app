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

  let record = await db.memberAffinity.where('memberId').equals(memberId).first();

  if (!record) {
    // Initialize
    const id = await db.memberAffinity.add({ memberId, level: 1, points: 0 });
    record = { id, memberId, level: 1, points: 0 };
  }

  const oldLevel = getAffinityLevel(record.points);
  const newPoints = record.points + points;
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
