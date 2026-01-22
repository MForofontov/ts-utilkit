/**
 * Calculates the decimal logarithm (base 10) of a number.
 *
 * @param n - The number to calculate the logarithm of.
 * @returns The base 10 logarithm of the number.
 *
 * @example
 * // Powers of 10
 * calculateLogBase10(100); // 2
 * calculateLogBase10(1000); // 3
 * calculateLogBase10(10); // 1
 *
 * @example
 * // Non-integer results
 * calculateLogBase10(50); // 1.6989700043360189
 * calculateLogBase10(2); // 0.3010299956639812
 *
 * @example
 * // Edge cases
 * calculateLogBase10(1); // 0 (10^0 = 1)
 * calculateLogBase10(0.1); // -1
 * calculateLogBase10(0.01); // -2
 *
 * @example
 * // Scientific notation magnitude
 * const value = 1000000; // 1e6
 * const magnitude = calculateLogBase10(value); // 6 (order of magnitude)
 *
 * @example
 * // Calculating pH (chemistry)
 * const hydrogenConcentration = 0.0001; // mol/L
 * const pH = -calculateLogBase10(hydrogenConcentration); // 4
 *
 * @note Wraps Math.log10(); returns `-Infinity` for input of 0 and `NaN` for negative values.
 * @note Useful for calculating orders of magnitude, decibels, pH values, and logarithmic scales.
 * @note Base 10 logarithm is commonly used in engineering and scientific applications.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculateLogBase10(n: number): number {
  return Math.log10(n);
}
