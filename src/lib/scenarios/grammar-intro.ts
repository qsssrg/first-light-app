import type { Scenario } from './types';

const GRAMMAR_INTROS: Scenario[] = [
  {
    id: 'grammar-intro-mc',
    background: 'stage',
    lines: [
      { type: 'dialog', character: 'kai', text: '{playerName}、ちょっといいか。', expression: 'serious' },
      { type: 'dialog', character: 'kai', text: '海外フェスのMCで文法ミスしたら恥ずかしいだろ。', expression: 'serious' },
      { type: 'dialog', character: 'yuuki', text: 'え〜、MCって台本ないの？', expression: 'surprised' },
      { type: 'dialog', character: 'kai', text: 'アドリブも多い。だから文法が身体に染みついてないとダメだ。', expression: 'serious' },
      { type: 'dialog', character: 'ren', text: '…カイの言う通りだな。即興で正しい英語を話すには基礎がいる。', expression: 'default' },
      { type: 'dialog', character: 'kai', text: '{playerName}、文法の練習に付き合ってくれ。', expression: 'smile' },
    ],
  },
  {
    id: 'grammar-intro-quiz',
    background: 'practice-room',
    lines: [
      { type: 'dialog', character: 'kai', text: '{playerName}、この文のどこが間違いかわかるか？', expression: 'serious' },
      { type: 'dialog', character: 'kai', text: '"I have went to the store yesterday."', expression: 'serious' },
      { type: 'dialog', character: 'haruto', text: 'あ…"went"と"have"が同時に使えない…？', expression: 'default' },
      { type: 'dialog', character: 'kai', text: '正解。時制の使い分けだ。こういう感覚を鍛えたい。', expression: 'smile' },
      { type: 'dialog', character: 'sora', text: '文法って、パズルみたいで面白いですよね。', expression: 'smile' },
      { type: 'dialog', character: 'kai', text: '{playerName}、一緒に文法を固めよう。', expression: 'smile' },
    ],
  },
  {
    id: 'grammar-intro-email',
    background: 'stylish-office',
    lines: [
      { type: 'dialog', character: 'kai', text: '海外のプロモーターにメール送らなきゃいけないんだが…。', expression: 'serious' },
      { type: 'dialog', character: 'yuuki', text: 'カイくん、英語のメールは得意でしょ？', expression: 'smile' },
      { type: 'dialog', character: 'kai', text: '日常会話はいいんだが、ビジネスメールは文法が正確じゃないと信用に関わる。', expression: 'serious' },
      { type: 'dialog', character: 'haruto', text: '確かに…書き言葉は特に文法が大事ですよね。', expression: 'default' },
      { type: 'dialog', character: 'kai', text: '{playerName}、文法のトレーニングをしよう。基礎がしっかりしてれば怖くない。', expression: 'smile' },
    ],
  },
  {
    id: 'grammar-intro-structure',
    background: 'practice-room',
    lines: [
      { type: 'dialog', character: 'kai', text: '英語の文法って、建物の設計図みたいなもんだと思ってる。', expression: 'default' },
      { type: 'dialog', character: 'sora', text: '設計図…ですか？', expression: 'default' },
      { type: 'dialog', character: 'kai', text: '構造がしっかりしてれば、どんな複雑な文も組み立てられる。', expression: 'smile' },
      { type: 'dialog', character: 'ren', text: '…まぁ、ギターのコード理論と似てるかもな。', expression: 'default' },
      { type: 'dialog', character: 'kai', text: '{playerName}、俺と一緒に英語の設計図を学ぼう。仕組みが分かると楽しくなる。', expression: 'smile' },
    ],
  },
  {
    id: 'grammar-intro-mistake',
    background: 'practice-room',
    lines: [
      { type: 'dialog', character: 'yuuki', text: '{playerName}〜、俺さっきSNSで"I am agree"って書いちゃった…', expression: 'surprised' },
      { type: 'dialog', character: 'kai', text: '…"I agree"だ。be動詞はいらない。', expression: 'serious' },
      { type: 'dialog', character: 'yuuki', text: 'えー！ そうなの！？ 恥ずかしい…', expression: 'surprised' },
      { type: 'dialog', character: 'haruto', text: '大丈夫ですよ、ユウキくん。間違いから学ぶのが一番早い。', expression: 'smile' },
      { type: 'dialog', character: 'kai', text: '{playerName}、文法練習で基礎を固めよう。間違いを減らせる。', expression: 'smile' },
      { type: 'dialog', character: 'yuuki', text: '俺もやる！ もう恥ずかしい思いしたくない！', expression: 'smile' },
    ],
  },
];

export function getRandomGrammarIntro(): Scenario {
  return GRAMMAR_INTROS[Math.floor(Math.random() * GRAMMAR_INTROS.length)];
}
