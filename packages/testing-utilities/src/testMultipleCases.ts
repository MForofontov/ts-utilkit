import { deepEqual } from '@ts-utilkit/object';

/**
 * Interface for test case.
 */
export interface TestCase<T, R> {
  input: T;
  expected: R;
  description?: string;
}

/**
 * Interface for test case result.
 */
export interface TestCaseResult<R> {
  passed: boolean;
  description?: string;
  actual?: R;
  expected?: R;
}

/**
 * Tests that a function handles all items in an array.
 * Useful for testing array processing functions.
 *
 * @template T - Input type.
 * @template R - Return type.
 * @param fn - Function to test.
 * @param testCases - Array of test cases with input and expected output.
 * @returns Array of test results (true if passed, false if failed).
 *
 * @example
 * const results = testMultipleCases(
 *   myFunction,
 *   [
 *     { input: [1, 2, 3], expected: 6 },
 *     { input: [4, 5, 6], expected: 15 },
 *   ]
 * );
 *
 * @example
 * // Test with descriptions
 * const results = testMultipleCases(add, [
 *   { input: [1, 2], expected: 3, description: 'add positive numbers' },
 *   { input: [-1, 1], expected: 0, description: 'add opposite numbers' },
 * ]);
 * results.forEach(r => expect(r.passed).toBe(true));
 *
 * @complexity Time: O(n) where n is testCases length, Space: O(n)
 */
export function testMultipleCases<T, R>(
  fn: (input: T) => R,
  testCases: TestCase<T, R>[],
): TestCaseResult<R>[] {
  return testCases.map((testCase) => {
    const actual = fn(testCase.input);
    const passed = deepEqual(actual, testCase.expected as unknown);

    return {
      passed,
      description: testCase.description,
      actual,
      expected: testCase.expected,
    };
  });
}
