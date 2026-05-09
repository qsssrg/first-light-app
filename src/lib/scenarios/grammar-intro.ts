import type { Scenario } from './types';

const GRAMMAR_INTROS: Scenario[] = [
  {
    id: 'grammar-intro-1',
    background: 'stylish-office',
    lines: [
      { type: 'dialog', character: 'narrator', text: '――事務所のミーティングルーム。カイがホワイトボードの前に立っていた。' },
      { type: 'dialog', character: 'kai', text: '{playerName}、来てくれたか。ちょうど良かった。', expression: 'default' },
      { type: 'dialog', character: 'kai', text: '海外のMCで使う英語の構文を整理してたんだけど…自信がなくてさ。', expression: 'default' },
      { type: 'dialog', character: 'player', text: '（カイさんでも自信ないことあるんだ…）', isInner: true },
      { type: 'dialog', character: 'kai', text: '文法の仕組みを一緒に確認してくれないか。俺は構造から理解したいタイプなんだ。', expression: 'smile' },
    ],
  },
  {
    id: 'grammar-intro-2',
    background: 'stylish-office',
    lines: [
      { type: 'dialog', character: 'narrator', text: '――カイが英語の文法書を開いて、付箋を貼っている。' },
      { type: 'dialog', character: 'kai', text: '{playerName}。この文法ルール、実際のMCでどう使えばいいか分からなくてな。', expression: 'default' },
      { type: 'dialog', character: 'kai', text: '理論は理解してるつもりなんだけど、実践になると怪しい。', expression: 'serious' },
      { type: 'dialog', character: 'player', text: '（リーダーとして頑張ってるんだな…）', isInner: true },
      { type: 'dialog', character: 'kai', text: '一緒に文法問題を解いてみよう。{playerName}の力を借りたい。', expression: 'smile' },
    ],
  },
  {
    id: 'grammar-intro-3',
    background: 'stylish-office',
    lines: [
      { type: 'dialog', character: 'narrator', text: '――事務所のソファ。カイがタブレットで英語の記事を読んでいた。' },
      { type: 'dialog', character: 'kai', text: 'あ、{playerName}。ちょっと聞いていいか。', expression: 'default' },
      { type: 'dialog', character: 'kai', text: 'この文、関係代名詞と分詞構文、どっちで解釈するのが正しいんだ？', expression: 'serious' },
      { type: 'dialog', character: 'player', text: '（高度な質問…！ カイさんって本当に勉強家だ…）', isInner: true },
      { type: 'dialog', character: 'kai', text: 'よし、今日は文法の特訓だ。全体を見渡せば、答えは見えてくるからな。', expression: 'smile' },
    ],
  },
];

export function getRandomGrammarIntro(): Scenario {
  return GRAMMAR_INTROS[Math.floor(Math.random() * GRAMMAR_INTROS.length)];
}
