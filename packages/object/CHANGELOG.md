# Changelog - @ts-utilkit/object

All notable changes to this package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Remove all runtime `typeof`/`instanceof` TypeError guards; rely on TypeScript type system for type safety
- Remove all `@throws {TypeError}` JSDoc tags from all affected functions
- Remove all TypeError test cases from all test files
- `compactObject`: add `@see` cross-reference to `removeEmptyValues` in JSDoc to clarify the difference (recursive vs shallow, omits empty strings vs not)
- `removeEmptyValues`: add `@see` cross-reference to `compactObject` in JSDoc to clarify the difference
- Apply Prettier formatting: remove orphaned blank lines at function-body openings introduced by guard removal

### Deprecated

- `queryStringToObject`: use `deserializeFromQueryString` from `@ts-utilkit/serialization` instead — the serialization version supports richer options (arrayFormat, decodeValues). Will be removed in the next major version.
- `objectToQueryString`: use `serializeToQueryString` from `@ts-utilkit/serialization` instead — the serialization version supports richer options (arrayFormat, encodeValues). Will be removed in the next major version.
- `countProperties`: functionally identical to `objectSize(obj)` — both return `Object.keys(obj).length`; use `objectSize` instead. Will be removed in the next major version.

### Added

- `zipObject`: creates an object from separate keys and values arrays
- `findKey`: returns the first key whose value satisfies a predicate
- `renameKey`: renames a single key immutably, preserving insertion order
- `transformKeys`: applies a custom function to all keys, keeping values unchanged

## [0.1.0] - 2026-01-26

### Added

- Initial release of @ts-utilkit/object with 35 functions
- Object manipulation: `deepClone`, `deepCloneWithJSON`, `deepMerge`, `mergeObjects`, `freezeObject`, `deepFreeze`
- Property access: `safeGet`, `getNestedValue`, `updateNestedValue`, `deleteProperty`
- Object transformation: `flattenObject`, `unflattenObject`, `invertObject`, `mapObject`, `mapValues`, `filterObject`
- Property selection: `pickProperties`, `omitProperties`, `extractProperties`, `renameKeys`, `transformKeys`, `transformValues`
- Object analysis: `isEmptyObject`, `deepEqual`, `hasCircularReference`, `isCircular`, `findKeyByValue`
- Grouping and aggregation: `groupByObject`, `aggregateProperties`, `pluckProperty`
- Utilities: `objectKeys`, `objectToArray`, `objectFromEntries`, `capitalize`
- Validation: `validateSchema`
- TypeScript-first with complete type definitions
- Comprehensive test coverage (>95%)

---

## Workflow

As you make changes, immediately add them to the **[Unreleased]** section:

1. Add item under appropriate category (Added/Changed/Fixed/Deprecated/Removed/Security)
2. When releasing, rename [Unreleased] to version number with date
3. Create new empty [Unreleased] section at the top
