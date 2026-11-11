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
 * Finds duplicate elements in an array using deep equality comparison.
 * Each duplicate value is included only once in the result array.
 *
 * @param arr - The array to search for duplicates.
 * @returns A new array containing the duplicate values (with no repetition of the duplicates themselves).
 *
 * @example
 * // Basic usage with primitive values
 * findDuplicates([1, 2, 2, 3, 4, 4, 5]); // Returns [2, 4]
 *
 * @example
 * // With objects using deep equality
 * findDuplicates([{id: 1}, {id: 2}, {id: 1}, {id: 3}]); // Returns [{id: 1}]
 *
 * @example
 * // Empty array or no duplicates
 * findDuplicates([]); // Returns []
 * findDuplicates([1, 2, 3]); // Returns []
 *
 * @example
 * // Multiple occurrences of the same value
 * findDuplicates([1, 1, 1, 2, 2]); // Returns [1, 2]
 *
 * @note This implementation uses deep equality comparison via the deepEqual function,
 * which makes it suitable for finding duplicates of complex objects and nested structures.
 * Each duplicate is included exactly once in the result, regardless of how many times it appears.
 *
 * @complexity Time: O(n²) for object elements, O(n) for primitives, Space: O(n)
 */
export function findDuplicates<T>(arr: T[]): T[] {
  const duplicates: T[] = [];
  const primitiveSeen = new Map<string, T>();
  const objectSeen: T[] = [];

  for (const item of arr) {
    if (isPrimitiveKeyable(item)) {
      const key = primitiveKey(item);
      if (primitiveSeen.has(key)) {
        if (!duplicates.some((duplicate) => deepEqual(duplicate, item))) {
          duplicates.push(item);
        }
      } else {
        primitiveSeen.set(key, item);
      }
      continue;
    }

    if (objectSeen.some((seenItem) => deepEqual(seenItem, item))) {
      if (!duplicates.some((duplicate) => deepEqual(duplicate, item))) {
        duplicates.push(item);
      }
    } else {
      objectSeen.push(item);
    }
  }

  return duplicates;
}
