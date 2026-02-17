# Changelog - @ts-utilkit/env

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

## [0.1.0] - 2026-02-17

### Added
- Initial release of @ts-utilkit/env with 7 environment variable utilities
- Environment variable retrieval: `getEnv`, `requireEnv`
- Type-safe parsing: `parseEnvInt`, `parseEnvBool`, `parseEnvFloat`
- Complex type parsing: `parseEnvArray`, `parseEnvJSON`
- Migrated from @ts-utilkit/configuration package (better separation of concerns)
- TypeScript-first with complete type definitions
- Comprehensive test coverage (>95%)

---

## Workflow

As you make changes, immediately add them to the **[Unreleased]** section:
1. Add item under appropriate category (Added/Changed/Fixed/Deprecated/Removed/Security)
2. When releasing, rename [Unreleased] to version number with date
3. Create new empty [Unreleased] section at the top
