'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { TextWindow } from './TextWindow';
import { CharacterSprite } from './CharacterSprite';
import { ChoiceButtons } from './ChoiceButtons';
import type { Scenario, DialogLine, ChoiceLine } from '@/lib/scenarios/types';
import { getBackground } from './backgrounds';

interface VNEngineProps {
  scenario: Scenario;
  onComplete?: () => void;
  skippable?: boolean;
}

export function VNEngine({ scenario, onComplete, skippable = false }: VNEngineProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const router = useRouter();

  const line = scenario.lines[lineIndex];

  const advance = useCallback(() => {
    const nextIndex = lineIndex + 1;
    if (nextIndex >= scenario.lines.length) {
      onComplete?.();
      return;
    }

    const nextLine = scenario.lines[nextIndex];
    if (nextLine.type === 'action') {
      if (nextLine.action === 'navigate' && nextLine.target) {
        router.push(nextLine.target);
        return;
      }
      // Skip actions and continue
      setLineIndex(nextIndex + 1);
      return;
    }

    setLineIndex(nextIndex);
  }, [lineIndex, scenario.lines, onComplete, router]);

  const handleChoice = useCallback((_next: string) => {
    advance();
  }, [advance]);

  if (!line) return null;

  const currentCharacter = line.type === 'dialog' ? line.character : 'narrator';

  const bg = getBackground(scenario.background ?? 'practice-room');

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: bg.gradient }}>
      {/* Background overlay */}
      {bg.overlay && (
        <div className="absolute inset-0" style={{ background: bg.overlay }} />
      )}

      {/* Character sprite */}
      <CharacterSprite
        character={currentCharacter}
        active={line.type === 'dialog' && line.character !== 'narrator'}
      />

      {/* Text window or choice buttons */}
      {line.type === 'dialog' && (
        <TextWindow
          character={(line as DialogLine).character}
          text={(line as DialogLine).text}
          onComplete={advance}
          isActive={true}
        />
      )}

      {line.type === 'choice' && (
        <ChoiceButtons
          prompt={(line as ChoiceLine).prompt}
          options={(line as ChoiceLine).options}
          onSelect={handleChoice}
        />
      )}

      {/* Skip button + progress */}
      <div className="absolute top-4 right-4 flex items-center gap-3">
        {skippable && (
          <button
            onClick={() => onComplete?.()}
            className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white/60 text-xs transition-colors"
          >
            スキップ ▸
          </button>
        )}
        <span className="text-white/20 text-xs">
          {lineIndex + 1} / {scenario.lines.length}
        </span>
      </div>
    </div>
  );
}
