/**
 * Generates a random sequence of characters from a given alphabet.
 *
 * @param length - The length of the sequence to generate.
 * @param alphabet - The alphabet to use (default: alphanumeric).
 * @returns A random sequence of the specified length.
 *
 * @throws {Error} If length is NaN.
 * @throws {Error} If length is negative or not an integer.
 * @throws {Error} If alphabet is empty.
 *
 * @example
 * // Generate random alphanumeric sequence
 * randomSequence(8); // 'a3F9kL2p'
 *
 * @example
 * // Generate random numeric code
 * randomSequence(6, '0123456789'); // '482719'
 *
 * @example
 * // Generate random uppercase letters
 * randomSequence(4, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'); // 'HQWZ'
 *
 * @note Uses Math.random() for non-cryptographic randomness.
 * @note For cryptographic randomness, use generateRandomString from cryptoFunctions.
 *
 * @complexity Time: O(n), Space: O(n) where n is length
 */
export function randomSequence(
  length: number,
  alphabet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
): string {
  if (isNaN(length)) {
    throw new Error('length must be a valid number, not NaN');
  }
  if (!Number.isInteger(length)) {
    throw new Error('length must be an integer');
  }
  if (length < 0) {
    throw new Error('length must be non-negative');
  }
  if (alphabet.length === 0) {
    throw new Error('alphabet cannot be empty');
  }

  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    result += alphabet[randomIndex];
  }

  return result;
}
