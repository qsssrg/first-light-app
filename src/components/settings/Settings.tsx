'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProfile, updateProfile } from '@/lib/hooks';
import { getApiKey, setApiKey } from '@/lib/api-key';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Download, Upload, AlertCircle, CheckCircle, RotateCcw, BookOpen, UserPen, RefreshCw, Trophy, Key } from 'lucide-react';
import { exportAllData, downloadBackup, validateBackup, importData, type BackupData } from '@/lib/backup';
import { getPlayerName, setPlayerName } from '@/lib/player-name';
import { openingScenario, preAssessmentScenario, postAssessmentScenario } from '@/lib/scenarios/opening';
import { ASSESSMENT_QUESTIONS, determineLearnerType } from '@/components/home/Onboarding';
import { Progress } from '@/components/ui/progress';
import { MEMBERS } from '@/lib/members';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import type { SkillAxis } from '@/types';
import { getStudyGoal, setStudyGoal, EIKEN_GRADES, type StudyGoal, type EikenSetting, type ToeflSetting } from '@/lib/study-goals';
import { getBirthday, setBirthday } from '@/lib/birthday';
import { getFontSize, setFontSize, FONT_SIZE_OPTIONS, type FontSize } from '@/lib/font-size';
import { isPsychologyEventEnabled, setPsychologyEventEnabled } from '@/lib/psychology-settings';
import { getAvatarStyle, setAvatarStyle, AVATAR_OPTIONS, type AvatarStyle } from '@/lib/user-avatar';
import { AvatarSilhouette } from '@/components/common/AvatarSilhouette';
import { TypewriterText } from '@/components/common/TypewriterText';

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
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-5 text-white shadow-lg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.05)_0%,transparent_50%)]" />
        <div className="relative">
          <h2 className="text-xl font-black tracking-wide">設定</h2>
          <p className="text-xs opacity-60 mt-0.5">Settings</p>
        </div>
      </div>

      {/* 1. 推しメンバー */}
      <OshiMemberSection currentOshi={profile.settings.oshiMemberId} />

      {/* 2. プロフィール */}
      <Card className="p-4">
        <h3 className="text-sm font-medium mb-3">プロフィール</h3>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-1">
            <AvatarSelector />
            <span className="text-[9px] text-indigo-400">変更</span>
          </div>
          <div className="flex-1 text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <p>名前: {profile.name || getPlayerName() || '未設定'}</p>
            <p>タイプ: {profile.learnerType}</p>
            <p>開始日: {new Date(profile.createdAt).toLocaleDateString('ja-JP')}</p>
          </div>
        </div>
        <PlayerMonologue />
        <BirthdayInput />
        <div className="flex gap-2 mt-3">
          <a href="#name-change" className="flex-1">
            <Button variant="outline" size="sm" className="w-full text-xs"><UserPen className="w-3 h-3 mr-1" />名前を変更</Button>
          </a>
          <a href="#re-assessment" className="flex-1">
            <Button variant="outline" size="sm" className="w-full text-xs"><RefreshCw className="w-3 h-3 mr-1" />タイプ再診断</Button>
          </a>
        </div>
      </Card>

      {/* 3. 学習目標 */}
      <GoalSettingSection />

      {/* 4. ストーリー回想 */}
      <StoryRecollectionSection />

      {/* 5. 文字サイズ */}
      <FontSizeSection />

      {/* 6. トグル設定 */}
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
        <SettingRow
          label="English Speaker Mode"
          description="英語だけで学習する上級モード"
          checked={settings.englishSpeakerMode}
          onToggle={() => toggleSetting('englishSpeakerMode')}
        />
        <PsychologyEventToggle />
      </Card>

      {/* 6. APIキー */}
      <ApiKeySection />

      {/* 7. データ管理 */}
      <BackupSection />

      {/* 8. データリセット */}
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
    <Card id="name-change" className="p-4">
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

function HelpPopover({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-block">
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-[10px] font-bold inline-flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        ?
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-6 z-50 w-56 p-3 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-300">
            {text}
          </div>
        </>
      )}
    </span>
  );
}

function GoalSettingSection() {
  const [goal, setGoalState] = useState<StudyGoal>(() => getStudyGoal());
  const [saved, setSaved] = useState(false);
  const [warning, setWarning] = useState('');

  const handleSave = (newGoal: StudyGoal) => {
    // Prevent both being 'none'
    if (newGoal.eiken === 'none' && newGoal.toeflTarget === 'none') {
      setWarning('英検とTOEFLの両方を「なし」にはできません。片方は設定してください。');
      return;
    }
    setWarning('');
    setStudyGoal(newGoal);
    setGoalState(newGoal);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const eikenBtnClass = (val: EikenSetting | undefined, target: EikenSetting) =>
    `py-2 px-1 rounded-lg text-xs font-medium transition-colors ${
      val === target ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`;

  const toeflBtnClass = (val: ToeflSetting | undefined, target: ToeflSetting) =>
    `py-2 rounded-lg text-xs font-medium transition-colors ${
      val === target ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`;

  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
        <Trophy className="w-4 h-4" /> 学習目標
      </h3>
      <p className="text-xs text-gray-500 mb-4">目標を設定すると、学習プランが最適化されます。</p>

      {/* 英検 */}
      <div className="mb-4">
        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
          英検の目標 <HelpPopover text="おまかせ: スキルレベルに応じて自動設定。なし: 英検関連の単語は出題されません。各級: その級の合格を目標に学習します。" />
        </p>
        <div className="grid grid-cols-5 gap-1.5">
          {EIKEN_GRADES.map(g => (
            <button key={g.grade} onClick={() => handleSave({ ...goal, eiken: g.grade })} className={eikenBtnClass(goal.eiken, g.grade)}>
              {g.label}
            </button>
          ))}
          <button onClick={() => handleSave({ ...goal, eiken: 'auto' })} className={eikenBtnClass(goal.eiken, 'auto')}>
            おまかせ
          </button>
          <button onClick={() => handleSave({ ...goal, eiken: 'none' })} className={eikenBtnClass(goal.eiken, 'none')}>
            なし
          </button>
        </div>
        {goal.eiken && goal.eiken !== 'auto' && goal.eiken !== 'none' && (
          <p className="text-xs text-gray-500 mt-1.5">
            {EIKEN_GRADES.find(g => g.grade === goal.eiken)?.description}
            （目標語彙: {EIKEN_GRADES.find(g => g.grade === goal.eiken)?.vocabCount.toLocaleString()}語）
          </p>
        )}
        {goal.eiken === 'auto' && <p className="text-xs text-indigo-500 mt-1.5">スキルレベルに応じて自動設定</p>}
        {goal.eiken === 'none' && <p className="text-xs text-orange-500 mt-1.5">英検関連の単語は出題されません</p>}
      </div>

      {/* TOEFL */}
      <div>
        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
          TOEFL目標スコア <HelpPopover text="おまかせ: スキルレベルに応じて自動設定。なし: TOEFL関連の単語は出題されません。スコア: そのスコア到達を目標に学習します。" />
        </p>
        <div className="grid grid-cols-4 gap-1.5">
          {[60, 80, 90, 100].map(score => (
            <button key={score} onClick={() => handleSave({ ...goal, toeflTarget: score })} className={toeflBtnClass(goal.toeflTarget, score)}>
              {score}
            </button>
          ))}
          <button onClick={() => handleSave({ ...goal, toeflTarget: 'auto' })} className={toeflBtnClass(goal.toeflTarget, 'auto')}>
            おまかせ
          </button>
          <button onClick={() => handleSave({ ...goal, toeflTarget: 'none' })} className={toeflBtnClass(goal.toeflTarget, 'none')}>
            なし
          </button>
        </div>
        {goal.toeflTarget === 'auto' && <p className="text-xs text-indigo-500 mt-1.5">スキルレベルに応じて自動設定</p>}
        {goal.toeflTarget === 'none' && <p className="text-xs text-orange-500 mt-1.5">TOEFL関連の単語は出題されません</p>}
      </div>

      {warning && (
        <p className="text-xs text-red-500 mt-3 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {warning}
        </p>
      )}

      {saved && (
        <p className="text-xs text-green-500 mt-3 flex items-center gap-1">
          <CheckCircle className="w-3 h-3" /> 目標を設定しました
        </p>
      )}
    </Card>
  );
}

const PLAYER_MONOLOGUES = [
  '毎日メンバーに会ってるからか、緊張しなくなってきた',
  'そういえば、なんで私を探してたんだろう？',
  '時々思わせぶりなことを言ってくるけど…勘違いだよね！',
  'リムジン女って呼ばれてるらしい…やめてほしい',
  'カイさんに呼び捨てされると未だにドキッとする',
  'ユウキくん、またSNSで余計なこと言ってないよね…',
  'ハルトくんのノートに名前書かれてたの、まだ気になる',
  'レンさんと同じカフェに行けなくなった…',
  'ソラくんが推薦してた本、私も読んでみようかな',
  'この仕事、夢みたいだけど…バレたらどうしよう',
  'リムジンで迎えに来るのだけはもうやめてください…目立つから…',
  'ファンの探偵力をマジで舐めてた',
  '事務所の廊下ですれ違うだけでも心臓バクバクする',
  'あの配信、袖から見てたの最高だったな…',
  'カイさんが「俺たちが守る」って言ってくれたの、まだ覚えてる',
  'ユウキくんのノリに毎日ツッコむのが日課になってきた',
  'ハルトくんの歌詞、なんか最近やたら刺さるんだけど…',
  'レンさんのギター、生で聴くと鳥肌立つ',
  'ソラくんとは読書の趣味が合いそう',
  '英語教えてるはずなのに、私の方が学んでる気がする',
  'メンバーの誕生日、全部覚えちゃった…プロのファンかな',
  'いつか海外フェスの舞台袖から見れるのかな…楽しみ',
  '帰り道、つい鼻歌でFIRST LIGHTの曲歌っちゃう',
  '推し活してた頃は想像もしなかった今の状況…',
  '秘密を守るの、意外と大変。友達に言いたい…！',
];

function PlayerMonologue() {
  const [text] = useState(() => PLAYER_MONOLOGUES[Math.floor(Math.random() * PLAYER_MONOLOGUES.length)]);
  return (
    <div className="mt-2">
      <div className="relative bg-indigo-50 dark:bg-indigo-950/30 rounded-lg rounded-tl-none p-2.5">
        <div className="absolute left-6 -top-2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-indigo-50 dark:border-b-indigo-950/30" />
        <TypewriterText text={`（${text}）`} speed={30} className="text-xs text-gray-500 dark:text-gray-400 italic" />
      </div>
    </div>
  );
}

function FontSizeSection() {
  const [current, setCurrent] = useState<FontSize>(getFontSize);

  const handleChange = (size: FontSize) => {
    setFontSize(size);
    setCurrent(size);
  };

  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-2">🔤 文字サイズ</h3>
      <div className="flex gap-2">
        {FONT_SIZE_OPTIONS.map(opt => (
          <button
            key={opt.id}
            onClick={() => handleChange(opt.id)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              current === opt.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <p className="text-[9px] text-gray-400 mt-2">レイアウトが崩れる場合があります</p>
    </Card>
  );
}

function BirthdayInput() {
  const [bd, setBd] = useState(getBirthday);
  const [saved, setSaved] = useState(false);

  const handleChange = (month: number, day: number) => {
    setBirthday(month, day);
    setBd({ month, day });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-600 dark:text-gray-400">🎂 誕生日:</span>
        <select
          value={bd?.month ?? ''}
          onChange={e => {
            const m = Number(e.target.value);
            if (m > 0) handleChange(m, bd?.day ?? 1);
          }}
          className="text-xs bg-gray-100 dark:bg-gray-800 rounded px-2 py-1"
        >
          <option value="">月</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}月</option>
          ))}
        </select>
        <select
          value={bd?.day ?? ''}
          onChange={e => {
            const d = Number(e.target.value);
            if (d > 0) handleChange(bd?.month ?? 1, d);
          }}
          className="text-xs bg-gray-100 dark:bg-gray-800 rounded px-2 py-1"
        >
          <option value="">日</option>
          {Array.from({ length: 31 }, (_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}日</option>
          ))}
        </select>
        {saved && <span className="text-[10px] text-green-500">保存しました</span>}
      </div>
      <p className="text-[9px] text-gray-400 mt-1">誕生日にメンバーがお祝いしてくれます</p>
    </div>
  );
}

function OshiMemberSection({ currentOshi }: { currentOshi?: string }) {
  const [selected, setSelected] = useState<string | undefined>(currentOshi);
  const [saved, setSaved] = useState(false);
  const hasChanged = selected !== currentOshi;

  const handleSave = async () => {
    const profile = await import('@/lib/db').then(m => m.db.userProfile.toCollection().first());
    if (!profile?.id) return;
    // Penalty for changing oshi
    if (currentOshi && currentOshi !== selected && currentOshi !== 'hakoshi') {
      const { penaltyOshiChange } = await import('@/lib/affinity-penalty');
      await penaltyOshiChange(currentOshi);
    }
    await updateProfile({
      settings: { ...profile.settings, oshiMemberId: selected },
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <Card className="p-4 overflow-hidden">
      <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
        ⭐ 推しメンバー
      </h3>
      <p className="text-xs text-gray-500 mb-3">
        推しメンバーを選ぶと親密度が2倍たまります。「箱推し」は全員1倍設定になります。
        {currentOshi ? '' : 'タップして選んでね。'}
      </p>
      <div className="grid grid-cols-3 gap-2">
        {MEMBERS.map(m => (
          <button
            key={m.id}
            onClick={() => setSelected(selected === m.id ? undefined : m.id)}
            className={`relative flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
              selected === m.id
                ? 'bg-yellow-500/10 border-2 border-yellow-400'
                : 'hover:bg-white/5 border-2 border-transparent'
            }`}
          >
            <MemberAvatar member={m} size="md" />
            <span className="text-[10px] text-gray-500">{m.nameJa}</span>
            {selected === m.id && (
              <span className="absolute -top-1 -right-1 text-sm">⭐</span>
            )}
          </button>
        ))}
        <button
          onClick={() => setSelected(selected === 'hakoshi' ? undefined : 'hakoshi')}
          className={`relative flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
            selected === 'hakoshi'
              ? 'bg-yellow-500/10 border-2 border-yellow-400'
              : 'hover:bg-white/5 border-2 border-transparent'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-lg">♥</div>
          <span className="text-[10px] text-gray-500">箱推し</span>
          {selected === 'hakoshi' && (
            <span className="absolute -top-1 -right-1 text-sm">⭐</span>
          )}
        </button>
      </div>
      {hasChanged && (
        <div className="mt-3 space-y-2">
          {currentOshi && currentOshi !== 'hakoshi' && (
            <p className="text-[10px] text-amber-500">推し変更で元の推しメンバーの親密度が下がります</p>
          )}
          <Button onClick={handleSave} size="sm" className="w-full">保存する</Button>
        </div>
      )}
      {saved && (
        <p className="text-xs text-green-500 mt-2 text-center flex items-center justify-center gap-1">
          <CheckCircle className="w-3 h-3" /> 推しメンバーを更新しました
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
    <Card id="re-assessment" className="p-4">
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

  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
        <BookOpen className="w-4 h-4" /> ストーリー回想
      </h3>
      <p className="text-xs text-gray-500 mb-3">過去に見たストーリーをもう一度再生できます。</p>
      <Button
        variant="outline"
        className="w-full justify-start"
        onClick={() => router.push('/story-replay')}
      >
        <BookOpen className="w-4 h-4 mr-2" /> ストーリー一覧を見る
      </Button>
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
      await db.memberAffinity.clear();
      window.location.href = '/';
    } catch {
      setResetting(false);
      setOpen(false);
    }
  };

  return (
    <Card className="p-4 border-red-200 dark:border-red-900">
      <h3 className="text-sm font-medium mb-2 text-red-600 dark:text-red-400 flex items-center gap-2">
        <RotateCcw className="w-4 h-4" /> データリセット
      </h3>
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
      <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
        <Download className="w-4 h-4" /> データ管理
      </h3>
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

function PsychologyEventToggle() {
  const [enabled, setEnabled] = useState(() => isPsychologyEventEnabled());
  const [showEvent, setShowEvent] = useState(false);
  const handleToggle = () => {
    const next = !enabled;
    setPsychologyEventEnabled(next);
    setEnabled(next);
    if (next) {
      setShowEvent(true);
      setTimeout(() => setShowEvent(false), 2500);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between p-4">
        <div>
          <p className="text-sm font-medium">心理学バラエティ番組</p>
          <p className="text-xs text-gray-500">ONにすると番組オファーイベントが発生</p>
        </div>
        <Switch checked={enabled} onCheckedChange={handleToggle} />
      </div>
      {showEvent && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="animate-combo-flash text-center">
            <p className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
              イベント発生！
            </p>
          </div>
        </div>
      )}
    </>
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

function ApiKeySection() {
  const [key, setKey] = useState('');
  const [saved, setSaved] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setKey(getApiKey());
  }, []);

  const handleSave = () => {
    setApiKey(key);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClear = () => {
    setKey('');
    setApiKey('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
        <Key className="w-4 h-4" /> Anthropic APIキー
      </h3>
      <p className="text-xs text-gray-500 mb-3">
        添削・スピーキング機能に必要です。キーはブラウザ内のみに保存されます。
      </p>
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type={visible ? 'text' : 'password'}
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="sk-ant-..."
            className="flex-1 px-3 py-2 text-sm border rounded-lg bg-transparent dark:border-gray-700"
          />
          <button
            onClick={() => setVisible(!visible)}
            className="px-2 text-xs text-gray-500 hover:text-gray-700"
          >
            {visible ? '隠す' : '表示'}
          </button>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleSave} disabled={!key.trim()}>
            保存
          </Button>
          {getApiKey() && (
            <Button size="sm" variant="outline" onClick={handleClear}>
              削除
            </Button>
          )}
          {saved && (
            <span className="text-xs text-green-500 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> 保存しました
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}

function AvatarSelector() {
  const [current, setCurrent] = useState<AvatarStyle>(() => getAvatarStyle());
  const [open, setOpen] = useState(false);

  const handleSelect = (style: AvatarStyle) => {
    setAvatarStyle(style);
    setCurrent(style);
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 flex items-center justify-center shrink-0 cursor-pointer hover:border-indigo-400/60 transition-colors active:scale-95 overflow-hidden"
        title="アバターを変更"
      >
        <AvatarSilhouette style={current} size={72} className="text-indigo-300/70" />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative w-80 p-5 rounded-xl bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700" onClick={e => e.stopPropagation()}>
            <p className="text-sm font-bold mb-4">アバターを選ぶ</p>
            <div className="grid grid-cols-3 gap-4 justify-items-center">
              {AVATAR_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-colors ${
                    current === opt.id
                      ? 'bg-indigo-500/20 border-2 border-indigo-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-transparent'
                  }`}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center overflow-hidden">
                    <AvatarSilhouette style={opt.id} size={56} className="text-indigo-300" />
                  </div>
                  <span className="text-[10px] text-gray-500">{opt.label}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setOpen(false)} className="w-full mt-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium">閉じる</button>
          </div>
        </div>
      )}
    </>
  );
}
