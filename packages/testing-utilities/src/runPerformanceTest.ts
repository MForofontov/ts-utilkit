/**
 * Interface for performance test result.
 */
export interface PerformanceTestResult {
  /** The result returned by the function */
  result: unknown;
  /** Time taken in milliseconds */
  duration: number;
  /** Number of operations performed */
  operations: number;
  /** Average time per operation in milliseconds */
  averageTime: number;
}

/**
 * Runs a performance test on a function with a specified number of iterations.
 *
 * @param fn - The function to test.
 * @param iterations - Number of iterations to run (default: 1000).
 * @returns Performance test result with duration and average time.
 *
 * @throws {TypeError} If fn is not a function.
 * @throws {Error} If iterations is not a positive number.
 *
 * @example
 * const result = runPerformanceTest(() => myFunction(data), 10000, 200);
 * expect(result.duration).toBeLessThan(200);
 *
 * @example
 * const result = runPerformanceTest(() => sortArray(largeArray), 100);
 * console.log(`Average time: ${result.averageTime}ms`);
 *
 * @complexity Time: O(n) where n is iterations, Space: O(1)
 */
export function runPerformanceTest(
  fn: () => unknown,
  iterations: number = 1000,
): PerformanceTestResult {
  if (typeof fn !== 'function') {
    throw new TypeError(`fn must be a function, got ${typeof fn}`);
  }
  if (typeof iterations !== 'number' || iterations <= 0) {
    throw new Error('iterations must be a positive number');
  }

  const startTime = performance.now();
  let result: unknown;

  for (let i = 0; i < iterations; i++) {
    result = fn();
  }

  const endTime = performance.now();
  const duration = endTime - startTime;

  return {
    result,
    duration,
    operations: iterations,
    averageTime: duration / iterations,
  };
}
