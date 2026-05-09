import type { FakeNews } from './fake-news';

// Stage-specific news that appear as chapters are completed
// stage 1 = Ch1-3 (default/existing), stage 2-7 = story progression

export interface StageNews extends FakeNews {
  stage: number;
}

export const STAGE_NEWS: StageNews[] = [
  // ── Stage 2: 事務所の試練 (Ch4) ──
  { stage: 2, title: 'FIRST LIGHT事務所に新スタッフ加入か', body: '事務所関係者によると、グループの強化に向けて新しいスタッフが入ったとのこと', tag: '事務所', titleEn: 'New Staff Joins FIRST LIGHT Office', bodyEn: 'Sources say new staff has joined to strengthen the group.' },
  { stage: 2, title: '芸能事務所が人事を刷新', body: 'メンバーの才能を活かすための新体制。マネージャー陣も入れ替え', tag: '事務所', titleEn: 'Entertainment Agency Restructures Personnel', bodyEn: 'New system to leverage member talents. Manager lineup also changes.' },
  { stage: 2, title: 'FIRST LIGHT、レッスン強化期間に突入', body: '来る大舞台に向けて集中トレーニング。メンバーの表情は真剣', tag: 'スクープ', titleEn: 'FIRST LIGHT Enters Intensive Training Period', bodyEn: 'Focused training for upcoming big stage. Members show serious expressions.' },
  { stage: 2, title: 'カイ「英語は武器になる」と発言', body: 'リーダーが英語学習の重要性を語る。海外展開への布石か', tag: 'インタビュー', titleEn: 'Kai Says "English Is a Weapon"', bodyEn: 'Leader discusses importance of English study. Laying groundwork for global expansion?' },
  { stage: 2, title: 'メンバー、深夜まで事務所で自主練', body: '目撃情報多数。特に語学学習に力を入れている模様', tag: 'スクープ', titleEn: 'Members Practice Late at Office', bodyEn: 'Multiple sightings. Appear to be focusing on language study.' },
  { stage: 2, title: 'FIRST LIGHT、外部コーチ招聘か', body: '英語力強化のための特別講師を検討中との情報', tag: '事務所', titleEn: 'FIRST LIGHT Considers External Coach', bodyEn: 'Reports say they are considering a special instructor for English.' },
  { stage: 2, title: 'ハルト、英語の歌詞執筆に挑戦', body: '新曲の一部が英語歌詞に。独自の表現力で新境地', tag: '音楽', titleEn: 'Haruto Attempts English Lyrics', bodyEn: 'Part of new song features English lyrics. New territory with unique expression.' },
  { stage: 2, title: '事務所「グローバル展開は視野にある」', body: '代表がメディア取材で言及。具体的な時期は未定', tag: '事務所', titleEn: 'Office: "Global Expansion Is in Our Sights"', bodyEn: 'CEO mentions in media interview. Specific timing undecided.' },
  { stage: 2, title: 'レン、海外ミュージシャンとSNSで交流', body: '英語でのやり取りにファン驚き。国際的な人脈を構築中', tag: 'SNS', titleEn: 'Ren Interacts with Foreign Musicians on SNS', bodyEn: 'Fans surprised by English exchanges. Building international connections.' },
  { stage: 2, title: 'ユウキ「英語むずいけど楽しい！」', body: 'ラジオでの発言が話題。明るく学ぶ姿勢にファン共感', tag: 'TV', titleEn: 'Yuuki: "English Is Hard but Fun!"', bodyEn: 'Radio comment becomes topic. Fans empathize with positive attitude.' },

  // ── Stage 3: 対談番組 (Ch5) ──
  { stage: 3, title: 'FIRST LIGHT、対談番組で英語披露！', body: '生放送で流暢な英語を披露し視聴者驚愕。SNSでトレンド入り', tag: 'TV', titleEn: 'FIRST LIGHT Shows Off English on Talk Show!', bodyEn: 'Fluent English on live broadcast shocks viewers. Trends on SNS.' },
  { stage: 3, title: '英語力に視聴者驚き「いつの間に！？」', body: 'メンバーの成長が一目瞭然。視聴率も右肩上がり', tag: 'TV', titleEn: 'Viewers Stunned by English Ability', bodyEn: 'Member growth is obvious. Ratings continue to climb.' },
  { stage: 3, title: 'カイの英語MC、「プロ級」と評判', body: '対談番組での司会ぶりに業界関係者も注目', tag: 'TV', titleEn: 'Kai\'s English MC Called "Professional Level"', bodyEn: 'Industry insiders take note of his hosting skills on talk show.' },
  { stage: 3, title: 'ソラ、英語で文学論を展開し絶賛', body: '対談中にシェイクスピアを引用。知的な魅力を発揮', tag: 'TV', titleEn: 'Sora Discusses Literature in English to Great Acclaim', bodyEn: 'Quotes Shakespeare during talk. Shows intellectual charm.' },
  { stage: 3, title: 'FIRST LIGHTの英語、誰が教えてる？', body: '急速な英語力向上の秘密に迫る。専属トレーナー説も', tag: 'スクープ', titleEn: 'Who\'s Teaching FIRST LIGHT English?', bodyEn: 'Investigating the secret behind rapid English improvement.' },
  { stage: 3, title: '対談番組、過去最高視聴率を記録', body: 'FIRST LIGHT出演回が異例の高視聴率。再放送決定', tag: 'TV', titleEn: 'Talk Show Records All-Time High Ratings', bodyEn: 'FIRST LIGHT episode achieves unusually high ratings. Rerun confirmed.' },
  { stage: 3, title: 'ハルト、英語で即興ソングライティング', body: '番組内で英語の歌詞をその場で作成。才能に賞賛の声', tag: 'TV', titleEn: 'Haruto Writes Song on the Spot in English', bodyEn: 'Creates English lyrics impromptu on air. Talent praised.' },
  { stage: 3, title: '海外メディアもFIRST LIGHTに注目', body: '対談番組の切り抜きが海外で拡散。国際的な注目度上昇', tag: '海外', titleEn: 'International Media Eyes FIRST LIGHT', bodyEn: 'Talk show clips spread overseas. International attention rises.' },
  { stage: 3, title: 'レン「音楽に国境はない」と英語で発言', body: '対談番組でのスピーチが感動を呼ぶ。動画再生数500万回', tag: 'TV', titleEn: 'Ren Says "Music Has No Borders" in English', bodyEn: 'Speech on talk show moves viewers. Video reaches 5 million plays.' },
  { stage: 3, title: 'ユウキの英語トーク、癒し系と話題', body: '独特の温かみある英語表現がファンの心を掴む', tag: 'TV', titleEn: 'Yuuki\'s English Talk Called "Healing"', bodyEn: 'Unique warm English expressions capture fans\' hearts.' },

  // ── Stage 4: 海外進出 (Ch6) ──
  { stage: 4, title: '海外番組からFIRST LIGHTに出演依頼', body: 'アジア最大級の音楽番組から正式オファー。英語でのパフォーマンスを予定', tag: '海外', titleEn: 'Foreign TV Show Invites FIRST LIGHT', bodyEn: 'Official offer from Asia\'s largest music program. English performance planned.' },
  { stage: 4, title: 'FIRST LIGHT、海外フェス出演決定！', body: '世界最大級の音楽フェスティバルへの参加が決定。日本人グループとして快挙', tag: '海外', titleEn: 'FIRST LIGHT to Perform at International Festival!', bodyEn: 'Participation in world\'s largest music festival confirmed. Historic achievement for Japanese group.' },
  { stage: 4, title: '渡航準備が着々と進行中', body: 'メンバーはパスポート取得済み。英語でのMC練習も本格化', tag: '海外', titleEn: 'Travel Preparations Steadily Progressing', bodyEn: 'Members have obtained passports. English MC practice intensifies.' },
  { stage: 4, title: 'カイ「日本を代表する気持ちで」', body: '海外フェスへの意気込みを語る。リーダーとしての決意', tag: 'インタビュー', titleEn: 'Kai: "With the Spirit of Representing Japan"', bodyEn: 'Shares determination for international festival.' },
  { stage: 4, title: '共演アーティスト発表！豪華ラインナップ', body: '世界的アーティストとの共演が決定。緊張と期待', tag: '海外', titleEn: 'Co-Performing Artists Announced! Luxury Lineup', bodyEn: 'Collaboration with world-class artists confirmed.' },
  { stage: 4, title: 'FIRST LIGHT、英語版公式サイトオープン', body: '海外ファン向けに英語版サイトを開設。グローバル戦略が加速', tag: '海外', titleEn: 'FIRST LIGHT Opens English Official Site', bodyEn: 'English site launched for overseas fans. Global strategy accelerates.' },
  { stage: 4, title: 'ハルト、英語で海外ファンにメッセージ', body: 'SNSで英語の投稿を開始。温かい言葉にファン感動', tag: 'SNS', titleEn: 'Haruto Messages Overseas Fans in English', bodyEn: 'Starts posting in English on SNS. Warm words move fans.' },
  { stage: 4, title: '海外メディアが特集記事を掲載', body: '「次世代の日本発グローバルグループ」と紹介される', tag: '海外', titleEn: 'International Media Features Special Article', bodyEn: 'Introduced as "next-generation global group from Japan."' },
  { stage: 4, title: 'ソラ、海外書評サイトでコラム連載開始', body: '英語で書評を執筆。文学の知識が国際的に認められる', tag: '海外', titleEn: 'Sora Starts Column on International Book Review Site', bodyEn: 'Writes book reviews in English. Literary knowledge recognized internationally.' },
  { stage: 4, title: 'レン、海外プロデューサーとコラボ決定', body: '英語での楽曲制作が実現。新たなサウンドに期待', tag: '音楽', titleEn: 'Ren Confirms Collaboration with Foreign Producer', bodyEn: 'English songwriting becomes reality. New sound anticipated.' },

  // ── Stage 5: 恋人誤報 (Ch7) ──
  { stage: 5, title: 'FIRST LIGHTメンバーに恋人発覚か', body: '週刊誌が「事務所に通う謎の人物」を報道。ファン騒然', tag: 'スクープ', titleEn: 'FIRST LIGHT Member\'s Lover Discovered?', bodyEn: 'Weekly magazine reports "mysterious person visiting office." Fans in uproar.' },
  { stage: 5, title: '【速報】FIRST LIGHT事務所が声明発表', body: '「報道された人物はスタッフであり、恋愛関係ではない」と否定', tag: '事務所', titleEn: '[Breaking] FIRST LIGHT Office Issues Statement', bodyEn: '"The reported person is staff, not in a romantic relationship."' },
  { stage: 5, title: '訂正記事: 恋人報道は誤報でした', body: '週刊誌が謝罪。「事務所スタッフを恋人と誤認」と釈明', tag: 'スクープ', titleEn: 'Correction: Lover Report Was False', bodyEn: 'Weekly magazine apologizes. "Misidentified office staff as lover."' },
  { stage: 5, title: 'ファン「信じてた」の声多数', body: '誤報に対するファンの冷静な対応が話題。グループへの信頼の深さ', tag: 'SNS', titleEn: 'Many Fans Say "We Believed in Them"', bodyEn: 'Fans\' calm response to false report becomes topic.' },
  { stage: 5, title: 'カイ「ファンのみんな、ありがとう」', body: '誤報騒動後に感謝のメッセージ。ファンとの絆を再確認', tag: 'SNS', titleEn: 'Kai: "Thank You, Everyone"', bodyEn: 'Grateful message after false report incident.' },
  { stage: 5, title: '週刊誌記者、FIRST LIGHT事務所を出禁に', body: '虚偽報道を行った記者の取材が拒否される', tag: '事務所', titleEn: 'Weekly Magazine Reporter Banned from Office', bodyEn: 'Reporter who published false report denied access.' },
  { stage: 5, title: 'ハルト「大切な人は…みんなだよ」', body: '騒動後のライブMCでの発言にファン涙', tag: 'LIVE', titleEn: 'Haruto: "My Important People Are... All of You"', bodyEn: 'Live MC comment after incident brings fans to tears.' },
  { stage: 5, title: '「謎の人物」の正体に迫る', body: '事務所スタッフとして英語学習を支援していた人物か', tag: 'スクープ', titleEn: 'Approaching the Identity of "Mysterious Person"', bodyEn: 'Person who was supporting English learning as office staff?' },
  { stage: 5, title: 'FIRST LIGHT結束力が話題に', body: '誤報を乗り越えてさらに絆を深めたメンバーたち', tag: 'コラム', titleEn: 'FIRST LIGHT Unity Becomes Topic', bodyEn: 'Members deepen bonds after overcoming false report.' },
  { stage: 5, title: '事務所「今後も応援よろしく」', body: '公式声明で今後の活動への意気込みを表明', tag: '事務所', titleEn: 'Office: "Please Continue to Support Us"', bodyEn: 'Official statement expresses enthusiasm for future activities.' },

  // ── Stage 6: 海外フェス (Ch8-9) ──
  { stage: 6, title: '【速報】FIRST LIGHT、海外フェスで圧巻パフォーマンス！', body: '数万人の観客を前に堂々のステージ。英語MCに会場が沸く', tag: '海外', titleEn: '[Breaking] FIRST LIGHT Delivers Stunning Festival Performance!', bodyEn: 'Confident performance before tens of thousands. English MC electrifies venue.' },
  { stage: 6, title: 'MCの英語が世界中で話題に', body: '「日本からこんなグループが！」SNSで驚きの声が殺到', tag: '海外', titleEn: 'English MC Goes Viral Worldwide', bodyEn: '"A group like this from Japan!" SNS flooded with amazement.' },
  { stage: 6, title: 'カイのMC、「完璧だった」と海外メディア絶賛', body: 'ネイティブ顔負けの英語力に業界関係者も驚愕', tag: '海外', titleEn: 'Kai\'s MC "Was Perfect" Says Foreign Media', bodyEn: 'English ability rivaling natives stuns industry insiders.' },
  { stage: 6, title: 'フェス動画再生数1000万回突破', body: 'パフォーマンス映像が世界中で拡散。新規ファン急増', tag: '海外', titleEn: 'Festival Video Surpasses 10 Million Views', bodyEn: 'Performance footage spreads worldwide. New fans surge.' },
  { stage: 6, title: '共演アーティストがFIRST LIGHTを絶賛', body: '「彼らの音楽は言語を超える」とSNSでコメント', tag: '海外', titleEn: 'Co-Performing Artists Praise FIRST LIGHT', bodyEn: '"Their music transcends language" says artist on SNS.' },
  { stage: 6, title: 'ハルト、海外アーティストと共同作曲', body: 'フェスでの出会いから新たなコラボが実現', tag: '音楽', titleEn: 'Haruto Co-Writes Song with Foreign Artist', bodyEn: 'New collaboration born from festival encounter.' },
  { stage: 6, title: 'レン、即興セッションで会場を魅了', body: '海外ミュージシャンとの予定外セッション。鳥肌もの', tag: 'LIVE', titleEn: 'Ren Captivates Venue with Impromptu Session', bodyEn: 'Unplanned session with foreign musicians. Goosebump-worthy.' },
  { stage: 6, title: 'ソラ「言葉が通じた瞬間が忘れられない」', body: 'フェス後のインタビュー。英語で世界と繋がった感動を語る', tag: 'インタビュー', titleEn: 'Sora: "I Can\'t Forget the Moment Words Connected"', bodyEn: 'Post-festival interview. Shares joy of connecting through English.' },
  { stage: 6, title: 'ユウキ、海外ファンとの交流に感涙', body: '英語で話しかけてくれたファンへ直接お礼。動画が話題', tag: 'SNS', titleEn: 'Yuuki Tears Up Meeting Foreign Fans', bodyEn: 'Thanks fans who spoke in English. Video goes viral.' },
  { stage: 6, title: '日本のエンタメ界に衝撃', body: 'FIRST LIGHTの海外フェス成功が業界全体に影響', tag: 'コラム', titleEn: 'Shockwaves in Japanese Entertainment Industry', bodyEn: 'FIRST LIGHT\'s festival success impacts the entire industry.' },

  // ── Stage 7: 暴露+最終章 (Ch10) ──
  { stage: 7, title: '【独占】FIRST LIGHTの躍進を支えた謎のブレインが判明', body: '英語力急上昇の裏にいた人物。事務所も認める「最重要人物」', tag: 'スクープ', titleEn: '[Exclusive] Secret Brain Behind FIRST LIGHT\'s Rise Identified', bodyEn: 'Person behind rapid English improvement. Office acknowledges "most important person."' },
  { stage: 7, title: 'あの「リムジンの人物」が全ての始まりだった', body: 'デビュー前の出会いが運命を変えた。メンバーが語る感謝', tag: 'スクープ', titleEn: 'That "Limousine Person" Was Where It All Began', bodyEn: 'Pre-debut encounter changed destiny. Members express gratitude.' },
  { stage: 7, title: 'カイ「あの人がいなければ今の俺たちはない」', body: '独占インタビューでブレインへの想いを語る', tag: 'インタビュー', titleEn: 'Kai: "Without That Person, We Wouldn\'t Exist Today"', bodyEn: 'Shares feelings about the brain in exclusive interview.' },
  { stage: 7, title: 'メンバー全員が涙の会見', body: '「一番感謝している人」を公の場で初めて語った', tag: 'TV', titleEn: 'All Members in Tearful Press Conference', bodyEn: 'Publicly speak about "the person they are most grateful to" for the first time.' },
  { stage: 7, title: 'ファン「全部繋がった！」の声', body: 'リムジン事件から始まった物語の全貌が明らかに', tag: 'SNS', titleEn: 'Fans: "It All Connected!"', bodyEn: 'Full picture of story that began with limousine incident revealed.' },
  { stage: 7, title: 'FIRST LIGHT、感謝の特別ライブ開催決定', body: '「あの人に捧げるライブ」として全国ツアー', tag: 'LIVE', titleEn: 'FIRST LIGHT Announces Special Gratitude Concert', bodyEn: 'Nationwide tour as "a concert dedicated to that person."' },
  { stage: 7, title: 'ハルト「全ての歌詞に、あの人がいる」', body: '作詞の源泉について初めて明かす', tag: 'インタビュー', titleEn: 'Haruto: "That Person Is in Every Lyric"', bodyEn: 'Reveals the source of his songwriting for the first time.' },
  { stage: 7, title: '英語学習から世界へ — FIRST LIGHTの軌跡', body: '一冊の本になりそうな成功物語。映画化の噂も', tag: 'コラム', titleEn: 'From English Study to the World — FIRST LIGHT\'s Journey', bodyEn: 'A success story worthy of a book. Rumors of movie adaptation.' },
  { stage: 7, title: 'ソラ「あの人は、僕にとって最高の物語」', body: '感謝の想いを自身の言葉で綴る', tag: 'SNS', titleEn: 'Sora: "That Person Is My Greatest Story"', bodyEn: 'Expresses gratitude in his own words.' },
  { stage: 7, title: '【社説】一人の出会いが世界を変える', body: 'FIRST LIGHTの物語が教えてくれること', tag: 'コラム', titleEn: '[Editorial] One Encounter Can Change the World', bodyEn: 'What FIRST LIGHT\'s story teaches us.' },
];
