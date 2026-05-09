import type { Scenario } from './types';

const LISTENING_INTROS: Scenario[] = [
  {
    id: 'listening-intro-lyrics',
    background: 'practice-room',
    lines: [
      { type: 'dialog', character: 'ren', text: '…{playerName}、ちょっと来い。聴いてほしい曲がある。', expression: 'default' },
      { type: 'dialog', character: 'ren', text: 'この曲のサビ、歌詞聞き取れるか？', expression: 'serious' },
      { type: 'dialog', character: 'yuuki', text: 'あ、レンくんまた洋楽タイム？ 俺も混ぜて〜！', expression: 'smile' },
      { type: 'dialog', character: 'ren', text: '…いいけど、ちゃんと聴けよ。雰囲気だけじゃなくて。', expression: 'default' },
      { type: 'dialog', character: 'haruto', text: '歌詞を聴き取れるようになると、曲の世界が変わりますよね。', expression: 'smile' },
      { type: 'dialog', character: 'ren', text: '{playerName}、リスニング練習しようぜ。俺が付き合う。', expression: 'smile' },
    ],
  },
  {
    id: 'listening-intro-interview',
    background: 'practice-room',
    lines: [
      { type: 'dialog', character: 'ren', text: '…{playerName}。海外アーティストのインタビュー動画、見つけたんだけど。', expression: 'default' },
      { type: 'dialog', character: 'sora', text: 'あ、それ僕も気になってました。字幕なしで聴けたらいいですよね…。', expression: 'default' },
      { type: 'dialog', character: 'ren', text: '字幕に頼ってると、いつまでも耳が育たないんだよな。', expression: 'serious' },
      { type: 'dialog', character: 'kai', text: '確かに。ライブのMCも聴き取れないと困る。', expression: 'serious' },
      { type: 'dialog', character: 'ren', text: '{playerName}、一緒にリスニングやらないか。耳を鍛えよう。', expression: 'smile' },
    ],
  },
  {
    id: 'listening-intro-challenge',
    background: 'practice-room',
    lines: [
      { type: 'dialog', character: 'yuuki', text: '{playerName}〜！ レンくんが「俺のリスニング力に勝てるやついない」って言ってる！', expression: 'surprised' },
      { type: 'dialog', character: 'ren', text: '…そんなこと言ってねぇよ。', expression: 'default' },
      { type: 'dialog', character: 'yuuki', text: 'じゃあ{playerName}と勝負しよ！ リスニングクイズ！', expression: 'smile' },
      { type: 'dialog', character: 'ren', text: '…別に勝負じゃなくても、一緒に練習すればいいだろ。', expression: 'default' },
      { type: 'dialog', character: 'haruto', text: 'いい機会ですね。{playerName}さん、やってみましょう。', expression: 'smile' },
      { type: 'dialog', character: 'ren', text: '…まぁ、付き合ってやるよ。', expression: 'smile' },
    ],
  },
  {
    id: 'listening-intro-podcast',
    background: 'practice-room',
    lines: [
      { type: 'dialog', character: 'sora', text: '{playerName}さん、最近英語のポッドキャスト聴いてますか？', expression: 'default' },
      { type: 'dialog', character: 'ren', text: '俺は毎日聴いてる。通勤中にな。', expression: 'default' },
      { type: 'dialog', character: 'sora', text: 'すごいですね…僕はまだ半分くらいしか聴き取れなくて。', expression: 'default' },
      { type: 'dialog', character: 'ren', text: '最初はみんなそうだ。回数こなせば慣れる。', expression: 'serious' },
      { type: 'dialog', character: 'ren', text: '{playerName}、リスニング練習でスタートしよう。俺も最初はここからだった。', expression: 'smile' },
    ],
  },
  {
    id: 'listening-intro-live',
    background: 'stage',
    lines: [
      { type: 'dialog', character: 'kai', text: '来月の海外フェス、MCは英語だ。聴き取れるようにしておかないとな。', expression: 'serious' },
      { type: 'dialog', character: 'ren', text: '…MCだけじゃない。現地スタッフとのやり取りもある。', expression: 'default' },
      { type: 'dialog', character: 'yuuki', text: 'え〜、俺全然聴き取れないかも…', expression: 'surprised' },
      { type: 'dialog', character: 'ren', text: 'だから今から練習するんだよ。{playerName}、付き合ってくれ。', expression: 'serious' },
      { type: 'dialog', character: 'haruto', text: '聴く力は…繰り返しで必ず伸びますから。一緒に頑張りましょう。', expression: 'smile' },
    ],
  },
];

export function getRandomListeningIntro(): Scenario {
  return LISTENING_INTROS[Math.floor(Math.random() * LISTENING_INTROS.length)];
}
