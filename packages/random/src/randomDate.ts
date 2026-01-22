/**
 * Generates a random Date within a specified range.
 *
 * @param start - The start date (inclusive).
 * @param end - The end date (inclusive).
 * @returns A random Date between start and end.
 *
 * @throws {TypeError} If start or end is not a Date object.
 * @throws {Error} If start or end is an invalid date or if start is after end.
 *
 * @example
 * // Random date in 2024
 * const start = new Date('2024-01-01');
 * const end = new Date('2024-12-31');
 * randomDate(start, end); // Random date in 2024
 *
 * @example
 * // Random date in the next 7 days
 * const now = new Date();
 * const week = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
 * randomDate(now, week);
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function randomDate(start: Date, end: Date): Date {
  if (!(start instanceof Date)) {
    throw new TypeError('start must be a Date object');
  }
  if (!(end instanceof Date)) {
    throw new TypeError('end must be a Date object');
  }
  if (isNaN(start.getTime())) {
    throw new Error('start must be a valid date');
  }
  if (isNaN(end.getTime())) {
    throw new Error('end must be a valid date');
  }

  const startTime = start.getTime();
  const endTime = end.getTime();

  if (startTime > endTime) {
    throw new Error('start date must be before or equal to end date');
  }

  const randomTime = startTime + Math.random() * (endTime - startTime);
  return new Date(randomTime);
}
