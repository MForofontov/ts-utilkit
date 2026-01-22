/**
 * Checks if a number is odd.
 *
 * @param n - The number to check (must be an integer).
 * @returns True if the number is odd (not divisible by 2), false if it is even.
 *
 * @throws {Error} If n is not a valid integer.
 *
 * @example
 * // Odd numbers
 * isOdd(1); // true
 * isOdd(3); // true
 * isOdd(5); // true
 * isOdd(99); // true
 *
 * @example
 * // Even numbers
 * isOdd(0); // false
 * isOdd(2); // false
 * isOdd(4); // false
 * isOdd(100); // false
 *
 * @example
 * // Negative numbers
 * isOdd(-1); // true
 * isOdd(-3); // true
 * isOdd(-2); // false
 * isOdd(-4); // false
 *
 * @note A number is odd if it is not divisible by 2 (n % 2 !== 0).
 * @note Only works with integers; throws an error for non-integers.
 * @note Zero is considered even (not odd).
 * @note Works with negative numbers (e.g., -3 is odd).
 * @note Complement function: isEven() checks for even numbers.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function isOdd(n: number): boolean {
  if (isNaN(n)) {
    throw new Error('Input must be a number');
  }
  if (!Number.isInteger(n)) {
    throw new Error('Input must be an integer');
  }
  return n % 2 !== 0;
}
