/**
 * Executes an array of async functions in series (one after another).
 *
 * @param tasks - Array of async functions to execute.
 * @returns Promise that resolves with array of results in execution order.
 *
 * @throws {TypeError} If tasks is not an array.
 * @throws {Error} If any task is not a function.
 *
 * @example
 * // Basic series execution
 * const results = await asyncSeries([
 *   async () => { console.log('Task 1'); return 'result1'; },
 *   async () => { console.log('Task 2'); return 'result2'; },
 *   async () => { console.log('Task 3'); return 'result3'; },
 * ]); // Executes one by one: Task 1, Task 2, Task 3
 *
 * @example
 * // Database operations in sequence
 * const results = await asyncSeries([
 *   async () => createUser({ name: 'John' }),
 *   async () => createProfile({ userId: 1 }),
 *   async () => sendWelcomeEmail('john@example.com'),
 * ]);
 *
 * @example
 * // File processing pipeline
 * const results = await asyncSeries([
 *   async () => readFile('input.txt'),
 *   async () => processData(data),
 *   async () => writeFile('output.txt', processedData),
 * ]);
 *
 * @note Tasks are executed sequentially, each waiting for the previous to complete.
 *
 * @complexity Time: O(n) where n is number of tasks, Space: O(n)
 */
export function asyncSeries<T>(tasks: Array<() => Promise<T>>): Promise<T[]> {
  if (!Array.isArray(tasks)) {
    throw new TypeError(`tasks must be an array, got ${typeof tasks}`);
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

    const results: T[] = [];

    for (const task of tasks) {
      const result = await task();
      results.push(result);
    }

    return results;
  })();
}
