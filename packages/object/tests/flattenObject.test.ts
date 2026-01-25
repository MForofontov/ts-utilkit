import { flattenObject } from '../src/flattenObject';

describe('flattenObject', () => {
  // Test case 1: Flatten a simple nested object
  it('1. should flatten a simple nested object', () => {
    const obj = { a: { b: { c: 1 }, d: 2 }, e: 3 };
    const result = flattenObject(obj);
    const expected = { 'a.b.c': 1, 'a.d': 2, e: 3 };
    expect(result).toEqual(expected);
  });

  // Test case 2: Handle arrays with objects
  it('2. should flatten arrays with objects', () => {
    const obj = { a: [{ b: 1 }, { c: 2 }], d: { e: 3 } };
    const result = flattenObject(obj);
    const expected = { 'a[0].b': 1, 'a[1].c': 2, 'd.e': 3 };
    expect(result).toEqual(expected);
  });

  // Test case 3: Handle arrays with primitive values
  it('3. should flatten arrays with primitive values', () => {
    const obj = { a: [1, 2, 3], b: { c: [4, 5] } };
    const result = flattenObject(obj);
    const expected = {
      'a[0]': 1,
      'a[1]': 2,
      'a[2]': 3,
      'b.c[0]': 4,
      'b.c[1]': 5,
    };
    expect(result).toEqual(expected);
  });

  // Test case 4: Handle keys with dots
  it('4. should escape keys with dots', () => {
    const obj = { 'f.g': 4, d: { e: 3 } };
    const result = flattenObject(obj);
    const expected = { 'f\\.g': 4, 'd.e': 3 };
    expect(result).toEqual(expected);
  });

  // Test case 5: Handle keys with spaces
  it('5. should handle keys with spaces', () => {
    const obj = { 'key with space': 5, d: { e: 3 } };
    const result = flattenObject(obj);
    const expected = { 'key with space': 5, 'd.e': 3 };
    expect(result).toEqual(expected);
  });

  // Test case 6: Handle deeply nested arrays
  it('6. should handle deeply nested arrays', () => {
    const obj = { a: [[{ b: 1 }], { c: 2 }], d: { e: 3 } };
    const result = flattenObject(obj);
    const expected = { 'a[0][0].b': 1, 'a[1].c': 2, 'd.e': 3 };
    expect(result).toEqual(expected);
  });

  // Test case 7: Handle empty objects
  it('7. should handle empty objects', () => {
    const obj = {};
    const result = flattenObject(obj);
    const expected = {};
    expect(result).toEqual(expected);
  });

  // Test case 8: Handle empty arrays
  it('8. should handle empty arrays', () => {
    const obj = { a: [] };
    const result = flattenObject(obj);
    const expected = {};
    expect(result).toEqual(expected);
  });

  // Test case 9: Handle mixed types in arrays
  it('9. should handle arrays with mixed types', () => {
    const obj = { a: [1, { b: 2 }, 'string'], d: { e: 3 } };
    const result = flattenObject(obj);
    const expected = { 'a[0]': 1, 'a[1].b': 2, 'a[2]': 'string', 'd.e': 3 };
    expect(result).toEqual(expected);
  });

  // Test case 10: Handle keys with backslashes
  it('10. should escape keys with backslashes', () => {
    const obj = { 'key\\with\\backslash': 6, d: { e: 3 } };
    const result = flattenObject(obj);
    const expected = { 'key\\\\with\\\\backslash': 6, 'd.e': 3 };
    expect(result).toEqual(expected);
  });

  // Test case 11: Handle null values
  it('11. should include null values in the result', () => {
    const obj = { a: { b: null }, c: 3 };
    const result = flattenObject(obj);
    const expected = { 'a.b': null, c: 3 };
    expect(result).toEqual(expected);
  });

  // Test case 12: Handle undefined values
  it('12. should include undefined values in the result', () => {
    const obj = { a: { b: undefined }, c: 3 };
    const result = flattenObject(obj);
    const expected = { 'a.b': undefined, c: 3 };
    expect(result).toEqual(expected);
  });

  // Test case 13: Handle deeply nested objects
  it('13. should handle deeply nested objects', () => {
    const obj = { a: { b: { c: { d: { e: 5 } } } } };
    const result = flattenObject(obj);
    const expected = { 'a.b.c.d.e': 5 };
    expect(result).toEqual(expected);
  });

  // Test case 14: Throw error for non-object input (number)
  it('14. should throw a TypeError if input is a number', () => {
    expect(() =>
      flattenObject(42 as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 15: Throw error for non-object input (string)
  it('15. should throw a TypeError if input is a string', () => {
    expect(() =>
      flattenObject('string' as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 16: Throw error for non-object input (boolean)
  it('16. should throw a TypeError if input is a boolean', () => {
    expect(() =>
      flattenObject(true as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 17: Throw error for null input
  it('17. should throw a TypeError if input is null', () => {
    expect(() =>
      flattenObject(null as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 18: Throw error for undefined input
  it('18. should throw a TypeError if input is undefined', () => {
    expect(() =>
      flattenObject(undefined as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });
});
