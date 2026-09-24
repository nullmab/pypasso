import { create } from "zustand";
import { persist } from "zustand/middleware";
import { modules } from "@/lib/course/curriculum";

export type Fase = "teoria" | "quiz" | "lab";

type Quaderno = {
  name: string;
  theoryDone: Record<string, boolean>;
  quizCorrect: Record<string, number>;
  quizTotal: Record<string, number>;
  labPassed: Record<string, boolean>;
  labAttempts: Record<string, number>;
  drillPassed: Record<string, boolean>;
  setName: (name: string) => void;
  markTheory: (id: string) => void;
  saveQuiz: (id: string, correct: number, total: number) => void;
  passLab: (id: string) => void;
  bumpLabAttempt: (id: string) => void;
  passDrill: (id: string) => void;
  reset: () => void;
};

const empty = {
  name: "",
  theoryDone: {} as Record<string, boolean>,
  quizCorrect: {} as Record<string, number>,
  quizTotal: {} as Record<string, number>,
  labPassed: {} as Record<string, boolean>,
  labAttempts: {} as Record<string, number>,
  drillPassed: {} as Record<string, boolean>,
};

export const useQuaderno = create<Quaderno>()(
  persist(
    (set) => ({
      ...empty,
      setName: (name) => set({ name: name.trim() }),
      markTheory: (id) => set((s) => ({ theoryDone: { ...s.theoryDone, [id]: true } })),
      saveQuiz: (id, correct, total) =>
        set((s) => ({
          quizCorrect: { ...s.quizCorrect, [id]: correct },
          quizTotal: { ...s.quizTotal, [id]: total },
        })),
      passLab: (id) => set((s) => ({ labPassed: { ...s.labPassed, [id]: true } })),
      bumpLabAttempt: (id) =>
        set((s) => ({ labAttempts: { ...s.labAttempts, [id]: (s.labAttempts[id] ?? 0) + 1 } })),
      passDrill: (id) => set((s) => ({ drillPassed: { ...s.drillPassed, [id]: true } })),
      reset: () => set({ ...empty, name: "" }),
    }),
    { name: "pypasso.quaderno.v1" },
  ),
);

export function quizPassed(id: string, state: Pick<Quaderno, "quizCorrect" | "quizTotal">): boolean {
  const total = state.quizTotal[id] ?? 0;
  const correct = state.quizCorrect[id] ?? 0;
  if (total === 0) return false;
  return correct / total >= 0.7;
}

export function moduleCompleted(id: string, state: Pick<Quaderno, "quizCorrect" | "quizTotal" | "labPassed">): boolean {
  return quizPassed(id, state) && !!state.labPassed[id];
}

export function moduleUnlocked(index: number, state: Pick<Quaderno, "quizCorrect" | "quizTotal" | "labPassed">): boolean {
  if (index <= 0) return true;
  return moduleCompleted(modules[index - 1].id, state);
}

export function nextModuleId(state: Pick<Quaderno, "quizCorrect" | "quizTotal" | "labPassed">): string {
  for (let i = 0; i < modules.length; i++) {
    if (!moduleCompleted(modules[i].id, state) && moduleUnlocked(i, state)) return modules[i].id;
  }
  return modules[modules.length - 1].id;
}

export function completedCount(state: Pick<Quaderno, "quizCorrect" | "quizTotal" | "labPassed">): number {
  return modules.filter((m) => moduleCompleted(m.id, state)).length;
}

export function drillUnlocked(unlockAfter: number, state: Pick<Quaderno, "quizCorrect" | "quizTotal" | "labPassed">): boolean {
  const needed = modules.find((m) => m.number === unlockAfter);
  if (!needed) return false;
  return moduleCompleted(needed.id, state);
}

export function progressPercent(state: Pick<Quaderno, "quizCorrect" | "quizTotal" | "labPassed">): number {
  return Math.round((completedCount(state) / modules.length) * 100);
}
