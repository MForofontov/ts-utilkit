import { sanitizeHTML } from '../src/sanitizeHTML';

/**
 * Unit tests for the sanitizeHTML function.
 */
describe('sanitizeHTML', () => {
  // Normal usage tests
  it('1. should allow safe HTML tags by default', () => {
    // Arrange
    const html = '<p>Safe <strong>content</strong></p>';
    const expected = '<p>Safe <strong>content</strong></p>';

    // Act
    const result = sanitizeHTML(html);

    // Assert
    expect(result).toBe(expected);
  });

  it('2. should remove script tags', () => {
    // Arrange
    const html = '<p>Safe</p><script>alert("XSS")</script>';
    const expected = '<p>Safe</p>';

    // Act
    const result = sanitizeHTML(html);

    // Assert
    expect(result).toBe(expected);
  });

  it('3. should remove style tags', () => {
    // Arrange
    const html = '<p>Safe</p><style>.hidden { display: none; }</style>';
    const expected = '<p>Safe</p>';

    // Act
    const result = sanitizeHTML(html);

    // Assert
    expect(result).toBe(expected);
  });

  it('4. should remove event handlers', () => {
    // Arrange
    const html = '<p onclick="alert(\'XSS\')">Click me</p>';

    // Act
    const result = sanitizeHTML(html);

    // Assert
    expect(result).not.toContain('onclick');
    expect(result).toContain('<p');
  });

  it('5. should remove javascript: URLs', () => {
    // Arrange
    const html = '<a href="javascript:alert(\'XSS\')">Link</a>';

    // Act
    const result = sanitizeHTML(html);

    // Assert
    expect(result).not.toContain('javascript:');
  });

  it('6. should remove dangerous tags', () => {
    // Arrange
    const html = '<p>Safe</p><iframe src="evil.com"></iframe>';
    const expected = '<p>Safe</p>';

    // Act
    const result = sanitizeHTML(html);

    // Assert
    expect(result).toBe(expected);
  });

  it('7. should allow custom tag whitelist', () => {
    // Arrange
    const html = '<div><p>Text</p><b>Bold</b></div>';
    const allowedTags = ['b'];
    const expected = 'Text<b>Bold</b>';

    // Act
    const result = sanitizeHTML(html, allowedTags);

    // Assert
    expect(result).toBe(expected);
  });

  it('8. should preserve allowed tags with attributes', () => {
    // Arrange
    const html = '<p class="text">Content</p>';

    // Act
    const result = sanitizeHTML(html);

    // Assert
    expect(result).toContain('<p');
    expect(result).toContain('class="text"');
  });

  it('9. should remove all event handlers from allowed tags', () => {
    // Arrange
    const html =
      '<div onload="alert(1)" onclick="alert(2)" onmouseover="alert(3)">Content</div>';

    // Act
    const result = sanitizeHTML(html);

    // Assert
    expect(result).not.toContain('onload');
    expect(result).not.toContain('onclick');
    expect(result).not.toContain('onmouseover');
    expect(result).toContain('<div');
  });

  it('10. should handle multiple script tags', () => {
    // Arrange
    const html = `
      <p>Safe</p>
      <script>alert(1)</script>
      <p>More safe</p>
      <script>alert(2)</script>
    `;

    // Act
    const result = sanitizeHTML(html);

    // Assert
    expect(result).not.toContain('script');
    expect(result).not.toContain('alert');
    expect(result).toContain('<p>Safe</p>');
    expect(result).toContain('<p>More safe</p>');
  });

  // Edge cases
  it('11. should handle empty HTML string', () => {
    // Arrange
    const html = '';
    const expected = '';

    // Act
    const result = sanitizeHTML(html);

    // Assert
    expect(result).toBe(expected);
  });

  it('12. should handle HTML with no tags', () => {
    // Arrange
    const html = 'Plain text content';
    const expected = 'Plain text content';

    // Act
    const result = sanitizeHTML(html);

    // Assert
    expect(result).toBe(expected);
  });

  it('13. should handle HTML with only dangerous tags', () => {
    // Arrange
    const html = '<script>alert(1)</script><style>.x{}</style>';
    const expected = '';

    // Act
    const result = sanitizeHTML(html);

    // Assert
    expect(result).toBe(expected);
  });

  it('14. should handle nested allowed tags', () => {
    // Arrange
    const html = '<div><p><span>Nested content</span></p></div>';

    // Act
    const result = sanitizeHTML(html);

    // Assert
    expect(result).toContain('<div>');
    expect(result).toContain('<p>');
    expect(result).toContain('<span>');
  });

  it('15. should remove all tags with empty whitelist', () => {
    // Arrange
    const html = '<p>Text</p><b>Bold</b>';
    const allowedTags: string[] = [];
    const expected = 'TextBold';

    // Act
    const result = sanitizeHTML(html, allowedTags);

    // Assert
    expect(result).toBe(expected);
  });

  it('16. should handle case-insensitive tag matching', () => {
    // Arrange
    const html = '<P>Upper</P><p>Lower</p>';

    // Act
    const result = sanitizeHTML(html);

    // Assert
    expect(result).toContain('Upper');
    expect(result).toContain('Lower');
  });

  it('17. should remove script tags with attributes', () => {
    // Arrange
    const html =
      '<script type="text/javascript" src="evil.js">alert(1)</script>';

    // Act
    const result = sanitizeHTML(html);

    // Assert
    expect(result).not.toContain('script');
    expect(result).not.toContain('evil.js');
  });

  // Error cases
  it('18. should throw TypeError when html is not a string', () => {
    // Arrange
    const html = 123 as unknown as string;
    const expectedMessage = 'html must be a string, got number';

    // Act & Assert
    expect(() => sanitizeHTML(html)).toThrow(TypeError);
    expect(() => sanitizeHTML(html)).toThrow(expectedMessage);
  });

  it('19. should throw TypeError when allowedTags is not an array', () => {
    // Arrange
    const html = '<p>Text</p>';
    const allowedTags = 'p' as unknown as string[];
    const expectedMessage = 'allowedTags must be an array';

    // Act & Assert
    expect(() => sanitizeHTML(html, allowedTags)).toThrow(TypeError);
    expect(() => sanitizeHTML(html, allowedTags)).toThrow(expectedMessage);
  });
});
