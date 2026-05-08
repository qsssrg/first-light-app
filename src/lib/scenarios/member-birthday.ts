import type { Scenario } from './types';
import { MEMBERS } from '../members';

/** Generate a member birthday VN scenario */
export function getMemberBirthdayScenario(memberId: string, isOshi: boolean): Scenario {
  const member = MEMBERS.find(m => m.id === memberId);
  if (!member) return { id: 'member-birthday', lines: [] };
  const others = MEMBERS.filter(m => m.id !== memberId);

  const BIRTHDAY_LINES: Record<string, { self: string; selfOshi: string }> = {
    kai: {
      self: '今日は俺の誕生日か…{playerName}に祝ってもらえるなんて、リーダー冥利に尽きるな。',
      selfOshi: '{playerName}…俺の誕生日を覚えてくれてたんだな。…正直、めちゃくちゃ嬉しいよ。',
    },
    haruto: {
      self: '誕生日…ですか。{playerName}さんに祝ってもらえて、新しい歌詞が書けそうです。',
      selfOshi: '{playerName}さんからのお祝い…一生の宝物にします。今日という日に、出会えてよかった。',
    },
    sora: {
      self: '…あ、今日は僕の誕生日でしたね。{playerName}さん、覚えてくれてたんですか。',
      selfOshi: '{playerName}さん…僕なんかの誕生日を、そんなに大切にしてくれるんですね。…泣きそうです。',
    },
    ren: {
      self: '…ん？ 誕生日？ まぁ、{playerName}に祝われるのは…悪くないな。',
      selfOshi: '…{playerName}。お前に祝ってもらう誕生日は、特別だ。…ありがとな。',
    },
    yuuki: {
      self: '今日俺の誕生日！ {playerName}、祝って祝って〜！ パーティしよ！',
      selfOshi: '{playerName}が俺の誕生日祝ってくれるの！？ 最っ高に嬉しい！ 今日は世界一幸せ！',
    },
  };

  const OTHER_LINES: Record<string, (name: string) => string> = {
    kai: (n) => `${n}、誕生日おめでとう。今日はお前が主役だ。`,
    haruto: (n) => `${n}くん、お誕生日おめでとうございます。素敵な一年になりますように。`,
    sora: (n) => `${n}さん、お誕生日おめでとうございます。…ささやかですがプレゼント用意しました。`,
    ren: (n) => `…${n}、おめでとう。ま、今日くらいは好きにしろよ。`,
    yuuki: (n) => `${n}〜！ お誕生日おめでとーーー！！ ケーキ買ってきた！`,
  };

  const lines: Scenario['lines'] = [];
  const bl = BIRTHDAY_LINES[memberId] ?? BIRTHDAY_LINES.kai;

  if (isOshi) {
    // 推しメンバー特別バージョン（長め）
    lines.push({ type: 'dialog', character: 'narrator', text: `――今日は${member.nameJa}の誕生日。` });
    lines.push({ type: 'dialog', character: 'player', text: `（${member.nameJa}の誕生日…！ ちゃんとお祝いしなきゃ…！）`, isInner: true });
    lines.push({ type: 'dialog', character: memberId as any, text: bl.selfOshi, expression: 'smile' });
    lines.push({ type: 'dialog', character: 'player', text: `（顔が…近い…いつもより嬉しそう…）`, isInner: true });
    for (const other of others) {
      const line = OTHER_LINES[other.id]?.(member.nameJa) ?? `${member.nameJa}、おめでとう！`;
      lines.push({ type: 'dialog', character: other.id as any, text: line, expression: 'smile' });
    }
    lines.push({ type: 'dialog', character: memberId as any, text: 'みんな…{playerName}も…ありがとう。最高の誕生日だ。', expression: 'smile' });
    lines.push({ type: 'dialog', character: 'player', text: '（推しの誕生日を近くで祝える日が来るなんて…夢みたい…）', isInner: true });
    lines.push({
      type: 'choice', prompt: '',
      options: [
        { text: `${member.nameJa}、お誕生日おめでとう！`, next: 'end' },
        { text: '（最高の笑顔を見せてくれた…）', next: 'end' },
      ],
    });
    lines.push({ type: 'dialog', character: memberId as any, text: '…ありがとう、{playerName}。忘れない。', expression: 'smile' });
  } else {
    // 通常バージョン（短め）
    lines.push({ type: 'dialog', character: 'narrator', text: `――今日は${member.nameJa}の誕生日。` });
    lines.push({ type: 'dialog', character: memberId as any, text: bl.self, expression: 'smile' });
    for (const other of others.slice(0, 2)) {
      const line = OTHER_LINES[other.id]?.(member.nameJa) ?? `${member.nameJa}、おめでとう！`;
      lines.push({ type: 'dialog', character: other.id as any, text: line, expression: 'smile' });
    }
    lines.push({
      type: 'choice', prompt: '',
      options: [
        { text: 'お誕生日おめでとう！', next: 'end' },
        { text: '（おめでとう…！）', next: 'end' },
      ],
    });
    lines.push({ type: 'dialog', character: memberId as any, text: 'ありがとう、{playerName}。', expression: 'smile' });
  }

  return { id: `member-birthday-${memberId}`, background: 'stylish-office', lines };
}
