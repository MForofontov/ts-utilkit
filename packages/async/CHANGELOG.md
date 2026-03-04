# Changelog - @ts-utilkit/async

All notable changes to this package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Remove all runtime `typeof`/`instanceof` TypeError guards; rely on TypeScript type system for type safety
- Remove all `@throws {TypeError}` JSDoc tags from all affected functions
- Remove all TypeError test cases from all test files
- `asyncRetry`: replace inline `new Promise(resolve => setTimeout(resolve, delay))` with `delay()` from `@ts-utilkit/utility`
- Apply Prettier formatting: remove orphaned blank lines at function-body openings introduced by guard removal

### Added

- Add `asyncBatch` — process an array in sequential fixed-size batches with optional inter-batch delay for rate-limiting
- Add `asyncDeduplication` — collapse concurrent in-flight calls with identical arguments into a single shared Promise
- Add `asyncMemoize` — cache resolved values of async functions with optional TTL and custom key function
- Add `asyncPoll` — repeatedly call an async function at a fixed interval until a condition is met or a timeout elapses
- Add `asyncWaterfall` — execute async tasks in sequence, piping each task’s output as the next task’s input
- Add `@ts-utilkit/utility` as a declared package dependency

## [0.1.0] - 2026-01-26

### Added

- Initial release of @ts-utilkit/async with 6 functions
- Async array operations: `asyncFilter`, `asyncMap`
- Controlled execution: `asyncParallel` with concurrency limit, `asyncSeries` for sequential execution
- Error handling: `asyncRetry` with exponential backoff
- Promise utilities: `asyncTimeout` for timeout handling
- Production-ready async patterns
- Comprehensive test coverage

---

## Workflow

As you make changes, immediately add them to the **[Unreleased]** section:

1. Add item under appropriate category (Added/Changed/Fixed/Deprecated/Removed/Security)
2. When releasing, rename [Unreleased] to version number with date
3. Create new empty [Unreleased] section at the top
