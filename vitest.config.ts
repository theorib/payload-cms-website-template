import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],

  define: {
    'process.env.NODE_ENV': process.env.NODE_ENV || 'test',
    'process.env.PAYLOAD_SECRET': process.env.PAYLOAD_SECRET || 'test-secret',
  },

  test: {
    globals: true,
    include: ['tests/int/**/*.int.spec.ts'],
    setupFiles: ['./tests/testUtils/setupTests.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['html'],
    },
    projects: [
      {
        plugins: [react(), tsconfigPaths()],
        test: {
          include: ['src/**/*.{test,spec}.jsdom.{ts,tsx}', 'tests/int/**/*.int.spec.ts'],
          name: 'react-jsdom',
          environment: 'jsdom',
          setupFiles: ['./tests/testUtils/setupTests.ts'],
        },
      },
      {
        plugins: [react(), tsconfigPaths()],
        test: {
          name: 'react-browser-mode',
          include: ['src/**/*.{test,spec}.{ts,tsx}'],
          setupFiles: ['./tests/testUtils/setupBrowserTests.ts'],
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },

  optimizeDeps: {
    exclude: ['sharp', 'file-type'],
    include: ['next/image', 'next/font/google'],
    esbuildOptions: {
      target: 'esnext',
    },
  },

  ssr: {
    external: ['file-type'],
  },
  build: {
    target: 'esnext',
  },
})
