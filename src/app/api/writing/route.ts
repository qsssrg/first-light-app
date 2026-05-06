import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(request: Request) {
  try {
    const { prompt, text } = await request.json();

    if (!text || text.trim().split(' ').length < 10) {
      return NextResponse.json({ error: 'Text too short' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        feedback: 'APIキーが設定されていません。.env.localにANTHROPIC_API_KEYを設定してください。',
        score: null,
        corrections: [],
      });
    }

    const client = new Anthropic({ apiKey });

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `You are an English writing tutor for a Japanese learner preparing for EIKEN and TOEFL exams.

The student was given this prompt: "${prompt}"

They wrote:
"""
${text}
"""

Please provide:
1. A score from 0-100
2. Brief feedback (2-3 sentences in Japanese) acknowledging what they did well and suggesting improvement
3. Up to 3 specific corrections

Respond in this exact JSON format:
{
  "score": <number>,
  "feedback": "<Japanese feedback string>",
  "corrections": [
    {"original": "<original phrase>", "corrected": "<corrected phrase>", "explanation": "<explanation in Japanese>", "type": "<grammar|vocabulary|style|spelling>"}
  ]
}

Remember the Montessori principle: acknowledge growth rather than just praise. Say things like "〇〇ができるようになってきたね" rather than generic praise.`,
        },
      ],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({
        feedback: responseText,
        score: null,
        corrections: [],
      });
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Writing API error:', error);
    return NextResponse.json({
      feedback: '添削処理中にエラーが発生しました。もう一度お試しください。',
      score: null,
      corrections: [],
    });
  }
}
