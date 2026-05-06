import type { StoryCard } from '@/types';

export const STORY_CARDS: StoryCard[] = [
  // Haruto stories
  {
    id: 'haruto-01',
    memberId: 'haruto',
    title: '最初のノート',
    content: '中学の頃、英語の授業で知った "serendipity" という単語。「偶然の幸運」。\nこの一語がきっかけで、言葉を集めるようになった。',
    unlockedAt: 1,
  },
  {
    id: 'haruto-02',
    memberId: 'haruto',
    title: '歌詞に込めた想い',
    content: 'グループの新曲の歌詞を任された日。\n日本語で書いた後、英語でも書いてみた。同じ気持ちなのに、違う表現になる。言語って面白い。',
    unlockedAt: 5,
  },
  // Sora stories
  {
    id: 'sora-01',
    memberId: 'sora',
    title: '洋書との出会い',
    content: '空港の本屋でたまたま手に取ったペーパーバック。\n半分も読めなかったけど、物語の続きが気になって辞書を引きながら最後まで読んだ。',
    unlockedAt: 1,
  },
  {
    id: 'sora-02',
    memberId: 'sora',
    title: '字幕なしの映画',
    content: '初めて字幕なしで映画を観た日。\n全部はわからなくても、登場人物の感情は伝わった。「わかる」って段階があるんだと思った。',
    unlockedAt: 5,
  },
  // Ren stories
  {
    id: 'ren-01',
    memberId: 'ren',
    title: 'ヘッドフォンの向こう側',
    content: '好きなバンドのインタビューが全部英語だった。\n何言ってるかわからないのが悔しくて、毎日30分、繰り返し聴くようになった。',
    unlockedAt: 1,
  },
  {
    id: 'ren-02',
    memberId: 'ren',
    title: '音が言葉になった日',
    content: '3ヶ月続けたある日、突然聴き取れた。\n「あ、今 "absolutely" って言った」。音の塊が、意味のある言葉に変わった瞬間。',
    unlockedAt: 5,
  },
  // Yuuki stories
  {
    id: 'yuuki-01',
    memberId: 'yuuki',
    title: '海外ファンへのDM',
    content: 'インスタに英語のコメントが来た。Google翻訳で返したら、なんか違う感じがした。\n自分の言葉で返したい。そう思ったのが始まり。',
    unlockedAt: 1,
  },
  {
    id: 'yuuki-02',
    memberId: 'yuuki',
    title: '初めてのライブMC（英語）',
    content: '海外公演で、カンペなしでMCをやった。\n文法はめちゃくちゃだったかもしれない。でもファンが笑ってくれた。伝わった。',
    unlockedAt: 5,
  },
  // Kai stories
  {
    id: 'kai-01',
    memberId: 'kai',
    title: 'リーダーの責任',
    content: '海外のスタッフとの打ち合わせ。メンバーの意見を英語で伝える役になった。\n正しく伝えなきゃ、と思ったら文法が気になるようになった。',
    unlockedAt: 1,
  },
  {
    id: 'kai-02',
    memberId: 'kai',
    title: '構造で見えた世界',
    content: '英語の文法って、数学みたいだと気づいた。\nルールがわかれば、初めて見る文でも意味がわかる。パズルを解くみたいで楽しい。',
    unlockedAt: 5,
  },
  // Group stories (unlocked at higher levels)
  {
    id: 'group-01',
    memberId: 'haruto',
    title: 'FIRST LIGHTの約束',
    content: '5人で決めたこと。「英語で世界と繋がろう」\nそれぞれ得意なことは違う。でも一緒に成長していく。',
    unlockedAt: 10,
  },
  {
    id: 'group-02',
    memberId: 'kai',
    title: '初めての海外ファンミーティング',
    content: '全員で英語でトークした初めてのイベント。\n完璧じゃなくていい。伝えたい気持ちがあれば、言葉は後からついてくる。',
    unlockedAt: 15,
  },
];
