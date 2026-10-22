import { defineConfig } from 'vite-plus';

export default defineConfig({
	staged: {
		'*': 'vp check --fix',
	},
	pack: {
		entry: ['src/index.ts', 'src/client.ts', 'src/server.ts'],
		format: 'esm',
		fixedExtension: false,
		dts: true,
		unbundle: true,
	},
	fmt: {
		singleQuote: true,
		useTabs: true,
		printWidth: 120,
		ignorePatterns: ['dist/**', 'temp/**', 'docs/**', 'coverage/**', 'CHANGELOG.md', 'next-api-utils.api.md'],
	},
	lint: {
		jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
		rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
		options: { typeAware: true, typeCheck: true },
		categories: { correctness: 'error', perf: 'error' },
		ignorePatterns: ['dist/**', 'temp/**', 'docs/**', 'coverage/**'],
	},
	test: {
		include: ['src/**/*.test.ts'],
		coverage: {
			provider: 'v8',
			include: ['src/**/*.ts'],
			exclude: ['src/**/*.test.ts'],
			reporter: ['text', 'lcov'],
		},
	},
});
