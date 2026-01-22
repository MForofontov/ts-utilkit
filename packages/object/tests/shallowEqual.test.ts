import { shallowEqual } from '../src/shallowEqual';

describe('shallowEqual', () => {
  // Test case 1: Compare two identical simple objects
  it('1. should return true for two identical simple objects', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    const result = shallowEqual(obj1, obj2);
    expect(result).toBe(true);
  });

  // Test case 2: Compare two different simple objects
  it('2. should return false for two different simple objects', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 3 };
    const result = shallowEqual(obj1, obj2);
    expect(result).toBe(false);
  });

  // Test case 3: Compare two objects with different keys
  it('3. should return false for two objects with different keys', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, c: 2 };
    const result = shallowEqual(obj1, obj2);
    expect(result).toBe(false);
  });

  // Test case 4: Compare two nested objects
  it('4. should return false for two nested objects', () => {
    const obj1 = { a: 1, b: { x: 2, y: 3 } };
    const obj2 = { a: 1, b: { x: 2, y: 3 } };
    const result = shallowEqual(obj1, obj2);
    expect(result).toBe(false);
  });

  // Test case 5: Compare two objects with various data types
  it('5. should return true for two objects with various data types that are equal', () => {
    const obj1 = { a: 1, b: 'string', c: true, d: null, e: undefined };
    const obj2 = { a: 1, b: 'string', c: true, d: null, e: undefined };
    const result = shallowEqual(obj1, obj2);
    expect(result).toBe(true);
  });

  // Test case 6: Compare two objects with arrays
  it('6. should return false for two objects with arrays', () => {
    const obj1 = { a: [1, 2, 3], b: 2 };
    const obj2 = { a: [1, 2, 3], b: 2 };
    const result = shallowEqual(obj1, obj2);
    expect(result).toBe(false);
  });

  // Test case 7: Handle non-object input (number)
  it('7. should throw a TypeError if the first input is a number', () => {
    expect(() =>
      shallowEqual(42 as unknown as Record<string, unknown>, { a: 1 }),
    ).toThrow(TypeError);
  });

  // Test case 8: Handle non-object input (string)
  it('8. should throw a TypeError if the first input is a string', () => {
    expect(() =>
      shallowEqual('string' as unknown as Record<string, unknown>, { a: 1 }),
    ).toThrow(TypeError);
  });

  // Test case 9: Handle non-object input (boolean)
  it('9. should throw a TypeError if the first input is a boolean', () => {
    expect(() =>
      shallowEqual(true as unknown as Record<string, unknown>, { a: 1 }),
    ).toThrow(TypeError);
  });

  // Test case 10: Handle non-object input (null)
  it('10. should throw a TypeError if the first input is null', () => {
    expect(() =>
      shallowEqual(null as unknown as Record<string, unknown>, { a: 1 }),
    ).toThrow(TypeError);
  });

  // Test case 11: Handle non-object input (undefined)
  it('11. should throw a TypeError if the first input is undefined', () => {
    expect(() =>
      shallowEqual(undefined as unknown as Record<string, unknown>, { a: 1 }),
    ).toThrow(TypeError);
  });

  // Test case 12: Handle non-object input for the second parameter (number)
  it('12. should throw a TypeError if the second input is a number', () => {
    expect(() =>
      shallowEqual({ a: 1 }, 42 as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 13: Handle non-object input for the second parameter (string)
  it('13. should throw a TypeError if the second input is a string', () => {
    expect(() =>
      shallowEqual({ a: 1 }, 'string' as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 14: Handle non-object input for the second parameter (boolean)
  it('14. should throw a TypeError if the second input is a boolean', () => {
    expect(() =>
      shallowEqual({ a: 1 }, true as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 15: Handle non-object input for the second parameter (null)
  it('15. should throw a TypeError if the second input is null', () => {
    expect(() =>
      shallowEqual({ a: 1 }, null as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 16: Handle non-object input for the second parameter (undefined)
  it('16. should throw a TypeError if the second input is undefined', () => {
    expect(() =>
      shallowEqual({ a: 1 }, undefined as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });
});
