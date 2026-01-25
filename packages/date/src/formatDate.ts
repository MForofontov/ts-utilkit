/**
 * Formats a `Date` object into a human-readable string using specified tokens.
 *
 * @param date - The `Date` object to format.
 * @param format - The format string using tokens (YYYY, MM, DD, HH, mm, ss).
 * @returns The formatted date string.
 *
 * @throws {Error} If the date is invalid (NaN timestamp).
 * @throws {Error} If the format string contains unsupported tokens.
 *
 * @example
 * // Basic date formatting
 * const date = new Date('2024-09-19T15:45:30');
 * formatDate(date, 'YYYY-MM-DD'); // '2024-09-19'
 * formatDate(date, 'MM/DD/YYYY'); // '09/19/2024'
 *
 * @example
 * // Date and time formatting
 * formatDate(date, 'YYYY-MM-DD HH:mm:ss'); // '2024-09-19 15:45:30'
 * formatDate(date, 'DD/MM/YYYY HH:mm'); // '19/09/2024 15:45'
 *
 * @example
 * // Custom separators
 * formatDate(date, 'YYYY.MM.DD'); // '2024.09.19'
 * formatDate(date, 'YYYY/MM/DD - HH:mm'); // '2024/09/19 - 15:45'
 *
 * @example
 * // Edge cases
 * formatDate(new Date('2000-01-01'), 'YYYY-MM-DD'); // '2000-01-01'
 * formatDate(new Date('2024-12-31T23:59:59'), 'HH:mm:ss'); // '23:59:59'
 *
 * @note Supported tokens: YYYY (year), MM (month), DD (day), HH (hours), mm (minutes), ss (seconds).
 * @note All numeric tokens are zero-padded (e.g., month 1 becomes "01").
 * @note Throws an error for unknown tokens to prevent formatting mistakes.
 * @note Negative years are formatted with leading minus and zero-padded to 6 digits.
 * @note Months are 1-indexed in the output (January = 01, December = 12).
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the format string
 */
export function formatDate(date: Date, format: string): string {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const supportedTokens = ['YYYY', 'MM', 'DD', 'HH', 'mm', 'ss'];
  const formatTokens = format.match(/[A-Za-z]{1,4}/g) || [];
  const invalidTokens = formatTokens.filter(
    (token) => !supportedTokens.includes(token),
  );

  if (invalidTokens.length > 0) {
    throw new Error(
      `Unsupported format tokens: ${invalidTokens.join(', ')}. Supported tokens are: ${supportedTokens.join(', ')}`,
    );
  }

  const year = date.getFullYear();
  const formattedYear =
    year < 0
      ? `-${String(Math.abs(year)).padStart(6, '0')}`
      : String(year).padStart(4, '0');

  const map: { [key: string]: string } = {
    YYYY: formattedYear,
    MM: String(date.getMonth() + 1).padStart(2, '0'),
    DD: String(date.getDate()).padStart(2, '0'),
    HH: String(date.getHours()).padStart(2, '0'),
    mm: String(date.getMinutes()).padStart(2, '0'),
    ss: String(date.getSeconds()).padStart(2, '0'),
  };

  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (matched) => map[matched]);
}
