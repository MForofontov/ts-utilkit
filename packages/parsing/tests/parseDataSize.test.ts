import { parseDataSize } from '../src/parseDataSize';

/**
 * Unit tests for the parseDataSize function.
 */
describe('parseDataSize', () => {
  // Test case 1: Parse kilobytes (binary)
  it('1. should parse kilobytes in binary mode', () => {
    // Arrange
    const input = '5KB';
    const expected = 5120; // 5 * 1024

    // Act
    const result = parseDataSize(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 2: Parse kilobytes (decimal)
  it('2. should parse kilobytes in decimal mode', () => {
    // Arrange
    const input = '5KB';
    const expected = 5000; // 5 * 1000

    // Act
    const result = parseDataSize(input, false);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 3: Parse megabytes
  it('3. should parse megabytes', () => {
    // Arrange
    const input = '10MB';
    const expected = 10485760; // 10 * 1024^2

    // Act
    const result = parseDataSize(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 4: Parse gigabytes
  it('4. should parse gigabytes', () => {
    // Arrange
    const input = '2GB';
    const expected = 2147483648; // 2 * 1024^3

    // Act
    const result = parseDataSize(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 5: Parse fractional values
  it('5. should parse fractional values', () => {
    // Arrange
    const input = '1.5GB';
    const expected = 1610612736; // 1.5 * 1024^3

    // Act
    const result = parseDataSize(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 6: Parse with spaces
  it('6. should parse with spaces between number and unit', () => {
    // Arrange
    const input = '10 MB';
    const expected = 10485760;

    // Act
    const result = parseDataSize(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 7: Case insensitive units
  it('7. should handle case insensitive units', () => {
    // Arrange
    const input = '2kb';
    const expected = 2048;

    // Act
    const result = parseDataSize(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 8: Parse bytes
  it('8. should parse bytes', () => {
    // Arrange
    const input = '100B';
    const expected = 100;

    // Act
    const result = parseDataSize(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 9: Parse zero
  it('9. should parse zero bytes', () => {
    // Arrange
    const input = '0MB';
    const expected = 0;

    // Act
    const result = parseDataSize(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 10: Parse large units (TB, PB)
  it('10. should parse large units', () => {
    // Arrange
    const input = '1TB';
    const expected = 1099511627776; // 1 * 1024^4

    // Act
    const result = parseDataSize(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 11: Throw TypeError for non-string input
  it('11. should throw TypeError when input is not a string', () => {
    // Arrange
    const input = 123 as unknown as string;

    // Act & Assert
    expect(() => parseDataSize(input)).toThrow(TypeError);
    expect(() => parseDataSize(input)).toThrow('input must be a string');
  });

  // Test case 12: Throw TypeError for non-boolean binary
  it('12. should throw TypeError when binary is not a boolean', () => {
    // Arrange
    const input = '5KB';
    const binary = 'yes' as unknown as boolean;

    // Act & Assert
    expect(() => parseDataSize(input, binary)).toThrow(TypeError);
    expect(() => parseDataSize(input, binary)).toThrow(
      'binary must be a boolean',
    );
  });

  // Test case 13: Throw Error for empty input
  it('13. should throw Error when input is empty', () => {
    // Arrange
    const input = '';

    // Act & Assert
    expect(() => parseDataSize(input)).toThrow(Error);
    expect(() => parseDataSize(input)).toThrow('input string cannot be empty');
  });

  // Test case 14: Throw Error for invalid format
  it('14. should throw Error for invalid format', () => {
    // Arrange
    const input = 'invalid';

    // Act & Assert
    expect(() => parseDataSize(input)).toThrow(Error);
    expect(() => parseDataSize(input)).toThrow('Invalid data size format');
  });

  // Test case 15: Throw Error for negative value
  it('15. should throw Error for negative value', () => {
    // Arrange
    const input = '-5KB';

    // Act & Assert
    expect(() => parseDataSize(input)).toThrow(Error);
    expect(() => parseDataSize(input)).toThrow('must be non-negative');
  });

  // Test case 16: Throw Error for unrecognized unit
  it('16. should throw Error for unrecognized unit', () => {
    // Arrange
    const input = '5XB';

    // Act & Assert
    expect(() => parseDataSize(input)).toThrow(Error);
    expect(() => parseDataSize(input)).toThrow('Unrecognized unit');
  });
});
