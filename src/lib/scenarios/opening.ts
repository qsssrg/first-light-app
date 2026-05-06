import type { Scenario } from './types';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

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

    // --- Scene 2.5: グループショット + 群衆の反応 ---
    { type: 'dialog', character: 'narrator', text: '――5人の若者が、リムジンから降り立った。', background: 'night-street-limousine', eventImage: `${basePath}/members/group-shot.jpg` },
    { type: 'dialog', character: 'mob', text: 'え…あのアイドルグループじゃない…？', eventImage: `${basePath}/members/group-shot.jpg` },
    { type: 'dialog', character: 'mob', text: 'FIRST LIGHTだ！ 本物！？ やばい！！' },
    { type: 'dialog', character: 'mob', text: 'うそ…ここに来るとか聞いてない！ 写真撮っていい！？' },
    { type: 'dialog', character: 'player', text: '（うそ…あれって…まさか…！ FIRST LIGHTが目の前に…！）', isInner: true },
    { type: 'dialog', character: 'narrator', text: '周囲が騒然とする中、メンバーたちは群衆を一切見ていなかった。' },
    { type: 'dialog', character: 'narrator', text: '全員の視線が――真っ直ぐ、あなたに向かっている。' },
    { type: 'dialog', character: 'player', text: '（え…こっちに来てる…？）', isInner: true },
    { type: 'dialog', character: 'mob', text: 'あの人、誰…？ 知り合い…？' },
    { type: 'dialog', character: 'mob', text: 'マネージャーさん…？ いや、あの感じは違う…' },
    { type: 'dialog', character: 'player', text: '（まさか…自分に？ そんなわけ…）', isInner: true },

    // --- Scene 3: カイ登場（接近）---
    { type: 'dialog', character: 'kai', text: 'ちょっと待って。', expression: 'serious' },
    { type: 'dialog', character: 'player', text: '（FIRST LIGHTの…カイが…目の前に…!?）', isInner: true },
    { type: 'dialog', character: 'kai', text: '…君。名前、教えてくれないか。', expression: 'serious' },

    { type: 'input', prompt: 'あなたの名前は？', placeholder: '名前を入力してください', storeKey: 'playerName' },

    { type: 'dialog', character: 'kai', text: '{playerName}…。ああ、やっぱり間違いない。', expression: 'serious' },
    { type: 'dialog', character: 'player', text: '（え…？ 「間違いない」って…？）', isInner: true },
    { type: 'dialog', character: 'kai', text: '…ずっと探してたんだ、{playerName}のことを。', expression: 'smile' },
    { type: 'dialog', character: 'player', text: 'え…あの…どういう…？' },

    // --- Scene 4: メンバーが次々降りてくる ---
    { type: 'dialog', character: 'yuuki', text: 'カイ〜！ 見つかったの！？', expression: 'surprised' },
    { type: 'dialog', character: 'ren', text: '…本当にいたのか。', expression: 'default' },
    { type: 'dialog', character: 'player', text: '（全員いる…FIRST LIGHT、本物だ…しかも全員こっちを見てる…！）', isInner: true },

    { type: 'dialog', character: 'haruto', text: '{playerName}さん…ですよね。驚かせてすみません。実は俺たち、困ってて…。', expression: 'default' },
    { type: 'dialog', character: 'sora', text: '…来週、海外のフェスに出るんです。でも…', expression: 'default' },
    { type: 'dialog', character: 'kai', text: '英語、全然ダメなんだ。MCも挨拶も、何も準備できてない。', expression: 'serious' },

    // --- Scene 5: 事情説明 ---
    { type: 'dialog', character: 'yuuki', text: '通訳さんが急に来れなくなっちゃって…！', expression: 'surprised' },
    { type: 'dialog', character: 'ren', text: '俺は洋楽聴いてるから多少は…って思ったけど、喋るのは別だな。', expression: 'default' },
    { type: 'dialog', character: 'haruto', text: '歌詞は書けても、会話となると…。', expression: 'default' },
    { type: 'dialog', character: 'kai', text: '{playerName}。俺たちに英語を教えてくれないか。いや…一緒に英語を学んでくれないか。', expression: 'smile' },

    { type: 'dialog', character: 'player', text: '（いきなりすぎる…でも、FIRST LIGHTと一緒に…？）', isInner: true },

    // --- Scene 6: 各メンバーの想い ---
    { type: 'dialog', character: 'haruto', text: '俺は歌詞の意味を、もっと深く理解したい。英語の単語一つひとつに込められた気持ちを。', expression: 'default' },
    { type: 'dialog', character: 'sora', text: '海外のインタビュー記事とか、原文で読めるようになりたいんです。…翻訳だと、ニュアンスが消えちゃうから。', expression: 'default' },
    { type: 'dialog', character: 'ren', text: '洋楽の歌詞、雰囲気で聴いてたけど…ちゃんと聴き取れるようになりたい。', expression: 'default' },
    { type: 'dialog', character: 'yuuki', text: '海外ファンからのメッセージ、いつも翻訳アプリ通してて…自分の言葉で返したいんだよね！', expression: 'smile' },
    { type: 'dialog', character: 'kai', text: '俺はメンバーをまとめる立場だから、文法とか構造から理解したい。全体を見渡せるように。', expression: 'smile' },

    // --- Scene 7: 決断 ---
    { type: 'dialog', character: 'kai', text: '…どうかな、{playerName}。俺たちと一緒に、世界を目指してくれないか。', expression: 'serious' },

    {
      type: 'choice',
      prompt: '',
      options: [
        { text: '…やるよ。一緒に頑張ろう', next: 'accept' },
        { text: '（こんなチャンス、逃せない…！）', next: 'accept' },
      ],
    },

    // --- Scene 8: 歓喜 ---
    { type: 'dialog', character: 'yuuki', text: 'マジで！？ {playerName}、ありがとう！！', expression: 'surprised' },
    { type: 'dialog', character: 'sora', text: '…よかった。{playerName}さん、よろしくお願いします。', expression: 'smile' },
    { type: 'dialog', character: 'ren', text: 'ふっ…{playerName}か。よろしくな。', expression: 'smile' },
    { type: 'dialog', character: 'haruto', text: '{playerName}さん…ありがとう。本当に。', expression: 'smile' },
    { type: 'dialog', character: 'kai', text: 'ありがとう、{playerName}。じゃあさっそくだけど…まずは{playerName}の英語力を知りたい。', expression: 'smile' },
    { type: 'dialog', character: 'kai', text: '簡単なチェックを受けてくれるか？ それで俺たちの作戦を立てよう。', expression: 'serious' },
    { type: 'dialog', character: 'ren', text: '俺たちも一緒に受けるから。気楽にいこう、{playerName}。', expression: 'smile' },

    { type: 'action', action: 'navigate', target: '/onboarding/assessment' },
  ],
};

export const postAssessmentScenario: Scenario = {
  id: 'post-assessment',
  background: 'studio',
  lines: [
    { type: 'dialog', character: 'kai', text: '{playerName}、テストお疲れさま。結果が出たよ。' },
    { type: 'dialog', character: 'kai', text: 'なるほど…{playerName}の全体像が見えてきた。' },
    { type: 'dialog', character: 'yuuki', text: '{playerName}！ 苦手なところは俺たちがカバーするから！' },
    { type: 'dialog', character: 'haruto', text: '{playerName}さん、一歩ずつ一緒にやっていきましょう。' },
    { type: 'dialog', character: 'kai', text: 'じゃあ、まずは基礎からコツコツいこう。準備はいい、{playerName}？' },

    {
      type: 'choice',
      prompt: '',
      options: [
        { text: 'いつでもOK！', next: 'start' },
        { text: '頑張ります…！', next: 'start' },
      ],
    },

    { type: 'dialog', character: 'kai', text: 'よし。FIRST LIGHT、活動開始だ。' },
    { type: 'dialog', character: 'narrator', text: '――こうして、{playerName}とFIRST LIGHTの物語が始まった。' },

    { type: 'action', action: 'navigate', target: '/dashboard' },
  ],
};
