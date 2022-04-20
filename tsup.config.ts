import { defineConfig } from "tsup"

export const tsup = defineConfig({
	entry: {
		"index": "./src/index.ts",
		"rime": "./src/rime_dict.ts",
	},
	clean: true,
	format: ["esm"]
})