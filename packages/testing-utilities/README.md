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

## Functions

### Test Data Generation

- **generateRandomString** - Generate random strings with custom length and character sets
- **generateRandomNumber** - Generate random numbers within specified ranges
- **generateRandomBoolean** - Generate random boolean values
- **generateRandomDate** - Generate random dates within a range
- **generateRandomEmail** - Generate random valid email addresses
- **generateRandomURL** - Generate random valid URLs
- **generateRandomUUID** - Generate random UUIDs (v4)
- **generateRandomIPv4** - Generate random IPv4 addresses
- **generateRandomObject** - Generate random objects with specified structure
- **generateTestArray** - Generate arrays filled with test data
- **generateRange** - Generate numeric ranges for iteration

### Assertions & Comparisons

- **assertArraysEqual** - Deep equality assertion for arrays
- **testMultipleCases** - Run multiple test cases efficiently
- **testInvalidTypes** - Test function behavior with invalid types

### Boundary Testing

- **getBoundaryValues** - Get boundary values for numeric range testing
- **getCommonInvalidInputs** - Get common invalid input values

### Performance & Debugging

- **runPerformanceTest** - Measure function execution time
- **measureMemoryUsage** - Measure memory consumption
- **waitForCondition** - Wait for async conditions in tests

### Mocking & Spies

- **createSpy** - Create function spies for tracking calls

### Utilities

- **cloneTestData** - Deep clone objects for test isolation

## Usage Examples

### Generate Test Data

```typescript
import {
  generateRandomString,
  generateRandomEmail,
  generateRandomNumber,
  generateTestArray
} from '@ts-utilkit/testing-utilities';

describe('User Registration', () => {
  it('should accept valid user data', () => {
    const testUser = {
      username: generateRandomString(10),
      email: generateRandomEmail(),
      age: generateRandomNumber(18, 100)
    };
    
    expect(registerUser(testUser)).toBe(true);
  });
  
  it('should handle multiple users', () => {
    const users = generateTestArray(50, () => ({
      username: generateRandomString(10),
      email: generateRandomEmail()
    }));
    
    expect(bulkRegister(users)).toHaveLength(50);
  });
});
```

### Boundary Value Testing

```typescript
import { getBoundaryValues } from '@ts-utilkit/testing-utilities';

describe('calculateDiscount', () => {
  it('should handle boundary values correctly', () => {
    const boundaries = getBoundaryValues(0, 100);
    // Returns: [0, 1, 50, 99, 100]
    
    boundaries.forEach(value => {
      expect(() => calculateDiscount(value)).not.toThrow();
    });
  });
});
```

### Test Invalid Inputs

```typescript
import { 
  getCommonInvalidInputs,
  testInvalidTypes 
} from '@ts-utilkit/testing-utilities';

describe('processData', () => {
  it('should reject invalid inputs', () => {
    const invalidInputs = getCommonInvalidInputs();
    // Returns: [null, undefined, '', 0, NaN, {}, [], false]
    
    invalidInputs.forEach(input => {
      expect(() => processData(input)).toThrow();
    });
  });
  
  it('should throw TypeError for invalid types', () => {
    testInvalidTypes(processData, ['string', 'number']);
  });
});
```

### Performance Testing

```typescript
import { runPerformanceTest } from '@ts-utilkit/testing-utilities';

describe('sortLargeArray', () => {
  it('should sort 10,000 items within 100ms', async () => {
    const largeArray = Array.from({ length: 10000 }, (_, i) => i);
    
    const executionTime = await runPerformanceTest(() => {
      sortLargeArray(largeArray);
    });
    
    expect(executionTime).toBeLessThan(100);
  });
});
```

### Multiple Test Cases

```typescript
import { testMultipleCases } from '@ts-utilkit/testing-utilities';

describe('add', () => {
  testMultipleCases(add, [
    { input: [2, 3], expected: 5 },
    { input: [0, 0], expected: 0 },
    { input: [-1, 1], expected: 0 },
    { input: [100, 200], expected: 300 }
  ]);
});
```

### Async Condition Waiting

```typescript
import { waitForCondition } from '@ts-utilkit/testing-utilities';

describe('async operation', () => {
  it('should complete within timeout', async () => {
    startAsyncOperation();
    
    await waitForCondition(
      () => isOperationComplete(),
      5000, // timeout ms
      100   // check interval ms
    );
    
    expect(getOperationResult()).toBe('success');
  });
});
```

### Data Isolation

```typescript
import { cloneTestData } from '@ts-utilkit/testing-utilities';

describe('mutating operations', () => {
  const originalData = { users: [{ id: 1, name: 'Alice' }] };
  
  it('should not affect original data', () => {
    const testData = cloneTestData(originalData);
    mutateData(testData);
    
    expect(originalData.users[0].name).toBe('Alice');
  });
});
```

## Best Practices

1. **Use generateRandom\* functions** to avoid hardcoded test data
2. **Test boundary values** with getBoundaryValues
3. **Test invalid inputs** with getCommonInvalidInputs
4. **Clone test data** to prevent test pollution
5. **Measure performance** for critical functions
6. **Use testMultipleCases** to reduce test boilerplate

## API Documentation

All functions include:
- Complete TypeScript type definitions
- JSDoc documentation with examples
- Runtime type validation
- Descriptive error messages

For detailed API documentation, visit the [main repository](https://github.com/MForofontov/ts-utilkit).

## License

GPL-3.0 © MForofontov

## Contributing

Contributions welcome! See the [main repository](https://github.com/MForofontov/ts-utilkit) for guidelines.
