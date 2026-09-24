import { i as __toESM } from "../_runtime.mjs";
import { i as getModule, o as modules } from "./curriculum-DV44EivI.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as ArrowRight, d as Info, h as Check, i as RotateCcw, l as Lock, m as ChevronRight, n as TriangleAlert, o as PencilLine, t as X, v as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as useQuaderno, f as cn, o as moduleCompleted, r as Route$1, s as moduleUnlocked, u as quizPassed } from "./router-CON3QvVS.mjs";
import { t as Button } from "./dialog-7iJXcUoo.mjs";
import { n as LabPanel, t as CodeBlock } from "./lab-panel-BUGq3cNE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/corso._moduleId-dAJjQgnu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function QuizPanel({ questions, onFinished }) {
	const [i, setI] = (0, import_react.useState)(0);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const [correct, setCorrect] = (0, import_react.useState)(0);
	const [done, setDone] = (0, import_react.useState)(false);
	const q = questions[i];
	const answered = picked !== null;
	const isRight = picked === q?.correctId;
	const score = (0, import_react.useMemo)(() => Math.round(correct / questions.length * 100), [correct, questions.length]);
	if (done) {
		const passed = correct / questions.length >= .7;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-[var(--radius-xl)] bg-card p-6 shadow-[var(--shadow-border)] sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium tracking-wide text-muted-foreground uppercase",
					children: "Quiz concluso"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-2 font-display text-3xl font-medium tracking-tight",
					children: [
						correct,
						" su ",
						questions.length
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-md text-muted-foreground",
					children: passed ? "Soglia del 70% superata. Puoi passare al laboratorio." : "Serve almeno il 70% per sbloccare il laboratorio. Riprova: le spiegazioni restano visibili."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 font-mono text-sm tabular-nums text-pine",
					children: [score, "%"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex flex-wrap gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: () => {
							setI(0);
							setPicked(null);
							setCorrect(0);
							setDone(false);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "Riprova"]
					})
				})
			]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-xl)] bg-card p-5 shadow-[var(--shadow-border)] sm:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm font-medium text-muted-foreground tabular-nums",
				children: [
					"Domanda ",
					i + 1,
					" di ",
					questions.length
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-2xl font-medium tracking-tight",
				children: q.prompt
			}),
			q.code && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, {
				code: q.code,
				className: "mt-4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-5 flex flex-col gap-2",
				children: q.options.map((opt) => {
					const show = answered;
					const right = opt.id === q.correctId;
					const mine = opt.id === picked;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: answered,
						onClick: () => {
							setPicked(opt.id);
							const ok = opt.id === q.correctId;
							const nextCorrect = correct + (ok ? 1 : 0);
							if (ok) setCorrect(nextCorrect);
						},
						className: cn("flex min-h-12 w-full items-start gap-3 rounded-[var(--radius-md)] border px-4 py-3 text-left text-sm transition-colors", !show && "border-border bg-background hover:bg-secondary", show && right && "border-success/40 bg-accent text-accent-foreground", show && mine && !right && "border-destructive/40 bg-destructive/10", show && !mine && !right && "border-border bg-background opacity-70"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 font-mono text-xs text-muted-foreground",
								children: opt.id.toUpperCase()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex-1",
								children: opt.text
							}),
							show && right && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 shrink-0 text-success" }),
							show && mine && !right && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4 shrink-0 text-destructive" })
						]
					}) }, opt.id);
				})
			}),
			answered && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 rounded-[var(--radius-md)] bg-secondary px-4 py-3 text-sm leading-relaxed",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: isRight ? "Giusto." : "Non proprio."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-muted-foreground",
						children: q.explain
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "mt-4",
						onClick: () => {
							if (i + 1 >= questions.length) {
								const totalCorrect = correct;
								setDone(true);
								onFinished(totalCorrect, questions.length);
							} else {
								setI(i + 1);
								setPicked(null);
							}
						},
						children: [i + 1 >= questions.length ? "Vedi il risultato" : "Domanda successiva", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
					})
				]
			})
		]
	});
}
function CalloutIcon({ tone }) {
	if (tone === "warn") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 shrink-0 text-warn" });
	if (tone === "rule") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PencilLine, { className: "size-4 shrink-0 text-pine" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "size-4 shrink-0 text-pine" });
}
function TheoryPanel({ blocks }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: "flex flex-col gap-8",
		children: blocks.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-[var(--radius-xl)] bg-card p-5 shadow-[var(--shadow-border)] sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-medium tracking-tight",
					children: b.heading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 space-y-3 text-base leading-relaxed text-foreground/90",
					children: b.body.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, p))
				}),
				b.bullets && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed",
					children: b.bullets.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						className: "rounded-[var(--radius-xs)] bg-secondary px-1 py-0.5 font-mono text-sm",
						children: x.split(" — ")[0]
					}), x.includes(" — ") ? ` — ${x.split(" — ").slice(1).join(" — ")}` : null] }, x))
				}),
				b.code && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, {
					className: "mt-5",
					code: b.code.source,
					output: b.code.output,
					caption: b.code.caption
				}),
				b.callout && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: cn("mt-5 flex gap-3 rounded-[var(--radius-md)] px-4 py-3 text-sm leading-relaxed", b.callout.tone === "warn" ? "bg-secondary" : "bg-accent"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalloutIcon, { tone: b.callout.tone }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: b.callout.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-muted-foreground",
						children: b.callout.body
					})] })]
				})
			]
		}, b.heading))
	});
}
function CorsoPage() {
	const { moduleId } = Route$1.useParams();
	const { fase } = Route$1.useSearch();
	const navigate = useNavigate({ from: "/corso/$moduleId" });
	const state = useQuaderno();
	const mod = getModule(moduleId);
	const index = modules.findIndex((m) => m.id === moduleId);
	if (!mod || index < 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Unità non trovata." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		asChild: true,
		variant: "outline",
		className: "mt-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			children: "Torna al percorso"
		})
	})] });
	const unlocked = moduleUnlocked(index, state);
	const quizOk = quizPassed(mod.id, state);
	const labOk = !!state.labPassed[mod.id];
	const fases = [
		{
			id: "teoria",
			label: "Teoria",
			locked: false
		},
		{
			id: "quiz",
			label: "Quiz",
			locked: false
		},
		{
			id: "lab",
			label: "Laboratorio",
			locked: !quizOk
		}
	];
	const go = (next) => {
		navigate({ search: { fase: next } });
	};
	if (!unlocked) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-lg pt-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "mx-auto size-8 text-muted-foreground" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-display text-3xl font-medium",
				children: "Unità ancora chiusa"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted-foreground",
				children: "Completa quiz e laboratorio dell'unità precedente."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: "Torna al percorso"
				})
			})
		]
	});
	const shown = fase === "lab" && !quizOk ? "quiz" : fase;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Percorso"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 font-mono text-xs text-muted-foreground tabular-nums",
					children: [
						"Unità ",
						mod.number,
						" di ",
						modules.length,
						" · ",
						mod.minutes,
						" min"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-3xl font-medium tracking-tight sm:text-4xl",
					children: mod.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted-foreground",
					children: mod.subtitle
				})
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6 flex gap-1 rounded-[var(--radius-lg)] bg-secondary p-1",
			children: fases.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				disabled: f.locked,
				onClick: () => go(f.id),
				className: cn("flex h-11 flex-1 items-center justify-center rounded-[var(--radius-sm)] text-sm font-medium transition-colors", shown === f.id ? "bg-card text-foreground shadow-[var(--shadow-border)]" : "text-muted-foreground", f.locked && "opacity-50"),
				children: [
					f.label,
					f.id === "quiz" && quizOk ? " · ok" : "",
					f.id === "lab" && labOk ? " · ok" : ""
				]
			}, f.id))
		}),
		shown === "teoria" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mb-6 flex flex-wrap gap-2",
				children: mod.goals.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "rounded-full bg-accent px-3 py-1.5 text-xs text-accent-foreground",
					children: g
				}, g))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TheoryPanel, { blocks: mod.theory }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => {
						state.markTheory(mod.id);
						go("quiz");
					},
					children: ["Vai al quiz", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
				})
			})
		] }),
		shown === "quiz" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizPanel, {
			questions: mod.quiz,
			onFinished: (correct, total) => {
				state.saveQuiz(mod.id, correct, total);
				if (correct / total >= .7) toast("Quiz superato. Laboratorio sbloccato.");
			}
		}, mod.id),
		shown === "quiz" && quizOk && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => go("lab"),
				children: ["Vai al laboratorio", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
			})
		}),
		shown === "lab" && quizOk && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabPanel, {
			lab: mod.lab,
			attempts: state.labAttempts[mod.id] ?? 0,
			onAttempt: () => state.bumpLabAttempt(mod.id),
			onPass: () => {
				if (!state.labPassed[mod.id]) {
					state.passLab(mod.id);
					toast(index < modules.length - 1 ? "Unità completata. La successiva è aperta." : "Hai finito il corso.");
				}
			}
		}, mod.id), moduleCompleted(mod.id, state) && index < modules.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/corso/$moduleId",
					params: { moduleId: modules[index + 1].id },
					search: { fase: "teoria" },
					children: ["Unità successiva", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
				})
			})
		})] })
	] });
}
//#endregion
export { CorsoPage as component };
