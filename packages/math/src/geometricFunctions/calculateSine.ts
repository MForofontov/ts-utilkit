import { degreesToRadians } from './degreesToRadians';

/**
 * Calculates the sine value of an angle given in degrees.
 *
 * @param degrees - The angle in degrees.
 * @returns The sine of the angle (value between -1 and 1).
 *
 * @throws {Error} If degrees is NaN.
 *
 * @example
 * // Basic angles
 * calculateSine(30); // 0.5
 * calculateSine(90); // 1
 *
 * @example
 * // Common angles
 * calculateSine(0); // 0
 * calculateSine(45); // ~0.707 (√2/2)
 *
 * @example
 * // Negative angle
 * calculateSine(-30); // -0.5
 *
 * @example
 * // Large angle (> 360°)
 * calculateSine(390); // 0.5 (same as 30°)
 *
 * @example
 * // Real-world: Calculate vertical component of motion
 * const launchAngle = 60; // degrees
 * const launchSpeed = 20; // m/s
 * const verticalSpeed = launchSpeed * calculateSine(launchAngle); // ~17.32 m/s
 *
 * @note Automatically converts degrees to radians internally using degreesToRadians().
 * @note Sine represents the y-coordinate on the unit circle.
 * @note Periodic with period 360° (sin(x) = sin(x + 360°)).
 * @note Range is always [-1, 1].
 * @note Common use cases: wave functions, oscillations, projectile motion, signal processing.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculateSine(degrees: number): number {
  if (isNaN(degrees)) {
    throw new Error('Degrees must be a number');
  }
  return Math.sin(degreesToRadians(degrees));
}
