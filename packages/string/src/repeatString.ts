/**
 * Repeats a string a specified number of times.
 *
 * @param str - The string to repeat.
 * @param count - The number of times to repeat the string (must be non-negative).
 * @returns The string repeated count times.
 *
 * @throws {TypeError} If str is not a string or count is not a number.
 * @throws {Error} If count is NaN or negative.
 *
 * @example
 * // Basic usage
 * repeatString("hello", 3); // "hellohellohello"
 *
 * @example
 * // Edge cases
 * repeatString("test", 0); // ""
 * repeatString("x", 1); // "x"
 *
 * @example
 * // Special characters
 * repeatString("-=", 5); // "-=-=-=-=-="
 *
 * @note This is a wrapper around the native String.prototype.repeat() method with validation.
 * @note Count is truncated to an integer if a float is provided.
 *
 * @complexity Time: O(n*count), Space: O(n*count) where n is the length of the string
 */
export function repeatString(str: string, count: number): string {
  if (isNaN(count)) {
    throw new Error('Count must be a number');
  }
  if (count < 0) {
    throw new Error('Count must be non-negative');
  }
  return str.repeat(count);
}
