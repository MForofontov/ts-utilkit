/**
 * Maps over an array asynchronously, applying an async function to each element.
 *
 * @param array - The array to map over.
 * @param asyncFn - The async function to apply to each element.
 * @param concurrency - Maximum number of concurrent operations (default: 5).
 * @returns Promise that resolves with array of mapped results.
 *
 * @throws {TypeError} If array is not an array or asyncFn is not a function.
 * @throws {Error} If concurrency is less than 1.
 *
 * @example
 * // Basic async map
 * const results = await asyncMap(
 *   [1, 2, 3, 4, 5],
 *   async (num) => {
 *     const response = await fetch(`/api/data/${num}`);
 *     return response.json();
 *   }
 * );
 *
 * @example
 * // With custom concurrency
 * const results = await asyncMap(
 *   ['file1.txt', 'file2.txt', 'file3.txt'],
 *   async (filename) => {
 *     const content = await readFile(filename);
 *     return content.length;
 *   },
 *   2 // Only process 2 files at a time
 * );
 *
 * @example
 * // Processing user data
 * const enrichedUsers = await asyncMap(
 *   userIds,
 *   async (userId) => {
 *     const user = await getUser(userId);
 *     const preferences = await getUserPreferences(userId);
 *     return { ...user, preferences };
 *   }
 * );
 *
 * @note Results maintain the same order as the input array.
 *
 * @complexity Time: O(n/c) where n is array length and c is concurrency, Space: O(n)
 */
export function asyncMap<T, R>(
  array: T[],
  asyncFn: (item: T, index: number) => Promise<R>,
  concurrency?: number,
): Promise<R[]> {
  if (!Array.isArray(array)) {
    throw new TypeError(`array must be an array, got ${typeof array}`);
  }

  if (typeof asyncFn !== 'function') {
    throw new TypeError(`asyncFn must be a function, got ${typeof asyncFn}`);
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

  // After validation, return the async implementation
  return (async () => {
    if (array.length === 0) {
      return [];
    }

    // For small arrays or high concurrency, just use Promise.all
    if (array.length <= actualConcurrency) {
      return Promise.all(array.map((item, index) => asyncFn(item, index)));
    }

    // Simple batch processing approach
    const results: R[] = new Array<R>(array.length);

    // Process items in batches
    for (let i = 0; i < array.length; i += actualConcurrency) {
      const batch = array.slice(i, i + actualConcurrency);
      const batchPromises = batch.map(async (item, batchIndex) => {
        const actualIndex = i + batchIndex;
        const result = await asyncFn(item, actualIndex);
        results[actualIndex] = result;
      });

      await Promise.all(batchPromises);
    }

    return results;
  })();
}
