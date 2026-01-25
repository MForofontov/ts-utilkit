import { addQueryParams } from '../src/addQueryParams';

/**
 * Unit tests for the addQueryParams function.
 */
describe('addQueryParams', () => {
  // Test case 1: Add single parameter to URL without query
  it('1. should add single query parameter', () => {
    const result = addQueryParams('https://example.com', { token: 'abc123' });
    expect(result).toBe('https://example.com/?token=abc123');
  });

  // Test case 2: Add multiple parameters
  it('2. should add multiple query parameters', () => {
    const result = addQueryParams('https://example.com/api', {
      page: 1,
      limit: 10,
    });
    expect(result).toContain('page=1');
    expect(result).toContain('limit=10');
  });

  // Test case 3: Update existing parameter
  it('3. should update existing query parameter', () => {
    const result = addQueryParams('https://example.com?page=1', { page: 2 });
    expect(result).toBe('https://example.com/?page=2');
  });

  // Test case 4: Add to URL with existing parameters
  it('4. should add parameter to URL with existing query', () => {
    const result = addQueryParams('https://example.com?a=1', { b: 2 });
    expect(result).toContain('a=1');
    expect(result).toContain('b=2');
  });

  // Test case 5: Handle boolean values
  it('5. should handle boolean parameter values', () => {
    const result = addQueryParams('https://example.com', { active: true });
    expect(result).toBe('https://example.com/?active=true');
  });

  // Test case 6: Handle number values
  it('6. should handle numeric parameter values', () => {
    const result = addQueryParams('https://example.com', { id: 42, count: 0 });
    expect(result).toContain('id=42');
    expect(result).toContain('count=0');
  });

  // Test case 7: Handle URL with hash
  it('7. should preserve hash fragment', () => {
    const result = addQueryParams('https://example.com#section', { a: 1 });
    expect(result).toContain('a=1');
    expect(result).toContain('#section');
  });

  // Test case 8: Handle URL with port
  it('8. should work with URL including port', () => {
    const result = addQueryParams('http://localhost:8080', { debug: true });
    expect(result).toBe('http://localhost:8080/?debug=true');
  });

  // Test case 9: Handle special characters in values
  it('9. should encode special characters in values', () => {
    const result = addQueryParams('https://example.com', {
      message: 'hello world',
    });
    expect(result).toContain('message=hello+world');
  });

  // Test case 10: Empty params object
  it('10. should handle empty params object', () => {
    const result = addQueryParams('https://example.com?a=1', {});
    expect(result).toBe('https://example.com/?a=1');
  });

  // Test case 11: Update multiple existing parameters
  it('11. should update multiple existing parameters', () => {
    const result = addQueryParams('https://example.com?a=1&b=2&c=3', {
      a: 10,
      c: 30,
    });
    expect(result).toContain('a=10');
    expect(result).toContain('b=2');
    expect(result).toContain('c=30');
  });

  // Test case 12: URL with path
  it('12. should work with URL containing path', () => {
    const result = addQueryParams('https://example.com/api/users', { id: 1 });
    expect(result).toBe('https://example.com/api/users?id=1');
  });

  // Test case 13: IPv4 URL
  it('13. should work with IPv4 URL', () => {
    const result = addQueryParams('http://192.168.1.1', { test: 'value' });
    expect(result).toBe('http://192.168.1.1/?test=value');
  });

  // Test case 14: IPv6 URL
  it('14. should work with IPv6 URL', () => {
    const result = addQueryParams('http://[2001:db8::1]', { param: 'val' });
    expect(result).toBe('http://[2001:db8::1]/?param=val');
  });

  // Test case 15: Complex scenario with all features
  it('15. should handle complex scenario', () => {
    const result = addQueryParams(
      'https://example.com:443/path?existing=1#hash',
      {
        new: 'param',
        existing: 'updated',
      },
    );
    expect(result).toContain('existing=updated');
    expect(result).toContain('new=param');
    expect(result).toContain('#hash');
  });

  // Test case 16: Error case - non-string URL
  it('16. should throw TypeError for non-string URL', () => {
    const url = 123 as unknown as string;
    expect(() => addQueryParams(url, { a: 1 })).toThrow(TypeError);
    expect(() => addQueryParams(url, { a: 1 })).toThrow('url must be a string');
  });

  // Test case 17: Error case - non-object params
  it('17. should throw TypeError for non-object params', () => {
    const params = 'string' as unknown as Record<string, string>;
    expect(() => addQueryParams('https://example.com', params)).toThrow(
      TypeError,
    );
  });

  // Test case 18: Error case - array params
  it('18. should throw TypeError for array params', () => {
    const params = ['a', 'b'] as unknown as Record<string, string>;
    expect(() => addQueryParams('https://example.com', params)).toThrow(
      TypeError,
    );
  });

  // Test case 19: Error case - null params
  it('19. should throw TypeError for null params', () => {
    const params = null as unknown as Record<string, string>;
    expect(() => addQueryParams('https://example.com', params)).toThrow(
      TypeError,
    );
  });

  // Test case 20: Error case - invalid URL
  it('20. should throw Error for invalid URL', () => {
    expect(() => addQueryParams('not a url', { a: 1 })).toThrow('Invalid URL');
  });
});
