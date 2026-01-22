import { setUnion } from '../src/setUnion';

/**
 * Unit tests for the setUnion function.
 */
describe('setUnion', () => {
  // Test case 1: Basic union of two sets
  it('1. should return union of two sets with different elements', () => {
    // Arrange
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([4, 5, 6]);

    // Act
    const result = setUnion(set1, set2);

    // Assert
    expect(result).toEqual(new Set([1, 2, 3, 4, 5, 6]));
    expect(result.size).toBe(6);
  });

  // Test case 2: Union with overlapping elements
  it('2. should handle overlapping elements correctly', () => {
    // Arrange
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([3, 4, 5]);

    // Act
    const result = setUnion(set1, set2);

    // Assert
    expect(result).toEqual(new Set([1, 2, 3, 4, 5]));
    expect(result.size).toBe(5);
  });

  // Test case 3: Union of multiple sets
  it('3. should handle union of multiple sets', () => {
    // Arrange
    const set1 = new Set(['a', 'b']);
    const set2 = new Set(['b', 'c']);
    const set3 = new Set(['c', 'd']);

    // Act
    const result = setUnion(set1, set2, set3);

    // Assert
    expect(result).toEqual(new Set(['a', 'b', 'c', 'd']));
    expect(result.size).toBe(4);
  });

  // Test case 4: Union with empty set
  it('4. should handle empty sets correctly', () => {
    // Arrange
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set<number>();

    // Act
    const result = setUnion(set1, set2);

    // Assert
    expect(result).toEqual(new Set([1, 2, 3]));
    expect(result.size).toBe(3);
  });

  // Test case 5: Union of two empty sets
  it('5. should return empty set when both sets are empty', () => {
    // Arrange
    const set1 = new Set<number>();
    const set2 = new Set<number>();

    // Act
    const result = setUnion(set1, set2);

    // Assert
    expect(result).toEqual(new Set());
    expect(result.size).toBe(0);
  });

  // Test case 6: Union with string values
  it('6. should work with string values', () => {
    // Arrange
    const set1 = new Set(['apple', 'banana']);
    const set2 = new Set(['cherry', 'date']);

    // Act
    const result = setUnion(set1, set2);

    // Assert
    expect(result).toEqual(new Set(['apple', 'banana', 'cherry', 'date']));
  });

  // Test case 7: Union with object references
  it('7. should work with object references', () => {
    // Arrange
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };
    const set1 = new Set([obj1, obj2]);
    const set2 = new Set([obj2, obj3]);

    // Act
    const result = setUnion(set1, set2);

    // Assert
    expect(result).toEqual(new Set([obj1, obj2, obj3]));
    expect(result.size).toBe(3);
  });

  // Test case 8: Does not modify original sets
  it('8. should not modify the original sets', () => {
    // Arrange
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([4, 5, 6]);
    const originalSet1 = new Set(set1);
    const originalSet2 = new Set(set2);

    // Act
    setUnion(set1, set2);

    // Assert
    expect(set1).toEqual(originalSet1);
    expect(set2).toEqual(originalSet2);
  });

  // Test case 9: Union of identical sets
  it('9. should handle union of identical sets', () => {
    // Arrange
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([1, 2, 3]);

    // Act
    const result = setUnion(set1, set2);

    // Assert
    expect(result).toEqual(new Set([1, 2, 3]));
    expect(result.size).toBe(3);
  });

  // Test case 10: Union preserves insertion order
  it('10. should preserve insertion order from first to last set', () => {
    // Arrange
    const set1 = new Set([3, 1]);
    const set2 = new Set([2, 4]);

    // Act
    const result = setUnion(set1, set2);
    const resultArray = Array.from(result);

    // Assert
    expect(resultArray).toEqual([3, 1, 2, 4]);
  });

  // Test case 11: Throw Error when fewer than two sets provided
  it('11. should throw Error when only one set is provided', () => {
    // Arrange
    const set1 = new Set([1, 2, 3]);
    const expectedMessage = 'At least two sets are required, got 1';

    // Act & Assert
    expect(() => setUnion(set1)).toThrow(Error);
    expect(() => setUnion(set1)).toThrow(expectedMessage);
  });

  // Test case 12: Throw Error when no sets provided
  it('12. should throw Error when no sets are provided', () => {
    // Arrange
    const expectedMessage = 'At least two sets are required, got 0';

    // Act & Assert
    expect(() => setUnion()).toThrow(Error);
    expect(() => setUnion()).toThrow(expectedMessage);
  });

  // Test case 13: Throw TypeError when first argument is not a Set
  it('13. should throw TypeError when first argument is not a Set', () => {
    // Arrange
    const invalidSet = [1, 2, 3] as unknown as Set<number>;
    const validSet = new Set([4, 5, 6]);
    const expectedMessage = 'All arguments must be Sets, argument 0 is object';

    // Act & Assert
    expect(() => setUnion(invalidSet, validSet)).toThrow(TypeError);
    expect(() => setUnion(invalidSet, validSet)).toThrow(expectedMessage);
  });

  // Test case 14: Throw TypeError when second argument is not a Set
  it('14. should throw TypeError when second argument is not a Set', () => {
    // Arrange
    const validSet = new Set([1, 2, 3]);
    const invalidSet = 'not a set' as unknown as Set<number>;
    const expectedMessage = 'All arguments must be Sets, argument 1 is string';

    // Act & Assert
    expect(() => setUnion(validSet, invalidSet)).toThrow(TypeError);
    expect(() => setUnion(validSet, invalidSet)).toThrow(expectedMessage);
  });

  // Test case 15: Throw TypeError when any argument in multiple sets is not a Set
  it('15. should throw TypeError when any argument is not a Set', () => {
    // Arrange
    const set1 = new Set([1, 2]);
    const set2 = new Set([3, 4]);
    const invalidSet = null as unknown as Set<number>;
    const expectedMessage = 'All arguments must be Sets, argument 2 is object';

    // Act & Assert
    expect(() => setUnion(set1, set2, invalidSet)).toThrow(TypeError);
    expect(() => setUnion(set1, set2, invalidSet)).toThrow(expectedMessage);
  });
});
