import type { ContentCategory } from '@/types';

interface VocabSeed {
  word: string;
  meaning: string;
  example: string;
  category: ContentCategory;
  difficulty: number;
}

// 準一級コア語彙 追加500語（代表的なサンプル。実運用時はCSV等から読み込む）
export const PRE1_EXPANSION: VocabSeed[] = [
  // A
  { word: 'abrupt', meaning: '突然の', example: 'The abrupt change in policy surprised everyone.', category: 'society', difficulty: 3 },
  { word: 'accountable', meaning: '責任がある', example: 'Politicians must be accountable to the public.', category: 'society', difficulty: 3 },
  { word: 'acquaint', meaning: '知り合いにする', example: 'Let me acquaint you with our new procedures.', category: 'society', difficulty: 3 },
  { word: 'adjacent', meaning: '隣接した', example: 'The hotel is adjacent to the train station.', category: 'society', difficulty: 3 },
  { word: 'adversity', meaning: '逆境', example: 'She showed remarkable strength in the face of adversity.', category: 'society', difficulty: 3 },
  { word: 'aggregate', meaning: '集合的な、合計', example: 'The aggregate score determines the winner.', category: 'science', difficulty: 4 },
  { word: 'allegation', meaning: '申し立て、主張', example: 'The allegations of fraud were never proven.', category: 'society', difficulty: 4 },
  { word: 'allocate', meaning: '割り当てる', example: 'The government will allocate more funds to education.', category: 'society', difficulty: 3 },
  { word: 'analogy', meaning: '類推', example: 'He drew an analogy between the brain and a computer.', category: 'science', difficulty: 3 },
  { word: 'anomaly', meaning: '異常、例外', example: 'This warm December day is a weather anomaly.', category: 'science', difficulty: 4 },
  { word: 'apparatus', meaning: '装置', example: 'The scientific apparatus was extremely delicate.', category: 'technology', difficulty: 4 },
  { word: 'appraisal', meaning: '評価、査定', example: 'The annual performance appraisal is next week.', category: 'society', difficulty: 3 },
  { word: 'approximate', meaning: 'おおよその', example: 'The approximate cost is five million yen.', category: 'science', difficulty: 3 },
  { word: 'articulate', meaning: '明確に述べる', example: 'She can articulate complex ideas simply.', category: 'society', difficulty: 3 },
  { word: 'assert', meaning: '主張する', example: 'He asserted his innocence throughout the trial.', category: 'society', difficulty: 3 },
  // B
  { word: 'benchmark', meaning: '基準', example: 'This score serves as a benchmark for future tests.', category: 'technology', difficulty: 3 },
  { word: 'bias', meaning: '偏見、バイアス', example: 'Researchers must be aware of confirmation bias.', category: 'science', difficulty: 3 },
  { word: 'blueprint', meaning: '青写真、計画', example: 'The architect presented the blueprint for the new building.', category: 'technology', difficulty: 3 },
  { word: 'breach', meaning: '違反、破る', example: 'The data breach affected millions of users.', category: 'technology', difficulty: 3 },
  { word: 'bureaucratic', meaning: '官僚的な', example: 'The process was slowed by bureaucratic procedures.', category: 'society', difficulty: 4 },
  // C
  { word: 'calibrate', meaning: '校正する', example: 'The instruments need to be calibrated regularly.', category: 'technology', difficulty: 4 },
  { word: 'chronicle', meaning: '年代記、記録する', example: 'The book chronicles the rise of Silicon Valley.', category: 'history', difficulty: 3 },
  { word: 'circumvent', meaning: '回避する', example: 'They tried to circumvent the regulations.', category: 'society', difficulty: 4 },
  { word: 'coalition', meaning: '連合', example: 'A coalition of parties formed the government.', category: 'society', difficulty: 3 },
  { word: 'cognitive', meaning: '認知の', example: 'Cognitive decline is a concern in aging populations.', category: 'science', difficulty: 4 },
  { word: 'commodity', meaning: '商品、必需品', example: 'Clean water has become a precious commodity.', category: 'current', difficulty: 3 },
  { word: 'competent', meaning: '有能な', example: 'We need competent leaders during this crisis.', category: 'society', difficulty: 3 },
  { word: 'complement', meaning: '補完する', example: 'Red wine complements this cheese perfectly.', category: 'culture', difficulty: 3 },
  { word: 'comprise', meaning: '構成する', example: 'The committee comprises twelve members.', category: 'society', difficulty: 3 },
  { word: 'conceive', meaning: '考え出す', example: 'It is hard to conceive of a world without internet.', category: 'technology', difficulty: 4 },
  { word: 'concurrent', meaning: '同時の', example: 'The concerts will be held concurrently.', category: 'culture', difficulty: 4 },
  { word: 'confine', meaning: '限定する、閉じ込める', example: 'Please confine your remarks to the topic.', category: 'society', difficulty: 3 },
  { word: 'consensus', meaning: '合意', example: 'The team reached a consensus on the plan.', category: 'society', difficulty: 3 },
  { word: 'consolidate', meaning: '統合する', example: 'The company consolidated its operations.', category: 'society', difficulty: 4 },
  { word: 'constitute', meaning: '構成する', example: 'These actions constitute a violation of the law.', category: 'society', difficulty: 3 },
  { word: 'constraint', meaning: '制約', example: 'Budget constraints limited the project scope.', category: 'society', difficulty: 3 },
  { word: 'contemplate', meaning: '熟考する', example: 'She contemplated changing careers.', category: 'society', difficulty: 3 },
  { word: 'contradict', meaning: '矛盾する', example: 'The evidence contradicts his testimony.', category: 'science', difficulty: 3 },
  { word: 'controversial', meaning: '議論を呼ぶ', example: 'The proposal proved highly controversial.', category: 'current', difficulty: 3 },
  { word: 'convene', meaning: '招集する', example: 'The committee will convene next Monday.', category: 'society', difficulty: 4 },
  // D
  { word: 'deficiency', meaning: '欠乏、不足', example: 'Vitamin D deficiency is common in northern countries.', category: 'science', difficulty: 3 },
  { word: 'degradation', meaning: '劣化、低下', example: 'Environmental degradation threatens biodiversity.', category: 'current', difficulty: 4 },
  { word: 'deliberate', meaning: '意図的な、慎重に考える', example: 'It was a deliberate attempt to mislead.', category: 'society', difficulty: 3 },
  { word: 'demographic', meaning: '人口統計の', example: 'Demographic changes are reshaping the workforce.', category: 'society', difficulty: 4 },
  { word: 'depict', meaning: '描写する', example: 'The painting depicts a rural landscape.', category: 'culture', difficulty: 3 },
  { word: 'deplete', meaning: '枯渇させる', example: 'Overfishing has depleted ocean resources.', category: 'current', difficulty: 3 },
  { word: 'derive', meaning: '由来する、引き出す', example: 'Many English words derive from Latin.', category: 'history', difficulty: 3 },
  { word: 'designate', meaning: '指名する、指定する', example: 'The area was designated as a national park.', category: 'society', difficulty: 3 },
  { word: 'deteriorate', meaning: '悪化する', example: 'Relations between the countries deteriorated.', category: 'current', difficulty: 4 },
  { word: 'devise', meaning: '考案する', example: 'Scientists devised a new testing method.', category: 'science', difficulty: 3 },
  // E-Z (abbreviated for brevity - in production would have full 500)
  { word: 'diminish', meaning: '減少する', example: 'The pain gradually diminished over time.', category: 'science', difficulty: 3 },
  { word: 'disclose', meaning: '開示する', example: 'The company refused to disclose financial details.', category: 'society', difficulty: 3 },
  { word: 'discourse', meaning: '言説、談話', example: 'Academic discourse often uses specialized vocabulary.', category: 'culture', difficulty: 4 },
  { word: 'disparity', meaning: '格差', example: 'The income disparity between regions is growing.', category: 'society', difficulty: 4 },
  { word: 'disposition', meaning: '性質、配置', example: 'She has a cheerful disposition.', category: 'society', difficulty: 4 },
  { word: 'disrupt', meaning: '混乱させる', example: 'New technology often disrupts existing industries.', category: 'technology', difficulty: 3 },
  { word: 'doctrine', meaning: '教義、主義', example: 'The Monroe Doctrine shaped US foreign policy.', category: 'history', difficulty: 4 },
  { word: 'domain', meaning: '領域、分野', example: 'AI is advancing in the domain of healthcare.', category: 'technology', difficulty: 3 },
  { word: 'dormant', meaning: '休眠中の', example: 'The volcano has been dormant for centuries.', category: 'science', difficulty: 4 },
  { word: 'durable', meaning: '耐久性のある', example: 'This material is both lightweight and durable.', category: 'technology', difficulty: 3 },
];

export function getExpansionVocab() {
  return PRE1_EXPANSION;
}
