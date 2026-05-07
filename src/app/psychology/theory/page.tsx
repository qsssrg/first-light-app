'use client';

import { useState } from 'react';
import { BottomNav } from '@/components/common/BottomNav';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TRADITIONAL_THEORIES, SOCIAL_THEORIES } from '@/data/psychology/theories';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ALL_THEORIES = [...TRADITIONAL_THEORIES, ...SOCIAL_THEORIES];

export default function TheoryPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'traditional' | 'social'>('all');

  const theories = filter === 'all' ? ALL_THEORIES :
    filter === 'traditional' ? TRADITIONAL_THEORIES : SOCIAL_THEORIES;

  return (
    <div className="pb-20">
      <div className="max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto py-6 px-4 space-y-4">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-700 via-violet-600 to-indigo-500 p-5 text-white shadow-lg mb-2">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
        <div className="relative">
          <h2 className="text-xl font-black tracking-wide">理論ライブラリ</h2>
          <p className="text-xs opacity-60 mt-0.5">Theory Library</p>
        </div>
      </div>
        <p className="text-xs text-gray-500">{ALL_THEORIES.length}の心理学理論</p>

        {/* Filter */}
        <div className="flex gap-2">
          {([['all', 'すべて'], ['traditional', '伝統'], ['social', '社会']] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filter === key ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Theory list */}
        <div className="space-y-3">
          {theories.map(theory => (
            <Card
              key={theory.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setExpanded(expanded === theory.id ? null : theory.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{theory.icon}</span>
                    <h3 className="text-sm font-bold">{theory.name}</h3>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{theory.author} ({theory.year})</p>
                  {expanded !== theory.id && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{theory.summary}</p>
                  )}
                </div>
                <Badge variant="secondary" className="text-[10px] shrink-0 ml-2">
                  {theory.category === 'traditional' ? '伝統' : '社会'}
                </Badge>
              </div>

              {expanded === theory.id && (
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 space-y-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">{theory.summary}</p>

                  {theory.connection && (
                    <div className="bg-purple-50 dark:bg-purple-950/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-purple-700 dark:text-purple-300 mb-1">推し活コネクション</p>
                      <p className="text-xs text-purple-600 dark:text-purple-400">{theory.connection}</p>
                    </div>
                  )}

                  {theory.keyFindings && (
                    <div>
                      <p className="text-xs font-medium mb-1">主な知見</p>
                      <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        {theory.keyFindings.map((f: string, i: number) => (
                          <li key={i}>・{f}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {theory.firstLightComment && (
                    <p className="text-xs italic text-indigo-400">「{theory.firstLightComment}」</p>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
