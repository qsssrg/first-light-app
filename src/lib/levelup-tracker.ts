/** Track which level-up stories have been watched */

const STORAGE_KEY = 'firstlight_watched_levelup';

export function getWatchedLevelups(): Set<number> {
  if (typeof window === 'undefined') return new Set();
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return new Set();
  try { return new Set(JSON.parse(raw)); } catch { return new Set(); }
}

export function markLevelupWatched(level: number): void {
  if (typeof window === 'undefined') return;
  const watched = getWatchedLevelups();
  watched.add(level);
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...watched]));
}

/** Get the next unwatched level-up story (up to current level) */
export function getNextUnwatchedLevel(currentLevel: number): number | null {
  const watched = getWatchedLevelups();
  for (let i = 1; i <= currentLevel; i++) {
    if (!watched.has(i)) return i;
  }
  return null;
}
