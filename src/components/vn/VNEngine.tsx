'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { TextWindow } from './TextWindow';
import { CharacterSprite } from './CharacterSprite';
import { ChoiceButtons } from './ChoiceButtons';
import { NameInput } from './NameInput';
import type { Scenario, DialogLine, ChoiceLine, InputLine } from '@/lib/scenarios/types';
import { getBackground } from './backgrounds';
import { setPlayerName, resolvePlayerName } from '@/lib/player-name';

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

  const handleInput = useCallback((value: string, storeKey: string) => {
    if (storeKey === 'playerName') {
      setPlayerName(value);
    }
    advance();
  }, [advance]);

  if (!line) return null;

  const currentCharacter = line.type === 'dialog' ? line.character : 'narrator';
  const currentExpression = line.type === 'dialog' ? line.expression : undefined;

  // Line-level background override
  const bgId = (line.type === 'dialog' && line.background) || scenario.background || 'practice-room';
  const bg = getBackground(bgId);

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: bg.gradient }}>
      {/* Background image — responsive: mobile (9:16) vs desktop (16:9) */}
      {bg.imagePath && (
        <>
          {/* Mobile image */}
          <div
            className="absolute inset-0 bg-cover bg-center md:hidden"
            style={{ backgroundImage: `url(${bg.mobileImagePath || bg.imagePath})` }}
          />
          {/* Desktop image */}
          <div
            className="absolute inset-0 bg-cover bg-center hidden md:block"
            style={{ backgroundImage: `url(${bg.desktopImagePath || bg.imagePath})` }}
          />
        </>
      )}

      {/* Background overlay */}
      {bg.overlay && (
        <div className="absolute inset-0" style={{ background: bg.overlay }} />
      )}

      {/* Event CG (full-screen image over background, responsive) */}
      {line.type === 'dialog' && (line as DialogLine).eventImage && (() => {
        const img = (line as DialogLine).eventImage!;
        const mobileImg = img.replace('group-shot.jpg', 'group-shot-mobile.jpg');
        const desktopImg = img.replace('group-shot.jpg', 'group-shot-desktop.jpg');
        const hasVariants = mobileImg !== img;
        return hasVariants ? (
          <>
            <div className="absolute inset-0 bg-contain bg-center bg-no-repeat transition-opacity duration-700 md:hidden"
              style={{ backgroundImage: `url(${mobileImg})` }} />
            <div className="absolute inset-0 bg-contain bg-center bg-no-repeat transition-opacity duration-700 hidden md:block"
              style={{ backgroundImage: `url(${desktopImg})` }} />
          </>
        ) : (
          <div className="absolute inset-0 bg-contain bg-center bg-no-repeat transition-opacity duration-700"
            style={{ backgroundImage: `url(${img})` }} />
        );
      })()}

      {/* Character sprite (hidden when event CG is showing) */}
      {!(line.type === 'dialog' && (line as DialogLine).eventImage) && (
        <CharacterSprite
          character={currentCharacter}
          expression={currentExpression}
          active={line.type === 'dialog' && line.character !== 'narrator' && line.character !== 'player' && line.character !== 'mob' && line.character !== 'boss'}
        />
      )}

      {/* Text window or choice buttons or input */}
      {line.type === 'dialog' && (
        <TextWindow
          character={(line as DialogLine).character}
          text={resolvePlayerName((line as DialogLine).text)}
          onComplete={advance}
          isActive={true}
          isInner={(line as DialogLine).isInner}
        />
      )}

      {line.type === 'choice' && (
        <ChoiceButtons
          prompt={(line as ChoiceLine).prompt}
          options={(line as ChoiceLine).options}
          onSelect={handleChoice}
        />
      )}

      {line.type === 'input' && (
        <NameInput
          prompt={(line as InputLine).prompt}
          placeholder={(line as InputLine).placeholder}
          onSubmit={(value) => handleInput(value, (line as InputLine).storeKey)}
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
