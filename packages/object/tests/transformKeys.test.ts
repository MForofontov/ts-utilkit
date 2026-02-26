import { transformKeys } from '../src/transformKeys';

/**
 * Unit tests for the transformKeys function.
 */
describe('transformKeys', () => {
  // ── Normal usage ──────────────────────────────────────────────────────────

  it('1. should convert all keys to uppercase', () => {
    // Arrange & Act
    const result = transformKeys({ foo: 1, bar: 2 }, (k) => k.toUpperCase());

    // Assert
    expect(result).toEqual({ FOO: 1, BAR: 2 });
  });

  it('2. should add a prefix to every key', () => {
    const result = transformKeys({ id: 1, name: 'Alice' }, (k) => `user_${k}`);
    expect(result).toEqual({ user_id: 1, user_name: 'Alice' });
  });

  it('3. should strip a common prefix from all keys', () => {
    const result = transformKeys(
      { data_id: 1, data_name: 'Bob' },
      (k) => k.replace('data_', ''),
    );
    expect(result).toEqual({ id: 1, name: 'Bob' });
  });

  it('4. should convert all keys to lowercase', () => {
    const result = transformKeys({ FOO: 1, BAR: 2 }, (k) => k.toLowerCase());
    expect(result).toEqual({ foo: 1, bar: 2 });
  });

  it('5. should pass the key to the transform function', () => {
    const seen: string[] = [];
    transformKeys({ a: 1, b: 2 }, (k) => { seen.push(k); return k; });
    expect(seen).toEqual(['a', 'b']);
  });

  it('6. should preserve values unchanged', () => {
    const nested = { x: { deep: true }, y: [1, 2, 3] };
    const result = transformKeys(nested, (k) => k + '_key');
    expect(result['x_key']).toBe(nested.x);
    expect(result['y_key']).toBe(nested.y);
  });

  // ── Edge cases ────────────────────────────────────────────────────────────

  it('7. should return an empty object for an empty input', () => {
    expect(transformKeys({}, (k) => k.toUpperCase())).toEqual({});
  });

  it('8. should not mutate the original object', () => {
    const original = { a: 1, b: 2 };
    transformKeys(original, (k) => k.toUpperCase());
    expect(original).toEqual({ a: 1, b: 2 });
  });

  it('9. should overwrite earlier value when transform produces duplicate keys', () => {
    // Both 'a' and 'A' map to 'A' if uppercased — last insertion wins
    const result = transformKeys({ a: 1, A: 2 }, (k) => k.toUpperCase());
    expect(result['A']).toBe(2);
  });

  it('10. should work with a no-op identity transform', () => {
    const obj = { x: 10, y: 20 };
    expect(transformKeys(obj, (k) => k)).toEqual(obj);
  });

  // ── Error cases ───────────────────────────────────────────────────────────

  it('11. should throw TypeError when obj is null', () => {
    expect(() =>
      transformKeys(null as unknown as Record<string, unknown>, (k) => k),
    ).toThrow(TypeError);
    expect(() =>
      transformKeys(null as unknown as Record<string, unknown>, (k) => k),
    ).toThrow('obj must be a non-null object, got null');
  });

  it('12. should throw TypeError when obj is an array', () => {
    expect(() =>
      transformKeys([1, 2] as unknown as Record<string, unknown>, (k) => k),
    ).toThrow(TypeError);
    expect(() =>
      transformKeys([1, 2] as unknown as Record<string, unknown>, (k) => k),
    ).toThrow('obj must be a non-null object, got object');
  });

  it('13. should throw TypeError when fn is not a function', () => {
    expect(() =>
      transformKeys({ a: 1 }, 'upper' as unknown as (k: string) => string),
    ).toThrow(TypeError);
    expect(() =>
      transformKeys({ a: 1 }, 'upper' as unknown as (k: string) => string),
    ).toThrow('fn must be a function, got string');
  });

  it('14. should throw TypeError when fn returns a non-string value', () => {
    expect(() =>
      transformKeys({ a: 1 }, (() => 42) as unknown as (k: string) => string),
    ).toThrow(TypeError);
    expect(() =>
      transformKeys({ a: 1 }, (() => 42) as unknown as (k: string) => string),
    ).toThrow('fn must return a string, got number for key "a"');
  });
});
