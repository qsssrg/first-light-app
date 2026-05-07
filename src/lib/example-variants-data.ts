import type { VariantMap } from './example-translations';

export const EXAMPLE_VARIANTS: VariantMap = {
  'abandon': [
    { example: 'She abandoned her old car by the roadside.', correct: '彼女は路肩に古い車を放棄した。', wrong: ['彼女は路肩で古い車を修理した。', '彼は路肩に古い車を放棄した。', '彼女は路肩に新しい車を放棄した。'] },
    { example: 'The soldiers abandoned their posts during the night.', correct: '兵士たちは夜間に持ち場を放棄した。', wrong: ['兵士たちは夜間に持ち場を守った。', '兵士たちは昼間に持ち場を放棄した。', '兵士たちは夜間に基地を放棄した。'] },
    { example: 'He could not abandon his hope of becoming a musician.', correct: '彼は音楽家になるという希望を放棄することができなかった。', wrong: ['彼は音楽家になるという希望を実現することができなかった。', '彼女は音楽家になるという希望を放棄することができなかった。', '彼は音楽家になるという夢を達成することができなかった。'] },
  ],
  'absolute': [
    { example: 'There is no absolute answer to this question.', correct: 'この質問に対して絶対的な答えはない。', wrong: ['この質問に対して相対的な答えはない。', 'この質問に対して複数の答えはない。', 'この質問に対して明確な答えはある。'] },
    { example: 'She has absolute authority over the department.', correct: '彼女はその部門に対して絶対的な権限を持っている。', wrong: ['彼女はその部門に対して限定的な権限を持っている。', '彼女はその部門に対して共有された権限を持っている。', '彼はその部門に対して絶対的な権限を持っている。'] },
    { example: 'The absolute temperature of water is measured in Kelvin.', correct: '水の絶対温度はケルビンで測定される。', wrong: ['水の相対温度はケルビンで測定される。', '水の絶対温度は摂氏で測定される。', '水の絶対圧力はケルビンで測定される。'] },
  ],
  'absorb': [
    { example: 'The sponge absorbed all the water from the sink.', correct: 'スポンジはシンクの水をすべて吸収した。', wrong: ['スポンジはシンクの水をすべて放出した。', 'タオルはシンクの水をすべて吸収した。', 'スポンジはバスタブの水をすべて吸収した。'] },
    { example: 'Students need to absorb the important information from the textbook.', correct: '学生は教科書から重要な情報を吸収する必要がある。', wrong: ['学生は教科書から重要な情報を忘れる必要がある。', '先生は教科書から重要な情報を吸収する必要がある。', '学生は教科書から不要な情報を吸収する必要がある。'] },
    { example: 'The company absorbed the smaller business into its operations.', correct: 'その会社は小さな企業を事業に吸収した。', wrong: ['その会社は大きな企業を事業に吸収した。', 'その組織は小さな企業を事業から除外した。', 'その会社は小さな企業を事業から分離した。'] },
  ],
  'abstract': [
    { example: 'The painting was very abstract.', correct: 'その絵画は非常に抽象的だった。', wrong: ['その絵画は非常に具象的だった。', 'その絵画は非常に現実的だった。', 'その彫刻は非常に抽象的だった。'] },
    { example: 'He presented an abstract concept that was difficult to understand.', correct: '彼は理解するのが難しい抽象的な概念を提示した。', wrong: ['彼は理解するのが簡単な抽象的な概念を提示した。', '彼は理解するのが難しい具体的な概念を提示した。', '彼女は理解するのが難しい抽象的な概念を提示した。'] },
    { example: 'The abstract of the research paper summarizes the main findings.', correct: 'その研究論文の要約は主な発見をまとめている。', wrong: ['その研究論文の要約は詳細な内容をまとめている。', 'その研究論文の導入は主な発見をまとめている。', 'その研究論文の要約は矛盾する発見をまとめている。'] },
  ],
  'abundance': [
    { example: 'There is an abundance of fresh fruit at the market.', correct: '市場には新鮮な果物が豊富にある。', wrong: ['市場には新鮮な果物が不足している。', '市場には古い果物が豊富にある。', '市場には新鮮な野菜が豊富にある。'] },
    { example: 'The region enjoys an abundance of natural resources.', correct: 'その地域は天然資源が豊富である。', wrong: ['その地域は天然資源が限定されている。', 'その地域は人工資源が豊富である。', 'その都市は天然資源が豊富である。'] },
    { example: 'An abundance of opportunities awaits graduates in technology.', correct: 'テクノロジー分野の卒業生には豊富なチャンスが待っている。', wrong: ['テクノロジー分野の学生には豊富なチャンスが待っている。', 'テクノロジー分野の卒業生には限定的なチャンスが待っている。', '医学分野の卒業生には豊富なチャンスが待っている。'] },
  ],
  'accompany': [
    { example: 'The teacher accompanied the students on their school trip.', correct: '教師は学校の旅行で学生に同行した。', wrong: ['教師は学校の旅行で学生から離れた。', '親は学校の旅行で学生に同行した。', '教師は家族の旅行で学生に同行した。'] },
    { example: 'The musician accompanied the singer with a piano.', correct: '音楽家はピアノで歌手に伴奏した。', wrong: ['音楽家はギターで歌手に伴奏した。', '音楽家はピアノで歌手と競争した。', '歌手はピアノで音楽家に伴奏した。'] },
    { example: 'She will accompany you to the doctor\'s appointment.', correct: '彼女は医者の予約に同行します。', wrong: ['彼女は医者の予約をキャンセルします。', '彼はあなたを医者の予約に同行します。', '彼女は医者の予約から離れます。'] },
  ],
  'accomplishment': [
    { example: 'Completing the marathon was a major accomplishment for him.', correct: 'マラソンを完走することは彼にとって大きな業績だった。', wrong: ['マラソンを完走することは彼にとって大きな失敗だった。', 'マラソンに参加することは彼にとって大きな業績だった。', 'マラソンを放棄することは彼にとって大きな業績だった。'] },
    { example: 'The team\'s accomplishment in winning the championship was celebrated nationwide.', correct: '選手権に優勝したチームの業績は全国で祝われた。', wrong: ['選手権に敗北したチームの業績は全国で祝われた。', '選手権に優勝した個人の業績は全国で祝われた。', '選手権に参加したチームの業績は全国で祝われた。'] },
    { example: 'Writing a novel is considered a significant accomplishment.', correct: '小説を書くことは重要な業績と考えられている。', wrong: ['小説を読むことは重要な業績と考えられている。', '詩を書くことは重要な業績と考えられている。', '小説を書くことは簡単な業績と考えられている。'] },
  ],
  'accumulate': [
    { example: 'Over the years, she accumulated a large collection of books.', correct: '長年にわたって、彼女は大量の本のコレクションを蓄積した。', wrong: ['長年にわたって、彼女は大量の本のコレクションを破棄した。', '短期間にわたって、彼女は大量の本のコレクションを蓄積した。', '長年にわたって、彼は大量の本のコレクションを蓄積した。'] },
    { example: 'Snow accumulated on the rooftop throughout the winter.', correct: '冬を通じて、雪は屋根に蓄積した。', wrong: ['夏を通じて、雪は屋根に蓄積した。', '冬を通じて、雨は屋根に蓄積した。', '冬を通じて、雪は屋根から溶けた。'] },
    { example: 'If you don\'t pay your bills, interest will accumulate quickly.', correct: '請求書を支払わないと、利息は急速に蓄積する。', wrong: ['請求書を支払うと、利息は急速に蓄積する。', '請求書を支払わないと、利息は徐々に減少する。', '請求書を支払わないと、手数料は急速に蓄積する。'] },
  ],
  'accurate': [
    { example: 'The report provides accurate information.', correct: 'そのレポートは正確な情報を提供している。', wrong: ['そのレポートは誤った情報を提供している。', 'そのレポートは曖昧な情報を提供している。', 'そのレポートは不完全な情報を提供している。'] },
    { example: 'His predictions were accurate.', correct: '彼の予測は正確だった。', wrong: ['彼の予測は不正確だった。', '彼の予測は推測だった。', '彼女の予測は正確だった。'] },
    { example: 'We need accurate measurements for this experiment.', correct: 'この実験には正確な測定が必要だ。', wrong: ['この実験には大まかな測定が必要だ。', 'この実験には推定された測定が必要だ。', 'この実験には概算の測定が必要だ。'] },
  ],
  'acquisition': [
    { example: 'The company announced the acquisition of a smaller competitor.', correct: 'その会社は小さなライバル企業の取得を発表した。', wrong: ['その会社は小さなライバル企業の売却を発表した。', 'その個人は小さなライバル企業の取得を発表した。', 'その会社は大きなライバル企業の取得を発表した。'] },
    { example: 'Skill acquisition requires consistent practice and dedication.', correct: 'スキルの習得には継続的な練習と献身が必要である。', wrong: ['スキルの忘却には継続的な練習と献身が必要である。', '知識の習得には継続的な練習と献身が必要である。', 'スキルの習得には短期的な練習と献身が必要である。'] },
    { example: 'The museum\'s recent acquisition of ancient artifacts enriched its collection.', correct: '博物館の最近の古代遺物の取得はその収蔵品を豊かにした。', wrong: ['博物館の最近の古代遺物の売却はその収蔵品を豊かにした。', '博物館の最近の現代美術の取得はその収蔵品を豊かにした。', 'ギャラリーの最近の古代遺物の取得はその収蔵品を豊かにした。'] },
  ],
  'adapt': [
    { example: 'Fish adapt to different water temperatures to survive.', correct: '魚は生き残るために異なる水温に適応する。', wrong: ['魚は生き残るために異なる水温を避ける。', '鳥は生き残るために異なる水温に適応する。', '魚は死ぬために異なる水温に適応する。'] },
    { example: 'The refugees had to adapt to their new country\'s culture.', correct: '難民は新しい国の文化に適応しなければならなかった。', wrong: ['難民は新しい国の文化を拒否しなければならなかった。', '移民は新しい国の文化に適応しなければならなかった。', '難民は古い国の文化に適応しなければならなかった。'] },
    { example: 'The company adapted its business strategy to compete in the market.', correct: 'その会社は市場で競争するために事業戦略を適応させた。', wrong: ['その会社は市場で競争するために事業戦略を放棄した。', 'その組織は市場で競争するために事業戦略を適応させた。', 'その会社は市場から撤退するために事業戦略を適応させた。'] },
  ],
  'adequate': [
    { example: 'We need adequate funding for the project.', correct: 'このプロジェクトには十分な資金が必要だ。', wrong: ['このプロジェクトには不十分な資金が必要だ。', 'このプロジェクトには最大限の資金が必要だ。', 'このプロジェクトには最小限の資金が必要だ。'] },
    { example: 'The hotel provides adequate accommodations for guests.', correct: 'そのホテルは客のために十分な宿泊施設を提供している。', wrong: ['そのホテルは客のために不十分な宿泊施設を提供している。', 'そのホテルは客のために豪華な宿泊施設を提供している。', 'そのホテルは従業員のために十分な宿泊施設を提供している。'] },
    { example: 'His salary is adequate for his needs.', correct: '彼の給料は彼のニーズに十分だ。', wrong: ['彼の給料は彼のニーズに不十分だ。', '彼の給料は彼の欲望に十分だ。', '彼女の給料は彼のニーズに十分だ。'] },
  ],
  'adjust': [
    { example: 'Please adjust the mirror so you can see better.', correct: 'よく見えるようにミラーを調整してください。', wrong: ['よく見えないようにミラーを調整してください。', 'よく聞こえるようにミラーを調整してください。', 'よく見えるようにライトを調整してください。'] },
    { example: 'The tailor adjusted the length of my pants.', correct: '仕立屋は私のズボンの長さを調整した。', wrong: ['仕立屋は私のズボンの長さを短くした。', '仕立屋は私のシャツの長さを調整した。', '裁断師は私のズボンの長さを調整した。'] },
    { example: 'Workers adjusted the equipment to meet safety standards.', correct: '作業者は安全基準を満たすために機器を調整した。', wrong: ['作業者は安全基準を無視するために機器を調整した。', '職人は安全基準を満たすために機器を調整した。', '作業者は安全基準を満たすために工具を調整した。'] },
  ],
  'advance': [
    { example: 'The army advanced toward the enemy\'s position.', correct: '軍隊は敵の陣地に向かって前進した。', wrong: ['軍隊は敵の陣地から後退した。', '海軍は敵の陣地に向かって前進した。', '軍隊は味方の陣地に向かって前進した。'] },
    { example: 'Medical science has advanced significantly in recent decades.', correct: '医学は近年大幅に進歩した。', wrong: ['医学は近年大幅に衰退した。', '物理学は近年大幅に進歩した。', '医学は遠い過去に大幅に進歩した。'] },
    { example: 'She advanced her career by earning additional qualifications.', correct: '彼女は追加の資格を取得することで、キャリアを前進させた。', wrong: ['彼女は追加の資格を取得することで、キャリアを後退させた。', '彼は追加の資格を取得することで、キャリアを前進させた。', '彼女は既存の資格を失うことで、キャリアを前進させた。'] },
  ],
  'advocate': [
    { example: 'Environmental groups advocate for stricter pollution regulations.', correct: '環境団体は厳しい汚染規制を提唱している。', wrong: ['環境団体は緩い汚染規制を提唱している。', '産業団体は厳しい汚染規制を提唱している。', '環境団体は汚染規制の廃止を提唱している。'] },
    { example: 'The lawyer advocated for his client in court.', correct: '弁護士は法廷で依頼人のために主張した。', wrong: ['弁護士は法廷で反対者のために主張した。', '裁判官は法廷で依頼人のために主張した。', '弁護士は法廷で依頼人に対抗した。'] },
    { example: 'She advocates for better education policies in schools.', correct: '彼女は学校でより良い教育政策を提唱している。', wrong: ['彼女は学校でより悪い教育政策を提唱している。', '彼は学校でより良い教育政策を提唱している。', '彼女は企業でより良い教育政策を提唱している。'] },
  ],
  'affect': [
    { example: 'The weather affects our mood.', correct: '天気は私たちの気分に影響を与える。', wrong: ['天気は私たちの気分を変える。', '天気は私たちの気分に関係がない。', '天気は私たちの気分を作る。'] },
    { example: 'His emotional speech affected the audience deeply.', correct: '彼の感動的なスピーチは聴衆に深く影響を与えた。', wrong: ['彼の感動的なスピーチは聴衆を感動させた。', '彼の感動的なスピーチは聴衆に深く関係した。', '彼の感動的なスピーチは聴衆に深く影響した。'] },
    { example: 'The new policy will not affect existing contracts.', correct: '新しいポリシーは既存の契約に影響を与えない。', wrong: ['新しいポリシーは既存の契約を変えない。', '新しいポリシーは既存の契約に関係しない。', '新しいポリシーは既存の契約に影響をしない。'] },
  ],
  'aggressive': [
    { example: 'The dog became aggressive.', correct: 'その犬は攻撃的になった。', wrong: ['その犬は友好的になった。', 'その犬は怖がるようになった。', 'その猫は攻撃的になった。'] },
    { example: 'The company used aggressive marketing tactics.', correct: 'その企業は攻撃的なマーケティング戦略を使用した。', wrong: ['その企業は穏やかなマーケティング戦略を使用した。', 'その企業は控えめなマーケティング戦略を使用した。', 'その企業は受動的なマーケティング戦略を使用した。'] },
    { example: 'His aggressive tone made everyone uncomfortable.', correct: '彼の攻撃的な口調は誰もが不快に感じた。', wrong: ['彼の親切な口調は誰もが不快に感じた。', '彼の攻撃的な口調は誰もが快適に感じた。', '彼女の攻撃的な口調は誰もが不快に感じた。'] },
  ],
  'alter': [
    { example: 'The accident altered the course of his life.', correct: 'その事故は彼の人生の進路を変えた。', wrong: ['その事故は彼の人生の進路に影響を与えた。', 'その事故は彼の人生を台無しにした。', 'その事故は彼の人生の進路を中断した。'] },
    { example: 'She altered her dress to fit better.', correct: '彼女はドレスをもっとよく合うように変えた。', wrong: ['彼女はドレスをもっとよく合うように修理した。', '彼女はドレスをもっとよく合うように調整した。', '彼女はドレスをもっとよく合うように改造した。'] },
    { example: 'Don\'t alter the document without permission.', correct: '許可なしに文書を変えてはいけない。', wrong: ['許可なしに文書を編集してはいけない。', '許可なしに文書を改ざんしてはいけない。', '許可なしに文書を修正してはいけない。'] },
  ],
  'ambassador': [
    { example: 'The US ambassador to Japan attended the diplomatic conference.', correct: '駐日米国大使はその外交会議に出席した。', wrong: ['駐日米国大使はその外交会議に欠席した。', '駐日日本大使はその外交会議に出席した。', '駐日米国領事はその外交会議に出席した。'] },
    { example: 'She serves as an ambassador for environmental conservation.', correct: '彼女は環境保全の大使として活動している。', wrong: ['彼女は環境破壊の大使として活動している。', '彼は環境保全の大使として活動している。', '彼女は文化保全の大使として活動している。'] },
    { example: 'The famous athlete became an ambassador for youth sports programs.', correct: 'その有名なアスリートは青少年スポーツプログラムの大使になった。', wrong: ['その有名な政治家は青少年スポーツプログラムの大使になった。', 'その有名なアスリートは青少年教育プログラムの大使になった。', 'その無名なアスリートは青少年スポーツプログラムの大使になった。'] },
  ],
  'ambiguous': [
    { example: 'The law is ambiguous on this point.', correct: 'その法律はこの点で曖昧だ。', wrong: ['その法律はこの点で明確だ。', 'その法律はこの点で厳しい。', 'その規則はこの点で曖昧だ。'] },
    { example: 'Her response was ambiguous and difficult to interpret.', correct: '彼女の応答は曖昧で解釈が難しかった。', wrong: ['彼女の応答は明白で解釈が難しかった。', '彼女の応答は曖昧で解釈が簡単だった。', '彼の応答は曖昧で解釈が難しかった。'] },
    { example: 'The statement is ambiguous and could mean multiple things.', correct: 'その声明は曖昧であり、複数の意味を持つ可能性がある。', wrong: ['その声明は明確であり、複数の意味を持つ可能性がある。', 'その声明は曖昧であり、一つの意味だけを持つ可能性がある。', 'その発言は曖昧であり、複数の意味を持つ可能性がある。'] },
  ],
  'analyze': [
    { example: 'Scientists analyzed the data carefully.', correct: '科学者たちは慎重にデータを分析した。', wrong: ['科学者たちは慎重にデータを調べた。', '科学者たちは慎重にデータを研究した。', '科学者たちは慎重にデータを検討した。'] },
    { example: 'The teacher will analyze your essay for grammar mistakes.', correct: '先生はあなたのエッセイの文法の誤りを分析する。', wrong: ['先生はあなたのエッセイの文法の誤りを修正する。', '先生はあなたのエッセイの文法の誤りを見つける。', '先生はあなたのエッセイの文法の誤りをチェックする。'] },
    { example: 'Let\'s analyze the situation before making a decision.', correct: '決定を下す前に状況を分析しましょう。', wrong: ['決定を下す前に状況を理解しましょう。', '決定を下す前に状況を考えましょう。', '決定を下す前に状況を判断しましょう。'] },
  ],
  'apparent': [
    { example: 'It was apparent that he was lying.', correct: '彼が嘘をついていることは明白だった。', wrong: ['彼が嘘をついていることは隠されていた。', '彼が本当のことを言っていることは明白だった。', '彼が嘘をついているかもしれないことは明白だった。'] },
    { example: 'The apparent reason for her absence was illness.', correct: '彼女の欠席の見かけの理由は病気だった。', wrong: ['彼女の欠席の明らかな理由は健康だった。', '彼の欠席の見かけの理由は病気だった。', '彼女の出席の見かけの理由は病気だった。'] },
    { example: 'There is no apparent solution to this problem.', correct: 'この問題には明白な解決策がない。', wrong: ['この問題には明白な原因がない。', 'その問題には明白な解決策がない。', 'この問題には明白な解決策が多くある。'] },
  ],
  'artificial': [
    { example: 'This lake is artificial.', correct: 'この湖は人工的なものだ。', wrong: ['この湖は天然のものだ。', 'この川は人工的なものだ。', 'その湖は人工的なものだ。'] },
    { example: 'The flowers in the vase are artificial.', correct: '花瓶の花は造花だ。', wrong: ['花瓶の花は本物だ。', 'バケツの花は造花だ。', '花瓶の植物は造花だ。'] },
    { example: 'Artificial intelligence is changing the world.', correct: '人工知能は世界を変えている。', wrong: ['天然知能は世界を変えている。', '人工知能は世界を保護している。', '人工的な愚かさは世界を変えている。'] },
  ],
  'assemble': [
    { example: 'Workers assembled the parts in the factory.', correct: '労働者は工場で部品を組み立てた。', wrong: ['労働者は工場で部品を製造した。', '労働者は工場で部品を組織した。', '労働者は工場で部品を集めた。'] },
    { example: 'The audience assembled in the auditorium.', correct: '聴衆は講堂に集まった。', wrong: ['聴衆は講堂に組み立てられた。', '聴衆は講堂に配置された。', '聴衆は講堂に座った。'] },
    { example: 'Please assemble the furniture according to the instructions.', correct: '説明書に従って家具を組み立ててください。', wrong: ['説明書に従って家具を修理してください。', '説明書に従って家具を設置してください。', '説明書に従って家具を調整してください。'] },
  ],
  'assign': [
    { example: 'The teacher assigned homework to the class.', correct: '先生はクラスに宿題を割り当てた。', wrong: ['先生はクラスに宿題を与えた。', '先生はクラスに宿題を出した。', '先生はクラスに宿題を配った。'] },
    { example: 'She was assigned a new office on the third floor.', correct: '彼女は3階の新しいオフィスを割り当てられた。', wrong: ['彼女は3階の新しいオフィスを与えられた。', '彼女は3階の新しいオフィスを配置された。', '彼女は3階の新しいオフィスを提供された。'] },
    { example: 'Assign each team member a specific task.', correct: '各チームメンバーに特定のタスクを割り当てる。', wrong: ['各チームメンバーに特定のタスクを与える。', '各チームメンバーに特定のタスクを指定する。', '各チームメンバーに特定のタスクを提供する。'] },
  ],
  'assume': [
    { example: 'I assumed he was coming to the party.', correct: '私は彼がパーティーに来ると仮定した。', wrong: ['私は彼がパーティーに来ると思った。', '私は彼がパーティーに来ると信じた。', '私は彼がパーティーに来ると推測した。'] },
    { example: 'Don\'t assume all people think the same way.', correct: 'すべての人が同じ方法で考えると仮定しないでください。', wrong: ['すべての人が同じ方法で考えると信じないでください。', 'すべての人が同じ方法で考えると思わないでください。', 'すべての人が同じ方法で考えると推測しないでください。'] },
    { example: 'She will assume the role of manager next month.', correct: '彼女は来月マネージャーの役割を引き受ける。', wrong: ['彼女は来月マネージャーの役割を取る。', '彼女は来月マネージャーの役割を仮定する。', '彼女は来月マネージャーの役割を担当する。'] },
  ],
  'assumption': [
    { example: 'We should not make assumptions based on someone\'s appearance.', correct: '誰かの外見に基づいて仮定をするべきではない。', wrong: ['誰かの外見に基づいて事実をするべきではない。', '誰かの名前に基づいて仮定をするべきではない。', '誰かの外見に基づいて確認をするべきではない。'] },
    { example: 'The study was based on the assumption that all participants were honest.', correct: 'その研究は全ての参加者が正直であるという仮定に基づいていた。', wrong: ['その研究は全ての参加者が不正直であるという仮定に基づいていた。', 'その調査は全ての参加者が正直であるという仮定に基づいていた。', 'その研究は一部の参加者が正直であるという仮定に基づいていた。'] },
    { example: 'His assumption that she would agree turned out to be wrong.', correct: '彼女が同意するだろうという彼の仮定は間違っていた。', wrong: ['彼女が同意するだろうという彼の確実性は間違っていた。', '彼が同意するだろうという彼の仮定は間違っていた。', '彼女が反対するだろうという彼の仮定は間違っていた。'] },
  ],
  'assure': [
    { example: 'I assure you this is safe.', correct: 'これは安全であることを保証します。', wrong: ['これは安全であることを確認します。', 'これは安全であることを約束します。', 'これは安全であることを確かにします。'] },
    { example: 'The manager assured the employees that their jobs were secure.', correct: 'マネージャーは従業員に彼らの仕事が安全であることを保証した。', wrong: ['マネージャーは従業員に彼らの仕事が安全であることを約束した。', 'マネージャーは従業員に彼らの仕事が安全であることを確認した。', 'マネージャーは従業員に彼らの仕事が安全であることを信じさせた。'] },
    { example: 'Rest assured, everything will be fine.', correct: 'ご安心ください、すべてがうまくいきます。', wrong: ['確実に、すべてがうまくいきます。', '約束します、すべてがうまくいきます。', '信じてください、すべてがうまくいきます。'] },
  ],
  'authentic': [
    { example: 'This is an authentic Italian restaurant.', correct: 'これは本物のイタリア料理店だ。', wrong: ['これは本物のフランス料理店だ。', 'あれは本物のイタリア料理店だ。', 'これは偽物のイタリア料理店だ。'] },
    { example: 'The document appears to be authentic.', correct: 'その文書は本物のように見える。', wrong: ['その文書は偽物のように見える。', 'その手紙は本物のように見える。', 'その報告書は本物ではなく見える。'] },
    { example: 'She wore an authentic kimono to the festival.', correct: '彼女は祭りに本物の着物を着て行った。', wrong: ['彼女は祭りに偽物の着物を着て行った。', '彼は祭りに本物の着物を着て行った。', '彼女は祭りに本物の浴衣を着て行った。'] },
  ],
  'ban': [
    { example: 'Smoking is banned in public places.', correct: '公共の場所での喫煙は禁止されている。', wrong: ['公共の場所での喫煙は許可されていない。', '公共の場所での喫煙は制限されている。', '公共の場所での喫煙は禁じられている。'] },
    { example: 'The government banned the use of plastic bags.', correct: '政府はプラスチック袋の使用を禁止した。', wrong: ['政府はプラスチック袋の使用を制限した。', '政府はプラスチック袋の使用を廃止した。', '政府はプラスチック袋の使用を禁じた。'] },
    { example: 'He was banned from the stadium for violent behavior.', correct: '彼は暴力的な行為のためにスタジアムへの出入りを禁止された。', wrong: ['彼は暴力的な行為のためにスタジアムから追放された。', '彼は暴力的な行為のためにスタジアムへの立ち入りを禁じられた。', '彼は暴力的な行為のためにスタジアムから除外された。'] },
  ],
  'barrier': [
    { example: 'Language is a significant barrier to international business.', correct: '言語は国際ビジネスへの大きな障壁である。', wrong: ['言語は国際ビジネスへの大きな助けである。', '文化は国際ビジネスへの大きな障壁である。', '言語は国内ビジネスへの大きな障壁である。'] },
    { example: 'The security barrier prevents unauthorized access to the building.', correct: 'セキュリティ障壁は建物への無許可アクセスを防止する。', wrong: ['セキュリティ障壁は建物への無許可アクセスを許可する。', 'セキュリティドアは建物への無許可アクセスを防止する。', 'セキュリティ障壁は建物への許可されたアクセスを防止する。'] },
    { example: 'Economic barriers make it difficult for small businesses to enter the market.', correct: '経済的な障壁は小規模企業の市場参入を困難にする。', wrong: ['経済的な支援は小規模企業の市場参入を困難にする。', '経済的な障壁は大規模企業の市場参入を困難にする。', '法的な障壁は小規模企業の市場参入を困難にする。'] },
  ],
  'biological': [
    { example: 'Biological research has made great progress.', correct: '生物学的研究は大きな進歩を遂げた。', wrong: ['生物学的研究は大きな後退をした。', '物理学的研究は大きな進歩を遂げた。', '生物学的実験は大きな進歩を遂げた。'] },
    { example: 'He has no biological connection to the family.', correct: '彼は家族と生物学的な繋がりはない。', wrong: ['彼は家族と遺伝的な繋がりがある。', '彼は家族と社会的な繋がりはない。', '彼女は家族と生物学的な繋がりはない。'] },
    { example: 'Biological diversity is crucial for the ecosystem.', correct: '生物多様性は生態系にとって重要だ。', wrong: ['生物多様性は生態系にとって有害だ。', '文化的多様性は生態系にとって重要だ。', '生物の単一性は生態系にとって重要だ。'] },
  ],
  'boundary': [
    { example: 'The river forms a natural boundary between the two states.', correct: 'その川は2つの州の間の自然な境界を形成している。', wrong: ['その川は2つの州の間の人工的な境界を形成している。', 'その山は2つの州の間の自然な境界を形成している。', 'その川は2つの国の間の自然な境界を形成している。'] },
    { example: 'It is important to establish clear boundaries in relationships.', correct: '関係において明確な境界を設定することは重要である。', wrong: ['関係において曖昧な境界を設定することは重要である。', '相互作用において明確な境界を設定することは重要である。', '関係において明確な制限を設定することは重要である。'] },
    { example: 'The property boundary is marked by a fence.', correct: 'その財産の境界はフェンスで示されている。', wrong: ['その財産の限界はフェンスで示されている。', 'その建物の境界はフェンスで示されている。', 'その財産の境界は壁で示されている。'] },
  ],
  'broadcast': [
    { example: 'The game was broadcast live on TV.', correct: 'その試合はテレビで生放送された。', wrong: ['その試合はテレビで録画放送された。', 'その試合はラジオで生放送された。', 'その試合はテレビで放映禁止された。'] },
    { example: 'The radio station broadcasts news every hour.', correct: 'そのラジオ局は毎時間ニュースを放送している。', wrong: ['そのテレビ局は毎時間ニュースを放送している。', 'そのラジオ局は毎日ニュースを放送している。', 'そのラジオ局は毎時間ニュースを配信している。'] },
    { example: 'She decided to broadcast her views on social media.', correct: '彼女はソーシャルメディアで自分の見解を発表することにした。', wrong: ['彼女はソーシャルメディアで他人の見解を発表することにした。', '彼女はブログで自分の見解を発表することにした。', '彼女はソーシャルメディアで自分の意見を隠すことにした。'] },
  ],
  'calculate': [
    { example: 'She calculated the total cost.', correct: '彼女は総費用を計算した。', wrong: ['彼女は総収入を計算した。', '彼は総費用を計算した。', '彼女は総費用を推定した。'] },
    { example: 'The engineer calculated the bridge\'s strength.', correct: 'エンジニアは橋の強度を計算した。', wrong: ['エンジニアは橋の高さを計算した。', '建築家は橋の強度を計算した。', 'エンジニアは橋の強度を測定した。'] },
    { example: 'We need to calculate how many days until the deadline.', correct: '締め切りまで何日あるかを計算する必要がある。', wrong: ['締め切りまで何時間あるかを計算する必要がある。', '締め切り後何日経ったかを計算する必要がある。', '締め切りまでの日数を推測する必要がある。'] },
  ],
  'candidate': [
    { example: 'There are three qualified candidates for the CEO position.', correct: 'CEO職には3人の適格な候補者がいる。', wrong: ['CEO職には3人の不適格な候補者がいる。', 'CEO職には3人の適格な申請者がいる。', 'COO職には3人の適格な候補者がいる。'] },
    { example: 'The presidential candidate visited several cities during the campaign.', correct: 'その大統領候補者はキャンペーン中に数都市を訪問した。', wrong: ['その大統領当選者はキャンペーン中に数都市を訪問した。', 'その知事候補者はキャンペーン中に数都市を訪問した。', 'その大統領候補者はキャンペーン後に数都市を訪問した。'] },
    { example: 'She is a strong candidate for the scholarship.', correct: '彼女はその奨学金の強い候補者である。', wrong: ['彼女はその奨学金の弱い候補者である。', '彼はその奨学金の強い候補者である。', '彼女はその賞金の強い候補者である。'] },
  ],
  'capacity': [
    { example: 'The stadium has a capacity of 50,000.', correct: 'スタジアムの収容能力は50,000人です。', wrong: ['スタジアムの収容能力は50,000台です。', 'スタジアムの容積は50,000人です。', 'スタジアムの最大速度は50,000人です。'] },
    { example: 'She has the capacity to become a great leader.', correct: '彼女は偉大なリーダーになる能力を持っています。', wrong: ['彼女は偉大なリーダーになる容量を持っています。', '彼は偉大なリーダーになる能力を持っています。', '彼女は優れたリーダーになる能力を持っています。'] },
    { example: 'The factory is operating at full capacity.', correct: 'その工場は最大能力で稼働しています。', wrong: ['その工場は最大容積で稼働しています。', 'その工場は完全な容量で稼働しています。', 'その工場は最大速度で稼働しています。'] },
  ],
  'capture': [
    { example: 'The photo captured a beautiful sunset.', correct: 'その写真は美しい夕焼けをとらえた。', wrong: ['その写真は美しい日の出をとらえた。', 'その動画は美しい夕焼けをとらえた。', 'その写真は醜い夕焼けをとらえた。'] },
    { example: 'The soldiers captured the enemy fortress.', correct: '兵士たちは敵の要塞を占領した。', wrong: ['兵士たちは味方の要塞を占領した。', '兵士たちは敵の要塞を守った。', '警察は敵の要塞を占領した。'] },
    { example: 'The filmmaker captured the essence of the story.', correct: 'その映画製作者はその物語の本質をとらえた。', wrong: ['その映画製作者はその物語のプロットをとらえた。', 'その脚本家はその物語の本質をとらえた。', 'その映画製作者はその物語の詳細を説明した。'] },
  ],
  'category': [
    { example: 'The products are divided into categories.', correct: '製品は部門に分けられています。', wrong: ['製品は分類に分けられています。', '商品は部門に分けられています。', '製品は種類に分けられています。'] },
    { example: 'This book falls into the fiction category.', correct: 'この本は小説の部門に入ります。', wrong: ['この本は小説の分野に入ります。', 'この雑誌は小説の部門に入ります。', 'この本は非小説の部門に入ります。'] },
    { example: 'The award winners were announced by category.', correct: '受賞者は部門ごとに発表されました。', wrong: ['受賞者は分類ごとに発表されました。', '受賞者は順番ごとに発表されました。', '入選者は部門ごとに発表されました。'] },
  ],
  'chronic': [
    { example: 'She suffers from chronic back pain.', correct: '彼女は慢性的な腰痛に苦しんでいる。', wrong: ['彼女は急性的な腰痛に苦しんでいる。', '彼は慢性的な腰痛に苦しんでいる。', '彼女は慢性的な頭痛に苦しんでいる。'] },
    { example: 'The city faces chronic traffic problems.', correct: 'その都市は慢性的な交通問題に直面している。', wrong: ['その都市は一時的な交通問題に直面している。', 'その町は慢性的な交通問題に直面している。', 'その都市は慢性的な住宅問題に直面している。'] },
    { example: 'He has a chronic smoking habit.', correct: '彼は慢性的な喫煙習慣がある。', wrong: ['彼は一時的な喫煙習慣がある。', '彼女は慢性的な喫煙習慣がある。', '彼は慢性的な飲酒習慣がある。'] },
  ],
  'circulate': [
    { example: 'Blood circulates through the body.', correct: '血液は体全体を循環する。', wrong: ['リンパ液は体全体を循環する。', '血液は心臓を循環する。', '血液は体全体に流れ込む。'] },
    { example: 'The rumor circulated throughout the office.', correct: 'そのうわさはオフィス全体に広がった。', wrong: ['そのニュースはオフィス全体に広がった。', 'そのうわさは部門全体に広がった。', 'そのうわさはオフィス全体に隠された。'] },
    { example: 'The librarian will circulate the new books to all branches.', correct: '図書館員は新しい本をすべての支店に配布するだろう。', wrong: ['図書館員は古い本をすべての支店に配布するだろう。', '司書は新しい本をすべての支店に返却するだろう。', '図書館員は新しい本を本部に配布するだろう。'] },
  ],
  'circumstance': [
    { example: 'Under the circumstances, we had no choice.', correct: 'その状況下では、我々に選択肢はありませんでした。', wrong: ['その状況下では、我々に機会がありませんでした。', 'その環境下では、我々に選択肢はありませんでした。', 'この状況下では、彼らに選択肢はありませんでした。'] },
    { example: 'His financial circumstances improved greatly.', correct: '彼の経済状況は大いに改善しました。', wrong: ['彼の経済状態は大いに改善しました。', '彼女の経済状況は大いに改善しました。', '彼の財政環境は大いに改善しました。'] },
    { example: 'Due to unforeseen circumstances, the event was cancelled.', correct: '予期しない状況のため、イベントはキャンセルされました。', wrong: ['予期しない事態のため、イベントはキャンセルされました。', '予期しない状況のため、行事は中止されました。', '予期しない環境のため、イベントはキャンセルされました。'] },
  ],
  'civil': [
    { example: 'Civil rights are fundamental in a democracy.', correct: '市民的権利は民主主義において基本的だ。', wrong: ['市民的権利は独裁主義において基本的だ。', '政治的権利は民主主義において基本的だ。', '市民的責務は民主主義において基本的だ。'] },
    { example: 'They resolved their dispute through civil litigation.', correct: '彼らは民事訴訟を通じて紛争を解決した。', wrong: ['彼らは刑事訴訟を通じて紛争を解決した。', '彼女らは民事訴訟を通じて紛争を解決した。', '彼らは民事調停を通じて紛争を解決した。'] },
    { example: 'Despite their disagreement, they remained civil.', correct: '彼らの意見の相違にもかかわらず、彼らは礼儀正しくいた。', wrong: ['彼らの意見の相違にもかかわらず、彼らは無礼だった。', '彼ら女性の意見の相違にもかかわらず、彼らは礼儀正しくいた。', '彼らの合意にもかかわらず、彼らは礼儀正しくいた。'] },
  ],
  'civilization': [
    { example: 'Ancient civilizations built impressive monuments.', correct: '古代文明は印象的な記念碑を建設しました。', wrong: ['古代社会は印象的な記念碑を建設しました。', '古代文明は立派な建造物を建設しました。', '現代文明は印象的な記念碑を建設しました。'] },
    { example: 'Western civilization has influenced the world significantly.', correct: '西洋文明は世界に大きな影響を与えました。', wrong: ['西洋社会は世界に大きな影響を与えました。', '西洋文化は世界に大きな影響を与えました。', '西洋文明は地域に大きな影響を与えました。'] },
    { example: 'The development of civilization required agriculture.', correct: '文明の発展は農業を必要としました。', wrong: ['文化の発展は農業を必要としました。', '社会の発展は農業を必要としました。', '文明の成長は農業を必要としました。'] },
  ],
  'classify': [
    { example: 'Scientists classify animals into groups.', correct: '科学者は動物をグループに分類する。', wrong: ['科学者は植物をグループに分類する。', '研究者は動物をグループに分類する。', '科学者は動物をカテゴリーに整理する。'] },
    { example: 'The government decided to classify the documents as top secret.', correct: '政府は文書を最高機密として分類することにした。', wrong: ['政府は文書を機密として公開することにした。', '議会は文書を最高機密として分類することにした。', '政府は手紙を最高機密として分類することにした。'] },
    { example: 'Librarians classify books by subject matter.', correct: '図書館員は本を主題別に分類する。', wrong: ['図書館員は本を著者別に整理する。', '司書は本を主題別に分類する。', '図書館員は本を主題別に配置する。'] },
  ],
  'collapse': [
    { example: 'The old building collapsed during the earthquake.', correct: '古い建物は地震で崩壊した。', wrong: ['古い建物は地震で損傷した。', '新しい建物は地震で崩壊した。', '古い建物は台風で崩壊した。'] },
    { example: 'The athlete collapsed after running the marathon.', correct: 'その選手はマラソンを走った後に倒れた。', wrong: ['その選手はマラソンを走った後に疲れた。', 'その選手は100メートルを走った後に倒れた。', 'そのコーチはマラソンを走った後に倒れた。'] },
    { example: 'The company\'s stock price collapsed due to scandal.', correct: 'スキャンダルのため、その会社の株価は暴落した。', wrong: ['スキャンダルのため、その会社の売上は暴落した。', 'スキャンダルのため、その会社の株価は上昇した。', '成功のため、その会社の株価は暴落した。'] },
  ],
  'colleague': [
    { example: 'I discussed the plan with my colleagues.', correct: '私は同僚とその計画について議論しました。', wrong: ['私は友人とその計画について議論しました。', '彼は同僚とその計画について議論しました。', '私は同僚とその提案について議論しました。'] },
    { example: 'My colleague received a promotion yesterday.', correct: '私の同僚は昨日昇進しました。', wrong: ['私の友人は昨日昇進しました。', '私の同僚は今日昇進しました。', '彼女の同僚は昨日昇進しました。'] },
    { example: 'We have lunch with our colleagues every Friday.', correct: '私たちは毎週金曜日に同僚と一緒に昼食をとります。', wrong: ['私たちは毎週月曜日に同僚と一緒に昼食をとります。', '私たちは毎週金曜日に友人と一緒に昼食をとります。', '彼らは毎週金曜日に同僚と一緒に昼食をとります。'] },
  ],
  'colony': [
    { example: 'The country was once a British colony.', correct: 'その国はかつてイギリスの植民地でした。', wrong: ['その国はかつてイギリスの領土でした。', 'その州はかつてイギリスの植民地でした。', 'その地域はかつてフランスの植民地でした。'] },
    { example: 'The ant colony has thousands of workers.', correct: 'そのアリの群落には数千の働きアリがいます。', wrong: ['そのアリの巣には数千の働きアリがいます。', 'そのハチの群落には数千の働きアリがいます。', 'そのアリの群落には数百の働きアリがいます。'] },
    { example: 'Artists formed a creative colony in the countryside.', correct: '芸術家たちは田舎に創造的なコロニーを形成しました。', wrong: ['芸術家たちは都市に創造的なコロニーを形成しました。', '音楽家たちは田舎に創造的なコロニーを形成しました。', '芸術家たちは田舎に創造的なグループを形成しました。'] },
  ],
  'commerce': [
    { example: 'Online commerce is growing rapidly.', correct: 'オンライン商業は急速に成長しています。', wrong: ['オンライン貿易は急速に成長しています。', 'オンライン商取引は急速に成長しています。', 'オフライン商業は急速に成長しています。'] },
    { example: 'International commerce benefits all nations.', correct: '国際商業はすべての国に利益をもたらします。', wrong: ['国際貿易はすべての国に利益をもたらします。', '国際商業はすべての地域に利益をもたらします。', '地域商業はすべての国に利益をもたらします。'] },
    { example: 'The government regulates commerce to protect consumers.', correct: '政府は消費者を保護するために商業を規制しています。', wrong: ['政府は消費者を保護するために貿易を規制しています。', '議会は消費者を保護するために商業を規制しています。', '政府は生産者を保護するために商業を規制しています。'] },
  ],
  'commercial': [
    { example: 'The area is used for commercial purposes.', correct: 'その地域は商業目的に使用されている。', wrong: ['その地域は住宅目的に使用されている。', 'その地区は商業目的に使用されている。', 'その地域は教育目的に使用されている。'] },
    { example: 'She works in the commercial aviation industry.', correct: '彼女は商業航空業界で働いている。', wrong: ['彼女は軍事航空業界で働いている。', '彼は商業航空業界で働いている。', '彼女は商業海運業界で働いている。'] },
    { example: 'The commercial was broadcast during the game.', correct: 'その広告はゲーム中に放映された。', wrong: ['その番組はゲーム中に放映された。', 'その映画はゲーム中に放映された。', 'その広告はゲーム後に放映された。'] },
  ],
  'commission': [
    { example: 'The commission investigated the accident.', correct: '委員会はその事故を調査しました。', wrong: ['委員会はその事件を調査しました。', '委員は その事故を調査しました。', '政府はその事故を調査しました。'] },
    { example: 'The salesman earns a 10% commission on sales.', correct: '営業マンは売上の10%の手数料を稼ぎます。', wrong: ['営業マンは売上の10%のボーナスを稼ぎます。', '営業職員は売上の10%の手数料を稼ぎます。', '営業マンは利益の10%の手数料を稼ぎます。'] },
    { example: 'The artist was commissioned to paint a portrait.', correct: 'その芸術家は肖像画を描くよう委嘱されました。', wrong: ['その芸術家は肖像画を描くよう指示されました。', 'その画家は肖像画を描くよう委嘱されました。', 'その芸術家は風景画を描くよう委嘱されました。'] },
  ],
  'commit': [
    { example: 'He committed himself to the project.', correct: '彼はそのプロジェクトに自分を捧げた。', wrong: ['彼はそのプロジェクトを中止した。', '彼女はそのプロジェクトに自分を捧げた。', '彼はそのプロジェクトから撤退した。'] },
    { example: 'She committed a serious crime.', correct: '彼女は重大な犯罪を犯した。', wrong: ['彼女は軽微な犯罪を犯した。', '彼は重大な犯罪を犯した。', '彼女は重大な事件を目撃した。'] },
    { example: 'The government committed funds to education.', correct: '政府は教育に資金を充てた。', wrong: ['政府は医療に資金を充てた。', '議会は教育に資金を充てた。', '政府は教育から資金を削減した。'] },
  ],
  'commodity': [
    { example: 'Oil is a valuable commodity in the global market.', correct: '石油は世界市場で貴重な商品である。', wrong: ['石油は世界市場で貴重な製品である。', '石油は世界市場で重要な資源である。', '石油は世界市場で必要な商品ではない。'] },
    { example: 'Coffee has become an essential commodity for many people.', correct: 'コーヒーは多くの人々にとって必須の商品になっている。', wrong: ['コーヒーは多くの人々にとって必須の飲料になっている。', 'コーヒーは多くの人々にとって必須の商品ではなくなっている。', 'コーヒーは少数の人々にとって必須の商品になっている。'] },
    { example: 'Agricultural commodities like wheat and corn are traded internationally.', correct: '小麦やトウモロコシなどの農産商品は国際的に取引されている。', wrong: ['小麦やトウモロコシなどの農産物は国際的に生産されている。', '小麦やトウモロコシなどの農産商品は国内的に取引されている。', '小麦やトウモロコシなどの農業用商品は国際的に取引されている。'] },
  ],
  'compensate': [
    { example: 'The company compensated workers for the accident.', correct: 'その会社は労働者に事故の補償金を支払った。', wrong: ['その会社は労働者に昇給を支払った。', 'その企業は労働者に事故の補償金を支払った。', 'その会社は管理者に事故の補償金を支払った。'] },
    { example: 'She works hard to compensate for her lack of experience.', correct: '彼女は経験不足を補うために懸命に働く。', wrong: ['彼女は経験不足を認めるために懸命に働く。', '彼女は経験不足を補うために怠け者である。', '彼女は経験豊富さを補うために懸命に働く。'] },
    { example: 'The insurance will compensate you for your losses.', correct: 'その保険はあなたの損失を補償するだろう。', wrong: ['その保険はあなたの損失を無視するだろう。', 'その保険会社はあなたの損失を補償するだろう。', 'その保険はあなたの利益を補償するだろう。'] },
  ],
  'compensation': [
    { example: 'She received compensation for the damage to her property.', correct: '彼女は彼女の財産への損害に対して補償を受けた。', wrong: ['彼女は彼女の財産への損害に対して賠償を受けた。', '彼女は彼女の財産への損害に対して補償を支払った。', '彼は彼の財産への損害に対して補償を受けた。'] },
    { example: 'The company offered compensation packages to laid-off employees.', correct: '会社は解雇された従業員に補償パッケージを提供した。', wrong: ['会社は解雇された従業員に給与パッケージを提供した。', '会社は雇用された従業員に補償パッケージを提供した。', '会社は解雇された従業員に補償金を支払った。'] },
    { example: 'Fair compensation is essential for attracting skilled workers.', correct: '適切な補償は熟練労働者を惹きつけるために不可欠である。', wrong: ['適切な給与は熟練労働者を惹きつけるために不可欠である。', '過度な補償は熟練労働者を惹きつけるために不可欠である。', '適切な補償は未熟練労働者を惹きつけるために不可欠である。'] },
  ],
  'complex': [
    { example: 'This is a complex problem.', correct: 'これは複雑な問題だ。', wrong: ['これは単純な問題だ。', 'あれは複雑な問題だ。', 'これは複雑な解決策だ。'] },
    { example: 'The new shopping complex opens next month.', correct: '新しい商業複合施設は来月オープンする。', wrong: ['新しい商業複合施設は先月オープンした。', '古い商業複合施設は来月オープンする。', '新しい学習複合施設は来月オープンする。'] },
    { example: 'She has a complex about her appearance.', correct: '彼女は自分の外見についてコンプレックスを持っている。', wrong: ['彼女は自分の外見について自信を持っている。', '彼は自分の外見についてコンプレックスを持っている。', '彼女は自分の性格についてコンプレックスを持っている。'] },
  ],
  'component': [
    { example: 'The CPU is a critical component of any computer.', correct: 'CPUはすべてのコンピュータの重要な構成要素である。', wrong: ['CPUはすべてのコンピュータの重要な部品である。', 'CPUはいくつかのコンピュータの重要な構成要素である。', 'GPUはすべてのコンピュータの重要な構成要素である。'] },
    { example: 'Each component of the engine must be properly assembled.', correct: 'エンジンの各構成要素は適切に組み立てられなければならない。', wrong: ['エンジンのすべての部品は適切に組み立てられなければならない。', 'エンジンの各構成要素は適切に分解されなければならない。', 'エンジンの各構成要素は慎重に組み立てられなければならない。'] },
    { example: 'The emotional component of the performance was particularly moving.', correct: 'その演技の感情的な構成要素は特に感動的だった。', wrong: ['その演技の感情的な側面は特に感動的だった。', 'その演技の音声的な構成要素は特に感動的だった。', 'その演技の感情的な構成要素は特に退屈だった。'] },
  ],
  'comprehensive': [
    { example: 'The report provides a comprehensive overview of the market trends.', correct: 'そのレポートは市場動向の包括的な概観を提供している。', wrong: ['そのレポートは市場動向の部分的な概観を提供している。', 'その報告書は市場動向の詳細な分析を提供している。', 'そのレポートは市場動向の限定的な概観を提供している。'] },
    { example: 'She received a comprehensive physical examination from her doctor.', correct: '彼女は医者から包括的な身体検査を受けた。', wrong: ['彼女は医者から簡単な身体検査を受けた。', '彼女は看護師から包括的な身体検査を受けた。', '彼女は医者から部分的な身体検査を受けた。'] },
    { example: 'The training program offers comprehensive instruction in all software modules.', correct: 'そのトレーニングプログラムはすべてのソフトウェアモジュールの包括的な指導を提供している。', wrong: ['そのトレーニングプログラムは主要なソフトウェアモジュールの包括的な指導を提供している。', 'そのトレーニングプログラムはすべてのソフトウェアモジュールの基本的な指導を提供している。', 'そのトレーニングプログラムはすべてのハードウェアモジュールの包括的な指導を提供している。'] },
  ],
  'compromise': [
    { example: 'Both political parties reached a compromise on the legislation.', correct: '両政党は立法について妥協に達した。', wrong: ['両政党は立法について合意に達した。', '両政党は立法についての妥協を拒否した。', '単一政党は立法について妥協に達した。'] },
    { example: 'She was unwilling to compromise on her principles.', correct: '彼女は彼女の原則について妥協することを望まなかった。', wrong: ['彼女は彼女の原則を放棄することを望まなかった。', '彼は彼の原則について妥協することを望まなかった。', '彼女は彼女の原則について譲歩することを望まなかった。'] },
    { example: 'Finding a compromise between quality and cost is challenging.', correct: '品質とコストの間の妥協を見つけることは困難である。', wrong: ['品質とコストの間のバランスを見つけることは困難である。', '品質と価格の間の妥協を見つけることは困難である。', '品質とコストの間の妥協を見つけることは簡単である。'] },
  ],
  'conclude': [
    { example: 'The researcher concluded that the theory was correct.', correct: '研究者はその理論が正しいと結論を出した。', wrong: ['研究者はその理論が正しいと仮説を立てた。', '研究者はその理論が間違っていると結論を出した。', '研究者はその理論について議論を始めた。'] },
    { example: 'After the meeting, the manager concluded by thanking everyone.', correct: '会議の後、マネージャーは皆に感謝して締めくくった。', wrong: ['会議の後、マネージャーは皆に感謝して始めた。', '会議の前に、マネージャーは皆に感謝して締めくくった。', '会議の後、マネージャーは皆に感謝を求めた。'] },
    { example: 'The evidence concluded that he was innocent.', correct: 'その証拠は彼が無実であることを示していた。', wrong: ['その証拠は彼が有罪であることを示していた。', 'その証拠は彼が疑わしいことを示していた。', 'その証拠は彼について何も示していなかった。'] },
  ],
  'concrete': [
    { example: 'We need concrete evidence to support our claim in court.', correct: '裁判で私たちの主張を支持するために具体的な証拠が必要だ。', wrong: ['裁判で私たちの主張を支持するために抽象的な証拠が必要だ。', '裁判で彼らの主張を支持するために具体的な証拠が必要だ。', '調査で私たちの主張を支持するために具体的な証拠が必要だ。'] },
    { example: 'The builders used concrete to construct the foundation of the building.', correct: '建設業者は建物の基礎を構築するためにコンクリートを使用した。', wrong: ['建設業者は建物の壁を構築するためにコンクリートを使用した。', '建築家は建物の基礎を構築するためにコンクリートを使用した。', '建設業者は橋の基礎を構築するためにレンガを使用した。'] },
    { example: 'The teacher asked students to provide concrete examples from their research.', correct: '先生は学生に彼らの研究から具体的な例を提供するよう求めた。', wrong: ['先生は学生に彼らの仮説から具体的な例を提供するよう求めた。', '教授は学生に彼らの研究から具体的な例を提供するよう求めた。', '先生は学生に彼らの研究から一般的な例を提供するよう求めた。'] },
  ],
  'conduct': [
    { example: 'The scientist conducted an experiment.', correct: '科学者は実験を行った。', wrong: ['科学者は実験を観察した。', '科学者は実験を計画した。', '科学者は実験室を建設した。'] },
    { example: 'The orchestra conductor will conduct the symphony tonight.', correct: 'オーケストラの指揮者は今夜シンフォニーを指揮するだろう。', wrong: ['オーケストラの指揮者は今夜シンフォニーを演奏するだろう。', 'オーケストラの指揮者は今夜シンフォニーを作曲するだろう。', 'オーケストラの指揮者は今夜シンフォニーを聴くだろう。'] },
    { example: 'His conduct at the event was inappropriate.', correct: 'イベントでの彼の行動は不適切だった。', wrong: ['イベントでの彼の衣装は不適切だった。', 'イベントでの彼の意見は不適切だった。', 'イベントでの彼の計画は不適切だった。'] },
  ],
  'confuse': [
    { example: 'The instructions confused many students.', correct: 'その指示は多くの学生を混乱させた。', wrong: ['その指示は多くの学生を助けた。', 'その指示は多くの学生を教えた。', 'その指示は多くの学生を励ました。'] },
    { example: 'Don\'t confuse these two products; they are different.', correct: 'これら二つの製品を混同しないでください。それらは異なっています。', wrong: ['これら二つの製品を比較しないでください。それらは異なっています。', 'これら二つの製品を組み合わせないでください。それらは異なっています。', 'これら二つの製品を分離しないでください。それらは異なっています。'] },
    { example: 'The similar names confused the customers.', correct: '似た名前は顧客を混乱させた。', wrong: ['似た名前は顧客を喜ばせた。', '似た名前は顧客を困らせた。', '似た名前は顧客に記憶させた。'] },
  ],
  'consciousness': [
    { example: 'He regained consciousness after the surgery.', correct: '彼は手術後に意識を取り戻した。', wrong: ['彼は手術後に知覚を取り戻した。', '彼は手術前に意識を取り戻した。', '彼女は手術後に意識を取り戻した。'] },
    { example: 'Environmental consciousness among young people is growing.', correct: '若い人々の間で環境意識が増加しています。', wrong: ['若い人々の間で環境知識が増加しています。', '高齢者の間で環境意識が増加しています。', '若い人々の間で環境意識が減少しています。'] },
    { example: 'She developed a strong social consciousness through volunteer work.', correct: '彼女はボランティア活動を通じて強い社会意識を発展させた。', wrong: ['彼女はボランティア活動を通じて強い社会的価値観を発展させた。', '彼は寄付を通じて強い社会意識を発展させた。', '彼女はボランティア活動を通じて弱い社会意識を発展させた。'] },
  ],
  'conservation': [
    { example: 'Marine conservation efforts are vital for protecting ocean ecosystems.', correct: '海洋保全の取り組みは海洋生態系を保護するために極めて重要である。', wrong: ['海洋保護の取り組みは海洋生態系を保護するために極めて重要である。', '陸上保全の取り組みは海洋生態系を保護するために極めて重要である。', '海洋保全の取り組みは海洋生態系を破壊するために極めて重要である。'] },
    { example: 'Energy conservation can significantly reduce household bills.', correct: 'エネルギー保全は家計の請求書を大幅に削減できる。', wrong: ['エネルギー節約は家計の請求書を大幅に削減できる。', 'エネルギー保全は家計の請求書を大幅に増加させることができる。', '水の保全は家計の請求書を大幅に削減できる。'] },
    { example: 'Historic preservation and conservation require significant funding.', correct: '歴史的保全と保存には多大な資金が必要である。', wrong: ['歴史的保護と保存には多大な資金が必要である。', '現代的保全と保存には多大な資金が必要である。', '歴史的保全と復元には多大な資金が必要である。'] },
  ],
  'constitution': [
    { example: 'The constitution establishes the framework for government.', correct: '憲法は政府の枠組みを確立する。', wrong: ['憲法は政府の構造を確立する。', '法律は政府の枠組みを確立する。', '憲法は政府の枠組みを破壊する。'] },
    { example: 'Amendments to the constitution require a supermajority vote.', correct: '憲法への修正には超多数派の投票が必要である。', wrong: ['憲法への改正には超多数派の投票が必要である。', '憲法への修正には単純多数派の投票が必要である。', '法律への修正には超多数派の投票が必要である。'] },
    { example: 'A healthy constitution is necessary for a strong body.', correct: '健康な体質は強い体に必要である。', wrong: ['健康な憲法は強い体に必要である。', '強い憲法は健康な体に必要である。', '健康な体質は弱い体に必要である。'] },
  ],
  'construct': [
    { example: 'They constructed a new highway.', correct: '彼らは新しい高速道路を建設した。', wrong: ['彼らは新しい高速道路を破壊した。', '彼らは古い高速道路を建設した。', '彼らは新しい高速道路を計画した。'] },
    { example: 'The architect will construct the building according to the design.', correct: '建築家はその設計に従って建物を建設するだろう。', wrong: ['建築家はその設計に従って建物を改造するだろう。', '建築家はその設計を無視して建物を建設するだろう。', '建築家はその設計に従って建物を装飾するだろう。'] },
    { example: 'We need to construct a strong argument for this proposal.', correct: 'この提案のために強い議論を構築する必要がある。', wrong: ['この提案のために弱い議論を構築する必要がある。', 'この提案のために強い反論を構築する必要がある。', 'この提案のために強い異議を構築する必要がある。'] },
  ],
  'consume': [
    { example: 'We consume too much plastic.', correct: '私たちは多すぎるプラスチックを消費している。', wrong: ['私たちは多すぎるプラスチックを生産している。', '私たちは少ないプラスチックを消費している。', '私たちは多すぎるプラスチックをリサイクルしている。'] },
    { example: 'The fire consumed the entire building.', correct: '火は建物全体を焼き尽くした。', wrong: ['火は建物の一部だけを焼き尽くした。', '水は建物全体を焼き尽くした。', '火は建物全体を保護した。'] },
    { example: 'The project consumed all of our resources.', correct: 'そのプロジェクトは私たちのすべてのリソースを消費した。', wrong: ['そのプロジェクトは私たちのリソースの一部だけを消費した。', 'そのプロジェクトは私たちのリソースを節約した。', 'そのプロジェクトは私たちのリソースを提供した。'] },
  ],
  'consumption': [
    { example: 'Global energy consumption continues to rise each year.', correct: '世界的なエネルギー消費は毎年増加し続けている。', wrong: ['世界的なエネルギー使用は毎年増加し続けている。', '地域的なエネルギー消費は毎年増加し続けている。', '世界的なエネルギー消費は毎年減少し続けている。'] },
    { example: 'Reducing water consumption is crucial for sustainability.', correct: '水消費を減らすことは持続可能性のために極めて重要である。', wrong: ['水の使用を減らすことは持続可能性のために極めて重要である。', 'エネルギー消費を減らすことは持続可能性のために極めて重要である。', '水消費を増やすことは持続可能性のために極めて重要である。'] },
    { example: 'Meat consumption per capita has increased significantly in developed countries.', correct: '先進国では一人当たりの肉類消費が大幅に増加している。', wrong: ['先進国では一人当たりの肉類摂取が大幅に増加している。', '発展途上国では一人当たりの肉類消費が大幅に増加している。', '先進国では一人当たりの肉類消費が大幅に減少している。'] },
  ],
  'contemporary': [
    { example: 'The museum features contemporary art from emerging artists around the world.', correct: 'その美術館は世界中の新興芸術家による現代美術を展示している。', wrong: ['その美術館は世界中の有名な芸術家による現代美術を展示している。', 'その美術館は日本の新興芸術家による現代美術を展示している。', 'その美術館は世界中の新興芸術家による古典美術を展示している。'] },
    { example: 'Shakespeare\'s plays remain relevant to contemporary audiences.', correct: 'シェイクスピアの劇は現代の観客に関連したままである。', wrong: ['シェイクスピアの劇は古代の観客に関連したままである。', 'シェイクスピアの小説は現代の観客に関連したままである。', 'オスカー・ワイルドの劇は現代の観客に関連したままである。'] },
    { example: 'The architect designed a contemporary building with minimalist aesthetics.', correct: 'その建築家はミニマリスト美学を備えた現代建築を設計した。', wrong: ['その建築家は古典的な美学を備えた現代建築を設計した。', 'その建築家はミニマリスト美学を備えた伝統的な建築を設計した。', 'その土木技師はミニマリスト美学を備えた現代建築を設計した。'] },
  ],
  'context': [
    { example: 'You need to understand the context of the historical event.', correct: 'その歴史的出来事の文脈を理解する必要があります。', wrong: ['その歴史的出来事の背景を理解する必要があります。', 'その歴史的出来事の内容を理解する必要があります。', 'その歴史的出来事の文脈を忘れる必要があります。'] },
    { example: 'In the context of modern technology, this is outdated.', correct: '現代技術の文脈では、これは時代遅れです。', wrong: ['現代技術の文脈では、これは新しいです。', '古い技術の文脈では、これは時代遅れです。', '現代技術の状況では、これは時代遅れです。'] },
    { example: 'The context of her remarks was completely misunderstood.', correct: '彼女の発言の文脈は完全に誤解されました。', wrong: ['彼女の発言の内容は完全に理解されました。', '彼の発言の文脈は完全に誤解されました。', '彼女の意見の文脈は完全に誤解されました。'] },
  ],
  'contradiction': [
    { example: 'There is a clear contradiction between his words and actions.', correct: '彼の言葉と行動の間に明らかな矛盾があります。', wrong: ['彼の言葉と行動の間に明らかな一貫性があります。', '彼女の言葉と行動の間に明らかな矛盾があります。', '彼の意見と行動の間に明らかな矛盾があります。'] },
    { example: 'The witness testimony contained a contradiction with the evidence.', correct: '証人の証言は証拠と矛盾していました。', wrong: ['証人の証言は証拠と一致していました。', '容疑者の証言は証拠と矛盾していました。', '証人の陳述は証拠と矛盾していました。'] },
    { example: 'I found a contradiction in the legal document that needs clarification.', correct: '法的文書に矛盾を見つけましたが、それを明確にする必要があります。', wrong: ['法的文書に矛盾を見つけましたが、それを無視する必要があります。', '契約書に矛盾を見つけましたが、それを明確にする必要があります。', '法的文書に一貫性を見つけましたが、それを明確にする必要があります。'] },
  ],
  'controversial': [
    { example: 'The decision was controversial and sparked heated debates among stakeholders.', correct: 'その決定は議論の的となり、利害関係者の間で白熱した議論を引き起こした。', wrong: ['その決定は合意され、利害関係者の間で白熱した議論を引き起こした。', 'その決定は議論の的となり、利害関係者の間で静かな議論を引き起こした。', 'その提案は議論の的となり、利害関係者の間で白熱した議論を引き起こした。'] },
    { example: 'The controversial politician resigned after the scandal was revealed.', correct: 'その議論の的となった政治家はスキャンダルが明らかになった後に辞任した。', wrong: ['その人気のある政治家はスキャンダルが明らかになった後に辞任した。', 'その議論の的となった政治家は不祥事が明らかになった後に再選された。', 'その議論の的となった実業家はスキャンダルが明らかになった後に辞任した。'] },
    { example: 'The film received controversial reviews for its explicit content and violence.', correct: 'その映画は露骨な内容と暴力のために議論の的となったレビューを受けた。', wrong: ['その映画は露骨な内容と暴力のために賞賛されたレビューを受けた。', 'その小説は露骨な内容と暴力のために議論の的となったレビューを受けた。', 'その映画は微妙な内容と暴力のために議論の的となったレビューを受けた。'] },
  ],
  'controversy': [
    { example: 'The new policy sparked significant controversy among the public.', correct: '新しい政策は一般の人々の間で大きな論争を引き起こしました。', wrong: ['新しい政策は一般の人々の間で大きな支持を引き起こしました。', '古い政策は一般の人々の間で大きな論争を引き起こしました。', '新しい法律は一般の人々の間で大きな論争を引き起こしました。'] },
    { example: 'The celebrity\'s controversial remarks created unnecessary controversy.', correct: 'その有名人の論争的な発言は不必要な論争を生み出しました。', wrong: ['その有名人の適切な発言は不必要な論争を生み出しました。', 'その俳優の論争的な発言は不必要な論争を生み出しました。', 'その有名人の論争的な発言は不必要な称賛を生み出しました。'] },
    { example: 'The book\'s release avoided any controversy due to careful editing.', correct: 'その本の発行は慎重な編集のため論争を避けました。', wrong: ['その本の発行は慎重な編集のため支持を避けました。', 'その雑誌の発行は慎重な編集のため論争を避けました。', 'その本の発表は慎重な編集のため論争を避けました。'] },
  ],
  'conventional': [
    { example: 'Conventional methods are still effective in solving many common problems.', correct: '従来の方法は多くの一般的な問題を解決するのにまだ効果的である。', wrong: ['革新的な方法は多くの一般的な問題を解決するのにまだ効果的である。', '従来の方法は多くの複雑な問題を解決するのにまだ効果的である。', '従来の手段は多くの一般的な問題を解決するのにまだ効果的である。'] },
    { example: 'The company decided to abandon conventional wisdom and try a new approach.', correct: 'その企業は従来の慣習を放棄し、新しいアプローチを試すことにした。', wrong: ['その企業は先進的な知識を放棄し、新しいアプローチを試すことにした。', 'その組織は従来の慣習を受け入れ、新しいアプローチを試すことにした。', 'その企業は従来の慣習を放棄し、古いアプローチを試すことにした。'] },
    { example: 'She chose a conventional dress design rather than something more modern.', correct: '彼女はより現代的なものではなく従来のドレスデザインを選んだ。', wrong: ['彼女はより古典的なものではなく従来のドレスデザインを選んだ。', '彼女はより現代的なものではなく斬新なドレスデザインを選んだ。', '彼は母親のためにより現代的なものではなく従来のドレスデザインを選んだ。'] },
  ],
  'convert': [
    { example: 'Solar panels convert sunlight into electricity.', correct: '太陽光パネルは日光を電力に変換する。', wrong: ['太陽光パネルは日光を熱に変換する。', '太陽光パネルは日光を消費する。', '太陽光パネルは日光を吸収する。'] },
    { example: 'She converted the garage into a workshop.', correct: '彼女はガレージをワークショップに改造した。', wrong: ['彼女はガレージをワークショップから改造した。', '彼女はガレージを部屋に改造した。', '彼女はガレージをワークショップとして壊した。'] },
    { example: 'Many people converted to the new religion.', correct: '多くの人々は新しい宗教に改宗した。', wrong: ['多くの人々は新しい宗教を拒否した。', '多くの人々は新しい宗教について学んだ。', '多くの人々は新しい宗教を批判した。'] },
  ],
  'cooperate': [
    { example: 'The two countries agreed to cooperate.', correct: 'その二つの国は協力することに同意した。', wrong: ['その二つの国は競争することに同意した。', 'その三つの国は協力することに同意した。', 'その二つの国は対立することに同意した。'] },
    { example: 'Team members must cooperate to achieve the goal.', correct: 'チームメンバーは目標を達成するために協力しなければならない。', wrong: ['チームメンバーは目標を達成するために争わなければならない。', 'チームメンバーは目標を達成するために隠蔽しなければならない。', 'チームメンバーは目標を達成するために分裂しなければならない。'] },
    { example: 'I will cooperate with you on this project.', correct: 'このプロジェクトであなたと協力します。', wrong: ['このプロジェクトであなたに反対します。', 'このプロジェクトであなたを監督します。', 'このプロジェクトであなたを批判します。'] },
  ],
  'cooperation': [
    { example: 'The success of the project depended on cooperation between departments.', correct: 'そのプロジェクトの成功は部門間の協力に依存していました。', wrong: ['そのプロジェクトの成功は部門間の競争に依存していました。', 'その計画の成功は部門間の協力に依存していました。', 'そのプロジェクトの失敗は部門間の協力に依存していました。'] },
    { example: 'International cooperation is needed to address climate change.', correct: '気候変動に対処するには国際的な協力が必要です。', wrong: ['気候変動に対処するには国際的な対立が必要です。', '環境変動に対処するには国際的な協力が必要です。', '気候変動を無視するには国際的な協力が必要です。'] },
    { example: 'The two companies agreed to cooperation on the new product development.', correct: 'その二つの企業は新製品開発での協力に同意しました。', wrong: ['その二つの企業は新製品開発での競争に同意しました。', 'その三つの企業は新製品開発での協力に同意しました。', 'その二つの企業は既存製品開発での協力に同意しました。'] },
  ],
  'corporate': [
    { example: 'Corporate responsibility is important for building trust with customers.', correct: '企業責任は顧客との信頼を構築するために重要である。', wrong: ['個人責任は顧客との信頼を構築するために重要である。', '企業責任は顧客との関係を構築するために重要である。', '企業倫理は顧客との信頼を構築するために重要である。'] },
    { example: 'The corporate office relocated to a new downtown building.', correct: 'その企業本社は新しいダウンタウンのビルに移転した。', wrong: ['その支店は新しいダウンタウンのビルに移転した。', 'その企業本社は古いダウンタウンのビルに移転した。', 'その個人事務所は新しいダウンタウンのビルに移転した。'] },
    { example: 'Corporate culture plays a significant role in employee satisfaction.', correct: '企業文化は従業員満足度において重要な役割を果たしている。', wrong: ['組織文化は従業員満足度において重要な役割を果たしている。', '企業文化は従業員給与において重要な役割を果たしている。', '業界文化は従業員満足度において重要な役割を果たしている。'] },
  ],
  'corporation': [
    { example: 'She works for a large multinational corporation.', correct: '彼女は大規模な多国籍企業で働いています。', wrong: ['彼女は小規模な多国籍企業で働いています。', '彼は大規模な多国籍企業で働いています。', '彼女は大規模な多国籍組織で働いています。'] },
    { example: 'The corporation announced record profits this year.', correct: 'その企業は今年の記録的な利益を発表しました。', wrong: ['その企業は昨年の記録的な利益を発表しました。', 'その会社は今年の記録的な赤字を発表しました。', 'その団体は今年の記録的な利益を発表しました。'] },
    { example: 'Many small businesses compete against large corporations.', correct: '多くの中小企業は大企業と競争しています。', wrong: ['多くの中小企業は大企業と協力しています。', '多くの大企業は小企業と競争しています。', '多くの中小団体は大企業と競争しています。'] },
  ],
  'correspond': [
    { example: 'The results correspond with the prediction.', correct: 'その結果は予測と一致している。', wrong: ['その結果は予測と矛盾している。', 'その結果は期待と一致している。', 'その結果は仮説と異なっている。'] },
    { example: 'She corresponded with her friend through letters.', correct: '彼女は手紙を通じて友人と通信していた。', wrong: ['彼女は電話を通じて友人と通信していた。', '彼女は電子メールを通じて友人と会っていた。', '彼女は直接友人と通信していた。'] },
    { example: 'The two accounts correspond exactly.', correct: 'その二つのアカウントは完全に一致している。', wrong: ['その二つのアカウントは部分的に一致している。', 'その二つのアカウントは矛盾している。', 'その三つのアカウントは完全に一致している。'] },
  ],
  'criterion': [
    { example: 'The main criterion for selection is academic performance.', correct: '選抜の主な基準は学業成績です。', wrong: ['選抜の主な基準は出身地です。', '落選の主な基準は学業成績です。', '選抜の主な理由は学業成績です。'] },
    { example: 'What criterion will be used to evaluate the candidates?', correct: '候補者を評価するためにどのような基準が使用されますか？', wrong: ['候補者を選ぶためにどのような基準が使用されますか？', '応募者を評価するためにどのような基準が使用されますか？', '候補者を評価するためにどのような目標が使用されますか？'] },
    { example: 'Meeting the safety criterion is mandatory for all products.', correct: 'すべての製品で安全基準を満たすことは必須です。', wrong: ['すべての製品で安全基準を超えることは必須です。', 'いくつかの製品で安全基準を満たすことは必須です。', 'すべての製品で品質基準を満たすことは必須です。'] },
  ],
  'critical': [
    { example: 'This is a critical moment for the company\'s future success.', correct: 'これは企業の将来の成功のための重要な時期である。', wrong: ['これは企業の現在の成功のための重要な時期である。', 'これは個人の将来の成功のための重要な時期である。', 'これは業界の将来の成功のための基本的な時期である。'] },
    { example: 'The film critic offered a critical analysis of the director\'s latest work.', correct: 'その映画評論家は監督の最新作に対して批判的な分析を提供した。', wrong: ['その映画評論家は監督の最新作に対して肯定的な分析を提供した。', 'その芸術評論家は監督の最新作に対して批判的な分析を提供した。', 'その映画評論家は監督の古い作品に対して批判的な分析を提供した。'] },
    { example: 'The critical infrastructure requires regular maintenance and updates.', correct: 'その重要インフラは定期的なメンテナンスと更新が必要である。', wrong: ['その基本的なインフラは定期的なメンテナンスと更新が必要である。', 'その重要な施設は定期的なメンテナンスと更新が必要である。', 'その重要インフラは時間的なメンテナンスと更新が必要である。'] },
  ],
  'curriculum': [
    { example: 'The school revised its curriculum to include digital literacy.', correct: 'その学校はデジタルリテラシーを含めるために教育課程を改訂しました。', wrong: ['その学校はデジタルリテラシーを除外するために教育課程を改訂しました。', 'その大学はデジタルリテラシーを含めるために教育課程を改訂しました。', 'その学校はデジタルリテラシーを含めるために教科書を改訂しました。'] },
    { example: 'The curriculum for the engineering program is very demanding.', correct: '工学プログラムの教育課程は非常に要求が高いです。', wrong: ['工学プログラムの教育課程は非常に簡単です。', '医学プログラムの教育課程は非常に要求が高いです。', '工学プログラムの講師は非常に要求が高いです。'] },
    { example: 'Students must complete all courses in the curriculum to graduate.', correct: '学生は卒業するために教育課程のすべてのコースを修了する必要があります。', wrong: ['学生は卒業するために教育課程のいくつかのコースを修了する必要があります。', '教師は卒業するために教育課程のすべてのコースを修了する必要があります。', '学生は入学するために教育課程のすべてのコースを修了する必要があります。'] },
  ],
  'deficit': [
    { example: 'The government is running a large budget deficit this year.', correct: '政府は今年大きな予算赤字を抱えています。', wrong: ['政府は今年大きな予算黒字を抱えています。', '政府は昨年大きな予算赤字を抱えています。', '企業は今年大きな予算赤字を抱えています。'] },
    { example: 'The trade deficit between the two countries continues to grow.', correct: 'その二つの国の間の貿易赤字は増加し続けています。', wrong: ['その二つの国の間の貿易黒字は増加し続けています。', 'その三つの国の間の貿易赤字は減少し続けています。', 'その二つの国の間の経常赤字は増加し続けています。'] },
    { example: 'The company needs to reduce its deficit to remain competitive.', correct: 'その企業は競争力を保つために赤字を減らす必要があります。', wrong: ['その企業は競争力を保つために利益を減らす必要があります。', 'その組織は競争力を保つために赤字を減らす必要があります。', 'その企業は市場を支配するために赤字を減らす必要があります。'] },
  ],
  'deliberate': [
    { example: 'It was a deliberate decision to leave the company and pursue a new career.', correct: 'それは会社を去り、新しいキャリアを追求するための意図的な決定だった。', wrong: ['それは会社を去り、新しいキャリアを追求するための衝動的な決定だった。', 'それは会社に留まり、新しいキャリアを追求するための意図的な決定だった。', 'それは会社を去り、同じキャリアを追求するための意図的な決定だった。'] },
    { example: 'The jury found the defendant guilty of deliberate assault.', correct: '陪審団は被告を意図的な暴力で有罪と判断した。', wrong: ['陪審団は被告を過失致傷で有罪と判断した。', '陪審団は被告人を意図的な暴力で有罪と判断した。', '裁判官は被告を意図的な暴力で有罪と判断した。'] },
    { example: 'The speaker\'s deliberate pace and tone emphasized the importance of the message.', correct: 'スピーカーの意図的なペースとトーンはメッセージの重要性を強調した。', wrong: ['スピーカーの速い速度とトーンはメッセージの重要性を強調した。', 'スピーカーの意図的なペースと音量はメッセージの重要性を強調した。', '聴者の意図的なペースとトーンはメッセージの重要性を強調した。'] },
  ],
  'democratic': [
    { example: 'Japan is a democratic country.', correct: '日本は民主的な国です。', wrong: ['日本は独裁的な国です。', '日本は民主的な都市です。', '日本は民主的な政府ではありません。'] },
    { example: 'The company uses a democratic approach to decision-making.', correct: 'その会社は意思決定に民主的なアプローチを使用しています。', wrong: ['その会社は意思決定に独裁的なアプローチを使用しています。', 'その会社は意思決定に民主的な方法を拒否しています。', 'その会社は民主的な環境を持っていません。'] },
    { example: 'A democratic society values the opinions of all citizens.', correct: '民主的な社会はすべての市民の意見を大切にしています。', wrong: ['民主的な社会は一部の市民の意見だけを大切にしています。', '独裁的な社会はすべての市民の意見を大切にしています。', '民主的な社会は市民の意見を無視しています。'] },
  ],
  'dense': [
    { example: 'Tokyo is a densely populated city.', correct: '東京は人口密度の高い都市です。', wrong: ['東京は人口密度の低い都市です。', '東京は非常にまばらな都市です。', '東京は人口密度が平均的な都市です。'] },
    { example: 'The forest is so dense that sunlight barely reaches the ground.', correct: 'その森は非常に密集しているので、日光がほとんど地面に届きません。', wrong: ['その森は非常に開かれているので、日光がほとんど地面に届きません。', 'その森は密集しているので、日光が完全に地面に届きます。', 'その森は非常にまばらなので、日光が完全に地面に届きます。'] },
    { example: 'This textbook contains dense information on quantum physics.', correct: 'この教科書は量子物理学に関する密度の高い情報を含んでいます。', wrong: ['この教科書は量子物理学に関する薄い情報を含んでいます。', 'この教科書は量子物理学に関する単純な情報を含んでいます。', 'この教科書は量子物理学に関する空の情報を含んでいます。'] },
  ],
  'dimension': [
    { example: 'The problem has many dimensions.', correct: 'その問題には多くの側面がある。', wrong: ['その問題には多くの寸法がある。', 'その問題には少しの側面がある。', 'その課題には多くの側面がある。'] },
    { example: 'We need to measure the dimensions of the room.', correct: '部屋の寸法を測定する必要がある。', wrong: ['部屋の側面を測定する必要がある。', '部屋の大きさの側面を測定する必要がある。', '床の寸法を測定する必要がある。'] },
    { example: 'The ethical dimension of this decision is important.', correct: 'この決定の倫理的側面は重要である。', wrong: ['この決定の倫理的寸法は重要である。', 'その決定の倫理的側面は重要である。', 'この決定の道徳的寸法は重要である。'] },
  ],
  'diminish': [
    { example: 'The pain gradually diminished.', correct: '痛みは徐々に減少した。', wrong: ['痛みは徐々に増加した。', '痛みは急激に減少した。', '痛みは徐々に消えた。'] },
    { example: 'His interest in the project began to diminish.', correct: 'プロジェクトへの彼の関心は減少し始めた。', wrong: ['プロジェクトへの彼の興奮は減少し始めた。', 'プロジェクトへの彼の関心は増加し始めた。', 'プロジェクトへの彼女の関心は減少し始めた。'] },
    { example: 'The sound of the music diminished as we walked away.', correct: '私たちが歩き去るにつれて、音楽の音は減少した。', wrong: ['私たちが歩き去るにつれて、音楽の音は大きくなった。', '私たちが走り去るにつれて、音楽の音は減少した。', '彼らが歩き去るにつれて、音楽の音は減少した。'] },
  ],
  'discharge': [
    { example: 'The factory discharged waste into the river.', correct: '工場は廃棄物を川に放出した。', wrong: ['工場は廃棄物を川から吸収した。', '工場は廃棄物を川に保管した。', '工場は廃棄物を陸地に放出した。'] },
    { example: 'The patient was discharged from the hospital yesterday.', correct: '患者は昨日病院から退院した。', wrong: ['患者は昨日病院に入院した。', '患者は明日病院から退院した。', '患者は昨日診療所から退院した。'] },
    { example: 'The soldier was honorably discharged after 20 years of service.', correct: '兵士は20年の勤務後、名誉除隊された。', wrong: ['兵士は20年の勤務後、兵役に招集された。', '兵士は10年の勤務後、名誉除隊された。', '将校は20年の勤務後、名誉除隊された。'] },
  ],
  'discipline': [
    { example: 'Self-discipline is the key to success.', correct: '自己規律は成功の鍵である。', wrong: ['自己学問分野は成功の鍵である。', '自己統制は成功の要因である。', '自己規律が成功に導く。'] },
    { example: 'He is studying a difficult discipline in university.', correct: '彼は大学で難しい学問分野を勉強している。', wrong: ['彼は大学で難しい規律を勉強している。', '彼は大学院で難しい学問分野を勉強している。', '彼女は大学で難しい学問分野を勉強している。'] },
    { example: 'The coach will discipline any player who breaks the rules.', correct: 'コーチはルールを破ったプレイヤーに懲罰を与えるだろう。', wrong: ['コーチはルールを破ったプレイヤーに学問分野を教えるだろう。', 'トレーナーはルールを破ったプレイヤーに懲罰を与えるだろう。', 'コーチはルールを守ったプレイヤーに懲罰を与えるだろう。'] },
  ],
  'discrimination': [
    { example: 'Racial discrimination is against the law.', correct: '人種差別は法律に違反している。', wrong: ['人種差別は法律に従っている。', '性別差別は法律に違反している。', '民族差別は法律に反対している。'] },
    { example: 'The company was sued for age discrimination.', correct: 'その企業は年齢差別で訴えられた。', wrong: ['その企業は年齢差別で判決した。', 'その組織は年齢差別で訴えられた。', 'その企業は性差別で告発された。'] },
    { example: 'We need better discrimination between these two concepts.', correct: 'これら二つの概念をより良く区別する必要がある。', wrong: ['これら二つの概念をより良く差別する必要がある。', 'これら三つの概念をより良く区別する必要がある。', 'これら二つの理論をより良く区別する必要がある。'] },
  ],
  'dispute': [
    { example: 'The labor dispute lasted for weeks.', correct: '労働紛争は数週間続いた。', wrong: ['労働紛争は数ヶ月続いた。', '労働争議は数週間継続した。', '労働問題は数週間続いた。'] },
    { example: 'They had a dispute over property ownership.', correct: '彼らは財産所有権について紛争があった。', wrong: ['彼らは財産所有権について合意があった。', '彼女らは財産所有権について紛争があった。', '彼らは財産価値について紛争があった。'] },
    { example: 'I dispute your claim that the data is accurate.', correct: 'データが正確であるというあなたの主張に異議を唱える。', wrong: ['データが正確であるというあなたの主張に同意する。', 'データが誤っているというあなたの主張に異議を唱える。', '証拠が正確であるというあなたの主張に異議を唱える。'] },
  ],
  'distinct': [
    { example: 'The two species are quite distinct.', correct: 'その2つの種は非常に異なっています。', wrong: ['その2つの種は非常に似ています。', 'その2つの種はほぼ同じです。', 'その3つの種は非常に異なっています。'] },
    { example: 'I could hear a distinct accent in her voice.', correct: '私は彼女の声にはっきりした口調を聞くことができました。', wrong: ['私は彼女の声に曖昧な口調を聞くことができました。', '私は彼女の声に明確でない口調を聞くことができました。', '私は彼の声にはっきりした口調を聞くことができました。'] },
    { example: 'There is a distinct difference between the two products.', correct: 'その2つの製品の間には明確な違いがあります。', wrong: ['その2つの製品の間には曖昧な違いがあります。', 'その2つの製品の間には違いはありません。', 'その3つの製品の間には明確な違いがあります。'] },
  ],
  'distinguish': [
    { example: 'Can you distinguish the two sounds?', correct: 'あなたは2つの音を区別できますか？', wrong: ['あなたは2つの光を区別できますか？', 'あなたは3つの音を区別できますか？', 'あなたは2つの音を識別できますか？'] },
    { example: 'It\'s hard to distinguish between the twin sisters.', correct: 'その双子の姉妹を区別するのは難しい。', wrong: ['その双子の兄弟を区別するのは難しい。', 'その双子の姉妹を見分けるのは簡単だ。', 'その三つ子の姉妹を区別するのは難しい。'] },
    { example: 'This achievement will distinguish her from her peers.', correct: 'この業績は彼女を同僚から際立たせるだろう。', wrong: ['この失敗は彼女を同僚から際立たせるだろう。', 'この業績は彼を同僚から際立たせるだろう。', 'この業績は彼女を同僚と同等にするだろう。'] },
  ],
  'distribute': [
    { example: 'Volunteers distributed food to the victims.', correct: 'ボランティアは被害者に食料を配布した。', wrong: ['ボランティアは被害者から食料を集めた。', 'ボランティアは被害者に服を配布した。', '職員は被害者に食料を配布した。'] },
    { example: 'The company will distribute dividends to shareholders next month.', correct: 'その会社は来月株主に配当金を配布するだろう。', wrong: ['その会社は来月株主から配当金を回収するだろう。', 'その会社は今月株主に配当金を配布するだろう。', 'その企業は来月株主に配当金を配布するだろう。'] },
    { example: 'The teacher distributed the test papers evenly among the students.', correct: '教師は生徒に試験紙を均等に配布した。', wrong: ['教師は生徒から試験紙を回収した。', '教師は生徒に試験紙を不均等に配布した。', '先生は生徒に試験紙を均等に配布した。'] },
  ],
  'diverse': [
    { example: 'Japan has a diverse culture.', correct: '日本は多様な文化を持っています。', wrong: ['日本は単一の文化を持っています。', '日本は限定的な文化を持っています。', '日本は均一な文化を持っています。'] },
    { example: 'The team consists of diverse backgrounds and experiences.', correct: 'そのチームは多様なバックグラウンドと経験で構成されています。', wrong: ['そのチームは同じバックグラウンドと経験で構成されています。', 'そのチームは似たバックグラウンドと経験で構成されています。', 'そのチームは限定的なバックグラウンドと経験で構成されています。'] },
    { example: 'The company employs a diverse workforce from around the world.', correct: 'その会社は世界中から多様な労働力を雇用しています。', wrong: ['その会社は同じ国から多様な労働力を雇用しています。', 'その会社は世界中から均一な労働力を雇用しています。', 'その会社は世界中から限定的な労働力を雇用しています。'] },
  ],
  'domestic': [
    { example: 'Domestic travel is cheaper than going abroad.', correct: '国内旅行は海外旅行より安いです。', wrong: ['国際旅行は海外旅行より安いです。', '国内旅行は海外旅行より高いです。', '国内旅行は国内旅行より安いです。'] },
    { example: 'The airline operates both domestic and international flights.', correct: 'その航空会社は国内便と国際便の両方を運航しています。', wrong: ['その航空会社は海外便と国際便の両方を運航しています。', 'その航空会社は国内便だけを運航しています。', 'その航空会社は外国便と国際便の両方を運航しています。'] },
    { example: 'Domestic violence is a serious social issue.', correct: 'ドメスティック・バイオレンスは深刻な社会問題です。', wrong: ['国際暴力は深刻な社会問題です。', '家庭内の愛情は深刻な社会問題です。', '外国の暴力は深刻な社会問題です。'] },
  ],
  'dominate': [
    { example: 'The team dominated the game.', correct: 'そのチームはゲームを支配した。', wrong: ['そのチームはゲームに負けた。', 'そのチームはゲームを観察した。', 'その選手はゲームを支配した。'] },
    { example: 'The tall building dominates the city skyline.', correct: 'その高い建物は市街地の景観を支配している。', wrong: ['その低い建物は市街地の景観を支配している。', 'その高い建物は市街地から見えない。', 'その高い建物は市街地の景観を補完している。'] },
    { example: 'She dominated the conversation for the entire meeting.', correct: '彼女は会議全体の会話を支配した。', wrong: ['彼女は会議全体の会話に参加した。', '彼は会議全体の会話を支配した。', '彼女は会議の一部の会話を支配した。'] },
  ],
  'dramatic': [
    { example: 'There has been a dramatic increase in prices.', correct: '価格が劇的に上昇しています。', wrong: ['価格がわずかに上昇しています。', '価格が劇的に下降しています。', '価格に劇的な変化はありません。'] },
    { example: 'The sunset created a dramatic sky filled with red and orange colors.', correct: '夕日は赤とオレンジ色で満ちた劇的な空を作りました。', wrong: ['朝日は赤とオレンジ色で満ちた劇的な空を作りました。', '夕日は赤とオレンジ色で満ちた地味な空を作りました。', '夕日は青と紫色で満ちた劇的な空を作りました。'] },
    { example: 'Her dramatic performance moved the entire audience.', correct: '彼女の劇的な演技は観客全体を感動させました。', wrong: ['彼女の単調な演技は観客全体を感動させました。', '彼女の劇的な演技は観客全体を退屈させました。', '彼の劇的な演技は観客全体を感動させました。'] },
  ],
  'duration': [
    { example: 'The duration of the flight is ten hours.', correct: '飛行時間は10時間である。', wrong: ['飛行距離は10時間である。', '飛行時間は10時間以上である。', 'フライトの費用は10時間である。'] },
    { example: 'What is the duration of your contract?', correct: 'あなたの契約の期間はどのくらいですか？', wrong: ['あなたの契約の価格はどのくらいですか？', 'その契約の期間はどのくらいですか？', 'あなたの契約の金額はどのくらいですか？'] },
    { example: 'The medication should be taken for the duration of the illness.', correct: '病気の期間中、その薬を服用する必要があります。', wrong: ['病気の治療中、その薬を服用する必要があります。', '病気の開始まで、その薬を服用する必要があります。', '病気の症状の間、その薬を服用する必要があります。'] },
  ],
  'economic': [
    { example: 'The country faces economic challenges.', correct: 'その国は経済的な課題に直面しています。', wrong: ['その国は文化的な課題に直面しています。', 'その国は政治的な課題に直面しています。', 'その国は経済的な利益に直面しています。'] },
    { example: 'Economic growth is essential for the development of a nation.', correct: '経済成長は国家の発展に不可欠です。', wrong: ['経済衰退は国家の発展に不可欠です。', '文化的成長は国家の発展に不可欠です。', '政治的成長は国家の発展に不可欠です。'] },
    { example: 'The company made an economic decision to reduce costs.', correct: 'その会社はコストを削減する経済的な決定をしました。', wrong: ['その会社はコストを増加する経済的な決定をしました。', 'その会社はコストを削減する非経済的な決定をしました。', 'その会社はコストを削減する政治的な決定をしました。'] },
  ],
  'efficiency': [
    { example: 'We need to improve energy efficiency.', correct: 'エネルギー効率を改善する必要がある。', wrong: ['エネルギー効率を減らす必要がある。', '電力効率を改善する必要がある。', 'エネルギー消費を改善する必要がある。'] },
    { example: 'The new system increased production efficiency by 30%.', correct: '新しいシステムは生産効率を30%増加させた。', wrong: ['新しいシステムは生産効率を30%減少させた。', '新しい機械は生産効率を30%増加させた。', '古いシステムは生産効率を30%増加させた。'] },
    { example: 'We admire her efficiency in completing the project.', correct: '私たちは彼女がプロジェクトを完了した効率を賞賛する。', wrong: ['私たちは彼女がプロジェクトを完了した速度を賞賛する。', '私たちは彼がプロジェクトを完了した効率を賞賛する。', '私たちは彼女が仕事を完了した効率を賞賛する。'] },
  ],
  'elaborate': [
    { example: 'She wore an elaborate costume.', correct: '彼女は手の込んだ衣装を着ていました。', wrong: ['彼女はシンプルな衣装を着ていました。', '彼女は手の込んだ靴を着ていました。', '彼は手の込んだ衣装を着ていました。'] },
    { example: 'The chef prepared an elaborate meal with many courses.', correct: 'シェフは多くのコースを含む手の込んだ食事を準備しました。', wrong: ['シェフはわずかなコースを含む手の込んだ食事を準備しました。', 'シェフは多くのコースを含むシンプルな食事を準備しました。', 'シェフは多くのコースを含む質素な食事を準備しました。'] },
    { example: 'The wedding ceremony featured elaborate decorations and arrangements.', correct: '結婚式は手の込んだ装飾と配置が特徴でした。', wrong: ['結婚式はシンプルな装飾と配置が特徴でした。', '葬式は手の込んだ装飾と配置が特徴でした。', '結婚式は手の込んだ食べ物と飲み物が特徴でした。'] },
  ],
  'eliminate': [
    { example: 'We need to eliminate waste.', correct: '私たちは廃棄物を排除する必要がある。', wrong: ['私たちは廃棄物を減らす必要がある。', '私たちは廃棄物を保管する必要がある。', '彼らは廃棄物を排除する必要がある。'] },
    { example: 'The security team will eliminate potential threats.', correct: 'セキュリティチームは潜在的な脅威を排除するだろう。', wrong: ['セキュリティチームは確実な脅威を排除するだろう。', 'セキュリティチームは潜在的な脅威を監視するだろう。', '警察チームは潜在的な脅威を排除するだろう。'] },
    { example: 'Three candidates were eliminated in the first round.', correct: '3人の候補者は第1ラウンドで脱落した。', wrong: ['3人の候補者は第1ラウンドで選抜された。', '5人の候補者は第1ラウンドで脱落した。', '3人の候補者は第2ラウンドで脱落した。'] },
  ],
  'embrace': [
    { example: 'The company embraced the new technology.', correct: 'その会社は新しい技術を受け入れた。', wrong: ['その会社は新しい技術を拒否した。', 'その会社は古い技術を受け入れた。', 'その企業は新しい技術を受け入れた。'] },
    { example: 'He embraced his old friend when he arrived.', correct: '彼は到着したとき、古い友人を抱きしめた。', wrong: ['彼は出発したとき、古い友人を抱きしめた。', '彼は到着したとき、新しい友人を抱きしめた。', '彼女は到着したとき、古い友人を抱きしめた。'] },
    { example: 'The government embraced sustainable development policies.', correct: '政府は持続可能な開発政策を受け入れた。', wrong: ['政府は持続不可能な開発政策を受け入れた。', '政府は持続可能な開発政策を拒否した。', '議会は持続可能な開発政策を受け入れた。'] },
  ],
  'emerge': [
    { example: 'New evidence emerged during the trial.', correct: '審判中に新しい証拠が現れた。', wrong: ['審判中に古い証拠が現れた。', '審判後に新しい証拠が現れた。', '判決中に新しい証拠が現れた。'] },
    { example: 'The sun emerged from behind the clouds.', correct: '太陽は雲の後ろから現れた。', wrong: ['太陽は雲の後ろに消えた。', '月は雲の後ろから現れた。', '太陽は雲の中に現れた。'] },
    { example: 'A new leader emerged from the ranks of the party.', correct: '党の階級から新しいリーダーが現れた。', wrong: ['党の階級に新しいリーダーが消えた。', '古いリーダーが党の階級から現れた。', '党の指導部から新しいリーダーが現れた。'] },
  ],
  'emission': [
    { example: 'Carbon emissions must be reduced.', correct: '炭素排出は削減する必要がある。', wrong: ['炭素排出は増加する必要がある。', '二酸化炭素排出は削減する必要がある。', '炭素汚染は削減する必要がある。'] },
    { example: 'The factory\'s emissions polluted the air.', correct: 'その工場の排出物は空気を汚染した。', wrong: ['その工場の排気は空気を浄化した。', 'その企業の排出物は空気を汚染した。', 'その工場の排出物は水を汚染した。'] },
    { example: 'We are checking vehicle emissions at the station.', correct: '私たちはステーションで車両排出を検査している。', wrong: ['私たちはステーションで車両燃料を検査している。', '彼らはステーションで車両排出を検査している。', '私たちはガレージで車両排出を検査している。'] },
  ],
  'emit': [
    { example: 'Cars emit carbon dioxide.', correct: '車は二酸化炭素を放出する。', wrong: ['車は二酸化炭素を吸収する。', '車は二酸化炭素を削減する。', '車は二酸化炭素を貯蔵する。'] },
    { example: 'The factory emits toxic gases into the atmosphere.', correct: 'その工場は有毒ガスを大気中に放出する。', wrong: ['その工場は有毒ガスを大気中に吸収する。', 'その工場は有毒ガスを大気中に隠す。', 'その工場は有毒ガスを大気中に変換する。'] },
    { example: 'The lamp emits a warm light.', correct: 'そのランプは暖かい光を放出する。', wrong: ['そのランプは暖かい光を吸収する。', 'そのランプは暖かい光を遮断する。', 'そのランプは冷たい光を放出する。'] },
  ],
  'enable': [
    { example: 'Technology enables us to work remotely.', correct: 'テクノロジーは私たちがリモートで働くことを可能にする。', wrong: ['テクノロジーは私たちがリモートで働くことを制限する。', 'テクノロジーは私たちがリモートで働くことを禁止する。', 'テクノロジーは私たちがリモートで働くことを困難にする。'] },
    { example: 'A good education enables success in life.', correct: '良い教育は人生の成功を可能にする。', wrong: ['良い教育は人生の成功を妨害する。', '良い教育は人生の成功を防ぐ。', '良い教育は人生の失敗を可能にする。'] },
    { example: 'This software enables users to edit videos easily.', correct: 'このソフトウェアはユーザーが簡単にビデオを編集することを可能にする。', wrong: ['このソフトウェアはユーザーが簡単にビデオを編集することを禁止する。', 'このソフトウェアはユーザーが簡単に音声を編集することを可能にする。', 'このソフトウェアはユーザーが難しくビデオを編集することを可能にする。'] },
  ],
  'enthusiasm': [
    { example: 'She showed great enthusiasm for the project.', correct: '彼女はそのプロジェクトに大きな熱意を示した。', wrong: ['彼女はそのプロジェクトに大きな関心を示した。', '彼はそのプロジェクトに大きな熱意を示した。', '彼女はその計画に大きな熱意を示した。'] },
    { example: 'The team\'s enthusiasm inspired everyone around them.', correct: 'そのチームの熱意は彼らの周りのみんなにインスピレーションを与えた。', wrong: ['その組織の熱意は彼らの周りのみんなにインスピレーションを与えた。', 'そのチームの努力は彼らの周りのみんなにインスピレーションを与えた。', 'そのチームの熱意は彼らの後ろのみんなにインスピレーションを与えた。'] },
    { example: 'He joined the club with youthful enthusiasm.', correct: '彼は若々しい熱意でそのクラブに参加した。', wrong: ['彼は若々しい熱意でその組織に入った。', '彼女は若々しい熱意でそのクラブに参加した。', '彼は若い年齢でそのクラブに参加した。'] },
  ],
};
