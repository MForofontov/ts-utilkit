# Changelog - @ts-utilkit/webscraping

All notable changes to this package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2026-03-05

### Changed

- Remove all runtime `typeof`/`instanceof` TypeError guards; rely on TypeScript type system for type safety
- Remove all `@throws {TypeError}` JSDoc tags from all affected functions
- Remove all TypeError test cases from all test files
- Apply Prettier formatting: remove orphaned blank lines at function-body openings introduced by guard removal

- Add `exports` field to `package.json` for explicit ESM/CJS/types entry-point resolution by modern bundlers and Node.js `exports` map

### Deprecated

- `parseJSON`: use `safeJSONParse(str, null)` from `@ts-utilkit/utility` instead — functionally equivalent and is the canonical implementation. Will be removed in the next major version.

## [0.1.0] - 2026-01-26

### Added

- Initial release of @ts-utilkit/webscraping with 1 function
- HTML text extraction: `scrapeText`
- TypeScript-first with complete type definitions
- Comprehensive test coverage (>95%)

---

## Workflow

As you make changes, immediately add them to the **[Unreleased]** section:

1. Add item under appropriate category (Added/Changed/Fixed/Deprecated/Removed/Security)
2. When releasing, rename [Unreleased] to version number with date
3. Create new empty [Unreleased] section at the top
