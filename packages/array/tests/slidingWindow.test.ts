import { slidingWindow } from '../src/slidingWindow';

describe('slidingWindow', () => {
  // Test case 1: Basic window of size 3 over 5 elements
  it('1. should produce correct windows for size 3', () => {
    expect(slidingWindow([1, 2, 3, 4, 5], 3)).toEqual([
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5],
    ]);
  });

  // Test case 2: Window size 2
  it('2. should produce correct windows for size 2', () => {
    expect(slidingWindow([10, 20, 30, 40], 2)).toEqual([
      [10, 20],
      [20, 30],
      [30, 40],
    ]);
  });

  // Test case 3: Window size 1 — each element is its own window
  it('3. should produce single-element windows for size 1', () => {
    expect(slidingWindow([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
  });

  // Test case 4: Window size equals array length — one window
  it('4. should return a single window when size equals array length', () => {
    expect(slidingWindow([1, 2, 3], 3)).toEqual([[1, 2, 3]]);
  });

  // Test case 5: Window size larger than array — returns empty array
  it('5. should return an empty array when size exceeds array length', () => {
    expect(slidingWindow([1, 2], 5)).toEqual([]);
  });

  // Test case 6: Empty array — returns empty array
  it('6. should return an empty array for an empty input', () => {
    expect(slidingWindow([], 3)).toEqual([]);
  });

  // Test case 7: Works with strings
  it('7. should work correctly with string arrays', () => {
    expect(slidingWindow(['a', 'b', 'c', 'd'], 2)).toEqual([
      ['a', 'b'],
      ['b', 'c'],
      ['c', 'd'],
    ]);
  });

  // Test case 8: Works with objects
  it('8. should work correctly with arrays of objects', () => {
    // Arrange
    const data = [{ v: 1 }, { v: 2 }, { v: 3 }];

    // Act
    const windows = slidingWindow(data, 2);

    // Assert
    expect(windows).toHaveLength(2);
    expect(windows[0]).toEqual([{ v: 1 }, { v: 2 }]);
    expect(windows[1]).toEqual([{ v: 2 }, { v: 3 }]);
  });

  // Test case 9: Correct number of windows produced
  it('9. should produce (n - size + 1) windows', () => {
    // Arrange
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const size = 3;
    const expectedCount = arr.length - size + 1; // 5

    // Act
    const windows = slidingWindow(arr, size);

    // Assert
    expect(windows).toHaveLength(expectedCount);
  });

  // Test case 10: Each window has the correct size
  it('10. should ensure every window has exactly the given size', () => {
    // Arrange
    const arr = [1, 2, 3, 4, 5];
    const size = 3;

    // Act
    const windows = slidingWindow(arr, size);

    // Assert
    for (const window of windows) {
      expect(window).toHaveLength(size);
    }
  });

  // Test case 11: Does not mutate the original array
  it('11. should not mutate the original array', () => {
    // Arrange
    const arr = [1, 2, 3, 4];
    const original = [...arr];

    // Act
    slidingWindow(arr, 2);

    // Assert
    expect(arr).toEqual(original);
  });

  // Test case 12: Moving-average use case
  it('12. should compute correct moving averages via sliding windows', () => {
    // Arrange
    const prices = [10, 11, 12, 10, 9];
    const windows = slidingWindow(prices, 3);

    // Act
    const averages = windows.map(
      (w) => Math.round((w.reduce((a, b) => a + b, 0) / w.length) * 100) / 100,
    );

    // Assert
    expect(averages).toEqual([11, 11, 10.33]);
  });

  // Test case 13: Large array performance
  it('13. should handle large arrays efficiently', () => {
    // Arrange
    const arr = Array.from({ length: 1000 }, (_, i) => i);

    // Act
    const start = performance.now();
    const windows = slidingWindow(arr, 100);
    const end = performance.now();

    // Assert
    expect(windows).toHaveLength(901);
    expect(end - start).toBeLessThan(100);
  });

  // Error cases
  // Test case 14: Throws TypeError when arr is not an array
  it('14. should throw TypeError when arr is not an array', () => {
    expect(() => slidingWindow('not an array' as unknown as string[], 2)).toThrow(TypeError);
    expect(() => slidingWindow('not an array' as unknown as string[], 2)).toThrow(
      'arr must be an array, got string',
    );
  });

  // Test case 15: Throws TypeError when arr is null
  it('15. should throw TypeError when arr is null', () => {
    expect(() => slidingWindow(null as unknown as never[], 2)).toThrow(TypeError);
    expect(() => slidingWindow(null as unknown as never[], 2)).toThrow(
      'arr must be an array, got object',
    );
  });

  // Test case 16: Throws TypeError when size is not a number
  it('16. should throw TypeError when size is not a number', () => {
    expect(() => slidingWindow([1, 2, 3], '2' as unknown as number)).toThrow(TypeError);
    expect(() => slidingWindow([1, 2, 3], '2' as unknown as number)).toThrow(
      'size must be a number, got string',
    );
  });

  // Test case 17: Throws TypeError when size is NaN
  it('17. should throw TypeError when size is NaN', () => {
    expect(() => slidingWindow([1, 2, 3], NaN)).toThrow(TypeError);
    expect(() => slidingWindow([1, 2, 3], NaN)).toThrow(
      'size must be a number, got number',
    );
  });

  // Test case 18: Throws Error when size is zero
  it('18. should throw Error when size is 0', () => {
    expect(() => slidingWindow([1, 2, 3], 0)).toThrow(Error);
    expect(() => slidingWindow([1, 2, 3], 0)).toThrow(
      'size must be a positive integer, got 0',
    );
  });

  // Test case 19: Throws Error when size is negative
  it('19. should throw Error when size is negative', () => {
    expect(() => slidingWindow([1, 2, 3], -3)).toThrow(Error);
    expect(() => slidingWindow([1, 2, 3], -3)).toThrow(
      'size must be a positive integer, got -3',
    );
  });

  // Test case 20: Throws Error when size is a non-integer float
  it('20. should throw Error when size is a non-integer float', () => {
    expect(() => slidingWindow([1, 2, 3], 1.5)).toThrow(Error);
    expect(() => slidingWindow([1, 2, 3], 1.5)).toThrow(
      'size must be a positive integer, got 1.5',
    );
  });
});
