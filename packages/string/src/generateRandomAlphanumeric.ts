/**
 * Generates a random alphanumeric string of specified length using Math.random().
 *
 * @param length - The length of the string to generate (must be non-negative).
 * @returns A random string containing uppercase letters, lowercase letters, and digits.
 *
 * @throws {Error} If length is NaN.
 * @throws {Error} If length is negative.
 *
 * @example
 * // Basic usage
 * generateRandomAlphanumeric(10); // e.g., "aB3dE5fG7H"
 * generateRandomAlphanumeric(8); // e.g., "X9kL2mPq"
 *
 * @example
 * // Different lengths
 * generateRandomAlphanumeric(5); // e.g., "a3B9z"
 * generateRandomAlphanumeric(20); // e.g., "aBc1DeF2gHi3JkL4mNo5"
 *
 * @example
 * // Edge cases
 * generateRandomAlphanumeric(0); // ""
 * generateRandomAlphanumeric(1); // e.g., "A" or "7"
 *
 * @example
 * // Real-world: temporary identifiers
 * const sessionId = generateRandomAlphanumeric(16);
 * const tempFilename = `temp_${generateRandomAlphanumeric(8)}.txt`;
 *
 * @example
 * // Real-world: verification codes
 * const verificationCode = generateRandomAlphanumeric(6);
 * console.log(`Your code is: ${verificationCode}`);
 *
 * @note Uses Math.random() which is NOT cryptographically secure.
 * @note Character set includes: A-Z, a-z, 0-9 (62 characters total).
 * @note For cryptographic purposes, use generateRandomString() from crypto functions.
 * @note Each character is independently random (no uniqueness guarantee).
 *
 * @complexity Time: O(n), Space: O(n) where n is the length
 */
export function generateRandomAlphanumeric(length: number): string {
  if (isNaN(length) || length < 0) {
    throw new Error('Length must be a non-negative number');
  }

  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
