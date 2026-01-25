/**
 * Calculates the date representing the same day in the next month.
 *
 * @param date - The Date object to advance by one month.
 * @returns A new Date object representing the same day in the next month.
 *
 * @throws {Error} If date is invalid.
 *
 * @example
 * // Basic usage
 * const jan15 = new Date('2025-01-15');
 * getNextMonth(jan15); // Returns 2025-02-15
 *
 * @example
 * // Year transition
 * const dec15 = new Date('2025-12-15');
 * getNextMonth(dec15); // Returns 2026-01-15
 *
 * @example
 * // Day overflow handling
 * const jan31 = new Date('2025-01-31');
 * getNextMonth(jan31); // Returns 2025-03-03 (Feb only has 28 days)
 *
 * @example
 * // Leap year handling
 * const jan31_2024 = new Date('2024-01-31');
 * getNextMonth(jan31_2024); // Returns 2024-03-02 (Feb 2024 has 29 days)
 *
 * @example
 * // Real-world: subscription renewal
 * const subscriptionStart = new Date();
 * const nextPayment = getNextMonth(subscriptionStart);
 * console.log(`Next payment due: ${nextPayment.toDateString()}`);
 *
 * @note JavaScript Date automatically handles month overflow (e.g., Jan 31 + 1 month may not be Feb 31).
 * @note If the day doesn't exist in the next month, it overflows to the following month.
 * @note Time component is preserved.
 * @note Creates a new Date object without modifying the original.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function getNextMonth(date: Date): Date {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const result = new Date(date);
  result.setMonth(result.getMonth() + 1);
  return result;
}
