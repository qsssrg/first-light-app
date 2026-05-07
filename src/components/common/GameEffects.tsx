'use client';

import { useState, useEffect } from 'react';

/** Combo flash - appears center screen with fire effect */
export function ComboFlash({ combo }: { combo: number }) {
  const [visible, setVisible] = useState(false);
  const [displayCombo, setDisplayCombo] = useState(0);

  useEffect(() => {
    if (combo > 0 && combo !== displayCombo) {
      setDisplayCombo(combo);
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [combo, displayCombo]);

  if (!visible || combo < 2) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {/* Fire background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.15)_0%,transparent_50%)] animate-combo-flash" />
      <div className="animate-combo-flash text-center">
        <p className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 via-orange-400 to-red-500 drop-shadow-[0_0_30px_rgba(251,146,60,0.7)]">
          {combo}
        </p>
        <p className="text-2xl md:text-3xl font-black text-orange-300 tracking-[0.3em] drop-shadow-[0_0_15px_rgba(251,146,60,0.5)]">
          🔥 COMBO 🔥
        </p>
      </div>
    </div>
  );
}

/** XP float - floats upward with strong visibility */
export function XpFloat({ xp, trigger }: { xp: number; trigger: number }) {
  const [floats, setFloats] = useState<{ id: number; xp: number }[]>([]);

  useEffect(() => {
    if (xp > 0 && trigger > 0) {
      const id = Date.now();
      setFloats(prev => [...prev, { id, xp }]);
      setTimeout(() => {
        setFloats(prev => prev.filter(f => f.id !== id));
      }, 1500);
    }
  }, [trigger, xp]);

  return (
    <div className="fixed top-1/3 right-8 pointer-events-none z-50">
      {floats.map(f => (
        <div key={f.id} className="animate-xp-float text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-500 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]">
          +{f.xp} XP
        </div>
      ))}
    </div>
  );
}

/** Tokoton mode activation - dramatic fire entrance */
export function TokotonActivation({ active }: { active: boolean }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (active) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.2)_0%,transparent_60%)] animate-tokoton-activate" />
      <div className="animate-tokoton-activate text-center">
        <p className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 via-red-500 to-red-700 drop-shadow-[0_0_40px_rgba(239,68,68,0.8)]">
          🔥 TOKOTON 🔥
        </p>
        <p className="text-xl text-red-300 mt-2 font-black tracking-[0.2em]">
          限界まで挑め！
        </p>
      </div>
    </div>
  );
}
