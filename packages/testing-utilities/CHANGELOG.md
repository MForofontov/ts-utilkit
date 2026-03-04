# Changelog - @ts-utilkit/testing-utilities

All notable changes to this package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Remove all runtime `typeof`/`instanceof` TypeError guards; rely on TypeScript type system for type safety
- Remove all `@throws {TypeError}` JSDoc tags from all affected functions
- Remove all TypeError test cases from all test files
- `generateRandomString`: delegate character generation to `randomSequence` from `@ts-utilkit/random`
- `generateRandomEmail`: use `randomChoice` from `@ts-utilkit/random` for domain selection
- `generateRandomURL`: use `randomChoice` from `@ts-utilkit/random` for TLD selection
- `generateRandomIPv4`: use `randomInt` and `randomChoice` from `@ts-utilkit/random`; remove internal `rand` helper
- `generateRandomUUID`: replaced with a pure `export { randomUUID as generateRandomUUID }` re-export from `@ts-utilkit/random`
- `generateRandomBoolean`: replaced with a pure `export { randomBoolean as generateRandomBoolean }` re-export from `@ts-utilkit/random`; test error messages updated to match `randomBoolean`'s `"probability must be between 0 and 1"`
- `generateRandomDate`: delegate to `randomDate` from `@ts-utilkit/random`
- `generateRandomNumber`: delegate to `randomInt` (integers) or `randomFloat` (decimals) from `@ts-utilkit/random`
- `generateRandomEmail`: replace `Math.random().toString(36).substring(2, 10)` with `randomSequence(8, alphanumericLower)` for consistent 8-char usernames
- `generateRandomURL`: replace `Math.random().toString(36)` patterns with `randomSequence` for consistent-length subdomain (6 chars) and path (8 chars)
- `assertArraysEqual`: replace `JSON.stringify(sorted) === JSON.stringify(sorted)` with `deepEqual` from `@ts-utilkit/object` — handles NaN, Date, RegExp correctly
- `testMultipleCases`: replace `JSON.stringify(actual) === JSON.stringify(expected)` with `deepEqual` from `@ts-utilkit/object`
- Apply Prettier formatting: remove orphaned blank lines at function-body openings introduced by guard removal

### Deprecated

- `generateRandomString`: use `randomSequence` from `@ts-utilkit/random` directly. Note: this function is NOT cryptographically secure — for secure random strings use `generateRandomString` from `@ts-utilkit/string`.
- `generateRandomNumber`: use `randomInt` (for integers) or `randomFloat` (for decimals) from `@ts-utilkit/random` directly. Will be removed in the next major version.

### Added

- Add `@ts-utilkit/random` as a declared package dependency
- Add `@ts-utilkit/object` as a declared package dependency

## [0.1.0] - 2026-01-26

### Added

- Initial release of @ts-utilkit/testing-utilities with 15 functions
- Test runners: `createAsyncTestRunner`
- Fixtures: `createFixture`
- Mocking: `createMockFunction`, `createSpy`, `createStub`, `mockAsyncOperation`, `mockTimers`
- Test context: `createTestContext`
- Assertions: `expectAsync`, `expectToThrow`
- Test data: `generateTestData`
- Performance: `measurePerformance`
- Utilities: `delay`, `retry`, `waitFor`
- TypeScript-first with complete type definitions
- Comprehensive test coverage (>95%)

---

## Workflow

As you make changes, immediately add them to the **[Unreleased]** section:

1. Add item under appropriate category (Added/Changed/Fixed/Deprecated/Removed/Security)
2. When releasing, rename [Unreleased] to version number with date
3. Create new empty [Unreleased] section at the top
