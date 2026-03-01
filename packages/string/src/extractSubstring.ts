/**
 * Extracts a substring from a string starting at the given index for the given length.
 *
 * @deprecated Use native `str.slice(startIndex, startIndex + length)` directly.
 * Will be removed in the next major version.
 *
 * @param str - The source string.
 * @param startIndex - The zero-based index to start extracting from.
 * @param length - The number of characters to extract.
 * @returns The extracted substring.
 *
 * @throws {TypeError} If str is not a string.
 * @throws {TypeError} If startIndex or length is not a number.
 * @throws {RangeError} If startIndex is negative or length is negative.
 *
 * @example
 * extractSubstring('hello world', 6, 5); // 'world'
 * extractSubstring('abcdef', 0, 3);      // 'abc'
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function extractSubstring(
  str: string,
  startIndex: number,
  length: number,
): string {
  if (typeof str !== 'string') {
    throw new TypeError(`str must be a string, got ${typeof str}`);
  }
  if (typeof startIndex !== 'number' || isNaN(startIndex)) {
    throw new TypeError(
      `startIndex must be a number, got ${typeof startIndex}`,
    );
  }
  if (typeof length !== 'number' || isNaN(length)) {
    throw new TypeError(`length must be a number, got ${typeof length}`);
  }
  if (startIndex < 0) {
    throw new RangeError(
      `startIndex must be non-negative, got ${startIndex}`,
    );
  }
  if (length < 0) {
    throw new RangeError(`length must be non-negative, got ${length}`);
  }
  return str.slice(startIndex, startIndex + length);
}
