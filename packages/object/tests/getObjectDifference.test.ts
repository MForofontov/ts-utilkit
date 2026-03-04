import { getObjectDifference } from '../src/getObjectDifference';

describe('getObjectDifference', () => {
  // Test case 1: Compute difference between two simple objects
  it('1. should compute difference between two simple objects', () => {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { a: 1, b: 4, d: 5 };
    const result = getObjectDifference(obj1, obj2);
    const expected = { b: 4, c: undefined, d: 5 };
    expect(result).toEqual(expected);
  });

  // Test case 2: Compute difference when objects are identical
  it('2. should return an empty object when objects are identical', () => {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { a: 1, b: 2, c: 3 };
    const result = getObjectDifference(obj1, obj2);
    const expected = {};
    expect(result).toEqual(expected);
  });

  // Test case 3: Compute difference with nested objects
  it('3. should compute difference with nested objects', () => {
    const obj1 = { a: 1, b: { x: 2, y: 3 }, c: 3 };
    const obj2 = { a: 1, b: { x: 2, y: 4 }, d: 5 };
    const result = getObjectDifference(obj1, obj2);
    const expected = { b: { x: 2, y: 4 }, c: undefined, d: 5 };
    expect(result).toEqual(expected);
  });

  // Test case 4: Compute difference with arrays
  it('4. should compute difference with arrays', () => {
    const obj1 = { a: [1, 2, 3], b: 2 };
    const obj2 = { a: [1, 2, 4], b: 2 };
    const result = getObjectDifference(obj1, obj2);
    const expected = { a: [1, 2, 4] };
    expect(result).toEqual(expected);
  });

  // Test case 5: Compute difference with various data types
  it('5. should compute difference with various data types', () => {
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
      a: 2,
      b: 'new string',
      c: false,
      d: 'not null',
      e: 'defined',
      f: [4, 5],
      g: { i: 5 },
    };
    const result = getObjectDifference(obj1, obj2);
    const expected = {
      a: 2,
      b: 'new string',
      c: false,
      d: 'not null',
      e: 'defined',
      f: [4, 5],
      g: { i: 5 },
    };
    expect(result).toEqual(expected);
  });
});
