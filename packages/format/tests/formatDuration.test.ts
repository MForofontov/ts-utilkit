import { formatDuration } from '../src/formatDuration';

/**
 * Unit tests for the formatDuration function.
 */
describe('formatDuration', () => {
  // Test case 1: Format seconds (short)
  it('1. should format seconds in short format', () => {
    // Arrange
    const milliseconds = 5000;
    const expected = '5s';

    // Act
    const result = formatDuration(milliseconds);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 2: Format seconds (long)
  it('2. should format seconds in long format', () => {
    // Arrange
    const milliseconds = 5000;
    const expected = '5 seconds';

    // Act
    const result = formatDuration(milliseconds, 'long');

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 3: Format seconds (compact)
  it('3. should format seconds in compact format', () => {
    // Arrange
    const milliseconds = 65000; // 1:05
    const expected = '1:05';

    // Act
    const result = formatDuration(milliseconds, 'compact');

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 4: Format complex duration (short)
  it('4. should format complex duration in short format', () => {
    // Arrange
    const milliseconds = 90061000; // 1d 1h 1m 1s
    const expected = '1d 1h 1m 1s';

    // Act
    const result = formatDuration(milliseconds);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 5: Format complex duration (long)
  it('5. should format complex duration in long format', () => {
    // Arrange
    const milliseconds = 65000; // 1 minute 5 seconds
    const expected = '1 minute 5 seconds';

    // Act
    const result = formatDuration(milliseconds, 'long');

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 6: Format hours in compact format
  it('6. should format hours in compact format', () => {
    // Arrange
    const milliseconds = 3665000; // 1:01:05
    const expected = '1:01:05';

    // Act
    const result = formatDuration(milliseconds, 'compact');

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 7: Format zero milliseconds
  it('7. should format zero milliseconds', () => {
    // Arrange
    const milliseconds = 0;
    const expected = '0ms';

    // Act
    const result = formatDuration(milliseconds);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 8: Format milliseconds only
  it('8. should format milliseconds only', () => {
    // Arrange
    const milliseconds = 500;
    const expected = '500ms';

    // Act
    const result = formatDuration(milliseconds);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 9: Format minutes and seconds
  it('9. should format minutes and seconds', () => {
    // Arrange
    const milliseconds = 125000; // 2m 5s
    const expected = '2m 5s';

    // Act
    const result = formatDuration(milliseconds);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 10: Format with pluralization (long)
  it('10. should use correct pluralization in long format', () => {
    // Arrange
    const milliseconds = 2000; // 2 seconds
    const expected = '2 seconds';

    // Act
    const result = formatDuration(milliseconds, 'long');

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 11: Format single unit (long)
  it('11. should use singular form for 1 unit', () => {
    // Arrange
    const milliseconds = 1000; // 1 second
    const expected = '1 second';

    // Act
    const result = formatDuration(milliseconds, 'long');

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 12: Throw TypeError for non-number input
  it('12. should throw TypeError when milliseconds is not a number', () => {
    // Arrange
    const milliseconds = 'invalid' as unknown as number;

    // Act & Assert
    expect(() => formatDuration(milliseconds)).toThrow(TypeError);
    expect(() => formatDuration(milliseconds)).toThrow(
      'milliseconds must be a number',
    );
  });

  // Test case 13: Throw TypeError for NaN
  it('13. should throw TypeError when milliseconds is NaN', () => {
    // Arrange
    const milliseconds = NaN;

    // Act & Assert
    expect(() => formatDuration(milliseconds)).toThrow(TypeError);
    expect(() => formatDuration(milliseconds)).toThrow(
      'milliseconds must be a number',
    );
  });

  // Test case 14: Throw Error for negative milliseconds
  it('14. should throw Error for negative milliseconds', () => {
    // Arrange
    const milliseconds = -5000;

    // Act & Assert
    expect(() => formatDuration(milliseconds)).toThrow(Error);
    expect(() => formatDuration(milliseconds)).toThrow('must be non-negative');
  });

  // Test case 15: Throw Error for invalid format
  it('15. should throw Error for invalid format', () => {
    // Arrange
    const milliseconds = 5000;
    const format = 'invalid' as 'short';

    // Act & Assert
    expect(() => formatDuration(milliseconds, format)).toThrow(Error);
    expect(() => formatDuration(milliseconds, format)).toThrow('Invalid format');
  });
});
