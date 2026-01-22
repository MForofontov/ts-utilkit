/**
 * Calculates the start date of the week for a given date with configurable week start day.
 *
 * @param date - The Date object to get the week start from.
 * @param startOfWeek - The first day of the week (0=Sunday, 1=Monday, ..., 6=Saturday). Default: 0.
 * @returns A new Date object representing the first moment of the week (00:00:00.000).
 *
 * @throws {Error} If date is invalid.
 * @throws {Error} If startOfWeek is not between 0 and 6.
 *
 * @example
 * // Week starting Sunday (default)
 * const thursday = new Date('2025-01-09'); // Thursday
 * getStartOfWeek(thursday); // Returns Sunday, 2025-01-05T00:00:00.000
 *
 * @example
 * // Week starting Monday (ISO week)
 * const thursday = new Date('2025-01-09'); // Thursday
 * getStartOfWeek(thursday, 1); // Returns Monday, 2025-01-06T00:00:00.000
 *
 * @example
 * // Week starting Wednesday
 * const thursday = new Date('2025-01-09'); // Thursday
 * getStartOfWeek(thursday, 3); // Returns Wednesday, 2025-01-08T00:00:00.000
 *
 * @example
 * // Current week start
 * const now = new Date();
 * const weekStart = getStartOfWeek(now);
 * console.log(`Week started on: ${weekStart.toDateString()}`);
 *
 * @example
 * // Real-world: weekly statistics
 * const today = new Date();
 * const weekStart = getStartOfWeek(today, 1); // ISO week (Monday)
 * const sales = await getSalesSince(weekStart);
 *
 * @note Time is set to midnight (00:00:00.000).
 * @note Creates a new Date object without modifying the original.
 * @note Useful for date range queries and grouping by week.
 * @note ISO 8601 weeks start on Monday (use startOfWeek=1).
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function getStartOfWeek(date: Date, startOfWeek: number = 0): Date {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  if (isNaN(startOfWeek) || startOfWeek < 0 || startOfWeek > 6) {
    throw new Error(
      'Invalid startOfWeek value. It must be a number between 0 (Sunday) and 6 (Saturday).',
    );
  }

  const diff = (date.getDay() - startOfWeek + 7) % 7;
  const startOfWeekDate = new Date(date);
  startOfWeekDate.setDate(date.getDate() - diff);
  startOfWeekDate.setHours(0, 0, 0, 0);
  return startOfWeekDate;
}
