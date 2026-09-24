import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Dumbbell, Map, NotebookPen } from "lucide-react";
import { Wordmark } from "@/components/logo";
import { Progress } from "@/components/ui/progress";
import { progressPercent, useQuaderno } from "@/lib/progress";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Percorso", icon: Map, exact: true },
  { to: "/palestra", label: "Palestra", icon: Dumbbell, exact: false },
  { to: "/glossario", label: "Glossario", icon: BookOpen, exact: false },
  { to: "/promemoria", label: "Promemoria", icon: NotebookPen, exact: false },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const state = useQuaderno();
  const pct = progressPercent(state);

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
          <Link to="/" className="shrink-0 rounded-[var(--radius-sm)] focus-visible:outline-none">
            <Wordmark />
          </Link>
          <nav className="ml-auto hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const active = item.exact ? pathname === item.to : pathname === item.to || pathname.startsWith(item.to + "/");
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "inline-flex h-11 items-center gap-2 rounded-[var(--radius-sm)] px-3 text-sm font-medium transition-colors",
                    active ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="ml-2 hidden w-28 sm:block md:ml-4">
            <p className="mb-1 font-mono text-xs text-muted-foreground tabular-nums">{pct}%</p>
            <Progress value={pct} />
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-2 md:hidden">
          {nav.map((item) => {
            const active = item.exact ? pathname === item.to : pathname === item.to || pathname.startsWith(item.to + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "inline-flex h-11 shrink-0 items-center gap-2 rounded-[var(--radius-sm)] px-3 text-sm font-medium",
                  active ? "bg-secondary text-foreground" : "text-muted-foreground",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10">{children}</div>
    </div>
  );
}
