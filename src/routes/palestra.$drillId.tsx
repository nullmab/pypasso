import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { LabPanel } from "@/components/lab-panel";
import { getDrill } from "@/lib/course/curriculum";
import { drillUnlocked, useQuaderno } from "@/lib/progress";

export const Route = createFileRoute("/palestra/$drillId")({ component: DrillPage });

function DrillPage() {
  const { drillId } = Route.useParams();
  const state = useQuaderno();
  const drill = getDrill(drillId);

  if (!drill) {
    return (
      <main>
        <p>Esercizio non trovato.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/palestra">Palestra</Link>
        </Button>
      </main>
    );
  }

  if (!drillUnlocked(drill.unlockAfter, state)) {
    return (
      <main className="mx-auto max-w-lg pt-8 text-center">
        <Lock className="mx-auto size-8 text-muted-foreground" />
        <h1 className="mt-4 font-display text-3xl">Ancora chiuso</h1>
        <p className="mt-2 text-muted-foreground">Completa l'unità {drill.unlockAfter} per sbloccare questo esercizio.</p>
        <Button asChild className="mt-6">
          <Link to="/palestra">Torna alla palestra</Link>
        </Button>
      </main>
    );
  }

  return (
    <main>
      <Link to="/palestra" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        Palestra
      </Link>
      <h1 className="mt-3 font-display text-3xl font-medium tracking-tight">{drill.title}</h1>
      <p className="mt-2 mb-6 text-muted-foreground">{drill.brief}</p>
      <LabPanel
        lab={drill}
        attempts={state.labAttempts[drill.id] ?? 0}
        onAttempt={() => state.bumpLabAttempt(drill.id)}
        onPass={() => {
          if (!state.drillPassed[drill.id]) {
            state.passDrill(drill.id);
            toast("Esercizio superato.");
          }
        }}
      />
    </main>
  );
}
