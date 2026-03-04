# Changelog - @ts-utilkit/collection

All notable changes to this package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Remove all runtime `typeof`/`instanceof` TypeError guards; rely on TypeScript type system for type safety
- Remove all `@throws {TypeError}` JSDoc tags from all affected functions
- Remove all TypeError test cases from all test files
- Apply Prettier formatting: remove orphaned blank lines at function-body openings introduced by guard removal

### Deprecated

- `arrayToSet`: thin wrapper around `new Set(array)`; use that constructor directly. Will be removed in the next major version.
- `setToArray`: thin wrapper around `Array.from(set)` / `[...set]`; use those directly. Will be removed in the next major version.

### Added

- Add `createCounterMap` — counts occurrences of each item in an array and returns a `Map<T, number>` keyed by item identity
- Add `createMultiMap` — factory that creates a multi-map data structure (`MultiMap<K, V>`) where each key holds an ordered array of values, with full CRUD methods and method chaining support

## [0.1.0] - 2026-01-26

### Added

- Initial release of @ts-utilkit/collection with 17 functions
- Set operations: `setUnion`, `setIntersection`, `setDifference`, `setSymmetricDifference`, `setEquals`
- Set utilities: `isDisjoint`, `isSubset`, `isSuperset`, `setToArray`, `arrayToSet`
- Map operations: `mapFilter`, `mapMap`, `mapReduce`, `mapMerge`, `mapInvert`
- Map conversions: `mapToObject`, `objectToMap`
- TypeScript-first with complete type definitions
- Comprehensive test coverage (>95%)

---

## Workflow

As you make changes, immediately add them to the **[Unreleased]** section:

1. Add item under appropriate category (Added/Changed/Fixed/Deprecated/Removed/Security)
2. When releasing, rename [Unreleased] to version number with date
3. Create new empty [Unreleased] section at the top
