import { testInvalidTypes } from '../src/testInvalidTypes';

/**
 * Unit tests for the testInvalidTypes function.
 */
describe('testInvalidTypes', () => {
  // Test case 1: All invalid types are rejected
  it('1. should return true for all properly rejected invalid types', () => {
    // Arrange
    const testFn = (value: unknown) => {
      if (typeof value !== 'number') {
        throw new TypeError('value must be a number');
      }
      return value * 2;
    };
    const invalidTypes = [null, undefined, 'string', true, {}, []];

    // Act
    const results = testInvalidTypes(testFn, invalidTypes, 'value');

    // Assert
    expect(results.every((r) => r === true)).toBe(true);
    expect(results).toHaveLength(6);
  });

  // Test case 2: Test with string validator
  it('2. should verify function rejects non-string inputs', () => {
    // Arrange
    const stringOnlyFn = (value: unknown) => {
      if (typeof value !== 'string') {
        throw new TypeError('value must be a string');
      }
      return value.toUpperCase();
    };
    const invalidTypes = [42, null, undefined, true, {}, []];

    // Act
    const results = testInvalidTypes(stringOnlyFn, invalidTypes, 'value');

    // Assert
    expect(results.every((r) => r === true)).toBe(true);
  });

  // Test case 3: Empty array
  it('3. should return empty array for empty invalid types', () => {
    // Arrange
    const testFn = (value: unknown) => value;
    const invalidTypes: unknown[] = [];

    // Act
    const results = testInvalidTypes(testFn, invalidTypes, 'value');

    // Assert
    expect(results).toEqual([]);
    expect(results).toHaveLength(0);
  });

  // Test case 4: Single invalid type
  it('4. should work with single invalid type', () => {
    // Arrange
    const testFn = (value: unknown) => {
      if (typeof value !== 'number') {
        throw new TypeError('value must be a number');
      }
      return value;
    };
    const invalidTypes = ['string'];

    // Act
    const results = testInvalidTypes(testFn, invalidTypes, 'value');

    // Assert
    expect(results).toEqual([true]);
  });

  // Test case 5: Function accepts invalid type (returns false)
  it('5. should return false when function accepts invalid type', () => {
    // Arrange
    const lenientFn = (value: unknown) => value; // Accepts anything
    const invalidTypes = ['string', 42, null];

    // Act
    const results = testInvalidTypes(lenientFn, invalidTypes, 'value');

    // Assert
    expect(results.every((r) => r === false)).toBe(true);
  });

  // Test case 6: Function throws non-TypeError (returns false)
  it('6. should return false when function throws non-TypeError', () => {
    // Arrange
    const testFn = (value: unknown) => {
      if (value === null) {
        throw new Error('Regular error'); // Not TypeError
      }
      return value;
    };
    const invalidTypes = [null];

    // Act
    const results = testInvalidTypes(testFn, invalidTypes, 'value');

    // Assert
    expect(results).toEqual([false]);
  });

  // Test case 7: Mixed results
  it('7. should return mixed results for partially validating function', () => {
    // Arrange
    const testFn = (value: unknown) => {
      if (typeof value === 'string') {
        throw new TypeError('value cannot be string');
      }
      return value;
    };
    const invalidTypes = ['string', 42, null];

    // Act
    const results = testInvalidTypes(testFn, invalidTypes, 'value');

    // Assert
    expect(results[0]).toBe(true); // string throws TypeError
    expect(results[1]).toBe(false); // 42 is accepted
    expect(results[2]).toBe(false); // null is accepted
  });

  // Test case 8: Error - invalid function type
  it('8. should throw TypeError when fn is not a function', () => {
    // Arrange
    const invalidFn = 'not a function' as unknown as (value: unknown) => void;
    const invalidTypes = [null];

    // Act & Assert
    expect(() => testInvalidTypes(invalidFn, invalidTypes, 'value')).toThrow(
      TypeError,
    );
    expect(() => testInvalidTypes(invalidFn, invalidTypes, 'value')).toThrow(
      'fn must be a function',
    );
  });

  // Test case 9: Error - invalid types array
  it('9. should throw TypeError when invalidInputs is not an array', () => {
    // Arrange
    const testFn = (value: unknown) => value;
    const invalidTypes = 'not an array' as unknown as unknown[];

    // Act & Assert
    expect(() => testInvalidTypes(testFn, invalidTypes, 'value')).toThrow(
      TypeError,
    );
    expect(() => testInvalidTypes(testFn, invalidTypes, 'value')).toThrow(
      'invalidInputs must be an array',
    );
  });

  // Test case 10: Error - invalid paramName type
  it('10. should throw TypeError when paramName is not a string', () => {
    // Arrange
    const testFn = (value: unknown) => value;
    const invalidTypes = [null];
    const invalidParam = 123 as unknown as string;

    // Act & Assert
    expect(() => testInvalidTypes(testFn, invalidTypes, invalidParam)).toThrow(
      TypeError,
    );
    expect(() => testInvalidTypes(testFn, invalidTypes, invalidParam)).toThrow(
      'paramName must be a string',
    );
  });
});
