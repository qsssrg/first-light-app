import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(request: Request) {
  try {
    const { prompt, transcript, timeLimit, type } = await request.json();

    if (!transcript || transcript.trim().length < 5) {
      return NextResponse.json({ error: 'Transcript too short' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        feedback: {
          grammar: 3,
          vocabulary: 3,
          fluency: 3,
          content: 3,
          comment: 'APIキーが未設定のためフィードバックを生成できません。',
          corrections: [],
          suggestion: '',
        },
      });
    }

    const client = new Anthropic({ apiKey });
    const wordCount = transcript.trim().split(/\s+/).length;
    const estimatedWPM = Math.round((wordCount / timeLimit) * 60);

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `You are an English speaking test evaluator for a Japanese student preparing for ${type === 'toefl' ? 'TOEFL iBT' : 'EIKEN Pre-1'}.

Question/Prompt: "${prompt}"
Student's response (transcribed from speech): "${transcript}"
Word count: ${wordCount}
Estimated speaking speed: ${estimatedWPM} WPM (target: 120-150 WPM)
Time limit: ${timeLimit} seconds

Evaluate and respond in this exact JSON format:
{
  "grammar": <1-5, grammatical accuracy>,
  "vocabulary": <1-5, vocabulary range and appropriateness>,
  "fluency": <1-5, estimated fluency based on word count and time>,
  "content": <1-5, relevance and depth of response>,
  "comment": "<Japanese, 2-3 sentence overall feedback. Acknowledge what was done well first.>",
  "corrections": [{"original": "<error phrase>", "corrected": "<fixed phrase>"}],
  "suggestion": "<Japanese, one specific tip to improve>"
}`,
        },
      ],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ feedback: { grammar: 3, vocabulary: 3, fluency: 3, content: 3, comment: responseText, corrections: [], suggestion: '' } });
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return NextResponse.json({ feedback: parsed });
  } catch (error) {
    console.error('Speaking API error:', error);
    return NextResponse.json({
      feedback: { grammar: 3, vocabulary: 3, fluency: 3, content: 3, comment: 'エラーが発生しました。', corrections: [], suggestion: '' },
    });
  }
}
