/** Adaptive assessment questions for Eiken grade + TOEFL level determination */

export type QuestionType = 'vocab' | 'grammar' | 'reading';

export interface AssessmentQuestion {
  id: string;
  grade: string; // '5' | '4' | '3' | 'pre2' | '2' | 'pre1' | '1' | 'toefl'
  type: QuestionType;
  question: string;
  options: string[];
  correctIndex: number;
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // === 5級 ===
  { id: '5-v1', grade: '5', type: 'vocab', question: '"dog" の意味は？', options: ['犬', '猫', '鳥', '魚'], correctIndex: 0 },
  { id: '5-g1', grade: '5', type: 'grammar', question: '正しい文はどれ？', options: ['I am a student.', 'I is a student.', 'I are a student.', 'I be a student.'], correctIndex: 0 },
  { id: '5-r1', grade: '5', type: 'reading', question: '"I like apples." の意味は？', options: ['私はりんごが好きです。', '私はりんごを食べました。', '私はりんごを買います。', '私はりんごがあります。'], correctIndex: 0 },

  // === 4級 ===
  { id: '4-v1', grade: '4', type: 'vocab', question: '"experience" の意味は？', options: ['経験', '実験', '説明', '表現'], correctIndex: 0 },
  { id: '4-g1', grade: '4', type: 'grammar', question: '空欄に入るのは？ "She ___ to school every day."', options: ['goes', 'go', 'going', 'gone'], correctIndex: 0 },
  { id: '4-r1', grade: '4', type: 'reading', question: '"The train was late, so I missed the meeting." の意味は？', options: ['電車が遅れたので会議に遅刻した。', '電車が早かったので会議に間に合った。', '電車が遅れたが会議には出た。', '会議が遅れたので電車に乗った。'], correctIndex: 0 },

  // === 3級 ===
  { id: '3-v1', grade: '3', type: 'vocab', question: '"opportunity" の意味は？', options: ['機会', '反対', '操作', '意見'], correctIndex: 0 },
  { id: '3-g1', grade: '3', type: 'grammar', question: '正しい文はどれ？', options: ['If it rains, I will stay home.', 'If it rains, I stay home.', 'If it will rain, I stay home.', 'If it rained, I will stay home.'], correctIndex: 0 },
  { id: '3-r1', grade: '3', type: 'reading', question: '"Although he was tired, he continued working." これはどういう意味？', options: ['疲れていたが、働き続けた。', '疲れたので、働くのをやめた。', '働いたので疲れた。', '疲れていなかったので、働いた。'], correctIndex: 0 },

  // === 準2級 ===
  { id: 'p2-v1', grade: 'pre2', type: 'vocab', question: '"demonstrate" の意味は？', options: ['実演する・示す', '破壊する', '装飾する', '延期する'], correctIndex: 0 },
  { id: 'p2-g1', grade: 'pre2', type: 'grammar', question: '空欄に入るのは？ "The book ___ by millions of people."', options: ['has been read', 'has read', 'is reading', 'was reading'], correctIndex: 0 },
  { id: 'p2-r1', grade: 'pre2', type: 'reading', question: '"The government announced new regulations to reduce carbon emissions by 30% within the next decade." 政府の目標は？', options: ['10年以内に炭素排出を30%削減', '30年以内に排出をゼロに', '次の10年で規制を30個追加', '排出量を10%増やして調整'], correctIndex: 0 },

  // === 2級 ===
  { id: '2-v1', grade: '2', type: 'vocab', question: '"hypothesis" の意味は？', options: ['仮説', '偽善', '低体温', '催眠'], correctIndex: 0 },
  { id: '2-g1', grade: '2', type: 'grammar', question: '正しい文はどれ？', options: ['Had I known earlier, I would have acted differently.', 'Had I known earlier, I would acted differently.', 'If I had know earlier, I would have acted differently.', 'Had I knew earlier, I would have acted differently.'], correctIndex: 0 },
  { id: '2-r1', grade: '2', type: 'reading', question: '"The correlation between sleep quality and academic performance has been well documented in numerous studies." この文の要旨は？', options: ['睡眠の質と学業成績の関連は多くの研究で示されている', '睡眠の質は学業成績に影響しない', '学業成績は睡眠より遺伝が重要', '睡眠時間が長いほど成績が上がる'], correctIndex: 0 },

  // === 準1級 ===
  { id: 'p1-v1', grade: 'pre1', type: 'vocab', question: '"ubiquitous" の意味は？', options: ['遍在する（至る所にある）', '曖昧な', '唯一の', '時代遅れの'], correctIndex: 0 },
  { id: 'p1-g1', grade: 'pre1', type: 'grammar', question: '最も適切なのは？ "Not until the results were published ___ the significance of the discovery."', options: ['did they realize', 'they realized', 'they did realize', 'realized they'], correctIndex: 0 },
  { id: 'p1-r1', grade: 'pre1', type: 'reading', question: '"The paradox of choice suggests that while we assume more options lead to greater satisfaction, excessive alternatives often result in decision paralysis and diminished well-being." この「パラドックス」とは？', options: ['選択肢が多すぎると逆に満足度が下がること', '選択肢が少ないほど不満が増えること', '選択の自由がない方が幸福なこと', '全ての選択に等しい価値があること'], correctIndex: 0 },

  // === 1級 ===
  { id: '1-v1', grade: '1', type: 'vocab', question: '"sycophant" の意味は？', options: ['おべっか使い・追従者', '預言者', '慈善家', '皮肉屋'], correctIndex: 0 },
  { id: '1-g1', grade: '1', type: 'grammar', question: '最も自然な表現は？', options: ['Notwithstanding the economic downturn, the company managed to post a profit.', 'Notwithstanding the economic downturn, the company managed posting a profit.', 'Notwithstanding of the economic downturn, the company managed to post a profit.', 'Notwithstanding that the economic downturn, the company managed to post a profit.'], correctIndex: 0 },
  { id: '1-r1', grade: '1', type: 'reading', question: '"The Sapir-Whorf hypothesis posits that the structure of a language fundamentally shapes its speakers\' cognition and worldview, though the strong version of this theory—linguistic determinism—has largely been discredited in favor of linguistic relativism." この文によると、現在支持されている見解は？', options: ['言語は思考に影響するが決定はしない（言語相対論）', '言語が思考を完全に決定する（言語決定論）', 'サピア＝ウォーフ仮説は完全に否定された', '言語と思考は無関係である'], correctIndex: 0 },

  // === TOEFL ===
  { id: 't-v1', grade: 'toefl', type: 'vocab', question: '"empirical" の意味は？', options: ['経験的な・実証的な', '帝国の', '感情的な', '永遠の'], correctIndex: 0 },
  { id: 't-g1', grade: 'toefl', type: 'grammar', question: '学術文として正しいのは？', options: ['The findings suggest that further research is warranted.', 'The findings suggest that further research are warranted.', 'The findings suggests that further research is warranted.', 'The findings suggest further research being warranted.'], correctIndex: 0 },
  { id: 't-r1', grade: 'toefl', type: 'reading', question: '"The endosymbiotic theory proposes that mitochondria and chloroplasts were once free-living prokaryotes that were engulfed by ancestral eukaryotic cells, eventually evolving into organelles." この理論の主張は？', options: ['ミトコンドリアと葉緑体は元々独立した原核生物だった', 'ミトコンドリアは真核生物から進化した', '葉緑体は動物細胞にも存在した', '全ての細胞小器官は同時に発生した'], correctIndex: 0 },
];

/** Grade order for adaptive testing */
export const GRADE_ORDER = ['5', '4', '3', 'pre2', '2', 'pre1', '1', 'toefl'] as const;

export const GRADE_LABELS: Record<string, string> = {
  '5': '英検5級', '4': '英検4級', '3': '英検3級',
  'pre2': '英検準2級', '2': '英検2級', 'pre1': '英検準1級', '1': '英検1級',
  'toefl': 'TOEFL Academic',
};

export const TOEFL_SCORE_MAP: Record<string, number> = {
  '5': 20, '4': 30, '3': 42, 'pre2': 55, '2': 65, 'pre1': 85, '1': 100, 'toefl': 105,
};

/** Determine the highest grade the user can handle */
export function determineGrade(results: Record<string, { correct: number; total: number }>): {
  grade: string;
  toeflScore: number;
  details: Record<string, number>;
} {
  let highestPassed = '5';

  for (const grade of GRADE_ORDER) {
    const r = results[grade];
    if (!r || r.total === 0) continue;
    const rate = r.correct / r.total;
    if (rate >= 0.67) {
      highestPassed = grade;
    } else {
      break; // Stop at first failure
    }
  }

  const toeflScore = TOEFL_SCORE_MAP[highestPassed] ?? 30;

  const details: Record<string, number> = {};
  for (const [grade, r] of Object.entries(results)) {
    if (r.total > 0) details[grade] = Math.round((r.correct / r.total) * 100);
  }

  return { grade: highestPassed, toeflScore, details };
}
