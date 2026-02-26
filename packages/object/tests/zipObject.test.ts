import { zipObject } from '../src/zipObject';

/**
 * Unit tests for the zipObject function.
 */
describe('zipObject', () => {
  // ── Normal usage ──────────────────────────────────────────────────────────

  it('1. should create an object from string keys and number values', () => {
    // Arrange & Act
    const result = zipObject(['a', 'b', 'c'], [1, 2, 3]);

    // Assert
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('2. should create an object from headers and row data', () => {
    const headers = ['name', 'age', 'city'];
    const row = ['Alice', 30, 'Berlin'];
    expect(zipObject(headers, row)).toEqual({
      name: 'Alice',
      age: 30,
      city: 'Berlin',
    });
  });

  it('3. should create an object from boolean values', () => {
    expect(zipObject(['a', 'b'], [true, false])).toEqual({ a: true, b: false });
  });

  it('4. should create an object from object values', () => {
    const result = zipObject(['x', 'y'], [{ n: 1 }, { n: 2 }]);
    expect(result).toEqual({ x: { n: 1 }, y: { n: 2 } });
  });

  it('5. should handle a single key-value pair', () => {
    expect(zipObject(['only'], [42])).toEqual({ only: 42 });
  });

  // ── Edge cases ────────────────────────────────────────────────────────────

  it('6. should return an empty object for two empty arrays', () => {
    expect(zipObject([], [])).toEqual({});
  });

  it('7. should overwrite earlier value when duplicate keys appear', () => {
    const result = zipObject(['k', 'k'], ['first', 'second']);
    expect(result).toEqual({ k: 'second' });
  });

  it('8. should handle null and undefined as values', () => {
    const result = zipObject(['a', 'b'], [null, undefined]);
    expect(result).toEqual({ a: null, b: undefined });
  });

  it('9. should handle array values', () => {
    const result = zipObject(['tags'], [[1, 2, 3]]);
    expect(result).toEqual({ tags: [1, 2, 3] });
  });

  // ── Error cases ───────────────────────────────────────────────────────────

  it('10. should throw Error when keys and values have different lengths', () => {
    expect(() => zipObject(['a', 'b'], [1])).toThrow(Error);
    expect(() => zipObject(['a', 'b'], [1])).toThrow(
      'keys and values must have the same length, got 2 and 1',
    );
  });

  it('11. should throw TypeError when keys is not an array', () => {
    expect(() => zipObject('a,b' as unknown as string[], [1, 2])).toThrow(TypeError);
    expect(() => zipObject('a,b' as unknown as string[], [1, 2])).toThrow(
      'keys must be an array, got string',
    );
  });

  it('12. should throw TypeError when values is not an array', () => {
    expect(() => zipObject(['a'], 'val' as unknown as string[])).toThrow(TypeError);
    expect(() => zipObject(['a'], 'val' as unknown as string[])).toThrow(
      'values must be an array, got string',
    );
  });

  it('13. should throw TypeError when a key element is not a string', () => {
    expect(() => zipObject([1, 2] as unknown as string[], ['x', 'y'])).toThrow(TypeError);
    expect(() => zipObject([1, 2] as unknown as string[], ['x', 'y'])).toThrow(
      'keys[0] must be a string, got number',
    );
  });
});
