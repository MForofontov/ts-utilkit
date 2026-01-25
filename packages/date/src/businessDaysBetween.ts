/**
 * Calculates the number of business days (Monday to Friday) between two dates, inclusive.
 *
 * @param start - The start Date object (must be before or equal to end).
 * @param end - The end Date object.
 * @returns The number of business days between the two dates (excluding weekends).
 *
 * @throws {Error} If start or end date is invalid (e.g., new Date('invalid')).
 * @throws {Error} If start date is after end date.
 *
 * @example
 * // One full week (Monday to Friday)
 * const start = new Date('2024-09-02'); // Monday
 * const end = new Date('2024-09-06');   // Friday
 * businessDaysBetween(start, end); // 5
 *
 * @example
 * // Including weekend days (which are skipped)
 * businessDaysBetween(new Date('2024-09-01'), new Date('2024-09-30')); // 21
 *
 * @example
 * // Same day
 * const monday = new Date('2024-09-02');
 * businessDaysBetween(monday, monday); // 1 (if Monday)
 *
 * @example
 * // Weekend only
 * businessDaysBetween(new Date('2024-09-07'), new Date('2024-09-08')); // 0 (Sat-Sun)
 *
 * @example
 * // Real-world: project deadline
 * const projectStart = new Date('2024-09-01');
 * const deadline = new Date('2024-09-15');
 * const workDays = businessDaysBetween(projectStart, deadline); // Calculate work days available
 *
 * @note Business days are Monday (1) through Friday (5).
 * @note Saturdays (6) and Sundays (0) are excluded from the count.
 * @note The calculation is inclusive (both start and end dates are counted if they're weekdays).
 * @note Does NOT account for public holidays - only excludes weekends.
 * @note For holiday-aware calculations, you'll need to filter additional dates.
 *
 * @complexity Time: O(n) where n is the number of days between dates, Space: O(1)
 */
export function businessDaysBetween(start: Date, end: Date): number {
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('Invalid date');
  }

  if (start > end) {
    throw new Error('Start date must be before end date');
  }

  let count = 0;
  const currentDate = new Date(start);

  while (currentDate <= end) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      // Exclude Sundays (0) and Saturdays (6)
      count++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return count;
}
