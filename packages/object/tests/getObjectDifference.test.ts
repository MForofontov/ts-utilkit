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

  // Test case 6: Handle non-object input (number)
  it('6. should throw a TypeError if the first input is a number', () => {
    expect(() =>
      getObjectDifference(42 as unknown as Record<string, unknown>, { a: 1 }),
    ).toThrow(TypeError);
  });

  // Test case 7: Handle non-object input (string)
  it('7. should throw a TypeError if the first input is a string', () => {
    expect(() =>
      getObjectDifference('string' as unknown as Record<string, unknown>, {
        a: 1,
      }),
    ).toThrow(TypeError);
  });

  // Test case 8: Handle non-object input (boolean)
  it('8. should throw a TypeError if the first input is a boolean', () => {
    expect(() =>
      getObjectDifference(true as unknown as Record<string, unknown>, { a: 1 }),
    ).toThrow(TypeError);
  });

  // Test case 9: Handle non-object input (null)
  it('9. should throw a TypeError if the first input is null', () => {
    expect(() =>
      getObjectDifference(null as unknown as Record<string, unknown>, { a: 1 }),
    ).toThrow(TypeError);
  });

  // Test case 10: Handle non-object input (undefined)
  it('10. should throw a TypeError if the first input is undefined', () => {
    expect(() =>
      getObjectDifference(undefined as unknown as Record<string, unknown>, {
        a: 1,
      }),
    ).toThrow(TypeError);
  });

  // Test case 11: Handle non-object input for the second parameter (number)
  it('11. should throw a TypeError if the second input is a number', () => {
    expect(() =>
      getObjectDifference({ a: 1 }, 42 as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 12: Handle non-object input for the second parameter (string)
  it('12. should throw a TypeError if the second input is a string', () => {
    expect(() =>
      getObjectDifference(
        { a: 1 },
        'string' as unknown as Record<string, unknown>,
      ),
    ).toThrow(TypeError);
  });

  // Test case 13: Handle non-object input for the second parameter (boolean)
  it('13. should throw a TypeError if the second input is a boolean', () => {
    expect(() =>
      getObjectDifference({ a: 1 }, true as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 14: Handle non-object input for the second parameter (null)
  it('14. should throw a TypeError if the second input is null', () => {
    expect(() =>
      getObjectDifference({ a: 1 }, null as unknown as Record<string, unknown>),
    ).toThrow(TypeError);
  });

  // Test case 15: Handle non-object input for the second parameter (undefined)
  it('15. should throw a TypeError if the second input is undefined', () => {
    expect(() =>
      getObjectDifference(
        { a: 1 },
        undefined as unknown as Record<string, unknown>,
      ),
    ).toThrow(TypeError);
  });
});
