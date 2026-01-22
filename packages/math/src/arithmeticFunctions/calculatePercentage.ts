/**
 * Calculates what percentage one number is of another.
 *
 * @param total - The total value (denominator).
 * @param part - The part value to calculate the percentage of (numerator).
 * @returns The percentage of the part with respect to the total (unrounded).
 *
 * @example
 * // Basic usage
 * calculatePercentage(200, 50); // 25 (50 is 25% of 200)
 * calculatePercentage(100, 25); // 25 (25 is 25% of 100)
 *
 * @example
 * // Decimal results
 * calculatePercentage(200, 75); // 37.5
 * calculatePercentage(300, 123); // 41
 *
 * @example
 * // Greater than 100%
 * calculatePercentage(50, 100); // 200 (100 is 200% of 50)
 * calculatePercentage(25, 50); // 200
 *
 * @example
 * // Edge cases
 * calculatePercentage(100, 0); // 0 (0% of anything is 0)
 * calculatePercentage(100, 100); // 100 (100% of 100)
 * calculatePercentage(-100, 50); // -50 (negative total)
 *
 * @note Formula: (part / total) * 100
 * @note A zero total returns Infinity; NaN inputs propagate to the result.
 * @note The result is not rounded; use roundToDecimals() if rounding is needed.
 * @note Can return values > 100% when part is greater than total.
 * @note Can handle negative numbers, resulting in negative percentages.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculatePercentage(total: number, part: number): number {
  return (part / total) * 100;
}
