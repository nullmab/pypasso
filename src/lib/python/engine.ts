export type PyValue =
  | { t: "int"; v: number }
  | { t: "float"; v: number }
  | { t: "str"; v: string }
  | { t: "bool"; v: boolean }
  | { t: "none" }
  | { t: "list"; v: PyValue[] }
  | { t: "range"; start: number; stop: number; step: number }
  | { t: "fn"; name: string; params: string[]; body: Stmt[]; defLine: number }
  | { t: "builtin"; name: string };

export type PyError = {
  line: number;
  type: string;
  message: string;
  friendly: string;
};

export type RunResult = {
  stdout: string;
  error: PyError | null;
  globals: Map<string, PyValue>;
};

type Line = { n: number; indent: number; text: string };

type Tok =
  | { k: "num"; v: number; float: boolean; p: number }
  | { k: "str"; v: string; p: number }
  | { k: "fstr"; parts: FPart[]; p: number }
  | { k: "name"; v: string; p: number }
  | { k: "op"; v: string; p: number }
  | { k: "eof"; p: number };

type FPart = { kind: "lit"; v: string } | { kind: "exp"; v: string };

type Expr =
  | { k: "lit"; v: PyValue; line: number }
  | { k: "name"; v: string; line: number }
  | { k: "list"; xs: Expr[]; line: number }
  | { k: "unary"; op: string; x: Expr; line: number }
  | { k: "bin"; op: string; a: Expr; b: Expr; line: number }
  | { k: "bool"; op: "and" | "or"; a: Expr; b: Expr; line: number }
  | { k: "cmp"; left: Expr; ops: { op: string; right: Expr }[]; line: number }
  | { k: "call"; fn: Expr; args: Expr[]; kwargs: { name: string; value: Expr }[]; line: number }
  | { k: "index"; x: Expr; i: Expr; line: number }
  | { k: "slice"; x: Expr; a: Expr | null; b: Expr | null; line: number }
  | { k: "attr"; x: Expr; name: string; line: number }
  | { k: "fstr"; parts: ({ kind: "lit"; v: string } | { kind: "exp"; x: Expr })[]; line: number }
  | { k: "cond"; test: Expr; a: Expr; b: Expr; line: number };

type Stmt =
  | { k: "assign"; name: string; value: Expr; line: number }
  | { k: "assign2"; a: string; b: string; value: Expr; line: number }
  | { k: "indexSet"; target: Expr; index: Expr; value: Expr; line: number }
  | { k: "aug"; name: string; op: string; value: Expr; line: number }
  | { k: "expr"; x: Expr; line: number }
  | { k: "if"; branches: { test: Expr; body: Stmt[] }[]; elseBody: Stmt[]; line: number }
  | { k: "while"; test: Expr; body: Stmt[]; line: number }
  | { k: "for"; name: string; extra: string | null; iter: Expr; body: Stmt[]; line: number }
  | { k: "def"; name: string; params: string[]; body: Stmt[]; line: number }
  | { k: "return"; value: Expr | null; line: number }
  | { k: "break"; line: number }
  | { k: "continue"; line: number }
  | { k: "pass"; line: number };

class PErr extends Error {
  line: number;
  type: string;
  friendly: string;
  constructor(line: number, type: string, message: string, friendly: string) {
    super(message);
    this.line = line;
    this.type = type;
    this.friendly = friendly;
  }
}

const KEYWORDS = new Set([
  "if",
  "elif",
  "else",
  "while",
  "for",
  "in",
  "not",
  "and",
  "or",
  "def",
  "return",
  "True",
  "False",
  "None",
  "pass",
  "break",
  "continue",
  "is",
  "lambda",
  "import",
  "from",
  "as",
  "class",
  "try",
  "except",
  "with",
  "assert",
  "global",
  "nonlocal",
  "yield",
  "lambda",
]);

const COMP_OPS = new Set(["==", "!=", "<", ">", "<=", ">=", "in", "not in", "is", "is not"]);

function isIdentStart(c: string) {
  return /[A-Za-z_]/.test(c);
}
function isIdent(c: string) {
  return /[A-Za-z0-9_]/.test(c);
}

function splitLogicalLines(code: string): Line[] {
  const raw = code.replace(/\r\n/g, "\n").replace(/\t/g, "    ").split("\n");
  const lines: Line[] = [];
  for (let i = 0; i < raw.length; i++) {
    const n = i + 1;
    const indent = (raw[i].match(/^ */)?.[0] ?? "").length;
    const text = stripTrailingComment(raw[i]).trim();
    if (!text) continue;
    lines.push({ n, indent, text });
  }
  return lines;
}

function stripTrailingComment(line: string): string {
  let i = 0;
  let quote: string | null = null;
  while (i < line.length) {
    const c = line[i];
    if (quote) {
      if (c === "\\") {
        i += 2;
        continue;
      }
      if (c === quote) quote = null;
      i++;
      continue;
    }
    if (c === "#") return line.slice(0, i);
    if (c === "'" || c === '"') {
      quote = c;
      i++;
      continue;
    }
    i++;
  }
  return line;
}

function tokenize(src: string, line: number): Tok[] {
  const toks: Tok[] = [];
  let i = 0;
  const push = (t: Tok) => toks.push(t);
  while (i < src.length) {
    const c = src[i];
    if (c === " " || c === "\t") {
      i++;
      continue;
    }
    if (c === "#") break;
    if (c === "(") {
      push({ k: "op", v: "(", p: i++ });
      continue;
    }
    if (c === ")") {
      push({ k: "op", v: ")", p: i++ });
      continue;
    }
    if (c === "[") {
      push({ k: "op", v: "[", p: i++ });
      continue;
    }
    if (c === "]") {
      push({ k: "op", v: "]", p: i++ });
      continue;
    }
    if (c === ",") {
      push({ k: "op", v: ",", p: i++ });
      continue;
    }
    if (c === ":") {
      push({ k: "op", v: ":", p: i++ });
      continue;
    }
    if (c === ".") {
      if (/\d/.test(src[i + 1] ?? "")) {
        const start = i;
        i++;
        while (/\d/.test(src[i] ?? "")) i++;
        push({ k: "num", v: Number(src.slice(start, i)), float: true, p: start });
        continue;
      }
      push({ k: "op", v: ".", p: i++ });
      continue;
    }
    if ((c === "f" || c === "F") && (src[i + 1] === '"' || src[i + 1] === "'")) {
      const q = src[i + 1];
      const start = i;
      i += 2;
      const { parts, next } = readFString(src, i, q, line);
      i = next;
      push({ k: "fstr", parts, p: start });
      continue;
    }
    if (c === '"' || c === "'") {
      const start = i;
      const { value, next } = readString(src, i, line);
      i = next;
      push({ k: "str", v: value, p: start });
      continue;
    }
    if (/\d/.test(c)) {
      const start = i;
      while (/\d/.test(src[i] ?? "")) i++;
      let isFloat = false;
      if (src[i] === "." && /\d/.test(src[i + 1] ?? "")) {
        isFloat = true;
        i++;
        while (/\d/.test(src[i] ?? "")) i++;
      }
      if (src[i] === "e" || src[i] === "E") {
        isFloat = true;
        i++;
        if (src[i] === "+" || src[i] === "-") i++;
        while (/\d/.test(src[i] ?? "")) i++;
      }
      push({ k: "num", v: Number(src.slice(start, i)), float: isFloat, p: start });
      continue;
    }
    if (isIdentStart(c)) {
      const start = i;
      i++;
      while (isIdent(src[i] ?? "")) i++;
      push({ k: "name", v: src.slice(start, i), p: start });
      continue;
    }
    const two = src.slice(i, i + 2);
    const ops2 = ["**", "//", "==", "!=", "<=", ">=", "+=", "-=", "*=", "/=", "%="];
    if (ops2.includes(two)) {
      push({ k: "op", v: two, p: i });
      i += 2;
      continue;
    }
    if ("+-*/%=<>!".includes(c)) {
      push({ k: "op", v: c, p: i++ });
      continue;
    }
    throw new PErr(
      line,
      "SyntaxError",
      `carattere inatteso ${c}`,
      `C'è un carattere che Python non capisce: «${c}». Controlla la riga ${line}.`,
    );
  }
  push({ k: "eof", p: src.length });
  return toks;
}

function readString(src: string, i: number, line: number): { value: string; next: number } {
  const q = src[i];
  i++;
  let out = "";
  while (i < src.length) {
    const c = src[i];
    if (c === "\\") {
      const n = src[i + 1];
      const map: Record<string, string> = { n: "\n", t: "\t", r: "\r", "\\": "\\", "'": "'", '"': '"' };
      out += map[n] ?? n ?? "";
      i += 2;
      continue;
    }
    if (c === q) return { value: out, next: i + 1 };
    out += c;
    i++;
  }
  throw new PErr(line, "SyntaxError", "stringa non chiusa", `Virgolette non chiuse alla riga ${line}.`);
}

function readFString(src: string, i: number, q: string, line: number): { parts: FPart[]; next: number } {
  const parts: FPart[] = [];
  let buf = "";
  while (i < src.length) {
    const c = src[i];
    if (c === "\\") {
      const n = src[i + 1];
      const map: Record<string, string> = { n: "\n", t: "\t", r: "\r", "\\": "\\", "'": "'", '"': '"' };
      buf += map[n] ?? n ?? "";
      i += 2;
      continue;
    }
    if (c === q) {
      if (buf) parts.push({ kind: "lit", v: buf });
      return { parts, next: i + 1 };
    }
    if (c === "{") {
      if (src[i + 1] === "{") {
        buf += "{";
        i += 2;
        continue;
      }
      if (buf) parts.push({ kind: "lit", v: buf });
      buf = "";
      i++;
      let depth = 1;
      let exp = "";
      while (i < src.length && depth) {
        if (src[i] === "{") depth++;
        else if (src[i] === "}") depth--;
        if (depth) exp += src[i];
        i++;
      }
      if (depth) throw new PErr(line, "SyntaxError", "f-string non chiusa", `Nelle f-string le graffe { } devono essere chiuse (riga ${line}).`);
      const exprSrc = exp.split("!")[0].split(":")[0].trim();
      parts.push({ kind: "exp", v: exprSrc });
      continue;
    }
    if (c === "}" && src[i + 1] === "}") {
      buf += "}";
      i += 2;
      continue;
    }
    buf += c;
    i++;
  }
  throw new PErr(line, "SyntaxError", "f-string non chiusa", `Virgolette della f-string non chiuse alla riga ${line}.`);
}

class Parser {
  toks: Tok[];
  i = 0;
  line: number;
  constructor(toks: Tok[], line: number) {
    this.toks = toks;
    this.line = line;
  }
  peek(): Tok {
    return this.toks[this.i] ?? { k: "eof", p: 0 };
  }
  at(v: string) {
    const t = this.peek();
    return (t.k === "op" && t.v === v) || (t.k === "name" && t.v === v);
  }
  eat(): Tok {
    return this.toks[this.i++] ?? { k: "eof", p: 0 };
  }
  expectOp(v: string) {
    const t = this.peek();
    if (t.k === "op" && t.v === v) return this.eat();
    throw new PErr(this.line, "SyntaxError", `atteso ${v}`, `Alla riga ${this.line} manca «${v}».`);
  }
  parseExpr(): Expr {
    return this.parseOr();
  }
  parseOr(): Expr {
    let a = this.parseAnd();
    while (this.at("or")) {
      this.eat();
      const b = this.parseAnd();
      a = { k: "bool", op: "or", a, b, line: this.line };
    }
    return a;
  }
  parseAnd(): Expr {
    let a = this.parseNot();
    while (this.at("and")) {
      this.eat();
      const b = this.parseNot();
      a = { k: "bool", op: "and", a, b, line: this.line };
    }
    return a;
  }
  parseNot(): Expr {
    if (this.at("not")) {
      this.eat();
      return { k: "unary", op: "not", x: this.parseNot(), line: this.line };
    }
    return this.parseCmp();
  }
  parseCmp(): Expr {
    const left = this.parseAdd();
    const ops: { op: string; right: Expr }[] = [];
    while (true) {
      const t = this.peek();
      if (t.k === "name" && t.v === "not" && this.toks[this.i + 1]?.k === "name" && (this.toks[this.i + 1] as { v: string }).v === "in") {
        this.eat();
        this.eat();
        ops.push({ op: "not in", right: this.parseAdd() });
        continue;
      }
      if (t.k === "name" && t.v === "is" && this.toks[this.i + 1]?.k === "name" && (this.toks[this.i + 1] as { v: string }).v === "not") {
        this.eat();
        this.eat();
        ops.push({ op: "is not", right: this.parseAdd() });
        continue;
      }
      if (t.k === "name" && (t.v === "in" || t.v === "is")) {
        this.eat();
        ops.push({ op: t.v, right: this.parseAdd() });
        continue;
      }
      if (t.k === "op" && COMP_OPS.has(t.v)) {
        this.eat();
        ops.push({ op: t.v, right: this.parseAdd() });
        continue;
      }
      break;
    }
    if (!ops.length) return left;
    return { k: "cmp", left, ops, line: this.line };
  }
  parseAdd(): Expr {
    let a = this.parseMul();
    while (this.peek().k === "op" && (this.peek() as { v: string }).v && "+-".includes((this.peek() as { v: string }).v) && (this.peek() as { v: string }).v.length === 1) {
      const op = (this.eat() as { v: string }).v;
      const b = this.parseMul();
      a = { k: "bin", op, a, b, line: this.line };
    }
    return a;
  }
  parseMul(): Expr {
    let a = this.parseUnary();
    while (this.peek().k === "op") {
      const v = (this.peek() as { v: string }).v;
      if (v === "*" || v === "/" || v === "//" || v === "%") {
        this.eat();
        const b = this.parseUnary();
        a = { k: "bin", op: v, a, b, line: this.line };
        continue;
      }
      break;
    }
    return a;
  }
  parseUnary(): Expr {
    if (this.peek().k === "op" && ((this.peek() as { v: string }).v === "+" || (this.peek() as { v: string }).v === "-")) {
      const op = (this.eat() as { v: string }).v;
      return { k: "unary", op, x: this.parseUnary(), line: this.line };
    }
    return this.parsePow();
  }
  parsePow(): Expr {
    const a = this.parsePost();
    if (this.peek().k === "op" && (this.peek() as { v: string }).v === "**") {
      this.eat();
      const b = this.parseUnary();
      return { k: "bin", op: "**", a, b, line: this.line };
    }
    return a;
  }
  parsePost(): Expr {
    let x = this.parseAtom();
    while (true) {
      if (this.at("(")) {
        this.eat();
        const args: Expr[] = [];
        const kwargs: { name: string; value: Expr }[] = [];
        if (!this.at(")")) {
          while (true) {
            if (this.peek().k === "name" && this.toks[this.i + 1]?.k === "op" && (this.toks[this.i + 1] as { v: string }).v === "=") {
              const name = (this.eat() as { v: string }).v;
              this.eat();
              kwargs.push({ name, value: this.parseExpr() });
            } else {
              args.push(this.parseExpr());
            }
            if (this.at(",")) {
              this.eat();
              if (this.at(")")) break;
              continue;
            }
            break;
          }
        }
        this.expectOp(")");
        x = { k: "call", fn: x, args, kwargs, line: this.line };
        continue;
      }
      if (this.at("[")) {
        this.eat();
        if (this.at(":")) {
          this.eat();
          const b = this.at("]") ? null : this.parseExpr();
          this.expectOp("]");
          x = { k: "slice", x, a: null, b, line: this.line };
          continue;
        }
        const a = this.parseExpr();
        if (this.at(":")) {
          this.eat();
          const b = this.at("]") ? null : this.parseExpr();
          this.expectOp("]");
          x = { k: "slice", x, a, b, line: this.line };
          continue;
        }
        this.expectOp("]");
        x = { k: "index", x, i: a, line: this.line };
        continue;
      }
      if (this.at(".")) {
        this.eat();
        const t = this.peek();
        if (t.k !== "name") throw new PErr(this.line, "SyntaxError", "atteso nome", `Dopo il punto serve un nome di metodo (riga ${this.line}).`);
        const name = (this.eat() as { v: string }).v;
        x = { k: "attr", x, name, line: this.line };
        continue;
      }
      break;
    }
    return x;
  }
  parseAtom(): Expr {
    const t = this.peek();
    if (t.k === "num") {
      this.eat();
      return { k: "lit", v: t.float ? { t: "float", v: t.v } : { t: "int", v: t.v }, line: this.line };
    }
    if (t.k === "str") {
      this.eat();
      return { k: "lit", v: { t: "str", v: t.v }, line: this.line };
    }
    if (t.k === "fstr") {
      this.eat();
      const parts = t.parts.map((p) =>
        p.kind === "lit"
          ? ({ kind: "lit" as const, v: p.v })
          : ({ kind: "exp" as const, x: parseExpr(p.v, this.line) }),
      );
      return { k: "fstr", parts, line: this.line };
    }
    if (t.k === "name") {
      this.eat();
      if (t.v === "True") return { k: "lit", v: { t: "bool", v: true }, line: this.line };
      if (t.v === "False") return { k: "lit", v: { t: "bool", v: false }, line: this.line };
      if (t.v === "None") return { k: "lit", v: { t: "none" }, line: this.line };
      return { k: "name", v: t.v, line: this.line };
    }
    if (t.k === "op" && t.v === "[") {
      this.eat();
      const xs: Expr[] = [];
      if (!this.at("]")) {
        while (true) {
          xs.push(this.parseExpr());
          if (this.at(",")) {
            this.eat();
            if (this.at("]")) break;
            continue;
          }
          break;
        }
      }
      this.expectOp("]");
      return { k: "list", xs, line: this.line };
    }
    if (t.k === "op" && t.v === "(") {
      this.eat();
      if (this.at(")")) {
        this.eat();
        return { k: "list", xs: [], line: this.line };
      }
      const x = this.parseExpr();
      if (this.at(",")) {
        const xs = [x];
        while (this.at(",")) {
          this.eat();
          if (this.at(")")) break;
          xs.push(this.parseExpr());
        }
        this.expectOp(")");
        return { k: "list", xs, line: this.line };
      }
      this.expectOp(")");
      return x;
    }
    throw new PErr(this.line, "SyntaxError", "espressione non valida", `Non capisco questa espressione alla riga ${this.line}.`);
  }
}

function parseExpr(src: string, line: number): Expr {
  const p = new Parser(tokenize(src, line), line);
  const x = p.parseExpr();
  if (p.peek().k !== "eof") {
    throw new PErr(line, "SyntaxError", "codice extra", `C'è qualcosa di troppo dopo l'espressione (riga ${line}).`);
  }
  return x;
}

function parseProgram(code: string): Stmt[] {
  const lines = splitLogicalLines(code);
  const { stmts, next } = parseBlock(lines, 0, -1);
  if (next < lines.length) {
    throw new PErr(lines[next].n, "IndentationError", "indentazione", `Indentazione inattesa alla riga ${lines[next].n}. Usa 4 spazi per i blocchi.`);
  }
  return stmts;
}

function parseBlock(lines: Line[], from: number, parentIndent: number): { stmts: Stmt[]; next: number } {
  const stmts: Stmt[] = [];
  if (from >= lines.length) return { stmts, next: from };
  if (parentIndent >= 0 && lines[from].indent <= parentIndent) {
    throw new PErr(lines[from].n, "IndentationError", "blocco vuoto", `Dopo i due punti serve un blocco indentato (riga ${lines[from].n}).`);
  }
  const blockIndent = parentIndent < 0 ? (lines[from]?.indent ?? 0) : lines[from].indent;
  if (parentIndent >= 0 && blockIndent <= parentIndent) {
    throw new PErr(lines[from].n, "IndentationError", "blocco vuoto", `Dopo i due punti serve un blocco indentato (riga ${lines[from].n}).`);
  }
  let i = from;
  while (i < lines.length) {
    const ln = lines[i];
    if (ln.indent < blockIndent) break;
    if (ln.indent > blockIndent) {
      throw new PErr(ln.n, "IndentationError", "indent", `Indentazione inattesa alla riga ${ln.n}. Allinea il codice a ${blockIndent} spazi.`);
    }
    const r = parseStmt(lines, i, blockIndent);
    stmts.push(r.stmt);
    i = r.next;
  }
  return { stmts, next: i };
}

function parseStmt(lines: Line[], i: number, indent: number): { stmt: Stmt; next: number } {
  const ln = lines[i];
  const t = ln.text;
  const first = t.split(/\s+/)[0].replace(":", "");
  if (first === "if") return parseIf(lines, i, indent);
  if (first === "while") return parseWhile(lines, i, indent);
  if (first === "for") return parseFor(lines, i, indent);
  if (first === "def") return parseDef(lines, i, indent);
  if (t === "pass") return { stmt: { k: "pass", line: ln.n }, next: i + 1 };
  if (t === "break") return { stmt: { k: "break", line: ln.n }, next: i + 1 };
  if (t === "continue") return { stmt: { k: "continue", line: ln.n }, next: i + 1 };
  if (first === "return") {
    const rest = t.slice("return".length).trim();
    return { stmt: { k: "return", value: rest ? parseExpr(rest, ln.n) : null, line: ln.n }, next: i + 1 };
  }
  if (first === "elif" || first === "else") {
    throw new PErr(ln.n, "SyntaxError", first, `«${first}» deve stare attaccato a un if (riga ${ln.n}).`);
  }
  if (t.endsWith(":") && /^(if|while|for|def|else|elif)\b/.test(t) === false) {
    throw new PErr(ln.n, "SyntaxError", "due punti", `Due punti inattesi alla riga ${ln.n}.`);
  }
  return { stmt: parseSimple(t, ln.n), next: i + 1 };
}

function takeBody(lines: Line[], headerIndex: number, indent: number): { body: Stmt[]; next: number } {
  const header = lines[headerIndex];
  if (!header.text.endsWith(":")) {
    throw new PErr(header.n, "SyntaxError", "mancano i due punti", `Dopo if / while / for / def servono i due punti «:» (riga ${header.n}).`);
  }
  const parsed = parseBlock(lines, headerIndex + 1, indent);
  return { body: parsed.stmts, next: parsed.next };
}

function parseIf(lines: Line[], i: number, indent: number): { stmt: Stmt; next: number } {
  const ln = lines[i];
  const testSrc = ln.text.replace(/^if\s+/, "").replace(/:$/, "").trim();
  if (!ln.text.endsWith(":")) throw new PErr(ln.n, "SyntaxError", ":", `Mancano i due punti dopo la condizione (riga ${ln.n}).`);
  const test = parseExpr(testSrc, ln.n);
  const body = takeBody(lines, i, indent);
  const branches: { test: Expr; body: Stmt[] }[] = [{ test, body: body.body }];
  let j = body.next;
  let elseBody: Stmt[] = [];
  while (j < lines.length && lines[j].indent === indent) {
    const t = lines[j].text;
    if (t.startsWith("elif ")) {
      if (!t.endsWith(":")) throw new PErr(lines[j].n, "SyntaxError", ":", `Mancano i due punti dopo elif (riga ${lines[j].n}).`);
      const et = parseExpr(t.replace(/^elif\s+/, "").replace(/:$/, "").trim(), lines[j].n);
      const eb = takeBody(lines, j, indent);
      branches.push({ test: et, body: eb.body });
      j = eb.next;
      continue;
    }
    if (t === "else:") {
      const eb = takeBody(lines, j, indent);
      elseBody = eb.body;
      j = eb.next;
      break;
    }
    break;
  }
  return { stmt: { k: "if", branches, elseBody, line: ln.n }, next: j };
}

function parseWhile(lines: Line[], i: number, indent: number): { stmt: Stmt; next: number } {
  const ln = lines[i];
  if (!ln.text.endsWith(":")) throw new PErr(ln.n, "SyntaxError", ":", `Mancano i due punti dopo while (riga ${ln.n}).`);
  const test = parseExpr(ln.text.replace(/^while\s+/, "").replace(/:$/, "").trim(), ln.n);
  const body = takeBody(lines, i, indent);
  return { stmt: { k: "while", test, body: body.body, line: ln.n }, next: body.next };
}

function parseFor(lines: Line[], i: number, indent: number): { stmt: Stmt; next: number } {
  const ln = lines[i];
  if (!ln.text.endsWith(":")) throw new PErr(ln.n, "SyntaxError", ":", `Mancano i due punti dopo for (riga ${ln.n}).`);
  const m = ln.text.replace(/:$/, "").match(/^for\s+([A-Za-z_]\w*)(?:\s*,\s*([A-Za-z_]\w*))?\s+in\s+(.+)$/);
  if (!m) throw new PErr(ln.n, "SyntaxError", "for", `Scrivi: for elemento in sequenza:  (riga ${ln.n}).`);
  const iter = parseExpr(m[3], ln.n);
  const body = takeBody(lines, i, indent);
  return { stmt: { k: "for", name: m[1], extra: m[2] ?? null, iter, body: body.body, line: ln.n }, next: body.next };
}

function parseDef(lines: Line[], i: number, indent: number): { stmt: Stmt; next: number } {
  const ln = lines[i];
  if (!ln.text.endsWith(":")) throw new PErr(ln.n, "SyntaxError", ":", `Mancano i due punti dopo la definizione (riga ${ln.n}).`);
  const m = ln.text.replace(/:$/, "").match(/^def\s+([A-Za-z_]\w*)\s*\((.*)\)\s*$/);
  if (!m) throw new PErr(ln.n, "SyntaxError", "def", `Scrivi: def nome(parametri):  (riga ${ln.n}).`);
  const params = m[2]
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  for (const p of params) {
    if (!/^[A-Za-z_]\w*$/.test(p)) {
      throw new PErr(ln.n, "SyntaxError", "parametro", `Il parametro «${p}» non è un nome valido (riga ${ln.n}).`);
    }
  }
  const body = takeBody(lines, i, indent);
  return { stmt: { k: "def", name: m[1], params, body: body.body, line: ln.n }, next: body.next };
}

function parseSimple(text: string, line: number): Stmt {
  const aug = text.match(/^([A-Za-z_]\w*)\s*(\+=|-=|\*=|\/=|%=)\s*(.+)$/);
  if (aug) {
    const op = aug[2][0] === "/" ? "/" : aug[2][0];
    return { k: "aug", name: aug[1], op, value: parseExpr(aug[3], line), line };
  }
  const pair = text.match(/^([A-Za-z_]\w*)\s*,\s*([A-Za-z_]\w*)\s*=\s*(.+)$/);
  if (pair) return { k: "assign2", a: pair[1], b: pair[2], value: parseExpr(pair[3], line), line };
  const idxEq = findAssign(text);
  if (idxEq >= 0) {
    const left = text.slice(0, idxEq).trim();
    const right = text.slice(idxEq + 1).trim();
    if (/^[A-Za-z_]\w*$/.test(left)) return { k: "assign", name: left, value: parseExpr(right, line), line };
    const lb = left.lastIndexOf("[");
    if (lb >= 0 && left.endsWith("]")) {
      const target = parseExpr(left.slice(0, lb), line);
      const index = parseExpr(left.slice(lb + 1, -1), line);
      return { k: "indexSet", target, index, value: parseExpr(right, line), line };
    }
  }
  return { k: "expr", x: parseExpr(text, line), line };
}

function findAssign(text: string): number {
  let depth = 0;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === "(" || c === "[") depth++;
    else if (c === ")" || c === "]") depth--;
    else if (c === "=" && depth === 0) {
      const prev = text[i - 1];
      const next = text[i + 1];
      if (next === "=" || prev === "=" || prev === "!" || prev === "<" || prev === ">") continue;
      return i;
    }
  }
  return -1;
}

type Env = { vars: Map<string, PyValue>; parent: Env | null };

class ReturnSignal {
  value: PyValue;
  constructor(value: PyValue) {
    this.value = value;
  }
}
class BreakSignal {}
class ContinueSignal {}

function isTrue(v: PyValue): boolean {
  switch (v.t) {
    case "none":
      return false;
    case "bool":
      return v.v;
    case "int":
    case "float":
      return v.v !== 0;
    case "str":
      return v.v.length > 0;
    case "list":
      return v.v.length > 0;
    case "range":
      return rangeList(v).length > 0;
    default:
      return true;
  }
}

function rangeList(r: Extract<PyValue, { t: "range" }>): number[] {
  const out: number[] = [];
  if (r.step === 0) return out;
  if (r.step > 0) {
    for (let i = r.start; i < r.stop; i += r.step) out.push(i);
  } else {
    for (let i = r.start; i > r.stop; i += r.step) out.push(i);
  }
  return out;
}

export function pyStr(v: PyValue): string {
  switch (v.t) {
    case "none":
      return "None";
    case "bool":
      return v.v ? "True" : "False";
    case "int":
      return String(v.v);
    case "float": {
      if (Number.isInteger(v.v)) return v.v.toFixed(1);
      return String(v.v);
    }
    case "str":
      return v.v;
    case "list":
      return `[${v.v.map(pyRepr).join(", ")}]`;
    case "range":
      return `range(${v.start}, ${v.stop}${v.step !== 1 ? `, ${v.step}` : ""})`;
    case "fn":
      return `<function ${v.name}>`;
    case "builtin":
      return `<built-in function ${v.name}>`;
  }
}

export function pyRepr(v: PyValue): string {
  if (v.t === "str") return JSON.stringify(v.v);
  return pyStr(v);
}

function typeName(v: PyValue): string {
  if (v.t === "int") return "int";
  if (v.t === "float") return "float";
  if (v.t === "str") return "str";
  if (v.t === "bool") return "bool";
  if (v.t === "none") return "NoneType";
  if (v.t === "list") return "list";
  if (v.t === "range") return "range";
  if (v.t === "fn" || v.t === "builtin") return "function";
  return "object";
}

function clone(v: PyValue): PyValue {
  if (v.t === "list") return { t: "list", v: v.v.map(clone) };
  return v;
}

function pyEq(a: PyValue, b: PyValue): boolean {
  if (a.t === "int" && b.t === "float") return a.v === b.v;
  if (a.t === "float" && b.t === "int") return a.v === b.v;
  if (a.t !== b.t) return false;
  switch (a.t) {
    case "none":
      return true;
    case "bool":
    case "int":
    case "float":
    case "str":
      return a.v === (b as typeof a).v;
    case "list":
      return a.v.length === (b as typeof a).v.length && a.v.every((x, i) => pyEq(x, (b as typeof a).v[i]));
    default:
      return a === b;
  }
}

function asNumber(v: PyValue, line: number): number {
  if (v.t === "int" || v.t === "float") return v.v;
  if (v.t === "bool") return v.v ? 1 : 0;
  throw new PErr(line, "TypeError", "numero atteso", `Qui Python si aspetta un numero, non ${typeName(v)} (riga ${line}).`);
}

function numVal(a: PyValue, b: PyValue, op: string, line: number): PyValue {
  const x = asNumber(a, line);
  const y = asNumber(b, line);
  const fl = a.t === "float" || b.t === "float" || op === "/";
  let n: number;
  switch (op) {
    case "+":
      n = x + y;
      break;
    case "-":
      n = x - y;
      break;
    case "*":
      n = x * y;
      break;
    case "/":
      if (y === 0) throw new PErr(line, "ZeroDivisionError", "divisione per zero", `Non si può dividere per zero (riga ${line}).`);
      n = x / y;
      break;
    case "//":
      if (y === 0) throw new PErr(line, "ZeroDivisionError", "divisione per zero", `Non si può dividere per zero (riga ${line}).`);
      n = Math.floor(x / y);
      break;
    case "%":
      if (y === 0) throw new PErr(line, "ZeroDivisionError", "modulo zero", `Non si può fare il resto della divisione per zero (riga ${line}).`);
      n = ((x % y) + y) % y;
      break;
    case "**":
      n = x ** y;
      break;
    default:
      n = 0;
  }
  if (op === "/") return { t: "float", v: n };
  if (fl && op !== "//") return { t: "float", v: n };
  return { t: op === "//" ? "int" : Number.isInteger(n) && a.t === "int" && b.t === "int" ? "int" : fl ? "float" : "int", v: n };
}

function compare(a: PyValue, op: string, b: PyValue, line: number): boolean {
  if (op === "==") return pyEq(a, b);
  if (op === "!=") return !pyEq(a, b);
  if (op === "is") return a.t === "none" && b.t === "none";
  if (op === "is not") return !(a.t === "none" && b.t === "none");
  if (op === "in") return contains(b, a, line);
  if (op === "not in") return !contains(b, a, line);
  if ((a.t === "int" || a.t === "float" || a.t === "bool") && (b.t === "int" || b.t === "float" || b.t === "bool")) {
    const x = asNumber(a, line);
    const y = asNumber(b, line);
    if (op === "<") return x < y;
    if (op === ">") return x > y;
    if (op === "<=") return x <= y;
    if (op === ">=") return x >= y;
  }
  if (a.t === "str" && b.t === "str") {
    if (op === "<") return a.v < b.v;
    if (op === ">") return a.v > b.v;
    if (op === "<=") return a.v <= b.v;
    if (op === ">=") return a.v >= b.v;
  }
  throw new PErr(line, "TypeError", "confronto", `Non posso confrontare ${typeName(a)} e ${typeName(b)} con ${op} (riga ${line}).`);
}

function contains(hay: PyValue, needle: PyValue, line: number): boolean {
  if (hay.t === "str") {
    if (needle.t !== "str") throw new PErr(line, "TypeError", "in", `Con le stringhe, a sinistra di «in» ci vuole un testo (riga ${line}).`);
    return hay.v.includes(needle.v);
  }
  if (hay.t === "list") return hay.v.some((x) => pyEq(x, needle));
  if (hay.t === "range") {
    if (needle.t !== "int") return false;
    return rangeList(hay).includes(needle.v);
  }
  throw new PErr(line, "TypeError", "in", `«in» non funziona su ${typeName(hay)} (riga ${line}).`);
}

function iterate(v: PyValue, line: number): PyValue[] {
  if (v.t === "list") return v.v;
  if (v.t === "str") return [...v.v].map((c) => ({ t: "str" as const, v: c }));
  if (v.t === "range") return rangeList(v).map((n) => ({ t: "int" as const, v: n }));
  throw new PErr(line, "TypeError", "not iterable", `«for» ha bisogno di una sequenza (lista, stringa o range), non ${typeName(v)} (riga ${line}).`);
}

function indexOf(v: PyValue, iVal: PyValue, line: number): { get: () => PyValue; set: (x: PyValue) => void } {
  if (iVal.t !== "int") throw new PErr(line, "TypeError", "indice", `L'indice deve essere un intero (riga ${line}).`);
  if (v.t === "str") {
    let i = iVal.v;
    if (i < 0) i += v.v.length;
    if (i < 0 || i >= v.v.length) throw new PErr(line, "IndexError", "indice", `Indice ${iVal.v} fuori dalla stringa (riga ${line}).`);
    return {
      get: () => ({ t: "str", v: v.v[i] }),
      set: () => {
        throw new PErr(line, "TypeError", "str immutabile", `Le stringhe non si possono modificare per indice. Creane una nuova (riga ${line}).`);
      },
    };
  }
  if (v.t === "list") {
    let i = iVal.v;
    if (i < 0) i += v.v.length;
    if (i < 0 || i >= v.v.length) throw new PErr(line, "IndexError", "indice", `Indice ${iVal.v} fuori dalla lista (riga ${line}).`);
    return {
      get: () => v.v[i],
      set: (x) => {
        v.v[i] = x;
      },
    };
  }
  throw new PErr(line, "TypeError", "index", `${typeName(v)} non supporta gli indici (riga ${line}).`);
}

function sliceOf(v: PyValue, a: number | null, b: number | null, line: number): PyValue {
  const len = v.t === "str" ? v.v.length : v.t === "list" ? v.v.length : -1;
  if (len < 0) throw new PErr(line, "TypeError", "slice", `${typeName(v)} non si può affettare (riga ${line}).`);
  let start = a ?? 0;
  let end = b ?? len;
  if (start < 0) start += len;
  if (end < 0) end += len;
  start = Math.max(0, Math.min(len, start));
  end = Math.max(0, Math.min(len, end));
  if (v.t === "str") return { t: "str", v: v.v.slice(start, end) };
  return { t: "list", v: (v as Extract<PyValue, { t: "list" }>).v.slice(start, end) };
}

class VM {
  stdout = "";
  inputs: string[];
  steps = 0;
  env: Env;
  constructor(inputs: string[]) {
    this.inputs = [...inputs];
    this.env = { vars: new Map(), parent: null };
    for (const name of ["print", "input", "len", "int", "float", "str", "bool", "range", "type", "abs", "min", "max", "sum", "round", "list", "sorted", "__method__"]) {
      this.env.vars.set(name, { t: "builtin", name });
    }
  }
  lookup(name: string, line: number): PyValue {
    let e: Env | null = this.env;
    while (e) {
      if (e.vars.has(name)) return e.vars.get(name)!;
      e = e.parent;
    }
    throw new PErr(
      line,
      "NameError",
      name,
      `Il nome «${name}» non esiste ancora. Lo hai scritto bene? Lo hai creato prima di usarlo? (riga ${line})`,
    );
  }
  set(name: string, v: PyValue) {
    this.env.vars.set(name, v);
  }
  tick(line: number) {
    if (++this.steps > 80_000) {
      throw new PErr(line, "RuntimeError", "timeout", `Il programma gira da troppo tempo: probabilmente c'è un ciclo infinito (riga ${line}).`);
    }
  }
  execBlock(body: Stmt[]) {
    for (const s of body) this.exec(s);
  }
  exec(s: Stmt) {
    this.tick(s.line);
    switch (s.k) {
      case "pass":
        return;
      case "break":
        throw new BreakSignal();
      case "continue":
        throw new ContinueSignal();
      case "return":
        throw new ReturnSignal(s.value ? this.eval(s.value) : { t: "none" });
      case "assign":
        this.set(s.name, this.eval(s.value));
        return;
      case "assign2": {
        const v = this.eval(s.value);
        const xs = iterate(v, s.line);
        if (xs.length !== 2) throw new PErr(s.line, "ValueError", "unpack", `Servono esattamente 2 valori per ${s.a}, ${s.b} (riga ${s.line}).`);
        this.set(s.a, xs[0]);
        this.set(s.b, xs[1]);
        return;
      }
      case "indexSet": {
        const target = this.eval(s.target);
        const idx = this.eval(s.index);
        indexOf(target, idx, s.line).set(this.eval(s.value));
        return;
      }
      case "aug": {
        const cur = this.lookup(s.name, s.line);
        const rhs = this.eval(s.value);
        this.set(s.name, this.bin(cur, s.op, rhs, s.line));
        return;
      }
      case "expr":
        this.eval(s.x);
        return;
      case "if":
        for (const br of s.branches) {
          if (isTrue(this.eval(br.test))) {
            this.execBlock(br.body);
            return;
          }
        }
        this.execBlock(s.elseBody);
        return;
      case "while":
        while (isTrue(this.eval(s.test))) {
          try {
            this.execBlock(s.body);
          } catch (e) {
            if (e instanceof BreakSignal) break;
            if (e instanceof ContinueSignal) continue;
            throw e;
          }
        }
        return;
      case "for": {
        const items = iterate(this.eval(s.iter), s.line);
        for (const it of items) {
          if (s.extra) {
            const pair = iterate(it, s.line);
            if (pair.length < 2) throw new PErr(s.line, "ValueError", "unpack", `Questo elemento non ha due valori (riga ${s.line}).`);
            this.set(s.name, pair[0]);
            this.set(s.extra, pair[1]);
          } else {
            this.set(s.name, it);
          }
          try {
            this.execBlock(s.body);
          } catch (e) {
            if (e instanceof BreakSignal) break;
            if (e instanceof ContinueSignal) continue;
            throw e;
          }
        }
        return;
      }
      case "def":
        this.set(s.name, { t: "fn", name: s.name, params: s.params, body: s.body, defLine: s.line });
        return;
    }
  }
  eval(x: Expr): PyValue {
    this.tick(x.line);
    switch (x.k) {
      case "lit":
        return clone(x.v);
      case "name":
        return this.lookup(x.v, x.line);
      case "list":
        return { t: "list", v: x.xs.map((e) => this.eval(e)) };
      case "unary": {
        const v = this.eval(x.x);
        if (x.op === "not") return { t: "bool", v: !isTrue(v) };
        if (x.op === "+") return v;
        if (x.op === "-") {
          const n = asNumber(v, x.line);
          return { t: v.t === "float" ? "float" : "int", v: -n };
        }
        return v;
      }
      case "bin":
        return this.bin(this.eval(x.a), x.op, this.eval(x.b), x.line);
      case "bool": {
        const a = this.eval(x.a);
        if (x.op === "or") return isTrue(a) ? a : this.eval(x.b);
        return isTrue(a) ? this.eval(x.b) : a;
      }
      case "cmp": {
        let cur = this.eval(x.left);
        for (const op of x.ops) {
          const n = this.eval(op.right);
          if (!compare(cur, op.op, n, x.line)) return { t: "bool", v: false };
          cur = n;
        }
        return { t: "bool", v: true };
      }
      case "call":
        return this.call(this.eval(x.fn), x.args.map((a) => this.eval(a)), x.kwargs.map((k) => ({ name: k.name, value: this.eval(k.value) })), x.line);
      case "index":
        return indexOf(this.eval(x.x), this.eval(x.i), x.line).get();
      case "slice": {
        const seq = this.eval(x.x);
        const a = x.a ? asNumber(this.eval(x.a), x.line) : null;
        const b = x.b ? asNumber(this.eval(x.b), x.line) : null;
        return sliceOf(seq, a, b, x.line);
      }
      case "attr":
        this.eval(x.x);
        return { t: "builtin", name: `__m__:${x.name}` };
      case "fstr": {
        let s = "";
        for (const p of x.parts) s += p.kind === "lit" ? p.v : pyStr(this.eval(p.x));
        return { t: "str", v: s };
      }
      case "cond":
        return isTrue(this.eval(x.test)) ? this.eval(x.a) : this.eval(x.b);
    }
  }
  bin(a: PyValue, op: string, b: PyValue, line: number): PyValue {
    if (op === "+" && a.t === "str" && b.t === "str") return { t: "str", v: a.v + b.v };
    if (op === "+" && a.t === "list" && b.t === "list") return { t: "list", v: [...a.v, ...b.v] };
    if (op === "*" && a.t === "str" && (b.t === "int" || b.t === "bool")) return { t: "str", v: a.v.repeat(asNumber(b, line)) };
    if (op === "*" && b.t === "str" && (a.t === "int" || a.t === "bool")) return { t: "str", v: b.v.repeat(asNumber(a, line)) };
    if (op === "*" && a.t === "list" && b.t === "int") {
      const n = b.v;
      const out: PyValue[] = [];
      for (let i = 0; i < n; i++) out.push(...a.v.map(clone));
      return { t: "list", v: out };
    }
    if (op === "+" && (a.t === "str" || b.t === "str") && a.t !== b.t) {
      throw new PErr(
        line,
        "TypeError",
        "concat",
        `Non puoi sommare ${typeName(a)} e ${typeName(b)}. Converti il numero con str(...) (riga ${line}).`,
      );
    }
    return numVal(a, b, op, line);
  }
  call(fn: PyValue, args: PyValue[], kwargs: { name: string; value: PyValue }[], line: number): PyValue {
    if (fn.t === "fn") {
      if (args.length !== fn.params.length) {
        throw new PErr(line, "TypeError", "args", `«${fn.name}» vuole ${fn.params.length} argomenti, ne hai passati ${args.length} (riga ${line}).`);
      }
      const prev = this.env;
      this.env = { vars: new Map(), parent: prev };
      fn.params.forEach((p, i) => this.env.vars.set(p, args[i]));
      try {
        this.execBlock(fn.body);
      } catch (e) {
        if (e instanceof ReturnSignal) {
          this.env = prev;
          return e.value;
        }
        this.env = prev;
        throw e;
      }
      this.env = prev;
      return { t: "none" };
    }
    if (fn.t === "builtin") return this.builtin(fn.name, args, kwargs, line);
    throw new PErr(line, "TypeError", "not callable", `Questo valore non si può chiamare con le parentesi (riga ${line}).`);
  }
  method(obj: PyValue, name: string, args: PyValue[], line: number): PyValue {
    if (obj.t === "str") {
      const s = obj.v;
      if (name === "upper") return { t: "str", v: s.toUpperCase() };
      if (name === "lower") return { t: "str", v: s.toLowerCase() };
      if (name === "strip") return { t: "str", v: s.trim() };
      if (name === "replace" && args.length >= 2 && args[0].t === "str" && args[1].t === "str") {
        return { t: "str", v: s.split(args[0].v).join(args[1].v) };
      }
      if (name === "split") {
        const sep = args[0]?.t === "str" ? args[0].v : undefined;
        const parts = sep === undefined ? s.trim().split(/\s+/) : s.split(sep);
        return { t: "list", v: parts.map((p) => ({ t: "str" as const, v: p })) };
      }
      if (name === "startswith" && args[0]?.t === "str") return { t: "bool", v: s.startsWith(args[0].v) };
      if (name === "endswith" && args[0]?.t === "str") return { t: "bool", v: s.endsWith(args[0].v) };
      if (name === "find" && args[0]?.t === "str") return { t: "int", v: s.indexOf(args[0].v) };
      if (name === "count" && args[0]?.t === "str") {
        if (!args[0].v) return { t: "int", v: s.length + 1 };
        return { t: "int", v: s.split(args[0].v).length - 1 };
      }
      if (name === "isdigit") return { t: "bool", v: s.length > 0 && [...s].every((c) => c >= "0" && c <= "9") };
      if (name === "isalpha") return { t: "bool", v: s.length > 0 && /[A-Za-zÀ-ÿ]+/.test(s) && ![...s].some((c) => /\d/.test(c)) };
      if (name === "join" && args[0]?.t === "list") {
        return { t: "str", v: args[0].v.map(pyStr).join(s) };
      }
    }
    if (obj.t === "list") {
      if (name === "append" && args.length === 1) {
        obj.v.push(args[0]);
        return { t: "none" };
      }
      if (name === "pop") {
        if (!obj.v.length) throw new PErr(line, "IndexError", "pop", `Non puoi fare pop su una lista vuota (riga ${line}).`);
        const i = args[0]?.t === "int" ? args[0].v : obj.v.length - 1;
        const idx = i < 0 ? obj.v.length + i : i;
        const [x] = obj.v.splice(idx, 1);
        return x;
      }
      if (name === "insert" && args[0]?.t === "int") {
        obj.v.splice(args[0].v, 0, args[1] ?? { t: "none" });
        return { t: "none" };
      }
      if (name === "remove") {
        const i = obj.v.findIndex((x) => pyEq(x, args[0]));
        if (i < 0) throw new PErr(line, "ValueError", "remove", `Valore non trovato nella lista (riga ${line}).`);
        obj.v.splice(i, 1);
        return { t: "none" };
      }
      if (name === "index") {
        const i = obj.v.findIndex((x) => pyEq(x, args[0]));
        if (i < 0) throw new PErr(line, "ValueError", "index", `Valore non trovato nella lista (riga ${line}).`);
        return { t: "int", v: i };
      }
      if (name === "count") return { t: "int", v: obj.v.filter((x) => pyEq(x, args[0])).length };
      if (name === "reverse") {
        obj.v.reverse();
        return { t: "none" };
      }
      if (name === "sort") {
        obj.v.sort((a, b) => {
          if ((a.t === "int" || a.t === "float") && (b.t === "int" || b.t === "float")) return a.v - b.v;
          return pyStr(a).localeCompare(pyStr(b));
        });
        return { t: "none" };
      }
    }
    throw new PErr(line, "AttributeError", name, `«${typeName(obj)}» non ha il metodo ${name}() (riga ${line}).`);
  }
  builtin(name: string, args: PyValue[], kwargs: { name: string; value: PyValue }[], line: number): PyValue {
    if (name.startsWith("__m__:")) {
      throw new PErr(line, "TypeError", "method", `I metodi si chiamano così: valore.${name.slice(6)}() (riga ${line}).`);
    }
    const kw = (k: string) => kwargs.find((x) => x.name === k)?.value;
    switch (name) {
      case "print": {
        const sep = kw("sep");
        const end = kw("end");
        const s = args.map(pyStr).join(sep?.t === "str" ? sep.v : " ");
        this.stdout += s + (end?.t === "str" ? end.v : "\n");
        return { t: "none" };
      }
      case "input": {
        const prompt = args[0] ? pyStr(args[0]) : "";
        this.stdout += prompt;
        if (!this.inputs.length) {
          throw new PErr(line, "EOFError", "input", `input() ha chiesto un valore, ma il laboratorio non ne aveva più (riga ${line}).`);
        }
        return { t: "str", v: this.inputs.shift()! };
      }
      case "len": {
        const a = args[0];
        if (a?.t === "str") return { t: "int", v: a.v.length };
        if (a?.t === "list") return { t: "int", v: a.v.length };
        if (a?.t === "range") return { t: "int", v: rangeList(a).length };
        throw new PErr(line, "TypeError", "len", `len() vuole una stringa o una lista (riga ${line}).`);
      }
      case "int": {
        const a = args[0];
        if (a.t === "int") return a;
        if (a.t === "float") return { t: "int", v: Math.trunc(a.v) };
        if (a.t === "bool") return { t: "int", v: a.v ? 1 : 0 };
        if (a.t === "str") {
          const s = a.v.trim();
          if (!/^[+-]?\d+$/.test(s)) throw new PErr(line, "ValueError", "int", `int() non può convertire «${a.v}» in un intero (riga ${line}).`);
          return { t: "int", v: Number(s) };
        }
        throw new PErr(line, "TypeError", "int", `int() non accetta ${typeName(a)} (riga ${line}).`);
      }
      case "float": {
        const a = args[0];
        if (a.t === "float") return a;
        if (a.t === "int") return { t: "float", v: a.v };
        if (a.t === "bool") return { t: "float", v: a.v ? 1 : 0 };
        if (a.t === "str") {
          const n = Number(a.v.trim());
          if (!Number.isFinite(n) || a.v.trim() === "") throw new PErr(line, "ValueError", "float", `float() non può convertire «${a.v}» (riga ${line}).`);
          return { t: "float", v: n };
        }
        throw new PErr(line, "TypeError", "float", `float() non accetta ${typeName(a)} (riga ${line}).`);
      }
      case "str":
        return { t: "str", v: args.length ? pyStr(args[0]) : "" };
      case "bool":
        return { t: "bool", v: args.length ? isTrue(args[0]) : false };
      case "range": {
        let start = 0,
          stop = 0,
          step = 1;
        if (args.length === 1) stop = asNumber(args[0], line);
        else if (args.length === 2) {
          start = asNumber(args[0], line);
          stop = asNumber(args[1], line);
        } else if (args.length >= 3) {
          start = asNumber(args[0], line);
          stop = asNumber(args[1], line);
          step = asNumber(args[2], line);
        }
        if (step === 0) throw new PErr(line, "ValueError", "range", `range() non può avere passo 0 (riga ${line}).`);
        return { t: "range", start: Math.trunc(start), stop: Math.trunc(stop), step: Math.trunc(step) };
      }
      case "type":
        return { t: "str", v: `<class '${typeName(args[0])}'>` };
      case "abs":
        return { t: args[0].t === "float" ? "float" : "int", v: Math.abs(asNumber(args[0], line)) };
      case "min":
      case "max": {
        const xs = args[0]?.t === "list" && args.length === 1 ? args[0].v : args;
        if (!xs.length) throw new PErr(line, "ValueError", name, `${name}() di una sequenza vuota (riga ${line}).`);
        return xs.reduce((a, b) => {
          const op = name === "min" ? "<" : ">";
          return compare(b, op, a, line) ? b : a;
        });
      }
      case "sum": {
        const xs = args[0]?.t === "list" ? args[0].v : args;
        let n = 0;
        let fl = false;
        for (const x of xs) {
          n += asNumber(x, line);
          if (x.t === "float") fl = true;
        }
        return { t: fl ? "float" : "int", v: n };
      }
      case "round": {
        const n = asNumber(args[0], line);
        const d = args[1]?.t === "int" ? args[1].v : 0;
        const p = 10 ** d;
        return d === 0 ? { t: "int", v: Math.round(n) } : { t: "float", v: Math.round(n * p) / p };
      }
      case "list": {
        if (!args.length) return { t: "list", v: [] };
        return { t: "list", v: iterate(args[0], line) };
      }
      case "sorted": {
        const xs = iterate(args[0], line).map(clone);
        xs.sort((a, b) => {
          if ((a.t === "int" || a.t === "float") && (b.t === "int" || b.t === "float")) return a.v - b.v;
          return pyStr(a).localeCompare(pyStr(b));
        });
        return { t: "list", v: xs };
      }
      default:
        throw new PErr(line, "NameError", name, `Funzione sconosciuta: ${name} (riga ${line}).`);
    }
  }
}

// Patch method calls: attr then call
function rewriteMethods(stmts: Stmt[]): Stmt[] {
  const wE = (x: Expr): Expr => {
    switch (x.k) {
      case "call":
        if (x.fn.k === "attr") {
          return {
            k: "call",
            fn: { k: "name", v: "__method__", line: x.line },
            args: [wE(x.fn.x), { k: "lit", v: { t: "str", v: x.fn.name }, line: x.line }, ...x.args.map(wE)],
            kwargs: x.kwargs.map((k) => ({ ...k, value: wE(k.value) })),
            line: x.line,
          };
        }
        return { ...x, fn: wE(x.fn), args: x.args.map(wE), kwargs: x.kwargs.map((k) => ({ ...k, value: wE(k.value) })) };
      case "list":
        return { ...x, xs: x.xs.map(wE) };
      case "unary":
        return { ...x, x: wE(x.x) };
      case "bin":
        return { ...x, a: wE(x.a), b: wE(x.b) };
      case "bool":
        return { ...x, a: wE(x.a), b: wE(x.b) };
      case "cmp":
        return { ...x, left: wE(x.left), ops: x.ops.map((o) => ({ ...o, right: wE(o.right) })) };
      case "index":
        return { ...x, x: wE(x.x), i: wE(x.i) };
      case "slice":
        return { ...x, x: wE(x.x), a: x.a ? wE(x.a) : null, b: x.b ? wE(x.b) : null };
      case "attr":
        return { ...x, x: wE(x.x) };
      case "fstr":
        return {
          ...x,
          parts: x.parts.map((p) => (p.kind === "lit" ? p : { kind: "exp", x: wE(p.x) })),
        };
      default:
        return x;
    }
  };
  const wS = (s: Stmt): Stmt => {
    switch (s.k) {
      case "assign":
        return { ...s, value: wE(s.value) };
      case "assign2":
        return { ...s, value: wE(s.value) };
      case "indexSet":
        return { ...s, target: wE(s.target), index: wE(s.index), value: wE(s.value) };
      case "aug":
        return { ...s, value: wE(s.value) };
      case "expr":
        return { ...s, x: wE(s.x) };
      case "if":
        return {
          ...s,
          branches: s.branches.map((b) => ({ test: wE(b.test), body: b.body.map(wS) })),
          elseBody: s.elseBody.map(wS),
        };
      case "while":
        return { ...s, test: wE(s.test), body: s.body.map(wS) };
      case "for":
        return { ...s, iter: wE(s.iter), body: s.body.map(wS) };
      case "def":
        return { ...s, body: s.body.map(wS) };
      case "return":
        return { ...s, value: s.value ? wE(s.value) : null };
      default:
        return s;
    }
  };
  return stmts.map(wS);
}

const origCall = VM.prototype.call;
VM.prototype.call = function (fn, args, kwargs, line) {
  if (fn.t === "builtin" && fn.name === "__method__") {
    const obj = args[0];
    const name = args[1];
    if (name.t !== "str") throw new PErr(line, "TypeError", "method", "metodo non valido");
    return this.method(obj, name.v, args.slice(2), line);
  }
  if (fn.t === "builtin" && fn.name.startsWith("__m__:")) {
    throw new PErr(line, "TypeError", "method", `I metodi si chiamano con le parentesi: .${fn.name.slice(6)}() (riga ${line}).`);
  }
  return origCall.call(this, fn, args, kwargs, line);
};

function toFriendly(e: unknown): PyError {
  if (e instanceof PErr) return { line: e.line, type: e.type, message: e.message, friendly: e.friendly };
  return {
    line: 0,
    type: "Error",
    message: e instanceof Error ? e.message : String(e),
    friendly: "Qualcosa è andato storto nel laboratorio. Controlla il codice e riprova.",
  };
}

export function runPython(code: string, options?: { inputs?: string[] }): RunResult {
  let vm: VM | null = null;
  try {
    const stmts = rewriteMethods(parseProgram(code));
    vm = new VM(options?.inputs ?? []);
    vm.execBlock(stmts);
    return { stdout: vm.stdout, error: null, globals: vm.env.vars };
  } catch (e) {
    if (e instanceof ReturnSignal || e instanceof BreakSignal || e instanceof ContinueSignal) {
      const word = e instanceof BreakSignal ? "break" : e instanceof ContinueSignal ? "continue" : "return";
      return {
        stdout: vm?.stdout ?? "",
        error: {
          line: 1,
          type: "SyntaxError",
          message: word,
          friendly: `«${word}» qui è fuori posto: va dentro un ciclo o una funzione.`,
        },
        globals: vm?.env.vars ?? new Map(),
      };
    }
    return {
      stdout: vm?.stdout ?? "",
      error: toFriendly(e),
      globals: vm?.env.vars ?? new Map(),
    };
  }
}

export function evalInEnv(expr: string, run: RunResult): { value: PyValue | null; error: PyError | null } {
  if (run.error) return { value: null, error: run.error };
  try {
    const dummy: Stmt = { k: "expr", x: parseExpr(expr, 1), line: 1 };
    const rewritten = rewriteMethods([dummy])[0] as Extract<Stmt, { k: "expr" }>;
    const vm = new VM([]);
    vm.env.vars = new Map(run.globals);
    if (!vm.env.vars.has("__method__")) vm.env.vars.set("__method__", { t: "builtin", name: "__method__" });
    const value = vm.eval(rewritten.x);
    return { value, error: null };
  } catch (e) {
    return { value: null, error: toFriendly(e) };
  }
}

export function pyEqualJson(v: PyValue, expected: unknown): boolean {
  if (expected === null) return v.t === "none";
  if (typeof expected === "boolean") return v.t === "bool" && v.v === expected;
  if (typeof expected === "number") {
    if (v.t === "int" || v.t === "float") return v.v === expected;
    return false;
  }
  if (typeof expected === "string") return v.t === "str" && v.v === expected;
  if (Array.isArray(expected)) return v.t === "list" && v.v.length === expected.length && v.v.every((x, i) => pyEqualJson(x, expected[i]));
  return false;
}

export function normalizeOut(s: string): string {
  return s.replace(/\r\n/g, "\n").replace(/[ \t]+\n/g, "\n").replace(/\s+$/, "");
}
