import { createFileRoute } from "@tanstack/react-router";
import { cheatsheet } from "@/lib/course/curriculum";

export const Route = createFileRoute("/promemoria")({ component: Promemoria });

function Promemoria() {
  return (
    <main>
      <h1 className="font-display text-4xl font-medium tracking-tight">Promemoria</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Il foglio da tenere accanto al compito. Sintassi essenziale, niente teoria.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {cheatsheet.map((g) => (
          <section key={g.title} className="rounded-[var(--radius-xl)] bg-card p-5 shadow-[var(--shadow-border)] sm:p-6">
            <h2 className="font-display text-xl font-medium tracking-tight">{g.title}</h2>
            <ul className="mt-4 space-y-3">
              {g.rows.map((r) => (
                <li key={r.code} className="grid grid-cols-1 gap-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-baseline">
                  <code className="font-mono text-sm text-pine">{r.code}</code>
                  <span className="text-sm text-muted-foreground">{r.meaning}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
