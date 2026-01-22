import { extractHeaders } from '../src/extractHeaders';

/**
 * Unit tests for the extractHeaders function.
 */
describe('extractHeaders', () => {
  // Normal usage tests
  it('1. should extract H1 headers', () => {
    // Arrange
    const html = '<h1>Main Title</h1>';
    const expected = [{ level: 1, text: 'Main Title' }];

    // Act
    const result = extractHeaders(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('2. should extract multiple header levels', () => {
    // Arrange
    const html = '<h1>Title</h1><h2>Section</h2><h3>Subsection</h3>';
    const expected = [
      { level: 1, text: 'Title' },
      { level: 2, text: 'Section' },
      { level: 3, text: 'Subsection' },
    ];

    // Act
    const result = extractHeaders(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('3. should extract header with id attribute', () => {
    // Arrange
    const html = '<h2 id="intro">Introduction</h2>';
    const expected = [{ level: 2, text: 'Introduction', id: 'intro' }];

    // Act
    const result = extractHeaders(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('4. should exclude id when includeAttributes is false', () => {
    // Arrange
    const html = '<h2 id="intro">Introduction</h2>';
    const expected = [{ level: 2, text: 'Introduction' }];

    // Act
    const result = extractHeaders(html, false);

    // Assert
    expect(result).toEqual(expected);
  });

  it('5. should clean nested tags from header text', () => {
    // Arrange
    const html = '<h1>Title with <span>nested</span> tags</h1>';
    const expected = [{ level: 1, text: 'Title with nested tags' }];

    // Act
    const result = extractHeaders(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('6. should decode HTML entities', () => {
    // Arrange
    const html = '<h1>Title &amp; Subtitle</h1>';
    const expected = [{ level: 1, text: 'Title & Subtitle' }];

    // Act
    const result = extractHeaders(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('7. should extract all header levels H1-H6', () => {
    // Arrange
    const html = `
      <h1>H1</h1><h2>H2</h2><h3>H3</h3>
      <h4>H4</h4><h5>H5</h5><h6>H6</h6>
    `;
    const expected = [
      { level: 1, text: 'H1' },
      { level: 2, text: 'H2' },
      { level: 3, text: 'H3' },
      { level: 4, text: 'H4' },
      { level: 5, text: 'H5' },
      { level: 6, text: 'H6' },
    ];

    // Act
    const result = extractHeaders(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('8. should handle headers with class attributes', () => {
    // Arrange
    const html = '<h1 class="main-title" id="title">Main</h1>';
    const expected = [{ level: 1, text: 'Main', id: 'title' }];

    // Act
    const result = extractHeaders(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('9. should collapse multiple spaces', () => {
    // Arrange
    const html = '<h1>Title    with     spaces</h1>';
    const expected = [{ level: 1, text: 'Title with spaces' }];

    // Act
    const result = extractHeaders(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('10. should handle non-breaking spaces', () => {
    // Arrange
    const html = '<h1>Title&nbsp;with&nbsp;nbsp</h1>';
    const expected = [{ level: 1, text: 'Title with nbsp' }];

    // Act
    const result = extractHeaders(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Edge cases
  it('11. should return empty array when no headers found', () => {
    // Arrange
    const html = '<p>No headers here</p>';
    const expected: never[] = [];

    // Act
    const result = extractHeaders(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('12. should handle empty HTML string', () => {
    // Arrange
    const html = '';
    const expected: never[] = [];

    // Act
    const result = extractHeaders(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('13. should handle empty header tags', () => {
    // Arrange
    const html = '<h1></h1><h2>   </h2>';
    const expected = [
      { level: 1, text: '' },
      { level: 2, text: '' },
    ];

    // Act
    const result = extractHeaders(html);

    // Assert
    expect(result).toEqual(expected);
  });

  it('14. should handle headers without id attribute', () => {
    // Arrange
    const html = '<h1>No ID</h1>';
    const expected = [{ level: 1, text: 'No ID' }];

    // Act
    const result = extractHeaders(html);

    // Assert
    expect(result).toEqual(expected);
    expect(result[0]).not.toHaveProperty('id');
  });

  it('15. should extract headers from complex HTML', () => {
    // Arrange
    const html = `
      <div>
        <header>
          <h1 id="main">Main Title</h1>
        </header>
        <main>
          <h2 id="section1">Section 1</h2>
          <p>Content</p>
          <h2 id="section2">Section 2</h2>
        </main>
      </div>
    `;

    // Act
    const result = extractHeaders(html);

    // Assert
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({ level: 1, text: 'Main Title', id: 'main' });
    expect(result[1]).toEqual({ level: 2, text: 'Section 1', id: 'section1' });
    expect(result[2]).toEqual({ level: 2, text: 'Section 2', id: 'section2' });
  });

  // Error cases
  it('16. should throw TypeError when html is not a string', () => {
    // Arrange
    const html = 123 as unknown as string;
    const expectedMessage = 'html must be a string, got number';

    // Act & Assert
    expect(() => extractHeaders(html)).toThrow(TypeError);
    expect(() => extractHeaders(html)).toThrow(expectedMessage);
  });

  it('17. should throw TypeError when includeAttributes is not a boolean', () => {
    // Arrange
    const html = '<h1>Title</h1>';
    const includeAttributes = 'true' as unknown as boolean;
    const expectedMessage = 'includeAttributes must be a boolean, got string';

    // Act & Assert
    expect(() => extractHeaders(html, includeAttributes)).toThrow(TypeError);
    expect(() => extractHeaders(html, includeAttributes)).toThrow(
      expectedMessage,
    );
  });
});
