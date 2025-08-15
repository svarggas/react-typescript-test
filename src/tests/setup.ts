// COMMENT: Grabbed this setup of jest from my current employment
// Have had a lot of trouble to make testing easier and more efficient, with a better DX
// This seems to work

import '@testing-library/jest-dom';

// Solving undefined TextEncoder/TextDecoder in Jest env
// Grabbed code from: https://stackoverflow.com/questions/68468203/why-am-i-getting-textencoder-is-not-defined-in-jest
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

// Mock fetch globally
global.fetch = jest.fn();

// Suppress console errors and warnings during tests, but keep logs
const originalError = console.error;
const originalWarn = console.warn;

// Suppress console.error and console.warn unless VERBOSE_TESTS is set
beforeAll(() => {
  if (!process.env.VERBOSE_TESTS) {
    console.error = jest.fn();
    console.warn = jest.fn();
  }
});

// Restore original console methods
afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});
