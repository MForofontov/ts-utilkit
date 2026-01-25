/**
 * Gets the fiscal quarter of the year for a given Date object.
 *
 * @param date - The Date object to get the quarter for.
 * @returns The quarter of the year (1, 2, 3, or 4).
 *
 * @throws {Error} If the date is invalid (e.g., new Date('invalid')).
 *
 * @example
 * // Q1 (January - March)
 * getQuarter(new Date('2024-01-15')); // 1
 * getQuarter(new Date('2024-03-31')); // 1
 *
 * @example
 * // Q2 (April - June)
 * getQuarter(new Date('2024-04-01')); // 2
 * getQuarter(new Date('2024-06-30')); // 2
 *
 * @example
 * // Q3 (July - September)
 * getQuarter(new Date('2024-09-19')); // 3
 *
 * @example
 * // Q4 (October - December)
 * getQuarter(new Date('2024-10-01')); // 4
 * getQuarter(new Date('2024-12-31')); // 4
 *
 * @example
 * // Get current quarter
 * getQuarter(new Date()); // 1, 2, 3, or 4 depending on current date
 *
 * @note Q1: January-March, Q2: April-June, Q3: July-September, Q4: October-December.
 * @note Based on calendar quarters, not fiscal year quarters (which may vary by organization).
 * @note Uses 1-based indexing (1-4), not 0-based.
 * @note Calculation: Math.ceil((month + 1) / 3).
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function getQuarter(date: Date): number {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const month = date.getMonth() + 1;
  return Math.ceil(month / 3);
}
