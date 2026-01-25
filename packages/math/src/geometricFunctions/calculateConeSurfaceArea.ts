/**
 * Calculates the total surface area of a cone given its radius and slant height.
 *
 * @param radius - The radius of the cone's circular base.
 * @param slantHeight - The slant height of the cone (distance from apex to base edge along the surface).
 * @returns The total surface area of the cone in square units.
 *
 * @throws {Error} If radius or slantHeight is NaN.
 * @throws {Error} If radius is negative.
 * @throws {Error} If slantHeight is negative.
 *
 * @example
 * // Basic cone
 * calculateConeSurfaceArea(5, 10); // ~235.62
 *
 * @example
 * // Small cone
 * calculateConeSurfaceArea(3, 7); // ~94.25
 *
 * @example
 * // Wide cone
 * calculateConeSurfaceArea(8, 12); // ~502.65
 *
 * @example
 * // Tall narrow cone
 * calculateConeSurfaceArea(2, 15); // ~106.81
 *
 * @example
 * // Real-world: Calculate material needed for party hat
 * const hatRadius = 6; // cm
 * const hatSlantHeight = 20; // cm
 * const material = calculateConeSurfaceArea(hatRadius, hatSlantHeight); // ~490.09 cm²
 *
 * @note Formula: SA = π × r² + π × r × l (where l is slant height)
 * @note Total surface area includes base area + lateral (side) area.
 * @note Slant height is NOT the perpendicular height; it's along the surface.
 * @note If you have perpendicular height h, use: slant = √(r² + h²).
 * @note Result units are square (e.g., cm → cm², m → m²).
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculateConeSurfaceArea(
  radius: number,
  slantHeight: number,
): number {
  if (isNaN(radius) || isNaN(slantHeight)) {
    throw new Error('Radius and slant height must be numbers');
  }
  if (radius < 0) {
    throw new Error('Radius must be a non-negative number');
  }
  if (slantHeight < 0) {
    throw new Error('Slant height must be a non-negative number');
  }
  const baseArea = Math.PI * Math.pow(radius, 2);
  const lateralArea = Math.PI * radius * slantHeight;
  return baseArea + lateralArea;
}
