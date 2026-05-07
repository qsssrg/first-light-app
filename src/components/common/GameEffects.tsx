'use client';

import { useState, useEffect } from 'react';

/** Combo flash - appears center screen, zooms in and fades out */
export function ComboFlash({ combo }: { combo: number }) {
  const [visible, setVisible] = useState(false);
  const [displayCombo, setDisplayCombo] = useState(0);

  useEffect(() => {
    if (combo > 0 && combo !== displayCombo) {
      setDisplayCombo(combo);
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [combo, displayCombo]);

  if (!visible || combo < 2) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="animate-combo-flash text-center">
        <p className="text-6xl md:text-8xl font-black text-orange-400 drop-shadow-[0_0_20px_rgba(251,146,60,0.5)]">
          {combo}
        </p>
        <p className="text-xl md:text-2xl font-bold text-orange-300 tracking-widest">
          COMBO!
        </p>
      </div>
    </div>
  );
}

/** XP float - floats upward and fades */
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
        <div key={f.id} className="animate-xp-float text-2xl md:text-3xl font-bold text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.4)]">
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
      <div className="animate-tokoton-activate text-center">
        <p className="text-4xl md:text-6xl font-black text-red-500 drop-shadow-[0_0_30px_rgba(239,68,68,0.6)]">
          🔥 TOKOTON MODE 🔥
        </p>
        <p className="text-lg text-red-300 mt-2 font-bold tracking-wider">
          10連続正解！ 限界まで挑め！
        </p>
      </div>
    </div>
  );
}
