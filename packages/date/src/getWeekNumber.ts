/**
 * Gets the ISO week number of the year for a given date (1-53).
 *
 * @param date - The Date object to get the week number for.
 * @returns The week number of the year (1-53, where week 1 starts on the first Monday).
 *
 * @throws {Error} If the date is invalid (e.g., new Date('invalid')).
 *
 * @example
 * // Regular week
 * const date = new Date('2024-09-19');
 * getWeekNumber(date); // 38
 *
 * @example
 * // First week of year
 * getWeekNumber(new Date('2024-01-08')); // 2
 * getWeekNumber(new Date('2024-01-01')); // 1
 *
 * @example
 * // Last week of year
 * getWeekNumber(new Date('2024-12-30')); // 53 (or 1 of next year)
 *
 * @example
 * // Week boundaries
 * getWeekNumber(new Date('2024-03-04')); // Monday - starts new week
 * getWeekNumber(new Date('2024-03-10')); // Sunday - ends the week
 *
 * @note This uses a simplified week calculation starting from January 1.
 * @note Week 1 is the first week of the year; this differs from ISO 8601.
 * @note For true ISO 8601 week numbers, use getISOWeekDate function instead.
 * @note Calculation: days since Jan 1 divided by 7, rounded up.
 * @note Common use cases: calendar displays, weekly reports, scheduling.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function getWeekNumber(date: Date): number {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const start = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor(
    (date.getTime() - start.getTime()) / (24 * 60 * 60 * 1000),
  );
  return Math.ceil((days + start.getDay() + 1) / 7);
}
