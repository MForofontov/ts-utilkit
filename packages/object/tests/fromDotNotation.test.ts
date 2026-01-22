import { fromDotNotation } from '../src/fromDotNotation';

describe('fromDotNotation', () => {
  // Test case 1: Reconstruct a simple nested object
  it('1. should reconstruct a simple nested object', () => {
    const flatObj = { 'a.b.c': 1, 'a.d': 2, e: 3 };
    const result = fromDotNotation(flatObj);
    const expected = { a: { b: { c: 1 }, d: 2 }, e: 3 };
    expect(result).toEqual(expected);
  });

  // Test case 2: Reconstruct arrays with objects
  it('2. should reconstruct arrays with objects', () => {
    const flatObj = { 'a[0].b': 1, 'a[1].c': 2, 'd.e': 3 };
    const result = fromDotNotation(flatObj);
    const expected = { a: [{ b: 1 }, { c: 2 }], d: { e: 3 } };
    expect(result).toEqual(expected);
  });

  // Test case 3: Reconstruct arrays with primitive values
  it('3. should reconstruct arrays with primitive values', () => {
    const flatObj = {
      'a[0]': 1,
      'a[1]': 2,
      'a[2]': 3,
      'b.c[0]': 4,
      'b.c[1]': 5,
    };
    const result = fromDotNotation(flatObj);
    const expected = { a: [1, 2, 3], b: { c: [4, 5] } };
    expect(result).toEqual(expected);
  });

  // Test case 4: Handle keys with dots
  it('4. should handle keys with dots', () => {
    const flatObj = { 'f\\.g': 4, 'd.e': 3 };
    const result = fromDotNotation(flatObj);
    const expected = { 'f.g': 4, d: { e: 3 } };
    expect(result).toEqual(expected);
  });

  // Test case 5: Handle keys with spaces
  it('5. should handle keys with spaces', () => {
    const flatObj = { 'key with space': 5, 'd.e': 3 };
    const result = fromDotNotation(flatObj);
    const expected = { 'key with space': 5, d: { e: 3 } };
    expect(result).toEqual(expected);
  });

  // Test case 6: Handle deeply nested arrays
  it('6. should handle deeply nested arrays', () => {
    const flatObj = { 'a[0][0].b': 1, 'a[1].c': 2, 'd.e': 3 };
    const result = fromDotNotation(flatObj);
    const expected = { a: [[{ b: 1 }], { c: 2 }], d: { e: 3 } };
    expect(result).toEqual(expected);
  });

  // Test case 7: Handle empty objects
  it('7. should handle empty objects', () => {
    const flatObj = {};
    const result = fromDotNotation(flatObj);
    const expected = {};
    expect(result).toEqual(expected);
  });

  // Test case 8: Handle arrays with mixed types
  it('8. should handle arrays with mixed types', () => {
    const flatObj = { 'a[0]': 1, 'a[1].b': 2, 'a[2]': 'string', 'd.e': 3 };
    const result = fromDotNotation(flatObj);
    const expected = { a: [1, { b: 2 }, 'string'], d: { e: 3 } };
    expect(result).toEqual(expected);
  });

  // Test case 9: Handle deeply nested objects
  it('9. should handle deeply nested objects', () => {
    const flatObj = { 'a.b.c.d.e': 5 };
    const result = fromDotNotation(flatObj);
    const expected = { a: { b: { c: { d: { e: 5 } } } } };
    expect(result).toEqual(expected);
  });

  // Test case 10: Handle null values
  it('10. should include null values in the result', () => {
    const flatObj = { 'a.b': null, c: 3 };
    const result = fromDotNotation(flatObj);
    const expected = { a: { b: null }, c: 3 };
    expect(result).toEqual(expected);
  });

  // Test case 11: Handle undefined values
  it('11. should include undefined values in the result', () => {
    const flatObj = { 'a.b': undefined, c: 3 };
    const result = fromDotNotation(flatObj);
    const expected = { a: { b: undefined }, c: 3 };
    expect(result).toEqual(expected);
  });

  // Test case 12: Handle keys with backslashes
  it('12. should handle keys with backslashes', () => {
    const flatObj = { 'key\\\\with\\\\backslash': 6, 'd.e': 3 };
    const result = fromDotNotation(flatObj);
    const expected = { 'key\\with\\backslash': 6, d: { e: 3 } };
    expect(result).toEqual(expected);
  });

  // Test case 13: Throw error for non-object input (number)
  it('13. should throw a TypeError if input is a number', () => {
    expect(() =>
      fromDotNotation(42 as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 14: Throw error for non-object input (string)
  it('14. should throw a TypeError if input is a string', () => {
    expect(() =>
      fromDotNotation('string' as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 15: Throw error for non-object input (boolean)
  it('15. should throw a TypeError if input is a boolean', () => {
    expect(() =>
      fromDotNotation(true as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 16: Throw error for null input
  it('16. should throw a TypeError if input is null', () => {
    expect(() =>
      fromDotNotation(null as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 17: Throw error for undefined input
  it('17. should throw a TypeError if input is undefined', () => {
    expect(() =>
      fromDotNotation(undefined as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });
});
