import { useMemo, useState } from "react";
import { Check, Circle, Lightbulb, Play, RotateCcw, SquareCheck } from "lucide-react";
import type { Lab } from "@/lib/course/types";
import { Button } from "@/components/ui/button";
import { PythonEditor } from "@/components/python-editor";
import { CodeBlock } from "@/components/code-block";
import { runLab, type CheckResult } from "@/lib/python/run-lab";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function LabPanel({
  lab,
  attempts,
  onAttempt,
  onPass,
}: {
  lab: Lab;
  attempts: number;
  onAttempt: () => void;
  onPass: () => void;
}) {
  const [code, setCode] = useState(lab.starter);
  const [results, setResults] = useState<CheckResult[] | null>(null);
  const [stdout, setStdout] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hintOpen, setHintOpen] = useState(false);

  const inputs = useMemo(() => {
    const fromTests = lab.tests.flatMap((t) => (t.kind === "stdout" && t.inputs ? [t.inputs] : []));
    if (lab.inputs) return lab.inputs;
    return fromTests[0];
  }, [lab]);

  function run() {
    onAttempt();
    const r = runLab(code, lab);
    setResults(r.results);
    setStdout(r.stdout);
    setError(r.error?.friendly ?? null);
    if (r.passed) onPass();
  }

  const passed = results?.every((x) => x.ok) ?? false;

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,4fr)]">
      <section className="rounded-[var(--radius-xl)] bg-card p-5 shadow-[var(--shadow-border)] sm:p-6">
        <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">Laboratorio</p>
        <h2 className="mt-1 font-display text-2xl font-medium tracking-tight">{lab.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{lab.brief}</p>
        <ol className="mt-4 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed">
          {lab.spec.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        {inputs && inputs.length > 0 && (
          <div className="mt-4 rounded-[var(--radius-md)] bg-secondary px-3 py-2 font-mono text-xs text-secondary-foreground">
            <span className="text-muted-foreground">Input simulati: </span>
            {inputs.map((v, i) => (
              <span key={i}>
                {i > 0 && <span className="text-muted-foreground"> poi </span>}
                <span>{v}</span>
              </span>
            ))}
          </div>
        )}
        {results && (
          <ul className="mt-5 flex flex-col gap-2">
            {results.map((r) => (
              <li
                key={r.id}
                className={cn(
                  "rounded-[var(--radius-sm)] border px-3 py-2 text-sm",
                  r.ok ? "border-success/30 bg-accent" : "border-border bg-background",
                )}
              >
                <div className="flex items-start gap-2">
                  {r.ok ? (
                    <Check className="mt-0.5 size-4 shrink-0 text-success" />
                  ) : (
                    <Circle className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p>{r.label}</p>
                    {!r.ok && r.detail && (
                      <pre className="mt-1 overflow-x-auto font-mono text-xs whitespace-pre-wrap text-muted-foreground">
                        {r.detail}
                      </pre>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {passed && (
          <p className="mt-4 flex items-center gap-2 text-sm font-medium text-success">
            <SquareCheck className="size-4" />
            Laboratorio superato.
          </p>
        )}
      </section>

      <section className="flex min-h-[28rem] flex-col overflow-hidden rounded-[var(--radius-xl)] bg-editor p-3 shadow-[var(--shadow-border)] sm:p-4">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Button size="sm" onClick={run}>
            <Play className="size-3.5" />
            Esegui i test
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="bg-editor-fg/10 text-editor-fg hover:bg-editor-fg/15"
            onClick={() => {
              setCode(lab.starter);
              setResults(null);
              setStdout(null);
              setError(null);
            }}
          >
            <RotateCcw className="size-3.5" />
            Ripristina
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-editor-fg hover:bg-editor-fg/10"
            onClick={() => setHintOpen(true)}
            disabled={attempts < 1 && !passed}
          >
            <Lightbulb className="size-3.5" />
            Suggerimento
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="text-editor-fg hover:bg-editor-fg/10"
                disabled={attempts < 3 && !passed}
              >
                Soluzione
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Una soluzione possibile</DialogTitle>
                <DialogDescription>
                  Leggila, chiudi, e prova a riscriverla con parole tue. Copiare senza capire non aiuta in classe.
                </DialogDescription>
              </DialogHeader>
              <CodeBlock code={lab.solution} />
            </DialogContent>
          </Dialog>
          <span className="ml-auto hidden font-mono text-xs text-editor-muted sm:inline">Ctrl + Invio</span>
        </div>
        <PythonEditor value={code} onChange={setCode} onRun={run} />
        <div className="mt-2 max-h-36 overflow-auto rounded-[var(--radius-sm)] bg-ink/40 px-3 py-2 font-mono text-xs text-editor-fg">
          <p className="mb-1 text-xs tracking-[0.14em] text-editor-muted uppercase">Console</p>
          {error ? (
            <p className="whitespace-pre-wrap text-code-str">{error}</p>
          ) : stdout === null ? (
            <p className="text-editor-muted">Premi Esegui i test. Tab inserisce 4 spazi.</p>
          ) : (
            <pre className="whitespace-pre-wrap">{stdout || "(nessun output)"}</pre>
          )}
        </div>
      </section>

      <Dialog open={hintOpen} onOpenChange={setHintOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Suggerimento</DialogTitle>
            <DialogDescription>{lab.hint}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
