import type { Scenario } from './types';

/** Chapter story scenarios — played before/after chapter stages */

// ===== Ch1: 始まりの日々 =====
export const ch1Intro: Scenario = {
  id: 'ch1-intro',
  background: 'practice-studio',
  lines: [
    { type: 'dialog', character: 'narrator', text: '――練習スタジオ。FIRST LIGHTとの英語学習が正式に始まった日。' },
    { type: 'dialog', character: 'kai', text: 'よし、{playerName}。今日から本格的にやっていこう。', expression: 'serious' },
    { type: 'dialog', character: 'yuuki', text: 'よっしゃー！ 英語マスターするぞー！', expression: 'smile' },
    { type: 'dialog', character: 'ren', text: '…マスターって簡単に言うな。まずは基礎からだろ。', expression: 'default' },
    { type: 'dialog', character: 'haruto', text: 'そうですね。僕は単語の意味を深く理解したい。一つひとつ、丁寧に。', expression: 'default' },
    { type: 'dialog', character: 'sora', text: '…僕は洋書を辞書なしで読めるようになりたいです。', expression: 'default' },
    { type: 'dialog', character: 'kai', text: '全員目標がある。いいな。{playerName}、俺たちを導いてくれ。', expression: 'smile' },
    { type: 'dialog', character: 'player', text: '（みんなの目が真剣だ…私も頑張らなきゃ）', isInner: true },
    { type: 'dialog', character: 'narrator', text: 'こうして、FIRST LIGHTの英語特訓の日々が始まった。' },
  ],
};

export const ch1Outro: Scenario = {
  id: 'ch1-outro',
  background: 'practice-studio',
  lines: [
    { type: 'dialog', character: 'haruto', text: '{playerName}さん、今日教えてもらった単語…もうノートに書きました。', expression: 'smile' },
    { type: 'dialog', character: 'yuuki', text: '俺も覚えた！ "abandon"って放棄するって意味だよね！', expression: 'smile' },
    { type: 'dialog', character: 'ren', text: '…お前、発音もうちょいだな。', expression: 'default' },
    { type: 'dialog', character: 'yuuki', text: 'えー！ 厳しい！', expression: 'surprised' },
    { type: 'dialog', character: 'kai', text: 'いいスタートだ。{playerName}、明日も頼むぞ。', expression: 'smile' },
    { type: 'dialog', character: 'player', text: '（初日にしては上出来…かな？ みんな楽しそうでよかった）', isInner: true },
  ],
};

// ===== Ch2: 初めての手応え =====
export const ch2Intro: Scenario = {
  id: 'ch2-intro',
  background: 'cafe',
  lines: [
    { type: 'dialog', character: 'narrator', text: '――カフェ。ソラが英語の記事を読んでいる。' },
    { type: 'dialog', character: 'sora', text: 'あ、{playerName}さん。見てください…この記事、前より読めるようになった気がします。', expression: 'smile' },
    { type: 'dialog', character: 'player', text: '（ソラくん、嬉しそう…成長してるんだ）', isInner: true },
    { type: 'dialog', character: 'sora', text: '最初は一行読むのに5分かかってたんです。今は…2分くらいで。', expression: 'default' },
    { type: 'dialog', character: 'haruto', text: '僕も最近、洋楽の歌詞が少しずつ分かるようになってきました。', expression: 'smile' },
    { type: 'dialog', character: 'sora', text: '{playerName}さんのおかげです。…今日も読解の練習、お願いします。', expression: 'smile' },
  ],
};

export const ch2Outro: Scenario = {
  id: 'ch2-outro',
  background: 'cafe',
  lines: [
    { type: 'dialog', character: 'sora', text: '…{playerName}さん。英語って、読めると世界が広がりますね。', expression: 'smile' },
    { type: 'dialog', character: 'ren', text: '…俺も最近、インタビュー記事がだいぶ読めるようになった。', expression: 'default' },
    { type: 'dialog', character: 'kai', text: '全員、確実に上がってるな。{playerName}の教え方がいいんだろう。', expression: 'smile' },
    { type: 'dialog', character: 'player', text: '（みんなの成長が目に見えて分かる…嬉しい…！）', isInner: true },
  ],
};

// ===== Ch3: チームワーク =====
export const ch3Intro: Scenario = {
  id: 'ch3-intro',
  background: 'practice-studio',
  lines: [
    { type: 'dialog', character: 'narrator', text: '――練習スタジオ。今日は全員揃ってのリスニング特訓。' },
    { type: 'dialog', character: 'kai', text: '今日は全員でリスニングをやる。海外フェスのMC練習も兼ねてな。', expression: 'serious' },
    { type: 'dialog', character: 'ren', text: '…楽しみだな。最近、英語の歌が前より聴き取れるんだ。', expression: 'smile' },
    { type: 'dialog', character: 'yuuki', text: '俺も！ 海外ファンの英語メッセージ、半分くらい分かるようになったよ！', expression: 'smile' },
    { type: 'dialog', character: 'haruto', text: '僕は…まだリスニング苦手です。でも、みんなと一緒なら頑張れます。', expression: 'default' },
    { type: 'dialog', character: 'sora', text: '…僕もです。{playerName}さん、今日もよろしくお願いします。', expression: 'default' },
    { type: 'dialog', character: 'player', text: '（5人全員で英語に向き合ってる…すごい光景だ）', isInner: true },
  ],
};

export const ch3Outro: Scenario = {
  id: 'ch3-outro',
  background: 'practice-studio',
  lines: [
    { type: 'dialog', character: 'kai', text: 'いい感じだ。全員の英語力が底上げされてる。', expression: 'smile' },
    { type: 'dialog', character: 'yuuki', text: '{playerName}と一緒に勉強するの、マジで楽しい！ チームワーク最高！', expression: 'smile' },
    { type: 'dialog', character: 'ren', text: '…{playerName}がいなかったら、ここまで来れてなかったな。', expression: 'default' },
    { type: 'dialog', character: 'player', text: '（レンさんにそんなこと言われると…照れる…）', isInner: true },
    { type: 'dialog', character: 'haruto', text: '{playerName}さん、ありがとうございます。…もっと頑張りますね。', expression: 'smile' },
    { type: 'dialog', character: 'narrator', text: 'FIRST LIGHTと{playerName}の絆は、日々深まっていった。' },
  ],
};

// ===== Ch4: 事務所の試練 =====
export const ch4Intro: Scenario = {
  id: 'ch4-intro',
  background: 'stylish-office',
  lines: [
    { type: 'dialog', character: 'narrator', text: '――事務所のミーティングルーム。メンバーの顔が硬い。' },
    { type: 'dialog', character: 'kai', text: '{playerName}…悪い知らせだ。', expression: 'serious' },
    { type: 'dialog', character: 'player', text: '…何かあったんですか？' },
    { type: 'dialog', character: 'kai', text: '事務所のマネジメントから呼び出しを受けた。', expression: 'serious' },
    { type: 'dialog', character: 'mob', text: 'あなたたちが独断で外部の人間を引き入れたと聞きました。', expression: 'serious' },
    { type: 'dialog', character: 'mob', text: '英語力を高められるという根拠を示してください。示せなければ、この人には退場していただきます。', expression: 'serious' },
    { type: 'dialog', character: 'player', text: '（退場…！？ クビってこと…！？）', isInner: true },
    { type: 'dialog', character: 'yuuki', text: '{playerName}のおかげで俺たちめちゃくちゃ成長してるのに…！', expression: 'surprised' },
    { type: 'dialog', character: 'kai', text: '…分かった。証拠を見せよう。{playerName}、俺たちの実力を見てもらうぞ。', expression: 'serious' },
    { type: 'dialog', character: 'ren', text: '…ここで引き下がるわけにはいかない。全力でいくぞ。', expression: 'serious' },
    { type: 'dialog', character: 'haruto', text: '{playerName}さん…一緒に証明しましょう。僕たちの成長を。', expression: 'default' },
    { type: 'dialog', character: 'sora', text: '…{playerName}さんを守るためにも、頑張ります。', expression: 'default' },
    { type: 'dialog', character: 'narrator', text: '――事務所のテスト。FIRST LIGHTの英語力が試される。' },
  ],
};

export const ch4Outro: Scenario = {
  id: 'ch4-outro',
  background: 'stylish-office',
  lines: [
    { type: 'dialog', character: 'mob', text: '…なるほど。確かに、以前とは比較にならない上達ですね。', expression: 'default' },
    { type: 'dialog', character: 'mob', text: '{playerName}さんの指導は認めましょう。引き続きお願いします。', expression: 'default' },
    { type: 'dialog', character: 'yuuki', text: 'やったーーー！ {playerName}、残れるよ！！', expression: 'smile' },
    { type: 'dialog', character: 'player', text: '（よかった…本当によかった…！）', isInner: true },
    { type: 'dialog', character: 'kai', text: '{playerName}…ありがとう。お前がいなかったらこうはならなかった。', expression: 'smile' },
    { type: 'dialog', character: 'ren', text: '…ふぅ。冷や汗かいたぞ。でも…やれて良かった。', expression: 'smile' },
    { type: 'dialog', character: 'haruto', text: '{playerName}さんの存在が認められて…僕も嬉しいです。', expression: 'smile' },
    { type: 'dialog', character: 'sora', text: '…もう誰にも{playerName}さんを追い出させません。', expression: 'smile' },
    { type: 'dialog', character: 'narrator', text: '――事務所の試練を乗り越え、{playerName}はFIRST LIGHTの正式な仲間となった。' },
  ],
};

// ===== Ch5: 対談番組 =====
export const ch5Intro: Scenario = {
  id: 'ch5-intro',
  background: 'stylish-office',
  lines: [
    { type: 'dialog', character: 'narrator', text: '――事務所のオフィス。カイがメンバーを集めた。' },
    { type: 'dialog', character: 'kai', text: 'みんな、大事な話がある。テレビの対談番組に出ることが決まった。', expression: 'serious' },
    { type: 'dialog', character: 'yuuki', text: 'マジ！？ テレビ！？ やったー！', expression: 'smile' },
    { type: 'dialog', character: 'kai', text: 'ただし…番組のテーマが「日本のアーティストが英語で世界に挑む」なんだ。', expression: 'serious' },
    { type: 'dialog', character: 'kai', text: '番組内で英語を使ったコーナーがある。ここで恥をかくわけにはいかない。', expression: 'serious' },
    { type: 'dialog', character: 'ren', text: '…つまり、英語で話す場面があるってことか。', expression: 'default' },
    { type: 'dialog', character: 'haruto', text: '緊張しますね…でも、これまでの成果を見せるチャンスです。', expression: 'default' },
    { type: 'dialog', character: 'sora', text: '{playerName}さんと特訓してきたことを、全部出しましょう。', expression: 'default' },
    { type: 'dialog', character: 'kai', text: '{playerName}、本番まで時間がない。文法を徹底的に仕上げてくれ。', expression: 'serious' },
    { type: 'dialog', character: 'player', text: '（テレビ…！ プレッシャーだけど、みんなならきっとできる…！）', isInner: true },
  ],
};

export const ch5Outro: Scenario = {
  id: 'ch5-outro',
  background: 'stage',
  lines: [
    { type: 'dialog', character: 'narrator', text: '――対談番組の収録後。舞台袖。' },
    { type: 'dialog', character: 'kai', text: '…やったな、みんな。英語のコーナー、完璧だった。', expression: 'smile' },
    { type: 'dialog', character: 'yuuki', text: '俺、英語で笑い取れた！ {playerName}のおかげだ！', expression: 'smile' },
    { type: 'dialog', character: 'ren', text: '…正直、もっとグダグダになると思ってた。でもちゃんと話せた。', expression: 'smile' },
    { type: 'dialog', character: 'haruto', text: '番組スタッフの方にも「英語上手ですね」って言ってもらえました…', expression: 'smile' },
    { type: 'dialog', character: 'sora', text: '{playerName}さんと練習した成果ですね。…嬉しいです。', expression: 'smile' },
    { type: 'dialog', character: 'kai', text: '{playerName}。俺たちはここで止まらない。海外フェスまで、もっと上を目指すぞ。', expression: 'smile' },
    { type: 'dialog', character: 'player', text: '（テレビで英語を使えた…みんなの成長が形になった瞬間…感動…）', isInner: true },
    { type: 'dialog', character: 'narrator', text: '――対談番組は大成功。FIRST LIGHTの英語力は、世間にも認められ始めた。' },
  ],
};

/** Map chapterId to intro/outro scenarios */
export const CHAPTER_STORIES: Record<string, { intro: Scenario; outro: Scenario }> = {
  ch1: { intro: ch1Intro, outro: ch1Outro },
  ch2: { intro: ch2Intro, outro: ch2Outro },
  ch3: { intro: ch3Intro, outro: ch3Outro },
  ch4: { intro: ch4Intro, outro: ch4Outro },
  ch5: { intro: ch5Intro, outro: ch5Outro },
};
