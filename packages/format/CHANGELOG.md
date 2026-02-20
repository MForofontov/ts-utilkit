# Changelog - @ts-utilkit/format

All notable changes to this package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- `formatBytes`: new optional `iecUnits` parameter (default: `false`); when `true` with `binary=true`, uses IEC unit labels (KiB, MiB, GiB) instead of SI labels (KB, MB, GB)

## [0.1.0] - 2026-01-26

### Added
- Initial release of @ts-utilkit/format with 21 functions
- Number formatting: `formatNumber`, `formatCurrency`, `formatPercent`, `formatOrdinal`
- Size formatting: `formatBytes`, `formatFileSize`
- Time formatting: `formatDuration`, `formatTime`, `formatRelativeTime`
- Text formatting: `capitalizeWords`, `convertCase`, `toCamelCase`, `toKebabCase`, `toTitleCase`, `pluralize`
- Specialized formatting: `formatPhoneNumber`, `formatZipCode`, `formatList`, `formatJSON`
- HTML utilities: `sanitizeHTML`, `highlightText`
- TypeScript-first with complete type definitions
- Comprehensive test coverage (>95%)

---

## Workflow

As you make changes, immediately add them to the **[Unreleased]** section:
1. Add item under appropriate category (Added/Changed/Fixed/Deprecated/Removed/Security)
2. When releasing, rename [Unreleased] to version number with date
3. Create new empty [Unreleased] section at the top
