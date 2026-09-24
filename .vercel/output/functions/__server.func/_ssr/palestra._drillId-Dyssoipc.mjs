import { r as getDrill } from "./curriculum-DV44EivI.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as Lock, v as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as drillUnlocked, d as useQuaderno, n as Route } from "./router-CON3QvVS.mjs";
import { t as Button } from "./dialog-7iJXcUoo.mjs";
import { n as LabPanel } from "./lab-panel-BUGq3cNE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/palestra._drillId-Dyssoipc.js
var import_jsx_runtime = require_jsx_runtime();
function DrillPage() {
	const { drillId } = Route.useParams();
	const state = useQuaderno();
	const drill = getDrill(drillId);
	if (!drill) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Esercizio non trovato." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		asChild: true,
		variant: "outline",
		className: "mt-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/palestra",
			children: "Palestra"
		})
	})] });
	if (!drillUnlocked(drill.unlockAfter, state)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-lg pt-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "mx-auto size-8 text-muted-foreground" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-display text-3xl",
				children: "Ancora chiuso"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-muted-foreground",
				children: [
					"Completa l'unità ",
					drill.unlockAfter,
					" per sbloccare questo esercizio."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/palestra",
					children: "Torna alla palestra"
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/palestra",
			className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Palestra"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-3 font-display text-3xl font-medium tracking-tight",
			children: drill.title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 mb-6 text-muted-foreground",
			children: drill.brief
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabPanel, {
			lab: drill,
			attempts: state.labAttempts[drill.id] ?? 0,
			onAttempt: () => state.bumpLabAttempt(drill.id),
			onPass: () => {
				if (!state.drillPassed[drill.id]) {
					state.passDrill(drill.id);
					toast("Esercizio superato.");
				}
			}
		})
	] });
}
//#endregion
export { DrillPage as component };
