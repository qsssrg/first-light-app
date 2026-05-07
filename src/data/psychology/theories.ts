export interface Theory {
  id: string;
  name: string;
  nameEn: string;
  author: string;
  year: number;
  summary: string;
  connection: string;
  icon: string;
  category?: 'traditional' | 'social';
  experimentDescription?: string;
  keyFindings?: string[];
  firstLightComment?: string;
  discussionQuestions?: string[];
  relatedTheories?: string[];
}

// ── 伝統心理学（12理論） ──

export const TRADITIONAL_THEORIES: Theory[] = [
  {
    id: 'wundt-structuralism',
    name: '構成主義心理学',
    nameEn: 'Structuralism',
    author: 'Wilhelm Wundt',
    year: 1879,
    summary: '意識を基本的な要素に分解し、内観法によってその構造を解明しようとした。世界初の心理学実験室をライプツィヒ大学に設立し、心理学を哲学から独立した科学として確立した。',
    connection: '推しのパフォーマンスを見たとき、「感動」を分解するとどうなる？ 視覚的興奮、聴覚的快楽、帰属意識——ファン体験を要素に分解して内省する営みそのもの。',
    icon: '🔬',
    category: 'traditional',
    experimentDescription: '1879年、ライプツィヒ大学に世界初の心理学実験室を設立。被験者に刺激を与え、その意識体験を詳細に報告させる「内観法」を用いた。',
    keyFindings: [
      '意識は感覚・感情・意志の基本要素に分解できる',
      '心理学は実験科学として成立しうる',
      '反応時間の測定により精神過程の速度を計測可能',
    ],
    firstLightComment: '「推し活の"楽しい"って、分解してみると意外と複雑。ヴントが100年前にやろうとしたことを、私たちは日記に書いてる」',
    discussionQuestions: [
      'ライブ後の「良かった」を5つの感覚に分解するとしたら？',
      '推し活で感じる「モヤモヤ」はどんな要素でできている？',
    ],
    relatedTheories: ['freud-psychoanalysis', 'piaget-cognitive-development'],
  },
  {
    id: 'freud-psychoanalysis',
    name: '精神分析',
    nameEn: 'Psychoanalysis',
    author: 'Sigmund Freud',
    year: 1900,
    summary: '人間の行動は無意識の欲望や葛藤に支配されている。意識・前意識・無意識の三層構造と、イド・自我・超自我の力動的モデルを提唱した。',
    connection: '「なぜこの人を推すのか」を論理的に説明できない——それはフロイトが言う無意識の投影かもしれない。理想の自己像や満たされない欲求が、推しという対象に向かう。',
    icon: '🛋️',
    category: 'traditional',
    experimentDescription: '自由連想法、夢分析、失錯行為（言い間違い）の分析を通じて、無意識の内容を意識化しようとした臨床的手法。',
    keyFindings: [
      '人間の行動の多くは無意識的動機に駆動される',
      '幼少期の経験が成人後の性格を形成する',
      '防衛機制（抑圧・投影・昇華など）で心理的葛藤に対処する',
    ],
    firstLightComment: '「推しに"理想の自分"を見ているのかも——フロイトに言わせれば投影。でもそれが悪いことだとは思わない」',
    discussionQuestions: [
      '推しに惹かれる理由を「意識的な理由」と「なんとなく」に分けてみて',
      '推しが自分にとって何を象徴しているか考えたことはある？',
    ],
    relatedTheories: ['jung-analytical', 'erikson-psychosocial'],
  },
  {
    id: 'jung-analytical',
    name: '分析心理学',
    nameEn: 'Analytical Psychology',
    author: 'Carl Gustav Jung',
    year: 1913,
    summary: '個人的無意識に加え、人類に共通する集合的無意識の存在を提唱。元型（アーキタイプ）というパターンが神話・夢・文化に繰り返し現れると論じた。',
    connection: '「推し」が持つ英雄・トリックスター・影といった元型的イメージ。ファンダムが無意識的に共有する「推し物語」の構造はユングの元型論そのもの。',
    icon: '🌙',
    category: 'traditional',
    experimentDescription: '言語連想テストを開発。刺激語に対する反応時間や内容の乱れからコンプレックス（感情複合体）の存在を実証した。',
    keyFindings: [
      '集合的無意識は文化を超えて共通する心的構造である',
      '元型（英雄・母・影・アニマ/アニムス）は普遍的なイメージパターン',
      '個性化（自己実現）は意識と無意識の統合過程である',
    ],
    firstLightComment: '「推しがステージで見せる姿って"英雄の元型"かも。弱さを見せる瞬間は"影"。ファンは物語の目撃者になる」',
    discussionQuestions: [
      'あなたの推しはどの元型に近い？（英雄、賢者、道化師…）',
      'ファンダム内で繰り返し語られる「推しの物語」のパターンは？',
    ],
    relatedTheories: ['freud-psychoanalysis', 'social-identity'],
  },
  {
    id: 'pavlov-classical-conditioning',
    name: '古典的条件づけ',
    nameEn: 'Classical Conditioning',
    author: 'Ivan Pavlov',
    year: 1897,
    summary: '無条件刺激と中性刺激を繰り返し対提示すると、中性刺激だけで同様の反応が生じるようになる。「パブロフの犬」として知られる学習理論の基礎。',
    connection: '推しの登場SEが流れるだけで心拍が上がる。特定の香水の匂いでライブの記憶が蘇る——これは条件づけされた感情反応。',
    icon: '🔔',
    category: 'traditional',
    experimentDescription: '犬にベルの音（中性刺激）を鳴らした直後に餌（無条件刺激）を与えることを繰り返した。やがてベルだけで唾液分泌（条件反応）が生じた。',
    keyFindings: [
      '反復的な対提示により新しい刺激-反応関係が形成される',
      '条件反応は強化なしでは消去されるが、自発的回復する',
      '類似刺激への般化と弁別が起こる',
    ],
    firstLightComment: '「推しのイントロが流れた瞬間に泣きそうになるのは、パブロフの犬と同じ原理。条件づけられた幸福感ってこういうことか」',
    discussionQuestions: [
      '推し活で「これを見る/聞くと自動的に感情が動く」ものは何？',
      '推し変した後も前の推しの曲で反応するのはなぜ？',
    ],
    relatedTheories: ['skinner-operant-conditioning', 'bandura-social-learning'],
  },
  {
    id: 'skinner-operant-conditioning',
    name: 'オペラント条件づけ',
    nameEn: 'Operant Conditioning',
    author: 'B.F. Skinner',
    year: 1938,
    summary: '行動の結果（報酬や罰）によってその行動の頻度が変化する。正の強化・負の強化・正の罰・負の罰の4つのパターンで行動を制御できる。',
    connection: '推しからのレスポンス（ファンサ、いいね）は間欠強化。いつ来るかわからない報酬だからこそ、ファンは何度も現場に通い続ける——スキナー箱のハトと同じ構造。',
    icon: '🐀',
    category: 'traditional',
    experimentDescription: 'スキナー箱と呼ばれる装置で、ラットやハトにレバー押し/ボタン突きを学習させた。報酬のスケジュール（連続・間欠・比率・間隔）による行動パターンの違いを精密に記録。',
    keyFindings: [
      '間欠強化された行動は消去に最も抵抗する',
      '変動比率スケジュールが最も高い反応率を生む',
      '行動は環境の随伴性によって形成される（行動分析学の基礎）',
    ],
    firstLightComment: '「ファンサがもらえるかわからないから通い続ける——ガチャと同じ。変動比率スケジュール、恐ろしい」',
    discussionQuestions: [
      '推し活で「報酬」と感じるものをリストアップすると？',
      'もし毎回確実にファンサがもらえたら、同じ熱量で通い続ける？',
    ],
    relatedTheories: ['pavlov-classical-conditioning', 'bandura-social-learning'],
  },
  {
    id: 'maslow-hierarchy',
    name: '欲求階層説',
    nameEn: 'Hierarchy of Needs',
    author: 'Abraham Maslow',
    year: 1943,
    summary: '人間の欲求は5段階のピラミッド構造をなす。生理的欲求→安全→所属と愛→承認→自己実現の順に、下位が満たされると上位の欲求が現れる。',
    connection: '推し活は所属欲求（ファンコミュニティへの帰属）と承認欲求（推しからの認知、ファン同士の評価）を同時に満たす。最上位の自己実現を推しに投影する人もいる。',
    icon: '🏔️',
    category: 'traditional',
    experimentDescription: '臨床観察と人物研究に基づく理論構築。リンカーンやアインシュタインなど「自己実現した人物」の特性分析から理論を導出した。',
    keyFindings: [
      '欲求は階層的に組織されている',
      '下位欲求の充足が上位欲求の出現条件',
      '自己実現者には「至高体験」と呼ばれる一体感の瞬間がある',
    ],
    firstLightComment: '「推し活を階層で考えると、最初はコンテンツ消費（安全）→仲間ができて（所属）→認知されたい（承認）→推しを通じて自分を表現する（自己実現）。登ってるんだよね」',
    discussionQuestions: [
      '今の自分の推し活は、マズローの何段目を満たしている？',
      '推し活で「至高体験」に近い瞬間はあった？',
    ],
    relatedTheories: ['rogers-person-centered', 'seligman-positive-psychology'],
  },
  {
    id: 'piaget-cognitive-development',
    name: '認知発達理論',
    nameEn: 'Cognitive Development Theory',
    author: 'Jean Piaget',
    year: 1936,
    summary: '子どもの知的発達は感覚運動期・前操作期・具体的操作期・形式的操作期の4段階を経る。同化と調節のバランスによってスキーマ（認知の枠組み）が発達する。',
    connection: '初めて推し活をする人は既存のスキーマ（「アイドルなんて」）と新体験の衝突を経験する。調節が起きて新しいスキーマ（「推す喜び」）が構築される——認知発達そのもの。',
    icon: '🧒',
    category: 'traditional',
    experimentDescription: '自分の子どもを含む子どもたちの行動を綿密に観察。保存課題（液体の量、数の保存）などを用いて認知発達の段階的変化を実証した。',
    keyFindings: [
      '認知発達は質的に異なる段階を経て進む',
      '同化（既存スキーマへの取り込み）と調節（スキーマの修正）で認知が発達',
      '各段階には固有の思考様式がある',
    ],
    firstLightComment: '「推し活の沼にハマる過程って"調節"だよね。今までの価値観じゃ説明できないから、世界の見方そのものが変わる」',
    discussionQuestions: [
      '推し活を始める前と後で、自分の「世界の見方」はどう変わった？',
      'ファン歴が長くなると推しの見え方が変わるのはスキーマの発達？',
    ],
    relatedTheories: ['wundt-structuralism', 'bandura-social-learning'],
  },
  {
    id: 'erikson-psychosocial',
    name: '心理社会的発達理論',
    nameEn: 'Psychosocial Development Theory',
    author: 'Erik Erikson',
    year: 1950,
    summary: '人間の発達は生涯にわたる8段階の心理社会的危機として捉えられる。各段階で発達課題を乗り越えることで、対応する徳（virtue）を獲得する。',
    connection: '青年期の「アイデンティティ vs 役割の混乱」——推しという存在が自分の価値観や美意識を定義する錨になる。「○○のファンである私」がアイデンティティ形成を助ける。',
    icon: '🔄',
    category: 'traditional',
    experimentDescription: '臨床症例研究と文化人類学的フィールドワーク（ネイティブアメリカンの子育て観察など）を統合した理論構築。',
    keyFindings: [
      '発達は生涯を通じて続く（8段階のライフサイクル）',
      '各段階の危機の解決が健全な人格発達に不可欠',
      'アイデンティティ形成は青年期の中心課題',
    ],
    firstLightComment: '「"自分が何者か"を探す時期に推しに出会えると、すごく救われる。推しが自分のアイデンティティの一部になるのは自然なこと」',
    discussionQuestions: [
      '推し活は自分の「アイデンティティ形成」にどう関わっている？',
      '推しが活動休止・引退したとき、自分のアイデンティティに影響はある？',
    ],
    relatedTheories: ['freud-psychoanalysis', 'social-identity'],
  },
  {
    id: 'rogers-person-centered',
    name: '来談者中心療法',
    nameEn: 'Person-Centered Therapy',
    author: 'Carl Rogers',
    year: 1951,
    summary: '人には自己実現に向かう力が本来備わっている。無条件の肯定的配慮・共感的理解・自己一致の3条件が揃う環境で、人は成長する。',
    connection: '推しを「無条件に肯定する」ファンの姿勢はロジャーズ的。そしてファンコミュニティが「推しのここが好き」と共感し合う場は、成長促進的な環境に近い。',
    icon: '🤝',
    category: 'traditional',
    experimentDescription: 'カウンセリング面接の録音・逐語記録の分析。治療者の態度条件とクライエントの変化の関係を実証的に検証した。',
    keyFindings: [
      '治療的変化は技法より関係性の質に依存する',
      '無条件の肯定的配慮が自己受容を促進する',
      '理想自己と現実自己の一致が心理的適応の指標',
    ],
    firstLightComment: '「"推しのすべてを好き"って無条件の肯定的配慮そのもの。そしてその空間が自分自身を肯定できる場所にもなる」',
    discussionQuestions: [
      'ファンコミュニティは「無条件の肯定」が成立する場所？ 条件付き？',
      '推しに対する「ありのままを受け入れる」と「理想を求める」のバランスは？',
    ],
    relatedTheories: ['maslow-hierarchy', 'seligman-positive-psychology'],
  },
  {
    id: 'bandura-social-learning',
    name: '社会的学習理論',
    nameEn: 'Social Learning Theory',
    author: 'Albert Bandura',
    year: 1961,
    summary: '人は直接経験だけでなく、他者の行動を観察することで学習する（モデリング）。自己効力感——「自分にはできる」という信念——が行動の動機づけを左右する。',
    connection: '推しのパフォーマンスや生き方を「モデル」として観察学習する。「推しが頑張ってるから私も頑張れる」は自己効力感の代理体験そのもの。',
    icon: '👀',
    category: 'traditional',
    experimentDescription: 'ボボ人形実験（1961）。大人がボボ人形を攻撃する映像を見た子どもは、見ていない子どもよりも攻撃的行動を多く示した。',
    keyFindings: [
      '観察学習は直接的な報酬なしに成立する',
      'モデルが報酬を受ける場面を見ると模倣が増える（代理強化）',
      '自己効力感が行動の開始・持続・回復を予測する',
    ],
    firstLightComment: '「推しを見て"自分も頑張ろう"って思うのは観察学習。推しの成功体験が自分の自己効力感を上げてくれる」',
    discussionQuestions: [
      '推しから「学んだ」と感じる行動や考え方は？',
      '推しの成功を見て「自分もできる」と思えた経験はある？',
    ],
    relatedTheories: ['skinner-operant-conditioning', 'pavlov-classical-conditioning'],
  },
  {
    id: 'kahneman-dual-process',
    name: '二重過程理論',
    nameEn: 'Dual Process Theory',
    author: 'Daniel Kahneman',
    year: 1979,
    summary: '人間の思考にはシステム1（直感的・自動的・高速）とシステム2（分析的・意識的・低速）の二つがある。多くの判断はシステム1に依存し、認知バイアスを生む。',
    connection: '「この人を推す」という判断は圧倒的にシステム1。第一印象、直感、ビジュアルの好み——論理では説明できない「ビビッと来た」がすべてを決める。',
    icon: '⚡',
    category: 'traditional',
    experimentDescription: 'プロスペクト理論の実験。同じ期待値でもフレーミング（利益/損失の提示方法）で意思決定が変わることを示した。損失は利益の約2倍強く感じられる（損失回避）。',
    keyFindings: [
      '直感的判断（システム1）は多くの認知バイアスの源泉',
      '損失回避——人は同額の利益より損失を約2倍強く感じる',
      'アンカリング・利用可能性・代表性ヒューリスティクスが判断を歪める',
    ],
    firstLightComment: '「推しのグッズを"これは投資"って言い聞かせるのはシステム2の合理化。買うと決めた瞬間はシステム1。もう負けてる」',
    discussionQuestions: [
      '推しに関する判断で「直感」と「理性」が対立した経験は？',
      '推し活での出費を正当化するとき、どんな認知バイアスが働いている？',
    ],
    relatedTheories: ['cognitive-dissonance', 'elaboration-likelihood'],
  },
  {
    id: 'seligman-positive-psychology',
    name: 'ポジティブ心理学',
    nameEn: 'Positive Psychology',
    author: 'Martin Seligman',
    year: 1998,
    summary: '従来の心理学が病理に焦点を当てたのに対し、人間の強みや幸福を科学的に研究する。PERMA（ポジティブ感情・没頭・関係性・意味・達成）が幸福の5要素。',
    connection: '推し活はPERMAの宝庫。ライブでのポジティブ感情(P)、推しの作品への没頭(E)、ファン仲間との関係(R)、推しを応援する意味(M)、布教の達成感(A)。',
    icon: '🌻',
    category: 'traditional',
    experimentDescription: '当初は「学習性無力感」（1967）の研究から出発。犬に逃避不能な電撃を与え続けると、逃げられる状況でも無気力になることを発見。後にポジティブ心理学へ転換。',
    keyFindings: [
      '幸福はPERMAの5要素で構成される',
      'キャラクター・ストレングス（強み）の活用が幸福感を高める',
      '学習性無力感は楽観的説明スタイルの訓練で克服できる',
    ],
    firstLightComment: '「推し活をPERMAで分析すると、全部入ってる。幸福の条件がこんなにきれいに揃う趣味って他にある？」',
    discussionQuestions: [
      '推し活のPERMA——それぞれ具体的にどんな場面で感じる？',
      '推し活で「学習性無力感」に近い状態になったことは？（チケット全落ちなど）',
    ],
    relatedTheories: ['maslow-hierarchy', 'rogers-person-centered'],
  },
];

// ── 社会心理学（10理論・実験） ──

export const SOCIAL_THEORIES: Theory[] = [
  {
    id: 'asch-conformity',
    name: 'アッシュ同調実験',
    nameEn: 'Asch Conformity Experiment',
    author: 'Solomon Asch',
    year: 1951,
    summary: '明らかに間違った答えでも、周囲の多数派が一致してその答えを選ぶと、被験者の約75%が少なくとも1回は同調する。集団圧力が個人の判断を歪める力を実証した。',
    connection: 'ペンライトの色を揃える。暗黙のルールに従う。「みんなが推しているから」始める布教効果。ファンダム内の同調圧力は強力。',
    icon: '🔗',
    category: 'social',
    experimentDescription: '線分の長さを比較する簡単な課題。7人のサクラが全員同じ間違った答えを言った後、本物の被験者に回答させた。',
    keyFindings: [
      '被験者の約75%が少なくとも1回はサクラに同調',
      '全試行の約32%で同調が発生',
      'サクラが1人でも正答すると同調率は激減する',
    ],
    firstLightComment: '「ファンの空気読み力ってすごい。"ここでペンラ振る"って誰も言ってないのに全員揃う。アッシュが見たら論文もう一本書ける」',
    discussionQuestions: [
      'ファンダム内で「空気を読んで従った」経験は？',
      '自分だけ違う意見を持ったとき、発言できる？ 何があれば発言しやすい？',
    ],
    relatedTheories: ['milgram-obedience', 'group-polarization', 'deindividuation'],
  },
  {
    id: 'milgram-obedience',
    name: 'ミルグラム実験',
    nameEn: 'Milgram Experiment',
    author: 'Stanley Milgram',
    year: 1963,
    summary: '権威者の指示があれば、普通の人でも他者に危険な電撃を与え続けるという衝撃的な実験。被験者の65%が最大450Vまで電撃を続けた。権威への服従の力を示した。',
    connection: '運営・公式の決定に対してファンが従う構造。「公式が言うなら正しい」という心理。推し本人の発言が持つ権威的影響力——推しの一言でファンの行動が変わる。',
    icon: '⚡',
    category: 'social',
    experimentDescription: '被験者は「教師」役として、隣の部屋の「生徒」（実はサクラ）に問題を出し、間違えるたびに電撃の強度を上げるよう実験者（権威者）に指示された。',
    keyFindings: [
      '被験者の65%が最大電圧（450V）まで服従',
      '権威者が同じ部屋にいると服従率が上がる',
      '他の「教師」が拒否する場面を見ると服従率は10%に低下',
    ],
    firstLightComment: '「"公式の言うことだから"で思考停止するの、ミルグラム実験と構造が同じ。権威に従うのが楽なんだよね、考えなくていいから」',
    discussionQuestions: [
      '公式や推し本人の発言に「おかしいな」と思っても従ったことは？',
      'ファンダム内で「権威」として機能しているのは誰/何？',
    ],
    relatedTheories: ['asch-conformity', 'stanford-prison', 'deindividuation'],
  },
  {
    id: 'stanford-prison',
    name: 'スタンフォード監獄実験',
    nameEn: 'Stanford Prison Experiment',
    author: 'Philip Zimbardo',
    year: 1971,
    summary: '看守と囚人の役割をランダムに割り当てた模擬監獄実験。看守役は急速に権威的・虐待的になり、囚人役は無力化した。役割と状況が人間の行動を劇的に変えることを示した。',
    connection: '「古参ファン」と「新規ファン」の力関係。ファンダム内のヒエラルキーで、立場が行動を変える——古参が排他的になり、新規が萎縮する構造は監獄実験に似ている。',
    icon: '🏛️',
    category: 'social',
    experimentDescription: 'スタンフォード大学の地下に模擬監獄を設置。24人の大学生を看守と囚人にランダム割当。予定の2週間を持たず6日で中止された。',
    keyFindings: [
      '与えられた役割が短期間で行動・性格を変容させる',
      '状況の力は個人の性格特性を圧倒しうる',
      '権力の不均衡は急速にエスカレートする',
    ],
    firstLightComment: '「ファンダムのヒエラルキー——運営、古参、新規。役割を与えられると人は本当にその通りに振る舞い始める。怖いけど、自覚するだけでも違う」',
    discussionQuestions: [
      'ファンダム内の「立場」が自分の行動を変えた経験は？',
      '古参/新規の力関係をフラットにするには何が必要？',
    ],
    relatedTheories: ['milgram-obedience', 'deindividuation', 'social-identity'],
  },
  {
    id: 'bystander-effect',
    name: 'バイスタンダー効果',
    nameEn: 'Bystander Effect',
    author: 'Darley & Latané',
    year: 1968,
    summary: '周囲に他の人がいるほど、緊急事態への援助行動が抑制される現象。「誰かがやるだろう」という責任の分散と、他者の無反応を「大丈夫なサイン」と解釈する多元的無知が原因。',
    connection: 'SNSでの炎上や中傷を見ても「誰かが注意するだろう」と放置する。逆に、一人が声を上げると堰を切ったように援護が始まる——バイスタンダー効果の逆転。',
    icon: '👥',
    category: 'social',
    experimentDescription: 'キティ・ジェノヴィーズ事件（1964）を契機に実験。被験者がインターホン越しに他の参加者の発作を聞いた際、「他に聞いている人がいる」と信じると援助行動が遅延した。',
    keyFindings: [
      '傍観者の数が増えるほど援助確率が下がる',
      '責任の分散と多元的無知が主な原因',
      '状況の曖昧さが高いほど傍観が起きやすい',
    ],
    firstLightComment: '「推しが叩かれてるのを見て"でしゃばりたくない"って黙るの、バイスタンダー効果。最初の一人が動くかどうかで全部変わる」',
    discussionQuestions: [
      'ファンダム内で「誰かがやるだろう」と思って動かなかった経験は？',
      '炎上時に「最初の一人」として声を上げるのに必要なものは？',
    ],
    relatedTheories: ['asch-conformity', 'deindividuation', 'group-polarization'],
  },
  {
    id: 'cognitive-dissonance',
    name: '認知的不協和',
    nameEn: 'Cognitive Dissonance',
    author: 'Leon Festinger',
    year: 1957,
    summary: '自分の信念や態度と矛盾する行動をとったとき、不快な緊張（不協和）が生じる。人はこの不快感を解消するため、信念を変えるか行動を正当化する。',
    connection: '「推し活にこんなにお金を使うのは合理的じゃない」と感じつつも続ける——その不協和を「自己投資だから」「推しの才能に値する対価」と正当化する心理。',
    icon: '⚖️',
    category: 'social',
    experimentDescription: '退屈な作業を1ドルまたは20ドルで次の被験者に「楽しかった」と嘘をつかせた。1ドル群は「実は楽しかったかも」と態度を変えた（不協和の解消）。20ドル群は報酬で正当化できたため態度変化なし。',
    keyFindings: [
      '不十分な正当化ほど態度変化が大きい',
      '人は一貫性を保つために信念を歪める',
      '行動後の認知調整は無意識に起こりうる',
    ],
    firstLightComment: '「遠征費10万使った後に"まあ経験はプライスレスだし"って自分に言い聞かせるの、教科書通りの認知的不協和の解消」',
    discussionQuestions: [
      '推し活で「これは合理的じゃない」と感じつつ正当化したことは？',
      '推しの不祥事を知ったとき、信念と事実の矛盾にどう対処した？',
    ],
    relatedTheories: ['kahneman-dual-process', 'asch-conformity', 'elaboration-likelihood'],
  },
  {
    id: 'social-identity',
    name: '社会的アイデンティティ理論',
    nameEn: 'Social Identity Theory',
    author: 'Tajfel & Turner',
    year: 1979,
    summary: '人は自分が属するグループに基づいてアイデンティティを形成し、内集団を好み外集団を差別する傾向がある。最小条件集団パラダイムにより、些細なグループ分けでも内集団びいきが生じることを示した。',
    connection: '「○○担」と名乗ることでファン集団に帰属し、自尊心を高める。他グループのファンとの対比で自己定義する。「うちの推しのファンは民度が高い」という内集団びいき。',
    icon: '🏷️',
    category: 'social',
    experimentDescription: '最小条件集団パラダイム——クレーの絵とカンディンスキーの絵のどちらが好きかだけでグループ分けし、資源配分させた。まったく些細な基準でも内集団への偏向が生じた。',
    keyFindings: [
      '些細なグループ分けでも内集団びいきが生じる',
      '社会的カテゴリー化→社会的同一化→社会的比較の3段階で偏向が形成',
      '集団間の差異を強調することで自尊心を維持・向上させる',
    ],
    firstLightComment: '「"○○ファンの民度が高い"って、典型的な内集団びいき。でもそれが帰属意識を生んで、居場所になるのも事実」',
    discussionQuestions: [
      '自分のファンダムを「他のファンダムと比較」したことは？ そのとき何を感じた？',
      '「推しのファンであること」が自分のアイデンティティのどのくらいを占めている？',
    ],
    relatedTheories: ['asch-conformity', 'group-polarization', 'deindividuation'],
  },
  {
    id: 'parasocial',
    name: 'パラソーシャル関係',
    nameEn: 'Parasocial Relationship',
    author: 'Horton & Wohl',
    year: 1956,
    summary: 'メディアを通じて一方的な親密感を形成する疑似対人関係。視聴者はパフォーマーを「知っている」と感じ、実際の友人に対するのと類似した感情的反応を示す。',
    connection: '推しに「おかえり」と呟く心理。会ったことがなくても親しい友人のように感じる一方通行の関係。SNSの登場でパラソーシャル関係はかつてないほど強化されている。',
    icon: '💫',
    category: 'social',
    experimentDescription: 'テレビ番組の視聴者調査。パーソナリティ（司会者・キャスター）との疑似的な関係が視聴行動や感情にどう影響するかを分析した。',
    keyFindings: [
      'パラソーシャル関係は通常の対人関係と同様の心理的機能を持つ',
      'メディア接触の頻度と自己開示の認知が関係強度を左右する',
      'パラソーシャルブレイクアップ（番組終了等）は実際の失恋に類似した悲嘆を引き起こす',
    ],
    firstLightComment: '「推しの卒業や引退で本気で泣くのは"パラソーシャルブレイクアップ"。一方通行でも関係は本物なんだよ」',
    discussionQuestions: [
      '推しに対して「友達」「家族」のような親密さを感じたことは？',
      '推しが活動を辞めたとき、どんな感情を経験した/経験すると思う？',
    ],
    relatedTheories: ['social-identity', 'maslow-hierarchy', 'rogers-person-centered'],
  },
  {
    id: 'elaboration-likelihood',
    name: '精緻化見込みモデル',
    nameEn: 'Elaboration Likelihood Model',
    author: 'Petty & Cacioppo',
    year: 1986,
    summary: '説得には2つのルートがある。中心ルート（論拠の質を吟味）と周辺ルート（送り手の魅力や手がかりに反応）。動機と能力が高いときは中心ルート、低いときは周辺ルートで態度が変わる。',
    connection: '推しの「布教」には2種類ある。楽曲の良さを論理的に語る中心ルートと、ビジュアルやカリスマ性で「とにかくかっこいいから見て」と訴える周辺ルート。どちらが効くかは相手次第。',
    icon: '📡',
    category: 'social',
    experimentDescription: '大学生に「総合試験導入」の説得メッセージを読ませた。論拠の強さ×情報源の専門性を操作し、関与度が高い条件では論拠の質が、低い条件では情報源の信頼性が態度変化を左右した。',
    keyFindings: [
      '中心ルートによる態度変化は持続的で行動予測力が高い',
      '周辺ルートによる変化は一時的で文脈依存的',
      '関与度（personal relevance）がルート選択の鍵',
    ],
    firstLightComment: '「"この曲のコード進行が〜"で落ちる人もいれば"顔がいいから"で落ちる人もいる。布教戦略は相手を見て変えないと」',
    discussionQuestions: [
      '推しの魅力を人に伝えるとき、中心ルートと周辺ルートのどちらを使う？',
      '自分が推しに「落ちた」きっかけはどちらのルート？',
    ],
    relatedTheories: ['cognitive-dissonance', 'kahneman-dual-process', 'bandura-social-learning'],
  },
  {
    id: 'group-polarization',
    name: '集団極性化',
    nameEn: 'Group Polarization',
    author: 'Stoner / Moscovici',
    year: 1961,
    summary: '集団で議論すると、個人の当初の傾向がより極端な方向に強化される現象。好意的な集団は議論後にさらに好意的に、批判的な集団はさらに批判的になる。',
    connection: 'ファンコミュニティ内で推しへの評価が極端に上がる（or 炎上時は極端に批判的になる）。SNSのアルゴリズムが同質な意見を集め、極性化を加速させる。',
    icon: '📢',
    category: 'social',
    experimentDescription: 'リスキーシフト実験から発展。集団討議の前後でリスク選好や態度評定を測定し、討議後に個人の当初傾向が強まることを繰り返し確認した。',
    keyFindings: [
      '集団討議は個人の傾向を極端化させる',
      '情報的影響（新しい論拠の追加）と規範的影響（集団の方向性への同調）が原因',
      'オンラインコミュニティではさらに強く発生する',
    ],
    firstLightComment: '「ファンが集まると"最高"がどんどんエスカレートする。でも炎上のときはその逆で"最悪"が加速する。集団極性化って両刃の剣」',
    discussionQuestions: [
      'ファンコミュニティの議論で「極端な方向に引っ張られた」経験は？',
      'エコーチェンバーから抜け出すためにできることは？',
    ],
    relatedTheories: ['asch-conformity', 'deindividuation', 'social-identity'],
  },
  {
    id: 'deindividuation',
    name: '脱個人化',
    nameEn: 'Deindividuation',
    author: 'Zimbardo',
    year: 1969,
    summary: '集団の中で個人のアイデンティティが薄れ、普段はしない行動をとるようになる現象。匿名性、責任の分散、感覚的な過負荷が脱個人化を促進する。',
    connection: 'コンサートでの熱狂。暗い会場+大音量+群衆の中で、普段は叫ばない人も叫ぶ。SNSの匿名アカウントでの攻撃的行動も脱個人化の産物。',
    icon: '🎭',
    category: 'social',
    experimentDescription: '被験者を匿名条件（フードで顔を隠す）と非匿名条件に分け、他者への電撃の持続時間を測定。匿名条件の被験者はより長い電撃を与えた。',
    keyFindings: [
      '匿名性が反社会的行動を促進する',
      '集団没入と自己意識の低下が行動の脱抑制を引き起こす',
      '脱個人化はポジティブな方向にも働く（集団的高揚感、一体感）',
    ],
    firstLightComment: '「ライブの一体感って"脱個人化"のポジティブな面。自分が消えて、会場全体が一つの生き物になる。あの感覚は計算では作れない」',
    discussionQuestions: [
      'ライブや現場で「普段の自分じゃない行動」をした経験は？',
      'SNSの匿名性がファンダム内の行動をどう変えている？',
    ],
    relatedTheories: ['stanford-prison', 'bystander-effect', 'group-polarization'],
  },
  {
    id: 'cultural-dimensions',
    name: '文化次元理論',
    nameEn: 'Cultural Dimensions Theory',
    author: 'Geert Hofstede',
    year: 1980,
    summary: '国の文化を複数の次元（個人主義-集団主義、権力距離、不確実性回避、男性性-女性性など）で比較できるフレームワーク。文化差を定量的に分析する道を開いた。',
    connection: '日本のファン行動の統制の高さ vs アメリカのstan cultureの自由さの違い。集団主義文化ではファンダムのルールが暗黙に共有され、個人主義文化では自己表現が優先される。',
    icon: '🌐',
    category: 'social',
    experimentDescription: 'IBM社員40カ国11万6千人への大規模調査（1967-1973）から文化の次元を抽出。後に調査対象を76カ国以上に拡大し、6次元モデルに発展。',
    keyFindings: [
      '文化は個人主義-集団主義、権力距離、不確実性回避、男性性-女性性、長期-短期志向、充足-抑制の6次元で記述できる',
      '日本は集団主義・高不確実性回避・長期志向が特徴的',
      '文化次元の違いがコミュニケーションスタイルや組織行動を規定する',
    ],
    firstLightComment: '「日本のオタクマナーって世界から見ると異常に統制取れてるらしい。集団主義×不確実性回避の高さが"暗黙のルール"を生んでる」',
    discussionQuestions: [
      '海外ファンの行動と日本ファンの行動で驚いた違いはある？',
      '日本のファンダム文化の「暗黙のルール」はどこから来ている？',
    ],
    relatedTheories: ['asch-conformity', 'social-identity', 'group-polarization'],
  },
];

// ── 統合理論リスト ──

export const THEORIES: Theory[] = [...TRADITIONAL_THEORIES, ...SOCIAL_THEORIES];

// ── M7: 小論文エディタ ──

export interface Essay {
  id?: number;
  title: string;
  sections: EssaySection[];
  wordCount: number;
  lastSavedAt: Date;
  createdAt: Date;
}

export interface EssaySection {
  id: string;
  label: string;
  content: string;
}

export const ESSAY_TEMPLATE: EssaySection[] = [
  { id: 'intro', label: '1. 問題意識', content: '' },
  { id: 'method', label: '2. 方法', content: '' },
  { id: 'results', label: '3. 結果', content: '' },
  { id: 'discussion', label: '4. 考察', content: '' },
  { id: 'conclusion', label: '5. 結論と今後の問い', content: '' },
];

// ── F2: 志望理由書ビルダー ──

export interface StatementSection {
  id: string;
  label: string;
  hint: string;
  content: string;
}

export interface StatementReview {
  overall: number;
  structure: number;
  specificity: number;
  academic: number;
  passion: number;
  comment: string;
  improvements: string[];
}

export interface StatementOfPurpose {
  id?: number;
  title: string;
  targetUniversity: string;
  sections: StatementSection[];
  wordCount: number;
  review?: StatementReview;
  lastSavedAt: Date;
  createdAt: Date;
}

// ── 研究メモ ──

export interface ResearchMemo {
  id?: number;
  date: string;
  content: string;
  tags: string[];
  createdAt: Date;
}

export const MEMO_TAGS = ['参与観察', 'SNS分析', 'アンケート', '理論', '日米比較', 'スタッフ', '気づき', '仮説'] as const;

// ── 週次チェックリスト ──

export interface WeeklyTask {
  id: string;
  week: number;
  label: string;
  completed: boolean;
}

export const WEEKLY_CHECKLIST: { week: number; phase: string; tasks: string[] }[] = [
  { week: 1, phase: '準備', tasks: ['観察フレーム（5項目）の確認', 'アンケート設問の下書き', 'ハッシュタグリスト作成'] },
  { week: 2, phase: '準備+Aぇ公演', tasks: ['5/30 Aぇ公演の参与観察', '観察シート記録', 'SNSデータ収集開始(#Aぇ 200件)'] },
  { week: 3, phase: 'データ整理', tasks: ['Aぇ SNSコーディング完了', '会場観察データ整理', 'Googleフォーム最終版作成'] },
  { week: 4, phase: '2連続公演', tasks: ['6/13 Timelesz公演の参与観察', '6/14 back number公演の参与観察', 'SNSデータ収集(各200件)'] },
  { week: 5, phase: 'データ整理+調査', tasks: ['3公演のSNSデータ600件コーディング', 'アンケート配布開始', '英語版アンケート作成'] },
  { week: 6, phase: 'バイト開始', tasks: ['イベントスタッフバイト開始', '運営スタッフ日誌の記録開始', 'アンケート回収確認'] },
  { week: 7, phase: '群衆管理', tasks: ['バイト継続+群衆動線記録', 'アンケート回収完了(目標各30)', 'SNSコーディング600件完了'] },
  { week: 8, phase: 'データ入力', tasks: ['アンケートデータ入力・クリーニング', '日米比較データ統合', 'バイト継続'] },
  { week: 9, phase: '中間分析', tasks: ['SNSデータ初期分析(グラフ作成)', 'アンケート結果クロス集計', '仮説の検証状況チェック'] },
  { week: 10, phase: '分析深化', tasks: ['会場観察3公演比較表完成', 'アンケート統計分析', '小論文アウトライン作成'] },
  { week: 11, phase: '執筆前半', tasks: ['小論文セクション1-3執筆', 'グラフ・表の作成', '参考文献リスト作成'] },
  { week: 12, phase: '執筆後半', tasks: ['小論文セクション4-5執筆', '理論との接続', 'AI添削+親に読んでもらう'] },
  { week: 13, phase: '仕上げ', tasks: ['小論文最終校正', 'ポートフォリオ化(PDF)', '志望理由書への組み込み'] },
];

export const STATEMENT_TEMPLATE: StatementSection[] = [
  {
    id: 'trigger',
    label: '①きっかけ',
    hint: '推し活から心理学への興味がどう芽生えたか。個人的な体験を具体的に書く。「ライブで感じた一体感」「SNSでの集団行動への疑問」など。',
    content: '',
  },
  {
    id: 'research',
    label: '②研究内容',
    hint: '三つの目のフレームワーク（参与観察の目・データの目・当事者の目）で何を研究したか。具体的な手法と対象を述べる。',
    content: '',
  },
  {
    id: 'findings',
    label: '③発見',
    hint: '研究を通じて得た発見。日米比較の結果、理論との接続、数値的な裏付けなど。「社会的アイデンティティ理論で説明できる」のように学術用語を交える。',
    content: '',
  },
  {
    id: 'university',
    label: '④大学で学びたいこと',
    hint: 'なぜこの大学・学部なのか。志望する教授の研究、カリキュラム、ゼミなど具体的に。自分の研究経験とどう接続するか。',
    content: '',
  },
  {
    id: 'future',
    label: '⑤将来の展望',
    hint: '大学卒業後にどう活かすか。「ファン文化の社会心理学的研究者」「エンタメ産業のUXリサーチャー」など、研究と社会をつなぐビジョン。',
    content: '',
  },
];
