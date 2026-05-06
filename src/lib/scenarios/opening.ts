import type { Scenario } from './types';

export const openingScenario: Scenario = {
  id: 'opening',
  background: 'night-street',
  lines: [
    // --- Scene 1: 夜の街、一人歩き ---
    { type: 'dialog', character: 'narrator', text: '――夜の繁華街。人混みの中を、あなたは一人で歩いていた。' },
    { type: 'dialog', character: 'player', text: '（今日も遅くなっちゃったな…早く帰ろう）', isInner: true },

    // --- Scene 2: リムジン登場 ---
    { type: 'dialog', character: 'narrator', text: '突然、目の前に長い黒のリムジンが滑り込んできた。' },
    { type: 'dialog', character: 'player', text: '（え…リムジン？ こんなところに？）', isInner: true },
    { type: 'dialog', character: 'narrator', text: 'リムジンのドアがゆっくりと開く。眩しい光が漏れ出し、中から誰かが降りてくる。', background: 'night-street-limousine' },
    { type: 'dialog', character: 'player', text: '（うそ…あれって…まさか…！）', isInner: true },

    // --- Scene 3: カイ登場 ---
    { type: 'dialog', character: 'kai', text: 'ちょっと待って。', expression: 'serious' },
    { type: 'dialog', character: 'player', text: '（FIRST LIGHTの…カイ…!?）', isInner: true },
    { type: 'dialog', character: 'kai', text: '…君、英語できる人？', expression: 'serious' },
    { type: 'dialog', character: 'player', text: 'え…あ、あの…えっと…' },

    // --- Scene 4: メンバーが次々降りてくる ---
    { type: 'dialog', character: 'yuuki', text: 'カイ〜！ また突然声かけてる〜！', expression: 'smile' },
    { type: 'dialog', character: 'ren', text: '…人違いだったらどうすんだよ。', expression: 'default' },
    { type: 'dialog', character: 'player', text: '（全員いる…FIRST LIGHT、本物だ…）', isInner: true },

    { type: 'dialog', character: 'haruto', text: 'あの…驚かせてすみません。実は俺たち、困ってて…。', expression: 'default' },
    { type: 'dialog', character: 'sora', text: '…来週、海外のフェスに出るんです。でも…', expression: 'default' },
    { type: 'dialog', character: 'kai', text: '英語、全然ダメなんだ。MCも挨拶も、何も準備できてない。', expression: 'serious' },

    // --- Scene 5: 事情説明 ---
    { type: 'dialog', character: 'yuuki', text: '通訳さんが急に来れなくなっちゃって…！', expression: 'surprised' },
    { type: 'dialog', character: 'ren', text: '俺は洋楽聴いてるから多少は…って思ったけど、喋るのは別だな。', expression: 'default' },
    { type: 'dialog', character: 'haruto', text: '歌詞は書けても、会話となると…。', expression: 'default' },
    { type: 'dialog', character: 'kai', text: '俺たちに英語を教えてくれないか。いや…一緒に英語を学んでくれないか。', expression: 'smile' },

    { type: 'dialog', character: 'player', text: '（いきなりすぎる…でも、FIRST LIGHTと一緒に…？）', isInner: true },

    // --- Scene 6: 各メンバーの想い ---
    { type: 'dialog', character: 'haruto', text: '俺は歌詞の意味を、もっと深く理解したい。英語の単語一つひとつに込められた気持ちを。', expression: 'default' },
    { type: 'dialog', character: 'sora', text: '海外のインタビュー記事とか、原文で読めるようになりたいんです。…翻訳だと、ニュアンスが消えちゃうから。', expression: 'default' },
    { type: 'dialog', character: 'ren', text: '洋楽の歌詞、雰囲気で聴いてたけど…ちゃんと聴き取れるようになりたい。', expression: 'default' },
    { type: 'dialog', character: 'yuuki', text: '海外ファンからのメッセージ、いつも翻訳アプリ通してて…自分の言葉で返したいんだよね！', expression: 'smile' },
    { type: 'dialog', character: 'kai', text: '俺はメンバーをまとめる立場だから、文法とか構造から理解したい。全体を見渡せるように。', expression: 'smile' },

    // --- Scene 7: 決断 ---
    { type: 'dialog', character: 'kai', text: '…どうかな。俺たちと一緒に、世界を目指してくれないか。', expression: 'serious' },

    {
      type: 'choice',
      prompt: '',
      options: [
        { text: '…やるよ。一緒に頑張ろう', next: 'accept' },
        { text: '（こんなチャンス、逃せない…！）', next: 'accept' },
      ],
    },

    // --- Scene 8: 歓喜 ---
    { type: 'dialog', character: 'yuuki', text: 'マジで！？ やったーーー！！', expression: 'surprised' },
    { type: 'dialog', character: 'sora', text: '…よかった。ありがとうございます。', expression: 'smile' },
    { type: 'dialog', character: 'ren', text: 'ふっ…助かる。よろしくな。', expression: 'smile' },
    { type: 'dialog', character: 'haruto', text: 'ありがとう…本当に。よろしくお願いします。', expression: 'smile' },
    { type: 'dialog', character: 'kai', text: 'ありがとう。じゃあさっそくだけど…まずは君の英語力を知りたい。', expression: 'smile' },
    { type: 'dialog', character: 'kai', text: '簡単なチェックを受けてくれるか？ それで俺たちの作戦を立てよう。', expression: 'serious' },
    { type: 'dialog', character: 'ren', text: '俺たちも一緒に受けるから。気楽にいこう。', expression: 'smile' },

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
