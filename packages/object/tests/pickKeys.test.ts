import { pickKeys } from '../src/pickKeys';

describe('pickKeys', () => {
  // Test case 1: Pick specified keys from a simple object
  it('1. should pick specified keys from a simple object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = pickKeys(obj, ['b', 'c']);
    const expected = { b: 2, c: 3 };
    expect(result).toEqual(expected);
  });

  // Test case 2: Pick keys that do not exist in the object
  it('2. should return an empty object if keys to pick do not exist', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = pickKeys(obj, ['d', 'e'] as unknown as Array<
      keyof typeof obj
    >);
    const expected = {};
    expect(result).toEqual(expected);
  });

  // Test case 3: Pick keys from a nested object
  it('3. should pick keys from a nested object', () => {
    const obj = { a: 1, b: { x: 2, y: 3 }, c: 3 };
    const result = pickKeys(obj, ['b']);
    const expected = { b: { x: 2, y: 3 } };
    expect(result).toEqual(expected);
  });

  // Test case 4: Pick keys from an object with various data types
  it('4. should pick keys from an object with various data types', () => {
    const obj = {
      a: 1,
      b: 'string',
      c: true,
      d: null,
      e: undefined,
      f: [1, 2, 3],
      g: { h: 4 },
    };
    const result = pickKeys(obj, ['b', 'd', 'f']);
    const expected = { b: 'string', d: null, f: [1, 2, 3] };
    expect(result).toEqual(expected);
  });

  // Test case 5: Pick all keys from an object
  it('5. should return the original object if all keys are picked', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = pickKeys(obj, ['a', 'b', 'c']);
    const expected = { a: 1, b: 2, c: 3 };
    expect(result).toEqual(expected);
  });

  // Test case 6: Handle empty object
  it('6. should return an empty object if the input object is empty', () => {
    const obj = {};
    const result = pickKeys(obj, ['a', 'b'] as unknown as Array<
      keyof typeof obj
    >);
    const expected = {};
    expect(result).toEqual(expected);
  });

  // Test case 7: Handle empty keysToPick array
  it('7. should return an empty object if keysToPick is empty', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = pickKeys(obj, []);
    const expected = {};
    expect(result).toEqual(expected);
  });

  // Test case 8: Handle non-object input (number)
  it('8. should throw a TypeError if input is a number', () => {
    expect(() =>
      pickKeys(42 as unknown as Record<string, unknown>, ['a']),
    ).toThrow(TypeError);
  });

  // Test case 9: Handle non-object input (string)
  it('9. should throw a TypeError if input is a string', () => {
    expect(() =>
      pickKeys('string' as unknown as Record<string, unknown>, ['a']),
    ).toThrow(TypeError);
  });

  // Test case 10: Handle non-object input (boolean)
  it('10. should throw a TypeError if input is a boolean', () => {
    expect(() =>
      pickKeys(true as unknown as Record<string, unknown>, ['a']),
    ).toThrow(TypeError);
  });

  // Test case 11: Handle non-object input (null)
  it('11. should throw a TypeError if input is null', () => {
    expect(() =>
      pickKeys(null as unknown as Record<string, unknown>, ['a']),
    ).toThrow(TypeError);
  });

  // Test case 12: Handle non-object input (undefined)
  it('12. should throw a TypeError if input is undefined', () => {
    expect(() =>
      pickKeys(undefined as unknown as Record<string, unknown>, ['a']),
    ).toThrow(TypeError);
  });
});
