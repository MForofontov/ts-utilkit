import * as os from 'os';

const Status = {
  FAILED: 'failed',
  BROKEN: 'broken',
};

const config = {
  preset: 'ts-jest',
  displayName: 'format',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  rootDir: '.',
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
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'],
  testPathIgnorePatterns: ['/node_modules/', '/allure-results/', '/dist/'],
};

export default config;
