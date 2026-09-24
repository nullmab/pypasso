const KEYWORDS = new Set([
  "if",
  "elif",
  "else",
  "while",
  "for",
  "in",
  "def",
  "return",
  "and",
  "or",
  "not",
  "True",
  "False",
  "None",
  "pass",
  "break",
  "continue",
  "is",
]);

export type HlPart = { t: "kw" | "str" | "num" | "com" | "id" | "txt"; v: string };

export function highlightPython(src: string): HlPart[] {
  const parts: HlPart[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === "#") {
      const end = src.indexOf("\n", i);
      const j = end === -1 ? src.length : end;
      parts.push({ t: "com", v: src.slice(i, j) });
      i = j;
      continue;
    }
    if ((c === "f" || c === "F") && (src[i + 1] === '"' || src[i + 1] === "'")) {
      const q = src[i + 1];
      let j = i + 2;
      while (j < src.length && src[j] !== q) {
        if (src[j] === "\\") j += 2;
        else j++;
      }
      parts.push({ t: "str", v: src.slice(i, Math.min(j + 1, src.length)) });
      i = j + 1;
      continue;
    }
    if (c === '"' || c === "'") {
      let j = i + 1;
      while (j < src.length && src[j] !== c) {
        if (src[j] === "\\") j += 2;
        else j++;
      }
      parts.push({ t: "str", v: src.slice(i, Math.min(j + 1, src.length)) });
      i = j + 1;
      continue;
    }
    if (/[A-Za-z_]/.test(c)) {
      let j = i + 1;
      while (/[A-Za-z0-9_]/.test(src[j] ?? "")) j++;
      const w = src.slice(i, j);
      parts.push({ t: KEYWORDS.has(w) ? "kw" : "id", v: w });
      i = j;
      continue;
    }
    if (/\d/.test(c)) {
      let j = i + 1;
      while (/[\d.]/.test(src[j] ?? "")) j++;
      parts.push({ t: "num", v: src.slice(i, j) });
      i = j;
      continue;
    }
    parts.push({ t: "txt", v: c });
    i++;
  }
  return parts;
}
