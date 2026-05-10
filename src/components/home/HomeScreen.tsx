'use client';

import { useState, useEffect, useRef } from 'react';
import { useProfile, useDueCards } from '@/lib/hooks';
import { getLevelProgress, xpToNextLevel, getLevelFromXp } from '@/lib/xp';
import { LEVEL_THRESHOLDS } from '@/types';
import { MEMBERS, getMember } from '@/lib/members';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { BookOpen, Flame, Target, Sparkles, ArrowRight, Lightbulb, Headphones, FileText, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { getPlayerName } from '@/lib/player-name';
import { AvatarSilhouette } from '@/components/common/AvatarSilhouette';
import { getAvatarStyle } from '@/lib/user-avatar';
import { TypewriterText } from '@/components/common/TypewriterText';
import { isPsychologyEventEnabled, isPsychologyUnlocked } from '@/lib/psychology-settings';
import { addAffinityPointsToMember } from '@/lib/affinity';
import { getNextUnwatchedLevel, markLevelupWatched } from '@/lib/levelup-tracker';
import { getLevelupScenario } from '@/lib/scenarios/adapter';
import { VNEngine } from '@/components/vn/VNEngine';
import { isBirthdayToday, markBirthdayCelebrated } from '@/lib/birthday';
import { birthdayScenario } from '@/lib/scenarios/birthday';
import { getMemberBirthdayToday, markMemberBirthdayCelebrated } from '@/lib/member-birthday';
import { getMemberBirthdayScenario } from '@/lib/scenarios/member-birthday';
import { checkInactivityPenalty } from '@/lib/affinity-penalty';
import { checkAndUpdateStreak } from '@/lib/streak';
import { grandSlamScenario } from '@/lib/scenarios/grand-slam';
import { FAKE_NEWS } from '@/data/fake-news';
import { FAN_POSTS } from '@/data/fan-posts';
import { STAGE_NEWS } from '@/data/stage-news';
import { STAGE_FAN_POSTS } from '@/data/stage-fan-posts';
import { getStoryStage } from '@/lib/chapter-progress';
import { Newspaper, RefreshCw, MessageSquare, Heart, UserCircle } from 'lucide-react';

function NextActionGuide({ profile, dueCardCount, en }: { profile: any; dueCardCount: number; en: boolean }) {
  const getNextAction = () => {
    if (!profile.learnerType || profile.learnerType === 'balanced' && profile.totalXp === 0) {
      return { text: en ? 'Take the assessment' : 'まずレベルを測ろう', desc: en ? 'Measure your English skills across 5 axes' : 'あなたの英語力を5つの軸で判定します', href: '/settings', icon: Target };
    }
    if (dueCardCount > 0) {
      return { text: en ? `Study ${dueCardCount} words` : `${dueCardCount}語の学習しよう`, desc: en ? 'Build your vocabulary' : '単語を学習して語彙力を伸ばそう', href: '/vocab-study', icon: BookOpen };
    }
    if (profile.totalXp < 100) {
      return { text: en ? 'Start learning words' : '単語学習を始めよう', desc: en ? 'Add new words and begin' : '新しい単語を追加して学習スタート', href: '/vocab-study', icon: BookOpen };
    }
    if (!profile.lastStudyAt || Date.now() - new Date(profile.lastStudyAt).getTime() > 86400000) {
      return { text: en ? 'Study today' : '今日の学習をしよう', desc: en ? 'Consistency is key' : '毎日の積み重ねが力になる', href: '/vocabulary', icon: Flame };
    }
    return { text: en ? 'Try writing' : 'ライティングに挑戦しよう', desc: en ? 'Write sentences in English' : '英語で文を書いてみよう', href: '/writing', icon: Sparkles };
  };

  const action = getNextAction();
  const Icon = action.icon;

  return (
    <Link href={action.href}>
      <Card className="p-4 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/50 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
            <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">{en ? 'Suggested' : 'おすすめ'}: {action.text}</p>
            <p className="text-xs text-blue-600 dark:text-blue-400">{action.desc}</p>
          </div>
          <ArrowRight className="w-4 h-4 text-blue-400" />
        </div>
      </Card>
    </Link>
  );
}

function useGreeting(dueCardCount: number, totalXp: number): { member: ReturnType<typeof getMember>; message: string } {
  const [greeting, setGreeting] = useState({ member: getMember('kai')!, message: '' });

  useEffect(() => {
    const name = getPlayerName() || 'マネージャー';
    const hour = new Date().getHours();

    // Time period: latenight(0-4), earlymorning(5-6), morning(7-11), daytime(12-16), evening(17-20), night(21-23)
    const period = hour < 5 ? 'latenight' : hour < 7 ? 'earlymorning' : hour < 12 ? 'morning' : hour < 17 ? 'daytime' : hour < 21 ? 'evening' : 'night';

    type Msg = { id: string; msg: string };
    let msgs: Msg[];

    if (dueCardCount > 10) {
      const base: Record<string, Msg[]> = {
        latenight: [
          { id: 'ren', msg: `…${name}、こんな時間か。${dueCardCount}語溜まってるけど、無理すんなよ。` },
          { id: 'kai', msg: `${name}、まだ起きてるのか。${dueCardCount}語の学習が待ってる。少しだけやって寝よう。` },
        ],
        earlymorning: [
          { id: 'kai', msg: `おはよう、${name}。朝の頭はよく回る。${dueCardCount}語、一気に片付けよう。` },
          { id: 'sora', msg: `おはようございます…${name}さん。${dueCardCount}語ありますね。静かな朝に一緒にやりましょう。` },
          { id: 'yuuki', msg: `おはよ〜${name}！ まだ眠いけど…${dueCardCount}語やっちゃおう！` },
          { id: 'ren', msg: `…ん、${name}か。俺もまだ半分寝てるけど、${dueCardCount}語やるか。` },
        ],
        morning: [
          { id: 'haruto', msg: `おはよう、${name}さん！ ${dueCardCount}語の学習が溜まってるよ。一緒にやろう。` },
          { id: 'yuuki', msg: `おはよ〜${name}！ ${dueCardCount}語が待ってるよ！ やっちゃおう！` },
        ],
        daytime: [
          { id: 'kai', msg: `${name}、学習待ちが${dueCardCount}語ある。忘れる前にやっておこう。` },
          { id: 'haruto', msg: `${name}さん、${dueCardCount}語の学習が溜まってるよ。一緒に片付けよう。` },
        ],
        evening: [
          { id: 'sora', msg: `お疲れさまです、${name}さん。${dueCardCount}語の学習があります。` },
          { id: 'kai', msg: `お疲れ、${name}。${dueCardCount}語の学習、今日中にやっておくか。` },
        ],
        night: [
          { id: 'ren', msg: `${name}、夜遅くまでお疲れ。${dueCardCount}語あるけど、少しだけにしとけよ。` },
          { id: 'haruto', msg: `遅い時間ですね、${name}さん。${dueCardCount}語ありますが、無理しないでくださいね。` },
        ],
      };
      msgs = base[period];
    } else if (dueCardCount > 0) {
      const base: Record<string, Msg[]> = {
        latenight: [
          { id: 'sora', msg: `…${name}さん、まだ起きてるんですね。あと${dueCardCount}語だけ、一緒にやりませんか。` },
          { id: 'ren', msg: `${name}…あと${dueCardCount}語か。サクッと終わらせて寝ようぜ。` },
        ],
        earlymorning: [
          { id: 'haruto', msg: `おはよう、${name}さん。あと${dueCardCount}語、朝の空気の中でやると気持ちいいよ。` },
          { id: 'yuuki', msg: `おはよ〜${name}！ あと${dueCardCount}語！ 朝からサクッと行こ！` },
          { id: 'sora', msg: `おはようございます、${name}さん…。あと${dueCardCount}語ですね。僕もまだ眠いけど頑張りましょう。` },
          { id: 'ren', msg: `${name}…おはよう。あと${dueCardCount}語か。コーヒー飲みながらやるか。` },
        ],
        morning: [
          { id: 'sora', msg: `おはようございます、${name}さん。${dueCardCount}語の学習があります。` },
          { id: 'haruto', msg: `おはよう、${name}さん。あと${dueCardCount}語で完了だよ。` },
        ],
        daytime: [
          { id: 'sora', msg: `${name}さん、${dueCardCount}語の学習があります。さっと片付けちゃいましょう。` },
          { id: 'haruto', msg: `${name}さん、あと${dueCardCount}語で今日の学習は完了だよ。` },
        ],
        evening: [
          { id: 'haruto', msg: `${name}さん、あと${dueCardCount}語です。今日中に終わらせましょう。` },
          { id: 'yuuki', msg: `${name}〜！ あと${dueCardCount}語！ もうちょっとだよ！` },
        ],
        night: [
          { id: 'kai', msg: `${name}、あと${dueCardCount}語だ。終わらせてゆっくり休もう。` },
          { id: 'sora', msg: `${name}さん…あと${dueCardCount}語ですね。頑張りましょう。` },
        ],
      };
      msgs = base[period];
    } else if (totalXp < 50) {
      const base: Record<string, Msg[]> = {
        latenight: [
          { id: 'kai', msg: `${name}、夜中に始めるのか…。まぁ、付き合うよ。チャプターを進めてみよう。` },
        ],
        earlymorning: [
          { id: 'kai', msg: `おはよう、${name}。朝イチでチャプターを進めよう。頭が冴えてるうちに。` },
          { id: 'yuuki', msg: `おはよ〜${name}！ 朝からチャプター行っちゃおう！ まだ眠いけど…笑` },
          { id: 'haruto', msg: `おはよう、${name}さん。朝の時間に始められるのは素敵ですね。一緒にやりましょう。` },
        ],
        morning: [
          { id: 'kai', msg: `おはよう、${name}。まだ始めたばかりだな。チャプターを進めてみよう。` },
          { id: 'yuuki', msg: `おはよ〜${name}！ 最初はどんどん進めていこ！` },
        ],
        daytime: [
          { id: 'kai', msg: `${name}、まだ始めたばかりだな。チャプターを進めてみよう。` },
          { id: 'yuuki', msg: `${name}！ まずはチャプターがおすすめ！` },
        ],
        evening: [
          { id: 'kai', msg: `${name}、まだ始めたばかりだな。今日はチャプターを1つ進めてみないか。` },
        ],
        night: [
          { id: 'kai', msg: `${name}、夜遅くまでお疲れ。軽くチャプターを進めてみるか。` },
        ],
      };
      msgs = base[period];
    } else {
      const base: Record<string, Msg[]> = {
        latenight: [
          { id: 'ren', msg: `…${name}。こんな時間に来るとは、やる気だな。新しい単語に挑戦するか。` },
          { id: 'kai', msg: `${name}、夜中まで頑張ってるのか。…俺も付き合うよ。` },
        ],
        earlymorning: [
          { id: 'sora', msg: `おはようございます、${name}さん…。朝の静かな時間に新しい単語、いいですね。` },
          { id: 'ren', msg: `…おはよう、${name}。まだ眠いけど、嫌いじゃないぜこの時間。新しい単語やるか。` },
          { id: 'haruto', msg: `おはよう、${name}さん。朝の空気って、言葉がよく染み込む気がします。新しい単語に出会いましょう。` },
          { id: 'kai', msg: `おはよう、${name}。こんな時間からやるのか…。さすがだな。単語帳を開こう。` },
        ],
        morning: [
          { id: 'haruto', msg: `おはよう、${name}さん。新しい単語に出会いませんか？` },
          { id: 'yuuki', msg: `おはよ〜${name}！ 今日も単語増やしちゃおう！` },
        ],
        daytime: [
          { id: 'ren', msg: `${name}、学習する単語は全部終わったな。新しい単語を追加してみないか？` },
          { id: 'kai', msg: `${name}、順調だ。まだ覚えてない単語がたくさんあるぞ。` },
        ],
        evening: [
          { id: 'haruto', msg: `${name}さん、今日もお疲れさま。新しい単語に出会いませんか？` },
          { id: 'sora', msg: `${name}さん、今日も頑張りましたね。単語帳を開いてみてください。` },
        ],
        night: [
          { id: 'ren', msg: `${name}、遅くまでお疲れ。もう少しだけ、新しい単語やってみないか。` },
          { id: 'yuuki', msg: `${name}〜！ まだやれる？ 新しい単語増やしちゃおう！` },
        ],
      };
      msgs = base[period];
    }

    const pick = msgs[Math.floor(Math.random() * msgs.length)];
    let memberId = pick.id;
    let actionMsg = pick.msg;

    setGreeting({ member: getMember(memberId)!, message: actionMsg });
  }, [dueCardCount, totalXp]);

  return greeting;
}

const LEVELUP_ROTATION = ['kai', 'haruto', 'sora', 'ren', 'yuuki'] as const;

const LEVELUP_MESSAGES: Record<string, (lv: number) => string> = {
  kai: (lv) => `Lv.${lv}の新しいストーリーが解放されたぞ。見てみろ`,
  haruto: (lv) => `Lv.${lv}のストーリーが解放されました…一緒に見ませんか？`,
  sora: (lv) => `Lv.${lv}のストーリーが解放されたみたいです。読んでみてください`,
  ren: (lv) => `…Lv.${lv}、新しいストーリーだ。見とけ`,
  yuuki: (lv) => `Lv.${lv}の新しいストーリー来たよ！ 見よ見よ！`,
};

export function HomeScreen({ onVNPlaying }: { onVNPlaying?: (playing: boolean) => void }) {
  const profile = useProfile();
  const en = profile?.settings?.englishSpeakerMode ?? false;
  const dueCards = useDueCards();
  const greeting = useGreeting(dueCards.length, profile?.totalXp ?? 0);

  // Greeting affinity: give 0-2pt to the displayed member (once per session)
  useEffect(() => {
    if (!greeting.member) return;
    const key = 'firstlight_greeting_affinity_session';
    if (sessionStorage.getItem(key)) return;
    const pts = Math.floor(Math.random() * 3); // 0, 1, or 2
    if (pts > 0) {
      addAffinityPointsToMember(greeting.member.id, pts);
    }
    sessionStorage.setItem(key, 'done');
  }, [greeting.member]);

  // Inactivity penalty check
  const [penaltyMsg, setPenaltyMsg] = useState<string | null>(null);
  const [grandSlamPlaying, setGrandSlamPlaying] = useState(false);
  useEffect(() => {
    checkInactivityPenalty().then(msg => { if (msg) setPenaltyMsg(msg); });
    checkAndUpdateStreak().then(result => {
      if (result.grandSlam) {
        setGrandSlamPlaying(true);
        onVNPlaying?.(true);
      }
    });
  }, []);

  const [playingLevelup, setPlayingLevelup] = useState(false);
  const [unwatchedLevel, setUnwatchedLevel] = useState<number | null>(null);
  const [birthdayPhase, setBirthdayPhase] = useState<'none' | 'confetti' | 'vn'>('none');
  const [memberBdEvent, setMemberBdEvent] = useState<{ memberId: string; isOshi: boolean; phase: 'none' | 'confetti' | 'vn' }>({ memberId: '', isOshi: false, phase: 'none' });

  useEffect(() => {
    if (profile) {
      setUnwatchedLevel(getNextUnwatchedLevel(profile.level));
    }
  }, [profile?.level]);

  // User birthday check (priority 1)
  useEffect(() => {
    if (isBirthdayToday()) {
      setBirthdayPhase('confetti');
      onVNPlaying?.(true);
      markBirthdayCelebrated();
      setTimeout(() => setBirthdayPhase('vn'), 4000);
      return;
    }
    // Member birthday check (priority 2) — only if no user birthday
    if (profile) {
      const event = getMemberBirthdayToday(profile.settings?.oshiMemberId);
      if (event) {
        if (event.isOshi) {
          setMemberBdEvent({ ...event, phase: 'confetti' });
          onVNPlaying?.(true);
          markMemberBirthdayCelebrated(event.memberId);
          setTimeout(() => setMemberBdEvent(prev => ({ ...prev, phase: 'vn' })), 4000);
        } else {
          setMemberBdEvent({ ...event, phase: 'vn' });
          onVNPlaying?.(true);
          markMemberBirthdayCelebrated(event.memberId);
        }
      }
    }
  }, []);

  if (!profile) return null;

  // Birthday confetti overlay
  if (birthdayPhase === 'confetti') {
    const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6eb4', '#a855f7', '#f97316'];
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="confetti-piece"
            style={{
              left: `${Math.random() * 100}%`,
              backgroundColor: colors[i % colors.length],
              animationDelay: `${Math.random() * 2}s`,
              ['--fall-duration' as string]: `${2.5 + Math.random() * 2}s`,
              width: `${6 + Math.random() * 8}px`,
              height: `${6 + Math.random() * 8}px`,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            }}
          />
        ))}
        <div className="animate-birthday-flash text-center z-10">
          <p className="text-5xl font-black text-white drop-shadow-lg">🎉</p>
          <p className="text-2xl font-black text-white mt-2 drop-shadow-lg">Happy Birthday!</p>
          <p className="text-lg text-white/80 mt-1">{getPlayerName() || 'マネージャー'}</p>
        </div>
      </div>
    );
  }

  // Birthday VN
  if (birthdayPhase === 'vn') {
    return (
      <VNEngine
        scenario={birthdayScenario}
        onComplete={() => { setBirthdayPhase('none'); onVNPlaying?.(false); }}
        skippable
      />
    );
  }

  // Member birthday confetti (oshi only)
  if (memberBdEvent.phase === 'confetti' && memberBdEvent.memberId) {
    const bdMember = getMember(memberBdEvent.memberId);
    const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6eb4', '#a855f7', '#f97316'];
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i} className="confetti-piece" style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: colors[i % colors.length],
            animationDelay: `${Math.random() * 2}s`,
            ['--fall-duration' as string]: `${2.5 + Math.random() * 2}s`,
            width: `${6 + Math.random() * 8}px`,
            height: `${6 + Math.random() * 8}px`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }} />
        ))}
        <div className="animate-birthday-flash text-center z-10">
          <p className="text-5xl font-black text-white drop-shadow-lg">🎂</p>
          <p className="text-2xl font-black text-white mt-2 drop-shadow-lg">Happy Birthday!</p>
          <p className="text-lg text-white/80 mt-1">{bdMember?.nameJa}</p>
        </div>
      </div>
    );
  }

  // Member birthday VN
  if (memberBdEvent.phase === 'vn' && memberBdEvent.memberId) {
    const scenario = getMemberBirthdayScenario(memberBdEvent.memberId, memberBdEvent.isOshi);
    return (
      <VNEngine
        scenario={scenario}
        onComplete={() => { setMemberBdEvent({ memberId: '', isOshi: false, phase: 'none' }); onVNPlaying?.(false); }}
        skippable
      />
    );
  }

  // Grand slam VN (35-day streak)
  if (grandSlamPlaying) {
    return (
      <VNEngine
        scenario={grandSlamScenario}
        onComplete={() => { setGrandSlamPlaying(false); onVNPlaying?.(false); }}
        skippable
      />
    );
  }

  // Playing a level-up VN
  if (playingLevelup && unwatchedLevel) {
    const scenario = getLevelupScenario(unwatchedLevel);
    if (scenario) {
      return (
        <VNEngine
          scenario={scenario}
          onComplete={() => {
            markLevelupWatched(unwatchedLevel);
            setPlayingLevelup(false);
            onVNPlaying?.(false);
            setUnwatchedLevel(getNextUnwatchedLevel(profile.level));
          }}
          skippable
        />
      );
    }
  }

  const progress = getLevelProgress(profile.totalXp) * 100;
  const toNext = xpToNextLevel(profile.totalXp);

  return (
    <div className="space-y-5 pb-4">
      {/* Inactivity penalty notice */}
      {penaltyMsg && (
        <Card className="p-3 border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/50">
          <p className="text-xs text-amber-700 dark:text-amber-300">{penaltyMsg}</p>
          <button onClick={() => setPenaltyMsg(null)} className="text-[10px] text-amber-500 mt-1">OK</button>
        </Card>
      )}

      {/* Group 1: Member greeting + recommended action (tight) */}
      <div className="space-y-2">
      {/* Member greeting — priority: psychology > level-up > normal */}
      {isPsychologyEventEnabled() && !isPsychologyUnlocked() ? (
        <Link href="/psychology">
          <Card className="p-4 cursor-pointer border-purple-300 dark:border-purple-700 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="shrink-0 relative">
                <MemberAvatar member={getMember('kai')!} size="lg" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <p className="text-xs text-gray-500 mb-1">カイ</p>
                <TypewriterText text={`ビッグニュースだ！ ${getPlayerName() || 'マネージャー'}、すぐにオフィスに来て！`} className="text-sm font-bold text-purple-700 dark:text-purple-300 flex-1" />
                <div className="mt-2">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-purple-600 text-white text-xs font-bold tracking-wider shadow-md">GO →</span>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ) : unwatchedLevel ? (() => {
        const memberId = LEVELUP_ROTATION[(unwatchedLevel - 1) % LEVELUP_ROTATION.length];
        const notifyMember = getMember(memberId)!;
        const msg = LEVELUP_MESSAGES[memberId](unwatchedLevel);
        return (
        <Card
          className="p-4 cursor-pointer border-amber-300 dark:border-amber-700 hover:shadow-md transition-shadow"
          onClick={() => { setPlayingLevelup(true); onVNPlaying?.(true); }}
        >
          <div className="flex items-start gap-4">
            <div className="shrink-0 relative">
              <MemberAvatar member={notifyMember} size="lg" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <p className="text-xs text-gray-500 mb-1">{notifyMember.nameJa}</p>
              <TypewriterText text={`レベルアップおめでとう！ ${msg}`} className="text-sm font-bold text-amber-700 dark:text-amber-300 flex-1" />
              <div className="mt-2">
                <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500 text-white text-xs font-bold tracking-wider shadow-md">ストーリーを見る →</span>
              </div>
            </div>
          </div>
        </Card>
        );
      })() : greeting.member && greeting.message ? (
        <Card className="p-4">
          <div className="flex items-start gap-4">
            <div className="shrink-0">
              <MemberAvatar member={greeting.member} size="lg" />
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <p className="text-xs text-gray-500 mb-1">{greeting.member.nameJa}</p>
              <TypewriterText text={greeting.message} className="text-sm text-gray-700 dark:text-gray-300 flex-1" />
            </div>
          </div>
        </Card>
      ) : null}

      {/* Next action guide - directly below member greeting */}
      <NextActionGuide profile={profile} dueCardCount={dueCards.length} en={en} />
      </div>

      {/* Level card - game style, tap for level info */}
      <Link href="/level-info">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-500 p-6 text-white shadow-xl shadow-indigo-500/20 cursor-pointer hover:shadow-2xl transition-shadow">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <p className="text-xs font-medium tracking-widest uppercase opacity-70">FIRST LIGHT</p>
            <div className="flex items-baseline gap-3 mt-1">
              <h2 className="text-3xl font-black">Lv.{profile.level}</h2>
              <p className="text-sm opacity-80 font-bold">{profile.totalXp - (LEVEL_THRESHOLDS[profile.level - 1] ?? 0)} / {(LEVEL_THRESHOLDS[profile.level] ?? LEVEL_THRESHOLDS[profile.level - 1] ?? 0) - (LEVEL_THRESHOLDS[profile.level - 1] ?? 0)} XP</p>
            </div>
            <div className="mt-3">
              <Progress value={progress} className="h-2.5 bg-white/20" />
              <p className="text-xs mt-1.5 opacity-70 font-medium">{en ? `${toNext} XP to next level >` : `次のレベルまで ${toNext} XP >`}</p>
            </div>
          </div>
        </div>
      </Link>

      {/* Members row */}
      <div className="flex justify-around px-2 mt-2">
        {MEMBERS.map(member => (
          <Link key={member.id} href={`/members?id=${member.id}`}>
            <MemberAvatar member={member} size="md" showName />
          </Link>
        ))}
      </div>

      {/* Group 2: 5 Courses + Chapter */}
      <div className="space-y-2">
      {/* 5 Member Courses */}
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pt-1">{en ? 'Member Courses' : 'メンバー別コース'}</p>

      {/* ハルト × 語彙 */}
      <Link href="/vocab-study">
        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-blue-300 dark:border-blue-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
          <div className="flex items-center gap-3">
            <MemberAvatar member={getMember('haruto')!} size="sm" />
            <div className="flex-1">
              <p className="text-sm font-bold text-blue-900 dark:text-blue-100">{en ? 'Vocabulary with Haruto' : 'ハルトと単語学習'}</p>
              <p className="text-xs text-blue-600 dark:text-blue-400">{en ? 'Build your word power' : '単語を覚えて語彙力を伸ばそう'}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-blue-400" />
          </div>
        </Card>
      </Link>

      {/* ユウキ × ライティング */}
      <Link href="/writing-study">
        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-pink-300 dark:border-pink-700 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30">
          <div className="flex items-center gap-3">
            <MemberAvatar member={getMember('yuuki')!} size="sm" />
            <div className="flex-1">
              <p className="text-sm font-bold text-pink-900 dark:text-pink-100">{en ? 'Writing with Yuuki' : 'ユウキとライティング'}</p>
              <p className="text-xs text-pink-600 dark:text-pink-400">{en ? 'Express yourself in English' : '英文を書いて表現力を磨こう'}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-pink-400" />
          </div>
        </Card>
      </Link>

      {/* レン × リスニング */}
      <Link href="/listening-study">
        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-red-300 dark:border-red-700 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30">
          <div className="flex items-center gap-3">
            <MemberAvatar member={getMember('ren')!} size="sm" />
            <div className="flex-1">
              <p className="text-sm font-bold text-red-900 dark:text-red-100">{en ? 'Listening with Ren' : 'レンとリスニング'}</p>
              <p className="text-xs text-red-600 dark:text-red-400">{en ? 'Train your ear' : '耳を鍛えて聴き取り力UP'}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-red-400" />
          </div>
        </Card>
      </Link>

      {/* ソラ × リーディング */}
      <Link href="/reading-study">
        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-green-300 dark:border-green-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30">
          <div className="flex items-center gap-3">
            <MemberAvatar member={getMember('sora')!} size="sm" />
            <div className="flex-1">
              <p className="text-sm font-bold text-green-900 dark:text-green-100">{en ? 'Reading with Sora' : 'ソラとリーディング'}</p>
              <p className="text-xs text-green-600 dark:text-green-400">{en ? 'Read and comprehend' : '英文を読んで読解力を伸ばそう'}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-green-400" />
          </div>
        </Card>
      </Link>

      {/* カイ × 文法 */}
      <Link href="/grammar-study">
        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-gray-300 dark:border-gray-600 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/30 dark:to-slate-950/30">
          <div className="flex items-center gap-3">
            <MemberAvatar member={getMember('kai')!} size="sm" />
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{en ? 'Grammar with Kai' : 'カイと文法'}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{en ? 'Master the structure' : '構造を理解して英語力の土台を作ろう'}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </div>
        </Card>
      </Link>

      {/* Psychology course card (if unlocked) */}
      {isPsychologyUnlocked() && (
        <Link href="/psychology">
          <Card className="p-4 border-purple-200 dark:border-purple-800 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{en ? 'Psychology Show' : '心理学バラエティ番組'}</p>
                <p className="text-xs text-gray-500">{en ? 'Learn psychology with members' : 'メンバーと心理学を学ぼう'}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
          </Card>
        </Link>
      )}

      {/* Chapter — mixed skills + story (below member courses) */}
      <Link href="/chapters/">
        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-gray-600 dark:border-gray-500 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-800 dark:to-gray-950 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-full">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">{en ? 'Continue Chapters' : 'チャプターを進める'}</p>
              <p className="text-xs text-gray-400">{en ? 'Mixed skills + story' : 'ストーリーと一緒に総合学習'}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </div>
        </Card>
      </Link>

      </div>

      {/* 単語帳 + 分析 — side by side */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/vocabulary">
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium">{en ? 'Vocab' : '単語帳'}</p>
                <p className="text-xs text-gray-500">{en ? 'List & Search' : '一覧・検索'}</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/dashboard">
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium">{en ? 'Analytics' : '分析'}</p>
                <p className="text-xs text-gray-500">{en ? 'Track growth' : '成長を確認'}</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {/* Streak & Daily */}
      <div className="flex gap-3">
        <Link href="/streak-rewards">
          <Card className="flex-1 p-4 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-lg font-bold">{profile.streak}</p>
                <p className="text-xs text-gray-500">{en ? 'day streak >' : '日連続 >'}</p>
              </div>
            </div>
          </Card>
        </Link>
        <Link href="/xp-history">
          <Card className="flex-1 p-4 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-lg font-bold">{profile.totalXp}</p>
                <p className="text-xs text-gray-500">Total XP &gt;</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {/* FIRST LIGHT News */}
      <NewsSection />

      {/* Fan SNS Board */}
      <FanBoard />
    </div>
  );
}

/** Rumor固定コメント — order: 'pf'=player→member, 'mf'=member→player */
const RUMOR_FIXED_COMMENTS: { match: string; player: string; member: { id: string; text: string }; order: 'pf' | 'mf' }[] = [
  // 既存修正6件
  { match: 'リムジンでスカウトしてた人', player: '登場が派手すぎなのよ…', member: { id: 'kai', text: 'ごめん、見つけちゃったから思わず…' }, order: 'pf' },
  { match: '事務所に出入りしてた美人', player: '嬉しいけど嬉しくない！ バレてるじゃん！！', member: { id: 'haruto', text: '美人だそうです。良かったですね' }, order: 'mf' },
  { match: 'カイくん、女優さんと一緒', player: 'え？この女優って私のことなの！？', member: { id: 'kai', text: '女優デビューおめでとう笑' }, order: 'mf' },
  { match: 'レンくんのストーリー、同じカフェ', player: '私もあそこ行くのやめとこ', member: { id: 'ren', text: 'やべ、あのカフェ特定されてる' }, order: 'mf' },
  { match: 'ユウキくん、最近誰かと一緒', player: 'な、何を呑気な…', member: { id: 'yuuki', text: 'あれー？ これ、{playerName}のことかもー' }, order: 'mf' },
  { match: '新メンバー加入説', player: 'なんで男性アイドルグループに私が加入するんですかー！', member: { id: 'sora', text: '誰のことだろう…もしかして{playerName}さん？' }, order: 'mf' },
  // 新規9件
  { match: 'この前の配信ライブに女の人', player: 'ファンの探偵力を舐めちゃいけません…こわ…', member: { id: 'sora', text: 'なんでこんな情報が…' }, order: 'mf' },
  { match: 'ハルトのノートに書いてあった', player: 'わー！ なんで名前書いてるんですか！', member: { id: 'haruto', text: 'すみません。何でもメモ取るタイプなもんで…' }, order: 'pf' },
  { match: 'リムジンで乗りつけて女子を拉致', player: 'そっちの方向で噂が広がってくれると助かります', member: { id: 'ren', text: 'ははっ！ みんな想像力豊かだな' }, order: 'mf' },
  { match: 'ユウキが外国人ファンに', player: '海外フェスに出るってバレてますけど…', member: { id: 'yuuki', text: 'あはは…うっかりだなぁコイツ。誰が投稿したの？' }, order: 'pf' },
  { match: 'FIRST LIGHTのリムジンに乗っていった', player: 'ひー！ ヤバい！ ファンに嫌われてる！！', member: { id: 'kai', text: '迷惑かけてゴメン…今度からタクシーで裏口から入って' }, order: 'pf' },
  { match: 'おとといハルトが投稿してた歌詞', player: 'リムジン女って言われてるんだ…ショック。。。', member: { id: 'haruto', text: 'あ、いや…この歌詞はずっと前に書いてたもので…' }, order: 'mf' },
  { match: '親戚が芸能関係なんだけど、レン', player: '女教師…', member: { id: 'ren', text: '芸能関係者なら余計なこと言うなよ、ったく！' }, order: 'pf' },
  { match: 'ラジオとかでのユウキの話が最近', player: 'いや、あの…それもダメです', member: { id: 'yuuki', text: 'ファンは想像力豊かだよねー。恋人じゃないよー、{playerName}だよー' }, order: 'mf' },
  { match: '最近FIRST LIGHTに敏腕女子マネ', player: '出しませんって！ 敏腕マネージャーじゃないし！', member: { id: 'sora', text: 'リムジン女も定着してきましたね笑' }, order: 'pf' },
  // ── Stage 2: 事務所の試練 ──
  { match: '最近メンバーが英語勉強してるっぽい', player: 'え、教材写ってた…？ 気をつけてよハルトくん！', member: { id: 'haruto', text: 'すみません…つい写真撮るとき片付けるの忘れて…' }, order: 'pf' },
  { match: '事務所に通ってる人まだいるらしいよ', player: 'まだって何！？ ずっと通ってますけど！', member: { id: 'kai', text: '大事なスタッフだからな。毎日来てもらわないと困る' }, order: 'pf' },
  { match: 'レンがSpotifyで洋楽ばっかり', player: 'レンくんの勉強法、音楽から入るのかっこいい', member: { id: 'ren', text: '…別に勉強じゃねぇよ。好きで聴いてるだけだ' }, order: 'mf' },
  { match: 'FIRST LIGHTの英語、本気っぽいな', player: 'バレてる…企画段階なのに…', member: { id: 'kai', text: 'ファンは鋭いな…まぁ、楽しみにしてもらえれば' }, order: 'mf' },
  // ── Stage 3: 対談番組 ──
  { match: '誰が教えてるの？独学？', player: 'ちょっと！ 私のことは秘密でしょ！？', member: { id: 'yuuki', text: 'え〜と…企業秘密です！ あはは！' }, order: 'pf' },
  { match: 'あの英語力…絶対誰かすごい先生', player: 'すごい先生って…私そんなすごくないですけど！', member: { id: 'sora', text: '…すごい人ですよ。僕たちにとっては最高の先生です' }, order: 'mf' },
  // ── Stage 5: 恋人誤報 ──
  { match: '恋人って本当？でもまだ信じない', player: '恋人じゃないです！！！ スタッフです！！！', member: { id: 'kai', text: '…大事なスタッフだ。それ以上でも以下でもない。…今のところは' }, order: 'pf' },
  { match: '違うらしいよ。事務所のスタッフだって', player: 'そうです。スタッフです。ありがとうさくらさん', member: { id: 'haruto', text: '冷静なファンがいてくれて助かります…' }, order: 'mf' },
  { match: '噂の「謎の人物」って英語の先生', player: 'あー！ バレる！ バレちゃう！', member: { id: 'yuuki', text: '鋭い！ でもまだ内緒だよ〜！' }, order: 'pf' },
  // ── Stage 7: 暴露+最終章 ──
  { match: 'あのリムジンの人がブレインだったの', player: '…ついに全部バレちゃったね', member: { id: 'kai', text: '隠すつもりはなかった。ただ…{playerName}が望むタイミングで伝えたかった' }, order: 'mf' },
  { match: 'すごい人じゃん…英語教えてくれた人', player: 'すごくないです…みんなが頑張っただけです', member: { id: 'haruto', text: '{playerName}さんがすごいんです。僕たちは{playerName}さんに引き上げてもらっただけ' }, order: 'mf' },
  { match: '恋人誤報の時の「謎の人物」、これだったんだ', player: '全部伏線って…私の人生が伏線みたいに言わないで！', member: { id: 'ren', text: '…まぁ、全部繋がってたのは事実だな。{playerName}が最初から導いてくれてた' }, order: 'pf' },
];

function getRumorComments(text: string): { player: string; member: { id: string; text: string }; order: 'pf' | 'mf' } | null {
  for (const entry of RUMOR_FIXED_COMMENTS) {
    if (text.includes(entry.match)) {
      return { player: entry.player, member: entry.member, order: entry.order };
    }
  }
  return null;
}

const MEMBER_REACTIONS: Record<string, { members: string[]; reactions: string[] }> = {
  news: {
    members: ['kai', 'haruto', 'ren', 'yuuki', 'sora'],
    reactions: [
      'こうやって取り上げてもらえるのは、本当にありがたいな。',
      'ファンの皆さんがチェックしてくれてるの、嬉しいです。',
      '…ちゃんと見てくれてるんだな。励みになる。',
      'ニュースになるの嬉しい〜！ もっと頑張るね！',
      '…こうして話題にしてもらえるのは、光栄です。',
    ],
  },
  message: {
    members: ['haruto', 'yuuki', 'sora', 'kai', 'ren'],
    reactions: [
      'こういうメッセージ…一つひとつ、ちゃんと読んでます。',
      'うわ〜！ こういうの見ると元気出る！ ありがとう！',
      '…言葉にしてくれるのって、すごく嬉しいです。',
      '…ファンの気持ちが伝わってくる。ありがとう。',
      '…こういう言葉、俺たちの力になるんだよな。',
    ],
  },
  call: {
    members: ['yuuki', 'kai', 'haruto', 'ren', 'sora'],
    reactions: [
      'ファン同士で盛り上がってくれるの最高〜！',
      'こうやってファンが繋がってくれるの、嬉しいな。',
      'みんなの一体感、いつもライブで感じてます。',
      '…ファンの熱量、ステージからも見えてるぞ。',
      '…皆さんが楽しんでくれてるのが一番です。',
    ],
  },
  rumor: {
    members: ['kai', 'yuuki', 'ren'],
    reactions: ['…バレてる…？', 'えっ、バレちゃったの！？', '…気にするな。'],
  },
  debate: {
    members: ['kai', 'haruto', 'yuuki', 'ren', 'sora'],
    reactions: [
      'いろんな意見があるのは健全だと思う。でも仲良くな。',
      '議論してくれるのは嬉しいです。ただ、お互いを尊重してくれたら。',
      '推しへの愛が溢れてるね！ でもケンカはダメだよ〜！',
      '…熱くなるのは分かるけど、楽しくやれよ。',
      '…色んな考え方があっていいと思います。大切なのは音楽を楽しむことですから。',
    ],
  },
};

function pickFanPosts() {
  const stage = getStoryStage();
  const stageExtras = STAGE_FAN_POSTS.filter(p => p.stage <= stage);
  const allPosts = [...FAN_POSTS, ...stageExtras];
  const rumors = allPosts.filter(p => p.cat === 'rumor');
  const others = allPosts.filter(p => p.cat !== 'rumor');
  const pickedRumor = rumors[Math.floor(Math.random() * rumors.length)];
  const shuffledOthers = [...others].sort(() => Math.random() - 0.5).slice(0, 3);
  const result = [pickedRumor, ...shuffledOthers].sort(() => Math.random() - 0.5);
  return result;
}

function FanBoard() {
  const [posts, setPosts] = useState(pickFanPosts);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const name = getPlayerName() || 'マネージャー';

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const refresh = () => {
    setPosts(pickFanPosts());
    setExpanded(null);
    setVisible(true);
  };

  const CAT_COLORS: Record<string, string> = {
    news: 'text-blue-500', message: 'text-pink-500', call: 'text-green-500',
    rumor: 'text-amber-500', debate: 'text-red-500',
  };

  return (
    <div ref={sectionRef}>
      <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
        <MessageSquare className="w-4 h-4" /> ファン掲示板
        <button
          onClick={refresh}
          className="ml-1 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors active:scale-90"
          title="投稿を更新"
        >
          <RefreshCw className="w-3.5 h-3.5 text-gray-400" />
        </button>
        <span className="text-[10px] text-gray-400 font-normal ml-auto">タップでコメント表示</span>
      </h3>
      <div className="space-y-2">
        {posts.map((p, i) => {
          // 1. Detect member name in text → that member reacts
          const MEMBER_NAMES: Record<string, string> = { カイ: 'kai', ハルト: 'haruto', レン: 'ren', ソラ: 'sora', ユウキ: 'yuuki' };
          let detectedMemberId: string | null = null;
          for (const [nameJa, id] of Object.entries(MEMBER_NAMES)) {
            if (p.text.includes(nameJa)) { detectedMemberId = id; break; }
          }

          const reaction = MEMBER_REACTIONS[p.cat] ?? MEMBER_REACTIONS.message;
          // Use text length as a simple hash for stable but varied selection
          const hash = p.text.length + p.likes;
          const rMemberId = detectedMemberId ?? reaction.members[hash % reaction.members.length];
          const rText = reaction.reactions[hash % reaction.reactions.length];
          const rMember = getMember(rMemberId);
          const isOpen = expanded === i;
          return (
            <Card key={i} className={`p-3 cursor-pointer transition-shadow hover:shadow-sm ${visible ? 'animate-slide-in-right' : 'slide-in-hidden'}`} style={visible ? { animationDelay: `${i * 0.5}s`, animationFillMode: 'both' } : undefined} onClick={() => setExpanded(isOpen ? null : i)}>
              <div className="flex items-start gap-2.5">
                <UserCircle className={`w-7 h-7 shrink-0 ${CAT_COLORS[p.cat] || 'text-gray-400'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">{p.user}</span>
                    <span className="text-[9px] text-gray-400">{Math.floor(Math.random() * 23) + 1}h</span>
                  </div>
                  <p className="text-xs font-medium text-gray-800 dark:text-white mt-0.5">{p.text.replace(/\{playerName\}/g, name)}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Heart className="w-3 h-3 text-gray-400" />
                    <span className="text-[10px] text-gray-400">{p.likes}</span>
                  </div>
                </div>
              </div>
              {isOpen && p.cat === 'rumor' ? (() => {
                const fixed = getRumorComments(p.text);
                if (!fixed) return null;
                const fMember = getMember(fixed.member.id);
                const isPF = fixed.order === 'pf';
                const playerBlock = (
                  <div key="player" className={`flex items-start gap-2 ${isPF ? 'animate-[fadeSlideIn_0.3s_ease-out]' : 'animate-[fadeSlideIn_0.3s_ease-out_0.5s_both]'}`}>
                    <div className="w-8 h-8 shrink-0 rounded-full overflow-hidden">
                      <AvatarSilhouette style={getAvatarStyle()} size={32} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] text-indigo-400">{name}</p>
                      <TypewriterText text={`「${fixed.player}」`} speed={30} className="text-xs text-indigo-300 italic" />
                    </div>
                  </div>
                );
                const memberBlock = fMember ? (
                  <div key="member" className={`flex items-start gap-2 ${isPF ? 'animate-[fadeSlideIn_0.3s_ease-out_0.5s_both]' : 'animate-[fadeSlideIn_0.3s_ease-out]'}`}>
                    <MemberAvatar member={fMember} size="sm" />
                    <div className="flex-1">
                      <p className="text-[10px] text-gray-500">{fMember.nameJa}</p>
                      <TypewriterText text={`「${fixed.member.text.replace(/\{playerName\}/g, name)}」`} speed={30} className="text-xs text-gray-600 dark:text-gray-300 italic" />
                    </div>
                  </div>
                ) : null;
                return (
                  <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
                    {isPF ? <>{playerBlock}{memberBlock}</> : <>{memberBlock}{playerBlock}</>}
                  </div>
                );
              })() : isOpen && rMember ? (
                <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800 flex items-start gap-2 animate-[fadeSlideIn_0.3s_ease-out]">
                  <MemberAvatar member={rMember} size="sm" />
                  <div className="flex-1">
                    <p className="text-[10px] text-gray-500">{rMember.nameJa}</p>
                    <TypewriterText text={`「${rText}」`} speed={30} className="text-xs text-gray-600 dark:text-gray-300 italic" />
                  </div>
                </div>
              ) : null}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function NewsItem({ news, index }: { news: typeof FAKE_NEWS[0]; index: number }) {
  const [isEnglish, setIsEnglish] = useState(false);

  const title = isEnglish ? news.titleEn : news.title;
  const body = isEnglish ? news.bodyEn : news.body;

  const TAG_COLORS: Record<string, string> = {
    TV: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    '雑誌': 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
    LIVE: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
    '音楽': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
    '受賞': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    'イベント': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    'コラボ': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
    SNS: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300',
    '心理学': 'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300',
    '個人活動': 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  };

  return (
    <Card
      className="p-3 cursor-pointer hover:shadow-sm transition-all"
      onClick={() => setIsEnglish(!isEnglish)}
    >
      <div className="flex items-start gap-2">
        <div className="flex flex-col items-center gap-1 shrink-0">
          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${TAG_COLORS[news.tag] || 'bg-gray-100 text-gray-600'}`}>
            {news.tag}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium transition-opacity duration-300 ${isEnglish ? 'text-indigo-600 dark:text-indigo-400' : ''}`}>
            {title}
          </p>
          <div className="overflow-hidden mt-0.5">
            <p className={`text-xs text-gray-500 whitespace-nowrap animate-news-ticker`}>
              {body}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

function NewsSection() {
  const getAllNews = () => {
    const stage = getStoryStage();
    const stageExtras = STAGE_NEWS.filter(n => n.stage <= stage);
    return [...FAKE_NEWS, ...stageExtras];
  };

  const [news, setNews] = useState(() => {
    const shuffled = getAllNews().sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  });
  const [spinning, setSpinning] = useState(false);

  const refresh = () => {
    setSpinning(true);
    const shuffled = getAllNews().sort(() => Math.random() - 0.5);
    setNews(shuffled.slice(0, 3));
    setTimeout(() => setSpinning(false), 600);
  };

  return (
    <div>
      <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
        <Newspaper className="w-4 h-4" /> FIRST LIGHT NEWS
        <button
          onClick={refresh}
          className="ml-1 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors active:scale-90"
          title="ニュースを更新"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-500 ${spinning ? 'animate-spin' : ''}`} />
        </button>
        <span className="text-[10px] text-gray-400 font-normal ml-auto">タップで日英切替</span>
      </h3>
      <div className="space-y-2">
        {news.map((n, i) => (
          <NewsItem key={`${n.title}-${i}`} news={n} index={i} />
        ))}
      </div>
    </div>
  );
}
