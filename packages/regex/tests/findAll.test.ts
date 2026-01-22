import { findAll, MatchInfo } from '../src/findAll';

/**
 * Unit tests for the findAll function.
 */
describe('findAll', () => {
  // Normal usage tests
  it('1. should find all word positions', () => {
    // Arrange
    const text = 'The quick brown fox';
    const pattern = /\w+/g;

    // Act
    const result = findAll(text, pattern);

    // Assert
    expect(result).toHaveLength(4);
    expect(result[0]).toEqual({
      value: 'The',
      index: 0,
      endIndex: 3,
      length: 3,
    });
    expect(result[1]).toEqual({
      value: 'quick',
      index: 4,
      endIndex: 9,
      length: 5,
    });
    expect(result[2]).toEqual({
      value: 'brown',
      index: 10,
      endIndex: 15,
      length: 5,
    });
    expect(result[3]).toEqual({
      value: 'fox',
      index: 16,
      endIndex: 19,
      length: 3,
    });
  });

  it('2. should find number positions', () => {
    // Arrange
    const text = 'Room 101 and Room 202';
    const pattern = /\d+/g;

    // Act
    const result = findAll(text, pattern);

    // Assert
    expect(result).toEqual([
      { value: '101', index: 5, endIndex: 8, length: 3 },
      { value: '202', index: 18, endIndex: 21, length: 3 },
    ]);
  });

  it('3. should work with string pattern', () => {
    // Arrange
    const text = 'test test TEST';
    const pattern = 'test';

    // Act
    const result = findAll(text, pattern, 'gi');

    // Assert
    expect(result).toHaveLength(3);
    expect(result[0].index).toBe(0);
    expect(result[1].index).toBe(5);
    expect(result[2].index).toBe(10);
  });

  it('4. should find email positions', () => {
    // Arrange
    const text = 'Contact john@example.com or jane@test.org for info';
    const pattern = /\S+@\S+/g;

    // Act
    const result = findAll(text, pattern);

    // Assert
    expect(result).toHaveLength(2);
    expect(result[0].value).toBe('john@example.com');
    expect(result[0].index).toBe(8);
  });

  it('5. should find single character matches', () => {
    // Arrange
    const text = 'a,b,c,d';
    const pattern = /\w/g;

    // Act
    const result = findAll(text, pattern);

    // Assert
    expect(result).toHaveLength(4);
    expect(result.every((m) => m.length === 1)).toBe(true);
  });

  it('6. should automatically add global flag', () => {
    // Arrange
    const text = 'abc abc abc';
    const pattern = /abc/; // No 'g' flag

    // Act
    const result = findAll(text, pattern);

    // Assert
    expect(result).toHaveLength(3);
  });

  // Edge cases
  it('7. should return empty array when no matches', () => {
    // Arrange
    const text = 'No numbers here';
    const pattern = /\d+/g;

    // Act
    const result = findAll(text, pattern);

    // Assert
    expect(result).toEqual([]);
  });

  it('8. should handle empty string', () => {
    // Arrange
    const text = '';
    const pattern = /\w+/g;

    // Act
    const result = findAll(text, pattern);

    // Assert
    expect(result).toEqual([]);
  });

  it('9. should find matches at start and end', () => {
    // Arrange
    const text = 'start middle end';
    const pattern = /\w+/g;

    // Act
    const result = findAll(text, pattern);

    // Assert
    expect(result[0].index).toBe(0);
    expect(result[2].endIndex).toBe(text.length);
  });

  it('10. should handle consecutive matches', () => {
    // Arrange
    const text = 'aaabbbccc';
    const pattern = /\w+/g;

    // Act
    const result = findAll(text, pattern);

    // Assert
    expect(result).toHaveLength(1);
    expect(result[0].endIndex).toBe(9);
  });

  // Error cases
  it('11. should throw TypeError when text is not a string', () => {
    // Arrange
    const invalidText: any = [];
    const pattern = /\w+/g;
    const expectedMessage = 'text must be a string, got object';

    // Act & Assert
    expect(() => findAll(invalidText, pattern)).toThrow(TypeError);
    expect(() => findAll(invalidText, pattern)).toThrow(expectedMessage);
  });

  it('12. should throw TypeError when pattern is invalid type', () => {
    // Arrange
    const text = 'test';
    const invalidPattern: any = 123;
    const expectedMessage = 'pattern must be a string or RegExp, got number';

    // Act & Assert
    expect(() => findAll(text, invalidPattern)).toThrow(TypeError);
    expect(() => findAll(text, invalidPattern)).toThrow(expectedMessage);
  });

  it('13. should throw TypeError when flags is not a string', () => {
    // Arrange
    const text = 'test';
    const pattern = 'test';
    const invalidFlags: any = {};
    const expectedMessage = 'flags must be a string, got object';

    // Act & Assert
    expect(() => findAll(text, pattern, invalidFlags)).toThrow(TypeError);
    expect(() => findAll(text, pattern, invalidFlags)).toThrow(expectedMessage);
  });

  it('14. should throw Error when pattern is invalid', () => {
    // Arrange
    const text = 'test';
    const invalidPattern = '[unclosed';
    const expectedMessage = 'Invalid regular expression pattern: [unclosed';

    // Act & Assert
    expect(() => findAll(text, invalidPattern, 'g')).toThrow(Error);
    expect(() => findAll(text, invalidPattern, 'g')).toThrow(expectedMessage);
  });
});
