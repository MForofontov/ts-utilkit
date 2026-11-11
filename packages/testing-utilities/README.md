# @ts-utilkit/testing-utilities

Comprehensive testing utilities and helpers for writing robust unit tests with TypeScript and Jest.

## Installation

```bash
npm install --save-dev @ts-utilkit/testing-utilities
```

## Features

- 🧪 Test data generators (random strings, numbers, emails, URLs, UUIDs)
- ✅ Assertion helpers for complex comparisons
- 🎯 Boundary value testing utilities
- 📊 Performance measurement tools
- 🔍 Type validation helpers
- 🎲 Random data generation for comprehensive test coverage
- 📦 Deep cloning for test data isolation

## Available Functions (21)

- **`assertArraysEqual`** - Deep equality assertion for arrays
- **`cloneTestData`** - Deep clone objects for test isolation
- **`createSpy`** - Create function spies for tracking calls
- **`generateRandomBoolean`** - Generate random boolean values
- **`generateRandomDate`** - Generate random dates within a range
- **`generateRandomEmail`** - Generate random valid email addresses
- **`generateRandomIPv4`** - Generate random IPv4 addresses
- **`generateRandomNumber`** - Generate random numbers within specified ranges
- **`generateRandomObject`** - Generate random objects with specified structure
- **`generateRandomString`** - Generate random strings with custom length and character sets
- **`generateRandomURL`** - Generate random valid URLs
- **`generateRandomUUID`** - Generate random UUIDs (v4)
- **`generateRange`** - Generate numeric ranges for iteration
- **`generateTestArray`** - Generate arrays filled with test data
- **`getBoundaryValues`** - Get boundary values for numeric range testing
- **`getCommonInvalidInputs`** - Get common invalid input values
- **`measureMemoryUsage`** - Measure memory consumption
- **`runPerformanceTest`** - Measure function execution time
- **`testInvalidTypes`** - Test function behavior with invalid types
- **`testMultipleCases`** - Run multiple test cases efficiently
- **`waitForCondition`** - Wait for async conditions in tests

## Quick Example

```typescript
import { generateTestArray, createSpy, waitForCondition } from '@ts-utilkit/testing-utilities';

const users = generateTestArray(2, (id) => ({ id, name: `User${id}` }));
// [{ id: 0, name: 'User0' }, { id: 1, name: 'User1' }]

const spy = createSpy((...args: unknown[]) => args.length);
spy('hello');
spy.callCount; // 1

async function waitForCallback() {
  await waitForCondition(() => spy.callCount > 0);
}
```

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)

## Contributing

Contributions welcome! See the [main repository](https://github.com/MForofontov/ts-utilkit) for guidelines.
