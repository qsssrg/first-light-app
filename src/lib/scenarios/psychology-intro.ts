import type { Scenario } from './types';

export const psychologyOfferScenario: Scenario = {
  id: 'psychology-offer',
  background: 'stylish-office',
  lines: [
    { type: 'dialog', character: 'narrator', text: '――芸能オフィスの会議室。カイが興奮した面持ちでメンバーを集めている。' },
    { type: 'dialog', character: 'kai', text: 'みんな、ビッグニュースだ。座ってくれ。', expression: 'smile' },
    { type: 'dialog', character: 'yuuki', text: 'なになに！？ 新曲？ ライブ？', expression: 'smile' },
    { type: 'dialog', character: 'kai', text: '俺たちのYouTubeチャンネルで、心理学バラエティ番組を始めることになった。', expression: 'serious' },
    { type: 'dialog', character: 'yuuki', text: 'マジ！？ 俺たちが司会！？', expression: 'surprised' },
    { type: 'dialog', character: 'kai', text: 'そうだ。しかも制作チームが本気でな。テレビで活躍してたスタッフが集まってくれた。', expression: 'smile' },
    { type: 'dialog', character: 'ren', text: 'スタッフは一流…でも俺ら、心理学なんて知らないだろ。', expression: 'default' },
    { type: 'dialog', character: 'kai', text: 'そうなんだ。番組のクオリティはスタッフが保証してくれる。', expression: 'serious' },
    { type: 'dialog', character: 'kai', text: 'でも一番大事なのは、俺たちが心理学をちゃんと理解して、視聴者に伝えられること。', expression: 'serious' },
    { type: 'dialog', character: 'haruto', text: '心理学…人の心の仕組みを伝える番組…素敵ですね。', expression: 'smile' },
    { type: 'dialog', character: 'haruto', text: 'ファンの皆さんの気持ちを理解するためにも、学びたいです。', expression: 'default' },
    { type: 'dialog', character: 'sora', text: '僕も勉強したいです。人の行動の裏にある理論…読書で少し触れたことがあって。', expression: 'default' },
    { type: 'dialog', character: 'kai', text: 'だから{playerName}、力を貸してくれないか。', expression: 'smile' },
    { type: 'dialog', character: 'kai', text: '俺たちが視聴者にちゃんと紹介できるように、心理学を教えてほしい。', expression: 'serious' },
    { type: 'dialog', character: 'player', text: '（FIRST LIGHTが自分たちで番組を…すごい挑戦だ…）', isInner: true },
    { type: 'dialog', character: 'yuuki', text: '{playerName}がいてくれたら百人力だって！', expression: 'smile' },
    { type: 'dialog', character: 'ren', text: '…一緒に学べばいい。{playerName}と俺たちで。', expression: 'smile' },
    { type: 'dialog', character: 'sora', text: '{playerName}さん、一緒にやりましょう。', expression: 'smile' },

    {
      type: 'choice',
      prompt: '',
      options: [
        { text: '面白そう！ 一緒にやろう', next: 'accept' },
        { text: '（こんな大きなプロジェクト…ワクワクする…！）', next: 'accept' },
      ],
    },

    { type: 'dialog', character: 'yuuki', text: 'やった！！ {playerName}、ありがとう！', expression: 'surprised' },
    { type: 'dialog', character: 'kai', text: 'ありがとう、{playerName}。じゃあまずは基本的な理論から学んでいこう。', expression: 'smile' },
    { type: 'dialog', character: 'kai', text: '俺はリーダーとして「権威」や「リーダーシップ」の心理学を担当したい。', expression: 'serious' },
    { type: 'dialog', character: 'haruto', text: '僕は…ファンの人たちとの「パラソーシャル関係」について深く知りたいです。', expression: 'default' },
    { type: 'dialog', character: 'ren', text: '認知的不協和…音楽で感じることと、言葉にすることの矛盾。ずっとモヤモヤしてた。', expression: 'default' },
    { type: 'dialog', character: 'yuuki', text: '俺は「バイスタンダー効果」！ 困ってる人がいても誰も動かない…あれ、なんでなの？', expression: 'smile' },
    { type: 'dialog', character: 'sora', text: '僕は…説得の仕組み、「精緻化見込みモデル」に興味があります。', expression: 'default' },
    { type: 'dialog', character: 'kai', text: 'よし。FIRST LIGHT心理学チャンネル、準備開始だ！', expression: 'smile' },
    { type: 'dialog', character: 'narrator', text: '――こうして、FIRST LIGHTの新たな挑戦が始まった。' },
  ],
};
