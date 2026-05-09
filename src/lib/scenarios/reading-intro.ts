import type { Scenario } from './types';

const READING_INTROS: Scenario[] = [
  {
    id: 'reading-intro-1',
    background: 'cafe',
    lines: [
      { type: 'dialog', character: 'narrator', text: '――カフェの奥の席。ソラがペーパーバックを広げていた。' },
      { type: 'dialog', character: 'sora', text: 'あ、{playerName}さん…。来てくれたんですね。', expression: 'default' },
      { type: 'dialog', character: 'sora', text: 'この本、面白いんですけど…ここの表現がどうしても分からなくて。', expression: 'default' },
      { type: 'dialog', character: 'player', text: '（ソラくん、集中してたんだ…邪魔しちゃったかな）', isInner: true },
      { type: 'dialog', character: 'sora', text: '…{playerName}さんと一緒に読むと、理解が深まる気がします。一緒に練習しませんか。', expression: 'smile' },
    ],
  },
  {
    id: 'reading-intro-2',
    background: 'cafe',
    lines: [
      { type: 'dialog', character: 'narrator', text: '――カフェで待っていると、ソラが分厚い洋書を抱えてやってきた。' },
      { type: 'dialog', character: 'sora', text: '{playerName}さん、見てください。古本屋で見つけたんです。', expression: 'smile' },
      { type: 'dialog', character: 'sora', text: '英語のニュース記事も持ってきました。読解の練習、一緒にやりましょう。', expression: 'default' },
      { type: 'dialog', character: 'player', text: '（ソラくんと静かに英文を読む時間…贅沢だな…）', isInner: true },
      { type: 'dialog', character: 'sora', text: '…では、始めましょうか。', expression: 'smile' },
    ],
  },
  {
    id: 'reading-intro-3',
    background: 'cafe',
    lines: [
      { type: 'dialog', character: 'narrator', text: '――ソラが付箋だらけの英語の記事を差し出した。' },
      { type: 'dialog', character: 'sora', text: '…{playerName}さん。この記事、FIRST LIGHTの海外レビューなんです。', expression: 'default' },
      { type: 'dialog', character: 'sora', text: '自分たちのことが英語で書かれてるの…不思議な気持ちです。', expression: 'default' },
      { type: 'dialog', character: 'player', text: '（海外のファンの感想…読んでみたい！）', isInner: true },
      { type: 'dialog', character: 'sora', text: '一緒に読んでみましょう。読解力、きっと伸びますよ。', expression: 'smile' },
    ],
  },
];

export function getRandomReadingIntro(): Scenario {
  return READING_INTROS[Math.floor(Math.random() * READING_INTROS.length)];
}
