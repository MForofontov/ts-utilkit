import { renameKey } from '../src/renameKey';

/**
 * Unit tests for the renameKey function.
 */
describe('renameKey', () => {
  // ── Normal usage ──────────────────────────────────────────────────────────

  it('1. should rename a key while preserving its value', () => {
    // Arrange & Act
    const result = renameKey({ id: 1, name: 'Alice' }, 'id', 'userId');

    // Assert
    expect(result).toEqual({ userId: 1, name: 'Alice' });
  });

  it('2. should preserve insertion order with the renamed key at its original position', () => {
    const result = renameKey({ a: 1, b: 2, c: 3 }, 'b', 'beta');
    expect(Object.keys(result)).toEqual(['a', 'beta', 'c']);
    expect(result).toEqual({ a: 1, beta: 2, c: 3 });
  });

  it('3. should not mutate the original object', () => {
    const original = { x: 10, y: 20 };
    renameKey(original, 'x', 'ex');
    expect(original).toEqual({ x: 10, y: 20 });
  });

  it('4. should work when renaming the only key', () => {
    expect(renameKey({ old: 'value' }, 'old', 'new')).toEqual({ new: 'value' });
  });

  it('5. should work when old key and new key are the same (no-op rename)', () => {
    const result = renameKey({ a: 1, b: 2 }, 'a', 'a');
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('6. should work with object values', () => {
    const result = renameKey({ user: { id: 1 } }, 'user', 'account');
    expect(result).toEqual({ account: { id: 1 } });
  });

  it('7. should work with array values', () => {
    const result = renameKey({ items: [1, 2, 3] }, 'items', 'list');
    expect(result).toEqual({ list: [1, 2, 3] });
  });

  it('8. should work with null value', () => {
    const result = renameKey(
      { key: null } as Record<string, null>,
      'key',
      'renamedKey',
    );
    expect(result).toEqual({ renamedKey: null });
  });

  // ── Error cases ───────────────────────────────────────────────────────────

  it('9. should throw Error when oldKey does not exist on the object', () => {
    expect(() => renameKey({ a: 1 }, 'missing', 'new')).toThrow(Error);
    expect(() => renameKey({ a: 1 }, 'missing', 'new')).toThrow(
      'Key "missing" does not exist on the object',
    );
  });

  it('10. should throw Error when newKey already exists on the object', () => {
    expect(() => renameKey({ a: 1, b: 2 }, 'a', 'b')).toThrow(Error);
    expect(() => renameKey({ a: 1, b: 2 }, 'a', 'b')).toThrow(
      'Key "b" already exists on the object',
    );
  });
});
