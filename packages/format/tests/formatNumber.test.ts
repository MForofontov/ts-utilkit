import { formatNumber } from '../src/formatNumber';

/**
 * Unit tests for the formatNumber function.
 */
describe('formatNumber', () => {
  // Test case 1: Format basic number with thousands separator
  it('1. should format number with thousands separator', () => {
    // Arrange
    const value = 1234567;
    const expected = '1,234,567';

    // Act
    const result = formatNumber(value);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 2: Format with decimals
  it('2. should format number with decimals', () => {
    // Arrange
    const value = 1234.567;
    const expected = '1,234.57';

    // Act
    const result = formatNumber(value, 2);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 3: Format European style
  it('3. should format with European separators', () => {
    // Arrange
    const value = 1234567.89;
    const expected = '1.234.567,89';

    // Act
    const result = formatNumber(value, 2, '.', ',');

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 4: Format negative number
  it('4. should format negative numbers', () => {
    // Arrange
    const value = -1234.56;
    const expected = '-1,234.56';

    // Act
    const result = formatNumber(value, 2);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 5: Format zero
  it('5. should format zero', () => {
    // Arrange
    const value = 0;
    const expected = '0.00';

    // Act
    const result = formatNumber(value, 2);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 6: Format without decimals
  it('6. should format without decimals', () => {
    // Arrange
    const value = 1234567;
    const expected = '1,234,567';

    // Act
    const result = formatNumber(value, 0);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 7: Format small number without thousands
  it('7. should format small number without thousands separator', () => {
    // Arrange
    const value = 123;
    const expected = '123';

    // Act
    const result = formatNumber(value);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 8: Rounding decimals
  it('8. should round to specified decimals', () => {
    // Arrange
    const value = 123.456789;
    const expected = '123.46';

    // Act
    const result = formatNumber(value, 2);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 9: Format with 3 decimal places
  it('9. should format with 3 decimal places', () => {
    // Arrange
    const value = 1234.5;
    const expected = '1,234.500';

    // Act
    const result = formatNumber(value, 3);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 10: Format large number
  it('10. should format very large numbers', () => {
    // Arrange
    const value = 1234567890123;
    const expected = '1,234,567,890,123';

    // Act
    const result = formatNumber(value);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 11: Throw TypeError for non-number value
  it('11. should throw TypeError when value is not a number', () => {
    // Arrange
    const value = 'invalid' as unknown as number;

    // Act & Assert
    expect(() => formatNumber(value)).toThrow(TypeError);
    expect(() => formatNumber(value)).toThrow('value must be a number');
  });

  // Test case 12: Throw TypeError for NaN
  it('12. should throw TypeError when value is NaN', () => {
    // Arrange
    const value = NaN;

    // Act & Assert
    expect(() => formatNumber(value)).toThrow(TypeError);
    expect(() => formatNumber(value)).toThrow('value must be a number');
  });

  // Test case 13: Throw Error for negative decimals
  it('13. should throw Error for negative decimals', () => {
    // Arrange
    const value = 1234;
    const decimals = -1;

    // Act & Assert
    expect(() => formatNumber(value, decimals)).toThrow(Error);
    expect(() => formatNumber(value, decimals)).toThrow('must be non-negative');
  });

  // Test case 14: Throw Error for invalid separator length
  it('14. should throw Error when separator is not one character', () => {
    // Arrange
    const value = 1234;
    const separator = ',,';

    // Act & Assert
    expect(() => formatNumber(value, 0, separator)).toThrow(Error);
    expect(() => formatNumber(value, 0, separator)).toThrow('exactly one character');
  });
});
