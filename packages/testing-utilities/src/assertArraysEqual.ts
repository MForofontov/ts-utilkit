/**
 * Asserts that two arrays contain the same elements (order-independent).
 *
 * @template T - The type of elements in the arrays.
 * @param actual - Actual array.
 * @param expected - Expected array.
 * @returns True if arrays contain same elements.
 *
 * @example
 * const result = myFunction([1, 2, 3]);
 * expect(assertArraysEqual(result, [3, 2, 1])).toBe(true);
 *
 * @example
 * // Test unordered array results
 * const shuffled = shuffleArray([1, 2, 3, 4, 5]);
 * expect(assertArraysEqual(shuffled, [1, 2, 3, 4, 5])).toBe(true);
 *
 * @note Uses JSON.stringify for comparison, so objects are compared by structure.
 *
 * @complexity Time: O(n log n) due to sorting, Space: O(n)
 */
export function assertArraysEqual<T>(actual: T[], expected: T[]): boolean {
  if (!Array.isArray(actual) || !Array.isArray(expected)) {
    return false;
  }

  if (actual.length !== expected.length) {
    return false;
  }

  const sortedActual = [...actual].sort();
  const sortedExpected = [...expected].sort();

  return JSON.stringify(sortedActual) === JSON.stringify(sortedExpected);
}
