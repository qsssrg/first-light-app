import type { Scenario } from './types';

// 親密度Lv3: 二人きりのカフェシーン
export const cafeScenarios: Record<string, Scenario> = {
  'haruto-cafe': {
    id: 'haruto-cafe',
    background: 'cafe',
    lines: [
      { type: 'dialog', character: 'narrator', text: '放課後、ハルトに呼び出されて近くのカフェへ来た。' },
      { type: 'dialog', character: 'haruto', text: '{playerName}さん、今日は…ちょっと話したいことがあって。', expression: 'default' },
      { type: 'dialog', character: 'haruto', text: '最近、新しい曲を書いてるんですけど…英語の歌詞にしたくて。', expression: 'default' },
      { type: 'dialog', character: 'haruto', text: '"I want to reach you, beyond every word I know"…こういうニュアンスって、自然ですか？', expression: 'smile' },
      { type: 'dialog', character: 'player', text: '…（ハルトが、自分の歌詞を見せてくれている）' },
      { type: 'dialog', character: 'haruto', text: '{playerName}さんと一緒に英語を学んでいなかったら、この歌詞は生まれなかったと思います。', expression: 'smile' },
      { type: 'dialog', character: 'haruto', text: 'ありがとう。…これからも、言葉を一緒に探してくれますか？', expression: 'smile' },
    ],
  },
  'sora-cafe': {
    id: 'sora-cafe',
    background: 'cafe',
    lines: [
      { type: 'dialog', character: 'narrator', text: 'ソラがカフェの奥の席で、本を読んでいた。' },
      { type: 'dialog', character: 'sora', text: 'あ、{playerName}さん。…来てくれたんですね。', expression: 'default' },
      { type: 'dialog', character: 'sora', text: 'この本、英語の原書なんですけど…{playerName}さんに読んでほしくて。', expression: 'default' },
      { type: 'dialog', character: 'sora', text: '"The world is a book and those who do not travel read only one page."', expression: 'smile' },
      { type: 'dialog', character: 'sora', text: '…聖アウグスティヌスの言葉です。旅に出たくなりません？', expression: 'smile' },
      { type: 'dialog', character: 'sora', text: '{playerName}さんと英語を勉強してるうちに、世界がどんどん広がってる気がするんです。', expression: 'smile' },
    ],
  },
  'ren-cafe': {
    id: 'ren-cafe',
    background: 'cafe',
    lines: [
      { type: 'dialog', character: 'narrator', text: 'レンがイヤホンを片耳外して、手招きした。' },
      { type: 'dialog', character: 'ren', text: '{playerName}、ちょっと聴いてくれないか。新しい曲のデモ。', expression: 'default' },
      { type: 'dialog', character: 'ren', text: '海外のプロデューサーと組むことになってさ。全部英語でやり取りしてる。', expression: 'default' },
      { type: 'dialog', character: 'ren', text: 'お前と英語やってなかったら、絶対無理だった。マジで。', expression: 'smile' },
      { type: 'dialog', character: 'ren', text: '…サンキューな。照れくさいけど、言っとかないと気が済まなくて。', expression: 'default' },
      { type: 'dialog', character: 'ren', text: 'お前がいるから、俺はもっと遠くに行ける気がする。', expression: 'smile' },
    ],
  },
  'yuuki-cafe': {
    id: 'yuuki-cafe',
    background: 'cafe',
    lines: [
      { type: 'dialog', character: 'narrator', text: 'ユウキがパフェを食べながら手を振っている。' },
      { type: 'dialog', character: 'yuuki', text: '{playerName}〜！ こっちこっち！ パフェ頼んじゃった！', expression: 'smile' },
      { type: 'dialog', character: 'yuuki', text: 'あのさ、実は…英語のファンレター、書いてみたんだ。海外のファンに向けて。', expression: 'default' },
      { type: 'dialog', character: 'yuuki', text: '"Thank you for always supporting us. Your love gives us energy!"', expression: 'smile' },
      { type: 'dialog', character: 'yuuki', text: '…どう？ 変じゃない？ {playerName}に教わった表現、使ったんだよ！', expression: 'smile' },
      { type: 'dialog', character: 'yuuki', text: 'えへへ…{playerName}のおかげで、世界中のファンとつながれる気がする！', expression: 'smile' },
    ],
  },
  'kai-cafe': {
    id: 'kai-cafe',
    background: 'cafe',
    lines: [
      { type: 'dialog', character: 'narrator', text: 'カイがコーヒーを飲みながら、窓の外を見ていた。' },
      { type: 'dialog', character: 'kai', text: '{playerName}、座ってくれ。…少し、話がある。', expression: 'default' },
      { type: 'dialog', character: 'kai', text: '来月、海外のイベントのオファーが来た。MCを英語でやってほしいって。', expression: 'default' },
      { type: 'dialog', character: 'kai', text: '正直、お前がいなかったら断ってたと思う。', expression: 'default' },
      { type: 'dialog', character: 'kai', text: '…{playerName}。お前は、俺たちにとって特別な存在だ。知ってるか？', expression: 'smile' },
      { type: 'dialog', character: 'kai', text: 'グループのリーダーとして…じゃなく、俺個人として。感謝してる。', expression: 'smile' },
    ],
  },
};

// 親密度Lv4: メンバーの過去を語る深いVN
export const pastScenarios: Record<string, Scenario> = {
  'haruto-past': {
    id: 'haruto-past',
    background: 'night-street',
    lines: [
      { type: 'dialog', character: 'narrator', text: '夜の散歩中、ハルトがぽつりと語り始めた。' },
      { type: 'dialog', character: 'haruto', text: '僕、子どもの頃…ほとんど喋れなかったんです。', expression: 'default' },
      { type: 'dialog', character: 'haruto', text: '言葉がうまく出てこなくて。だから…書くことに逃げた。', expression: 'default' },
      { type: 'dialog', character: 'haruto', text: '日本語でも英語でも、書いた言葉なら…僕の想いを正確に届けられる。', expression: 'default' },
      { type: 'dialog', character: 'haruto', text: 'だから歌詞を書くんです。声にならない想いを、旋律に乗せて。', expression: 'smile' },
      { type: 'dialog', character: 'haruto', text: '{playerName}さんは…僕の言葉を、ちゃんと受け取ってくれる。それが、すごく嬉しい。', expression: 'smile' },
    ],
  },
  'sora-past': {
    id: 'sora-past',
    background: 'night-street',
    lines: [
      { type: 'dialog', character: 'narrator', text: '深夜のスタジオ。ソラが本棚の前で佇んでいた。' },
      { type: 'dialog', character: 'sora', text: '…小学生の頃、転校が多くて。友達がなかなかできなかった。', expression: 'default' },
      { type: 'dialog', character: 'sora', text: '本だけが、僕の世界だった。英語の本を読み始めたのも、日本語の本を読み尽くしたから。', expression: 'default' },
      { type: 'dialog', character: 'sora', text: '物語の中の登場人物は…僕を置いて転校しない。', expression: 'default' },
      { type: 'dialog', character: 'sora', text: 'FIRST LIGHTに入って…初めて、現実の世界にも居場所ができた。', expression: 'smile' },
      { type: 'dialog', character: 'sora', text: '{playerName}さんと一緒にいると、物語の外の世界も悪くないなって思えます。', expression: 'smile' },
    ],
  },
  'ren-past': {
    id: 'ren-past',
    background: 'night-street',
    lines: [
      { type: 'dialog', character: 'narrator', text: 'レンがギターを抱えたまま、屋上で空を見上げている。' },
      { type: 'dialog', character: 'ren', text: '…親父がミュージシャンでさ。売れなくて、家を出て行った。', expression: 'default' },
      { type: 'dialog', character: 'ren', text: '音楽なんて大嫌いだった。なのに、気づいたらギターを弾いてた。', expression: 'default' },
      { type: 'dialog', character: 'ren', text: '親父を超えてやるって…それが全てだった。英語の曲を聴き始めたのも、親父が届かなかった場所に行くため。', expression: 'default' },
      { type: 'dialog', character: 'ren', text: '…今は違う。音楽が好きだから弾いてる。お前たちに聴かせたいから。', expression: 'smile' },
      { type: 'dialog', character: 'ren', text: '{playerName}…お前に会えてよかった。本気でそう思ってるよ。', expression: 'smile' },
    ],
  },
  'yuuki-past': {
    id: 'yuuki-past',
    background: 'night-street',
    lines: [
      { type: 'dialog', character: 'narrator', text: 'ユウキが珍しく静かな表情をしている。' },
      { type: 'dialog', character: 'yuuki', text: '…俺さ、実は。テストの点数、ずっとビリだったんだよね。', expression: 'default' },
      { type: 'dialog', character: 'yuuki', text: '英語なんて特に。ABCから怪しいレベルで。笑うでしょ？', expression: 'default' },
      { type: 'dialog', character: 'yuuki', text: 'でもさ、ファンの子が海外から来てくれた時…「I love you」しか言えなくて。', expression: 'default' },
      { type: 'dialog', character: 'yuuki', text: 'もっとちゃんと話したいって、初めて思った。勉強する理由ができた。', expression: 'smile' },
      { type: 'dialog', character: 'yuuki', text: '{playerName}が俺の先生でよかった。俺みたいなやつでも、ちゃんと教えてくれるから。', expression: 'smile' },
    ],
  },
  'kai-past': {
    id: 'kai-past',
    background: 'night-street',
    lines: [
      { type: 'dialog', character: 'narrator', text: 'カイがオフィスで、一人でコーヒーを飲んでいた。' },
      { type: 'dialog', character: 'kai', text: '…リーダーになったのは、誰もやりたがらなかったからだ。', expression: 'default' },
      { type: 'dialog', character: 'kai', text: '責任感じゃない。ただ…誰かがやらなきゃ、このグループは終わる。そう思った。', expression: 'default' },
      { type: 'dialog', character: 'kai', text: '英語を学んだのも同じだ。海外展開するには、俺が話せるようにならないと。', expression: 'default' },
      { type: 'dialog', character: 'kai', text: 'でも最近…{playerName}と話してると、義務感じゃなく、楽しいんだ。英語が。', expression: 'smile' },
      { type: 'dialog', character: 'kai', text: 'お前に出会って、俺は変われた気がする。…ありがとう。', expression: 'smile' },
    ],
  },
};

// 親密度Lv5: 運命の告白（英語学習への想い）
export const confessionScenarios: Record<string, Scenario> = {
  'haruto-confession': {
    id: 'haruto-confession',
    background: 'night-street',
    lines: [
      { type: 'dialog', character: 'narrator', text: '満天の星の下。ハルトが{playerName}の前に立った。' },
      { type: 'dialog', character: 'haruto', text: '{playerName}さん…今日は、どうしても伝えたいことがあります。', expression: 'default' },
      { type: 'dialog', character: 'haruto', text: '"You are the melody I\'ve been searching for."', expression: 'smile' },
      { type: 'dialog', character: 'haruto', text: '…これ、新曲の歌い出しです。{playerName}さんのために書きました。', expression: 'smile' },
      { type: 'dialog', character: 'haruto', text: '言葉を大切にする僕が、一番大切にしたい言葉は――', expression: 'smile' },
      { type: 'dialog', character: 'haruto', text: '「ずっと一緒に、言葉の旅を続けよう」。', expression: 'smile' },
      { type: 'dialog', character: 'narrator', text: '――ハルトの瞳が、星の光を映していた。' },
    ],
  },
  'sora-confession': {
    id: 'sora-confession',
    background: 'night-street',
    lines: [
      { type: 'dialog', character: 'narrator', text: '図書館の閉館後。ソラが{playerName}を引き止めた。' },
      { type: 'dialog', character: 'sora', text: '{playerName}さん…少し、待ってください。', expression: 'default' },
      { type: 'dialog', character: 'sora', text: '僕にとって{playerName}さんは…最高の物語です。', expression: 'smile' },
      { type: 'dialog', character: 'sora', text: '読み終わりたくない。ずっと、次のページをめくっていたい。', expression: 'smile' },
      { type: 'dialog', character: 'sora', text: '"Every story needs a companion. Will you be mine?"', expression: 'smile' },
      { type: 'dialog', character: 'sora', text: '…これからも、一緒に読み進めてくれますか。この物語を。', expression: 'smile' },
    ],
  },
  'ren-confession': {
    id: 'ren-confession',
    background: 'night-street',
    lines: [
      { type: 'dialog', character: 'narrator', text: 'ライブの後。レンがステージの端に座っていた。' },
      { type: 'dialog', character: 'ren', text: '…{playerName}。今日のライブ、全部お前のために弾いた。', expression: 'default' },
      { type: 'dialog', character: 'ren', text: '気づいてたか？ 知らねえよな。でも、そうなんだ。', expression: 'default' },
      { type: 'dialog', character: 'ren', text: '"You\'re my favorite chord — unexpected, but it makes everything complete."', expression: 'smile' },
      { type: 'dialog', character: 'ren', text: '…クサいこと言ってるのは分かってる。でも、全部本当だ。', expression: 'smile' },
      { type: 'dialog', character: 'ren', text: 'お前がいる限り、俺は弾き続ける。約束する。', expression: 'smile' },
    ],
  },
  'yuuki-confession': {
    id: 'yuuki-confession',
    background: 'night-street',
    lines: [
      { type: 'dialog', character: 'narrator', text: 'ユウキが、いつもと違う真剣な顔をしている。' },
      { type: 'dialog', character: 'yuuki', text: '{playerName}…あのさ、今日は…ちゃんと言わせて。', expression: 'default' },
      { type: 'dialog', character: 'yuuki', text: '俺、{playerName}に会えて、人生変わったんだ。大げさじゃなくて。', expression: 'default' },
      { type: 'dialog', character: 'yuuki', text: '"You taught me that learning is not about being smart — it\'s about being brave."', expression: 'smile' },
      { type: 'dialog', character: 'yuuki', text: '…これ、英語で言えるようになった。{playerName}のおかげだよ。', expression: 'smile' },
      { type: 'dialog', character: 'yuuki', text: 'ずっとずっと、{playerName}の隣にいさせてくれよな！', expression: 'smile' },
    ],
  },
  'kai-confession': {
    id: 'kai-confession',
    background: 'night-street',
    lines: [
      { type: 'dialog', character: 'narrator', text: 'カイが、オフィスの窓辺でこちらを向いた。' },
      { type: 'dialog', character: 'kai', text: '{playerName}。…俺は、感謝とか感情とか、表に出すのが苦手だ。知ってるだろ。', expression: 'default' },
      { type: 'dialog', character: 'kai', text: 'でも、今日は…言葉にする。お前に、ちゃんと。', expression: 'default' },
      { type: 'dialog', character: 'kai', text: '"You are the first light that showed me a world beyond duty."', expression: 'smile' },
      { type: 'dialog', character: 'kai', text: '…義務じゃない場所に、俺を連れ出してくれた。それがお前だ。', expression: 'smile' },
      { type: 'dialog', character: 'kai', text: 'リーダーとしてじゃなく…俺自身として。お前と、この先も歩いていきたい。', expression: 'smile' },
    ],
  },
};

// 全メンバーLv3以上: グループ特別ストーリー
export const groupSpecialScenario: Scenario = {
  id: 'group-special',
  background: 'practice-studio',
  lines: [
    { type: 'dialog', character: 'narrator', text: '――5人全員が、{playerName}を待っていた。' },
    { type: 'dialog', character: 'kai', text: '{playerName}、来たな。今日は…特別な日だ。', expression: 'smile' },
    { type: 'dialog', character: 'yuuki', text: 'じゃじゃーん！ サプライズ〜！', expression: 'smile' },
    { type: 'dialog', character: 'haruto', text: '{playerName}さんに、僕たちからの贈り物です。', expression: 'smile' },
    { type: 'dialog', character: 'ren', text: '全員で曲を作ったんだ。歌詞は…英語と日本語の両方で。', expression: 'smile' },
    { type: 'dialog', character: 'sora', text: '{playerName}さんが教えてくれた言葉を、ちりばめました。', expression: 'smile' },
    { type: 'dialog', character: 'kai', text: 'タイトルは"First Light"。…お前が、俺たちの最初の光だから。', expression: 'smile' },
    { type: 'dialog', character: 'narrator', text: '――5つの声が重なり、スタジオに歌が響いた。' },
    { type: 'dialog', character: 'narrator', text: '"When the first light breaks through the dark,\nwe find the words we\'ve been looking for."' },
    { type: 'dialog', character: 'narrator', text: '――あなたとメンバーの物語は、まだ始まったばかりだ。' },
  ],
};

// ストーリー取得ヘルパー
export function getSpecialStory(memberId: string, level: number): Scenario | null {
  if (level >= 3 && cafeScenarios[`${memberId}-cafe`]) return cafeScenarios[`${memberId}-cafe`];
  if (level >= 4 && pastScenarios[`${memberId}-past`]) return pastScenarios[`${memberId}-past`];
  if (level >= 5 && confessionScenarios[`${memberId}-confession`]) return confessionScenarios[`${memberId}-confession`];
  return null;
}

export function getAvailableStories(memberId: string, level: number): { id: string; title: string; requiredLevel: number; unlocked: boolean }[] {
  return [
    { id: `${memberId}-cafe`, title: '二人きりのカフェ', requiredLevel: 3, unlocked: level >= 3 },
    { id: `${memberId}-past`, title: 'あの日の記憶', requiredLevel: 4, unlocked: level >= 4 },
    { id: `${memberId}-confession`, title: '運命の言葉', requiredLevel: 5, unlocked: level >= 5 },
  ];
}

export function getScenarioById(id: string): Scenario | null {
  return cafeScenarios[id] ?? pastScenarios[id] ?? confessionScenarios[id] ?? null;
}
