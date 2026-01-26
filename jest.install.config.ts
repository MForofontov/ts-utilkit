/**
 * Jest configuration for testing installed packages from node_modules
 * This config runs the full test suite against published/installed packages
 * to validate they work correctly after installation.
 */

import * as os from 'os';

const Status = {
  FAILED: 'failed',
  BROKEN: 'broken',
};

const config = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
  // Import from installed packages instead of source
  moduleNameMapper: {
    '^@ts-utilkit/(.*)$': '<rootDir>/node_modules/@ts-utilkit/$1',
  },
  testEnvironment: 'node',
  testMatch: [
    '**/packages/*/tests/**/*.test.ts',
  ],
  coverageDirectory: 'coverage-install',
  collectCoverageFrom: [
    'node_modules/@ts-utilkit/*/dist/**/*.js',
    '!node_modules/@ts-utilkit/*/dist/**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  maxWorkers: Math.max(1, os.cpus().length - 1),
  verbose: true,
  bail: false,
  testTimeout: 30000,
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        pageTitle: 'ts-utilkit Post-Installation Test Report',
        outputPath: './test-install-results.html',
        includeFailureMsg: true,
        includeConsoleLog: true,
        dateFormat: 'yyyy-mm-dd HH:MM:ss',
      },
    ],
  ],
};

export default config;
