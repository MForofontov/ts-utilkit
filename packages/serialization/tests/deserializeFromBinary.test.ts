import { deserializeFromBinary } from '../src/deserializeFromBinary';

/**
 * Unit tests for the deserializeFromBinary function.
 */
describe('deserializeFromBinary', () => {
  // Normal/typical usage
  it('1. should convert binary to single character', () => {
    // Arrange
    const input = '01000001';
    const expected = 'A';

    // Act
    const result = deserializeFromBinary(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('2. should convert binary to multiple characters', () => {
    // Arrange
    const input = '0100000101000010';
    const expected = 'AB';

    // Act
    const result = deserializeFromBinary(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('3. should use custom separator', () => {
    // Arrange
    const input = '01000001 01000010';
    const expected = 'AB';

    // Act
    const result = deserializeFromBinary(input, ' ');

    // Assert
    expect(result).toBe(expected);
  });

  it('4. should convert to lowercase letter', () => {
    // Arrange
    const input = '01100001';
    const expected = 'a';

    // Act
    const result = deserializeFromBinary(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('5. should convert to number character', () => {
    // Arrange
    const input = '00110000';
    const expected = '0';

    // Act
    const result = deserializeFromBinary(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('6. should convert to special character', () => {
    // Arrange
    const input = '00100001';
    const expected = '!';

    // Act
    const result = deserializeFromBinary(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('7. should convert to space character', () => {
    // Arrange
    const input = '00100000';
    const expected = ' ';

    // Act
    const result = deserializeFromBinary(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('8. should convert word with separator', () => {
    // Arrange
    const input = '01001000-01101001';
    const expected = 'Hi';

    // Act
    const result = deserializeFromBinary(input, '-');

    // Assert
    expect(result).toBe(expected);
  });

  // Edge cases
  it('9. should handle empty string without separator', () => {
    // Arrange
    const input = '';
    const expected = '';

    // Act
    const result = deserializeFromBinary(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('10. should handle multi-character separator', () => {
    // Arrange
    const input = '01000001 | 01000010';
    const expected = 'AB';

    // Act
    const result = deserializeFromBinary(input, ' | ');

    // Assert
    expect(result).toBe(expected);
  });

  it('11. should convert newline character', () => {
    // Arrange
    const input = '00001010';
    const expected = '\n';

    // Act
    const result = deserializeFromBinary(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('12. should convert tab character', () => {
    // Arrange
    const input = '00001001';
    const expected = '\t';

    // Act
    const result = deserializeFromBinary(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Error cases
  it('13. should throw TypeError when binaryString is not a string', () => {
    // Arrange
    const input: any = 123;
    const expectedMessage = 'binaryString must be a string, got number';

    // Act & Assert
    expect(() => deserializeFromBinary(input)).toThrow(TypeError);
    expect(() => deserializeFromBinary(input)).toThrow(expectedMessage);
  });

  it('14. should throw TypeError when separator is not a string', () => {
    // Arrange
    const input = '01000001';
    const invalidSeparator: any = 123;
    const expectedMessage = 'separator must be a string, got number';

    // Act & Assert
    expect(() => deserializeFromBinary(input, invalidSeparator)).toThrow(
      TypeError,
    );
    expect(() => deserializeFromBinary(input, invalidSeparator)).toThrow(
      expectedMessage,
    );
  });

  it('15. should throw Error when length not divisible by 8', () => {
    // Arrange
    const input = '0100000'; // Only 7 bits
    const expectedMessage =
      'Binary string length must be divisible by 8 when no separator is used';

    // Act & Assert
    expect(() => deserializeFromBinary(input)).toThrow(Error);
    expect(() => deserializeFromBinary(input)).toThrow(expectedMessage);
  });

  it('16. should throw Error for invalid binary characters', () => {
    // Arrange
    const input = '01000002'; // Invalid character '2'
    const expectedMessage = 'Invalid binary string segment';

    // Act & Assert
    expect(() => deserializeFromBinary(input)).toThrow(Error);
    expect(() => deserializeFromBinary(input)).toThrow(expectedMessage);
  });

  it('17. should throw Error for invalid binary with separator', () => {
    // Arrange
    const input = '01000001 0100000X'; // Invalid character 'X'
    const expectedMessage = 'Invalid binary string segment';

    // Act & Assert
    expect(() => deserializeFromBinary(input, ' ')).toThrow(Error);
    expect(() => deserializeFromBinary(input, ' ')).toThrow(expectedMessage);
  });
});
