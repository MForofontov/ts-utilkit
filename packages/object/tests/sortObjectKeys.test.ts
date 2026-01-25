import { sortObjectKeys } from '../src/sortObjectKeys';

describe('sortObjectKeys', () => {
  // Test case 1: Sort keys of a simple object
  it('1. should sort the keys of a simple object in ascending order', () => {
    const obj = { c: 3, a: 1, b: 2 };
    const result = sortObjectKeys(obj);
    const expected = { a: 1, b: 2, c: 3 };
    expect(result).toEqual(expected);
  });

  // Test case 2: Handle an already sorted object
  it('2. should return the same object if keys are already sorted', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = sortObjectKeys(obj);
    const expected = { a: 1, b: 2, c: 3 };
    expect(result).toEqual(expected);
  });

  // Test case 3: Handle an empty object
  it('3. should return an empty object when input is an empty object', () => {
    const obj = {};
    const result = sortObjectKeys(obj);
    const expected = {};
    expect(result).toEqual(expected);
  });

  // Test case 4: Handle an object with numeric keys
  it('4. should sort numeric keys as strings in ascending order', () => {
    const obj = { 3: 'three', 1: 'one', 2: 'two' };
    const result = sortObjectKeys(obj);
    const expected = { 1: 'one', 2: 'two', 3: 'three' };
    expect(result).toEqual(expected);
  });

  // Test case 5: Handle an object with mixed key types
  it('5. should sort keys with mixed types (numbers and strings) in ascending order', () => {
    const obj = { b: 2, 1: 'one', a: 1, 2: 'two' };
    const result = sortObjectKeys(obj);
    const expected = { 1: 'one', 2: 'two', a: 1, b: 2 };
    expect(result).toEqual(expected);
  });

  // Test case 6: Handle an object with special characters in keys
  it('6. should sort keys with special characters in ascending order', () => {
    const obj = { '#': 1, '@': 2, '!': 3 };
    const result = sortObjectKeys(obj);
    const expected = { '!': 3, '#': 1, '@': 2 };
    expect(result).toEqual(expected);
  });

  // Test case 7: Handle an object with string keys
  it('7. should correctly sort an object with string keys', () => {
    const obj = { zebra: 1, apple: 2, mango: 3, banana: 4 };
    const result = sortObjectKeys(obj);
    const expected = { apple: 2, banana: 4, mango: 3, zebra: 1 };
    expect(result).toEqual(expected);
  });

  // Test case 8: Throw error for non-object input (number)
  it('8. should throw a TypeError if input is a number', () => {
    expect(() =>
      sortObjectKeys(42 as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 9: Throw error for non-object input (string)
  it('9. should throw a TypeError if input is a string', () => {
    expect(() =>
      sortObjectKeys('string' as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 10: Throw error for non-object input (boolean)
  it('10. should throw a TypeError if input is a boolean', () => {
    expect(() =>
      sortObjectKeys(true as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 11: Throw error for null input
  it('11. should throw a TypeError if input is null', () => {
    expect(() =>
      sortObjectKeys(null as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 12: Throw error for undefined input
  it('12. should throw a TypeError if input is undefined', () => {
    expect(() =>
      sortObjectKeys(undefined as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });
});
