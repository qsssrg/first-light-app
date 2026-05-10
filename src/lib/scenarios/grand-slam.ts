import type { Scenario } from './types';

export const grandSlamScenario: Scenario = {
  id: 'grand-slam',
  background: 'stage',
  lines: [
    { type: 'dialog', character: 'narrator', text: '――ステージの照明が一斉に灯った。' },
    { type: 'dialog', character: 'kai', text: '{playerName}…35日連続だ。お前、本当にすごいよ。', expression: 'smile' },
    { type: 'dialog', character: 'yuuki', text: '35日！！ グランドスラムだ！！ {playerName}最高〜！！', expression: 'smile' },
    { type: 'dialog', character: 'haruto', text: '毎日欠かさず…{playerName}さんの努力は、僕たちの励みです。', expression: 'smile' },
    { type: 'dialog', character: 'ren', text: '…35日か。正直、俺でも無理かもしれない。{playerName}、尊敬するわ。', expression: 'smile' },
    { type: 'dialog', character: 'sora', text: '35日間、毎日一緒に学んでくれて…ありがとうございます、{playerName}さん。', expression: 'smile' },
    { type: 'dialog', character: 'narrator', text: 'メンバー全員が拍手で{playerName}を称えた。' },
    { type: 'dialog', character: 'kai', text: 'これからも…俺たちと一緒に走り続けてくれ、{playerName}。', expression: 'smile' },
    { type: 'dialog', character: 'player', text: '（35日…毎日続けてきてよかった…みんなの笑顔が最高のご褒美だ）', isInner: true },
  ],
};
