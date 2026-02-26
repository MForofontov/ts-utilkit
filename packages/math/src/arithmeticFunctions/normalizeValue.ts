/**
 * Normalizes a value from an arbitrary range [min, max] to the unit interval [0, 1].
 * A result of 0 means the value equals min; 1 means it equals max.
 *
 * @param value - The value to normalize.
 * @param min - The minimum of the input range.
 * @param max - The maximum of the input range.
 * @returns The normalized value in [0, 1]. Returns NaN when min === max (degenerate range).
 *
 * @throws {Error} If value is NaN.
 * @throws {Error} If min is NaN.
 * @throws {Error} If max is NaN.
 *
 * @example
 * // Basic normalization
 * normalizeValue(5, 0, 10); // Returns 0.5
 *
 * @example
 * // Boundary values
 * normalizeValue(0, 0, 10);  // Returns 0
 * normalizeValue(10, 0, 10); // Returns 1
 *
 * @example
 * // Value outside range (not clamped)
 * normalizeValue(15, 0, 10); // Returns 1.5
 *
 * @example
 * // Degenerate range
 * normalizeValue(5, 5, 5); // Returns NaN
 *
 * @note The result is NOT clamped to [0, 1]. Values outside [min, max] produce results
 * outside [0, 1]. Use clamp(result, 0, 1) if strict normalization is needed.
 * @note Formula: (value - min) / (max - min)
 * @note When min === max the range is degenerate and NaN is returned.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function normalizeValue(
  value: number,
  min: number,
  max: number,
): number {
  if (isNaN(value)) {
    throw new Error('value must be a valid number, not NaN');
  }
  if (isNaN(min)) {
    throw new Error('min must be a valid number, not NaN');
  }
  if (isNaN(max)) {
    throw new Error('max must be a valid number, not NaN');
  }
  if (min === max) {
    return NaN;
  }
  return (value - min) / (max - min);
}
