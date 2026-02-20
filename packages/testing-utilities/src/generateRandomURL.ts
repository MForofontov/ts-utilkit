import { randomChoice, randomSequence } from '@ts-utilkit/random';

/**
 * Generates a random URL for testing.
 *
 * @param secure - Whether to use https (default: true).
 * @returns Random URL string.
 *
 * @example
 * const url = generateRandomURL();
 * // Returns: "https://example-a3f2.com/path/to/resource"
 *
 * @example
 * const httpUrl = generateRandomURL(false);
 * // Returns: "http://test-7b4e.org/api/users"
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function generateRandomURL(secure: boolean = true): string {
  const protocol = secure ? 'https' : 'http';
  const domains = ['com', 'org', 'net', 'io'];
  const domain = randomChoice(domains);
  const subdomain = randomSequence(6, 'abcdefghijklmnopqrstuvwxyz0123456789');
  const path = randomSequence(8, 'abcdefghijklmnopqrstuvwxyz0123456789');

  return `${protocol}://${subdomain}.${domain}/${path}`;
}
