import { isSameOrigin } from '../src/isSameOrigin';

/**
 * Unit tests for the isSameOrigin function.
 */
describe('isSameOrigin', () => {
  // Test case 1: Return true for identical origins
  it('1. should return true for same origin', () => {
    const result = isSameOrigin('https://example.com', 'https://example.com');
    expect(result).toBe(true);
  });

  // Test case 2: Ignore path differences when hosts match
  it('2. should return true for same origin with different paths', () => {
    const result = isSameOrigin(
      'https://example.com/path1',
      'https://example.com/path2',
    );
    expect(result).toBe(true);
  });

  // Test case 3: Detect different protocols
  it('3. should return false for different protocols', () => {
    const result = isSameOrigin('http://example.com', 'https://example.com');
    expect(result).toBe(false);
  });

  // Test case 4: Detect different hosts
  it('4. should return false for different hosts', () => {
    const result = isSameOrigin('https://example.com', 'https://other.com');
    expect(result).toBe(false);
  });

  // Test case 5: Detect different explicit ports
  it('5. should return false for different ports (explicit)', () => {
    const result = isSameOrigin(
      'https://example.com:8080',
      'https://example.com:9090',
    );
    expect(result).toBe(false);
  });

  // Test case 6: Detect subdomain differences
  it('6. should return false for subdomain difference', () => {
    const result = isSameOrigin(
      'https://www.example.com',
      'https://api.example.com',
    );
    expect(result).toBe(false);
  });

  // Test case 7: Ignore query string differences
  it('7. should handle same origin with query parameters', () => {
    const result = isSameOrigin(
      'https://example.com?a=1',
      'https://example.com?b=2',
    );
    expect(result).toBe(true);
  });

  // Test case 8: Ignore hash differences
  it('8. should handle same origin with hashes', () => {
    const result = isSameOrigin(
      'https://example.com#section1',
      'https://example.com#section2',
    );
    expect(result).toBe(true);
  });

  // Test case 9: Treat default HTTPS ports as equivalent
  it('9. should treat default HTTPS port as same', () => {
    const result = isSameOrigin(
      'https://example.com',
      'https://example.com:443',
    );
    expect(result).toBe(true);
  });

  // Test case 10: Treat default HTTP ports as equivalent
  it('10. should treat default HTTP port as same', () => {
    const result = isSameOrigin('http://example.com', 'http://example.com:80');
    expect(result).toBe(true);
  });

  // Test case 11: Throw when first URL is not a string
  it('11. should throw TypeError for non-string url1', () => {
    const url = 123 as unknown as string;
    expect(() => isSameOrigin(url, 'https://example.com')).toThrow(TypeError);
    expect(() => isSameOrigin(url, 'https://example.com')).toThrow(
      'url1 must be a string',
    );
  });

  // Test case 12: Throw when second URL is not a string
  it('12. should throw TypeError for non-string url2', () => {
    const url = 123 as unknown as string;
    expect(() => isSameOrigin('https://example.com', url)).toThrow(TypeError);
    expect(() => isSameOrigin('https://example.com', url)).toThrow(
      'url2 must be a string',
    );
  });

  // Test case 13: Throw on invalid first URL
  it('13. should throw Error for invalid url1', () => {
    expect(() => isSameOrigin('not a url', 'https://example.com')).toThrow(
      'Invalid URL',
    );
  });

  // Test case 14: Throw on invalid second URL
  it('14. should throw Error for invalid url2', () => {
    expect(() => isSameOrigin('https://example.com', 'not a url')).toThrow(
      'Invalid URL',
    );
  });

  // Test case 15: Compare identical IPv4 origins
  it('15. should handle IPv4 addresses', () => {
    const result = isSameOrigin('http://192.168.1.1', 'http://192.168.1.1');
    expect(result).toBe(true);
  });

  // Test case 16: Compare identical IPv6 origins
  it('16. should handle IPv6 addresses', () => {
    const result = isSameOrigin('http://[2001:db8::1]', 'http://[2001:db8::1]');
    expect(result).toBe(true);
  });

  // Test case 17: Detect different IPv4 hosts
  it('17. should return false for different IPv4 addresses', () => {
    const result = isSameOrigin('http://192.168.1.1', 'http://192.168.1.2');
    expect(result).toBe(false);
  });

  // Test case 18: Handle localhost origins
  it('18. should handle localhost', () => {
    const result = isSameOrigin(
      'http://localhost:3000',
      'http://localhost:3000',
    );
    expect(result).toBe(true);
  });

  // Test case 19: Detect differing localhost ports
  it('19. should return false for different localhost ports', () => {
    const result = isSameOrigin(
      'http://localhost:3000',
      'http://localhost:4000',
    );
    expect(result).toBe(false);
  });

  // Test case 20: Compare complex but matching origins
  it('20. should handle complex URLs', () => {
    const result = isSameOrigin(
      'https://user:pass@example.com:443/api?key=1#top',
      'https://example.com/other?key=2#bottom',
    );
    expect(result).toBe(true);
  });
});
