/**
 * Generates a random hexadecimal string of specified length.
 *
 * @param length - The length of the hex string to generate (number of hex digits).
 * @returns A random hexadecimal string (lowercase).
 *
 * @throws {TypeError} If length is not a number.
 * @throws {Error} If length is NaN.
 * @throws {Error} If length is negative or not an integer.
 *
 * @example
 * // Generate 8-character hex string
 * randomHex(8); // 'a3f9c2e1'
 *
 * @example
 * // Generate short hex ID
 * randomHex(6); // '4d82f1'
 *
 * @example
 * // Generate 32-character hex (MD5-like length)
 * randomHex(32); // 'b47c9d1e3a5f2c8b6d4e9f1a7c3b5e2d'
 *
 * @note Uses Math.random() for non-cryptographic randomness.
 * @note For cryptographic randomness, use generateRandomBytes from cryptoFunctions.
 *
 * @complexity Time: O(n), Space: O(n) where n is length
 */
export function randomHex(length: number): string {
  if (typeof length !== 'number') {
    throw new TypeError(`length must be a number, got ${typeof length}`);
  }
  if (isNaN(length)) {
    throw new Error('length must be a valid number, not NaN');
  }
  if (!Number.isInteger(length)) {
    throw new Error('length must be an integer');
  }
  if (length < 0) {
    throw new Error('length must be non-negative');
  }

  const hexChars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * hexChars.length);
    result += hexChars[randomIndex];
  }

  return result;
}
