import { randomChoice } from './randomChoice';

/**
 * Generates a random number from a range with a specified step.
 *
 * @param min - The minimum value (inclusive).
 * @param max - The maximum value (inclusive).
 * @param step - The step size (default: 1).
 * @returns A random number from the range.
 *
 * @throws {Error} If parameters are invalid (NaN, min > max, step <= 0, etc.).
 * @throws {RangeError} If endpoints are not finite or step cannot advance the range.
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
  if (isNaN(min)) {
    throw new Error('min must be a valid number, not NaN');
  }
  if (isNaN(max)) {
    throw new Error('max must be a valid number, not NaN');
  }
  if (isNaN(step)) {
    throw new Error('step must be a valid number, not NaN');
  }
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    throw new RangeError('min and max must be finite numbers');
  }
  if (min > max) {
    throw new Error('min must be less than or equal to max');
  }
  if (step <= 0) {
    throw new Error('step must be greater than 0');
  }

  // Generate all valid values in the range
  const values: number[] = [];
  for (let value = min; value <= max; ) {
    values.push(value);
    if (value === max) break;
    const next = value + step;
    if (next === value) {
      throw new RangeError('step is too small to advance the range');
    }
    value = next;
  }

  if (values.length === 0) {
    throw new Error('No valid values in range with given step');
  }

  return randomChoice(values);
}
