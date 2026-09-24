import { evalInEnv, normalizeOut, pyEqualJson, runPython } from "./engine.ts";
import assert from "node:assert/strict";
import { test } from "node:test";

function out(code: string, inputs: string[] = []) {
  const r = runPython(code, { inputs });
  assert.equal(r.error, null, r.error?.friendly);
  return normalizeOut(r.stdout);
}

test("print and comments", () => {
  assert.equal(out('print("Ciao, Python!")\n# un commento\nprint("Sto imparando a programmare.")'), "Ciao, Python!\nSto imparando a programmare.");
});

test("variables and f-strings", () => {
  assert.equal(
    out('nome = "Ada"\neta = 16\nprint(f"Mi chiamo {nome} e ho {eta} anni.")'),
    "Mi chiamo Ada e ho 16 anni.",
  );
});

test("input conversion", () => {
  assert.equal(out('a = int(input())\nb = int(input())\nprint(a + b)', ["4", "7"]), "11");
});

test("operators", () => {
  assert.equal(out("print(7 // 2)\nprint(7 % 2)\nprint(2 ** 3)"), "3\n1\n8");
});

test("if elif else", () => {
  const code = `voto = int(input())
if voto >= 8:
    print("Ottimo")
elif voto >= 6:
    print("Sufficiente")
else:
    print("Insufficiente")`;
  assert.equal(out(code, ["9"]), "Ottimo");
  assert.equal(out(code, ["6"]), "Sufficiente");
  assert.equal(out(code, ["4"]), "Insufficiente");
});

test("while and for", () => {
  assert.equal(
    out("n = 3\nwhile n > 0:\n    print(n)\n    n -= 1"),
    "3\n2\n1",
  );
  assert.equal(out("for i in range(3):\n    print(i)"), "0\n1\n2");
});

test("lists methods", () => {
  const r = runPython("xs = [3, 1, 2]\nxs.append(4)\nprint(len(xs))\nprint(max(xs))");
  assert.equal(r.error, null, r.error?.friendly);
  assert.equal(normalizeOut(r.stdout), "4\n4");
});

test("functions", () => {
  const r = runPython(`def media(a, b, c):
    return (a + b + c) / 3
`);
  assert.equal(r.error, null, r.error?.friendly);
  const ev = evalInEnv("media(10, 20, 30)", r);
  assert.equal(ev.error, null, ev.error?.friendly);
  assert.equal(pyEqualJson(ev.value!, 20), true);
});

test("string methods", () => {
  assert.equal(out('print("ciao".upper())\nprint("  x  ".strip())'), "CIAO\nx");
});

test("name error friendly", () => {
  const r = runPython("print(nome)");
  assert.ok(r.error);
  assert.equal(r.error?.type, "NameError");
});

test("indent error", () => {
  const r = runPython("if True:\nprint(1)");
  assert.ok(r.error);
  assert.equal(r.error?.type, "IndentationError");
});

test("type concat error", () => {
  const r = runPython('print("anni " + 16)');
  assert.ok(r.error);
  assert.equal(r.error?.type, "TypeError");
});
