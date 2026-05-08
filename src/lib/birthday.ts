/** Birthday storage and check */

const BIRTHDAY_KEY = 'firstlight_birthday';
const BIRTHDAY_CELEBRATED_KEY = 'firstlight_birthday_celebrated';

export function getBirthday(): { month: number; day: number } | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(BIRTHDAY_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed.month && parsed.day) return parsed;
    return null;
  } catch { return null; }
}

export function setBirthday(month: number, day: number): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(BIRTHDAY_KEY, JSON.stringify({ month, day }));
  localStorage.removeItem(BIRTHDAY_CELEBRATED_KEY);
}

/** Check if today is the user's birthday and hasn't been celebrated yet today */
export function isBirthdayToday(): boolean {
  const bd = getBirthday();
  if (!bd) return false;
  const now = new Date();
  if (now.getMonth() + 1 !== bd.month || now.getDate() !== bd.day) return false;
  const today = now.toISOString().split('T')[0];
  return localStorage.getItem(BIRTHDAY_CELEBRATED_KEY) !== today;
}

export function markBirthdayCelebrated(): void {
  if (typeof window === 'undefined') return;
  const today = new Date().toISOString().split('T')[0];
  localStorage.setItem(BIRTHDAY_CELEBRATED_KEY, today);
}
