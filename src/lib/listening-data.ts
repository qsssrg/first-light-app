export interface ListeningQuestion {
  id: string;
  type: 'eiken' | 'toefl';
  level: 'eiken2' | 'eiken_pre1' | 'toefl';
  audioText: string; // Text to be read by SpeechSynthesis
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const LISTENING_QUESTIONS: ListeningQuestion[] = [
  // 英検2級型 - 短い会話
  {
    id: 'l-eiken2-1',
    type: 'eiken',
    level: 'eiken2',
    audioText: 'Woman: Excuse me, could you tell me how to get to the library? Man: Sure, go straight for two blocks, then turn left at the traffic light. It will be on your right.',
    question: 'Where is the library?',
    options: ['On the left after two blocks', 'On the right after turning left', 'Straight ahead at the traffic light', 'Behind the traffic light'],
    correctIndex: 1,
    explanation: '男性は「2ブロック直進して信号を左折、右手にある」と説明しています。',
  },
  {
    id: 'l-eiken2-2',
    type: 'eiken',
    level: 'eiken2',
    audioText: 'Man: I heard the concert was cancelled. Woman: Actually, it was just postponed to next Saturday. The singer caught a cold. Man: Oh, that is a relief. I already bought the tickets.',
    question: 'What happened to the concert?',
    options: ['It was cancelled permanently', 'It was moved to next Saturday', 'The tickets were refunded', 'A different singer will perform'],
    correctIndex: 1,
    explanation: '女性が「来週の土曜に延期された」と説明しています。postponed = 延期。',
  },
  {
    id: 'l-eiken2-3',
    type: 'eiken',
    level: 'eiken2',
    audioText: 'Woman: How was your job interview yesterday? Man: It went really well. They said they would contact me within a week. Woman: That sounds promising! I hope you get the offer.',
    question: 'What will happen within a week?',
    options: ['He will start working', 'He will have another interview', 'The company will contact him', 'He will submit more documents'],
    correctIndex: 2,
    explanation: '男性は「1週間以内に連絡すると言われた」と述べています。',
  },
  // 準一級型 - やや長い会話
  {
    id: 'l-pre1-1',
    type: 'eiken',
    level: 'eiken_pre1',
    audioText: 'Professor: Today we will discuss the phenomenon of social media addiction. Research shows that the average person checks their phone 96 times a day. The dopamine release from notifications creates a feedback loop similar to gambling addiction. However, unlike substance addiction, the solution is not complete abstinence but rather mindful usage.',
    question: 'According to the professor, how does social media addiction differ from substance addiction?',
    options: ['It is less harmful', 'Complete abstinence is not the solution', 'It only affects young people', 'It does not involve dopamine'],
    correctIndex: 1,
    explanation: '教授は「完全な禁止ではなくマインドフルな使用が解決策」と述べています。',
  },
  {
    id: 'l-pre1-2',
    type: 'eiken',
    level: 'eiken_pre1',
    audioText: 'Woman: I have been considering switching to a plant-based diet, but I am worried about getting enough protein. Man: Actually, there are many plant sources of protein such as lentils, chickpeas, and tofu. The key is variety. If you eat a diverse range of plant foods, you can easily meet your protein needs without supplements.',
    question: 'What does the man suggest about plant-based protein?',
    options: ['Supplements are necessary', 'Only tofu provides enough protein', 'Eating a variety of plant foods is sufficient', 'It is impossible to get enough protein from plants'],
    correctIndex: 2,
    explanation: '男性は「多様な植物性食品を食べれば、サプリなしでタンパク質を摂れる」と述べています。',
  },
  // TOEFL型 - レクチャー
  {
    id: 'l-toefl-1',
    type: 'toefl',
    level: 'toefl',
    audioText: 'Today I want to talk about the concept of neuroplasticity. For decades, scientists believed that the adult brain was fixed and unchangeable. But research in the 1990s overturned this assumption. We now know that the brain can reorganize itself by forming new neural connections throughout life. This has profound implications for rehabilitation after brain injuries and for education in general.',
    question: 'What was the previous assumption about the adult brain?',
    options: ['It could grow new neurons easily', 'It was fixed and unchangeable', 'It was more plastic than children\'s brains', 'It could only change through medication'],
    correctIndex: 1,
    explanation: '教授は「何十年も大人の脳は固定されて変わらないと信じられていた」と述べています。',
  },
  {
    id: 'l-toefl-2',
    type: 'toefl',
    level: 'toefl',
    audioText: 'Let me explain the tragedy of the commons. Imagine a shared pasture where every farmer can graze their cattle. Each farmer has an incentive to add more cattle because they receive all the benefit while the cost of overgrazing is shared by everyone. Eventually, the pasture is destroyed. This model, introduced by Garrett Hardin in 1968, applies to many modern environmental problems like overfishing and air pollution.',
    question: 'Why does each farmer add more cattle in the tragedy of the commons?',
    options: ['They want to destroy the pasture', 'Individual benefit exceeds individual cost', 'They do not know about the problem', 'The government requires it'],
    correctIndex: 1,
    explanation: '各農家は「利益は全て自分のもの、コストは全員で分担」するため追加のインセンティブがあります。',
  },
  {
    id: 'l-toefl-3',
    type: 'toefl',
    level: 'toefl',
    audioText: 'Now, regarding the Sapir-Whorf hypothesis, also known as linguistic relativity. The strong version suggests that language determines thought, meaning speakers of different languages literally perceive reality differently. The weak version, which most linguists accept today, states that language influences thought and certain kinds of cognitive processes. For example, speakers of languages with many color terms can distinguish shades more quickly.',
    question: 'What does the weak version of the Sapir-Whorf hypothesis claim?',
    options: ['Language has no effect on thought', 'Language completely determines thought', 'Language influences cognitive processes', 'All languages are equally complex'],
    correctIndex: 2,
    explanation: '弱い版は「言語が思考と認知プロセスに影響する」と主張しています。',
  },
];

// Dictation exercises
export interface DictationExercise {
  id: string;
  level: 'eiken2' | 'eiken_pre1' | 'toefl';
  text: string;
  hint: string;
}

export const DICTATION_EXERCISES: DictationExercise[] = [
  { id: 'd-1', level: 'eiken2', text: 'The weather forecast says it will rain tomorrow afternoon.', hint: '天気予報に関する文です' },
  { id: 'd-2', level: 'eiken2', text: 'Could you please send me the report by Friday?', hint: 'ビジネスメールでよく使う表現です' },
  { id: 'd-3', level: 'eiken_pre1', text: 'The committee has decided to postpone the meeting until further notice.', hint: '会議の延期に関する文です' },
  { id: 'd-4', level: 'eiken_pre1', text: 'Despite the economic downturn, the company managed to increase its profits.', hint: '逆接を使った文です' },
  { id: 'd-5', level: 'toefl', text: 'The implications of this research extend far beyond the field of neuroscience.', hint: '研究の影響について述べた文です' },
];
