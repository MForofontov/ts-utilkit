const timePatterns = {
  twentyFourHour: {
    withSeconds: /^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/,
    withoutSeconds: /^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])$/,
  },
  twelveHour: {
    withSeconds: /^([1-9]|1[0-2]):([0-5]?[0-9]):([0-5]?[0-9]) (AM|PM)$/i,
    withoutSeconds: /^([1-9]|1[0-2]):([0-5]?[0-9]) (AM|PM)$/i,
  },
};

/**
 * Validates if a string is a valid time in HH:MM or HH:MM:SS format.
 *
 * @param timeString - The time string to validate.
 * @param allowSeconds - Whether to allow seconds component (default: true).
 * @param format24Hour - Whether to use 24-hour format (default: true).
 * @returns True if the time string is valid, false otherwise.
 *
 * @example
 * // Valid 24-hour format times
 * isValidTime("14:30"); // true
 * isValidTime("14:30:45"); // true
 * isValidTime("00:00"); // true
 * isValidTime("23:59:59"); // true
 *
 * @example
 * // Valid 12-hour format times
 * isValidTime("2:30 PM", true, false); // true
 * isValidTime("12:30:45 AM", true, false); // true
 * isValidTime("11:59 PM", true, false); // true
 *
 * @example
 * // Invalid times
 * isValidTime("25:00"); // false (invalid hour)
 * isValidTime("14:60"); // false (invalid minute)
 * isValidTime("14:30:60"); // false (invalid second)
 * isValidTime("14:30:45", false); // false (seconds not allowed)
 * isValidTime("2:30", true, false); // false (missing AM/PM)
 *
 * @note 12-hour format requires AM/PM suffix with space before it.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function isValidTime(
  timeString: string,
  allowSeconds: boolean = true,
  format24Hour: boolean = true,
): boolean {
  const cleanTimeString = timeString.trim();
  const patterns = format24Hour
    ? timePatterns.twentyFourHour
    : timePatterns.twelveHour;
  return (
    (allowSeconds && patterns.withSeconds.test(cleanTimeString)) ||
    patterns.withoutSeconds.test(cleanTimeString)
  );
}
