import type { Scenario } from './types';

const WRITING_INTROS: Scenario[] = [
  {
    id: 'writing-intro-fan',
    background: 'practice-studio',
    lines: [
      { type: 'dialog', character: 'yuuki', text: '{playerName}〜！ 助けて〜！！', expression: 'surprised' },
      { type: 'dialog', character: 'kai', text: 'またか…。', expression: 'serious' },
      { type: 'dialog', character: 'yuuki', text: '海外のファンからSNSでメッセージ来たんだけど、なんて返せばいい！？', expression: 'smile' },
      { type: 'dialog', character: 'ren', text: '…いつもGoogle翻訳に頼ってるだろ。', expression: 'default' },
      { type: 'dialog', character: 'yuuki', text: '今回はちゃんと自分の言葉で返したいの！', expression: 'smile' },
      { type: 'dialog', character: 'ren', text: '…それ、{playerName}にやってもらったら同じなんじゃ…。', expression: 'default' },
      { type: 'dialog', character: 'yuuki', text: 'いいの！ {playerName}なら心のこもった言葉を選んでくれるから！', expression: 'smile' },
      { type: 'dialog', character: 'yuuki', text: '{playerName}、一緒に考えて！', expression: 'smile' },
      { type: 'dialog', character: 'haruto', text: 'ユウキくんらしいですね…。でも気持ちは分かります。', expression: 'default' },
      { type: 'dialog', character: 'sora', text: '大丈夫、{playerName}さんがいるから。練習しましょう。', expression: 'smile' },
    ],
  },
  {
    id: 'writing-intro-homework',
    background: 'stylish-office',
    lines: [
      { type: 'dialog', character: 'yuuki', text: '{playerName}…やばいことになった…', expression: 'default' },
      { type: 'dialog', character: 'kai', text: '何があった。', expression: 'serious' },
      { type: 'dialog', character: 'yuuki', text: 'クライアントの偉い人に「英語できます」って言っちゃって…', expression: 'surprised' },
      { type: 'dialog', character: 'yuuki', text: '…そしたらその人の息子さんの英語の宿題を手伝うことに…', expression: 'default' },
      { type: 'dialog', character: 'ren', text: '…自業自得だろ。', expression: 'default' },
      { type: 'dialog', character: 'haruto', text: '…ユウキくんらしいですね。', expression: 'default' },
      { type: 'dialog', character: 'yuuki', text: '{playerName}、助けて〜！ 一緒にライティング練習しよ！', expression: 'smile' },
      { type: 'dialog', character: 'sora', text: '{playerName}さんと練習すれば大丈夫ですよ。', expression: 'smile' },
    ],
  },
  {
    id: 'writing-intro-tourist',
    background: 'night-street',
    lines: [
      { type: 'dialog', character: 'yuuki', text: '{playerName}！ 聞いて聞いて！', expression: 'smile' },
      { type: 'dialog', character: 'yuuki', text: 'さっき外歩いてたら外国人観光客に捕まっちゃって…！', expression: 'surprised' },
      { type: 'dialog', character: 'yuuki', text: '道聞かれたんだけど、全然答えられなくて…悔しい！', expression: 'default' },
      { type: 'dialog', character: 'kai', text: '…また突然声かけられたのか。', expression: 'default' },
      { type: 'dialog', character: 'ren', text: 'お前、目立つからな。', expression: 'smile' },
      { type: 'dialog', character: 'yuuki', text: '次はちゃんと答えたい！ {playerName}、英文の書き方教えて！', expression: 'smile' },
      { type: 'dialog', character: 'haruto', text: '書けるようになれば、話すのも楽になりますよ。', expression: 'smile' },
    ],
  },
  {
    id: 'writing-intro-email',
    background: 'stylish-office',
    lines: [
      { type: 'dialog', character: 'yuuki', text: '{playerName}〜、ちょっといい？', expression: 'default' },
      { type: 'dialog', character: 'yuuki', text: '海外のプロモーターに英語でメール書かないといけないんだけど…', expression: 'default' },
      { type: 'dialog', character: 'kai', text: '大事なメールだから、ちゃんと書けよ。', expression: 'serious' },
      { type: 'dialog', character: 'yuuki', text: 'わかってる〜！ だから{playerName}に見てもらいたくて！', expression: 'smile' },
      { type: 'dialog', character: 'sora', text: 'ビジネスメール…僕も勉強したいです。', expression: 'default' },
      { type: 'dialog', character: 'ren', text: '…俺も英語のメール苦手だしな。一緒に聞いとくわ。', expression: 'default' },
    ],
  },
  {
    id: 'writing-intro-lyrics',
    background: 'practice-studio',
    lines: [
      { type: 'dialog', character: 'yuuki', text: 'ハルト〜！ 英語で歌詞書きたいんだけど手伝って！', expression: 'smile' },
      { type: 'dialog', character: 'haruto', text: 'いいですよ。…でもユウキくん、まず文法が…', expression: 'default' },
      { type: 'dialog', character: 'yuuki', text: 'う…それは{playerName}に教えてもらう！', expression: 'surprised' },
      { type: 'dialog', character: 'kai', text: '歌詞を書くにもまずは基本の英文が書けないとな。', expression: 'serious' },
      { type: 'dialog', character: 'ren', text: '…まぁ、ユウキの歌詞は面白そうだけどな。', expression: 'smile' },
      { type: 'dialog', character: 'yuuki', text: 'よし！ {playerName}、ライティング練習しよ！ 歌詞のために！', expression: 'smile' },
    ],
  },
];

export function getRandomWritingIntro(): Scenario {
  return WRITING_INTROS[Math.floor(Math.random() * WRITING_INTROS.length)];
}
