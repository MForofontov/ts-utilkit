import { isSubdomain } from '../src/isSubdomain';

/**
 * Unit tests for the isSubdomain function.
 */
describe('isSubdomain', () => {
  it('1. should return true for subdomain', () => {
    const result = isSubdomain(
      'https://api.example.com',
      'https://example.com',
    );
    expect(result).toBe(true);
  });

  it('2. should return true for nested subdomain', () => {
    const result = isSubdomain(
      'https://api.v2.example.com',
      'https://example.com',
    );
    expect(result).toBe(true);
  });

  it('3. should return false for same domain', () => {
    const result = isSubdomain('https://example.com', 'https://example.com');
    expect(result).toBe(false);
  });

  it('4. should return false for different domains', () => {
    const result = isSubdomain('https://other.com', 'https://example.com');
    expect(result).toBe(false);
  });

  it('5. should return true for www subdomain', () => {
    const result = isSubdomain(
      'https://www.example.com',
      'https://example.com',
    );
    expect(result).toBe(true);
  });

  it('6. should be case-insensitive', () => {
    const result = isSubdomain(
      'https://API.EXAMPLE.COM',
      'https://example.com',
    );
    expect(result).toBe(true);
  });

  it('7. should handle domains with paths', () => {
    const result = isSubdomain(
      'https://api.example.com/path',
      'https://example.com/other',
    );
    expect(result).toBe(true);
  });

  it('8. should handle domains with ports', () => {
    const result = isSubdomain(
      'https://api.example.com:8080',
      'https://example.com:8080',
    );
    expect(result).toBe(true);
  });

  it('9. should return false when parent has subdomain', () => {
    const result = isSubdomain(
      'https://api.example.com',
      'https://www.example.com',
    );
    expect(result).toBe(false);
  });

  it('10. should throw TypeError for non-string subdomainUrl', () => {
    const url = 123 as unknown as string;
    expect(() => isSubdomain(url, 'https://example.com')).toThrow(TypeError);
    expect(() => isSubdomain(url, 'https://example.com')).toThrow(
      'subdomainUrl must be a string',
    );
  });

  it('11. should throw TypeError for non-string parentUrl', () => {
    const url = 123 as unknown as string;
    expect(() => isSubdomain('https://api.example.com', url)).toThrow(
      TypeError,
    );
    expect(() => isSubdomain('https://api.example.com', url)).toThrow(
      'parentUrl must be a string',
    );
  });

  // Test case 12: should handle plain hostnames without protocol
  it('12. should handle plain hostnames without protocol', () => {
    const result = isSubdomain('api.example.com', 'example.com');
    expect(result).toBe(true);
  });

  // Test case 13: should throw Error for invalid subdomain URL with protocol but malformed
  it('13. should throw Error for invalid subdomainUrl with protocol', () => {
    expect(() => isSubdomain('http://', 'https://example.com')).toThrow(Error);
    expect(() => isSubdomain('http://', 'https://example.com')).toThrow(
      'Invalid URL',
    );
  });

  // Test case 14: should throw Error for empty subdomainUrl
  it('14. should throw Error for empty subdomainUrl', () => {
    expect(() => isSubdomain('', 'https://example.com')).toThrow(Error);
    expect(() => isSubdomain('', 'https://example.com')).toThrow('Invalid URL');
  });

  // Test case 15: should throw Error for subdomainUrl with spaces
  it('15. should throw Error for subdomainUrl with spaces', () => {
    expect(() => isSubdomain('invalid url', 'https://example.com')).toThrow(
      Error,
    );
    expect(() => isSubdomain('invalid url', 'https://example.com')).toThrow(
      'Invalid URL',
    );
  });

  // Test case 16: should throw Error for invalid parentUrl with protocol but malformed
  it('16. should throw Error for invalid parentUrl with protocol', () => {
    expect(() => isSubdomain('https://api.example.com', 'http://')).toThrow(
      Error,
    );
    expect(() => isSubdomain('https://api.example.com', 'http://')).toThrow(
      'Invalid URL',
    );
  });

  // Test case 17: should throw Error for empty parentUrl
  it('17. should throw Error for empty parentUrl', () => {
    expect(() => isSubdomain('https://api.example.com', '')).toThrow(Error);
    expect(() => isSubdomain('https://api.example.com', '')).toThrow(
      'Invalid URL',
    );
  });

  // Test case 18: should throw Error for parentUrl with spaces
  it('18. should throw Error for parentUrl with spaces', () => {
    expect(() => isSubdomain('https://api.example.com', 'invalid url')).toThrow(
      Error,
    );
    expect(() => isSubdomain('https://api.example.com', 'invalid url')).toThrow(
      'Invalid URL',
    );
  });

  // Test case 19: should handle multi-part TLDs
  it('19. should handle multi-part TLDs', () => {
    const result = isSubdomain(
      'https://api.example.co.uk',
      'https://example.co.uk',
    );
    expect(result).toBe(true);
  });

  // Test case 20. should return false for parent being subdomain of first
  it('20. should return false for parent being subdomain of first', () => {
    const result = isSubdomain(
      'https://example.com',
      'https://api.example.com',
    );
    expect(result).toBe(false);
  });
});
