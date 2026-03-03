/**
 * Validates if a string represents a valid MAC address.
 *
 * @param mac - The MAC address string to validate.
 * @param separator - The separator character (default: ':').
 * @returns True if the MAC address is valid, false otherwise.
 *
 * @throws {Error} If separator is not a single character.
 *
 * @example
 * // Valid MAC addresses
 * isValidMACAddress("00:1B:44:11:3A:B7"); // true
 * isValidMACAddress("00-1B-44-11-3A-B7", "-"); // true
 * isValidMACAddress("001B44113AB7", ""); // true (no separator)
 *
 * @example
 * // Invalid MAC addresses
 * isValidMACAddress("00:1B:44:11:3A"); // false (too short)
 * isValidMACAddress("00:1B:44:11:3A:B7:C8"); // false (too long)
 * isValidMACAddress("GG:1B:44:11:3A:B7"); // false (invalid hex)
 *
 * @note Supports colon (:), hyphen (-), or no separator formats.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function isValidMACAddress(
  mac: string,
  separator: string = ':',
): boolean {

  if (separator.length > 1) {
    throw new Error(`separator must be a single character, got "${separator}"`);
  }

  if (separator === '') {
    // No separator - should be exactly 12 hex characters
    if (mac.length !== 12) {
      return false;
    }
    return /^[0-9a-fA-F]{12}$/.test(mac);
  }

  // With separator - should have 6 groups of 2 hex characters
  const groups = mac.split(separator);

  if (groups.length !== 6) {
    return false;
  }

  for (const group of groups) {
    if (group.length !== 2) {
      return false;
    }

    if (!/^[0-9a-fA-F]{2}$/.test(group)) {
      return false;
    }
  }

  return true;
}
