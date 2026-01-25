import { extractMatches } from '../src/extractMatches';

/**
 * Unit tests for the extractMatches function.
 */
describe('extractMatches', () => {
  // Normal usage tests
  it('1. should extract all number matches', () => {
    // Arrange
    const text = 'Price: $99.99, Tax: $5.50';
    const pattern = /\$\d+\.\d+/g;
    const expected = ['$99.99', '$5.50'];

    // Act
    const result = extractMatches(text, pattern);

    // Assert
    expect(result).toEqual(expected);
  });

  it('2. should extract all word matches', () => {
    // Arrange
    const text = 'Hello World! How are you?';
    const pattern = /\w+/g;
    const expected = ['Hello', 'World', 'How', 'are', 'you'];

    // Act
    const result = extractMatches(text, pattern);

    // Assert
    expect(result).toEqual(expected);
  });

  it('3. should work with string pattern', () => {
    // Arrange
    const text = 'test123abc456def';
    const pattern = '\\d+';
    const expected = ['123', '456'];

    // Act
    const result = extractMatches(text, pattern, 'g');

    // Assert
    expect(result).toEqual(expected);
  });

  it('4. should extract email addresses', () => {
    // Arrange
    const text = 'Contact: john@example.com or jane@test.org';
    const pattern = /\S+@\S+\.\S+/g;
    const expected = ['john@example.com', 'jane@test.org'];

    // Act
    const result = extractMatches(text, pattern);

    // Assert
    expect(result).toEqual(expected);
  });

  it('5. should handle case-insensitive matching', () => {
    // Arrange
    const text = 'Test TEST test TeSt';
    const pattern = 'test';
    const expected = ['Test', 'TEST', 'test', 'TeSt'];

    // Act
    const result = extractMatches(text, pattern, 'gi');

    // Assert
    expect(result).toEqual(expected);
  });

  it('6. should automatically add global flag if missing', () => {
    // Arrange
    const text = 'abc abc abc';
    const pattern = /abc/; // No 'g' flag

    // Act
    const result = extractMatches(text, pattern);

    // Assert
    expect(result).toEqual(['abc', 'abc', 'abc']);
  });

  it('7. should extract matches with special characters', () => {
    // Arrange
    const text = 'Files: file.txt, data.csv, image.png';
    const pattern = /\w+\.\w+/g;
    const expected = ['file.txt', 'data.csv', 'image.png'];

    // Act
    const result = extractMatches(text, pattern);

    // Assert
    expect(result).toEqual(expected);
  });

  // Edge cases
  it('8. should return empty array when no matches found', () => {
    // Arrange
    const text = 'No numbers here';
    const pattern = /\d+/g;

    // Act
    const result = extractMatches(text, pattern);

    // Assert
    expect(result).toEqual([]);
  });

  it('9. should handle empty string', () => {
    // Arrange
    const text = '';
    const pattern = /\w+/g;

    // Act
    const result = extractMatches(text, pattern);

    // Assert
    expect(result).toEqual([]);
  });

  it('10. should extract single character matches', () => {
    // Arrange
    const text = 'a1b2c3';
    const pattern = /\d/g;
    const expected = ['1', '2', '3'];

    // Act
    const result = extractMatches(text, pattern);

    // Assert
    expect(result).toEqual(expected);
  });

  it('11. should handle overlapping pattern possibilities', () => {
    // Arrange
    const text = 'aaaa';
    const pattern = /aa/g;
    const expected = ['aa', 'aa']; // Non-overlapping matches

    // Act
    const result = extractMatches(text, pattern);

    // Assert
    expect(result).toEqual(expected);
  });

  it('12. should extract HTML tags', () => {
    // Arrange
    const text = '<div>Hello</div><span>World</span>';
    const pattern = /<[^>]+>/g;
    const expected = ['<div>', '</div>', '<span>', '</span>'];

    // Act
    const result = extractMatches(text, pattern);

    // Assert
    expect(result).toEqual(expected);
  });

  // Error cases
  it('13. should throw TypeError when text is not a string', () => {
    // Arrange
    const invalidText: any = 123;
    const pattern = /\d+/g;
    const expectedMessage = 'text must be a string, got number';

    // Act & Assert
    expect(() => extractMatches(invalidText, pattern)).toThrow(TypeError);
    expect(() => extractMatches(invalidText, pattern)).toThrow(expectedMessage);
  });

  it('14. should throw TypeError when pattern is invalid type', () => {
    // Arrange
    const text = 'test';
    const invalidPattern: any = 123;
    const expectedMessage = 'pattern must be a string or RegExp, got number';

    // Act & Assert
    expect(() => extractMatches(text, invalidPattern)).toThrow(TypeError);
    expect(() => extractMatches(text, invalidPattern)).toThrow(expectedMessage);
  });

  it('15. should throw TypeError when flags is not a string', () => {
    // Arrange
    const text = 'test';
    const pattern = 'test';
    const invalidFlags: any = 123;
    const expectedMessage = 'flags must be a string, got number';

    // Act & Assert
    expect(() => extractMatches(text, pattern, invalidFlags)).toThrow(
      TypeError,
    );
    expect(() => extractMatches(text, pattern, invalidFlags)).toThrow(
      expectedMessage,
    );
  });

  it('16. should throw Error when pattern is invalid regex', () => {
    // Arrange
    const text = 'test';
    const invalidPattern = '[unclosed';
    const expectedMessage = 'Invalid regular expression pattern: [unclosed';

    // Act & Assert
    expect(() => extractMatches(text, invalidPattern, 'g')).toThrow(Error);
    expect(() => extractMatches(text, invalidPattern, 'g')).toThrow(
      expectedMessage,
    );
  });
});
