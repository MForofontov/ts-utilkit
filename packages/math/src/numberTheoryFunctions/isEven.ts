/**
 * Checks if a number is even.
 *
 * @param n - The number to check.
 * @returns True if the number is even (divisible by 2), false if it is odd.
 *
 * @example
 * // Even numbers
 * isEven(0); // true
 * isEven(2); // true
 * isEven(4); // true
 * isEven(100); // true
 *
 * @example
 * // Odd numbers
 * isEven(1); // false
 * isEven(3); // false
 * isEven(99); // false
 *
 * @example
 * // Negative numbers
 * isEven(-2); // true
 * isEven(-4); // true
 * isEven(-3); // false
 *
 * @example
 * // Decimal numbers
 * isEven(2.5); // false (not divisible by 2)
 * isEven(4.0); // true (effectively an integer)
 *
 * @note A number is even if it is divisible by 2 with no remainder (n % 2 === 0).
 * @note Zero is considered even by mathematical convention.
 * @note Works with negative numbers (e.g., -4 is even).
 * @note For non-integers, checks if the number modulo 2 equals 0.
 * @note Complement function: isOdd() checks for odd numbers.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function isEven(n: number): boolean {
  return n % 2 === 0;
}
