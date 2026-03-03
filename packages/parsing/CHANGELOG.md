# Changelog - @ts-utilkit/parsing

All notable changes to this package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Remove all runtime `typeof`/`instanceof` TypeError guards; rely on TypeScript type system for type safety
- Remove all `@throws {TypeError}` JSDoc tags from all affected functions
- Remove all TypeError test cases from all test files


### Added
- `parseHTTPHeaders`: parses a raw HTTP header block into a lower-cased key-value record

## [0.1.0] - 2026-01-26

### Added
- Initial release of @ts-utilkit/parsing with 9 functions
- Data parsing: `parseJSON`, `parseCSV`, `parseXML`, `parseQueryString`, `parseFormData`
- Type parsing: `parseBoolean`
- URL parsing: `parseURL`, `parseUserAgent`
- Regex utilities: `extractMatchGroups`
- TypeScript-first with complete type definitions
- Comprehensive test coverage (>95%)

---

## Workflow

As you make changes, immediately add them to the **[Unreleased]** section:
1. Add item under appropriate category (Added/Changed/Fixed/Deprecated/Removed/Security)
2. When releasing, rename [Unreleased] to version number with date
3. Create new empty [Unreleased] section at the top
