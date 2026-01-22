/**
 * Checks if a given year is a leap year according to the Gregorian calendar rules.
 *
 * @param year - The year to check (positive or negative integer).
 * @returns True if the year is a leap year, false otherwise.
 *
 * @throws {TypeError} If year is not a number.
 * @throws {Error} If year is NaN.
 *
 * @example
 * // Leap years (divisible by 4)
 * isLeapYear(2024); // true
 * isLeapYear(2020); // true
 * isLeapYear(2016); // true
 *
 * @example
 * // Non-leap years
 * isLeapYear(2023); // false
 * isLeapYear(2022); // false
 * isLeapYear(2021); // false
 *
 * @example
 * // Century years (divisible by 100 but not 400)
 * isLeapYear(1900); // false (divisible by 100, not by 400)
 * isLeapYear(2100); // false
 * isLeapYear(2200); // false
 *
 * @example
 * // Century years divisible by 400
 * isLeapYear(2000); // true (divisible by 400)
 * isLeapYear(2400); // true
 * isLeapYear(1600); // true
 *
 * @example
 * // Historical and future years
 * isLeapYear(2000); // true
 * isLeapYear(1904); // true
 * isLeapYear(3000); // false
 *
 * @note A leap year is divisible by 4, except for century years which must be divisible by 400.
 * @note Leap year rules: divisible by 4 AND (not divisible by 100 OR divisible by 400).
 * @note Leap years have 366 days (February has 29 days), non-leap years have 365 days.
 * @note These rules apply to the Gregorian calendar (introduced in 1582).
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function isLeapYear(year: number): boolean {
  if (isNaN(year)) {
    throw new Error('Year should be a valid number');
  }
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
