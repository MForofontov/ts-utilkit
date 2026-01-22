/**
 * Generates a random integer between min and max (inclusive).
 *
 * @param min - The minimum value (inclusive).
 * @param max - The maximum value (inclusive).
 * @returns A random integer in the range [min, max].
 *
 * @throws {TypeError} If min is not a number.
 * @throws {TypeError} If max is not a number.
 * @throws {Error} If min or max is NaN.
 * @throws {Error} If min is greater than max.
 * @throws {Error} If min or max is not a safe integer.
 *
 * @example
 * // Generate random number between 1 and 10
 * randomInt(1, 10); // 7
 *
 * @example
 * // Generate random number between -5 and 5
 * randomInt(-5, 5); // -2
 *
 * @example
 * // Generate dice roll
 * randomInt(1, 6); // 4
 *
 * @note Uses Math.random() for non-cryptographic randomness.
 * @note For cryptographic randomness, use crypto.randomInt() from Node.js crypto module.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function randomInt(min: number, max: number): number {
  if (typeof min !== 'number') {
    throw new TypeError(`min must be a number, got ${typeof min}`);
  }
  if (typeof max !== 'number') {
    throw new TypeError(`max must be a number, got ${typeof max}`);
  }
  if (isNaN(min)) {
    throw new Error('min must be a valid number, not NaN');
  }
  if (isNaN(max)) {
    throw new Error('max must be a valid number, not NaN');
  }
  if (!Number.isSafeInteger(min)) {
    throw new Error(`min must be a safe integer, got ${min}`);
  }
  if (!Number.isSafeInteger(max)) {
    throw new Error(`max must be a safe integer, got ${max}`);
  }
  if (min > max) {
    throw new Error('min must be less than or equal to max');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
