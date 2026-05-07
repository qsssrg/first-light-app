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
import { Lock, BookOpen, Play } from 'lucide-react';
import { getPlayerName } from '@/lib/player-name';
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
    <div className="space-y-6 px-4">
      {/* Member header */}
      <div
        className="rounded-2xl p-6 text-center"
        style={{ background: `linear-gradient(135deg, ${member.color}20, ${member.color}40)` }}
      >
        <MemberAvatar member={member} size="xl" />
        <h2 className="text-xl font-bold mt-3">{member.nameJa}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">{member.name}</p>
        <Badge variant="secondary" className="mt-2">{member.role}</Badge>
      </div>

      {/* Personal message */}
      <PersonalMessage memberId={memberId} />

      {/* Description */}
      <Card className="p-4">
        <p className="text-sm text-gray-700 dark:text-gray-300">{member.description}</p>
        <p className="text-sm text-gray-500 mt-2 italic">{member.personality}</p>
      </Card>

      {/* Memory Stories (inline VN playback) */}
      {(MEMBER_MEMORIES[memberId] ?? []).length > 0 && (
        <div>
          <h3 className="font-bold text-sm mb-3 px-1">思い出ストーリー</h3>
          <div className="space-y-2">
            {(MEMBER_MEMORIES[memberId] ?? []).map(m => {
              const scenario = memberMemoryScenarios[m.scenarioId];
              return (
                <Card
                  key={m.scenarioId}
                  className="p-4 cursor-pointer hover:shadow-md transition-shadow border-indigo-200/30 hover:border-indigo-400/50"
                  onClick={() => scenario && setPlayingScenario(scenario)}
                >
                  <div className="flex items-center gap-3">
                    <Play className="w-4 h-4 text-indigo-400 shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-sm font-bold">{m.title}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{m.line1}</p>
                      <p className="text-xs text-gray-500">{m.line2}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Stories (Album) */}
      <div>
        <h3 className="font-bold text-sm mb-3 px-1">ストーリー</h3>
        <div className="space-y-3">
          {stories.map(story => {
            const unlocked = userLevel >= story.unlockedAt;
            return (
              <Card key={story.id} className={`p-4 ${!unlocked ? 'opacity-50' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      {!unlocked && <Lock className="w-3 h-3" />}
                      {story.title}
                    </h4>
                    {unlocked ? (
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 whitespace-pre-line">
                        {story.content}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-400 mt-1">
                        Lv.{story.unlockedAt} で解放
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function MemberList() {
  return (
    <div className="space-y-4 px-4">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400 p-5 text-white shadow-lg mb-2">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
        <div className="relative">
          <h2 className="text-xl font-black tracking-wide">FIRST LIGHT</h2>
          <p className="text-xs opacity-60 mt-0.5">Members</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {MEMBERS.map(member => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}

function MemberCard({ member }: { member: Member }) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <MemberAvatar member={member} size="lg" />
        <div className="flex-1">
          <h3 className="font-bold">{member.nameJa} <span className="text-sm font-normal text-gray-500">{member.name}</span></h3>
          <p className="text-xs text-gray-500">{member.role}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{member.description}</p>
        </div>
      </div>
    </Card>
  );
}
