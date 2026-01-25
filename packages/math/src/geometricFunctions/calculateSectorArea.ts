/**
 * Calculates the area of a sector given the radius and angle in degrees.
 * A sector is a slice of a circle, like a piece of pie.
 *
 * @param radius - The radius of the circle.
 * @param angle - The central angle of the sector in degrees.
 * @returns The area of the sector in square units.
 *
 * @throws {Error} If radius or angle is NaN.
 * @throws {Error} If radius or angle is negative.
 *
 * @example
 * // Quarter circle (90 degrees)
 * calculateSectorArea(5, 90); // ~19.63
 *
 * @example
 * // Half circle (180 degrees)
 * calculateSectorArea(10, 180); // ~157.08
 *
 * @example
 * // Full circle (360 degrees) - equals circle area
 * calculateSectorArea(5, 360); // ~78.54
 *
 * @example
 * // Small sector (30 degrees)
 * calculateSectorArea(8, 30); // ~16.76
 *
 * @example
 * // Real-world: Calculate pizza slice area
 * const pizzaRadius = 15; // cm
 * const sliceAngle = 45; // degrees (1/8 of pizza)
 * const sliceArea = calculateSectorArea(pizzaRadius, sliceAngle); // ~88.36 cm²
 *
 * @note Formula: Area = (angle/360) × π × radius²
 * @note The angle must be in degrees, not radians.
 * @note At 360°, the sector area equals the full circle area.
 * @note Result is in square units matching the radius units (e.g., cm → cm²).
 * @note Common use cases: pie charts, radar coverage areas, resource allocation visualizations.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculateSectorArea(radius: number, angle: number): number {
  if (isNaN(radius) || isNaN(angle)) {
    throw new Error('Radius and angle must be numbers');
  }
  if (radius < 0 || angle < 0) {
    throw new Error('Radius and angle must be non-negative numbers');
  }
  return (angle / 360) * Math.PI * Math.pow(radius, 2);
}
