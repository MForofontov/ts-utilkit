import { extractDomain } from '../src/extractDomain';

/**
 * Unit tests for the extractDomain function.
 */
describe('extractDomain', () => {
  it('1. should extract domain from basic URL', () => {
    const result = extractDomain('https://example.com');
    expect(result).toBe('example.com');
  });

  it('2. should extract domain from URL with subdomain', () => {
    const result = extractDomain('https://www.example.com');
    expect(result).toBe('example.com');
  });

  it('3. should extract domain from URL with multiple subdomains', () => {
    const result = extractDomain('https://api.v2.example.com');
    expect(result).toBe('example.com');
  });

  it('4. should extract domain from URL with path', () => {
    const result = extractDomain('https://www.example.com/path/to/page');
    expect(result).toBe('example.com');
  });

  it('5. should extract domain from URL with query', () => {
    const result = extractDomain('https://www.example.com?query=value');
    expect(result).toBe('example.com');
  });

  it('6. should extract domain from URL with hash', () => {
    const result = extractDomain('https://www.example.com#section');
    expect(result).toBe('example.com');
  });

  it('7. should handle .co.uk TLD', () => {
    const result = extractDomain('https://www.example.co.uk');
    expect(result).toBe('example.co.uk');
  });

  it('8. should handle .com.au TLD', () => {
    const result = extractDomain('https://subdomain.example.com.au/path');
    expect(result).toBe('example.com.au');
  });

  it('9. should handle .org.uk TLD', () => {
    const result = extractDomain('https://api.example.org.uk');
    expect(result).toBe('example.org.uk');
  });

  it('10. should handle single-part hostname', () => {
    const result = extractDomain('http://localhost');
    expect(result).toBe('localhost');
  });

  it('11. should throw TypeError for non-string URL', () => {
    const url = 123 as unknown as string;
    expect(() => extractDomain(url)).toThrow(TypeError);
    expect(() => extractDomain(url)).toThrow('url must be a string');
  });

  it('12. should throw Error for invalid URL', () => {
    expect(() => extractDomain('not a url')).toThrow('Invalid URL');
  });

  it('13. should throw Error for URL with protocol but empty hostname', () => {
    expect(() => extractDomain('http://')).toThrow(Error);
    expect(() => extractDomain('http://')).toThrow('Invalid URL');
  });

  it('14. should throw Error for URL with spaces', () => {
    expect(() => extractDomain('invalid url')).toThrow(Error);
    expect(() => extractDomain('invalid url')).toThrow('Invalid URL');
  });

  it('15. should extract domain from URL with port', () => {
    const result = extractDomain('http://www.example.com:8080');
    expect(result).toBe('example.com');
  });

  it('16. should handle IPv4 addresses', () => {
    const result = extractDomain('http://192.168.1.1');
    expect(result).toBe('192.168.1.1');
  });

  it('17. should handle IPv6 addresses', () => {
    const result = extractDomain('http://[2001:db8::1]');
    expect(result).toBe('[2001:db8::1]');
  });

  it('16. should handle .ac.uk TLD', () => {
    const result = extractDomain('https://www.university.ac.uk');
    expect(result).toBe('university.ac.uk');
  });

  it('17. should handle .gov.uk TLD', () => {
    const result = extractDomain('https://services.gov.uk');
    expect(result).toBe('services.gov.uk');
  });

  it('18. should handle nested subdomains with multi-part TLD', () => {
    const result = extractDomain('https://api.v1.service.example.co.uk');
    expect(result).toBe('example.co.uk');
  });

  it('19. should handle two-part domain', () => {
    const result = extractDomain('https://example.io');
    expect(result).toBe('example.io');
  });

  it('20. should handle complex URL with all components', () => {
    const result = extractDomain(
      'https://api.v2.example.com:443/api/users?id=1#section',
    );
    expect(result).toBe('example.com');
  });
});
