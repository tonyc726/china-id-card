import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['test/**/*.test.ts'],
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: ['src/**'],
      exclude: [],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 94,
        statements: 98,
      },
    },
  },
});
