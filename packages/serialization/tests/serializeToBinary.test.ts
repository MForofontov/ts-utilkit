import { serializeToBinary } from '../src/serializeToBinary';

/**
 * Unit tests for the serializeToBinary function.
 */
describe('serializeToBinary', () => {
  // Normal/typical usage
  it('1. should convert single character to binary', () => {
    // Arrange
    const input = 'A';
    const expected = '01000001';

    // Act
    const result = serializeToBinary(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('2. should convert multiple characters to binary', () => {
    // Arrange
    const input = 'AB';
    const expected = '0100000101000010';

    // Act
    const result = serializeToBinary(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('3. should use custom separator', () => {
    // Arrange
    const input = 'AB';
    const expected = '01000001 01000010';

    // Act
    const result = serializeToBinary(input, ' ');

    // Assert
    expect(result).toBe(expected);
  });

  it('4. should convert lowercase letter', () => {
    // Arrange
    const input = 'a';
    const expected = '01100001';

    // Act
    const result = serializeToBinary(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('5. should convert number character', () => {
    // Arrange
    const input = '0';
    const expected = '00110000';

    // Act
    const result = serializeToBinary(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('6. should convert special character', () => {
    // Arrange
    const input = '!';
    const expected = '00100001';

    // Act
    const result = serializeToBinary(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('7. should convert space character', () => {
    // Arrange
    const input = ' ';
    const expected = '00100000';

    // Act
    const result = serializeToBinary(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('8. should convert word with separator', () => {
    // Arrange
    const input = 'Hi';
    const separator = '-';

    // Act
    const result = serializeToBinary(input, separator);
    const parts = result.split(separator);

    // Assert
    expect(parts).toHaveLength(2);
    expect(parts[0]).toBe('01001000'); // H
    expect(parts[1]).toBe('01101001'); // i
  });

  // Edge cases
  it('9. should handle empty string', () => {
    // Arrange
    const input = '';
    const expected = '';

    // Act
    const result = serializeToBinary(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('10. should handle empty separator', () => {
    // Arrange
    const input = 'AB';
    const expected = '0100000101000010';

    // Act
    const result = serializeToBinary(input, '');

    // Assert
    expect(result).toBe(expected);
  });

  it('11. should handle multi-character separator', () => {
    // Arrange
    const input = 'AB';
    const separator = ' | ';

    // Act
    const result = serializeToBinary(input, separator);

    // Assert
    expect(result).toContain(' | ');
  });

  it('12. should convert newline character', () => {
    // Arrange
    const input = '\n';
    const expected = '00001010';

    // Act
    const result = serializeToBinary(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('13. should convert tab character', () => {
    // Arrange
    const input = '\t';
    const expected = '00001001';

    // Act
    const result = serializeToBinary(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Error cases
  it('14. should throw TypeError when input is not a string', () => {
    // Arrange
    const input: any = 123;
    const expectedMessage = 'input must be a string, got number';

    // Act & Assert
    expect(() => serializeToBinary(input)).toThrow(TypeError);
    expect(() => serializeToBinary(input)).toThrow(expectedMessage);
  });

  it('15. should throw TypeError when separator is not a string', () => {
    // Arrange
    const input = 'A';
    const invalidSeparator: any = 123;
    const expectedMessage = 'separator must be a string, got number';

    // Act & Assert
    expect(() => serializeToBinary(input, invalidSeparator)).toThrow(TypeError);
    expect(() => serializeToBinary(input, invalidSeparator)).toThrow(
      expectedMessage,
    );
  });
});
