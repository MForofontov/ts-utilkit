# Changelog - @ts-utilkit/encoding

All notable changes to this package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Remove all runtime `typeof`/`instanceof` TypeError guards; rely on TypeScript type system for type safety
- Remove all `@throws {TypeError}` JSDoc tags from all affected functions
- Remove all TypeError test cases from all test files


### Added
- New function `encodeBase64URL` for URL-safe Base64 encoding (RFC 4648 §5) without padding — used in JWTs and OAuth tokens
- New function `decodeBase64URL` for decoding URL-safe Base64 strings with strict alphabet validation
- New function `encodeHex` for encoding UTF-8 strings as lowercase hexadecimal
- New function `decodeHex` for decoding hexadecimal strings back to UTF-8, with length and character validation
- New function `encodeBase32` for RFC 4648 Base32 encoding — the standard format for TOTP/2FA shared secrets
- New function `decodeBase32` for decoding Base32 strings, case-insensitive with optional padding support

### Fixed
- `encodeBase64`: was incorrectly producing URL-safe base64 (`-`, `_`, no `=` padding) — now correctly produces standard RFC 4648 §4 base64 (`+`, `/`, `=` padding preserved). URL-safe output remains available via the dedicated `encodeBase64URL` function.

## [0.1.0] - 2026-01-26

### Added
- Initial release of @ts-utilkit/encoding with 2 functions
- Base64 encoding: `encodeBase64`
- Base64 decoding: `decodeBase64`
- TypeScript-first with complete type definitions
- Comprehensive test coverage (>95%)

---

## Workflow

As you make changes, immediately add them to the **[Unreleased]** section:
1. Add item under appropriate category (Added/Changed/Fixed/Deprecated/Removed/Security)
2. When releasing, rename [Unreleased] to version number with date
3. Create new empty [Unreleased] section at the top
