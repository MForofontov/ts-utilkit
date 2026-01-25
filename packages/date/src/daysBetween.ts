/**
 * Calculates the number of days between two dates.
 *
 * @param date1 - The first Date object (earlier date).
 * @param date2 - The second Date object (later date).
 * @returns The number of whole days between the two dates (non-negative integer).
 *
 * @throws {Error} If either date is invalid (NaN timestamp).
 * @throws {Error} If the first date is later than the second date.
 *
 * @example
 * // Basic usage
 * const startDate = new Date('2024-01-01');
 * const endDate = new Date('2024-12-31');
 * daysBetween(startDate, endDate); // 365
 *
 * @example
 * // Same year dates
 * daysBetween(new Date('2024-01-01'), new Date('2024-01-31')); // 30
 * daysBetween(new Date('2024-06-01'), new Date('2024-06-15')); // 14
 *
 * @example
 * // Leap year consideration
 * daysBetween(new Date('2024-01-01'), new Date('2024-03-01')); // 60 (2024 is leap year)
 * daysBetween(new Date('2023-01-01'), new Date('2023-03-01')); // 59 (2023 is not)
 *
 * @example
 * // Same date
 * daysBetween(new Date('2024-06-15'), new Date('2024-06-15')); // 0
 *
 * @example
 * // Multiple years
 * daysBetween(new Date('2020-01-01'), new Date('2024-01-01')); // 1461 (includes leap year)
 *
 * @note Always provide date1 as the earlier date and date2 as the later date.
 * @note Returns the number of whole days (fractional days are floored).
 * @note The calculation ignores time components (hours, minutes, seconds).
 * @note For negative time spans, the function throws an error instead of returning negative values.
 * @note Useful for calculating date ranges, age calculations, and duration measurements.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function daysBetween(date1: Date, date2: Date): number {
  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
    throw new Error('Invalid date');
  }

  if (date1 > date2) {
    throw new Error('The first date must be earlier than the second date');
  }

  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = date2.getTime() - date1.getTime();
  return Math.floor(diffInTime / oneDay);
}
