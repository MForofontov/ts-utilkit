import { generateRandomNumber } from '../src/generateRandomNumber';

/**
 * Unit tests for the generateRandomNumber function.
 */
describe('generateRandomNumber', () => {
  // Test case 1: Generate integer by default
  it('1. should generate integer within range by default', () => {
    // Arrange
    const min = 1;
    const max = 100;

    // Act
    const result = generateRandomNumber(min, max);

    // Assert
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
    expect(Number.isInteger(result)).toBe(true);
  });

  // Test case 2: Generate decimal number
  it('2. should generate decimal number with specified precision', () => {
    // Arrange
    const min = 0;
    const max = 1;
    const decimals = 2;

    // Act
    const result = generateRandomNumber(min, max, decimals);

    // Assert
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
    const decimalPlaces = result.toString().split('.')[1]?.length || 0;
    expect(decimalPlaces).toBeLessThanOrEqual(decimals);
  });

  // Test case 3: Different calls produce different numbers
  it('3. should generate different numbers on different calls', () => {
    // Arrange
    const numbers = Array.from({ length: 20 }, () =>
      generateRandomNumber(1, 100),
    );

    // Assert
    const uniqueNumbers = new Set(numbers);
    expect(uniqueNumbers.size).toBeGreaterThan(1);
  });

  // Test case 4: Min equals max
  it('4. should return value between min and max when they are equal', () => {
    // Arrange
    const value = 42;

    // Act
    const result = generateRandomNumber(value, value);

    // Assert
    expect(result).toBeGreaterThanOrEqual(value);
    expect(result).toBeLessThanOrEqual(value);
  });

  // Test case 5: Negative range
  it('5. should handle negative number range', () => {
    // Arrange
    const min = -100;
    const max = -1;

    // Act
    const result = generateRandomNumber(min, max);

    // Assert
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  // Test case 6: Zero decimals equals integer
  it('6. should generate integer when decimals is 0', () => {
    // Act
    const result = generateRandomNumber(1, 100, 0);

    // Assert
    expect(Number.isInteger(result)).toBe(true);
  });

  // Test case 7: Large decimal precision
  it('7. should handle large decimal precision', () => {
    // Arrange
    const min = 0;
    const max = 1;
    const decimals = 5;

    // Act
    const result = generateRandomNumber(min, max, decimals);

    // Assert
    const decimalPlaces = result.toString().split('.')[1]?.length || 0;
    expect(decimalPlaces).toBeLessThanOrEqual(decimals);
  });

  // Test case 8: Error - min greater than max
  it('8. should throw Error when min is greater than max', () => {
    // Arrange
    const min = 100;
    const max = 1;

    // Act & Assert
    expect(() => generateRandomNumber(min, max)).toThrow(Error);
    expect(() => generateRandomNumber(min, max)).toThrow(
      'min must be less than or equal to max',
    );
  });

  // Test case 9: Error - negative decimals
  it('9. should throw Error when decimals is negative', () => {
    // Arrange
    const min = 1;
    const max = 100;
    const decimals = -1;

    // Act & Assert
    expect(() => generateRandomNumber(min, max, decimals)).toThrow(Error);
    expect(() => generateRandomNumber(min, max, decimals)).toThrow(
      'decimals must be non-negative',
    );
  });
});
