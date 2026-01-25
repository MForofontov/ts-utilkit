/**
 * Removes elements from an array based on a provided condition.
 * Creates a new array containing only the elements that don't match the predicate function.
 *
 * @param arr - The array to filter elements from.
 * @param predicate - A function that tests each element. Returns true for elements to remove.
 * @returns A new array containing only the elements that don't satisfy the predicate function.
 *
 * @example
 * // Remove even numbers
 * removeByCondition([1, 2, 3, 4, 5, 6], num => num % 2 === 0); // Returns [1, 3, 5]
 *
 * @example
 * // Remove strings containing 'a'
 * removeByCondition(['apple', 'banana', 'cherry'], str => str.includes('a'));
 * // Returns ['cherry']
 *
 * @example
 * // Remove objects with specific property
 * const users = [
 *   { name: 'Alice', active: true },
 *   { name: 'Bob', active: false },
 *   { name: 'Charlie', active: true }
 * ];
 * removeByCondition(users, user => user.active); // Returns [{ name: 'Bob', active: false }]
 *
 * @example
 * // Empty array handling
 * removeByCondition([], () => true); // Returns []
 *
 * @note This function does not modify the original array. It returns a new array
 * with the filtered results using Array.filter() internally with the predicate negated.
 *
 * @complexity Time: O(n), Space: O(n) - Where n is array length
 */
export function removeByCondition<T>(
  arr: T[],
  predicate: (value: T) => boolean,
): T[] {
  return arr.filter((value) => !predicate(value));
}
