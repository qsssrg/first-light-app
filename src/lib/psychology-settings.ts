/** Psychology course settings */

const EVENT_KEY = 'firstlight_psychology_event';
const UNLOCKED_KEY = 'firstlight_psychology_unlocked';

/** Whether the psychology variety show event is enabled */
export function isPsychologyEventEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(EVENT_KEY) === 'true';
}

export function setPsychologyEventEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(EVENT_KEY, String(enabled));
  // Reset unlock when turning off (allows re-experiencing the story)
  if (!enabled) {
    localStorage.removeItem(UNLOCKED_KEY);
  }
}

/** Whether the psychology course has been unlocked (user saw the VN scene) */
export function isPsychologyUnlocked(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(UNLOCKED_KEY) === 'true';
}

export function setPsychologyUnlocked(unlocked: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(UNLOCKED_KEY, String(unlocked));
}
