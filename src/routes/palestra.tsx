import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { drills } from "@/lib/course/curriculum";
import { drillUnlocked, useQuaderno } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/palestra")({ component: Palestra });

function Palestra() {
  const state = useQuaderno();
  return (
    <main>
      <h1 className="font-display text-4xl font-medium tracking-tight">Palestra</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Esercizi extra, sbloccati man mano che completi le unità. Stesso laboratorio, traccia diversa.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {drills.map((d) => {
          const open = drillUnlocked(d.unlockAfter, state);
          const done = !!state.drillPassed[d.id];
          return (
            <li key={d.id}>
              {open ? (
                <Link
                  to="/palestra/$drillId"
                  params={{ drillId: d.id }}
                  className={cn(
                    "block rounded-[var(--radius-xl)] bg-card p-5 shadow-[var(--shadow-border)] transition-transform hover:-translate-y-0.5",
                    done && "ring-1 ring-primary/25",
                  )}
                >
                  <p className="font-mono text-xs text-muted-foreground tabular-nums">
                    {d.minutes} min{done ? " · superato" : ""}
                  </p>
                  <h2 className="mt-1 font-display text-xl font-medium">{d.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{d.brief}</p>
                </Link>
              ) : (
                <div className="rounded-[var(--radius-xl)] bg-card/70 p-5 text-muted-foreground">
                  <p className="flex items-center gap-2 font-mono text-xs">
                    <Lock className="size-3.5" />
                    Dopo l'unità {d.unlockAfter}
                  </p>
                  <h2 className="mt-1 font-display text-xl font-medium text-foreground/70">{d.title}</h2>
                  <p className="mt-1 text-sm">{d.brief}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
