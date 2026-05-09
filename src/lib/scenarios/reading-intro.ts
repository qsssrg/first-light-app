import type { Scenario } from './types';

const READING_INTROS: Scenario[] = [
  {
    id: 'reading-intro-article',
    background: 'library',
    lines: [
      { type: 'dialog', character: 'sora', text: '{playerName}さん…面白い記事を見つけたんです。', expression: 'default' },
      { type: 'dialog', character: 'sora', text: '英語の記事なんですけど…一緒に読んでみませんか？', expression: 'smile' },
      { type: 'dialog', character: 'yuuki', text: 'ソラくんまた英語の記事？ 難しそ〜', expression: 'surprised' },
      { type: 'dialog', character: 'sora', text: '大丈夫です、{playerName}さんと一緒なら。', expression: 'smile' },
      { type: 'dialog', character: 'haruto', text: '読解力は語彙力と繋がっていますからね。僕も参加していいですか？', expression: 'default' },
      { type: 'dialog', character: 'sora', text: '{playerName}さん、リーディング練習を始めましょう。', expression: 'smile' },
    ],
  },
  {
    id: 'reading-intro-book',
    background: 'library',
    lines: [
      { type: 'dialog', character: 'sora', text: 'あ、{playerName}さん。この本のレビュー、英語で読んでみませんか。', expression: 'default' },
      { type: 'dialog', character: 'ren', text: '…ソラ、またおすすめの本？', expression: 'default' },
      { type: 'dialog', character: 'sora', text: 'はい。海外で話題になってるんです。翻訳だとニュアンスが消えちゃうので…。', expression: 'default' },
      { type: 'dialog', character: 'kai', text: '原文で読めるのは強みだな。{playerName}、一緒にやるか。', expression: 'smile' },
      { type: 'dialog', character: 'sora', text: '嬉しいです。少しずつ、一緒に読みましょう。', expression: 'smile' },
    ],
  },
  {
    id: 'reading-intro-news',
    background: 'cafe',
    lines: [
      { type: 'dialog', character: 'kai', text: '海外メディアの記事、読めるようになりたいんだよな。', expression: 'serious' },
      { type: 'dialog', character: 'sora', text: '…僕も同じです。速読ができればもっと効率的に。', expression: 'default' },
      { type: 'dialog', character: 'yuuki', text: '俺、英語のニュースとか全然読めないんだけど…', expression: 'surprised' },
      { type: 'dialog', character: 'sora', text: '大丈夫です。最初は短い記事から始めましょう。{playerName}さんも一緒に。', expression: 'smile' },
      { type: 'dialog', character: 'haruto', text: '読むことで、使える表現も増えますよ。', expression: 'smile' },
    ],
  },
  {
    id: 'reading-intro-subtitle',
    background: 'practice-room',
    lines: [
      { type: 'dialog', character: 'sora', text: '昨日、字幕なしで映画を観たんです…。', expression: 'default' },
      { type: 'dialog', character: 'yuuki', text: 'え！ ソラくんすごい！ 全部わかった！？', expression: 'surprised' },
      { type: 'dialog', character: 'sora', text: '…半分くらいです。でも、物語は伝わりました。', expression: 'smile' },
      { type: 'dialog', character: 'ren', text: '…俺も洋画は字幕なしで観てる。読む力があると、聴く力も上がる。', expression: 'default' },
      { type: 'dialog', character: 'sora', text: '{playerName}さん、一緒に読解力を鍛えましょう。きっと世界が広がります。', expression: 'smile' },
    ],
  },
  {
    id: 'reading-intro-lyrics',
    background: 'practice-room',
    lines: [
      { type: 'dialog', character: 'haruto', text: '英語の歌詞って、読むと新しい発見がありますよね。', expression: 'default' },
      { type: 'dialog', character: 'sora', text: '分かります。聴くだけじゃ気づかないメタファーとか…。', expression: 'smile' },
      { type: 'dialog', character: 'ren', text: '歌詞カードを読むのも立派なリーディングだろ。', expression: 'default' },
      { type: 'dialog', character: 'sora', text: '…ですね。{playerName}さん、英語を読む練習しませんか。', expression: 'default' },
      { type: 'dialog', character: 'kai', text: '読む力は全ての基礎だ。{playerName}、やってみよう。', expression: 'smile' },
    ],
  },
];

export function getRandomReadingIntro(): Scenario {
  return READING_INTROS[Math.floor(Math.random() * READING_INTROS.length)];
}
