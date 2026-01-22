import { removeQueryParams } from '../src/removeQueryParams';

/**
 * Unit tests for the removeQueryParams function.
 */
describe('removeQueryParams', () => {
  it('1. should remove single query parameter', () => {
    const result = removeQueryParams('https://example.com?a=1&b=2', ['b']);
    expect(result).toBe('https://example.com/?a=1');
  });

  it('2. should remove multiple query parameters', () => {
    const result = removeQueryParams('https://example.com?a=1&b=2&c=3', [
      'a',
      'c',
    ]);
    expect(result).toBe('https://example.com/?b=2');
  });

  it('3. should remove all parameters', () => {
    const result = removeQueryParams('https://example.com?a=1&b=2', ['a', 'b']);
    expect(result).toBe('https://example.com/');
  });

  it('4. should handle non-existent parameter gracefully', () => {
    const result = removeQueryParams('https://example.com?a=1', ['b', 'c']);
    expect(result).toBe('https://example.com/?a=1');
  });

  it('5. should handle URL without query parameters', () => {
    const result = removeQueryParams('https://example.com', ['a']);
    expect(result).toBe('https://example.com/');
  });

  it('6. should preserve hash fragment', () => {
    const result = removeQueryParams('https://example.com?a=1&b=2#section', [
      'b',
    ]);
    expect(result).toContain('a=1');
    expect(result).toContain('#section');
    expect(result).not.toContain('b=2');
  });

  it('7. should throw TypeError for non-string URL', () => {
    const url = 123 as unknown as string;
    expect(() => removeQueryParams(url, ['a'])).toThrow(TypeError);
    expect(() => removeQueryParams(url, ['a'])).toThrow('url must be a string');
  });

  it('8. should throw TypeError for non-array keys', () => {
    const keys = 'string' as unknown as string[];
    expect(() => removeQueryParams('https://example.com', keys)).toThrow(
      TypeError,
    );
  });

  it('9. should throw Error for invalid URL', () => {
    expect(() => removeQueryParams('not a url', ['a'])).toThrow('Invalid URL');
  });

  it('10. should handle empty keys array', () => {
    const result = removeQueryParams('https://example.com?a=1&b=2', []);
    expect(result).toBe('https://example.com/?a=1&b=2');
  });

  it('11. should work with URL containing port', () => {
    const result = removeQueryParams('http://localhost:8080?a=1&b=2', ['b']);
    expect(result).toBe('http://localhost:8080/?a=1');
  });

  it('12. should work with URL containing path', () => {
    const result = removeQueryParams(
      'https://example.com/api/users?id=1&type=admin',
      ['type'],
    );
    expect(result).toBe('https://example.com/api/users?id=1');
  });

  it('13. should handle duplicate keys in removal list', () => {
    const result = removeQueryParams('https://example.com?a=1&b=2', [
      'a',
      'a',
      'a',
    ]);
    expect(result).toBe('https://example.com/?b=2');
  });

  it('14. should handle case-sensitive parameter names', () => {
    const result = removeQueryParams('https://example.com?A=1&a=2', ['A']);
    expect(result).toContain('a=2');
    expect(result).not.toContain('A=1');
  });

  it('15. should work with IPv4 URL', () => {
    const result = removeQueryParams('http://192.168.1.1?test=1&debug=true', [
      'debug',
    ]);
    expect(result).toBe('http://192.168.1.1/?test=1');
  });

  it('16. should work with IPv6 URL', () => {
    const result = removeQueryParams('http://[2001:db8::1]?a=1&b=2', ['b']);
    expect(result).toBe('http://[2001:db8::1]/?a=1');
  });

  it('17. should handle parameter with special characters', () => {
    const result = removeQueryParams(
      'https://example.com?message=hello+world&id=1',
      ['message'],
    );
    expect(result).toBe('https://example.com/?id=1');
  });

  it('18. should preserve order of remaining parameters', () => {
    const result = removeQueryParams('https://example.com?z=1&m=2&a=3', ['m']);
    const url = new URL(result);
    const params = Array.from(url.searchParams.keys());
    expect(params).toEqual(['z', 'a']);
  });

  it('19. should handle empty query string correctly', () => {
    const result = removeQueryParams('https://example.com?', ['a']);
    expect(result).toBe('https://example.com/');
  });

  it('20. should handle complex scenario', () => {
    const result = removeQueryParams(
      'https://example.com:443/path?a=1&b=2&c=3&d=4#hash',
      ['b', 'd', 'nonexistent'],
    );
    expect(result).toContain('a=1');
    expect(result).toContain('c=3');
    expect(result).not.toContain('b=2');
    expect(result).not.toContain('d=4');
    expect(result).toContain('#hash');
  });
});
