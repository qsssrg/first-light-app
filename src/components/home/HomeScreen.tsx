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
import { Newspaper, RefreshCw } from 'lucide-react';

function NextActionGuide({ profile, dueCardCount }: { profile: any; dueCardCount: number }) {
  const getNextAction = () => {
    if (!profile.learnerType || profile.learnerType === 'balanced' && profile.totalXp === 0) {
      return { text: 'まずレベルを測ろう', desc: 'あなたの英語力を5つの軸で判定します', href: '/settings', icon: Target };
    }
    if (dueCardCount > 0) {
      return { text: `${dueCardCount}語の学習しよう`, desc: '単語を学習して語彙力を伸ばそう', href: '/vocab-study', icon: BookOpen };
    }
    if (profile.totalXp < 100) {
      return { text: '単語学習を始めよう', desc: '新しい単語を追加して学習スタート', href: '/vocab-study', icon: BookOpen };
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
          { id: 'kai', msg: `${name}、朝早いな。${dueCardCount}語の学習が待ってる。朝の頭はよく回るぞ。` },
          { id: 'sora', msg: `早起きですね、${name}さん。${dueCardCount}語、朝のうちに片付けちゃいましょう。` },
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
          { id: 'haruto', msg: `早起きだね、${name}さん。あと${dueCardCount}語、朝のうちにやっちゃおう。` },
          { id: 'yuuki', msg: `${name}、早起き！ あと${dueCardCount}語だよ！ サクッとやろ！` },
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
          { id: 'kai', msg: `${name}、早起きだな。朝イチでチャプターを進めよう。頭が冴えてるうちに。` },
          { id: 'yuuki', msg: `${name}、早起き偉い！ 朝からチャプター行っちゃおう！` },
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
          { id: 'sora', msg: `早起きですね、${name}さん。朝の静かな時間に新しい単語…いいですね。` },
          { id: 'ren', msg: `${name}、朝早いな。…嫌いじゃないぜ、そういうの。新しい単語やるか。` },
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

      {/* Chapter progress card */}
      <Link href="/chapters/">
        <div className="rounded-xl bg-gradient-to-r from-teal-600/80 via-cyan-600/80 to-sky-600/80 p-4 shadow-lg shadow-teal-500/10 hover:shadow-xl hover:shadow-teal-500/20 active:scale-[0.98] transition-all cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">チャプターを進める</p>
              <p className="text-[10px] text-white/60">ストーリーと一緒に英語力を伸ばそう</p>
            </div>
            <ArrowRight className="w-4 h-4 text-white/60" />
          </div>
        </div>
      </Link>

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
        <Link href="/vocab-study">
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium">単語学習</p>
                <p className="text-xs text-gray-500">
                  {dueCards.length > 0 ? `${dueCards.length}語が学習待ち` : '学習する単語なし'}
                </p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/vocabulary">
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium">単語帳</p>
                <p className="text-xs text-gray-500">一覧・検索</p>
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
        <Link href="/streak-rewards">
          <Card className="flex-1 p-4 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-lg font-bold">{profile.streak}</p>
                <p className="text-xs text-gray-500">日連続 &gt;</p>
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
  const [news, setNews] = useState(() => {
    const shuffled = [...FAKE_NEWS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  });
  const [spinning, setSpinning] = useState(false);

  const refresh = () => {
    setSpinning(true);
    const shuffled = [...FAKE_NEWS].sort(() => Math.random() - 0.5);
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
