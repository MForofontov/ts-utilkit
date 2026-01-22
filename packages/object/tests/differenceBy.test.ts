import { differenceBy } from '../src/differenceBy';

describe('differenceBy', () => {
  // Test case 1: Compare two simple objects with a basic comparator
  it('1. should return the key-value pairs from obj1 that differ from obj2', () => {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { a: 1, b: 4, c: 3 };
    const comparator = (a: unknown, b: unknown) => a === b;
    const result = differenceBy(obj1, obj2, comparator);
    const expected = { b: 2 };
    expect(result).toEqual(expected);
  });

  // Test case 2: Handle identical objects
  it('2. should return an empty object if obj1 and obj2 are identical', () => {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { a: 1, b: 2, c: 3 };
    const comparator = (a: unknown, b: unknown) => a === b;
    const result = differenceBy(obj1, obj2, comparator);
    const expected = {};
    expect(result).toEqual(expected);
  });

  // Test case 3: Handle an empty obj1
  it('3. should return an empty object if obj1 is empty', () => {
    const obj1 = {};
    const obj2 = { a: 1, b: 2, c: 3 };
    const comparator = (a: unknown, b: unknown) => a === b;
    const result = differenceBy(obj1, obj2, comparator);
    const expected = {};
    expect(result).toEqual(expected);
  });

  // Test case 4: Handle an empty obj2
  it('4. should return all key-value pairs from obj1 if obj2 is empty', () => {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = {};
    const comparator = (a: unknown, b: unknown) => a === b;
    const result = differenceBy(obj1, obj2, comparator);
    const expected = { a: 1, b: 2, c: 3 };
    expect(result).toEqual(expected);
  });

  // Test case 5: Handle a custom comparator
  it('5. should use the custom comparator to determine differences', () => {
    const obj1 = { a: 'hello', b: 'world', c: 'test' };
    const obj2 = { a: 'HELLO', b: 'WORLD', c: 'test' };
    const comparator = (a: unknown, b: unknown) =>
      String(a).toLowerCase() === String(b).toLowerCase();
    const result = differenceBy(obj1, obj2, comparator);
    const expected = {};
    expect(result).toEqual(expected);
  });

  // Test case 6: Handle missing keys in obj2
  it('6. should include keys from obj1 that are not present in obj2', () => {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { a: 1 };
    const comparator = (a: unknown, b: unknown) => a === b;
    const result = differenceBy(obj1, obj2, comparator);
    const expected = { b: 2, c: 3 };
    expect(result).toEqual(expected);
  });

  // Test case 7: Handle nested objects
  it('7. should compare nested objects correctly', () => {
    const obj1 = { a: { x: 1 }, b: { y: 2 } };
    const obj2 = { a: { x: 1 }, b: { y: 3 } };
    const comparator = (a: unknown, b: unknown) =>
      JSON.stringify(a) === JSON.stringify(b);
    const result = differenceBy(obj1, obj2, comparator);
    const expected = { b: { y: 2 } };
    expect(result).toEqual(expected);
  });

  // Test case 8: Handle arrays as values
  it('8. should compare arrays as values correctly', () => {
    const obj1 = { a: [1, 2, 3], b: [4, 5, 6] };
    const obj2 = { a: [1, 2, 3], b: [4, 5, 7] };
    const comparator = (a: unknown, b: unknown) =>
      JSON.stringify(a) === JSON.stringify(b);
    const result = differenceBy(obj1, obj2, comparator);
    const expected = { b: [4, 5, 6] };
    expect(result).toEqual(expected);
  });

  // Test case 9: Handle objects with mixed data types
  it('9. should handle objects with mixed data types', () => {
    const obj1 = { a: 1, b: 'string', c: true, d: null };
    const obj2 = { a: 1, b: 'different', c: false, d: null };
    const comparator = (a: unknown, b: unknown) => a === b;
    const result = differenceBy(obj1, obj2, comparator);
    const expected = { b: 'string', c: true };
    expect(result).toEqual(expected);
  });

  // Test case 10: Handle undefined values in obj1 or obj2
  it('10. should handle undefined values in obj1 or obj2', () => {
    const obj1 = { a: 1, b: undefined } as unknown as Record<string, unknown>;
    const obj2 = { a: 1, b: 2 };
    const comparator = (a: unknown, b: unknown) => a === b;
    const result = differenceBy(obj1, obj2, comparator);
    const expected = { b: undefined };
    expect(result).toEqual(expected);
  });

  // Test case 11: Handle objects with Symbol keys
  it('11. should handle objects with Symbol keys', () => {
    const sym1 = Symbol('key1');
    const sym2 = Symbol('key2');
    const obj1 = { [sym1]: 1, [sym2]: 2 };
    const obj2 = { [sym1]: 1, [sym2]: 3 };
    const comparator = (a: unknown, b: unknown) => a === b;
    const result = differenceBy(obj1, obj2, comparator);
    const expected = { [sym2]: 2 };
    expect(result).toEqual(expected);
  });

  // Test case 12: Throw error if obj1 is not an object (number)
  it('12. should throw a TypeError if obj1 is a number', () => {
    expect(() =>
      differenceBy(
        42 as unknown as Record<string, unknown>,
        {},
        (a, b) => a === b,
      ),
    ).toThrow(TypeError);
  });

  // Test case 13: Throw error if obj1 is not an object (string)
  it('13. should throw a TypeError if obj1 is a string', () => {
    expect(() =>
      differenceBy(
        'string' as unknown as Record<string, unknown>,
        {},
        (a, b) => a === b,
      ),
    ).toThrow(TypeError);
  });

  // Test case 14: Throw error if obj1 is not an object (boolean)
  it('14. should throw a TypeError if obj1 is a boolean', () => {
    expect(() =>
      differenceBy(
        true as unknown as Record<string, unknown>,
        {},
        (a, b) => a === b,
      ),
    ).toThrow(TypeError);
  });

  // Test case 15: Throw error if obj1 is null
  it('15. should throw a TypeError if obj1 is null', () => {
    expect(() =>
      differenceBy(
        null as unknown as Record<string, unknown>,
        {},
        (a, b) => a === b,
      ),
    ).toThrow(TypeError);
  });

  // Test case 16: Throw error if obj1 is undefined
  it('16. should throw a TypeError if obj1 is undefined', () => {
    expect(() =>
      differenceBy(
        undefined as unknown as Record<string, unknown>,
        {},
        (a, b) => a === b,
      ),
    ).toThrow(TypeError);
  });

  // Test case 17: Throw error if obj2 is not an object (number)
  it('17. should throw a TypeError if obj2 is a number', () => {
    expect(() =>
      differenceBy(
        {},
        42 as unknown as Record<string, unknown>,
        (a, b) => a === b,
      ),
    ).toThrow(TypeError);
  });

  // Test case 18: Throw error if obj2 is not an object (string)
  it('18. should throw a TypeError if obj2 is a string', () => {
    expect(() =>
      differenceBy(
        {},
        'string' as unknown as Record<string, unknown>,
        (a, b) => a === b,
      ),
    ).toThrow(TypeError);
  });

  // Test case 19: Throw error if obj2 is not an object (boolean)
  it('19. should throw a TypeError if obj2 is a boolean', () => {
    expect(() =>
      differenceBy(
        {},
        true as unknown as Record<string, unknown>,
        (a, b) => a === b,
      ),
    ).toThrow(TypeError);
  });

  // Test case 20: Throw error if obj2 is null
  it('20. should throw a TypeError if obj2 is null', () => {
    expect(() =>
      differenceBy(
        {},
        null as unknown as Record<string, unknown>,
        (a, b) => a === b,
      ),
    ).toThrow(TypeError);
  });

  // Test case 21: Throw error if obj2 is undefined
  it('21. should throw a TypeError if obj2 is undefined', () => {
    expect(() =>
      differenceBy(
        {},
        undefined as unknown as Record<string, unknown>,
        (a, b) => a === b,
      ),
    ).toThrow(TypeError);
  });

  // Test case 22: Throw error if comparator is not a function (number)
  it('22. should throw a TypeError if comparator is a number', () => {
    expect(() =>
      differenceBy(
        {},
        {},
        42 as unknown as (a: unknown, b: unknown) => boolean,
      ),
    ).toThrow(TypeError);
  });

  // Test case 23: Throw error if comparator is not a function (string)
  it('23. should throw a TypeError if comparator is a string', () => {
    expect(() =>
      differenceBy(
        {},
        {},
        'string' as unknown as (a: unknown, b: unknown) => boolean,
      ),
    ).toThrow(TypeError);
  });

  // Test case 24: Throw error if comparator is not a function (boolean)
  it('24. should throw a TypeError if comparator is a boolean', () => {
    expect(() =>
      differenceBy(
        {},
        {},
        true as unknown as (a: unknown, b: unknown) => boolean,
      ),
    ).toThrow(TypeError);
  });

  // Test case 25: Throw error if comparator is null
  it('25. should throw a TypeError if comparator is null', () => {
    expect(() =>
      differenceBy(
        {},
        {},
        null as unknown as (a: unknown, b: unknown) => boolean,
      ),
    ).toThrow(TypeError);
  });

  // Test case 26: Throw error if comparator is undefined
  it('26. should throw a TypeError if comparator is undefined', () => {
    expect(() =>
      differenceBy(
        {},
        {},
        undefined as unknown as (a: unknown, b: unknown) => boolean,
      ),
    ).toThrow(TypeError);
  });
});
