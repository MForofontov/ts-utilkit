/**
 * Calculates the age in years from a date of birth to the current date.
 *
 * @param dob - The date of birth as a Date object.
 * @returns The age in years (whole number).
 *
 * @throws {Error} If date of birth is invalid (e.g., new Date('invalid')).
 * @throws {Error} If date of birth is in the future.
 *
 * @example
 * // Basic usage
 * const dob = new Date('1990-09-19');
 * calculateAge(dob); // 34 (if current year is 2025 and birthday has passed)
 *
 * @example
 * // Before birthday in current year
 * const dob = new Date('1990-12-25');
 * calculateAge(dob); // 34 (if today is January 2025, birthday hasn't occurred yet)
 *
 * @example
 * // After birthday in current year
 * const dob = new Date('1990-01-15');
 * calculateAge(dob); // 35 (if today is February 2025, birthday has passed)
 *
 * @example
 * // Recent birth
 * const dob = new Date('2024-06-15');
 * calculateAge(dob); // 0 (if less than 1 year old)
 *
 * @note Age is calculated based on the current date (new Date()).
 * @note Returns full years only - doesn't include months or days.
 * @note Accounts for whether birthday has occurred yet in the current year.
 * @note Throws error if date of birth is in the future.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculateAge(dob: Date): number {
  if (isNaN(dob.getTime())) {
    throw new Error('Invalid date of birth');
  }

  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDifference = today.getMonth() - dob.getMonth();
  const dayDifference = today.getDate() - dob.getDate();

  // Adjust age if the current date is before the birth date in the current year
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  if (age < 0) {
    throw new Error('Date of birth is in the future');
  }

  return age;
}
