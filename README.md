# ts-utilkit

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)](https://jestjs.io/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

A collection of **TypeScript utility functions** organized into specialized packages. Built with type safety and comprehensive testing in mind.

> ⚠️ **Production Notice**: While this library has extensive test coverage (>95%), not all functions have been battle-tested in production environments. Use at your own discretion and thoroughly test in your specific use case before deploying to production.

## ✨ Features

- 🎯 **516 Runtime Exports**: Utilities across array, async, crypto, date, math, object, string, result, path, and more
- 🔒 **Type Safe**: Full TypeScript support with strict type checking
- 📝 **Well Documented**: JSDoc comments with examples and complexity notes
- 🧪 **Extensively Tested**: ~550 Jest test files with high code coverage
- 📦 **Tree Shakeable**: Import only what you need from scoped packages
- 🛡️ **Input Validation**: Descriptive errors where runtime checks apply
- ⚖️ **MIT Licensed**: Free for personal and commercial use

## 📚 Table of Contents

- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Packages Overview](#-packages-overview)
- [Function Summary](#-function-summary)
- [Usage Examples](#-usage-examples)
- [API Documentation](#-api-documentation)
- [Development](#-development)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Installation

This library requires **Node.js 20 or later** and supports modern TypeScript environments.

### Package Manager

Install the scoped packages you need (each is published independently):

```bash
# npm
npm install @ts-utilkit/array @ts-utilkit/object @ts-utilkit/string

# yarn
yarn add @ts-utilkit/array @ts-utilkit/object @ts-utilkit/string

# pnpm
pnpm add @ts-utilkit/array @ts-utilkit/object @ts-utilkit/string

# bun
bun add @ts-utilkit/array @ts-utilkit/object @ts-utilkit/string
```

### TypeScript Configuration

Ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "target": "ES2023",
    "strict": true,
    "moduleResolution": "node"
  }
}
```

## ⚡ Quick Start

Import from scoped packages to limit dependencies:

```typescript
import { chunkArray } from '@ts-utilkit/array';
import { deepMerge } from '@ts-utilkit/object';
import { slugify } from '@ts-utilkit/string';

// Array operations
const chunks = chunkArray([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

// Object manipulation
const merged = deepMerge({ a: 1 }, { b: 2 }); // { a: 1, b: 2 }

// String utilities
const slug = slugify('Hello World!'); // 'hello-world'
```

## Packages Overview

This library provides utility functions organized into **23 specialized packages**. Each package is independently installable and ships TypeScript declarations.

| Package                           | Description                                                 | Documentation                                            |
| --------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------- |
| **@ts-utilkit/array**             | Array manipulation, chunking, flattening, grouping, sorting | [View Functions →](packages/array/README.md)             |
| **@ts-utilkit/async**             | Retry logic, timeouts, parallel/series execution            | [View Functions →](packages/async/README.md)             |
| **@ts-utilkit/collection**        | Set and Map operations, conversions                         | [View Functions →](packages/collection/README.md)        |
| **@ts-utilkit/crypto**            | Hashing (SHA, MD5), encryption (AES), HMAC                  | [View Functions →](packages/crypto/README.md)            |
| **@ts-utilkit/date**              | Date arithmetic, formatting, business days                  | [View Functions →](packages/date/README.md)              |
| **@ts-utilkit/encoding**          | Base64 / Base64URL / hex / Base32                           | [View Functions →](packages/encoding/README.md)          |
| **@ts-utilkit/env**               | Environment variables and config parsing                    | [View Functions →](packages/env/README.md)               |
| **@ts-utilkit/event**             | Event emitters, debouncing, throttling                      | [View Functions →](packages/event/README.md)             |
| **@ts-utilkit/format**            | Number, currency, byte, duration formatting                 | [View Functions →](packages/format/README.md)            |
| **@ts-utilkit/math**              | Arithmetic, algebra, geometry, statistics                   | [View Functions →](packages/math/README.md)              |
| **@ts-utilkit/network**           | URL parsing, query params, domain extraction                | [View Functions →](packages/network/README.md)           |
| **@ts-utilkit/object**            | Deep merge/clone, flattening, key transformations           | [View Functions →](packages/object/README.md)            |
| **@ts-utilkit/parsing**           | CSV, INI, log, env file parsing                             | [View Functions →](packages/parsing/README.md)           |
| **@ts-utilkit/path**              | POSIX path join, normalize, basename, extensions            | [View Functions →](packages/path/README.md)              |
| **@ts-utilkit/random**            | Random generation (numbers, strings, colors, UUIDs)         | [View Functions →](packages/random/README.md)            |
| **@ts-utilkit/regex**             | Pattern building, matching, common patterns                 | [View Functions →](packages/regex/README.md)             |
| **@ts-utilkit/result**            | Ok/Err Result type, map, match, fromThrowable               | [View Functions →](packages/result/README.md)            |
| **@ts-utilkit/serialization**     | JSON, CSV, XML, YAML, binary serialization                  | [View Functions →](packages/serialization/README.md)     |
| **@ts-utilkit/string**            | Case conversion, slugs, validation, manipulation            | [View Functions →](packages/string/README.md)            |
| **@ts-utilkit/testing-utilities** | Test data generation, assertions, spies                     | [View Functions →](packages/testing-utilities/README.md) |
| **@ts-utilkit/utility**           | Debounce, throttle, color conversion, delays                | [View Functions →](packages/utility/README.md)           |
| **@ts-utilkit/validation**        | IP, UUID, JSON, credit card validation                      | [View Functions →](packages/validation/README.md)        |
| **@ts-utilkit/webscraping**       | HTML parsing, link/email extraction                         | [View Functions →](packages/webscraping/README.md)       |

> Tip: Click on "View Functions →" links to see the complete function list for each package with detailed usage examples. See [KNOWN_ISSUES.md](KNOWN_ISSUES.md) for documented limitations.

## 📊 Function Summary

There are **516 public runtime exports** across 23 packages, including functions,
classes, and constants. Type-only exports are excluded. Reproduce the inventory
with `npm run audit:exports`.

| Package               | Runtime exports | Examples                                                                                                               |
| --------------------- | --------------: | ---------------------------------------------------------------------------------------------------------------------- |
| **array**             |              35 | `arrayDifference`, `arrayIntersection`, `cartesianProduct`, `chunkArray`, `countBy`                                    |
| **async**             |              13 | `asyncBatch`, `asyncDeduplication`, `asyncFilter`, `asyncMap`, `asyncMapSettled`                                       |
| **collection**        |              19 | `arrayToSet`, `createCounterMap`, `createMultiMap`, `isDisjoint`, `isSubset`                                           |
| **crypto**            |              11 | `compareHash`, `decryptAES256`, `encryptAES256`, `generateHMAC`, `generateRandomBytes`                                 |
| **date**              |              51 | `addDays`, `addBusinessDays`, `addHours`, `addMinutes`, `addMonths`                                                    |
| **encoding**          |               8 | `decodeBase32`, `decodeBase64`, `decodeBase64URL`, `decodeHex`, `encodeBase32`                                         |
| **env**               |              11 | `getEnv`, `hasEnv`, `requireEnv`, `requireEnvAll`, `parseEnvArray`                                                     |
| **event**             |               7 | `EventEmitter`, `createEventBus`, `debounceEvent`, `delegateEvent`, `onceEvent`                                        |
| **format**            |              11 | `formatBytes`, `formatCurrency`, `formatDuration`, `formatList`, `formatNumber`                                        |
| **math**              |              65 | `calculateCubeRoot`, `calculateLogarithm`, `calculateSquareRoot`, `calculatePercentage`, `ceilValue`                   |
| **network**           |              22 | `addQueryParams`, `buildURL`, `decodeURLComponent`, `encodeURLComponent`, `extractDomain`                              |
| **object**            |              44 | `applyDefaults`, `compactObject`, `countProperties`, `deepClone`, `deepCloneWith`                                      |
| **parsing**           |               8 | `parseCSVLine`, `parseDataSize`, `parseDuration`, `parseEnvFile`, `parseHTTPHeaders`                                   |
| **path**              |              10 | `joinPath`, `normalizePath`, `basename`, `dirname`, `extname`                                                          |
| **random**            |              27 | `loremIpsum`, `randomBase64`, `randomBetween`, `randomBoolean`, `randomChoice`                                         |
| **regex**             |              18 | `buildPattern`, `PatternBuilder`, `combinePatterns`, `getCommonPattern`, `testCommonPattern`                           |
| **result**            |              13 | `ok`, `err`, `isOk`, `isErr`, `map`                                                                                    |
| **serialization**     |              18 | `cloneViaSerialization`, `deserializeFromBinary`, `deserializeFromBuffer`, `deserializeFromCSV`, `deserializeFromJSON` |
| **string**            |              59 | `areAnagrams`, `capitalizeEachWord`, `capitalizeFirstLetter`, `capitalizeNthLetter`, `countCharacterOccurrences`       |
| **testing-utilities** |              21 | `assertArraysEqual`, `cloneTestData`, `createSpy`, `generateRandomBoolean`, `generateRandomDate`                       |
| **utility**           |              15 | `bytesToSize`, `compose`, `debounce`, `debounceAsync`, `delay`                                                         |
| **validation**        |              14 | `isInRange`, `isValidCreditCard`, `isValidHexColor`, `isValidIPv4`, `isValidIPv6`                                      |
| **webscraping**       |              16 | `extractComments`, `extractEmails`, `extractHeaders`, `extractImages`, `extractLinks`                                  |

See [KNOWN_ISSUES.md](KNOWN_ISSUES.md) for limitations,
[AUDIT.md](AUDIT.md) for validation results, and
[FUNCTION_IDEAS.md](FUNCTION_IDEAS.md) for the eleven added functions.

## 💡 Usage Examples

### Array Operations

```typescript
import {
  chunkArray,
  findDuplicates,
  cartesianProduct,
} from '@ts-utilkit/array';

// Split array into chunks
const data = [1, 2, 3, 4, 5, 6, 7, 8];
const chunks = chunkArray(data, 3); // [[1, 2, 3], [4, 5, 6], [7, 8]]

// Find duplicates with custom equality
const items = [{ id: 1 }, { id: 2 }, { id: 1 }];
const duplicates = findDuplicates(items, (a, b) => a.id === b.id);

// Generate cartesian product
const colors = ['red', 'blue'];
const sizes = ['small', 'large'];
const combinations = cartesianProduct(colors, sizes);
// [['red', 'small'], ['red', 'large'], ['blue', 'small'], ['blue', 'large']]
```

### Async Operations

```typescript
import { asyncRetry, asyncTimeout, asyncMap } from '@ts-utilkit/async';

// Retry with exponential backoff
const result = await asyncRetry(() => fetch('/api/data'), {
  retries: 3,
  delay: 1000,
  backoff: 'exponential',
});

// Add timeout to promise
const dataWithTimeout = await asyncTimeout(
  fetch('/api/slow-endpoint'),
  5000, // 5 second timeout
);

// Async map with concurrency control
const urls = ['url1', 'url2', 'url3'];
const responses = await asyncMap(urls, async (url) => {
  return await fetch(url);
});
```

### Object Manipulation

```typescript
import { deepMerge, safeGet, flattenObject } from '@ts-utilkit/object';

// Deep merge with conflict resolution
const config = deepMerge(
  { api: { timeout: 5000 }, features: { auth: true } },
  { api: { retries: 3 }, features: { logging: true } },
);
// Result: { api: { timeout: 5000, retries: 3 }, features: { auth: true, logging: true } }

// Safe property access
const user = { profile: { name: 'John' } };
const name = safeGet(user, 'profile.name', 'Anonymous'); // 'John'
const email = safeGet(user, 'profile.email', 'no-email'); // 'no-email'

// Flatten nested objects
const nested = { a: { b: { c: 1 } }, d: 2 };
const flattened = flattenObject(nested); // { 'a.b.c': 1, 'd': 2 }
```

### Mathematical Operations

```typescript
import {
  calculateStandardDeviation,
  calculateHaversineDistance,
  isPrime,
} from '@ts-utilkit/math';

// Statistical calculations
const data = [2, 4, 4, 4, 5, 5, 7, 9];
const stdDev = calculateStandardDeviation(data); // ~2.138

// Geographic distance calculation
const distance = calculateHaversineDistance(
  { lat: 40.7128, lng: -74.006 }, // New York
  { lat: 34.0522, lng: -118.2437 }, // Los Angeles
); // ~3944.42 km

// Number theory
const primeCheck = isPrime(97); // true
```

### String Processing

```typescript
import { slugify, isPalindrome } from '@ts-utilkit/string';
import { extractDomain } from '@ts-utilkit/network';

// URL-friendly slugs
const slug = slugify('Hello World! 123'); // 'hello-world-123'

// Domain extraction
const domain = extractDomain('https://api.example.com/v1/users'); // 'example.com'

// Palindrome detection
const isPalin = isPalindrome('A man a plan a canal Panama'); // true
```

### Validation

```typescript
import {
  isValidIPv4,
  isValidUUID,
  isValidMACAddress,
} from '@ts-utilkit/validation';

// Network validation
const isValidIP = isValidIPv4('192.168.1.1'); // true
const isValidId = isValidUUID('550e8400-e29b-41d4-a716-446655440000'); // true
const isValidMAC = isValidMACAddress('00:1B:44:11:3A:B7'); // true
```

## 📖 API Documentation

### Function Signatures

All functions follow consistent patterns with comprehensive type safety:

```typescript
/**
 * Brief description of what the function does.
 *
 * @param param1 - Description of parameter 1.
 * @param param2 - Description of parameter 2.
 * @returns Description of return value.
 *
 * @throws {TypeError} If parameters are of wrong type.
 * @throws {Error} If parameters have invalid values.
 *
 * @example
 * functionName(42, "hello"); // Expected output
 *
 * @complexity Time: O(n), Space: O(1)
 */
export function functionName(param1: number, param2: string): ReturnType;
```

### Error Handling

All functions provide comprehensive input validation:

- **Type Validation**: Checks parameter types with descriptive error messages
- **Value Validation**: Validates ranges, constraints, and business logic
- **NaN Handling**: Explicit NaN checks for numeric inputs
- **Null Safety**: Proper null/undefined handling

```typescript
// Example error messages
throw new TypeError('param must be a number, got string');
throw new Error('array cannot be empty');
throw new Error('timeout must be non-negative, got -1');
```

## 🛠️ Development

**Requirements**: Node.js 20+, TypeScript

```bash
npm install
npm run build
npm test
```

**Test Coverage**: >95% across all functions

## 📄 License

MIT License - Copyright (c) 2026 Mykyta Forofontov

## 👨‍💻 Author

[Mykyta Forofontov](https://github.com/MForofontov)

---

**408 functions** • **>95% coverage** • **TypeScript-first** • **Zero dependencies**
