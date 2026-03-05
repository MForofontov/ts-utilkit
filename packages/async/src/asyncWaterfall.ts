/**
 * Executes an array of async tasks in sequence, piping the resolved output of
 * each task as the input to the next. This is the async equivalent of a
 * left-to-right function composition pipeline.
 *
 * Contrast with `asyncSeries`, which executes independent tasks that share no
 * state. `asyncWaterfall` threads a single value through all tasks.
 *
 * @param tasks - Ordered array of async functions. Each task receives the
 * resolved value of the previous task (the first task receives `initialValue`).
 * @param initialValue - The seed value passed to the first task.
 * @returns Promise that resolves with the output of the final task.
 * Returns a Promise resolved with `initialValue` when `tasks` is empty.
 *
 * @throws {Error} If any element of `tasks` is not a function.
 *
 * @example
 * // Transform a number through a pipeline
 * const result = await asyncWaterfall(
 *   [
 *     async (n) => n * 2,         // 5 → 10
 *     async (n) => n + 3,         // 10 → 13
 *     async (n) => n.toString(),  // 13 → '13'
 *   ],
 *   5,
 * ); // '13'
 *
 * @example
 * // Database pipeline: fetch, enrich, persist
 * const savedUser = await asyncWaterfall(
 *   [
 *     async (id) => getUserById(id),
 *     async (user) => ({ ...user, role: await fetchRole(user.roleId) }),
 *     async (enriched) => saveUser(enriched),
 *   ],
 *   userId,
 * );
 *
 * @example
 * // Empty task list returns initialValue unchanged
 * const value = await asyncWaterfall([], 42); // 42
 *
 * @note If any task throws, the pipeline is aborted and the error propagates
 * immediately — subsequent tasks are never called.
 *
 * @complexity Time: O(n) where n is number of tasks, Space: O(1)
 */
export function asyncWaterfall<T>(
  tasks: Array<(input: T) => Promise<T>>,
  initialValue: T,
): Promise<T> {
  tasks.forEach((task, index) => {
    if (typeof task !== 'function') {
      throw new Error(
        `Task at index ${index} must be a function, got ${typeof task}`,
      );
    }
  });

  return (async () => {
    if (tasks.length === 0) {
      return initialValue;
    }

    let current = initialValue;

    for (const task of tasks) {
      current = await task(current);
    }

    return current;
  })();
}
