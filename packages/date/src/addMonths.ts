/**
 * Adds a specified number of months to a `Date` instance.
 *
 * @param date - The original `Date` object.
 * @param months - The number of months to add (can be negative to subtract).
 * @returns A new `Date` object with the months added.
 *
 * @throws {Error} If date is invalid (e.g., new Date('invalid')).
 * @throws {Error} If months is NaN.
 *
 * @example
 * // Basic usage - add months
 * const date = new Date('2025-01-15');
 * addMonths(date, 3); // Returns Date object for '2025-04-15'
 *
 * @example
 * // Subtract months using negative values
 * const date = new Date('2025-06-15');
 * addMonths(date, -2); // Returns Date object for '2025-04-15'
 *
 * @example
 * // Year rollover
 * addMonths(new Date('2025-11-15'), 3); // Returns Date object for '2026-02-15'
 *
 * @example
 * // Handles day overflow (e.g., Jan 31 + 1 month)
 * addMonths(new Date('2025-01-31'), 1); // Returns Date object for '2025-02-28' (or Feb 29 in leap year)
 * addMonths(new Date('2025-03-31'), 1); // Returns Date object for '2025-04-30'
 *
 * @example
 * // Zero months returns same date
 * addMonths(new Date('2025-01-15'), 0); // Returns Date object for '2025-01-15'
 *
 * @note Creates a new Date object, leaving the original unchanged (immutable operation).
 * @note When adding months causes day overflow, JavaScript automatically adjusts to the last valid day.
 * @note For example: Jan 31 + 1 month = Feb 28/29 (not Mar 2/3).
 * @note Automatically handles year rollovers.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function addMonths(date: Date, months: number): Date {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  if (isNaN(months)) {
    throw new Error('Months must be a number');
  }

  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}
