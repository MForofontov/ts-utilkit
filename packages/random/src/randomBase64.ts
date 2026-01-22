/**
 * Generates a random base64 string of approximately specified length.
 *
 * @param length - The approximate length of the base64 string.
 * @returns A random base64 string.
 *
 * @throws {TypeError} If length is not a number.
 * @throws {Error} If length is NaN.
 * @throws {Error} If length is negative or not an integer.
 *
 * @example
 * // Generate base64 string
 * randomBase64(16); // 'a3F9kL2pQwX5tYzN'
 *
 * @example
 * // Generate base64 token
 * randomBase64(32); // 'bG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQ='
 *
 * @note Uses Math.random() for non-cryptographic randomness.
 * @note Actual length may vary slightly due to base64 encoding (4:3 ratio).
 * @note For cryptographic randomness, use generateRandomBytes from cryptoFunctions.
 *
 * @complexity Time: O(n), Space: O(n) where n is length
 */
export function randomBase64(length: number): string {
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

  const base64Chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * base64Chars.length);
    result += base64Chars[randomIndex];
  }

  return result;
}
