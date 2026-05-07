import type { Member } from '@/types';

export const MEMBERS: Member[] = [
  {
    id: 'haruto',
    name: 'Haruto',
    nameJa: 'ハルト',
    role: '語彙担当',
    axis: 'vocabulary',
    color: '#1e3a5f',
    description: '練習スタジオの片隅でノートに歌詞を書いている青年。穏やかだけど目に芯がある。',
    personality: '言葉にこだわりがある。歌詞を書くのが好きで、一つの単語を何度も味わうタイプ。',
    profile: {
      birthday: '9/23', birthYear: 2002, hometown: '京都府', height: 172, bloodType: 'A',
      part: 'Key.（キーボード/ピアノ+作詞）',
      hobbies: '詩集を読む、カフェ巡り、万年筆コレクション',
      specialty: '即興で歌詞を書ける',
      traits: '繊細・内省的・誠実・言葉を大切にする・照れ屋',
      motto: '一つの言葉が、世界を変えることもある',
    },
  },
  {
    id: 'sora',
    name: 'Sora',
    nameJa: 'ソラ',
    role: 'リーディング担当',
    axis: 'reading',
    color: '#2d6a4f',
    description: '移動中の電車で本を読んでいる大学生感。少し照れたような笑顔。',
    personality: '読書家で多言語に興味あり。電車の中でも洋書を読んでいて、イヤホンで音楽も聴いている。',
    profile: {
      birthday: '12/1', birthYear: 2003, hometown: '北海道札幌市', height: 170, bloodType: 'AB',
      part: 'Gt.（ギター）',
      hobbies: '古本屋巡り、映画鑑賞（字幕なし挑戦中）',
      specialty: '速読',
      traits: '控えめ・知的好奇心旺盛・観察力がある・人見知り・芯が強い',
      motto: 'わかるって、段階があるんだ',
    },
  },
  {
    id: 'ren',
    name: 'Ren',
    nameJa: 'レン',
    role: 'リスニング担当',
    axis: 'listening',
    color: '#c1121f',
    description: 'バンドのベーシスト兼アレンジャー。スタジオで機材いじってそう。',
    personality: '音楽に情熱的。一見クールだけど笑うと崩れる。洋楽を原曲で聴きたいからリスニングを鍛えた。',
    profile: {
      birthday: '7/7', birthYear: 2002, hometown: '神奈川県横浜市', height: 176, bloodType: 'B',
      part: 'Ba./Sub Vo.（ベース+サブボーカル）',
      hobbies: 'レコード収集、ベース弾き語り、夜の散歩',
      specialty: '一度聴いたメロディを耳コピで再現できる',
      traits: 'クール・ぶっきらぼう・情に厚い・照れ隠し・職人気質',
      motto: '音楽に言葉はいらない。でも、あったらもっといい',
    },
  },
  {
    id: 'yuuki',
    name: 'Yuuki',
    nameJa: 'ユウキ',
    role: 'ライティング担当',
    axis: 'writing',
    color: '#f7b801',
    description: 'ムードメーカー。いつも誰かにちょっかいをかけている。',
    personality: 'SNS担当で海外ファンへの英語メッセージを書くのが得意。明るくてポジティブ。',
    profile: {
      birthday: '3/3', birthYear: 2005, hometown: '大阪府', height: 168, bloodType: 'O',
      part: 'Dance.（ダンサー+ラップ/コーラス）',
      hobbies: 'SNS、料理動画を見る、メンバーにちょっかい',
      specialty: '誰とでもすぐ仲良くなれる',
      traits: '天真爛漫・お調子者・素直・寂しがり屋・努力家の一面',
      motto: '言葉は、想いを届ける翼だ！',
    },
  },
  {
    id: 'kai',
    name: 'Kai',
    nameJa: 'カイ',
    role: '文法/リーダー',
    axis: 'grammar',
    color: '#6b7280',
    description: 'FINEBOYSのモデルっぽいけど、気取らない。後輩に慕われるタイプ。',
    personality: 'リーダー。全体を見渡して構造的に考えるのが得意。文法は「仕組みを理解する楽しさ」で教える。',
    profile: {
      birthday: '4/15', birthYear: 2001, hometown: '東京都世田谷区', height: 178, bloodType: 'O',
      part: 'Vo.（メインボーカル+リーダー）',
      hobbies: '数独、建築雑誌を読む',
      specialty: '人の話をまとめること',
      traits: '冷静・包容力・論理的・面倒見がいい・不器用な優しさ',
      motto: '全体を見渡せば、答えは見えてくる',
    },
  },
];

export function getMember(id: string): Member | undefined {
  return MEMBERS.find(m => m.id === id);
}

export function getMemberByAxis(axis: string): Member | undefined {
  return MEMBERS.find(m => m.axis === axis);
}
