import { i as __toESM } from "../_runtime.mjs";
import { a as glossary } from "./curriculum-DV44EivI.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Input } from "./input-CJ4ziX8A.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/glossario-MCsB1ly9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Glossario() {
	const [q, setQ] = (0, import_react.useState)("");
	const items = (0, import_react.useMemo)(() => {
		const s = q.trim().toLowerCase();
		if (!s) return glossary;
		return glossary.filter((t) => t.term.toLowerCase().includes(s) || t.def.toLowerCase().includes(s));
	}, [q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl font-medium tracking-tight",
			children: "Glossario"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-xl text-muted-foreground",
			children: "I termini che userete in classe, detti in italiano. Tienilo aperto mentre fai i laboratori."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			className: "mt-6 max-w-md",
			value: q,
			onChange: (e) => setQ(e.target.value),
			placeholder: "Cerca un termine",
			"aria-label": "Cerca nel glossario"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "mt-8 divide-y divide-border rounded-[var(--radius-xl)] bg-card shadow-[var(--shadow-border)]",
			children: [items.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "px-5 py-4 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-medium",
					children: t.term
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm leading-relaxed text-muted-foreground",
					children: t.def
				})]
			}, t.term)), items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "px-5 py-8 text-sm text-muted-foreground",
				children: "Nessun termine trovato."
			})]
		})
	] });
}
//#endregion
export { Glossario as component };
