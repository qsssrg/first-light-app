import type { Scenario } from './types';

export const memberMemoryScenarios: Record<string, Scenario> = {
  'haruto-memory': {
    id: 'haruto-memory',
    background: 'practice-studio',
    lines: [
      { type: 'dialog', character: 'narrator', text: '――ハルトが、古いノートをめくりながら話し始めた。' },
      { type: 'dialog', character: 'haruto', text: '中学の頃、英語の授業で知った単語があるんです。', expression: 'default' },
      { type: 'dialog', character: 'haruto', text: '"serendipity" ——「偶然の幸運」。', expression: 'default' },
      { type: 'dialog', character: 'haruto', text: 'この一語がきっかけで、僕は言葉を集めるようになりました。', expression: 'smile' },
      { type: 'dialog', character: 'haruto', text: '一つの単語の持つ響き、意味の奥行き…それが歌詞を書く原点なんです。', expression: 'smile' },
      { type: 'dialog', character: 'haruto', text: '{playerName}さんにも、そういう「出会いの一語」はありますか？', expression: 'default' },
    ],
  },
  'sora-memory': {
    id: 'sora-memory',
    background: 'cafe',
    lines: [
      { type: 'dialog', character: 'narrator', text: '――ソラが、少し照れくさそうに話し始めた。' },
      { type: 'dialog', character: 'sora', text: '空港の本屋で…たまたま手に取ったペーパーバックがあって。', expression: 'default' },
      { type: 'dialog', character: 'sora', text: '半分も読めなかったんです。でも…物語の続きが気になって。', expression: 'default' },
      { type: 'dialog', character: 'sora', text: '辞書を引きながら、最後まで読みました。飛行機の中で、ずっと。', expression: 'smile' },
      { type: 'dialog', character: 'sora', text: 'あの時の達成感が…今も僕を動かしてるんだと思います。', expression: 'smile' },
      { type: 'dialog', character: 'sora', text: '{playerName}さんと一緒に読めたら…もっと楽しいだろうなって。', expression: 'default' },
    ],
  },
  'ren-memory': {
    id: 'ren-memory',
    background: 'studio',
    lines: [
      { type: 'dialog', character: 'narrator', text: '――レンがヘッドフォンを外して、ぽつりと話し始めた。' },
      { type: 'dialog', character: 'ren', text: '…中3の冬、親父のレコードを勝手に聴いたんだ。', expression: 'default' },
      { type: 'dialog', character: 'ren', text: '洋楽だった。歌詞の意味は分からなかったけど…声と音だけで鳥肌が立った。', expression: 'default' },
      { type: 'dialog', character: 'ren', text: 'それから、歌詞カードを見るようになった。英語が分かれば、もっと深く聴けるって。', expression: 'smile' },
      { type: 'dialog', character: 'ren', text: '…今でもあの曲を聴くと、あの冬の空気を思い出す。', expression: 'default' },
      { type: 'dialog', character: 'ren', text: '{playerName}にもそういう曲、あるだろ。', expression: 'smile' },
    ],
  },
  'yuuki-memory': {
    id: 'yuuki-memory',
    background: 'cafe',
    lines: [
      { type: 'dialog', character: 'narrator', text: '――ユウキが、スマホの画面を見せながら嬉しそうに話す。' },
      { type: 'dialog', character: 'yuuki', text: 'これ見て！ 海外のファンからDMが来たの！', expression: 'smile' },
      { type: 'dialog', character: 'yuuki', text: 'でも…全部英語で。Google翻訳で返したんだけどさ…', expression: 'default' },
      { type: 'dialog', character: 'yuuki', text: '「ありがとう」って、自分の言葉で伝えたいじゃん。翻訳じゃなくて。', expression: 'default' },
      { type: 'dialog', character: 'yuuki', text: 'だから英語頑張ろうって思ったんだ。ファンの気持ちに、自分の言葉で応えたくて。', expression: 'smile' },
      { type: 'dialog', character: 'yuuki', text: '{playerName}がいてくれるから、今はちゃんと書けるようになってきた！', expression: 'smile' },
    ],
  },
  'kai-memory': {
    id: 'kai-memory',
    background: 'stylish-office',
    lines: [
      { type: 'dialog', character: 'narrator', text: '――カイが、窓の外を見ながら静かに語り始めた。' },
      { type: 'dialog', character: 'kai', text: 'リーダーになった日のこと、覚えてる。', expression: 'default' },
      { type: 'dialog', character: 'kai', text: '海外展開の話が出た時、誰も英語ができなくて…全員が俺を見た。', expression: 'serious' },
      { type: 'dialog', character: 'kai', text: '「カイがなんとかしてくれる」って。…でも俺だって全然だったんだ。', expression: 'serious' },
      { type: 'dialog', character: 'kai', text: 'その夜、文法書を買いに行った。リーダーが諦めたら、みんなも諦めるから。', expression: 'default' },
      { type: 'dialog', character: 'kai', text: '{playerName}が来てくれて…正直、救われた。本当にありがとう。', expression: 'smile' },
    ],
  },
};
