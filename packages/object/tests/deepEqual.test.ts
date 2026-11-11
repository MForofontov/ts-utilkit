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

  it('8b. should return false for objects with different symbol values', () => {
    const sym1 = Symbol('sym1');
    const sym2a = Symbol('sym2');
    const sym2b = Symbol('sym2');
    expect(deepEqual({ [sym1]: 1, [sym2a]: 2 }, { [sym1]: 1, [sym2b]: 3 })).toBe(
      false,
    );
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

  // Test case 14: Array vs empty object must not be equal
  it('14. should return false for empty array vs empty object', () => {
    expect(deepEqual([], {})).toBe(false);
  });

  // Test case 15: Array vs object with numeric keys
  it('15. should return false for array vs object with same numeric keys', () => {
    expect(deepEqual([1, 2], { 0: 1, 1: 2 })).toBe(false);
  });

  // Test case 16: Date vs empty object
  it('16. should return false for Date vs empty object', () => {
    expect(deepEqual(new Date(0), {})).toBe(false);
  });

  // Test case 17: Equal Date objects
  it('17. should return true for equal Date objects', () => {
    expect(deepEqual(new Date('2025-01-01'), new Date('2025-01-01'))).toBe(
      true,
    );
  });

  // Test case 18: Unequal Date objects
  it('18. should return false for unequal Date objects', () => {
    expect(deepEqual(new Date('2025-01-01'), new Date('2025-01-02'))).toBe(
      false,
    );
  });

  // Test case 19: Equal RegExp objects
  it('19. should return true for equal RegExp objects', () => {
    expect(deepEqual(/test/gi, /test/gi)).toBe(true);
  });

  // Test case 20: Unequal RegExp flags
  it('20. should return false for RegExp with different flags', () => {
    expect(deepEqual(/test/gi, /test/i)).toBe(false);
  });

  // Test case 21: Equal Maps
  it('21. should return true for equal Maps', () => {
    expect(deepEqual(new Map([['a', 1]]), new Map([['a', 1]]))).toBe(true);
  });

  // Test case 22: Unequal Maps
  it('22. should return false for unequal Maps', () => {
    expect(deepEqual(new Map([['a', 1]]), new Map([['b', 2]]))).toBe(false);
  });

  // Test case 23: Map vs plain object
  it('23. should return false for Map vs plain object', () => {
    expect(deepEqual(new Map([['a', 1]]), { a: 1 })).toBe(false);
  });

  // Test case 24: Equal Sets
  it('24. should return true for equal Sets', () => {
    expect(deepEqual(new Set([1, 2]), new Set([2, 1]))).toBe(true);
  });

  // Test case 25: Unequal Sets
  it('25. should return false for unequal Sets', () => {
    expect(deepEqual(new Set([1, 2]), new Set([1, 3]))).toBe(false);
  });

  // Test case 26: Set vs array
  it('26. should return false for Set vs array', () => {
    expect(deepEqual(new Set([1, 2]), [1, 2])).toBe(false);
  });

  // Test case 27: Nested Map values
  it('27. should deeply compare Map values', () => {
    expect(
      deepEqual(
        new Map([['x', { nested: true }]]),
        new Map([['x', { nested: true }]]),
      ),
    ).toBe(true);
    expect(
      deepEqual(
        new Map([['x', { nested: true }]]),
        new Map([['x', { nested: false }]]),
      ),
    ).toBe(false);
  });
});
