/**
 * Flattens an array of arrays up to a specified depth.
 * Unlike complete flattening, this function gives you control over how many levels deep to flatten.
 *
 * @param arr - The nested array to flatten.
 * @param depth - The depth level to flatten. Default is 1.
 * @returns A new array flattened to the specified depth.
 *
 * @example
 * // Basic usage with default depth (1)
 * flattenArrayDepth([1, [2, [3, 4], 5], 6]); // Returns [1, 2, [3, 4], 5, 6]
 *
 * @example
 * // With specific depth
 * flattenArrayDepth([1, [2, [3, 4], 5], 6], 2); // Returns [1, 2, 3, 4, 5, 6]
 *
 * @example
 * // With depth 0 (no flattening)
 * flattenArrayDepth([1, [2, [3, 4]], 5], 0); // Returns [1, [2, [3, 4]], 5]
 *
 * @example
 * // With mixed data types
 * flattenArrayDepth(['a', [1, [true, null]], {key: 'value'}], 1);
 * // Returns ['a', 1, [true, null], {key: 'value'}]
 *
 * @note This implementation uses recursion with a depth counter, which provides
 * control over the flattening process. For complete flattening regardless of depth,
 * see the flattenArray function instead.
 *
 * @complexity Time: O(n), Space: O(n) - Where n is total nested elements
 */
type Nested<T> = T | Array<Nested<T>>;

export function flattenArrayDepth<T>(
  arr: Array<Nested<T>>,
  depth: number = 1,
): T[] {
  return depth > 0
    ? arr.reduce<T[]>(
        (acc, val) =>
          acc.concat(
            Array.isArray(val)
              ? flattenArrayDepth(val as Array<Nested<T>>, depth - 1)
              : val,
          ),
        [] as T[],
      )
    : (arr as T[]).slice();
}
