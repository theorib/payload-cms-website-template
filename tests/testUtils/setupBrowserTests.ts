import { beforeAll, beforeEach, afterEach, afterAll, vi } from 'vitest'
import mockNextFontGoogle from './mockNextFontGoogle'
import mockNextImage from './mockNextImage'
// learn more: https://github.com/testing-library/jest-dom
// import '@testing-library/jest-dom/vitest';

// Mock environment variables for browser mode
Object.defineProperty(globalThis, 'process', {
  value: {
    env: {
      NODE_ENV: 'test',
      PAYLOAD_SECRET: 'test-secret',
    },
  },
})

mockNextFontGoogle(['Rubik_Scribble', 'Inter'])

beforeAll(() => {
  vi.mock('next/image', () => mockNextImage)
  vi.mock('next/font/google', () => ({
    __esModule: true, // This property is required for the module to be recognized as an ES module when there is a default export.
    default: () => mockNextFontGoogle(['Raleway']),
  }))
})

beforeEach(() => {
  // All your beforeEach code here
})

afterEach(() => {
  // All your afterEach code here
})

afterAll(() => {
  // All your afterAll code here
})
