/**
 * Generates a random boolean value.
 *
 * @param probability - The probability of returning true (default: 0.5, range: 0-1).
 * @returns A random boolean value.
 *
 * @throws {TypeError} If probability is not a number.
 * @throws {Error} If probability is NaN or not between 0 and 1.
 *
 * @example
 * // 50/50 chance
 * randomBoolean(); // true or false
 *
 * @example
 * // 75% chance of true
 * randomBoolean(0.75); // More likely to be true
 *
 * @example
 * // 10% chance of true
 * randomBoolean(0.1); // More likely to be false
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function randomBoolean(probability: number = 0.5): boolean {
  if (typeof probability !== 'number') {
    throw new TypeError(
      `probability must be a number, got ${typeof probability}`,
    );
  }
  if (isNaN(probability)) {
    throw new Error('probability must be a valid number, not NaN');
  }
  if (probability < 0 || probability > 1) {
    throw new Error('probability must be between 0 and 1');
  }

  return Math.random() < probability;
}
