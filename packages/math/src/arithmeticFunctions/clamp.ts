/**
 * Clamps a number within the inclusive range [min, max].
 * Returns min if the value is below min, max if above max, and the value itself otherwise.
 *
 * @param n - The number to clamp.
 * @param min - The lower bound of the range (inclusive).
 * @param max - The upper bound of the range (inclusive).
 * @returns The clamped value within [min, max].
 *
 * @throws {Error} If n is NaN.
 * @throws {Error} If min is NaN.
 * @throws {Error} If max is NaN.
 * @throws {Error} If min is greater than max.
 *
 * @example
 * // Value within range — returned as-is
 * clamp(5, 0, 10); // Returns 5
 *
 * @example
 * // Value below min — clamped to min
 * clamp(-5, 0, 10); // Returns 0
 *
 * @example
 * // Value above max — clamped to max
 * clamp(15, 0, 10); // Returns 10
 *
 * @example
 * // Min equals max — always returns that value
 * clamp(7, 3, 3); // Returns 3
 *
 * @note Useful for constraining values such as opacity (0–1), angles (0–360),
 * or UI element positions within bounds.
 * @note When n equals min or max exactly, n is returned unchanged (inclusive range).
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function clamp(n: number, min: number, max: number): number {
  if (isNaN(n)) {
    throw new Error('n must be a valid number, not NaN');
  }
  if (isNaN(min)) {
    throw new Error('min must be a valid number, not NaN');
  }
  if (isNaN(max)) {
    throw new Error('max must be a valid number, not NaN');
  }
  if (min > max) {
    throw new Error(
      `min must be less than or equal to max, got min=${min} max=${max}`,
    );
  }
  return Math.min(Math.max(n, min), max);
}
