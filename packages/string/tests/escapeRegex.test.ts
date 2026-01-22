import { escapeRegex } from '../src/escapeRegex';

/**
 * Unit tests for the escapeRegex function.
 */
describe('escapeRegex', () => {
  // Test case 1: Escape dots
  it('1. should escape dots correctly', () => {
    // Arrange
    const input = 'hello.world';
    const expected = 'hello\\.world';

    // Act
    const result = escapeRegex(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 2: Escape asterisks and plus signs
  it('2. should escape asterisks and plus signs', () => {
    // Arrange
    const input = 'test*+pattern';
    const expected = 'test\\*\\+pattern';

    // Act
    const result = escapeRegex(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 3: Escape parentheses and brackets
  it('3. should escape parentheses and brackets', () => {
    // Arrange
    const input = 'test (123) [abc]';
    const expected = 'test \\(123\\) \\[abc\\]';

    // Act
    const result = escapeRegex(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 4: Escape dollar signs and carets
  it('4. should escape dollar signs and carets', () => {
    // Arrange
    const input = 'price: $99^2';
    const expected = 'price: \\$99\\^2';

    // Act
    const result = escapeRegex(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 5: Escape curly braces
  it('5. should escape curly braces', () => {
    // Arrange
    const input = 'regex{3,5}';
    const expected = 'regex\\{3,5\\}';

    // Act
    const result = escapeRegex(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 6: Escape pipe and backslash
  it('6. should escape pipe and backslash', () => {
    // Arrange
    const input = 'a|b\\c';
    const expected = 'a\\|b\\\\c';

    // Act
    const result = escapeRegex(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 7: Escape forward slash
  it('7. should escape forward slash', () => {
    // Arrange
    const input = 'path/to/file';
    const expected = 'path\\/to\\/file';

    // Act
    const result = escapeRegex(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 8: Escape question mark
  it('8. should escape question mark', () => {
    // Arrange
    const input = 'what?';
    const expected = 'what\\?';

    // Act
    const result = escapeRegex(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 9: Handle string with no special characters
  it('9. should return unchanged string when no special characters', () => {
    // Arrange
    const input = 'hello world 123';
    const expected = 'hello world 123';

    // Act
    const result = escapeRegex(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 10: Escape all special characters together
  it('10. should escape all regex special characters', () => {
    // Arrange
    const input = '.*+?^${}()|[]\\';
    const expected = '\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\';

    // Act
    const result = escapeRegex(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 11: Handle empty string
  it('11. should handle empty string', () => {
    // Arrange
    const input = '';
    const expected = '';

    // Act
    const result = escapeRegex(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 12: Use escaped string in regex
  it('12. should create working regex from escaped string', () => {
    // Arrange
    const userInput = 'price: $99.99';
    const escaped = escapeRegex(userInput);
    const regex = new RegExp(escaped);

    // Act
    const result = regex.test('price: $99.99');

    // Assert
    expect(result).toBe(true);
  });

  // Test case 13: Escaped string should not match pattern
  it('13. should prevent wildcard matching after escaping', () => {
    // Arrange
    const input = 'test.*';
    const escaped = escapeRegex(input);
    const regex = new RegExp('^' + escaped + '$');

    // Act
    const matchExact = regex.test('test.*');
    const notMatchWildcard = regex.test('test123');

    // Assert
    expect(matchExact).toBe(true);
    expect(notMatchWildcard).toBe(false);
  });

  // Test case 14: Handle multiple consecutive special characters
  it('14. should escape multiple consecutive special characters', () => {
    // Arrange
    const input = '***+++???';
    const expected = '\\*\\*\\*\\+\\+\\+\\?\\?\\?';

    // Act
    const result = escapeRegex(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 15: Throw TypeError when input is not a string
  it('15. should throw TypeError when str is not a string', () => {
    // Arrange
    const invalidInput = 12345 as unknown as string;
    const expectedMessage = 'str must be a string, got number';

    // Act & Assert
    expect(() => escapeRegex(invalidInput)).toThrow(TypeError);
    expect(() => escapeRegex(invalidInput)).toThrow(expectedMessage);
  });
});
