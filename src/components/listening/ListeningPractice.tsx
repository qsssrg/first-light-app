'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useProfile } from '@/lib/hooks';
import { LISTENING_QUESTIONS, DICTATION_EXERCISES, type ListeningQuestion } from '@/lib/listening-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, Volume2, Check, X, RotateCcw, Headphones } from 'lucide-react';
import { getMember } from '@/lib/members';
import { MemberAvatar } from '@/components/common/MemberAvatar';

type Mode = 'select' | 'quiz' | 'quiz-result' | 'dictation' | 'result';
type Speed = 0.8 | 1.0 | 1.2;

export function ListeningPractice() {
  const profile = useProfile();
  const en = profile?.settings?.englishSpeakerMode ?? false;
  const [mode, setMode] = useState<Mode>('select');
  const [filter, setFilter] = useState<'all' | 'eiken2' | 'eiken_pre1' | 'toefl'>('all');
  const [questions, setQuestions] = useState<ListeningQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState<Speed>(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Dictation state
  const [dictIndex, setDictIndex] = useState(0);
  const [dictInput, setDictInput] = useState('');
  const [dictRevealed, setDictRevealed] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const load = () => setVoices(window.speechSynthesis.getVoices().filter(v => v.lang.startsWith('en')));
    load();
    window.speechSynthesis.addEventListener('voiceschanged', load);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', load);
  }, []);

  const startQuiz = () => {
    const filtered = filter === 'all'
      ? LISTENING_QUESTIONS
      : LISTENING_QUESTIONS.filter(q => q.level === filter);
    setQuestions(filtered);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setAnswered(null);
    setMode('quiz');
  };

  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    // Split by speaker labels (Man:/Woman:) for multi-voice
    const parts = text.split(/((?:Man|Woman|Speaker \d):\s*)/i).filter(Boolean);
    const femaleVoice = voices.find(v => v.name.toLowerCase().includes('female') || v.name.includes('Samantha') || v.name.includes('Karen') || v.name.includes('Victoria'));
    const maleVoice = voices.find(v => v.name.toLowerCase().includes('male') || v.name.includes('Daniel') || v.name.includes('Alex') || v.name.includes('Fred'));

    let currentGender: 'male' | 'female' = 'male';
    const utterances: SpeechSynthesisUtterance[] = [];

    for (const part of parts) {
      if (/^woman:/i.test(part) || /^speaker 2:/i.test(part)) { currentGender = 'female'; continue; }
      if (/^man:/i.test(part) || /^speaker 1:/i.test(part)) { currentGender = 'male'; continue; }
      if (!part.trim()) continue;

      const utt = new SpeechSynthesisUtterance(part.trim());
      utt.lang = 'en-US';
      utt.rate = speed;
      if (currentGender === 'female' && femaleVoice) utt.voice = femaleVoice;
      else if (currentGender === 'male' && maleVoice) utt.voice = maleVoice;
      utterances.push(utt);
    }

    if (utterances.length === 0) {
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = 'en-US';
      utt.rate = speed;
      utterances.push(utt);
    }

    setIsPlaying(true);
    utterances.forEach((utt, i) => {
      if (i === utterances.length - 1) {
        utt.onend = () => setIsPlaying(false);
        utt.onerror = () => setIsPlaying(false);
      }
      window.speechSynthesis.speak(utt);
    });
    utteranceRef.current = utterances[utterances.length - 1];
  }, [speed, voices]);

  const stopSpeech = () => {
    if (typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  const handleSelect = (index: number) => {
    if (answered !== null) return;
    setSelected(index);
  };

  const handleConfirm = () => {
    if (selected === null || answered !== null) return;
    setAnswered(selected);
    if (selected === questions[current].correctIndex) setScore(s => s + 1);
    setMode('quiz-result');
  };

  const nextQuestion = () => {
    if (current + 1 >= questions.length) {
      setMode('result');
      // Update streak on study completion
      import('@/lib/streak').then(({ onStudyComplete }) => onStudyComplete());
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(null);
      setMode('quiz');
      stopSpeech();
    }
  };

  // Select mode
  if (mode === 'select') {
    return (
      <div className="space-y-4 px-4">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-sky-600 via-blue-500 to-indigo-400 p-5 text-white shadow-lg mb-2">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
        <div className="relative">
          <h2 className="text-xl font-black tracking-wide">{en ? 'Listening Study' : 'リスニング学習'}</h2>
          <p className="text-xs opacity-60 mt-0.5">Listening</p>
        </div>
      </div>
        <p className="text-xs text-gray-500">{en ? 'English audio via Web Speech API. Headphones recommended.' : 'Web Speech APIで英語音声を再生します。イヤホン推奨。'}</p>

        {/* Level filter */}
        <div className="flex gap-1.5">
          {([['all', 'すべて'], ['eiken2', '2級'], ['eiken_pre1', '準1級'], ['toefl', 'TOEFL']] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1.5 rounded-full text-xs ${filter === key ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}
            >
              {label}
            </button>
          ))}
        </div>

        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{en ? 'Choose Mode' : '学習モードを選択'}</p>
        <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow border-blue-200 dark:border-blue-800" onClick={startQuiz}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Headphones className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">{en ? '4-Choice Quiz' : '4択クイズ'}</p>
              <p className="text-xs text-gray-500">{en ? 'Listen and choose the correct answer' : '聞いて正しい答えを選ぶ'}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow border-indigo-200 dark:border-indigo-800" onClick={() => { setMode('dictation'); setDictIndex(0); setDictInput(''); setDictRevealed(false); }}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-100 dark:bg-indigo-900 rounded-full">
              <Volume2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">{en ? 'Dictation' : 'ディクテーション'}</p>
              <p className="text-xs text-gray-500">{en ? 'Listen and write what you hear' : '聞いて書き取る'}</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Final result
  if (mode === 'result') {
    const percent = Math.round((score / questions.length) * 100);
    return (
      <div className="text-center py-8 px-4 space-y-4">
        <Headphones className="w-12 h-12 text-blue-500 mx-auto" />
        <h2 className="text-xl font-bold">{en ? 'Listening Complete' : 'リスニング完了'}</h2>
        <p className="text-3xl font-bold">{score} / {questions.length}</p>
        <p className="text-sm text-gray-500">正答率 {percent}%</p>
        <div className="flex gap-2 justify-center">
          <Button variant="outline" onClick={() => setMode('select')}>戻る</Button>
          <Button onClick={startQuiz}>もう一度</Button>
        </div>
      </div>
    );
  }

  // Dictation mode
  if (mode === 'dictation') {
    const exercise = DICTATION_EXERCISES[dictIndex];
    if (!exercise) {
      return (
        <div className="text-center py-8 px-4 space-y-4">
          <h2 className="text-xl font-bold">ディクテーション完了！</h2>
          <Button onClick={() => setMode('select')}>戻る</Button>
        </div>
      );
    }

    return (
      <div className="space-y-4 px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">ディクテーション</h2>
          <span className="text-xs text-gray-500">{dictIndex + 1} / {DICTATION_EXERCISES.length}</span>
        </div>

        <Card className="p-4 text-center">
          <p className="text-xs text-gray-500 mb-3">{exercise.hint}</p>
          <Button
            onClick={() => speak(exercise.text)}
            disabled={isPlaying}
            size="lg"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>
          <p className="text-xs text-gray-400 mt-2">{en ? 'Tap to play audio' : 'タップして音声を再生'}</p>
        </Card>

        <textarea
          value={dictInput}
          onChange={(e) => setDictInput(e.target.value)}
          placeholder="聞こえた英文を入力..."
          rows={3}
          className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-900 resize-none"
        />

        {dictRevealed && (
          <Card className="p-3 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
            <p className="text-xs text-green-700 dark:text-green-300 font-medium mb-1">正解:</p>
            <p className="text-sm">{exercise.text}</p>
          </Card>
        )}

        <div className="flex gap-2">
          {!dictRevealed ? (
            <Button onClick={() => setDictRevealed(true)} className="flex-1">{en ? 'Show Answer' : '答えを見る'}</Button>
          ) : (
            <Button onClick={() => { setDictIndex(dictIndex + 1); setDictInput(''); setDictRevealed(false); stopSpeech(); }} className="flex-1">
              次の問題
            </Button>
          )}
          <Button variant="outline" onClick={() => { stopSpeech(); setMode('select'); }}>終了</Button>
        </div>
      </div>
    );
  }

  // Quiz-result mode (after pressing 決定)
  if (mode === 'quiz-result') {
    const q = questions[current];
    const isCorrect = answered === q.correctIndex;

    return (
      <div className="space-y-4 px-4">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{q.type === 'eiken' ? '英検型' : 'TOEFL型'}</Badge>
          <span className="text-xs text-gray-500">{current + 1} / {questions.length}</span>
        </div>

        <Progress value={((current + 1) / questions.length) * 100} className="h-1.5" />

        {/* Result indicator */}
        <div className={`p-4 rounded-xl text-center font-bold text-lg ${isCorrect ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'}`}>
          {isCorrect ? (en ? 'Correct!' : '正解！') : (en ? 'Incorrect' : '不正解')}
        </div>

        {/* English script */}
        <Card className="p-4 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/50">
          <p className="text-xs text-blue-500 font-bold mb-2">{en ? 'Script' : '英文'}</p>
          <div className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed space-y-2">
            {q.audioText.split(/(?=(?:Man|Woman|Speaker \d):)/i).filter(Boolean).map((seg, i) => (
              <p key={i}>{seg.trim()}</p>
            ))}
          </div>
        </Card>

        {/* Japanese translation */}
        {q.audioTextJa && (
          <Card className="p-4 border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
            <p className="text-xs text-gray-500 font-bold mb-2">和訳</p>
            <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
              {(q.audioTextJa ?? '').split(/\n/).filter(Boolean).map((seg, i) => (
                <p key={i}>{seg.trim()}</p>
              ))}
            </div>
          </Card>
        )}

        {/* Explanation */}
        {(() => {
          const ren = getMember('ren');
          return ren ? (
            <Card className="p-3 bg-gray-50 dark:bg-gray-900">
              <div className="flex items-start gap-2.5">
                <div className="shrink-0"><MemberAvatar member={ren} size="sm" /></div>
                <div className="flex-1">
                  <p className="text-[10px] text-gray-500 mb-0.5">{ren.nameJa}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{q.explanation}</p>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-3 bg-gray-50 dark:bg-gray-900">
              <p className="text-xs text-gray-600 dark:text-gray-400">{q.explanation}</p>
            </Card>
          );
        })()}

        {/* Next button */}
        <Button onClick={nextQuestion} className="w-full" size="lg">
          {current + 1 >= questions.length ? (en ? 'View Results' : '結果を見る') : (en ? 'Next Question' : '次の問題へ')}
        </Button>
      </div>
    );
  }

  // Quiz mode
  const q = questions[current];

  return (
    <div className="space-y-4 px-4">
      <div className="flex items-center justify-between">
        <Badge variant="secondary">{q.type === 'eiken' ? '英検型' : 'TOEFL型'}</Badge>
        <span className="text-xs text-gray-500">{current + 1} / {questions.length}</span>
      </div>

      <Progress value={((current + 1) / questions.length) * 100} className="h-1.5" />

      {/* Audio player - big prominent play button */}
      <Card className="p-6">
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => isPlaying ? stopSpeech() : speak(q.audioText)}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 shadow-lg shadow-orange-200 dark:shadow-orange-900/30 flex items-center justify-center transition-all active:scale-95"
          >
            {isPlaying ? <Pause className="w-7 h-7 text-white" /> : <Play className="w-7 h-7 text-white ml-1" />}
          </button>
          <p className="text-xs text-gray-400">{en ? 'Tap to play audio' : 'タップして音声を再生'}</p>

          {/* Speed control */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-400">{en ? 'Speed' : '速度'}:</span>
            {([0.8, 1.0, 1.2] as Speed[]).map(s => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${speed === s ? 'bg-amber-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <Button size="sm" variant="ghost" onClick={() => speak(q.audioText)}>
            <RotateCcw className="w-3 h-3 mr-1" />
            <span className="text-xs">{en ? 'Replay' : 'もう一度'}</span>
          </Button>
        </div>
      </Card>

      {/* Question */}
      <Card className="p-4">
        <p className="text-sm font-medium mb-3">{q.question}</p>
        <div className="space-y-2">
          {q.options.map((opt, i) => {
            let cls = 'border-gray-200 dark:border-gray-700 hover:border-blue-400';
            if (selected === i) cls = 'border-blue-500 bg-blue-50 dark:bg-blue-950 ring-2 ring-blue-300 dark:ring-blue-700';
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`w-full text-left p-3 rounded-lg border text-sm flex items-center gap-2 transition-colors ${cls}`}
              >
                <span className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold ${selected === i ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300 text-gray-400'}">
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Confirm button */}
        <Button
          onClick={handleConfirm}
          disabled={selected === null}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-40"
          size="lg"
        >
          {en ? 'Confirm' : '決定'}
        </Button>
      </Card>
    </div>
  );
}
