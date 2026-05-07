'use client';

import { useState, useMemo } from 'react';
import { useVocabCards } from '@/lib/hooks';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SpeakButton } from '@/components/common/SpeakButton';
import { ChevronDown, ChevronRight, BookOpen, BookX, Settings } from 'lucide-react';
import { MEMBERS } from '@/lib/members';
import { MemberAvatar } from '@/components/common/MemberAvatar';
import Link from 'next/link';
import { EIKEN5_VOCAB } from '@/lib/eiken5-vocab';
import { EIKEN4_VOCAB } from '@/lib/eiken4-vocab';
import { EIKEN3_VOCAB } from '@/lib/eiken3-vocab';
import { EIKEN_PRE2_VOCAB } from '@/lib/eiken-pre2-vocab';
import { EIKEN_PRE1_VOCAB } from '@/lib/eiken-pre1-vocab';
import { EIKEN1_VOCAB } from '@/lib/eiken1-vocab';
import { TOEFL_ACADEMIC_VOCAB } from '@/lib/toefl-academic-vocab';
import { getStudyGoal, isEikenGrade, isToeflScore, EIKEN_GRADES, type EikenGrade } from '@/lib/study-goals';
import type { VocabCard, ContentCategory } from '@/types';

interface VocabSeed {
  word: string;
  meaning: string;
  example: string;
  category: ContentCategory;
  difficulty: number;
}

// Eiken grade → vocab sources mapping (cumulative: includes all lower grades)
const EIKEN_VOCAB_MAP: Record<EikenGrade, VocabSeed[][]> = {
  '5': [EIKEN5_VOCAB],
  '4': [EIKEN5_VOCAB, EIKEN4_VOCAB],
  '3': [EIKEN5_VOCAB, EIKEN4_VOCAB, EIKEN3_VOCAB],
  'pre2': [EIKEN5_VOCAB, EIKEN4_VOCAB, EIKEN3_VOCAB, EIKEN_PRE2_VOCAB],
  '2': [EIKEN5_VOCAB, EIKEN4_VOCAB, EIKEN3_VOCAB, EIKEN_PRE2_VOCAB],
  'pre1': [EIKEN5_VOCAB, EIKEN4_VOCAB, EIKEN3_VOCAB, EIKEN_PRE2_VOCAB, EIKEN_PRE1_VOCAB],
  '1': [EIKEN5_VOCAB, EIKEN4_VOCAB, EIKEN3_VOCAB, EIKEN_PRE2_VOCAB, EIKEN_PRE1_VOCAB, EIKEN1_VOCAB],
};

const ALL_EIKEN = [EIKEN5_VOCAB, EIKEN4_VOCAB, EIKEN3_VOCAB, EIKEN_PRE2_VOCAB, EIKEN_PRE1_VOCAB, EIKEN1_VOCAB];

// Get vocab seeds filtered by study goal
function getGoalFilteredSeeds(): { seeds: VocabSeed[]; filterLabel: string } {
  const goal = getStudyGoal();
  const pools: VocabSeed[][] = [];
  const labels: string[] = [];

  // Eiken filtering
  if (isEikenGrade(goal.eiken)) {
    const gradeLabel = EIKEN_GRADES.find(g => g.grade === goal.eiken)?.label ?? goal.eiken;
    pools.push(...(EIKEN_VOCAB_MAP[goal.eiken] ?? ALL_EIKEN));
    labels.push(`英検5級〜${gradeLabel}`);
  } else if (goal.eiken === 'auto') {
    pools.push(...ALL_EIKEN);
    labels.push('英検（おまかせ）');
  } else if (goal.eiken === 'none') {
    // exclude all eiken
  } else {
    // undefined = include all
    pools.push(...ALL_EIKEN);
    labels.push('英検（全級）');
  }

  // TOEFL filtering
  if (isToeflScore(goal.toeflTarget) || goal.toeflTarget === 'auto') {
    pools.push(TOEFL_ACADEMIC_VOCAB);
    labels.push('TOEFL');
  } else if (goal.toeflTarget === 'none') {
    // exclude toefl
  } else {
    pools.push(TOEFL_ACADEMIC_VOCAB);
    labels.push('TOEFL');
  }

  const seeds: VocabSeed[] = [];
  const seen = new Set<string>();
  for (const pool of pools) {
    for (const v of pool) {
      if (!seen.has(v.word)) {
        seen.add(v.word);
        seeds.push(v);
      }
    }
  }

  return {
    seeds: seeds.sort((a, b) => a.word.localeCompare(b.word)),
    filterLabel: labels.length > 0 ? `対象: ${labels.join(' + ')}` : '対象: なし',
  };
}

type FilterMode = 'all' | 'learned' | 'unlearned';

const CATEGORY_LABELS: Record<string, string> = {
  science: '科学',
  society: '社会',
  history: '歴史',
  technology: 'テクノロジー',
  current: '時事',
  culture: '文化',
};

const MEMBER_INTRO_TEMPLATES: Record<string, (word: string, example: string) => string> = {
  kai: (w, e) => `俺が注目したのは「${w}」。例えば "${e}" のように使う。覚えておいて損はない。`,
  yuuki: (w, e) => `ねえ見て！「${w}」って面白くない？ "${e}" って使うんだって！`,
  haruto: (w, e) => `僕の気になった単語は「${w}」。"${e}" …言葉って奥深いですね。`,
  ren: (w, e) => `…「${w}」か。"${e}" 洋楽の歌詞でも見たことある気がする。`,
  sora: (w, e) => `僕が気になったのは「${w}」。"${e}" 本で出てきそうな表現ですね。`,
};

function MemberWordCard({ seeds }: { seeds: { word: string; meaning: string; example: string }[] }) {
  const [data] = useState(() => {
    if (seeds.length === 0) return null;
    const seed = seeds[Math.floor(Math.random() * seeds.length)];
    const member = MEMBERS[Math.floor(Math.random() * MEMBERS.length)];
    const template = MEMBER_INTRO_TEMPLATES[member.id] ?? MEMBER_INTRO_TEMPLATES.kai;
    return { member, text: template(seed.word, seed.example) };
  });

  if (!data) return null;

  return (
    <Card className="p-3">
      <div className="flex items-start gap-3">
        <div className="shrink-0 pt-0.5">
          <MemberAvatar member={data.member} size="sm" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 mb-0.5">{data.member.nameJa}</p>
          <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
            {data.text}
          </p>
        </div>
      </div>
    </Card>
  );
}

export function VocabList({ onBack }: { onBack?: () => void } = {}) {
  const learnedCards = useVocabCards();
  const [filter, setFilter] = useState<FilterMode>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [expandedWord, setExpandedWord] = useState<string | null>(null);

  const { seeds: allSeeds, filterLabel } = useMemo(() => getGoalFilteredSeeds(), []);
  const learnedMap = useMemo(() => {
    const map = new Map<string, VocabCard>();
    for (const c of learnedCards) map.set(c.word, c);
    return map;
  }, [learnedCards]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    for (const s of allSeeds) cats.add(s.category);
    return Array.from(cats).sort();
  }, [allSeeds]);

  const filtered = useMemo(() => {
    let list = allSeeds;
    if (categoryFilter !== 'all') {
      list = list.filter(s => s.category === categoryFilter);
    }
    if (filter === 'learned') {
      list = list.filter(s => learnedMap.has(s.word));
    } else if (filter === 'unlearned') {
      list = list.filter(s => !learnedMap.has(s.word));
    }
    return list;
  }, [allSeeds, filter, categoryFilter, learnedMap]);

  const learnedCount = allSeeds.filter(s => learnedMap.has(s.word)).length;
  const totalCount = allSeeds.length;

  return (
    <div className="space-y-4 px-4">
      {/* Header */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-500 to-violet-400 p-5 text-white shadow-lg mb-2">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
        <div className="relative">
          <h2 className="text-xl font-black tracking-wide">単語帳</h2>
          <p className="text-xs opacity-60 mt-0.5">Vocabulary Book</p>
        </div>
      </div>

      {/* Member word recommendation */}
      <MemberWordCard seeds={allSeeds} />

      {/* Stats */}
      <Card className="p-3">
        <div className="flex items-center justify-between text-sm">
          <span>学習済み: <strong>{learnedCount}</strong> / {totalCount}</span>
          <span className="text-xs text-gray-500">
            {totalCount > 0 ? ((learnedCount / totalCount) * 100).toFixed(2) : '0.00'}%
          </span>
        </div>
        <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all"
            style={{ width: `${totalCount > 0 ? (learnedCount / totalCount) * 100 : 0}%` }}
          />
        </div>
      </Card>

      {/* Goal filter label + link */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500">{filterLabel}</span>
        <Link href="/settings" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
          <Settings className="w-3 h-3" /> 学習目標を変更
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'learned', 'unlearned'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filter === f
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            {f === 'all' && `すべて (${allSeeds.length})`}
            {f === 'learned' && `学習済み (${learnedCount})`}
            {f === 'unlearned' && `未学習 (${totalCount - learnedCount})`}
          </button>
        ))}
      </div>

      {/* Category filter */}
      <div className="flex gap-1.5 flex-wrap">
        <button
          onClick={() => setCategoryFilter('all')}
          className={`px-2 py-1 rounded text-xs ${
            categoryFilter === 'all'
              ? 'bg-gray-700 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
          }`}
        >
          全カテゴリ
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-2 py-1 rounded text-xs ${
              categoryFilter === cat
                ? 'bg-gray-700 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
            }`}
          >
            {CATEGORY_LABELS[cat] || cat}
          </button>
        ))}
      </div>

      {/* Word list */}
      <div className="space-y-1">
        {filtered.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-8">該当する単語がありません</p>
        )}
        {filtered.map(seed => {
          const card = learnedMap.get(seed.word);
          const isLearned = !!card;
          const expanded = expandedWord === seed.word;

          return (
            <div key={seed.word}>
              <button
                onClick={() => setExpandedWord(expanded ? null : seed.word)}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left"
              >
                {isLearned ? (
                  <BookOpen className="w-3.5 h-3.5 text-green-500 shrink-0" />
                ) : (
                  <BookX className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                )}
                <span className="text-sm font-medium flex-1">{seed.word}</span>
                <span className="text-xs text-gray-500 mr-1">{seed.meaning}</span>
                {expanded ? (
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                )}
              </button>

              {expanded && (
                <Card className="mx-2 mb-2 p-3 text-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{seed.word}</span>
                    <SpeakButton text={seed.word} />
                    <span className="text-gray-500">— {seed.meaning}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <p className="text-gray-600 dark:text-gray-400 italic flex-1">{seed.example}</p>
                    <SpeakButton text={seed.example} className="shrink-0" />
                  </div>
                  <div className="flex gap-3 text-gray-500">
                    <span>カテゴリ: {CATEGORY_LABELS[seed.category] || seed.category}</span>
                    <span>難易度: {'★'.repeat(seed.difficulty)}{'☆'.repeat(Math.max(0, 6 - seed.difficulty))}</span>
                  </div>
                  {isLearned && card && (
                    <div className="pt-1 border-t border-gray-100 dark:border-gray-800 flex gap-4 text-gray-500">
                      <span>正答: {card.correctCount}回</span>
                      <span>誤答: {card.incorrectCount}回</span>
                      <span>復習: {card.repetitions}回</span>
                      {card.lastReview && (
                        <span>最終: {new Date(card.lastReview).toLocaleDateString('ja-JP')}</span>
                      )}
                    </div>
                  )}
                </Card>
              )}
            </div>
          );
        })}
      </div>

      {/* Count */}
      <p className="text-xs text-gray-400 text-center pb-4">
        {filtered.length}語を表示中
      </p>
    </div>
  );
}
