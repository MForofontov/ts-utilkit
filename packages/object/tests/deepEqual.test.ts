import { deepEqual } from '../src/deepEqual';

describe('deepEqual', () => {
  // Test case 1: Compare two simple objects
  it('1. should return true for two equal simple objects', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    expect(deepEqual(obj1, obj2)).toBe(true);
  });

  // Test case 2: Compare two different simple objects
  it('2. should return false for two different simple objects', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 3 };
    expect(deepEqual(obj1, obj2)).toBe(false);
  });

  // Test case 3: Compare two nested objects
  it('3. should return true for two equal nested objects', () => {
    const obj1 = { a: 1, b: { c: 2, d: 3 } };
    const obj2 = { a: 1, b: { c: 2, d: 3 } };
    expect(deepEqual(obj1, obj2)).toBe(true);
  });

  // Test case 4: Compare two different nested objects
  it('4. should return false for two different nested objects', () => {
    const obj1 = { a: 1, b: { c: 2, d: 3 } };
    const obj2 = { a: 1, b: { c: 2, d: 4 } };
    expect(deepEqual(obj1, obj2)).toBe(false);
  });

  // Test case 5: Compare two arrays
  it('5. should return true for two equal arrays', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    expect(deepEqual(arr1, arr2)).toBe(true);
  });

  // Test case 6: Compare two different arrays
  it('6. should return false for two different arrays', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 4];
    expect(deepEqual(arr1, arr2)).toBe(false);
  });

  // Test case 7: Compare objects with various data types
  it('7. should return true for objects with equal various data types', () => {
    const obj1 = {
      a: 1,
      b: 'string',
      c: true,
      d: null,
      e: undefined,
      f: [1, 2, 3],
      g: { h: 4 },
    };
    const obj2 = {
      a: 1,
      b: 'string',
      c: true,
      d: null,
      e: undefined,
      f: [1, 2, 3],
      g: { h: 4 },
    };
    expect(deepEqual(obj1, obj2)).toBe(true);
  });

  // Test case 8: Compare objects with symbols
  it('8. should return true for objects with equal symbols', () => {
    const sym1 = Symbol('sym1');
    const sym2 = Symbol('sym2');
    const obj1 = { [sym1]: 1, [sym2]: 2 };
    const obj2 = { [sym1]: 1, [sym2]: 2 };
    expect(deepEqual(obj1, obj2)).toBe(true);
  });

  // Test case 9: Handle non-object input (number)
  it('9. should return false if one input is a number', () => {
    expect(deepEqual(42 as unknown as Record<string, unknown>, { a: 1 })).toBe(
      false,
    );
  });

  // Test case 10: Handle non-object input (string)
  it('10. should return false if one input is a string', () => {
    expect(
      deepEqual('string' as unknown as Record<string, unknown>, { a: 1 }),
    ).toBe(false);
  });

  // Test case 11: Handle non-object input (boolean)
  it('11. should return false if one input is a boolean', () => {
    expect(
      deepEqual(true as unknown as Record<string, unknown>, { a: 1 }),
    ).toBe(false);
  });

  // Test case 12: Handle non-object input (null)
  it('12. should return false if one input is null', () => {
    expect(
      deepEqual(null as unknown as Record<string, unknown>, { a: 1 }),
    ).toBe(false);
  });

  // Test case 13: Handle non-object input (undefined)
  it('13. should return false if one input is undefined', () => {
    expect(
      deepEqual(undefined as unknown as Record<string, unknown>, { a: 1 }),
    ).toBe(false);
  });
});
