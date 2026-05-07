'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MEMBERS } from '@/lib/members';
import { STORY_CARDS } from '@/lib/stories';
import { useProfile } from '@/lib/hooks';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import { TypewriterText } from '@/components/common/TypewriterText';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, BookOpen, Play, Heart } from 'lucide-react';
import { useMemberAffinities } from '@/lib/hooks';
import { getAffinityLevel, AFFINITY_LABELS } from '@/lib/db';
import { getPlayerName } from '@/lib/player-name';
import Link from 'next/link';
import { memberMemoryScenarios } from '@/lib/scenarios/member-memories';
import { VNEngine } from '@/components/vn/VNEngine';
import { resolvePlayerName } from '@/lib/player-name';
import type { Member } from '@/types';
import type { Scenario } from '@/lib/scenarios/types';

const PERSONAL_MESSAGES: Record<string, (name: string) => string[]> = {
  haruto: (n) => [
    `${n}さん、今日はどんな言葉に出会えるかな。`,
    `${n}さんと一緒に勉強できて…嬉しいです。`,
    `${n}さんのおかげで、新しい歌詞のアイデアが浮かんできます。`,
  ],
  sora: (n) => [
    `${n}さん…来てくれたんですね。`,
    `${n}さんと読む英文は、一人で読むより楽しいです。`,
    `あ、${n}さん。おすすめの本、見つけたんです。`,
  ],
  ren: (n) => [
    `…${n}か。ま、来たなら付き合ってやるよ。`,
    `${n}と練習してると、なんか調子いいんだよな。`,
    `${n}、さっき聴いてた曲の歌詞…一緒に訳さないか？`,
  ],
  yuuki: (n) => [
    `${n}〜！ 会いたかったー！`,
    `${n}のこと、海外ファンにも紹介していい？笑`,
    `ねえ${n}、今日も一緒に頑張ろ！`,
  ],
  kai: (n) => [
    `${n}、来てくれたか。…頼りにしてるぞ。`,
    `${n}がいると、メンバーの調子がいいんだ。気づいてたか？`,
    `${n}のこと、最初から信頼してたよ。`,
  ],
};

function PersonalMessage({ memberId }: { memberId: string }) {
  const [message, setMessage] = useState('');
  useEffect(() => {
    const name = getPlayerName();
    if (!name) return;
    const msgs = PERSONAL_MESSAGES[memberId];
    if (msgs) {
      const list = msgs(name);
      setMessage(list[Math.floor(Math.random() * list.length)]);
    }
  }, [memberId]);

  if (!message) return null;
  return (
    <Card className="p-4 border-indigo-200/30 bg-indigo-950/20 backdrop-blur-sm">
      <TypewriterText
        text={`「${message}」`}
        className="text-sm italic text-gray-800 dark:text-gray-100"
      />
    </Card>
  );
}

interface MemberDetailProps {
  memberId: string;
}

const MEMBER_MEMORIES: Record<string, { scenarioId: string; title: string; line1: string; line2: string }[]> = {
  haruto: [{ scenarioId: 'haruto-memory', title: '最初のノート', line1: '"serendipity"との出会い。', line2: '言葉を集めるきっかけになった一語。' }],
  sora: [{ scenarioId: 'sora-memory', title: '洋書との出会い', line1: '空港の本屋で手に取ったペーパーバック。', line2: '辞書を引きながら最後まで読んだ日。' }],
  ren: [{ scenarioId: 'ren-memory', title: 'ヘッドフォンの向こう側', line1: '親父のレコードで聴いた洋楽。', line2: '歌詞が分からなくても鳥肌が立った冬の夜。' }],
  yuuki: [{ scenarioId: 'yuuki-memory', title: '海外ファンへのDM', line1: '英語のメッセージに自分の言葉で返したい。', line2: 'Google翻訳じゃなくて、気持ちを込めて。' }],
  kai: [{ scenarioId: 'kai-memory', title: 'リーダーの責任', line1: '海外展開の話が出た日、全員が俺を見た。', line2: '文法書を買いに行った夜のこと。' }],
};

export function MemberDetail({ memberId }: MemberDetailProps) {
  const profile = useProfile();
  const router = useRouter();
  const member = MEMBERS.find(m => m.id === memberId);
  const [playingScenario, setPlayingScenario] = useState<Scenario | null>(null);

  if (!member) return <p className="text-center text-gray-500">メンバーが見つかりません</p>;

  // Playing a memory VN inline
  if (playingScenario) {
    return (
      <VNEngine
        scenario={playingScenario}
        onComplete={() => setPlayingScenario(null)}
        skippable
      />
    );
  }

  const stories = STORY_CARDS.filter(s => s.memberId === memberId);
  const userLevel = profile?.level ?? 1;

  return (
    <div className="space-y-5 px-4 pb-6">
      {/* Member header — gradient card */}
      <div
        className="rounded-2xl p-6 text-center relative overflow-hidden shadow-xl"
        style={{ background: `linear-gradient(135deg, ${member.color}30, ${member.color}60)` }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
        <div className="relative">
          <MemberAvatar member={member} size="xl" />
          <h2 className="text-2xl font-black mt-3 tracking-tight">{member.nameJa}</h2>
          <p className="text-sm text-gray-300/70">{member.name}</p>
          <span className="inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/10 backdrop-blur-sm border border-white/20 text-white/80">
            {member.role}
          </span>
        </div>
      </div>

      {/* Personal message — glassmorphism */}
      <PersonalMessage memberId={memberId} />

      {/* Description — glassmorphism */}
      <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-4">
        <p className="text-sm text-gray-200 leading-relaxed">{member.description}</p>
        <p className="text-sm text-gray-400 mt-2 italic">{member.personality}</p>
      </div>

      {/* Memory Stories */}
      {(MEMBER_MEMORIES[memberId] ?? []).length > 0 && (
        <div>
          <h3 className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-3 px-1">Memory Story</h3>
          <div className="space-y-2">
            {(MEMBER_MEMORIES[memberId] ?? []).map(m => {
              const scenario = memberMemoryScenarios[m.scenarioId];
              return (
                <button
                  key={m.scenarioId}
                  className="w-full text-left rounded-xl bg-white/5 backdrop-blur-md border border-indigo-400/20 hover:border-indigo-400/50 p-4 transition-all hover:shadow-lg hover:shadow-indigo-500/10 active:scale-[0.98]"
                  onClick={() => scenario && setPlayingScenario(scenario)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                      <Play className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-gray-200">{m.title}</h4>
                      <p className="text-xs text-gray-400">{m.line1}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Stories (Album) */}
      <div>
        <h3 className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-3 px-1">Story Album</h3>
        <div className="space-y-2.5">
          {stories.map(story => {
            const unlocked = userLevel >= story.unlockedAt;
            return (
              <div
                key={story.id}
                className={`rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-4 ${!unlocked ? 'opacity-40' : ''}`}
              >
                <h4 className="text-sm font-bold text-gray-200 flex items-center gap-2">
                  {!unlocked && <Lock className="w-3 h-3 text-gray-500" />}
                  {story.title}
                </h4>
                {unlocked ? (
                  <p className="text-xs text-gray-400 mt-1.5 whitespace-pre-line leading-relaxed">
                    {story.content}
                  </p>
                ) : (
                  <p className="text-xs text-gray-600 mt-1">Lv.{story.unlockedAt} で解放</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function MemberList() {
  const affinities = useMemberAffinities();
  const affinityMap = new Map(affinities.map(a => [a.memberId, a]));

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
          return <MemberCard key={member.id} member={member} affinityLevel={level} />;
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

function MemberCard({ member, affinityLevel }: { member: Member; affinityLevel: number }) {
  return (
    <Link href={`/members?id=${member.id}`}>
      <div
        className="rounded-xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 hover:shadow-lg hover:shadow-indigo-500/10 hover:border-white/20 transition-all active:scale-[0.97] relative"
      >
        {/* Top: avatar area with color accent */}
        <div
          className="h-28 flex items-center justify-center relative"
          style={{ background: `linear-gradient(135deg, ${member.color}25, ${member.color}50)` }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.06)_0%,transparent_60%)]" />
          <MemberAvatar member={member} size="lg" />
          <span className="absolute top-2 right-2 text-sm">{AXIS_ICONS[member.axis] ?? ''}</span>
        </div>

        {/* Bottom: info */}
        <div className="p-3 bg-black/20 backdrop-blur-sm">
          <h3 className="text-sm font-bold text-gray-200 truncate">{member.nameJa}</h3>
          <p className="text-[10px] text-gray-500 tracking-wider uppercase">{member.role}</p>

          {/* Affinity hearts */}
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
