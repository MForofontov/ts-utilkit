import { parseURL } from '../src/parseURL';

/**
 * Unit tests for the parseURL function.
 */
describe('parseURL', () => {
  // Test case 1: Basic HTTPS URL
  it('1. should parse basic HTTPS URL correctly', () => {
    // Arrange
    const url = 'https://example.com/path';

    // Act
    const result = parseURL(url);

    // Assert
    expect(result.protocol).toBe('https:');
    expect(result.hostname).toBe('example.com');
    expect(result.pathname).toBe('/path');
    expect(result.origin).toBe('https://example.com');
  });

  // Test case 2: URL with port
  it('2. should parse URL with port correctly', () => {
    // Arrange
    const url = 'http://localhost:8080/api';

    // Act
    const result = parseURL(url);

    // Assert
    expect(result.protocol).toBe('http:');
    expect(result.hostname).toBe('localhost');
    expect(result.port).toBe('8080');
    expect(result.pathname).toBe('/api');
    expect(result.host).toBe('localhost:8080');
  });

  // Test case 3: URL with query parameters
  it('3. should parse URL with query parameters', () => {
    // Arrange
    const url = 'https://example.com/search?q=test&page=1';

    // Act
    const result = parseURL(url);

    // Assert
    expect(result.search).toBe('q=test&page=1');
    expect(result.pathname).toBe('/search');
  });

  // Test case 4: URL with hash fragment
  it('4. should parse URL with hash fragment', () => {
    // Arrange
    const url = 'https://example.com/page#section';

    // Act
    const result = parseURL(url);

    // Assert
    expect(result.hash).toBe('section');
    expect(result.pathname).toBe('/page');
  });

  // Test case 5: URL with all components
  it('5. should parse URL with all components', () => {
    // Arrange
    const url = 'https://user@example.com:443/path?query=value#hash';

    // Act
    const result = parseURL(url);

    // Assert
    expect(result.protocol).toBe('https:');
    expect(result.hostname).toBe('example.com');
    expect(result.port).toBe('');
    expect(result.pathname).toBe('/path');
    expect(result.search).toBe('query=value');
    expect(result.hash).toBe('hash');
  });

  // Test case 6: URL without path
  it('6. should parse URL without path', () => {
    // Arrange
    const url = 'https://example.com';

    // Act
    const result = parseURL(url);

    // Assert
    expect(result.pathname).toBe('/');
    expect(result.search).toBe('');
    expect(result.hash).toBe('');
  });

  // Test case 7: File protocol URL
  it('7. should parse file protocol URL', () => {
    // Arrange
    const url = 'file:///home/user/document.txt';

    // Act
    const result = parseURL(url);

    // Assert
    expect(result.protocol).toBe('file:');
    expect(result.pathname).toBe('/home/user/document.txt');
  });

  // Test case 8: FTP URL with credentials
  it('8. should parse FTP URL', () => {
    // Arrange
    const url = 'ftp://user:pass@ftp.example.com/files';

    // Act
    const result = parseURL(url);

    // Assert
    expect(result.protocol).toBe('ftp:');
    expect(result.hostname).toBe('ftp.example.com');
    expect(result.pathname).toBe('/files');
  });

  // Test case 9: URL with IPv4 address
  it('9. should parse URL with IPv4 address', () => {
    // Arrange
    const url = 'http://192.168.1.1:8080/admin';

    // Act
    const result = parseURL(url);

    // Assert
    expect(result.hostname).toBe('192.168.1.1');
    expect(result.port).toBe('8080');
  });

  // Test case 10: URL with IPv6 address
  it('10. should parse URL with IPv6 address', () => {
    // Arrange
    const url = 'http://[2001:db8::1]/path';

    // Act
    const result = parseURL(url);

    // Assert
    expect(result.hostname).toBe('[2001:db8::1]');
    expect(result.pathname).toBe('/path');
  });

  // Test case 11: URL with encoded characters
  it('11. should parse URL with encoded characters', () => {
    // Arrange
    const url = 'https://example.com/path%20with%20spaces?key=value%20encoded';

    // Act
    const result = parseURL(url);

    // Assert
    expect(result.pathname).toBe('/path%20with%20spaces');
    expect(result.search).toContain('value%20encoded');
  });

  // Test case 12: URL with subdomain
  it('12. should parse URL with subdomain', () => {
    // Arrange
    const url = 'https://api.staging.example.com/v1/users';

    // Act
    const result = parseURL(url);

    // Assert
    expect(result.hostname).toBe('api.staging.example.com');
    expect(result.pathname).toBe('/v1/users');
  });

  // Test case 13: URL with multiple query parameters
  it('13. should parse URL with multiple query parameters', () => {
    // Arrange
    const url = 'https://example.com?a=1&b=2&c=3&d=4';

    // Act
    const result = parseURL(url);

    // Assert
    expect(result.search).toBe('a=1&b=2&c=3&d=4');
  });

  // Test case 14: URL with empty query parameter
  it('14. should parse URL with empty query parameter', () => {
    // Arrange
    const url = 'https://example.com?key=';

    // Act
    const result = parseURL(url);

    // Assert
    expect(result.search).toBe('key=');
  });

  // Test case 15: URL with default HTTPS port
  it('15. should handle default HTTPS port correctly', () => {
    // Arrange
    const url = 'https://example.com:443/path';

    // Act
    const result = parseURL(url);

    // Assert
    expect(result.port).toBe('');
    expect(result.host).toBe('example.com');
  });

  // Test case 16: URL with default HTTP port
  it('16. should handle default HTTP port correctly', () => {
    // Arrange
    const url = 'http://example.com:80/path';

    // Act
    const result = parseURL(url);

    // Assert
    expect(result.port).toBe('');
    expect(result.host).toBe('example.com');
  });

  // Test case 17: URL with deep path
  it('17. should parse URL with deep path structure', () => {
    // Arrange
    const url = 'https://example.com/api/v1/users/123/profile/settings';

    // Act
    const result = parseURL(url);

    // Assert
    expect(result.pathname).toBe('/api/v1/users/123/profile/settings');
  });

  // Test case 18: Localhost URL
  it('18. should parse localhost URL', () => {
    // Arrange
    const url = 'http://localhost:3000/dashboard';

    // Act
    const result = parseURL(url);

    // Assert
    expect(result.hostname).toBe('localhost');
    expect(result.port).toBe('3000');
    expect(result.origin).toBe('http://localhost:3000');
  });

  // Test case 19: Error case - invalid URL
  it('19. should throw Error for invalid URL', () => {
    // Arrange
    const url = 'not a valid url';

    // Act & Assert
    expect(() => parseURL(url)).toThrow(Error);
    expect(() => parseURL(url)).toThrow('Invalid URL');
  });

  // Test case 20: Error case - non-string input
  it('20. should throw TypeError for non-string input', () => {
    // Arrange
    const input = 12345 as unknown as string;

    // Act & Assert
    expect(() => parseURL(input)).toThrow(TypeError);
    expect(() => parseURL(input)).toThrow('url must be a string');
  });
});
