//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-BK7qMU6x.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/workspace/src/routes/__root.tsx",
		children: [
			"/",
			"/glossario",
			"/palestra",
			"/promemoria",
			"/corso/$moduleId"
		],
		preloads: [
			"/assets/index-B0fAnQoG.js",
			"/assets/curriculum-BDOciTPa.js",
			"/assets/utils-BcELf8YO.js",
			"/assets/dist-Cbfy1o9I.js",
			"/assets/progress-CYZOudEw.js",
			"/assets/preload-helper-9F3ZhS6m.js"
		],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-B0fAnQoG.js"
		} }]
	},
	"/": {
		filePath: "/workspace/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-DqyKL5ht.js",
			"/assets/arrow-right-DXOp1jTj.js",
			"/assets/dialog-Cln-qUXd.js",
			"/assets/lock-DtR8TOVE.js",
			"/assets/input-DZCk4Uyt.js"
		]
	},
	"/glossario": {
		filePath: "/workspace/src/routes/glossario.tsx",
		children: void 0,
		preloads: ["/assets/glossario-DxdJ8MAH.js", "/assets/input-DZCk4Uyt.js"]
	},
	"/palestra": {
		filePath: "/workspace/src/routes/palestra.tsx",
		children: ["/palestra/$drillId"],
		preloads: ["/assets/palestra-CYwuMmTl.js", "/assets/lock-DtR8TOVE.js"]
	},
	"/promemoria": {
		filePath: "/workspace/src/routes/promemoria.tsx",
		children: void 0,
		preloads: ["/assets/promemoria-BbrjvMiY.js"]
	},
	"/corso/$moduleId": {
		filePath: "/workspace/src/routes/corso.$moduleId.tsx",
		children: void 0,
		preloads: [
			"/assets/corso._moduleId-CVSXeWKO.js",
			"/assets/lab-panel-BBuGNVBc.js",
			"/assets/arrow-right-DXOp1jTj.js",
			"/assets/dialog-Cln-qUXd.js",
			"/assets/lock-DtR8TOVE.js"
		]
	},
	"/palestra/$drillId": {
		filePath: "/workspace/src/routes/palestra.$drillId.tsx",
		children: void 0,
		preloads: [
			"/assets/palestra._drillId-D0ID5HQv.js",
			"/assets/lab-panel-BBuGNVBc.js",
			"/assets/dialog-Cln-qUXd.js"
		]
	}
} });
//#endregion
export { tsrStartManifest };
