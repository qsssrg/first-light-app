export type SpeakingType = 'narration' | 'qa' | 'toefl';

export interface SpeakingQuestion {
  id: string;
  type: SpeakingType;
  level: 'eiken_pre1' | 'toefl';
  prompt: string;
  description: string;
  timeLimit: number; // seconds
  sampleAnswer: string;
}

export const SPEAKING_QUESTIONS: SpeakingQuestion[] = [
  // 英検準1級 ナレーション型（4コマ描写）
  {
    id: 'sp-narr-1',
    type: 'narration',
    level: 'eiken_pre1',
    prompt: 'Look at the four pictures and describe the situation in about one minute.',
    description: '場面: ある学生が図書館で勉強している。①静かに勉強中 ②友達が話しかけてくる ③周りの学生も騒がしくなる ④学生が別の静かな場所に移動する',
    timeLimit: 60,
    sampleAnswer: 'A student was studying quietly in the library. Then, a friend came and started talking to her. Gradually, other students around them also became noisy. Finally, the student decided to move to a quieter area to continue studying.',
  },
  {
    id: 'sp-narr-2',
    type: 'narration',
    level: 'eiken_pre1',
    prompt: 'Describe what is happening in the four pictures.',
    description: '場面: 会社員の朝の通勤 ①家を出る ②電車が混んでいて乗れない ③次の電車を待つ ④遅刻して上司に謝る',
    timeLimit: 60,
    sampleAnswer: 'A businessman left his house in the morning. When he arrived at the station, the train was too crowded to get on. He had to wait for the next train. As a result, he arrived late at the office and had to apologize to his boss.',
  },
  // 英検準1級 Q&A型
  {
    id: 'sp-qa-1',
    type: 'qa',
    level: 'eiken_pre1',
    prompt: 'Do you think that social media has more advantages or disadvantages for young people?',
    description: 'ソーシャルメディアが若者にとって利点が多いか欠点が多いか、自分の意見を述べてください。',
    timeLimit: 60,
    sampleAnswer: 'I think social media has more advantages for young people. First, it allows them to connect with friends and share experiences easily. Second, it provides access to educational content and diverse perspectives from around the world. However, I also think it is important to use it in moderation.',
  },
  {
    id: 'sp-qa-2',
    type: 'qa',
    level: 'eiken_pre1',
    prompt: 'Should companies allow their employees to work from home?',
    description: '企業は従業員に在宅勤務を許可すべきか、理由を添えて意見を述べてください。',
    timeLimit: 60,
    sampleAnswer: 'Yes, I believe companies should allow employees to work from home. Working from home can improve productivity because employees spend less time commuting. It also helps employees maintain a better work-life balance. Of course, some jobs require physical presence, so flexibility is key.',
  },
  {
    id: 'sp-qa-3',
    type: 'qa',
    level: 'eiken_pre1',
    prompt: 'Do you agree that learning a foreign language should be mandatory in schools?',
    description: '学校での外国語学習を必修にすべきか、意見を述べてください。',
    timeLimit: 60,
    sampleAnswer: 'Yes, I strongly agree. Learning a foreign language develops cognitive skills and cultural understanding. In today\'s globalized world, communication across cultures is essential. Starting early gives students a significant advantage in language acquisition.',
  },
  // TOEFL Speaking型
  {
    id: 'sp-toefl-1',
    type: 'toefl',
    level: 'toefl',
    prompt: 'Some people prefer to live in a big city, while others prefer a small town. Which do you prefer and why?',
    description: 'TOEFL Independent Speaking: 45秒で意見を述べてください。',
    timeLimit: 45,
    sampleAnswer: 'I prefer living in a big city for two reasons. First, cities offer more job opportunities and career growth potential. Second, there is a wider variety of cultural activities, restaurants, and entertainment options. While small towns are quieter, I value the convenience and diversity that city life provides.',
  },
  {
    id: 'sp-toefl-2',
    type: 'toefl',
    level: 'toefl',
    prompt: 'Talk about a skill you would like to learn and explain why it is important to you.',
    description: 'TOEFL Independent Speaking: 学びたいスキルとその理由を45秒で述べてください。',
    timeLimit: 45,
    sampleAnswer: 'I would like to learn data analysis. In today\'s world, data drives decision-making in almost every field. By learning to analyze data, I could better understand trends in my research and make evidence-based conclusions. This skill would also be valuable for my future career in social science.',
  },
];

export const TYPE_LABELS: Record<SpeakingType, string> = {
  narration: 'ナレーション',
  qa: 'Q&A',
  toefl: 'TOEFL Speaking',
};
