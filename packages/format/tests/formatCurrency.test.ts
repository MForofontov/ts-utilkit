import { formatCurrency } from '../src/formatCurrency';

/**
 * Unit tests for the formatCurrency function.
 */
describe('formatCurrency', () => {
  // Test case 1: Format USD with automatic symbol detection
  it('1. should format USD currency correctly', () => {
    // Arrange
    const value = 1234.56;
    const currency = 'USD';
    const expected = '$1,234.56';

    // Act
    const result = formatCurrency(value, currency);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 2: Format EUR with automatic symbol detection
  it('2. should format EUR with automatic symbol', () => {
    // Arrange
    const value = 1234.56;
    const currency = 'EUR';
    const expected = '€1,234.56';

    // Act
    const result = formatCurrency(value, currency);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 3: Format GBP with automatic symbol detection
  it('3. should format GBP with automatic symbol', () => {
    // Arrange
    const value = 1234.56;
    const currency = 'GBP';
    const expected = '£1,234.56';

    // Act
    const result = formatCurrency(value, currency);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 4: Format JPY (no decimals)
  it('4. should format JPY without decimals', () => {
    // Arrange
    const value = 1234;
    const currency = 'JPY';
    const expected = '¥1,234';

    // Act
    const result = formatCurrency(value, currency, 0);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 5: Format with custom symbol
  it('5. should format with custom symbol', () => {
    // Arrange
    const value = 1234.56;
    const currency = 'BTC';
    const expected = '₿1,234.56';

    // Act
    const result = formatCurrency(value, currency, 2, '₿');

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 6: Format unknown currency without symbol
  it('6. should format unknown currency without symbol in parentheses', () => {
    // Arrange
    const value = 1234.56;
    const currency = 'XXX';
    const expected = '1,234.56 XXX';

    // Act
    const result = formatCurrency(value, currency);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 7: Format negative amount
  it('7. should format negative currency amount', () => {
    // Arrange
    const value = -1234.56;
    const currency = 'USD';
    const expected = '-$1,234.56';

    // Act
    const result = formatCurrency(value, currency);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 8: Format zero
  it('7. should handle zero value', () => {
    // Arrange
    const value = 0;
    const currency = 'EUR';
    const expected = '€0.00';

    // Act
    const result = formatCurrency(value, currency);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 9: Format with 3 decimal places
  it('9. should format with 3 decimal places', () => {
    // Arrange
    const value = 1234.567;
    const currency = 'USD';
    const expected = '$1,234.567';

    // Act
    const result = formatCurrency(value, currency, 3);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 10: Format CHF
  it('10. should format CHF with automatic symbol', () => {
    // Arrange
    const value = 1234.56;
    const currency = 'CHF';
    const expected = '₣1,234.56';

    // Act
    const result = formatCurrency(value, currency);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 11: Format CAD
  it('11. should format CAD with automatic symbol', () => {
    // Arrange
    const value = 1234.56;
    const currency = 'CAD';
    const expected = '$1,234.56';

    // Act
    const result = formatCurrency(value, currency);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 12: Format large amount
  it('12. should format large currency amounts', () => {
    // Arrange
    const value = 1234567890.12;
    const currency = 'USD';
    const expected = '$1,234,567,890.12';

    // Act
    const result = formatCurrency(value, currency);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 13: Throw TypeError for non-number value
  it('13. should throw TypeError when value is not a number', () => {
    // Arrange
    const value = 'invalid' as unknown as number;
    const currency = 'USD';

    // Act & Assert
    expect(() => formatCurrency(value, currency)).toThrow(TypeError);
    expect(() => formatCurrency(value, currency)).toThrow(
      'value must be a number',
    );
  });

  // Test case 14: Throw TypeError for NaN
  it('14. should throw TypeError when value is NaN', () => {
    // Arrange
    const value = NaN;
    const currency = 'USD';

    // Act & Assert
    expect(() => formatCurrency(value, currency)).toThrow(TypeError);
    expect(() => formatCurrency(value, currency)).toThrow(
      'value must be a number',
    );
  });

  // Test case 15: Throw TypeError for non-string currency
  it('15. should throw TypeError when currency is not a string', () => {
    // Arrange
    const value = 1234.56;
    const currency = 123 as unknown as string;

    // Act & Assert
    expect(() => formatCurrency(value, currency)).toThrow(TypeError);
    expect(() => formatCurrency(value, currency)).toThrow(
      'currency must be a string',
    );
  });

  // Test case 16: Throw Error for negative decimals
  it('16. should throw Error for negative decimals', () => {
    // Arrange
    const value = 1234.56;
    const currency = 'USD';
    const decimals = -1;

    // Act & Assert
    expect(() => formatCurrency(value, currency, decimals)).toThrow(Error);
    expect(() => formatCurrency(value, currency, decimals)).toThrow(
      'must be non-negative',
    );
  });
});
