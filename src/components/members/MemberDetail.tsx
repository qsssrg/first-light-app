'use client';

import { useState, useEffect } from 'react';
import { MEMBERS } from '@/lib/members';
import { STORY_CARDS } from '@/lib/stories';
import { useProfile } from '@/lib/hooks';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock } from 'lucide-react';
import { getPlayerName } from '@/lib/player-name';
import type { Member } from '@/types';

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
    <Card className="p-3 border-indigo-200/30 bg-indigo-950/10">
      <p className="text-sm italic text-indigo-300">「{message}」</p>
    </Card>
  );
}

interface MemberDetailProps {
  memberId: string;
}

export function MemberDetail({ memberId }: MemberDetailProps) {
  const profile = useProfile();
  const member = MEMBERS.find(m => m.id === memberId);

  if (!member) return <p className="text-center text-gray-500">メンバーが見つかりません</p>;

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
      <h2 className="text-lg font-bold">FIRST LIGHT</h2>
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
