import { extractLinks } from '../src/extractLinks';

/**
 * Unit tests for the extractLinks function.
 */
describe('extractLinks', () => {
  // Normal usage tests
  it('1. should extract absolute URLs', () => {
    // Arrange
    const html = '<a href="https://example.com">Link</a>';
    const expected = ['https://example.com'];

    // Act
    const result = extractLinks(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('2. should extract multiple links', () => {
    // Arrange
    const html =
      '<a href="https://example.com">First</a><a href="https://test.com">Second</a>';
    const expected = ['https://example.com', 'https://test.com'];

    // Act
    const result = extractLinks(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('3. should extract relative URLs', () => {
    // Arrange
    const html = '<a href="/page">Link</a><a href="about.html">About</a>';
    const expected = ['/page', 'about.html'];

    // Act
    const result = extractLinks(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('4. should resolve relative URLs with base URL', () => {
    // Arrange
    const html = '<a href="/page">Link</a><a href="about.html">About</a>';
    const baseUrl = 'https://example.com';
    const expected = [
      'https://example.com/page',
      'https://example.com/about.html',
    ];

    // Act
    const result = extractLinks(html, baseUrl);

    // Assert
    expect(result).toEqual(expected);
  });

  it('5. should handle base URL with trailing slash', () => {
    // Arrange
    const html = '<a href="/page">Link</a>';
    const baseUrl = 'https://example.com/';
    const expected = ['https://example.com/page'];

    // Act
    const result = extractLinks(html, baseUrl);

    // Assert
    expect(result).toEqual(expected);
  });

  it('6. should not modify absolute URLs when base URL is provided', () => {
    // Arrange
    const html = '<a href="https://external.com/page">External</a>';
    const baseUrl = 'https://example.com';
    const expected = ['https://external.com/page'];

    // Act
    const result = extractLinks(html, baseUrl);

    // Assert
    expect(result).toEqual(expected);
  });

  it('7. should extract links with single quotes', () => {
    // Arrange
    const html = "<a href='/page'>Link</a>";
    const expected = ['/page'];

    // Act
    const result = extractLinks(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('8. should extract links with additional attributes', () => {
    // Arrange
    const html =
      '<a href="https://example.com" class="link" target="_blank">Link</a>';
    const expected = ['https://example.com'];

    // Act
    const result = extractLinks(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('9. should handle links with query parameters', () => {
    // Arrange
    const html =
      '<a href="https://example.com/page?id=123&category=test">Link</a>';
    const expected = ['https://example.com/page?id=123&category=test'];

    // Act
    const result = extractLinks(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('10. should handle links with fragments', () => {
    // Arrange
    const html = '<a href="https://example.com/page#section">Link</a>';
    const expected = ['https://example.com/page#section'];

    // Act
    const result = extractLinks(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Edge cases
  it('11. should return empty array when no links found', () => {
    // Arrange
    const html = '<div>No links here</div>';
    const expected: string[] = [];

    // Act
    const result = extractLinks(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('12. should handle empty HTML string', () => {
    // Arrange
    const html = '';
    const expected: string[] = [];

    // Act
    const result = extractLinks(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('13. should handle malformed anchor tags', () => {
    // Arrange
    const html = '<a>No href</a><a href="">Empty</a>';
    const expected: string[] = [];

    // Act
    const result = extractLinks(html);

    // Assert
    // Tags without href or with empty href don't match the regex pattern
    expect(result).toEqual(expected);
  });

  it('14. should extract links from nested HTML', () => {
    // Arrange
    const html =
      '<div><ul><li><a href="/page1">Link1</a></li><li><a href="/page2">Link2</a></li></ul></div>';
    const expected = ['/page1', '/page2'];

    // Act
    const result = extractLinks(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Error cases
  it('15. should throw TypeError when html is not a string', () => {
    // Arrange
    const html = 123 as unknown as string;
    const expectedMessage = 'html must be a string, got number';

    // Act & Assert
    expect(() => extractLinks(html)).toThrow(TypeError);
    expect(() => extractLinks(html)).toThrow(expectedMessage);
  });

  it('16. should throw TypeError when baseUrl is not a string', () => {
    // Arrange
    const html = '<a href="/page">Link</a>';
    const baseUrl = 123 as unknown as string;
    const expectedMessage = 'baseUrl must be a string, got number';

    // Act & Assert
    expect(() => extractLinks(html, baseUrl)).toThrow(TypeError);
    expect(() => extractLinks(html, baseUrl)).toThrow(expectedMessage);
  });
});
