export interface ReadingQuestion {
  id: string;
  passage: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  level: 'eiken2' | 'eiken_pre1' | 'toefl';
}

export const READING_QUESTIONS: ReadingQuestion[] = [
  {
    id: 'r1', level: 'eiken2',
    passage: 'The new library in our town opened last month. It has over 10,000 books and a special section for children. The library is open every day except Monday.',
    question: 'When is the library closed?',
    options: ['Every day', 'On Sundays', 'On Mondays', 'On weekends'],
    correctIndex: 2,
    explanation: '"The library is open every day except Monday."から月曜日が休館日だと分かります。',
  },
  {
    id: 'r2', level: 'eiken2',
    passage: 'Sarah wanted to buy a birthday present for her friend. She went to three different stores but could not find anything suitable. Finally, she decided to make a handmade card instead.',
    question: 'What did Sarah decide to do?',
    options: ['Buy an expensive gift', 'Go to more stores', 'Make a card by hand', 'Ask another friend for help'],
    correctIndex: 2,
    explanation: '最後に"she decided to make a handmade card instead"と決めています。',
  },
  {
    id: 'r3', level: 'eiken2',
    passage: 'Tokyo Tower was built in 1958. It is 333 meters tall, which is 13 meters taller than the Eiffel Tower in Paris. About 3 million people visit Tokyo Tower every year.',
    question: 'How tall is the Eiffel Tower?',
    options: ['333 meters', '320 meters', '346 meters', '300 meters'],
    correctIndex: 1,
    explanation: '東京タワーは333mでエッフェル塔より13m高いので、エッフェル塔は320mです。',
  },
  {
    id: 'r4', level: 'eiken_pre1',
    passage: 'Recent studies have shown that bilingual individuals may have cognitive advantages over monolinguals. Researchers found that switching between languages regularly exercises the brain in ways that can delay the onset of dementia by several years.',
    question: 'What advantage do bilingual people have according to the passage?',
    options: ['They earn more money', 'They may delay dementia', 'They learn faster', 'They have better memory in childhood'],
    correctIndex: 1,
    explanation: '研究により、2言語話者は認知症の発症を数年遅らせる可能性があることが示されています。',
  },
  {
    id: 'r5', level: 'eiken_pre1',
    passage: 'The concept of "urban farming" has gained popularity in many cities worldwide. Rooftop gardens, vertical farms, and community plots allow residents to grow fresh produce in areas where traditional agriculture is impossible.',
    question: 'What is the main topic of this passage?',
    options: ['Traditional agriculture methods', 'Growing food in cities', 'The cost of fresh produce', 'Rural farming techniques'],
    correctIndex: 1,
    explanation: '都市農業（urban farming）について、屋上菜園や垂直農法などの都市部での食料生産を説明しています。',
  },
  {
    id: 'r6', level: 'eiken_pre1',
    passage: 'Despite the widespread belief that goldfish have a three-second memory, scientific experiments have proven this to be a myth. In fact, goldfish can remember things for months and can be trained to perform simple tasks.',
    question: 'What does the passage say about goldfish memory?',
    options: ['It lasts only three seconds', 'It is worse than believed', 'It is better than commonly thought', 'It has never been studied'],
    correctIndex: 2,
    explanation: '金魚の記憶は3秒という説は誤りで、実際には数ヶ月間記憶を保持できると証明されています。',
  },
  {
    id: 'r7', level: 'toefl',
    passage: 'The discovery of penicillin by Alexander Fleming in 1928 revolutionized medicine. However, the overuse of antibiotics in recent decades has led to the emergence of antibiotic-resistant bacteria, posing a significant threat to global public health.',
    question: 'What problem has arisen from antibiotic use?',
    options: ['Penicillin is no longer effective', 'Bacteria have become resistant', 'Doctors refuse to prescribe them', 'New diseases have appeared'],
    correctIndex: 1,
    explanation: '抗生物質の過剰使用により、抗生物質耐性菌が出現し、世界的な公衆衛生上の脅威となっています。',
  },
  {
    id: 'r8', level: 'toefl',
    passage: 'Coral reefs, often called the "rainforests of the sea," support approximately 25% of all marine species despite covering less than 1% of the ocean floor. Rising ocean temperatures due to climate change are causing widespread coral bleaching events.',
    question: 'What percentage of marine species do coral reefs support?',
    options: ['Less than 1%', 'About 10%', 'About 25%', 'Over 50%'],
    correctIndex: 2,
    explanation: 'サンゴ礁は海底の1%未満しか占めていませんが、海洋生物種の約25%を支えています。',
  },
  {
    id: 'r9', level: 'eiken2',
    passage: 'Email: Dear Mr. Tanaka, I am writing to confirm your reservation at the Grand Hotel for March 15-17. Your room is a double on the 5th floor. Breakfast is included. Check-in time is 3:00 PM.',
    question: 'How many nights is the reservation for?',
    options: ['One night', 'Two nights', 'Three nights', 'Four nights'],
    correctIndex: 1,
    explanation: '3月15日から17日なので、15日と16日の2泊です。',
  },
  {
    id: 'r10', level: 'eiken_pre1',
    passage: 'The phenomenon known as "phantom vibration syndrome" occurs when people believe their phone is vibrating when it is not. A study found that 89% of university students experience this at least once every two weeks, suggesting our brains have become hyper-alert to phone notifications.',
    question: 'What causes phantom vibration syndrome?',
    options: ['A phone malfunction', 'Brain hyper-alertness to notifications', 'Poor phone signal', 'Excessive screen time'],
    correctIndex: 1,
    explanation: '脳がスマホの通知に対して過敏になっていることが原因とされています。',
  },
];
