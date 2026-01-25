import { flipObject } from '../src/flipObject';

describe('flipObject', () => {
  // Test case 1: Flip a simple object
  it('1. should flip a simple object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = flipObject(obj);
    const expected = { '1': 'a', '2': 'b', '3': 'c' };
    expect(result).toEqual(expected);
  });

  // Test case 2: Flip an object with arrays as values
  it('2. should flip an object with arrays as values', () => {
    const obj = { a: [1, 2], b: [3, 4] };
    const result = flipObject(obj);
    const expected = { '1,2': 'a', '3,4': 'b' };
    expect(result).toEqual(expected);
  });

  // Test case 3: Flip an object with non-unique values
  it('3. should handle non-unique values by keeping the last key', () => {
    const obj = { a: 1, b: 1, c: 2 };
    const result = flipObject(obj);
    const expected = { '1': 'b', '2': 'c' };
    expect(result).toEqual(expected);
  });

  // Test case 4: Flip an object with nested objects
  it('4. should handle nested objects by converting them to strings', () => {
    const obj = { a: { b: 1 }, c: { d: 2 } };
    const result = flipObject(obj);
    const expected = { '[object Object]': 'c' }; // Last key wins
    expect(result).toEqual(expected);
  });

  // Test case 5: Flip an object with various data types
  it('5. should flip an object with various data types', () => {
    const obj = {
      a: 1,
      b: 'string',
      c: true,
      d: null,
      e: undefined,
      f: [1, 2, 3],
      g: { h: 4 },
    };
    const result = flipObject(obj);
    const expected = {
      '1': 'a',
      string: 'b',
      true: 'c',
      null: 'd',
      undefined: 'e',
      '1,2,3': 'f',
      '[object Object]': 'g',
    };
    expect(result).toEqual(expected);
  });

  // Test case 6: Handle non-object input (number)
  it('6. should throw a TypeError if input is a number', () => {
    expect(() => flipObject(42 as unknown as Record<string, unknown>)).toThrow(
      TypeError,
    );
  });

  // Test case 7: Handle non-object input (string)
  it('7. should throw a TypeError if input is a string', () => {
    expect(() =>
      flipObject('string' as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 8: Handle non-object input (boolean)
  it('8. should throw a TypeError if input is a boolean', () => {
    expect(() =>
      flipObject(true as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 9: Handle non-object input (null)
  it('9. should throw a TypeError if input is null', () => {
    expect(() =>
      flipObject(null as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 10: Handle non-object input (undefined)
  it('10. should throw a TypeError if input is undefined', () => {
    expect(() =>
      flipObject(undefined as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });
});
