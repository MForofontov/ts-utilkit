/**
 * Formats a date as an ISO 8601 week date string (YYYY-Www-D format).
 *
 * @param date - The Date object to format.
 * @returns The ISO week date string in format 'YYYY-Www-D' (e.g., '2025-W03-4').
 *
 * @throws {Error} If date is invalid.
 * @throws {Error} If year is negative.
 *
 * @example
 * // Basic usage
 * const date = new Date('2025-01-16'); // Thursday
 * getISOWeekDate(date); // Returns '2025-W03-4'
 *
 * @example
 * // Week 1 of year
 * const jan1 = new Date('2025-01-01'); // Wednesday
 * getISOWeekDate(jan1); // Returns '2025-W01-3'
 *
 * @example
 * // Week crossing year boundary
 * const dec29 = new Date('2024-12-29'); // Sunday
 * getISOWeekDate(dec29); // Returns '2024-W52-7'
 *
 * @example
 * // Monday (day 1 in ISO)
 * const monday = new Date('2025-01-13');
 * getISOWeekDate(monday); // Returns '2025-W03-1'
 *
 * @example
 * // Real-world: weekly report identifier
 * const today = new Date();
 * const weekId = getISOWeekDate(today);
 * console.log(`Report for ${weekId}`); // e.g., "Report for 2025-W03-4"
 *
 * @note ISO 8601 week dates use Monday as the first day of the week (day 1).
 * @note Sunday is represented as day 7 (not 0 like in JavaScript Date).
 * @note Week 1 is the first week with at least 4 days in the new year.
 * @note Format: YYYY = year, Www = week number (padded), D = day of week (1-7).
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function getISOWeekDate(date: Date): string {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  if (date.getFullYear() < 0) {
    throw new Error('Negative years are not supported');
  }

  // ISO week date calculation
  const tempDate = new Date(date.getTime());
  tempDate.setHours(0, 0, 0, 0);
  tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));
  const week1 = new Date(tempDate.getFullYear(), 0, 4);
  const weekNumber =
    Math.round(
      ((tempDate.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7,
    ) + 1;

  let year: string;
  const fullYear = tempDate.getFullYear();
  if (fullYear < 0) {
    year = `-${String(Math.abs(fullYear)).padStart(6, '0')}`;
  } else {
    year = String(fullYear).padStart(4, '0');
  }
  const dayOfWeek = date.getDay() || 7; // ISO week starts on Monday, so Sunday should be 7

  return `${year}-W${String(weekNumber).padStart(2, '0')}-${dayOfWeek}`;
}
