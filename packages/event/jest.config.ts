import type { Config } from 'jest';
import { baseConfig } from '../../jest.config.base.ts';

const config: Config = {
  ...baseConfig,
  displayName: 'event',
  rootDir: '.',
  setupFilesAfterEnv: ['../../jest.setup.ts'],
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.test.ts',
    '!src/**/index.ts',
  ],
  coveragePathIgnorePatterns: ['/node_modules/'],
};

export default config;
