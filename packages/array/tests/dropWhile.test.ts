import { dropWhile } from '../src/dropWhile';

describe('dropWhile', () => {
  // Test case 1: Drop numbers while less than 4
  it('1. should drop elements while predicate is true and return the rest', () => {
    expect(dropWhile([1, 2, 3, 4, 2, 1], (n) => n < 4)).toEqual([4, 2, 1]);
  });

  // Test case 2: Drop leading blank strings
  it('2. should drop leading empty/whitespace strings', () => {
    expect(dropWhile(['', ' ', 'hello', '', 'world'], (s) => s.trim() === '')).toEqual([
      'hello',
      '',
      'world',
    ]);
  });

  // Test case 3: Drop objects while a property satisfies condition
  it('3. should drop objects while a property satisfies the predicate', () => {
    // Arrange
    const items = [
      { id: 1, ready: false },
      { id: 2, ready: false },
      { id: 3, ready: true },
      { id: 4, ready: false },
    ];

    // Act & Assert
    expect(dropWhile(items, (x) => !x.ready)).toEqual([
      { id: 3, ready: true },
      { id: 4, ready: false },
    ]);
  });

  // Test case 4: First element fails — returns entire array
  it('4. should return the entire array when the first element fails the predicate', () => {
    expect(dropWhile([5, 1, 2, 3], (n) => n < 4)).toEqual([5, 1, 2, 3]);
  });

  // Test case 5: All elements pass — returns empty array
  it('5. should return an empty array when all elements satisfy the predicate', () => {
    expect(dropWhile([1, 2, 3], (n) => n < 10)).toEqual([]);
  });

  // Test case 6: Empty array returns empty array
  it('6. should return an empty array for empty input', () => {
    expect(dropWhile([], (n) => n > 0)).toEqual([]);
  });

  // Test case 7: Single-element array — element passes
  it('7. should return empty array when the single element passes', () => {
    expect(dropWhile([3], (n) => n > 0)).toEqual([]);
  });

  // Test case 8: Single-element array — element fails
  it('8. should return the element when the single element fails', () => {
    expect(dropWhile([-1], (n) => n > 0)).toEqual([-1]);
  });

  // Test case 9: Includes elements after first false even if they would pass
  it('9. should include all elements after the first false, even if they satisfy predicate', () => {
    // After 3 stops the drop, 1 and 2 are still included even though n < 4
    expect(dropWhile([1, 2, 3, 4, 1, 2], (n) => n < 3)).toEqual([3, 4, 1, 2]);
  });

  // Test case 10: Stops testing at first false
  it('10. should stop testing elements after the first false', () => {
    // Arrange
    const tested: number[] = [];
    const arr = [1, 2, 10, 3, 4];

    // Act
    dropWhile(arr, (n) => {
      tested.push(n);
      return n < 5;
    });

    // Assert — 10 triggered the stop; 3 and 4 were never tested
    expect(tested).toEqual([1, 2, 10]);
  });

  // Test case 11: Predicate receives correct index and array
  it('11. should pass index and array to the predicate', () => {
    // Arrange
    const arr = ['a', 'b', 'c'];
    const capturedIndexes: number[] = [];

    // Act
    dropWhile(arr, (_v, index) => {
      capturedIndexes.push(index);
      return index < 1;
    });

    // Assert
    expect(capturedIndexes).toEqual([0, 1]);
  });

  // Test case 12: Does not mutate the original array
  it('12. should not mutate the original array', () => {
    // Arrange
    const arr = [1, 2, 3, 4, 5];
    const original = [...arr];

    // Act
    dropWhile(arr, (n) => n < 3);

    // Assert
    expect(arr).toEqual(original);
  });

  // Test case 13: Works correctly with boolean array
  it('13. should drop leading true values from a boolean array', () => {
    expect(dropWhile([true, true, false, true], (b) => b)).toEqual([false, true]);
  });

  // Test case 14: Large array performance
  it('14. should handle large arrays efficiently', () => {
    // Arrange
    const arr = Array.from({ length: 10000 }, (_, i) => i);

    // Act
    const start = performance.now();
    const result = dropWhile(arr, (n) => n < 5000);
    const end = performance.now();

    // Assert
    expect(result).toHaveLength(5000);
    expect(end - start).toBeLessThan(100);
  });

  // Error cases
  // Test case 15: Throws TypeError when arr is not an array
  it('15. should throw TypeError when arr is not an array', () => {
    expect(() => dropWhile('not an array' as unknown as string[], (x) => !!x)).toThrow(TypeError);
    expect(() => dropWhile('not an array' as unknown as string[], (x) => !!x)).toThrow(
      'arr must be an array, got string',
    );
  });

  // Test case 16: Throws TypeError when arr is null
  it('16. should throw TypeError when arr is null', () => {
    expect(() => dropWhile(null as unknown as never[], (x) => !!x)).toThrow(TypeError);
    expect(() => dropWhile(null as unknown as never[], (x) => !!x)).toThrow(
      'arr must be an array, got object',
    );
  });

  // Test case 17: Throws TypeError when predicate is not a function
  it('17. should throw TypeError when predicate is not a function', () => {
    expect(() => dropWhile([1, 2, 3], true as unknown as () => boolean)).toThrow(TypeError);
    expect(() => dropWhile([1, 2, 3], true as unknown as () => boolean)).toThrow(
      'predicate must be a function, got boolean',
    );
  });
});
