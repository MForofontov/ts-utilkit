/**
 * Calculates the last day of the year for a given date.
 *
 * @param date - The Date object to get the year's end from.
 * @returns A new Date object representing December 31st at midnight (00:00:00.000).
 *
 * @throws {Error} If date is invalid.
 *
 * @example
 * // Basic usage
 * const date = new Date('2025-06-15');
 * getEndOfYear(date); // Returns 2025-12-31T00:00:00.000
 *
 * @example
 * // Beginning of year
 * const jan = new Date('2025-01-01');
 * getEndOfYear(jan); // Returns 2025-12-31T00:00:00.000
 *
 * @example
 * // Already end of year
 * const dec = new Date('2025-12-20');
 * getEndOfYear(dec); // Returns 2025-12-31T00:00:00.000
 *
 * @example
 * // Current year end
 * const now = new Date();
 * const yearEnd = getEndOfYear(now);
 * console.log(`Year ends on: ${yearEnd.toDateString()}`);
 *
 * @example
 * // Real-world: fiscal year end
 * const today = new Date();
 * const fiscalYearEnd = getEndOfYear(today);
 * const daysUntilEnd = Math.ceil((fiscalYearEnd.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
 *
 * @note Always returns December 31st of the same year as the input date.
 * @note Time is set to midnight (00:00:00.000), not end of day.
 * @note Creates a new Date object without modifying the original.
 * @note Useful for date range queries and annual planning.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function getEndOfYear(date: Date): Date {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  return new Date(date.getFullYear(), 11, 31);
}
