import { isValidRegex } from '../src/isValidRegex';

/**
 * Unit tests for the isValidRegex function.
 */
describe('isValidRegex', () => {
  // Test case 1: Valid simple patterns
  it('1. should return true for valid simple patterns', () => {
    // Arrange & Act & Assert
    expect(isValidRegex('^[a-z]+$')).toBe(true);
    expect(isValidRegex('\\d{3}-\\d{4}')).toBe(true);
    expect(isValidRegex('[0-9]+')).toBe(true);
    expect(isValidRegex('test')).toBe(true);
  });

  // Test case 2: Valid patterns with character classes
  it('2. should return true for valid character classes', () => {
    // Arrange & Act & Assert
    expect(isValidRegex('[a-zA-Z0-9]')).toBe(true);
    expect(isValidRegex('[^abc]')).toBe(true);
    expect(isValidRegex('[a-z&&[^bc]]')).toBe(true);
  });

  // Test case 3: Valid patterns with groups
  it('3. should return true for valid groups', () => {
    // Arrange & Act & Assert
    expect(isValidRegex('(abc)')).toBe(true);
    expect(isValidRegex('(?:non-capturing)')).toBe(true);
    expect(isValidRegex('(a|b|c)')).toBe(true);
  });

  // Test case 4: Valid patterns with quantifiers
  it('4. should return true for valid quantifiers', () => {
    // Arrange & Act & Assert
    expect(isValidRegex('a*')).toBe(true);
    expect(isValidRegex('a+')).toBe(true);
    expect(isValidRegex('a?')).toBe(true);
    expect(isValidRegex('a{3}')).toBe(true);
    expect(isValidRegex('a{2,5}')).toBe(true);
  });

  // Test case 5: Valid patterns with anchors
  it('5. should return true for valid anchors', () => {
    // Arrange & Act & Assert
    expect(isValidRegex('^start')).toBe(true);
    expect(isValidRegex('end$')).toBe(true);
    expect(isValidRegex('\\b\\w+\\b')).toBe(true);
  });

  // Test case 6: Valid patterns with flags
  it('6. should return true for valid patterns with flags', () => {
    // Arrange & Act & Assert
    expect(isValidRegex('[a-z]', 'i')).toBe(true);
    expect(isValidRegex('test', 'g')).toBe(true);
    expect(isValidRegex('.+', 'gim')).toBe(true);
  });

  // Test case 7: Invalid pattern - unclosed bracket
  it('7. should return false for unclosed bracket', () => {
    // Arrange & Act & Assert
    expect(isValidRegex('[unclosed')).toBe(false);
    expect(isValidRegex('test[abc')).toBe(false);
  });

  // Test case 8: Invalid pattern - unmatched parenthesis
  it('8. should return false for unmatched parenthesis', () => {
    // Arrange & Act & Assert
    expect(isValidRegex('(unmatched')).toBe(false);
    expect(isValidRegex('test(abc')).toBe(false);
    expect(isValidRegex(')no start')).toBe(false);
  });

  // Test case 9: Invalid pattern - unclosed character class
  it('9. should return false for unclosed character class', () => {
    // Arrange & Act & Assert
    expect(isValidRegex('[abc')).toBe(false);
    expect(isValidRegex('[a-z')).toBe(false);
  });

  // Test case 10: Invalid pattern - invalid group reference
  it('10. should return false for invalid named group references', () => {
    // Arrange & Act & Assert
    // Invalid named backreference (group doesn't exist)
    expect(isValidRegex('(?<name>test)\\k<invalid>')).toBe(false);
  });

  // Test case 11: Invalid flags
  it('11. should return false for invalid flags', () => {
    // Arrange & Act & Assert
    expect(isValidRegex('test', 'xyz')).toBe(false);
    expect(isValidRegex('[a-z]', 'q')).toBe(false);
  });

  // Test case 12: Empty pattern
  it('12. should return true for empty pattern', () => {
    // Arrange
    const pattern = '';

    // Act
    const result = isValidRegex(pattern);

    // Assert
    expect(result).toBe(true);
  });

  // Test case 13: Complex valid pattern
  it('13. should return true for complex valid patterns', () => {
    // Arrange & Act & Assert
    expect(
      isValidRegex(
        '^(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])$',
      ),
    ).toBe(true);
  });

  // Test case 14: Invalid lookahead syntax
  it('14. should return false for invalid lookahead', () => {
    // Arrange & Act & Assert
    expect(isValidRegex('(?<invalid')).toBe(false);
  });

  // Test case 15: Throw TypeError when pattern is not a string
  it('15. should throw TypeError when pattern is not a string', () => {
    // Arrange
    const invalidInput = 123 as unknown as string;
    const expectedMessage = 'pattern must be a string, got number';

    // Act & Assert
    expect(() => isValidRegex(invalidInput)).toThrow(TypeError);
    expect(() => isValidRegex(invalidInput)).toThrow(expectedMessage);
  });

  // Test case 16: Throw TypeError when flags is not a string
  it('16. should throw TypeError when flags is not a string', () => {
    // Arrange
    const pattern = 'test';
    const invalidFlags = 123 as unknown as string;
    const expectedMessage = 'flags must be a string, got number';

    // Act & Assert
    expect(() => isValidRegex(pattern, invalidFlags)).toThrow(TypeError);
    expect(() => isValidRegex(pattern, invalidFlags)).toThrow(expectedMessage);
  });
});
