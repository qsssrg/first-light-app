import type { FanPost } from './fan-posts';

export interface StageFanPost extends FanPost {
  stage: number;
}

export const STAGE_FAN_POSTS: StageFanPost[] = [
  // ── Stage 2: 事務所の試練 ──
  { stage: 2, user: '光太郎', text: '最近メンバーが英語勉強してるっぽい。ハルトくんのインスタに英語の教材写ってた👀', likes: 423, cat: 'rumor' },
  { stage: 2, user: 'さくら', text: '事務所に通ってる人まだいるらしいよ。新しいマネージャーかな？', likes: 567, cat: 'rumor' },
  { stage: 2, user: '翔平', text: 'レンがSpotifyで洋楽ばっかり聴いてるって言ってた。英語の勉強？', likes: 312, cat: 'rumor' },
  { stage: 2, user: 'みな', text: 'ソラくん、英語の本の写真ストーリーに上げてたよね？成長してる感', likes: 445, cat: 'news' },
  { stage: 2, user: '健一', text: 'ユウキがラジオで「英語むず〜い」って言ってて可愛かった😂', likes: 389, cat: 'news' },
  { stage: 2, user: 'ゆり', text: 'カイくんの最近のツイート、時々英語混じりだよね。かっこいい', likes: 534, cat: 'message' },
  { stage: 2, user: 'あい', text: 'なんか事務所が本気で海外展開考えてるっぽくない？嬉しいけど不安', likes: 612, cat: 'debate' },
  { stage: 2, user: '拓也', text: '英語できるようになったら海外公演あるかな…！行きたい！', likes: 478, cat: 'call' },
  { stage: 2, user: '彩菜', text: '推しが英語勉強してるなら私も頑張ろうかな…', likes: 356, cat: 'message' },
  { stage: 2, user: '龍一', text: 'FIRST LIGHTの英語、本気っぽいな。何か大きいことがありそう', likes: 267, cat: 'rumor' },

  // ── Stage 3: 対談番組 ──
  { stage: 3, user: '光太郎', text: '対談番組の英語すごかった！！！いつの間にあんなに！？', likes: 892, cat: 'news' },
  { stage: 3, user: 'さくら', text: 'カイくんの英語MC完璧だった…もうプロじゃん', likes: 756, cat: 'news' },
  { stage: 3, user: '翔平', text: '誰が教えてるの？独学？それとも専属の先生がいるの？', likes: 623, cat: 'rumor' },
  { stage: 3, user: 'みな', text: 'ソラくんが英語でシェイクスピア引用してて鳥肌立った', likes: 534, cat: 'news' },
  { stage: 3, user: '健一', text: 'ハルトの英語歌詞即興、天才かよ…', likes: 789, cat: 'news' },
  { stage: 3, user: 'ゆり', text: 'レンが「Music has no borders」って言った瞬間泣いた😭', likes: 912, cat: 'news' },
  { stage: 3, user: 'あい', text: 'ユウキくんの英語、ちょっとたどたどしいけどそこが可愛い💕', likes: 445, cat: 'message' },
  { stage: 3, user: '拓也', text: '対談の切り抜き海外でバズってるらしい！世界デビューじゃん！', likes: 678, cat: 'news' },
  { stage: 3, user: '由美', text: 'あの英語力…絶対誰かすごい先生がついてるよね', likes: 523, cat: 'rumor' },
  { stage: 3, user: '美優', text: 'FIRST LIGHTが英語話せるようになったの、ファンとして誇らしい', likes: 834, cat: 'message' },

  // ── Stage 4: 海外進出 ──
  { stage: 4, user: '光太郎', text: '海外フェスマジ！？日本人グループとして快挙すぎる！', likes: 1234, cat: 'news' },
  { stage: 4, user: 'さくら', text: '共演アーティスト見た？豪華すぎてヤバい…', likes: 978, cat: 'news' },
  { stage: 4, user: '翔平', text: '英語版公式サイトできてる！海外ファン増えそう！', likes: 756, cat: 'news' },
  { stage: 4, user: 'みな', text: 'ハルトくんの英語SNS投稿、海外ファンめっちゃ喜んでる', likes: 634, cat: 'news' },
  { stage: 4, user: '美咲', text: '海外フェスのチケット取れた人いる？一緒に行きたい！', likes: 567, cat: 'call' },
  { stage: 4, user: '勇樹', text: 'ソラくんの英語書評コラム読んだ。知性がすごい', likes: 445, cat: 'news' },
  { stage: 4, user: '由衣', text: 'レンと海外プロデューサーのコラボ曲楽しみすぎる！！', likes: 823, cat: 'news' },
  { stage: 4, user: '龍二', text: '海外フェスの応援グッズ作らない？みんなで企画しよう', likes: 534, cat: 'call' },
  { stage: 4, user: '紗希', text: 'FIRST LIGHTが世界に行く…夢が叶った感じ', likes: 912, cat: 'message' },
  { stage: 4, user: '慎也', text: '英語で応援メッセージ書く練習しよう！海外ファンと一緒に', likes: 389, cat: 'call' },

  // ── Stage 5: 恋人誤報 ──
  { stage: 5, user: '光太郎', text: '恋人って本当？でもまだ信じない。続報待つ', likes: 1523, cat: 'rumor' },
  { stage: 5, user: 'さくら', text: '違うらしいよ。事務所のスタッフだって。安心した…', likes: 1234, cat: 'rumor' },
  { stage: 5, user: '翔平', text: 'あの記者信じらんない。ちゃんと取材してから書けよ', likes: 892, cat: 'debate' },
  { stage: 5, user: 'みな', text: '誤報でよかった…でも推しが報道されると心臓止まるね', likes: 756, cat: 'message' },
  { stage: 5, user: '健一', text: '事務所の声明出た。はっきり否定してくれてありがたい', likes: 678, cat: 'news' },
  { stage: 5, user: 'ゆり', text: 'カイくんの「ファンのみんな、ありがとう」に泣いた😭', likes: 1089, cat: 'message' },
  { stage: 5, user: 'あい', text: 'ハルトくんの「大切な人はみんなだよ」って言葉、一生忘れない', likes: 1345, cat: 'message' },
  { stage: 5, user: '拓也', text: '噂の「謎の人物」って英語の先生だったんじゃない？', likes: 734, cat: 'rumor' },
  { stage: 5, user: '由美', text: 'むしろこの騒動でFIRST LIGHTの絆が深まった気がする', likes: 567, cat: 'message' },
  { stage: 5, user: '美優', text: '週刊誌の記者、出禁になったらしいね。当然だわ', likes: 823, cat: 'news' },

  // ── Stage 6: 海外フェス ──
  { stage: 6, user: '光太郎', text: 'フェス最高だった！！！鳥肌止まらなかった！！！', likes: 2345, cat: 'news' },
  { stage: 6, user: 'さくら', text: '英語ペラペラじゃん！成長すごすぎる…', likes: 1678, cat: 'news' },
  { stage: 6, user: '翔平', text: 'カイのMC完璧だった。ネイティブかと思った', likes: 1456, cat: 'news' },
  { stage: 6, user: 'みな', text: 'レンの即興セッション、世界中のフェスでトレンドになってる', likes: 1234, cat: 'news' },
  { stage: 6, user: '健一', text: 'ユウキくんが海外ファンと英語で話して泣いてたの、もらい泣き', likes: 1567, cat: 'message' },
  { stage: 6, user: 'ゆり', text: 'ソラくんの「言葉が通じた瞬間」のインタビュー、読んで号泣', likes: 1345, cat: 'message' },
  { stage: 6, user: 'あい', text: 'FIRST LIGHTが世界で通用することが証明された。誇らしい', likes: 1789, cat: 'message' },
  { stage: 6, user: '拓也', text: 'フェスの動画1000万再生！！世界中が注目してる！', likes: 1123, cat: 'news' },
  { stage: 6, user: '由美', text: 'ハルトの共同作曲、英語の歌詞がマジでいい。泣ける', likes: 934, cat: 'news' },
  { stage: 6, user: '龍一', text: '日本のエンタメ界に衝撃って記事出てた。誇らしい', likes: 867, cat: 'news' },

  // ── Stage 7: 暴露+最終章 ──
  { stage: 7, user: '光太郎', text: 'あのリムジンの人がブレインだったの！？全部繋がった…すごい', likes: 3456, cat: 'rumor' },
  { stage: 7, user: 'さくら', text: 'カイくんの「あの人がいなければ」って言葉、号泣した', likes: 2678, cat: 'message' },
  { stage: 7, user: '翔平', text: 'ハルトの「全ての歌詞にあの人がいる」って…ずっと想ってたんだ', likes: 2345, cat: 'message' },
  { stage: 7, user: 'みな', text: 'すごい人じゃん…英語教えてくれた人がここまで導いたって', likes: 1892, cat: 'rumor' },
  { stage: 7, user: '健一', text: '恋人誤報の時の「謎の人物」、これだったんだ。全部伏線だった', likes: 2123, cat: 'rumor' },
  { stage: 7, user: 'ゆり', text: 'FIRST LIGHTの物語、映画にしてほしい。絶対泣く', likes: 1567, cat: 'message' },
  { stage: 7, user: 'あい', text: '一人の出会いが世界を変えるって本当なんだね…感動', likes: 1789, cat: 'message' },
  { stage: 7, user: '拓也', text: '感謝ライブ絶対行く。チケット取れますように🙏', likes: 1345, cat: 'call' },
  { stage: 7, user: '由美', text: 'ソラくんの「あの人は僕にとって最高の物語」に感極まった', likes: 1678, cat: 'message' },
  { stage: 7, user: '美優', text: 'FIRST LIGHTと出会えてよかった。この物語の一部でいられて幸せ', likes: 2456, cat: 'message' },
];
