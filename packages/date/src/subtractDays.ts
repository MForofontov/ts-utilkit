/**
 * Subtracts a specified number of days from a Date object.
 *
 * This is a named convenience complement to `addDays(date, -n)` that makes
 * subtraction intent explicit and improves readability.
 *
 * @param date - The original Date object.
 * @param days - The number of days to subtract (must be non-negative for expected behaviour).
 * @returns A new Date object with the specified days subtracted.
 *
 * @throws {Error} If date is invalid (e.g., new Date('invalid')).
 * @throws {Error} If days is NaN.
 *
 * @example
 * // Basic subtraction
 * subtractDays(new Date('2025-01-15'), 5); // 2025-01-10
 *
 * @example
 * // Crosses month boundary
 * subtractDays(new Date('2025-03-05'), 10); // 2025-02-23
 *
 * @example
 * // Crosses year boundary
 * subtractDays(new Date('2025-01-03'), 5); // 2024-12-29
 *
 * @example
 * // Zero days returns same date
 * subtractDays(new Date('2025-06-01'), 0); // 2025-06-01
 *
 * @note Creates a new Date object, leaving the original unchanged (immutable operation).
 * @note Passing a negative value for `days` effectively adds days instead.
 * @note Automatically handles month and year boundaries.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function subtractDays(date: Date, days: number): Date {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  if (isNaN(days)) {
    throw new Error('Days must be a number');
  }

  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}
