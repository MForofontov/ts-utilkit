import { formatOrdinal } from '../src/formatOrdinal';

/**
 * Unit tests for the formatOrdinal function.
 */
describe('formatOrdinal', () => {
  // Test case 1: Format 1st
  it('1. should format 1 as 1st', () => {
    // Arrange
    const value = 1;
    const expected = '1st';

    // Act
    const result = formatOrdinal(value);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 2: Format 2nd
  it('2. should format 2 as 2nd', () => {
    // Arrange
    const value = 2;
    const expected = '2nd';

    // Act
    const result = formatOrdinal(value);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 3: Format 3rd
  it('3. should format 3 as 3rd', () => {
    // Arrange
    const value = 3;
    const expected = '3rd';

    // Act
    const result = formatOrdinal(value);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 4: Format 4th
  it('4. should format 4 as 4th', () => {
    // Arrange
    const value = 4;
    const expected = '4th';

    // Act
    const result = formatOrdinal(value);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 5: Format 11th (special case)
  it('5. should format 11 as 11th', () => {
    // Arrange
    const value = 11;
    const expected = '11th';

    // Act
    const result = formatOrdinal(value);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 6: Format 12th (special case)
  it('6. should format 12 as 12th', () => {
    // Arrange
    const value = 12;
    const expected = '12th';

    // Act
    const result = formatOrdinal(value);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 7: Format 13th (special case)
  it('7. should format 13 as 13th', () => {
    // Arrange
    const value = 13;
    const expected = '13th';

    // Act
    const result = formatOrdinal(value);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 8: Format 21st
  it('8. should format 21 as 21st', () => {
    // Arrange
    const value = 21;
    const expected = '21st';

    // Act
    const result = formatOrdinal(value);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 9: Format 22nd
  it('9. should format 22 as 22nd', () => {
    // Arrange
    const value = 22;
    const expected = '22nd';

    // Act
    const result = formatOrdinal(value);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 10: Format 23rd
  it('10. should format 23 as 23rd', () => {
    // Arrange
    const value = 23;
    const expected = '23rd';

    // Act
    const result = formatOrdinal(value);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 11: Format 100th
  it('11. should format 100 as 100th', () => {
    // Arrange
    const value = 100;
    const expected = '100th';

    // Act
    const result = formatOrdinal(value);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 12: Format 101st
  it('12. should format 101 as 101st', () => {
    // Arrange
    const value = 101;
    const expected = '101st';

    // Act
    const result = formatOrdinal(value);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 13: Format 111th (special case)
  it('13. should format 111 as 111th', () => {
    // Arrange
    const value = 111;
    const expected = '111th';

    // Act
    const result = formatOrdinal(value);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 14: Format negative number
  it('14. should format negative numbers', () => {
    // Arrange
    const value = -1;
    const expected = '-1st';

    // Act
    const result = formatOrdinal(value);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 15: Format zero
  it('15. should format 0 as 0th', () => {
    // Arrange
    const value = 0;
    const expected = '0th';

    // Act
    const result = formatOrdinal(value);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 16: Throw TypeError for non-number
  it('16. should throw TypeError when value is not a number', () => {
    // Arrange
    const value = 'invalid' as unknown as number;

    // Act & Assert
    expect(() => formatOrdinal(value)).toThrow(TypeError);
    expect(() => formatOrdinal(value)).toThrow('value must be a number');
  });

  // Test case 17: Throw TypeError for NaN
  it('17. should throw TypeError when value is NaN', () => {
    // Arrange
    const value = NaN;

    // Act & Assert
    expect(() => formatOrdinal(value)).toThrow(TypeError);
    expect(() => formatOrdinal(value)).toThrow('value must be a number');
  });
});
