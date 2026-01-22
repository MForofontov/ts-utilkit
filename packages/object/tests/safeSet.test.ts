import { safeSet } from '../src/safeSet';

describe('safeSet', () => {
  // Test case 1: Set a nested value
  it('1. should set a nested value', () => {
    const obj = { a: { b: { c: 42 } } };
    safeSet(obj, 'a.b.c', 100);
    const expected = { a: { b: { c: 100 } } };
    expect(obj).toEqual(expected);
  });

  // Test case 2: Create nested objects if path does not exist
  it('2. should create nested objects if path does not exist', () => {
    const obj = { a: { b: { c: 42 } } };
    safeSet(obj, 'a.b.d.e', 100);
    const expected = { a: { b: { c: 42, d: { e: 100 } } } };
    expect(obj).toEqual(expected);
  });

  // Test case 3: Handle empty path
  it('3. should not modify the object if path is empty', () => {
    const obj = { a: { b: { c: 42 } } };
    safeSet(obj, '', 100);
    const expected = { a: { b: { c: 42 } } };
    expect(obj).toEqual(expected);
  });

  // Test case 4: Handle path with special characters
  it('4. should set a value for a path with special characters', () => {
    const obj = { 'a-b': { 'c.d': 42 } };
    safeSet(obj, 'a-b.c.d', 100);
    const expected = { 'a-b': { 'c.d': 100 } };
    expect(obj).toEqual(expected);
  });

  // Test case 5: Handle path with spaces
  it('5. should set a value for a path with spaces', () => {
    const obj = { 'a b': { 'c d': 42 } };
    safeSet(obj, 'a b.c d', 100);
    const expected = { 'a b': { 'c d': 100 } };
    expect(obj).toEqual(expected);
  });

  // Test case 6: Handle path with numeric keys
  it('6. should set a value for a path with numeric keys', () => {
    const obj = { a: { 1: { b: 42 } } };
    safeSet(obj, 'a.1.b', 100);
    const expected = { a: { 1: { b: 100 } } };
    expect(obj).toEqual(expected);
  });

  // Test case 7: Handle path with mixed types
  it('7. should set a value for a path with mixed types', () => {
    const obj = { a: [{ b: { c: 42 } }] };
    safeSet(obj, 'a.0.b.c', 100);
    const expected = { a: [{ b: { c: 100 } }] };
    expect(obj).toEqual(expected);
  });

  // Test case 8: Handle non-object input (number)
  it('8. should throw a TypeError if input is a number', () => {
    expect(() =>
      safeSet(42 as unknown as Record<string, unknown>, 'a.b.c', 100),
    ).toThrow(TypeError);
  });

  // Test case 9: Handle non-object input (string)
  it('9. should throw a TypeError if input is a string', () => {
    expect(() =>
      safeSet('string' as unknown as Record<string, unknown>, 'a.b.c', 100),
    ).toThrow(TypeError);
  });

  // Test case 10: Handle non-object input (boolean)
  it('10. should throw a TypeError if input is a boolean', () => {
    expect(() =>
      safeSet(true as unknown as Record<string, unknown>, 'a.b.c', 100),
    ).toThrow(TypeError);
  });

  // Test case 11: Handle null input
  it('11. should throw a TypeError if input is null', () => {
    expect(() =>
      safeSet(null as unknown as Record<string, unknown>, 'a.b.c', 100),
    ).toThrow(TypeError);
  });

  // Test case 12: Handle undefined input
  it('12. should throw a TypeError if input is undefined', () => {
    expect(() =>
      safeSet(undefined as unknown as Record<string, unknown>, 'a.b.c', 100),
    ).toThrow(TypeError);
  });

  // Test case 13: Create nested structure when path doesn't exist
  it('13. should create nested objects when path does not exist', () => {
    const obj = {};
    safeSet(obj, 'a.b.c.d.e', 'deep value');
    expect(obj).toEqual({ a: { b: { c: { d: { e: 'deep value' } } } } });
  });

  // Test case 14: Overwrite non-object values in path
  it('14. should overwrite non-object values in the path', () => {
    const obj = { a: 'string value' };
    safeSet(obj, 'a.b.c', 42);
    expect(obj).toEqual({ a: { b: { c: 42 } } });
  });
});
