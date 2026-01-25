import { invertObject } from '../src/invertObject';

describe('invertObject', () => {
  // Test case 1: Invert a simple object
  it('1. should invert a simple object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = invertObject(obj);
    const expected = { '1': 'a', '2': 'b', '3': 'c' };
    expect(result).toEqual(expected);
  });

  // Test case 2: Invert an object with string values
  it('2. should invert an object with string values', () => {
    const obj = { a: 'x', b: 'y', c: 'z' };
    const result = invertObject(obj);
    const expected = { x: 'a', y: 'b', z: 'c' };
    expect(result).toEqual(expected);
  });

  // Test case 3: Invert an object with mixed values
  it('3. should invert an object with mixed values', () => {
    const obj = { a: 1, b: 'x', c: true };
    const result = invertObject(obj);
    const expected = { '1': 'a', x: 'b', true: 'c' };
    expect(result).toEqual(expected);
  });

  // Test case 4: Invert an object with duplicate values
  it('4. should invert an object with duplicate values', () => {
    const obj = { a: 1, b: 1, c: 2 };
    const result = invertObject(obj);
    const expected = { '1': 'b', '2': 'c' }; // Last key with the same value should be used
    expect(result).toEqual(expected);
  });

  // Test case 5: Invert an object with arrays
  it('5. should invert an object with arrays', () => {
    const obj = { a: [1, 2], b: [3, 4] };
    const result = invertObject(obj);
    const expected = { '1,2': 'a', '3,4': 'b' };
    expect(result).toEqual(expected);
  });

  // Test case 6: Handle non-object input (number)
  it('6. should throw a TypeError if input is a number', () => {
    expect(() =>
      invertObject(42 as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 7: Handle non-object input (string)
  it('7. should throw a TypeError if input is a string', () => {
    expect(() =>
      invertObject('string' as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 8: Handle non-object input (boolean)
  it('8. should throw a TypeError if input is a boolean', () => {
    expect(() =>
      invertObject(true as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 9: Handle non-object input (null)
  it('9. should throw a TypeError if input is null', () => {
    expect(() =>
      invertObject(null as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 10: Handle non-object input (undefined)
  it('10. should throw a TypeError if input is undefined', () => {
    expect(() =>
      invertObject(undefined as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });
});
