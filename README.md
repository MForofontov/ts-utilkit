# ts-utilkit

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)](https://jestjs.io/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

A collection of **200+ TypeScript utility functions** organized into specialized modules. Built with type safety and comprehensive testing in mind.

> ⚠️ **Production Notice**: While this library has extensive test coverage (>98%), not all functions have been battle-tested in production environments. Use at your own discretion and thoroughly test in your specific use case before deploying to production.

## ✨ Features

- 🎯 **200+ Functions**: Utilities across array, async, crypto, date, math, object, string, and more
- 🔒 **Type Safe**: Full TypeScript support with strict type checking
- 📝 **Well Documented**: JSDoc comments with examples and complexity notes
- 🧪 **Extensively Tested**: 5,675 unit tests with >98% code coverage
- 📦 **Tree Shakeable**: Import only what you need
- 🛡️ **Input Validation**: Comprehensive error handling with descriptive messages
- ⚖️ **MIT Licensed**: Free for personal and commercial use

## 📚 Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Function Categories](#function-categories)
- [Usage Examples](#usage-examples)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

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

## 📋 Function Categories

### 🔢 Array Functions (26 functions)

Comprehensive array manipulation utilities for modern JavaScript development.

**Key Functions:**

- `chunkArray` - Split arrays into smaller chunks
- `flattenArray` - Flatten nested arrays of any depth
- `findDuplicates` - Find duplicate elements with optional custom equality
- `mergeUnique` - Merge arrays removing duplicates
- `cartesianProduct` - Generate cartesian products
- `shuffleArray` - Fisher-Yates shuffle implementation

### ⚡ Async Functions (6 functions)

Powerful utilities for asynchronous operations and concurrency control.

**Key Functions:**

- `asyncRetry` - Retry functions with exponential backoff
- `asyncTimeout` - Add timeouts to promises
- `asyncMap` - Async array mapping with concurrency control
- `asyncFilter` - Async array filtering
- `asyncSeries` - Execute functions sequentially
- `asyncParallel` - Controlled parallel execution

### 📅 Date Functions (26 functions)

Comprehensive date and time manipulation without external dependencies.

**Key Functions:**

- `formatDate` - Flexible date formatting
- `businessDaysBetween` - Calculate business days
- `addMonths` - Accurate month arithmetic
- `getWeekNumber` - ISO week number calculation
- `isLeapYear` - Leap year detection
- `getQuarter` - Quarter calculation

### 🔐 Encoding Functions (2 functions)

Secure encoding/decoding utilities for data transformation.

**Key Functions:**

- `encodeBase64` - Safe Base64 encoding (Node.js Buffer-based)
- `decodeBase64` - Safe Base64 decoding with error handling

### 🧮 Math Functions (48 functions)

Extensive mathematical operations organized by mathematical domains.

#### Subdomains:

- **Arithmetic** (9 functions): Basic operations, rounding, percentages
- **Algebra** (8 functions): Powers, roots, logarithms, exponentials
- **Geometry** (20 functions): Area, volume, distance, trigonometry
- **Statistics** (7 functions): Mean, median, variance, standard deviation
- **Number Theory** (7 functions): Primes, GCD, LCM, divisibility
- **Combinatorics** (4 functions): Factorials, permutations, combinations
- **Sequences** (3 functions): Fibonacci, triangular numbers

### 🎯 Object Functions (35 functions)

Advanced object manipulation utilities for complex data structures.

**Key Functions:**

- `deepMerge` - Deep object merging with conflict resolution
- `safeGet` - Safe property access with default values
- `flattenObject` - Flatten nested objects with dot notation
- `deepClone` - Deep cloning with `structuredClone` fallback
- `objectToQueryString` - Convert objects to URL query strings
- `pickKeys` & `omitKeys` - Select/exclude object properties

### 🔤 String Functions (46 functions)

Comprehensive text processing utilities for modern applications.

**Key Functions:**

- `slugify` - URL-friendly string conversion
- `capitalizeEachWord` - Smart text capitalization
- `isPalindrome` - Palindrome detection
- `extractDomain` - Domain extraction from URLs
- `stripHtmlTags` - Safe HTML tag removal
- `generateRandomString` - Cryptographically secure random strings

### ✅ Validation Functions (9 functions)

Specialized validation utilities not covered by popular libraries.

**Key Functions:**

- `isValidIPv4` & `isValidIPv6` - IP address validation
- `isValidMACAddress` - MAC address validation
- `isValidUUID` - UUID format validation
- `isValidISODate` - ISO date string validation
- `isValidJSON` - JSON string validation
- `isValidTime` - Time format validation

### 🛠️ Utility Functions (10 functions)

General-purpose utilities for common programming tasks.

**Key Functions:**

- `debounce` & `throttle` - Function execution control
- `hexToRgb` & `rgbToHex` - Color format conversion
- `bytesToSize` - Human-readable byte size formatting
- `delay` - Promise-based delays
- `safeJSONParse` - Safe JSON parsing with error handling

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
