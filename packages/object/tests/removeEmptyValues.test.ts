import { removeEmptyValues } from '../src/removeEmptyValues';

describe('removeEmptyValues', () => {
  // Test case 1: Remove empty values from a simple object
  it('1. should remove empty values from a simple object', () => {
    const obj = { a: 1, b: null, c: '', d: undefined, e: 'value' };
    const result = removeEmptyValues(obj);
    const expected = { a: 1, e: 'value' };
    expect(result).toEqual(expected);
  });

  // Test case 2: Remove empty values from a nested object
  it('2. should remove empty values from a nested object', () => {
    const obj = { a: 1, b: { x: null, y: 2 }, c: '', d: undefined, e: 'value' };
    const result = removeEmptyValues(obj);
    const expected = { a: 1, b: { y: 2 }, e: 'value' };
    expect(result).toEqual(expected);
  });

  // Test case 3: Remove empty values from an object with various data types
  it('3. should remove empty values from an object with various data types', () => {
    const obj = {
      a: 1,
      b: 'string',
      c: true,
      d: null,
      e: undefined,
      f: [1, 2, 3],
      g: { h: 4 },
      i: '',
    };
    const result = removeEmptyValues(obj);
    const expected = { a: 1, b: 'string', c: true, f: [1, 2, 3], g: { h: 4 } };
    expect(result).toEqual(expected);
  });

  // Test case 4: Remove empty values from an object with nested arrays
  it('4. should remove empty values from an object with nested arrays', () => {
    const obj = { a: 1, b: [null, 2, '', undefined, 'value'] };
    const result = removeEmptyValues(obj);
    const expected = { a: 1, b: [2, 'value'] };
    expect(result).toEqual(expected);
  });

  // Test case 5: Handle empty object
  it('5. should return an empty object if the input object is empty', () => {
    const obj = {};
    const result = removeEmptyValues(obj);
    const expected = {};
    expect(result).toEqual(expected);
  });

  // Test case 6: Handle non-object input (number)
  it('6. should throw a TypeError if input is a number', () => {
    expect(() =>
      removeEmptyValues(42 as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 7: Handle non-object input (string)
  it('7. should throw a TypeError if input is a string', () => {
    expect(() =>
      removeEmptyValues('string' as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 8: Handle non-object input (boolean)
  it('8. should throw a TypeError if input is a boolean', () => {
    expect(() =>
      removeEmptyValues(true as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 9: Handle non-object input (null)
  it('9. should throw a TypeError if input is null', () => {
    expect(() =>
      removeEmptyValues(null as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 10: Handle non-object input (undefined)
  it('10. should throw a TypeError if input is undefined', () => {
    expect(() =>
      removeEmptyValues(undefined as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });
});
