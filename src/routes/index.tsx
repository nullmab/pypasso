import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { modules } from "@/lib/course/curriculum";
import {
  completedCount,
  moduleCompleted,
  moduleUnlocked,
  nextModuleId,
  progressPercent,
  useQuaderno,
} from "@/lib/progress";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const state = useQuaderno();
  const [draft, setDraft] = useState("");

  if (!state.name) {
    return (
      <main className="mx-auto max-w-xl pt-6 sm:pt-12">
        <p className="text-sm font-medium tracking-wide text-pine uppercase">Quaderno di laboratorio</p>
        <h1 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-5xl">
          Python, un passo alla volta.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Dieci unità, ciascuna con teoria, quiz e un laboratorio da eseguire qui dentro. Pensato per chi inizia il
          corso in seconda superiore.
        </p>
        <form
          className="mt-8 rounded-[var(--radius-xl)] bg-card p-5 shadow-[var(--shadow-border)] sm:p-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (draft.trim()) state.setName(draft);
          }}
        >
          <Label htmlFor="nome">Come ti chiami?</Label>
          <Input
            id="nome"
            className="mt-2"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Il tuo nome"
            autoComplete="given-name"
          />
          <Button type="submit" className="mt-4 w-full sm:w-auto" disabled={!draft.trim()}>
            Apri il quaderno
            <ArrowRight className="size-4" />
          </Button>
        </form>
      </main>
    );
  }

  const next = nextModuleId(state);
  const nextMod = modules.find((m) => m.id === next)!;
  const done = completedCount(state);
  const pct = progressPercent(state);
  const allDone = done === modules.length;

  return (
    <main>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Quaderno di {state.name}</p>
          <h1 className="mt-1 font-display text-4xl font-medium tracking-tight sm:text-5xl">
            {allDone ? "Corso completato." : "Il tuo percorso."}
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            {allDone
              ? "Dieci unità, quiz e laboratori. Tieni a portata il promemoria quando sei in classe."
              : `${done} di ${modules.length} unità completate. Ogni passo sblocca il successivo.`}
          </p>
        </div>
        {!allDone && (
          <Button asChild size="lg">
            <Link to="/corso/$moduleId" params={{ moduleId: nextMod.id }} search={{ fase: "teoria" }}>
              {done === 0 ? "Inizia dal modulo 1" : `Continua: ${nextMod.title}`}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        )}
      </div>

      <p className="mt-8 font-mono text-sm text-muted-foreground tabular-nums">{pct}% del corso</p>

      <ol className="relative mt-6 ml-3 border-l border-border sm:ml-4">
        {modules.map((m, i) => {
          const unlocked = moduleUnlocked(i, state);
          const completed = moduleCompleted(m.id, state);
          const current = m.id === next && !allDone;
          return (
            <li key={m.id} className="relative pb-8 pl-8 last:pb-0 sm:pl-10">
              <span
                className={cn(
                  "absolute top-1 -left-2.5 flex size-5 items-center justify-center rounded-full border",
                  completed && "border-primary bg-primary text-primary-foreground",
                  current && "border-primary bg-card",
                  !completed && !current && "border-border bg-background",
                )}
              >
                {completed ? <Check className="size-3" /> : <span className="size-1.5 rounded-full bg-current opacity-40" />}
              </span>
              {unlocked ? (
                <Link
                  to="/corso/$moduleId"
                  params={{ moduleId: m.id }}
                  search={{ fase: "teoria" }}
                  className={cn(
                    "block rounded-[var(--radius-lg)] bg-card p-4 shadow-[var(--shadow-border)] transition-transform duration-150 hover:-translate-y-0.5 sm:p-5",
                    current && "ring-1 ring-primary/30",
                  )}
                >
                  <p className="font-mono text-xs text-muted-foreground tabular-nums">Unità {m.number} · {m.minutes} min</p>
                  <h2 className="mt-1 font-display text-xl font-medium tracking-tight">{m.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{m.subtitle}</p>
                </Link>
              ) : (
                <div className="rounded-[var(--radius-lg)] bg-card/60 p-4 text-muted-foreground sm:p-5">
                  <p className="flex items-center gap-2 font-mono text-xs tabular-nums">
                    <Lock className="size-3.5" />
                    Unità {m.number}
                  </p>
                  <h2 className="mt-1 font-display text-xl font-medium tracking-tight text-foreground/70">{m.title}</h2>
                  <p className="mt-1 text-sm">Completa l'unità precedente per sbloccarla.</p>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-4 flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="text-muted-foreground">
              Reimposta il quaderno
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Vuoi ricominciare da zero?</DialogTitle>
              <DialogDescription>
                Quiz, laboratori e il nome sul quaderno verranno cancellati da questo dispositivo.
              </DialogDescription>
            </DialogHeader>
            <Button variant="destructive" onClick={() => state.reset()}>
              Cancella i progressi
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
