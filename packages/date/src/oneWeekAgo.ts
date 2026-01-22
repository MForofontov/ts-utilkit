/**
 * Calculates the date exactly one week (7 days) before a given date.
 *
 * @param date - The Date object to subtract one week from.
 * @returns A new Date object representing the date 7 days earlier.
 *
 * @throws {Error} If date is invalid.
 *
 * @example
 * // Basic usage
 * const today = new Date('2025-01-15');
 * oneWeekAgo(today); // Returns 2025-01-08
 *
 * @example
 * // Across month boundaries
 * const date = new Date('2025-02-05');
 * oneWeekAgo(date); // Returns 2025-01-29
 *
 * @example
 * // Across year boundaries
 * const newYear = new Date('2025-01-03');
 * oneWeekAgo(newYear); // Returns 2024-12-27
 *
 * @example
 * // With time components
 * const dateTime = new Date('2025-01-15T14:30:00');
 * oneWeekAgo(dateTime); // Returns 2025-01-08T14:30:00 (time preserved)
 *
 * @example
 * // Real-world: recent activity filter
 * const now = new Date();
 * const weekAgo = oneWeekAgo(now);
 * const recentPosts = posts.filter(p => p.date >= weekAgo);
 *
 * @note Creates a new Date object without modifying the original.
 * @note Automatically handles month and year rollovers.
 * @note Preserves the time component (hours, minutes, seconds).
 * @note Equivalent to subtracting 7 days.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function oneWeekAgo(date: Date): Date {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  const result = new Date(date);
  result.setDate(result.getDate() - 7);
  return result;
}
