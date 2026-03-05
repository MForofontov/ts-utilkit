import { createMultiMap } from '../src/createMultiMap';

describe('createMultiMap', () => {
  // ─── set / get ─────────────────────────────────────────────────────────────

  it('1. should store a single value under a key', () => {
    // Arrange
    const mm = createMultiMap<string, number>();

    // Act
    mm.set('a', 1);

    // Assert
    expect(mm.get('a')).toEqual([1]);
  });

  it('2. should append multiple values under the same key', () => {
    // Arrange
    const mm = createMultiMap<string, number>();

    // Act
    mm.set('a', 1).set('a', 2).set('a', 3);

    // Assert
    expect(mm.get('a')).toEqual([1, 2, 3]);
  });

  it('3. should store values under different keys independently', () => {
    // Arrange
    const mm = createMultiMap<string, number>();

    // Act
    mm.set('x', 10).set('y', 20).set('x', 11);

    // Assert
    expect(mm.get('x')).toEqual([10, 11]);
    expect(mm.get('y')).toEqual([20]);
  });

  it('4. should return an empty array for a key that was never set', () => {
    // Arrange
    const mm = createMultiMap<string, number>();

    // Act
    const result = mm.get('missing');

    // Assert
    expect(result).toEqual([]);
  });

  it('5. should return a copy from get — mutations do not affect internal state', () => {
    // Arrange
    const mm = createMultiMap<string, number>();
    mm.set('a', 1).set('a', 2);

    // Act
    const snapshot = mm.get('a');
    snapshot.push(99);

    // Assert — internal array is unchanged
    expect(mm.get('a')).toEqual([1, 2]);
  });

  // ─── setAll ────────────────────────────────────────────────────────────────

  it('6. should bulk-insert values with setAll', () => {
    // Arrange
    const mm = createMultiMap<string, string>();

    // Act
    mm.setAll('fruits', ['apple', 'banana', 'cherry']);

    // Assert
    expect(mm.get('fruits')).toEqual(['apple', 'banana', 'cherry']);
  });

  it('7. should append to existing values when setAll is called on an existing key', () => {
    // Arrange
    const mm = createMultiMap<string, number>();
    mm.set('n', 1).set('n', 2);

    // Act
    mm.setAll('n', [3, 4]);

    // Assert
    expect(mm.get('n')).toEqual([1, 2, 3, 4]);
  });

  it('8. should accept an empty array in setAll without error', () => {
    // Arrange
    const mm = createMultiMap<string, number>();

    // Act
    mm.setAll('k', []);

    // Assert — key is created with an empty list
    expect(mm.has('k')).toBe(true);
    expect(mm.get('k')).toEqual([]);
  });

  // ─── has / hasEntry / size ─────────────────────────────────────────────────

  it('9. should report has() correctly', () => {
    // Arrange
    const mm = createMultiMap<string, number>();
    mm.set('present', 42);

    // Act & Assert
    expect(mm.has('present')).toBe(true);
    expect(mm.has('absent')).toBe(false);
  });

  it('10. should report hasEntry() correctly', () => {
    // Arrange
    const mm = createMultiMap<string, number>();
    mm.set('a', 1).set('a', 2);

    // Act & Assert
    expect(mm.hasEntry('a', 1)).toBe(true);
    expect(mm.hasEntry('a', 99)).toBe(false);
    expect(mm.hasEntry('missing', 1)).toBe(false);
  });

  it('11. should reflect the correct size', () => {
    // Arrange
    const mm = createMultiMap<string, number>();

    // Act & Assert
    expect(mm.size).toBe(0);
    mm.set('a', 1);
    expect(mm.size).toBe(1);
    mm.set('a', 2);
    expect(mm.size).toBe(1); // same key — size unchanged
    mm.set('b', 3);
    expect(mm.size).toBe(2);
  });

  // ─── delete / deleteEntry ──────────────────────────────────────────────────

  it('12. should delete an entire key with delete()', () => {
    // Arrange
    const mm = createMultiMap<string, number>();
    mm.set('a', 1).set('a', 2);

    // Act
    const removed = mm.delete('a');

    // Assert
    expect(removed).toBe(true);
    expect(mm.has('a')).toBe(false);
    expect(mm.get('a')).toEqual([]);
    expect(mm.size).toBe(0);
  });

  it('13. should return false when deleting a non-existent key', () => {
    // Arrange
    const mm = createMultiMap<string, number>();

    // Act & Assert
    expect(mm.delete('ghost')).toBe(false);
  });

  it('14. should remove only the first matching value with deleteEntry()', () => {
    // Arrange
    const mm = createMultiMap<string, number>();
    mm.set('a', 1).set('a', 2).set('a', 1);

    // Act
    const removed = mm.deleteEntry('a', 1);

    // Assert — first '1' removed, second '1' still present
    expect(removed).toBe(true);
    expect(mm.get('a')).toEqual([2, 1]);
  });

  it('15. should auto-remove the key when the last value is deleted via deleteEntry()', () => {
    // Arrange
    const mm = createMultiMap<string, number>();
    mm.set('solo', 42);

    // Act
    mm.deleteEntry('solo', 42);

    // Assert
    expect(mm.has('solo')).toBe(false);
    expect(mm.size).toBe(0);
  });

  it('16. should return false from deleteEntry() for a missing key', () => {
    // Arrange
    const mm = createMultiMap<string, number>();

    // Act & Assert
    expect(mm.deleteEntry('ghost', 1)).toBe(false);
  });

  it('17. should return false from deleteEntry() for a missing value', () => {
    // Arrange
    const mm = createMultiMap<string, number>();
    mm.set('a', 1);

    // Act & Assert
    expect(mm.deleteEntry('a', 99)).toBe(false);
    expect(mm.get('a')).toEqual([1]); // unchanged
  });

  // ─── clear / keys / entries ────────────────────────────────────────────────

  it('18. should clear all entries', () => {
    // Arrange
    const mm = createMultiMap<string, number>();
    mm.set('a', 1).set('b', 2);

    // Act
    mm.clear();

    // Assert
    expect(mm.size).toBe(0);
    expect(mm.has('a')).toBe(false);
    expect(mm.has('b')).toBe(false);
  });

  it('19. should iterate over keys correctly', () => {
    // Arrange
    const mm = createMultiMap<string, number>();
    mm.set('x', 1).set('y', 2).set('x', 3);

    // Act
    const keys = Array.from(mm.keys());

    // Assert
    expect(keys).toEqual(['x', 'y']);
  });

  it('20. should iterate over entries correctly', () => {
    // Arrange
    const mm = createMultiMap<string, number>();
    mm.set('a', 1).set('a', 2).set('b', 3);

    // Act
    const entries = Array.from(mm.entries());

    // Assert
    expect(entries).toEqual([
      ['a', [1, 2]],
      ['b', [3]],
    ]);
  });

  it('21. should return independent copies from entries() iterator', () => {
    // Arrange
    const mm = createMultiMap<string, number>();
    mm.set('a', 1);

    // Act — mutate the yielded array
    const [, values] = Array.from(mm.entries())[0];
    values.push(99);

    // Assert — internal state is unchanged
    expect(mm.get('a')).toEqual([1]);
  });

  // ─── toMap ─────────────────────────────────────────────────────────────────

  it('22. should convert to a plain Map with toMap()', () => {
    // Arrange
    const mm = createMultiMap<string, number>();
    mm.set('x', 10).set('x', 20).set('y', 30);

    // Act
    const map = mm.toMap();

    // Assert
    expect(map).toBeInstanceOf(Map);
    expect(map.get('x')).toEqual([10, 20]);
    expect(map.get('y')).toEqual([30]);
  });

  it('23. should return an independent snapshot from toMap()', () => {
    // Arrange
    const mm = createMultiMap<string, number>();
    mm.set('a', 1);

    // Act
    const snapshot = mm.toMap();
    snapshot.get('a')!.push(99);

    // Assert — mutations to snapshot do not affect the MultiMap
    expect(mm.get('a')).toEqual([1]);
  });

  it('24. should return an empty Map from toMap() when the MultiMap is empty', () => {
    // Arrange
    const mm = createMultiMap<string, number>();

    // Act
    const map = mm.toMap();

    // Assert
    expect(map.size).toBe(0);
  });

  // ─── Method chaining ───────────────────────────────────────────────────────

  it('25. should support fluent method chaining with set()', () => {
    // Arrange & Act
    const mm = createMultiMap<string, number>();
    const returned = mm.set('a', 1);

    // Assert — set returns the same MultiMap instance
    expect(returned).toBe(mm);
  });

  it('26. should support fluent method chaining with setAll()', () => {
    // Arrange & Act
    const mm = createMultiMap<string, number>();
    const returned = mm.setAll('a', [1, 2, 3]);

    // Assert — setAll returns the same MultiMap instance
    expect(returned).toBe(mm);
  });

  // ─── Error cases ───────────────────────────────────────────────────────────
});
