'use client';

import { useState } from 'react';
import levelupScenes from '@/data/scenarios/levelup-scenes.json';
import { VN_BACKGROUNDS } from '@/components/vn/backgrounds';

interface Scene {
  character: string;
  expression: string;
  text: string;
  background: string;
}

interface LevelupEntry {
  id: string;
  scenes: Scene[];
}

const CHARACTER_COLORS: Record<string, string> = {
  kai: '#6366f1',
  haruto: '#f59e0b',
  sora: '#10b981',
  yuuki: '#ef4444',
  ren: '#8b5cf6',
};

const CHARACTER_NAMES: Record<string, string> = {
  kai: 'カイ',
  haruto: 'ハルト',
  sora: 'ソラ',
  yuuki: 'ユウキ',
  ren: 'レン',
};

function BackgroundPreview({ backgroundId }: { backgroundId: string }) {
  const bg = VN_BACKGROUNDS[backgroundId] ?? VN_BACKGROUNDS['practice-room'];
  const imageUrl = bg.desktopImagePath ?? bg.imagePath;
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: imageUrl ? `url(${imageUrl}) center/cover no-repeat` : bg.gradient,
        position: 'relative',
        borderRadius: '8px',
      }}
    >
      {!imageUrl && bg.overlay && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: bg.overlay,
            borderRadius: '8px',
          }}
        />
      )}
    </div>
  );
}

function FullScreenPreview({
  entry,
  onClose,
}: {
  entry: LevelupEntry;
  onClose: () => void;
}) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const scene = entry.scenes[sceneIndex];
  const bg = VN_BACKGROUNDS[scene.background] ?? VN_BACKGROUNDS['practice-room'];

  const handleNext = () => {
    if (sceneIndex < entry.scenes.length - 1) {
      setSceneIndex(sceneIndex + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (sceneIndex > 0) {
      setSceneIndex(sceneIndex - 1);
    }
  };

  const imageUrl = bg.desktopImagePath ?? bg.imagePath;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: imageUrl ? `url(${imageUrl}) center/cover no-repeat` : bg.gradient,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
      onClick={handleNext}
    >
      {!imageUrl && bg.overlay && (
        <div style={{ position: 'absolute', inset: 0, background: bg.overlay }} />
      )}

      {/* Close button */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          background: 'rgba(0,0,0,0.5)',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          fontSize: '20px',
          cursor: 'pointer',
          zIndex: 10,
        }}
      >
        ✕
      </button>

      {/* Scene counter */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          background: 'rgba(0,0,0,0.5)',
          color: '#fff',
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '14px',
          zIndex: 10,
        }}
      >
        {sceneIndex + 1} / {entry.scenes.length}
      </div>

      {/* Navigation hint */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.4)',
          color: 'rgba(255,255,255,0.7)',
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '12px',
          zIndex: 10,
        }}
      >
        タップで次へ
      </div>

      {/* Prev button */}
      {sceneIndex > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(0,0,0,0.4)',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            fontSize: '18px',
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
          ←
        </button>
      )}

      {/* Text box */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          width: '100%',
          maxWidth: '600px',
          padding: '20px',
          marginBottom: '40px',
        }}
      >
        <div
          style={{
            background: 'rgba(0,0,0,0.75)',
            borderRadius: '12px',
            padding: '20px',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div
            style={{
              color: CHARACTER_COLORS[scene.character] ?? '#fff',
              fontWeight: 'bold',
              fontSize: '14px',
              marginBottom: '8px',
            }}
          >
            {CHARACTER_NAMES[scene.character] ?? scene.character}
          </div>
          <div style={{ color: '#fff', fontSize: '16px', lineHeight: '1.6' }}>
            {scene.text}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LevelupPreviewPage() {
  const [selectedEntry, setSelectedEntry] = useState<LevelupEntry | null>(null);
  const entries = levelupScenes as LevelupEntry[];

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f1a', padding: '20px' }}>
      <h1
        style={{
          color: '#fff',
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '8px',
          textAlign: 'center',
        }}
      >
        レベルアップストーリー一覧
      </h1>
      <p
        style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: '14px',
          textAlign: 'center',
          marginBottom: '24px',
        }}
      >
        全{entries.length}レベル — カードをタップでプレビュー再生
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {entries.map((entry, idx) => {
          const titleScene = entry.scenes[0];
          const storyScene = entry.scenes[1];
          const character = storyScene?.character ?? titleScene.character;
          const bgId = titleScene.background;

          return (
            <div
              key={entry.id}
              onClick={() => setSelectedEntry(entry)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'transform 0.15s, border-color 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = CHARACTER_COLORS[character] ?? '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              }}
            >
              {/* Background preview */}
              <div style={{ height: '80px', position: 'relative' }}>
                <BackgroundPreview backgroundId={bgId} />
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    background: 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    padding: '2px 8px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  Lv.{idx + 1}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: CHARACTER_COLORS[character] ?? '#666',
                    color: '#fff',
                    padding: '2px 8px',
                    borderRadius: '8px',
                    fontSize: '11px',
                  }}
                >
                  {CHARACTER_NAMES[character] ?? character}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '12px' }}>
                <div
                  style={{
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    marginBottom: '6px',
                  }}
                >
                  {titleScene.text}
                </div>
                <div
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '13px',
                    lineHeight: '1.5',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {storyScene?.text ?? ''}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full screen preview modal */}
      {selectedEntry && (
        <FullScreenPreview
          entry={selectedEntry}
          onClose={() => setSelectedEntry(null)}
        />
      )}
    </div>
  );
}
