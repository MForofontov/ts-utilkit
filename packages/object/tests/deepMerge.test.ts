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

  // Test case 6: Date values are replaced, not merged as plain objects
  it('6. should replace Date values instead of merging them', () => {
    const d1 = new Date('2020-01-01');
    const d2 = new Date('2025-01-01');
    const result = deepMerge({ created: d1 }, { created: d2 });
    expect(result.created).toBe(d2);
  });

  // Test case 7: Map/Set/RegExp are replaced
  it('7. should replace Map, Set, and RegExp values', () => {
    const result = deepMerge(
      { m: new Map([['a', 1]]), s: new Set([1]), r: /a/g },
      { m: new Map([['b', 2]]), s: new Set([2]), r: /b/i },
    );
    expect(result.m).toEqual(new Map([['b', 2]]));
    expect(result.s).toEqual(new Set([2]));
    expect(result.r).toEqual(/b/i);
  });
});
