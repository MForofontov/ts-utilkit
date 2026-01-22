/**
 * Formats a number with its ordinal suffix (1st, 2nd, 3rd, 4th, etc.).
 *
 * @param value - The number to format.
 * @returns The number with its appropriate ordinal suffix.
 *
 * @throws {TypeError} If value is not a number or is NaN.
 *
 * @example
 * // Basic usage
 * formatOrdinal(1); // Returns "1st"
 * formatOrdinal(2); // Returns "2nd"
 * formatOrdinal(3); // Returns "3rd"
 * formatOrdinal(4); // Returns "4th"
 *
 * @example
 * // Teens
 * formatOrdinal(11); // Returns "11th"
 * formatOrdinal(12); // Returns "12th"
 * formatOrdinal(13); // Returns "13th"
 *
 * @example
 * // Larger numbers
 * formatOrdinal(21); // Returns "21st"
 * formatOrdinal(102); // Returns "102nd"
 * formatOrdinal(1003); // Returns "1003rd"
 *
 * @example
 * // Negative numbers
 * formatOrdinal(-1); // Returns "-1st"
 *
 * @note The function handles special cases for 11th, 12th, 13th.
 * Works with negative numbers.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function formatOrdinal(value: number): string {
  // Input validation
  if (typeof value !== 'number' || isNaN(value)) {
    throw new TypeError(`value must be a number, got ${typeof value}`);
  }

  const absValue = Math.abs(value);
  const lastDigit = absValue % 10;
  const lastTwoDigits = absValue % 100;

  // Special cases for 11th, 12th, 13th
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return `${value}th`;
  }

  // Determine suffix based on last digit
  switch (lastDigit) {
    case 1:
      return `${value}st`;
    case 2:
      return `${value}nd`;
    case 3:
      return `${value}rd`;
    default:
      return `${value}th`;
  }
}
