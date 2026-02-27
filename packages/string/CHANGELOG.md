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
