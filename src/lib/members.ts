import type { Member } from '@/types';

export const MEMBERS: Member[] = [
  {
    id: 'haruto',
    name: 'Haruto',
    nameJa: 'ハルト',
    role: '語彙担当',
    axis: 'vocabulary',
    color: '#1e3a5f', // Navy
    description: '練習スタジオの片隅でノートに歌詞を書いている青年。穏やかだけど目に芯がある。',
    personality: '言葉にこだわりがある。歌詞を書くのが好きで、一つの単語を何度も味わうタイプ。',
  },
  {
    id: 'sora',
    name: 'Sora',
    nameJa: 'ソラ',
    role: 'リーディング担当',
    axis: 'reading',
    color: '#2d6a4f', // Green
    description: '移動中の電車で本を読んでいる大学生感。少し照れたような笑顔。',
    personality: '読書家で多言語に興味あり。電車の中でも洋書を読んでいて、イヤホンで音楽も聴いている。',
  },
  {
    id: 'ren',
    name: 'Ren',
    nameJa: 'レン',
    role: 'リスニング担当',
    axis: 'listening',
    color: '#c1121f', // Red
    description: 'バンドのギタリスト兼アレンジャー。スタジオで機材いじってそう。',
    personality: '音楽に情熱的。一見クールだけど笑うと崩れる。洋楽を原曲で聴きたいからリスニングを鍛えた。',
  },
  {
    id: 'yuuki',
    name: 'Yuuki',
    nameJa: 'ユウキ',
    role: 'ライティング担当',
    axis: 'writing',
    color: '#f7b801', // Yellow
    description: 'ムードメーカー。いつも誰かにちょっかいをかけている。',
    personality: 'SNS担当で海外ファンへの英語メッセージを書くのが得意。明るくてポジティブ。',
  },
  {
    id: 'kai',
    name: 'Kai',
    nameJa: 'カイ',
    role: '文法/リーダー',
    axis: 'grammar',
    color: '#f8f9fa', // White (with dark text)
    description: 'FINEBOYSのモデルっぽいけど、気取らない。後輩に慕われるタイプ。',
    personality: 'リーダー。全体を見渡して構造的に考えるのが得意。文法は「仕組みを理解する楽しさ」で教える。',
  },
];

export function getMember(id: string): Member | undefined {
  return MEMBERS.find(m => m.id === id);
}

export function getMemberByAxis(axis: string): Member | undefined {
  return MEMBERS.find(m => m.axis === axis);
}
