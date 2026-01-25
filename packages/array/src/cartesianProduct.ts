/**
 * Calculates the Cartesian product of two or more arrays.
 * The Cartesian product of sets A and B is the set of all ordered pairs (a, b)
 * where a ∈ A and b ∈ B. For multiple sets, it extends to all possible combinations.
 *
 * @param arrays - The arrays to compute the Cartesian product of.
 * @returns An array containing all possible combinations of elements from the input arrays.
 *
 * @example
 * // Basic usage with two arrays
 * const colors = ['red', 'green'];
 * const sizes = ['S', 'M'];
 * cartesianProduct(colors, sizes);
 * // Returns: [['red', 'S'], ['red', 'M'], ['green', 'S'], ['green', 'M']]
 *
 * @example
 * // With three arrays
 * const colors = ['red', 'green'];
 * const sizes = ['S', 'M'];
 * const quantities = [1, 2];
 * cartesianProduct(colors, sizes, quantities);
 * // Returns: [
 * //   ['red', 'S', 1], ['red', 'S', 2], ['red', 'M', 1], ['red', 'M', 2],
 * //   ['green', 'S', 1], ['green', 'S', 2], ['green', 'M', 1], ['green', 'M', 2]
 * // ]
 *
 * @example
 * // Empty array handling
 * cartesianProduct([], [1, 2]); // Returns: []
 * cartesianProduct([1, 2], []); // Returns: []
 *
 * @example
 * // Single array
 * cartesianProduct([1, 2, 3]); // Returns: [[1], [2], [3]]
 *
 * @example
 * // Real-world: Generate all product variants
 * const colors = ['Black', 'White'];
 * const sizes = ['XS', 'S', 'M', 'L', 'XL'];
 * const styles = ['Regular', 'Slim'];
 * const variants = cartesianProduct(colors, sizes, styles);
 * // Generates 20 product variants (2 × 5 × 2)
 *
 * @note The function uses array.reduce() with flatMap and map to build
 * the combinations. The number of resulting combinations grows exponentially
 * with the number of input arrays and their sizes.
 * @note Result size is the product of all input array lengths.
 * @note Useful for generating test cases, configuration combinations, and product variants.
 * @note Memory usage can become very large with many or large input arrays.
 *
 * @complexity Time: O(n^m), Space: O(n^m) - Where n is avg array length, m is number of arrays
 */
type CartesianTuple<T extends unknown[][]> = { [K in keyof T]: T[K][number] };

export function cartesianProduct<T extends unknown[][]>(
  ...arrays: T
): CartesianTuple<T>[] {
  // Handle empty array case
  if (arrays.some((arr) => arr.length === 0)) {
    return [];
  }

  return arrays.reduce<CartesianTuple<T>[]>(
    (acc, arr) =>
      acc.flatMap((x) => arr.map((y) => [...x, y] as CartesianTuple<T>)),
    [[]] as unknown as CartesianTuple<T>[],
  );
}
