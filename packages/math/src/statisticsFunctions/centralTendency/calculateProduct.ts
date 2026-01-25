/**
 * Calculates the product of all numbers in an array by multiplying them together.
 *
 * @param arr - The array of numbers to multiply.
 * @returns The product of all numbers in the array. Returns 1 for an empty array.
 *
 * @example
 * // Basic usage
 * calculateProduct([1, 2, 3, 4]); // Returns 24
 *
 * @example
 * // With negative numbers
 * calculateProduct([2, -3, 4]); // Returns -24
 *
 * @example
 * // With zero (results in zero)
 * calculateProduct([5, 0, 3]); // Returns 0
 *
 * @example
 * // Empty array
 * calculateProduct([]); // Returns 1 (multiplicative identity)
 *
 * @note The function uses array.reduce() with an initial value of 1.
 * An empty array will return 1 (the multiplicative identity).
 * Be cautious with large arrays as the product can quickly exceed Number.MAX_SAFE_INTEGER.
 *
 * @complexity Time: O(n), Space: O(1) - Where n is array length
 */
export function calculateProduct(arr: number[]): number {
  return arr.reduce((product, num) => product * num, 1);
}
