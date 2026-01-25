import { extractMetaTags } from '../src/extractMetaTags';

/**
 * Unit tests for the extractMetaTags function.
 */
describe('extractMetaTags', () => {
  // Normal usage tests
  it('1. should extract meta tag with name attribute', () => {
    // Arrange
    const html = '<meta name="description" content="Example site">';
    const expected = [{ name: 'description', content: 'Example site' }];

    // Act
    const result = extractMetaTags(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('2. should extract meta tag with property attribute', () => {
    // Arrange
    const html = '<meta property="og:title" content="My Page">';
    const expected = [{ property: 'og:title', content: 'My Page' }];

    // Act
    const result = extractMetaTags(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('3. should extract multiple meta tags', () => {
    // Arrange
    const html = `
      <meta name="description" content="Site description">
      <meta name="keywords" content="html, web, scraping">
      <meta property="og:title" content="Page Title">
    `;
    const expected = [
      { name: 'description', content: 'Site description' },
      { name: 'keywords', content: 'html, web, scraping' },
      { property: 'og:title', content: 'Page Title' },
    ];

    // Act
    const result = extractMetaTags(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('4. should extract Open Graph tags', () => {
    // Arrange
    const html = `
      <meta property="og:title" content="My Page">
      <meta property="og:type" content="website">
      <meta property="og:url" content="https://example.com">
    `;
    const expected = [
      { property: 'og:title', content: 'My Page' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://example.com' },
    ];

    // Act
    const result = extractMetaTags(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('5. should extract Twitter Card tags', () => {
    // Arrange
    const html = `
      <meta name="twitter:card" content="summary">
      <meta name="twitter:site" content="@example">
    `;
    const expected = [
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@example' },
    ];

    // Act
    const result = extractMetaTags(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('6. should extract meta tags with both name and property', () => {
    // Arrange
    const html =
      '<meta name="author" property="article:author" content="John Doe">';
    const expected = [
      { name: 'author', property: 'article:author', content: 'John Doe' },
    ];

    // Act
    const result = extractMetaTags(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('7. should handle meta tags with single quotes', () => {
    // Arrange
    const html = "<meta name='description' content='Site description'>";
    const expected = [{ name: 'description', content: 'Site description' }];

    // Act
    const result = extractMetaTags(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('8. should extract charset meta tag', () => {
    // Arrange
    const html = '<meta charset="UTF-8">';

    // Act
    const result = extractMetaTags(html);

    // Assert
    // charset meta tags don't have content attribute, so they shouldn't be included
    expect(result).toEqual([]);
  });

  it('9. should extract viewport meta tag', () => {
    // Arrange
    const html =
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
    const expected = [
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    ];

    // Act
    const result = extractMetaTags(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('10. should handle meta tags with additional attributes', () => {
    // Arrange
    const html =
      '<meta name="description" content="Example" lang="en" data-custom="value">';
    const expected = [{ name: 'description', content: 'Example' }];

    // Act
    const result = extractMetaTags(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Edge cases
  it('11. should return empty array when no meta tags found', () => {
    // Arrange
    const html = '<div>No meta tags here</div>';
    const expected: never[] = [];

    // Act
    const result = extractMetaTags(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('12. should handle empty HTML string', () => {
    // Arrange
    const html = '';
    const expected: never[] = [];

    // Act
    const result = extractMetaTags(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('13. should ignore meta tags without content attribute', () => {
    // Arrange
    const html = '<meta name="description"><meta charset="UTF-8">';
    const expected: never[] = [];

    // Act
    const result = extractMetaTags(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('14. should extract meta tags from complete HTML document', () => {
    // Arrange
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="description" content="Page description">
        <meta property="og:title" content="Page Title">
        <title>Test Page</title>
      </head>
      <body>Content</body>
      </html>
    `;
    const expected = [
      { name: 'description', content: 'Page description' },
      { property: 'og:title', content: 'Page Title' },
    ];

    // Act
    const result = extractMetaTags(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Error cases
  it('15. should throw TypeError when html is not a string', () => {
    // Arrange
    const html = 123 as unknown as string;
    const expectedMessage = 'html must be a string, got number';

    // Act & Assert
    expect(() => extractMetaTags(html)).toThrow(TypeError);
    expect(() => extractMetaTags(html)).toThrow(expectedMessage);
  });
});
