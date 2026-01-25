/**
 * Calculates the surface area of a cylinder given its radius and height.
 *
 * @param radius - The radius of the cylinder's circular bases.
 * @param height - The height of the cylinder (distance between bases).
 * @returns The total surface area of the cylinder in square units.
 *
 * @throws {Error} If radius or height is NaN.
 * @throws {Error} If radius is negative.
 * @throws {Error} If height is negative.
 *
 * @example
 * // Basic cylinder
 * calculateCylinderSurfaceArea(5, 10); // ~471.24
 *
 * @example
 * // Short wide cylinder
 * calculateCylinderSurfaceArea(10, 2); // ~753.98
 *
 * @example
 * // Tall narrow cylinder
 * calculateCylinderSurfaceArea(2, 20); // ~276.46
 *
 * @example
 * // Cube-like cylinder
 * calculateCylinderSurfaceArea(5, 10); // ~471.24
 *
 * @example
 * // Real-world: Calculate paint needed for water tank
 * const tankRadius = 50; // cm
 * const tankHeight = 100; // cm
 * const surfaceArea = calculateCylinderSurfaceArea(tankRadius, tankHeight); // ~47,123.89 cm²
 *
 * @note Formula: SA = 2πr(r + h) = 2πr² + 2πrh (two circular bases + lateral area)
 * @note Total surface area includes both circular ends and the curved side.
 * @note For just the lateral (side) area, use: 2πrh.
 * @note Result units are square (e.g., cm → cm², m → m²).
 * @note Common use cases: paint cans, tanks, pipes, drums, cylindrical containers.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculateCylinderSurfaceArea(
  radius: number,
  height: number,
): number {
  if (isNaN(radius) || isNaN(height)) {
    throw new Error('Radius and height must be numbers');
  }
  if (radius < 0) {
    throw new Error('Radius must be a non-negative number');
  }
  if (height < 0) {
    throw new Error('Height must be a non-negative number');
  }
  return 2 * Math.PI * radius * (radius + height);
}
