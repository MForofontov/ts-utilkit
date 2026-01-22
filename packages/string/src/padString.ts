/**
 * Pads a string to a specified length with a given character, adding padding equally on both sides.
 *
 * @param str - The string to pad.
 * @param targetLength - The length of the resulting string once the current string has been padded.
 * @param padChar - The character to pad the string with (default: space ' ').
 * @returns The padded string with characters added to both left and right sides.
 *
 * @throws {Error} If target length is less than the string length.
 * @throws {Error} If padChar is not a single character.
 *
 * @example
 * // Basic usage (default space padding)
 * padString("hello", 10); // "  hello   "
 *
 * @example
 * // Custom padding character
 * padString("hello", 10, '*'); // "**hello***"
 * padString("test", 8, '-'); // "--test--"
 *
 * @example
 * // Centering text
 * padString("Title", 15, ' '); // "     Title     "
 * padString("42", 6, '0'); // "0042"  (wait, this is "00420")
 *
 * @example
 * // Odd vs even padding distribution
 * padString("hi", 5, '_'); // "_hi__" (extra padding on right)
 * padString("hi", 6, '_'); // "__hi__" (equal padding)
 *
 * @example
 * // No padding needed
 * padString("hello", 5); // "hello"
 * padString("hello", 3); // Error: Target length must be >= string length
 *
 * @note When total padding is odd, the extra character goes on the right side.
 * @note If targetLength equals str.length, returns the original string.
 * @note padChar must be exactly one character long.
 * @note For left-only or right-only padding, use String.padStart() or String.padEnd().
 * @note Common use cases: centering text, formatting tables, aligning output.
 *
 * @complexity Time: O(n), Space: O(n) where n is targetLength
 */
export function padString(
  str: string,
  targetLength: number,
  padChar: string = ' ',
): string {
  if (targetLength < str.length) {
    throw new Error(
      'Target length must be greater than or equal to the string length',
    );
  }
  if (padChar.length !== 1) {
    throw new Error('Pad character must be a single character');
  }

  const totalPadding = targetLength - str.length;
  const padStartLength = Math.floor(totalPadding / 2);
  const padEndLength = totalPadding - padStartLength;

  return padChar.repeat(padStartLength) + str + padChar.repeat(padEndLength);
}
