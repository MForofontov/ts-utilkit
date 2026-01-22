/**
 * Finds common elements between two arrays based on a provided condition and deep equality.
 * Identifies elements present in both arrays using JSON stringification for comparison,
 * then filters the common elements using the provided condition function.
 *
 * @param arr1 - The first array to compare.
 * @param arr2 - The second array to compare.
 * @param condition - A function that takes an element and returns a boolean indicating
 *                    whether it satisfies the condition.
 * @returns An array containing the common elements that satisfy the condition.
 *
 * @example
 * // Basic usage with objects
 * const array1 = [{ a: 1 }, { a: 2 }, { a: 3 }];
 * const array2 = [{ a: 2 }, { a: 3 }, { a: 4 }];
 * const condition = (item: { a: number }) => item.a > 1;
 * findCommonWithCondition(array1, array2, condition); // Returns [{ a: 2 }, { a: 3 }]
 *
 * @example
 * // With primitive values
 * findCommonWithCondition([1, 2, 3], [2, 3, 4], x => x > 2); // Returns [3]
 *
 * @example
 * // Empty result when no common elements satisfy the condition
 * findCommonWithCondition([1, 2], [3, 4], x => x > 5); // Returns []
 *
 * @note This implementation uses JSON.stringify for deep equality comparison.
 * It avoids converting the second array to a Set, resulting in O(n*m) complexity.
 * JSON.stringify has limitations with circular references and non-serializable values
 * like functions, undefined, or symbols.
 *
 * @complexity Time: O(n*m), Space: O(n) - Where n, m are arr1, arr2 lengths
 */
export function findCommonWithCondition<T>(
  arr1: T[],
  arr2: T[],
  condition: (item: T) => boolean,
): T[] {
  // First, find common elements using deep equality, then apply the condition
  return arr1
    .filter((item1) =>
      arr2.some((item2) => JSON.stringify(item1) === JSON.stringify(item2)),
    )
    .filter(condition);
}
