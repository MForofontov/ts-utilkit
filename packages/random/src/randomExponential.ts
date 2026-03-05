/**
 * Returns a random sample from an exponential distribution using the
 * inverse transform method.
 *
 * @param lambda - The rate parameter (λ) of the distribution. Must be greater
 *   than 0. The mean of the distribution equals 1/λ.
 * @returns A non-negative random floating-point number drawn from the
 *   Exponential(λ) distribution.
 *
 * @throws {Error} If lambda is NaN or not greater than 0.
 *
 * @example
 * // Average wait time of 5 minutes (λ = 1/5 = 0.2)
 * randomExponential(0.2); // e.g. 3.71
 *
 * @example
 * // Average time between events of 1 second (λ = 1)
 * randomExponential(1); // e.g. 0.84
 *
 * @example
 * // Simulate rapid events (λ = 10, mean = 0.1s)
 * randomExponential(10); // e.g. 0.032
 *
 * @note Uses the inverse transform: X = -ln(U) / λ, where U ~ Uniform(0,1].
 * @note Common use cases: inter-arrival times in queueing models, time-to-failure
 * in reliability engineering, simulating Poisson process waiting times.
 * @note The distribution has the memoryless property: the remaining wait time
 * is independent of how long you have already waited.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function randomExponential(lambda: number): number {
  if (isNaN(lambda)) {
    throw new Error('lambda must be a valid number, not NaN');
  }
  if (lambda <= 0) {
    throw new Error(`lambda must be greater than 0, got ${lambda}`);
  }

  // Inverse transform: X = -ln(U) / λ, avoid U=0 to prevent log(0)
  let u = 0;
  while (u === 0) {
    u = Math.random();
  }

  return -Math.log(u) / lambda;
}
