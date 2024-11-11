import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';

export default defineConfig({
  test: {
    reporters: [
      // 'verbose',
    ],
    env: loadEnv('', process.cwd(), ''),
  },
});