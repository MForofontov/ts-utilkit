export default {
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
  },
  moduleNameMapper: {
    '^@ts-utilkit/(.*)$': '<rootDir>/packages/$1/src',
  },
  testEnvironment: 'node',
  maxWorkers: 2,
  workerIdleMemoryLimit: '512MB',
  reporters: ['default'],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 95.01,
      functions: 95.01,
      lines: 95.01,
      statements: 95.01,
    },
  },
  collectCoverageFrom: [
    'packages/*/src/**/*.ts',
    '!packages/*/src/**/*.test.ts',
    '!packages/*/src/**/index.ts',
  ],
  coverageDirectory: 'local-testing/coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
