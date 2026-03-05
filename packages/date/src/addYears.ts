/**
 * Adds a specified number of years to a Date object.
 *
 * @param date - The original Date object.
 * @param years - The number of years to add (can be negative to subtract years).
 * @returns A new Date object with the specified years added.
 *
 * @throws {Error} If date is invalid (e.g., new Date('invalid')).
 * @throws {Error} If years is NaN.
 *
 * @example
 * // Add years
 * addYears(new Date('2025-06-15'), 3); // 2028-06-15
 *
 * @example
 * // Subtract years with negative value
 * addYears(new Date('2025-06-15'), -5); // 2020-06-15
 *
 * @example
 * // Leap day — Feb 29 + 1 year overflows to March 1 in a non-leap year
 * addYears(new Date('2024-02-29'), 1); // 2025-03-01 (JavaScript overflow, not clamp)
 *
 * @example
 * // Zero years returns same date
 * addYears(new Date('2025-01-01'), 0); // 2025-01-01
 *
 * @note Creates a new Date object, leaving the original unchanged (immutable operation).
 * @note Leap-day overflow: adding years to Feb 29 when the target year is not a leap year
 *   overflows to March 1 (JavaScript's native `setFullYear` behaviour — does not clamp).
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function addYears(date: Date, years: number): Date {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  if (isNaN(years)) {
    throw new Error('Years must be a number');
  }

  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}
