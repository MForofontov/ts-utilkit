import { parseDuration } from '../src/parseDuration';

/**
 * Unit tests for the parseDuration function.
 */
describe('parseDuration', () => {
  // Test case 1: Parse seconds
  it('1. should parse seconds', () => {
    // Arrange
    const input = '5s';
    const expected = 5000;

    // Act
    const result = parseDuration(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 2: Parse minutes
  it('2. should parse minutes', () => {
    // Arrange
    const input = '10m';
    const expected = 600000;

    // Act
    const result = parseDuration(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 3: Parse hours
  it('3. should parse hours', () => {
    // Arrange
    const input = '2h';
    const expected = 7200000;

    // Act
    const result = parseDuration(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 4: Parse combined units
  it('4. should parse combined units', () => {
    // Arrange
    const input = '1h 30m 15s';
    const expected = 5415000; // 3600000 + 1800000 + 15000

    // Act
    const result = parseDuration(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 5: Parse days
  it('5. should parse days', () => {
    // Arrange
    const input = '1d';
    const expected = 86400000;

    // Act
    const result = parseDuration(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 6: Parse weeks
  it('6. should parse weeks', () => {
    // Arrange
    const input = '1w';
    const expected = 604800000;

    // Act
    const result = parseDuration(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 7: Parse milliseconds
  it('7. should parse milliseconds', () => {
    // Arrange
    const input = '500ms';
    const expected = 500;

    // Act
    const result = parseDuration(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 8: Parse full unit names
  it('8. should parse full unit names', () => {
    // Arrange
    const input = '5 seconds';
    const expected = 5000;

    // Act
    const result = parseDuration(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 9: Case insensitive units
  it('9. should handle case insensitive units', () => {
    // Arrange
    const input = '5S';
    const expected = 5000;

    // Act
    const result = parseDuration(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 10: Parse fractional values
  it('10. should parse fractional values', () => {
    // Arrange
    const input = '1.5h';
    const expected = 5400000;

    // Act
    const result = parseDuration(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 11: Parse complex duration
  it('11. should parse complex duration', () => {
    // Arrange
    const input = '1d 2h 30m 45s';
    const expected = 95445000;

    // Act
    const result = parseDuration(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 12: Throw TypeError for non-string input
  it('12. should throw TypeError when input is not a string', () => {
    // Arrange
    const input = 123 as unknown as string;

    // Act & Assert
    expect(() => parseDuration(input)).toThrow(TypeError);
    expect(() => parseDuration(input)).toThrow('input must be a string');
  });

  // Test case 13: Throw Error for empty input
  it('13. should throw Error when input is empty', () => {
    // Arrange
    const input = '';

    // Act & Assert
    expect(() => parseDuration(input)).toThrow(Error);
    expect(() => parseDuration(input)).toThrow('input string cannot be empty');
  });

  // Test case 14: Throw Error for invalid format
  it('14. should throw Error for invalid format', () => {
    // Arrange
    const input = 'invalid';

    // Act & Assert
    expect(() => parseDuration(input)).toThrow(Error);
    expect(() => parseDuration(input)).toThrow('Invalid duration format');
  });

  // Test case 15: Throw Error for negative value
  it('15. should throw Error for negative value', () => {
    // Arrange
    const input = '-5s';

    // Act & Assert
    expect(() => parseDuration(input)).toThrow(Error);
    expect(() => parseDuration(input)).toThrow('must be non-negative');
  });

  // Test case 16: Throw Error for unrecognized unit
  it('16. should throw Error for unrecognized unit', () => {
    // Arrange
    const input = '5x';

    // Act & Assert
    expect(() => parseDuration(input)).toThrow(Error);
    expect(() => parseDuration(input)).toThrow('Unrecognized unit');
  });
});
