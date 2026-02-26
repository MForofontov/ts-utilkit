/**
 * Linearly interpolates between two values.
 * Returns the value that is `t` of the way from `a` to `b`.
 *
 * @param a - The start value (returned when t = 0).
 * @param b - The end value (returned when t = 1).
 * @param t - The interpolation factor. 0 returns a, 1 returns b. Values outside [0, 1] extrapolate.
 * @returns The interpolated value: `a + (b - a) * t`.
 *
 * @throws {Error} If a is NaN.
 * @throws {Error} If b is NaN.
 * @throws {Error} If t is NaN.
 *
 * @example
 * // Midpoint
 * lerp(0, 10, 0.5); // Returns 5
 *
 * @example
 * // Boundary values
 * lerp(0, 100, 0);  // Returns 0
 * lerp(0, 100, 1);  // Returns 100
 *
 * @example
 * // Extrapolation beyond [0, 1]
 * lerp(0, 10, 1.5); // Returns 15
 * lerp(0, 10, -0.5); // Returns -5
 *
 * @example
 * // Negative range
 * lerp(-10, 10, 0.25); // Returns -5
 *
 * @note t is not clamped to [0, 1]; values outside this range produce extrapolated results.
 * Use clamp(t, 0, 1) before calling if strict interpolation is required.
 * @note Formula: a + (b - a) * t — equivalent to (1 - t) * a + t * b but more numerically stable.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function lerp(a: number, b: number, t: number): number {
  if (isNaN(a)) {
    throw new Error('a must be a valid number, not NaN');
  }
  if (isNaN(b)) {
    throw new Error('b must be a valid number, not NaN');
  }
  if (isNaN(t)) {
    throw new Error('t must be a valid number, not NaN');
  }
  return a + (b - a) * t;
}
