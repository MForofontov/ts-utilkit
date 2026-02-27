/**
 * Wraps a string to a specified maximum line width, inserting newline characters
 * at word boundaries. Long single words that exceed the maximum width are placed
 * on their own line without breaking.
 *
 * @param str - The string to wrap.
 * @param maxWidth - The maximum number of characters per line (must be >= 1).
 * @returns A new string with newline characters inserted at word boundaries.
 *
 * @throws {TypeError} If str is not a string.
 * @throws {TypeError} If maxWidth is not a number.
 * @throws {Error} If maxWidth is NaN.
 * @throws {Error} If maxWidth is less than 1.
 *
 * @example
 * // Wrap a sentence to 10 characters
 * wrapText('The quick brown fox', 10);
 * // 'The quick\nbrown fox'
 *
 * @example
 * // Wrap with exact word boundary
 * wrapText('Hello World', 5);
 * // 'Hello\nWorld'
 *
 * @example
 * // Empty string returns empty string
 * wrapText('', 10);
 * // ''
 *
 * @note Single words longer than maxWidth are placed on their own line unchanged.
 * @note Multiple consecutive spaces are treated as single word boundaries.
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function wrapText(str: string, maxWidth: number): string {
  if (typeof str !== 'string') {
    throw new TypeError(`str must be a string, got ${typeof str}`);
  }
  if (typeof maxWidth !== 'number') {
    throw new TypeError(`maxWidth must be a number, got ${typeof maxWidth}`);
  }
  if (isNaN(maxWidth)) {
    throw new Error('maxWidth must be a valid number, not NaN');
  }
  if (maxWidth < 1) {
    throw new Error(`maxWidth must be at least 1, got ${maxWidth}`);
  }

  if (str.length === 0) {
    return '';
  }

  const words = str.split(/\s+/).filter((word) => word.length > 0);

  if (words.length === 0) {
    return '';
  }

  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if (currentLine.length === 0) {
      // Start a new line
      currentLine = word;
    } else if (currentLine.length + 1 + word.length <= maxWidth) {
      // Word fits on the current line
      currentLine += ' ' + word;
    } else {
      // Start a new line with this word
      lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  return lines.join('\n');
}
