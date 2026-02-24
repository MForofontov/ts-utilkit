/**
 * Returns `true` if the given date falls on tomorrow's calendar date (ignoring time).
 *
 * @param date - The Date object to check.
 * @returns `true` if the date is tomorrow, `false` otherwise.
 *
 * @throws {Error} If the date is invalid (e.g., new Date('invalid')).
 *
 * @example
 * // Tomorrow
 * const tomorrow = new Date();
 * tomorrow.setDate(tomorrow.getDate() + 1);
 * isTomorrow(tomorrow); // true
 *
 * @example
 * // Today is not tomorrow
 * isTomorrow(new Date()); // false
 *
 * @example
 * // Yesterday is not tomorrow
 * const yesterday = new Date();
 * yesterday.setDate(yesterday.getDate() - 1);
 * isTomorrow(yesterday); // false
 *
 * @example
 * // Tomorrow at a different time
 * const tomorrow = new Date();
 * tomorrow.setDate(tomorrow.getDate() + 1);
 * tomorrow.setHours(0, 0, 0, 0);
 * isTomorrow(tomorrow); // true (time is ignored)
 *
 * @note Only compares year, month, and day — time is ignored.
 * @note "Tomorrow" is computed relative to the moment the function is called.
 * @note Uses local timezone.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function isTomorrow(date: Date): boolean {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    date.getFullYear() === tomorrow.getFullYear() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getDate() === tomorrow.getDate()
  );
}
