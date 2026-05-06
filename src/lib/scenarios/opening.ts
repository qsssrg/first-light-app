import type { Scenario } from './types';

export const openingScenario: Scenario = {
  id: 'opening',
  background: 'studio',
  lines: [
    { type: 'dialog', character: 'narrator', text: '――ある日、あなたのもとに一通のメッセージが届いた。' },
    { type: 'dialog', character: 'kai', text: 'はじめまして。俺はカイ。FIRST LIGHTのリーダーをやってます。' },
    { type: 'dialog', character: 'kai', text: '突然なんですけど…俺たちのマネージャーになりませんか？' },
    { type: 'dialog', character: 'kai', text: '俺たちは今、世界進出を目指してるんです。でも英語が全然で…。' },
    { type: 'dialog', character: 'kai', text: 'まずはメンバーを紹介させてください。' },

    { type: 'dialog', character: 'haruto', text: 'ハルトです。歌詞を書くのが好きで、言葉の意味をずっと考えてます。' },
    { type: 'dialog', character: 'haruto', text: '英語の語彙を増やせたら、もっといい歌詞が書けると思うんです。' },

    { type: 'dialog', character: 'sora', text: 'あ、ソラです。…えっと、よろしくお願いします。' },
    { type: 'dialog', character: 'sora', text: '海外の音楽雑誌とか読みたくて。リーディング、頑張りたいです。' },

    { type: 'dialog', character: 'ren', text: 'レン。よろしく。' },
    { type: 'dialog', character: 'ren', text: '洋楽は耳で覚えるタイプなんだけど、ちゃんと聴き取れるようになりたい。' },

    { type: 'dialog', character: 'yuuki', text: 'ユウキでーす！よろしくっ！' },
    { type: 'dialog', character: 'yuuki', text: '海外ファンにメッセージ書きたいんだけど、いつもGoogle翻訳頼りで…笑' },

    { type: 'dialog', character: 'kai', text: '…と、こんなメンバーです。一人ひとり課題は違うけど、目標は同じ。' },
    { type: 'dialog', character: 'kai', text: '世界中のファンに、自分たちの言葉で想いを届けたい。' },
    { type: 'dialog', character: 'kai', text: '一緒に、世界を目指してくれますか？' },

    {
      type: 'choice',
      prompt: '',
      options: [
        { text: 'もちろん！一緒に頑張ろう', next: 'accept' },
        { text: '…やってみようかな', next: 'accept' },
      ],
    },

    { type: 'dialog', character: 'yuuki', text: 'やったー！マネージャー決定！！' },
    { type: 'dialog', character: 'haruto', text: 'よかった…。よろしくお願いします。' },
    { type: 'dialog', character: 'kai', text: 'ありがとう。じゃあまず、あなたの英語力を知りたいんです。' },
    { type: 'dialog', character: 'kai', text: '簡単なテストを受けてもらえますか？それで俺たちの戦略を立てます。' },
    { type: 'dialog', character: 'ren', text: '俺たちも一緒に受けるから。気楽にやろう。' },

    { type: 'action', action: 'navigate', target: '/onboarding/assessment' },
  ],
};

export const postAssessmentScenario: Scenario = {
  id: 'post-assessment',
  background: 'studio',
  lines: [
    { type: 'dialog', character: 'kai', text: 'テスト、お疲れさま。結果が出たよ。' },
    { type: 'dialog', character: 'kai', text: 'なるほど…全体像が見えてきた。' },
    { type: 'dialog', character: 'yuuki', text: 'マネージャー、苦手なところは俺たちがカバーするから！' },
    { type: 'dialog', character: 'haruto', text: '一歩ずつ、一緒にやっていきましょう。' },
    { type: 'dialog', character: 'kai', text: 'じゃあ、まずは基礎からコツコツいこう。準備はいい？' },

    {
      type: 'choice',
      prompt: '',
      options: [
        { text: 'いつでもOK！', next: 'start' },
        { text: '頑張ります…！', next: 'start' },
      ],
    },

    { type: 'dialog', character: 'kai', text: 'よし。FIRST LIGHT、活動開始だ。' },
    { type: 'dialog', character: 'narrator', text: '――こうして、あなたとFIRST LIGHTの物語が始まった。' },

    { type: 'action', action: 'navigate', target: '/dashboard' },
  ],
};
