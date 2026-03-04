import { extractText } from '../src/extractText';

/**
 * Unit tests for the extractText function.
 */
describe('extractText', () => {
  // Normal usage tests
  it('1. should extract text from simple HTML', () => {
    // Arrange
    const html = '<p>Hello World</p>';
    const expected = 'Hello World';

    // Act
    const result = extractText(html);

    // Assert
    expect(result).toBe(expected);
  });

  it('2. should extract text from nested tags', () => {
    // Arrange
    const html = '<div>Hello <span>World</span>!</div>';
    const expected = 'Hello World !';

    // Act
    const result = extractText(html);

    // Assert
    expect(result).toBe(expected);
  });

  it('3. should remove script tags and content', () => {
    // Arrange
    const html = '<p>Visible</p><script>alert("Hidden")</script>';
    const expected = 'Visible';

    // Act
    const result = extractText(html);

    // Assert
    expect(result).toBe(expected);
  });

  it('4. should remove style tags and content', () => {
    // Arrange
    const html = '<p>Visible</p><style>.hidden { display: none; }</style>';
    const expected = 'Visible';

    // Act
    const result = extractText(html);

    // Assert
    expect(result).toBe(expected);
  });

  it('5. should remove HTML comments', () => {
    // Arrange
    const html = '<p>Visible</p><!-- Hidden comment -->';
    const expected = 'Visible';

    // Act
    const result = extractText(html);

    // Assert
    expect(result).toBe(expected);
  });

  it('6. should decode HTML entities', () => {
    // Arrange
    const html = '<p>&lt;div&gt; &amp; &quot;test&quot; &#39;</p>';
    const expected = '<div> & "test" \'';

    // Act
    const result = extractText(html);

    // Assert
    expect(result).toBe(expected);
  });

  it('7. should decode non-breaking spaces', () => {
    // Arrange
    const html = '<p>Hello&nbsp;World</p>';
    const expected = 'Hello World';

    // Act
    const result = extractText(html);

    // Assert
    expect(result).toBe(expected);
  });

  it('8. should collapse multiple spaces by default', () => {
    // Arrange
    const html = '<p>Hello    World</p>';
    const expected = 'Hello World';

    // Act
    const result = extractText(html);

    // Assert
    expect(result).toBe(expected);
  });

  it('9. should preserve whitespace when requested', () => {
    // Arrange
    const html = '<p>Line 1</p>\n<p>Line 2</p>';

    // Act
    const result = extractText(html, true);

    // Assert
    expect(result).toContain('Line 1');
    expect(result).toContain('Line 2');
  });

  it('10. should trim leading and trailing whitespace by default', () => {
    // Arrange
    const html = '   <p>Content</p>   ';
    const expected = 'Content';

    // Act
    const result = extractText(html);

    // Assert
    expect(result).toBe(expected);
  });

  // Edge cases
  it('11. should handle empty HTML string', () => {
    // Arrange
    const html = '';
    const expected = '';

    // Act
    const result = extractText(html);

    // Assert
    expect(result).toBe(expected);
  });

  it('12. should handle HTML with only tags', () => {
    // Arrange
    const html = '<div><span></span></div>';
    const expected = '';

    // Act
    const result = extractText(html);

    // Assert
    expect(result).toBe(expected);
  });

  it('13. should handle plain text without tags', () => {
    // Arrange
    const html = 'Plain text content';
    const expected = 'Plain text content';

    // Act
    const result = extractText(html);

    // Assert
    expect(result).toBe(expected);
  });

  it('14. should extract text from complex nested structure', () => {
    // Arrange
    const html = `
      <div>
        <header><h1>Title</h1></header>
        <main><p>Paragraph 1</p><p>Paragraph 2</p></main>
        <footer>Footer</footer>
      </div>
    `;

    // Act
    const result = extractText(html);

    // Assert
    expect(result).toContain('Title');
    expect(result).toContain('Paragraph 1');
    expect(result).toContain('Paragraph 2');
    expect(result).toContain('Footer');
  });

  it('15. should handle multiple script and style tags', () => {
    // Arrange
    const html = `
      <p>Visible</p>
      <script>alert(1)</script>
      <style>.class{}</style>
      <p>More visible</p>
      <script>console.log(2)</script>
    `;
    const expected = 'Visible More visible';

    // Act
    const result = extractText(html);

    // Assert
    expect(result).toBe(expected);
  });
});
