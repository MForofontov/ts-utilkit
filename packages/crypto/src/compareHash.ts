import { timingSafeEqual, createHash } from 'crypto';

/**
 * Compares data against a hash using the specified algorithm with timing-safe comparison.
 *
 * @param data - The data to hash and compare (string or Buffer).
 * @param hash - The hex-encoded hash to compare against.
 * @param algorithm - The hashing algorithm to use ('sha256', 'sha512', or 'md5').
 * @returns True if the hash of data matches the provided hash, false otherwise.
 *
 * @throws {TypeError} If data is not a string or Buffer.
 * @throws {TypeError} If hash is not a string.
 * @throws {TypeError} If algorithm is not a valid string.
 * @throws {Error} If algorithm is not one of the supported values.
 * @throws {Error} If hash length doesn't match expected length for algorithm.
 *
 * @example
 * // Compare SHA-256 hash
 * const hash = 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9';
 * compareHash('hello world', hash, 'sha256'); // Returns: true
 *
 * @example
 * // Compare with wrong hash
 * const wrongHash = 'abc123';
 * compareHash('hello world', wrongHash, 'sha256'); // Returns: false
 *
 * @example
 * // Compare SHA-512 hash
 * const sha512Hash = '309ecc489c12d6eb4cc40f50c902f2b4d0ed77ee511a7c7a9bcd3ca86d4cd86f989dd35bc5ff499670da34255b45b0cfd830e81f605dcf7dc5542e93ae9cd76f';
 * compareHash('hello world', sha512Hash, 'sha512'); // Returns: true
 *
 * @note Uses timing-safe comparison to prevent timing attacks.
 * This is critical for security-sensitive applications where timing differences
 * could reveal information about the hash.
 *
 * @warning MD5 algorithm is provided for legacy support but should NOT be used
 * for security-sensitive applications. Use SHA-256 or SHA-512 instead.
 *
 * @complexity Time: O(n) where n is the length of input data, Space: O(1)
 */
export function compareHash(
  data: string | Buffer,
  hash: string,
  algorithm: 'sha256' | 'sha512' | 'md5',
): boolean {
  // Validate data type
  if (typeof data !== 'string' && !Buffer.isBuffer(data)) {
    throw new TypeError(`data must be a string or Buffer, got ${typeof data}`);
  }

  // Validate hash type
  if (typeof hash !== 'string') {
    throw new TypeError(`hash must be a string, got ${typeof hash}`);
  }

  // Validate algorithm type
  if (typeof algorithm !== 'string') {
    throw new TypeError(`algorithm must be a string, got ${typeof algorithm}`);
  }

  // Validate algorithm value
  const validAlgorithms = ['sha256', 'sha512', 'md5'];
  if (!validAlgorithms.includes(algorithm)) {
    throw new Error(
      `algorithm must be one of ${validAlgorithms.join(', ')}, got ${algorithm}`,
    );
  }

  // Validate hash length based on algorithm
  const expectedLengths: Record<string, number> = {
    sha256: 64, // 32 bytes * 2 (hex encoding)
    sha512: 128, // 64 bytes * 2 (hex encoding)
    md5: 32, // 16 bytes * 2 (hex encoding)
  };

  if (hash.length !== expectedLengths[algorithm]) {
    throw new Error(
      `hash length for ${algorithm} must be ${expectedLengths[algorithm]} characters, got ${hash.length}`,
    );
  }

  // Validate hash contains only hex characters
  if (!/^[a-f0-9]+$/i.test(hash)) {
    throw new Error('hash must contain only hexadecimal characters');
  }

  try {
    // Generate hash of the data
    const computedHash = createHash(algorithm).update(data).digest('hex');

    // Convert both hashes to buffers for timing-safe comparison
    const hashBuffer = Buffer.from(hash, 'hex');
    const computedHashBuffer = Buffer.from(computedHash, 'hex');

    // Use timing-safe comparison
    return timingSafeEqual(hashBuffer, computedHashBuffer);
  } catch {
    // If buffers are different lengths, timingSafeEqual throws
    return false;
  }
}
