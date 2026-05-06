export type CharacterId = 'haruto' | 'sora' | 'ren' | 'yuuki' | 'kai' | 'narrator' | 'player' | 'mob';

export interface DialogLine {
  type: 'dialog';
  character: CharacterId;
  text: string;
  expression?: string;
  /** Inner monologue style (shown in parentheses with distinct styling) */
  isInner?: boolean;
  /** Override scenario background for this line */
  background?: string;
  /** Full-screen event CG image (shown over background, under text window) */
  eventImage?: string;
}

export interface ChoiceLine {
  type: 'choice';
  prompt: string;
  options: { text: string; next: string }[];
}

export interface ActionLine {
  type: 'action';
  action: 'navigate' | 'setFlag' | 'wait';
  target?: string;
  flag?: string;
  value?: string;
  duration?: number;
}

export interface InputLine {
  type: 'input';
  prompt: string;
  placeholder?: string;
  /** Key to store the input value (e.g. 'playerName') */
  storeKey: string;
}

export type ScenarioLine = DialogLine | ChoiceLine | ActionLine | InputLine;

export interface Scenario {
  id: string;
  background?: string;
  lines: ScenarioLine[];
}
