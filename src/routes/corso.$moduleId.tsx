import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { LabPanel } from "@/components/lab-panel";
import { QuizPanel } from "@/components/quiz-panel";
import { TheoryPanel } from "@/components/theory-panel";
import { getModule, modules } from "@/lib/course/curriculum";
import {
  moduleCompleted,
  moduleUnlocked,
  quizPassed,
  useQuaderno,
  type Fase,
} from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/corso/$moduleId")({
  validateSearch: (s: Record<string, unknown>): { fase: Fase } => ({
    fase: s.fase === "quiz" || s.fase === "lab" ? s.fase : "teoria",
  }),
  component: CorsoPage,
});

function CorsoPage() {
  const { moduleId } = Route.useParams();
  const { fase } = Route.useSearch();
  const navigate = useNavigate({ from: "/corso/$moduleId" });
  const state = useQuaderno();
  const mod = getModule(moduleId);
  const index = modules.findIndex((m) => m.id === moduleId);

  if (!mod || index < 0) {
    return (
      <main>
        <p>Unità non trovata.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/">Torna al percorso</Link>
        </Button>
      </main>
    );
  }

  const unlocked = moduleUnlocked(index, state);
  const quizOk = quizPassed(mod.id, state);
  const labOk = !!state.labPassed[mod.id];
  const fases: { id: Fase; label: string; locked: boolean }[] = [
    { id: "teoria", label: "Teoria", locked: false },
    { id: "quiz", label: "Quiz", locked: false },
    { id: "lab", label: "Laboratorio", locked: !quizOk },
  ];

  const go = (next: Fase) => {
    void navigate({ search: { fase: next } });
  };

  if (!unlocked) {
    return (
      <main className="mx-auto max-w-lg pt-8 text-center">
        <Lock className="mx-auto size-8 text-muted-foreground" />
        <h1 className="mt-4 font-display text-3xl font-medium">Unità ancora chiusa</h1>
        <p className="mt-2 text-muted-foreground">Completa quiz e laboratorio dell'unità precedente.</p>
        <Button asChild className="mt-6">
          <Link to="/">Torna al percorso</Link>
        </Button>
      </main>
    );
  }

  const shown: Fase = fase === "lab" && !quizOk ? "quiz" : fase;

  return (
    <main>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" />
            Percorso
          </Link>
          <p className="mt-3 font-mono text-xs text-muted-foreground tabular-nums">
            Unità {mod.number} di {modules.length} · {mod.minutes} min
          </p>
          <h1 className="mt-1 font-display text-3xl font-medium tracking-tight sm:text-4xl">{mod.title}</h1>
          <p className="mt-2 text-muted-foreground">{mod.subtitle}</p>
        </div>
      </div>

      <div className="mb-6 flex gap-1 rounded-[var(--radius-lg)] bg-secondary p-1">
        {fases.map((f) => (
          <button
            key={f.id}
            type="button"
            disabled={f.locked}
            onClick={() => go(f.id)}
            className={cn(
              "flex h-11 flex-1 items-center justify-center rounded-[var(--radius-sm)] text-sm font-medium transition-colors",
              shown === f.id ? "bg-card text-foreground shadow-[var(--shadow-border)]" : "text-muted-foreground",
              f.locked && "opacity-50",
            )}
          >
            {f.label}
            {f.id === "quiz" && quizOk ? " · ok" : ""}
            {f.id === "lab" && labOk ? " · ok" : ""}
          </button>
        ))}
      </div>

      {shown === "teoria" && (
        <div>
          <ul className="mb-6 flex flex-wrap gap-2">
            {mod.goals.map((g) => (
              <li key={g} className="rounded-full bg-accent px-3 py-1.5 text-xs text-accent-foreground">
                {g}
              </li>
            ))}
          </ul>
          <TheoryPanel blocks={mod.theory} />
          <div className="mt-6 flex justify-end">
            <Button
              onClick={() => {
                state.markTheory(mod.id);
                go("quiz");
              }}
            >
              Vai al quiz
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      )}

      {shown === "quiz" && (
        <QuizPanel
          key={mod.id}
          questions={mod.quiz}
          onFinished={(correct, total) => {
            state.saveQuiz(mod.id, correct, total);
            if (correct / total >= 0.7) {
              toast("Quiz superato. Laboratorio sbloccato.");
            }
          }}
        />
      )}

      {shown === "quiz" && quizOk && (
        <div className="mt-4 flex justify-end">
          <Button onClick={() => go("lab")}>
            Vai al laboratorio
            <ArrowRight className="size-4" />
          </Button>
        </div>
      )}

      {shown === "lab" && quizOk && (
        <div>
          <LabPanel
            key={mod.id}
            lab={mod.lab}
            attempts={state.labAttempts[mod.id] ?? 0}
            onAttempt={() => state.bumpLabAttempt(mod.id)}
            onPass={() => {
              if (!state.labPassed[mod.id]) {
                state.passLab(mod.id);
                toast(index < modules.length - 1 ? "Unità completata. La successiva è aperta." : "Hai finito il corso.");
              }
            }}
          />
          {moduleCompleted(mod.id, state) && index < modules.length - 1 && (
            <div className="mt-6 flex justify-end">
              <Button asChild>
                <Link to="/corso/$moduleId" params={{ moduleId: modules[index + 1].id }} search={{ fase: "teoria" }}>
                  Unità successiva
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
