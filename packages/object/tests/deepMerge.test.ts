import { deepMerge } from '../src/deepMerge';

describe('deepMerge', () => {
  // Test case 1: Deep merge two simple objects
  it('1. should deeply merge two simple objects', () => {
    const target = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };
    const result = deepMerge(target, source);
    const expected = { a: 1, b: 3, c: 4 };
    expect(result).toEqual(expected);
  });

  // Test case 2: Deep merge nested objects
  it('2. should deeply merge nested objects', () => {
    const target = { a: 1, b: { x: 2, y: 3 } };
    const source = { b: { y: 4, z: 5 }, c: 6 };
    const result = deepMerge(target, source);
    const expected = { a: 1, b: { x: 2, y: 4, z: 5 }, c: 6 };
    expect(result).toEqual(expected);
  });

  // Test case 3: Deep merge with arrays
  it('3. should deeply merge objects with arrays', () => {
    const target = { a: [1, 2], b: 2 };
    const source = { a: [3, 4], c: 3 };
    const result = deepMerge(target, source);
    const expected = { a: [1, 2, 3, 4], b: 2, c: 3 };
    expect(result).toEqual(expected);
  });

  // Test case 4: Deep merge with various data types
  it('4. should deeply merge objects with various data types', () => {
    const target = {
      a: 1,
      b: 'string',
      c: true,
      d: null,
      e: undefined,
      f: [1, 2, 3],
      g: { h: 4 },
    };
    const source = {
      a: 2,
      b: 'new string',
      c: false,
      d: 'not null',
      e: 'defined',
      f: [4, 5],
      g: { i: 5 },
    };
    const result = deepMerge(target, source);
    const expected = {
      a: 2,
      b: 'new string',
      c: false,
      d: 'not null',
      e: 'defined',
      f: [1, 2, 3, 4, 5],
      g: { h: 4, i: 5 },
    };
    expect(result).toEqual(expected);
  });

  // Test case 5: Deep merge with symbols
  it('5. should deeply merge objects with symbols', () => {
    const sym1 = Symbol('sym1');
    const sym2 = Symbol('sym2');
    const target = { [sym1]: 1 };
    const source = { [sym2]: 2 };
    const result = deepMerge(target, source);
    const expected = { [sym1]: 1, [sym2]: 2 };
    expect(result).toEqual(expected);
  });

  // Test case 6: Handle non-object input for the target (number)
  it('6. should throw a TypeError if the target is a number', () => {
    expect(() =>
      deepMerge(42 as unknown as Record<string, unknown>, { a: 1 }),
    ).toThrow(TypeError);
  });

  // Test case 7: Handle non-object input for the target (string)
  it('7. should throw a TypeError if the target is a string', () => {
    expect(() =>
      deepMerge('string' as unknown as Record<string, unknown>, { a: 1 }),
    ).toThrow(TypeError);
  });

  // Test case 8: Handle non-object input for the target (boolean)
  it('8. should throw a TypeError if the target is a boolean', () => {
    expect(() =>
      deepMerge(true as unknown as Record<string, unknown>, { a: 1 }),
    ).toThrow(TypeError);
  });

  // Test case 9: Handle non-object input for the target (null)
  it('9. should throw a TypeError if the target is null', () => {
    expect(() =>
      deepMerge(null as unknown as Record<string, unknown>, { a: 1 }),
    ).toThrow(TypeError);
  });

  // Test case 10: Handle non-object input for the target (undefined)
  it('10. should throw a TypeError if the target is undefined', () => {
    expect(() =>
      deepMerge(undefined as unknown as Record<string, unknown>, { a: 1 }),
    ).toThrow(TypeError);
  });

  // Test case 11: Handle non-object input for the source (number)
  it('11. should throw a TypeError if the source is a number', () => {
    expect(() =>
      deepMerge({ a: 1 }, 42 as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 12: Handle non-object input for the source (string)
  it('12. should throw a TypeError if the source is a string', () => {
    expect(() =>
      deepMerge({ a: 1 }, 'string' as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 13: Handle non-object input for the source (boolean)
  it('13. should throw a TypeError if the source is a boolean', () => {
    expect(() =>
      deepMerge({ a: 1 }, true as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 14: Handle non-object input for the source (null)
  it('14. should throw a TypeError if the source is null', () => {
    expect(() =>
      deepMerge({ a: 1 }, null as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 15: Handle non-object input for the source (undefined)
  it('15. should throw a TypeError if the source is undefined', () => {
    expect(() =>
      deepMerge({ a: 1 }, undefined as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });
});
