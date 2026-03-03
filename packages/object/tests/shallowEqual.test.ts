import { shallowEqual } from '../src/shallowEqual';

describe('shallowEqual', () => {
  // Test case 1: Compare two identical simple objects
  it('1. should return true for two identical simple objects', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    const result = shallowEqual(obj1, obj2);
    expect(result).toBe(true);
  });

  // Test case 2: Compare two different simple objects
  it('2. should return false for two different simple objects', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 3 };
    const result = shallowEqual(obj1, obj2);
    expect(result).toBe(false);
  });

  // Test case 3: Compare two objects with different keys
  it('3. should return false for two objects with different keys', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, c: 2 };
    const result = shallowEqual(obj1, obj2);
    expect(result).toBe(false);
  });

  // Test case 4: Compare two nested objects
  it('4. should return false for two nested objects', () => {
    const obj1 = { a: 1, b: { x: 2, y: 3 } };
    const obj2 = { a: 1, b: { x: 2, y: 3 } };
    const result = shallowEqual(obj1, obj2);
    expect(result).toBe(false);
  });

  // Test case 5: Compare two objects with various data types
  it('5. should return true for two objects with various data types that are equal', () => {
    const obj1 = { a: 1, b: 'string', c: true, d: null, e: undefined };
    const obj2 = { a: 1, b: 'string', c: true, d: null, e: undefined };
    const result = shallowEqual(obj1, obj2);
    expect(result).toBe(true);
  });

  // Test case 6: Compare two objects with arrays
  it('6. should return false for two objects with arrays', () => {
    const obj1 = { a: [1, 2, 3], b: 2 };
    const obj2 = { a: [1, 2, 3], b: 2 };
    const result = shallowEqual(obj1, obj2);
    expect(result).toBe(false);
  });

});
