import assert from "node:assert/strict";
import { test } from "node:test";
import { drills, modules } from "./curriculum.ts";
import { runLab } from "../python/run-lab.ts";

for (const mod of modules) {
  test(`soluzione laboratorio ${mod.number} ${mod.title}`, () => {
    const run = runLab(mod.lab.solution, mod.lab);
    assert.equal(run.passed, true, run.results.filter((r) => !r.ok).map((r) => `${r.label}: ${r.detail}`).join("\n"));
  });
}

for (const d of drills) {
  test(`soluzione palestra ${d.title}`, () => {
    const run = runLab(d.solution, d);
    assert.equal(run.passed, true, run.results.filter((r) => !r.ok).map((r) => `${r.label}: ${r.detail}`).join("\n"));
  });
}
