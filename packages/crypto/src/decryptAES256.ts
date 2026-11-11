import { createDecipheriv, scryptSync } from 'crypto';

/**
 * Decrypts data that was encrypted using AES-256-GCM encryption.
 *
 * @param encrypted - The encrypted data in format: salt:iv:authTag:ciphertext (base64-encoded).
 * @param key - The decryption key (must be the same key used for encryption).
 * @returns The decrypted plaintext string.
 *
 * @throws {Error} If encrypted is empty.
 * @throws {Error} If key is empty.
 * @throws {Error} If encrypted format is invalid.
 * @throws {Error} If decryption fails (wrong key or corrupted data).
 *
 * @example
 * // Decrypt data
 * const encrypted = encryptAES256('secret message', 'my-secret-key');
 * const decrypted = decryptAES256(encrypted, 'my-secret-key');
 * console.log(decrypted); // 'secret message'
 *
 * @example
 * // Decrypt and parse JSON
 * const encrypted = encryptAES256(JSON.stringify({ user: 'alice' }), 'key');
 * const decrypted = decryptAES256(encrypted, 'key');
 * const data = JSON.parse(decrypted);
 *
 * @example
 * // Handle decryption errors
 * try {
 *   const decrypted = decryptAES256(encrypted, 'wrong-key');
 * } catch (error) {
 *   console.error('Decryption failed:', error.message);
 * }
 *
 * @note Uses AES-256-GCM (Galois/Counter Mode). The authentication tag is verified
 * during decryption, ensuring data integrity and authenticity. If the data has been
 * tampered with or the wrong key is used, decryption will fail.
 *
 * @warning Use the exact same key that was used for encryption. Key derivation
 * parameters must match those used in encryptAES256. Legacy 3-part payloads
 * (`iv:authTag:ciphertext`) from older versions are rejected.
 *
 * @complexity Time: O(n) where n is encrypted data length, Space: O(n)
 */
export function decryptAES256(encrypted: string, key: string): string {
  if (encrypted.length === 0) {
    throw new Error('encrypted cannot be empty');
  }

  if (key.length === 0) {
    throw new Error('key cannot be empty');
  }

  // Parse the encrypted data format: salt:iv:authTag:ciphertext
  const parts = encrypted.split(':');
  if (parts.length === 3) {
    throw new Error(
      'invalid encrypted format: legacy 3-part format (iv:authTag:ciphertext) is no longer supported; re-encrypt with the current encryptAES256',
    );
  }
  if (parts.length !== 4) {
    throw new Error(
      'invalid encrypted format, expected format: salt:iv:authTag:ciphertext',
    );
  }

  try {
    // Extract components
    const salt = Buffer.from(parts[0], 'base64');
    const iv = Buffer.from(parts[1], 'base64');
    const authTag = Buffer.from(parts[2], 'base64');
    const ciphertext = parts[3];

    // Validate salt length
    if (salt.length !== 16) {
      throw new Error('invalid salt length');
    }

    // Validate IV length
    if (iv.length !== 16) {
      throw new Error('invalid IV length');
    }

    // Validate auth tag length
    if (authTag.length !== 16) {
      throw new Error('invalid authentication tag length');
    }

    // Derive the same key used for encryption
    const derivedKey = scryptSync(key, salt, 32);

    // Create decipher
    const decipher = createDecipheriv('aes-256-gcm', derivedKey, iv);

    // Set the authentication tag
    decipher.setAuthTag(authTag);

    // Decrypt the data
    let decrypted = decipher.update(ciphertext, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`decryption failed: ${error.message}`);
    }
    throw new Error('decryption failed: unknown error');
  }
}
