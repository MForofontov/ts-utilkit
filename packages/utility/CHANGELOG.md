# Changelog - @ts-utilkit/utility

All notable changes to this package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Declare `@ts-utilkit/format` as an explicit package dependency

### Changed
- `bytesToSize`: delegate implementation to `formatBytes` from `@ts-utilkit/format`; behaviour unchanged (IEC units in binary mode, 2 decimal places)
- `bytesToSize`: marked `@deprecated` — use `formatBytes` from `@ts-utilkit/format` directly; will be removed in the next major version

## [0.1.1] - 2026-01-26

### Added
- Initial release of @ts-utilkit/utility with 10 functions
- Function timing control: `debounce`, `throttle`, `once`
- Number utilities: `clamp`
- Color conversion: `hexToRgb`, `rgbToHex`
- Type checking: `isNil`
- UUID generation: `uuid`
- Random utilities: `randomBoolean`
- No-op function: `noop`
- TypeScript-first with complete type definitions
- Comprehensive test coverage (>95%)

---

## Workflow

As you make changes, immediately add them to the **[Unreleased]** section:
1. Add item under appropriate category (Added/Changed/Fixed/Deprecated/Removed/Security)
2. When releasing, rename [Unreleased] to version number with date
3. Create new empty [Unreleased] section at the top
