import { createCounterMap } from '../src/createCounterMap';

describe('createCounterMap', () => {
  // ─── Normal / typical usage ────────────────────────────────────────────────

  it('1. should count occurrences of strings', () => {
    // Arrange
    const items = ['a', 'b', 'a', 'c', 'b', 'a'];

    // Act
    const result = createCounterMap(items);

    // Assert
    expect(result.get('a')).toBe(3);
    expect(result.get('b')).toBe(2);
    expect(result.get('c')).toBe(1);
    expect(result.size).toBe(3);
  });

  it('2. should count occurrences of numbers', () => {
    // Arrange
    const items = [1, 2, 2, 3, 3, 3];

    // Act
    const result = createCounterMap(items);

    // Assert
    expect(result.get(1)).toBe(1);
    expect(result.get(2)).toBe(2);
    expect(result.get(3)).toBe(3);
    expect(result.size).toBe(3);
  });

  it('3. should count occurrences of booleans', () => {
    // Arrange
    const items = [true, false, true, true, false];

    // Act
    const result = createCounterMap(items);

    // Assert
    expect(result.get(true)).toBe(3);
    expect(result.get(false)).toBe(2);
    expect(result.size).toBe(2);
  });

  it('4. should count object references by identity', () => {
    // Arrange
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const items = [obj1, obj2, obj1, obj1];

    // Act
    const result = createCounterMap(items);

    // Assert
    expect(result.get(obj1)).toBe(3);
    expect(result.get(obj2)).toBe(1);
    expect(result.size).toBe(2);
  });

  it('5. should treat structurally equal but distinct objects as different keys', () => {
    // Arrange — two separate objects with identical shape
    const a = { x: 1 };
    const b = { x: 1 };
    const items = [a, b, a];

    // Act
    const result = createCounterMap(items);

    // Assert
    expect(result.get(a)).toBe(2);
    expect(result.get(b)).toBe(1);
    expect(result.size).toBe(2);
  });

  it('6. should handle an array with a single unique item', () => {
    // Arrange
    const items = ['only'];

    // Act
    const result = createCounterMap(items);

    // Assert
    expect(result.get('only')).toBe(1);
    expect(result.size).toBe(1);
  });

  it('7. should count all-identical items', () => {
    // Arrange
    const items = ['x', 'x', 'x', 'x'];

    // Act
    const result = createCounterMap(items);

    // Assert
    expect(result.get('x')).toBe(4);
    expect(result.size).toBe(1);
  });

  it('8. should count mixed-type items (using any[])', () => {
    // Arrange
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items: any[] = [1, '1', 1, '1', '1'];

    // Act
    const result = createCounterMap(items);

    // Assert
    expect(result.get(1)).toBe(2);
    expect(result.get('1')).toBe(3);
    expect(result.size).toBe(2);
  });

  // ─── Edge cases ────────────────────────────────────────────────────────────

  it('9. should return an empty Map for an empty array', () => {
    // Arrange
    const items: string[] = [];

    // Act
    const result = createCounterMap(items);

    // Assert
    expect(result.size).toBe(0);
    expect(result).toBeInstanceOf(Map);
  });

  it('10. should return 0 (via .get → undefined) for a key not in the map', () => {
    // Arrange
    const items = ['a', 'b'];

    // Act
    const result = createCounterMap(items);

    // Assert
    expect(result.get('z')).toBeUndefined();
    expect(result.has('z')).toBe(false);
  });

  it('11. should not modify the original array', () => {
    // Arrange
    const items = ['a', 'b', 'a'];
    const copy = [...items];

    // Act
    createCounterMap(items);

    // Assert
    expect(items).toEqual(copy);
  });

  it('12. should handle large arrays efficiently', () => {
    // Arrange — 10 000 items cycling through 100 keys
    const items = Array.from({ length: 10_000 }, (_, i) => i % 100);

    // Act
    const start = performance.now();
    const result = createCounterMap(items);
    const elapsed = performance.now() - start;

    // Assert
    expect(result.size).toBe(100);
    expect(result.get(0)).toBe(100);
    expect(elapsed).toBeLessThan(100);
  });

  // ─── Error cases ───────────────────────────────────────────────────────────

});
