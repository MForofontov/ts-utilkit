import { extractStyles } from '../src/extractStyles';

/**
 * Unit tests for the extractStyles function.
 */
describe('extractStyles', () => {
  // Test case 1: Extract inline CSS from style tag
  it('1. should extract inline CSS from style tag', () => {
    // Arrange
    const html = '<style>body { margin: 0; }</style>';
    const expected = [{ inline: 'body { margin: 0; }' }];

    // Act
    const result = extractStyles(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 2: Extract external stylesheet with href
  it('2. should extract external stylesheet with href', () => {
    // Arrange
    const html = '<link rel="stylesheet" href="styles.css">';
    const expected = [{ href: 'styles.css' }];

    // Act
    const result = extractStyles(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 3: Extract stylesheet with media attribute
  it('3. should extract stylesheet with media attribute', () => {
    // Arrange
    const html = '<link rel="stylesheet" href="print.css" media="print">';
    const expected = [{ href: 'print.css', media: 'print' }];

    // Act
    const result = extractStyles(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 4: Extract style tag with type attribute
  it('4. should extract style tag with type attribute', () => {
    // Arrange
    const html = '<style type="text/css">.class { color: red; }</style>';
    const expected = [{ inline: '.class { color: red; }' }];

    // Act
    const result = extractStyles(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 5: Extract style tag with media attribute
  it('5. should extract style tag with media attribute', () => {
    // Arrange
    const html = '<style media="screen">@media { }</style>';
    const expected = [{ inline: '@media { }', media: 'screen' }];

    // Act
    const result = extractStyles(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 6: Extract multiple style elements
  it('6. should extract multiple style elements', () => {
    // Arrange
    const html = `
      <style>.a { }</style>
      <link rel="stylesheet" href="main.css">
      <style>.b { }</style>
    `;
    const expected = [
      { href: 'main.css' },
      { inline: '.a { }' },
      { inline: '.b { }' },
    ];

    // Act
    const result = extractStyles(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 7: Ignore link tags with non-stylesheet rel
  it('7. should ignore link tags with non-stylesheet rel', () => {
    // Arrange
    const html = `
      <link rel="icon" href="favicon.ico">
      <link rel="stylesheet" href="styles.css">
      <link rel="preload" href="font.woff">
    `;
    const expected = [{ href: 'styles.css' }];

    // Act
    const result = extractStyles(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 8: Handle empty style tags
  it('8. should handle empty style tags', () => {
    // Arrange
    const html = '<style></style>';
    const expected = [{}];

    // Act
    const result = extractStyles(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 9: Extract multiline CSS
  it('9. should extract multiline CSS content', () => {
    // Arrange
    const html = `
      <style>
        body {
          margin: 0;
          padding: 0;
        }
      </style>
    `;
    const expected = [
      {
        inline:
          'body {\n          margin: 0;\n          padding: 0;\n        }',
      },
    ];

    // Act
    const result = extractStyles(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 10: Return empty array when no styles found
  it('10. should return empty array when no styles found', () => {
    // Arrange
    const html = '<div>No styles here</div>';
    const expected: ReturnType<typeof extractStyles> = [];

    // Act
    const result = extractStyles(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 11: Extract stylesheet with absolute URL
  it('11. should extract stylesheet with absolute URL', () => {
    // Arrange
    const html =
      '<link rel="stylesheet" href="https://cdn.example.com/style.css">';
    const expected = [
      {
        href: 'https://cdn.example.com/style.css',
      },
    ];

    // Act
    const result = extractStyles(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 12: Handle empty string input
  it('12. should return empty array for empty HTML', () => {
    // Arrange
    const html = '';
    const expected: ReturnType<typeof extractStyles> = [];

    // Act
    const result = extractStyles(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 13: Extract stylesheet with media query
  it('13. should extract stylesheet with complex media query', () => {
    // Arrange
    const html =
      '<link rel="stylesheet" href="responsive.css" media="screen and (max-width: 768px)">';
    const expected = [
      {
        href: 'responsive.css',
        media: 'screen and (max-width: 768px)',
      },
    ];

    // Act
    const result = extractStyles(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 14: Handle CSS with special characters
  it('14. should handle CSS with special characters', () => {
    // Arrange
    const html = '<style>.class::before { content: "<>"; }</style>';
    const expected = [
      {
        inline: '.class::before { content: "<>"; }',
      },
    ];

    // Act
    const result = extractStyles(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 15: Throw TypeError when html is not a string
  it('15. should throw TypeError when html is not a string', () => {
    // Arrange
    const invalidInput = 123 as unknown as string;
    const expectedMessage = 'html must be a string, got number';

    // Act & Assert
    expect(() => extractStyles(invalidInput)).toThrow(TypeError);
    expect(() => extractStyles(invalidInput)).toThrow(expectedMessage);
  });
});
