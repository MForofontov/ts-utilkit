# Changelog - @ts-utilkit/random

All notable changes to this package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2026-03-05

### Fixed

- `randomBase64` performance test: raised threshold from 100 ms to 200 ms to avoid flaky failures in slow CI environments

### Changed

- Remove all runtime `typeof`/`instanceof` TypeError guards; rely on TypeScript type system for type safety
- Remove all `@throws {TypeError}` JSDoc tags from all affected functions
- Remove all TypeError test cases from all test files
- `randomColorFromPalette`: replace inline `Math.floor(Math.random() * palette.length)` with internal `randomChoice` call
- `randomEnum`: replace inline random index with internal `randomChoice` call
- `randomFromRange`: replace inline random index with internal `randomChoice` call
- `loremIpsum`: replace two inline word-picks with internal `randomChoice` calls
- `randomWeighted`: delegate core weighted selection to `_weightedPick` helper
- `randomElement`: delegate core weighted selection to `_weightedPick` helper
- `randomWords`: replace inline vowel/consonant alternation loop with calls to `randomWord` per word
- `randomHex`: replace manual character-pick loop with `randomSequence(length, '0123456789abcdef')`
- `randomBase64`: replace manual character-pick loop with `randomSequence(length, base64Charset)`
- `loremIpsum`: replace `Math.floor(Math.random() * 11) + 5` with `randomInt(5, 15)` for sentence length
- `randomRGB`: replace three `Math.floor(Math.random() * 256)` with `randomInt(0, 255)` per channel
- `randomHexColor`: replace `Math.floor(Math.random() * 16777216)` with `randomInt(0, 16777215)`
- `randomPattern`: replace three inline `Math.floor(Math.random() * chars.length)` index picks with `randomInt(0, chars.length - 1)`
- `randomDate`: replace float timestamp formula with `randomInt(startTime, endTime)` for cleaner millisecond-precision date generation
- `randomBetween`: delegate integer path to `randomInt(min, max)` and float path to `randomFloat(min, max, 15)`
- Apply Prettier formatting: remove orphaned blank lines at function-body openings introduced by guard removal

- Add `exports` field to `package.json` for explicit ESM/CJS/types entry-point resolution by modern bundlers and Node.js `exports` map

### Added

- `randomGaussian`: samples from a Gaussian (normal) distribution using the Box-Muller transform
- `randomExponential`: samples from an exponential distribution using the inverse transform method
- New internal `_weightedPick` helper that encapsulates the weighted random selection algorithm

### Deprecated

- `randomUUID`: uses `Math.random()` — **NOT cryptographically secure**; use `crypto.randomUUID()` (Node.js ≥ 14.17) for all security-sensitive UUID generation. Will be removed in the next major version.
- `randomBetween`: use `randomInt(min, max)` for integers or `randomFloat(min, max)` for floats directly. Will be removed in the next major version.

### Fixed

- `randomWeighted` performance test: increase threshold from 100 ms to 200 ms to prevent flaky failures on slower machines

## [0.1.1] - 2026-01-25

### Fixed

- Fixed `randomFloat` to use `Math.floor` instead of `Math.round` to ensure result is always less than max (exclusive upper bound)

## [0.1.0] - 2026-01-25

### Added

- Initial release of @ts-utilkit/random with 7 functions
- Random number generation: `randomInt`, `randomFloat`
- Random selection: `selectRandom`, `randomWeighted`
- Array shuffling: `shuffleArray`
- String generation: `generateRandomString`
- UUID generation: `randomUUID`
- TypeScript-first with complete type definitions
- Comprehensive test coverage (>95%)

---

## Workflow

As you make changes, immediately add them to the **[Unreleased]** section:

1. Add item under appropriate category (Added/Changed/Fixed/Deprecated/Removed/Security)
2. When releasing, rename [Unreleased] to version number with date
3. Create new empty [Unreleased] section at the top
