import { extractComments } from '../src/extractComments';

/**
 * Unit tests for the extractComments function.
 */
describe('extractComments', () => {
  // Test case 1: Extract single HTML comment
  it('1. should extract single HTML comment', () => {
    // Arrange
    const html = '<div><!-- This is a comment --></div>';
    const expected = [' This is a comment '];

    // Act
    const result = extractComments(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 2: Extract multiple HTML comments
  it('2. should extract multiple HTML comments', () => {
    // Arrange
    const html = `
      <!-- First comment -->
      <div>Content</div>
      <!-- Second comment -->
    `;
    const expected = [' First comment ', ' Second comment '];

    // Act
    const result = extractComments(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 3: Extract comments with special characters
  it('3. should extract comments with special characters', () => {
    // Arrange
    const html = '<!-- Comment with &amp; < > " symbols -->';
    const expected = [' Comment with &amp; < > " symbols '];

    // Act
    const result = extractComments(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 4: Extract comments without markers
  it('4. should extract comments without <!-- --> markers', () => {
    // Arrange
    const html = '<!-- Test comment -->';
    const expected = [' Test comment '];

    // Act
    const result = extractComments(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 5: Handle multiline comments
  it('5. should extract multiline comments', () => {
    // Arrange
    const html = `
      <!--
        This is a
        multiline
        comment
      -->
    `;
    const expected = [
      '\n        This is a\n        multiline\n        comment\n      ',
    ];

    // Act
    const result = extractComments(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 6: Return empty array when no comments found
  it('6. should return empty array when no comments found', () => {
    // Arrange
    const html = '<div>No comments here</div>';
    const expected: string[] = [];

    // Act
    const result = extractComments(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 7: Extract comments with nested HTML-like syntax
  it('7. should extract comments with nested HTML-like syntax', () => {
    // Arrange
    const html = '<!-- <div>This is inside a comment</div> -->';
    const expected = [' <div>This is inside a comment</div> '];

    // Act
    const result = extractComments(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 8: Handle empty comments
  it('8. should handle empty comments', () => {
    // Arrange
    const html = '<!---->';
    const expected = [''];

    // Act
    const result = extractComments(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 9: Extract comments from complex HTML
  it('9. should extract comments from complex HTML structure', () => {
    // Arrange
    const html = `
      <!DOCTYPE html>
      <!-- Header comment -->
      <html>
        <head><!-- Meta tags here --></head>
        <body>
          <div>Content</div>
          <!-- Footer comment -->
        </body>
      </html>
    `;
    const expected = [
      ' Header comment ',
      ' Meta tags here ',
      ' Footer comment ',
    ];

    // Act
    const result = extractComments(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 10: Handle empty string input
  it('10. should return empty array for empty HTML', () => {
    // Arrange
    const html = '';
    const expected: string[] = [];

    // Act
    const result = extractComments(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 11: Extract comments adjacent to content
  it('11. should extract comments adjacent to content', () => {
    // Arrange
    const html = 'Text<!-- Comment 1 -->More text<!-- Comment 2 -->';
    const expected = [' Comment 1 ', ' Comment 2 '];

    // Act
    const result = extractComments(html);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 12: Throw TypeError when html is not a string
  it('12. should throw TypeError when html is not a string', () => {
    // Arrange
    const invalidInput = 12345 as unknown as string;
    const expectedMessage = 'html must be a string, got number';

    // Act & Assert
    expect(() => extractComments(invalidInput)).toThrow(TypeError);
    expect(() => extractComments(invalidInput)).toThrow(expectedMessage);
  });
});
