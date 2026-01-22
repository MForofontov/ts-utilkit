import { uniqueValues } from '../src/uniqueValues';

describe('uniqueValues', () => {
  // Test case 1: Extract unique values from a simple object
  it('1. should return unique values from a simple object', () => {
    const obj = { a: 1, b: 2, c: 1, d: 3 };
    const result = uniqueValues(obj);
    const expected = [1, 2, 3];
    expect(result).toEqual(expected);
  });

  // Test case 2: Handle an empty object
  it('2. should return an empty array for an empty object', () => {
    const obj = {};
    const result = uniqueValues(obj);
    const expected: unknown[] = [];
    expect(result).toEqual(expected);
  });

  // Test case 3: Handle an object with all unique values
  it('3. should return all values if they are unique', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    const result = uniqueValues(obj);
    const expected = [1, 2, 3, 4];
    expect(result).toEqual(expected);
  });

  // Test case 4: Handle an object with all duplicate values
  it('4. should return a single value if all values are duplicates', () => {
    const obj = { a: 1, b: 1, c: 1, d: 1 };
    const result = uniqueValues(obj);
    const expected = [1];
    expect(result).toEqual(expected);
  });

  // Test case 5: Handle an object with mixed data types
  it('5. should return unique values for mixed data types', () => {
    const obj = { a: 1, b: 'string', c: true, d: 1, e: 'string', f: false };
    const result = uniqueValues(obj);
    const expected = [1, 'string', true, false];
    expect(result).toEqual(expected);
  });

  // Test case 6: Handle an object with `null` and `undefined` values
  it('6. should return unique values including null and undefined', () => {
    const obj = { a: null, b: undefined, c: null, d: undefined };
    const result = uniqueValues(obj);
    const expected = [null, undefined];
    expect(result).toEqual(expected);
  });

  // Test case 7: Handle an object with arrays as values
  it('7. should treat arrays as unique values', () => {
    const obj = { a: [1, 2], b: [1, 2], c: [3, 4] };
    const result = uniqueValues(obj);
    const expected = [
      [1, 2],
      [3, 4],
    ];
    expect(result).toEqual(expected);
  });

  // Test case 8: Handle an object with objects as values
  it('8. should treat objects as unique values', () => {
    const obj = { a: { x: 1 }, b: { x: 1 }, c: { y: 2 } };
    const result = uniqueValues(obj);
    const expected = [{ x: 1 }, { y: 2 }];
    expect(result).toEqual(expected);
  });

  // Test case 9: Handle an object with Symbol values
  it('9. should return unique Symbol values', () => {
    const sym1 = Symbol('a');
    const sym2 = Symbol('b');
    const obj = { a: sym1, b: sym2, c: sym1 };
    const result = uniqueValues(obj);
    const expected = [sym1, sym2];
    expect(result).toEqual(expected);
  });

  // Test case 10: Handle an object with numeric keys
  it('10. should return unique values for an object with numeric keys', () => {
    const obj = { 1: 'one', 2: 'two', 3: 'one' };
    const result = uniqueValues(obj);
    const expected = ['one', 'two'];
    expect(result).toEqual(expected);
  });

  // Test case 11: Handle an object with special characters in keys
  it('11. should return unique values for an object with special character keys', () => {
    const obj = { '!': 1, '@': 2, '#': 1, $: 3 };
    const result = uniqueValues(obj);
    const expected = [1, 2, 3];
    expect(result).toEqual(expected);
  });

  // Test case 12: Throw error if input is not an object (number)
  it('12. should throw a TypeError if input is a number', () => {
    expect(() =>
      uniqueValues(42 as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 13: Throw error if input is not an object (string)
  it('13. should throw a TypeError if input is a string', () => {
    expect(() =>
      uniqueValues('string' as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 14: Throw error if input is not an object (boolean)
  it('14. should throw a TypeError if input is a boolean', () => {
    expect(() =>
      uniqueValues(true as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 15: Throw error if input is null
  it('15. should throw a TypeError if input is null', () => {
    expect(() =>
      uniqueValues(null as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 16: Throw error if input is undefined
  it('16. should throw a TypeError if input is undefined', () => {
    expect(() =>
      uniqueValues(undefined as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });
});
