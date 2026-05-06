'use client';

interface ChoiceButtonsProps {
  prompt: string;
  options: { text: string; next: string }[];
  onSelect: (next: string) => void;
}

export function ChoiceButtons({ prompt, options, onSelect }: ChoiceButtonsProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0">
      <div className="mx-4 mb-4 rounded-xl bg-black/80 backdrop-blur-sm border border-white/10 p-4">
        {prompt && (
          <p className="text-white/70 text-sm mb-3 text-center">{prompt}</p>
        )}
        <div className="flex flex-col gap-2">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => onSelect(opt.next)}
              className="w-full py-3 px-4 rounded-lg bg-indigo-600/80 hover:bg-indigo-500 text-white font-medium transition-colors text-left"
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
