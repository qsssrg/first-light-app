import type { Scenario } from './types';

export const birthdayScenario: Scenario = {
  id: 'birthday',
  background: 'stylish-office',
  lines: [
    { type: 'dialog', character: 'narrator', text: '――事務所のドアを開けると、部屋が真っ暗だった。' },
    { type: 'dialog', character: 'player', text: '（あれ…？ 誰もいない…？）', isInner: true },
    { type: 'dialog', character: 'narrator', text: '突然、照明がパッと点いた。' },
    { type: 'dialog', character: 'yuuki', text: '{playerName}、お誕生日おめでとーーー！！', expression: 'smile' },
    { type: 'dialog', character: 'narrator', text: 'クラッカーが鳴り響き、紙吹雪が舞い散る。テーブルの上にはケーキが置かれていた。' },
    { type: 'dialog', character: 'kai', text: '{playerName}、誕生日おめでとう。今日は俺たちが全力で祝うぞ。', expression: 'smile' },
    { type: 'dialog', character: 'haruto', text: 'おめでとうございます、{playerName}さん。今日は特別な歌詞を書きました。…後で読んでください。', expression: 'smile' },
    { type: 'dialog', character: 'ren', text: '…おめでとう、{playerName}。今日くらいは素直に言っとく。', expression: 'smile' },
    { type: 'dialog', character: 'sora', text: 'お誕生日おめでとうございます。{playerName}さんに出会えて…本当に良かったです。', expression: 'smile' },
    { type: 'dialog', character: 'yuuki', text: 'ケーキ準備したよ！ 俺が選んだやつ！ めちゃくちゃ美味しいから！', expression: 'smile' },
    { type: 'dialog', character: 'kai', text: '{playerName}がいてくれたから、俺たちはここまで来れた。本当にありがとう。', expression: 'smile' },
    { type: 'dialog', character: 'player', text: '（みんな…こんなに準備してくれてたんだ…）', isInner: true },
    { type: 'dialog', character: 'player', text: '（幸せすぎて…涙出そう…）', isInner: true },
    { type: 'dialog', character: 'haruto', text: '{playerName}さんにとって、最高の一年になりますように。', expression: 'smile' },
    { type: 'dialog', character: 'ren', text: '…来年も、再来年も。ずっと一緒にいような、{playerName}。', expression: 'smile' },
    { type: 'dialog', character: 'sora', text: '…僕たちからのプレゼントは、これからの毎日です。', expression: 'smile' },
    { type: 'dialog', character: 'yuuki', text: 'さーて！ ケーキ食べよ！ ロウソク消して！ 願い事して！', expression: 'smile' },
    {
      type: 'choice',
      prompt: '',
      options: [
        { text: 'みんな、ありがとう…！', next: 'end' },
        { text: '（ロウソクを吹き消す）', next: 'end' },
      ],
    },
    { type: 'dialog', character: 'kai', text: 'Happy Birthday, {playerName}。さぁ、今日も一緒に頑張ろう。', expression: 'smile' },
    { type: 'dialog', character: 'narrator', text: '――こうして、{playerName}は最高の誕生日を過ごした。' },
  ],
};
