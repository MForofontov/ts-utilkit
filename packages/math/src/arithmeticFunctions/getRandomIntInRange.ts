/**
 * Generates a random integer between two values (inclusive of both min and max).
 *
 * @param min - The minimum value (inclusive, must be an integer).
 * @param max - The maximum value (inclusive, must be an integer).
 * @returns A random integer between min and max (inclusive).
 *
 * @throws {Error} If min or max is not a valid integer or if min is greater than max.
 *
 * @example
 * // Basic usage
 * getRandomIntInRange(1, 10); // Random integer from 1 to 10 (e.g., 7)
 * getRandomIntInRange(0, 100); // Random integer from 0 to 100 (e.g., 42)
 *
 * @example
 * // Dice roll simulation
 * getRandomIntInRange(1, 6); // Random number from 1 to 6
 *
 * @example
 * // Negative ranges
 * getRandomIntInRange(-10, 10); // Random integer from -10 to 10
 * getRandomIntInRange(-100, -50); // Random integer from -100 to -50
 *
 * @example
 * // Single value range
 * getRandomIntInRange(5, 5); // Always returns 5
 *
 * @note Both min and max are inclusive (can be returned as results).
 * @note Uses Math.random() which provides pseudo-random values.
 * @note For cryptographically secure random numbers, use crypto.randomInt() instead.
 * @note The distribution is uniform - all integers in range have equal probability.
 * @note Common use cases: dice rolls, lottery numbers, random array indices, game mechanics.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function getRandomIntInRange(min: number, max: number): number {
  if (isNaN(min) || isNaN(max)) {
    throw new Error('Both min and max must be numbers');
  }
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new Error('Both min and max must be integers');
  }
  if (min > max) {
    throw new Error('min must be less than or equal to max');
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
