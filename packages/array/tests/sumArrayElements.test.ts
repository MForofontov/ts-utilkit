import { sumArrayElements } from '../src/sumArrayElements';

/**
 * Unit tests for the sumArrayElements function.
 */
describe('sumArrayElements', () => {
  // Test case 1: Normal usage with positive integers
  it('1. should sum positive integers correctly', () => {
    // Arrange
    const input = [1, 2, 3, 4, 5];
    const expected = 15;

    // Act
    const result = sumArrayElements(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 2: Normal usage with mixed positive and negative numbers
  it('2. should sum mixed positive and negative numbers correctly', () => {
    // Arrange
    const input = [1, -2, 3, -4, 5];
    const expected = 3;

    // Act
    const result = sumArrayElements(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 3: Edge case - empty array
  it('3. should return 0 for empty array', () => {
    // Arrange
    const input: number[] = [];
    const expected = 0;

    // Act
    const result = sumArrayElements(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 4: Edge case - single element array
  it('4. should return the element itself for single element array', () => {
    // Arrange & Act & Assert
    expect(sumArrayElements([42])).toBe(42);
    expect(sumArrayElements([0])).toBe(0);
    expect(sumArrayElements([-7])).toBe(-7);
  });

  // Test case 5: Normal usage with all negative numbers
  it('5. should sum all negative numbers correctly', () => {
    // Arrange
    const input = [-1, -2, -3, -4, -5];
    const expected = -15;

    // Act
    const result = sumArrayElements(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 6: Normal usage with floating point numbers
  it('6. should sum floating point numbers correctly', () => {
    // Arrange
    const input = [1.1, 2.2, 3.3];
    const expected = 6.6;

    // Act
    const result = sumArrayElements(input);

    // Assert
    expect(result).toBeCloseTo(expected, 10); // Use toBeCloseTo for floating point comparison
  });

  // Test case 7: Edge case - array with zeros
  it('7. should handle arrays containing zeros', () => {
    // Arrange
    const input = [0, 0, 0, 5, 0];
    const expected = 5;

    // Act
    const result = sumArrayElements(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 8: Normal usage - array with all zeros
  it('8. should return 0 for array of all zeros', () => {
    // Arrange
    const input = [0, 0, 0, 0, 0];
    const expected = 0;

    // Act
    const result = sumArrayElements(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 9: Normal usage with large positive numbers
  it('9. should sum large positive numbers correctly', () => {
    // Arrange
    const input = [1000, 2000, 3000, 4000];
    const expected = 10000;

    // Act
    const result = sumArrayElements(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 10: Normal usage with decimal precision
  it('10. should handle decimal numbers with precision', () => {
    // Arrange
    const input = [0.1, 0.2, 0.3];
    const expected = 0.6;

    // Act
    const result = sumArrayElements(input);

    // Assert
    expect(result).toBeCloseTo(expected, 10);
  });

  // Test case 11: Edge case - very small floating point numbers
  it('11. should sum very small floating point numbers', () => {
    // Arrange
    const input = [0.001, 0.002, 0.003];
    const expected = 0.006;

    // Act
    const result = sumArrayElements(input);

    // Assert
    expect(result).toBeCloseTo(expected, 10);
  });

  // Test case 12: Performance test with large array
  it('12. should handle large arrays efficiently', () => {
    // Arrange
    const input: number[] = new Array<number>(10000).fill(1);
    const expected = 10000;

    // Act
    const startTime = performance.now();
    const result = sumArrayElements(input);
    const endTime = performance.now();

    // Assert
    expect(result).toBe(expected);
    expect(endTime - startTime).toBeLessThan(50); // Should complete within 50ms
  });

  // Test case 13: Normal usage with mixed integer and float
  it('13. should sum mixed integers and floats correctly', () => {
    // Arrange
    const input = [1, 2.5, 3, 4.7, 5];
    const expected = 16.2;

    // Act
    const result = sumArrayElements(input);

    // Assert
    expect(result).toBeCloseTo(expected, 10);
  });

  // Test case 14: Edge case - alternating positive and negative
  it('14. should handle alternating positive and negative numbers', () => {
    // Arrange
    const input = [10, -5, 10, -5, 10, -5];
    const expected = 15;

    // Act
    const result = sumArrayElements(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 15: Normal usage - two element array
  it('15. should sum two element array correctly', () => {
    // Arrange & Act & Assert
    expect(sumArrayElements([1, 2])).toBe(3);
    expect(sumArrayElements([10, -5])).toBe(5);
    expect(sumArrayElements([-3, -7])).toBe(-10);
  });

  // Test case 16: Edge case - array with Infinity
  it('16. should handle Infinity in array', () => {
    // Arrange
    const input = [1, 2, Infinity];
    const expected = Infinity;

    // Act
    const result = sumArrayElements(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 17: Edge case - array with -Infinity
  it('17. should handle -Infinity in array', () => {
    // Arrange
    const input = [1, 2, -Infinity];
    const expected = -Infinity;

    // Act
    const result = sumArrayElements(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 18: Edge case - NaN in array
  it('18. should return NaN when array contains NaN', () => {
    // Arrange
    const input = [1, 2, NaN, 4];

    // Act
    const result = sumArrayElements(input);

    // Assert
    expect(result).toBeNaN();
  });

  // Test case 19: Normal usage - array with duplicates
  it('19. should sum array with duplicate values correctly', () => {
    // Arrange
    const input = [5, 5, 5, 5, 5];
    const expected = 25;

    // Act
    const result = sumArrayElements(input);

    // Assert
    expect(result).toBe(expected);
  });

  // Test case 20: Edge case - very large sum
  it('20. should handle very large sums', () => {
    // Arrange
    const input: number[] = [
      Number.MAX_SAFE_INTEGER / 2,
      Number.MAX_SAFE_INTEGER / 2,
    ];
    const expected = Number.MAX_SAFE_INTEGER;

    // Act
    const result = sumArrayElements(input);

    // Assert
    expect(result).toBeCloseTo(expected, -10); // Less precision for very large numbers
  });
});
