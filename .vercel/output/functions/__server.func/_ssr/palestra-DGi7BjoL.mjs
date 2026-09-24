import { n as drills } from "./curriculum-DV44EivI.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as Lock } from "../_libs/lucide-react.mjs";
import { a as drillUnlocked, d as useQuaderno, f as cn } from "./router-CON3QvVS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/palestra-DGi7BjoL.js
var import_jsx_runtime = require_jsx_runtime();
function Palestra() {
	const state = useQuaderno();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl font-medium tracking-tight",
			children: "Palestra"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-xl text-muted-foreground",
			children: "Esercizi extra, sbloccati man mano che completi le unità. Stesso laboratorio, traccia diversa."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-8 grid gap-3 sm:grid-cols-2",
			children: drills.map((d) => {
				const open = drillUnlocked(d.unlockAfter, state);
				const done = !!state.drillPassed[d.id];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/palestra/$drillId",
					params: { drillId: d.id },
					className: cn("block rounded-[var(--radius-xl)] bg-card p-5 shadow-[var(--shadow-border)] transition-transform hover:-translate-y-0.5", done && "ring-1 ring-primary/25"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-xs text-muted-foreground tabular-nums",
							children: [
								d.minutes,
								" min",
								done ? " · superato" : ""
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-xl font-medium",
							children: d.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: d.brief
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[var(--radius-xl)] bg-card/70 p-5 text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2 font-mono text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3.5" }),
								"Dopo l'unità ",
								d.unlockAfter
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-xl font-medium text-foreground/70",
							children: d.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm",
							children: d.brief
						})
					]
				}) }, d.id);
			})
		})
	] });
}
//#endregion
export { Palestra as component };
