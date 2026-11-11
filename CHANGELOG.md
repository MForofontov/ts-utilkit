# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Show the verified npm versions in all package READMEs and the root overview; check version links, changelog headers, export counts, and runnable README examples in `audit:docs`.
- Correct root README examples, module-output and validation descriptions, navigation links, and contributor guidance.

## Workspace package releases - 2026-11-08

Published all 23 independently versioned `@ts-utilkit/*` packages. See each package's changelog for its release version; the root development workspace remains 0.1.0.

### Added

- `arrayDifferenceBy`, `arrayIntersectionBy`, and `fromAsyncThrowable`, with public exports, examples, boundary tests, and packed-consumer checks.
- Reproducible array membership benchmarks via `npm run benchmark:array-membership`.

### Fixed

- Avoid finite intermediate overflow in interpolation/range mapping and non-advancing loops in stepped random ranges.
- Preserve finite weighted-selection ratios at numeric extremes and exclude zero-weight entries from the floating-point fallback.
- Include missing own keys in object `differenceBy`, including undefined values, without reading inherited comparison values.
- Prevent `generateRange` from looping when floating-point steps stop advancing; reject non-finite endpoints.

### Changed

- Optimize larger primitive array difference/intersection comparisons while retaining deep-equality and accessor fallbacks.
- Select Node 24 in `.nvmrc`, retaining Node 20+ support; narrow internal serialization, validation, and regex types without changing public signatures.
- Remove legacy blanket TypeError guards and obsolete tests from existing functions; retain documented per-function runtime checks and explicit validation in new APIs.
- `deepFreeze`: add `T extends object` generic constraint to maintain TypeScript compatibility after guard removal
- `deepMerge`: add explicit cast in `merge()` call to maintain TypeScript compatibility
- `combinePatterns`: change else-branch from `throw new TypeError(...)` to `continue` (silently skip non-string/non-RegExp patterns)

## [0.1.0] - 2026-01-26

### Added

- Initial release of ts-utilkit
- **Array Functions**: 30+ utilities for array manipulation (chunk, difference, flatten, unique, etc.)
- **Async Functions**: Promise utilities (retry, timeout, series, parallel, filter, map)
- **Crypto Functions**: Comprehensive cryptographic utilities using Node.js crypto module
  - Hashing: SHA-256, SHA-512, MD5 (legacy), PBKDF2 password hashing
  - Encryption: AES-256-GCM encryption/decryption
  - HMAC: Generation and timing-safe verification
  - Utilities: Salt generation, random bytes, timing-safe hash comparison
- **Date Functions**: Date manipulation and formatting utilities
- **Encoding Functions**: Base64 encoding/decoding
- **Event Functions**: Event handling utilities
  - EventEmitter class with full event management
  - Timing control (debounce, throttle)
  - Event bus (publish-subscribe pattern)
  - Event utilities (waitForEvent, onceEvent, delegateEvent)
- **Format Functions**: String and data formatting utilities
- **Math Functions**: 100+ mathematical operations organized by subdomain
  - Arithmetic, Algebra, Geometry, Statistics
  - Number Theory, Combinatorics, Sequences
- **Network Functions**: Network validation utilities
- **Object Functions**: Object manipulation (deepMerge, safeGet, groupBy, etc.)
- **Parsing Functions**: Data parsing utilities
- **Random Functions**: Random value generation utilities
- **Regex Functions**: Regular expression utilities
- **Serialization Functions**: Data serialization/deserialization
- **String Functions**: String processing (slugify, capitalize, truncate, etc.)
- **Testing Utilities**: Helper functions for testing
- **Utility Functions**: General-purpose utilities (debounce, throttle, color conversion)
- **Validation Functions**: Specialized validators (IPv4, IPv6, MAC, UUID, ISO date, JSON, time, pattern, range)
- **Web Scraping Functions**: Web scraping utilities
- Comprehensive test suite with >98% code coverage (3,487 tests across 267 suites)
- TypeScript declaration files for full type safety
- ESLint and Prettier configuration for code quality
- Jest testing with Allure reporting
- MIT License
- Monorepo structure with workspace packages

[Unreleased]: https://github.com/MForofontov/ts-utilkit/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/MForofontov/ts-utilkit/releases/tag/v0.1.0
