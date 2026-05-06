'use client';

import { useState } from 'react';
import { BottomNav } from '@/components/common/BottomNav';
import { MEMBERS } from '@/lib/members';
import { useProfile } from '@/lib/hooks';
import { Card } from '@/components/ui/card';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import { Badge } from '@/components/ui/badge';
import { Lock, X } from 'lucide-react';
import storyCardsData from '@/data/story-cards.json';
import { VNModal } from '@/components/vn/VNModal';
import { getLevelupScenario } from '@/lib/scenarios/adapter';
import type { Scenario } from '@/lib/scenarios/types';

interface StoryCard {
  level: number;
  title: string;
  member: string;
  content: string;
  milestone: string;
}

const storyCards = storyCardsData as StoryCard[];

export default function AlbumPage() {
  const profile = useProfile();
  const userLevel = profile?.level ?? 1;
  const [filterMember, setFilterMember] = useState<string | 'all'>('all');
  const [selectedCard, setSelectedCard] = useState<StoryCard | null>(null);
  const [vnScene, setVnScene] = useState<Scenario | null>(null);

  const filtered = filterMember === 'all'
    ? storyCards
    : storyCards.filter(c => c.member === filterMember);

  const unlockedCount = storyCards.filter(c => c.level <= userLevel).length;

  return (
    <div className="pb-20">
      <div className="max-w-lg mx-auto py-6 px-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">アルバム</h2>
          <span className="text-xs text-gray-500">{unlockedCount} / 25 解放済み</span>
        </div>
        <p className="text-xs text-gray-500">レベルが上がるとストーリーカードが解放されます</p>

        {/* Member filter */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setFilterMember('all')}
            className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap ${filterMember === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}
          >
            全員
          </button>
          {MEMBERS.map(m => (
            <button
              key={m.id}
              onClick={() => setFilterMember(m.id)}
              className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap ${filterMember === m.id ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}
            >
              {m.nameJa}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="space-y-3">
          {filtered.map((story, i) => {
            const unlocked = userLevel >= story.level;
            const member = MEMBERS.find(m => m.id === story.member);
            return (
              <Card
                key={i}
                className={`p-4 transition-shadow ${unlocked ? 'hover:shadow-md cursor-pointer' : 'opacity-40'}`}
                onClick={() => {
                  if (!unlocked) return;
                  const scenario = getLevelupScenario(story.level);
                  if (scenario) {
                    setVnScene(scenario);
                  } else {
                    setSelectedCard(story);
                  }
                }}
              >
                <div className="flex items-start gap-3">
                  {member && <MemberAvatar member={member} size="sm" />}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium flex items-center gap-1">
                        {!unlocked && <Lock className="w-3 h-3" />}
                        {unlocked ? story.title : '???'}
                      </h4>
                      <Badge variant="secondary" className="text-[10px]">Lv.{story.level}</Badge>
                    </div>
                    {unlocked ? (
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {story.content}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-400 mt-1">Lv.{story.level} で解放 — {story.milestone}</p>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* VN Scene modal */}
      {vnScene && (
        <VNModal
          scenario={vnScene}
          onComplete={() => setVnScene(null)}
        />
      )}

      {/* Detail modal (fallback for cards without VN scene) */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setSelectedCard(null)}>
          <Card className="max-w-md w-full p-6 relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedCard(null)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              {MEMBERS.find(m => m.id === selectedCard.member) && (
                <MemberAvatar member={MEMBERS.find(m => m.id === selectedCard.member)!} size="lg" />
              )}
              <div>
                <h3 className="font-bold">{selectedCard.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-[10px]">Lv.{selectedCard.level}</Badge>
                  <span className="text-xs text-gray-500">{selectedCard.milestone}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {selectedCard.content}
            </p>
          </Card>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
