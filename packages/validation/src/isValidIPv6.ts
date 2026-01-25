/**
 * Validates if a string represents a valid IPv6 address.
 *
 * @param ip - The IPv6 address string to validate.
 * @returns True if the IPv6 address is valid, false otherwise.
 *
 * @throws {TypeError} If ip is not a string.
 *
 * @example
 * // Valid IPv6 addresses
 * isValidIPv6("2001:0db8:85a3:0000:0000:8a2e:0370:7334"); // true
 * isValidIPv6("2001:db8:85a3::8a2e:370:7334"); // true (compressed)
 * isValidIPv6("::1"); // true (loopback)
 * isValidIPv6("::"); // true (all zeros)
 * isValidIPv6("fe80::1%lo0"); // true (with zone identifier)
 *
 * @example
 * // Invalid IPv6 addresses
 * isValidIPv6("2001:0db8:85a3::8a2e::7334"); // false (double compression)
 * isValidIPv6("2001:0db8:85a3:0000:0000:8a2e:0370:7334:1234"); // false (too many groups)
 * isValidIPv6("gggg::1"); // false (invalid hex characters)
 *
 * @note Supports standard IPv6 format, compressed notation (::), and zone identifiers.
 *
 * @complexity Time: O(n), Space: O(1)
 */
export function isValidIPv6(ip: string): boolean {
  if (typeof ip !== 'string') {
    throw new TypeError(`ip must be a string, got ${typeof ip}`);
  }

  // Handle zone identifier if present (e.g., %lo0)
  const zoneIndex = ip.indexOf('%');
  let cleanIp = ip;
  let zoneId = '';

  if (zoneIndex !== -1) {
    cleanIp = ip.substring(0, zoneIndex);
    zoneId = ip.substring(zoneIndex + 1);

    // Zone identifier should not contain :: or invalid characters
    if (zoneId.includes('::') || zoneId === '') {
      return false;
    }
  }

  // Check for invalid patterns first
  const compressionMatches = cleanIp.match(/::/g);
  if (
    cleanIp.includes(':::') ||
    (compressionMatches && compressionMatches.length > 1)
  ) {
    return false;
  }

  // Split by :: to handle compression
  const parts = cleanIp.split('::');

  if (parts.length > 2) {
    return false;
  }

  let groups: string[] = [];

  if (parts.length === 1) {
    // No compression
    groups = parts[0].split(':');
    if (groups.length !== 8) {
      return false;
    }

    if (groups.some((group) => group === '')) {
      return false;
    }
  } else {
    // With compression
    const leftGroups = parts[0] === '' ? [] : parts[0].split(':');
    const rightGroups = parts[1] === '' ? [] : parts[1].split(':');

    // Total groups should not exceed 8
    if (leftGroups.length + rightGroups.length >= 8) {
      return false;
    }

    if (
      leftGroups.some((group) => group === '') ||
      rightGroups.some((group) => group === '')
    ) {
      return false;
    }

    groups = [...leftGroups, ...rightGroups];
  }

  // Validate each group
  for (const group of groups) {
    if (group === '') {
      continue; // Skip empty groups from compression
    }

    // Check length (max 4 hex characters)
    if (group.length > 4 || group.length === 0) {
      return false;
    }

    // Check if all characters are valid hex
    if (!/^[0-9a-fA-F]+$/.test(group)) {
      return false;
    }
  }

  return true;
}
