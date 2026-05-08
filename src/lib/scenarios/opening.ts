import type { Scenario } from './types';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const openingScenario: Scenario = {
  id: 'opening',
  background: 'night-street',
  lines: [
    // ===== シーン1: 繁華街（night-street）=====
    { type: 'dialog', character: 'narrator', text: '――夜の繁華街。仕事帰りのあなたは、人混みの中を足早に歩いていた。' },
    { type: 'dialog', character: 'player', text: '（やばい…残業しすぎた。FIRST LIGHTの生配信、もう始まっちゃう…！）', isInner: true },
    { type: 'dialog', character: 'player', text: '（家まであと20分…間に合うかな。近道しよう）', isInner: true },
    { type: 'dialog', character: 'narrator', text: '普段は通らない繁華街の裏通りに入る。ネオンの光が路面を照らしていた。' },
    { type: 'dialog', character: 'player', text: '（早く帰って画面の前に座りたい…今日のセトリ何だろう…）', isInner: true },

    // ===== シーン2: リムジン登場（night-street-limousine）=====
    { type: 'dialog', character: 'narrator', text: '――その時。低いエンジン音とともに、漆黒のリムジンが通りに入ってきた。', background: 'night-street-limousine' },
    { type: 'dialog', character: 'player', text: '（え…リムジン？ こんな裏通りに？）', isInner: true },
    { type: 'dialog', character: 'narrator', text: 'リムジンがゆっくりと停車する。通行人たちが足を止め、スマホを構え始めた。' },
    { type: 'dialog', character: 'mob', text: 'うわ、なんだあれ…有名人か？' },
    { type: 'dialog', character: 'mob', text: '撮れ撮れ！ 誰か降りてくるぞ！' },
    { type: 'dialog', character: 'player', text: '（何？ 何事…？）', isInner: true },

    // ===== シーン3: グループショット =====
    { type: 'dialog', character: 'narrator', text: 'リムジンのドアが開き――眩い光の中から、5つの影が現れた。', eventImage: `${basePath}/members/group-shot.jpg` },
    { type: 'dialog', character: 'mob', text: 'え…嘘でしょ…FIRST LIGHTじゃない！？', eventImage: `${basePath}/members/group-shot.jpg` },
    { type: 'dialog', character: 'mob', text: 'FIRST LIGHTだ！！ 本物！？ やばいやばいやばい！！' },
    { type: 'dialog', character: 'mob', text: '写真！ 写真撮らなきゃ！！' },
    { type: 'dialog', character: 'player', text: '（――え）', isInner: true },
    { type: 'dialog', character: 'player', text: '（うそ…FIRST LIGHT…？ 本物…！？）', isInner: true },
    { type: 'dialog', character: 'player', text: '（家で配信見ようとしてたのに…目の前に…本人たちが…！？）', isInner: true },
    { type: 'dialog', character: 'narrator', text: '群衆がリムジンの周りに殺到する中――メンバーたちは群衆を見ていなかった。' },
    { type: 'dialog', character: 'narrator', text: '全員の視線が、まっすぐ――あなたに向いている。' },
    { type: 'dialog', character: 'player', text: '（…え？ こっち見てる…？ まさか…私に…？）', isInner: true },

    // ===== シーン4: 名前を聞かれる =====
    { type: 'dialog', character: 'kai', text: '…ちょっと待ってくれ。', expression: 'serious' },
    { type: 'dialog', character: 'narrator', text: 'カイが群衆をかき分けるように、まっすぐこちらに歩いてくる。' },
    { type: 'dialog', character: 'player', text: '（カイが…カイが目の前に…！ 近い…近すぎる…！）', isInner: true },
    { type: 'dialog', character: 'kai', text: '…君。名前、教えてくれないか。', expression: 'serious' },

    { type: 'input', prompt: 'あなたの名前は？', placeholder: '名前を入力してください', storeKey: 'playerName' },

    { type: 'dialog', character: 'kai', text: '{playerName}…。', expression: 'serious' },
    { type: 'dialog', character: 'kai', text: 'やっぱり。{playerName}さんだ。', expression: 'smile' },
    { type: 'dialog', character: 'player', text: '（え…？ なんで私の名前を…？）', isInner: true },
    { type: 'dialog', character: 'mob', text: 'あの人、誰…？ 知り合い…？' },
    { type: 'dialog', character: 'mob', text: 'マネージャーさん…？ いや、あの反応は違くない…？' },

    // ===== シーン5: リムジンに引き入れられる =====
    { type: 'dialog', character: 'yuuki', text: 'カイ〜！ この人でしょ！？', expression: 'surprised' },
    { type: 'dialog', character: 'ren', text: '…さっさと乗せろ。人が集まりすぎだ。', expression: 'default' },
    { type: 'dialog', character: 'kai', text: '{playerName}さん、悪いけど…ちょっと来てくれ。', expression: 'serious' },
    { type: 'dialog', character: 'narrator', text: 'カイがあなたの手を引き、メンバーたちがリムジンへ導いていく。' },
    { type: 'dialog', character: 'player', text: '（え？ え？ 何が起きてるの…！？）', isInner: true },
    { type: 'dialog', character: 'haruto', text: 'すみません…説明は中で。', expression: 'default' },
    { type: 'dialog', character: 'sora', text: '…大丈夫です。怖いことはしませんから。', expression: 'default' },
    { type: 'dialog', character: 'narrator', text: 'リムジンのドアが閉まり、車がゆっくりと走り出す。' },
    { type: 'dialog', character: 'mob', text: 'あの人、連れて行かれたぞ…！' },
    { type: 'dialog', character: 'mob', text: '誰なのあの人…新メンバー…？' },

    // ===== シーン6: 車内（limousine-interior）=====
    { type: 'dialog', character: 'narrator', text: '――リムジンの中。革張りのシートにずらりとメンバーが座っている。', background: 'limousine-interior' },
    { type: 'dialog', character: 'player', text: '（嘘でしょ…FIRST LIGHTに囲まれてリムジンに乗ってる…夢…？）', isInner: true },
    { type: 'dialog', character: 'kai', text: '驚かせてすまない、{playerName}さん。…急なのは分かってる。', expression: 'serious' },
    { type: 'dialog', character: 'kai', text: '{playerName}さんに、協力してほしいことがあるんだ。', expression: 'serious' },
    { type: 'dialog', character: 'player', text: '協力…？' },
    { type: 'dialog', character: 'kai', text: '来週、海外のフェスに出ることが決まった。でも…英語が全然ダメなんだ。MCも挨拶も何も準備できてない。', expression: 'serious' },
    { type: 'dialog', character: 'yuuki', text: '通訳さんが急に来れなくなっちゃって…マジでやばいの！', expression: 'surprised' },
    { type: 'dialog', character: 'ren', text: '…俺は洋楽聴いてるから多少はいけると思ってたけど、喋るのは別だった。', expression: 'default' },
    { type: 'dialog', character: 'haruto', text: '歌詞は書けても、会話となると…。{playerName}さんの力を借りたいんです。', expression: 'default' },
    { type: 'dialog', character: 'sora', text: '…{playerName}さんなら、きっと…。', expression: 'default' },
    { type: 'dialog', character: 'kai', text: '{playerName}さん。俺たちと一緒に英語を学んでくれないか。', expression: 'smile' },

    {
      type: 'choice',
      prompt: '',
      options: [
        { text: '…もちろん。一緒に頑張ろう', next: 'accept' },
        { text: '（こんなチャンス、逃せない…！）', next: 'accept' },
      ],
    },

    { type: 'dialog', character: 'yuuki', text: 'マジで！？ やった〜！！ {playerName}さん最高！', expression: 'smile' },
    { type: 'dialog', character: 'haruto', text: 'ありがとうございます…{playerName}さん。', expression: 'smile' },
    { type: 'dialog', character: 'ren', text: '…ふっ。よろしくな、{playerName}さん。', expression: 'smile' },
    { type: 'dialog', character: 'sora', text: '…よかった。嬉しいです。', expression: 'smile' },
    { type: 'dialog', character: 'kai', text: 'ありがとう。じゃあ、詳しくは明日事務所で話そう。今日はまず…', expression: 'smile' },

    // ===== シーン7: 生配信会場到着（live-venue-backstage）=====
    { type: 'dialog', character: 'narrator', text: '――リムジンが停車する。外に見えたのは、大きな建物の裏口だった。', background: 'live-venue-backstage' },
    { type: 'dialog', character: 'player', text: '（え…ここって…）', isInner: true },
    { type: 'dialog', character: 'player', text: '（配信会場…！？ 今日の生配信って…ここからだったの！？）', isInner: true },
    { type: 'dialog', character: 'yuuki', text: '{playerName}さん、袖から見ていいよ！ 特等席！', expression: 'smile' },
    { type: 'dialog', character: 'kai', text: '今日の配信、すぐそばで見てくれ。…これからの打ち合わせも兼ねて。', expression: 'smile' },
    { type: 'dialog', character: 'haruto', text: 'ステージの袖って、普段は絶対入れないんですよ。特別です。', expression: 'smile' },

    // ===== シーン8: 幸福の絶頂 =====
    { type: 'dialog', character: 'player', text: '（…家で画面越しに見るはずだったのに）', isInner: true },
    { type: 'dialog', character: 'player', text: '（今、横から…こんな近くで見てる…）', isInner: true },
    { type: 'dialog', character: 'player', text: '（気絶しそう…夢じゃないよね…？）', isInner: true },
    { type: 'dialog', character: 'narrator', text: 'メンバーたちがステージに向かう。その前に、一人ずつ振り返った。' },
    { type: 'dialog', character: 'haruto', text: '{playerName}さん、ちゃんと見ててくださいね。今日は特別な気持ちで歌います。', expression: 'smile' },
    { type: 'dialog', character: 'sora', text: '…{playerName}さんに聴いてもらえるなら、いつもより上手く弾ける気がします。', expression: 'smile' },
    { type: 'dialog', character: 'ren', text: '…{playerName}さん。俺たちの本気、ちゃんと見とけよ。', expression: 'smile' },
    { type: 'dialog', character: 'yuuki', text: '{playerName}さんのために踊るから！ 目、離さないでね！', expression: 'smile' },
    { type: 'dialog', character: 'kai', text: '…行ってくるよ、{playerName}さん。ここからが、俺たちの始まりだ。', expression: 'smile' },
    { type: 'dialog', character: 'player', text: '（こんな幸せなこと…本当にあるんだ…）', isInner: true },
    { type: 'dialog', character: 'narrator', text: '――ステージの照明が灯る。歓声が沸き上がる。' },
    { type: 'dialog', character: 'narrator', text: 'あなたは特等席で、FIRST LIGHTの光を浴びていた。' },

    { type: 'action', action: 'navigate', target: '/onboarding/assessment' },
  ],
};

export const preAssessmentScenario: Scenario = {
  id: 'pre-assessment',
  background: 'stylish-office',
  lines: [
    // ===== 場面転換 =====
    { type: 'dialog', character: 'narrator', text: '――翌日。' },
    { type: 'dialog', character: 'narrator', text: '渡された名刺の住所を頼りに、あなたはビルの前に立っていた。' },
    { type: 'dialog', character: 'player', text: '（ここ…？ 芸能事務所って、こんなところなんだ…）', isInner: true },
    { type: 'dialog', character: 'player', text: '（昨日のこと、まだ夢みたい。本当に来ちゃったけど…大丈夫かな）', isInner: true },

    // ===== 応接室に案内される =====
    { type: 'dialog', character: 'narrator', text: 'ガラス張りのエントランスを抜け、スタッフに案内されたのは――' },
    { type: 'dialog', character: 'narrator', text: '広い応接室だった。革張りのソファ、高い天井、壁にはアート。', background: 'reception-room' },
    { type: 'dialog', character: 'player', text: '（なにここ…ホテルのスイートみたい…）', isInner: true },
    { type: 'dialog', character: 'player', text: '（こんなところに座っていいの…？ 服装間違えた気がする…）', isInner: true },

    // ===== メンバー登場 — 距離が近い =====
    { type: 'dialog', character: 'narrator', text: 'ドアが開き、メンバーたちが入ってきた。' },
    { type: 'dialog', character: 'kai', text: '{playerName}、来てくれたか。', expression: 'smile' },
    { type: 'dialog', character: 'yuuki', text: '{playerName}〜！ 待ってたよ！', expression: 'smile' },
    { type: 'dialog', character: 'player', text: '（…呼び捨て！？ 昨日までカイって画面越しに見てただけなのに…）', isInner: true },
    { type: 'dialog', character: 'player', text: '（距離の詰め方が…心臓もたない…）', isInner: true },
    { type: 'dialog', character: 'haruto', text: '{playerName}さん、おはようございます。ちゃんと来てくれて嬉しいです。', expression: 'default' },
    { type: 'dialog', character: 'ren', text: 'よう、{playerName}。', expression: 'smile' },
    { type: 'dialog', character: 'sora', text: '{playerName}さん…おはようございます。', expression: 'default' },

    { type: 'dialog', character: 'player', text: '（全員揃ってる…本気なんだ…）', isInner: true },

    // ===== 不安がよぎる =====
    { type: 'dialog', character: 'narrator', text: '――だが、同時に不安がよぎった。' },
    { type: 'dialog', character: 'player', text: '（勢いで引き受けたけど…冷静に考えたら…）', isInner: true },
    { type: 'dialog', character: 'player', text: '（こんな話、ファンに知られたら…何されるか分かったもんじゃない…）', isInner: true },
    { type: 'dialog', character: 'narrator', text: '急に現実が押し寄せてきて、あなたの手が小さく震えた。' },

    // ===== メンバーが気づく =====
    { type: 'dialog', character: 'kai', text: '…{playerName}？ どうした、顔色が悪いぞ。', expression: 'serious' },
    { type: 'dialog', character: 'player', text: 'あの…もしこのことがファンの人たちに知られたら…って思ったら…怖くて…。' },
    { type: 'dialog', character: 'narrator', text: '一瞬の沈黙。カイが静かに口を開いた。' },
    { type: 'dialog', character: 'kai', text: '安心してくれ、{playerName}。', expression: 'serious' },
    { type: 'dialog', character: 'kai', text: '{playerName}との行動は、事務所が完全に情報をシャットアウトする。外に漏れることはない。', expression: 'serious' },
    { type: 'dialog', character: 'haruto', text: '僕たちも絶対に漏らしません。…{playerName}さんを守ります。', expression: 'default' },
    { type: 'dialog', character: 'yuuki', text: '秘密は守るよ！ 約束！ 俺、口固いから！', expression: 'smile' },
    { type: 'dialog', character: 'ren', text: '…俺たちを信じろ。それだけだ。', expression: 'default' },
    { type: 'dialog', character: 'sora', text: '…大丈夫です。{playerName}さんのこと、全力で守りますから。', expression: 'default' },
    { type: 'dialog', character: 'player', text: '（…みんな…）', isInner: true },
    { type: 'dialog', character: 'player', text: '（この人たちなら…信じられる）', isInner: true },

    // ===== アセスメントへ =====
    { type: 'dialog', character: 'kai', text: 'よし。じゃあさっそくだけど、{playerName}の英語力をチェックさせてもらっていいかな。', expression: 'smile' },
    { type: 'dialog', character: 'kai', text: 'どこが得意でどこが苦手か分かれば、俺たちの作戦が立てられる。', expression: 'serious' },
    { type: 'dialog', character: 'yuuki', text: 'テストって言ってもそんな難しくないから！ リラックスリラックス！', expression: 'smile' },
    { type: 'dialog', character: 'haruto', text: '{playerName}さんの力を見せてください。俺たち、受け止めますから。', expression: 'default' },

    {
      type: 'choice',
      prompt: '',
      options: [
        { text: 'よし、やってみる', next: 'start' },
        { text: '（深呼吸して…）準備できた', next: 'start' },
      ],
    },

    { type: 'dialog', character: 'kai', text: 'いい目だ。じゃあ始めよう。', expression: 'smile' },
  ],
};

export const postAssessmentScenario: Scenario = {
  id: 'post-assessment',
  background: 'stylish-office',
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
