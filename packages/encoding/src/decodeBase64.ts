import { Buffer } from 'buffer';

/**
 * Decodes a base64 encoded string (including URL-safe base64).
 *
 * @param str - The base64 encoded string to decode.
 * @returns The decoded UTF-8 string.
 *
 * @throws {TypeError} If str is not a string.
 * @throws {Error} If the provided string is not valid base64.
 *
 * @example
 * // Basic usage
 * decodeBase64("aGVsbG8gd29ybGQ="); // "hello world"
 * decodeBase64("dGVzdA"); // "test"
 *
 * @example
 * // URL-safe base64 (- and _ instead of + and /)
 * decodeBase64("aGVsbG8gd29ybGQ"); // "hello world"
 * decodeBase64("SGVsbG8g5LiW55WM"); // "Hello 世界"
 *
 * @example
 * // With UTF-8 characters
 * decodeBase64("Y2Fmw6k"); // "café"
 * decodeBase64("dXNlckBleGFtcGxlLmNvbQ"); // "user@example.com"
 *
 * @example
 * // Invalid base64 (throws error)
 * try {
 *   decodeBase64("invalid!!!"); // Throws Error
 * } catch (e) {
 *   console.error(e.message); // "Invalid base64 string"
 * }
 *
 * @note This function relies on Node.js Buffer API for decoding.
 * @note In browser environments, consider using the native `atob()` function instead.
 * @note Supports both standard base64 and URL-safe base64 encoding.
 * @note Automatically converts URL-safe characters (- and _) to standard base64 (+ and /).
 * @note Validates the decoded string by re-encoding and comparing with the input.
 * @note Throws an error for malformed or corrupted base64 strings.
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the encoded string
 */
export function decodeBase64(str: string): string {
  try {
    const normalized = str.replace(/-/g, '+').replace(/_/g, '/');
    const buffer = Buffer.from(normalized, 'base64');
    const decoded = buffer.toString('utf-8');
    const reEncoded = buffer.toString('base64').replace(/=+$/, '');
    const sanitizedInput = normalized.replace(/=+$/, '');

    if (reEncoded !== sanitizedInput) {
      throw new Error('Invalid base64 string');
    }

    return decoded;
  } catch {
    throw new Error('Invalid base64 string');
  }
}
