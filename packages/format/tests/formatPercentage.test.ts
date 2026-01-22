import { formatPercentage } from '../src/formatPercentage';

/**
 * Unit tests for the formatPercentage function.
 */
describe('formatPercentage', () => {
  // Test case 1: Format basic percentage
  it('1. should format basic percentage', () => {
    // Arrange
    const value = 0.5;
    const expected = '50%';

    // Act
    const result = formatPercentage(value);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 2: Format percentage with custom decimals
  it('2. should format with custom decimal places', () => {
    // Arrange
    const value = 0.12345;
    const expected = '12.3%';

    // Act
    const result = formatPercentage(value, 1);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 3: Format without multiplier
  it('3. should format without multiplying by 100', () => {
    // Arrange
    const value = 50;
    const expected = '50.00%';

    // Act
    const result = formatPercentage(value, 2, true);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 4: Format with custom suffix
  it('4. should format with custom suffix', () => {
    // Arrange
    const value = 0.5;
    const expected = '50 percent';

    // Act
    const result = formatPercentage(value, 0, false, ' percent');

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 5: Format zero
  it('5. should format zero percentage', () => {
    // Arrange
    const value = 0;
    const expected = '0%';

    // Act
    const result = formatPercentage(value);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 6: Format 100%
  it('6. should format 100 percent', () => {
    // Arrange
    const value = 1;
    const expected = '100%';

    // Act
    const result = formatPercentage(value);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 7: Format negative percentage
  it('7. should format negative percentage', () => {
    // Arrange
    const value = -0.25;
    const expected = '-25%';

    // Act
    const result = formatPercentage(value);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 8: Format large percentage
  it('8. should format percentage over 100%', () => {
    // Arrange
    const value = 2.5;
    const expected = '250%';

    // Act
    const result = formatPercentage(value);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 9: Format with zero decimals
  it('9. should format with no decimal places', () => {
    // Arrange
    const value = 0.5;
    const expected = '50%';

    // Act
    const result = formatPercentage(value, 0);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 10: Throw TypeError for non-number value
  it('10. should throw TypeError when value is not a number', () => {
    // Arrange
    const value = 'invalid' as unknown as number;

    // Act & Assert
    expect(() => formatPercentage(value)).toThrow(TypeError);
    expect(() => formatPercentage(value)).toThrow('value must be a number');
  });

  // Test case 11: Throw TypeError for NaN
  it('11. should throw TypeError when value is NaN', () => {
    // Arrange
    const value = NaN;

    // Act & Assert
    expect(() => formatPercentage(value)).toThrow(TypeError);
    expect(() => formatPercentage(value)).toThrow('value must be a number');
  });

  // Test case 12: Throw Error for negative decimals
  it('12. should throw Error for negative decimals', () => {
    // Arrange
    const value = 0.5;
    const decimals = -1;

    // Act & Assert
    expect(() => formatPercentage(value, decimals)).toThrow(Error);
    expect(() => formatPercentage(value, decimals)).toThrow('must be non-negative');
  });
});
