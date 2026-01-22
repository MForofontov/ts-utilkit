import { deepClone } from '../src/deepClone';

describe('deepClone', () => {
  // Test case 1: Deep clone a simple object
  it('1. should deep clone a simple object', () => {
    const obj = { a: 1, b: 2 };
    const result = deepClone(obj);
    const expected = { a: 1, b: 2 };
    expect(result).toEqual(expected);
    expect(result).not.toBe(obj); // Ensure it's a deep clone
  });

  // Test case 2: Deep clone a nested object
  it('2. should deep clone a nested object', () => {
    const obj = { a: 1, b: { c: 2, d: 3 } };
    const result = deepClone(obj);
    const expected = { a: 1, b: { c: 2, d: 3 } };
    expect(result).toEqual(expected);
    expect(result.b).not.toBe(obj.b); // Ensure nested object is also cloned
  });

  // Test case 3: Deep clone an array
  it('3. should deep clone an array', () => {
    const arr = [1, 2, { a: 3 }];
    const result = deepClone(arr);
    const expected = [1, 2, { a: 3 }];
    expect(result).toEqual(expected);
    expect(result).not.toBe(arr); // Ensure it's a deep clone
    expect(result[2]).not.toBe(arr[2]); // Ensure nested object is also cloned
  });

  // Test case 4: Deep clone Date objects
  it('4. should deep clone Date objects', () => {
    const obj = { d: new Date('2020-01-01') };
    const result = deepClone(obj);
    expect(result).toEqual(obj);
    expect(result).not.toBe(obj);
    expect(result.d).not.toBe(obj.d);
    expect(Object.prototype.toString.call(result.d)).toBe('[object Date]');
  });

  // Test case 5: Deep clone RegExp objects
  it('5. should deep clone RegExp objects', () => {
    const obj = { r: /test/gi };
    const result = deepClone(obj);
    expect(result).toEqual(obj);
    expect(result).not.toBe(obj);
    expect(result.r).not.toBe(obj.r);
    expect(Object.prototype.toString.call(result.r)).toBe('[object RegExp]');
  });

  // Test case 6: Handle non-object input (number)
  it('6. should throw a TypeError if input is a number', () => {
    expect(() => deepClone(42 as unknown as object)).toThrow(TypeError);
  });

  // Test case 7: Handle non-object input (string)
  it('7. should throw a TypeError if input is a string', () => {
    expect(() => deepClone('string' as unknown as object)).toThrow(TypeError);
  });

  // Test case 8: Handle non-object input (boolean)
  it('8. should throw a TypeError if input is a boolean', () => {
    expect(() => deepClone(true as unknown as object)).toThrow(TypeError);
  });

  // Test case 9: Handle non-object input (null)
  it('9. should throw a TypeError if input is null', () => {
    expect(() => deepClone(null as unknown as object)).toThrow(TypeError);
  });

  // Test case 10: Handle non-object input (undefined)
  it('10. should throw a TypeError if input is undefined', () => {
    expect(() => deepClone(undefined as unknown as object)).toThrow(TypeError);
  });
});
