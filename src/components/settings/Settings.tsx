'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useProfile, updateProfile } from '@/lib/hooks';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Download, Upload, AlertCircle, CheckCircle, RotateCcw, BookOpen, UserPen, RefreshCw } from 'lucide-react';
import { exportAllData, downloadBackup, validateBackup, importData, type BackupData } from '@/lib/backup';
import { getPlayerName, setPlayerName } from '@/lib/player-name';
import { openingScenario, preAssessmentScenario, postAssessmentScenario } from '@/lib/scenarios/opening';
import { ASSESSMENT_QUESTIONS, determineLearnerType } from '@/components/home/Onboarding';
import { Progress } from '@/components/ui/progress';
import { MEMBERS } from '@/lib/members';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import type { SkillAxis } from '@/types';

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
          <p>名前: {profile.name || getPlayerName() || '未設定'}</p>
          <p>タイプ: {profile.learnerType}</p>
          <p>開始日: {new Date(profile.createdAt).toLocaleDateString('ja-JP')}</p>
        </div>
      </Card>

      <NameChangeSection currentName={profile.name || getPlayerName() || ''} />

      <ReAssessmentSection currentType={profile.learnerType} currentSkills={profile.skills} />

      <StoryRecollectionSection />

      <BackupSection />

      <DataResetSection />
    </div>
  );
}

function NameChangeSection({ currentName }: { currentName: string }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(currentName);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    const trimmed = name.trim();
    if (trimmed.length === 0) return;
    setPlayerName(trimmed);
    await updateProfile({ name: trimmed });
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
        <UserPen className="w-4 h-4" /> 名前の変更
      </h3>
      <p className="text-xs text-gray-500 mb-3">メンバーがあなたを呼ぶ名前を変更できます。</p>
      {editing ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-sm focus:outline-none focus:border-indigo-400"
            maxLength={20}
            autoFocus
          />
          <Button size="sm" onClick={handleSave} disabled={name.trim().length === 0}>保存</Button>
          <Button size="sm" variant="outline" onClick={() => { setEditing(false); setName(currentName); }}>取消</Button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-sm">{currentName || '未設定'}</span>
          <Button size="sm" variant="outline" onClick={() => setEditing(true)}>変更</Button>
        </div>
      )}
      {saved && (
        <p className="text-xs text-green-500 mt-2 flex items-center gap-1">
          <CheckCircle className="w-3 h-3" /> 名前を変更しました
        </p>
      )}
    </Card>
  );
}

function ReAssessmentSection({ currentType, currentSkills }: { currentType: string; currentSkills: Record<SkillAxis, number> }) {
  const [phase, setPhase] = useState<'idle' | 'assessing' | 'result'>('idle');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<SkillAxis, number>>({
    vocabulary: 0, reading: 0, listening: 0, writing: 0, grammar: 0,
  });
  const [saved, setSaved] = useState(false);

  const handleAnswer = (axis: SkillAxis, score: number) => {
    setScores(prev => ({ ...prev, [axis]: score }));
    if (questionIndex < ASSESSMENT_QUESTIONS.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setPhase('result');
    }
  };

  const handleSave = async () => {
    const newType = determineLearnerType(scores);
    await updateProfile({ learnerType: newType, skills: scores });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setPhase('idle');
      setQuestionIndex(0);
    }, 1500);
  };

  const handleCancel = () => {
    setPhase('idle');
    setQuestionIndex(0);
    setScores({ vocabulary: 0, reading: 0, listening: 0, writing: 0, grammar: 0 });
  };

  if (phase === 'assessing') {
    const q = ASSESSMENT_QUESTIONS[questionIndex];
    return (
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">タイプ再診断</h3>
            <button onClick={handleCancel} className="text-xs text-gray-400 hover:text-gray-600">やめる</button>
          </div>
          <Progress value={((questionIndex + 1) / ASSESSMENT_QUESTIONS.length) * 100} className="h-1.5" />
          <p className="text-xs text-gray-500 text-right">{questionIndex + 1} / {ASSESSMENT_QUESTIONS.length}</p>
          <h4 className="text-sm font-medium">{q.question}</h4>
          <div className="space-y-2">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(q.axis, opt.score)}
                className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors text-xs"
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (phase === 'result') {
    const newType = determineLearnerType(scores);
    const changed = newType !== currentType;
    const strongAxis = (Object.entries(scores) as [SkillAxis, number][])
      .reduce((a, b) => b[1] > a[1] ? b : a)[0];
    const strongMember = MEMBERS.find(m => m.axis === strongAxis)!;

    return (
      <Card className="p-4">
        <div className="space-y-4 text-center">
          <h3 className="text-sm font-medium">診断結果</h3>
          <MemberAvatar member={strongMember} size="lg" showName />
          <p className="text-sm">
            あなたのタイプは <span className="font-bold">{newType}</span>
          </p>
          {changed && (
            <p className="text-xs text-amber-600 dark:text-amber-400">
              {currentType} → {newType} に変わります
            </p>
          )}
          <div className="space-y-1">
            {(Object.entries(scores) as [SkillAxis, number][]).map(([axis, score]) => {
              const member = MEMBERS.find(m => m.axis === axis);
              return (
                <div key={axis} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: member?.color }} />
                  <span className="text-xs flex-1">{member?.role}</span>
                  <span className="text-xs font-medium">{score}</span>
                </div>
              );
            })}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleCancel} className="flex-1">やめる</Button>
            <Button size="sm" onClick={handleSave} className="flex-1">
              {saved ? '保存しました ✓' : '保存する'}
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
        <RefreshCw className="w-4 h-4" /> タイプ再診断
      </h3>
      <p className="text-xs text-gray-500 mb-3">
        現在のタイプ: <span className="font-medium">{currentType}</span>。英語力の変化に合わせて診断し直せます。
      </p>
      <Button size="sm" variant="outline" onClick={() => setPhase('assessing')}>
        診断し直す
      </Button>
    </Card>
  );
}

function StoryRecollectionSection() {
  const router = useRouter();

  const stories = [
    { id: 'opening', label: 'オープニング', desc: '夜の街でFIRST LIGHTと出会う' },
    { id: 'pre-assessment', label: 'アセスメント前', desc: '翌日、芸能オフィスに呼ばれて' },
    { id: 'post-assessment', label: 'アセスメント後', desc: '英語力判定の結果を受けて' },
  ];

  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
        <BookOpen className="w-4 h-4" /> ストーリー回想
      </h3>
      <p className="text-xs text-gray-500 mb-3">過去に見たストーリーをもう一度再生できます。</p>
      <div className="space-y-2">
        {stories.map((s) => (
          <button
            key={s.id}
            onClick={() => router.push(`/story-replay?id=${s.id}`)}
            className="w-full text-left px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors"
          >
            <p className="text-sm font-medium">{s.label}</p>
            <p className="text-xs text-gray-500">{s.desc}</p>
          </button>
        ))}
      </div>
    </Card>
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
