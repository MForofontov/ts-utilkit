/**
 * Calculates the first day of the year for a given date.
 *
 * @param date - The Date object to get the year's start from.
 * @returns A new Date object representing January 1st at midnight (00:00:00.000).
 *
 * @throws {Error} If date is invalid.
 *
 * @example
 * // Basic usage
 * const date = new Date('2025-06-15');
 * getStartOfYear(date); // Returns 2025-01-01T00:00:00.000
 *
 * @example
 * // Beginning of year
 * const jan = new Date('2025-01-20');
 * getStartOfYear(jan); // Returns 2025-01-01T00:00:00.000
 *
 * @example
 * // End of year
 * const dec = new Date('2025-12-31');
 * getStartOfYear(dec); // Returns 2025-01-01T00:00:00.000
 *
 * @example
 * // Current year start
 * const now = new Date();
 * const yearStart = getStartOfYear(now);
 * console.log(`Year started on: ${yearStart.toDateString()}`);
 *
 * @example
 * // Real-world: annual statistics
 * const today = new Date();
 * const yearStart = getStartOfYear(today);
 * const annualSales = await getSalesSince(yearStart);
 *
 * @note Always returns January 1st of the same year as the input date.
 * @note Time is set to midnight (00:00:00.000).
 * @note Creates a new Date object without modifying the original.
 * @note Useful for date range queries and annual calculations.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function getStartOfYear(date: Date): Date {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  return new Date(date.getFullYear(), 0, 1);
}
