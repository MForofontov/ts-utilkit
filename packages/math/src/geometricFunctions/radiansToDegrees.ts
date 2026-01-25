/**
 * Converts radians to degrees.
 *
 * @param radians - The angle value in radians.
 * @returns The angle value in degrees.
 *
 * @throws {Error} If radians is NaN.
 *
 * @example
 * // Common angles
 * radiansToDegrees(0); // 0
 * radiansToDegrees(Math.PI / 2); // 90
 * radiansToDegrees(Math.PI); // 180
 * radiansToDegrees(2 * Math.PI); // 360
 *
 * @example
 * // Negative angles
 * radiansToDegrees(-Math.PI / 2); // -90
 * radiansToDegrees(-Math.PI); // -180
 *
 * @example
 * // Angles beyond 2π
 * radiansToDegrees(4 * Math.PI); // 720
 * radiansToDegrees(3 * Math.PI); // 540
 *
 * @example
 * // Decimal radians
 * radiansToDegrees(1); // 57.29577951308232
 * radiansToDegrees(0.5); // 28.64788975654116
 *
 * @note Formula: degrees = radians × (180 / π)
 * @note One complete circle is 2π radians = 360°.
 * @note Useful for converting Math trigonometric function results to degrees.
 * @note Degrees are more intuitive for human-readable angle representations.
 * @note Use degreesToRadians() for the inverse conversion.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function radiansToDegrees(radians: number): number {
  if (isNaN(radians)) {
    throw new Error('Radians must be a number');
  }
  return radians * (180 / Math.PI);
}

// Example usage:
// radiansToDegrees(Math.PI); // 180
