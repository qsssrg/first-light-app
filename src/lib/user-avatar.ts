const STORAGE_KEY = 'firstlight_avatar';

export type AvatarStyle = 'default' | 'short' | 'bob' | 'twin' | 'ponytail' | 'long' | 'bun';

export function getAvatarStyle(): AvatarStyle {
  if (typeof window === 'undefined') return 'default';
  return (localStorage.getItem(STORAGE_KEY) as AvatarStyle) ?? 'default';
}

export function setAvatarStyle(style: AvatarStyle): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, style);
}

export const AVATAR_OPTIONS: { id: AvatarStyle; label: string }[] = [
  { id: 'default', label: 'デフォルト' },
  { id: 'short', label: 'ショート' },
  { id: 'bob', label: 'ボブ' },
  { id: 'twin', label: 'ツインテール' },
  { id: 'ponytail', label: 'ポニーテール' },
  { id: 'long', label: 'ロング' },
  { id: 'bun', label: 'お団子' },
];
