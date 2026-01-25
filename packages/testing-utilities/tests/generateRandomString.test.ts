import { generateRandomString } from '../src/generateRandomString';

/**
 * Unit tests for the generateRandomString function.
 */
describe('generateRandomString', () => {
  // Test case 1: Generate string with specified length
  it('1. should generate string with specified length', () => {
    // Act
    const result = generateRandomString(10);

    // Assert
    expect(result).toHaveLength(10);
    expect(typeof result).toBe('string');
  });

  // Test case 2: Generate alphanumeric string by default
  it('2. should generate alphanumeric string by default', () => {
    // Act
    const result = generateRandomString(100);

    // Assert
    expect(result).toMatch(/^[A-Za-z0-9]+$/);
  });

  // Test case 3: Generate alphabetic string
  it('3. should generate alphabetic-only string', () => {
    // Act
    const result = generateRandomString(100, 'alpha');

    // Assert
    expect(result).toMatch(/^[A-Za-z]+$/);
  });

  // Test case 4: Generate numeric string
  it('4. should generate numeric-only string', () => {
    // Act
    const result = generateRandomString(100, 'numeric');

    // Assert
    expect(result).toMatch(/^[0-9]+$/);
  });

  // Test case 5: Generate hex string
  it('5. should generate hexadecimal string', () => {
    // Act
    const result = generateRandomString(100, 'hex');

    // Assert
    expect(result).toMatch(/^[0-9A-F]+$/);
  });

  // Test case 6: Generate special characters
  it('6. should generate special characters string', () => {
    // Act
    const result = generateRandomString(50, 'special');

    // Assert
    expect(result).toMatch(/^[!@#$%^&*()_+\-=[\]{}|;:,.<>?]+$/);
  });

  // Test case 7: Generate empty string
  it('7. should generate empty string when length is 0', () => {
    // Act
    const result = generateRandomString(0);

    // Assert
    expect(result).toBe('');
    expect(result).toHaveLength(0);
  });

  // Test case 8: Generate single character
  it('8. should generate single character string', () => {
    // Act
    const result = generateRandomString(1);

    // Assert
    expect(result).toHaveLength(1);
    expect(typeof result).toBe('string');
  });

  // Test case 9: Different calls produce different results
  it('9. should produce different strings on different calls', () => {
    // Act
    const result1 = generateRandomString(50);
    const result2 = generateRandomString(50);

    // Assert
    expect(result1).not.toBe(result2);
  });

  // Test case 10: Large string generation
  it('10. should handle large string generation', () => {
    // Arrange
    const length = 10000;

    // Act
    const result = generateRandomString(length);

    // Assert
    expect(result).toHaveLength(10000);
    expect(typeof result).toBe('string');
  });

  // Test case 11: Error - negative length
  it('11. should throw Error when length is negative', () => {
    // Arrange
    const length = -5;

    // Act & Assert
    expect(() => generateRandomString(length)).toThrow(Error);
    expect(() => generateRandomString(length)).toThrow(
      'length must be a non-negative number',
    );
  });

  // Test case 12: Error - invalid length type
  it('12. should throw Error when length is not a number', () => {
    // Arrange
    const length = 'ten' as unknown as number;

    // Act & Assert
    expect(() => generateRandomString(length)).toThrow(Error);
    expect(() => generateRandomString(length)).toThrow(
      'length must be a non-negative number',
    );
  });
});
