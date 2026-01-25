/**
 * Calculates the square root of a number.
 *
 * @param n - The number to find the square root of.
 * @returns The square root of the number.
 *
 * @example
 * // Perfect squares
 * calculateSquareRoot(9); // 3
 * calculateSquareRoot(16); // 4
 * calculateSquareRoot(25); // 5
 *
 * @example
 * // Non-perfect squares
 * calculateSquareRoot(2); // 1.4142135623730951
 * calculateSquareRoot(10); // 3.1622776601683795
 *
 * @example
 * // Edge cases
 * calculateSquareRoot(0); // 0
 * calculateSquareRoot(1); // 1
 * calculateSquareRoot(0.25); // 0.5
 *
 * @example
 * // Large numbers
 * calculateSquareRoot(1000000); // 1000
 * calculateSquareRoot(144); // 12
 *
 * @note Wraps Math.sqrt(); negative inputs return NaN in JavaScript.
 * @note For complex results, consider using complex number libraries.
 * @note The square root of x is the number that, when multiplied by itself, equals x.
 * @note Useful for distance calculations, standard deviation, and geometric formulas.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculateSquareRoot(n: number): number {
  if (isNaN(n)) {
    throw new Error('Input must be a number');
  }
  if (n < 0) {
    throw new Error('Input must be a non-negative number');
  }
  return Math.sqrt(n);
}
