import { getDomainParts } from '../src/getDomainParts';

/**
 * Unit tests for the getDomainParts function.
 */
describe('getDomainParts', () => {
  it('1. should parse basic domain', () => {
    const result = getDomainParts('https://example.com');
    expect(result).toEqual({
      subdomain: '',
      domain: 'example',
      tld: 'com',
      hostname: 'example.com',
    });
  });

  it('2. should parse domain with subdomain', () => {
    const result = getDomainParts('https://www.example.com');
    expect(result).toEqual({
      subdomain: 'www',
      domain: 'example',
      tld: 'com',
      hostname: 'www.example.com',
    });
  });

  it('3. should parse domain with multiple subdomains', () => {
    const result = getDomainParts('https://api.v2.example.com');
    expect(result).toEqual({
      subdomain: 'api.v2',
      domain: 'example',
      tld: 'com',
      hostname: 'api.v2.example.com',
    });
  });

  it('4. should parse domain with .co.uk TLD', () => {
    const result = getDomainParts('https://www.example.co.uk');
    expect(result).toEqual({
      subdomain: 'www',
      domain: 'example',
      tld: 'co.uk',
      hostname: 'www.example.co.uk',
    });
  });

  it('5. should parse domain with .com.au TLD', () => {
    const result = getDomainParts('https://subdomain.example.com.au');
    expect(result).toEqual({
      subdomain: 'subdomain',
      domain: 'example',
      tld: 'com.au',
      hostname: 'subdomain.example.com.au',
    });
  });

  it('6. should parse domain with .org.uk TLD', () => {
    const result = getDomainParts('https://api.example.org.uk');
    expect(result).toEqual({
      subdomain: 'api',
      domain: 'example',
      tld: 'org.uk',
      hostname: 'api.example.org.uk',
    });
  });

  it('7. should handle single-part hostname', () => {
    const result = getDomainParts('http://localhost');
    expect(result).toEqual({
      subdomain: '',
      domain: 'localhost',
      tld: '',
      hostname: 'localhost',
    });
  });

  it('8. should throw TypeError for non-string URL', () => {
    const url = 123 as unknown as string;
    expect(() => getDomainParts(url)).toThrow(TypeError);
    expect(() => getDomainParts(url)).toThrow('url must be a string');
  });

  it('9. should throw Error for invalid URL', () => {
    expect(() => getDomainParts('not a url')).toThrow('Invalid URL');
  });

  it('10. should throw Error for URL with protocol but empty hostname', () => {
    expect(() => getDomainParts('http://')).toThrow(Error);
    expect(() => getDomainParts('http://')).toThrow('Invalid URL');
  });

  it('11. should throw Error for URL with spaces', () => {
    expect(() => getDomainParts('invalid url')).toThrow(Error);
    expect(() => getDomainParts('invalid url')).toThrow('Invalid URL');
  });

  it('12. should handle URL with path', () => {
    const result = getDomainParts('https://www.example.com/path/to/page');
    expect(result).toEqual({
      subdomain: 'www',
      domain: 'example',
      tld: 'com',
      hostname: 'www.example.com',
    });
  });

  it('11. should handle URL with query', () => {
    const result = getDomainParts('https://www.example.com?query=value');
    expect(result).toEqual({
      subdomain: 'www',
      domain: 'example',
      tld: 'com',
      hostname: 'www.example.com',
    });
  });

  it('12. should handle URL with hash', () => {
    const result = getDomainParts('https://www.example.com#section');
    expect(result).toEqual({
      subdomain: 'www',
      domain: 'example',
      tld: 'com',
      hostname: 'www.example.com',
    });
  });

  it('13. should handle URL with port', () => {
    const result = getDomainParts('http://www.example.com:8080');
    expect(result).toEqual({
      subdomain: 'www',
      domain: 'example',
      tld: 'com',
      hostname: 'www.example.com',
    });
  });

  it('14. should handle IPv4 address', () => {
    const result = getDomainParts('http://192.168.1.1');
    expect(result).toEqual({
      subdomain: '',
      domain: '192.168.1.1',
      tld: '',
      hostname: '192.168.1.1',
    });
  });

  it('15. should handle IPv6 address', () => {
    const result = getDomainParts('http://[2001:db8::1]');
    expect(result).toEqual({
      subdomain: '',
      domain: '[2001:db8::1]',
      tld: '',
      hostname: '[2001:db8::1]',
    });
  });

  it('16. should handle .ac.uk TLD', () => {
    const result = getDomainParts('https://www.university.ac.uk');
    expect(result).toEqual({
      subdomain: 'www',
      domain: 'university',
      tld: 'ac.uk',
      hostname: 'www.university.ac.uk',
    });
  });

  it('17. should handle deeply nested subdomains', () => {
    const result = getDomainParts('https://a.b.c.example.com');
    expect(result).toEqual({
      subdomain: 'a.b.c',
      domain: 'example',
      tld: 'com',
      hostname: 'a.b.c.example.com',
    });
  });

  it('18. should handle two-part domain', () => {
    const result = getDomainParts('https://example.io');
    expect(result).toEqual({
      subdomain: '',
      domain: 'example',
      tld: 'io',
      hostname: 'example.io',
    });
  });

  it('19. should handle .gov.uk TLD', () => {
    const result = getDomainParts('https://services.gov.uk');
    expect(result).toEqual({
      subdomain: '',
      domain: 'services',
      tld: 'gov.uk',
      hostname: 'services.gov.uk',
    });
  });

  it('20. should handle complex URL', () => {
    const result = getDomainParts(
      'https://api.v2.example.com:443/api/users?id=1#section',
    );
    expect(result).toEqual({
      subdomain: 'api.v2',
      domain: 'example',
      tld: 'com',
      hostname: 'api.v2.example.com',
    });
  });
});
