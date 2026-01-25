/**
 * Calculates the date representing the same day in the previous month.
 *
 * @param date - The Date object to go back by one month.
 * @returns A new Date object representing the same day in the previous month.
 *
 * @throws {Error} If date is invalid.
 *
 * @example
 * // Basic usage
 * const march15 = new Date('2025-03-15');
 * getPreviousMonth(march15); // Returns 2025-02-15
 *
 * @example
 * // Year transition
 * const jan15 = new Date('2025-01-15');
 * getPreviousMonth(jan15); // Returns 2024-12-15
 *
 * @example
 * // Day overflow handling - adjusts to last day of shorter month
 * const march31 = new Date('2025-03-31');
 * getPreviousMonth(march31); // Returns 2025-02-28 (Feb only has 28 days)
 *
 * @example
 * // Leap year handling
 * const march31_2024 = new Date('2024-03-31');
 * getPreviousMonth(march31_2024); // Returns 2024-02-29 (Feb 2024 has 29 days)
 *
 * @example
 * // Real-world: historical data query
 * const today = new Date();
 * const lastMonthDate = getPreviousMonth(today);
 * const sales = await getSalesForMonth(lastMonthDate);
 *
 * @note Handles cases where the previous month has fewer days by adjusting to the last day.
 * @note If day doesn't exist in previous month (e.g., Jan 31 → Feb), returns last day of that month.
 * @note Time component is preserved.
 * @note Creates a new Date object without modifying the original.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function getPreviousMonth(date: Date): Date {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const resultDate = new Date(date);
  resultDate.setMonth(date.getMonth() - 1);

  // Handle cases where the previous month has fewer days
  if (resultDate.getMonth() === date.getMonth()) {
    resultDate.setDate(0); // Set to the last day of the previous month
  }

  return resultDate;
}
