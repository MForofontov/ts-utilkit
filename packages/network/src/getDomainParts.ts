/**
 * Interface representing parsed domain components.
 */
export interface DomainParts {
  /** The subdomain portion (empty string if none) */
  subdomain: string;
  /** The domain name */
  domain: string;
  /** The top-level domain */
  tld: string;
  /** The full hostname */
  hostname: string;
}

/**
 * Parses a URL or hostname into its domain components.
 * Separates subdomain, domain, and TLD.
 *
 * @param url - The URL or hostname to parse.
 * @returns An object containing domain parts.
 *
 * @throws {TypeError} If url is not a string.
 * @throws {Error} If unable to parse domain.
 *
 * @example
 * // Full URL with subdomain
 * getDomainParts('https://api.example.com/path');
 * // Returns: { subdomain: 'api', domain: 'example', tld: 'com', hostname: 'api.example.com' }
 *
 * @example
 * // No subdomain
 * getDomainParts('https://example.com');
 * // Returns: { subdomain: '', domain: 'example', tld: 'com', hostname: 'example.com' }
 *
 * @example
 * // Multiple subdomains
 * getDomainParts('https://api.v2.example.com');
 * // Returns: { subdomain: 'api.v2', domain: 'example', tld: 'com', hostname: 'api.v2.example.com' }
 *
 * @note Handles multi-part TLDs like .co.uk.
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function getDomainParts(url: string): DomainParts {
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
    return {
      subdomain: '',
      domain: hostname,
      tld: '',
      hostname,
    };
  }

  // Handle IPv4 (4 parts separated by dots, all numeric)
  const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (ipv4Pattern.test(hostname)) {
    return {
      subdomain: '',
      domain: hostname,
      tld: '',
      hostname,
    };
  }

  // Split by dots
  const parts = hostname.split('.');

  // Handle single-part hostname (like 'localhost')
  if (parts.length < 2) {
    return {
      subdomain: '',
      domain: hostname,
      tld: '',
      hostname,
    };
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

  let domain: string;
  let tld: string;
  let subdomain: string;

  // Check if last two parts form a known multi-part TLD
  if (parts.length >= 3) {
    const lastTwo = `${parts[parts.length - 2]}.${parts[parts.length - 1]}`;
    if (multiPartTLDs.includes(lastTwo)) {
      // Multi-part TLD case
      tld = lastTwo;
      domain = parts[parts.length - 3];
      subdomain = parts.slice(0, -3).join('.');
      return { subdomain, domain, tld, hostname };
    }
  }

  // Standard case: single-part TLD
  tld = parts[parts.length - 1];
  domain = parts[parts.length - 2];
  subdomain = parts.slice(0, -2).join('.');

  return { subdomain, domain, tld, hostname };
}
