import { deepEqual } from '@ts-utilkit/object';

/**
 * Gets unique elements in an array and their counts using deep equality comparison.
 * Returns an array of objects containing each unique element and how many times it appears.
 *
 * @param arr - The array to analyze.
 * @returns An array of objects where each object contains a unique element and its count.
 *
 * @example
 * // Basic usage with primitive values
 * uniqueElementsWithCounts([1, 2, 2, 3, 3, 3]);
 * // Returns [{ element: 1, count: 1 }, { element: 2, count: 2 }, { element: 3, count: 3 }]
 *
 * @example
 * // With objects using deep equality
 * uniqueElementsWithCounts([{id: 1}, {id: 2}, {id: 1}]);
 * // Returns [{ element: {id: 1}, count: 2 }, { element: {id: 2}, count: 1 }]
 *
 * @example
 * // Empty array
 * uniqueElementsWithCounts([]); // Returns []
 *
 * @example
 * // With mixed data types
 * uniqueElementsWithCounts([1, '1', true, 1]);
 * // Returns [{ element: 1, count: 2 }, { element: '1', count: 1 }, { element: true, count: 1 }]
 *
 * @note Objects are compared with deepEqual; primitives use Map key equality.
 * The order of elements in the result follows their first occurrence in the input array.
 *
 * @complexity Time: O(n) for primitives, O(n²) deep comparisons for objects;
 * Space: O(n). Deep comparison cost also depends on object size.
 */
export function uniqueElementsWithCounts<T>(
  arr: T[],
): { element: T; count: number }[] {
  const primitives = new Map<unknown, { element: T; count: number }>();
  const objects: { element: T; count: number }[] = [];
  const result: { element: T; count: number }[] = [];
  arr.forEach((item) => {
    const isObject = typeof item === 'object' && item !== null;
    const existing = isObject
      ? objects.find((entry) => deepEqual(entry.element, item))
      : primitives.get(item);
    if (existing) {
      existing.count++;
    } else {
      const entry = { element: item, count: 1 };
      result.push(entry);
      if (isObject) objects.push(entry);
      else primitives.set(item, entry);
    }
  });
  return result;
}
