import type { Scenario } from './types';

const LISTENING_INTROS: Scenario[] = [
  {
    id: 'listening-intro-1',
    background: 'practice-studio',
    lines: [
      { type: 'dialog', character: 'narrator', text: '――練習スタジオ。レンがヘッドフォンを外してこちらを見た。' },
      { type: 'dialog', character: 'ren', text: '…{playerName}か。ちょうどいい。', expression: 'default' },
      { type: 'dialog', character: 'ren', text: '今、洋楽の歌詞を聴き取ろうとしてたんだけど…一箇所どうしても分からなくてさ。', expression: 'default' },
      { type: 'dialog', character: 'player', text: '（レンさんでも聴き取れないことあるんだ…）', isInner: true },
      { type: 'dialog', character: 'ren', text: '…一緒にリスニング練習しないか。俺も鍛え直したいんだ。', expression: 'smile' },
    ],
  },
  {
    id: 'listening-intro-2',
    background: 'practice-studio',
    lines: [
      { type: 'dialog', character: 'narrator', text: '――スタジオの機材の前で、レンがギターを弾きながら何かを聴いている。' },
      { type: 'dialog', character: 'ren', text: 'お、{playerName}。いいとこに来た。', expression: 'default' },
      { type: 'dialog', character: 'ren', text: 'この曲のサビの歌詞、聴き取れるか？ 俺には聞こえるんだけど、確認したくて。', expression: 'default' },
      { type: 'dialog', character: 'player', text: '（レンさんに頼られてる…嬉しい…！）', isInner: true },
      { type: 'dialog', character: 'ren', text: 'よし、じゃあリスニング練習にするか。付き合ってくれ。', expression: 'smile' },
    ],
  },
  {
    id: 'listening-intro-3',
    background: 'practice-studio',
    lines: [
      { type: 'dialog', character: 'narrator', text: '――レンがイヤホンを片方外して、{playerName}に差し出した。' },
      { type: 'dialog', character: 'ren', text: '…これ聴いてみ。最近見つけた曲。', expression: 'default' },
      { type: 'dialog', character: 'ren', text: '英語の歌詞がめちゃくちゃいいんだよ。分かると鳥肌立つぞ。', expression: 'default' },
      { type: 'dialog', character: 'player', text: '（レンさんと一緒に音楽聴くなんて…緊張する…）', isInner: true },
      { type: 'dialog', character: 'ren', text: 'まぁ、まずはリスニング力を上げようぜ。俺が付き合うから。', expression: 'smile' },
    ],
  },
];

export function getRandomListeningIntro(): Scenario {
  return LISTENING_INTROS[Math.floor(Math.random() * LISTENING_INTROS.length)];
}
