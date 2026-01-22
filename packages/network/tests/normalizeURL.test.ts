import { normalizeURL } from '../src/normalizeURL';

/**
 * Unit tests for the normalizeURL function.
 */
describe('normalizeURL', () => {
  // Test case 1: Basic URL normalization (lowercases hostname by default)
  it('1. should lowercase hostname by default', () => {
    const result = normalizeURL('https://Example.COM/Path');
    expect(result).toBe('https://example.com/Path');
  });

  // Test case 2: Remove trailing slash (default)
  it('2. should remove trailing slash by default', () => {
    const result = normalizeURL('https://example.com/path/');
    expect(result).toBe('https://example.com/path');
  });

  // Test case 3: Keep trailing slash with option
  it('3. should keep trailing slash when disabled', () => {
    const result = normalizeURL('https://example.com/path/', {
      removeTrailingSlash: false,
    });
    expect(result).toBe('https://example.com/path/');
  });

  // Test case 4: Lowercase hostname option (Note: URL constructor lowercases hostname automatically)
  it('4. should note that URL constructor lowercases hostname', () => {
    // The native URL constructor always lowercases the hostname
    // so this option has limited effect
    const result = normalizeURL('https://EXAMPLE.COM/path', {
      lowercaseHostname: false,
    });
    // URL constructor already lowercased it
    expect(result).toBe('https://example.com/path');
  });

  // Test case 5: Sort query parameters (default)
  it('5. should sort query parameters by default', () => {
    const result = normalizeURL('https://example.com?z=1&a=2&m=3');
    // URL constructor adds / before query
    expect(result).toBe('https://example.com/?a=2&m=3&z=1');
  });

  // Test case 6: Disable sort query parameters
  it('6. should keep query order when sort disabled', () => {
    const result = normalizeURL('https://example.com?z=1&a=2', {
      sortQueryParams: false,
    });
    // URL constructor adds / before query
    expect(result).toBe('https://example.com/?z=1&a=2');
  });

  // Test case 7: Remove default HTTPS port (default)
  it('7. should remove default HTTPS port 443', () => {
    const result = normalizeURL('https://example.com:443/path');
    expect(result).toBe('https://example.com/path');
  });

  // Test case 8: Remove default HTTP port (default)
  it('8. should remove default HTTP port 80', () => {
    const result = normalizeURL('http://example.com:80/path');
    expect(result).toBe('http://example.com/path');
  });

  // Test case 9: Keep custom port
  it('9. should keep custom ports', () => {
    const result = normalizeURL('https://example.com:8080/path');
    expect(result).toBe('https://example.com:8080/path');
  });

  // Test case 10: Remove empty query parameters (default)
  it('10. should remove empty query parameters by default', () => {
    const result = normalizeURL('https://example.com?name=John&empty=&age=30');
    // URL adds / before query
    expect(result).toBe('https://example.com/?age=30&name=John');
  });

  // Test case 11: Keep empty query parameters
  it('11. should keep empty parameters when disabled', () => {
    const result = normalizeURL('https://example.com?name=&age=30', {
      removeEmptyParams: false,
    });
    expect(result).toContain('name=');
  });

  // Test case 12: All defaults applied
  it('12. should apply all default normalizations', () => {
    const result = normalizeURL(
      'https://Example.COM:443/Path/?z=1&a=2&empty=/',
    );
    // Note: '/' value is URL-encoded, and empty= is removed because it's not empty
    // It only removes parameters where value === ''
    expect(result).toBe('https://example.com/Path?a=2&empty=%2F&z=1');
  });

  // Test case 13: URL with query and hash
  it('13. should normalize URL with query and hash', () => {
    const result = normalizeURL('https://Example.COM/path?b=2&a=1#section');
    expect(result).toBe('https://example.com/path?a=1&b=2#section');
  });

  // Test case 14: Root path preserves slash
  it('14. should preserve root path slash', () => {
    const result = normalizeURL('https://example.com/');
    expect(result).toBe('https://example.com/');
  });

  // Test case 15: Empty query string handled
  it('15. should handle URL with empty query string', () => {
    const result = normalizeURL('https://example.com/path?');
    // URL keeps the ? for empty query
    expect(result).toBe('https://example.com/path?');
  });

  // Test case 16: IPv4 hostname
  it('16. should normalize IPv4 URL', () => {
    const result = normalizeURL('http://192.168.1.1:8080/path');
    expect(result).toBe('http://192.168.1.1:8080/path');
  });

  // Test case 17: IPv6 hostname preserved
  it('17. should normalize IPv6 URL', () => {
    const result = normalizeURL('http://[2001:db8::1]:8080/path');
    expect(result).toBe('http://[2001:db8::1]:8080/path');
  });

  // Test case 18: Error case - non-string URL
  it('18. should throw TypeError for non-string URL', () => {
    const input = 12345 as unknown as string;
    expect(() => normalizeURL(input)).toThrow(TypeError);
    expect(() => normalizeURL(input)).toThrow('url must be a string');
  });

  // Test case 19: Error case - invalid URL
  it('19. should throw Error for invalid URL format', () => {
    expect(() => normalizeURL('not a valid url')).toThrow('Invalid URL');
  });

  // Test case 20: Error case - non-object options
  it('20. should throw TypeError for non-object options', () => {
    const options = 'string' as unknown as Parameters<typeof normalizeURL>[1];
    expect(() => normalizeURL('https://example.com', options)).toThrow(
      TypeError,
    );
  });
});
