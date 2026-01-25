/**
 * Checks if a given date falls on a weekend (Saturday or Sunday).
 *
 * @param date - The Date object to check.
 * @returns True if the date is a Saturday or Sunday, false otherwise.
 *
 * @throws {Error} If the date is invalid (e.g., new Date('invalid')).
 *
 * @example
 * // Weekend days
 * isWeekend(new Date('2024-09-21')); // true (Saturday)
 * isWeekend(new Date('2024-09-22')); // true (Sunday)
 *
 * @example
 * // Weekdays
 * isWeekend(new Date('2024-09-23')); // false (Monday)
 * isWeekend(new Date('2024-09-19')); // false (Thursday)
 *
 * @example
 * // Check current date
 * const today = new Date();
 * isWeekend(today); // true if today is Sat/Sun, false otherwise
 *
 * @example
 * // Historical dates
 * isWeekend(new Date('2000-01-01')); // true (Saturday)
 * isWeekend(new Date('1999-12-31')); // false (Friday)
 *
 * @note Saturday is day 6 and Sunday is day 0 in JavaScript's getDay() method.
 * @note Only checks the day of the week; time portion of the Date is ignored.
 * @note Uses local time zone for day calculation.
 * @note This follows the standard Western weekend definition (Sat-Sun).
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function isWeekend(date: Date): boolean {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  const day = date.getDay();
  return day === 0 || day === 6;
}
