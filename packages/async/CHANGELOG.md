# Changelog - @ts-utilkit/async

All notable changes to this package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- New features go here

### Changed
- Changes to existing functionality

### Fixed
- Bug fixes

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
