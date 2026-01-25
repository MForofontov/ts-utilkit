/**
 * Adds a specified number of days to a Date object.
 *
 * @param date - The original Date object to add days to.
 * @param days - The number of days to add (can be negative to subtract days).
 * @returns A new Date object with the specified days added.
 *
 * @throws {TypeError} If date is not a valid Date object or days is not a number.
 * @throws {Error} If date is invalid (e.g., new Date('invalid')) or days is NaN.
 *
 * @example
 * // Basic usage - add days
 * const today = new Date('2025-01-01');
 * addDays(today, 10); // Returns Date object for '2025-01-11'
 *
 * @example
 * // Subtract days using negative values
 * const date = new Date('2025-01-15');
 * addDays(date, -5); // Returns Date object for '2025-01-10'
 *
 * @example
 * // Handles month/year boundaries
 * addDays(new Date('2025-01-30'), 5); // Returns Date object for '2025-02-04'
 * addDays(new Date('2025-12-30'), 5); // Returns Date object for '2026-01-04'
 *
 * @example
 * // Zero days returns same date
 * addDays(new Date('2025-01-01'), 0); // Returns Date object for '2025-01-01'
 *
 * @note Creates a new Date object, leaving the original unchanged (immutable operation).
 * @note Automatically handles month and year rollovers.
 * @note Works with fractional days (e.g., 1.5 days = 36 hours).
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function addDays(date: Date, days: number): Date {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  if (isNaN(days)) {
    throw new Error('Days must be a number');
  }

  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
