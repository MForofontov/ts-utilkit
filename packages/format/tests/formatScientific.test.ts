import { formatScientific } from '../src/formatScientific';

/**
 * Unit tests for the formatScientific function.
 */
describe('formatScientific', () => {
  // Test case 1: Format large number
  it('1. should format large number in scientific notation', () => {
    // Arrange
    const value = 123456789;
    const expected = '1.23e+8';

    // Act
    const result = formatScientific(value);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 2: Format small number
  it('2. should format small number in scientific notation', () => {
    // Arrange
    const value = 0.00012345;
    const expected = '1.23e-4';

    // Act
    const result = formatScientific(value);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 3: Format with custom decimals
  it('3. should format with custom decimal places', () => {
    // Arrange
    const value = 123456;
    const expected = '1.2346e+5';

    // Act
    const result = formatScientific(value, 4);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 4: Format with zero decimals
  it('4. should format with zero decimal places', () => {
    // Arrange
    const value = 123456;
    const expected = '1e+5';

    // Act
    const result = formatScientific(value, 0);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 5: Format negative number
  it('5. should format negative number', () => {
    // Arrange
    const value = -123456;
    const expected = '-1.23e+5';

    // Act
    const result = formatScientific(value);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 6: Format zero
  it('6. should format zero', () => {
    // Arrange
    const value = 0;
    const expected = '0.00e+0';

    // Act
    const result = formatScientific(value);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 7: Format number equal to 1
  it('7. should format 1 correctly', () => {
    // Arrange
    const value = 1;
    const expected = '1.00e+0';

    // Act
    const result = formatScientific(value);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 8: Format very large number
  it('8. should format very large number', () => {
    // Arrange
    const value = 9.8765e50;
    const expected = '9.88e+50';

    // Act
    const result = formatScientific(value);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 9: Format very small number
  it('9. should format very small number', () => {
    // Arrange
    const value = 1.23e-30;
    const expected = '1.23e-30';

    // Act
    const result = formatScientific(value);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 10: Throw TypeError for non-number value
  it('10. should throw TypeError when value is not a number', () => {
    // Arrange
    const value = 'invalid' as unknown as number;

    // Act & Assert
    expect(() => formatScientific(value)).toThrow(TypeError);
    expect(() => formatScientific(value)).toThrow('value must be a number');
  });

  // Test case 11: Throw TypeError for NaN
  it('11. should throw TypeError when value is NaN', () => {
    // Arrange
    const value = NaN;

    // Act & Assert
    expect(() => formatScientific(value)).toThrow(TypeError);
    expect(() => formatScientific(value)).toThrow('value must be a number');
  });

  // Test case 12: Throw Error for negative decimals
  it('12. should throw Error for negative decimals', () => {
    // Arrange
    const value = 12345;
    const decimals = -1;

    // Act & Assert
    expect(() => formatScientific(value, decimals)).toThrow(Error);
    expect(() => formatScientific(value, decimals)).toThrow(
      'must be non-negative',
    );
  });
});
