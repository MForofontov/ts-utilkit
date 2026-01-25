/**
 * Checks if a URL is a subdomain of a given parent domain.
 * Returns true only if the URL has more parts than the parent domain.
 *
 * @param subdomainUrl - The URL to check if it's a subdomain.
 * @param parentUrl - The parent URL/domain to check against.
 * @returns True if subdomainUrl is a subdomain of parentUrl, false otherwise.
 *
 * @throws {TypeError} If subdomainUrl or parentUrl is not a string.
 * @throws {Error} If URLs are invalid.
 *
 * @example
 * // Subdomain check
 * isSubdomain('https://api.example.com', 'https://example.com');
 * // Returns: true
 *
 * @example
 * // Same domain
 * isSubdomain('https://example.com', 'https://example.com');
 * // Returns: false
 *
 * @example
 * // Different domain
 * isSubdomain('https://example.com', 'https://other.com');
 * // Returns: false
 *
 * @note Returns false if domains are the same (no subdomain present).
 *
 * @complexity Time: O(1), Space: O(1)
 */
export function isSubdomain(subdomainUrl: string, parentUrl: string): boolean {
  // Input validation
  if (typeof subdomainUrl !== 'string') {
    throw new TypeError(
      `subdomainUrl must be a string, got ${typeof subdomainUrl}`,
    );
  }
  if (typeof parentUrl !== 'string') {
    throw new TypeError(`parentUrl must be a string, got ${typeof parentUrl}`);
  }

  let subdomainHostname: string;
  let parentHostname: string;

  // Try to parse subdomain URL
  try {
    const urlObj = new URL(subdomainUrl);
    subdomainHostname = urlObj.hostname.toLowerCase();
  } catch {
    // If URL parsing fails, try treating as hostname
    if (subdomainUrl.includes('://')) {
      throw new Error('Invalid URL');
    }
    // Validate hostname format
    if (subdomainUrl.includes(' ') || subdomainUrl === '') {
      throw new Error('Invalid URL');
    }
    subdomainHostname = subdomainUrl.toLowerCase();
  }

  // Try to parse parent URL
  try {
    const urlObj = new URL(parentUrl);
    parentHostname = urlObj.hostname.toLowerCase();
  } catch {
    // If URL parsing fails, try treating as hostname
    if (parentUrl.includes('://')) {
      throw new Error('Invalid URL');
    }
    // Validate hostname format
    if (parentUrl.includes(' ') || parentUrl === '') {
      throw new Error('Invalid URL');
    }
    parentHostname = parentUrl.toLowerCase();
  }

  // If hostnames are identical, it's not a subdomain
  if (subdomainHostname === parentHostname) {
    return false;
  }

  // Check if subdomain hostname ends with .parent
  return subdomainHostname.endsWith(`.${parentHostname}`);
}
