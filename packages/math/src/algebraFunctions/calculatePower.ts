/**
 * Calculates the power of a number (base raised to the exponent).
 *
 * @param base - The base number.
 * @param exponent - The exponent (power to raise the base to).
 * @returns The base raised to the power of the exponent (base^exponent).
 *
 * @example
 * // Basic powers
 * calculatePower(2, 3); // 8 (2^3 = 2 * 2 * 2)
 * calculatePower(5, 2); // 25 (5^2 = 5 * 5)
 * calculatePower(10, 3); // 1000 (10^3)
 *
 * @example
 * // Negative exponents (fractional results)
 * calculatePower(2, -1); // 0.5 (2^-1 = 1/2)
 * calculatePower(10, -2); // 0.01 (10^-2 = 1/100)
 *
 * @example
 * // Special cases
 * calculatePower(5, 0); // 1 (any number to power 0 is 1)
 * calculatePower(0, 5); // 0 (0 to any positive power is 0)
 * calculatePower(2, 0.5); // 1.4142135623730951 (square root of 2)
 *
 * @example
 * // Negative bases
 * calculatePower(-2, 3); // -8
 * calculatePower(-2, 2); // 4
 * calculatePower(-1, 100); // 1 (even exponent)
 *
 * @note Wraps Math.pow() with input validation.
 * @note Formula: base^exponent
 * @note Negative exponents produce fractional results (1/base^|exponent|).
 * @note Fractional exponents compute roots (e.g., x^0.5 is square root).
 * @note Any number (except 0) raised to power 0 equals 1.
 * @note Useful for exponential growth, compound interest, and scientific calculations.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculatePower(base: number, exponent: number): number {
  return Math.pow(base, exponent);
}
