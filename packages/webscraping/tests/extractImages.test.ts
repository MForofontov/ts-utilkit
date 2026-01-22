import { extractImages } from '../src/extractImages';

/**
 * Unit tests for the extractImages function.
 */
describe('extractImages', () => {
  // Normal usage tests
  it('1. should extract absolute image URLs', () => {
    // Arrange
    const html = '<img src="https://example.com/image.jpg">';
    const expected = ['https://example.com/image.jpg'];

    // Act
    const result = extractImages(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('2. should extract multiple images', () => {
    // Arrange
    const html =
      '<img src="https://example.com/img1.jpg"><img src="https://example.com/img2.png">';
    const expected = [
      'https://example.com/img1.jpg',
      'https://example.com/img2.png',
    ];

    // Act
    const result = extractImages(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('3. should extract relative image URLs', () => {
    // Arrange
    const html = '<img src="/images/logo.png"><img src="photo.jpg">';
    const expected = ['/images/logo.png', 'photo.jpg'];

    // Act
    const result = extractImages(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('4. should resolve relative URLs with base URL', () => {
    // Arrange
    const html = '<img src="/images/logo.png"><img src="photo.jpg">';
    const baseUrl = 'https://example.com';
    const expected = [
      'https://example.com/images/logo.png',
      'https://example.com/photo.jpg',
    ];

    // Act
    const result = extractImages(html, baseUrl);

    // Assert
    expect(result).toEqual(expected);
  });

  it('5. should handle base URL with trailing slash', () => {
    // Arrange
    const html = '<img src="/logo.png">';
    const baseUrl = 'https://example.com/';
    const expected = ['https://example.com/logo.png'];

    // Act
    const result = extractImages(html, baseUrl);

    // Assert
    expect(result).toEqual(expected);
  });

  it('6. should not modify absolute URLs when base URL is provided', () => {
    // Arrange
    const html = '<img src="https://cdn.com/image.jpg">';
    const baseUrl = 'https://example.com';
    const expected = ['https://cdn.com/image.jpg'];

    // Act
    const result = extractImages(html, baseUrl);

    // Assert
    expect(result).toEqual(expected);
  });

  it('7. should handle data URIs', () => {
    // Arrange
    const html =
      '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA">';
    const expected = ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA'];

    // Act
    const result = extractImages(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('8. should not modify data URIs with base URL', () => {
    // Arrange
    const html =
      '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA">';
    const baseUrl = 'https://example.com';
    const expected = ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA'];

    // Act
    const result = extractImages(html, baseUrl);

    // Assert
    expect(result).toEqual(expected);
  });

  it('9. should extract images with single quotes', () => {
    // Arrange
    const html = "<img src='/logo.png'>";
    const expected = ['/logo.png'];

    // Act
    const result = extractImages(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('10. should extract images with additional attributes', () => {
    // Arrange
    const html =
      '<img src="https://example.com/logo.png" alt="Logo" class="header-logo">';
    const expected = ['https://example.com/logo.png'];

    // Act
    const result = extractImages(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Edge cases
  it('11. should return empty array when no images found', () => {
    // Arrange
    const html = '<div>No images here</div>';
    const expected: string[] = [];

    // Act
    const result = extractImages(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('12. should handle empty HTML string', () => {
    // Arrange
    const html = '';
    const expected: string[] = [];

    // Act
    const result = extractImages(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('13. should handle malformed img tags', () => {
    // Arrange
    const html = '<img><img src="">';
    const expected: string[] = [];

    // Act
    const result = extractImages(html);

    // Assert
    // Tags without src or with empty src don't match the regex pattern
    expect(result).toEqual(expected);
  });

  it('14. should extract images from nested HTML', () => {
    // Arrange
    const html =
      '<div><figure><img src="/img1.jpg"></figure><figure><img src="/img2.jpg"></figure></div>';
    const expected = ['/img1.jpg', '/img2.jpg'];

    // Act
    const result = extractImages(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Error cases
  it('15. should throw TypeError when html is not a string', () => {
    // Arrange
    const html = 123 as unknown as string;
    const expectedMessage = 'html must be a string, got number';

    // Act & Assert
    expect(() => extractImages(html)).toThrow(TypeError);
    expect(() => extractImages(html)).toThrow(expectedMessage);
  });

  it('16. should throw TypeError when baseUrl is not a string', () => {
    // Arrange
    const html = '<img src="/logo.png">';
    const baseUrl = 123 as unknown as string;
    const expectedMessage = 'baseUrl must be a string, got number';

    // Act & Assert
    expect(() => extractImages(html, baseUrl)).toThrow(TypeError);
    expect(() => extractImages(html, baseUrl)).toThrow(expectedMessage);
  });
});
