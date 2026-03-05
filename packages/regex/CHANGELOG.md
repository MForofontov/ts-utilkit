# Changelog - @ts-utilkit/regex

All notable changes to this package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2026-03-05

### Changed

- Remove all runtime `typeof`/`instanceof` TypeError guards; rely on TypeScript type system for type safety
- Remove all `@throws {TypeError}` JSDoc tags from all affected functions
- Remove all TypeError test cases from all test files
- `catch (e)` → `catch` in 12 functions (`countMatches`, `extractMatchGroups`, `extractMatches`, `findAll`, `getPatternComplexity`, `hasBacktracking`, `highlightMatches`, `optimizePattern`, `replaceAll`, `replaceWithCallback`, `splitByPattern`, `testPattern`) where the caught error is not referenced in the handler body
- `combinePatterns`: unknown pattern types (non-string, non-RegExp entries) are now silently skipped instead of throwing `TypeError`; only valid patterns contribute to the combined result
- Apply Prettier formatting: remove orphaned blank lines at function-body openings introduced by guard removal
- `testPattern`: replace broken `setTimeout`-based timeout with `vm.runInContext` + V8 script execution timer — timeout now genuinely interrupts catastrophic backtracking instead of being a no-op post-hoc check

- Add `exports` field to `package.json` for explicit ESM/CJS/types entry-point resolution by modern bundlers and Node.js `exports` map
## [0.1.0] - 2026-01-26

### Added

- Initial release of @ts-utilkit/regex with 5 functions
- Pattern utilities: `escapeRegExp`, `isMatchingPattern`
- Text extraction: `extractURLsFromText`
- Pattern matching: `matchAll`, `replacePattern`
- TypeScript-first with complete type definitions
- Comprehensive test coverage (>95%)

---

## Workflow

As you make changes, immediately add them to the **[Unreleased]** section:

1. Add item under appropriate category (Added/Changed/Fixed/Deprecated/Removed/Security)
2. When releasing, rename [Unreleased] to version number with date
3. Create new empty [Unreleased] section at the top
