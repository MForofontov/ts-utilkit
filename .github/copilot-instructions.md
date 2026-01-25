# GitHub Copilot Instructions for ts-functions

## Project Overview

This is a comprehensive TypeScript utility functions library containing 200+ reusable functions organized into 8 specialized modules. The project emphasizes type safety, comprehensive testing, maintainability, and follows TypeScript best practices for enterprise-grade utility libraries.

## Architecture & Structure

### Core Principles

- **Single Responsibility**: Each function should have one clear purpose
- **Type Safety**: Complete type annotations for all functions and parameters
- **Pure Functions**: Prefer pure functions when possible (no side effects)
- **Comprehensive Testing**: Every function must have unit tests with >95% coverage
- **Documentation**: JSDoc comments with examples and complexity notes
- **Error Handling**: Explicit validation with descriptive error messages
- **Use Battle-Tested Packages**: Leverage existing mature libraries as building blocks, don't reimplement their core functionality
- **Add Value, Don't Wrap**: Functions should add meaningful logic (validation, workflows, convenience) beyond simple one-line calls to existing packages

### Directory Structure

```
ts-functions/
├── .github/                        # GitHub-specific files and workflows
├── arrayFunctions/                 # Array manipulation utilities
│   ├── arrayDifference.ts
│   ├── chunkArray.ts
│   ├── findDuplicates.ts
│   └── ...
├── asyncFunctions/                 # Asynchronous operation utilities
│   ├── asyncRetry.ts               # Retry functions with backoff strategies
│   ├── asyncTimeout.ts             # Add timeouts to promises
│   ├── asyncSeries.ts              # Execute functions sequentially
│   ├── asyncFilter.ts              # Async array filtering
│   ├── asyncMap.ts                 # Async array mapping
│   └── asyncParallel.ts            # Controlled parallel execution
├── cryptoFunctions/                # Cryptographic utilities (Node.js crypto)
│   ├── hashSHA256.ts               # SHA-256 hashing
│   ├── hashSHA512.ts               # SHA-512 hashing
│   ├── hashMD5.ts                  # MD5 hashing (legacy support)
│   ├── hashPassword.ts             # PBKDF2 password hashing
│   ├── compareHash.ts              # Timing-safe hash comparison
│   ├── encryptAES256.ts            # AES-256-GCM encryption
│   ├── decryptAES256.ts            # AES-256-GCM decryption
│   ├── generateHMAC.ts             # HMAC generation
│   ├── verifyHMAC.ts               # Timing-safe HMAC verification
│   ├── generateSalt.ts             # Cryptographic salt generation
│   └── generateRandomBytes.ts      # Secure random byte generation
├── dateFunctions/                  # Date and time utilities
│   ├── addDays.ts
│   ├── formatDate.ts
│   ├── isLeapYear.ts
│   └── ...
├── encodingFunctions/              # Base64 encoding/decoding
│   ├── encodeBase64.ts
│   └── decodeBase64.ts
├── eventFunctions/                 # Event handling and management utilities
│   ├── EventEmitter.ts             # Event emitter class (on, off, emit, once)
│   ├── debounceEvent.ts            # Debounce event handlers
│   ├── throttleEvent.ts            # Throttle event handlers
│   ├── createEventBus.ts           # Publish-subscribe event bus
│   ├── delegateEvent.ts            # Event delegation for dynamic content
│   ├── waitForEvent.ts             # Promise-based event waiting
│   └── onceEvent.ts                # Execute handler only once
├── mathFunctions/                  # Mathematical operations
│   ├── algebraFunctions/           # Powers, roots, logarithms
│   ├── arithmeticFunctions/        # Basic math operations
│   ├── combinatoricsFunctions/     # Factorials, permutations
│   ├── geometricFunctions/         # Shapes, distances, angles
│   ├── numberTheoryFunctions/      # Prime numbers, GCD, LCM
│   ├── sequenceFunctions/          # Fibonacci, triangular numbers
│   └── statisticsFunctions/        # Mean, median, standard deviation
├── objectFunctions/                # Object manipulation utilities
│   ├── deepMerge.ts
│   ├── safeGet.ts
│   ├── groupBy.ts
│   └── ...
├── stringFunctions/                # String processing utilities
│   ├── slugify.ts
│   ├── capitalizeFirstLetter.ts
│   └── ...
├── utilityFunctions/               # General-purpose utilities
│   ├── debounce.ts
│   ├── throttle.ts
│   ├── hexToRgb.ts
│   └── ...
├── validationFunctions/            # Specialized validation utilities
│   ├── isValidIPv4.ts             # NOT covered by popular libraries
│   ├── isValidIPv6.ts             # NOT covered by popular libraries
│   ├── isValidMACAddress.ts       # NOT covered by popular libraries
│   ├── isValidUUID.ts             # NOT covered by popular libraries
│   ├── isValidISODate.ts          # Custom ISO date validation
│   ├── isValidJSON.ts             # JSON string validation
│   ├── isValidTime.ts             # Time format validation
│   ├── isValidPattern.ts          # Custom regex pattern matching
│   └── isInRange.ts               # Numeric range validation
├── functionsUnittests/             # Comprehensive test suites
│   └── [module]Unittests/          # Tests mirroring src structure
└── index.ts                       # Main export file
```

## Development Guidelines

### Core Principles

- **Single Responsibility**: Each function should have one clear purpose
- **Type Safety**: Complete type annotations for all functions and parameters
- **Pure Functions**: Prefer pure functions when possible (no side effects)
- **Comprehensive Testing**: Every function must have unit tests with >95% coverage
- **Documentation**: JSDoc comments with examples and complexity notes
- **Error Handling**: Explicit validation with descriptive error messages
- **No Library Duplication**: Avoid implementing functions that exist in well-established libraries

### Package Usage Philosophy

#### When to Use Battle-Tested Packages
This library follows a clear philosophy: **Use battle-tested packages as building blocks, but add meaningful logic on top**.

**DO use existing packages for:**
- HTTP client/server → `axios`, `node-fetch`, `http` (stdlib)
- Date/time manipulation → `date-fns`, `dayjs`, `luxon`
- Validation → `zod`, `yup`, `joi`
- Logging → `winston`, `pino`
- Testing → `jest`, `vitest`, `mocha`
- File system operations → `fs-extra`, `glob`
- Path manipulation → `path` (stdlib)
- Cryptography → **ALWAYS** use Node.js `crypto` module, never implement custom crypto
- UUID generation → `uuid` package (for cryptographically secure UUIDs)
- JSON/YAML parsing → `JSON` (stdlib), `js-yaml`
- Stream processing → Node.js `stream` API
- Event emitters → Node.js `events` API
- Async utilities → Native Promises, `async/await`

**DO add value on top with:**
- ✅ **Workflow logic**: Retry strategies, error recovery, orchestration
- ✅ **Validation & type safety**: Input validation, TypeScript generics, runtime checks
- ✅ **Convenience features**: Smart defaults, method chaining, fluent APIs
- ✅ **Resource management**: Cleanup, memory management, connection pooling
- ✅ **Common patterns**: Rate limiting, debouncing, throttling, batching
- ✅ **Integration**: Combining multiple packages with unified TypeScript API
- ✅ **Error handling**: Consistent error types and descriptive messages
- ✅ **Documentation**: Clear JSDoc with examples and complexity analysis

**Examples of Good Patterns:**

```typescript
// ✅ GOOD: Uses Node.js crypto but adds validation and convenience
export function hashPassword(
  password: string,
  salt: string,
  iterations: number = 100000,
): string {
  // Uses: crypto.pbkdf2Sync
  // Adds: Input validation, safe defaults, error handling, hex encoding
  if (typeof password !== 'string') {
    throw new TypeError(`password must be a string, got ${typeof password}`);
  }
  if (typeof salt !== 'string' || salt.length !== 32) {
    throw new TypeError('salt must be a 32-character hex string');
  }
  
  const hash = crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512');
  return hash.toString('hex');
}

// ✅ GOOD: Uses native promises but adds retry logic
export async function asyncRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000,
): Promise<T> {
  // Uses: Native Promises
  // Adds: Exponential backoff, configurable retries, error aggregation
  let lastError: Error;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delayMs * Math.pow(2, attempt)));
      }
    }
  }
  
  throw new Error(`Failed after ${maxRetries} retries: ${lastError.message}`);
}

// ✅ GOOD: Adds weighted selection logic (not in stdlib)
export function randomElement<T>(elements: WeightedElement<T>[]): WeightedElement<T> {
  // Uses: Math.random()
  // Adds: Weighted selection algorithm, validation, TypeScript generics
  if (!Array.isArray(elements) || elements.length === 0) {
    throw new Error('elements array cannot be empty');
  }
  
  const totalWeight = elements.reduce((sum, el) => sum + el.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const element of elements) {
    random -= element.weight;
    if (random <= 0) return element;
  }
  
  return elements[elements.length - 1];
}

// ❌ BAD: Just a thin wrapper with no added value
export function parseJSON(text: string): any {
  return JSON.parse(text);  // No validation, no error handling, no value added
}

// ❌ BAD: Reimplementing existing package functionality
export function formatDate(date: Date, format: string): string {
  // Don't reimplement date formatting! Use date-fns or dayjs
  // Complex string manipulation and locale handling already solved
}

// ❌ BAD: Wrapper that adds nothing beyond type annotation
export function readFileSync(path: string): string {
  return fs.readFileSync(path, 'utf-8');  // Just use fs directly
}
```

**Value Proposition:**
This library provides a **convenience layer with TypeScript best practices** on top of battle-tested foundations:
1. **Consistent TypeScript API** across different underlying libraries
2. **Type safety with generics** and strict type checking
3. **Runtime validation** with descriptive error messages
4. **Convenience features** (smart defaults, method chaining)
5. **Comprehensive JSDoc** with examples and complexity notes
6. **Common patterns** (retry, rate limiting, debouncing, throttling)
7. **Enterprise-ready** error handling and edge case coverage

#### When Adding New Functionality
Before adding a new function or module, ask:
1. **Does a battle-tested package already solve this?** → Use it as a foundation
2. **What value am I adding?** → Ensure you're adding workflow logic, validation, or convenience
3. **Is this a thin wrapper?** → Consider if users should just use the underlying package directly
4. **Am I reimplementing core functionality?** → Don't reimplement protocols, parsers, or well-solved algorithms
5. **Does this add meaningful logic?** → Validation, error handling, convenience, or integration logic

### Function Development Standards

#### 1. Function Structure Template

Every function should follow this template:

```typescript
/**
 * Brief description of what the function does.
 *
 * @param param1 - Description of parameter 1.
 * @param param2 - Description of parameter 2.
 * @param optionalParam - Description of optional parameter (default: false).
 * @returns Description of return value.
 *
 * @throws {TypeError} If parameters are of wrong type.
 * @throws {Error} If parameters have invalid values.
 *
 * @example
 * // Basic usage
 * functionName(42, "hello"); // ExpectedOutput
 *
 * @example
 * // With optional parameter
 * functionName(0, "world", true); // AnotherExpectedOutput
 *
 * @note Any special considerations or implementation details.
 *
 * @complexity Time: O(n), Space: O(1)
 */
export function functionName(
  param1: number,
  param2: string,
  optionalParam: boolean = false,
): ReturnType {
  // Input validation
  if (typeof param1 !== 'number' || isNaN(param1)) {
    throw new TypeError(`param1 must be a number, got ${typeof param1}`);
  }
  if (typeof param2 !== 'string') {
    throw new TypeError(`param2 must be a string, got ${typeof param2}`);
  }
  if (typeof optionalParam !== 'boolean') {
    throw new TypeError(
      `optionalParam must be a boolean, got ${typeof optionalParam}`,
    );
  }

  // Additional validation
  if (param1 < 0) {
    throw new Error('param1 must be non-negative');
  }

  // Function logic here
  const result = performOperation(param1, param2, optionalParam);

  return result;
}
```

#### 2. Input Validation Standards

- **Type Checking**: Validate all input types with `typeof` checks
- **NaN Validation**: Always check for `NaN` when accepting numbers
- **Value Validation**: Check ranges, constraints, and business logic
- **Descriptive Errors**: Include parameter name and expected/actual types
- **Consistent Messages**: Use format: `"param_name must be <expected>, got <actual>"`

#### 3. Error Handling Patterns

```typescript
// Type validation
if (typeof param !== 'number') {
  throw new TypeError(`param must be a number, got ${typeof param}`);
}

// NaN validation for numbers
if (isNaN(param)) {
  throw new Error('param must be a valid number, not NaN');
}

// Value validation
if (param < 0) {
  throw new Error(`param must be non-negative, got ${param}`);
}

// Array validation
if (!Array.isArray(items)) {
  throw new TypeError(`items must be an array, got ${typeof items}`);
}

if (items.length === 0) {
  throw new Error('items array cannot be empty');
}

// Object validation
if (obj === null || typeof obj !== 'object') {
  throw new TypeError('obj must be an object');
}
```

### Interface/Type Development Standards

#### 1. Interface Structure Template

````typescript
/**
 * Interface description explaining its purpose.
 *
 * @example
 * ```typescript
 * const config: FunctionConfig = {
 *   timeout: 5000,
 *   retries: 3,
 *   batchSize: 100
 * };
 * ```
 */
export interface FunctionConfig {
  /** Timeout in milliseconds */
  timeout: number;
  /** Number of retry attempts */
  retries: number;
  /** Batch size for processing */
  batchSize: number;
  /** Optional debug mode */
  debug?: boolean;
}

/**
 * Generic type for callback functions.
 *
 * @template T - Input type
 * @template R - Return type
 */
export type ProcessorCallback<T, R> = (item: T, index: number) => R;

/**
 * Utility type for making specific properties optional.
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
````

#### 2. Generic Function Template

````typescript
/**
 * Generic function that works with multiple types.
 *
 * @template T - The input type
 * @template R - The return type
 * @param items - Array of items to process
 * @param processor - Function to process each item
 * @returns Array of processed results
 *
 * @example
 * ```typescript
 * const numbers = [1, 2, 3];
 * const doubled = processItems(numbers, x => x * 2);
 * // Result: [2, 4, 6]
 * ```
 */
export function processItems<T, R>(
  items: T[],
  processor: ProcessorCallback<T, R>,
): R[] {
  if (!Array.isArray(items)) {
    throw new TypeError(`items must be an array, got ${typeof items}`);
  }
  if (typeof processor !== 'function') {
    throw new TypeError(
      `processor must be a function, got ${typeof processor}`,
    );
  }

  return items.map((item, index) => processor(item, index));
}
````

### Testing Standards

#### Test File Structure

```typescript
import { functionName } from '../path/to/function';

/**
 * Unit tests for the functionName function.
 */
describe('functionName', () => {
  // Test case 1: Normal/happy path
  it('1. should handle typical input correctly', () => {
    // Arrange
    const input = validInput;
    const expected = expectedOutput;

    // Act
    const result = functionName(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 2: Edge cases
  it('2. should handle edge case with empty array', () => {
    // Arrange
    const input: number[] = [];
    const expected = [];

    // Act
    const result = functionName(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 3: Error cases
  it('3. should throw TypeError for invalid input type', () => {
    // Arrange
    const input = invalidInput;
    const expectedMessage = 'param must be a number, got string';

    // Act & Assert
    expect(() => functionName(input)).toThrow(TypeError);
    expect(() => functionName(input)).toThrow(expectedMessage);
  });

  // Test case 4: Value validation errors
  it('4. should throw Error for invalid input value', () => {
    // Arrange
    const input = -1;
    const expectedMessage = 'param must be non-negative';

    // Act & Assert
    expect(() => functionName(input)).toThrow(Error);
    expect(() => functionName(input)).toThrow(expectedMessage);
  });

  // Test case 5: Boundary conditions
  it('5. should handle boundary values correctly', () => {
    // Test minimum boundary
    expect(functionName(0)).toBe(expectedMinResult);

    // Test maximum boundary
    expect(functionName(Number.MAX_SAFE_INTEGER)).toBe(expectedMaxResult);
  });

  // Test case 6: Performance/large inputs
  it('6. should handle large inputs efficiently', () => {
    // Arrange
    const largeInput = new Array(10000).fill(0).map((_, i) => i);

    // Act
    const startTime = performance.now();
    const result = functionName(largeInput);
    const endTime = performance.now();

    // Assert
    expect(result).toBeDefined();
    expect(endTime - startTime).toBeLessThan(100); // Should complete within 100ms
  });
});
```

#### Testing Requirements

- **Comprehensive test coverage based on actual needs** (CRITICAL):
  - **Quality over quantity**: Create tests to cover functionality, NOT to reach a specific count
  - **Test what matters**: Focus on code paths, edge cases, and error conditions
  - **Avoid redundant tests**: Don't test the same thing multiple ways without added value
  - **Typical coverage needs**:
    - Simple functions: 5-10 meaningful tests (basic usage + edge cases + errors)
    - Moderate complexity: 8-15 tests (multiple scenarios + boundaries + errors)
    - Complex functions: 12-20+ tests (comprehensive scenarios + all branches + errors)
  - **Stop when covered**: If all code paths, edge cases, and errors are tested, you're done

- **Test Organization Pattern** (CRITICAL):
  1. **Normal/typical usage** (first ~60% of tests): Common use cases and expected behavior
  2. **Edge cases** (middle ~30% of tests): Boundary conditions, empty inputs, special values
  3. **Error cases** (last ~10% of tests): **ALWAYS LAST** - Type errors, validation errors, invalid inputs

- **Naming Convention**:
  - Use numbered descriptive format: `'1. should...'`, `'2. should...'`, etc.
  - Be specific and descriptive about what is being tested
  - Examples:
    - `'1. should return true for valid HTTP URL'`
    - `'15. should handle empty string gracefully'`
    - `'23. should throw TypeError when url is not a string'`

- **Test Structure**:
  - Use **Arrange-Act-Assert** pattern for clarity
  - Add descriptive comments for each test section
  - Group related test cases together with comments

- **Error Testing**:
  - **MUST be placed at the end** of the test file
  - Use `toThrow()` with specific error types (TypeError, Error, RangeError, etc.)
  - Always verify both error type AND error message
  - Example:
    ```typescript
    expect(() => functionName(invalidInput)).toThrow(TypeError);
    expect(() => functionName(invalidInput)).toThrow(
      'param must be a number, got string',
    );
    ```

- **Coverage Goals**:
  - Target >95% code coverage
  - Test all code paths and branches
  - Include performance tests for complex functions
  - Test boundary conditions thoroughly

- **Documentation**:
  - Add descriptive comments for each test case explaining the scenario
  - Group related tests with section comments
  - Reference example: `functionsUnittests/networkFunctionsUnittest/isValidURL.test.ts`

### Code Coverage Standards

#### Current Coverage Metrics

As of October 2025, the project maintains exceptional test coverage:

| Metric         | Coverage   | Status       |
| -------------- | ---------- | ------------ |
| **Statements** | **98.59%** | ✅ Excellent |
| **Branches**   | **96.95%** | ✅ Excellent |
| **Functions**  | **100%**   | ✅ Perfect   |
| **Lines**      | **98.63%** | ✅ Excellent |

- **Total Test Suites**: 267
- **Total Tests**: 3,487
- **All tests passing**: ✅

#### Coverage Philosophy

**98.63% line coverage represents the practical maximum for this codebase.** The remaining 1.37% uncovered lines consist of:

1. **Defensive Code** (intentionally unreachable):
   - Catch blocks after comprehensive validation
   - Double-checks after regex validation
   - Safety nets for theoretically impossible states

2. **Examples of Acceptable Uncovered Lines**:
   - **Crypto catch blocks**: Lines in `compareHash.ts:99` and `verifyHMAC.ts:117` that can only be reached if Node.js built-ins throw unexpected errors
   - **Regex-prevented validators**: Lines in `isValidTime.ts:131,138,143,147` and `isValidISODate.ts:83,87,115,121` that are unreachable because earlier regex patterns prevent invalid values
   - **Edge case handlers**: Defensive checks for conditions prevented by earlier validation logic

#### Coverage Best Practices

**When Adding New Functions**:

1. ✅ **Aim for >95% coverage** for all new code
2. ✅ **100% function coverage** is mandatory - every function must be tested
3. ✅ **Document why lines are uncovered** if below 95% (must be defensive code)
4. ❌ **Never artificially inflate coverage** by:
   - Mocking Node.js built-ins unnecessarily
   - Creating synthetic errors just for coverage
   - Bypassing validation to reach defensive code
   - Writing meaningless tests

**Running Coverage Reports**:

```bash
# Full coverage report
npm test -- --coverage

# Coverage for specific file
npm test -- path/to/test.test.ts --coverage

# Text-only coverage summary
npm test -- --coverage --coverageReporters=text --silent
```

**Analyzing Uncovered Lines**:

```bash
# List all files with <100% coverage
npm test -- --coverage --coverageReporters=text --silent 2>&1 | grep -E "^\s+\w+\.ts\s+\|" | grep -v "100 |.*100 |.*100 |"
```

#### Performance Test Guidelines

Performance tests should use realistic thresholds:

- ✅ **Use 100ms threshold** for most tests (accounts for CI environments)
- ❌ **Avoid <10ms thresholds** - too strict, causes flaky tests
- ✅ **Test with meaningful data sizes** (arrays of 100-10,000 elements)
- ✅ **Focus on algorithmic efficiency**, not absolute timing

**Example Performance Test**:

```typescript
it('should handle large inputs efficiently', () => {
  const largeInput = new Array(10000).fill(0).map((_, i) => i);

  const startTime = performance.now();
  const result = functionName(largeInput);
  const endTime = performance.now();

  expect(result).toBeDefined();
  expect(endTime - startTime).toBeLessThan(100); // 100ms threshold for CI
});
```

#### Avoiding Flaky Tests

**Common Causes of Flaky Tests**:

1. **Strict timing thresholds** - Solution: Use 100ms minimum for performance tests
2. **Randomness without verification** - Solution: Test properties, not exact values
3. **NaN comparisons** - Solution: Use `Number.isNaN()` for NaN checks
4. **Environment-dependent behavior** - Solution: Mock or control external dependencies

**Example: Testing Random Functions**:

```typescript
// ❌ Bad: Expects exact random result
expect(shuffleArray([1, 2, 3])).not.toEqual([1, 2, 3]);

// ✅ Good: Verifies properties of random result
const result = shuffleArray([1, 2, 3]);
expect(result).toHaveLength(3);
expect(result.sort()).toEqual([1, 2, 3]); // Same elements, possibly different order
```

**Example: Testing with NaN**:

```typescript
// ❌ Bad: NaN !== NaN, so equality checks fail
expect(result).toEqual([NaN, 1, 2]);

// ✅ Good: Count NaN values explicitly
const nanCount = result.filter((x) => Number.isNaN(x)).length;
expect(nanCount).toBe(1);
```

#### Coverage Maintenance

**When coverage drops below 98%**:

1. Identify which files have uncovered lines
2. Categorize uncovered lines:
   - **Defensive code**: Document and accept
   - **Missing tests**: Add comprehensive tests
   - **Dead code**: Remove if truly unreachable
3. Prioritize by impact:
   - **HIGH**: 5+ uncovered lines (add tests immediately)
   - **MEDIUM**: 2-4 uncovered lines (add tests soon)
   - **LOW**: 1 uncovered line (evaluate if defensive)

**Coverage should never prevent**:

- Writing defensive error handling
- Adding safety checks for edge cases
- Using try-catch for external dependencies
- Following security best practices (timing-safe comparisons, etc.)

#### Integration with CI/CD

- All PRs must maintain or improve coverage
- Coverage reports are generated automatically
- Flaky tests must be fixed immediately (not disabled)
- Performance tests must account for slower CI environments

### Code Style & Formatting

#### TypeScript Configuration

- Target: ES2023
- Strict mode enabled
- Declaration files generated
- Node.js and Jest types included

#### ESLint Rules (Key Points)

- **Prettier integration**: All formatting handled by Prettier
- **Type safety**: Warn on `any` usage, unsafe type operations
- **Code quality**: Warn on unused variables, console usage
- **Import consistency**: Use ES modules, type-only imports when appropriate
- **Interface over type**: Prefer `interface` for object type definitions

#### Formatting Standards

- **Single quotes** for strings
- **2-space indentation**
- **No console.log** in production code (warnings allowed)
- **Consistent naming**: camelCase for functions and variables

### Export Strategy

#### Index.ts Management

All functions must be exported from the main `index.ts` file:

```typescript
export * from './categoryFunctions/functionName';
```

#### Naming Conflicts

Handle naming conflicts explicitly:

```typescript
export { groupBy as groupByObject } from './objectFunctions/groupBy';
```

### Mathematical Functions Specific Guidelines

#### Organization by Subdomain

- **arithmeticFunctions/**: Basic operations (add, subtract, absolute, rounding)
- **algebraFunctions/**: Powers, roots, logarithms, exponentials
- **geometricFunctions/**: Area, volume, distance, trigonometry
- **statisticsFunctions/**: Mean, median, variance, standard deviation
- **numberTheoryFunctions/**: Primes, GCD, LCM, divisibility
- **combinatoricsFunctions/**: Factorials, permutations, combinations
- **sequenceFunctions/**: Fibonacci, triangular numbers, sequences

#### Mathematical Function Requirements

- Include **@complexity** annotation
- Validate numeric inputs (check for `NaN`)
- Handle mathematical edge cases (division by zero, negative square roots)
- Use appropriate precision for floating-point operations
- Reference mathematical definitions in comments when helpful

### Cryptographic Functions Specific Guidelines

#### Function Categories

- **Hashing Functions**: SHA-256, SHA-512, MD5 (legacy), password hashing (PBKDF2)
- **Encryption Functions**: AES-256-GCM encryption and decryption
- **HMAC Functions**: HMAC generation and timing-safe verification
- **Utility Functions**: Salt generation, random bytes, hash comparison

#### Cryptographic Function Requirements

- **Security First**: Use Node.js built-in `crypto` module exclusively
- **Timing-Safe Operations**: Use `timingSafeEqual` for all comparisons (hashes, HMACs)
- **Input Validation**: Strict validation of all cryptographic parameters
  - Validate hex string formats (hash, salt, HMAC)
  - Check buffer/string lengths match algorithm requirements
  - Verify algorithm parameter values
- **Error Handling**: Clear, descriptive errors without exposing sensitive data
- **Documentation**:
  - Include security warnings (e.g., MD5 for legacy only)
  - Document timing-attack resistance where applicable
  - Provide real-world usage examples (API signatures, password storage)
- **Test Coverage**: Aim for >98% coverage
  - Test valid and invalid inputs thoroughly
  - Test all supported algorithms
  - Test edge cases (empty strings, wrong lengths, invalid hex)
  - Note: Some defensive catch blocks may be unreachable (document as such)

#### Cryptographic Best Practices

- **Never log or expose**: Keys, passwords, salts, or intermediate values
- **Use secure defaults**: SHA-256 for hashing, AES-256-GCM for encryption
- **Hex encoding**: Always use lowercase hex for consistency
- **Algorithm support**: Document supported algorithms explicitly
- **Legacy warnings**: Clearly mark MD5 and other weak algorithms as legacy/insecure

### Event Functions Specific Guidelines

#### Function Categories

- **EventEmitter Class**: Custom event emitter with on, off, emit, once, removeAllListeners, listenerCount, eventNames methods
- **Timing Control**: debounceEvent (delay until inactivity), throttleEvent (rate limiting)
- **Event Bus**: createEventBus (publish-subscribe pattern for loose coupling)
- **Event Utilities**: waitForEvent (Promise-based event waiting), onceEvent (execute once wrapper), delegateEvent (event delegation for dynamic content)

#### Event Function Requirements

- **Type Safety**: Use TypeScript generics for event data types
- **Memory Management**: Always provide cleanup mechanisms (cancel methods, removeListener)
- **Validation**: Strict validation of event names (must be strings) and handlers (must be functions)
- **Performance**: Efficient for many listeners and rapid event firing
- **Documentation**:
  - Include real-world usage examples (DOM events, custom emitters)
  - Document cleanup requirements and best practices
  - Show method chaining patterns where applicable
- **Test Coverage**: Aim for >95% coverage
  - Test normal event flow (subscribe, publish, receive)
  - Test cleanup (unsubscribe, cancel, cleanup)
  - Test edge cases (multiple listeners, rapid firing, timing edge cases)
  - Test error cases (invalid types, invalid values)

#### Event Functions Best Practices

- **Listener Management**: Clean up listeners to prevent memory leaks
- **Event Names**: Use clear, namespaced event names (e.g., 'user:login', 'data:update')
- **Timing Functions**: Use jest.useFakeTimers() for testing debounce/throttle
- **Error Handling**: Validate all inputs with descriptive error messages
- **Method Chaining**: Support fluent interfaces where appropriate (EventEmitter)
- **Immutability**: Create copies of listener arrays before iterating to handle modifications during emit

### Best Practices for GitHub Copilot

#### When Adding New Functions

1. **Analyze the category**: Determine the correct directory based on function purpose
2. **Follow naming conventions**: Use descriptive, camelCase names
3. **Check for duplicates**: Ensure similar functionality doesn't already exist
4. **Consider edge cases**: Think about boundary conditions and error scenarios
5. **Add comprehensive tests**: Create test file in corresponding `functionsUnittests` directory
6. **Update exports**: Add export statement to `index.ts`

#### When Adding New Modules/Categories

1. **Create new directory** following the naming convention (e.g., `categoryFunctions/`)
2. **Create corresponding test directory** in `functionsUnittests/categoryFunctionsUnittest/`
3. **Update this document** (`.github/copilot-instructions.md`) to include the new module in:
   - Directory Structure section
   - Any relevant guidelines specific to the new category
4. **Consider organizational impact**: Ensure the new category is distinct and doesn't overlap with existing ones

#### When Modifying Existing Functions

1. **Maintain backward compatibility** unless it's a breaking change
2. **Update tests** to reflect changes
3. **Consider performance implications** of modifications
4. **Update JSDoc** if behavior changes
5. **Run full test suite** to ensure no regressions

#### Code Review Considerations

- **Type safety**: Ensure proper TypeScript usage
- **Test coverage**: Verify comprehensive test scenarios
- **Documentation**: Check JSDoc completeness and accuracy
- **Performance**: Consider algorithmic efficiency
- **Consistency**: Ensure code follows project patterns

### Common Patterns in the Codebase

#### Input Validation Pattern

```typescript
if (isNaN(input)) {
  throw new Error('Input must be a number');
}
```

#### Array Processing Pattern

```typescript
if (!Array.isArray(arr) || arr.length === 0) {
  throw new Error('Input must be a non-empty array');
}
```

#### Object Handling Pattern

```typescript
if (obj === null || typeof obj !== 'object') {
  throw new Error('Input must be an object');
}
```

#### Type Guard Pattern

```typescript
function isValidType(value: unknown): value is ExpectedType {
  return typeof value === 'expectedType' && /* additional checks */;
}
```

### Environment & Dependencies

#### Development Environment

- **Node.js**: Version 20 or later required
- **TypeScript**: Latest stable version
- **Jest**: For testing with Allure reporting
- **ESLint + Prettier**: For code quality and formatting

#### Key Dependencies

- **Jest & ts-jest**: Testing framework
- **Allure**: Test reporting
- **TypeScript**: Language and compiler
- **ESLint ecosystem**: Code quality tools

#### Build Process

- **Build command**: `npm run build` (compiles to `dist/`)
- **Test command**: `npm test` (runs tests with Allure reporting)
- **Format command**: `npm run format` (Prettier formatting)
- **Lint command**: `npm run lint` (ESLint checking)

### Performance Considerations

#### Algorithmic Complexity

- Document time/space complexity in JSDoc
- Prefer O(1) or O(n) algorithms when possible
- Consider memory usage for large data sets
- Optimize hot paths in commonly used functions

#### Runtime Efficiency

- Avoid unnecessary object creation
- Use appropriate data structures
- Consider memoization for expensive calculations
- Profile performance-critical functions

This document serves as a comprehensive guide for maintaining code quality, consistency, and best practices in the ts-functions project. It should be updated whenever new patterns, standards, or modules are established in the project.
