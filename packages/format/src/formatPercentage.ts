/**
 * Formats a number as a percentage with optional decimal places.
 * Supports custom suffix and multiplier options.
 *
 * @param value - The number to format as percentage (0.5 for 50% or 50 if notMultiply is true).
 * @param decimals - Number of decimal places (default: 0).
 * @param notMultiply - If true, treats input as already a percentage (50 instead of 0.5) (default: false).
 * @param suffix - Custom suffix to use instead of "%" (default: "%").
 * @returns A formatted percentage string.
 *
 * @throws {TypeError} If value is not a number or is NaN.
 * @throws {TypeError} If decimals is not a number or is NaN.
 * @throws {TypeError} If notMultiply is not a boolean.
 * @throws {TypeError} If suffix is not a string.
 * @throws {Error} If decimals is negative.
 *
 * @example
 * // Basic usage
 * formatPercentage(0.5); // Returns "50%"
 *
 * @example
 * // With decimals
 * formatPercentage(0.12345, 2); // Returns "12.35%"
 *
 * @example
 * // Without multiplication
 * formatPercentage(75, 0, true); // Returns "75%"
 *
 * @example
 * // Custom suffix
 * formatPercentage(0.95, 0, false, " percent"); // Returns "95 percent"
 *
 * @example
 * // Negative percentage
 * formatPercentage(-0.15, 1); // Returns "-15.0%"
 *
 * @note By default, the function multiplies the input by 100 (0.5 becomes 50%).
 * Set notMultiply to true if your input is already in percentage form.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function formatPercentage(
  value: number,
  decimals: number = 0,
  notMultiply: boolean = false,
  suffix: string = '%',
): string {
  // Input validation
  if (typeof value !== 'number' || isNaN(value)) {
    throw new TypeError(`value must be a number, got ${typeof value}`);
  }
  if (typeof decimals !== 'number' || isNaN(decimals)) {
    throw new TypeError(`decimals must be a number, got ${typeof decimals}`);
  }
  if (typeof notMultiply !== 'boolean') {
    throw new TypeError(
      `notMultiply must be a boolean, got ${typeof notMultiply}`,
    );
  }
  if (typeof suffix !== 'string') {
    throw new TypeError(`suffix must be a string, got ${typeof suffix}`);
  }

  if (decimals < 0) {
    throw new Error(`decimals must be non-negative, got ${decimals}`);
  }

  const percentage = notMultiply ? value : value * 100;
  return `${percentage.toFixed(decimals)}${suffix}`;
}
