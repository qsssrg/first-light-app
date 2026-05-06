import { CHAPTERS } from '@/lib/chapters';
import { ChapterPageClient } from './client';

export function generateStaticParams() {
  return CHAPTERS.map((ch) => ({ id: String(ch.number) }));
}

export default async function ChapterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ChapterPageClient id={id} />;
}
