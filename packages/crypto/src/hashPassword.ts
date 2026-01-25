import { pbkdf2 } from 'crypto';
import { promisify } from 'util';

const pbkdf2Async = promisify(pbkdf2);

/**
 * Hashes a password using PBKDF2 (Password-Based Key Derivation Function 2).
 *
 * @param password - The password to hash.
 * @param salt - The cryptographic salt (hex string). Use generateSalt() to create.
 * @param iterations - Number of iterations. Defaults to 100,000. Higher is more secure but slower.
 * @returns Promise resolving to hex string representation of the password hash.
 *
 * @throws {TypeError} If password is not a string.
 * @throws {TypeError} If salt is not a string.
 * @throws {TypeError} If iterations is not a number.
 * @throws {Error} If password is empty.
 * @throws {Error} If salt is empty.
 * @throws {Error} If salt contains non-hexadecimal characters.
 * @throws {Error} If iterations is not a positive integer.
 * @throws {Error} If iterations is NaN.
 *
 * @example
 * // Hash a password
 * const salt = generateSalt();
 * const hash = await hashPassword('user-password-123', salt);
 * console.log(hash); // e.g., 'a3f5b2c8d9e1f4a7...' (128 hex chars)
 * // Store both salt and hash in database
 *
 * @example
 * // Hash with custom iterations
 * const hash = await hashPassword('password', salt, 200000);
 *
 * @example
 * // Complete password storage workflow
 * async function storePassword(password: string) {
 *   const salt = generateSalt();
 *   const hash = await hashPassword(password, salt);
 *   // Save to database: { salt, hash }
 *   return { salt, hash };
 * }
 *
 * @example
 * // Password verification
 * async function verifyPassword(password: string, storedSalt: string, storedHash: string) {
 *   const hash = await hashPassword(password, storedSalt);
 *   return hash === storedHash;
 * }
 *
 * @note PBKDF2 is designed to be computationally expensive to resist brute-force
 * attacks. The iterations parameter controls the computational cost - higher values
 * are more secure but slower. 100,000 iterations is a reasonable default (2024).
 * Consider increasing this value over time as computing power increases.
 *
 * @warning Never store passwords in plaintext. Always hash them with a unique salt.
 * Store both the salt and hash in your database. The salt doesn't need to be secret,
 * but the password and hash should never be logged or exposed.
 *
 * @complexity Time: O(iterations * n) where n is password length, Space: O(1)
 */
export async function hashPassword(
  password: string,
  salt: string,
  iterations: number = 100000,
): Promise<string> {
  if (typeof password !== 'string') {
    throw new TypeError(`password must be a string, got ${typeof password}`);
  }

  if (typeof salt !== 'string') {
    throw new TypeError(`salt must be a string, got ${typeof salt}`);
  }

  if (typeof iterations !== 'number') {
    throw new TypeError(
      `iterations must be a number, got ${typeof iterations}`,
    );
  }

  if (password.length === 0) {
    throw new Error('password cannot be empty');
  }

  if (salt.length === 0) {
    throw new Error('salt cannot be empty');
  }

  if (!/^[a-f0-9]+$/i.test(salt)) {
    throw new Error('salt must contain only hexadecimal characters');
  }

  if (isNaN(iterations)) {
    throw new Error('iterations must be a valid number, not NaN');
  }

  if (iterations <= 0 || !Number.isInteger(iterations)) {
    throw new Error(`iterations must be a positive integer, got ${iterations}`);
  }

  // Convert hex salt to buffer
  const saltBuffer = Buffer.from(salt, 'hex');

  // Hash the password using PBKDF2-SHA512
  // 64 bytes = 512 bits output length
  const hash = await pbkdf2Async(
    password,
    saltBuffer,
    iterations,
    64,
    'sha512',
  );

  return hash.toString('hex');
}
