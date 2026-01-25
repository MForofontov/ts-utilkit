/**
 * Calculates the end date of the week for a given date with configurable week start day.
 *
 * @param date - The Date object to get the week's end from.
 * @param startOfWeek - The first day of the week (0=Sunday, 1=Monday, ..., 6=Saturday). Default: 0.
 * @returns A new Date object representing the last moment of the week (23:59:59.999).
 *
 * @throws {Error} If date is invalid.
 * @throws {Error} If startOfWeek is not between 0 and 6.
 *
 * @example
 * // Week starting Sunday (default)
 * const tuesday = new Date('2025-01-07'); // Tuesday
 * getEndOfWeek(tuesday); // Returns Saturday, 2025-01-11T23:59:59.999
 *
 * @example
 * // Week starting Monday
 * const tuesday = new Date('2025-01-07'); // Tuesday
 * getEndOfWeek(tuesday, 1); // Returns Sunday, 2025-01-12T23:59:59.999
 *
 * @example
 * // Week starting Thursday
 * const tuesday = new Date('2025-01-07'); // Tuesday
 * getEndOfWeek(tuesday, 4); // Returns Wednesday, 2025-01-08T23:59:59.999
 *
 * @example
 * // End of current week
 * const now = new Date();
 * const weekEnd = getEndOfWeek(now);
 * console.log(`Week ends on: ${weekEnd.toDateString()}`);
 *
 * @example
 * // Real-world: weekly report deadline
 * const today = new Date();
 * const reportDeadline = getEndOfWeek(today, 1); // Monday-based week
 *
 * @note End of week is 6 days after the start of week day.
 * @note Time is set to 23:59:59.999 (last millisecond of the day).
 * @note Creates a new Date object without modifying the original.
 * @note Useful for date range queries and scheduling.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function getEndOfWeek(date: Date, startOfWeek: number = 0): Date {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  if (isNaN(startOfWeek) || startOfWeek < 0 || startOfWeek > 6) {
    throw new Error(
      'Invalid startOfWeek value. It must be a number between 0 (Sunday) and 6 (Saturday).',
    );
  }

  // Calculate the day of the week for the given date
  const dayOfWeek = date.getDay();

  // Calculate the difference to the end of the week
  const diffToEndOfWeek = 6 - ((dayOfWeek - startOfWeek + 7) % 7);

  // Calculate the end of the week date
  const endOfWeekDate = new Date(date);
  endOfWeekDate.setDate(date.getDate() + diffToEndOfWeek);
  endOfWeekDate.setHours(23, 59, 59, 999);

  return endOfWeekDate;
}
