import { countBy } from '../src/countBy';

describe('countBy', () => {
  // Test case 1: Count numbers by even/odd
  it('1. should count numbers grouped by even and odd', () => {
    // Act
    const result = countBy([1, 2, 3, 4, 5, 6], (n) =>
      n % 2 === 0 ? 'even' : 'odd',
    );

    // Assert
    expect(result.get('even')).toBe(3);
    expect(result.get('odd')).toBe(3);
    expect(result.size).toBe(2);
  });

  // Test case 2: Count strings by first letter
  it('2. should count strings grouped by their first letter', () => {
    // Act
    const result = countBy(
      ['apple', 'avocado', 'banana', 'blueberry', 'cherry'],
      (w) => w[0],
    );

    // Assert
    expect(result.get('a')).toBe(2);
    expect(result.get('b')).toBe(2);
    expect(result.get('c')).toBe(1);
    expect(result.size).toBe(3);
  });

  // Test case 3: Count objects by a property value
  it('3. should count objects grouped by a string property', () => {
    // Arrange
    const orders = [
      { status: 'pending' },
      { status: 'shipped' },
      { status: 'pending' },
      { status: 'delivered' },
      { status: 'shipped' },
      { status: 'pending' },
    ];

    // Act
    const result = countBy(orders, (o) => o.status);

    // Assert
    expect(result.get('pending')).toBe(3);
    expect(result.get('shipped')).toBe(2);
    expect(result.get('delivered')).toBe(1);
    expect(result.size).toBe(3);
  });

  // Test case 4: Empty array returns empty Map
  it('4. should return an empty Map for an empty array', () => {
    const result = countBy([], (x) => String(x));
    expect(result.size).toBe(0);
    expect(result).toBeInstanceOf(Map);
  });

  // Test case 5: All elements map to the same key
  it('5. should return a Map with one entry when all elements share the same key', () => {
    const result = countBy([1, 1, 1, 1], () => 'same');
    expect(result.size).toBe(1);
    expect(result.get('same')).toBe(4);
  });

  // Test case 6: All elements map to unique keys
  it('6. should return a Map with one entry per element when all keys are unique', () => {
    const result = countBy(['a', 'b', 'c', 'd'], (s) => s);
    expect(result.size).toBe(4);
    expect(result.get('a')).toBe(1);
    expect(result.get('d')).toBe(1);
  });

  // Test case 7: Returns a Map instance
  it('7. should return a Map instance', () => {
    const result = countBy([1, 2, 3], (n) => String(n));
    expect(result).toBeInstanceOf(Map);
  });

  // Test case 8: Insertion order is preserved
  it('8. should preserve insertion order of keys', () => {
    const result = countBy(['b', 'a', 'c', 'b', 'a'], (s) => s);
    const keys = [...result.keys()];
    expect(keys).toEqual(['b', 'a', 'c']);
  });

  // Test case 9: Predicate receives correct index and array
  it('9. should pass index and array to the keyFn', () => {
    // Arrange
    const arr = ['x', 'y', 'z'];
    const capturedIndexes: number[] = [];

    // Act
    countBy(arr, (_v, index) => {
      capturedIndexes.push(index);
      return String(index);
    });

    // Assert
    expect(capturedIndexes).toEqual([0, 1, 2]);
  });

  // Test case 10: Count by string length
  it('10. should count strings grouped by their length', () => {
    // 'a'=1, 'e'=1 → length 1 count 2; 'bb'=2, 'cc'=2 → length 2 count 2; 'ddd'=3 → length 3 count 1
    const result = countBy(['a', 'bb', 'cc', 'ddd', 'e'], (s) =>
      String(s.length),
    );
    expect(result.get('1')).toBe(2);
    expect(result.get('2')).toBe(2);
    expect(result.get('3')).toBe(1);
  });

  // Test case 11: Does not mutate the original array
  it('11. should not mutate the original array', () => {
    // Arrange
    const arr = [1, 2, 3, 4];
    const original = [...arr];

    // Act
    countBy(arr, (n) => (n % 2 === 0 ? 'even' : 'odd'));

    // Assert
    expect(arr).toEqual(original);
  });

  // Test case 12: Large array performance
  it('12. should handle large arrays efficiently', () => {
    // Arrange
    const arr = Array.from({ length: 10000 }, (_, i) => i);

    // Act
    const start = performance.now();
    const result = countBy(arr, (n) => (n % 2 === 0 ? 'even' : 'odd'));
    const end = performance.now();

    // Assert
    expect(result.get('even')).toBe(5000);
    expect(result.get('odd')).toBe(5000);
    expect(end - start).toBeLessThan(100);
  });

  // Error cases
  // Test case 13: Throws TypeError when arr is not an array
  it('13. should throw TypeError when arr is not an array', () => {
    expect(() => countBy('not an array' as unknown as string[], (x) => x)).toThrow(TypeError);
    expect(() => countBy('not an array' as unknown as string[], (x) => x)).toThrow(
      'arr must be an array, got string',
    );
  });

  // Test case 14: Throws TypeError when arr is null
  it('14. should throw TypeError when arr is null', () => {
    expect(() => countBy(null as unknown as never[], (x) => String(x))).toThrow(TypeError);
    expect(() => countBy(null as unknown as never[], (x) => String(x))).toThrow(
      'arr must be an array, got object',
    );
  });

  // Test case 15: Throws TypeError when keyFn is not a function
  it('15. should throw TypeError when keyFn is not a function', () => {
    expect(() => countBy([1, 2, 3], 'not a function' as unknown as () => string)).toThrow(TypeError);
    expect(() => countBy([1, 2, 3], 'not a function' as unknown as () => string)).toThrow(
      'keyFn must be a function, got string',
    );
  });
});
