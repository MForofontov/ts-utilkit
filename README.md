# ts-utilkit

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)](https://jestjs.io/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

A collection of **408 TypeScript utility functions** organized into specialized modules. Built with type safety and comprehensive testing in mind.

> ⚠️ **Production Notice**: While this library has extensive test coverage (>98%), not all functions have been battle-tested in production environments. Use at your own discretion and thoroughly test in your specific use case before deploying to production.

## ✨ Features

- 🎯 **408 Functions**: Utilities across array, async, crypto, date, math, object, string, and more
- 🔒 **Type Safe**: Full TypeScript support with strict type checking
- 📝 **Well Documented**: JSDoc comments with examples and complexity notes
- 🧪 **Extensively Tested**: 5,675 unit tests with >98% code coverage
- 📦 **Tree Shakeable**: Import only what you need
- 🛡️ **Input Validation**: Comprehensive error handling with descriptive messages
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

```bash
# npm
npm install ts-utilkit

# yarn
yarn add ts-utilkit

# pnpm
pnpm add ts-utilkit

# bun
bun add ts-utilkit
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

Import functions individually for optimal tree-shaking:

```typescript
import { chunkArray, deepMerge, slugify } from 'ts-utilkit';

// Array operations
const chunks = chunkArray([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

// Object manipulation
const merged = deepMerge({ a: 1 }, { b: 2 }); // { a: 1, b: 2 }

// String utilities
const slug = slugify('Hello World!'); // 'hello-world'
```

## � Packages Overview

This library provides **408 utility functions** organized into **21 specialized packages**. Each package is independently installable and fully tree-shakeable.

| Package | Functions | Description | Documentation |
|---------|-----------|-------------|---------------|
| **@ts-utilkit/array** | 26 | Array manipulation, chunking, flattening, grouping, sorting | [View Functions →](packages/array/README.md) |
| **@ts-utilkit/async** | 6 | Retry logic, timeouts, parallel/series execution | [View Functions →](packages/async/README.md) |
| **@ts-utilkit/collection** | 17 | Set and Map operations, conversions | [View Functions →](packages/collection/README.md) |
| **@ts-utilkit/configuration** | 12 | Environment variables, config management | [View Functions →](packages/configuration/README.md) |
| **@ts-utilkit/crypto** | 11 | Hashing (SHA, MD5), encryption (AES), HMAC | [View Functions →](packages/crypto/README.md) |
| **@ts-utilkit/date** | 31 | Date arithmetic, formatting, business days | [View Functions →](packages/date/README.md) |
| **@ts-utilkit/encoding** | 2 | Base64 encoding/decoding | [View Functions →](packages/encoding/README.md) |
| **@ts-utilkit/event** | 7 | Event emitters, debouncing, throttling | [View Functions →](packages/event/README.md) |
| **@ts-utilkit/format** | 8 | Number, currency, byte, duration formatting | [View Functions →](packages/format/README.md) |
| **@ts-utilkit/math** | 56 | Arithmetic, algebra, geometry, statistics | [View Functions →](packages/math/README.md) |
| **@ts-utilkit/network** | 18 | URL parsing, query params, domain extraction | [View Functions →](packages/network/README.md) |
| **@ts-utilkit/object** | 39 | Deep merge/clone, flattening, key transformations | [View Functions →](packages/object/README.md) |
| **@ts-utilkit/parsing** | 7 | CSV, INI, log, env file parsing | [View Functions →](packages/parsing/README.md) |
| **@ts-utilkit/random** | 25 | Random generation (numbers, strings, colors, UUIDs) | [View Functions →](packages/random/README.md) |
| **@ts-utilkit/regex** | 15 | Pattern building, matching, common patterns | [View Functions →](packages/regex/README.md) |
| **@ts-utilkit/serialization** | 18 | JSON, CSV, XML, YAML, binary serialization | [View Functions →](packages/serialization/README.md) |
| **@ts-utilkit/string** | 51 | Case conversion, slugs, validation, manipulation | [View Functions →](packages/string/README.md) |
| **@ts-utilkit/testing-utilities** | 21 | Test data generation, assertions, spies | [View Functions →](packages/testing-utilities/README.md) |
| **@ts-utilkit/utility** | 9 | Debounce, throttle, color conversion, delays | [View Functions →](packages/utility/README.md) |
| **@ts-utilkit/validation** | 13 | IP, UUID, email, credit card validation | [View Functions →](packages/validation/README.md) |
| **@ts-utilkit/webscraping** | 16 | HTML parsing, link/email extraction | [View Functions →](packages/webscraping/README.md) |

> 💡 **Tip**: Click on "View Functions →" links to see the complete function list for each package with detailed usage examples.

## 📊 Function Summary

Quick reference of functions by category:

| Category | Function Count | Key Functions |
|----------|----------------|---------------|
| **Array** | 26 | `chunkArray`, `findDuplicates`, `groupBy`, `flattenArray`, `sortBy` |
| **Async** | 6 | `asyncRetry`, `asyncTimeout`, `asyncParallel`, `asyncSeries`, `asyncMap` |
| **Collection** | 17 | `setUnion`, `setIntersection`, `mapToObject`, `setDifference`, `mapMerge` |
| **Configuration** | 12 | `getEnv`, `parseEnvInt`, `parseEnvBoolean`, `loadEnvFile`, `validateConfig` |
| **Crypto** | 11 | `hashSHA256`, `hashPassword`, `encryptAES256`, `generateHMAC`, `compareHash` |
| **Date** | 31 | `addDays`, `formatDate`, `daysBetween`, `isLeapYear`, `getQuarter` |
| **Encoding** | 2 | `encodeBase64`, `decodeBase64` |
| **Event** | 7 | `EventEmitter`, `createEventBus`, `debounceEvent`, `throttleEvent`, `waitForEvent` |
| **Format** | 8 | `formatNumber`, `formatCurrency`, `formatBytes`, `formatDuration`, `formatPlural` |
| **Math** | 56 | `calculateStandardDeviation`, `isPrime`, `calculateHaversineDistance`, `factorial`, `median` |
| **Network** | 18 | `parseURL`, `addQueryParams`, `isValidURL`, `normalizeURL`, `extractDomain` |
| **Object** | 39 | `deepMerge`, `safeGet`, `flattenObject`, `pickKeys`, `deepClone` |
| **Parsing** | 7 | `parseCSV`, `parseINI`, `parseQueryString`, `parseUserAgent`, `parseMarkdown` |
| **Random** | 25 | `randomInt`, `randomElement`, `randomUUID`, `randomHex`, `randomShuffle` |
| **Regex** | 15 | `extractEmails`, `extractURLs`, `escapeRegex`, `matchAll`, `removeHTML` |
| **Serialization** | 18 | `serializeToJSON`, `deserializeFromJSON`, `handleCircularReferences`, `deepClone` |
| **String** | 51 | `slugify`, `capitalizeEachWord`, `isPalindrome`, `toKebabCase`, `truncateString` |
| **Testing** | 21 | `generateRandomString`, `generateRandomEmail`, `assertArraysEqual`, `runPerformanceTest` |
| **Utility** | 9 | `debounce`, `throttle`, `delay`, `hexToRgb`, `bytesToSize` |
| **Validation** | 13 | `isValidIPv4`, `isValidUUID`, `isValidJSON`, `isInRange`, `isValidCreditCard` |
| **Webscraping** | 16 | `extractLinks`, `extractMetaTags`, `extractEmails`, `fetchHTML`, `parseHTML` |

**Total: 408 Functions** across 21 specialized packages

## 💡 Usage Examples

### Array Operations

```typescript
import {
  chunkArray,
  findDuplicates,
  cartesianProduct,
} from 'ts-utilkit';

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
import { asyncRetry, asyncTimeout, asyncMap } from 'ts-utilkit';

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
import { deepMerge, safeGet, flattenObject } from 'ts-utilkit';

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
} from 'ts-utilkit';

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
import { slugify, extractDomain, isPalindrome } from 'ts-utilkit';

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
} from 'ts-utilkit';

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

### Prerequisites

- **Node.js**: Version 20 or later
- **TypeScript**: Latest stable version
- **Package Manager**: npm, yarn, pnpm, or bun

### Getting Started

```bash
# Clone the repository
git clone https://github.com/MForofontov/ts-utilkit.git
cd ts-utilkit

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Lint and format code
npm run lint:fix
npm run format
```

### Project Structure

```
ts-utilkit/
├── .github/                        # GitHub workflows and documentation
├── arrayFunctions/                 # Array manipulation utilities (26 functions)
├── asyncFunctions/                 # Async operations and concurrency (6 functions)
├── dateFunctions/                  # Date and time utilities (26 functions)
├── encodingFunctions/              # Encoding/decoding utilities (2 functions)
├── mathFunctions/                  # Mathematical operations (48 functions)
│   ├── algebraFunctions/           # Powers, roots, logarithms
│   ├── arithmeticFunctions/        # Basic math operations
│   ├── combinatoricsFunctions/     # Factorials, permutations
│   ├── geometricFunctions/         # Shapes, distances, trigonometry
│   ├── numberTheoryFunctions/      # Primes, GCD, LCM
│   ├── sequenceFunctions/          # Fibonacci, sequences
│   └── statisticsFunctions/        # Statistical calculations
├── objectFunctions/                # Object manipulation (35 functions)
├── stringFunctions/                # String processing (46 functions)
├── utilityFunctions/               # General utilities (10 functions)
├── validationFunctions/            # Validation utilities (9 functions)
├── functionsUnittests/             # Comprehensive test suites
└── index.ts                       # Main export file
```

### Build Scripts

| Command            | Description                      |
| ------------------ | -------------------------------- |
| `npm run build`    | Compile TypeScript to JavaScript |
| `npm run prepare`  | Pre-publish build step           |
| `npm run lint`     | Run ESLint checks                |
| `npm run lint:fix` | Fix ESLint issues automatically  |
| `npm run format`   | Format code with Prettier        |

### Code Quality Tools

- **TypeScript**: Strict type checking with ES2023 target
- **ESLint**: Code quality and consistency checks
- **Prettier**: Automated code formatting
- **Jest**: Testing framework with extensive coverage
- **Allure**: Advanced test reporting

## 🧪 Testing

This project maintains **>95% test coverage** with comprehensive test suites for every function.

### Test Framework

- **Jest**: Primary testing framework with TypeScript support
- **Allure**: Advanced test reporting and analytics
- **Coverage**: Detailed code coverage reports
- **Test Structure**: Follows Arrange-Act-Assert pattern

### Running Tests

```bash
# Run all tests with Allure reporting
npm test

# Run tests locally without Allure
npm run test:local

# Run tests for GitHub CI
npm run test:github

# Open Allure report after test completion
npm test -- --open-report
# or
OPEN_REPORT=true npm test
```

### Test Structure

Each function includes minimum 6 test cases:

1. **Normal Usage**: Typical input scenarios
2. **Edge Cases**: Empty arrays, boundary values
3. **Error Handling**: Invalid input types (TypeError)
4. **Value Validation**: Invalid input values (Error)
5. **Boundary Conditions**: Min/max values
6. **Performance**: Large input handling

### Example Test Structure

```typescript
describe('functionName', () => {
  it('1. should handle typical input correctly', () => {
    // Arrange
    const input = validInput;

    // Act
    const result = functionName(input);

    // Assert
    expect(result).toBe(expectedOutput);
  });

  it('2. should throw TypeError for invalid input type', () => {
    expect(() => functionName(invalidInput)).toThrow(TypeError);
    expect(() => functionName(invalidInput)).toThrow('expected error message');
  });

  // ... additional test cases
});
```

### Test Reports

- **Allure Reports**: Interactive HTML reports with detailed test analytics
- **Coverage Reports**: Line, branch, and function coverage metrics
- **Performance Metrics**: Execution time tracking for optimization

### Continuous Integration

Tests run automatically on:

- Pull requests
- Main branch commits
- Release tags

All tests must pass before merge approval.

## 📄 License

This project is licensed under the **GNU General Public License v3.0**.

```
Copyright (C) 2024 Mykyta Forofontov

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
```

See the [LICENSE](LICENSE) file for complete details.

## 👨‍💻 Authors

- **[Mykyta Forofontov](https://github.com/MForofontov)** - _Initial work and primary maintainer_

## 🙏 Acknowledgments

- TypeScript team for excellent language design
- Jest community for robust testing framework
- Open source community for inspiration and feedback

## 📊 Project Stats

- **200+ Functions**: Across 7 specialized categories
- **>95% Test Coverage**: Comprehensive test suites
- **Zero Dependencies**: Pure TypeScript implementation
- **Enterprise Ready**: Production-grade code quality
- **Active Maintenance**: Regular updates and improvements

---

<div align="center">

**[Documentation](https://github.com/MForofontov/ts-utilkit)** •
**[Examples](https://github.com/MForofontov/ts-utilkit/tree/main/functionsUnittests)** •
**[Issues](https://github.com/MForofontov/ts-utilkit/issues)** •
**[Contributing](https://github.com/MForofontov/ts-utilkit/blob/main/.github/copilot-instructions.md)**

</div>
