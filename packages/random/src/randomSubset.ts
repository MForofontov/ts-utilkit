/**
 * Generates a random subset of an array.
 *
 * @template T - The type of elements in the array.
 * @param array - The source array.
 * @param minSize - Minimum size of the subset (default: 1).
 * @param maxSize - Maximum size of the subset (default: array.length).
 * @param allowDuplicates - Whether to allow duplicate elements (default: false).
 * @returns A random subset of the array.
 *
 * @throws {TypeError} If parameters have incorrect types.
 * @throws {Error} If array is empty or size constraints are invalid.
 *
 * @example
 * // Random subset of 2-4 elements
 * randomSubset([1, 2, 3, 4, 5], 2, 4); // [3, 1, 5]
 *
 * @example
 * // Any size subset (1 to array.length)
 * randomSubset(['a', 'b', 'c', 'd']); // ['b', 'd']
 *
 * @example
 * // With duplicates
 * randomSubset([1, 2, 3], 2, 5, true); // [2, 1, 2, 3]
 *
 * @complexity Time: O(n), Space: O(n) where n is subset size
 */
export function randomSubset<T>(
  array: T[],
  minSize: number = 1,
  maxSize?: number,
  allowDuplicates: boolean = false,
): T[] {
  if (!Array.isArray(array)) {
    throw new TypeError(`array must be an array, got ${typeof array}`);
  }
  if (typeof minSize !== 'number') {
    throw new TypeError(`minSize must be a number, got ${typeof minSize}`);
  }
  if (maxSize !== undefined && typeof maxSize !== 'number') {
    throw new TypeError(`maxSize must be a number, got ${typeof maxSize}`);
  }
  if (typeof allowDuplicates !== 'boolean') {
    throw new TypeError(
      `allowDuplicates must be a boolean, got ${typeof allowDuplicates}`,
    );
  }
  if (array.length === 0) {
    throw new Error('array cannot be empty');
  }
  if (isNaN(minSize)) {
    throw new Error('minSize must be a valid number, not NaN');
  }
  if (!Number.isInteger(minSize)) {
    throw new Error('minSize must be an integer');
  }
  if (minSize < 1) {
    throw new Error('minSize must be at least 1');
  }

  const actualMaxSize = maxSize ?? array.length;

  if (isNaN(actualMaxSize)) {
    throw new Error('maxSize must be a valid number, not NaN');
  }
  if (!Number.isInteger(actualMaxSize)) {
    throw new Error('maxSize must be an integer');
  }
  if (actualMaxSize < minSize) {
    throw new Error('maxSize must be greater than or equal to minSize');
  }
  if (!allowDuplicates && actualMaxSize > array.length) {
    throw new Error(
      'maxSize cannot exceed array length when duplicates are not allowed',
    );
  }

  // Random size between minSize and maxSize
  const size =
    Math.floor(Math.random() * (actualMaxSize - minSize + 1)) + minSize;

  const result: T[] = [];

  if (allowDuplicates) {
    for (let i = 0; i < size; i++) {
      const randomIndex = Math.floor(Math.random() * array.length);
      result.push(array[randomIndex]);
    }
  } else {
    const indices = new Set<number>();
    while (indices.size < size) {
      indices.add(Math.floor(Math.random() * array.length));
    }
    indices.forEach((index) => result.push(array[index]));
  }

  return result;
}
