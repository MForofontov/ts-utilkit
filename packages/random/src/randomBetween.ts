/**
 * Generates a random number between min and max (inclusive for integers, exclusive for floats).
 *
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @param integer - Whether to return an integer (default: true).
 * @returns A random number between min and max.
 *
 * @throws {TypeError} If min, max, or integer have incorrect types.
 * @throws {Error} If min or max is NaN, not safe integers (when integer=true), or min >= max.
 *
 * @example
 * // Random integer between 1 and 10
 * randomBetween(1, 10); // 7
 *
 * @example
 * // Random float between 0 and 1
 * randomBetween(0, 1, false); // 0.73421
 *
 * @example
 * // Dice roll
 * randomBetween(1, 6); // 4
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function randomBetween(
  min: number,
  max: number,
  integer: boolean = true,
): number {
  if (typeof min !== 'number') {
    throw new TypeError(`min must be a number, got ${typeof min}`);
  }
  if (typeof max !== 'number') {
    throw new TypeError(`max must be a number, got ${typeof max}`);
  }
  if (typeof integer !== 'boolean') {
    throw new TypeError(`integer must be a boolean, got ${typeof integer}`);
  }
  if (isNaN(min)) {
    throw new Error('min must be a valid number, not NaN');
  }
  if (isNaN(max)) {
    throw new Error('max must be a valid number, not NaN');
  }

  if (integer) {
    if (!Number.isSafeInteger(min)) {
      throw new Error('min must be a safe integer');
    }
    if (!Number.isSafeInteger(max)) {
      throw new Error('max must be a safe integer');
    }
    if (min > max) {
      throw new Error('min must be less than or equal to max');
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    if (min >= max) {
      throw new Error('min must be less than max');
    }

    return Math.random() * (max - min) + min;
  }
}
