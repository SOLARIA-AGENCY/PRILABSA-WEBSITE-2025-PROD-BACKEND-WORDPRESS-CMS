import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: ['./vitest.setup.ts'],
    testTimeout: 2000,  // 2 seconds max per test
    hookTimeout: 5000,   // 5 seconds max for hooks
    teardownTimeout: 2000, // 2 seconds max for teardown
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true
      }
    },
    include: [
      'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'src/**/__tests__/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
    ],
    exclude: [
      'node_modules',
      'dist',
      '.git',
      '.cache',
      'build',
      'public'
    ],

    bail: 1  // Stop on first failure
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});