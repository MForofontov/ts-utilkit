/*
Root Jest configuration for ts-utilkit.
Runs all tests across all packages with comprehensive reporting.

For testing individual packages, use:
  npm test -w @ts-utilkit/array
  npm test -w @ts-utilkit/crypto
  etc.
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
  moduleNameMapper: {
    '^@ts-utilkit/(.*)$': '<rootDir>/packages/$1/src',
  },
  testEnvironment: 'allure-jest/node',
  testEnvironmentOptions: {
    resultsDir: 'allure-results',
    links: {
      issue: {
        nameTemplate: 'Issue #%s',
        urlTemplate: 'https://issues.example.com/%s',
      },
      tms: {
        nameTemplate: 'TMS #%s',
        urlTemplate: 'https://tms.example.com/%s',
      },
      jira: {
        urlTemplate: (v: string) => `https://jira.example.com/browse/${v}`,
      },
    },
    categories: [
      {
        name: 'foo',
        messageRegex: 'bar',
        traceRegex: 'baz',
        matchedStatuses: [Status.FAILED, Status.BROKEN],
      },
    ],
    environmentInfo: {
      os_platform: os.platform(),
      os_release: os.release(),
      os_version: os.version(),
      node_version: process.version,
    },
  },
  reporters: [
    'default', // default jest reporter
    ['jest-html-reporter', { outputPath: 'jest.html' }], // jest html reporter
    ['jest-allure', { outputDir: 'allure-results' }],
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'packages/*/src/**/*.ts',
    '!packages/*/src/**/*.test.ts',
    '!packages/*/src/**/index.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  testPathIgnorePatterns: ['/node_modules/', '/allure-results/', '/dist/'],
};

export default config;
