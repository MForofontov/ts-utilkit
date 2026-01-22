/**
 * Determines if a number is odd or even.
 *
 * @param n - The integer number to check.
 * @returns "odd" if the number is odd, "even" if the number is even.
 *
 * @throws {Error} If n is not a valid integer.
 *
 * @example
 * // Positive numbers
 * oddOrEven(3); // "odd"
 * oddOrEven(4); // "even"
 * oddOrEven(100); // "even"
 *
 * @example
 * // Negative numbers
 * oddOrEven(-3); // "odd"
 * oddOrEven(-4); // "even"
 *
 * @example
 * // Zero
 * oddOrEven(0); // "even"
 *
 * @example
 * // Large numbers
 * oddOrEven(999999); // "odd"
 * oddOrEven(1000000); // "even"
 *
 * @example
 * // Conditional logic
 * const num = 42;
 * const parity = oddOrEven(num);
 * console.log(`${num} is ${parity}`); // "42 is even"
 *
 * @note Uses the modulo operator (%) to determine parity.
 * @note Zero is considered even (0 = 2 × 0).
 * @note Negative numbers follow the same rules: -2 is even, -3 is odd.
 * @note Only accepts integers; will throw an error for decimal numbers.
 * @note For boolean checks, use isEven() or isOdd() functions instead.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function oddOrEven(n: number): string {
  if (isNaN(n)) {
    throw new Error('Input must be a number');
  }
  if (!Number.isInteger(n)) {
    throw new Error('Input must be an integer');
  }
  return n % 2 === 0 ? 'even' : 'odd';
}
