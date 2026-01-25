/**
 * Validates if a string is a valid ISO 8601 date format.
 *
 * @param dateString - The date string to validate.
 * @param allowTime - Whether to allow time component (default: true).
 * @returns True if the date string is valid ISO 8601 format, false otherwise.
 *
 * @throws {TypeError} If dateString is not a string or allowTime is not a boolean.
 *
 * @example
 * // Valid ISO 8601 dates
 * isValidISODate("2023-12-25"); // true
 * isValidISODate("2023-12-25T10:30:00"); // true
 * isValidISODate("2023-12-25T10:30:00Z"); // true
 * isValidISODate("2023-12-25T10:30:00+05:30"); // true
 * isValidISODate("2023-12-25T10:30:00.123Z"); // true
 *
 * @example
 * // Invalid ISO 8601 dates
 * isValidISODate("2023/12/25"); // false
 * isValidISODate("25-12-2023"); // false
 * isValidISODate("2023-13-25"); // false (invalid month)
 * isValidISODate("2023-12-32"); // false (invalid day)
 * isValidISODate("2023-12-25T25:30:00"); // false (invalid hour)
 *
 * @example
 * // Time component control
 * isValidISODate("2023-12-25T10:30:00", false); // false (time not allowed)
 * isValidISODate("2023-12-25", false); // true (date only)
 *
 * @note This function validates format and basic date/time ranges, not calendar validity.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function isValidISODate(
  dateString: string,
  allowTime: boolean = true,
): boolean {
  if (typeof dateString !== 'string') {
    throw new TypeError(
      `dateString must be a string, got ${typeof dateString}`,
    );
  }

  if (typeof allowTime !== 'boolean') {
    throw new TypeError(`allowTime must be a boolean, got ${typeof allowTime}`);
  }

  // Basic ISO 8601 patterns
  const dateOnlyPattern = /^\d{4}-\d{2}-\d{2}$/;
  const dateTimePattern =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?(Z|[+-]\d{2}:\d{2})?$/;

  let isValidFormat = false;

  if (allowTime) {
    isValidFormat =
      dateOnlyPattern.test(dateString) || dateTimePattern.test(dateString);
  } else {
    isValidFormat = dateOnlyPattern.test(dateString);
  }

  if (!isValidFormat) {
    return false;
  }

  // Parse and validate the actual date
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return false;
  }

  // Extract components for additional validation
  const parts = dateString.split('T')[0].split('-');
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  // Validate ranges
  if (month < 1 || month > 12) {
    return false;
  }

  if (day < 1 || day > 31) {
    return false;
  }

  // Check if the date matches what we parsed
  const reconstructed = new Date(year, month - 1, day);
  if (
    reconstructed.getFullYear() !== year ||
    reconstructed.getMonth() !== month - 1 ||
    reconstructed.getDate() !== day
  ) {
    return false;
  }

  // If time is included, validate time components
  if (dateString.includes('T')) {
    const timePart = dateString.split('T')[1];
    const timeWithoutZone = timePart.replace(/Z|[+-]\d{2}:\d{2}$/, '');
    const timeComponents = timeWithoutZone.split(':');

    const hour = parseInt(timeComponents[0], 10);
    const minute = parseInt(timeComponents[1], 10);
    const secondPart = timeComponents[2];

    if (hour < 0 || hour > 23) {
      return false;
    }

    if (minute < 0 || minute > 59) {
      return false;
    }

    if (secondPart) {
      const second = parseInt(secondPart.split('.')[0], 10);
      if (second < 0 || second > 59) {
        return false;
      }
    }
  }

  return true;
}
