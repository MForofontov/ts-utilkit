/**
 * Generates a random number from a range with a specified step.
 *
 * @param min - The minimum value (inclusive).
 * @param max - The maximum value (inclusive).
 * @param step - The step size (default: 1).
 * @returns A random number from the range.
 *
 * @throws {TypeError} If min, max, or step is not a number.
 * @throws {Error} If parameters are invalid (NaN, min > max, step <= 0, etc.).
 *
 * @example
 * // Random from 0, 5, 10, 15, 20
 * randomFromRange(0, 20, 5); // 10
 *
 * @example
 * // Random from 0.0, 0.5, 1.0, 1.5, 2.0
 * randomFromRange(0, 2, 0.5); // 1.5
 *
 * @example
 * // Random even number from 2 to 10
 * randomFromRange(2, 10, 2); // 6
 *
 * @complexity Time: O(n) where n is (max-min)/step, Space: O(n)
 */
export function randomFromRange(
  min: number,
  max: number,
  step: number = 1,
): number {
  if (typeof min !== 'number') {
    throw new TypeError(`min must be a number, got ${typeof min}`);
  }
  if (typeof max !== 'number') {
    throw new TypeError(`max must be a number, got ${typeof max}`);
  }
  if (typeof step !== 'number') {
    throw new TypeError(`step must be a number, got ${typeof step}`);
  }
  if (isNaN(min)) {
    throw new Error('min must be a valid number, not NaN');
  }
  if (isNaN(max)) {
    throw new Error('max must be a valid number, not NaN');
  }
  if (isNaN(step)) {
    throw new Error('step must be a valid number, not NaN');
  }
  if (min > max) {
    throw new Error('min must be less than or equal to max');
  }
  if (step <= 0) {
    throw new Error('step must be greater than 0');
  }

  // Generate all valid values in the range
  const values: number[] = [];
  for (let value = min; value <= max; value += step) {
    values.push(value);
  }

  if (values.length === 0) {
    throw new Error('No valid values in range with given step');
  }

  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}
