import { compactObject } from '../src/compactObject';

describe('compactObject', () => {
  // Test case 1: Remove null and undefined values
  it('1. should remove null and undefined values', () => {
    const obj = { a: 1, b: null, c: undefined, d: 'string' };
    const result = compactObject(obj);
    const expected = { a: 1, d: 'string' };
    expect(result).toEqual(expected);
  });

  // Test case 2: Handle object with no null or undefined values
  it('2. should return the same object if there are no null or undefined values', () => {
    const obj = { a: 1, b: 'string', c: true };
    const result = compactObject(obj);
    const expected = { a: 1, b: 'string', c: true };
    expect(result).toEqual(expected);
  });

  // Test case 3: Handle object with all null or undefined values
  it('3. should return an empty object if all values are null or undefined', () => {
    const obj = { a: null, b: undefined };
    const result = compactObject(obj);
    const expected = {};
    expect(result).toEqual(expected);
  });

  // Test case 4: Handle empty object
  it('4. should return an empty object for an empty object', () => {
    const obj = {};
    const result = compactObject(obj);
    const expected = {};
    expect(result).toEqual(expected);
  });

  // Test case 5: Handle object with nested null or undefined values
  it('5. should remove nested null or undefined values', () => {
    const obj = { a: { b: null, c: 1 }, d: undefined, e: 'string' };
    const result = compactObject(obj);
    const expected = { a: { c: 1 }, e: 'string' };
    expect(result).toEqual(expected);
  });

  // Test case 6: Handle object with array values
  it('6. should handle object with array values', () => {
    const obj = { a: [1, 2, null], b: undefined, c: 'string' };
    const result = compactObject(obj);
    const expected = { a: [1, 2, null], c: 'string' };
    expect(result).toEqual(expected);
  });

  // Test case 7: Handle object with function values
  it('7. should handle object with function values', () => {
    const obj = { a: () => {}, b: null, c: 'string' };
    const result = compactObject(obj);
    const expected = { a: obj.a, c: 'string' };
    expect(result).toEqual(expected);
  });

  // Test case 8: Handle object with symbol values
  it('8. should handle object with symbol values', () => {
    const sym = Symbol('sym');
    const obj = { a: sym, b: null, c: 'string' };
    const result = compactObject(obj);
    const expected = { a: sym, c: 'string' };
    expect(result).toEqual(expected);
  });

  // Test case 9: Handle object with BigInt values
  it('9. should handle object with BigInt values', () => {
    const obj = { a: BigInt(123), b: null, c: 'string' };
    const result = compactObject(obj);
    const expected = { a: BigInt(123), c: 'string' };
    expect(result).toEqual(expected);
  });

  // Test case 10: Handle non-object input (number)
  it('10. should throw a TypeError if input is a number', () => {
    expect(() =>
      compactObject(42 as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 11: Handle non-object input (string)
  it('11. should throw a TypeError if input is a string', () => {
    expect(() =>
      compactObject('string' as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 12: Handle non-object input (boolean)
  it('12. should throw a TypeError if input is a boolean', () => {
    expect(() =>
      compactObject(true as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 13: Handle null input
  it('13. should throw a TypeError if input is null', () => {
    expect(() =>
      compactObject(null as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 14: Handle undefined input
  it('14. should throw a TypeError if input is undefined', () => {
    expect(() =>
      compactObject(undefined as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });
});
