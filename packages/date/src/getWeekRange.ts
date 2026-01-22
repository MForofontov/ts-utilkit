import { getEndOfWeek } from './getEndOfWeek';
import { getStartOfWeek } from './getStartOfWeek';

/**
 * Calculates the start and end dates of the week containing a given date.
 *
 * @param date - The Date object to get the week range for.
 * @param startOfWeek - The first day of the week (0=Sunday, 1=Monday, ..., 6=Saturday). Default: 0.
 * @returns An object with 'start' (first moment) and 'end' (last moment) Date objects for the week.
 *
 * @throws {Error} If date is invalid.
 * @throws {Error} If startOfWeek is not between 0 and 6.
 *
 * @example
 * // Week starting Sunday (default)
 * const thursday = new Date('2025-01-09');
 * getWeekRange(thursday);
 * // Returns: { start: 2025-01-05T00:00:00.000, end: 2025-01-11T23:59:59.999 }
 *
 * @example
 * // Week starting Monday (ISO week)
 * const thursday = new Date('2025-01-09');
 * getWeekRange(thursday, 1);
 * // Returns: { start: 2025-01-06T00:00:00.000, end: 2025-01-12T23:59:59.999 }
 *
 * @example
 * // Week starting Wednesday
 * const friday = new Date('2025-01-10');
 * getWeekRange(friday, 3);
 * // Returns: { start: 2025-01-08T00:00:00.000, end: 2025-01-14T23:59:59.999 }
 *
 * @example
 * // Real-world: weekly report range
 * const today = new Date();
 * const { start, end } = getWeekRange(today, 1); // Monday-based week
 * const report = await generateReport(start, end);
 *
 * @example
 * // Display week range
 * const { start, end } = getWeekRange(new Date());
 * console.log(`Week: ${start.toDateString()} - ${end.toDateString()}`);
 *
 * @note Start date is set to 00:00:00.000 (first moment of the day).
 * @note End date is set to 23:59:59.999 (last moment of the day).
 * @note Useful for date range queries covering an entire week.
 * @note Uses getStartOfWeek and getEndOfWeek internally.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function getWeekRange(
  date: Date,
  startOfWeek: number = 0,
): { start: Date; end: Date } {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  if (isNaN(startOfWeek) || startOfWeek < 0 || startOfWeek > 6) {
    throw new Error(
      'Invalid startOfWeek value. It must be a number between 0 (Sunday) and 6 (Saturday).',
    );
  }

  const start = getStartOfWeek(date, startOfWeek);
  const end = getEndOfWeek(date, startOfWeek);
  return { start, end };
}
