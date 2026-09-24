import { highlightPython } from "@/lib/highlight";
import { cn } from "@/lib/utils";

export function CodeBlock({
  code,
  output,
  caption,
  className,
}: {
  code: string;
  output?: string;
  caption?: string;
  className?: string;
}) {
  const parts = highlightPython(code.trimEnd());
  return (
    <figure className={cn("overflow-hidden rounded-[var(--radius-lg)] bg-editor text-editor-fg shadow-[var(--shadow-border)]", className)}>
      <pre className="overflow-x-auto px-4 py-3.5 font-mono text-sm leading-relaxed">
        <code>
          {parts.map((p, i) => (
            <span
              key={i}
              className={
                p.t === "kw"
                  ? "text-code-kw"
                  : p.t === "str"
                    ? "text-code-str"
                    : p.t === "num"
                      ? "text-code-num"
                      : p.t === "com"
                        ? "text-editor-muted italic"
                        : undefined
              }
            >
              {p.v}
            </span>
          ))}
        </code>
      </pre>
      {output !== undefined && (
        <div className="border-t border-editor-fg/10 px-4 py-3">
          <p className="mb-1 font-mono text-xs tracking-[0.14em] text-editor-muted uppercase">Output</p>
          <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap text-code-kw">{output}</pre>
        </div>
      )}
      {caption && (
        <figcaption className="border-t border-editor-fg/10 px-4 py-2 text-xs text-editor-muted">{caption}</figcaption>
      )}
    </figure>
  );
}
