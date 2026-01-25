/**
 * Calculates the last day of the month immediately before the month of a given date.
 *
 * @param date - The Date object to get the previous month's last day from.
 * @returns A new Date object representing the last day of the previous month at midnight.
 *
 * @throws {Error} If date is invalid.
 *
 * @example
 * // Basic usage
 * const march = new Date('2025-03-15');
 * getLastDayOfPreviousMonth(march); // Returns 2025-02-28T00:00:00.000
 *
 * @example
 * // From January (goes to previous year)
 * const jan = new Date('2025-01-15');
 * getLastDayOfPreviousMonth(jan); // Returns 2024-12-31T00:00:00.000
 *
 * @example
 * // Leap year February
 * const march2024 = new Date('2024-03-15');
 * getLastDayOfPreviousMonth(march2024); // Returns 2024-02-29T00:00:00.000
 *
 * @example
 * // Month with 31 days
 * const feb = new Date('2025-02-10');
 * getLastDayOfPreviousMonth(feb); // Returns 2025-01-31T00:00:00.000
 *
 * @example
 * // Real-world: previous month report
 * const today = new Date();
 * const lastMonthEnd = getLastDayOfPreviousMonth(today);
 * const report = await generateMonthlyReport(lastMonthEnd);
 *
 * @note Automatically handles year transitions (e.g., from January to December of previous year).
 * @note Correctly handles leap years for February.
 * @note Time is set to midnight (00:00:00.000).
 * @note Creates a new Date object without modifying the original.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function getLastDayOfPreviousMonth(date: Date): Date {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month, 0);
}
