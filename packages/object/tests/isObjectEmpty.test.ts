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
});
