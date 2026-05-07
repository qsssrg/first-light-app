'use client';

import { useState, useEffect } from 'react';
import { Home, Users, BookOpen, PenTool, BarChart3, Settings, Brain } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { isPsychologyUnlocked } from '@/lib/psychology-settings';

const BASE_NAV = [
  { href: '/', icon: Home, label: 'ホーム' },
  { href: '/chapters', icon: Users, label: 'チャプター' },
  { href: '/vocabulary', icon: BookOpen, label: '単語帳' },
  { href: '/writing-practice', icon: PenTool, label: '添削' },
  { href: '/dashboard', icon: BarChart3, label: '分析' },
];

const PSYCHOLOGY_NAV = { href: '/psychology', icon: Brain, label: '心理学' };
const SETTINGS_NAV = { href: '/settings', icon: Settings, label: '設定' };

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [psychUnlocked, setPsychUnlocked] = useState(false);

  useEffect(() => {
    setPsychUnlocked(isPsychologyUnlocked());
  }, []);

  const navItems = psychUnlocked
    ? [...BASE_NAV, PSYCHOLOGY_NAV, SETTINGS_NAV]
    : [...BASE_NAV, SETTINGS_NAV];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-800/50 z-50 safe-area-bottom">
      <div className="flex justify-around items-center h-16 max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <button
              key={href}
              onClick={() => router.push(href)}
              className={`flex flex-col items-center gap-0.5 px-2 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
