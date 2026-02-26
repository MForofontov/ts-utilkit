/**
 * Maps a value from one numeric range to another.
 * Equivalent to normalizing the value within [inMin, inMax] and then scaling
 * it into [outMin, outMax].
 *
 * @param value - The value to map.
 * @param inMin - The lower bound of the input range.
 * @param inMax - The upper bound of the input range.
 * @param outMin - The lower bound of the output range.
 * @param outMax - The upper bound of the output range.
 * @returns The value mapped into [outMin, outMax]. Returns NaN when inMin === inMax (degenerate input range).
 *
 * @throws {Error} If any argument is NaN.
 *
 * @example
 * // Map 5 from [0, 10] to [0, 100]
 * mapRange(5, 0, 10, 0, 100); // Returns 50
 *
 * @example
 * // Map temperature: 0°C → 32°F, 100°C → 212°F
 * mapRange(0,   0, 100, 32, 212); // Returns 32
 * mapRange(100, 0, 100, 32, 212); // Returns 212
 *
 * @example
 * // Reversed output range (inverts the value)
 * mapRange(3, 0, 10, 10, 0); // Returns 7
 *
 * @example
 * // Degenerate input range
 * mapRange(5, 3, 3, 0, 10); // Returns NaN
 *
 * @note Values outside the input range are NOT clamped; they extrapolate linearly.
 * @note Formula: outMin + (value - inMin) / (inMax - inMin) * (outMax - outMin)
 * @note When inMin === inMax the input range is degenerate and NaN is returned.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  if (isNaN(value)) {
    throw new Error('value must be a valid number, not NaN');
  }
  if (isNaN(inMin)) {
    throw new Error('inMin must be a valid number, not NaN');
  }
  if (isNaN(inMax)) {
    throw new Error('inMax must be a valid number, not NaN');
  }
  if (isNaN(outMin)) {
    throw new Error('outMin must be a valid number, not NaN');
  }
  if (isNaN(outMax)) {
    throw new Error('outMax must be a valid number, not NaN');
  }
  if (inMin === inMax) {
    return NaN;
  }
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}
