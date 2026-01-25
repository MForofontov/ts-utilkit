/**
 * Interface for memory usage measurement result.
 */
export interface MemoryUsageResult {
  heapUsedBefore: number;
  heapUsedAfter: number;
  heapUsedDelta: number;
  result: unknown;
}

/**
 * Measures memory usage of a function (Node.js only).
 * Useful for testing memory-intensive operations.
 *
 * @param fn - The function to test.
 * @returns Object with memory usage information in bytes.
 *
 * @throws {TypeError} If fn is not a function.
 *
 * @example
 * const memUsage = measureMemoryUsage(() => {
 *   const largeArray = new Array(1000000).fill(0);
 *   return processArray(largeArray);
 * });
 * expect(memUsage.heapUsedDelta).toBeLessThan(10 * 1024 * 1024); // Less than 10MB
 *
 * @example
 * // Compare memory usage of different approaches
 * const approach1 = measureMemoryUsage(() => method1(data));
 * const approach2 = measureMemoryUsage(() => method2(data));
 * expect(approach1.heapUsedDelta).toBeLessThan(approach2.heapUsedDelta);
 *
 * @note Requires Node.js environment with process.memoryUsage().
 * @note Results may vary due to garbage collection timing.
 *
 * @complexity Time: O(1) + time of fn, Space: O(1) + space of fn
 */
export function measureMemoryUsage(fn: () => unknown): MemoryUsageResult {
  if (typeof fn !== 'function') {
    throw new TypeError(`fn must be a function, got ${typeof fn}`);
  }

  // Force garbage collection if available
  if (global.gc) {
    global.gc();
  }

  const memBefore = process.memoryUsage();
  const result = fn();
  const memAfter = process.memoryUsage();

  return {
    heapUsedBefore: memBefore.heapUsed,
    heapUsedAfter: memAfter.heapUsed,
    heapUsedDelta: memAfter.heapUsed - memBefore.heapUsed,
    result,
  };
}
