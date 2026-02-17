# Changelog - @ts-utilkit/object

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
