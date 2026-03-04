# Changelog - @ts-utilkit/network

All notable changes to this package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Remove all runtime `typeof`/`instanceof` TypeError guards; rely on TypeScript type system for type safety
- Remove all `@throws {TypeError}` JSDoc tags from all affected functions
- Remove all TypeError test cases from all test files
- Remove orphaned `// Input validation` section comments from 12 functions (`buildURL`, `decodeURLComponent`, `encodeURLComponent`, `getDomainParts`, `getURLsFromText`, `isLocalhost`, `isSubdomain`, `isValidURL`, `normalizeURL`, `removeQueryParams`, `sanitizeURL`) where the typeof guard was removed but the section comment was not
- `addQueryParams`: use `_parseURL` internal helper instead of inline `new URL()` try/catch
- `removeQueryParams`: use `_parseURL` internal helper instead of inline `new URL()` try/catch
- `getQueryParams`: use `_parseURL` internal helper instead of inline `new URL()` try/catch
- `getURLPath`: use `_parseURL` internal helper instead of inline `new URL()` try/catch
- `normalizeURL`: use `_parseURL` internal helper instead of inline `new URL()` try/catch
- `parseURL`: use `_parseURL` internal helper instead of inline `new URL()` try/catch
- `isSameOrigin`: use `_parseURL` internal helper instead of inline `new URL()` try/catch
- `extractDomain`: delegate to `getDomainParts` internally, removing ~55 lines of duplicated hostname-parsing logic

### Added

- `isAbsoluteURL`: checks whether a URL string has a scheme and can be parsed without a base URL
- `isRelativeURL`: checks whether a URL string is a valid relative reference (no scheme, requires a base)
- `hasQueryParam`: checks whether a specific query parameter key exists in a URL
- `setURLFragment`: sets or replaces the fragment of a URL and returns the updated URL string
- Internal `_parseURL` helper that consolidates repeated URL validation + parsing logic

## [0.1.0] - 2026-01-26

### Added

- Initial release of @ts-utilkit/network with 4 functions
- URL validation: `isValidURL`
- IP validation: `isValidIP` (supports both IPv4 and IPv6), `isPublicIP`
- URL parsing: `getURLParams`
- TypeScript-first with complete type definitions
- Comprehensive test coverage (>95%)

---

## Workflow

As you make changes, immediately add them to the **[Unreleased]** section:

1. Add item under appropriate category (Added/Changed/Fixed/Deprecated/Removed/Security)
2. When releasing, rename [Unreleased] to version number with date
3. Create new empty [Unreleased] section at the top
