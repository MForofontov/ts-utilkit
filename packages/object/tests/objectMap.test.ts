import { objectMap } from '../src/objectMap';

describe('objectMap', () => {
  // Test case 1: Map values of a simple object
  it('1. should map values of a simple object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = objectMap(obj, (value) => value * 2);
    const expected = { a: 2, b: 4, c: 6 };
    expect(result).toEqual(expected);
  });

  // Test case 2: Map values of an object with different types
  it('2. should map values of an object with different types', () => {
    const obj = { a: 1, b: 'hello', c: true };
    const result = objectMap(obj, (value) => typeof value);
    const expected = { a: 'number', b: 'string', c: 'boolean' };
    expect(result).toEqual(expected);
  });

  // Test case 3: Map values of an empty object
  it('3. should return an empty object when input is an empty object', () => {
    const obj = {};
    const result = objectMap(obj, (value) => value);
    const expected = {};
    expect(result).toEqual(expected);
  });

  // Test case 4: Map values with keys
  it('4. should map values with keys', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = objectMap(obj, (value, key) => `${key}-${value}`);
    const expected = { a: 'a-1', b: 'b-2', c: 'c-3' };
    expect(result).toEqual(expected);
  });

  // Test case 5: Map values of an object with nested objects
  it('5. should map values of an object with nested objects', () => {
    const obj = { a: { x: 1 }, b: { y: 2 } };
    const result = objectMap(obj, (value) => JSON.stringify(value));
    const expected = { a: '{"x":1}', b: '{"y":2}' };
    expect(result).toEqual(expected);
  });

  // Test case 6: Map values of an object with arrays
  it('6. should map values of an object with arrays', () => {
    const obj = { a: [1, 2], b: [3, 4] };
    const result = objectMap(obj, (value) => value.join('-'));
    const expected = { a: '1-2', b: '3-4' };
    expect(result).toEqual(expected);
  });

  // Test case 7: Map values of an object with null values
  it('7. should map values of an object with null values', () => {
    const obj = { a: null, b: 2 };
    const result = objectMap(obj, (value) => (value === null ? 'null' : value));
    const expected = { a: 'null', b: 2 };
    expect(result).toEqual(expected);
  });

  // Test case 8: Map values of an object with undefined values
  it('8. should map values of an object with undefined values', () => {
    const obj = { a: undefined, b: 2 };
    const result = objectMap(obj, (value) =>
      value === undefined ? 'undefined' : value,
    );
    const expected = { a: 'undefined', b: 2 };
    expect(result).toEqual(expected);
  });

  // Test case 9: Handle non-object input (number)
  it('9. should throw a TypeError if input is a number', () => {
    expect(() =>
      objectMap(42 as unknown as Record<string, unknown>, (value) => value),
    ).toThrow(TypeError);
  });

  // Test case 10: Handle non-object input (string)
  it('10. should throw a TypeError if input is a string', () => {
    expect(() =>
      objectMap(
        'string' as unknown as Record<string, unknown>,
        (value) => value,
      ),
    ).toThrow(TypeError);
  });

  // Test case 11: Handle non-object input (boolean)
  it('11. should throw a TypeError if input is a boolean', () => {
    expect(() =>
      objectMap(true as unknown as Record<string, unknown>, (value) => value),
    ).toThrow(TypeError);
  });

  // Test case 12: Handle non-object input (null)
  it('12. should throw a TypeError if input is null', () => {
    expect(() =>
      objectMap(null as unknown as Record<string, unknown>, (value) => value),
    ).toThrow(TypeError);
  });

  // Test case 13: Handle non-object input (undefined)
  it('13. should throw a TypeError if input is undefined', () => {
    expect(() =>
      objectMap(
        undefined as unknown as Record<string, unknown>,
        (value) => value,
      ),
    ).toThrow(TypeError);
  });
});
