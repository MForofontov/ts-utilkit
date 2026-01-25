import { parseKeyValue } from '../src/parseKeyValue';

/**
 * Unit tests for the parseKeyValue function.
 */
describe('parseKeyValue', () => {
  // Test case 1: Parse basic key-value pairs
  it('1. should parse basic key-value pairs', () => {
    // Arrange
    const input = 'name=John;age=30';
    const expected = { name: 'John', age: '30' };

    // Act
    const result = parseKeyValue(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 2: Parse with custom delimiters
  it('2. should parse with custom delimiters', () => {
    // Arrange
    const input = 'name:John,age:30';
    const expected = { name: 'John', age: '30' };

    // Act
    const result = parseKeyValue(input, ',', ':');

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 3: Trim whitespace from keys and values
  it('3. should trim whitespace from keys and values', () => {
    // Arrange
    const input = 'name = John ; age = 30';
    const expected = { name: 'John', age: '30' };

    // Act
    const result = parseKeyValue(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 4: Handle empty values
  it('4. should handle empty values', () => {
    // Arrange
    const input = 'key1=;key2=value2';
    const expected = { key1: '', key2: 'value2' };

    // Act
    const result = parseKeyValue(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 5: Last value wins for duplicate keys
  it('5. should use last value for duplicate keys', () => {
    // Arrange
    const input = 'key=first;key=second';
    const expected = { key: 'second' };

    // Act
    const result = parseKeyValue(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 6: Skip empty pairs
  it('6. should skip empty pairs', () => {
    // Arrange
    const input = 'key1=value1;;key2=value2';
    const expected = { key1: 'value1', key2: 'value2' };

    // Act
    const result = parseKeyValue(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 7: Handle single key-value pair
  it('7. should handle single key-value pair', () => {
    // Arrange
    const input = 'key=value';
    const expected = { key: 'value' };

    // Act
    const result = parseKeyValue(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 8: Handle values with special characters
  it('8. should handle values with special characters', () => {
    // Arrange
    const input = 'url=https://example.com;path=/home';
    const expected = { url: 'https://example.com', path: '/home' };

    // Act
    const result = parseKeyValue(input);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 9: Throw TypeError for non-string input
  it('9. should throw TypeError when input is not a string', () => {
    // Arrange
    const input = 123 as unknown as string;

    // Act & Assert
    expect(() => parseKeyValue(input)).toThrow(TypeError);
    expect(() => parseKeyValue(input)).toThrow('input must be a string');
  });

  // Test case 10: Throw TypeError for non-string delimiters
  it('10. should throw TypeError when pairDelimiter is not a string', () => {
    // Arrange
    const input = 'key=value';
    const delimiter = 123 as unknown as string;

    // Act & Assert
    expect(() => parseKeyValue(input, delimiter)).toThrow(TypeError);
    expect(() => parseKeyValue(input, delimiter)).toThrow(
      'pairDelimiter must be a string',
    );
  });

  // Test case 11: Throw Error for empty input
  it('11. should throw Error when input is empty', () => {
    // Arrange
    const input = '';

    // Act & Assert
    expect(() => parseKeyValue(input)).toThrow(Error);
    expect(() => parseKeyValue(input)).toThrow('input string cannot be empty');
  });

  // Test case 12: Throw Error for missing key-value delimiter
  it('12. should throw Error when key-value delimiter is missing', () => {
    // Arrange
    const input = 'key1=value1;invalidpair';

    // Act & Assert
    expect(() => parseKeyValue(input)).toThrow(Error);
    expect(() => parseKeyValue(input)).toThrow('Invalid key-value pair');
  });

  // Test case 13: Throw Error for empty key
  it('13. should throw Error when key is empty', () => {
    // Arrange
    const input = '=value';

    // Act & Assert
    expect(() => parseKeyValue(input)).toThrow(Error);
    expect(() => parseKeyValue(input)).toThrow('empty key');
  });
});
