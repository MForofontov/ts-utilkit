import { getDomainParts } from './getDomainParts';

/**
 * Extracts the root domain from a URL or hostname.
 * Returns the domain without subdomains.
 *
 * @param url - The URL or hostname to extract domain from.
 * @returns The root domain (domain + TLD).
 *
 * @throws {Error} If unable to extract domain.
 *
 * @example
 * // From URL with subdomain
 * extractDomain('https://api.sub.example.com/path');
 * // Returns: 'example.com'
 *
 * @example
 * // From simple domain
 * extractDomain('https://example.com');
 * // Returns: 'example.com'
 *
 * @example
 * // From hostname only
 * extractDomain('api.example.co.uk');
 * // Returns: 'example.co.uk'
 *
 * @note Handles common multi-part TLDs like .co.uk, .com.au.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function extractDomain(url: string): string {
  // getDomainParts handles all the input validation, URL parsing, hostname
  // extraction, port stripping, IPv4/IPv6 detection, and multi-part TLD logic.
  const parts = getDomainParts(url);

  // When tld is empty (IPv4, IPv6, bare single-part hostname like 'localhost'),
  // domain already holds the full representation.
  if (parts.tld === '') {
    return parts.domain;
  }

  return `${parts.domain}.${parts.tld}`;
}
