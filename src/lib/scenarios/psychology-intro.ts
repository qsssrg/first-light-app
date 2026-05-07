import type { Scenario } from './types';

export const psychologyOfferScenario: Scenario = {
  id: 'psychology-offer',
  background: 'stylish-office',
  lines: [
    { type: 'dialog', character: 'narrator', text: '――芸能オフィスの会議室。カイが真剣な顔でメンバーを集めている。' },
    { type: 'dialog', character: 'kai', text: 'みんな集まってくれ。大事な話がある。', expression: 'serious' },
    { type: 'dialog', character: 'yuuki', text: 'なになに？ 新曲？ ライブ？', expression: 'smile' },
    { type: 'dialog', character: 'kai', text: 'YouTubeの心理学バラエティ番組から、出演オファーが来た。', expression: 'serious' },
    { type: 'dialog', character: 'ren', text: '…心理学？ 俺たちがそんなの話せるのか。', expression: 'default' },
    { type: 'dialog', character: 'haruto', text: '心理学って…人の心の仕組みを知ること、ですよね。', expression: 'default' },
    { type: 'dialog', character: 'haruto', text: '歌詞作りにも活きそう…ファンの気持ちを理解するためにも。', expression: 'smile' },
    { type: 'dialog', character: 'sora', text: '僕も興味あります。人の行動パターン…読書で少し触れたことがあって。', expression: 'default' },
    { type: 'dialog', character: 'kai', text: 'でも、正直に言うと俺たちだけじゃ無理だ。', expression: 'serious' },
    { type: 'dialog', character: 'kai', text: '{playerName}。力を貸してくれないか。', expression: 'smile' },
    { type: 'dialog', character: 'kai', text: '俺たちが番組で話せるように、心理学を教えてほしいんだ。', expression: 'smile' },
    { type: 'dialog', character: 'yuuki', text: '{playerName}なら何でもできるって信じてる！', expression: 'smile' },
    { type: 'dialog', character: 'player', text: '（心理学…面白そうだけど、私に教えられるかな…）', isInner: true },
    { type: 'dialog', character: 'ren', text: '…一緒に学べばいいだろ。{playerName}と俺たちで。', expression: 'smile' },
    { type: 'dialog', character: 'haruto', text: '{playerName}さんと一緒なら、きっと面白い発見がありますよ。', expression: 'smile' },

    {
      type: 'choice',
      prompt: '',
      options: [
        { text: '一緒に勉強しよう！', next: 'accept' },
        { text: '面白そうだね、やってみよう', next: 'accept' },
      ],
    },

    { type: 'dialog', character: 'yuuki', text: 'やった！ {playerName}、ありがとう！！', expression: 'surprised' },
    { type: 'dialog', character: 'kai', text: 'ありがとう、{playerName}。じゃあまずは基本的な理論から学んでいこう。', expression: 'smile' },
    { type: 'dialog', character: 'kai', text: '俺はリーダーとして「権威」や「リーダーシップ」の心理学に興味がある。', expression: 'serious' },
    { type: 'dialog', character: 'haruto', text: '僕は…ファンの人たちとの「パラソーシャル関係」について深く知りたいです。', expression: 'default' },
    { type: 'dialog', character: 'ren', text: '認知的不協和…ってやつ。音楽で感じることと、言葉にすることの矛盾。ずっとモヤモヤしてた。', expression: 'default' },
    { type: 'dialog', character: 'yuuki', text: '俺は「バイスタンダー効果」！ 困ってる人がいても誰も動かない…あれ、なんでなの？', expression: 'smile' },
    { type: 'dialog', character: 'sora', text: '僕は…説得の仕組み、「精緻化見込みモデル」に興味があります。', expression: 'default' },
    { type: 'dialog', character: 'kai', text: 'よし。FIRST LIGHT、心理学バラエティ番組…準備開始だ！', expression: 'smile' },
    { type: 'dialog', character: 'narrator', text: '――こうして、FIRST LIGHTの新たな挑戦が始まった。' },
  ],
};
