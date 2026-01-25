import { createHmac, timingSafeEqual } from 'crypto';

/**
 * Verifies an HMAC (Hash-based Message Authentication Code) using timing-safe comparison.
 *
 * @param data - The original data (string or Buffer).
 * @param secret - The secret key used for HMAC generation.
 * @param hmac - The HMAC to verify against (hex string).
 * @param algorithm - The hash algorithm used ('sha256' or 'sha512'). Defaults to 'sha256'.
 * @returns True if the HMAC is valid, false otherwise.
 *
 * @throws {TypeError} If data is not a string or Buffer.
 * @throws {TypeError} If secret is not a string.
 * @throws {TypeError} If hmac is not a string.
 * @throws {TypeError} If algorithm is not a string.
 * @throws {Error} If secret is empty.
 * @throws {Error} If hmac is empty.
 * @throws {Error} If algorithm is not 'sha256' or 'sha512'.
 * @throws {Error} If hmac length doesn't match expected length for algorithm.
 * @throws {Error} If hmac contains non-hexadecimal characters.
 *
 * @example
 * // Verify HMAC
 * const data = 'message';
 * const secret = 'secret-key';
 * const hmac = generateHMAC(data, secret);
 * verifyHMAC(data, secret, hmac); // Returns: true
 *
 * @example
 * // Verify with wrong HMAC
 * verifyHMAC('message', 'secret-key', 'wrong-hmac'); // Returns: false
 *
 * @example
 * // Verify API webhook signature
 * const payload = req.body;
 * const signature = req.headers['x-signature'];
 * const isValid = verifyHMAC(JSON.stringify(payload), process.env.WEBHOOK_SECRET, signature);
 * if (!isValid) {
 *   throw new Error('Invalid signature');
 * }
 *
 * @note Uses timing-safe comparison to prevent timing attacks. This is critical
 * for security as timing differences could reveal information about the HMAC.
 * Common use cases include webhook signature verification, API authentication,
 * and message integrity checking.
 *
 * @warning Always use timing-safe comparison for HMAC verification. Regular
 * string comparison (===) is vulnerable to timing attacks.
 *
 * @complexity Time: O(n) where n is data length, Space: O(1)
 */
export function verifyHMAC(
  data: string | Buffer,
  secret: string,
  hmac: string,
  algorithm: 'sha256' | 'sha512' = 'sha256',
): boolean {
  if (typeof data !== 'string' && !Buffer.isBuffer(data)) {
    throw new TypeError(`data must be a string or Buffer, got ${typeof data}`);
  }

  if (typeof secret !== 'string') {
    throw new TypeError(`secret must be a string, got ${typeof secret}`);
  }

  if (typeof hmac !== 'string') {
    throw new TypeError(`hmac must be a string, got ${typeof hmac}`);
  }

  if (typeof algorithm !== 'string') {
    throw new TypeError(`algorithm must be a string, got ${typeof algorithm}`);
  }

  if (secret.length === 0) {
    throw new Error('secret cannot be empty');
  }

  if (hmac.length === 0) {
    throw new Error('hmac cannot be empty');
  }

  const validAlgorithms = ['sha256', 'sha512'];
  if (!validAlgorithms.includes(algorithm)) {
    throw new Error(
      `algorithm must be one of ${validAlgorithms.join(', ')}, got ${algorithm}`,
    );
  }

  // Validate HMAC length based on algorithm
  const expectedLengths: Record<string, number> = {
    sha256: 64, // 32 bytes * 2 (hex encoding)
    sha512: 128, // 64 bytes * 2 (hex encoding)
  };

  if (hmac.length !== expectedLengths[algorithm]) {
    throw new Error(
      `hmac length for ${algorithm} must be ${expectedLengths[algorithm]} characters, got ${hmac.length}`,
    );
  }

  // Validate HMAC contains only hex characters
  if (!/^[a-f0-9]+$/i.test(hmac)) {
    throw new Error('hmac must contain only hexadecimal characters');
  }

  try {
    // Generate HMAC for the data
    const computedHmac = createHmac(algorithm, secret).update(data).digest();

    // Convert provided HMAC to buffer
    const hmacBuffer = Buffer.from(hmac, 'hex');

    // Use timing-safe comparison
    return timingSafeEqual(hmacBuffer, computedHmac);
  } catch {
    // If buffers are different lengths or any other error, return false
    return false;
  }
}
