/**
 * Executes an array of async functions in parallel with concurrency control.
 *
 * @param tasks - Array of async functions to execute.
 * @param concurrency - Maximum number of concurrent executions (default: 5).
 * @returns Promise that resolves with array of results in the same order as input tasks.
 *
 * @throws {TypeError} If tasks is not an array or concurrency is not a number.
 * @throws {Error} If concurrency is less than 1 or tasks array contains non-functions.
 *
 * @example
 * // Basic parallel execution with default concurrency
 * const results = await asyncParallel([
 *   async () => fetch('/api/user/1').then(r => r.json()),
 *   async () => fetch('/api/user/2').then(r => r.json()),
 *   async () => fetch('/api/user/3').then(r => r.json()),
 * ]); // Executes up to 5 concurrently
 *
 * @example
 * // Custom concurrency limit
 * const results = await asyncParallel([
 *   async () => heavyComputation(1),
 *   async () => heavyComputation(2),
 *   async () => heavyComputation(3),
 *   async () => heavyComputation(4),
 * ], 2); // Only 2 concurrent executions
 *
 * @example
 * // With mixed async operations
 * const results = await asyncParallel([
 *   async () => databaseQuery('SELECT * FROM users'),
 *   async () => cacheGet('config'),
 *   async () => externalApiCall('/data'),
 * ], 3);
 *
 * @note Results are returned in the same order as input tasks, regardless of completion order.
 *
 * @complexity Time: O(n/c) where n is number of tasks and c is concurrency, Space: O(n)
 */
export function asyncParallel<T>(
  tasks: Array<() => Promise<T>>,
  concurrency?: number,
): Promise<T[]> {
  if (!Array.isArray(tasks)) {
    throw new TypeError(`tasks must be an array, got ${typeof tasks}`);
  }

  // Validate concurrency if provided
  if (
    concurrency !== undefined &&
    (typeof concurrency !== 'number' || isNaN(concurrency))
  ) {
    throw new TypeError(
      `concurrency must be a number, got ${typeof concurrency}`,
    );
  }

  // Default concurrency
  const actualConcurrency = concurrency ?? 5;

  if (actualConcurrency < 1) {
    throw new Error(`concurrency must be at least 1, got ${actualConcurrency}`);
  }

  // Validate all tasks are functions
  tasks.forEach((task, index) => {
    if (typeof task !== 'function') {
      throw new Error(
        `Task at index ${index} must be a function, got ${typeof task}`,
      );
    }
  });

  // After validation, return the async implementation
  return (async () => {
    if (tasks.length === 0) {
      return [];
    }

    // Simple batch processing approach
    const results: T[] = new Array<T>(tasks.length);

    // Process tasks in batches
    for (let i = 0; i < tasks.length; i += actualConcurrency) {
      const batch = tasks.slice(i, i + actualConcurrency);
      const batchPromises = batch.map(async (task, batchIndex) => {
        const actualIndex = i + batchIndex;
        const result = await task();
        results[actualIndex] = result;
      });

      await Promise.all(batchPromises);
    }

    return results;
  })();
}
