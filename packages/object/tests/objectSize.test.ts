import { objectSize } from '../src/objectSize';

describe('objectSize', () => {
  // Test case 1: Calculate size of a simple object
  it('1. should return the correct size for a simple object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = objectSize(obj);
    const expected = 3;
    expect(result).toBe(expected);
  });

  // Test case 2: Calculate size of an empty object
  it('2. should return 0 for an empty object', () => {
    const obj = {};
    const result = objectSize(obj);
    const expected = 0;
    expect(result).toBe(expected);
  });

  // Test case 3: Ignore non-enumerable properties
  it('3. should ignore non-enumerable properties', () => {
    const obj = Object.create(
      {},
      {
        a: { value: 1, enumerable: true },
        b: { value: 2, enumerable: false },
      },
    ) as Record<string, unknown>;
    const result = objectSize(obj);
    const expected = 1;
    expect(result).toBe(expected);
  });

  // Test case 4: Handle objects with inherited properties
  it('4. should only count own enumerable properties', () => {
    const parent = { a: 1 };
    const obj = Object.create(parent) as Record<string, unknown>;
    obj.b = 2;
    const result = objectSize(obj);
    const expected = 1;
    expect(result).toBe(expected);
  });

  // Test case 5: Handle arrays as objects
  it('5. should return the correct size for an array', () => {
    const arr = [1, 2, 3];
    const result = objectSize(arr as unknown as Record<string, unknown>);
    const expected = 3;
    expect(result).toBe(expected);
  });

  // Test case 6: Handle objects with mixed data types
  it('6. should return the correct size for an object with mixed data types', () => {
    const obj = { a: 1, b: 'string', c: true, d: null, e: undefined };
    const result = objectSize(obj);
    const expected = 5;
    expect(result).toBe(expected);
  });

  // Test case 7: Throw error for non-object input (number)
  it('7. should throw a TypeError if input is a number', () => {
    expect(() => objectSize(42 as unknown as Record<string, unknown>)).toThrow(
      TypeError,
    );
  });

  // Test case 8: Throw error for non-object input (string)
  it('8. should throw a TypeError if input is a string', () => {
    expect(() =>
      objectSize('string' as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 9: Throw error for non-object input (boolean)
  it('9. should throw a TypeError if input is a boolean', () => {
    expect(() =>
      objectSize(true as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 10: Throw error for null input
  it('10. should throw a TypeError if input is null', () => {
    expect(() =>
      objectSize(null as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 11: Throw error for undefined input
  it('11. should throw a TypeError if input is undefined', () => {
    expect(() =>
      objectSize(undefined as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });
});
