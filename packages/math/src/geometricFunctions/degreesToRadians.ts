/**
 * Converts degrees to radians.
 *
 * @param degrees - The angle value in degrees.
 * @returns The angle value in radians.
 *
 * @throws {Error} If degrees is NaN.
 *
 * @example
 * // Common angles
 * degreesToRadians(0); // 0
 * degreesToRadians(90); // 1.5707963267948966 (π/2)
 * degreesToRadians(180); // 3.141592653589793 (π)
 * degreesToRadians(360); // 6.283185307179586 (2π)
 *
 * @example
 * // Negative angles
 * degreesToRadians(-90); // -1.5707963267948966
 * degreesToRadians(-180); // -3.141592653589793
 *
 * @example
 * // Angles beyond 360°
 * degreesToRadians(720); // 12.566370614359172 (4π)
 * degreesToRadians(450); // 7.853981633974483
 *
 * @example
 * // Decimal degrees
 * degreesToRadians(45.5); // 0.7941248096574199
 * degreesToRadians(30.5); // 0.5323254447722119
 *
 * @note Formula: radians = degrees × (π / 180)
 * @note One complete circle is 360° = 2π radians.
 * @note Most trigonometric functions (Math.sin, Math.cos) expect radians, not degrees.
 * @note Radians are the standard unit for angles in mathematics and programming.
 * @note Use radiansToDegrees() for the inverse conversion.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function degreesToRadians(degrees: number): number {
  if (isNaN(degrees)) {
    throw new Error('Degrees must be a number');
  }
  return degrees * (Math.PI / 180);
}

// Example usage:
// degreesToRadians(180); // 3.14159...
