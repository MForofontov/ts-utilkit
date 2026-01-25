import { hasKey } from '../src/hasKey';

describe('hasKey', () => {
  // Test case 1: Check if a simple object has a key
  it('1. should return true if the object has the key', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = hasKey(obj, 'b');
    expect(result).toBe(true);
  });

  // Test case 2: Check if a simple object does not have a key
  it('2. should return false if the object does not have the key', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = hasKey(obj, 'd');
    expect(result).toBe(false);
  });

  // Test case 3: Check if a nested object has a key
  it('3. should return true if a nested object has the key', () => {
    const obj = { a: 1, b: { c: 2, d: 3 } };
    const result = hasKey(obj, 'b');
    expect(result).toBe(true);
  });

  // Test case 4: Check if a nested object does not have a key
  it('4. should return false if a nested object does not have the key', () => {
    const obj = { a: 1, b: { c: 2, d: 3 } };
    const result = hasKey(obj, 'c');
    expect(result).toBe(false);
  });

  // Test case 5: Check if an array has a key
  it('5. should return true if an array has the key', () => {
    const arr = [1, 2, 3];
    const result = hasKey(arr as unknown as Record<string, unknown>, '0');
    expect(result).toBe(true);
  });

  // Test case 6: Check if an array does not have a key
  it('6. should return false if an array does not have the key', () => {
    const arr = [1, 2, 3];
    const result = hasKey(arr as unknown as Record<string, unknown>, '3');
    expect(result).toBe(false);
  });

  // Test case 7: Check if an object with various data types has a key
  it('7. should return true if an object with various data types has the key', () => {
    const obj = {
      a: 1,
      b: 'string',
      c: true,
      d: null,
      e: undefined,
      f: [1, 2, 3],
      g: { h: 4 },
    };
    const result = hasKey(obj, 'f');
    expect(result).toBe(true);
  });

  // Test case 8: Check if an object with various data types does not have a key
  it('8. should return false if an object with various data types does not have the key', () => {
    const obj = {
      a: 1,
      b: 'string',
      c: true,
      d: null,
      e: undefined,
      f: [1, 2, 3],
      g: { h: 4 },
    };
    const result = hasKey(obj, 'z');
    expect(result).toBe(false);
  });

  // Test case 9: Handle non-object input (number)
  it('9. should throw a TypeError if input is a number', () => {
    expect(() => hasKey(42 as unknown as Record<string, unknown>, 'a')).toThrow(
      TypeError,
    );
  });

  // Test case 10: Handle non-object input (string)
  it('10. should throw a TypeError if input is a string', () => {
    expect(() =>
      hasKey('string' as unknown as Record<string, unknown>, 'a'),
    ).toThrow(TypeError);
  });

  // Test case 11: Handle non-object input (boolean)
  it('11. should throw a TypeError if input is a boolean', () => {
    expect(() =>
      hasKey(true as unknown as Record<string, unknown>, 'a'),
    ).toThrow(TypeError);
  });

  // Test case 12: Handle non-object input (null)
  it('12. should throw a TypeError if input is null', () => {
    expect(() =>
      hasKey(null as unknown as Record<string, unknown>, 'a'),
    ).toThrow(TypeError);
  });

  // Test case 13: Handle non-object input (undefined)
  it('13. should throw a TypeError if input is undefined', () => {
    expect(() =>
      hasKey(undefined as unknown as Record<string, unknown>, 'a'),
    ).toThrow(TypeError);
  });
});
