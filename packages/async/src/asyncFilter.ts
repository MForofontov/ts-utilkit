/**
 * Filters an array asynchronously using an async predicate function.
 *
 * @param array - The array to filter.
 * @param asyncPredicate - Async function that returns true for elements to keep.
 * @returns Promise that resolves with filtered array.
 *
 * @throws {TypeError} If array is not an array or asyncPredicate is not a function.
 *
 * @example
 * // Filter users based on async validation
 * const validUsers = await asyncFilter(
 *   users,
 *   async (user) => {
 *     const isActive = await checkUserStatus(user.id);
 *     return isActive;
 *   }
 * );
 *
 * @example
 * // Filter files that exist
 * const existingFiles = await asyncFilter(
 *   filePaths,
 *   async (path) => {
 *     try {
 *       await fs.access(path);
 *       return true;
 *     } catch {
 *       return false;
 *     }
 *   }
 * );
 *
 * @example
 * // Filter valid URLs
 * const validUrls = await asyncFilter(
 *   urls,
 *   async (url) => {
 *     try {
 *       const response = await fetch(url, { method: 'HEAD' });
 *       return response.ok;
 *     } catch {
 *       return false;
 *     }
 *   }
 * );
 *
 * @note All predicates are executed in parallel for better performance.
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function asyncFilter<T>(
  array: T[],
  asyncPredicate: (item: T, index: number) => Promise<boolean>,
): Promise<T[]> {
  if (!Array.isArray(array)) {
    throw new TypeError(`array must be an array, got ${typeof array}`);
  }

  if (typeof asyncPredicate !== 'function') {
    throw new TypeError(
      `asyncPredicate must be a function, got ${typeof asyncPredicate}`,
    );
  }

  // After validation, return the async implementation
  return (async () => {
    if (array.length === 0) {
      return [];
    }

    // Execute all predicates in parallel
    const predicateResults = await Promise.all(
      array.map((item, index) => asyncPredicate(item, index)),
    );

    // Filter based on predicate results
    return array.filter((_, index) => predicateResults[index]);
  })();
}
