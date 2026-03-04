import { countProperties } from '../src/countProperties';

describe('countProperties', () => {
  // Test case 1: Count properties of a simple object
  it('1. should count properties of a simple object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = countProperties(obj);
    const expected = 3;
    expect(result).toBe(expected);
  });

  // Test case 2: Count properties of a nested object
  it('2. should count properties of a nested object', () => {
    const obj = { a: 1, b: { c: 2, d: 3 }, e: 4 };
    const result = countProperties(obj);
    const expected = 3; // Only top-level properties are counted
    expect(result).toBe(expected);
  });

  // Test case 3: Count properties of an empty object
  it('3. should count properties of an empty object', () => {
    const obj = {};
    const result = countProperties(obj);
    const expected = 0;
    expect(result).toBe(expected);
  });
});
