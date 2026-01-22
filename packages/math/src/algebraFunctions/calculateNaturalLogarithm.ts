/**
 * Calculates the natural logarithm (base e) of a number.
 *
 * @param n - The number to find the natural logarithm of.
 * @returns The natural logarithm of the number.
 *
 * @example
 * // Basic usage with Euler's number
 * calculateNaturalLogarithm(Math.E); // 1
 * calculateNaturalLogarithm(Math.E ** 2); // 2
 *
 * @example
 * // Common values
 * calculateNaturalLogarithm(1); // 0 (e^0 = 1)
 * calculateNaturalLogarithm(10); // 2.302585092994046
 *
 * @example
 * // Fractional values
 * calculateNaturalLogarithm(0.5); // -0.6931471805599453
 * calculateNaturalLogarithm(0.1); // -2.302585092994046
 *
 * @example
 * // Real-world: Calculating time for exponential decay
 * const halfLife = calculateNaturalLogarithm(2); // 0.693... (half-life constant)
 *
 * @example
 * // Information theory: Entropy calculation
 * const probability = 0.25;
 * const information = -calculateNaturalLogarithm(probability); // 1.386... nats
 *
 * @note Wraps Math.log(); returns `-Infinity` for 0 and `NaN` for negative inputs.
 * @note Natural logarithm is the inverse of the exponential function (e^x).
 * @note Commonly used in calculus, physics, and information theory.
 * @note Natural log uses base e (Euler's number ≈ 2.71828).
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function calculateNaturalLogarithm(n: number): number {
  return Math.log(n);
}
