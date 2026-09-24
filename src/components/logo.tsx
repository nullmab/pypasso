import { cn } from "@/lib/utils";

export function PyMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-8", className)}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" className="fill-primary" />
      <rect x="6" y="20" width="6" height="6" className="fill-primary-foreground" />
      <rect x="13" y="13" width="6" height="13" className="fill-primary-foreground" />
      <rect x="20" y="6" width="6" height="20" className="fill-primary-foreground" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <PyMark />
      <span className="font-display text-xl font-medium tracking-tight text-foreground">PyPasso</span>
    </span>
  );
}
