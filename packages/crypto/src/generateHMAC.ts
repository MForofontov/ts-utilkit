import { createHmac } from 'crypto';

/**
 * Generates an HMAC (Hash-based Message Authentication Code) for the given data.
 *
 * @param data - The data to generate HMAC for (string or Buffer).
 * @param secret - The secret key used for HMAC generation.
 * @param algorithm - The hash algorithm to use ('sha256' or 'sha512'). Defaults to 'sha256'.
 * @returns Hex string representation of the HMAC.
 *
 * @throws {TypeError} If data is not a string or Buffer.
 * @throws {TypeError} If secret is not a string.
 * @throws {TypeError} If algorithm is not a string.
 * @throws {Error} If secret is empty.
 * @throws {Error} If algorithm is not 'sha256' or 'sha512'.
 *
 * @example
 * // Generate HMAC with SHA-256 (default)
 * generateHMAC('message', 'secret-key');
 * // Returns: e.g., 'a8f7b2c4d6e8f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f9a1'
 *
 * @example
 * // Generate HMAC with SHA-512
 * generateHMAC('message', 'secret-key', 'sha512');
 * // Returns: e.g., 'b9c1d3e5f7a9b1c3d5e7f9a1b3c5d7e9f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1...'
 *
 * @example
 * // Verify API request
 * const payload = JSON.stringify({ user: 'alice', action: 'update' });
 * const signature = generateHMAC(payload, 'api-secret');
 * // Send payload and signature to API
 *
 * @note HMAC provides message authentication and integrity verification.
 * Both the sender and receiver must use the same secret key and algorithm.
 * Common use cases include API request signing, webhook verification, and JWT signing.
 *
 * @warning Keep the secret key secure. Never expose it in client-side code,
 * commit it to version control, or log it.
 *
 * @complexity Time: O(n) where n is data length, Space: O(1)
 */
export function generateHMAC(
  data: string | Buffer,
  secret: string,
  algorithm: 'sha256' | 'sha512' = 'sha256',
): string {
  if (typeof data !== 'string' && !Buffer.isBuffer(data)) {
    throw new TypeError(`data must be a string or Buffer, got ${typeof data}`);
  }

  if (typeof secret !== 'string') {
    throw new TypeError(`secret must be a string, got ${typeof secret}`);
  }

  if (typeof algorithm !== 'string') {
    throw new TypeError(`algorithm must be a string, got ${typeof algorithm}`);
  }

  if (secret.length === 0) {
    throw new Error('secret cannot be empty');
  }

  const validAlgorithms = ['sha256', 'sha512'];
  if (!validAlgorithms.includes(algorithm)) {
    throw new Error(
      `algorithm must be one of ${validAlgorithms.join(', ')}, got ${algorithm}`,
    );
  }

  return createHmac(algorithm, secret).update(data).digest('hex');
}
