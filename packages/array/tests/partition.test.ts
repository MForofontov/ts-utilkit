import { partition } from '../src/partition';

describe('partition', () => {
  // Test case 1: Partition numbers into even and odd
  it('1. should partition numbers into even and odd groups', () => {
    // Arrange
    const arr = [1, 2, 3, 4, 5, 6];

    // Act
    const [evens, odds] = partition(arr, (n) => n % 2 === 0);

    // Assert
    expect(evens).toEqual([2, 4, 6]);
    expect(odds).toEqual([1, 3, 5]);
  });

  // Test case 2: Partition strings by length
  it('2. should partition strings by length condition', () => {
    // Arrange
    const arr = ['hi', 'hello', 'hey', 'world', 'ok'];

    // Act
    const [short, long] = partition(arr, (s) => s.length <= 2);

    // Assert
    expect(short).toEqual(['hi', 'ok']);
    expect(long).toEqual(['hello', 'hey', 'world']);
  });

  // Test case 3: Partition objects by a property
  it('3. should partition objects by a boolean property', () => {
    // Arrange
    const users = [
      { name: 'Alice', active: true },
      { name: 'Bob', active: false },
      { name: 'Charlie', active: true },
      { name: 'Dave', active: false },
    ];

    // Act
    const [active, inactive] = partition(users, (u) => u.active);

    // Assert
    expect(active).toEqual([
      { name: 'Alice', active: true },
      { name: 'Charlie', active: true },
    ]);
    expect(inactive).toEqual([
      { name: 'Bob', active: false },
      { name: 'Dave', active: false },
    ]);
  });

  // Test case 4: Empty array returns two empty arrays
  it('4. should return [[], []] for an empty array', () => {
    // Act
    const [matches, nonMatches] = partition([], (x) => !!x);

    // Assert
    expect(matches).toEqual([]);
    expect(nonMatches).toEqual([]);
  });

  // Test case 5: All elements satisfy predicate
  it('5. should return [arr, []] when all elements satisfy the predicate', () => {
    // Arrange
    const arr = [2, 4, 6, 8];

    // Act
    const [evens, odds] = partition(arr, (n) => n % 2 === 0);

    // Assert
    expect(evens).toEqual([2, 4, 6, 8]);
    expect(odds).toEqual([]);
  });

  // Test case 6: No elements satisfy predicate
  it('6. should return [[], arr] when no elements satisfy the predicate', () => {
    // Arrange
    const arr = [1, 3, 5, 7];

    // Act
    const [evens, odds] = partition(arr, (n) => n % 2 === 0);

    // Assert
    expect(evens).toEqual([]);
    expect(odds).toEqual([1, 3, 5, 7]);
  });

  // Test case 7: Single-element array — matches
  it('7. should correctly partition a single-element array when element matches', () => {
    const [matches, nonMatches] = partition([42], (n) => n > 0);
    expect(matches).toEqual([42]);
    expect(nonMatches).toEqual([]);
  });

  // Test case 8: Single-element array — does not match
  it('8. should correctly partition a single-element array when element does not match', () => {
    const [matches, nonMatches] = partition([-1], (n) => n > 0);
    expect(matches).toEqual([]);
    expect(nonMatches).toEqual([-1]);
  });

  // Test case 9: Predicate receives correct index and array arguments
  it('9. should pass index and array to the predicate', () => {
    // Arrange
    const arr = ['a', 'b', 'c', 'd'];
    const capturedArgs: { value: string; index: number }[] = [];

    // Act
    partition(arr, (value, index, _array) => {
      capturedArgs.push({ value, index });
      return index % 2 === 0;
    });

    // Assert
    expect(capturedArgs).toEqual([
      { value: 'a', index: 0 },
      { value: 'b', index: 1 },
      { value: 'c', index: 2 },
      { value: 'd', index: 3 },
    ]);
  });

  // Test case 10: Preserves element order within each group
  it('10. should preserve the relative order of elements in both groups', () => {
    // Arrange
    const arr = [5, 1, 4, 2, 3];

    // Act
    const [greaterThanTwo, notGreaterThanTwo] = partition(arr, (n) => n > 2);

    // Assert
    expect(greaterThanTwo).toEqual([5, 4, 3]);
    expect(notGreaterThanTwo).toEqual([1, 2]);
  });

  // Test case 11: Does not mutate the original array
  it('11. should not mutate the original array', () => {
    // Arrange
    const arr = [1, 2, 3, 4];
    const original = [...arr];

    // Act
    partition(arr, (n) => n > 2);

    // Assert
    expect(arr).toEqual(original);
  });

  // Test case 12: Works with mixed types in a union array
  it('12. should correctly partition a mixed-type array', () => {
    // Arrange
    const arr: (number | string)[] = [1, 'two', 3, 'four', 5];

    // Act
    const [numbers, strings] = partition(arr, (x) => typeof x === 'number');

    // Assert
    expect(numbers).toEqual([1, 3, 5]);
    expect(strings).toEqual(['two', 'four']);
  });

  // Test case 13: Large array performance
  it('13. should handle large arrays efficiently', () => {
    // Arrange
    const arr = Array.from({ length: 10000 }, (_, i) => i);

    // Act
    const start = performance.now();
    const [evens, odds] = partition(arr, (n) => n % 2 === 0);
    const end = performance.now();

    // Assert
    expect(evens).toHaveLength(5000);
    expect(odds).toHaveLength(5000);
    expect(end - start).toBeLessThan(100);
  });
});
