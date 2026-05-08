'use client';

import { useState, useEffect } from 'react';
import { MEMBERS } from '@/lib/members';
import { STORY_CARDS } from '@/lib/stories';
import { useProfile, useMemberAffinities } from '@/lib/hooks';
// affinity imports consolidated below
import { MemberAvatar } from '@/components/common/MemberAvatar';
import { TypewriterText } from '@/components/common/TypewriterText';
import { Card } from '@/components/ui/card';
import { Lock, Play, MessageCircle, Image, User, Heart, Users } from 'lucide-react';
import { getPlayerName } from '@/lib/player-name';
import { getAffinityLevel, AFFINITY_LABELS, AFFINITY_THRESHOLDS } from '@/lib/db';
import Link from 'next/link';
import { memberMemoryScenarios } from '@/lib/scenarios/member-memories';
import { getAvailableStories, getScenarioById } from '@/lib/scenarios/special-stories';
import { VNEngine } from '@/components/vn/VNEngine';
import type { Member } from '@/types';
import type { Scenario } from '@/lib/scenarios/types';
import { MEMBER_COMMENTS } from '@/data/member-comments';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const PERSONAL_MESSAGES: Record<string, (name: string) => string[]> = {
  haruto: (n) => [`${n}さん、今日はどんな言葉に出会えるかな。`, `${n}さんと一緒に勉強できて…嬉しいです。`, `${n}さんのおかげで、新しい歌詞のアイデアが浮かんできます。`],
  sora: (n) => [`${n}さん…来てくれたんですね。`, `${n}さんと読む英文は、一人で読むより楽しいです。`, `あ、${n}さん。おすすめの本、見つけたんです。`],
  ren: (n) => [`…${n}か。ま、来たなら付き合ってやるよ。`, `${n}と練習してると、なんか調子いいんだよな。`, `${n}、さっき聴いてた曲の歌詞…一緒に訳さないか？`],
  yuuki: (n) => [`${n}〜！ 会いたかったー！`, `${n}のこと、海外ファンにも紹介していい？笑`, `ねえ${n}、今日も一緒に頑張ろ！`],
  kai: (n) => [`${n}、来てくれたか。…頼りにしてるぞ。`, `${n}がいると、メンバーの調子がいいんだ。気づいてたか？`, `${n}のこと、最初から信頼してたよ。`],
};

const TAP_REACTIONS: Record<string, string[]> = {
  haruto: ['あ…{name}さん。', '…えへ。', 'この単語、知ってますか？', '…ありがとうございます。'],
  sora: ['…はい？', 'あ、{name}さん…。', '…何か用ですか？', '…嬉しいです。'],
  ren: ['…ん？', 'なんだよ。', '…悪くないな。', '…ちょっと照れるだろ。'],
  yuuki: ['おっ！', '{name}〜！', 'タッチ！', 'えへへ〜！'],
  kai: ['…どうした。', '{name}か。', '何かあったか？', '…頼りにしてるぞ。'],
};

const MEMBER_MEMORIES: Record<string, { scenarioId: string; title: string; line1: string; line2: string }[]> = {
  haruto: [{ scenarioId: 'haruto-memory', title: '最初のノート', line1: '"serendipity"との出会い。', line2: '言葉を集めるきっかけになった一語。' }],
  sora: [{ scenarioId: 'sora-memory', title: '洋書との出会い', line1: '空港の本屋で手に取ったペーパーバック。', line2: '辞書を引きながら最後まで読んだ日。' }],
  ren: [{ scenarioId: 'ren-memory', title: 'ヘッドフォンの向こう側', line1: '親父のレコードで聴いた洋楽。', line2: '歌詞が分からなくても鳥肌が立った冬の夜。' }],
  yuuki: [{ scenarioId: 'yuuki-memory', title: '海外ファンへのDM', line1: '英語のメッセージに自分の言葉で返したい。', line2: 'Google翻訳じゃなくて、気持ちを込めて。' }],
  kai: [{ scenarioId: 'kai-memory', title: 'リーダーの責任', line1: '海外展開の話が出た日、全員が俺を見た。', line2: '文法書を買いに行った夜のこと。' }],
};

const AXIS_LABELS: Record<string, string> = { vocabulary: '語彙', reading: '読解', listening: 'リスニング', writing: 'ライティング', grammar: '文法' };

type Tab = 'profile' | 'story' | 'gallery' | 'quotes';

export function MemberDetail({ memberId }: { memberId: string }) {
  const profile = useProfile();
  const member = MEMBERS.find(m => m.id === memberId);
  const [playingScenario, setPlayingScenario] = useState<Scenario | null>(null);
  const [tab, setTab] = useState<Tab>('profile');
  const [tapReaction, setTapReaction] = useState('');
  const name = getPlayerName() || 'マネージャー';

  if (!member) return <p className="text-center text-gray-500">メンバーが見つかりません</p>;

  if (playingScenario) {
    return <VNEngine scenario={playingScenario} onComplete={() => setPlayingScenario(null)} skippable />;
  }

  const handleTap = () => {
    const reactions = TAP_REACTIONS[memberId] ?? ['…'];
    const r = reactions[Math.floor(Math.random() * reactions.length)].replace(/\{name\}/g, name);
    setTapReaction(r);
    setTimeout(() => setTapReaction(''), 2000);
  };

  const stories = STORY_CARDS.filter(s => s.memberId === memberId);
  const userLevel = profile?.level ?? 1;

  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: 'profile', label: 'プロフィール', icon: User },
    { key: 'story', label: 'ストーリー', icon: Play },
    { key: 'gallery', label: 'ギャラリー', icon: Image },
    { key: 'quotes', label: 'セリフ集', icon: MessageCircle },
  ];

  return (
    <div className="pb-6">
      {/* Hero image area — large member image with overlay */}
      <div
        className="relative h-64 md:h-80 overflow-hidden cursor-pointer"
        onClick={handleTap}
        style={{ background: `linear-gradient(180deg, ${member.color}40 0%, ${member.color}10 100%)` }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={`${basePath}/members/${member.id}.png`}
            alt={member.nameJa}
            className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl rounded-full"
          />
        </div>
        {/* Name overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h2 className="text-2xl font-black text-white">{member.nameJa}</h2>
          <p className="text-sm text-white/60">{member.name}</p>
          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/10 backdrop-blur-sm text-white/80">
            {member.role}
          </span>
        </div>
        {/* Tap reaction bubble */}
        {tapReaction && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 animate-combo-flash">
            <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
              「{tapReaction}」
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-800 px-4">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors border-b-2 ${
              tab === key
                ? 'border-indigo-500 text-indigo-500'
                : 'border-transparent text-gray-500'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="px-4 pt-4 space-y-4">
        {tab === 'profile' && (
          <>
            <PersonalMessage memberId={memberId} />
            <Card className="p-4 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{member.description}</p>
              <p className="text-sm text-gray-500 mt-2 italic">{member.personality}</p>
            </Card>
            {member.profile && (
              <Card className="p-4 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Profile</h3>
                <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs">
                  <div><span className="text-gray-500">生年月日</span><p className="font-medium">{member.profile.birthYear}年{member.profile.birthday.replace('/', '月')}日</p></div>
                  <div><span className="text-gray-500">出身</span><p className="font-medium">{member.profile.hometown}</p></div>
                  <div><span className="text-gray-500">身長</span><p className="font-medium">{member.profile.height}cm</p></div>
                  <div><span className="text-gray-500">血液型</span><p className="font-medium">{member.profile.bloodType}型</p></div>
                  <div className="col-span-2"><span className="text-gray-500">パート</span><p className="font-medium">{member.profile.part}</p></div>
                  <div className="col-span-2"><span className="text-gray-500">趣味</span><p className="font-medium">{member.profile.hobbies}</p></div>
                  <div className="col-span-2"><span className="text-gray-500">特技</span><p className="font-medium">{member.profile.specialty}</p></div>
                  <div className="col-span-2"><span className="text-gray-500">性格</span><p className="font-medium">{member.profile.traits}</p></div>
                  {member.profile.zodiac && <div><span className="text-gray-500">星座</span><p className="font-medium">{member.profile.zodiac}</p></div>}
                  {member.profile.mbti && <div><span className="text-gray-500">MBTI</span><p className="font-medium">{member.profile.mbti}</p></div>}
                  {member.profile.englishRole && <div><span className="text-gray-500">英語担当</span><p className="font-medium">{member.profile.englishRole}</p></div>}
                  <div className="col-span-2"><span className="text-gray-500">座右の銘</span><p className="font-medium italic">「{member.profile.motto}」</p></div>
                </div>
              </Card>
            )}
            <AffinityCard memberId={memberId} />
            <MemberCommentsSection memberId={memberId} memberNameJa={member.nameJa} />
          </>
        )}

        {tab === 'story' && (
          <>
            {/* Memory VN */}
            {(MEMBER_MEMORIES[memberId] ?? []).map(m => {
              const scenario = memberMemoryScenarios[m.scenarioId];
              return (
                <Card
                  key={m.scenarioId}
                  className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => scenario && setPlayingScenario(scenario)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                      <Play className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold">{m.title}</h4>
                      <p className="text-xs text-gray-500">{m.line1}</p>
                      <p className="text-xs text-gray-400">{m.line2}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
            {/* Special stories by affinity */}
            <SpecialStoriesSection memberId={memberId} onPlay={setPlayingScenario} />
            {/* Album stories */}
            {stories.map(story => {
              const unlocked = userLevel >= story.unlockedAt;
              return (
                <Card key={story.id} className={`p-4 ${!unlocked ? 'opacity-40' : ''}`}>
                  <h4 className="text-sm font-bold flex items-center gap-2">
                    {!unlocked && <Lock className="w-3 h-3" />}
                    {story.title}
                  </h4>
                  {unlocked ? (
                    <p className="text-xs text-gray-500 mt-1.5 whitespace-pre-line">{story.content}</p>
                  ) : (
                    <p className="text-xs text-gray-400 mt-1">Lv.{story.unlockedAt} で解放</p>
                  )}
                </Card>
              );
            })}
          </>
        )}

        {tab === 'gallery' && (
          <div className="text-center py-12">
            <Image className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-500">ストリーク報酬で獲得した画像が表示されます</p>
            <p className="text-xs text-gray-400 mt-1">Coming Soon</p>
          </div>
        )}

        {tab === 'quotes' && (
          <>
            <p className="text-xs text-gray-500 mb-2">タップで聞いたセリフ</p>
            {(PERSONAL_MESSAGES[memberId]?.(name) ?? []).map((q, i) => (
              <Card key={i} className="p-3">
                <p className="text-sm italic text-gray-700 dark:text-gray-300">「{q}」</p>
              </Card>
            ))}
            {(TAP_REACTIONS[memberId] ?? []).map((q, i) => (
              <Card key={`tap-${i}`} className="p-3">
                <p className="text-sm italic text-gray-700 dark:text-gray-300">「{q.replace(/\{name\}/g, name)}」</p>
              </Card>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function PersonalMessage({ memberId }: { memberId: string }) {
  const [message, setMessage] = useState('');
  useEffect(() => {
    const n = getPlayerName();
    if (!n) return;
    const msgs = PERSONAL_MESSAGES[memberId];
    if (msgs) {
      const list = msgs(n);
      setMessage(list[Math.floor(Math.random() * list.length)]);
    }
  }, [memberId]);
  if (!message) return null;
  return (
    <Card className="p-4 border-indigo-200/30 bg-indigo-950/20 backdrop-blur-sm">
      <TypewriterText text={`「${message}」`} className="text-sm italic text-gray-800 dark:text-gray-100" />
    </Card>
  );
}

function SpecialStoriesSection({ memberId, onPlay }: { memberId: string; onPlay: (s: Scenario) => void }) {
  const affinities = useMemberAffinities();
  const aff = affinities.find(a => a.memberId === memberId);
  const level = aff ? getAffinityLevel(aff.points) : 1;
  const stories = getAvailableStories(memberId, level);

  if (stories.length === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="text-xs font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1">
        <Heart className="w-3 h-3" /> 特別ストーリー
      </h4>
      {stories.map(s => {
        const scenario = s.unlocked ? getScenarioById(s.id) : null;
        return (
          <Card
            key={s.id}
            className={`p-3 ${s.unlocked ? 'cursor-pointer hover:shadow-md' : 'opacity-40'}`}
            onClick={() => scenario && onPlay(scenario)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                s.unlocked ? 'bg-pink-500/20' : 'bg-gray-500/20'
              }`}>
                {s.unlocked ? <Play className="w-4 h-4 text-pink-400" /> : <Lock className="w-3 h-3 text-gray-500" />}
              </div>
              <div className="flex-1">
                <h5 className="text-sm font-medium">{s.title}</h5>
                <p className="text-[10px] text-gray-500">
                  {s.unlocked ? '再生可能' : `親密度Lv.${s.requiredLevel}で解放`}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function AffinityCard({ memberId }: { memberId: string }) {
  const affinities = useMemberAffinities();
  const aff = affinities.find(a => a.memberId === memberId);
  const points = aff?.points ?? 0;
  const level = getAffinityLevel(points);
  const label = AFFINITY_LABELS[level - 1] ?? '知り合い';
  const nextThreshold = AFFINITY_THRESHOLDS[level] ?? AFFINITY_THRESHOLDS[AFFINITY_THRESHOLDS.length - 1];
  const prevThreshold = AFFINITY_THRESHOLDS[level - 1] ?? 0;
  const progress = nextThreshold > prevThreshold ? Math.round(((points - prevThreshold) / (nextThreshold - prevThreshold)) * 100) : 100;

  return (
    <Card className="p-4 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
        <Heart className="w-3 h-3 text-pink-400" /> 親密度
      </h3>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-bold text-pink-500">Lv.{level} {label}</p>
        <p className="text-xs text-gray-500">{points}pt</p>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
      </div>
      {level < 5 && (
        <p className="text-[10px] text-gray-400 mt-1">次のレベルまで {nextThreshold - points}pt</p>
      )}
    </Card>
  );
}

function MemberCommentsSection({ memberId, memberNameJa }: { memberId: string; memberNameJa: string }) {
  const [comments] = useState(() => {
    const aboutMe = MEMBER_COMMENTS.filter(c => c.about === memberId);
    const otherMembers = MEMBERS.filter(m => m.id !== memberId);
    return otherMembers.map(m => {
      const pool = aboutMe.filter(c => c.from === m.id);
      const pick = pool[Math.floor(Math.random() * pool.length)];
      return { member: m, comment: pick?.text ?? '' };
    }).filter(c => c.comment);
  });

  if (comments.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
        <Users className="w-3 h-3" /> メンバーから見た{memberNameJa}
      </h3>
      {comments.map(({ member, comment }) => (
        <Card key={member.id} className="p-4 backdrop-blur-sm" style={{ backgroundColor: `${member.color}22` }}>
          <div className="flex items-start gap-3">
            <MemberAvatar member={member} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-gray-500 mb-1">{member.nameJa}</p>
              <TypewriterText text={`「${comment}」`} speed={25} className="text-xs text-gray-700 dark:text-gray-300 italic leading-relaxed" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export function MemberList() {
  const profile = useProfile();
  const affinities = useMemberAffinities();
  const affinityMap = new Map(affinities.map(a => [a.memberId, a]));
  const oshiId = profile?.settings?.oshiMemberId;

  return (
    <div className="space-y-5 px-4">
      <div className="text-center">
        <p className="text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase">Members</p>
        <h2 className="text-2xl font-black tracking-tight mt-1">FIRST LIGHT</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {MEMBERS.map(member => {
          const aff = affinityMap.get(member.id);
          const level = aff ? getAffinityLevel(aff.points) : 1;
          return <MemberCard key={member.id} member={member} affinityLevel={level} isOshi={oshiId === member.id} />;
        })}
      </div>
    </div>
  );
}

const AXIS_ICONS: Record<string, string> = {
  vocabulary: '📖',
  reading: '📚',
  listening: '🎧',
  writing: '✏️',
  grammar: '🔤',
};

function MemberCard({ member, affinityLevel, isOshi }: { member: Member; affinityLevel: number; isOshi?: boolean }) {
  return (
    <Link href={`/members?id=${member.id}`}>
      <div
        className={`rounded-xl overflow-hidden bg-white/5 backdrop-blur-md border hover:shadow-lg hover:shadow-indigo-500/10 hover:border-white/20 transition-all active:scale-[0.97] relative ${
          isOshi ? 'border-yellow-400/50 ring-1 ring-yellow-400/30' : 'border-white/10'
        }`}
      >
        {isOshi && <span className="absolute top-1 left-1 z-10 text-sm">⭐</span>}
        <div
          className="h-28 flex items-center justify-center relative"
          style={{ background: `linear-gradient(135deg, ${member.color}25, ${member.color}50)` }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.06)_0%,transparent_60%)]" />
          <MemberAvatar member={member} size="lg" />
          <span className="absolute top-2 right-2 text-sm">{AXIS_ICONS[member.axis] ?? ''}</span>
        </div>
        <div className="p-3 bg-black/20 backdrop-blur-sm">
          <h3 className="text-sm font-bold text-gray-200 truncate">{member.nameJa}</h3>
          <p className="text-[10px] text-gray-500 tracking-wider uppercase">{member.role}</p>
          <div className="flex items-center gap-0.5 mt-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Heart
                key={i}
                className={`w-3 h-3 ${i < affinityLevel ? 'text-pink-400 fill-pink-400' : 'text-gray-700'}`}
              />
            ))}
            <span className="text-[9px] text-gray-500 ml-1">{AFFINITY_LABELS[affinityLevel - 1]}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
