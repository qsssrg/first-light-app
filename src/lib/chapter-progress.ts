/**
 * Get the current story stage based on chapter completion.
 * Returns 1-7 corresponding to the narrative stages.
 */
export function getStoryStage(): number {
  if (typeof window === 'undefined') return 1;

  // Check how many chapters have been visited/completed
  const visited: number[] = [];
  for (let i = 1; i <= 10; i++) {
    if (sessionStorage.getItem(`chapter-vn-${i}`) || localStorage.getItem(`chapter-completed-${i}`)) {
      visited.push(i);
    }
  }

  const maxChapter = visited.length > 0 ? Math.max(...visited) : 0;

  if (maxChapter >= 10) return 7; // Ch10: 暴露+最終章
  if (maxChapter >= 8) return 6;  // Ch8-9: フェス
  if (maxChapter >= 7) return 5;  // Ch7: 恋人誤報
  if (maxChapter >= 6) return 4;  // Ch6: 海外進出
  if (maxChapter >= 5) return 3;  // Ch5: 対談番組
  if (maxChapter >= 4) return 2;  // Ch4: 事務所の試練
  return 1;                        // Ch1-3: 日常（デフォルト）
}
