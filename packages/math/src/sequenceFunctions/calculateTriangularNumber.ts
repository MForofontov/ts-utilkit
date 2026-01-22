/**
 * Calculates the nth triangular number.
 *
 * @param n - The position in the triangular number sequence (must be non-negative integer).
 * @returns The nth triangular number (sum of integers from 1 to n).
 *
 * @throws {Error} If n is not a non-negative integer.
 *
 * @example
 * // Triangular number sequence: 0, 1, 3, 6, 10, 15, 21, 28...
 * calculateTriangularNumber(0); // 0
 * calculateTriangularNumber(1); // 1 (1)
 * calculateTriangularNumber(2); // 3 (1+2)
 * calculateTriangularNumber(3); // 6 (1+2+3)
 * calculateTriangularNumber(4); // 10 (1+2+3+4)
 * calculateTriangularNumber(5); // 15 (1+2+3+4+5)
 *
 * @example
 * // Larger triangular numbers
 * calculateTriangularNumber(10); // 55
 * calculateTriangularNumber(100); // 5050
 *
 * @example
 * // Visual representation
 * // T(3) = 6:
 * //   *
 * //   * *
 * //   * * *
 *
 * @note Formula: T(n) = n × (n + 1) / 2
 * @note Triangular numbers represent the sum of first n natural numbers.
 * @note Named because they can be arranged in a triangular pattern.
 * @note Also called triangle numbers or triangular pyramidal numbers.
 * @note T(n) gives the number of dots in a triangular array with n rows.
 * @note Common uses: combinatorics, algorithm complexity, number theory.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculateTriangularNumber(n: number): number {
  if (isNaN(n)) {
    throw new Error('Input must be a number');
  }
  if (!Number.isInteger(n)) {
    throw new Error('Input must be an integer');
  }
  if (n < 0) {
    throw new Error('Input must be a non-negative integer');
  }
  return (n * (n + 1)) / 2;
}
