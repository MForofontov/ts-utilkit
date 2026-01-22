/**
 * Validates if a string represents a valid IPv4 address.
 *
 * @param ip - The IP address string to validate.
 * @returns True if the IP address is valid, false otherwise.
 *
 * @throws {TypeError} If ip is not a string.
 *
 * @example
 * // Valid IPv4 addresses
 * isValidIPv4("192.168.1.1"); // true
 * isValidIPv4("127.0.0.1"); // true
 * isValidIPv4("0.0.0.0"); // true
 * isValidIPv4("255.255.255.255"); // true
 *
 * @example
 * // Invalid IPv4 addresses
 * isValidIPv4("256.1.1.1"); // false
 * isValidIPv4("192.168.1"); // false
 * isValidIPv4("192.168.1.1.1"); // false
 * isValidIPv4("192.168.-1.1"); // false
 * isValidIPv4("192.168.01.1"); // false (leading zeros)
 *
 * @note Does not allow leading zeros in octets (RFC compliant).
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function isValidIPv4(ip: string): boolean {
  if (typeof ip !== 'string') {
    throw new TypeError(`ip must be a string, got ${typeof ip}`);
  }

  const octets = ip.split('.');

  // Must have exactly 4 octets
  if (octets.length !== 4) {
    return false;
  }

  for (const octet of octets) {
    // Check if octet is a valid number
    if (!/^\d+$/.test(octet)) {
      return false;
    }

    // No leading zeros (except for "0" itself)
    if (octet.length > 1 && octet[0] === '0') {
      return false;
    }

    const num = parseInt(octet, 10);

    // Must be between 0 and 255
    if (num < 0 || num > 255) {
      return false;
    }
  }

  return true;
}
