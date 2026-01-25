import { degreesToRadians } from './degreesToRadians';

/**
 * Calculates the tangent value of an angle given in degrees.
 *
 * @param degrees - The angle in degrees.
 * @returns The tangent of the angle. Returns Infinity or -Infinity at 90° and 270°.
 *
 * @throws {Error} If degrees is NaN.
 *
 * @example
 * // Basic angles
 * calculateTangent(45); // 1
 * calculateTangent(0); // 0
 *
 * @example
 * // Asymptotic values
 * calculateTangent(90); // Infinity
 * calculateTangent(270); // -Infinity
 *
 * @example
 * // Common angles
 * calculateTangent(30); // ~0.577 (1/√3)
 * calculateTangent(60); // ~1.732 (√3)
 *
 * @example
 * // Negative angle
 * calculateTangent(-45); // -1
 *
 * @example
 * // Real-world: Calculate slope/gradient
 * const roadAngle = 15; // degrees
 * const slope = calculateTangent(roadAngle); // ~0.268 (26.8% grade)
 *
 * @note Automatically converts degrees to radians internally using degreesToRadians().
 * @note Normalizes angle to [0, 360) range before calculation.
 * @note Tangent = sine/cosine, so undefined where cosine is zero (90°, 270°).
 * @note Returns ±Infinity at 90° and 270° where tangent is undefined.
 * @note Periodic with period 180° (tan(x) = tan(x + 180°)).
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculateTangent(degrees: number): number {
  if (isNaN(degrees)) {
    throw new Error('Degrees must be a number');
  }

  // Normalize the angle to the range [0, 360)
  degrees = degrees % 360;
  if (degrees < 0) {
    degrees += 360;
  }

  // Handle angles where tangent approaches Infinity or -Infinity
  if (degrees === 90 || degrees === 270) {
    return degrees === 90 ? Infinity : -Infinity;
  }

  return Math.tan(degreesToRadians(degrees));
}
