import { deepCloneWith } from '../src/deepCloneWith';

const cloneFn = (value: unknown) => value;

describe('deepCloneWith', () => {
  // Test case 1: Deep clone a simple object
  it('1. should deep clone a simple object', () => {
    const obj = { a: 1, b: 2 };
    const result = deepCloneWith(obj, cloneFn);
    const expected = { a: 1, b: 2 };
    expect(result).toEqual(expected);
    expect(result).not.toBe(obj); // Ensure it's a deep clone
  });

  // Test case 2: Deep clone a nested object
  it('2. should deep clone a nested object', () => {
    const obj = { a: 1, b: { c: 2, d: 3 } };
    const result = deepCloneWith(obj, cloneFn);
    const expected = { a: 1, b: { c: 2, d: 3 } };
    expect(result).toEqual(expected);
    expect(result.b).not.toBe(obj.b); // Ensure nested object is also cloned
  });

  // Test case 3: Deep clone an array
  it('3. should deep clone an array', () => {
    const arr = [1, 2, { a: 3 }];
    const result = deepCloneWith(arr, cloneFn);
    const expected = [1, 2, { a: 3 }];
    expect(result).toEqual(expected);
    expect(result).not.toBe(arr); // Ensure it's a deep clone
    expect(result[2]).not.toBe(arr[2]); // Ensure nested object is also cloned
  });

  // Test case 4: Use the cloneFn for cloning values
  it('4. should use the cloneFn for cloning values', () => {
    const obj = { a: 1, b: 2 };
    const customCloneFn = jest.fn((value: unknown): unknown => value);
    deepCloneWith(obj, customCloneFn);
    expect(customCloneFn).toHaveBeenCalledTimes(2);
  });

  // Test case 5: Deep clone an object with array properties
  it('5. should deep clone an object with array properties', () => {
    const obj = { a: [1, 2], b: [3, 4] };
    const result = deepCloneWith(obj, cloneFn);
    const expected = { a: [1, 2], b: [3, 4] };
    expect(result).toEqual(expected);
    expect(result.a).not.toBe(obj.a); // Ensure array is also cloned
    expect(result.b).not.toBe(obj.b); // Ensure array is also cloned
  });

  // Test case 6: Deep clone an object with nested arrays
  it('6. should deep clone an object with nested arrays', () => {
    const obj = { a: [1, [2, 3]], b: [4, [5, 6]] };
    const result = deepCloneWith(obj, cloneFn);
    const expected = { a: [1, [2, 3]], b: [4, [5, 6]] };
    expect(result).toEqual(expected);
    expect(result.a[1]).not.toBe(obj.a[1]); // Ensure nested array is also cloned
    expect(result.b[1]).not.toBe(obj.b[1]); // Ensure nested array is also cloned
  });

  // Test case 7: Deep clone an object with functions
  it('7. should deep clone an object with functions', () => {
    const obj = { a: 1, b: () => 2 };
    const result = deepCloneWith(obj, cloneFn);
    const expected = { a: 1, b: obj.b };
    expect(result).toEqual(expected);
    expect(result.b).toBe(obj.b); // Ensure function is not cloned
  });

  // Test case 8: Deep clone an object with symbols
  it('8. should deep clone an object with symbols', () => {
    const sym = Symbol('sym');
    const obj = { a: 1, [sym]: 2 };
    const result = deepCloneWith(obj, cloneFn);
    const expected = { a: 1, [sym]: 2 };
    expect(result).toEqual(expected);
    expect(result[sym]).toBe(obj[sym]); // Ensure symbol is not cloned
  });

  // Test case 9: Handle non-object input (number)
  it('9. should throw a TypeError if input is a number', () => {
    expect(() => deepCloneWith(42 as unknown as object, cloneFn)).toThrow(
      TypeError,
    );
  });

  // Test case 10: Handle non-object input (string)
  it('10. should throw a TypeError if input is a string', () => {
    expect(() => deepCloneWith('string' as unknown as object, cloneFn)).toThrow(
      TypeError,
    );
  });

  // Test case 11: Handle non-object input (boolean)
  it('11. should throw a TypeError if input is a boolean', () => {
    expect(() => deepCloneWith(true as unknown as object, cloneFn)).toThrow(
      TypeError,
    );
  });

  // Test case 12: Handle non-object input (null)
  it('12. should throw a TypeError if input is null', () => {
    expect(() => deepCloneWith(null as unknown as object, cloneFn)).toThrow(
      TypeError,
    );
  });

  // Test case 13: Handle non-object input (undefined)
  it('13. should throw a TypeError if input is undefined', () => {
    expect(() =>
      deepCloneWith(undefined as unknown as object, cloneFn),
    ).toThrow(TypeError);
  });
});
