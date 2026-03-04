import { Buffer } from 'buffer';

/**
 * Encodes a string as a standard base64 string (RFC 4648 §4).
 *
 * @param str - The string to encode.
 * @returns The standard base64 encoded string, including `+`, `/`, and `=` padding.
 *
 * @example
 * // Basic usage
 * encodeBase64("hello world"); // "aGVsbG8gd29ybGQ="
 * encodeBase64("test"); // "dGVzdA=="
 *
 * @example
 * // UTF-8 characters
 * encodeBase64("Hello 世界"); // "SGVsbG8g5LiW55WM"
 * encodeBase64("café"); // "Y2Fmw6k="
 *
 * @example
 * // Standard characters preserved (not URL-safe)
 * encodeBase64("???"); // "Pz8/" (/ preserved)
 * encodeBase64(">>>"); // "Pj4+" (+ preserved)
 *
 * @example
 * // Empty and edge cases
 * encodeBase64(""); // ""
 * encodeBase64("a"); // "YQ=="
 *
 * @note This function relies on Node.js Buffer API for encoding.
 * @note Always uses UTF-8 encoding for consistent multi-byte character handling.
 * @note Produces standard base64 with `+`, `/`, and `=` padding characters.
 * @note For URL-safe base64 (no `+`, `/`, `=`), use `encodeBase64URL` instead.
 * @note The output is compatible with RFC 4648 §4 (standard base64).
 *
 * @complexity Time: O(n), Space: O(n) where n is the length of the input string
 */
export function encodeBase64(str: string): string {
  return Buffer.from(str, 'utf8').toString('base64');
}
