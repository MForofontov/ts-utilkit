/*
To install jest run these:
npm install jest
npm install --save-dev ts-jest //Typescript
npm install --save-dev @types/jest //To use special functions like it and expect

To install jest html report:
npm install jest-html-reporter --save-dev

To install Junit report (results in an XML format compatible with Jenkins, GitLab, and other CI/CD tools.):
npm install jest-junit --save-dev

To install Allure report:
npm install --save-dev jest-allure allure-commandline

To install SonarQube report:
npm install --save-dev jest-sonar-reporter
npm install --save-dev sonar-scanner
*/

import * as os from 'os';

// Manually define the status values if the import is causing issues
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
    '^@ts-functions/(.*)$': '<rootDir>/packages/$1/src',
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
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  testPathIgnorePatterns: ['/node_modules/', '/allure-results/', '/dist/'], // Ignore node_modules, test output, and compiled files
};

export default config;
