import { LEVEL_THRESHOLDS } from '@/types';

// XP calculation with combo bonus
export function calculateXp(correct: boolean, combo: number): number {
  if (!correct) return 0;
  const base = 10;
  const comboBonus = Math.min(combo, 10) * 2; // max +20 from combo
  return base + comboBonus;
}

// Get level from total XP
export function getLevelFromXp(totalXp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalXp >= LEVEL_THRESHOLDS[i]) return i + 1;
  }
  return 1;
}

// Get XP progress within current level (0-1)
export function getLevelProgress(totalXp: number): number {
  const level = getLevelFromXp(totalXp);
  if (level >= 25) return 1;
  const current = LEVEL_THRESHOLDS[level - 1];
  const next = LEVEL_THRESHOLDS[level];
  return (totalXp - current) / (next - current);
}

// XP needed for next level
export function xpToNextLevel(totalXp: number): number {
  const level = getLevelFromXp(totalXp);
  if (level >= 25) return 0;
  return LEVEL_THRESHOLDS[level] - totalXp;
}
