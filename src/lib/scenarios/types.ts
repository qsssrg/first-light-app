export type CharacterId = 'haruto' | 'sora' | 'ren' | 'yuuki' | 'kai' | 'narrator';

export interface DialogLine {
  type: 'dialog';
  character: CharacterId;
  text: string;
  expression?: string;
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

export type ScenarioLine = DialogLine | ChoiceLine | ActionLine;

export interface Scenario {
  id: string;
  background?: string;
  lines: ScenarioLine[];
}
