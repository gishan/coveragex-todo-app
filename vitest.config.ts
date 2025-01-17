import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./setup.ts'],
    globals: true,
    include: ['packages/backend/src/**/*.test.ts', 'packages/frontend/src/**/*.test.tsx'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './packages/frontend/src')
    }
  }
});