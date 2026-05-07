import type { ContentCategory } from '@/types';

interface VocabSeed {
  word: string;
  meaning: string;
  example: string;
  category: ContentCategory;
  difficulty: number;
}

// 英検5級 基礎単語 100語
// 小学校〜中学1年レベル、日常挨拶・数字・色・家族・学校
// difficulty: 1（入門）
export const EIKEN5_VOCAB: VocabSeed[] = [
  // ── 日常挨拶・基本動詞 ──
  { word: 'hello', meaning: 'こんにちは', example: 'Hello, how are you today?', category: 'culture', difficulty: 1 },
  { word: 'goodbye', meaning: 'さようなら', example: 'Goodbye! See you tomorrow.', category: 'culture', difficulty: 1 },
  { word: 'please', meaning: 'どうぞ、お願いします', example: 'Please sit down.', category: 'culture', difficulty: 1 },
  { word: 'thank', meaning: '感謝する', example: 'Thank you for your help.', category: 'culture', difficulty: 1 },
  { word: 'sorry', meaning: 'ごめんなさい', example: 'I am sorry I am late.', category: 'culture', difficulty: 1 },
  { word: 'welcome', meaning: 'ようこそ', example: 'Welcome to our school.', category: 'culture', difficulty: 1 },
  { word: 'enjoy', meaning: '楽しむ', example: 'I enjoy playing soccer.', category: 'culture', difficulty: 1 },
  { word: 'like', meaning: '好き、〜のような', example: 'I like ice cream very much.', category: 'culture', difficulty: 1 },
  { word: 'want', meaning: '欲しい', example: 'I want a new bicycle.', category: 'culture', difficulty: 1 },
  { word: 'need', meaning: '必要とする', example: 'We need more time.', category: 'society', difficulty: 1 },
  { word: 'know', meaning: '知っている', example: 'I know the answer.', category: 'society', difficulty: 1 },
  { word: 'think', meaning: '考える', example: 'I think it will rain today.', category: 'society', difficulty: 1 },
  { word: 'understand', meaning: '理解する', example: 'I understand the question.', category: 'society', difficulty: 1 },
  { word: 'remember', meaning: '覚えている', example: 'Do you remember my name?', category: 'society', difficulty: 1 },
  { word: 'forget', meaning: '忘れる', example: 'Do not forget your homework.', category: 'society', difficulty: 1 },
  { word: 'begin', meaning: '始める', example: 'Let us begin the lesson.', category: 'society', difficulty: 1 },
  { word: 'finish', meaning: '終える', example: 'Did you finish your homework?', category: 'society', difficulty: 1 },
  { word: 'try', meaning: '試みる', example: 'Try this cake. It is delicious.', category: 'culture', difficulty: 1 },
  { word: 'help', meaning: '助ける', example: 'Can you help me, please?', category: 'society', difficulty: 1 },
  { word: 'teach', meaning: '教える', example: 'She teaches English at school.', category: 'society', difficulty: 1 },
  // ── 家族・人 ──
  { word: 'family', meaning: '家族', example: 'My family has five members.', category: 'society', difficulty: 1 },
  { word: 'parent', meaning: '親', example: 'My parents work in the city.', category: 'society', difficulty: 1 },
  { word: 'brother', meaning: '兄弟', example: 'I have two brothers.', category: 'society', difficulty: 1 },
  { word: 'sister', meaning: '姉妹', example: 'My sister is older than me.', category: 'society', difficulty: 1 },
  { word: 'friend', meaning: '友達', example: 'She is my best friend.', category: 'society', difficulty: 1 },
  { word: 'student', meaning: '生徒', example: 'There are thirty students in the class.', category: 'society', difficulty: 1 },
  { word: 'teacher', meaning: '先生', example: 'Our teacher is very kind.', category: 'society', difficulty: 1 },
  // ── 学校・場所 ──
  { word: 'school', meaning: '学校', example: 'I go to school by bus.', category: 'society', difficulty: 1 },
  { word: 'library', meaning: '図書館', example: 'I read books at the library.', category: 'culture', difficulty: 1 },
  { word: 'hospital', meaning: '病院', example: 'She went to the hospital.', category: 'society', difficulty: 1 },
  { word: 'station', meaning: '駅', example: 'The train station is near my house.', category: 'society', difficulty: 1 },
  { word: 'park', meaning: '公園', example: 'We play in the park after school.', category: 'culture', difficulty: 1 },
  { word: 'kitchen', meaning: '台所', example: 'My mother cooks in the kitchen.', category: 'culture', difficulty: 1 },
  { word: 'garden', meaning: '庭', example: 'We have a beautiful garden.', category: 'culture', difficulty: 1 },
  // ── 食べ物・飲み物 ──
  { word: 'breakfast', meaning: '朝食', example: 'I eat breakfast at seven.', category: 'culture', difficulty: 1 },
  { word: 'lunch', meaning: '昼食', example: 'We have lunch at noon.', category: 'culture', difficulty: 1 },
  { word: 'dinner', meaning: '夕食', example: 'Dinner is ready.', category: 'culture', difficulty: 1 },
  { word: 'fruit', meaning: '果物', example: 'I eat fruit every day.', category: 'science', difficulty: 1 },
  { word: 'vegetable', meaning: '野菜', example: 'Vegetables are good for your health.', category: 'science', difficulty: 1 },
  { word: 'bread', meaning: 'パン', example: 'I had bread and milk for breakfast.', category: 'culture', difficulty: 1 },
  { word: 'water', meaning: '水', example: 'Please give me a glass of water.', category: 'science', difficulty: 1 },
  // ── 時間・天気 ──
  { word: 'morning', meaning: '朝', example: 'I wake up early in the morning.', category: 'current', difficulty: 1 },
  { word: 'afternoon', meaning: '午後', example: 'We have PE in the afternoon.', category: 'current', difficulty: 1 },
  { word: 'evening', meaning: '夕方', example: 'We watch TV in the evening.', category: 'current', difficulty: 1 },
  { word: 'today', meaning: '今日', example: 'Today is Monday.', category: 'current', difficulty: 1 },
  { word: 'tomorrow', meaning: '明日', example: 'Tomorrow is my birthday.', category: 'current', difficulty: 1 },
  { word: 'yesterday', meaning: '昨日', example: 'Yesterday was Sunday.', category: 'current', difficulty: 1 },
  { word: 'weather', meaning: '天気', example: 'The weather is nice today.', category: 'science', difficulty: 1 },
  { word: 'sunny', meaning: '晴れの', example: 'It is sunny today.', category: 'science', difficulty: 1 },
  { word: 'cloudy', meaning: '曇りの', example: 'It will be cloudy tomorrow.', category: 'science', difficulty: 1 },
  { word: 'rainy', meaning: '雨の', example: 'It is a rainy day.', category: 'science', difficulty: 1 },
  // ── 色・数 ──
  { word: 'color', meaning: '色', example: 'What color do you like?', category: 'culture', difficulty: 1 },
  { word: 'beautiful', meaning: '美しい', example: 'The flowers are beautiful.', category: 'culture', difficulty: 1 },
  { word: 'large', meaning: '大きい', example: 'We live in a large house.', category: 'society', difficulty: 1 },
  { word: 'small', meaning: '小さい', example: 'The cat is very small.', category: 'society', difficulty: 1 },
  { word: 'fast', meaning: '速い', example: 'He can run very fast.', category: 'society', difficulty: 1 },
  { word: 'slow', meaning: '遅い', example: 'Please walk slowly.', category: 'society', difficulty: 1 },
  { word: 'easy', meaning: '簡単な', example: 'This question is easy.', category: 'society', difficulty: 1 },
  { word: 'difficult', meaning: '難しい', example: 'Math is difficult for me.', category: 'society', difficulty: 1 },
  // ── 身体・健康 ──
  { word: 'head', meaning: '頭', example: 'I have a headache.', category: 'science', difficulty: 1 },
  { word: 'hand', meaning: '手', example: 'Wash your hands before lunch.', category: 'science', difficulty: 1 },
  { word: 'eye', meaning: '目', example: 'She has blue eyes.', category: 'science', difficulty: 1 },
  { word: 'mouth', meaning: '口', example: 'Open your mouth, please.', category: 'science', difficulty: 1 },
  { word: 'sick', meaning: '病気の', example: 'I am sick today.', category: 'science', difficulty: 1 },
  // ── 趣味・スポーツ ──
  { word: 'hobby', meaning: '趣味', example: 'My hobby is reading books.', category: 'culture', difficulty: 1 },
  { word: 'music', meaning: '音楽', example: 'I listen to music every day.', category: 'culture', difficulty: 1 },
  { word: 'movie', meaning: '映画', example: 'We watched a movie last night.', category: 'culture', difficulty: 1 },
  { word: 'game', meaning: '試合、ゲーム', example: 'Let us play a game together.', category: 'culture', difficulty: 1 },
  { word: 'swim', meaning: '泳ぐ', example: 'I can swim in the pool.', category: 'culture', difficulty: 1 },
  { word: 'draw', meaning: '絵を描く', example: 'She can draw very well.', category: 'culture', difficulty: 1 },
  { word: 'sing', meaning: '歌う', example: 'He likes to sing songs.', category: 'culture', difficulty: 1 },
  { word: 'dance', meaning: '踊る', example: 'We dance at the festival.', category: 'culture', difficulty: 1 },
  // ── 交通・移動 ──
  { word: 'train', meaning: '電車', example: 'I take the train to school.', category: 'society', difficulty: 1 },
  { word: 'bus', meaning: 'バス', example: 'The bus comes at eight.', category: 'society', difficulty: 1 },
  { word: 'airplane', meaning: '飛行機', example: 'We went to Osaka by airplane.', category: 'technology', difficulty: 1 },
  { word: 'bicycle', meaning: '自転車', example: 'I ride my bicycle to the park.', category: 'society', difficulty: 1 },
  { word: 'walk', meaning: '歩く', example: 'I walk to school every day.', category: 'society', difficulty: 1 },
  // ── 動物・自然 ──
  { word: 'animal', meaning: '動物', example: 'I like animals very much.', category: 'science', difficulty: 1 },
  { word: 'bird', meaning: '鳥', example: 'The bird is singing in the tree.', category: 'science', difficulty: 1 },
  { word: 'fish', meaning: '魚', example: 'We saw many fish in the river.', category: 'science', difficulty: 1 },
  { word: 'flower', meaning: '花', example: 'The flowers bloom in spring.', category: 'science', difficulty: 1 },
  { word: 'tree', meaning: '木', example: 'There are many trees in the forest.', category: 'science', difficulty: 1 },
  { word: 'mountain', meaning: '山', example: 'We climbed the mountain last summer.', category: 'science', difficulty: 1 },
  { word: 'river', meaning: '川', example: 'The river flows to the sea.', category: 'science', difficulty: 1 },
  { word: 'sea', meaning: '海', example: 'I went to the sea in summer.', category: 'science', difficulty: 1 },
  // ── 動作・生活 ──
  { word: 'open', meaning: '開ける', example: 'Please open the window.', category: 'society', difficulty: 1 },
  { word: 'close', meaning: '閉める', example: 'Close the door, please.', category: 'society', difficulty: 1 },
  { word: 'carry', meaning: '運ぶ', example: 'Can you carry this bag?', category: 'society', difficulty: 1 },
  { word: 'clean', meaning: 'きれいにする', example: 'We clean our classroom every day.', category: 'society', difficulty: 1 },
  { word: 'cook', meaning: '料理する', example: 'My father cooks dinner on Sundays.', category: 'culture', difficulty: 1 },
  { word: 'sleep', meaning: '眠る', example: 'I sleep at ten every night.', category: 'science', difficulty: 1 },
  { word: 'wake', meaning: '起きる', example: 'I wake up at six.', category: 'society', difficulty: 1 },
  { word: 'wear', meaning: '着る', example: 'She wears a blue uniform.', category: 'culture', difficulty: 1 },
  { word: 'bring', meaning: '持ってくる', example: 'Please bring your textbook.', category: 'society', difficulty: 1 },
  { word: 'send', meaning: '送る', example: 'I will send you a letter.', category: 'society', difficulty: 1 },
  { word: 'buy', meaning: '買う', example: 'I want to buy a new book.', category: 'society', difficulty: 1 },
  { word: 'sell', meaning: '売る', example: 'They sell fresh bread here.', category: 'society', difficulty: 1 },
  { word: 'meet', meaning: '会う', example: 'Nice to meet you.', category: 'society', difficulty: 1 },
  { word: 'visit', meaning: '訪れる', example: 'We visited Kyoto last year.', category: 'culture', difficulty: 1 },
  { word: 'travel', meaning: '旅行する', example: 'I want to travel to many countries.', category: 'culture', difficulty: 1 },
  { word: 'arrive', meaning: '到着する', example: 'The train will arrive at noon.', category: 'society', difficulty: 1 },
  { word: 'leave', meaning: '出発する、去る', example: 'We leave home at eight.', category: 'society', difficulty: 1 },
  { word: 'return', meaning: '戻る', example: 'I will return the book tomorrow.', category: 'society', difficulty: 1 },
];

export function getEiken5Vocab(): VocabSeed[] {
  return EIKEN5_VOCAB;
}
