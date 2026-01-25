/**
 * Validates if a string is a valid time in HH:MM or HH:MM:SS format.
 *
 * @param timeString - The time string to validate.
 * @param allowSeconds - Whether to allow seconds component (default: true).
 * @param format24Hour - Whether to use 24-hour format (default: true).
 * @returns True if the time string is valid, false otherwise.
 *
 * @throws {TypeError} If timeString is not a string, allowSeconds is not a boolean, or format24Hour is not a boolean.
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
  if (typeof timeString !== 'string') {
    throw new TypeError(
      `timeString must be a string, got ${typeof timeString}`,
    );
  }

  if (typeof allowSeconds !== 'boolean') {
    throw new TypeError(
      `allowSeconds must be a boolean, got ${typeof allowSeconds}`,
    );
  }

  if (typeof format24Hour !== 'boolean') {
    throw new TypeError(
      `format24Hour must be a boolean, got ${typeof format24Hour}`,
    );
  }

  const cleanTimeString = timeString.trim();
  let hour: number;
  let minute: number;
  let second: number = 0;

  if (format24Hour) {
    // 24-hour format: HH:MM or HH:MM:SS
    const patterns = {
      withSeconds: /^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/,
      withoutSeconds: /^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])$/,
    };

    let match;
    if (allowSeconds) {
      match =
        cleanTimeString.match(patterns.withSeconds) ||
        cleanTimeString.match(patterns.withoutSeconds);
    } else {
      match = cleanTimeString.match(patterns.withoutSeconds);
      // If seconds are present but not allowed, return false
      if (
        cleanTimeString.includes(':') &&
        cleanTimeString.split(':').length > 2
      ) {
        return false;
      }
    }

    if (!match) {
      return false;
    }

    hour = parseInt(match[1], 10);
    minute = parseInt(match[2], 10);
    if (match[3]) {
      second = parseInt(match[3], 10);
    }
  } else {
    // 12-hour format: H:MM AM/PM or H:MM:SS AM/PM
    const patterns = {
      withSeconds: /^([1-9]|1[0-2]):([0-5]?[0-9]):([0-5]?[0-9]) (AM|PM)$/i,
      withoutSeconds: /^([1-9]|1[0-2]):([0-5]?[0-9]) (AM|PM)$/i,
    };

    let match;
    if (allowSeconds) {
      match =
        cleanTimeString.match(patterns.withSeconds) ||
        cleanTimeString.match(patterns.withoutSeconds);
    } else {
      match = cleanTimeString.match(patterns.withoutSeconds);
      // If seconds are present but not allowed, return false
      if (
        cleanTimeString.includes(':') &&
        cleanTimeString.split(' ')[0].split(':').length > 2
      ) {
        return false;
      }
    }

    if (!match) {
      return false;
    }

    hour = parseInt(match[1], 10);
    minute = parseInt(match[2], 10);
    if (match[3] && match[3] !== 'AM' && match[3] !== 'PM') {
      second = parseInt(match[3], 10);
    }

    // Validate 12-hour format specific rules
    if (hour < 1 || hour > 12) {
      return false;
    }
  }

  // Validate hour, minute, second ranges
  if (format24Hour) {
    if (hour < 0 || hour > 23) {
      return false;
    }
  }

  if (minute < 0 || minute > 59) {
    return false;
  }

  if (second < 0 || second > 59) {
    return false;
  }

  return true;
}
