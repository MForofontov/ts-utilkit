import { safeGet } from '../src/safeGet';

describe('safeGet', () => {
  // Test case 1: Retrieve a nested value
  it('1. should retrieve a nested value', () => {
    const obj = { a: { b: { c: 42 } } };
    const result = safeGet(obj, 'a.b.c');
    const expected = 42;
    expect(result).toEqual(expected);
  });

  // Test case 2: Return default value if path does not exist
  it('2. should return default value if path does not exist', () => {
    const obj = { a: { b: { c: 42 } } };
    const result = safeGet(obj, 'a.b.d', 'default');
    const expected = 'default';
    expect(result).toEqual(expected);
  });

  // Test case 3: Handle empty path
  it('3. should return the object itself if path is empty', () => {
    const obj = { a: { b: { c: 42 } } };
    const result = safeGet(obj, '');
    const expected = obj;
    expect(result).toEqual(expected);
  });

  // Test case 4: Handle array path
  it('4. should retrieve a value from an array path', () => {
    const obj = { a: [{ b: 42 }] };
    const result = safeGet(obj, 'a.0.b');
    const expected = 42;
    expect(result).toEqual(expected);
  });

  // Test case 5: Handle path with special characters
  it('5. should retrieve a value from a path with special characters', () => {
    const obj = { 'a-b': { 'c.d': 42 } };
    const result = safeGet(obj, 'a-b.c.d');
    const expected = 42;
    expect(result).toEqual(expected);
  });

  // Test case 6: Handle path with spaces
  it('6. should retrieve a value from a path with spaces', () => {
    const obj = { 'a b': { 'c d': 42 } };
    const result = safeGet(obj, 'a b.c d');
    const expected = 42;
    expect(result).toEqual(expected);
  });

  // Test case 7: Handle path with empty segments
  it('7. should return default value for path with empty segments', () => {
    const obj = { a: { b: { c: 42 } } };
    const result = safeGet(obj, 'a..b.c', 'default');
    const expected = 'default';
    expect(result).toEqual(expected);
  });

  // Test case 8: Handle path with leading and trailing dots
  it('8. should retrieve a value from a path with leading and trailing dots', () => {
    const obj = { a: { b: { c: 42 } } };
    const result = safeGet(obj, '.a.b.c.', 'default');
    const expected = 42;
    expect(result).toEqual(expected);
  });

  // Test case 9: Handle path with numeric keys
  it('9. should retrieve a value from a path with numeric keys', () => {
    const obj = { a: { 1: { b: 42 } } };
    const result = safeGet(obj, 'a.1.b');
    const expected = 42;
    expect(result).toEqual(expected);
  });

  // Test case 10: Handle path with mixed types
  it('10. should retrieve a value from a path with mixed types', () => {
    const obj = { a: [{ b: { c: 42 } }] };
    const result = safeGet(obj, 'a.0.b.c');
    const expected = 42;
    expect(result).toEqual(expected);
  });

  // Test case 11: Handle non-object input (number)
  it('11. should throw a TypeError if input is a number', () => {
    expect(() =>
      safeGet(42 as unknown as Record<string, unknown>, 'a.b.c'),
    ).toThrow(TypeError);
  });

  // Test case 12: Handle non-object input (string)
  it('12. should throw a TypeError if input is a string', () => {
    expect(() =>
      safeGet('string' as unknown as Record<string, unknown>, 'a.b.c'),
    ).toThrow(TypeError);
  });

  // Test case 13: Handle non-object input (boolean)
  it('13. should throw a TypeError if input is a boolean', () => {
    expect(() =>
      safeGet(true as unknown as Record<string, unknown>, 'a.b.c'),
    ).toThrow(TypeError);
  });

  // Test case 14: Handle null input
  it('14. should throw a TypeError if input is null', () => {
    expect(() =>
      safeGet(null as unknown as Record<string, unknown>, 'a.b.c'),
    ).toThrow(TypeError);
  });

  // Test case 15: Handle undefined input
  it('15. should throw a TypeError if input is undefined', () => {
    expect(() =>
      safeGet(undefined as unknown as Record<string, unknown>, 'a.b.c'),
    ).toThrow(TypeError);
  });
});
