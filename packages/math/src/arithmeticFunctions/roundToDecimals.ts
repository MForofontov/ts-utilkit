/**
 * Rounds a number to a specified number of decimal places.
 *
 * @param value - The number to round.
 * @param decimals - The number of decimal places (must be a non-negative integer).
 * @returns The rounded number.
 *
 * @throws {Error} If value or decimals is not a number, if decimals is not an integer, or if decimals is negative.
 *
 * @example
 * // Basic rounding
 * roundToDecimals(5.6789, 2); // 5.68
 * roundToDecimals(3.14159, 3); // 3.142
 *
 * @example
 * // Rounding to whole numbers
 * roundToDecimals(5.6789, 0); // 6
 * roundToDecimals(5.4, 0); // 5
 *
 * @example
 * // Financial calculations
 * roundToDecimals(19.995, 2); // 20.00
 * roundToDecimals(0.1 + 0.2, 2); // 0.3 (fixes floating-point precision)
 *
 * @example
 * // Many decimal places
 * roundToDecimals(Math.PI, 5); // 3.14159
 * roundToDecimals(Math.E, 4); // 2.7183
 *
 * @example
 * // Negative numbers
 * roundToDecimals(-5.6789, 2); // -5.68
 * roundToDecimals(-3.14159, 3); // -3.142
 *
 * @note Uses multiplication and division by powers of 10 to achieve precise rounding.
 * @note Avoids some floating-point precision issues but not all (use with caution for critical financial calculations).
 * @note A decimals value of 0 rounds to the nearest integer.
 * @note Common use cases: currency formatting, scientific measurements, display formatting.
 * @note For financial applications, consider using specialized decimal libraries for absolute precision.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function roundToDecimals(value: number, decimals: number): number {
  if (isNaN(value) || isNaN(decimals)) {
    throw new Error('Both value and decimals must be numbers');
  }
  if (!Number.isInteger(decimals)) {
    throw new Error('Decimals must be an integer');
  }
  if (decimals < 0) {
    throw new Error('Decimals must be a non-negative integer');
  }
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
