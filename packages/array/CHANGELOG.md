# Changelog - @ts-utilkit/array

All notable changes to this package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Declare `@ts-utilkit/object` as an explicit package dependency (formalises existing cross-package import)

### Changed
- `groupBy`: replaced with a pure `export { groupByObject as groupBy }` re-export from `@ts-utilkit/object`; eliminates all duplicated logic; `TypeError` on non-array input now propagates from `groupByObject`
- `findCommonWithCondition`: replace `JSON.stringify(item1) === JSON.stringify(item2)` with `deepEqual` from `@ts-utilkit/object` — correctly handles NaN, Date, RegExp, and deeply nested values that JSON.stringify cannot

## [0.1.1] - 2026-01-26

### Added
- Initial release of @ts-utilkit/array with 26 functions
- Array manipulation utilities: `arrayDifference`, `arrayIntersection`, `cartesianProduct`, `chunkArray`
- Filtering and searching: `findCommonWithCondition`, `findDuplicates`, `findIndexOfElement`, `findMax`, `findMin`, `findUniqueElements`
- Flattening utilities: `flattenArray`, `flattenArrayDepth`
- Prime number generation: `generatePrimes`
- Grouping and aggregation: `groupBy`, `uniqueElementsWithCounts`
- String operations: `joinStrings`
- Array combination: `mergeUnique`, `zipMultiple`
- Element removal: `removeByCondition`, `removeByIndex`, `removeDuplicates`, `removeFalsyValues`
- Array rotation: `rotateArrayLeft`, `rotateArrayRight`
- Sorting utilities: `sortBy`
- Mathematical operations: `sumArrayElements`
- TypeScript-first with complete type definitions
- Comprehensive test coverage (>95%)
- Tree-shakeable ESM and CommonJS support

---

## Workflow

As you make changes, immediately add them to the **[Unreleased]** section:
1. Add item under appropriate category (Added/Changed/Fixed/Deprecated/Removed/Security)
2. When releasing, rename [Unreleased] to version number with date
3. Create new empty [Unreleased] section at the top
