import { degreesToRadians } from './degreesToRadians';

/**
 * Calculates the cosine value of an angle given in degrees.
 *
 * @param degrees - The angle in degrees.
 * @returns The cosine of the angle (value between -1 and 1).
 *
 * @throws {Error} If degrees is NaN.
 *
 * @example
 * // Basic angles
 * calculateCosine(60); // 0.5
 * calculateCosine(0); // 1
 *
 * @example
 * // Common angles
 * calculateCosine(90); // 0
 * calculateCosine(45); // ~0.707 (√2/2)
 *
 * @example
 * // Negative angle
 * calculateCosine(-60); // 0.5 (cosine is even function)
 *
 * @example
 * // Large angle (> 360°)
 * calculateCosine(420); // 0.5 (same as 60°)
 *
 * @example
 * // Real-world: Calculate horizontal component of motion
 * const launchAngle = 30; // degrees
 * const launchSpeed = 20; // m/s
 * const horizontalSpeed = launchSpeed * calculateCosine(launchAngle); // ~17.32 m/s
 *
 * @note Automatically converts degrees to radians internally using degreesToRadians().
 * @note Normalizes angle to [0, 360) range before calculation.
 * @note Cosine represents the x-coordinate on the unit circle.
 * @note Periodic with period 360° (cos(x) = cos(x + 360°)).
 * @note Range is always [-1, 1].
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculateCosine(degrees: number): number {
  if (isNaN(degrees)) {
    throw new Error('Degrees must be a number');
  }

  // Normalize the angle to the range [0, 360)
  degrees = degrees % 360;
  if (degrees < 0) {
    degrees += 360;
  }

  return Math.cos(degreesToRadians(degrees));
}
