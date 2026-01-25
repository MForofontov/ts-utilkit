/**
 * Formats a number in scientific notation (exponential format).
 * Useful for very large or very small numbers.
 *
 * @param value - The number to format.
 * @param decimals - Number of decimal places in the mantissa (default: 2).
 * @returns A string in scientific notation (e.g., "1.23e+5").
 *
 * @throws {TypeError} If value is not a number or is NaN.
 * @throws {TypeError} If decimals is not a number or is NaN.
 * @throws {Error} If decimals is negative.
 *
 * @example
 * // Basic usage
 * formatScientific(12345); // Returns "1.23e+4"
 *
 * @example
 * // Large numbers
 * formatScientific(1234567890); // Returns "1.23e+9"
 *
 * @example
 * // Small numbers
 * formatScientific(0.00012345, 3); // Returns "1.235e-4"
 *
 * @example
 * // Custom decimals
 * formatScientific(123.456, 0); // Returns "1e+2"
 *
 * @example
 * // Zero
 * formatScientific(0); // Returns "0.00e+0"
 *
 * @note The function uses exponential notation with "e" for the exponent.
 * Positive exponents use "+", negative exponents use "-".
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function formatScientific(value: number, decimals: number = 2): string {
  // Input validation
  if (typeof value !== 'number' || isNaN(value)) {
    throw new TypeError(`value must be a number, got ${typeof value}`);
  }
  if (typeof decimals !== 'number' || isNaN(decimals)) {
    throw new TypeError(`decimals must be a number, got ${typeof decimals}`);
  }

  if (decimals < 0) {
    throw new Error(`decimals must be non-negative, got ${decimals}`);
  }

  return value.toExponential(decimals);
}
