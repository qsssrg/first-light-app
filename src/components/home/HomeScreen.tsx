'use client';

import { useState, useEffect } from 'react';
import { useProfile, useDueCards } from '@/lib/hooks';
import { getLevelProgress, xpToNextLevel } from '@/lib/xp';
import { MEMBERS, getMember } from '@/lib/members';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { BookOpen, Flame, Target, Sparkles, ArrowRight, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { getPlayerName } from '@/lib/player-name';
import { TypewriterText } from '@/components/common/TypewriterText';
import { isPsychologyEventEnabled, isPsychologyUnlocked } from '@/lib/psychology-settings';
import { FAKE_NEWS } from '@/data/fake-news';
import { Newspaper } from 'lucide-react';

function NextActionGuide({ profile, dueCardCount }: { profile: any; dueCardCount: number }) {
  const getNextAction = () => {
    if (!profile.learnerType || profile.learnerType === 'balanced' && profile.totalXp === 0) {
      return { text: 'まずレベルを測ろう', desc: 'あなたの英語力を5つの軸で判定します', href: '/settings', icon: Target };
    }
    if (dueCardCount > 0) {
      return { text: `${dueCardCount}語の復習をしよう`, desc: '忘れる前に復習すると定着しやすい', href: '/vocabulary', icon: BookOpen };
    }
    if (profile.totalXp < 100) {
      return { text: '単語帳を始めよう', desc: '新しい単語を追加して学習スタート', href: '/vocabulary', icon: BookOpen };
    }
    if (!profile.lastStudyAt || Date.now() - new Date(profile.lastStudyAt).getTime() > 86400000) {
      return { text: '今日の学習をしよう', desc: '毎日の積み重ねが力になる', href: '/vocabulary', icon: Flame };
    }
    return { text: 'ライティングに挑戦しよう', desc: '英語で文を書いてみよう', href: '/writing', icon: Sparkles };
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
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">おすすめ: {action.text}</p>
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

    // Time-based greeting prefix
    const timeGreeting = hour < 6 ? 'こんな時間まで…' :
                         hour < 10 ? 'おはよう' :
                         hour < 17 ? 'やあ' :
                         hour < 21 ? 'お疲れ様' : '夜遅くまで頑張ってるね';

    // Context-based action suggestion
    let actionMsg: string;
    let memberId: string;

    if (dueCardCount > 10) {
      const msgs = [
        { id: 'haruto', msg: `${timeGreeting}、${name}さん！ 復習単語が${dueCardCount}個溜まってるよ。一緒に単語帳やろう。` },
        { id: 'kai', msg: `${timeGreeting}、${name}。復習待ちが${dueCardCount}語ある。忘れる前にやっておこう。` },
        { id: 'yuuki', msg: `${timeGreeting}〜${name}！ ${dueCardCount}語が復習待ちだよ〜！ やっちゃおう！` },
      ];
      const pick = msgs[Math.floor(Math.random() * msgs.length)];
      memberId = pick.id;
      actionMsg = pick.msg;
    } else if (dueCardCount > 0) {
      const msgs = [
        { id: 'sora', msg: `${timeGreeting}、${name}さん。${dueCardCount}語の復習があります。さっと片付けちゃいましょう。` },
        { id: 'haruto', msg: `${timeGreeting}、${name}さん。あと${dueCardCount}語で今日の復習は完了だよ。` },
      ];
      const pick = msgs[Math.floor(Math.random() * msgs.length)];
      memberId = pick.id;
      actionMsg = pick.msg;
    } else if (totalXp < 50) {
      const msgs = [
        { id: 'kai', msg: `${timeGreeting}、${name}。まだ始めたばかりだな。チャプターを進めてみよう。` },
        { id: 'yuuki', msg: `${timeGreeting}〜${name}！ 最初はどんどん進めていこ！ チャプターがおすすめ！` },
      ];
      const pick = msgs[Math.floor(Math.random() * msgs.length)];
      memberId = pick.id;
      actionMsg = pick.msg;
    } else {
      const msgs = [
        { id: 'ren', msg: `${timeGreeting}、${name}。復習は全部終わってるな。単語帳で新しい単語を追加してみないか？` },
        { id: 'kai', msg: `${timeGreeting}、${name}。順調だ。まだ覚えてない単語がたくさんあるぞ。単語帳に追加しよう。` },
        { id: 'haruto', msg: `${timeGreeting}、${name}さん。新しい単語に出会いませんか？ 単語帳を開いてみてください。` },
        { id: 'yuuki', msg: `${timeGreeting}〜${name}！ 復習終わったの？ すごい！ もっと単語増やしちゃおう！` },
      ];
      const pick = msgs[Math.floor(Math.random() * msgs.length)];
      memberId = pick.id;
      actionMsg = pick.msg;
    }

    setGreeting({ member: getMember(memberId)!, message: actionMsg });
  }, [dueCardCount, totalXp]);

  return greeting;
}

export function HomeScreen() {
  const profile = useProfile();
  const dueCards = useDueCards();
  const greeting = useGreeting(dueCards.length, profile?.totalXp ?? 0);

  if (!profile) return null;

  const progress = getLevelProgress(profile.totalXp) * 100;
  const toNext = xpToNextLevel(profile.totalXp);

  return (
    <div className="space-y-6 pb-4">
      {/* Member greeting with typewriter effect */}
      {greeting.member && greeting.message && (
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
      )}

      {/* Next action guide - directly below member greeting */}
      <NextActionGuide profile={profile} dueCardCount={dueCards.length} />

      {/* Level card - game style */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-500 p-6 text-white shadow-xl shadow-indigo-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <p className="text-xs font-medium tracking-widest uppercase opacity-70">FIRST LIGHT</p>
          <h2 className="text-3xl font-black mt-1">Lv.{profile.level}</h2>
          <div className="mt-4">
            <Progress value={progress} className="h-2.5 bg-white/20" />
            <p className="text-xs mt-1.5 opacity-70 font-medium">次のレベルまで {toNext} XP</p>
          </div>
        </div>
      </div>

      {/* Members row */}
      <div className="flex justify-around px-2">
        {MEMBERS.map(member => (
          <Link key={member.id} href={`/members?id=${member.id}`}>
            <MemberAvatar member={member} size="md" showName />
          </Link>
        ))}
      </div>

      {/* Psychology course card (if event enabled but not yet unlocked) */}
      {isPsychologyEventEnabled() && !isPsychologyUnlocked() && (
        <Link href="/psychology">
          <Card className="p-4 border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-950/30 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="relative p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-purple-900 dark:text-purple-100">新しいお知らせ</p>
                <p className="text-xs text-purple-600 dark:text-purple-400">メンバーから大事な話があるようです</p>
              </div>
              <ArrowRight className="w-4 h-4 text-purple-400" />
            </div>
          </Card>
        </Link>
      )}

      {/* Psychology course card (if unlocked) */}
      {isPsychologyUnlocked() && (
        <Link href="/psychology">
          <Card className="p-4 border-purple-200 dark:border-purple-800 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">心理学バラエティ番組</p>
                <p className="text-xs text-gray-500">メンバーと心理学を学ぼう</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
          </Card>
        </Link>
      )}

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/vocabulary">
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium">単語帳</p>
                <p className="text-xs text-gray-500">
                  {dueCards.length > 0 ? `${dueCards.length}語が復習待ち` : '全て復習済み'}
                </p>
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
                <p className="text-sm font-medium">分析</p>
                <p className="text-xs text-gray-500">成長を確認</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {/* Streak & Daily */}
      <div className="flex gap-3">
        <Card className="flex-1 p-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-lg font-bold">{profile.streak}</p>
              <p className="text-xs text-gray-500">日連続</p>
            </div>
          </div>
        </Card>
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
          <span className="text-[9px] text-gray-400">{isEnglish ? 'EN' : 'JP'}</span>
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
  const [news] = useState(() => {
    const shuffled = [...FAKE_NEWS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  });

  return (
    <div>
      <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
        <Newspaper className="w-4 h-4" /> FIRST LIGHT NEWS
        <span className="text-[10px] text-gray-400 font-normal ml-auto">タップで日英切替</span>
      </h3>
      <div className="space-y-2">
        {news.map((n, i) => (
          <NewsItem key={i} news={n} index={i} />
        ))}
      </div>
    </div>
  );
}
