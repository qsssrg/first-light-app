export interface ListeningQuestion {
  id: string;
  type: 'eiken' | 'toefl';
  level: 'eiken2' | 'eiken_pre1' | 'toefl';
  audioText: string; // Text to be read by SpeechSynthesis
  audioTextJa?: string; // Japanese translation of audioText
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
    audioTextJa: '女性: すみません、図書館への行き方を教えていただけますか？ 男性: もちろん、2ブロック直進して信号を左折してください。右手にありますよ。',
    question: 'Where is the library?',
    options: ['On the left after two blocks', 'On the right after turning left', 'Straight ahead at the traffic light', 'Behind the traffic light'],
    correctIndex: 1,
    explanation: '聞き取れたか？ ポイントは "turn left" と "on your right" だ。方向の指示は動作と位置をセットで押さえろ。',
  },
  {
    id: 'l-eiken2-2',
    type: 'eiken',
    level: 'eiken2',
    audioText: 'Man: I heard the concert was cancelled. Woman: Actually, it was just postponed to next Saturday. The singer caught a cold. Man: Oh, that is a relief. I already bought the tickets.',
    audioTextJa: '男性: コンサートが中止になったって聞いたけど。 女性: 実は来週の土曜日に延期されただけよ。歌手が風邪をひいたの。 男性: それなら安心だ。もうチケット買っちゃったから。',
    question: 'What happened to the concert?',
    options: ['It was cancelled permanently', 'It was moved to next Saturday', 'The tickets were refunded', 'A different singer will perform'],
    correctIndex: 1,
    explanation: 'cancelled と postponed、似てるようで全然違う。postponed は「後にずらした」だけ。洋楽のライブ情報追ってると嫌でも覚えるぞ。',
  },
  {
    id: 'l-eiken2-3',
    type: 'eiken',
    level: 'eiken2',
    audioText: 'Woman: How was your job interview yesterday? Man: It went really well. They said they would contact me within a week. Woman: That sounds promising! I hope you get the offer.',
    audioTextJa: '女性: 昨日の面接はどうだった？ 男性: すごくうまくいったよ。1週間以内に連絡するって言われた。 女性: いい感じね！内定もらえるといいね。',
    question: 'What will happen within a week?',
    options: ['He will start working', 'He will have another interview', 'The company will contact him', 'He will submit more documents'],
    correctIndex: 2,
    explanation: '"contact me within a week" が聞き取れればOK。within は期限を示すときによく出る。耳が慣れてくると自然に拾えるようになる。',
  },
  // 準一級型 - やや長い会話
  {
    id: 'l-pre1-1',
    type: 'eiken',
    level: 'eiken_pre1',
    audioText: 'Professor: Today we will discuss the phenomenon of social media addiction. Research shows that the average person checks their phone 96 times a day. The dopamine release from notifications creates a feedback loop similar to gambling addiction. However, unlike substance addiction, the solution is not complete abstinence but rather mindful usage.',
    audioTextJa: '教授: 今日はSNS依存の現象について議論します。研究によると平均的な人は1日96回スマホを確認します。通知によるドーパミン放出はギャンブル依存に似たフィードバックループを生み出します。しかし物質依存とは異なり、解決策は完全な禁止ではなくマインドフルな使用です。',
    question: 'According to the professor, how does social media addiction differ from substance addiction?',
    options: ['It is less harmful', 'Complete abstinence is not the solution', 'It only affects young people', 'It does not involve dopamine'],
    correctIndex: 1,
    explanation: 'ここは対比構造だな。"unlike substance addiction" で違いを示してる。長い講義でも、対比のシグナルワードを拾えば要点がつかめる。',
  },
  {
    id: 'l-pre1-2',
    type: 'eiken',
    level: 'eiken_pre1',
    audioText: 'Woman: I have been considering switching to a plant-based diet, but I am worried about getting enough protein. Man: Actually, there are many plant sources of protein such as lentils, chickpeas, and tofu. The key is variety. If you eat a diverse range of plant foods, you can easily meet your protein needs without supplements.',
    audioTextJa: '女性: 植物性の食事に切り替えようと考えているんだけど、タンパク質が十分に取れるか心配で。 男性: 実はレンズ豆、ひよこ豆、豆腐など植物性タンパク質はたくさんあるよ。重要なのは多様性。いろいろな植物性食品を食べれば、サプリなしでも簡単にタンパク質を摂れるよ。',
    question: 'What does the man suggest about plant-based protein?',
    options: ['Supplements are necessary', 'Only tofu provides enough protein', 'Eating a variety of plant foods is sufficient', 'It is impossible to get enough protein from plants'],
    correctIndex: 2,
    explanation: '"The key is variety" ってフレーズ、会話の核心を一発で示してる。こういう決めゼリフみたいな一文を聞き逃すな。',
  },
  // TOEFL型 - レクチャー
  {
    id: 'l-toefl-1',
    type: 'toefl',
    level: 'toefl',
    audioText: 'Today I want to talk about the concept of neuroplasticity. For decades, scientists believed that the adult brain was fixed and unchangeable. But research in the 1990s overturned this assumption. We now know that the brain can reorganize itself by forming new neural connections throughout life. This has profound implications for rehabilitation after brain injuries and for education in general.',
    audioTextJa: '今日は神経可塑性の概念についてお話しします。何十年もの間、科学者たちは成人の脳は固定されて変わらないと信じていました。しかし1990年代の研究がこの仮定を覆しました。脳は生涯を通じて新しい神経結合を形成することで自己再編成できることが分かっています。これは脳損傷後のリハビリや教育全般に深い影響を持ちます。',
    question: 'What was the previous assumption about the adult brain?',
    options: ['It could grow new neurons easily', 'It was fixed and unchangeable', 'It was more plastic than children\'s brains', 'It could only change through medication'],
    correctIndex: 1,
    explanation: '講義の流れは「昔はこう思われてた→でも違った」。"overturned this assumption" が転換点だ。この構造、TOEFLでめちゃくちゃ出る。',
  },
  {
    id: 'l-toefl-2',
    type: 'toefl',
    level: 'toefl',
    audioText: 'Let me explain the tragedy of the commons. Imagine a shared pasture where every farmer can graze their cattle. Each farmer has an incentive to add more cattle because they receive all the benefit while the cost of overgrazing is shared by everyone. Eventually, the pasture is destroyed. This model, introduced by Garrett Hardin in 1968, applies to many modern environmental problems like overfishing and air pollution.',
    audioTextJa: '共有地の悲劇について説明しましょう。すべての農家が牛を放牧できる共有の牧草地を想像してください。各農家は牛を増やすインセンティブがあります。なぜなら利益は全て自分のもので、過放牧のコストは全員で分担するからです。やがて牧草地は破壊されます。1968年にギャレット・ハーディンが提唱したこのモデルは、乱獲や大気汚染など多くの現代の環境問題に当てはまります。',
    question: 'Why does each farmer add more cattle in the tragedy of the commons?',
    options: ['They want to destroy the pasture', 'Individual benefit exceeds individual cost', 'They do not know about the problem', 'The government requires it'],
    correctIndex: 1,
    explanation: '理由を聞かれたら "because" の後を集中して聴け。ここでは "they receive all the benefit while the cost is shared" が答えの根拠。',
  },
  {
    id: 'l-toefl-3',
    type: 'toefl',
    level: 'toefl',
    audioText: 'Now, regarding the Sapir-Whorf hypothesis, also known as linguistic relativity. The strong version suggests that language determines thought, meaning speakers of different languages literally perceive reality differently. The weak version, which most linguists accept today, states that language influences thought and certain kinds of cognitive processes. For example, speakers of languages with many color terms can distinguish shades more quickly.',
    audioTextJa: 'サピア・ウォーフ仮説、言語相対性仮説についてです。強い版は言語が思考を決定すると主張し、異なる言語の話者は文字通り現実を異なって知覚するとします。今日ほとんどの言語学者が受け入れている弱い版は、言語が思考や特定の認知プロセスに影響すると主張します。例えば色の用語が多い言語の話者は色合いをより素早く区別できます。',
    question: 'What does the weak version of the Sapir-Whorf hypothesis claim?',
    options: ['Language has no effect on thought', 'Language completely determines thought', 'Language influences cognitive processes', 'All languages are equally complex'],
    correctIndex: 2,
    explanation: 'strong version と weak version の違いを聴き分けるのがカギ。"determines" と "influences" は似てるけど強さが全然違う。言葉のニュアンスに敏感になれ。',
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
