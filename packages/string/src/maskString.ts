/**
 * Masks a portion of a string, replacing characters between `start` and `end`
 * indices with a mask character. Useful for obscuring sensitive data such as
 * credit card numbers, phone numbers, and email addresses.
 *
 * @param str - The string to mask.
 * @param start - The index of the first character to mask (inclusive, 0-based).
 * @param end - The index of the last character to mask (inclusive, 0-based).
 * @param mask - The character to use as the mask (default: `'*'`).
 * @returns A new string with the specified range replaced by the mask character.
 *
 * @throws {Error} If start is negative.
 * @throws {Error} If end is negative.
 * @throws {Error} If start is greater than end.
 * @throws {Error} If mask is not exactly one character.
 *
 * @example
 * // Mask the middle of a credit card number
 * maskString('4111111111111111', 4, 11);
 * // '4111********1111'
 *
 * @example
 * // Mask with a custom character
 * maskString('4111111111111111', 4, 11, '•');
 * // '4111••••••••1111'
 *
 * @example
 * // Mask part of an email
 * maskString('user@example.com', 1, 3);
 * // 'u***@example.com'
 *
 * @note Indices beyond the string length are clamped to the string boundaries.
 * @note The mask character must be exactly one character long.
 *
 * @complexity Time: O(n), Space: O(n)
 */
export function maskString(
  str: string,
  start: number,
  end: number,
  mask: string = '*',
): string {
  if (start < 0) {
    throw new Error(`start must be a non-negative number, got ${start}`);
  }
  if (end < 0) {
    throw new Error(`end must be a non-negative number, got ${end}`);
  }
  if (start > end) {
    throw new Error(
      `start must be less than or equal to end, got start=${start} end=${end}`,
    );
  }
  if (mask.length !== 1) {
    throw new Error(`mask must be exactly one character, got "${mask}"`);
  }

  // Clamp indices to string length
  const clampedStart = Math.min(start, str.length);
  const clampedEnd = Math.min(end + 1, str.length);

  return (
    str.slice(0, clampedStart) +
    mask.repeat(clampedEnd - clampedStart) +
    str.slice(clampedEnd)
  );
}
