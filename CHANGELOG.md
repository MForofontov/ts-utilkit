# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Remove all runtime `typeof`/`instanceof` TypeError guards from ALL packages (array, async, collection, crypto, date, encoding, env, event, format, math, network, object, parsing, random, regex, serialization, string, testing-utilities, utility, validation, webscraping); TypeScript is the contract for this TS-first library
- Remove all `@throws {TypeError}` JSDoc tags from all affected functions across all packages
- Remove all TypeError test cases from all package test files (~346 test files modified)
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
