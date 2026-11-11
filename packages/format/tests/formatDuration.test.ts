import { formatDuration } from '../src/formatDuration';

/**
 * Unit tests for the formatDuration function.
 */
describe('formatDuration', () => {
  it.each<[number, string]>([
    [0, '0 milliseconds'],
    [1, '1 millisecond'],
    [2, '2 milliseconds'],
    [1000, '1 second'],
    [2000, '2 seconds'],
    [60000, '1 minute'],
    [120000, '2 minutes'],
    [3600000, '1 hour'],
    [7200000, '2 hours'],
    [86400000, '1 day'],
    [172800000, '2 days'],
  ])(
    'formats long duration %s with correct unit pluralization',
    (value, expected) => {
      expect(formatDuration(value, 'long')).toBe(expected);
    },
  );

  it('formats zero in compact form', () => {
    expect(formatDuration(0, 'compact')).toBe('0:00');
  });

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

  // Test case 12: Include sub-second remainder with larger units
  it('12. should include millisecond remainder when larger units are present', () => {
    expect(formatDuration(1500)).toBe('1s 500ms');
    expect(formatDuration(1500, 'long')).toBe('1 second 500 milliseconds');
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
    expect(() => formatDuration(milliseconds, format)).toThrow(
      'Invalid format',
    );
  });
});
