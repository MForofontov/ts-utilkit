/**
 * Extracts the root domain from a URL or hostname.
 * Returns the domain without subdomains.
 *
 * @param url - The URL or hostname to extract domain from.
 * @returns The root domain (domain + TLD).
 *
 * @throws {TypeError} If url is not a string.
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
  // Input validation
  if (typeof url !== 'string') {
    throw new TypeError(`url must be a string, got ${typeof url}`);
  }

  let hostname: string;

  // Try to parse as URL first
  try {
    const urlObj = new URL(url);
    hostname = urlObj.hostname;
  } catch {
    // If not a valid URL and contains ://, it's malformed
    if (url.includes('://')) {
      throw new Error('Invalid URL');
    }
    // Otherwise treat as hostname - validate it looks like a hostname
    if (url.includes(' ') || url === '') {
      throw new Error('Invalid URL');
    }
    hostname = url;
  }

  // Remove port if present (but not for IPv6)
  if (!hostname.startsWith('[')) {
    hostname = hostname.split(':')[0];
  }

  // Handle IPv6 (wrapped in brackets)
  if (hostname.startsWith('[') && hostname.endsWith(']')) {
    return hostname; // Return as-is for IPv6
  }

  // Handle IPv4 (4 parts separated by dots, all numeric)
  const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (ipv4Pattern.test(hostname)) {
    return hostname; // Return as-is for IPv4
  }

  // Split by dots
  const parts = hostname.split('.');

  // Handle single-part hostname (like 'localhost')
  if (parts.length < 2) {
    return hostname;
  }

  // Handle common multi-part TLDs
  const multiPartTLDs = [
    'co.uk',
    'org.uk',
    'com.au',
    'co.nz',
    'co.za',
    'com.br',
    'co.jp',
    'ac.uk',
    'gov.uk',
  ];

  // Check if last two parts form a known multi-part TLD
  if (parts.length >= 3) {
    const lastTwo = `${parts[parts.length - 2]}.${parts[parts.length - 1]}`;
    if (multiPartTLDs.includes(lastTwo)) {
      // Return domain + multi-part TLD
      return `${parts[parts.length - 3]}.${lastTwo}`;
    }
  }

  // Return last two parts (domain + TLD)
  return `${parts[parts.length - 2]}.${parts[parts.length - 1]}`;
}
