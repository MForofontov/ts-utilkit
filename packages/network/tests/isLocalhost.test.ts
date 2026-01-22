import { isLocalhost } from '../src/isLocalhost';

/**
 * Unit tests for the isLocalhost function.
 */
describe('isLocalhost', () => {
  // Test case 1: String "localhost"
  it('1. should return true for "localhost"', () => {
    expect(isLocalhost('localhost')).toBe(true);
  });

  // Test case 2: IPv4 loopback 127.0.0.1
  it('2. should return true for 127.0.0.1', () => {
    expect(isLocalhost('127.0.0.1')).toBe(true);
  });

  // Test case 3: IPv4 loopback range
  it('3. should return true for 127.x.x.x range', () => {
    expect(isLocalhost('127.0.0.0')).toBe(true);
    expect(isLocalhost('127.1.2.3')).toBe(true);
    expect(isLocalhost('127.255.255.255')).toBe(true);
  });

  // Test case 4: IPv6 loopback ::1
  it('4. should return true for IPv6 loopback ::1', () => {
    expect(isLocalhost('::1')).toBe(true);
  });

  // Test case 5: IPv6 loopback [::1]
  it('5. should return true for IPv6 loopback with brackets', () => {
    expect(isLocalhost('[::1]')).toBe(true);
  });

  // Test case 6: Non-localhost hostname
  it('6. should return false for non-localhost hostname', () => {
    expect(isLocalhost('example.com')).toBe(false);
  });

  // Test case 7: Non-localhost IPv4
  it('7. should return false for non-localhost IPv4', () => {
    expect(isLocalhost('192.168.1.1')).toBe(false);
  });

  // Test case 8: Full URL with localhost
  it('8. should return true for URL with localhost', () => {
    expect(isLocalhost('http://localhost:8080/api')).toBe(true);
  });

  // Test case 9: Full URL with 127.0.0.1
  it('9. should return true for URL with 127.0.0.1', () => {
    expect(isLocalhost('https://127.0.0.1:3000/path')).toBe(true);
  });

  // Test case 10: Full URL with ::1
  it('10. should return true for URL with ::1', () => {
    expect(isLocalhost('http://[::1]:8080/api')).toBe(true);
  });

  // Test case 11: Full URL with external domain
  it('11. should return false for URL with external domain', () => {
    expect(isLocalhost('https://example.com/path')).toBe(false);
  });

  // Test case 12: Empty string
  it('12. should return false for empty string', () => {
    expect(isLocalhost('')).toBe(false);
  });

  // Test case 13: Localhost with different casing
  it('13. should return true for "LOCALHOST" (case-insensitive)', () => {
    expect(isLocalhost('LOCALHOST')).toBe(true);
    expect(isLocalhost('LocalHost')).toBe(true);
  });

  // Test case 14: 127.0.0.2 (loopback range)
  it('14. should return true for 127.0.0.2', () => {
    expect(isLocalhost('127.0.0.2')).toBe(true);
  });

  // Test case 15: 128.0.0.1 (not loopback)
  it('15. should return false for 128.0.0.1', () => {
    expect(isLocalhost('128.0.0.1')).toBe(false);
  });

  // Test case 16: localhost subdomain
  it('16. should return false for localhost subdomains', () => {
    expect(isLocalhost('api.localhost')).toBe(false);
  });

  // Test case 17: URL with port only
  it('17. should handle URLs with ports correctly', () => {
    expect(isLocalhost('http://localhost:8080')).toBe(true);
    expect(isLocalhost('http://example.com:8080')).toBe(false);
  });

  // Test case 18: IPv6 loopback in URL
  it('18. should detect IPv6 loopback in various formats', () => {
    expect(isLocalhost('http://[::1]/')).toBe(true);
    expect(isLocalhost('::1')).toBe(true);
  });

  // Test case 19: Invalid URL format
  it('19. should handle invalid URL format gracefully', () => {
    // For invalid URLs that aren't proper URLs, should check as hostname
    expect(isLocalhost('not-a-url-localhost')).toBe(false);
    // With port in hostname format, it's not parsed as URL, so not detected
    expect(isLocalhost('127.0.0.1:8080')).toBe(false);
  });

  // Test case 20: Error case - non-string input
  it('20. should throw TypeError for non-string input', () => {
    const input = 12345 as unknown as string;
    expect(() => isLocalhost(input)).toThrow(TypeError);
    expect(() => isLocalhost(input)).toThrow('urlOrHostname must be a string');
  });
});
