# Changelog - @ts-utilkit/serialization

All notable changes to this package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.3] - 2026-11-08

- Narrow internal YAML/XML/CSV serialization values to unknown while retaining public signatures and output behavior.
- Fix XML same-prefix and self-closing nested element handling; preserve special and repeated tag names as own data.
- Quote blank single-column/whitespace-delimited cells and carriage returns, preserving rows and blank headers through serialization round trips.
- Retain repeated atomic class instances instead of incorrectly replacing subsequent occurrences with a circular marker.
- Preserve quoted CSV newlines and CRLF rows; retain embedded query equals signs and prototype-like keys; use own-property path traversal and safe writes during serialization transforms.

### Changed

- Second-pass audit: re-verified circular-reference and type-preservation behavior; first-audit fixes confirmed.

## [0.2.1] - 2026-07-29

### Changed

- **Breaking for invalid input:** `deserializeFromXML` now throws on unclosed or malformed tags instead of returning partial objects.
- `exports` field: `types` condition listed first for better TypeScript resolution.

## [0.2.0] - 2026-03-05

### Changed

- Remove all runtime `typeof`/`instanceof` TypeError guards; rely on TypeScript type system for type safety
- Remove all `@throws {TypeError}` JSDoc tags from all affected functions
- Remove all TypeError test cases from all test files
- Apply Prettier formatting: remove orphaned blank lines at function-body openings introduced by guard removal

- Add `exports` field to `package.json` for explicit ESM/CJS/types entry-point resolution by modern bundlers and Node.js `exports` map

## [0.1.0] - 2026-01-26

### Added

- Initial release of @ts-utilkit/serialization with 3 functions
- JSON serialization: `serializeJSON`, `deserializeJSON`
- XML serialization: `serializeXML`
- TypeScript-first with complete type definitions
- Comprehensive test coverage (>95%)

---

## Workflow

As you make changes, immediately add them to the **[Unreleased]** section:

1. Add item under appropriate category (Added/Changed/Fixed/Deprecated/Removed/Security)
2. When releasing, rename [Unreleased] to version number with date
3. Create new empty [Unreleased] section at the top
