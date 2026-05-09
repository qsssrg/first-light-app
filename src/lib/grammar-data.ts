export interface GrammarQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  level: 'eiken2' | 'eiken_pre1' | 'toefl';
}

export const GRAMMAR_QUESTIONS: GrammarQuestion[] = [
  {
    id: 'g1', level: 'eiken2',
    question: 'She ___ to the store yesterday.',
    options: ['go', 'goes', 'went', 'going'],
    correctIndex: 2,
    explanation: '過去の出来事なので過去形"went"が正しいです。',
  },
  {
    id: 'g2', level: 'eiken2',
    question: 'If it ___ tomorrow, we will cancel the picnic.',
    options: ['rain', 'rains', 'rained', 'will rain'],
    correctIndex: 1,
    explanation: '条件節（if節）では未来のことでも現在形を使います。',
  },
  {
    id: 'g3', level: 'eiken2',
    question: 'The book ___ by millions of people around the world.',
    options: ['has read', 'has been read', 'has been reading', 'had read'],
    correctIndex: 1,
    explanation: '本が「読まれた」という受動態。現在完了の受動態は"has been + 過去分詞"です。',
  },
  {
    id: 'g4', level: 'eiken2',
    question: 'I wish I ___ speak French fluently.',
    options: ['can', 'could', 'will', 'am able to'],
    correctIndex: 1,
    explanation: 'wishの後は仮定法過去を使うため、"could"が正しいです。',
  },
  {
    id: 'g5', level: 'eiken_pre1',
    question: 'Not only ___ the exam, but she also got the highest score.',
    options: ['she passed', 'did she pass', 'she did pass', 'passed she'],
    correctIndex: 1,
    explanation: '"Not only"が文頭に来ると倒置が起こり、"did she pass"の語順になります。',
  },
  {
    id: 'g6', level: 'eiken_pre1',
    question: 'The project, ___ was started last year, is finally complete.',
    options: ['that', 'which', 'what', 'whom'],
    correctIndex: 1,
    explanation: '非制限用法の関係代名詞はコンマ+whichを使います（thatは不可）。',
  },
  {
    id: 'g7', level: 'eiken_pre1',
    question: 'Had I known about the traffic, I ___ earlier.',
    options: ['will leave', 'would leave', 'would have left', 'had left'],
    correctIndex: 2,
    explanation: '仮定法過去完了。"Had I known"は"If I had known"の倒置形で、帰結節は"would have + 過去分詞"です。',
  },
  {
    id: 'g8', level: 'eiken_pre1',
    question: 'The teacher insisted that every student ___ the assignment on time.',
    options: ['submits', 'submitted', 'submit', 'would submit'],
    correctIndex: 2,
    explanation: 'insistの後のthat節では仮定法現在（原形）を使います。',
  },
  {
    id: 'g9', level: 'toefl',
    question: '___ the heavy rain, the outdoor concert proceeded as planned.',
    options: ['Despite', 'Although', 'Because of', 'However'],
    correctIndex: 0,
    explanation: '"Despite"は前置詞で名詞句を続けます。"Although"は接続詞で節が必要です。',
  },
  {
    id: 'g10', level: 'toefl',
    question: 'The researcher published a paper ___ findings challenged existing theories.',
    options: ['who', 'which', 'whose', 'that'],
    correctIndex: 2,
    explanation: '所有格の関係代名詞"whose"が正しいです。「その研究者の発見が」という意味になります。',
  },
  {
    id: 'g11', level: 'eiken2',
    question: 'He is ___ tallest student in our class.',
    options: ['a', 'an', 'the', '-'],
    correctIndex: 2,
    explanation: '最上級の前には定冠詞"the"を置きます。',
  },
  {
    id: 'g12', level: 'toefl',
    question: 'Were it not for the scholarship, she ___ unable to attend university.',
    options: ['will be', 'would be', 'is', 'was'],
    correctIndex: 1,
    explanation: '"Were it not for"は仮定法過去の倒置形。帰結節はwould + 原形です。',
  },
];
