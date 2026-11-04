import react from '@vitejs/plugin-react';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./vitest.setup.ts'],
		clearMocks: true,
		resolveSnapshotPath: (testPath, extension) =>
			resolve(
				dirname(fileURLToPath(import.meta.url)),
				'__tests__/__snapshots__',
				relative(fileURLToPath(new URL('./src/', import.meta.url)), testPath) + extension
			),
		coverage: {
			provider: 'v8',
			reporter: ['text', 'html', 'lcov'],
			reportsDirectory: './coverage',
			include: ['src/**/*.{ts,tsx}'],
			exclude: [
				'**/*.d.ts',
				'**/*.test.{ts,tsx}',
				'**/*.spec.{ts,tsx}',
				'**/__tests__/**',
				'**/__mocks__/**'
			]
		}
	}
});
