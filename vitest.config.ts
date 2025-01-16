import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['packages/backend/src/**/*.test.ts', 'packages/frontend/src/**/*.test.tsx'],
  },
});