# Contributing to ts-utilkit

Thank you for your interest in contributing to ts-utilkit! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Function Development Standards](#function-development-standards)
- [Testing Standards](#testing-standards)
- [Code Style](#code-style)
- [Pull Request Process](#pull-request-process)
- [Project Philosophy](#project-philosophy)

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please be respectful and constructive in all interactions.

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm (comes with Node.js)
- Git

### Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ts-utilkit.git
   cd ts-utilkit
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests for specific file
npm test -- path/to/test.test.ts

# Run tests in local mode
npm run test:local
```

### Building

```bash
npm run build
```

### Linting and Formatting

```bash
# Check for linting issues
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format
```

## Development Workflow

1. **Check for existing work**: Search issues and PRs to avoid duplicating effort
2. **Create an issue**: For significant changes, create an issue first to discuss the approach
3. **Write code**: Follow the function development standards (see below)
4. **Write tests**: Ensure comprehensive test coverage (>95%)
5. **Run tests**: Verify all tests pass
6. **Update documentation**: Add JSDoc comments and update README if needed
7. **Commit changes**: Use clear, descriptive commit messages
8. **Push and create PR**: Push to your fork and create a pull request

## Function Development Standards

### Function Structure

Every function must follow this structure:

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
 * // Basic usage
 * functionName(42, "hello"); // ExpectedOutput
 *
 * @complexity Time: O(n), Space: O(1)
 */
export function functionName(
  param1: number,
  param2: string,
): ReturnType {
  // Input validation
  if (typeof param1 !== 'number' || isNaN(param1)) {
    throw new TypeError(`param1 must be a number, got ${typeof param1}`);
  }
  if (typeof param2 !== 'string') {
    throw new TypeError(`param2 must be a string, got ${typeof param2}`);
  }

  // Additional validation
  if (param1 < 0) {
    throw new Error('param1 must be non-negative');
  }

  // Function logic here
  const result = performOperation(param1, param2);

  return result;
}
```

### Input Validation Requirements

- **Type Checking**: Validate all input types with `typeof` checks
- **NaN Validation**: Always check for `NaN` when accepting numbers
- **Value Validation**: Check ranges, constraints, and business logic
- **Descriptive Errors**: Include parameter name and expected/actual types
- **Consistent Messages**: Use format: `"param_name must be <expected>, got <actual>"`

### Project Philosophy: Use Battle-Tested Packages

**DO use existing packages for:**
- HTTP operations → `axios`, `node-fetch`, `http` (stdlib)
- Date/time → `date-fns`, `dayjs`, `luxon`
- Validation → `zod`, `yup`, `joi`
- Cryptography → **ALWAYS** use Node.js `crypto` module

**DO add value on top with:**
- ✅ Workflow logic (retry strategies, error recovery)
- ✅ Validation & type safety (input validation, TypeScript generics)
- ✅ Convenience features (smart defaults, method chaining)
- ✅ Common patterns (rate limiting, debouncing, throttling)
- ✅ Error handling (consistent error types, descriptive messages)

**DON'T:**
- ❌ Create thin wrappers with no added value
- ❌ Reimplement existing package functionality
- ❌ Add functions that are just one-line calls to existing packages

## Testing Standards

### Test Structure

```typescript
import { functionName } from '../path/to/function';

describe('functionName', () => {
  // Test case 1: Normal/happy path (first ~60% of tests)
  it('1. should handle typical input correctly', () => {
    // Arrange
    const input = validInput;
    const expected = expectedOutput;

    // Act
    const result = functionName(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 2-N: Edge cases (middle ~30% of tests)
  it('15. should handle edge case with empty array', () => {
    expect(functionName([])).toEqual([]);
  });

  // Error cases ALWAYS LAST (~10% of tests)
  it('23. should throw TypeError when param is not a string', () => {
    expect(() => functionName(invalidInput)).toThrow(TypeError);
    expect(() => functionName(invalidInput)).toThrow(
      'param must be a string, got number'
    );
  });
});
```

### Test Coverage Requirements

- **Quality over quantity**: Create tests to cover functionality, not to reach a specific count
- **Typical needs**:
  - Simple functions: 5-10 meaningful tests
  - Moderate complexity: 8-15 tests
  - Complex functions: 12-20+ tests
- **Coverage goals**: >95% code coverage, 100% function coverage
- **Test organization**:
  1. Normal/typical usage (60%)
  2. Edge cases (30%)
  3. Error cases (10%, ALWAYS LAST)

### Test Naming Convention

- Use numbered descriptive format: `'1. should...'`, `'2. should...'`, etc.
- Be specific about what is being tested
- Examples:
  - `'1. should return true for valid HTTP URL'`
  - `'15. should handle empty string gracefully'`
  - `'23. should throw TypeError when url is not a string'`

## Code Style

### TypeScript Configuration

- Target: ES2023
- Strict mode enabled
- Declaration files generated

### ESLint Rules

- Prettier integration for formatting
- Warn on `any` usage
- Warn on unused variables and console usage
- Use ES modules and type-only imports
- Prefer `interface` over `type` for object definitions

### Formatting Standards

- Single quotes for strings
- 2-space indentation
- No console.log in production code
- Consistent naming: camelCase for functions and variables

## Pull Request Process

### Before Submitting

1. **Run all tests**: Ensure all tests pass locally
2. **Check coverage**: Verify coverage remains >95%
3. **Lint and format**: Run `npm run lint` and `npm run format`
4. **Build successfully**: Run `npm run build` without errors
5. **Update exports**: Add new functions to `index.ts`
6. **Review your changes**: Self-review the diff before submitting

### PR Requirements

- **Clear title**: Use format like "Add [function name]" or "Fix [issue]"
- **Description**: Explain what changes were made and why
- **Link issues**: Reference related issues with `Fixes #123` or `Relates to #456`
- **Tests included**: All new functions must have comprehensive tests
- **Documentation**: JSDoc comments with examples and complexity notes
- **Breaking changes**: Clearly mark and explain any breaking changes

### PR Review Process

1. Automated checks will run (tests, linting, build)
2. Maintainers will review your code
3. Address any feedback or requested changes
4. Once approved, a maintainer will merge your PR

### Commit Messages

- Use clear, descriptive messages
- Start with a verb: "Add", "Fix", "Update", "Remove", etc.
- Examples:
  - `Add asyncRetry function with exponential backoff`
  - `Fix edge case in arrayDifference with empty arrays`
  - `Update documentation for hashPassword function`

## Project Structure

```
ts-utilkit/
├── arrayFunctions/          # Array manipulation utilities
├── asyncFunctions/          # Asynchronous operation utilities
├── cryptoFunctions/         # Cryptographic utilities
├── dateFunctions/           # Date and time utilities
├── eventFunctions/          # Event handling utilities
├── mathFunctions/           # Mathematical operations
│   ├── algebraFunctions/
│   ├── arithmeticFunctions/
│   ├── combinatoricsFunctions/
│   ├── geometricFunctions/
│   ├── numberTheoryFunctions/
│   ├── sequenceFunctions/
│   └── statisticsFunctions/
├── objectFunctions/         # Object manipulation utilities
├── stringFunctions/         # String processing utilities
├── validationFunctions/     # Validation utilities
└── functionsUnittests/      # Test suites mirroring src structure
```

## Adding New Functions

1. **Choose the correct category**: Determine which directory your function belongs in
2. **Create the function file**: Follow the function structure template
3. **Add comprehensive tests**: Create test file in `functionsUnittests/[category]Unittests/`
4. **Export the function**: Add to `index.ts`
5. **Document thoroughly**: Include JSDoc with examples and complexity analysis

## Adding New Modules

If adding an entirely new category:

1. Create new directory: `[category]Functions/`
2. Create test directory: `functionsUnittests/[category]FunctionsUnittest/`
3. Update `.github/copilot-instructions.md` to document the new module
4. Ensure the category is distinct and doesn't overlap with existing ones

## Questions or Issues?

- **Bug reports**: Open an issue with clear reproduction steps
- **Feature requests**: Open an issue describing the proposed functionality
- **Questions**: Open a discussion or issue

Thank you for contributing to ts-utilkit! 🚀
