import type { ContentCategory } from '@/types';
import { EIKEN_PRE1_VOCAB } from './eiken-pre1-vocab';
import { PRE1_EXPANSION } from './vocab-expansion';
import { TOEFL_ACADEMIC_VOCAB } from './toefl-academic-vocab';

interface StageSeed {
  word: string;
  meaning: string;
  example: string;
  category: ContentCategory;
  difficulty: number;
}

// Stage 1-1: 英検2級基礎語彙（サンプル30語）
export const STAGE_1_1_VOCAB: StageSeed[] = [
  { word: 'abandon', meaning: '捨てる、放棄する', example: 'They had to abandon the project due to lack of funding.', category: 'society', difficulty: 2 },
  { word: 'absorb', meaning: '吸収する', example: 'Plants absorb carbon dioxide from the air.', category: 'science', difficulty: 2 },
  { word: 'accomplish', meaning: '成し遂げる', example: 'She accomplished her goal of running a marathon.', category: 'society', difficulty: 2 },
  { word: 'accurate', meaning: '正確な', example: 'The weather forecast was surprisingly accurate.', category: 'technology', difficulty: 2 },
  { word: 'adapt', meaning: '適応する', example: 'Animals must adapt to changing environments.', category: 'science', difficulty: 2 },
  { word: 'adequate', meaning: '十分な', example: 'We need adequate time to prepare for the exam.', category: 'society', difficulty: 2 },
  { word: 'apparent', meaning: '明らかな', example: 'It was apparent that she had been crying.', category: 'society', difficulty: 2 },
  { word: 'candidate', meaning: '候補者', example: 'Three candidates are running for president.', category: 'society', difficulty: 2 },
  { word: 'capacity', meaning: '能力、容量', example: 'The stadium has a capacity of 50,000 people.', category: 'society', difficulty: 2 },
  { word: 'circumstance', meaning: '状況、事情', example: 'Under the circumstances, we had no other choice.', category: 'society', difficulty: 2 },
  { word: 'conscious', meaning: '意識している', example: 'She was conscious of being watched.', category: 'science', difficulty: 2 },
  { word: 'consequence', meaning: '結果、影響', example: 'Global warming has serious consequences for the environment.', category: 'science', difficulty: 2 },
  { word: 'contemporary', meaning: '現代の、同時代の', example: 'Contemporary art often challenges traditional forms.', category: 'culture', difficulty: 3 },
  { word: 'contribute', meaning: '貢献する', example: 'Everyone should contribute to society.', category: 'society', difficulty: 2 },
  { word: 'convey', meaning: '伝える', example: 'Words cannot convey how grateful I am.', category: 'culture', difficulty: 2 },
  { word: 'decline', meaning: '減少する、断る', example: 'The population has been declining steadily.', category: 'society', difficulty: 2 },
  { word: 'dispute', meaning: '論争、異議を唱える', example: 'The territory has been in dispute for decades.', category: 'history', difficulty: 2 },
  { word: 'efficient', meaning: '効率的な', example: 'Electric cars are more efficient than gasoline ones.', category: 'technology', difficulty: 2 },
  { word: 'enormous', meaning: '巨大な', example: 'The project requires an enormous amount of funding.', category: 'society', difficulty: 2 },
  { word: 'essential', meaning: '不可欠な', example: 'Water is essential for all living things.', category: 'science', difficulty: 2 },
  { word: 'establish', meaning: '設立する', example: 'The company was established in 1920.', category: 'history', difficulty: 2 },
  { word: 'evidence', meaning: '証拠', example: 'There is no evidence to support that claim.', category: 'science', difficulty: 2 },
  { word: 'exhibit', meaning: '展示する、示す', example: 'The museum will exhibit works by local artists.', category: 'culture', difficulty: 2 },
  { word: 'frequent', meaning: '頻繁な', example: 'Frequent exercise is important for health.', category: 'science', difficulty: 2 },
  { word: 'genuine', meaning: '本物の', example: 'Is this a genuine Picasso painting?', category: 'culture', difficulty: 2 },
  { word: 'household', meaning: '世帯、家庭の', example: 'The average household income has risen.', category: 'society', difficulty: 2 },
  { word: 'indicate', meaning: '示す、指し示す', example: 'Studies indicate that sleep is crucial for memory.', category: 'science', difficulty: 2 },
  { word: 'inevitable', meaning: '避けられない', example: 'Change is inevitable in any organization.', category: 'society', difficulty: 3 },
  { word: 'interpret', meaning: '解釈する', example: 'Different cultures interpret gestures differently.', category: 'culture', difficulty: 3 },
  { word: 'justify', meaning: '正当化する', example: 'How can you justify such an expensive purchase?', category: 'society', difficulty: 3 },
];

// Stage 1-2: 準一級コア前半（サンプル30語）
export const STAGE_1_2_VOCAB: StageSeed[] = [
  { word: 'abolish', meaning: '廃止する', example: 'Many countries have abolished the death penalty.', category: 'society', difficulty: 3 },
  { word: 'abstain', meaning: '棄権する、控える', example: 'She abstained from voting on the controversial bill.', category: 'society', difficulty: 3 },
  { word: 'accommodate', meaning: '収容する、適応させる', example: 'The hotel can accommodate up to 200 guests.', category: 'society', difficulty: 3 },
  { word: 'accumulate', meaning: '蓄積する', example: 'Dust had accumulated on the shelves over the years.', category: 'science', difficulty: 3 },
  { word: 'advocate', meaning: '提唱する、支持者', example: 'She advocates for environmental protection.', category: 'society', difficulty: 3 },
  { word: 'alleviate', meaning: '軽減する', example: 'The medicine helped alleviate the pain.', category: 'science', difficulty: 3 },
  { word: 'ambiguous', meaning: '曖昧な', example: 'The contract contained ambiguous language.', category: 'society', difficulty: 3 },
  { word: 'anticipate', meaning: '予想する', example: 'We anticipate a rise in demand next quarter.', category: 'society', difficulty: 3 },
  { word: 'apparatus', meaning: '装置、機構', example: 'The laboratory has complex scientific apparatus.', category: 'technology', difficulty: 4 },
  { word: 'arbitrary', meaning: '恣意的な', example: 'The decision seemed completely arbitrary.', category: 'society', difficulty: 4 },
  { word: 'articulate', meaning: '明確に述べる', example: 'He articulated his vision for the company clearly.', category: 'society', difficulty: 3 },
  { word: 'aspiration', meaning: '願望、志', example: 'Her aspiration is to become a neurosurgeon.', category: 'society', difficulty: 3 },
  { word: 'autonomous', meaning: '自律的な', example: 'Autonomous vehicles are being tested on public roads.', category: 'technology', difficulty: 4 },
  { word: 'bureaucracy', meaning: '官僚制', example: 'Excessive bureaucracy slows down innovation.', category: 'society', difficulty: 4 },
  { word: 'catastrophe', meaning: '大惨事', example: 'The earthquake was a catastrophe of unprecedented scale.', category: 'current', difficulty: 3 },
  { word: 'coherent', meaning: '首尾一貫した', example: 'She presented a coherent argument for reform.', category: 'society', difficulty: 4 },
  { word: 'collaborate', meaning: '協力する', example: 'The two universities collaborated on the research.', category: 'science', difficulty: 3 },
  { word: 'compatible', meaning: '互換性のある', example: 'The software is compatible with older systems.', category: 'technology', difficulty: 3 },
  { word: 'compulsory', meaning: '義務的な', example: 'Education is compulsory until age 16.', category: 'society', difficulty: 3 },
  { word: 'conceive', meaning: '考え出す、妊娠する', example: 'It is hard to conceive of a world without the internet.', category: 'society', difficulty: 4 },
  { word: 'controversy', meaning: '論争', example: 'The new policy generated considerable controversy.', category: 'current', difficulty: 3 },
  { word: 'deteriorate', meaning: '悪化する', example: 'His health continued to deteriorate rapidly.', category: 'science', difficulty: 4 },
  { word: 'dilemma', meaning: 'ジレンマ', example: 'She faced a moral dilemma about telling the truth.', category: 'society', difficulty: 3 },
  { word: 'disposition', meaning: '性質、傾向', example: 'He has a cheerful disposition that puts people at ease.', category: 'society', difficulty: 4 },
  { word: 'elaborate', meaning: '詳しく述べる、精巧な', example: 'Could you elaborate on your proposal?', category: 'society', difficulty: 3 },
  { word: 'encompass', meaning: '包含する', example: 'The course encompasses a wide range of topics.', category: 'society', difficulty: 4 },
  { word: 'exploit', meaning: '利用する、搾取する', example: 'Companies should not exploit their workers.', category: 'society', difficulty: 3 },
  { word: 'fluctuate', meaning: '変動する', example: 'Stock prices fluctuate based on market conditions.', category: 'current', difficulty: 3 },
  { word: 'formulate', meaning: '策定する', example: 'The committee formulated a new policy.', category: 'society', difficulty: 4 },
  { word: 'indigenous', meaning: '先住の、固有の', example: 'The indigenous people have lived here for thousands of years.', category: 'history', difficulty: 4 },
];

export function getStageVocab(stageId: string): StageSeed[] {
  switch (stageId) {
    case 'ch1-s1': return STAGE_1_1_VOCAB;
    case 'ch1-s2': return [...STAGE_1_2_VOCAB, ...EIKEN_PRE1_VOCAB];
    case 'ch1-s3': return PRE1_EXPANSION;
    case 'ch1-s4': return TOEFL_ACADEMIC_VOCAB;
    default: return [];
  }
}
