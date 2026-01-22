import { getDeepEqualityHash } from '../src/getDeepEqualityHash';

describe('getDeepEqualityHash', () => {
  // Test case 1: Generate hash for a simple object
  it('1. should generate a hash for a simple object', () => {
    const obj = { a: 1, b: 2 };
    const result = getDeepEqualityHash(obj);
    expect(typeof result).toBe('number');
  });

  // Test case 2: Generate hash for a nested object
  it('2. should generate a hash for a nested object', () => {
    const obj = { a: 1, b: { c: 2, d: 3 } };
    const result = getDeepEqualityHash(obj);
    expect(typeof result).toBe('number');
  });

  // Test case 3: Generate hash for an array
  it('3. should generate a hash for an array', () => {
    const arr = [1, 2, { a: 3 }];
    const result = getDeepEqualityHash(arr);
    expect(typeof result).toBe('number');
  });

  // Test case 4: Generate hash for an object with various data types
  it('4. should generate a hash for an object with various data types', () => {
    const obj = {
      a: 1,
      b: 'string',
      c: true,
      d: null,
      e: undefined,
      f: [1, 2, 3],
      g: { h: 4 },
    };
    const result = getDeepEqualityHash(obj);
    expect(typeof result).toBe('number');
  });

  // Test case 5: Generate hash for an object with a date
  it('5. should generate a hash for an object with a date', () => {
    const obj = { a: new Date() };
    const result = getDeepEqualityHash(obj);
    expect(typeof result).toBe('number');
  });

  // Test case 6: Generate hash for an object with a regex
  it('6. should generate a hash for an object with a regex', () => {
    const obj = { a: /test/gi };
    const result = getDeepEqualityHash(obj);
    expect(typeof result).toBe('number');
  });

  // Test case 7: Generate hash for an object with a function
  it('7. should generate a hash for an object with a function', () => {
    const func = () => {};
    const obj = { a: func };
    const result = getDeepEqualityHash(obj);
    expect(typeof result).toBe('number');
  });

  // Test case 8: Generate hash for an object with a symbol
  it('8. should generate a hash for an object with a symbol', () => {
    const sym = Symbol('test');
    const obj = { a: sym };
    const result = getDeepEqualityHash(obj);
    expect(typeof result).toBe('number');
  });

  // Test case 9: Handle non-object input (string)
  it('9. should throw a TypeError if input is a string', () => {
    expect(() => getDeepEqualityHash('string' as unknown)).toThrow(TypeError);
  });

  // Test case 10: Handle non-object input (boolean)
  it('10. should throw a TypeError if input is a boolean', () => {
    expect(() => getDeepEqualityHash(true as unknown)).toThrow(TypeError);
  });

  // Test case 11: Handle non-object input (null)
  it('11. should throw a TypeError if input is null', () => {
    expect(() => getDeepEqualityHash(null as unknown)).toThrow(TypeError);
  });

  // Test case 12: Handle non-object input (undefined)
  it('12. should throw a TypeError if input is undefined', () => {
    expect(() => getDeepEqualityHash(undefined as unknown)).toThrow(TypeError);
  });
});
