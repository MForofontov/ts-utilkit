/**
 * Subtracts a specified number of months from a Date object.
 *
 * This is a named convenience complement to `addMonths(date, -n)` that makes
 * subtraction intent explicit and improves readability.
 *
 * @param date - The original Date object.
 * @param months - The number of months to subtract (must be non-negative for expected behaviour).
 * @returns A new Date object with the specified months subtracted.
 *
 * @throws {Error} If date is invalid (e.g., new Date('invalid')).
 * @throws {Error} If months is NaN.
 *
 * @example
 * // Basic subtraction
 * subtractMonths(new Date('2025-06-15'), 3); // 2025-03-15
 *
 * @example
 * // Crosses year boundary
 * subtractMonths(new Date('2025-02-15'), 3); // 2024-11-15
 *
 * @example
 * // Day overflow (March 31 - 1 month = Feb 28)
 * subtractMonths(new Date('2025-03-31'), 1); // 2025-02-28
 *
 * @example
 * // Zero months returns same date
 * subtractMonths(new Date('2025-06-01'), 0); // 2025-06-01
 *
 * @note Creates a new Date object, leaving the original unchanged (immutable operation).
 * @note When subtraction causes a day overflow, JavaScript adjusts to the last valid day
 *   (e.g., March 31 − 1 month = February 28/29, not March 2/3).
 * @note Passing a negative value for `months` effectively adds months instead.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function subtractMonths(date: Date, months: number): Date {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  if (isNaN(months)) {
    throw new Error('Months must be a number');
  }

  const result = new Date(date);
  result.setMonth(result.getMonth() - months);
  return result;
}
