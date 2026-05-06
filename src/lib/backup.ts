import { db } from './db';

export interface BackupData {
  version: number;
  exportedAt: string;
  userProfile: any[];
  vocabCards: any[];
  studySessions: any[];
  dailyChallenges: any[];
  stageProgress: any[];
  challengeResults: any[];
  writingSubmissions: any[];
}

export async function exportAllData(): Promise<BackupData> {
  const [userProfile, vocabCards, studySessions, dailyChallenges, stageProgress, challengeResults, writingSubmissions] = await Promise.all([
    db.userProfile.toArray(),
    db.vocabCards.toArray(),
    db.studySessions.toArray(),
    db.dailyChallenges.toArray(),
    db.stageProgress.toArray(),
    db.challengeResults.toArray(),
    db.writingSubmissions.toArray(),
  ]);

  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    userProfile,
    vocabCards,
    studySessions,
    dailyChallenges,
    stageProgress,
    challengeResults,
    writingSubmissions,
  };
}

export function downloadBackup(data: BackupData) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const a = document.createElement('a');
  a.href = url;
  a.download = `first-light-backup-${date}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function validateBackup(data: unknown): { valid: boolean; error?: string } {
  if (!data || typeof data !== 'object') return { valid: false, error: 'JSONが不正です' };
  const d = data as any;
  if (!d.version || !d.exportedAt) return { valid: false, error: 'バックアップ形式が不正です' };
  if (!Array.isArray(d.vocabCards)) return { valid: false, error: 'vocabCardsが見つかりません' };
  return { valid: true };
}

export async function importData(data: BackupData, mode: 'overwrite' | 'merge'): Promise<{ success: boolean; message: string }> {
  try {
    if (mode === 'overwrite') {
      // Clear all tables then import
      await Promise.all([
        db.userProfile.clear(),
        db.vocabCards.clear(),
        db.studySessions.clear(),
        db.dailyChallenges.clear(),
        db.stageProgress.clear(),
        db.challengeResults.clear(),
        db.writingSubmissions.clear(),
      ]);

      await Promise.all([
        data.userProfile?.length ? db.userProfile.bulkAdd(data.userProfile) : Promise.resolve(),
        data.vocabCards?.length ? db.vocabCards.bulkAdd(data.vocabCards) : Promise.resolve(),
        data.studySessions?.length ? db.studySessions.bulkAdd(data.studySessions) : Promise.resolve(),
        data.dailyChallenges?.length ? db.dailyChallenges.bulkAdd(data.dailyChallenges) : Promise.resolve(),
        data.stageProgress?.length ? db.stageProgress.bulkAdd(data.stageProgress) : Promise.resolve(),
        data.challengeResults?.length ? db.challengeResults.bulkAdd(data.challengeResults) : Promise.resolve(),
        data.writingSubmissions?.length ? db.writingSubmissions.bulkAdd(data.writingSubmissions) : Promise.resolve(),
      ]);

      return { success: true, message: 'データを上書き復元しました' };
    } else {
      // Merge: add only new records (skip duplicates by catching errors)
      const results = await Promise.allSettled([
        data.vocabCards?.length ? db.vocabCards.bulkPut(data.vocabCards) : Promise.resolve(),
        data.studySessions?.length ? db.studySessions.bulkPut(data.studySessions) : Promise.resolve(),
        data.stageProgress?.length ? db.stageProgress.bulkPut(data.stageProgress) : Promise.resolve(),
        data.challengeResults?.length ? db.challengeResults.bulkPut(data.challengeResults) : Promise.resolve(),
        data.writingSubmissions?.length ? db.writingSubmissions.bulkPut(data.writingSubmissions) : Promise.resolve(),
      ]);

      const failed = results.filter(r => r.status === 'rejected').length;
      return {
        success: true,
        message: failed > 0
          ? `マージ完了（一部スキップ: ${failed}件）`
          : 'データをマージしました',
      };
    }
  } catch (error) {
    return { success: false, message: `復元に失敗しました: ${error}` };
  }
}
