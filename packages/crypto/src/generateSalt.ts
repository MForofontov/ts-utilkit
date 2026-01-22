import { randomBytes } from 'crypto';

/**
 * Generates a cryptographically secure random salt for password hashing.
 *
 * @param length - The length of the salt in bytes. Defaults to 32 bytes.
 * @returns Hex string representation of the salt.
 *
 * @throws {TypeError} If length is not a number.
 * @throws {Error} If length is not a positive integer.
 * @throws {Error} If length is NaN.
 *
 * @example
 * // Generate default 32-byte salt
 * const salt = generateSalt();
 * console.log(salt); // e.g., 'a3f5b2c8d9e1f4a7b6c5d8e9f1a2b3c4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0'
 *
 * @example
 * // Generate 16-byte salt
 * const shortSalt = generateSalt(16);
 * console.log(shortSalt); // e.g., 'a3f5b2c8d9e1f4a7b6c5d8e9f1a2b3c4'
 *
 * @example
 * // Use with password hashing
 * const salt = generateSalt();
 * const hashedPassword = await hashPassword('user-password', salt);
 * // Store both salt and hashedPassword in database
 *
 * @note A salt is a random value added to passwords before hashing to prevent
 * rainbow table attacks and ensure identical passwords have different hashes.
 * Each password should have a unique salt. Store the salt alongside the hashed
 * password in your database (salts don't need to be secret).
 *
 * @warning Never reuse salts across different passwords. Always generate a new
 * salt for each password hash.
 *
 * @complexity Time: O(n) where n is the length, Space: O(n)
 */
export function generateSalt(length: number = 32): string {
  if (typeof length !== 'number') {
    throw new TypeError(`length must be a number, got ${typeof length}`);
  }

  if (isNaN(length)) {
    throw new Error('length must be a valid number, not NaN');
  }

  if (length <= 0 || !Number.isInteger(length)) {
    throw new Error(`length must be a positive integer, got ${length}`);
  }

  return randomBytes(length).toString('hex');
}
