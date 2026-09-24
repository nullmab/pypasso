import { Info, PencilLine, TriangleAlert } from "lucide-react";
import type { TheoryBlock } from "@/lib/course/types";
import { CodeBlock } from "@/components/code-block";
import { cn } from "@/lib/utils";

function CalloutIcon({ tone }: { tone: "tip" | "rule" | "warn" }) {
  if (tone === "warn") return <TriangleAlert className="size-4 shrink-0 text-warn" />;
  if (tone === "rule") return <PencilLine className="size-4 shrink-0 text-pine" />;
  return <Info className="size-4 shrink-0 text-pine" />;
}

export function TheoryPanel({ blocks }: { blocks: TheoryBlock[] }) {
  return (
    <article className="flex flex-col gap-8">
      {blocks.map((b) => (
        <section key={b.heading} className="rounded-[var(--radius-xl)] bg-card p-5 shadow-[var(--shadow-border)] sm:p-8">
          <h2 className="font-display text-2xl font-medium tracking-tight">{b.heading}</h2>
          <div className="mt-3 space-y-3 text-base leading-relaxed text-foreground/90">
            {b.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {b.bullets && (
            <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
              {b.bullets.map((x) => (
                <li key={x}>
                  <code className="rounded-[var(--radius-xs)] bg-secondary px-1 py-0.5 font-mono text-sm">{x.split(" — ")[0]}</code>
                  {x.includes(" — ") ? ` — ${x.split(" — ").slice(1).join(" — ")}` : null}
                </li>
              ))}
            </ul>
          )}
          {b.code && (
            <CodeBlock className="mt-5" code={b.code.source} output={b.code.output} caption={b.code.caption} />
          )}
          {b.callout && (
            <aside
              className={cn(
                "mt-5 flex gap-3 rounded-[var(--radius-md)] px-4 py-3 text-sm leading-relaxed",
                b.callout.tone === "warn" ? "bg-secondary" : "bg-accent",
              )}
            >
              <CalloutIcon tone={b.callout.tone} />
              <div>
                <p className="font-medium">{b.callout.title}</p>
                <p className="mt-1 text-muted-foreground">{b.callout.body}</p>
              </div>
            </aside>
          )}
        </section>
      ))}
    </article>
  );
}
