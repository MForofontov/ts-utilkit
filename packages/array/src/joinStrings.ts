/**
 * Joins an array of elements into a single string with a specified separator.
 * Handles various data types by converting them to strings before joining.
 * Functions are executed and their return values are used.
 *
 * @param arr - The array of elements to join. Can contain mixed data types.
 * @param separator - The string to insert between each element in the result.
 * @returns A single string with all elements joined by the separator.
 *
 * @example
 * // Basic usage with strings
 * joinStrings(['hello', 'world'], ' '); // Returns 'hello world'
 *
 * @example
 * // With numbers and other primitive types
 * joinStrings([1, 'a', true, null], ','); // Returns '1,a,true,null'
 *
 * @example
 * // With functions (they get executed)
 * const getName = () => 'Alice';
 * joinStrings(['Hello', getName, '!'], ' '); // Returns 'Hello Alice !'
 *
 * @example
 * // With objects (uses String() conversion)
 * joinStrings(['Item:', {name: 'book'}], ' '); // Returns 'Item: [object Object]'
 *
 * @note Functions in the array are executed and their return values are used.
 * Other non-string elements are converted to strings using String().
 *
 * @complexity Time: O(n), Space: O(1) - Where n is array length
 */
export function joinStrings(arr: Array<unknown>, separator: string): string {
  return arr
    .map((item) => {
      if (typeof item === 'function') {
        const result = (item as (...args: unknown[]) => unknown)();
        return String(result);
      }
      return String(item);
    })
    .join(separator);
}
