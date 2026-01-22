import { buildURL } from '../src/buildURL';

/**
 * Unit tests for the buildURL function.
 */
describe('buildURL', () => {
  // Test case 1: Basic HTTPS URL
  it('1. should build basic HTTPS URL', () => {
    const result = buildURL({
      protocol: 'https',
      hostname: 'example.com',
    });
    expect(result).toBe('https://example.com');
  });

  // Test case 2: URL with port
  it('2. should build URL with custom port', () => {
    const result = buildURL({
      protocol: 'http',
      hostname: 'localhost',
      port: 8080,
    });
    expect(result).toBe('http://localhost:8080');
  });

  // Test case 3: URL with pathname
  it('3. should build URL with pathname', () => {
    const result = buildURL({
      protocol: 'https',
      hostname: 'example.com',
      pathname: '/api/users',
    });
    expect(result).toBe('https://example.com/api/users');
  });

  // Test case 4: URL with single query parameter
  it('4. should build URL with single query parameter', () => {
    const result = buildURL({
      protocol: 'https',
      hostname: 'example.com',
      query: { name: 'John' },
    });
    expect(result).toBe('https://example.com?name=John');
  });

  // Test case 5: URL with multiple query parameters
  it('5. should build URL with multiple query parameters', () => {
    const result = buildURL({
      protocol: 'https',
      hostname: 'example.com',
      query: { name: 'John', age: '30' },
    });
    expect(result).toBe('https://example.com?name=John&age=30');
  });

  // Test case 6: URL with hash
  it('6. should build URL with hash fragment', () => {
    const result = buildURL({
      protocol: 'https',
      hostname: 'example.com',
      hash: 'section',
    });
    expect(result).toBe('https://example.com#section');
  });

  // Test case 7: Complete URL with all components
  it('7. should build complete URL with all components', () => {
    const result = buildURL({
      protocol: 'https',
      hostname: 'example.com',
      port: 443,
      pathname: '/api/users',
      query: { id: '123', type: 'active' },
      hash: 'details',
    });
    expect(result).toBe(
      'https://example.com:443/api/users?id=123&type=active#details',
    );
  });

  // Test case 8: Edge case - empty protocol (still creates URL)
  it('8. should create URL with empty protocol', () => {
    const result = buildURL({
      protocol: '',
      hostname: 'example.com',
    });
    // Creates ://example.com which is technically valid syntax
    expect(result).toBe('://example.com');
  });

  // Test case 9: Edge case - empty hostname (still creates URL)
  it('9. should create URL with empty hostname', () => {
    const result = buildURL({
      protocol: 'https',
      hostname: '',
    });
    // Creates https:// which is technically valid syntax
    expect(result).toBe('https://');
  });

  // Test case 10: Query with special characters
  it('10. should encode special characters in query values', () => {
    const result = buildURL({
      protocol: 'https',
      hostname: 'example.com',
      query: { message: 'Hello World!' },
    });
    expect(result).toBe('https://example.com?message=Hello+World%21');
  });

  // Test case 11: Pathname without leading slash
  it('11. should add leading slash to pathname if missing', () => {
    const result = buildURL({
      protocol: 'https',
      hostname: 'example.com',
      pathname: 'api/users',
    });
    expect(result).toBe('https://example.com/api/users');
  });

  // Test case 12: Empty query object
  it('12. should handle empty query object', () => {
    const result = buildURL({
      protocol: 'https',
      hostname: 'example.com',
      query: {},
    });
    expect(result).toBe('https://example.com');
  });

  // Test case 13: Hash without leading hash symbol
  it('13. should add hash symbol if missing', () => {
    const result = buildURL({
      protocol: 'https',
      hostname: 'example.com',
      hash: 'section',
    });
    expect(result).toBe('https://example.com#section');
  });

  // Test case 14: IPv4 hostname
  it('14. should build URL with IPv4 hostname', () => {
    const result = buildURL({
      protocol: 'http',
      hostname: '192.168.1.1',
      port: 8080,
    });
    expect(result).toBe('http://192.168.1.1:8080');
  });

  // Test case 15: IPv6 hostname
  it('15. should build URL with IPv6 hostname', () => {
    const result = buildURL({
      protocol: 'http',
      hostname: '[2001:db8::1]',
    });
    expect(result).toBe('http://[2001:db8::1]');
  });

  // Test case 16: FTP protocol
  it('16. should build FTP URL', () => {
    const result = buildURL({
      protocol: 'ftp',
      hostname: 'ftp.example.com',
      pathname: '/files/document.pdf',
    });
    expect(result).toBe('ftp://ftp.example.com/files/document.pdf');
  });

  // Test case 17: File protocol
  it('17. should build file protocol URL', () => {
    const result = buildURL({
      protocol: 'file',
      hostname: '',
      pathname: '/path/to/file.txt',
    });
    expect(result).toBe('file:///path/to/file.txt');
  });

  // Test case 18: Complex query with arrays
  it('18. should handle query parameters correctly', () => {
    const result = buildURL({
      protocol: 'https',
      hostname: 'api.example.com',
      pathname: '/search',
      query: { q: 'typescript', lang: 'en', sort: 'date' },
    });
    expect(result).toContain('q=typescript');
    expect(result).toContain('lang=en');
    expect(result).toContain('sort=date');
  });

  // Test case 19: Localhost with default HTTP port
  it('19. should build localhost URL with port', () => {
    const result = buildURL({
      protocol: 'http',
      hostname: 'localhost',
      port: 3000,
      pathname: '/api',
    });
    expect(result).toBe('http://localhost:3000/api');
  });

  // Test case 20: Query with array values
  it('20. should handle array values in query parameters', () => {
    const result = buildURL({
      protocol: 'https',
      hostname: 'example.com',
      query: { tags: ['javascript', 'typescript', 'node'] },
    });
    expect(result).toContain('tags=javascript');
    expect(result).toContain('tags=typescript');
    expect(result).toContain('tags=node');
  });

  // Test case 21: Hash with leading hash symbol
  it('21. should handle hash that already has hash symbol', () => {
    const result = buildURL({
      protocol: 'https',
      hostname: 'example.com',
      hash: '#section',
    });
    // The function should handle the leading # correctly
    expect(result).toBe('https://example.com#section');
  });

  // Test case 22: Error case - non-object config
  it('22. should throw TypeError for non-object config', () => {
    const config = 'https://example.com' as unknown as Parameters<
      typeof buildURL
    >[0];
    expect(() => buildURL(config)).toThrow(TypeError);
    expect(() => buildURL(config)).toThrow('components must be an object');
  });

  // Test case 23: Error case - invalid protocol type
  it('23. should throw TypeError for non-string protocol', () => {
    const config = {
      protocol: 123,
      hostname: 'example.com',
    } as unknown as Parameters<typeof buildURL>[0];
    expect(() => buildURL(config)).toThrow(TypeError);
    expect(() => buildURL(config)).toThrow('protocol must be a string');
  });

  // Test case 24: Error case - invalid hostname type
  it('24. should throw TypeError for non-string hostname', () => {
    const config = {
      protocol: 'https',
      hostname: 123,
    } as unknown as Parameters<typeof buildURL>[0];
    expect(() => buildURL(config)).toThrow(TypeError);
    expect(() => buildURL(config)).toThrow('hostname must be a string');
  });
});
