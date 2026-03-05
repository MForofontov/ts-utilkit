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

  if (decimals < 0) {
    throw new Error(`decimals must be non-negative, got ${decimals}`);
  }

  const percentage = notMultiply ? value : value * 100;
  return `${percentage.toFixed(decimals)}${suffix}`;
}
