/*
Base Jest configuration for ts-utilkit packages.
Individual packages extend this configuration.
*/

import * as os from 'os';

// Manually define the status values if the import is causing issues
const Status = {
  FAILED: 'failed',
  BROKEN: 'broken',
};

export const baseConfig = {
  preset: 'ts-jest',
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
  testPathIgnorePatterns: ['/node_modules/', '/allure-results/', '/dist/'],
};
