'use client';

import { useState, useRef } from 'react';
import { useProfile, updateProfile } from '@/lib/hooks';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Download, Upload, AlertCircle, CheckCircle, RotateCcw } from 'lucide-react';
import { exportAllData, downloadBackup, validateBackup, importData, type BackupData } from '@/lib/backup';

export function Settings() {
  const profile = useProfile();

  if (!profile) return null;

  const { settings } = profile;

  const toggleSetting = async (key: keyof typeof settings) => {
    await updateProfile({
      settings: { ...settings, [key]: !settings[key] },
    });
  };

  return (
    <div className="space-y-6 px-4">
      <h2 className="text-lg font-bold">設定</h2>

      <Card className="divide-y divide-gray-100 dark:divide-gray-800">
        <SettingRow
          label="ダークモード"
          description="画面を暗くして目の負担を軽減"
          checked={settings.darkMode}
          onToggle={() => toggleSetting('darkMode')}
        />
        <SettingRow
          label="ゲーミフィケーション"
          description="XP、レベル、コンボなどの表示"
          checked={settings.gamificationEnabled}
          onToggle={() => toggleSetting('gamificationEnabled')}
        />
        <SettingRow
          label="デイリーチャレンジ"
          description="毎日のおすすめ学習を提案"
          checked={settings.dailyChallengeEnabled}
          onToggle={() => toggleSetting('dailyChallengeEnabled')}
        />
        <SettingRow
          label="サウンド"
          description="正解・レベルアップ時の効果音"
          checked={settings.soundEnabled}
          onToggle={() => toggleSetting('soundEnabled')}
        />
      </Card>

      {/* Profile info */}
      <Card className="p-4">
        <h3 className="text-sm font-medium mb-2">プロフィール</h3>
        <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
          <p>名前: {profile.name || '未設定'}</p>
          <p>タイプ: {profile.learnerType}</p>
          <p>開始日: {new Date(profile.createdAt).toLocaleDateString('ja-JP')}</p>
        </div>
      </Card>

      <BackupSection />

      <DataResetSection />
    </div>
  );
}

function DataResetSection() {
  const [open, setOpen] = useState(false);
  const [resetting, setResetting] = useState(false);

  const handleReset = async () => {
    setResetting(true);
    try {
      const { db } = await import('@/lib/db');
      await db.userProfile.clear();
      await db.vocabCards.clear();
      await db.studySessions.clear();
      await db.dailyChallenges.clear();
      await db.stageProgress.clear();
      await db.challengeResults.clear();
      await db.writingSubmissions.clear();
      window.location.href = '/';
    } catch {
      setResetting(false);
      setOpen(false);
    }
  };

  return (
    <Card className="p-4 border-red-200 dark:border-red-900">
      <h3 className="text-sm font-medium mb-2 text-red-600 dark:text-red-400">データリセット</h3>
      <p className="text-xs text-gray-500 mb-4">
        全ての学習データ・進捗を削除し、最初からやり直します。オープニングから再開されます。
      </p>
      <Dialog open={open} onOpenChange={setOpen}>
        <Button
          variant="outline"
          className="w-full justify-start text-red-600 dark:text-red-400 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950"
          onClick={() => setOpen(true)}
        >
          <RotateCcw className="w-4 h-4 mr-2" /> データをリセットして最初から始める
        </Button>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>本当にリセットしますか？</DialogTitle>
            <DialogDescription>
              全ての学習データ（単語帳・学習履歴・進捗・テスト結果・ライティング提出物）が削除されます。この操作は取り消せません。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              キャンセル
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleReset}
              disabled={resetting}
            >
              {resetting ? 'リセット中...' : 'リセットする'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

function BackupSection() {
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [importMode, setImportMode] = useState<'overwrite' | 'merge'>('overwrite');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    try {
      const data = await exportAllData();
      downloadBackup(data);
      setStatus({ type: 'success', message: 'バックアップをダウンロードしました' });
    } catch {
      setStatus({ type: 'error', message: 'エクスポートに失敗しました' });
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      const validation = validateBackup(data);

      if (!validation.valid) {
        setStatus({ type: 'error', message: validation.error || '不正なファイル' });
        return;
      }

      const result = await importData(data as BackupData, importMode);
      setStatus({ type: result.success ? 'success' : 'error', message: result.message });
    } catch {
      setStatus({ type: 'error', message: 'ファイルの読み込みに失敗しました' });
    }

    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-3">データ管理</h3>
      <p className="text-xs text-gray-500 mb-4">
        全てのデータはこの端末に保存されています（IndexedDB）。バックアップを取っておくと安心です。
      </p>

      <div className="space-y-3">
        <Button onClick={handleExport} variant="outline" className="w-full justify-start">
          <Download className="w-4 h-4 mr-2" /> バックアップをダウンロード
        </Button>

        <div className="space-y-2">
          <div className="flex gap-2">
            <button
              onClick={() => setImportMode('overwrite')}
              className={`flex-1 py-1.5 rounded text-xs ${importMode === 'overwrite' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}
            >
              上書き復元
            </button>
            <button
              onClick={() => setImportMode('merge')}
              className={`flex-1 py-1.5 rounded text-xs ${importMode === 'merge' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}
            >
              マージ
            </button>
          </div>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => fileRef.current?.click()}
          >
            <Upload className="w-4 h-4 mr-2" /> バックアップから復元
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </div>

        {status && (
          <div className={`flex items-center gap-2 p-2 rounded text-xs ${status.type === 'success' ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300' : 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300'}`}>
            {status.type === 'success' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
            {status.message}
          </div>
        )}
      </div>
    </Card>
  );
}

function SettingRow({ label, description, checked, onToggle }: {
  label: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onToggle} />
    </div>
  );
}
