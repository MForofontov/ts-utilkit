# Changelog - @ts-utilkit/string

All notable changes to this package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2026-03-05

### Changed

- Remove all runtime `typeof`/`instanceof` type guards from all string functions; TypeScript type system is the contract — no runtime type checking for a TS-first library
- Remove all corresponding `@throws {TypeError}` JSDoc tags from all affected functions
- Remove all TypeError test cases from all string package test files
- Remove NaN-specific `Error` guards from `truncateString`, `wrapText`, `truncateWords`, and `maskString` (merged into existing value-range checks or removed); update/remove corresponding tests
- `countCharacterOccurrences`: replace inline regex-escape pattern with `escapeRegex` from the same package
- `countSubstring`: replace inline regex-escape pattern with `escapeRegex` from the same package
- `replaceMultiple`: replace inline regex-escape pattern with `escapeRegex` from the same package
- `generateRandomAlphanumeric`: delegate character generation to `randomSequence` from `@ts-utilkit/random`
- Apply Prettier formatting: remove orphaned blank lines at function-body openings introduced by guard removal

- Add `exports` field to `package.json` for explicit ESM/CJS/types entry-point resolution by modern bundlers and Node.js `exports` map
- Pin `@ts-utilkit/random` dependency from `*` to `^0.2.0`

### Deprecated

- `startsWith`: pure native wrapper over `String.prototype.startsWith()` — use native method directly
- `endsWith`: pure native wrapper over `String.prototype.endsWith()` — use native method directly
- `indexOfSubstring`: pure native wrapper over `String.prototype.indexOf()` — use native method directly
- `lastIndexOfSubstring`: pure native wrapper over `String.prototype.lastIndexOf()` — use native method directly
- `splitString`: pure native wrapper over `String.prototype.split()` — use native method directly
- `toLowerCase`: pure native wrapper over `String.prototype.toLowerCase()` — use native method directly
- `toUpperCase`: pure native wrapper over `String.prototype.toUpperCase()` — use native method directly
- `repeatString`: pure native wrapper over `String.prototype.repeat()` — use native method directly
- `replaceFirst`: thin wrapper over `String.prototype.replace()` with no meaningful added logic
- `replaceSubstring`: thin wrapper over `str.split(s).join(r)` with no meaningful added logic
- `generateRandomAlphanumeric`: use `randomSequence` from `@ts-utilkit/random` directly with the alphanumeric charset. Will be removed in the next major version.

### Added

- Add `@ts-utilkit/random` as a declared package dependency
- Add `toCamelCase` function to convert strings to camelCase (handles space, kebab, snake, PascalCase, and mixed-delimiter inputs)
- Add `toPascalCase` function to convert strings to PascalCase (handles space, kebab, snake, camelCase, and mixed-delimiter inputs)
- Add `maskString` function to mask a range of characters in a string with a configurable mask character (useful for credit cards, passwords, PII)
- Add `wrapText` function to word-wrap a string at a specified maximum line width, inserting newlines at word boundaries
- Add `normalizeWhitespace` function to trim leading/trailing whitespace and collapse internal whitespace runs to a single space
- Add `removeAccents` function to strip diacritical marks from characters using Unicode NFD normalisation (preserves structure unlike `slugify`)
- Add `truncateWords` function to truncate a string to a specified number of whole words with a configurable suffix (complements `truncateString` which cuts at character count)
- Add `extractNumbers` function to extract all integer and decimal numbers (including negatives) from a string as an array of JavaScript numbers

## [0.1.0] - 2026-01-26

### Added

- Initial release of @ts-utilkit/string with 46 functions
- Case conversion: `capitalizeFirstLetter`, `titleCase`, `toLowerCase`, `toUpperCase`, `toSnakeCase`, `camelize`, `swapCase`
- String manipulation: `trim`, `trimStart`, `trimEnd`, `padStart`, `padEnd`, `leftPad`, `rightPad`, `repeatString`, `reverseString`
- String cleaning: `removeWhitespace`, `removeHTMLTags`, `removeNonAlphanumeric`, `removeDiacritics`, `normalizeWhitespace`, `stripQuotes`
- String truncation: `truncate`, `truncateWords`, `splitByLength`
- String formatting: `slugify`, `wrapText`, `unwrap`
- String validation: `isPalindrome`, `isAlphanumeric`, `isBlank`, `isLowerCase`, `isUpperCase`, `containsSubstring`, `containsIgnoreCase`, `startsWith`
- String extraction: `extractNumbers`, `extractDomain`, `extractEmailsFromText`, `extractHashtags`, `extractMentions`
- String analysis: `countWords`, `wordCount`, `countOccurrencesString`, `toWords`
- String replacement: `replaceAll`
- TypeScript-first with complete type definitions
- Comprehensive test coverage (>95%)

---

## Workflow

As you make changes, immediately add them to the **[Unreleased]** section:

1. Add item under appropriate category (Added/Changed/Fixed/Deprecated/Removed/Security)
2. When releasing, rename [Unreleased] to version number with date
3. Create new empty [Unreleased] section at the top
