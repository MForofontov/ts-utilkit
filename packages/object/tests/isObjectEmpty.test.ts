import { isObjectEmpty } from '../src/isObjectEmpty';

describe('isObjectEmpty', () => {
  // Test case 1: Check if an empty object is empty
  it('1. should return true for an empty object', () => {
    const obj = {};
    const result = isObjectEmpty(obj);
    expect(result).toBe(true);
  });

  // Test case 2: Check if a non-empty object is empty
  it('2. should return false for a non-empty object', () => {
    const obj = { a: 1 };
    const result = isObjectEmpty(obj);
    expect(result).toBe(false);
  });

  // Test case 3: Check if an object with nested properties is empty
  it('3. should return false for an object with nested properties', () => {
    const obj = { a: { b: 1 } };
    const result = isObjectEmpty(obj);
    expect(result).toBe(false);
  });

  // Test case 4: Check if an array is empty
  it('4. should return false for an array', () => {
    const arr = [1, 2, 3];
    const result = isObjectEmpty(arr as unknown as Record<string, unknown>);
    expect(result).toBe(false);
  });

  // Test case 5: Check if an object with various data types is empty
  it('5. should return false for an object with various data types', () => {
    const obj = {
      a: 1,
      b: 'string',
      c: true,
      d: null,
      e: undefined,
      f: [1, 2, 3],
      g: { h: 4 },
    };
    const result = isObjectEmpty(obj);
    expect(result).toBe(false);
  });

  // Test case 6: Handle non-object input (number)
  it('6. should throw a TypeError if input is a number', () => {
    expect(() =>
      isObjectEmpty(42 as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 7: Handle non-object input (string)
  it('7. should throw a TypeError if input is a string', () => {
    expect(() =>
      isObjectEmpty('string' as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 8: Handle non-object input (boolean)
  it('8. should throw a TypeError if input is a boolean', () => {
    expect(() =>
      isObjectEmpty(true as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 9: Handle non-object input (null)
  it('9. should throw a TypeError if input is null', () => {
    expect(() =>
      isObjectEmpty(null as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 10: Handle non-object input (undefined)
  it('10. should throw a TypeError if input is undefined', () => {
    expect(() =>
      isObjectEmpty(undefined as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });
});
