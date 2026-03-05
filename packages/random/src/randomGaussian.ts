/**
 * Returns a random sample from a Gaussian (normal) distribution using the
 * Box-Muller transform.
 *
 * @param mean - The mean (μ) of the distribution (default: 0).
 * @param stdDev - The standard deviation (σ) of the distribution (default: 1).
 *   Must be greater than 0.
 * @returns A random floating-point number drawn from the N(mean, stdDev²) distribution.
 *
 * @throws {Error} If mean is NaN.
 * @throws {Error} If stdDev is NaN or not greater than 0.
 *
 * @example
 * // Standard normal distribution (mean=0, stdDev=1)
 * randomGaussian(); // e.g. 0.327
 *
 * @example
 * // Human height simulation (mean=170cm, stdDev=10cm)
 * randomGaussian(170, 10); // e.g. 163.4
 *
 * @example
 * // Measurement noise with tight spread
 * randomGaussian(0, 0.01); // e.g. -0.0073
 *
 * @note Uses the Box-Muller transform: given two independent uniform random
 * variables U1, U2 ∈ (0,1], the transform produces a standard normal variate:
 * Z = sqrt(-2 * ln(U1)) * cos(2π * U2).
 * @note Output is unbounded — values far from the mean are possible but rare.
 * Approximately 99.7% of values fall within ±3σ of the mean.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function randomGaussian(mean: number = 0, stdDev: number = 1): number {
  if (isNaN(mean)) {
    throw new Error('mean must be a valid number, not NaN');
  }
  if (isNaN(stdDev)) {
    throw new Error('stdDev must be a valid number, not NaN');
  }
  if (stdDev <= 0) {
    throw new Error(`stdDev must be greater than 0, got ${stdDev}`);
  }

  // Box-Muller transform — avoid U1=0 to prevent log(0)
  let u1 = 0;
  while (u1 === 0) {
    u1 = Math.random();
  }
  const u2 = Math.random();

  const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return mean + stdDev * z;
}
