/**
 * Calculates the last day of the month for a given date.
 *
 * @param date - The Date object to get the month's end from.
 * @returns A new Date object representing the last day of the month at midnight.
 *
 * @throws {Error} If date is invalid.
 *
 * @example
 * // Basic usage
 * const date = new Date('2025-01-15');
 * getEndOfMonth(date); // Returns 2025-01-31T00:00:00
 *
 * @example
 * // February in regular year
 * const feb = new Date('2025-02-10');
 * getEndOfMonth(feb); // Returns 2025-02-28T00:00:00
 *
 * @example
 * // February in leap year
 * const febLeap = new Date('2024-02-10');
 * getEndOfMonth(febLeap); // Returns 2024-02-29T00:00:00
 *
 * @example
 * // Months with 30 days
 * const april = new Date('2025-04-15');
 * getEndOfMonth(april); // Returns 2025-04-30T00:00:00
 *
 * @example
 * // Real-world: billing period
 * const today = new Date();
 * const billingEnd = getEndOfMonth(today);
 * console.log(`Billing ends on: ${billingEnd.toDateString()}`);
 *
 * @note Creates a new Date object without modifying the original.
 * @note Automatically handles different month lengths (28, 29, 30, 31 days).
 * @note Correctly handles leap years for February.
 * @note Time is set to midnight (00:00:00.000).
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function getEndOfMonth(date: Date): Date {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return lastDay;
}
