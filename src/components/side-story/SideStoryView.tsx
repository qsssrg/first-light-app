'use client';

import { useState } from 'react';
import { SIDE_STORIES, type SideStory, type SideStoryLevel } from '@/lib/side-stories';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ChevronRight, Check, X, Sparkles } from 'lucide-react';

export function SideStoryList() {
  const [activeStory, setActiveStory] = useState<SideStory | null>(null);

  if (activeStory) {
    return <SideStoryPlayer story={activeStory} onBack={() => setActiveStory(null)} />;
  }

  const categoryColors: Record<string, string> = {
    science: 'bg-green-100 text-green-700',
    society: 'bg-blue-100 text-blue-700',
    history: 'bg-amber-100 text-amber-700',
    technology: 'bg-purple-100 text-purple-700',
    current: 'bg-red-100 text-red-700',
    culture: 'bg-pink-100 text-pink-700',
  };

  return (
    <div className="space-y-4 px-4">
      <h2 className="text-lg font-bold">サイドストーリー</h2>
      <p className="text-xs text-gray-500">単語学習から広がる教養コンテンツ。3段階で深掘りしよう。</p>

      <div className="space-y-3">
        {SIDE_STORIES.map(story => (
          <Card
            key={story.id}
            className="p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setActiveStory(story)}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <BookOpen className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium">{story.title}</h3>
                  <Badge className={`text-[10px] ${categoryColors[story.category] || ''}`}>
                    {story.category}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  きっかけの単語: <span className="font-mono">{story.triggerWord}</span>
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function SideStoryPlayer({ story, onBack }: { story: SideStory; onBack: () => void }) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  const level = story.levels[currentLevel];

  const handleAnswer = (index: number) => {
    if (answered !== null) return;
    setAnswered(index);
  };

  const handleNext = () => {
    if (currentLevel + 1 >= story.levels.length) {
      setCompleted(true);
    } else {
      setCurrentLevel(currentLevel + 1);
      setAnswered(null);
    }
  };

  if (completed) {
    return (
      <div className="text-center py-12 px-4 space-y-4">
        <Sparkles className="w-12 h-12 text-yellow-500 mx-auto" />
        <h2 className="text-xl font-bold">ストーリー完了！</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          「{story.title}」の3段階を全てクリアしました。
        </p>
        <p className="text-xs text-gray-500">
          {story.triggerWord}から始まった学びが、ここまで広がったね。
        </p>
        <Button onClick={onBack}>一覧に戻る</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 px-4">
      <button onClick={onBack} className="text-xs text-gray-500 hover:text-gray-700">
        ← サイドストーリー一覧
      </button>

      <div className="flex items-center gap-2">
        <h2 className="text-lg font-bold">{story.title}</h2>
        <Badge variant="secondary" className="text-[10px]">Lv.{level.level}/3</Badge>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1">
        {story.levels.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full ${
              i < currentLevel ? 'bg-green-400' : i === currentLevel ? 'bg-blue-400' : 'bg-gray-200 dark:bg-gray-800'
            }`}
          />
        ))}
      </div>

      <Card className="p-4">
        <h3 className="text-sm font-medium mb-2">{level.title}</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          {level.content}
        </p>
      </Card>

      <Card className="p-4">
        <p className="text-sm font-medium mb-3">{level.question}</p>
        <div className="space-y-2">
          {level.options.map((opt, i) => {
            let cls = 'border-gray-200 dark:border-gray-700';
            if (answered !== null) {
              if (i === level.correctIndex) cls = 'border-green-500 bg-green-50 dark:bg-green-950';
              else if (i === answered) cls = 'border-red-500 bg-red-50 dark:bg-red-950';
            }
            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={answered !== null}
                className={`w-full text-left p-3 rounded-lg border text-sm flex items-center gap-2 transition-colors ${cls}`}
              >
                {answered !== null && i === level.correctIndex && <Check className="w-4 h-4 text-green-500 flex-shrink-0" />}
                {answered !== null && i === answered && i !== level.correctIndex && <X className="w-4 h-4 text-red-500 flex-shrink-0" />}
                {opt}
              </button>
            );
          })}
        </div>
      </Card>

      {answered !== null && (
        <Button onClick={handleNext} className="w-full">
          {currentLevel + 1 >= story.levels.length ? '完了' : '次のレベルへ'}
        </Button>
      )}
    </div>
  );
}
