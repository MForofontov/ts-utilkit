# Changelog - @ts-utilkit/string

All notable changes to this package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- `countCharacterOccurrences`: replace inline regex-escape pattern with `escapeRegex` from the same package
- `countSubstring`: replace inline regex-escape pattern with `escapeRegex` from the same package
- `replaceMultiple`: replace inline regex-escape pattern with `escapeRegex` from the same package
- `generateRandomAlphanumeric`: delegate character generation to `randomSequence` from `@ts-utilkit/random`

### Deprecated
- `generateRandomAlphanumeric`: use `randomSequence` from `@ts-utilkit/random` directly with the alphanumeric charset. Will be removed in the next major version.

### Added
- Add `@ts-utilkit/random` as a declared package dependency

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
