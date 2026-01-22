/**
 * Calculates the logarithm of a number with a specified base.
 *
 * @param n - The number to find the logarithm of (must be positive).
 * @param base - The base of the logarithm (default: Math.E for natural logarithm).
 * @returns The logarithm of n with the specified base.
 *
 * @throws {Error} If n or base is not a valid number, if n is not positive, or if base is not positive or equals 1.
 *
 * @example
 * // Common logarithm (base 10)
 * calculateLogarithm(100, 10); // 2 (10^2 = 100)
 * calculateLogarithm(1000, 10); // 3 (10^3 = 1000)
 *
 * @example
 * // Binary logarithm (base 2)
 * calculateLogarithm(8, 2); // 3 (2^3 = 8)
 * calculateLogarithm(16, 2); // 4 (2^4 = 16)
 *
 * @example
 * // Natural logarithm (base e, default)
 * calculateLogarithm(Math.E); // 1 (e^1 = e)
 * calculateLogarithm(1); // 0 (e^0 = 1)
 * calculateLogarithm(Math.E ** 2); // 2
 *
 * @example
 * // Custom bases
 * calculateLogarithm(125, 5); // 3 (5^3 = 125)
 * calculateLogarithm(27, 3); // 3 (3^3 = 27)
 *
 * @note Formula: log_base(n) = ln(n) / ln(base)
 * @note Default base is Math.E (Euler's number ≈ 2.71828) for natural logarithm.
 * @note Base must be positive and not equal to 1 (log base 1 is undefined).
 * @note The logarithm is the inverse operation of exponentiation.
 * @note Common bases: 10 (common log), 2 (binary log), e (natural log).
 * @note Useful for exponential decay, complexity analysis, and information theory.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculateLogarithm(n: number, base: number = Math.E): number {
  if (isNaN(n) || isNaN(base)) {
    throw new Error('Both n and base must be numbers');
  }
  if (n <= 0) {
    throw new Error('Input must be a positive number');
  }
  if (base <= 0 || base === 1) {
    throw new Error('Base must be greater than 0 and not equal to 1');
  }
  return Math.log(n) / Math.log(base);
}
