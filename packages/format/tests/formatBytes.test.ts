import { formatBytes } from '../src/formatBytes';

/**
 * Unit tests for the formatBytes function.
 */
describe('formatBytes', () => {
  // Test case 1: Format kilobytes (binary)
  it('1. should format kilobytes in binary mode', () => {
    // Arrange
    const bytes = 1024;
    const expected = '1.00 KB';

    // Act
    const result = formatBytes(bytes);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 2: Format kilobytes (decimal)
  it('2. should format kilobytes in decimal mode', () => {
    // Arrange
    const bytes = 1000;
    const expected = '1.00 KB';

    // Act
    const result = formatBytes(bytes, 2, false);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 3: Format megabytes
  it('3. should format megabytes', () => {
    // Arrange
    const bytes = 1048576; // 1024^2
    const expected = '1.00 MB';

    // Act
    const result = formatBytes(bytes);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 4: Format gigabytes
  it('4. should format gigabytes', () => {
    // Arrange
    const bytes = 1073741824; // 1024^3
    const expected = '1.00 GB';

    // Act
    const result = formatBytes(bytes);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 5: Custom decimal places
  it('5. should format with custom decimal places', () => {
    // Arrange
    const bytes = 1536; // 1.5 KB
    const expected = '2 KB';

    // Act
    const result = formatBytes(bytes, 0);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 6: Format zero bytes
  it('6. should format zero bytes', () => {
    // Arrange
    const bytes = 0;
    const expected = '0 Bytes';

    // Act
    const result = formatBytes(bytes);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 7: Format bytes only
  it('7. should format bytes when less than 1KB', () => {
    // Arrange
    const bytes = 512;
    const expected = '512.00 Bytes';

    // Act
    const result = formatBytes(bytes);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 8: Format terabytes
  it('8. should format terabytes', () => {
    // Arrange
    const bytes = 1099511627776; // 1024^4
    const expected = '1.00 TB';

    // Act
    const result = formatBytes(bytes);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 9: Format with 3 decimal places
  it('9. should format with 3 decimal places', () => {
    // Arrange
    const bytes = 1536;
    const expected = '1.500 KB';

    // Act
    const result = formatBytes(bytes, 3);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 10: Large value formatting
  it('10. should format very large values', () => {
    // Arrange
    const bytes = 1125899906842624; // 1024^5 (PB)
    const expected = '1.00 PB';

    // Act
    const result = formatBytes(bytes);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 11: Throw TypeError for non-number bytes
  it('11. should throw TypeError when bytes is not a number', () => {
    // Arrange
    const bytes = 'invalid' as unknown as number;

    // Act & Assert
    expect(() => formatBytes(bytes)).toThrow(TypeError);
    expect(() => formatBytes(bytes)).toThrow('bytes must be a number');
  });

  // Test case 12: Throw TypeError for NaN bytes
  it('12. should throw TypeError when bytes is NaN', () => {
    // Arrange
    const bytes = NaN;

    // Act & Assert
    expect(() => formatBytes(bytes)).toThrow(TypeError);
    expect(() => formatBytes(bytes)).toThrow('bytes must be a number');
  });

  // Test case 13: Throw Error for negative bytes
  it('13. should throw Error for negative bytes', () => {
    // Arrange
    const bytes = -1024;

    // Act & Assert
    expect(() => formatBytes(bytes)).toThrow(Error);
    expect(() => formatBytes(bytes)).toThrow('must be non-negative');
  });

  // Test case 14: Throw Error for negative decimals
  it('14. should throw Error for negative decimals', () => {
    // Arrange
    const bytes = 1024;
    const decimals = -1;

    // Act & Assert
    expect(() => formatBytes(bytes, decimals)).toThrow(Error);
    expect(() => formatBytes(bytes, decimals)).toThrow('must be non-negative');
  });

  // Test case 15: Throw TypeError for non-boolean binary
  it('15. should throw TypeError when binary is not a boolean', () => {
    // Arrange
    const bytes = 1024;
    const binary = 'yes' as unknown as boolean;

    // Act & Assert
    expect(() => formatBytes(bytes, 2, binary)).toThrow(TypeError);
    expect(() => formatBytes(bytes, 2, binary)).toThrow(
      'binary must be a boolean',
    );
  });
});
