import type { Lab, LabTest } from "@/lib/course/types";
import { evalInEnv, normalizeOut, pyEqualJson, pyStr, runPython, type PyError } from "./engine";

export type CheckResult = {
  id: string;
  label: string;
  ok: boolean;
  detail?: string;
};

export type LabRun = {
  stdout: string;
  error: PyError | null;
  results: CheckResult[];
  passed: boolean;
};

function runOne(code: string, test: LabTest, fallbackInputs?: string[]): CheckResult {
  if (test.kind === "stdout") {
    const r = runPython(code, { inputs: test.inputs ?? fallbackInputs ?? [] });
    if (r.error) {
      return { id: test.id, label: test.label, ok: false, detail: r.error.friendly };
    }
    const got = normalizeOut(r.stdout);
    const exp = normalizeOut(test.expected);
    if (got === exp) return { id: test.id, label: test.label, ok: true };
    return {
      id: test.id,
      label: test.label,
      ok: false,
      detail: `Output ottenuto:\n${got || "(vuoto)"}\n\nOutput atteso:\n${exp}`,
    };
  }
  const r = runPython(code, { inputs: fallbackInputs ?? [] });
  if (r.error) return { id: test.id, label: test.label, ok: false, detail: r.error.friendly };
  const ev = evalInEnv(test.expr, r);
  if (ev.error || !ev.value) {
    return { id: test.id, label: test.label, ok: false, detail: ev.error?.friendly ?? "Non riesco a valutare l'espressione." };
  }
  if (pyEqualJson(ev.value, test.expected)) return { id: test.id, label: test.label, ok: true };
  return {
    id: test.id,
    label: test.label,
    ok: false,
    detail: `${test.expr} vale ${pyStr(ev.value)}`,
  };
}

export function runLab(code: string, lab: Lab): LabRun {
  const results = lab.tests.map((t) => runOne(code, t, lab.inputs));
  const first = lab.tests[0];
  const preview = runPython(code, {
    inputs: (first && first.kind === "stdout" && first.inputs) || lab.inputs || [],
  });
  return {
    stdout: preview.stdout,
    error: preview.error,
    results,
    passed: results.length > 0 && results.every((r) => r.ok),
  };
}
