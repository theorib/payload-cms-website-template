import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],

  test: {
    globals: true,
    include: ['tests/int/**/*.int.spec.ts'],
    setupFiles: ['./src/testUtils/setupTests.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['html'],
    },
    projects: [
      {
        extends: 'vitest.config.ts',
        test: {
          include: ['src/**/*.{test,spec}.jsdom.{ts,tsx}', 'tests/int/**/*.int.spec.ts'],
          name: 'react-jsdom',
          environment: 'jsdom',
        },
      },
      {
        extends: 'vitest.config.ts',
        test: {
          name: 'react-browser-mode',
          include: ['src/**/*.{test,spec}.{ts,tsx}'],
          browser: {
            enabled: true,
            headless: false,
            provider: 'playwright',
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },

  optimizeDeps: {
    exclude: ['sharp'],
    include: ['file-type', 'next/image', 'next/font/google'],
    esbuildOptions: {
      target: 'esnext',
    },
  },
  build: {
    target: 'esnext',
  },
})
