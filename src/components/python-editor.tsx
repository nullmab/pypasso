import { useEffect, useRef, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

export function PythonEditor({
  value,
  onChange,
  onRun,
}: {
  value: string;
  onChange: (v: string) => void;
  onRun?: () => void;
}) {
  const lines = value.split("\n");
  const pre = useRef<HTMLPreElement>(null);
  const ta = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const a = pre.current;
    const b = ta.current;
    if (!a || !b) return;
    const sync = () => {
      a.scrollTop = b.scrollTop;
    };
    b.addEventListener("scroll", sync);
    return () => b.removeEventListener("scroll", sync);
  }, []);

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      onRun?.();
      return;
    }
    if (e.key !== "Tab") return;
    e.preventDefault();
    const el = e.currentTarget;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    if (e.shiftKey) {
      const before = value.slice(0, start);
      const lineStart = before.lastIndexOf("\n") + 1;
      const indent = value.slice(lineStart, lineStart + 4) === "    " ? 4 : value.slice(lineStart, lineStart + 1) === " " ? 1 : 0;
      if (!indent) return;
      const next = value.slice(0, lineStart) + value.slice(lineStart + indent);
      onChange(next);
      requestAnimationFrame(() => {
        el.selectionStart = start - indent;
        el.selectionEnd = end - indent;
      });
      return;
    }
    const next = value.slice(0, start) + "    " + value.slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      el.selectionStart = el.selectionEnd = start + 4;
    });
  }

  return (
    <div className="relative flex min-h-52 flex-1 overflow-hidden rounded-[var(--radius-md)] bg-editor font-mono text-sm leading-6 text-editor-fg sm:min-h-64">
      <pre
        ref={pre}
        aria-hidden
        className="pointer-events-none w-9 shrink-0 overflow-hidden py-3 pr-2 text-right text-editor-muted select-none"
      >
        {lines.map((_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </pre>
      <textarea
        ref={ta}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        aria-label="Editor Python"
        className={cn(
          "min-h-full w-full resize-none bg-transparent py-3 pr-3 pl-1 text-base text-editor-fg outline-none sm:text-sm",
          "placeholder:text-editor-muted",
        )}
        style={{ tabSize: 4 }}
      />
    </div>
  );
}
