import { useMemo, useState } from "react";
import { Check, ChevronRight, RotateCcw, X } from "lucide-react";
import type { QuizQuestion } from "@/lib/course/types";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import { cn } from "@/lib/utils";

export function QuizPanel({
  questions,
  onFinished,
}: {
  questions: QuizQuestion[];
  onFinished: (correct: number, total: number) => void;
}) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const q = questions[i];
  const answered = picked !== null;
  const isRight = picked === q?.correctId;
  const score = useMemo(() => Math.round((correct / questions.length) * 100), [correct, questions.length]);

  if (done) {
    const passed = correct / questions.length >= 0.7;
    return (
      <div className="rounded-[var(--radius-xl)] bg-card p-6 shadow-[var(--shadow-border)] sm:p-8">
        <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">Quiz concluso</p>
        <h2 className="mt-2 font-display text-3xl font-medium tracking-tight">
          {correct} su {questions.length}
        </h2>
        <p className="mt-2 max-w-md text-muted-foreground">
          {passed
            ? "Soglia del 70% superata. Puoi passare al laboratorio."
            : "Serve almeno il 70% per sbloccare il laboratorio. Riprova: le spiegazioni restano visibili."}
        </p>
        <p className="mt-4 font-mono text-sm tabular-nums text-pine">{score}%</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setI(0);
              setPicked(null);
              setCorrect(0);
              setDone(false);
            }}
          >
            <RotateCcw className="size-4" />
            Riprova
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-xl)] bg-card p-5 shadow-[var(--shadow-border)] sm:p-8">
      <p className="text-sm font-medium text-muted-foreground tabular-nums">
        Domanda {i + 1} di {questions.length}
      </p>
      <h2 className="mt-2 font-display text-2xl font-medium tracking-tight">{q.prompt}</h2>
      {q.code && <CodeBlock code={q.code} className="mt-4" />}
      <ul className="mt-5 flex flex-col gap-2">
        {q.options.map((opt) => {
          const show = answered;
          const right = opt.id === q.correctId;
          const mine = opt.id === picked;
          return (
            <li key={opt.id}>
              <button
                type="button"
                disabled={answered}
                onClick={() => {
                  setPicked(opt.id);
                  const ok = opt.id === q.correctId;
                  const nextCorrect = correct + (ok ? 1 : 0);
                  if (ok) setCorrect(nextCorrect);
                }}
                className={cn(
                  "flex min-h-12 w-full items-start gap-3 rounded-[var(--radius-md)] border px-4 py-3 text-left text-sm transition-colors",
                  !show && "border-border bg-background hover:bg-secondary",
                  show && right && "border-success/40 bg-accent text-accent-foreground",
                  show && mine && !right && "border-destructive/40 bg-destructive/10",
                  show && !mine && !right && "border-border bg-background opacity-70",
                )}
              >
                <span className="mt-0.5 font-mono text-xs text-muted-foreground">{opt.id.toUpperCase()}</span>
                <span className="flex-1">{opt.text}</span>
                {show && right && <Check className="size-4 shrink-0 text-success" />}
                {show && mine && !right && <X className="size-4 shrink-0 text-destructive" />}
              </button>
            </li>
          );
        })}
      </ul>
      {answered && (
        <div className="mt-5 rounded-[var(--radius-md)] bg-secondary px-4 py-3 text-sm leading-relaxed">
          <p className="font-medium">{isRight ? "Giusto." : "Non proprio."}</p>
          <p className="mt-1 text-muted-foreground">{q.explain}</p>
          <Button
            className="mt-4"
            onClick={() => {
              if (i + 1 >= questions.length) {
                const totalCorrect = correct;
                setDone(true);
                onFinished(totalCorrect, questions.length);
              } else {
                setI(i + 1);
                setPicked(null);
              }
            }}
          >
            {i + 1 >= questions.length ? "Vedi il risultato" : "Domanda successiva"}
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
