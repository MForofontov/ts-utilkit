import { testMultipleCases } from '../src/testMultipleCases';

/**
 * Unit tests for the testMultipleCases function.
 */
describe('testMultipleCases', () => {
  // Test case 1: Run multiple test cases
  it('1. should run all test cases and return results', () => {
    // Arrange
    const testFn = (x: number) => x * 2;
    const cases = [
      { input: 2, expected: 4, description: 'double 2' },
      { input: 5, expected: 10, description: 'double 5' },
      { input: 0, expected: 0, description: 'double 0' },
    ];

    // Act
    const results = testMultipleCases(testFn, cases);

    // Assert
    expect(results).toHaveLength(3);
    expect(results.every((r) => r.passed)).toBe(true);
  });

  // Test case 2: Failed test case
  it('2. should detect failed test cases', () => {
    // Arrange
    const testFn = (x: number) => x * 2;
    const cases = [
      { input: 2, expected: 4, description: 'correct' },
      { input: 3, expected: 10, description: 'wrong expectation' },
    ];

    // Act
    const results = testMultipleCases(testFn, cases);

    // Assert
    expect(results[0].passed).toBe(true);
    expect(results[1].passed).toBe(false);
    expect(results[1].actual).toBe(6);
  });

  // Test case 3: Empty test cases
  it('3. should handle empty test cases array', () => {
    // Arrange
    const testFn = (x: number) => x;
    const cases: Array<{
      input: number;
      expected: number;
      description: string;
    }> = [];

    // Act
    const results = testMultipleCases(testFn, cases);

    // Assert
    expect(results).toEqual([]);
  });

  // Test case 4: Single test case
  it('4. should handle single test case', () => {
    // Arrange
    const testFn = (x: string) => x.toUpperCase();
    const cases = [
      { input: 'hello', expected: 'HELLO', description: 'uppercase' },
    ];

    // Act
    const results = testMultipleCases(testFn, cases);

    // Assert
    expect(results).toHaveLength(1);
    expect(results[0].passed).toBe(true);
    expect(results[0].actual).toBe('HELLO');
  });

  // Test case 5: Test with objects
  it('5. should work with object comparisons', () => {
    // Arrange
    const testFn = (x: number) => ({ value: x * 2 });
    const cases = [
      { input: 5, expected: { value: 10 }, description: 'object test' },
    ];

    // Act
    const results = testMultipleCases(testFn, cases);

    // Assert
    expect(results[0].passed).toBe(true);
  });

  // Test case 6: Test with arrays
  it('6. should work with array comparisons', () => {
    // Arrange
    const testFn = (x: number) => [x, x * 2, x * 3];
    const cases = [
      { input: 2, expected: [2, 4, 6], description: 'array test' },
    ];

    // Act
    const results = testMultipleCases(testFn, cases);

    // Assert
    expect(results[0].passed).toBe(true);
  });

  // Test case 7: Results include description
  it('7. should include description in results', () => {
    // Arrange
    const testFn = (x: number) => x + 1;
    const cases = [{ input: 1, expected: 2, description: 'test description' }];

    // Act
    const results = testMultipleCases(testFn, cases);

    // Assert
    expect(results[0].description).toBe('test description');
  });

  // Test case 8: Results include input and expected
  it('8. should include actual and expected in results', () => {
    // Arrange
    const testFn = (x: number) => x * 3;
    const cases = [{ input: 7, expected: 21, description: 'multiply' }];

    // Act
    const results = testMultipleCases(testFn, cases);

    // Assert
    expect(results[0].expected).toBe(21);
    expect(results[0].actual).toBe(21);
  });

  // Test case 9: Multiple mixed results
  it('9. should return mix of passed and failed results', () => {
    // Arrange
    const testFn = (x: number) => x + 10;
    const cases = [
      { input: 5, expected: 15, description: 'pass 1' },
      { input: 10, expected: 25, description: 'fail 1' },
      { input: 3, expected: 13, description: 'pass 2' },
      { input: 7, expected: 10, description: 'fail 2' },
    ];

    // Act
    const results = testMultipleCases(testFn, cases);

    // Assert
    expect(results[0].passed).toBe(true);
    expect(results[1].passed).toBe(false);
    expect(results[2].passed).toBe(true);
    expect(results[3].passed).toBe(false);
  });

  // Test case 10: Error - invalid function type
  it('10. should throw TypeError when fn is not a function', () => {
    // Arrange
    const invalidFn = 'not a function' as unknown as (
      input: unknown,
    ) => unknown;
    const cases = [{ input: 1, expected: 2, description: 'test' }];

    // Act & Assert
    expect(() => testMultipleCases(invalidFn, cases)).toThrow(TypeError);
    expect(() => testMultipleCases(invalidFn, cases)).toThrow(
      'fn must be a function',
    );
  });

  // Test case 11: Error - invalid cases type
  it('11. should throw TypeError when cases is not an array', () => {
    // Arrange
    const testFn = (x: number) => x;
    const cases = 'not an array' as unknown as Array<{
      input: number;
      expected: number;
      description: string;
    }>;

    // Act & Assert
    expect(() => testMultipleCases(testFn, cases)).toThrow(TypeError);
    expect(() => testMultipleCases(testFn, cases)).toThrow(
      'testCases must be an array',
    );
  });
});
