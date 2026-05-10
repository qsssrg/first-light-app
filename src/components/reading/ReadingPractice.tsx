'use client';

import { useState, useMemo, useRef, useCallback } from 'react';
import { READING_QUESTIONS } from '@/lib/reading-data';
import { Check, X, Home, RotateCcw, BookOpen } from 'lucide-react';
import { useProfile } from '@/lib/hooks';
import { calculateXp, getLevelFromXp } from '@/lib/xp';
import { db, AFFINITY_LABELS } from '@/lib/db';
import { MEMBERS, getMember } from '@/lib/members';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import { ComboFlash, XpFloat, TokotonActivation } from '@/components/common/GameEffects';
import { SpeakButton } from '@/components/common/SpeakButton';
import { TypewriterText } from '@/components/common/TypewriterText';
import { getPlayerName } from '@/lib/player-name';
import { addAffinityPoints } from '@/lib/affinity';
import Link from 'next/link';

// Sora member data for explanation speech card
const SORA_MEMBER = MEMBERS.find(m => m.id === 'sora')!;

type EncouragementLevel = 'great' | 'good' | 'struggle';

const ENCOURAGEMENT: Record<string, Record<EncouragementLevel, string[]>> = {
  sora: {
    great: [
      '{name}さん…すごい正答率ですね。尊敬します。',
      '…{name}さんって、もしかして英語得意だったりします？',
      '{name}さんの集中力、見習いたいです。',
    ],
    good: [
      '{name}さん、お疲れさまです。今日も一歩前に進みましたね。',
      '…{name}さんと一緒に勉強できて、嬉しいです。',
      'コツコツ続ける{name}さん、かっこいいと思います。',
    ],
    struggle: [
      '{name}さん…僕も読解、最初は全然でした。大丈夫ですよ。',
      '間違えた問題って、実は一番覚えやすいんですよ。{name}さん、次は大丈夫です。',
      '{name}さん、無理しないでくださいね。明日もここで待ってます。',
    ],
  },
  kai: {
    great: [
      'すごいじゃん、{name}！ この調子なら…俺も負けてられないな。',
      '{name}、完璧だ。やっぱり見込んだ通りだったよ。',
      'さすがだな、{name}。メンバーにも報告しておくよ。',
    ],
    good: [
      'お疲れ、{name}。いい感じだ。この調子で続けていこう。',
      '{name}、着実に伸びてるよ。焦る必要はない。',
      '毎日少しずつ。{name}のペースでいい。俺たちはいつでもここにいる。',
    ],
    struggle: [
      '焦らなくていい、{name}。俺も最初は全然だったんだ。',
      '{name}、大丈夫。今日やったぶんは確実に力になってる。',
      '続けてるだけで{name}はすごいよ。一緒に頑張ろう。',
    ],
  },
  yuuki: {
    great: [
      '{name}〜！ すごすぎ！！ 天才かよ！',
      'やばい！ {name}、こんなにできるの！？ かっこいい！',
      '{name}さん完璧じゃん！ 今度俺にも教えてよ〜！',
    ],
    good: [
      '{name}、お疲れ〜！ 頑張ったね！ 明日もやろ！',
      'いいね{name}！ ちょっとずつ上手くなってるの分かるよ！',
      '{name}と一緒に勉強すると楽しいな〜！ また明日ね！',
    ],
    struggle: [
      '{name}〜、ドンマイドンマイ！ 俺なんかもっとひどかったよ！笑',
      '大丈夫！ {name}なら絶対できるようになるって！ 信じてる！',
      '{name}、やっただけ偉い！ 続けることが一番大事だから！',
    ],
  },
  ren: {
    great: [
      'ふっ…{name}、やるじゃん。ちょっと悔しいわ。',
      '{name}…お前、才能あるんじゃないか。マジで。',
      'いい音聴いた後みたいな爽快感だな。{name}、いい調子だ。',
    ],
    good: [
      '{name}、お疲れ。今日もちゃんとやったな。',
      '悪くない。{name}、このまま続けてくれ。',
      '地道にやってる{name}を見てると、俺もやる気出るんだよな。',
    ],
    struggle: [
      '{name}…まぁ、そういう日もある。気にすんな。',
      '俺も全然ダメな日あったよ。{name}、明日また来いよ。',
      '…{name}。帰る前にもう1問だけ、やってみないか？',
    ],
  },
  haruto: {
    great: [
      '{name}さん…すごいです。僕も見習わないと。',
      '言葉の意味を正確に捉えてる…{name}さん、本当に素敵です。',
      '{name}さんの成長、歌詞に書きたいくらいです。',
    ],
    good: [
      '{name}さん、今日もお疲れさまでした。着実に前に進んでますよ。',
      '一つひとつの単語に、{name}さんの努力が詰まってると思います。',
      '{name}さんと一緒に学べて…僕も頑張れます。',
    ],
    struggle: [
      '{name}さん、大丈夫です。僕も最初は何も分からなかった。',
      '言葉って不思議で…繰り返すうちに急に分かる瞬間が来るんです。{name}さんもきっと。',
      '{name}さん、今日来てくれたこと自体が、もう前進ですから。',
    ],
  },
};

function getEncouragement(studied: number, correctRate: number): { member: typeof MEMBERS[0]; message: string } {
  const name = getPlayerName() || 'マネージャー';
  const level: EncouragementLevel = correctRate >= 0.8 ? 'great' : correctRate >= 0.5 ? 'good' : 'struggle';
  const memberKeys = Object.keys(ENCOURAGEMENT);
  const memberId = memberKeys[Math.floor(Math.random() * memberKeys.length)];
  const member = MEMBERS.find(m => m.id === memberId)!;
  const messages = ENCOURAGEMENT[memberId][level];
  const message = messages[Math.floor(Math.random() * messages.length)]
    .replace(/\{name\}/g, name);
  return { member, message };
}

export function ReadingPractice() {
  const profile = useProfile();
  const en = profile?.settings?.englishSpeakerMode ?? false;

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [sessionXp, setSessionXp] = useState(0);
  const [lastXp, setLastXp] = useState(0);
  const [xpTrigger, setXpTrigger] = useState(0);
  const [isTokoton, setIsTokoton] = useState(false);
  const [tokotonJustActivated, setTokotonJustActivated] = useState(false);
  const [levelUpDisplay, setLevelUpDisplay] = useState<number | null>(null);
  const [affinityLevelUp, setAffinityLevelUp] = useState<{ memberId: string; level: number } | null>(null);
  const startTimeRef = useRef(Date.now());

  const questions = useMemo(() => {
    const shuffled = [...READING_QUESTIONS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  }, []);

  const totalCards = questions.length;

  const handleSelect = useCallback((index: number) => {
    if (confirmed) return;
    setSelected(index);
  }, [confirmed]);

  const handleConfirm = useCallback(async () => {
    if (selected === null) return;
    setConfirmed(true);

    const isCorrect = selected === questions[current].correctIndex;
    if (isCorrect) {
      setScore(s => s + 1);
      const newCombo = combo + 1;
      setCombo(newCombo);
      setMaxCombo(Math.max(maxCombo, newCombo));

      const xp = calculateXp(true, newCombo);
      setSessionXp(prev => prev + xp);
      setLastXp(xp);
      setXpTrigger(prev => prev + 1);

      // Update XP in DB
      const profileRec = await db.userProfile.toCollection().first();
      if (profileRec?.id) {
        const newTotalXp = profileRec.totalXp + xp;
        const oldLevel = getLevelFromXp(profileRec.totalXp);
        const newLevel = getLevelFromXp(newTotalXp);
        await db.userProfile.update(profileRec.id, {
          xp: profileRec.xp + xp,
          totalXp: newTotalXp,
          level: newLevel,
        });
        if (newLevel > oldLevel) {
          setLevelUpDisplay(newLevel);
          setTimeout(() => setLevelUpDisplay(null), 3000);
        }
      }

      // Record study session
      await db.studySessions.add({
        date: new Date(),
        axis: 'reading',
        correctCount: 1,
        totalCount: 1,
        xpEarned: xp,
        comboMax: newCombo,
        duration: 0,
      } as any);

      // Affinity for reading → sora
      const aff = await addAffinityPoints('reading', 5);
      if (aff.leveled) {
        setAffinityLevelUp({ memberId: aff.memberId, level: aff.newLevel });
        setTimeout(() => setAffinityLevelUp(null), 3000);
      }

      // Tokoton activation at combo 10
      if (newCombo >= 10 && !isTokoton) {
        setIsTokoton(true);
        setTokotonJustActivated(true);
        setTimeout(() => setTokotonJustActivated(false), 2500);
      }
    } else {
      setCombo(0);
      setIsTokoton(false);
    }
  }, [selected, current, questions, combo, maxCombo, isTokoton]);

  const handleNext = useCallback(() => {
    if (current + 1 >= questions.length) {
      import('@/lib/streak').then(({ onStudyComplete }) => onStudyComplete());
    }
    setCurrent(c => c + 1);
    setSelected(null);
    setConfirmed(false);
  }, [current, questions.length]);

  const resetSession = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setConfirmed(false);
    setCombo(0);
    setMaxCombo(0);
    setSessionXp(0);
    setIsTokoton(false);
    startTimeRef.current = Date.now();
  };

  // ─── Completion screen (game-style, matching VocabStudy) ───
  if (current >= questions.length) {
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 60000);
    const correctRate = totalCards > 0 ? score / totalCards : 0;
    const rank = correctRate >= 0.9 ? 'S' : correctRate >= 0.7 ? 'A' : correctRate >= 0.5 ? 'B' : 'C';
    const rankColors: Record<string, string> = {
      S: 'from-yellow-400 via-amber-300 to-yellow-500 text-yellow-900',
      A: 'from-indigo-400 via-purple-400 to-fuchsia-400 text-white',
      B: 'from-emerald-400 via-green-400 to-teal-400 text-white',
      C: 'from-gray-400 via-gray-300 to-gray-400 text-gray-800',
    };
    const encouragement = score > 0 ? getEncouragement(totalCards, correctRate) : null;

    return (
      <div className="min-h-[85vh] flex flex-col px-4 py-6">
        {/* Header */}
        <p className="text-center text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase mb-6">
          Session Complete
        </p>

        <div className="flex-1 space-y-5">
          {/* Rank badge */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-[10px] text-gray-500 tracking-wider uppercase">{en ? 'Rank' : 'ランク'}</p>
            <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${rankColors[rank]} flex items-center justify-center shadow-2xl`}>
              <span className="text-5xl font-black">{rank}</span>
            </div>
            <p className="text-xs text-gray-500">
              {rank === 'S' ? (en ? '90%+ accuracy' : '正答率90%+') : rank === 'A' ? (en ? '70%+ accuracy' : '正答率70%+') : rank === 'B' ? (en ? '50%+ accuracy' : '正答率50%+') : (en ? 'Under 50%' : '正答率50%未満')}
            </p>
          </div>

          {/* XP gauge */}
          {sessionXp > 0 && (
            <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">獲得XP</p>
                <p className="text-lg font-black text-amber-400">+{sessionXp}</p>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min(100, (sessionXp / 200) * 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-4 text-center">
              <p className="text-2xl font-black text-indigo-400">{totalCards}</p>
              <p className="text-[10px] text-gray-500 tracking-wider uppercase mt-1">Questions</p>
            </div>
            <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-4 text-center">
              <p className="text-2xl font-black text-purple-400">{sessionXp}</p>
              <p className="text-[10px] text-gray-500 tracking-wider uppercase mt-1">XP Earned</p>
            </div>
            <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-4 text-center">
              <p className="text-2xl font-black text-orange-400">🔥 {maxCombo}</p>
              <p className="text-[10px] text-gray-500 tracking-wider uppercase mt-1">Max Combo</p>
            </div>
            <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-4 text-center">
              <p className="text-2xl font-black text-fuchsia-400">{elapsed > 0 ? `${elapsed}m` : '<1m'}</p>
              <p className="text-[10px] text-gray-500 tracking-wider uppercase mt-1">Time</p>
            </div>
          </div>

          {/* Member encouragement */}
          {encouragement && (
            <div className="rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex gap-3 items-start">
                <div className="shrink-0">
                  <MemberAvatar member={encouragement.member} size="md" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{encouragement.member.nameJa}</p>
                  <TypewriterText text={encouragement.message} speed={40} className="text-sm font-medium text-gray-800 dark:text-gray-100" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="space-y-2.5 pt-4 pb-2">
          <Link href="/" className="block">
            <button className="w-full py-3.5 rounded-xl text-sm font-bold tracking-wide bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <Home className="w-4 h-4" /> ホームに戻る
            </button>
          </Link>
          <div className="flex gap-2.5">
            <button
              onClick={resetSession}
              className="flex-1 py-3 rounded-xl text-sm font-medium border-2 border-gray-700/50 text-gray-300 hover:border-gray-500 hover:bg-gray-800/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> もう一度
            </button>
            <Link href="/reading" className="flex-1">
              <button className="w-full py-3 rounded-xl text-sm font-medium border-2 border-blue-700/50 text-blue-300 hover:border-blue-500 hover:bg-blue-800/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                <BookOpen className="w-4 h-4" /> リーディングへ
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const isCorrect = selected === q.correctIndex;

  // ─── Result screen (after confirming, game-style matching VocabStudy) ───
  if (confirmed) {
    return (
      <div className="min-h-[85vh] flex flex-col px-4 py-3">
        {/* Game effects overlay */}
        <ComboFlash combo={combo} />
        <XpFloat xp={lastXp} trigger={xpTrigger} />
        <TokotonActivation active={tokotonJustActivated} />

        {/* Level-up notification */}
        {levelUpDisplay && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            <div className="animate-combo-flash text-center">
              <div className="w-28 h-28 mx-auto rounded-2xl bg-gradient-to-br from-yellow-400 via-amber-300 to-yellow-500 flex items-center justify-center shadow-2xl shadow-yellow-500/50 mb-3">
                <span className="text-4xl font-black text-yellow-900">Lv.{levelUpDisplay}</span>
              </div>
              <p className="text-2xl font-black bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent drop-shadow-lg">
                LEVEL UP!
              </p>
              <p className="text-sm text-yellow-200/80 mt-1">新しいレベルに到達しました</p>
            </div>
          </div>
        )}

        {/* Affinity level-up notification */}
        {affinityLevelUp && (() => {
          const m = getMember(affinityLevelUp.memberId);
          const label = AFFINITY_LABELS[affinityLevelUp.level - 1] ?? '';
          return (
            <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
              <div className="animate-combo-flash text-center">
                {m && <div className="flex justify-center mb-2"><MemberAvatar member={m} size="lg" /></div>}
                <p className="text-xl font-black text-pink-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
                  ♡ 親密度UP ♡
                </p>
                <p className="text-sm text-pink-300 mt-1">{m?.nameJa}との関係: {label}</p>
              </div>
            </div>
          );
        })()}

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold tracking-wider text-gray-400">RESULT</span>
            <div className="flex items-center gap-3">
              {combo > 0 && <span className="text-xs font-black text-orange-400">🔥 {combo}</span>}
              <span className="text-xs font-medium text-gray-400">{current + 1} / {totalCards}</span>
            </div>
          </div>
          <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 transition-all duration-500" style={{ width: `${((current + 1) / totalCards) * 100}%` }} />
          </div>
        </div>

        {/* Result card */}
        <div className={`rounded-2xl p-6 text-center border-2 backdrop-blur-md shadow-xl ${
          isCorrect
            ? 'border-emerald-400/50 bg-emerald-500/5 shadow-emerald-500/10'
            : 'border-red-400/50 bg-red-500/5 shadow-red-500/10'
        }`}>
          {/* Big result icon */}
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            isCorrect
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'bg-red-500/20 text-red-400'
          }`}>
            {isCorrect ? <Check className="w-8 h-8" /> : <X className="w-8 h-8" />}
          </div>
          <p className={`text-lg font-black mb-4 ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </p>

          {/* Selected vs correct */}
          {selected !== null && (
            <div className="mt-3 space-y-2 text-left px-2">
              {!isCorrect && (
                <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-red-500/10">
                  <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-red-300">{q.options[selected]}</span>
                </div>
              )}
              <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-emerald-500/10">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm text-emerald-300">{q.options[q.correctIndex]}</span>
              </div>
            </div>
          )}
        </div>

        {/* Sora's explanation speech card */}
        <div className="mt-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex gap-3 items-start">
            <div className="shrink-0">
              <MemberAvatar member={SORA_MEMBER} size="md" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{SORA_MEMBER.nameJa}</p>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-100 leading-relaxed">{q.explanation}</p>
            </div>
          </div>
        </div>

        {/* Next button */}
        <div className="mt-auto pt-4 pb-2">
          <button
            onClick={handleNext}
            className="w-full py-3.5 rounded-xl text-sm font-bold tracking-wide bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl active:scale-[0.98] transition-all"
          >
            {current + 1 >= questions.length ? (en ? 'See Results' : '結果を見る') : (en ? 'Next →' : '次の問題 →')}
          </button>
        </div>
      </div>
    );
  }

  // ─── Question screen (game-style, matching VocabStudy) ───
  return (
    <div className="min-h-[85vh] flex flex-col px-4 py-3">
      {/* Game effects overlay */}
      <ComboFlash combo={combo} />
      <XpFloat xp={lastXp} trigger={xpTrigger} />
      <TokotonActivation active={tokotonJustActivated} />

      {/* Level-up notification */}
      {levelUpDisplay && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="animate-combo-flash text-center">
            <div className="w-28 h-28 mx-auto rounded-2xl bg-gradient-to-br from-yellow-400 via-amber-300 to-yellow-500 flex items-center justify-center shadow-2xl shadow-yellow-500/50 mb-3">
              <span className="text-4xl font-black text-yellow-900">Lv.{levelUpDisplay}</span>
            </div>
            <p className="text-2xl font-black bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent drop-shadow-lg">
              LEVEL UP!
            </p>
            <p className="text-sm text-yellow-200/80 mt-1">新しいレベルに到達しました</p>
          </div>
        </div>
      )}

      {/* Affinity level-up notification */}
      {affinityLevelUp && (() => {
        const m = getMember(affinityLevelUp.memberId);
        const label = AFFINITY_LABELS[affinityLevelUp.level - 1] ?? '';
        return (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            <div className="animate-combo-flash text-center">
              {m && <div className="flex justify-center mb-2"><MemberAvatar member={m} size="lg" /></div>}
              <p className="text-xl font-black text-pink-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
                ♡ 親密度UP ♡
              </p>
              <p className="text-sm text-pink-300 mt-1">{m?.nameJa}との関係: {label}</p>
            </div>
          </div>
        );
      })()}

      {/* Progress header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold tracking-wider text-indigo-400">READING</span>
          <div className="flex items-center gap-3">
            {combo > 0 && (
              <span className="text-xs font-black text-orange-400 animate-pulse">🔥 {combo}</span>
            )}
            <span className="text-xs font-medium text-gray-400">{current + 1} / {totalCards}</span>
          </div>
        </div>
        <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 transition-all duration-500"
            style={{ width: `${((current + 1) / totalCards) * 100}%` }}
          />
        </div>
      </div>

      {/* Question card — glassmorphism (matching VocabStudy) */}
      <div className="rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/10 p-6 text-center shadow-xl mb-4">
        <p className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase mb-3">
          {q.level === 'toefl' ? 'TOEFL' : q.level === 'eiken_pre1' ? '準1級' : '2級'}
        </p>
        {/* Passage */}
        <div className="text-left mb-4">
          <div className="flex items-start gap-2">
            <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-100 italic font-medium">{q.passage}</p>
            <SpeakButton text={q.passage} className="shrink-0" />
          </div>
        </div>
        {/* Question */}
        <p className="text-xs text-gray-500 mt-3 font-medium">{q.question}</p>
      </div>

      {/* Options — game-style buttons (matching VocabStudy) */}
      <div className="space-y-2.5 flex-1">
        {q.options.map((opt, i) => (
          <button
            key={`${current}-${i}`}
            onClick={() => handleSelect(i)}
            className={`w-full text-left px-5 py-3.5 rounded-xl border-2 transition-all duration-200 text-sm font-medium ${
              selected === i
                ? 'border-indigo-400 bg-indigo-500/20 text-white shadow-lg shadow-indigo-500/20 scale-[1.02]'
                : 'border-gray-700/50 bg-gray-800/30 hover:border-gray-500 hover:bg-gray-800/50 text-gray-200 active:scale-[0.98]'
            }`}
          >
            <span className="inline-flex items-center gap-2.5">
              <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 ${
                selected === i ? 'border-indigo-400 bg-indigo-500 text-white' : 'border-gray-600 text-gray-500'
              }`}>
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </span>
          </button>
        ))}
      </div>

      {/* Confirm button — gradient (matching VocabStudy) */}
      <div className="mt-4 pb-2">
        <button
          onClick={handleConfirm}
          disabled={selected === null}
          className={`w-full py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 ${
            selected !== null
              ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 active:scale-[0.98]'
              : 'bg-gray-800 text-gray-600 cursor-not-allowed'
          }`}
        >
          {en ? 'Confirm' : '決定'}
        </button>

        {/* XP indicator */}
        {sessionXp > 0 && (
          <p className="text-center text-xs text-indigo-400/70 font-medium mt-2">
            +{sessionXp} XP
          </p>
        )}
      </div>
    </div>
  );
}
