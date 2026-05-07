/** Study goal types and requirement definitions */

export type EikenGrade = '5' | '4' | '3' | 'pre2' | '2' | 'pre1' | '1';

export interface StudyGoal {
  eiken?: EikenGrade;
  toeflTarget?: number;
}

export interface GradeRequirement {
  grade: EikenGrade;
  label: string;
  vocabCount: number;
  /** Minimum difficulty level in our vocab data that maps to this grade */
  minDifficulty: number;
  maxDifficulty: number;
  description: string;
}

export const EIKEN_GRADES: GradeRequirement[] = [
  { grade: '5', label: '5級', vocabCount: 600, minDifficulty: 0, maxDifficulty: 1, description: '中学初級レベル' },
  { grade: '4', label: '4級', vocabCount: 1300, minDifficulty: 0, maxDifficulty: 1, description: '中学中級レベル' },
  { grade: '3', label: '3級', vocabCount: 2100, minDifficulty: 0, maxDifficulty: 2, description: '中学卒業レベル' },
  { grade: 'pre2', label: '準2級', vocabCount: 3600, minDifficulty: 0, maxDifficulty: 2, description: '高校中級レベル' },
  { grade: '2', label: '2級', vocabCount: 5100, minDifficulty: 0, maxDifficulty: 3, description: '高校卒業レベル' },
  { grade: 'pre1', label: '準1級', vocabCount: 9000, minDifficulty: 0, maxDifficulty: 5, description: '大学中級レベル' },
  { grade: '1', label: '1級', vocabCount: 15000, minDifficulty: 0, maxDifficulty: 6, description: '大学上級レベル' },
];

export interface ToeflTier {
  min: number;
  max: number;
  label: string;
  vocabCount: number;
  description: string;
}

export const TOEFL_TIERS: ToeflTier[] = [
  { min: 0, max: 59, label: 'Basic (〜59)', vocabCount: 3000, description: '基礎レベル' },
  { min: 60, max: 79, label: 'Intermediate (60-79)', vocabCount: 5000, description: '中級レベル' },
  { min: 80, max: 99, label: 'Advanced (80-99)', vocabCount: 8000, description: '上級レベル' },
  { min: 100, max: 120, label: 'Expert (100+)', vocabCount: 12000, description: '高得点レベル' },
];

const STORAGE_KEY = 'firstlight_study_goal';

export function getStudyGoal(): StudyGoal {
  if (typeof window === 'undefined') return {};
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try { return JSON.parse(raw); } catch { return {}; }
}

export function setStudyGoal(goal: StudyGoal): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(goal));
}

export function getGradeRequirement(grade: EikenGrade): GradeRequirement {
  return EIKEN_GRADES.find(g => g.grade === grade) ?? EIKEN_GRADES[4]; // default to 2級
}

export function getToeflTier(score: number): ToeflTier {
  return TOEFL_TIERS.find(t => score >= t.min && score <= t.max) ?? TOEFL_TIERS[1];
}

/**
 * Map existing vocab cards to eiken grade by difficulty:
 * difficulty 1-2: 5級〜3級
 * difficulty 2-3: 準2級〜2級
 * difficulty 3-4: 準1級
 * difficulty 5-6: 1級/TOEFL
 */
export function getVocabCountForGrade(
  totalMastered: number,
  cardsByDifficulty: Record<number, { total: number; mastered: number }>
): Record<EikenGrade, { required: number; mastered: number; rate: number }> {
  let cumulativeMastered = 0;
  let cumulativeTotal = 0;

  const gradeProgress: Record<string, { required: number; mastered: number; rate: number }> = {};

  for (const grade of EIKEN_GRADES) {
    // Count cards within this grade's difficulty range
    for (let d = grade.minDifficulty; d <= grade.maxDifficulty; d++) {
      const data = cardsByDifficulty[d];
      if (data) {
        cumulativeMastered += data.mastered;
        cumulativeTotal += data.total;
      }
    }

    const required = Math.min(grade.vocabCount, cumulativeTotal || grade.vocabCount);
    const mastered = Math.min(cumulativeMastered, required);
    gradeProgress[grade.grade] = {
      required,
      mastered,
      rate: required > 0 ? Math.round((mastered / required) * 100) : 0,
    };
  }

  return gradeProgress as Record<EikenGrade, { required: number; mastered: number; rate: number }>;
}
