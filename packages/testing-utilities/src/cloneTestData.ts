/**
 * Creates a deep clone of test data to prevent mutation issues.
 * Useful when the same test data needs to be used multiple times.
 *
 * @template T - The type of data to clone.
 * @param data - Data to clone.
 * @returns Deep clone of the data.
 *
 * @example
 * const originalData = { values: [1, 2, 3] };
 * const testData = cloneTestData(originalData);
 * myMutatingFunction(testData);
 * expect(originalData.values).toEqual([1, 2, 3]); // Original unchanged
 *
 * @example
 * // Clone complex nested structures
 * const original = { users: [{ id: 1, data: { score: 100 } }] };
 * const copy = cloneTestData(original);
 * copy.users[0].data.score = 200;
 * expect(original.users[0].data.score).toBe(100);
 *
 * @note Handles Date, RegExp, Map, Set, and nested objects/arrays.
 *
 * @complexity Time: O(n) where n is total elements, Space: O(n)
 */
export function cloneTestData<T>(data: T): T {
  if (data === null || data === undefined) {
    return data;
  }

  // Handle primitives
  if (typeof data !== 'object') {
    return data;
  }

  // Handle Date
  if (data instanceof Date) {
    return new Date(data.getTime()) as T;
  }

  // Handle Array
  if (Array.isArray(data)) {
    const clonedArray: unknown[] = [];
    for (const item of data) {
      clonedArray.push(cloneTestData(item));
    }
    return clonedArray as unknown as T;
  }

  // Handle RegExp
  if (data instanceof RegExp) {
    return new RegExp(data.source, data.flags) as T;
  }

  // Handle Map
  if (data instanceof Map) {
    return new Map(
      Array.from(data.entries()).map(([k, v]) => [k, cloneTestData(v)]),
    ) as T;
  }

  // Handle Set
  if (data instanceof Set) {
    const clonedSet = new Set();
    data.forEach((item) => {
      clonedSet.add(cloneTestData(item));
    });
    return clonedSet as unknown as T;
  }

  // Handle Object
  const cloned: Record<string, unknown> = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      cloned[key] = cloneTestData((data as Record<string, unknown>)[key]);
    }
  }

  return cloned as T;
}
