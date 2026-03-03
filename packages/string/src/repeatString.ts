/**
 * Returns a string repeated a given number of times.
 *
 * @deprecated Use native `str.repeat(count)` directly.
 * Will be removed in the next major version.
 *
 * @param str - The string to repeat.
 * @param count - Number of times to repeat (must be non-negative integer).
 * @returns The repeated string.
 *
 * @throws {RangeError} If count is negative or not an integer.
 *
 * @example
 * repeatString('ab', 3); // 'ababab'
 * repeatString('x', 0);  // ''
 *
 * @complexity Time: O(n*count), Space: O(n*count)
 */
export function repeatString(str: string, count: number): string {
  if (count < 0 || !Number.isInteger(count)) {
    throw new RangeError(
      `count must be a non-negative integer, got ${count}`,
    );
  }
  return str.repeat(count);
}
