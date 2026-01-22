import { createCipheriv, randomBytes, scryptSync } from 'crypto';

/**
 * Encrypts data using AES-256-GCM encryption.
 *
 * @param data - The data to encrypt (string).
 * @param key - The encryption key (string). Will be derived using scrypt.
 * @returns Base64-encoded string containing IV, auth tag, and ciphertext (format: iv:authTag:encrypted).
 *
 * @throws {TypeError} If data is not a string.
 * @throws {TypeError} If key is not a string.
 * @throws {Error} If data is empty.
 * @throws {Error} If key is empty.
 *
 * @example
 * // Encrypt sensitive data
 * const encrypted = encryptAES256('secret message', 'my-secret-key');
 * console.log(encrypted); // e.g., 'a1b2c3d4...:e5f6g7h8...:i9j0k1l2...'
 *
 * @example
 * // Encrypt with strong key
 * const encrypted = encryptAES256('password123', 'very-long-and-secure-key');
 *
 * @example
 * // Encrypt JSON data
 * const data = JSON.stringify({ user: 'alice', token: 'xyz' });
 * const encrypted = encryptAES256(data, 'encryption-key');
 *
 * @note Uses AES-256-GCM (Galois/Counter Mode) which provides both confidentiality
 * and authenticity. The encryption key is derived from the provided key using scrypt.
 * Each encryption generates a unique IV (Initialization Vector) for security.
 * The output format is: base64(iv):base64(authTag):base64(ciphertext)
 *
 * @warning Store encryption keys securely (e.g., environment variables, key vaults).
 * Never hardcode keys in source code or commit them to version control.
 *
 * @complexity Time: O(n) where n is data length, Space: O(n)
 */
export function encryptAES256(data: string, key: string): string {
  if (typeof data !== 'string') {
    throw new TypeError(`data must be a string, got ${typeof data}`);
  }

  if (typeof key !== 'string') {
    throw new TypeError(`key must be a string, got ${typeof key}`);
  }

  if (data.length === 0) {
    throw new Error('data cannot be empty');
  }

  if (key.length === 0) {
    throw new Error('key cannot be empty');
  }

  // Generate a random IV (Initialization Vector)
  const iv = randomBytes(16); // AES block size is 16 bytes

  // Derive a 32-byte key from the password using scrypt
  const derivedKey = scryptSync(key, 'salt', 32);

  // Create cipher
  const cipher = createCipheriv('aes-256-gcm', derivedKey, iv);

  // Encrypt the data
  let encrypted = cipher.update(data, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  // Get the authentication tag
  const authTag = cipher.getAuthTag();

  // Return IV:authTag:encrypted (all base64 encoded)
  return `${iv.toString('base64')}:${authTag.toString('base64')}:${encrypted}`;
}
