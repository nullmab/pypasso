import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { glossary } from "@/lib/course/curriculum";

export const Route = createFileRoute("/glossario")({ component: Glossario });

function Glossario() {
  const [q, setQ] = useState("");
  const items = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return glossary;
    return glossary.filter((t) => t.term.toLowerCase().includes(s) || t.def.toLowerCase().includes(s));
  }, [q]);

  return (
    <main>
      <h1 className="font-display text-4xl font-medium tracking-tight">Glossario</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        I termini che userete in classe, detti in italiano. Tienilo aperto mentre fai i laboratori.
      </p>
      <Input
        className="mt-6 max-w-md"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Cerca un termine"
        aria-label="Cerca nel glossario"
      />
      <ul className="mt-8 divide-y divide-border rounded-[var(--radius-xl)] bg-card shadow-[var(--shadow-border)]">
        {items.map((t) => (
          <li key={t.term} className="px-5 py-4 sm:px-6">
            <h2 className="font-display text-lg font-medium">{t.term}</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.def}</p>
          </li>
        ))}
        {items.length === 0 && <li className="px-5 py-8 text-sm text-muted-foreground">Nessun termine trovato.</li>}
      </ul>
    </main>
  );
}
