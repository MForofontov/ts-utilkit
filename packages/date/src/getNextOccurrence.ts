/**
 * Finds the next occurrence of a specified day of the week from a given date.
 *
 * @param date - The Date object to start from.
 * @param dayOfWeek - The target day of the week (0=Sunday, 1=Monday, ..., 6=Saturday).
 * @returns A new Date object representing the next occurrence of the specified day.
 *
 * @throws {Error} If date is invalid.
 * @throws {Error} If dayOfWeek is not between 0 and 6.
 *
 * @example
 * // Basic usage
 * const tuesday = new Date('2025-01-07'); // Tuesday
 * getNextOccurrence(tuesday, 4); // Returns Thursday, 2025-01-09
 *
 * @example
 * // Finding next Monday
 * const date = new Date('2025-01-07'); // Tuesday
 * getNextOccurrence(date, 1); // Returns Monday, 2025-01-13
 *
 * @example
 * // Same day of week (returns next week)
 * const tuesday = new Date('2025-01-07'); // Tuesday
 * getNextOccurrence(tuesday, 2); // Returns Tuesday, 2025-01-14
 *
 * @example
 * // Finding next weekend
 * const date = new Date('2025-01-07');
 * const nextSaturday = getNextOccurrence(date, 6); // 2025-01-11
 * const nextSunday = getNextOccurrence(date, 0); // 2025-01-12
 *
 * @example
 * // Real-world: schedule next meeting
 * const today = new Date();
 * const nextFriday = getNextOccurrence(today, 5);
 * console.log(`Next meeting: ${nextFriday.toDateString()}`);
 *
 * @note If the given date is already the target day, returns the same day next week.
 * @note Creates a new Date object without modifying the original.
 * @note Day numbering follows JavaScript convention: 0=Sunday through 6=Saturday.
 * @note Always returns a date in the future (at least 1 day ahead).
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function getNextOccurrence(date: Date, dayOfWeek: number): Date {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  if (isNaN(dayOfWeek) || dayOfWeek < 0 || dayOfWeek > 6) {
    throw new Error(
      'Invalid dayOfWeek value. It must be a number between 0 (Sunday) and 6 (Saturday).',
    );
  }

  const resultDate = new Date(date);
  const currentDay = date.getDay();
  const daysUntilNextOccurrence = (dayOfWeek - currentDay + 7) % 7 || 7;
  resultDate.setDate(date.getDate() + daysUntilNextOccurrence);

  return resultDate;
}
