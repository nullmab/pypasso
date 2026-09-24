import { i as __toESM } from "../_runtime.mjs";
import { o as modules } from "./curriculum-DV44EivI.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as ArrowRight, h as Check, l as Lock } from "../_libs/lucide-react.mjs";
import { c as nextModuleId, d as useQuaderno, f as cn, i as completedCount, l as progressPercent, o as moduleCompleted, s as moduleUnlocked } from "./router-CON3QvVS.mjs";
import { a as DialogHeader, i as DialogDescription, n as Dialog, o as DialogTitle, r as DialogContent, s as DialogTrigger, t as Button } from "./dialog-7iJXcUoo.mjs";
import { t as Input } from "./input-CJ4ziX8A.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DKmkIebF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		className: cn("text-sm font-medium text-foreground", className),
		...props
	});
}
function Home() {
	const state = useQuaderno();
	const [ready, setReady] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const done = () => setReady(true);
		const unsub = useQuaderno.persist.onFinishHydration(done);
		if (useQuaderno.persist.hasHydrated()) done();
		return unsub;
	}, []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 rounded-[var(--radius-xl)] bg-card shadow-[var(--shadow-border)]" });
	if (!state.name) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-xl pt-6 sm:pt-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium tracking-wide text-pine uppercase",
				children: "Quaderno di laboratorio"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl font-medium tracking-tight sm:text-5xl",
				children: "Python, un passo alla volta."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-base leading-relaxed text-muted-foreground",
				children: "Dieci unità, ciascuna con teoria, quiz e un laboratorio da eseguire qui dentro. Pensato per chi inizia il corso in seconda superiore."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 rounded-[var(--radius-xl)] bg-card p-5 shadow-[var(--shadow-border)] sm:p-6",
				onSubmit: (e) => {
					e.preventDefault();
					if (draft.trim()) state.setName(draft);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "nome",
						children: "Come ti chiami?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "nome",
						className: "mt-2",
						value: draft,
						onChange: (e) => setDraft(e.target.value),
						placeholder: "Il tuo nome",
						autoComplete: "given-name"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						className: "mt-4 w-full sm:w-auto",
						disabled: !draft.trim(),
						children: ["Apri il quaderno", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})
				]
			})
		]
	});
	const next = nextModuleId(state);
	const nextMod = modules.find((m) => m.id === next);
	const done = completedCount(state);
	const pct = progressPercent(state);
	const allDone = done === modules.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm font-medium text-muted-foreground",
					children: ["Quaderno di ", state.name]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-4xl font-medium tracking-tight sm:text-5xl",
					children: allDone ? "Corso completato." : "Il tuo percorso."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-muted-foreground",
					children: allDone ? "Dieci unità, quiz e laboratori. Tieni a portata il promemoria quando sei in classe." : `${done} di ${modules.length} unità completate. Ogni passo sblocca il successivo.`
				})
			] }), !allDone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				size: "lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/corso/$moduleId",
					params: { moduleId: nextMod.id },
					search: { fase: "teoria" },
					children: [done === 0 ? "Inizia dal modulo 1" : `Continua: ${nextMod.title}`, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-8 font-mono text-sm text-muted-foreground tabular-nums",
			children: [pct, "% del corso"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "relative mt-6 ml-3 border-l border-border sm:ml-4",
			children: modules.map((m, i) => {
				const unlocked = moduleUnlocked(i, state);
				const completed = moduleCompleted(m.id, state);
				const current = m.id === next && !allDone;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "relative pb-8 pl-8 last:pb-0 sm:pl-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("absolute top-1 -left-2.5 flex size-5 items-center justify-center rounded-full border", completed && "border-primary bg-primary text-primary-foreground", current && "border-primary bg-card", !completed && !current && "border-border bg-background"),
						children: completed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-current opacity-40" })
					}), unlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/corso/$moduleId",
						params: { moduleId: m.id },
						search: { fase: "teoria" },
						className: cn("block rounded-[var(--radius-lg)] bg-card p-4 shadow-[var(--shadow-border)] transition-transform duration-150 hover:-translate-y-0.5 sm:p-5", current && "ring-1 ring-primary/30"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-xs text-muted-foreground tabular-nums",
								children: [
									"Unità ",
									m.number,
									" · ",
									m.minutes,
									" min"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 font-display text-xl font-medium tracking-tight",
								children: m.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: m.subtitle
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[var(--radius-lg)] bg-card/60 p-4 text-muted-foreground sm:p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-2 font-mono text-xs tabular-nums",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3.5" }),
									"Unità ",
									m.number
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 font-display text-xl font-medium tracking-tight text-foreground/70",
								children: m.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm",
								children: "Completa l'unità precedente per sbloccarla."
							})
						]
					})]
				}, m.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					className: "text-muted-foreground",
					children: "Reimposta il quaderno"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Vuoi ricominciare da zero?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Quiz, laboratori e il nome sul quaderno verranno cancellati da questo dispositivo." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "destructive",
				onClick: () => state.reset(),
				children: "Cancella i progressi"
			})] })] })
		})
	] });
}
//#endregion
export { Home as component };
