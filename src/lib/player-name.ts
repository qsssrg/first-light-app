const STORAGE_KEY = 'firstlight_player_name';

export function getPlayerName(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(STORAGE_KEY) || '';
}

export function setPlayerName(name: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, name);
}

/** Replace {playerName} placeholders in text */
export function resolvePlayerName(text: string): string {
  const name = getPlayerName() || 'あなた';
  return text.replace(/\{playerName\}/g, name);
}
