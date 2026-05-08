/** Member birthday event check */

import { MEMBERS } from './members';

const CELEBRATED_KEY = 'firstlight_member_birthday_celebrated';

export interface MemberBirthdayEvent {
  memberId: string;
  isOshi: boolean;
}

/** Check if any member has a birthday today and hasn't been celebrated */
export function getMemberBirthdayToday(oshiId?: string): MemberBirthdayEvent | null {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  for (const member of MEMBERS) {
    if (!member.profile?.birthday) continue;
    const [bm, bd] = member.profile.birthday.split('/').map(Number);
    if (bm === month && bd === day) {
      const celebratedToday = getCelebratedToday();
      if (celebratedToday.has(member.id)) continue;
      const isOshi = oshiId === member.id || (oshiId === 'hakoshi');
      return { memberId: member.id, isOshi: oshiId === member.id }; // hakoshi = normal
    }
  }
  return null;
}

function getCelebratedToday(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  const raw = localStorage.getItem(CELEBRATED_KEY);
  if (!raw) return new Set();
  try {
    const data = JSON.parse(raw);
    const today = new Date().toISOString().split('T')[0];
    if (data.date !== today) return new Set();
    return new Set(data.members ?? []);
  } catch { return new Set(); }
}

export function markMemberBirthdayCelebrated(memberId: string): void {
  if (typeof window === 'undefined') return;
  const today = new Date().toISOString().split('T')[0];
  const current = getCelebratedToday();
  const raw = localStorage.getItem(CELEBRATED_KEY);
  let date = today;
  try {
    const data = JSON.parse(raw ?? '{}');
    if (data.date === today) {
      current.add(memberId);
    }
  } catch {}
  current.add(memberId);
  localStorage.setItem(CELEBRATED_KEY, JSON.stringify({ date: today, members: [...current] }));
}
