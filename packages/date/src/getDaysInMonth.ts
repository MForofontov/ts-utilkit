/**
 * Gets the number of days in the month for a given date.
 *
 * @param date - The Date object to get the month's day count from.
 * @returns The number of days in the month (28, 29, 30, or 31).
 *
 * @throws {Error} If the date is invalid (e.g., new Date('invalid')).
 *
 * @example
 * // Regular months
 * getDaysInMonth(new Date('2024-09-19')); // 30 (September)
 * getDaysInMonth(new Date('2024-01-15')); // 31 (January)
 *
 * @example
 * // February in leap year
 * getDaysInMonth(new Date('2024-02-10')); // 29
 *
 * @example
 * // February in non-leap year
 * getDaysInMonth(new Date('2025-02-10')); // 28
 *
 * @example
 * // Different months with 31 days
 * getDaysInMonth(new Date('2025-03-01')); // 31 (March)
 * getDaysInMonth(new Date('2025-12-25')); // 31 (December)
 *
 * @example
 * // Months with 30 days
 * getDaysInMonth(new Date('2025-04-01')); // 30 (April)
 * getDaysInMonth(new Date('2025-06-01')); // 30 (June)
 *
 * @note Automatically accounts for leap years when calculating February days.
 * @note Returns the same value regardless of the day of month in the input date.
 * @note Uses JavaScript's Date() constructor with day=0 to get last day of previous month.
 * @note Possible return values: 28, 29, 30, or 31.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function getDaysInMonth(date: Date): number {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month + 1, 0).getDate();
}
