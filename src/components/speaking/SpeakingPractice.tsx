'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { SPEAKING_QUESTIONS, TYPE_LABELS, type SpeakingQuestion, type SpeakingType } from '@/lib/speaking-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Play, Loader2, Star, RotateCcw } from 'lucide-react';

interface Feedback {
  grammar: number;
  vocabulary: number;
  fluency: number;
  content: number;
  comment: string;
  corrections: { original: string; corrected: string }[];
  suggestion: string;
}

type Phase = 'select' | 'prepare' | 'record' | 'review' | 'feedback';

export function SpeakingPractice() {
  const [phase, setPhase] = useState<Phase>('select');
  const [filter, setFilter] = useState<SpeakingType | 'all'>('all');
  const [currentQ, setCurrentQ] = useState<SpeakingQuestion | null>(null);
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startQuestion = (q: SpeakingQuestion) => {
    setCurrentQ(q);
    setTranscript('');
    setFeedback(null);
    setTimeLeft(q.timeLimit);
    setPhase('prepare');
  };

  const startRecording = useCallback(() => {
    if (!currentQ) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setTranscript('[このブラウザは音声認識に対応していません。テキスト入力で代替してください。]');
      setPhase('review');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = true;

    let finalTranscript = '';

    recognition.onresult = (event: any) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + ' ';
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      setTranscript(finalTranscript + interim);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
      setTranscript(finalTranscript.trim());
      setPhase('review');
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
    setPhase('record');

    // Timer
    let remaining = currentQ.timeLimit;
    setTimeLeft(remaining);
    timerRef.current = setInterval(() => {
      remaining--;
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(timerRef.current!);
        recognition.stop();
      }
    }, 1000);
  }, [currentQ]);

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsRecording(false);
    setPhase('review');
  };

  const submitForFeedback = async () => {
    if (!currentQ || !transcript.trim()) return;
    setLoading(true);

    try {
      const res = await fetch('/api/speaking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: currentQ.prompt,
          transcript: transcript.trim(),
          timeLimit: currentQ.timeLimit,
          type: currentQ.type,
        }),
      });
      const data = await res.json();
      setFeedback(data.feedback);
      setPhase('feedback');
    } catch {
      setFeedback({ grammar: 3, vocabulary: 3, fluency: 3, content: 3, comment: 'エラーが発生しました', corrections: [], suggestion: '' });
      setPhase('feedback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (recognitionRef.current) recognitionRef.current.abort?.();
    };
  }, []);

  // Select phase
  if (phase === 'select') {
    const questions = filter === 'all' ? SPEAKING_QUESTIONS : SPEAKING_QUESTIONS.filter(q => q.type === filter);
    return (
      <div className="space-y-4 px-4">
        <h2 className="text-lg font-bold">スピーキング練習</h2>
        <p className="text-xs text-gray-500">マイクに向かって英語で話そう。音声認識でテキスト化されます。</p>

        <div className="flex gap-1.5">
          {([['all', 'すべて'], ['narration', 'ナレーション'], ['qa', 'Q&A'], ['toefl', 'TOEFL']] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1.5 rounded-full text-xs ${filter === key ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {questions.map(q => (
            <Card key={q.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => startQuestion(q)}>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="secondary" className="text-[10px]">{TYPE_LABELS[q.type]}</Badge>
                <span className="text-[10px] text-gray-400">{q.timeLimit}秒</span>
              </div>
              <p className="text-sm">{q.prompt}</p>
              {q.type === 'narration' && <p className="text-xs text-gray-500 mt-1">{q.description}</p>}
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Prepare phase
  if (phase === 'prepare') {
    return (
      <div className="space-y-4 px-4">
        <Badge variant="secondary">{TYPE_LABELS[currentQ!.type]}</Badge>
        <Card className="p-4">
          <p className="text-sm font-medium mb-2">{currentQ!.prompt}</p>
          {currentQ!.type === 'narration' && (
            <p className="text-xs text-gray-500 bg-gray-50 dark:bg-gray-900 p-2 rounded">{currentQ!.description}</p>
          )}
        </Card>
        <p className="text-xs text-gray-500 text-center">準備ができたらマイクボタンを押してください（{currentQ!.timeLimit}秒）</p>
        <Button onClick={startRecording} className="w-full h-14 text-lg bg-red-600 hover:bg-red-700">
          <Mic className="w-5 h-5 mr-2" /> 録音開始
        </Button>
        <Button variant="outline" onClick={() => setPhase('select')} className="w-full">戻る</Button>
      </div>
    );
  }

  // Record phase
  if (phase === 'record') {
    return (
      <div className="space-y-4 px-4 text-center">
        <div className="py-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-red-600 flex items-center justify-center animate-pulse">
            <Mic className="w-10 h-10 text-white" />
          </div>
          <p className="text-3xl font-bold mt-4">{timeLeft}s</p>
          <p className="text-xs text-gray-500 mt-1">録音中...</p>
        </div>

        {transcript && (
          <Card className="p-3 text-left">
            <p className="text-xs text-gray-400 mb-1">認識中のテキスト:</p>
            <p className="text-sm">{transcript}</p>
          </Card>
        )}

        <Button onClick={stopRecording} variant="outline" className="w-full">
          <MicOff className="w-4 h-4 mr-2" /> 停止
        </Button>
      </div>
    );
  }

  // Review phase
  if (phase === 'review') {
    return (
      <div className="space-y-4 px-4">
        <h3 className="text-sm font-bold">録音結果の確認</h3>
        <Card className="p-4">
          <p className="text-xs text-gray-500 mb-1">認識されたテキスト:</p>
          {transcript ? (
            <p className="text-sm">{transcript}</p>
          ) : (
            <p className="text-xs text-gray-400">テキストが認識されませんでした。手動で入力してください。</p>
          )}
        </Card>

        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="音声認識が正しくない場合は手動で修正/入力できます"
          rows={4}
          className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-900 resize-none"
        />

        <div className="flex gap-2">
          <Button onClick={submitForFeedback} disabled={loading || !transcript.trim()} className="flex-1">
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> 評価中</> : 'フィードバックを受ける'}
          </Button>
          <Button variant="outline" onClick={() => { setPhase('prepare'); setTranscript(''); }}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Show sample answer */}
        <details className="text-xs text-gray-500">
          <summary className="cursor-pointer hover:text-gray-700">模範回答を見る</summary>
          <p className="mt-2 p-2 bg-gray-50 dark:bg-gray-900 rounded">{currentQ!.sampleAnswer}</p>
        </details>
      </div>
    );
  }

  // Feedback phase
  return (
    <div className="space-y-4 px-4">
      <h3 className="text-sm font-bold">スピーキング評価</h3>

      <Card className="p-4">
        <div className="grid grid-cols-4 gap-2 text-center">
          {([['grammar', '文法'], ['vocabulary', '語彙'], ['fluency', '流暢さ'], ['content', '内容']] as const).map(([key, label]) => (
            <div key={key}>
              <div className="flex justify-center gap-0.5 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < (feedback?.[key] || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-700'}`} />
                ))}
              </div>
              <p className="text-[10px] text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <p className="text-xs text-gray-700 dark:text-gray-300">{feedback?.comment}</p>
      </Card>

      {feedback?.corrections && feedback.corrections.length > 0 && (
        <Card className="p-4">
          <p className="text-xs font-medium mb-2">修正箇所:</p>
          {feedback.corrections.map((c, i) => (
            <div key={i} className="text-xs border-l-2 border-blue-400 pl-2 mb-2">
              <p className="line-through text-red-400">{c.original}</p>
              <p className="text-green-600 dark:text-green-400">{c.corrected}</p>
            </div>
          ))}
        </Card>
      )}

      {feedback?.suggestion && (
        <Card className="p-4 border-yellow-200 dark:border-yellow-800">
          <p className="text-xs text-yellow-700 dark:text-yellow-300">💡 {feedback.suggestion}</p>
        </Card>
      )}

      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setPhase('select')} className="flex-1">問題選択</Button>
        <Button onClick={() => startQuestion(currentQ!)} className="flex-1">もう一度</Button>
      </div>
    </div>
  );
}
