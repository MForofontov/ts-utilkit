/**
 * Generates a random floating-point number between min and max.
 *
 * @param min - The minimum value (inclusive).
 * @param max - The maximum value (exclusive).
 * @param decimals - Number of decimal places (default: 2).
 * @returns A random float in the range [min, max).
 *
 * @throws {TypeError} If min is not a number.
 * @throws {TypeError} If max is not a number.
 * @throws {TypeError} If decimals is provided and not a number.
 * @throws {Error} If min or max is NaN.
 * @throws {Error} If decimals is NaN.
 * @throws {Error} If min is greater than or equal to max.
 * @throws {Error} If decimals is negative or not an integer.
 *
 * @example
 * // Generate random float between 0 and 1 with 2 decimals
 * randomFloat(0, 1); // 0.42
 *
 * @example
 * // Generate random float with 4 decimals
 * randomFloat(0, 100, 4); // 73.2846
 *
 * @example
 * // Generate random temperature
 * randomFloat(-10.5, 35.5, 1); // 18.3
 *
 * @note Uses Math.random() for non-cryptographic randomness.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function randomFloat(
  min: number,
  max: number,
  decimals: number = 2,
): number {
  if (typeof min !== 'number') {
    throw new TypeError(`min must be a number, got ${typeof min}`);
  }
  if (typeof max !== 'number') {
    throw new TypeError(`max must be a number, got ${typeof max}`);
  }
  if (typeof decimals !== 'number') {
    throw new TypeError(`decimals must be a number, got ${typeof decimals}`);
  }
  if (isNaN(min)) {
    throw new Error('min must be a valid number, not NaN');
  }
  if (isNaN(max)) {
    throw new Error('max must be a valid number, not NaN');
  }
  if (isNaN(decimals)) {
    throw new Error('decimals must be a valid number, not NaN');
  }
  if (min >= max) {
    throw new Error('min must be less than max');
  }
  if (!Number.isInteger(decimals)) {
    throw new Error('decimals must be an integer');
  }
  if (decimals < 0) {
    throw new Error('decimals must be non-negative');
  }

  const random = Math.random() * (max - min) + min;
  const multiplier = Math.pow(10, decimals);
  return Math.round(random * multiplier) / multiplier;
}
