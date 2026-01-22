/**
 * Calculates the area of an ellipse given its semi-major and semi-minor axes.
 *
 * @param semiMajor - The length of the semi-major axis (half the longest diameter).
 * @param semiMinor - The length of the semi-minor axis (half the shortest diameter).
 * @returns The area of the ellipse in square units.
 *
 * @throws {Error} If semiMajor or semiMinor is NaN.
 * @throws {Error} If semiMajor is negative.
 * @throws {Error} If semiMinor is negative.
 *
 * @example
 * // Basic ellipse
 * calculateEllipseArea(5, 3); // ~47.12
 *
 * @example
 * // Wide ellipse
 * calculateEllipseArea(10, 4); // ~125.66
 *
 * @example
 * // Circle (equal axes)
 * calculateEllipseArea(5, 5); // ~78.54 (same as circle area)
 *
 * @example
 * // Narrow ellipse
 * calculateEllipseArea(8, 2); // ~50.27
 *
 * @example
 * // Real-world: Calculate oval race track infield area
 * const majorAxis = 100; // meters
 * const minorAxis = 60; // meters
 * const area = calculateEllipseArea(majorAxis, minorAxis); // ~18,849.56 m²
 *
 * @note Formula: A = π × a × b (where a is semi-major, b is semi-minor)
 * @note When semiMajor = semiMinor, the ellipse becomes a circle.
 * @note Semi-major axis is always the longer of the two axes.
 * @note Result units are square (e.g., cm → cm², m → m²).
 * @note Common use cases: planetary orbits, race tracks, oval tables, mirrors.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculateEllipseArea(
  semiMajor: number,
  semiMinor: number,
): number {
  if (isNaN(semiMajor) || isNaN(semiMinor)) {
    throw new Error('Semi-major and semi-minor axes must be numbers');
  }
  if (semiMajor < 0) {
    throw new Error('Semi-major axis must be a non-negative number');
  }
  if (semiMinor < 0) {
    throw new Error('Semi-minor axis must be a non-negative number');
  }
  return Math.PI * semiMajor * semiMinor;
}
