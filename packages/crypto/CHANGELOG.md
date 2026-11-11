# Changelog - @ts-utilkit/crypto

All notable changes to this package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.1] - 2026-07-29

### Changed

- `hashPassword` docs: verification example now uses timing-safe comparison instead of `===`.
- `exports` field: `types` condition listed first for better TypeScript resolution.

## [0.3.0] - 2026-07-29

### Changed

- **Breaking:** `encryptAES256` / `decryptAES256` now use a per-encryption random scrypt salt. Ciphertext format is `salt:iv:authTag:ciphertext` (base64). Legacy 3-part payloads (`iv:authTag:ciphertext` with fixed salt `'salt'`) are rejected and must be re-encrypted.

## [0.2.0] - 2026-03-05

### Changed

- Remove all runtime `typeof`/`instanceof` TypeError guards; rely on TypeScript type system for type safety
- Remove all `@throws {TypeError}` JSDoc tags from all affected functions
- Remove all TypeError test cases from all test files

- Add `exports` field to `package.json` for explicit ESM/CJS/types entry-point resolution by modern bundlers and Node.js `exports` map
## [0.1.0] - 2026-01-26

### Added

- Initial release of @ts-utilkit/crypto with 11 functions
- Hashing algorithms: `hashSHA256`, `hashSHA512`, `hashMD5` (legacy only)
- Password security: `hashPassword` with PBKDF2
- Encryption: `encryptAES256`, `decryptAES256` with AES-256-GCM
- HMAC operations: `generateHMAC`, `verifyHMAC` with timing-safe verification
- Utilities: `generateSalt`, `generateRandomBytes`, `compareHash` with timing-safe comparison
- All cryptographic operations use Node.js built-in crypto module
- Timing-attack resistance for sensitive comparisons
- Comprehensive security documentation

---

## Workflow

As you make changes, immediately add them to the **[Unreleased]** section:

1. Add item under appropriate category (Added/Changed/Fixed/Deprecated/Removed/Security)
2. When releasing, rename [Unreleased] to version number with date
3. Create new empty [Unreleased] section at the top
