import { unflattenObject } from '../src/unflattenObject';

describe('unflattenObject', () => {
  // Test case 1: Unflatten a simple object
  it('1. should unflatten a simple object', () => {
    const obj = { 'a.b.c': 1, 'a.b.d': 2, e: 3 };
    const result = unflattenObject(obj);
    const expected = { a: { b: { c: 1, d: 2 } }, e: 3 };
    expect(result).toEqual(expected);
  });

  // Test case 2: Unflatten an object with nested arrays
  it('2. should unflatten an object with nested arrays', () => {
    const obj = { 'a.0.b': 1, 'a.1.c': 2 };
    const result = unflattenObject(obj);
    const expected = { a: [{ b: 1 }, { c: 2 }] };
    expect(result).toEqual(expected);
  });

  // Test case 3: Unflatten an object with various data types
  it('3. should unflatten an object with various data types', () => {
    const obj = {
      'a.b.c': true,
      'a.b.d': 'string',
      'a.b.e': null,
      'a.b.f': undefined,
      'a.b.g': [1, 2, 3],
      'a.b.h.i': 4,
    };
    const result = unflattenObject(obj);
    const expected = {
      a: {
        b: {
          c: true,
          d: 'string',
          e: null,
          f: undefined,
          g: [1, 2, 3],
          h: { i: 4 },
        },
      },
    };
    expect(result).toEqual(expected);
  });

  // Test case 4: Unflatten an object with empty values
  it('4. should unflatten an object with empty values', () => {
    const obj = { 'a.b.c': '', 'a.b.d': null, 'a.b.e': undefined };
    const result = unflattenObject(obj);
    const expected = { a: { b: { c: '', d: null, e: undefined } } };
    expect(result).toEqual(expected);
  });

  // Test case 5: Handle empty object
  it('5. should return an empty object if the input object is empty', () => {
    const obj = {};
    const result = unflattenObject(obj);
    const expected = {};
    expect(result).toEqual(expected);
  });

  // Test case 6: Handle non-object input (number)
  it('6. should throw a TypeError if input is a number', () => {
    expect(() =>
      unflattenObject(42 as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 7: Handle non-object input (string)
  it('7. should throw a TypeError if input is a string', () => {
    expect(() =>
      unflattenObject('string' as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 8: Handle non-object input (boolean)
  it('8. should throw a TypeError if input is a boolean', () => {
    expect(() =>
      unflattenObject(true as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 9: Handle non-object input (null)
  it('9. should throw a TypeError if input is null', () => {
    expect(() =>
      unflattenObject(null as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 10: Handle non-object input (undefined)
  it('10. should throw a TypeError if input is undefined', () => {
    expect(() =>
      unflattenObject(undefined as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 11: Handle array notation with brackets
  it('11. should unflatten array notation with square brackets', () => {
    const obj = { 'a[0]': 1, 'a[1]': 2, 'a[2]': 3 };
    const result = unflattenObject(obj);
    const expected = { a: [1, 2, 3] };
    expect(result).toEqual(expected);
  });

  // Test case 12: Handle nested array notation
  it('12. should unflatten nested array notation', () => {
    const obj = { 'a[0].b': 1, 'a[1].b': 2 };
    const result = unflattenObject(obj);
    const expected = { a: [{ b: 1 }, { b: 2 }] };
    expect(result).toEqual(expected);
  });

  // Test case 13: Handle mixed array and object paths
  it('13. should unflatten mixed array and object paths', () => {
    const obj = { 'a.0.b.c': 1, 'a.1.b.c': 2 };
    const result = unflattenObject(obj);
    const expected = { a: [{ b: { c: 1 } }, { b: { c: 2 } }] };
    expect(result).toEqual(expected);
  });

  // Test case 14: Handle array with numeric string indices
  it('14. should handle array indices as strings', () => {
    const obj = { 'items.0.name': 'first', 'items.1.name': 'second' };
    const result = unflattenObject(obj);
    const expected = { items: [{ name: 'first' }, { name: 'second' }] };
    expect(result).toEqual(expected);
  });

  // Test case 15: Handle deep array nesting
  it('15. should handle deep array nesting', () => {
    const obj = { 'a.0.0.b': 1, 'a.0.1.b': 2 };
    const result = unflattenObject(obj);
    const expected = { a: [[{ b: 1 }, { b: 2 }]] };
    expect(result).toEqual(expected);
  });
});
