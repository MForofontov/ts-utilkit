import { deepEqual } from '@ts-utilkit/object';

function isPrimitiveKeyable(value: unknown): boolean {
  const type = typeof value;
  return (
    value === null ||
    type === 'string' ||
    type === 'number' ||
    type === 'boolean' ||
    type === 'bigint' ||
    type === 'undefined'
  );
}

function primitiveKey(value: unknown): string {
  if (value === undefined) return '__undefined__';
  if (value === null) return '__null__';
  if (typeof value === 'number' && Number.isNaN(value)) return '__nan__';
  return `${typeof value}:${String(value)}`;
}

/**
 * Merges two arrays and returns a new array with unique elements.
 * Uses deep equality comparison to determine if elements are duplicates.
 *
 * @param arr1 - The first array to merge.
 * @param arr2 - The second array to merge.
 * @returns A new array containing unique elements from both input arrays, with duplicates removed.
 *
 * @example
 * // Basic usage with primitive values
 * mergeUnique([1, 2, 3], [3, 4, 5]); // Returns [1, 2, 3, 4, 5]
 *
 * @example
 * // With objects using deep equality
 * mergeUnique([{id: 1}, {id: 2}], [{id: 2}, {id: 3}]); // Returns [{id: 1}, {id: 2}, {id: 3}]
 *
 * @example
 * // Empty arrays
 * mergeUnique([], [1, 2]); // Returns [1, 2]
 * mergeUnique([1, 2], []); // Returns [1, 2]
 * mergeUnique([], []); // Returns []
 *
 * @example
 * // Array with duplicates
 * mergeUnique([1, 1, 2], [2, 3, 3]); // Returns [1, 2, 3]
 *
 * @note This implementation uses deep equality comparison via the deepEqual function,
 * which makes it suitable for merging arrays with complex objects and nested structures.
 * Elements from the first array are added first, followed by unique elements from the second array.
 *
 * @complexity Time: O(n*m) for object elements, O(n+m) for primitives, Space: O(n)
 */
export function mergeUnique<T>(arr1: T[], arr2: T[]): T[] {
  const result: T[] = [];
  const primitiveKeys = new Set<string>();

  const contains = (item: T): boolean => {
    if (isPrimitiveKeyable(item)) {
      return primitiveKeys.has(primitiveKey(item));
    }
    return result.some((existingItem) => deepEqual(existingItem, item));
  };

  const addUnique = (arr: T[]) => {
    arr.forEach((item) => {
      if (!contains(item)) {
        result.push(item);
        if (isPrimitiveKeyable(item)) {
          primitiveKeys.add(primitiveKey(item));
        }
      }
    });
  };

  addUnique(arr1);
  addUnique(arr2);

  return result;
}
