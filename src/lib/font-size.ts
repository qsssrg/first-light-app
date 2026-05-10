/** Font size preference */

const STORAGE_KEY = 'firstlight_font_size';

export type FontSize = 'small' | 'normal' | 'large' | 'xlarge';

const SIZE_MAP: Record<FontSize, string> = {
  small: '14px',
  normal: '16px',
  large: '18px',
  xlarge: '20px',
};

export const FONT_SIZE_OPTIONS: { id: FontSize; label: string; labelEN: string }[] = [
  { id: 'small', label: '小', labelEN: 'S' },
  { id: 'normal', label: '標準', labelEN: 'M' },
  { id: 'large', label: '大', labelEN: 'L' },
  { id: 'xlarge', label: '特大', labelEN: 'XL' },
];

export function getFontSize(): FontSize {
  if (typeof window === 'undefined') return 'normal';
  return (localStorage.getItem(STORAGE_KEY) as FontSize) ?? 'normal';
}

export function setFontSize(size: FontSize): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, size);
  applyFontSize(size);
}

export function applyFontSize(size?: FontSize): void {
  if (typeof document === 'undefined') return;
  const s = size ?? getFontSize();
  document.documentElement.style.fontSize = SIZE_MAP[s];
}
