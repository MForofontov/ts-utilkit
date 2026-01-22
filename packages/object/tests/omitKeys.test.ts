import { omitKeys } from '../src/omitKeys';

describe('omitKeys', () => {
  // Test case 1: Omit specified keys from a simple object
  it('1. should omit specified keys from a simple object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omitKeys(obj, ['b', 'c']);
    const expected = { a: 1 };
    expect(result).toEqual(expected);
  });

  // Test case 2: Omit keys that do not exist in the object
  it('2. should return the original object if keys to omit do not exist', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omitKeys(obj, ['d', 'e'] as unknown as Array<
      keyof typeof obj
    >);
    const expected = { a: 1, b: 2, c: 3 };
    expect(result).toEqual(expected);
  });

  // Test case 3: Omit keys from a nested object
  it('3. should omit keys from a nested object', () => {
    const obj = { a: 1, b: { x: 2, y: 3 }, c: 3 };
    const result = omitKeys(obj, ['b']);
    const expected = { a: 1, c: 3 };
    expect(result).toEqual(expected);
  });

  // Test case 4: Omit keys from an object with various data types
  it('4. should omit keys from an object with various data types', () => {
    const obj = {
      a: 1,
      b: 'string',
      c: true,
      d: null,
      e: undefined,
      f: [1, 2, 3],
      g: { h: 4 },
    };
    const result = omitKeys(obj, ['b', 'd', 'f']);
    const expected = { a: 1, c: true, e: undefined, g: { h: 4 } };
    expect(result).toEqual(expected);
  });

  // Test case 5: Omit all keys from an object
  it('5. should return an empty object if all keys are omitted', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omitKeys(obj, ['a', 'b', 'c']);
    const expected = {};
    expect(result).toEqual(expected);
  });

  // Test case 6: Handle empty object
  it('6. should return an empty object if the input object is empty', () => {
    const obj = {};
    const result = omitKeys(obj, ['a', 'b'] as unknown as Array<
      keyof typeof obj
    >);
    const expected = {};
    expect(result).toEqual(expected);
  });

  // Test case 7: Handle empty keysToOmit array
  it('7. should return the original object if keysToOmit is empty', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omitKeys(obj, []);
    const expected = { a: 1, b: 2, c: 3 };
    expect(result).toEqual(expected);
  });

  // Test case 8: Handle non-object input (number)
  it('8. should throw a TypeError if input is a number', () => {
    expect(() =>
      omitKeys(42 as unknown as Record<string, unknown>, ['a']),
    ).toThrow(TypeError);
  });

  // Test case 9: Handle non-object input (string)
  it('9. should throw a TypeError if input is a string', () => {
    expect(() =>
      omitKeys('string' as unknown as Record<string, unknown>, ['a']),
    ).toThrow(TypeError);
  });

  // Test case 10: Handle non-object input (boolean)
  it('10. should throw a TypeError if input is a boolean', () => {
    expect(() =>
      omitKeys(true as unknown as Record<string, unknown>, ['a']),
    ).toThrow(TypeError);
  });

  // Test case 11: Handle non-object input (null)
  it('11. should throw a TypeError if input is null', () => {
    expect(() =>
      omitKeys(null as unknown as Record<string, unknown>, ['a']),
    ).toThrow(TypeError);
  });

  // Test case 12: Handle non-object input (undefined)
  it('12. should throw a TypeError if input is undefined', () => {
    expect(() =>
      omitKeys(undefined as unknown as Record<string, unknown>, ['a']),
    ).toThrow(TypeError);
  });
});
