import type { Chapter } from '@/types';

export const CHAPTERS: Chapter[] = [
  // === Basic 5 Chapters (all unlocked from start) ===
  {
    id: 'ch1',
    number: 1,
    title: 'The Beginning',
    titleJa: '始まりの日々',
    description: 'メンバーとの英語学習が始まる。それぞれの目標と想い。',
    axis: 'vocabulary',
    memberId: 'haruto',
    stages: [
      { id: 'ch1-s1', chapterId: 'ch1', number: 1, title: '基礎語彙（2級復習）', description: '英検2級レベルの基本単語を確認。', wordCount: 500, level: 'eiken2' },
      { id: 'ch1-s2', chapterId: 'ch1', number: 2, title: '準一級コア前半', description: '準一級の頻出語彙の前半500語。', wordCount: 500, level: 'eiken_pre1' },
      { id: 'ch1-s3', chapterId: 'ch1', number: 3, title: '準一級コア後半', description: '準一級の頻出語彙の後半500語。', wordCount: 500, level: 'eiken_pre1' },
      { id: 'ch1-s4', chapterId: 'ch1', number: 4, title: 'TOEFL アカデミック語彙', description: 'TOEFLで頻出の学術語彙。', wordCount: 500, level: 'toefl' },
      { id: 'ch1-s5', chapterId: 'ch1', number: 5, title: '一級挑戦語彙', description: '英検1級レベルの高難度語彙。', wordCount: 500, level: 'eiken1' },
    ],
  },
  {
    id: 'ch2',
    number: 2,
    title: 'First Progress',
    titleJa: '初めての手応え',
    description: 'カフェでソラとハルトが成長を実感。学習の成果が見え始める。',
    axis: 'reading',
    memberId: 'sora',
    stages: [
      { id: 'ch2-s1', chapterId: 'ch2', number: 1, title: '短文読解', description: 'SNS投稿やメール文の読み取り。', wordCount: 10, level: 'eiken2' },
      { id: 'ch2-s2', chapterId: 'ch2', number: 2, title: 'パラグラフ読解', description: 'ニュース記事の段落理解。', wordCount: 10, level: 'eiken_pre1' },
      { id: 'ch2-s3', chapterId: 'ch2', number: 3, title: 'アカデミック読解', description: '学術論文スタイルの長文読解。', wordCount: 10, level: 'toefl' },
    ],
  },
  {
    id: 'ch3',
    number: 3,
    title: 'Teamwork',
    titleJa: 'チームワーク',
    description: '全員でリスニング特訓。メンバーとの絆が深まる。',
    axis: 'listening',
    memberId: 'ren',
    stages: [
      { id: 'ch3-s1', chapterId: 'ch3', number: 1, title: '基礎リスニング', description: '短い文を聴いて意味を理解する。', wordCount: 10, level: 'eiken2' },
      { id: 'ch3-s2', chapterId: 'ch3', number: 2, title: '会話リスニング', description: '日常会話の聴き取り。', wordCount: 10, level: 'eiken_pre1' },
      { id: 'ch3-s3', chapterId: 'ch3', number: 3, title: 'アカデミック講義', description: '大学の講義スタイルの聴解。', wordCount: 10, level: 'toefl' },
    ],
  },
  {
    id: 'ch4',
    number: 4,
    title: 'The Trial',
    titleJa: '事務所の試練',
    description: '事務所社長に英語力を問われる。実力を証明し、正式な仲間へ。',
    axis: 'writing',
    memberId: 'yuuki',
    stages: [
      { id: 'ch4-s1', chapterId: 'ch4', number: 1, title: '語順トレーニング', description: '英語の語順で文を組み立てる。', wordCount: 10, level: 'eiken2' },
      { id: 'ch4-s2', chapterId: 'ch4', number: 2, title: '穴埋めライティング', description: '文の空欄に適切な単語を入れる。', wordCount: 10, level: 'eiken_pre1' },
      { id: 'ch4-s3', chapterId: 'ch4', number: 3, title: '自由英作文', description: 'テーマに沿って英文を書く。', wordCount: 10, level: 'toefl' },
    ],
  },
  {
    id: 'ch5',
    number: 5,
    title: 'The TV Show',
    titleJa: '対談番組',
    description: '来日俳優との対談で英語サプライズ。特訓の成果を全国に見せる。',
    axis: 'grammar',
    memberId: 'kai',
    stages: [
      { id: 'ch5-s1', chapterId: 'ch5', number: 1, title: '基本時制', description: '現在・過去・未来の使い分け。', wordCount: 10, level: 'eiken2' },
      { id: 'ch5-s2', chapterId: 'ch5', number: 2, title: '受動態と関係詞', description: '文の構造を複雑にする技法。', wordCount: 10, level: 'eiken_pre1' },
      { id: 'ch5-s3', chapterId: 'ch5', number: 3, title: '仮定法と倒置', description: '高度な文法表現をマスター。', wordCount: 10, level: 'eiken_pre1' },
      { id: 'ch5-s4', chapterId: 'ch5', number: 4, title: 'アカデミック文法', description: '論文で使われる複雑な構文。', wordCount: 10, level: 'toefl' },
    ],
  },

  // === Advanced Chapters (unlock after clearing all 5 basic) ===
  {
    id: 'ch6',
    number: 6,
    title: 'Vocabulary × Grammar',
    titleJa: '語彙×文法',
    description: 'ハルトとカイのコンビ。語彙と文法の複合問題に挑戦。',
    axis: 'vocabulary',
    memberId: 'haruto',
    stages: [
      { id: 'ch6-s1', chapterId: 'ch6', number: 1, title: '語彙×文法 基礎', description: '正しい語彙を正しい文法で使う。', wordCount: 10, level: 'eiken_pre1' },
      { id: 'ch6-s2', chapterId: 'ch6', number: 2, title: '語彙×文法 応用', description: '学術的な語彙を複雑な構文で使う。', wordCount: 10, level: 'toefl' },
    ],
  },
  {
    id: 'ch7',
    number: 7,
    title: 'Listening × Reading',
    titleJa: 'リスニング×読解',
    description: 'レンとソラのコンビ。聴いて読んで理解する総合力。',
    axis: 'listening',
    memberId: 'ren',
    stages: [
      { id: 'ch7-s1', chapterId: 'ch7', number: 1, title: '統合理解 基礎', description: '音声と文章の両方から情報を統合。', wordCount: 10, level: 'eiken_pre1' },
      { id: 'ch7-s2', chapterId: 'ch7', number: 2, title: '統合理解 応用', description: 'TOEFL統合問題スタイル。', wordCount: 10, level: 'toefl' },
    ],
  },
  {
    id: 'ch8',
    number: 8,
    title: 'Writing × Grammar',
    titleJa: 'ライティング×文法',
    description: 'ユウキとカイのコンビ。正しく、伝わる英文を書く。',
    axis: 'writing',
    memberId: 'yuuki',
    stages: [
      { id: 'ch8-s1', chapterId: 'ch8', number: 1, title: '文法的英作文', description: '文法を意識した正確な英文構築。', wordCount: 10, level: 'eiken_pre1' },
      { id: 'ch8-s2', chapterId: 'ch8', number: 2, title: 'エッセイライティング', description: '論理的な構成で英文エッセイを書く。', wordCount: 10, level: 'toefl' },
    ],
  },
];

export function getChapter(id: string) {
  return CHAPTERS.find(c => c.id === id);
}

export const BASIC_CHAPTERS = CHAPTERS.filter(c => c.number <= 5);
export const ADVANCED_CHAPTERS = CHAPTERS.filter(c => c.number > 5);
