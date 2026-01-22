import { getURLsFromText } from '../src/getURLsFromText';

/**
 * Unit tests for the getURLsFromText function.
 */
describe('getURLsFromText', () => {
  it('1. should extract single HTTP URL', () => {
    const text = 'Visit http://example.com for more info';
    const result = getURLsFromText(text);
    expect(result).toEqual(['http://example.com']);
  });

  it('2. should extract single HTTPS URL', () => {
    const text = 'Visit https://example.com for more info';
    const result = getURLsFromText(text);
    expect(result).toEqual(['https://example.com']);
  });

  it('3. should extract multiple URLs', () => {
    const text = 'Visit https://example.com and http://other.com';
    const result = getURLsFromText(text);
    expect(result).toEqual(['https://example.com', 'http://other.com']);
  });

  it('4. should extract URLs with paths', () => {
    const text = 'Check https://example.com/path/to/page';
    const result = getURLsFromText(text);
    expect(result).toEqual(['https://example.com/path/to/page']);
  });

  it('5. should extract URLs with query parameters', () => {
    const text = 'Search at https://example.com/search?q=test&lang=en';
    const result = getURLsFromText(text);
    expect(result).toEqual(['https://example.com/search?q=test&lang=en']);
  });

  it('6. should extract URLs with hashes', () => {
    const text = 'Go to https://example.com#section';
    const result = getURLsFromText(text);
    expect(result).toEqual(['https://example.com#section']);
  });

  it('7. should extract URLs with ports', () => {
    const text = 'Connect to http://localhost:8080';
    const result = getURLsFromText(text);
    expect(result).toEqual(['http://localhost:8080']);
  });

  it('8. should return empty array when no URLs found', () => {
    const text = 'This text has no URLs';
    const result = getURLsFromText(text);
    expect(result).toEqual([]);
  });

  it('9. should handle empty string', () => {
    const result = getURLsFromText('');
    expect(result).toEqual([]);
  });

  it('10. should throw TypeError for non-string input', () => {
    const input = 123 as unknown as string;
    expect(() => getURLsFromText(input)).toThrow(TypeError);
    expect(() => getURLsFromText(input)).toThrow('text must be a string');
  });

  it('11. should remove duplicate URLs', () => {
    const text = 'Visit https://example.com and https://example.com again';
    const result = getURLsFromText(text);
    expect(result).toEqual(['https://example.com']);
  });

  it('12. should extract www URLs', () => {
    const text = 'Check www.example.com for details';
    const result = getURLsFromText(text);
    expect(result).toEqual(['https://www.example.com']);
  });

  it('13. should extract FTP URLs', () => {
    const text = 'Download from ftp://ftp.example.com/file.zip';
    const result = getURLsFromText(text);
    expect(result).toEqual(['ftp://ftp.example.com/file.zip']);
  });

  it('14. should handle URLs at start and end of text', () => {
    const text = 'https://start.com text in middle http://end.com';
    const result = getURLsFromText(text);
    expect(result).toEqual(['https://start.com', 'http://end.com']);
  });

  it('15. should extract URLs from multiline text', () => {
    const text = `Line 1: https://example.com
    Line 2: http://other.com
    Line 3: www.another.com`;
    const result = getURLsFromText(text);
    expect(result).toEqual([
      'https://example.com',
      'http://other.com',
      'https://www.another.com',
    ]);
  });

  it('16. should handle URLs with authentication', () => {
    const text = 'Connect to https://user:pass@example.com';
    const result = getURLsFromText(text);
    expect(result).toEqual(['https://user:pass@example.com']);
  });

  it('17. should extract URLs with special TLDs', () => {
    const text = 'Visit https://example.co.uk and https://site.com.au';
    const result = getURLsFromText(text);
    expect(result).toEqual(['https://example.co.uk', 'https://site.com.au']);
  });

  it('18. should handle URLs in parentheses', () => {
    const text = 'See (https://example.com) for more';
    const result = getURLsFromText(text);
    expect(result).toEqual(['https://example.com']);
  });

  it('19. should extract IPv4 URLs', () => {
    const text = 'Server at http://192.168.1.1:8080';
    const result = getURLsFromText(text);
    expect(result).toEqual(['http://192.168.1.1:8080']);
  });

  it('20. should handle mixed protocol URLs', () => {
    const text =
      'HTTP: http://example.com, HTTPS: https://secure.com, FTP: ftp://files.com';
    const result = getURLsFromText(text);
    expect(result).toEqual([
      'http://example.com',
      'https://secure.com',
      'ftp://files.com',
    ]);
  });
});
