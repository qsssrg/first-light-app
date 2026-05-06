import type { Scenario } from './types';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** 3 random vocab intro scenarios with Haruto at the practice studio */
const VOCAB_INTROS: Scenario[] = [
  // Pattern 1: 歌詞作りで悩んでいる
  {
    id: 'vocab-intro-lyrics',
    background: 'practice-studio',
    lines: [
      { type: 'dialog', character: 'narrator', text: '――練習スタジオの片隅。ノートを広げたハルトが、ペンを止めて考え込んでいる。' },
      { type: 'dialog', character: 'haruto', text: 'あ、{playerName}さん。来てくれたんですね。', expression: 'default' },
      { type: 'dialog', character: 'haruto', text: '実は…今、新曲の歌詞を書いてるんですけど…', expression: 'default' },
      { type: 'dialog', character: 'haruto', text: '英語のフレーズを入れたくて。でも、ニュアンスが合ってるか分からなくて。', expression: 'default' },
      { type: 'dialog', character: 'player', text: '（ハルト、真剣な顔してる…）', isInner: true },
      { type: 'dialog', character: 'haruto', text: '{playerName}さん、一緒に英単語の意味を確認してくれませんか？', expression: 'smile' },
      { type: 'dialog', character: 'haruto', text: '言葉の持つ響きとか…{playerName}さんと一緒だと、新しい発見がある気がして。', expression: 'smile' },
    ],
  },
  // Pattern 2: 良い歌詞ができた
  {
    id: 'vocab-intro-review',
    background: 'practice-studio',
    lines: [
      { type: 'dialog', character: 'narrator', text: '――練習スタジオに入ると、ハルトが嬉しそうにこちらを見た。' },
      { type: 'dialog', character: 'haruto', text: '{playerName}さん！ ちょうどよかった。', expression: 'smile' },
      { type: 'dialog', character: 'haruto', text: '新しいフレーズが浮かんだんです。英語の表現なんですけど…', expression: 'smile' },
      { type: 'dialog', character: 'haruto', text: 'この英語の意味合い、合ってるか見てもらえませんか？', expression: 'default' },
      { type: 'dialog', character: 'player', text: '（目がキラキラしてる…こういうハルト、好きだな）', isInner: true },
      { type: 'dialog', character: 'haruto', text: '一緒に単語の意味を確認しながら、感想を聞かせてほしいんです。', expression: 'smile' },
      { type: 'dialog', character: 'haruto', text: '{playerName}さんの視点って、僕にはない角度で…いつも勉強になるから。', expression: 'default' },
    ],
  },
  // Pattern 3: 最近のテーマについて考えている
  {
    id: 'vocab-intro-theme',
    background: 'practice-studio',
    lines: [
      { type: 'dialog', character: 'narrator', text: '――練習スタジオ。窓際に座るハルトが、外の景色を見ながら何か考えている。' },
      { type: 'dialog', character: 'haruto', text: 'あ…{playerName}さん。おはようございます。', expression: 'default' },
      { type: 'dialog', character: 'haruto', text: '最近ずっと考えてることがあって。…次の曲のテーマなんですけど。', expression: 'default' },
      { type: 'dialog', character: 'haruto', text: '英語で表現したい概念があるんです。でも、言葉が見つからなくて…。', expression: 'default' },
      { type: 'dialog', character: 'player', text: '（何を考えてるんだろう…ハルトの頭の中、覗いてみたいな）', isInner: true },
      { type: 'dialog', character: 'haruto', text: '{playerName}さんの意見を聞かせてほしいんです。', expression: 'smile' },
      { type: 'dialog', character: 'haruto', text: 'まずは単語から確認しよう。…いつも付き合ってくれて、ありがとうございます。', expression: 'smile' },
    ],
  },
  // Pattern 4: 静かな朝
  {
    id: 'vocab-intro-morning',
    background: 'practice-studio',
    lines: [
      { type: 'dialog', character: 'narrator', text: '――朝の練習スタジオ。まだ誰もいない静かな空間に、ハルトだけがいた。' },
      { type: 'dialog', character: 'haruto', text: '…{playerName}さん。早いですね。', expression: 'default' },
      { type: 'dialog', character: 'haruto', text: '僕も朝のこの時間が好きで。静かで、言葉が素直に入ってくる気がして。', expression: 'smile' },
      { type: 'dialog', character: 'player', text: '（ハルトと二人きりの朝…なんか特別な感じ）', isInner: true },
      { type: 'dialog', character: 'haruto', text: '…よかったら、少しだけ一緒に勉強しませんか？', expression: 'smile' },
      { type: 'dialog', character: 'haruto', text: '今日はどんな言葉に出会えるか…楽しみです。', expression: 'smile' },
    ],
  },
  // Pattern 5: ノートを見せてくれる
  {
    id: 'vocab-intro-notebook',
    background: 'practice-studio',
    lines: [
      { type: 'dialog', character: 'narrator', text: '――スタジオの隅。ハルトがノートを閉じて、こちらに気づいた。' },
      { type: 'dialog', character: 'haruto', text: '{playerName}さん。…あの、これ…見てもらっていいですか？', expression: 'default' },
      { type: 'dialog', character: 'narrator', text: 'ハルトが少し恥ずかしそうにノートを差し出す。英単語がびっしりメモされている。' },
      { type: 'dialog', character: 'haruto', text: '自分で調べた単語なんですけど…使い方が合ってるか不安で。', expression: 'default' },
      { type: 'dialog', character: 'player', text: '（ハルト、こんなに勉強してたんだ…）', isInner: true },
      { type: 'dialog', character: 'haruto', text: '{playerName}さんと一緒に確認したいです。…僕、{playerName}さんに聞くのが一番安心するから。', expression: 'smile' },
    ],
  },
];

/** Get a random vocab intro scenario */
export function getRandomVocabIntro(): Scenario {
  return VOCAB_INTROS[Math.floor(Math.random() * VOCAB_INTROS.length)];
}

export const vocabIntroScenarios = VOCAB_INTROS;
