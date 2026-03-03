import { takeWhile } from '../src/takeWhile';

describe('takeWhile', () => {
  // Test case 1: Basic — take numbers less than 4
  it('1. should take elements while predicate is true', () => {
    expect(takeWhile([1, 2, 3, 4, 2, 1], (n) => n < 4)).toEqual([1, 2, 3]);
  });

  // Test case 2: Take strings by length
  it('2. should take strings while their length is within limit', () => {
    expect(takeWhile(['hi', 'hey', 'hello', 'world!'], (w) => w.length < 6)).toEqual([
      'hi',
      'hey',
      'hello',
    ]);
  });

  // Test case 3: Take objects while a property matches
  it('3. should take objects while a property satisfies the predicate', () => {
    // Arrange
    const items = [
      { value: 1, active: true },
      { value: 2, active: true },
      { value: 3, active: false },
      { value: 4, active: true },
    ];

    // Act & Assert
    expect(takeWhile(items, (x) => x.active)).toEqual([
      { value: 1, active: true },
      { value: 2, active: true },
    ]);
  });

  // Test case 4: First element fails — returns empty array
  it('4. should return an empty array when first element fails the predicate', () => {
    expect(takeWhile([5, 1, 2, 3], (n) => n < 4)).toEqual([]);
  });

  // Test case 5: All elements pass — returns full array
  it('5. should return the full array when all elements satisfy the predicate', () => {
    expect(takeWhile([1, 2, 3], (n) => n < 10)).toEqual([1, 2, 3]);
  });

  // Test case 6: Empty array returns empty array
  it('6. should return an empty array for an empty input', () => {
    expect(takeWhile([], (n) => n > 0)).toEqual([]);
  });

  // Test case 7: Single-element array — element passes
  it('7. should return the element when the single element passes', () => {
    expect(takeWhile([3], (n) => n > 0)).toEqual([3]);
  });

  // Test case 8: Single-element array — element fails
  it('8. should return empty array when the single element fails', () => {
    expect(takeWhile([-1], (n) => n > 0)).toEqual([]);
  });

  // Test case 9: Stops at first false — does not test later elements
  it('9. should stop testing elements after the first false', () => {
    // Arrange
    const tested: number[] = [];
    const arr = [1, 2, 10, 3, 4];

    // Act
    takeWhile(arr, (n) => {
      tested.push(n);
      return n < 5;
    });

    // Assert — 10 was tested (it triggered the stop), but 3 and 4 were not
    expect(tested).toEqual([1, 2, 10]);
  });

  // Test case 10: Predicate receives correct index and array
  it('10. should pass index and array to the predicate', () => {
    // Arrange
    const arr = ['a', 'b', 'c'];
    const capturedIndexes: number[] = [];

    // Act
    takeWhile(arr, (_v, index) => {
      capturedIndexes.push(index);
      return index < 2;
    });

    // Assert
    expect(capturedIndexes).toEqual([0, 1, 2]);
  });

  // Test case 11: Does not mutate the original array
  it('11. should not mutate the original array', () => {
    // Arrange
    const arr = [1, 2, 3, 4, 5];
    const original = [...arr];

    // Act
    takeWhile(arr, (n) => n < 3);

    // Assert
    expect(arr).toEqual(original);
  });

  // Test case 12: Works correctly with boolean array
  it('12. should take leading true values from a boolean array', () => {
    expect(takeWhile([true, true, false, true], (b) => b)).toEqual([true, true]);
  });

  // Test case 13: Large array performance
  it('13. should handle large arrays efficiently', () => {
    // Arrange
    const arr = Array.from({ length: 10000 }, (_, i) => i);

    // Act
    const start = performance.now();
    const result = takeWhile(arr, (n) => n < 5000);
    const end = performance.now();

    // Assert
    expect(result).toHaveLength(5000);
    expect(end - start).toBeLessThan(100);
  });

});
