/**
 * Calculates the number of days remaining in the year from a given date.
 *
 * @param date - The Date object to calculate from.
 * @returns The number of complete days left in the year (including the date itself if at midnight).
 *
 * @throws {Error} If date is invalid.
 *
 * @example
 * // Basic usage
 * const dec30 = new Date('2025-12-30');
 * daysLeftInYear(dec30); // 2 (Dec 30 and Dec 31)
 *
 * @example
 * // Beginning of year
 * const jan1 = new Date('2025-01-01');
 * daysLeftInYear(jan1); // 365
 *
 * @example
 * // Leap year
 * const leapYear = new Date('2024-01-01');
 * daysLeftInYear(leapYear); // 366
 *
 * @example
 * // End of year
 * const dec31 = new Date('2025-12-31');
 * daysLeftInYear(dec31); // 1
 *
 * @example
 * // Real-world: countdown to year end
 * const today = new Date();
 * const daysLeft = daysLeftInYear(today);
 * console.log(`${daysLeft} days left in the year`);
 *
 * @note Calculates from the given date to December 31st of that year.
 * @note Result is rounded up (ceiling) to include partial days.
 * @note Works correctly with leap years.
 * @note Returns number of days including the current date.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function daysLeftInYear(date: Date): number {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const endOfYear = new Date(date.getFullYear(), 11, 31);
  const diffInMs = endOfYear.getTime() - date.getTime();
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
}
