import { assertArraysEqual } from '../src/assertArraysEqual';

/**
 * Unit tests for the assertArraysEqual function.
 */
describe('assertArraysEqual', () => {
  // Test case 1: Equal arrays in same order
  it('1. should return true for equal arrays in same order', () => {
    // Arrange
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];

    // Act
    const result = assertArraysEqual(arr1, arr2);

    // Assert
    expect(result).toBe(true);
  });

  // Test case 2: Equal arrays in different order
  it('2. should return true for equal arrays in different order', () => {
    // Arrange
    const arr1 = [1, 2, 3];
    const arr2 = [3, 2, 1];

    // Act
    const result = assertArraysEqual(arr1, arr2);

    // Assert
    expect(result).toBe(true);
  });

  // Test case 3: Empty arrays are equal
  it('3. should return true for empty arrays', () => {
    // Arrange
    const arr1: number[] = [];
    const arr2: number[] = [];

    // Act
    const result = assertArraysEqual(arr1, arr2);

    // Assert
    expect(result).toBe(true);
  });

  // Test case 4: Arrays with string elements
  it('4. should return true for equal string arrays', () => {
    // Arrange
    const arr1 = ['a', 'b', 'c'];
    const arr2 = ['c', 'a', 'b'];

    // Act
    const result = assertArraysEqual(arr1, arr2);

    // Assert
    expect(result).toBe(true);
  });

  // Test case 5: Arrays with object elements (same order)
  it('5. should return true for arrays with equal objects in same order', () => {
    // Arrange
    const arr1 = [{ id: 1 }, { id: 2 }];
    const arr2 = [{ id: 1 }, { id: 2 }];

    // Act
    const result = assertArraysEqual(arr1, arr2);

    // Assert
    expect(result).toBe(true);
  });

  // Test case 6: Different lengths return false
  it('6. should return false for arrays with different lengths', () => {
    // Arrange
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2];

    // Act
    const result = assertArraysEqual(arr1, arr2);

    // Assert
    expect(result).toBe(false);
  });

  // Test case 7: Different values return false
  it('7. should return false for arrays with different values', () => {
    // Arrange
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 4];

    // Act
    const result = assertArraysEqual(arr1, arr2);

    // Assert
    expect(result).toBe(false);
  });

  // Test case 8: Arrays with null values
  it('8. should handle arrays with null values', () => {
    // Arrange
    const arr1 = [1, null, 3];
    const arr2 = [3, 1, null];

    // Act
    const result = assertArraysEqual(arr1, arr2);

    // Assert
    expect(result).toBe(true);
  });

  // Test case 9: Arrays with undefined values
  it('9. should handle arrays with undefined values', () => {
    // Arrange
    const arr1 = [1, undefined, 3];
    const arr2 = [undefined, 3, 1];

    // Act
    const result = assertArraysEqual(arr1, arr2);

    // Assert
    expect(result).toBe(true);
  });

  // Test case 10: First argument not array
  it('10. should return false when first argument is not an array', () => {
    // Arrange
    const arr1 = 'not an array' as unknown as unknown[];
    const arr2 = [1, 2, 3];

    // Act
    const result = assertArraysEqual(arr1, arr2);

    // Assert
    expect(result).toBe(false);
  });

  // Test case 11: Second argument not array
  it('11. should return false when second argument is not an array', () => {
    // Arrange
    const arr1 = [1, 2, 3];
    const arr2 = 'not an array' as unknown as unknown[];

    // Act
    const result = assertArraysEqual(arr1, arr2);

    // Assert
    expect(result).toBe(false);
  });

  // Test case 12: Nested arrays
  it('12. should handle nested arrays', () => {
    // Arrange
    const arr1 = [
      [1, 2],
      [3, 4],
    ];
    const arr2 = [
      [3, 4],
      [1, 2],
    ];

    // Act
    const result = assertArraysEqual(arr1, arr2);

    // Assert
    expect(result).toBe(true);
  });
});
